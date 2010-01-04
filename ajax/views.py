# ajax views
from jobgears.helpers import json_encode
from jobgears.profile import get_profile
from jobgears.users import get_id as get_user_id


@json_encode
def get_profile(request):
    """
    Returns the user profile from session or a empty one
    """
    try:
        profile = request.session['profile']    
    except AttributeError, KeyError:
        profile_object = load_profile(request)
        if profile_object:
            profile = profile_object.as_dict()
            # Store profile on session to speed up process
            request.session['profile'] = profile
        else:
            # New profile, don't write to session now, only on save
            profile = dict()
    return profile


def save_section(request, section):
    """
    For the passed section, 
    """
    if get_user_id(request):
        # Write to database
        pass

