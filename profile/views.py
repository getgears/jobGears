from jobgears.interfaces import facebook


def get_id(request):
    """
    Method that returns the user id for the current request
    """
    try:
        id = request.session['uid']
    except KeyError, AttributeError:
        id = None
        try:
            facebook_id = facebook.get_id(request)
            id = facebook.models.User.objects.get(pk=facebook_id).user.id
            request.session['uid'] = id
        except:
            pass
    return id

