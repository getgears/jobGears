# -*- coding: utf-8 -*-
# django Framework Includes
from django.conf import settings
from django.http import HttpResponse
from django import template
from django.template.loader import get_template
from django.shortcuts import render_to_response

# import for gettext Internationalization Utils
from django.utils.translation import ugettext as _

# implejson import for error messages
import simplejson

# import for generation of static file URL
from jobgears.publisher.html import generateHtml




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




# jobGears view for Facebook Publish
def fb_publish_cv(request):
    try:
        request.session['init']

        if request.session.get('updated',True):
            file_name = generateHtml(request)
        else:
            file_name = request.session['last_file_name']

        response = {}
        response['message'] = _("actualizou o seu curriculo em")
        response['src'] = '%s/images/gears3.png' % (settings.ROOT_URL)
        response['href'] =  '%s' % (settings.ROOT_URL, )
        response['jobgearscv'] = '%s/p/%s' % (settings.ROOT_URL, file_name,)
        response['type'] = "image"
        return HttpResponse(simplejson.dumps(response))    

    except KeyError:
        return None

