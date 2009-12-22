"""
This module contains helpers that may be of hand in several places
in the application
"""
from random import choice
import string


def get_random_string(request,length=10, chars=string.letters + string.digits, template='%s'):
    """
    This helper returns a random string for the provided template
    """
    return template % (''.join([choice(chars) for i in range(length)]),)

