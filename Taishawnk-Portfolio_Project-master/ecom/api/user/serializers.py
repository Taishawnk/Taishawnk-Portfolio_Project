from rest_framework import serializers
from django.contrib.auth.hashers import make_password #this allows you to bring in passowrd in plain  text and hash it out aka making it unreadable for any users that are not yourself
from rest_framework.decorators import authentication_classes, permission_classes # if user is authenticated we send them permissions
from .models import CustomUser

class UserSerializer(serializers.HyperlinkedModelSerializer):

    def create(self, validated_data):
        password = validated_data.pop('password', None)# dont want to do anything further outside of poping off the password
        instance = self.Meta.model(**validated_data)#intence interacts with the model and saves based on the model and is generated through interation of our meta  class
        #we are grabbing password from our Meta class model as password was never something we added to our models.py file for user the resone we didnt do it there is because we dont want the 
        #password to be visible 

        # because we are handeling sanitization of the passord aka hidding the password in our django views it is ok for us to save password directly to the database for now as follows
        if password is not None:#might need to change this to (is not None) making sure password is not empy before saving
            instance.set_password(password)
        instance.save()#save the instance
        return instance #return the instance

    def update(self, instance, validated_data):#the reason we are grabbing instance in our update section is because we already determind which instance needs updating in the update section
        for attr, value in validated_data.items(): #atter is key of password value is the password value itself
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)#this is our check 
        instance.save()#saves the instance
        return instance
#Notes  
# The update method takes in self, instance, and validated_data as parameters.

# instance is the object that needs to be updated in the database.

# validated_data is a dictionary containing the updated data for the instance.

# The for loop iterates through the validated_data dictionary to update the instance fields.

# attr is the key of the updated field, and value is the updated value of the field.

# The if statement checks if the updated field is the password field.

# If the updated field is password, then the set_password() method is called on the instance object, which hashes the password and saves it securely in the database.

# If the updated field is not the password field, then the setattr() function is called to update the instance field with the new value.

# After updating the instance object, the instance.save() method is called to save the updated object to the database.

# Finally, the updated instance object is returned.       
    class Meta:
        model = CustomUser
        extra_kwargs = {'password': {'write_only': True }}# Write only permissions we dont want people to be able to view password this is the point where you can add add extra parameters that you want added or modifyed to the database i if we want the functionality yo update/edit password
        fields = ("name", "email","password","phone", "gender", "country", "state", 
                  "is_active", "is_staff", 'is_superuser' )
        #feilds brought in from abstract user class   "is_active", "is_staff," 'is_superuser' can be see stock on the django admin panel and by stock i mean they come standerd with every new 
        #django project


        #@  decorators allows you to write or add some things into pre written code without making changes to the code 