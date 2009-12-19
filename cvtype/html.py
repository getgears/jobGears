# -*- coding: utf-8 -*-
# django Framework Includes
from django.conf import settings
from django.http import HttpResponse
from django import template
from django.template import Context
from django.template.loader import get_template
from django.shortcuts import render_to_response

# import for gettext Internationalization Utils
from django.utils.translation import ugettext as _

# simplejson import for error messages
import simplejson, string
from random import choice

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
        personalSkills['organization_skills']=request.session['skills'].get('organization_skills','')
        personalSkills['technical_skills'] = request.session['skills'].get('technical_skills','')
        personalSkills['informatic_skills'] = request.session['skills'].get('informatic_skills','')
        personalSkills['artistic_skills'] = request.session['skills'].get('artistic_skills','')
        personalSkills['other_skills'] = request.session['skills'].get('other_skills','')
        personalSkills['driving_licence'] = request.session['skills'].get('driving_licence','')
        personalSkills['aditionalinfo'] = request.session['skills'].get('aditionalinfo','')

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
            id = id + 1
            c = c + 1

        return languageSlotList

    except KeyError:
        return None




# method getEducationList should return a educationSlotList list
def getEducationSlotList(request):


    try:    
        request.session['init']
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
            educationSlot['average'] =sessionAux['education'][str(c)]['average']
            educationSlotList.append(educationSlot)
            id = id + 1
            c = c + 1

        return educationSlotList

    except KeyError:
        return None


# method getExperienceList should return a ExperienceSlotList dictionary.
def getExperienceSlotList(request):


    try:
        request.session['init']
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
            experienceSlot['business_area'] = sessionAux['experience'][str(c)]['business_area']
            experienceSlot['position'] = sessionAux['experience'][str(c)]['position']
            experienceSlot['description'] = sessionAux['experience'][str(c)]['description']
            experienceSlotList.append(experienceSlot)
            id = id + 1
            c = c + 1

        return experienceSlotList

    except KeyError:
        return None



# getUserLanguage returns the language ID stored on user's session
def getUserLanguage(request):

    try:
        return request.session['user_language']

    except KeyError:
        return 'en-us,en;'


def _generate_filename(request,length=10, chars=string.letters + string.digits):
    file_name = '%s.htm' % (''.join([choice(chars) for i in range(length)]),)
    try:
        request.session['file_name'] = file_name
    except KeyError:
        request.session['file_name'] = {}
        request.session['file_name'] = file_name        

    return file_name



# jobgearsHome View renders the main homepage home.html
def generateHtml(request):

    try:
        request.session['init']
        userLanguage = getUserLanguage(request)
        personalInfo = getPersonalInfo(request)
        personalSkills = getPersonalSkills(request)
        experienceSlotList = getExperienceSlotList(request)
        educationSlotList = getEducationSlotList(request)
        languageSlotList = getLanguageSlotList(request)
       
        url = settings.ROOT_URL
 
        # Load template and render content
        template = get_template('permlink/render.html')
        output = template.render(Context(locals()))
        
        try:
            file_name = request.session['file_name']
        except KeyError:
            file_name = _generate_filename(request)

        file_path = '%s/%s' % (settings.STATIC_DOC_ROOT,file_name,) 
        file = open(file_path, 'w')
        file.write(output.encode('utf-8'))
        file.close()

        response = {}
        response['message'] = _("actualizou o seu curriculo em")
        response['src'] = '%s/images/gears3.png' % (settings.ROOT_URL)
        response['href'] =  '%s' % (settings.ROOT_URL, )
        response['jobgearscv'] = '%s/p/%s' % (settings.ROOT_URL, file_name,)
        response['type'] = "image"
        
        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        return None
    

