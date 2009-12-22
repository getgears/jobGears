# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings


# app imports
from jobgears.interfaces.facebook import fb
from jobgears.interfaces.twitter import twitter_connect

from jobgears.publisher import pdf,html
from jobgears.form import render,action
from jobgears.views import *


urlpatterns = patterns('',

    # set users language
    (r'^setuserlanguage/$',setUserLanguage),

    # root URL 
    (r'^$',jobgearsHome),


    ####################################################################
    # form API for form actions		
    ####################################################################
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


    ###################################################################
    #   printing types
    ###################################################################
    #   generate HTML File
    #(r'^generatepermlink/$',html.generateHtml),


    ###################################################################
    #   facebook related Views
    ###################################################################
    # nedded link for faceBook connect
    (r'^xd_receiver.htm$',fb.fbConnect),
    # facebook UID storage
    (r'^setfbuid/$',fb.fbSetUID),
    (r'^publishfb/$',fb.fb_publish_cv),


    ###################################################################
    #   API related Views
    ###################################################################
    # first request on an update
    (r'^twitterauth/$',twitter_connect.update_status),
    # twitter update request
    (r'^twittersendstatus/$',twitter_connect.send_status_to_twitter),
    # Twitter callback URL
    (r'^twitterconnected/$',twitter_connect.connected),


    # static files serving line
    (r'^(?P<path>.*)$', 'django.views.static.serve',{'document_root': '/home/ricardo/jobgears/static'}),
)
