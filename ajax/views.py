# ajax views
from jobgears.helpers import json_encode
from jobgears.profile import load_profile
from jobgears.users.views import get_id


@json_encode
def get_profile(request):
    """
    Returns the user profile from session or a empty one
    """
    try:
        profile = request.session['profile']    
    except AttributeError, KeyError:
        id = get_id(request) 
        if id:
            profile = load_profile(id)
            # Store profile on session to speed up process
            request.session['profile'] = profile
        else:
            # New profile, don't write to session now, only on save
            profile = dict()
    return profile


def save_profile(request, section):
    """
    For the passed section, 
    """
    pass


# This should probably be somewhere else
from jobgears.profile.models import *

def dict_to_object(dictionary, object_class):
    """
    This method's magic returns a processed validated object
    for the dictonary and classes provided
    """
    try:
        object_class.objects.get(pk=dictionary['id'])

    except:
        # Some error occured
        pass
     
    pass


