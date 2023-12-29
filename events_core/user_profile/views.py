from django.http import HttpResponse


def detail_view(request):
    return HttpResponse('ok')


def edit_profile(request):
    return HttpResponse('ok')
