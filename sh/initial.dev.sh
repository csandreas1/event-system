set -e  # Exit immediately if any command fails

mkdir -p local
mkdir -p log
cp events_core/project/settings/environments/dev_template.py ./local/settings.dev.py

bash ./reset.sh