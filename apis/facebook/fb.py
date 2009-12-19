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


# jobgears view for Facebook UID session Storage
def fbSetUID(request): 
    try:
        try:
            request.session['facebook_id'] = request.GET['fbuid']        
            response = {}
            response['Content'] = None
            response['Report'] = 1
            return HttpResponse(simplejson.dumps(response))
            
        except KeyError:
            request.session['facebook_id'] = {}
            request.session['facebook_id'] = request.GET['fbuid']
            response = {}
            response['Content'] = None
            response['Report'] = 1
            return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))
