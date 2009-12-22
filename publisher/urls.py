# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings

# import for pdf and html rendering mehotds
from jobgears.publisher import pdf,html


urlpatterns = patterns('',

    ###################################################################
    #   printing types
    ###################################################################
    #   generate HTML File
    #(r'^generatepermlink/$',html.generateHtml),
    #   generate PDF file
    #(r'^generatepdf/$',pdf........),

)

