from django.http import HttpResponse
from django.shortcuts import render


def detail_view(request, username):
    return render(request, 'home-2.html')
    return HttpResponse('ok')


def edit_profile(request):
    return render(request, 'partners.html')
