from django.db import models
from .profile import UserProfile
class SocialProfile(models.Model):
    # Define choices for social media platforms
    FACEBOOK = 'FB'
    INSTAGRAM = 'IG'
    TWITTER = 'TW'
    LINKEDIN = 'LI'
    DISCORD = 'DI'

    SOCIAL_MEDIA_CHOICES = [
        (DISCORD, 'Discord'),
        (FACEBOOK, 'Facebook'),
        (INSTAGRAM, 'Instagram'),
        (LINKEDIN, 'LinkedIn'),
        (TWITTER, 'Twitter'),
        # Add more social media choices as needed
    ]

    # Define fields for the SocialProfile model
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    social_media = models.CharField(max_length=2, choices=SOCIAL_MEDIA_CHOICES)
    social_profile_name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.user_profile}'s {self.social_media} social profile - {self.social_profile_name}"
