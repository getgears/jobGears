# -*- coding:utf-8 -*-
# Organization: getGears
#                   jobgears project -- http://jobgears.getgears.com 
# Date: November 2009
# Developer:  André da Palma, IT Engineer


##############################################################################
##############################################################################
##############################################################################


#django includes
from django.http import HttpResponse
from django.http import HttpRequest


#import for GNU gettext Internationalization utils
from django.utils.translation import ugettext as _


# import for JSON object
import simplejson


#####################################################################
#                        Erasing Methods 
#####################################################################

# deleteEducationForm method delete a education form with the given slot number
def deleteEducationForm(request):

    try:
        slot = request.POST['slot']
        sessionAux = request.session['education']

        c = int(slot)
        while c<len(sessionAux):
            sessionAux[str(c)] = sessionAux[str(c+1)] 
            c = c + 1

        del sessionAux[str(len(sessionAux))]

        request.session['education']={}
        request.session['education']=sessionAux	
        request.session['updated'] = True

        response = {}
        response['Content'] = _("registo apagado")
        response['Report'] = 1

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))


# deleteLanguageForm method delete a language form with the given slot number
def deleteLanguageForm(request):

    try:
        slot = request.POST['slot']
        sessionAux = request.session['language']

        c = int(slot)
        while c<len(sessionAux):
            sessionAux[str(c)] = sessionAux[str(c+1)] 
            c = c + 1

        del sessionAux[str(len(sessionAux))]

        request.session['language']={}
        request.session['language']=sessionAux
        request.session['updated'] = True 

        response = {}
        response['Content'] = _("registo apagado")
        response['Report'] = 1

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))



# deleteExperienceForm method delete a experience form with the given slot number
def deleteExperienceForm(request):

    try:
        slot = request.POST['slot']
        sessionAux = request.session['experience']

        c = int(slot)
        while c<len(sessionAux):
            sessionAux[str(c)] = sessionAux[str(c+1)] 
            c = c + 1

        del sessionAux[str(len(sessionAux))]

        request.session['experience']={}
        request.session['experience']=sessionAux
        request.session['updated'] = True 

        response = {}
        response['Content'] = _("registo apagado")
        response['Report'] = 1

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))




###########################################################################
#                      Storing methods
###########################################################################

#saveEducationForm method saves a user's education information slot in his session
def saveEducationForm(request):

    try:
        request.session['init']
        slot = request.GET['slot']
        sessionAux = request.session['education']

        sessionAux[slot] = {}
        sessionAux[slot]['init_date'] = request.GET.get('init_date','')
        sessionAux[slot]['final_date'] = request.GET.get('final_date','')
        sessionAux[slot]['organization'] = request.GET.get('organization','')
        sessionAux[slot]['degree'] = request.GET.get('degree','')
        sessionAux[slot]['studies_area'] = request.GET.get('studies_area','')
        sessionAux[slot]['main_subjects'] = request.GET.get('main_subjects','')
        sessionAux[slot]['average'] = request.GET.get('average','')

        request.session['education']={}
        request.session['education']=sessionAux
        request.session['updated'] = True        
            
        response = {}
        response['Content'] = _("registo guardado")
        response['Report'] = 1

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))


#saveLanguageForm method saves a user's languge information slot in his session
def saveLanguageForm(request):

    try:
        request.session['init'] #
        slot = request.GET['slot'] #
        sessionAux = request.session['language']
	        	
        sessionAux[slot] = {}
        sessionAux[slot]['language'] = request.GET.get('language','')
        sessionAux[slot]['listening'] = request.GET.get('listening','')
        sessionAux[slot]['reading'] = request.GET.get('reading','')
        sessionAux[slot]['spoken_interaction']= request.GET.get('spoken_interaction','')
        sessionAux[slot]['spoken_production'] = request.GET.get('spoken_production','')
        sessionAux[slot]['writing'] = request.GET.get('writing','')

        request.session['language']={}
        request.session['language']=sessionAux
        request.session['updated'] = True
 
        response = {}
        response['Content'] = _("registo guardado")
        response['Report'] = 1

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))


#saveExperienceForm method saves a user's experience information slot in his session
def saveExperienceForm(request):

    try:
        request.session['init'] #
        slot = request.GET['slot'] #
        sessionAux = request.session['experience']
		
        sessionAux[slot] = {}
        sessionAux[slot]['init_date'] = request.GET.get('init_date','')
        sessionAux[slot]['final_date'] = request.GET.get('final_date','')
        sessionAux[slot]['company'] = request.GET.get('company','')
        sessionAux[slot]['business_area'] = request.GET.get('business_area','')
        sessionAux[slot]['position'] = request.GET.get('position','')
        sessionAux[slot]['description'] = request.GET.get('description','')

        request.session['experience']={}
        request.session['experience']=sessionAux
        request.session['updated'] = True

        response = {}
        response['Content'] = _("registo guardado")
        response['Report'] = 1

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))


# this method saves user's skills info in cookies/session
def saveSkillsForm(request):

    try:
        request.session['init']
        sessionAux = request.session

        sessionAux['skills']={}
        sessionAux['skills']['social_skills']=request.GET.get('social_skills','')
        sessionAux['skills']['organization_skills']=request.GET.get('organization_skills','')
        sessionAux['skills']['technical_skills']=request.GET.get('technical_skills','')
        sessionAux['skills']['informatic_skills']=request.GET.get('informatic_skills','')
        sessionAux['skills']['artistic_skills']=request.GET.get('artistic_skills','')
        sessionAux['skills']['other_skills']=request.GET.get('other_skills','')
        sessionAux['skills']['driving_licence']=request.GET.get('driving_licence','')
        sessionAux['skills']['aditionalinfo']=request.GET.get('aditionalinfo','')        

        request.session={}
        request.session=sessionAux
        request.session['updated'] = True

        response = {}                                            
        response['Content'] = _("registo guardado")
        response['Report'] = 1
        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))



