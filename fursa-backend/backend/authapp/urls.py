from django.urls import path
from .views import SignupView, LoginView,ContactUsView, JobListView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('contact/', ContactUsView.as_view(), name='contact_us'),
    path('api/jobs/', JobListView.as_view(), name='job-list'),
]
