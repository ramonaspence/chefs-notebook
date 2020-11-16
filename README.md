## The Chef's Notebook ##


## The purpose of this app is:

First and foremost, this app should bring cooks, mixologists, and maybe even microbiologists together! Okay, maybe not microbiologists, but maybe fermentation enthusiasts.

This app is meant to be a place to keep records organized, making it easy to refer to, share with others, and even receive feedback on.

## Tools used for this application:
* The front-end is built in React
* The back-end is built in Django
* with a restful API built in Django_Rest_Framework
* AWS3 Buckets is used to upload and store images for this application


## Libraries used for this application:
* Bootstrap3 is used for formatting and styling
* Axios is used making calls to API's
* MomentJS is used for formatting datetimes
* React-Router-Dom is used for easier navigation and redirecting
* Django-Filters is used to filter queries, that is more like a 'search' function to the user
* Pillow has been used for image uploads
* gunicorn and whitenoise is used for the application to be deployed via Heroku.com


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
