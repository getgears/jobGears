# -*- coding: utf-8 -*-
# django Framework Includes
from django.http import HttpResponse
from django import template
from django.template.loader import get_template
from django.shortcuts import render_to_response

# utils includes for openId integration
import urllib
import urllib2
import simplejson

# import for gettext Internationalization Utils
from django.utils.translation import ugettext as _

# import settings 
from django.conf import settings

# import for Django cache API
from django.core.cache import cache


#####################################################################################
#   Get info methods, personal / skills / education / language / experience         #
#####################################################################################

#getPersonalInfo method returns a personalInfo dictionary
def getPersonalInfo(request):

    try:
        request.session['init']
        personalInfo = {}
        personalInfo['name'] = request.session['personal'].get('name','')
        personalInfo['birthdate'] =  request.session['personal'].get('birthdate','')
        personalInfo['address'] = request.session['personal'].get('address','')
        personalInfo['postal_code'] = request.session['personal'].get('postal_code','')
        personalInfo['city'] = request.session['personal'].get('city','')
        personalInfo['country'] = request.session['personal'].get('country','')
        personalInfo['phone'] = request.session['personal'].get('phone','')
        personalInfo['cell_phone'] =  request.session['personal'].get('cell_phone','')
        personalInfo['fax'] = request.session['personal'].get('fax','')        	
        personalInfo['email'] = request.session['personal'].get('email','')
        personalInfo['nationality'] = request.session['personal'].get('nationality','')
        personalInfo['gender'] = request.session['personal'].get('gender','')        	
        personalInfo['home_language']=request.session['personal'].get('home_language','')
        personalInfo['desired_employment'] = request.session['personal'].get('desired_employment','')

        return personalInfo

    except KeyError:
        return None




# getPersonalSkills method returns a personalSkills list
def getPersonalSkills(request):

    try:
        request.session['init']
        personalSkills = {}
        personalSkills['social_skills']=request.session['skills'].get('social_skills','')
        personalSkills['social_skills_div']=request.session['skills'].get('social_skills','').replace('\n',"<br>")
        personalSkills['organization_skills']=request.session['skills'].get('organization_skills','')
        personalSkills['organization_skills_div']=request.session['skills'].get('organization_skills','').replace('\n',"<br>")
        personalSkills['technical_skills'] = request.session['skills'].get('technical_skills','')
        personalSkills['technical_skills_div'] = request.session['skills'].get('technical_skills','').replace('\n',"<br>")
        personalSkills['informatic_skills'] = request.session['skills'].get('informatic_skills','')
        personalSkills['informatic_skills_div'] = request.session['skills'].get('informatic_skills','').replace('\n',"<br>")
        personalSkills['artistic_skills'] = request.session['skills'].get('artistic_skills','')
        personalSkills['artistic_skills_div'] = request.session['skills'].get('artistic_skills','').replace('\n',"<br>")
        personalSkills['other_skills'] = request.session['skills'].get('other_skills','')
        personalSkills['other_skills_div'] = request.session['skills'].get('other_skills','').replace('\n',"<br>")
        personalSkills['driving_licence'] = request.session['skills'].get('driving_licence','')
        personalSkills['driving_licence_div'] = request.session['skills'].get('driving_licence','').replace('\n',"<br>")
        personalSkills['aditionalinfo'] = request.session['skills'].get('aditionalinfo','')
        personalSkills['aditionalinfo_div'] = request.session['skills'].get('aditionalinfo','').replace('\n',"<br>")

        return personalSkills

    except KeyError:
        return None



