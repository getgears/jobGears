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
        slot = request.POST['slot']
        sessionAux = request.session['education']

        sessionAux[slot] = {}
        sessionAux[slot]['init_date'] = request.POST.get('init_date','')
        sessionAux[slot]['final_date'] = request.POST.get('final_date','')
        sessionAux[slot]['organization'] = request.POST.get('organization','')
        sessionAux[slot]['degree'] = request.POST.get('degree','')
        sessionAux[slot]['studies_area'] = request.POST.get('studies_area','')
        sessionAux[slot]['main_subjects'] = request.POST.get('main_subjects','')
        sessionAux[slot]['average'] = request.POST.get('average','')

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
        slot = request.POST['slot'] #
        sessionAux = request.session['language']
	        	
        sessionAux[slot] = {}
        sessionAux[slot]['language'] = request.POST.get('language','')
        sessionAux[slot]['listening'] = request.POST.get('listening','')
        sessionAux[slot]['reading'] = request.POAT.get('reading','')
        sessionAux[slot]['spoken_interaction']= request.POST.get('spoken_interaction','')
        sessionAux[slot]['spoken_production'] = request.POST.get('spoken_production','')
        sessionAux[slot]['writing'] = request.POST.get('writing','')

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
        slot = request.POST['slot'] #
        sessionAux = request.session['experience']
		
        sessionAux[slot] = {}
        sessionAux[slot]['init_date'] = request.POST.get('init_date','')
        sessionAux[slot]['final_date'] = request.POST.get('final_date','')
        sessionAux[slot]['company'] = request.POST.get('company','')
        sessionAux[slot]['business_area'] = request.POST.get('business_area','')
        sessionAux[slot]['position'] = request.POST.get('position','')
        sessionAux[slot]['description'] = request.POST.get('description','')

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
        sessionAux['skills']['social_skills']=request.POST.get('social_skills','')
        sessionAux['skills']['organization_skills']=request.POST.get('organization_skills','')
        sessionAux['skills']['technical_skills']=request.POST.get('technical_skills','')
        sessionAux['skills']['informatic_skills']=request.POST.get('informatic_skills','')
        sessionAux['skills']['artistic_skills']=request.POST.get('artistic_skills','')
        sessionAux['skills']['other_skills']=request.POST.get('other_skills','')
        sessionAux['skills']['driving_licence']=request.POST.get('driving_licence','')
        sessionAux['skills']['aditionalinfo']=request.POST.get('aditionalinfo','')        

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
        sessionAux['personal']['name']=request.POST.get('name','')
        sessionAux['personal']['birthdate']=request.POST.get('birthdate','')
        sessionAux['personal']['address']=request.POST.get('address','')
        sessionAux['personal']['postal_code']=request.POST.get('postal_code','')
        sessionAux['personal']['city']=request.POST.get('city','')
        sessionAux['personal']['country']=request.POST.get('country','')
        sessionAux['personal']['phone']=request.POST.get('phone','')
        sessionAux['personal']['cell_phone']=request.POST.get('cell_phone','')
        sessionAux['personal']['fax']=request.POST.get('fax','')
        sessionAux['personal']['email']=request.POST.get('email','')
        sessionAux['personal']['nationality']=request.POST.get('nationality','')
        sessionAux['personal']['gender']=request.POST.get('gender','')
        sessionAux['personal']['home_language']=request.POST.get('home_language','')
        sessionAux['personal']['desired_employment']=request.POST.get('desired_employment','')

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
        slot = request.POST['slot']
        move = request.POST['move']

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
        move = request.POST['move']
        slot = request.POST['slot']

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
        move = request.POST['move']
        slot = request.POST['slot']

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

