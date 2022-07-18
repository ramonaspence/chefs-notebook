## Chef's Notebook ##

Welcome! This app was created for users to record their own, original recipes. 

My hope is that this app can bring cooks, mixologists, and maybe even microbiologists together! Okay, maybe not microbiologists, but maybe fermentation enthusiasts.

This project seeks to provide a space for all kinds of recipes to be organized, refered to, shared with others, and even receive feedback.

## Using this App ##

In order to save recipes and view other recipes, we first need to be able to login and create a profile.  

The homescreen will be a form that toggles from Logging in to Registering a new user.
The password must be:
    - unique,
    - contain a combination of letters, numbers and symbols,
    - and must be a minimum of 6 characters

Once registered, you may receive an email for verification, however, this application does not require email verification for any reason.

After registering, you will be automatically logged in and redirected to a form to create a profile. Once you've created a profile, you'll be redirect to your profile. There you'll see in the top right corner of your profile a button to create a recipe!

Now that that's out of the way, you can begin creating a recipe. 

**Note:** As of right now, this project is not in production. There are plans in place to make this happen.  
In the meantime, the database may not be consistent which may cause the loss of recipes.
<h2>Setting Up Development Environment</h2>
In order to work with this application as a developer, there are a few environment variables that we need to set. I've broken them down by what you need to work in certain parts of the application. 


<details>
<summary><h2>Technologies and Dependencies</h2></summary>

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