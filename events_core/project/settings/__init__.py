from split_settings.tools import include
from os import environ
import os.path
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'events_core.project.settings')

ENV = environ.get('DJANGO_ENV')
isDev = ENV == 'dev'

LOCAL_SETTINGS_PATH = BASE_DIR / 'local/settings.dev.py'

base_settings = [
    'common.py',  # standard django settings
    LOCAL_SETTINGS_PATH if isDev else 'environments/prod.py',
]

include(*base_settings)
