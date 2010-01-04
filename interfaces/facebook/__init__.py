
def get_id(request):
    """
    Return the facebook id for the request
    """
    try:
        return 1
        return request.facebook.uid
    except AttributeError:
        return None

