#########################################################
#       AJAX REQUESTS URL CONF
#########################################################
#
#   project: jobGears by getGears
#   date: Dec 2009
#########################################################


# django conf import files
from django.conf.urls.defaults import *
from django.conf import settings

# jobgears import for form render and action
from jobgears.form import render, action

urlpatterns = patterns('',   
    #   Form Generation
    (r'^geteducationform/$',render.educationForm),
    (r'^getexperienceform/$',render.experienceForm),
    (r'^getlanguageform/$',render.languageForm),

    #   Delete actions
    (r'^deleteeducationform/$',action.deleteEducationForm),
    (r'^deleteexperienceform/$',action.deleteExperienceForm),
    (r'^deletelanguageform/$',action.deleteLanguageForm),


    #   Save actions
    (r'^saveeducationform/$',action.saveEducationForm),
    (r'^saveexperienceform/$',action.saveExperienceForm),
    (r'^savelanguageform/$',action.saveLanguageForm),
    (r'^savepersonalform/$',action.savePersonalForm),
    (r'^saveskillsform/$',action.saveSkillsForm),

    #   Moveing actions
    (r'^moveeducationform/$',action.moveEducationForm),
    (r'^moveexperienceform/$',action.moveExperienceForm),
    (r'^movelanguageform/$',action.moveLanguageForm),
)
