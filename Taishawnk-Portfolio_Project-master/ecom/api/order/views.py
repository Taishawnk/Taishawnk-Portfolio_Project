from rest_framework import viewsets
from django.http import JsonResponse
from django.contrib.auth import get_user_model
from .serializers import OrderSerializer
from .models import Order
from django.views.decorators.csrf import csrf_exempt


def validate_user_session(id, token): #bring in Id and token
    UserModel = get_user_model()
    try:
        user = UserModel.objects.get(pk=id)#use the id of the user to grab its objects 
        if user.session_token == token: #if the users active session token matches then they are athenticated 
            return True
        return False #always going to return false unless token matches 
    except UserModel.DoesNotExist:
        return False



@csrf_exempt
def add(request, id, token ): #request is a Post Request, then we grab id and token
    if not validate_user_session(id, token): #validate athentication based on the id and token 
        return JsonResponse({'error':'please login', 'code':'500'})
    if request.method == 'POST': # the method is Post then we collect everything mentioned in our model
        user_id = id
        transaction_id = request.POST['transaction_id']
        amount = request.POST['amount']
        products = request.POST['product'] 
        total_product = len(products.split(',')[:-1])
        
        UserModel = get_user_model()

        try:# if the user dose exist do
            user: UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return JsonResponse({'error': 'User dose not exist'})


        order = Order(user=user, product_names=products, total_amount=amount , transactions = transaction_id, total_product=total_product)
        order.save()
        return JsonResponse({'success':True, 'error': False, 'msg':'order placed sucessfully'})
    
class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all().order_by('id')
    serializer_class = OrderSerializer 