DEBUG = True

# Raises django's ImproperlyConfigured exception if SECRET_KEY not in os.environ
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-@qh1-(7e=(7jhapy#twgd+z60en4a@3!(2cb_si&71(t$wl%iy'

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'events_core',
        'USER': 'user',
        'PASSWORD': 'user',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

# https://docs.djangoproject.com/en/dev/topics/cache/#redis

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.redis.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379',
    }
}

# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Athens'

USE_I18N = True

USE_TZ = True

# nginx url
STATIC_URL = 'http://localhost/static/'
