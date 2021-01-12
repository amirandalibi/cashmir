.PHONY: up down

up:
	docker-compose \
		--file docker-compose.yml \
		$@ --build --detach --remove-orphans
	@echo "🤑 cashmir is running on http://localhost:8000"

down:
	docker-compose down
