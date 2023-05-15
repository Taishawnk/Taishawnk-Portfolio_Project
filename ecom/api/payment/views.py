from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.views.decorators.csrf import csrf_exempt
import braintree 

#gring in from brain tree site https://developer.paypal.com/braintree/docs/start/hello-server



gateway = braintree.BraintreeGateway(
    braintree.Configuration(
        braintree.Environment.Sandbox,
        merchant_id="474xpq32ms2m57hy",
        public_key="ryx7jpvvs8yscdpc",
        private_key="c224d9f43fdf8040c014a81745bd1daf"
    )
)



def validate_user_session(id, token):
    UserModel = get_user_model()


    try:
        user = UserModel.objects.get(pk=id)
        if user.session_token == token:
            return True
        return False
    except UserModel.DoesNotExist:
        return False

@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse('error', 'invalid session, please login again')
    return JsonResponse({'clientToken': gateway.client_token.generate(), 'success': True})



@csrf_exempt
def transaction(request, id , token ):
    if not validate_user_session(id, token):
        return JsonResponse('error', 'invalid session, please login again')
    nonce_from_the_client = request.POST["paymentMethodNonce"]
    amount_from_the_client = request.POST["paymentMethodNonce"]

    result = gateway.transaction.sale({
    "amount": amount_from_the_client,
    "payment_method_nonce": nonce_from_the_client,
    "options": {
      "submit_for_settlement": True
    }
})
# this is a test 
    if result.is_success:                  #is_success is what is returned from brain tree
        return JsonResponse({
            "success": result.is_success, 'transaction':{'id': result.transaction.id, 'amount': result.transaction.amount}
        })
    else:
        return JsonResponse({'error': True, 'success': False})