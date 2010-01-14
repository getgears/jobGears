from django.db import models
from jobgears.users.models import User
from jobgears.profile.utils import validate_field
import re


class ProfileSection(models.Model):
    """
    Base class for all profile sections
    """
    def as_dict(self, public=False):
        """
        Return a dictonary version of the model
        """
        if public:
            section_dict = dict()
            for key in self.__dict__:
                try:
                    if getattr(self, '%s_active' % (key,)):
                        section_dict[key] = getattr(self, key)
                except:
                    # Skip this attribute
                    continue
        else:
            section_dict = self.__dict__
        return section_dict
    
    def validate(self, data_dict):
        """
        This method will return a cleaned compatible dictionary
        """
        cleaned_dict = dict()
        for key in self.__dict__:
            if key in data_dict:
                cleaned_dict[key] = validate_field(getattr(self, key), data_dict[key])
        return cleaned_dict

    def from_dict(self, data_dict):
        """
        Overwrite the model attributes with the given data dictionary
        """
        for key in self.__dict__:
            if key in data_dict and not key == 'id':
                setattr(self, key, validate_field(getattr(self, key), data_dict[key]))

    class Meta:
        abstract = True


class ProfileSlot(models.Model):
    profile = models.ForeignKey('Profile')
    active = models.BooleanField(default=True, null=False)
    order = models.IntegerField()
   
    class Meta:
        ordering = ('order',)
        abstract = True


class Profile(models.Model):
    user = models.ForeignKey(User)
    language = models.CharField(max_length=5, default='en_US')
    personal_data = models.OneToOneField('PersonalData', null=True)
    personal_data_active = models.BooleanField(default=True, null=False)
    personal_skills = models.OneToOneField('PersonalSkills', null=True)
    personal_skills_active = models.BooleanField(default=True, null=False)
    languages = models.ManyToManyField('Language', through='Profile_Language')
    education = models.ManyToManyField('Education', through='Profile_Education')
    professional_experience = models.ManyToManyField('ProfessionalExperience', through='Profile_ProfessionalExperience')

    def as_dict(self, require_active=False):
        """
        Return a dictionary version of the profile
        """
        def slots_to_dict(slots, require_active=False):
            slots_list = list()
            for slot in self.slots:
                if not require_active or slot.active:
                    slots_list.append(slot.record.as_dict(require_active))
            return slots_list

        profile_dict = dict()
        if not require_active or personal_data_active:
            profile_dict['personal_data'] = self.personal_data.as_dict(require_active)
        if not require_active or personal_skills_active:
            profile_dict['personal_skills'] = self.personal_skills.as_dict(require_active)
        profile_dict['languages'] = slots_to_dict(slot.languages, require_active)
        profile_dict['education'] = slots_to_dict(slot.education, require_active)
        profile_dict['professional_experience'] = slots_to_dict(slot.professional_experience, require_active)

        return profile_dict
        

class PersonalData(ProfileSection):
    birthdate = models.DateField(null=True)
    birthdate_active = models.BooleanField(default=True, null=False)
    name = models.CharField(max_length=128, blank=True)
    name_active = models.BooleanField(default=True, null=False)
    address = models.CharField(max_length=256, blank=True)
    address_active = models.BooleanField(default=True, null=False)
    postal_code = models.CharField(max_length=32, blank=True)
    postal_code_active = models.BooleanField(default=True, null=False)
    city = models.CharField(max_length=128, blank=True)
    city_active = models.BooleanField(default=True, null=False)
    country = models.CharField(max_length=128, blank=True)
    country_active = models.BooleanField(default=True, null=False)
    phone = models.CharField(max_length=128, blank=True)
    phone_active = models.BooleanField(default=True, null=False)
    cell_phone = models.CharField(max_length=128, blank=True)
    cell_phone_active = models.BooleanField(default=True, null=False)
    fax = models.CharField(max_length=128, blank=True)
    fax_active = models.BooleanField(default=True, null=False)
    email = models.EmailField(blank=True)
    email_active = models.BooleanField(default=True, null=False)
    nationality = models.CharField(max_length=128, blank=True)
    nationality_active = models.BooleanField(default=True, null=False)
    gender = models.CharField(max_length=32, blank=True)
    gender_active = models.BooleanField(default=True, null=False)
    home_language = models.CharField(max_length=128, blank=True)
    home_language_active = models.BooleanField(default=True, null=False)
    desired_employment = models.CharField(max_length=256, blank=True)
    desired_employment_active = models.BooleanField(default=True, null=False)


