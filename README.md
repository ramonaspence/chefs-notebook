## Chef's Notebook ##

Welcome! This app was created for users to record their own, original recipes. 

My hope is that this app can bring cooks, mixologists, and maybe even microbiologists together! Okay, maybe not microbiologists, but maybe fermentation enthusiasts.

This project seeks to provide a space for all kinds of recipes to be organized, referred to, shared with others, and even give feedback on.

## Using this App ##

In order to save and view other recipes, we first need to be able to login and create a profile.  

The homescreen will be a form that toggles from Logging in to Registering a new user with the `Login` and `Sign Up` buttons.
The password must be:
    - unique,
    - must be a minimum of 6 characters
    - and can contain a combination of letters, numbers and symbols.

Once registered, you may receive an email for verification; however, this application does not require email verification for any reason so you can disregard that email.

After registering, you will be automatically logged in and redirected to a form to create a profile. Once you've created a profile, you'll be redirected to it. There you'll see a button to create a recipe in the top right-hand corner of your profile.

Go wild!

<small>*Note: As of right now, this project is not in production. There are plans in place to make this happen.*
*In the meantime, the database may not be consistent which may cause the loss of recipes.*</small>

Once you've created your first recipe, it will be listed on your profile. In order to see others' recipes, you can visit the Explore page where all recipes will be listed. You can also visit other users' profiles from this page. 

While on another user's profile, you'll notice a `follow` button underneath their bio. When you follow a user, that user's recipes will now be listed on your Dashboard. That user's profile will also be listed when you click on "Following" on your own profile, and your profile will be listed when you click on "Followers" on that user's profile. 

It also goes that if a user follows you, your profile will now be listed when you click on "Following" on their profile. And again, that user's profile will be listed when you click on "Followers" on your own profile.

If there are any issues while you're navigating the application, don't hesitate to open a new issue in the project's [issue tracker](https://github.com/ramonaspence/chefs-notebook/issues).  

## Contributing ##

If you're a developer and want to contribute to this project, head over to [Contributing.md](https://github.com/ramonaspence/chefs-notebook/blob/main/CONTRIBUTING.md) to learn how.


<details>
<summary><h2>Some Technical Details</h2></summary>

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