from jobgears.ajax.views import *

# django conf import files
from django.conf.urls.defaults import *


urlpatterns = patterns('',
    (r'^profile/$', get_profile),
    
    (r'^(?P<section>[a-z_]+)/(?:(?P<slot>\d+)/)?$', section),
)
