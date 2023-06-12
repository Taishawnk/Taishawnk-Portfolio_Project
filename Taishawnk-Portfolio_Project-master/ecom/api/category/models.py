from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True) #auto now add is only for created at 
    updated_at = models.DateTimeField(auto_now=True)



# instead of our catagories populating in the admin dash board as cat1 catagory2 so on we can add this string constructor so that it populates with the catagories name

    def __str__(self):
        return self.name #maake sure this sits inside the class or this will not work
