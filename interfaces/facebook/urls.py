# django conf import files
from django.conf.urls.defaults import *
from jobgears.interfaces.facebook.views import *


urlpatterns = patterns('',
    # facebook UID storage
    (r'^setfbuid/$', fbSetUID),
    (r'^publishfb/$', fb_publish_cv),
)
