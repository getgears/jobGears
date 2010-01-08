# -*- coding: utf-8 -*-
# django Framework Includes
from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render_to_response

# import for gettext Internationalization Utils
from django.utils.translation import ugettext as _

# implejson import for error messages
import simplejson

from jobgears.interfaces.facebook import get_id

import facebook.djangofb as facebook

# jobgears view for Facebook UID session Storage
def fbSetUID(request):
    """ 
    try:
        try:
            request.session['facebook_id'] = request.POST['fbuid']        
            response = {}
            response['Content'] = None
            response['Report'] = 1
            return HttpResponse(simplejson.dumps(response))
            
        except KeyError:
            request.session['facebook_id'] = {}
            request.session['facebook_id'] = request.POST['fbuid']
            response = {}
            response['Content'] = None
            response['Report'] = 1
            return HttpResponse(simplejson.dumps(response))

    except KeyError:
        response = {}
        response['Content'] = _("não autorizado")
        response['Report'] = 0
        return HttpResponse(simplejson.dumps(response))
    """
    # DEPRECATED
    return HttpResponse(0)



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



@facebook.require_login()
def info(request):                                                          
    id = get_id(request)
    print id
    if id:
        name = request.facebook.users.getInfo([id],['first_name'])[0]['first_name']
        html = "nome do nigga: %s <br> id do nigga: %s " % (name ,id,)
        return HttpResponse(html)
    
    else:
        return HttpResponse("nothing to do")    
