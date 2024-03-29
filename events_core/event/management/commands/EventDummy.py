from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError
from django.utils.text import slugify
from faker import Faker

from events_core.event.models.event import Category, Detail, Event, Privacy
from events_core.event.models.socials import SocialProfile
from events_core.general.utils.choices import PLATFORM_CHOICES

fake = Faker()


class Command(BaseCommand):
    """
    Generates dummy data for the event app
    poetry run python3 -m events_core.manage EventDummy
    """

    def handle(self, *args, **kwargs):
        total = 450

        # create some unique event categories

        try:
            Category.objects.create(name='Music', active=True)
            Category.objects.create(name='Programming', active=True)
            Category.objects.create(name='Birthdays', active=True)
        except IntegrityError:
            print('Maybe they already exist')
            pass

        for _ in range(total):
            organizer = User.objects.first()
            title = fake.sentence()
            slug = slugify(title)[:50]
            description = fake.text(max_nb_chars=4500)
            start_date = fake.date_time_between(start_date='-1y', end_date='+1y')
            end_date = fake.date_time_between(start_date=start_date, end_date='+1d')
            is_recurring = fake.boolean(chance_of_getting_true=25)
            location = fake.address()
            country = fake.country()
            city = fake.city()

            # Create dummy data for Events
            event = Event.objects.create(
                organizer=organizer,
                title=title,
                slug=slug,
                description=description,
                start_date=start_date,
                end_date=end_date,
                is_recurring=is_recurring,
                location=location,
                country=country,
                city=city
            )

            # Create dummy data for Event details
            categories = Category.objects.all()
            category = fake.random_element(elements=(categories))
            event_type = fake.word()
            video_url = fake.url() if fake.boolean() else None
            image = fake.image_url() if fake.boolean() else None
            payment_type = fake.random_element(elements=('pd', 'fr', 'dn'))
            number_of_attendees = fake.random_int(min=1, max=4500)

            event_detail = Detail.objects.create(
                event=event,
                event_type=event_type,
                video_url=video_url,
                image=image,
                number_of_attendees=number_of_attendees,
                payment_type=payment_type
            )

            event_detail.categories.add(category)

            # Add some social media links to the event
            for platform_code, _platform_name in PLATFORM_CHOICES:
                SocialProfile.objects.create(
                    event=event, platform=platform_code, profile_name=fake.user_name()
                )

            # Create dummy data for Privacy
            privacy_type = fake.random_element(elements=('PU', 'PR', 'DR'))
            Privacy.objects.create(event=event, privacy_type=privacy_type)

        self.stdout.write(self.style.SUCCESS(f'Successfully added {total} events'))
