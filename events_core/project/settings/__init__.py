import os.path
from os import environ
from pathlib import Path

from split_settings.tools import include

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'events_core.project.settings')

ENV = environ.get('DJANGO_ENV')
isDev = ENV == 'dev'

LOCAL_SETTINGS_PATH = BASE_DIR / 'local/settings.dev.py'

base_settings = [
    LOCAL_SETTINGS_PATH if isDev else 'environments/prod.py',
    'common.py',  # standard django settings
]

include(*base_settings)
