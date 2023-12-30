from django.db import models

from events_core.general.utils.choices import PLATFORM_CHOICES

from .event import Event


class SocialProfile(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE)
    platform = models.CharField(max_length=3, choices=PLATFORM_CHOICES)
    profile_name = models.CharField(max_length=200)

    class Meta:
        unique_together = ('event', 'platform')

    def __str__(self):
        return self.profile_name
