# django conf import files
from django.conf.urls.defaults import *
from jobgears.interfaces.facebook.views import *


urlpatterns = patterns('',
    # facebook UID storage
    (r'^info/$', info),
    # out of date function
    (r'^publishfb/$', fb_publish_cv),
    # facebook callback after authentication
    (r'^auth/$',fb_auth_callback),
    # facebook callback a user deletes his application
    (r'^remove/$',fb_remove_callback),
    # profile tab
    (r'^canvas/jobGears',canvas),
)

