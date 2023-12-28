from django.contrib import admin

from .models import SocialProfile, UserProfile

admin.site.register(SocialProfile)
admin.site.register(UserProfile)