# method getLanguageList should return a languageSlotList list
def getLanguageSlotList(request):

    try:
        request.session['init']
        sessionAux = request.session
        c = 1
        id = 2 + len(sessionAux['experience']) + len(sessionAux['education'])
        languageSlotList = []
        while c<=len(sessionAux['language']):
            languageSlot = {}
            languageSlot['slot'] = str(c)
            languageSlot['id'] = str(id)
            languageSlot['language'] = sessionAux['language'][str(c)]['language']
            languageSlot['listening'] = sessionAux['language'][str(c)]['listening']
            languageSlot['reading'] = sessionAux['language'][str(c)]['reading']
            languageSlot['spoken_interaction']= sessionAux['language'][str(c)]['spoken_interaction']
            languageSlot['spoken_production'] = sessionAux['language'][str(c)]['spoken_production']
            languageSlot['writing'] = sessionAux['language'][str(c)]['writing']
            languageSlotList.append(languageSlot)
            id += 1	
            c += 1

        return languageSlotList

    except KeyError:
        return None



# method getEducationList should return a educationSlotList list
def getEducationSlotList(request):

    try:
        sessionAux = request.session
        c = 1
        id = 2 + len(sessionAux['experience'])
        educationSlotList = []
        while c<=len(sessionAux['education']):
            educationSlot={}
            educationSlot['slot']= str(c)
            educationSlot['id'] = str(id)
            educationSlot['init_date'] = sessionAux['education'][str(c)]['init_date']
            educationSlot['final_date'] = sessionAux['education'][str(c)]['final_date']
            educationSlot['organization'] = sessionAux['education'][str(c)]['organization']
            educationSlot['degree'] = sessionAux['education'][str(c)]['degree']
            educationSlot['studies_area'] = sessionAux['education'][str(c)]['studies_area']
            educationSlot['main_subjects'] =sessionAux['education'][str(c)]['main_subjects']
            educationSlot['main_subjects_div'] =sessionAux['education'][str(c)]['main_subjects'].replace('\n',"<br>")
            educationSlot['average'] =sessionAux['education'][str(c)]['average']
            educationSlotList.append(educationSlot)
            id += 1
            c += 1

        return educationSlotList

    except KeyError:
        return None




# method getExperienceList should return a ExperienceSlotList dictionary.
def getExperienceSlotList(request):

    try:
        sessionAux = request.session
        c = 1
        id = 2
        experienceSlotList = []
        while c<=len(sessionAux['experience']):
            experienceSlot = {}
            experienceSlot['slot'] = str(c)
            experienceSlot['id'] = str(id)
            experienceSlot['init_date'] = sessionAux['experience'][str(c)]['init_date']
            experienceSlot['final_date'] = sessionAux['experience'][str(c)]['final_date']
            experienceSlot['company'] = sessionAux['experience'][str(c)]['company']
            experienceSlot['company_div'] = sessionAux['experience'][str(c)]['company'].replace('\n',"<br>")
            experienceSlot['business_area'] = sessionAux['experience'][str(c)]['business_area']
            experienceSlot['business_area_div'] = sessionAux['experience'][str(c)]['business_area'].replace('\n',"<br>")
            experienceSlot['position'] = sessionAux['experience'][str(c)]['position']
            experienceSlot['description'] = sessionAux['experience'][str(c)]['description']
            experienceSlot['description_div'] = sessionAux['experience'][str(c)]['description'].replace('\n',"<br>")
            experienceSlotList.append(experienceSlot)
            id += 1
            c += 1

        return experienceSlotList

    except KeyError:
        return None



# getUserLanguage returns the language ID stored on user's session
def getUserLanguage(request):

    try:
        return request.session['user_language']

    except KeyError:
        return 'en-us,en;'




# this methos returns true or false according if the user is already logged in on Facebook
def fbLoginStatus(request):

    try:
        return request.session['fb_login']       

    except KeyError:
        return False



#################################################
#       Main views home page / signin page      #
#################################################

# setUserLanguage set user language preference in his session
def setUserLanguage(request):

    try:
        request.session['init']
        sessionAux = request.session
        sessionAux['user_language'] = request.GET.get('lang',False)
        request.session = {}
        request.session = sessionAux
        return HttpResponse(1)

    except KeyError:
        return HttpResponse(0)