# this method saves user's personal information in cookies/session
def savePersonalForm(request):

    try:
        request.session['init']
        sessionAux = request.session

        sessionAux['personal']={}
        sessionAux['personal']['name']=request.GET.get('name','')
        sessionAux['personal']['birthdate']=request.GET.get('birthdate','')
        sessionAux['personal']['address']=request.GET.get('address','')
        sessionAux['personal']['postal_code']=request.GET.get('postal_code','')
        sessionAux['personal']['city']=request.GET.get('city','')
        sessionAux['personal']['country']=request.GET.get('country','')
        sessionAux['personal']['phone']=request.GET.get('phone','')
        sessionAux['personal']['cell_phone']=request.GET.get('cell_phone','')
        sessionAux['personal']['fax']=request.GET.get('fax','')
        sessionAux['personal']['email']=request.GET.get('email','')
        sessionAux['personal']['nationality']=request.GET.get('nationality','')
        sessionAux['personal']['gender']=request.GET.get('gender','')
        sessionAux['personal']['home_language']=request.GET.get('home_language','')
        sessionAux['personal']['desired_employment']=request.GET.get('desired_employment','')

        request.session={}
        request.session=sessionAux
        request.session['updated'] = True

        response = {}
        response['Content'] = _("registo guardado")
        response['Report'] = 1                                    

        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))




##########################################################################################
#   Moving Methods
##########################################################################################


def moveEducationForm(request):

    try:
        request.session['init']
        slot = request.GET['slot']
        move = request.GET['move']

        if move == "up" and int(slot)<len(request.session['education']):
            sessionAux = request.session['education']
            auxEducation = sessionAux[str(int(slot)+1)]
            sessionAux[str(int(slot)+1)] = sessionAux[slot]
            sessionAux[slot] = auxEducation

            request.session['education'] = {}
            request.session['education'] = sessionAux           
            request.session['updated'] = True

            response = {}                                                      
            response['Content'] = _("registo movido")
            response['Report'] = 1                                     
            return HttpResponse(simplejson.dumps(response))

        if move == "down" and int(slot)>1:
            sessionAux = request.session['education']
            auxEducation = sessionAux[str(int(slot)-1)]
            sessionAux[str(int(slot)-1)]= sessionAux[slot]
            sessionAux[slot] = auxEducation

            request.session['education'] = {}
            request.session['education'] = sessionAux           
            request.session['updated'] = True

            response = {}                                                      
            response['Content'] = _("registo movido")
            response['Report'] = 1                                     
            return HttpResponse(simplejson.dumps(response))

        response = {}                                      
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))





def moveExperienceForm(request):

    try:
        request.session['init']
        move = request.GET['move']
        slot = request.GET['slot']

        if move == "up" and int(slot)<len(request.session['experience']):
            sessionAux = request.session['experience']
            auxExperience = sessionAux[str(int(slot)+1)]
            sessionAux[str(int(slot)+1)] = sessionAux[slot]
            sessionAux[slot] = auxExperience

            request.session['experience'] = {}
            request.session['experience'] = sessionAux           
            request.session['updated'] = True

            response = {}                                                      
            response['Content'] = _("registo movido")
            response['Report'] = 1                                     
            return HttpResponse(simplejson.dumps(response))

        if move == "down" and int(slot)>1:
            sessionAux = request.session['experience']
            auxExperience = sessionAux[str(int(slot)-1)]
            sessionAux[str(int(slot)-1)]= sessionAux[slot]
            sessionAux[slot] = auxExperience

            request.session['experience'] = {}
            request.session['experience'] = sessionAux           
            request.session['updated'] = True

            response = {}                                                      
            response['Content'] = _("registo movido")
            response['Report'] = 1                                     
            return HttpResponse(simplejson.dumps(response))

        response = {}                                      
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))



#link/? &move= &slot=
def moveLanguageForm(request):

    try:
        request.session['init']
        move = request.GET['move']
        slot = request.GET['slot']

        if move == "up" and int(slot)<len(request.session['language']):
            sessionAux = request.session['language']
            auxLang = sessionAux[str(int(slot)+1)]
            sessionAux[str(int(slot)+1)]= sessionAux[slot]
            sessionAux[slot] = auxLang

            request.session['language'] = {}
            request.session['language'] = sessionAux           
            request.session['updated'] = True

            response = {}                                                      
            response['Content'] = _("registo movido")
            response['Report'] = 1                                     
            return HttpResponse(simplejson.dumps(response))

        if move == "down" and int(slot)>1:
            sessionAux = request.session['language']
            auxLang = sessionAux[str(int(slot)-1)]
            sessionAux[str(int(slot)-1)]= sessionAux[slot]
            sessionAux[slot] = auxLang

            request.session['language'] = {}
            request.session['language'] = sessionAux           
            request.session['updated'] = True

            response = {}                                                      
            response['Content'] = _("registo movido")
            response['Report'] = 1                                     
            return HttpResponse(simplejson.dumps(response))

        response = {}                                         
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")        
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))

