from jobgears.profile.models import *
from jobgears.users import get_user


def get_profile(request):
    """
    Returns the profile object associated with the request
    If doesn't exists, tries to create one 
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



def load_profile(request):
    """
    Will load and retrieve a profile dictionary
    """
    profile_dict = dict()
    profile_object = get_profile(request)
    if profile_object:
        profile_dict = profile_object.to_dict()
    return profile_dict
   
