from django.contrib.auth.models import User
from django.shortcuts import render


def detail_view(request, username):
    user = User.objects.select_related('userprofile').get(username=username)

    context = {
        'user': user,
        'profile': user.userprofile,
        'social_profiles': user.userprofile.socialprofile_set.all(),
    }

    return render(request, 'home-8.html', context=context)


def edit_profile(request):
    return render(request, 'partners.html')
