"""
This module contains helpers that may be of hand in several places
in the application
"""
import simplejson
from random import choice
import string
from django.http import HttpResponse


def get_random_string(request,length=10, chars=string.letters + string.digits, template='%s'):
    """
    This helper returns a random string for the provided template
    """
    return template % (''.join([choice(chars) for i in range(length)]),)


def json_response(f):
    """
    This decorator ensures that the result is a json string
    """
    def wrap(*args, **kwargs):
        return HttpResponse(simplejson.dumps(f(*args, **kwargs)))

    return wrap

