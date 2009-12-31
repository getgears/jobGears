# django conf import files
from django.conf.urls.defaults import *
from jobgears.interfaces.facebook.views import *


urlpatterns = patterns('',
    # facebook UID storage
    (r'^fbid/$', set_id),
    #(r'^setfbuid/$', fbSetUID),
    # out of date function
    (r'^publishfb/$', fb_publish_cv),
)
