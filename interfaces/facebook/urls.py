# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings

# import for facebook interface
from jobgears.interfaces.facebook import fb



urlpatterns = patterns('',
    ###################################################################
    #   facebook related Views
    ###################################################################
    # nedded link for faceBook connect
    (r'^xd_receiver.htm$',fb.fbConnect),
    # facebook UID storage
    (r'^setfbuid/$',fb.fbSetUID),
    (r'^publishfb/$',fb.fb_publish_cv),

)
