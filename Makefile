delete-folder:
	rm -rf data

stop-docker:
	docker-compose down

start-db:
	docker-compose up -d

all-delete: delete-folder stop-docker