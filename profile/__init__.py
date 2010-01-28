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


def section_save(request, section, data, slot=None):
    """
    Saves the section passed on the DB
    """
    profile_object = get_profile(request)
    if slot:
        # This is a slot
        slot = int(slot)
        section_block_object = getattr(profile_object, section)
        try:
            if section == 'languages':
                section_object = section_block_object.get(profileslot_language__order=slot)
            elif section == 'education':
                section_object = section_block_object.get(profile_education__order=slot)
            elif section == 'professional_experience':
                section_object = section_block_object.get(profile_professionalexperience__order=slot)
        
            section_object.from_dict(data)
            section_object.save()
            return
        except:
            pass
        
        # If it got here, then the slot didn't exist
        section_object = mapping[section]()
        section_object.from_dict(data)
        section_object.save()
        # Create the slot object
        slot_object = eval('Profile_%s()' % (mapping[section].__name__,))
        slot_object.order = slot
        slot_object.record = section_object
        slot_object.profile = profile_object
        slot_object.save()


    else:
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

