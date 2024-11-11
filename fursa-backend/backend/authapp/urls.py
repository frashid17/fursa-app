from django.urls import path
from .views import SignupView, LoginView,ContactUsView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
     path('contact/', ContactUsView.as_view(), name='contact_us'),
]
