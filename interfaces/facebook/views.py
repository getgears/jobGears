# -*- coding: utf-8 -*-
# django Framework Includes
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render_to_response

# import for gettext Internationalization Utils
from django.utils.translation import ugettext as _

# implejson import for error messages
import simplejson

from jobgears.interfaces.facebook import get_id

import facebook.djangofb as facebook



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



def info(request):
    """ info view it's just a simple test view for Facebook Integration"""
    try:
        try:
            request.COOKIES['sid']
            id = get_id(request)
            html = "id: %s" % (id,)
            return HttpResponse(html)
        except KeyError,ValueError:
            return HttpResponseRedirect(settings.ROOT_URL)
    except:
        return HttpResponseRedirect(settings.ROOT_URL)


def fb_auth_callback(request):
    """ View for Facebook Authentication Callback URL"""
    # NOT NEEDED RIGHT NOW
    return HttpResponse("FB CALLBACK")

def fb_remove_callback(request):
    """ If a user deletes jobGears from their application this view is triggered"""
    # need to be developed
    return HttpResponse("FB DELETE")


