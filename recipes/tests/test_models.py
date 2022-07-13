from rest_framework.test import APITestCase
from rest_framework.authtoken.models import Token

from recipes.models import Recipe, Tag, Comment

   
class RecipeTestCase(APITestCase):
    
    def test_str_returns_title(self):
        recipe = Recipe.objects.create(title = "new_title", description = "description",
                  ingredients = ['ingredients'], instructions = ['instructions'])
        self.assertEqual(str(recipe), "new_title")
        

class TagTestCase(APITestCase):
    
    def test_str_returns_name(self):
        tag = Tag.objects.create(name="pizza")
        self.assertEqual(str(tag), "pizza")
        
    
class CommentTestCase(APITestCase):
    
    def test_str_returns_first_six_characters_of_comment_body(self):
        comment = Comment.objects.create(body="This is a test comment")
        self.assertEqual(str(comment), "This ")