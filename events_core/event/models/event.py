from django.contrib.auth.models import User
from django.db import models


class Event(models.Model):
    organizer = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    number_of_attendees = models.IntegerField(blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_recurring = models.BooleanField(default=False)
    location = models.CharField(max_length=450)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.title


class Detail(models.Model):
    event = models.OneToOneField('Event',
                                 on_delete=models.CASCADE,
                                 primary_key=True)
    category = models.CharField(max_length=255)
    event_type = models.CharField(max_length=255)
    video_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='event_pics/', blank=True, null=True)
    payment_type = models.CharField(max_length=2,
                                    choices=[('pd', 'Paid'), ('fr', 'Free'),
                                             ('dn', 'Donation')])


class Subscriber(models.Model):
    user = models.OneToOneField(User,
                                on_delete=models.CASCADE,
                                primary_key=True)
    subscribed_events = models.ManyToManyField('Event')

    def __str__(self):
        return f'{self.user.username} is subscribed'


class Privacy(models.Model):
    event = models.OneToOneField('Event',
                                 on_delete=models.CASCADE,
                                 primary_key=True)
    privacy_type = models.CharField(max_length=20,
                                    choices=[('private', 'Private'),
                                             ('public', 'Public')])

    class Meta:
        verbose_name_plural = 'Privacies'

    def __str__(self):
        return f'{self.event.title} privacy is {self.privacy_type}'
