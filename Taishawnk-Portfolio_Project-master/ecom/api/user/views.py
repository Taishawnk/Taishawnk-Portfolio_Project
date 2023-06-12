from rest_framework import viewsets
from rest_framework.permissions  import AllowAny
from .serializers import UserSerializer #serializers package and unpackage the data  on both sides of the server 
from .models import CustomUser
from django.http import JsonResponse
from django.contrib.auth import get_user_model

from django.views.decorators.csrf import csrf_exempt#makes a exception here for cross site request forgery( CSRF) that is part of django by default
#decorators are used when you want to make a change in a file that is somewhere else but we dont want to go there and make the change we want to make it form here 
from  django.contrib.auth import login, logout
import re #allows us to uses regex \b[\w\.-]+@[\w\.-]+\.\w{2,4}\b
import random

#django frame work dose not generate default session tokens it normal auth system is diffrent so the way we can generate a token is through our own custom logic and as log as the token is 
#active in the database for a user we will consider that user as logged in if the user signs out we will delete the token from the backend


#chr() takes an integer Unicode code point and returns the corresponding character.

# SystemRandom is a class in the random module that uses the system's underlying source of randomness to generate random numbers. It's considered to be more secure than the random


def  generate_session_token(length=10): # keeps the length at 10 can adjust if needed
    return ''.join(random.SystemRandom().choice([chr(i) for i in range(97, 123)] + [str(i) for i in range(10)]) for _ in range(length))
# This line of code returns a string of characters that are randomly selected from a set of lowercase letters (a-z) and numbers (0-9). Here's a breakdown of how it works:

# random.SystemRandom() creates an instance of the SystemRandom class from the random module. This class provides a more secure source of randomness than the default random module.

# .choice([char(i) for i in range(97, 123)]) selects a random lowercase letter from the set of lowercase letters a-z. This is done using a list comprehension that creates a list of all lowercase letters, where each letter is represented by its corresponding ASCII code. The choice() method of the SystemRandom instance then selects a random letter from this list.

# + [str(i) for i in range(10)] concatenates the list of lowercase letters with a list of numbers 0-9. This is done using another list comprehension that creates a list of strings representing the numbers 0-9.

# for _ in range(length) repeats steps 2 and 3 length number of times. The _ variable is used as a placeholder for a value that we don't care about in the loop.

# ''.join() joins all of the randomly selected characters together into a single string. The empty string '' is used as the separator between the characters.

# So when you call generate_session_token(), you'll get a string of length (default 10) randomly selected characters that includes lowercase letters and numbers.


@csrf_exempt #using a decorator to make our programm CSRF eximpt


def signin(request):
    if not request.method == 'POST':
        return JsonResponse({'error': 'send a post request with valid paramenters only'})# says hey only post methods are accepted on this particuler route
    
    username = request.POST['email'] #extract user name and password for Post
    password = request.POST['password']

    #sanitiztion of data validation 
   
    if not re.match("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?", username):# saying if its not regex then it should be matched to username
        return JsonResponse({'error' : 'enter a valid email'})

    # if len(password) < 3:
    #     return JsonResponse({'error', 'Enter a valid password must be more then 3 char long'})
    if not re.match("((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})", password): #pay alot of attention here this migh error but the way I did it hopfully not
        return JsonResponse({'error' : 'Ensure that password is 8 to 64 characters long and contains a mix of upper and lower case characters, one numeric and one special character'})
    
    #grab user model
    UserModel = get_user_model() # this is where we need our @csrf_exempt while also grabbing the muser model and matching it  and match its password and other attributes 
    try:
        user = UserModel.objects.get(email=username) 
        if user.check_password(password): #check_password is a built in Django method, checks if the password provided by the user matches the password stored in the database for the fetched user object.
            usr_dict = UserModel.objects.filter(email=username).values().first()#filter by email which is = to username because we are using email as our username see line 47 and 52 then grab the values from that email
            usr_dict.pop('password') # we pop of the password because we dont want to travel further on the front end 

            if user.session_token != '0': #checks to see if the user is not logged in
                user.session_token = '0' #sets to 0 to be logged in so if he is not logged in he will be now 
                user.save()
                return JsonResponse({'error': 'Previouse session exists!'})
            
            token = generate_session_token()
            user.session_token = token 
            user.save()
            login(request, user)
            return JsonResponse({'token': token, 'user' : usr_dict})
        else:
            return JsonResponse({'error': 'Invalid password'})
        

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid email'}) #invalid email because the model is automaticly based aroung the username aka email in our project 
#sign  out below
def signout(request, id):
    logout(request)

    UserModel = get_user_model()

    try:
        user = UserModel.objects.get(pk=id)
        user.session_token = "0"
        user.save()

    except UserModel.DoesNotExist:
        return JsonResponse({'error': 'Invalid user ID'})

    return JsonResponse({'success': 'Logout success'})  

class UserViewSet(viewsets.ModelViewSet):
    permission_classes_by_action = {'create': [AllowAny]} # can add additonal premission values to this list as needed  

    queryset = CustomUser.objects.all().order_by('id')
    serializer_class = UserSerializer

#seting / getting permisiions 
    def get_permissions(self): #permission also help make sure someone can just set themself as a super user in an app like post man
        try:
            return [permission() for permission in self.permission_classes_by_action[self.action]]
        except KeyError:
            return [permission() for permission in self.permission_classes]
        
# When a user signs in, the code checks if the user has an active session token. If the user does not have an active session token, the code generates a new session token using the generate_session_token() function, assigns it to the user, and logs the user in by calling the login() function. If the user already has an active session token, the code sets the session token to 0 and returns an error message indicating that a previous session exists.

# When a user signs out, the code simply sets the session token to 0, which means that the user is no longer authenticated. The session token is used to identify the user across multiple requests and sessions, and as long as the session token is active in the database for a user, the user is considered to be logged in.


