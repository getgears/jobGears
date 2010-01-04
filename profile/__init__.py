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
        # Create new profile
        profile_object = Profile(user=get_user(request))
    return profile_object

