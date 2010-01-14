# ajax views
from jobgears.helpers import json_response
from jobgears import profile
from jobgears.profile.models import mapping
from jobgears.users import get_id as get_user_id
from django.http import HttpResponse, HttpResponseBadRequest


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


def section(request, *args, **kwargs):
    """
    Decide view to call based on the request HTTP method
    """
    if request.META['REQUEST_METHOD'] == 'POST':
        # This is a save
        view = section_save

    return view(request, *args, **kwargs)


def section_save(request, section, slot=None):
    """
    Save the section
    """
    try:
        model = mapping[section]()
        validated_section = model.validate(request.POST)
        
        try:
            profile_dict = request.session['profile']
        except:
            profile_dict = dict()
        
        if slot:
            if not section in profile_dict:
                profile_dict[section] = dict()
            profile_dict[section][slot] = model.validate(request.POST)
        else:
            profile_dict[section] = model.validate(request.POST)
        request.session['profile'] = profile_dict
        
        if get_user_id(request):
            profile.section_save(request, section, validated_section, slot)

        response = HttpResponse('1')
    except IndexError:
        response = HttpResponseBadRequest('0')
    return response

