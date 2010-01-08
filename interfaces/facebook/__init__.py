
def get_id(request):
    """
    Return the facebook id for the request
    """
    try:
        from pprint import pprint
        pprint(request.facebook.__dict__)
        return request.facebook.uid
    except AttributeError:
        return None


def get_email(request):
    """
    Returns the email of the current facebook user
    """
    # TODO to be implemented
    return 'ricardo@getgears.com'

