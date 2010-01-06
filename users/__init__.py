from jobgears.interfaces import facebook
from jobgears.interfaces.facebook.models import FacebookUser
from jobgears.users.models import User


def get_user(request):
    """
    Returns the user object associated with the request
    If doesn't exists, tries to create one 
    """
    try:
        user_object = User.objects.get(pk=request.session['uid'])
    except:
        # Some error, try to return from facebook
        facebook_id = facebook.get_id(request)
        if facebook_id:
            # We have a facebook id
            try:
                # Try to retrieve the user object
                user_object = FacebookUser.objects.get(pk=facebook_id).user
            except:
                # If there is a error, create the objects
                user_object = User(email=facebook.get_email(request))
                user_object.save()
                facebook_object = FacebookUser(user=user_object)
                facebook_object.save()
            # Set the user id on session 
            request.session['uid'] = user_object.id
        else:
            # Do nothing
            user_object = None
    return user_object


def get_id(request):
    """
    Method that returns the user id for the current request
    """
    try:
        id = request.session['uid']
    except KeyError, AttributeError:
        try:
            id = get_user(request).id
        except:
            id = None
    return id

