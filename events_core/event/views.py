from django.shortcuts import render
from django.views import View

from .models.event import *


class EventDetailView(View):

    def get(self, request, slug):
        event = Event.objects.get(slug=slug)

        return render(request, 'event/event_detail.html', {'event': event})


class EventListView(View):

    def get(self, request):
        events = Event.objects.all()
        return render(request, 'events/event_list.html', {'events': events})


class EventSearchView(View):

    def get(self, request):
        # Your search logic here
        # You can access search parameters using request.GET.get('parameter_name')
        # Perform search and get a list of events
        events = Event.objects.filter(name__icontains=request.GET.get('query', ''))
        return render(request, 'events/event_search.html', {'events': events})


class EventCreateView(View):
    template_name = 'events/event_form.html'

    def get(self, request):
        pass
        # form = EventForm()
        # return render(request, self.template_name, {'form': form})

    def post(self, request):
        pass
        # form = EventForm(request.POST)
        # if form.is_valid():
        #     form.save()
        #     return redirect('event_list')
        # return render(request, self.template_name, {'form': form})


class EventUpdateView(View):
    template_name = 'events/event_form.html'

    def get(self, request, pk):
        pass
        # event = get_object_or_404(Event, pk=pk)
        # form = EventForm(instance=event)
        # return render(request, self.template_name, {'form': form})

    def post(self, request, pk):
        pass
        # event = get_object_or_404(Event, pk=pk)
        # form = EventForm(request.POST, instance=event)
        # if form.is_valid():
        #     form.save()
        #     return redirect('event_list')
        # return render(request, self.template_name, {'form': form})


class EventDeleteView(View):
    template_name = 'events/event_confirm_delete.html'

    def get(self, request, pk):
        pass
        # event = get_object_or_404(Event, pk=pk)
        # return render(request, self.template_name, {'event': event})

    def post(self, request, pk):
        pass
        # event = get_object_or_404(Event, pk=pk)
        # event.delete()
        # return redirect('event_list')
