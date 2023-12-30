from django.db import models

from events_core.general.utils.choices import PLATFORM_CHOICES

from .profile import UserProfile


class SocialProfile(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    social_media = models.CharField(max_length=2, choices=PLATFORM_CHOICES)
    social_profile_name = models.CharField(max_length=150)

    def __str__(self):
        return f"{self.user_profile}'s {self.social_media} social profile - {self.social_profile_name}"
