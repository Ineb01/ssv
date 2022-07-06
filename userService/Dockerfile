# syntax=docker/dockerfile:1
FROM python:3
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt
COPY . /code/
ENTRYPOINT ["/bin/sh", "-c" , "python manage.py makemigrations && python manage.py migrate && python manage.py init_user && python manage.py runserver 0.0.0.0:8081"]