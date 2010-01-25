# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings

# import for twitter interface
from jobgears.interfaces.twitter import views



urlpatterns = patterns('',
    ###################################################################
    #   API related Views
    ###################################################################
    # first request on an update
    (r'^auth/$',views.update_status),
    # twitter update request
    (r'^sendstatus/$',views.send_status_to_twitter),
    # Twitter callback URL
    (r'^connected/$',views.connected),
)
