start:
	docker compose up -d

up:
	docker compose up
	
stop:
	docker compose stop

down:
	docker compose down

build:
	docker compose build --pull --no-cache

restart:
	docker compose restart

migrate:
	docker compose exec api npx prisma migrate dev

seed:
	docker compose exec api npm run seed