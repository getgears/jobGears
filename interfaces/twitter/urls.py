# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings

# import for twitter interface
from jobgears.interfaces.twitter import twitter_connect



urlpatterns = patterns('',
    ###################################################################
    #   API related Views
    ###################################################################
    # first request on an update
    (r'^auth/$',twitter_connect.update_status),
    # twitter update request
    (r'^sendstatus/$',twitter_connect.send_status_to_twitter),
    # Twitter callback URL
    (r'^connected/$',twitter_connect.connected),
)
