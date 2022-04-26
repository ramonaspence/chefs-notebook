## The Chef's Notebook ##


## The purpose of this app is:

First and foremost, this app should bring cooks, mixologists, and maybe even microbiologists together! Okay, maybe not microbiologists, but maybe fermentation enthusiasts.

This app is meant to be a place to keep records organized, making it easy to refer to, share with others, and even receive feedback on.

<details>
## Technologies used for this application:
* React
* Django
* Django-Rest
* Heroku

## Requirements 
* Django==3.1.3
* Python==3.7.6


## Dependencies used for this application
# Django
* gunicorn
* whitenoise
* pillow
* dj-database-url
* psycopg2-binary
* django-filter
* django-allauth
* dj-rest-auth
* djangorestframework-simplejwt
* django-cors-headers
* clarifai

# React
* axios
* bootstrap
* jquery
* momentjs
* popperjs
* react-dom
* react-router-dom
* react-google-login


## API's used for this application:
## Clarifai -
* is an API that is used for automated tagging of images.
* It's an AI driven API that has built-in models to bring back 'concepts'
* that it finds inside of the image.
* In this case, that model is a Food_Model, and the 'concepts' that are brought back
* are ingredients and flavors.

* This API is used to add tags to a Recipe, according to its image
* so that they can be easily filtered in the application.

## Django Restful API
* A restful API has been created through django_rest_framework
* wherein most data for the app is saved and stored.
</details>