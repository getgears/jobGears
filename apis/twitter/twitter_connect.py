# -*- coding: utf-8 -*-
#       code developed by getGears - Dec 2009       
#       Developer: André da Palma, I.T. Engineer

# Django framework include
from django.http import *
from django.conf import settings
from django.shortcuts import render_to_response


# Other needed imports 
from oauth import oauth
import httplib
import simplejson
import time
import datetime
import urllib

# import for static CV generation
from jobgears.publisher.html import generateHtml


# import for Django gettext translation API
from django.utils.translation import gettext as _

#SERVER = getattr(settings, 'OAUTH_SERVER', 'twitter.com')
SERVER = 'twitter.com'
#REQUEST_TOKEN_URL = getattr(settings, 'OAUTH_REQUEST_TOKEN_URL', 'https://%s/oauth/request_token' % SERVER)
REQUEST_TOKEN_URL = 'https://twitter.com/oauth/request_token'
#ACCESS_TOKEN_URL = getattr(settings, 'OAUTH_ACCESS_TOKEN_URL', 'https://%s/oauth/access_token' % SERVER)
ACCESS_TOKEN_URL = 'https://twitter.com/oauth/access_token'
#AUTHORIZATION_URL = getattr(settings, 'OAUTH_AUTHORIZATION_URL', 'http://%s/oauth/authorize' % SERVER)
AUTHORIZATION_URL = 'https://twitter.com/oauth/authorize'
#CONSUMER_KEY = getattr(settings, 'CONSUMER_KEY', 'X4wUL2NArDq1ROfFcw')
CONSUMER_KEY = 'X4wUL2NArDq1ROfFcw'
#CONSUMER_SECRET = getattr(settings, 'CONSUMER_SECRET', 'fqONOOjACwtqY9durtNF4BDPZsj7V3qitXAzMNEe0FA')
CONSUMER_SECRET = 'fqONOOjACwtqY9durtNF4BDPZsj7V3qitXAzMNEe0FA'


TWITTER_CHECK_AUTH = 'https://twitter.com/account/verify_credentials.json'
#TWITTER_FRIENDS = 'https://twitter.com/statuses/friends.json'
TWITTER_STATUS_UPDATE = 'http://twitter.com/statuses/update.json'




connection = httplib.HTTPSConnection(SERVER)
consumer = oauth.OAuthConsumer(CONSUMER_KEY, CONSUMER_SECRET)
signature_method = oauth.OAuthSignatureMethod_HMAC_SHA1()








def fetch_response(oauth_request, connection):
    url = oauth_request.to_url()
    connection.request(oauth_request.http_method,url)
    response = connection.getresponse()
    s = response.read()
    return s

##############################################################################################
#   Authentication Verifying
##############################################################################################


def is_authenticated(access_token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer,token=access_token,http_url=TWITTER_CHECK_AUTH,parameters=None,)
    oauth_request.sign_request(signature_method, consumer, access_token)
    json = fetch_response(oauth_request, connection)
    if 'screen_name' in json:
        return json
    return False


################################################################################################
#   Beggining of Twitter authentication 
################################################################################################
def get_unauthorised_request_token():
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, http_url=REQUEST_TOKEN_URL)
    oauth_request.sign_request(signature_method, consumer, None)
    resp = fetch_response(oauth_request, connection)
    token = oauth.OAuthToken.from_string(resp)
    return token


def get_authorisation_url(token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, token=token, http_url=AUTHORIZATION_URL)
    oauth_request.sign_request(signature_method, consumer, token)
    return oauth_request.to_url()


def get_authorize(request):
    token = get_unauthorised_request_token()
    auth_url = get_authorisation_url(token)
    request.session['unauthed_token'] = {}
    request.session['unauthed_token'] = token.to_string()   
    return auth_url



###############################################################################
#       After Authentification, Twitter send the user back to the callbackURL
###############################################################################

def exchange_request_token_for_access_token(request_token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, token=request_token, http_url=ACCESS_TOKEN_URL)
    oauth_request.sign_request(signature_method, consumer, request_token)
    resp = fetch_response(oauth_request, connection)
    return oauth.OAuthToken.from_string(resp) 


def connected(request):
    #return render_to_response('twitter/twitter_connect.html')
    unauthed_token = request.session.get('unauthed_token', None)
    if not unauthed_token:
        return HttpResponse("No un-authed token cookie")
    token = oauth.OAuthToken.from_string(unauthed_token)   
    if token.key != request.GET.get('oauth_token', 'no-token'):
        return HttpResponse("Something went wrong! Tokens do not match")
    access_token = exchange_request_token_for_access_token(token)
    request.session['access_token'] = access_token.to_string()
    return render_to_response('twitter/twitter_connect.html')



#################################################################################
#       Twitter Update
#################################################################################

def update_status(request):
    try:
        access_token = request.session['access_token']
        token = oauth.OAuthToken.from_string(access_token)
        json = is_authenticated(token)
        if json:
            creds = simplejson.loads(json)
            twitter_screen_name = creds.get('screen_name',creds['name'])
            file_name = generateHtml(request)
            response = {}
            response['auth'] = 1
            response['message'] = _("actualizou o seu curriculo em")
            response['jobgearscv'] = '%s/p/%s' % (settings.ROOT_URL, file_name,)
            response['image'] = '%s/images/gears3.png' % (settings.ROOT_URL)
            response['twitterScreenName'] = twitter_screen_name
            return HttpResponse(simplejson.dumps(response))

        else:
            response = {}
            response['auth'] = 0
            response['url'] = get_authorize(request)
            return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}                                         
        response['auth'] = 0
        response['url'] = get_authorize(request)
        return HttpResponse(simplejson.dumps(response))


#access_token = request.session['access_token']
#token = oauth.OAuthToken.from_string(access_token)


def send_status_to_twitter(request):
    try:
        access_token = oauth.OAuthToken.from_string(request.session['access_token'])   
        if is_authenticated(access_token):
            twitter_status = {}
            twitter_status['status'] = urllib.quote(request.GET['status'])
            oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer,token=access_token,http_method='POST',http_url=TWITTER_STATUS_UPDATE,parameters={'status':'andre'},)
            oauth_request.sign_request(signature_method, consumer, None)

            return HttpResponse(1)
        
        else:
            return HttpResponse('fail')

    except KeyError:
        return HttpResponse('fail')
