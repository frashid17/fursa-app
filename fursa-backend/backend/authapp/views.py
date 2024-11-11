from django.core.mail import send_mail
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

# Serializer for signup
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

# Serializer for login
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

# API View for Signup
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# API View for Login
class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)  # Get the user by email
        except User.DoesNotExist:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        # Authenticate the user with the password
        if user.check_password(password):  # Compare the password hash
            # Create the JWT token (using refresh token for access)
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)  # Access token to be sent in response
            
            # Optionally, you can return the refresh token too if needed
            refresh_token = str(refresh)  # Refresh token (used for refreshing the access token)
            
            return Response({
                "message": "Login successful!",
                "access_token": access_token,  # Send the access token
                "refresh_token": refresh_token  # Send the refresh token (optional)
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# API View for Contact Us (new)
class ContactUsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract the data from the request body
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        # Send the email using Django's send_mail function
        try:
            send_mail(
                subject="Contact Us Message",
                message=f"From: {name} ({email})\n\nMessage: {message}",
                from_email=email,  # Send from the user's email
                recipient_list=['your-email@example.com'],  # Replace with your email
                fail_silently=False,  # Optionally set to True in production
            )
            return Response({"message": "Message sent successfully!"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"Failed to send message: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
