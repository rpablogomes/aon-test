FROM python:3.9-alpine

WORKDIR /app

COPY ./requirements.txt /requirements.txt
RUN pip3 install -r /requirements.txt

COPY . /app

EXPOSE 8000