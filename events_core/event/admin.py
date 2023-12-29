from django.contrib import admin

from .models.event import Detail, Event, Privacy, Subscriber

admin.site.register(Subscriber)
admin.site.register(Detail)
admin.site.register(Privacy)


class EventAdmin(admin.ModelAdmin):
    search_fields = [
        'title',
    ]  # Specify the fields to search


admin.site.register(Event, EventAdmin)
