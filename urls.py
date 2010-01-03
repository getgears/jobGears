from django.conf.urls.defaults import *
from django.conf import settings

from jobgears.views import *

urlpatterns = patterns('',
    # url conf for forms ajax requests
    (r'^ajax/', include('jobgears.ajax.urls')),        
    # url conf for twitter interface
    (r'^twitter/', include('jobgears.interfaces.twitter.urls')),
    # url conf for facebook interface
    (r'^facebook/', include('jobgears.interfaces.facebook.urls')),
    
    # Development static file server
    (r'^$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'path': 'index.html'}),
    (r'^(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT}),
)

