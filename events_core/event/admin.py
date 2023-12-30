from django.contrib import admin

from .models.event import Category, Detail, Event, Privacy, Subscriber
from .models.socials import SocialProfile

admin.site.register(Subscriber)
admin.site.register(Detail)
admin.site.register(Privacy)
admin.site.register(Category)
admin.site.register(SocialProfile)


class EventAdmin(admin.ModelAdmin):
    search_fields = [
        'title',
    ]  # Specify the fields to search


admin.site.register(Event, EventAdmin)
