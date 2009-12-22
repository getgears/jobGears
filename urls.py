# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings

# app imports
from jobgears.views import *


urlpatterns = patterns('',
    # set users language
    (r'^setuserlanguage/$',setUserLanguage),        
    # root URL 
    (r'^$',jobgearsHome),           
    # url conf for forms ajax requests
    (r'^ajax/',include('jobgears.ajax.urls')),        
    # url conf for twitter interface
    (r'^twitter/',include('jobgears.interfaces.twitter.urls')),
    # url conf for facebook interface
    (r'^facebook/',include('jobgears.interfaces.facebook.urls')),
    # url conf 
    (r'^setuserlanguage/$',setUserLanguage),

)
