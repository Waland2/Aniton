# Aniton

A full-stack Telegram Mini App game.

## Tech Stack

| Area           | Technologies                                                |
| -------------- | ----------------------------------------------------------- |
| Frontend       | React 18, Vite                                              |
| Backend        | Django, Django REST Framework                               |
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

```bash
cd backend
pip install -r requirements.txt
cd aniton
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Production Deployment

### Deployment
```
1) create and edit .env.prod file
2) edit nginx/default.conf
3) docker compose --env-file .env.prod build
4) docker compose up -d
5) get ssl certificates:
docker compose run --rm certbot certonly --webroot \
  --webroot-path=/var/www/certbot \
  --email <email> --agree-tos --no-eff-email \
  -d <domain> -d <...>
6) restart nginx container:
docker compose restart nginx
```

### Certificate auto renew
```bash
0 3 * * * docker compose run --rm certbot renew --webroot -w /var/www/certbot --quiet && docker kill -s HUP aniton_nginx
```

## License
This project is licensed under the [MIT License](LICENSE.md).

