# django conf import files
from django.conf.urls.defaults import *
from jobgears.interfaces.facebook.views import *


urlpatterns = patterns('',
    # facebook UID storage
    (r'^info/$', info),
    # out of date function
    (r'^publishfb/$', fb_publish_cv),
)

