from jobgears.profile.models import *


def set_user(request)
    """
    Will load the correct user via the provided facebook_id
    """
    facebook_id = int(request.GET['facebook_id'])
    try:
        # Try to load the user based on the facebook_id
        user = User.objects.get(facebook_id=facebook_id)
    except:
        # User doesn't exist, create it
        user = create_user(request)
    
    request.session['user_id'] = user_id
    
    # Save forms as user might have made changes before logging in
    save_data(request)


def create_user(request):
    facebook_id = int(request.GET['facebook_id'])

    user = User(facebook_id=facebook_id)
    user.language = request.session['user_language']
    user.save()
    
    personal_data = PersonalData(user=user)
    personal_data.save()
    
    personal_skills = PersonalSkills(user=user)
    personal_skills.save()
    
    return user


def save_data(request):
    user_id = request.session['user_id']
    # Load user
    user = User.objects.get(pk=user_id)
    # Update language
    user.language = request.session['user_language']
    user.save()

    # Update PersonalData
    personal_data = PersonalData.objects.get(user_id=user_id)
    # CODE HERE
    personal_data.save()

    # Update PersonalSkills
    personal_skils = PersonalSkills.objects.get(user_id=user_id)
    # CODE HERE
    personal_skills.save()



