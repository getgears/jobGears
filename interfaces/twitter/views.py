# -*- coding: utf-8 -*-
#       code developed by getGears - Dec 2009       
#       Developer: André da Palma, I.T. Engineer

# Django framework include
from django.http import *
from django.conf import settings
from django.shortcuts import render_to_response

# Other needed imports 
import simplejson
import time
import datetime
import urllib

# import for static CV generation
#from jobgears.publisher.html import generateHtml

# import for Django gettext translation API
from django.utils.translation import gettext as _


#from jobgears.interfaces.twitter.settings import *

from jobgears.helpers import *

##############################################################################################
#       Utils
##############################################################################################

def fetch_response(oauth_request, connection):
    url = oauth_request.to_url()
    connection.request(oauth_request.http_method,url)
    response = connection.getresponse()
    s = response.read()
    return s

##############################################################################################
#   Authentication Verifying
##############################################################################################

# is_authenticated method verifies if an access_token is still valid
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

#get_authorisation_url generate and return authURL
def get_authorisation_url(token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, token=token, http_url=AUTHORIZATION_URL)
    oauth_request.sign_request(signature_method, consumer, token)
    return oauth_request.to_url()

# get_authorize method return's an authentication URL for browser redirection
def get_authorize(request):
    token = get_unauthorised_request_token()
    auth_url = get_authorisation_url(token)
    request.session['unauthed_token'] = {}
    request.session['unauthed_token'] = token.to_string()   
    return auth_url



###############################################################################
#       After Authentification, Twitter send the user back to the callbackURL
###############################################################################

# exchange method exchange request_token for an access_token
def exchange_request_token_for_access_token(request_token):
    oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer, token=request_token, http_url=ACCESS_TOKEN_URL)
    oauth_request.sign_request(signature_method, consumer, request_token)
    resp = fetch_response(oauth_request, connection)
    return oauth.OAuthToken.from_string(resp) 


# connected method it's the callback method
def connected(request):
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

# update_status method generate static html and sends back to the frontend the pre-update-message
@json_response
def update_status(request):
    response = dict()
    #response['auth'] = '0'
    #response['url'] = 'http://www.twitter.com'
    #return response

    response['auth'] = 1
    response['jobgearscv'] = 'http://dev.jobgears.net/p/kjdghkjsdhflkh.htm'
    response['twitterScreenName'] = 'andrefsp'
    return response


    """
    try:
        access_token = request.session['access_token']
        token = oauth.OAuthToken.from_string(access_token)
        json = is_authenticated(token)
        if json:
            creds = simplejson.loads(json)
            twitter_screen_name = creds.get('screen_name',creds['name'])

            if request.session.get('updated',True):
                file_name = generateHtml(request)
            else:
                file_name = request.session['last_file_name']


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
            response['report'] = 'not authorized'
            response['url'] = get_authorize(request)
            return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}                                         
        response['auth'] = 0
        response['report'] =  'error'        
        response['url'] = get_authorize(request)
        return HttpResponse(simplejson.dumps(response))
   """ 





# this method will send the user update to twitter
def send_status_to_twitter(request):
    try:
        access_token = oauth.OAuthToken.from_string(request.session['access_token'])   
        if is_authenticated(access_token):
            twitter_status = {}
            twitter_status['status'] = request.GET['status']
            oauth_request = oauth.OAuthRequest.from_consumer_and_token(consumer,token=access_token,http_method="POST",http_url=TWITTER_STATUS_UPDATE,parameters=twitter_status,)
            oauth_request.sign_request(signature_method, consumer, access_token)

            if 'screen_name' in fetch_response(oauth_request, connection):
                response = {} 
                response['report'] = 1

            else:
                response = {}
                responde['report'] = 0
                response['content'] = _("")        

        else:
            response = {}
            response['report'] = 0

    except KeyError:
        response = {}
        response['report'] = 0
