import os
import logging
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

from clarifai.rest import ClarifaiApp

app = ClarifaiApp(api_key = CLARIFAI_API_KEY)



class IndexView(View):
    """
    Serves the compiled frontend entry point (only works if you have run `npm
    run build`).
    """

    app = ClarifaiApp()
    model = app.public_models.food_model
    response = model.predict_by_url('https://www.crowdedkitchen.com/wp-content/uploads/2019/06/Vegan-Pizza-with-cauliflower-crust-11.jpg')

    concepts = response['outputs'][0]['data']['concepts']
    for concept in concepts:
        print(concept['name'], concept['value']) ##prints concepts' name and value(probability) in terminal console.


    def get(self, request, *args, **kwargs):
        try:
            with open(os.path.join(settings.REACT_APP_DIR, 'build', 'index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            logging.exception('Production build of app not found')
            return HttpResponse(
                """
                This URL is only used when you have built the production
                version of the app. Visit http://localhost:3000/ instead, or
                run `npm run build` to test the production version.
                """,
                status=501,
            )
