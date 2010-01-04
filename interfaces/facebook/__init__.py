
def get_id(request):
    """
    Return the facebook id for the request
    """
    try:
        return 1
        return request.facebook.uid
    except AttributeError:
        return None


def get_email(request):
    """
    Returns the email of the current facebook user
    """
    # TODO to be implemented
    return 'ricardo@getgears.com'

