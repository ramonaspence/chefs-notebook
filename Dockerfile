FROM  python:3.8.13-bullseye

ENV PYTHONUNBUFFERED=1

WORKDIR /

COPY Pipfile /

COPY Pipfile.lock /

RUN pip install pipenv

RUN pipenv install --deploy --ignore-pipfile

COPY . ./

EXPOSE 8000