# -*- coding: utf-8 -*-
#       code developed by getGears - Dec 2009       
#       Developer: André da Palma, I.T. Engineer


# Django framework include
from django.http import *
from django.conf import settings
from django.shortcuts import render_to_response


# Other needed imports 
import oauth
import httplib
import simplejson
import time
import datetime



SERVER = getattr(settings, 'OAUTH_SERVER', 'twitter.com')
REQUEST_TOKEN_URL = getattr(settings, 'OAUTH_REQUEST_TOKEN_URL', 'https://%s/oauth/request_token' % SERVER)
ACCESS_TOKEN_URL = getattr(settings, 'OAUTH_ACCESS_TOKEN_URL', 'https://%s/oauth/access_token' % SERVER)
AUTHORIZATION_URL = getattr(settings, 'OAUTH_AUTHORIZATION_URL', 'http://%s/oauth/authorize' % SERVER)

CONSUMER_KEY = getattr(settings, 'CONSUMER_KEY', 'X4wUL2NArDq1ROfFcw')
CONSUMER_SECRET = getattr(settings, 'CONSUMER_SECRET', 'fqONOOjACwtqY9durtNF4BDPZsj7V3qitXAzMNEe0FA')



def get_unauthorised_request_token():
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, http_url=REQUEST_TOKEN_URL)
    oauth_request.sign_request(signature_method, consumer, None)
    resp = fetch_response(oauth_request, connection)
    token = oauth.OAuthToken.from_string(resp)
    return token


def get_authorisation_url(token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(
        consumer, token=token, http_url=AUTHORIZATION_URL
    )
    oauth_request.sign_request(signature_method, consumer, token)
    return oauth_request.to_url()



def auth(request):
    token = get_unauthorised_request_token()
    return HttpResponse(token)
    #auth_url = get_authorisation_url(token)
    #response = HttpResponseRedirect(auth_url)
    #request.session['unauthed_token'] = token.to_string()   
    #return response

