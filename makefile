start:
	docker compose up -d

stop:
	docker compose stop

down:
	docker compose down

restart:
	docker compose restart

migrate:
	docker compose exec api npx prisma migrate dev

seed:
	docker compose exec api npm run seed