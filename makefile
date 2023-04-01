start:
	docker compose up -d

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

di:
	docker compose exec api npm install