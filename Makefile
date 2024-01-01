.PHONY: install-pre-commit lint install runserver migrate superuser shell

RUN_MANAGE_PY = poetry run python3 -m events_core.manage

install-pre-commit:
	poetry run pre-commit uninstall; poetry run pre-commit install

lint:
	git add .;poetry run pre-commit run --all-files

install:
	poetry install

runserver:
	DJANGO_ENV=dev $(RUN_MANAGE_PY) runserver

.PHONY: collect-static
collect-static:
	$(RUN_MANAGE_PY) collectstatic

migrations:
	$(RUN_MANAGE_PY) makemigrations

migrate:
	$(RUN_MANAGE_PY) migrate

superuser:
	$(RUN_MANAGE_PY) createsuperuser

.PHONY: app
app:
	$(RUN_MANAGE_PY) startapp $(name)

shell:
	$(RUN_MANAGE_PY) shell

.PHONY: env-file
env-file:
	test -f .env || touch .env

.PHONY: up-containers
up-containers:
	docker compose up -d

.PHONY: kill
kill:
	pkill -f docker-pr

clear-containers:
	docker compose -f docker-compose.dev.yml down; docker system prune --all && docker volume prune && docker network prune;

.PHONY: pull-dev-containers
pull-containers:
	docker compose -f docker-compose.dev.yml pull

.PHONY: flower
flower:
	poetry run python -m celery -A dropshipping_core flower

.PHONY: celery-worker
celery-worker:
	poetry run python -m celery -A dropshipping_core worker -l info

.PHONY: dummy
dummy:
	poetry run python3 -m events_core.manage EventDummy

.PHONY: update
update: install migrate install-pre-commit ;