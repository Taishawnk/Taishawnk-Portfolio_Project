from django.http import JsonResponse

def home(request):
    return JsonResponse({'info': 'Django Prject', 'name':'Taishawn King'})