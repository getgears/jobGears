from jobgears.profile.models import *
from jobgears.users import get_user


def load_profile(request):
    """
    Loads the profile object associated with the request
    """
    user_object = get_user(request)
    if user_object:
        try:
            # Try to retrieve the profile object
            profile_object = Profile.objects.get(user=user_object)
        except:
            # If there is a error, do nothing
            profile_object = None
    else:
        # Do nothing
        profile_object = None
    return profile_object


def get_profile(request):
    """
    Returns the profile object associated with the request
    If doesn't exists, creates one
    """
    profile_object = load_profile(request)
    if not profile_object:
        user = get_user(request)
        if user:
            # Create new profile
            profile_object = Profile(user=user)
        else:
            profile_object = None
    return profile_object


def save_section(request, section, data):
    """
    Saves the section passed on the DB
    """
    profile_object = get_profile(request)
    section_object = getattr(profile_object, section)
    if not section_object:
        section_object = mapping[section]()
        section_object.from_dict(data)
        section_object.save()
        setattr(profile_object, section, section_object)
        profile_object.save()
    else:
        section_object.from_dict(data)
        section_object.save()

