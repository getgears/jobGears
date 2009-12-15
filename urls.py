# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings


# app imports
from jobgears.fbconnect import fb
from jobgears.cvtype import pdf,html
from jobgears.form import render,action
from jobgears.views import *


# imports for admin site
from django.contrib import admin
admin.autodiscover()


urlpatterns = patterns('',

    # URL config for administration portal
    (r'^admin/(.*)',admin.site.root),


    # form API for form actions		
    #Generate new Forms#
    (r'^geteducationform/$',render.educationForm),
    (r'^getexperienceform/$',render.experienceForm),
    (r'^getlanguageform/$',render.languageForm),

    #Delete Forms#
    (r'^deleteeducationform/$',action.deleteEducationForm),
    (r'^deleteexperienceform/$',action.deleteExperienceForm),
    (r'^deletelanguageform/$',action.deleteLanguageForm),


	#Save Forms#
    (r'^saveeducationform/$',action.saveEducationForm),
    (r'^saveexperienceform/$',action.saveExperienceForm),
    (r'^savelanguageform/$',action.saveLanguageForm),
    (r'^savepersonalform/$',action.savePersonalForm),
    (r'^saveskillsform/$',action.saveSkillsForm),

    #Move Forms#
    (r'^moveeducationform/$',action.moveEducationForm),
    (r'^moveexperienceform/$',action.moveExperienceForm),
    (r'^movelanguageform/$',action.moveLanguageForm),

    # set users language
    (r'^setuserlanguage/$',setUserLanguage),

    # root URL 
    (r'^$',jobgearsHome),
	
    # printing types
    (r'^getmypdfcurriculum/$',pdf.getpdf),

    # generate HTML File
    (r'^generatepermlink/$',html.generateHtml),


    # facebook related Views
    # nedded link for faceBook connect
    (r'^/xd_receiver.htm$',fb.fbConnect),
    # permalink view for public Link generation
    (r'^user/(?P<user>\d+)/$',fb.fbGetPermanentLink),    
    # facebook UID storage
    (r'^setfbuid/$',fb.fbSetUID),



    # static files serving line
    (r'^(?P<path>.*)$', 'django.views.static.serve',{'document_root': '/home/andrefsp/jobgears/template'}),




    # Example:
    # (r'^jobgears/', include('jobgears.foo.urls')),

    # Uncomment the admin/doc line below and add 'django.contrib.admindocs' 
    # to INSTALLED_APPS to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # (r'^admin/(.*)', admin.site.root),
)
