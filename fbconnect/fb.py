# -*- coding: utf-8 -*-
# django Framework Includes
from django.http import HttpResponse
from django import template
from django.template.loader import get_template
from django.shortcuts import render_to_response

# import for gettext Internationalization Utils
from django.utils.translation import ugettext as _

# implejson import for error messages
import simplejson








############################################################################
#   ATTENTION. fb_language is an hardcoded method for translations::: 
#               THIS IS A PROVISORY METHOD AND IT MUST BE REMOVED!!!!
############################################################################


# jobgears View for Facebook connect APP
def fbConnect(request):
    return render_to_response("xd_receiver.htm")




# jobgears View for permalink printing
def fbGetPermanentLink(request):
    return HttpResponse(0)




# jobgears view for Facebook UID session Storage
def fbSetUID(request):
    sessionid = request.session.session_key
    if request.session.get(sessionid,False) and request.GET.get('fbuid',False):
        sessionAux = request.session[sessionid]
        if sessionAux.get('facebook',False):
            sessionAux['facebook']['uid'] = request.GET['fbuid']

            request.session[sessionid] = {}
            request.session[sessionid] = sessionAux
        
            response = {}
            response['Content'] = None
            response['Report'] = 1
            return HttpResponse(simplejson.dumps(response))
            
        else:
            sessionAux['facebook'] = {}
            sessionAux['facebook']['uid'] = request.GET['fbuid']

            request.session[sessionid] = {}
            request.session[sessionid] = sessionAux
                
            response = {}
            response['Content'] = None
            response['Report'] = 1
            return HttpResponse(simplejson.dumps(response))

    else:
        response = {}
        response['Content'] = _("não autorizado")
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))

