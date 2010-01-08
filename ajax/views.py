# ajax views
from jobgears.helpers import json_response
from jobgears import profile
from jobgears.profile.models import mapping
from jobgears.users import get_id as get_user_id

from pprint import pprint

@json_response
def get_profile(request):
    """
    Returns the user profile from session or a empty one
    """
    try:
        profile_dict = request.session['profile']
    except KeyError:
        profile_object = profile.load_profile(request)
        if profile_object:
            profile_dict = profile_object.as_dict()
            # Store profile on session to speed up process
            request.session['profile'] = profile_dict
        else:
            # New profile, don't write to session now, only on save
            profile_dict = dict()
    return profile_dict


@json_response
def save_section(request, section):
    """
    For the passed section, 
    """
    model = mapping[section]()
    validated_section = model.validate(request.POST)

    try:
        profile_dict = request.session['profile']
    except:
        profile_dict = dict()
    profile_dict[section] = model.validate(request.POST)
    request.session['profile'] = validated_section
    
    if get_user_id(request):
        profile.save_section(request, section, validated_section)
    return True
