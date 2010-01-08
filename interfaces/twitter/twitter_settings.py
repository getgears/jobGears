from oauth import oauth
import httplib

#server, connection and URLs 

SERVER = 'twitter.com'
REQUEST_TOKEN_URL = 'https://twitter.com/oauth/request_token'
ACCESS_TOKEN_URL = 'https://twitter.com/oauth/access_token'
AUTHORIZATION_URL = 'https://twitter.com/oauth/authorize'

CONSUMER_KEY = 'uRbkMR32kS7iJiG7NclQ'
CONSUMER_SECRET = 'GsLC7SMWh0E38yt7gER4cNLq1RadNfwAJLoMn0nVY'

TWITTER_CHECK_AUTH = 'https://twitter.com/account/verify_credentials.json'
TWITTER_STATUS_UPDATE = 'https://twitter.com/statuses/update.json'

connection = httplib.HTTPSConnection(SERVER)
consumer = oauth.OAuthConsumer(CONSUMER_KEY, CONSUMER_SECRET)
signature_method = oauth.OAuthSignatureMethod_HMAC_SHA1()


