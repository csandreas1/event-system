from django.contrib import admin

from .models.event import Detail, Event, Privacy, Subscriber

admin.site.register(Event)
admin.site.register(Subscriber)
admin.site.register(Detail)
admin.site.register(Privacy)
