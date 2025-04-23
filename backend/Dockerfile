FROM python:3.10.12

COPY /aniton /app

COPY requirements.txt /app

# COPY entrypoint.sh /app

WORKDIR /app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

# CMD ["bash", "test.sh"]
## CMD ["python3", "manage.py", "makemigrations", "&&", "python3", "manage.py", "migrate", "&&", "python3", "manage.py", "runserver", "0.0.0.0:8000"]
