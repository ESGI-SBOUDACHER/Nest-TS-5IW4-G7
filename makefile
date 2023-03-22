start:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down

migrate:
	docker compose exec api npx prisma migrate dev

