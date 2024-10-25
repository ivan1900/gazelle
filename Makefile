db-permissions:
	sudo chmod 775 docker/mysql -R

docker-build: db-permissions
	docker-compose --env-file ./.env.local -f docker/docker-compose.yml -p "Gazelle" build

run-daemonized: docker-build
	docker-compose --env-file ./.env.local -f docker/docker-compose.yml -p "Gazelle" up -d

dockers-down:
	docker-compose --env-file ./.env.local -f docker/docker-compose.yml -p "Gazelle" down