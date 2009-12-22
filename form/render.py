# -*- coding: utf-8 -*-
# Organization: getGears
#                   jobgears project -- http://jobgears.net
# Date: November 2009
#
# Develper:  André da Palma, IT Engineer


##############################################################################
##############################################################################
##############################################################################


#Django Framework import list
from django.http import HttpResponse
from django import template
from django.template.loader import get_template
from django.shortcuts import render_to_response

#import for GNU gettext Internationalization utils
from django.utils.translation import ugettext as _

# import for JSON Objects
import simplejson



#################################################################################
#       Rendering Methods for Form Return
#################################################################################


# this method returns a education form with a given ID
def educationForm(request):

    try:
        sessionAux = request.session['education']	
        slot = str(len(sessionAux) + 1)
 
        sessionAux[slot] = {}
        sessionAux[slot]['init_date'] = ""
        sessionAux[slot]['final_date'] = ""
        sessionAux[slot]['organization'] = ""
        sessionAux[slot]['degree'] = ""
        sessionAux[slot]['studies_area'] = ""
        sessionAux[slot]['main_subjects'] = ""
        sessionAux[slot]['average'] = ""

        request.session['education']={}
        request.session['education']=sessionAux   

        request.session['updated'] = True

        response = {}
        if request.GET['sendform']=='1':                                 
            temp = get_template('formtemplates/educationtemplate.html')
            context = template.Context()
            html = temp.render(context)
            response['Html'] = html
            response['Slot'] = slot
            response['Content'] = _("registo adicionado")
            response['Report'] = 1
        
        elif request.GET['sendform']=='0':
            response['Slot'] = slot                                 
            response['Content'] = _("registo adicionado")
            response['Report'] = 1
        
        else:
            response = {}
            response['Content'] = _("não autorizado")
            response['Report'] = 0                               

        return HttpResponse(simplejson.dumps(response))


    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))


# experience method returns a education form with a given ID
def experienceForm(request):

    try:
        sessionAux = request.session['experience']
        slot = str(len(sessionAux) + 1)

        sessionAux[slot] = {}
        sessionAux[slot]['init_date'] = ""
        sessionAux[slot]['final_date'] = ""
        sessionAux[slot]['company'] = ""
        sessionAux[slot]['business_area'] = ""
        sessionAux[slot]['position'] = ""
        sessionAux[slot]['description'] = ""

        request.session['experience']={}
        request.session['experience']=sessionAux

        request.session['updated'] = True

        response = {}
        if request.GET['sendform']=='1':                                 
            temp = get_template('formtemplates/experiencetemplate.html')
            context = template.Context()
            html = temp.render(context)
            response['Html'] = html
            response['Slot'] = slot
            response['Content'] = _("registo adicionado")
            response['Report'] = 1
        
        elif request.GET['sendform']=='0':
            response['Slot'] = slot                                 
            response['Content'] = _("registo adicionado")
            response['Report'] = 1
        
        else:
            response = {}
            response['Html'] = ''
            response['Content'] = _("não autorizado")
            response['Report'] = 0
        
        return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))



# languageForm method returns a education form with a given ID
def languageForm(request):

    try:
        request.session['init']
        sessionAux = request.session['language']
        slot = str(len(sessionAux) + 1)

        sessionAux[slot] = {}
        sessionAux[slot]['language'] = ""
        sessionAux[slot]['listening'] = ""
        sessionAux[slot]['reading'] = ""
        sessionAux[slot]['spoken_interaction'] = ""
        sessionAux[slot]['spoken_production'] = ""
        sessionAux[slot]['writing'] = ""
        
        request.session['language']={}
        request.session['language']=sessionAux
     
        request.session['updated'] = True
 
        response = {}                 
        if request.GET['sendform']=='1':                                 
            temp = get_template('formtemplates/languagetemplate.html')
            context = template.Context()
            html = temp.render(context)
            response['Html'] = html
            response['Slot'] = slot
            response['Content'] = _("registo adicionado")
            response['Report'] = 1
        
        elif request.GET['sendform']=='0':
            response['Slot'] = slot                                 
            response['Content'] = _("registo adicionado")
            response['Report'] = 1
        
        else:
            response = {}
            response['Html'] = ''
            response['Content'] = _("não autorizado")
            response['Report'] = 0                               

        return HttpResponse(simplejson.dumps(response)) 

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))

