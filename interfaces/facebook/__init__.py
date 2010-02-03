import facebook.djangofb as facebook
from django.conf import settings


@facebook.require_login(next=settings.ROOT_URL)
def get_id(request):
    """
    Return the facebook id for the request
    """
    try:
        id = request.facebook.users.getLoggedInUser()
    except:
        id = None
    return id


def get_email(request):
    """
    Returns the email of the current facebook user
    """
    # TODO to be implemented
    return 'ricardo@getgears.com'

