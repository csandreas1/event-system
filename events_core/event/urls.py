from django.urls import path

from .views import EventCreateView, EventDeleteView, EventDetailView, EventListView, EventSearchView, EventUpdateView

urlpatterns = [
    # Event Detail Page
    path('<str:slug>/', EventDetailView.as_view(), name='event_detail'),
    # Event Listing Page
    path('list/', EventListView.as_view(), name='event_list'),
    # Event Search Page
    path('search/', EventSearchView.as_view(), name='event_search'),
    path('add/', EventCreateView.as_view(), name='event_create'),
    path('<int:pk>/change/', EventUpdateView.as_view(), name='event_update'),
    path('<int:pk>/delete/', EventDeleteView.as_view(), name='event_delete'),
]
