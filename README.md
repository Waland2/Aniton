# Aniton

A full-stack Telegram Mini App game.

## Tech Stack

| Area           | Technologies                                                |
| -------------- | ----------------------------------------------------------- |
| Frontend       | React 18, Vite                                              |
| Backend        | Django REST Framework                                       |
| Database       | MySQL 8, Redis 7                                            |
| Infrastructure | Docker, Docker Compose, Nginx                               |

## Screenshots

<p align="center">
  <img src="./frontend/public/Screenshot_1.png" width="200">
  <img src="./frontend/public/Screenshot_2.png" width="200">
  <img src="./frontend/public/Screenshot_3.png" width="200">
</p>

<p align="center">
  <img src="./frontend/public/Screenshot_4.png" width="200">
  <img src="./frontend/public/Screenshot_5.png" width="200">
  <img src="./frontend/public/Screenshot_6.png" width="200">
</p>


## Quick Start (Local)

### Backend

1. Install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

2. Run migrations:

```bash
cd aniton
python manage.py migrate
```

3. Start development server:

```bash
python manage.py runserver 0.0.0.0:8000
```

### Frontend

Install dependencies and start dev server:

```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### Deployment

1. Create and edit `.env.prod` (see `.env.example`)
2. Edit `nginx/default.conf`
3. Build and start containers:

```bash
docker compose --env-file .env.prod up -d --build
```

4. Get SSL certificates:

```bash
docker compose run --rm certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email <email> --agree-tos --no-eff-email \
  -d <domain> -d <...>
```

5. Restart nginx container:

```bash
docker compose restart nginx
```

6) Create super user and load fixtures:

```bash
docker exec -it aniton_backend python manage.py createsuperuser
docker exec -it aniton_backend python manage.py loaddata fixtures/data.json
```

### Certificate renew

```bash
docker compose run --rm certbot renew --webroot -w /var/www/certbot --quiet && docker kill -s HUP aniton_nginx
```

## License
This project is licensed under the [MIT License](LICENSE.md).

