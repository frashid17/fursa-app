from django.core.mail import send_mail, BadHeaderError
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Job  # Ensure the Job model is imported

# Serializer for signup
class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def validate_email(self, value):
        # Check if email already exists
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists.")
        return value

# Serializer for login
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

# Serializer for Job model
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ['id', 'title', 'company', 'description', 'requirements', 'location']

# API View for Signup
class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "Account created successfully!"}, status=status.HTTP_201_CREATED)
        
        # If the serializer is not valid, return the error response with validation details
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

# API View for Contact Us
class ContactUsView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract the data from the request body
        name = request.data.get('name')
        email = request.data.get('email')
        message = request.data.get('message')

        # Validate inputs
        if not name or not email or not message:
            return Response({"error": "All fields are required: name, email, and message."}, status=status.HTTP_400_BAD_REQUEST)

        # Send the email using Django's send_mail function
        try:
            send_mail(
                subject="Fursa App Support",
                message=f"From: {name} ({email})\n\nMessage: {message}",
                from_email=email,  # Send from the user's email
                recipient_list=['frashid274@gmail.com'],  # Replace with your actual recipient email
                fail_silently=False,
            )
            return Response({"message": "Message sent successfully!"}, status=status.HTTP_200_OK)
        
        except BadHeaderError:
            return Response({"error": "Invalid header detected in email."}, status=status.HTTP_400_BAD_REQUEST)
        
        except Exception as e:
            return Response({"error": f"Failed to send message: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# API View for listing all jobs
class JobListView(APIView):
    permission_classes = [AllowAny]  # Publicly accessible

    def get(self, request):
        jobs = Job.objects.all()  # Retrieve all jobs from the database
        serializer = JobSerializer(jobs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
