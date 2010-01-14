
def get_id(request):
    """
    Return the facebook id for the request
    """
    try:
        id = request.facebook.uid
    except:
        id = None
    #id = id if id else 1
    return id


def get_email(request):
    """
    Returns the email of the current facebook user
    """
    # TODO to be implemented
    return 'ricardo@getgears.com'

