from django.urls import path
from . import views

urlpatterns = [
    # Define URLs for user profiles
    path('<str:username>', views.detail_view, name='user_profile'),
    path('me/edit', views.edit_profile, name='edit_profile'),
    # Add more URL patterns as needed
]