class PersonalSkills(ProfileSection):
    social_skills = models.TextField(blank=True)
    social_skills_active = models.BooleanField(default=True, null=False)
    organization_skills = models.TextField(blank=True)
    organization_skills_active = models.BooleanField(default=True, null=False)
    technical_skills = models.TextField(blank=True)
    technical_skills_active = models.BooleanField(default=True, null=False)
    informatic_skills = models.TextField(blank=True)
    informatic_skills_active = models.BooleanField(default=True, null=False)
    artistic_skills = models.TextField(blank=True)
    artistic_skills_active = models.BooleanField(default=True, null=False)
    other_skills = models.TextField(blank=True)
    other_skills_active = models.BooleanField(default=True, null=False)
    driving_licence = models.TextField(blank=True)
    driving_licence_active = models.BooleanField(default=True, null=False)
    aditionalinfo = models.TextField(blank=True)
    aditionalinfo_active = models.BooleanField(default=True, null=False)


class Language(ProfileSection):
    language = models.CharField(max_length=64)
    language_active = models.BooleanField(default=True, null=False)
    listening = models.CharField(max_length=32)
    listening_active = models.BooleanField(default=True, null=False)
    reading = models.CharField(max_length=32)
    reading_active = models.BooleanField(default=True, null=False)
    spoken_interaction = models.CharField(max_length=32)
    spoken_interaction_active = models.BooleanField(default=True, null=False)
    spoken_production = models.CharField(max_length=32)
    spoken_production_active = models.BooleanField(default=True, null=False)
    writing = models.CharField(max_length=32)
    writing_active = models.BooleanField(default=True, null=False)   


class Education(ProfileSection):
    init_date = models.DateField(null=True)
    init_date_active = models.BooleanField(default=True, null=False)
    final_date = models.DateField(null=True)
    final_date_active = models.BooleanField(default=True, null=False)
    organization = models.CharField(max_length=128, blank=True)
    organization_active = models.BooleanField(default=True, null=False)
    degree = models.CharField(max_length=128, blank=True)
    degree_active = models.BooleanField(default=True, null=False)
    studies_area = models.CharField(max_length=128, blank=True)
    studies_area_active = models.BooleanField(default=True, null=False)
    main_subjects = models.TextField(blank=True)
    main_subjects_active = models.BooleanField(default=True, null=False)
    average = models.CharField(max_length=32, blank=True)
    average_active = models.BooleanField(default=True)


class ProfessionalExperience(ProfileSection):
    init_date = models.DateField(null=True)
    init_date_active = models.BooleanField(default=True, null=False)
    final_date = models.DateField(null=True)
    final_date_active = models.BooleanField(default=True, null=False)
    position = models.CharField(max_length=256, blank=True)
    position_active = models.BooleanField(default=True, null=False)
    description = models.TextField(blank=True)
    description_active = models.BooleanField(default=True, null=False)
    company = models.TextField(blank=True)
    company_active = models.BooleanField(default=True, null=False)
    business_area = models.TextField(blank=True)
    business_area_active = models.BooleanField(default=True, null=False)


class Profile_Language(ProfileSlot):
    record = models.ForeignKey('Language')


class Profile_Education(ProfileSlot):
    record = models.ForeignKey('Education')


class Profile_ProfessionalExperience(ProfileSlot):
    record = models.ForeignKey('ProfessionalExperience')


# This maps sections to models
mapping = {
        'personal_data': PersonalData,
        'personal_skills': PersonalSkills,
        'languages': Language,
        'education': Education,
        'professional_experience': ProfessionalExperience,
        }




