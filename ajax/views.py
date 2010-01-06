# ajax views
from jobgears.helpers import json_response
from jobgears.profile import load_profile
from jobgears.profile.models import mapping
from jobgears.users import get_id as get_user_id


@json_response
def get_profile(request):
    """
    Returns the user profile from session or a empty one
    """
    try:
        profile = request.session['profile']    
    except KeyError:
        profile_object = load_profile(request)
        if profile_object:
            profile = profile_object.as_dict()
            # Store profile on session to speed up process
            request.session['profile'] = profile
        else:
            # New profile, don't write to session now, only on save
            profile = dict()
    return profile


@json_response
def save_section(request, section):
    """
    For the passed section, 
    """
    model = mapping[section]()
    validated_dict = model.validate(request.POST)
    
    try:
        request.session['profile'][section] = validated_dict
    except KeyError:
        request.session['profile'] = {section: validated_dict}

    if get_user_id(request):
        # Write to database
        pass

    return True
