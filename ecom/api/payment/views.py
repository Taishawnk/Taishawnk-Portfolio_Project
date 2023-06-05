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
        merchant_id="fxvwrk6dckmjy88z",
        public_key="bz2f8zy99w5f5473",
        private_key="06b1670cb5e23e29d75db5133a0f6274"
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

from django.http import JsonResponse



@csrf_exempt
def generate_token(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'invalid session, please login again'}, safe=False)
    return JsonResponse({'clientToken': gateway.client_token.generate(), 'success': True})



@csrf_exempt
def transaction(request, id, token):
    if not validate_user_session(id, token):
        return JsonResponse({'error': 'Invalid session, please login again'}, safe=False)

    nonce_from_the_client = request.POST.get('paymentMethodNonce')
    amount_from_the_client = request.POST.get('amount')

    result = gateway.transaction.sale({
        'amount': amount_from_the_client,
        'payment_method_nonce': nonce_from_the_client,
        'options': {
            'submit_for_settlement': True
        }
    })

    if result.is_success:
        return JsonResponse({
            'success': result.is_success,
            'transaction': {'id': result.transaction.id, 'amount': result.transaction.amount}
        })
    else:
        return JsonResponse({'error': True, 'success': False})
