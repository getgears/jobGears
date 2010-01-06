from jobgears.ajax.views import *

# django conf import files
from django.conf.urls.defaults import *


urlpatterns = patterns('',
    (r'^profile/$', get_profile),
    
    (r'^personal_data/$', save_section, {'section': 'personal_data'}),
    (r'^personal_skills/$', save_section, {'section': 'personal_skills'}),
)
