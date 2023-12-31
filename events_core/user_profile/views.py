from django.http import HttpResponse
from django.shortcuts import render


def detail_view(request):
    return HttpResponse('ok')


def edit_profile(request):
    return render(request, 'index.html')
