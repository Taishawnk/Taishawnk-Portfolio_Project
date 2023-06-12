from django.http import JsonResponse

def home(request):
    return JsonResponse({'info': 'Django Project', 'name':'Taishawn King'})