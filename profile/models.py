from django.db import models


# main model of user control
class User(models.Model):
    active = models.BooleanField(default=True,null=False)
    facebook_id = models.IntegerField()
    registered_on = models.DateField(auto_now_add=True)
    language = models.CharField(max_length=5, default='en')
    
    def __unicode__(self):
        return u'%d %s' % ( self.user_id , self.last_token ) 



class PersonalData(models.Model):
    user = models.OneToOneField(User)
    birthdate = models.DateField()
    birthdate_active = models.BooleanField(default=True,null=False)
    name = models.CharField(max_length=128,blank=True)
    name_active = models.BooleanField(default=True,null=False)
    address = models.CharField(max_length=256,blank=True)
    address_active = models.BooleanField(default=True,null=False)
    postal_code = models.CharField(max_length=32,blank=True)
    postal_code_active = models.BooleanField(default=True,null=False)
    city = models.CharField(max_length=128,blank=True)
    city_active = models.BooleanField(default=True,null=False)
    country = models.CharField(max_length=128,blank=True)
    country_active = models.BooleanField(default=True,null=False)
    phone = models.CharField(max_length=128,blank=True)
    phone_active = models.BooleanField(default=True,null=False)
    cell_phone = models.CharField(max_length=128,blank=True)
    cell_phone_active = models.BooleanField(default=True,null=False)
    fax = models.CharField(max_length=128,blank=True)
    fax_active = models.BooleanField(default=True,null=False)
    email = models.EmailField(blank=True)
    email_active = models.BooleanField(default=True,null=False)
    nationality = models.CharField(max_length=128,blank=True)
    nationality_active = models.BooleanField(default=True,null=False)
    gender = models.CharField(max_length=32,blank=True)
    gender_active = models.BooleanField(default=True,null=False)
    home_language = models.CharField(max_length=128,blank=True)
    home_language_active = models.BooleanField(default=True,null=False)
    desired_employment = models.CharField(max_length=256,blank=True)
    desired_employment_active = models.BooleanField(default=True,null=False)


    def __unicode__(self):
        return u'%s %s %s' % (self.name, self.email , self.gender)



class PersonalSkills(models.Model):
    user = models.OneToOneField(User)
    social_skills = models.TextField(blank=True)
    social_skills_active = models.BooleanField(default=True,null=False)
    organization_skills = models.TextField(blank=True)
    organization_skills_active = models.BooleanField(default=True,null=False)
    technical_skills = models.TextField(blank=True)
    technical_skills_active = models.BooleanField(default=True,null=False)
    informatic_skills = models.TextField(blank=True)
    informatic_skills_active = models.BooleanField(default=True,null=False)
    artistic_skills = models.TextField(blank=True)
    artistic_skills_active = models.BooleanField(default=True,null=False)
    other_skills = models.TextField(blank=True)
    other_skills_active = models.BooleanField(default=True,null=False)
    driving_licence = models.TextField(blank=True)
    driving_licence_active = models.BooleanField(default=True,null=False)
    aditionalinfo = models.TextField(blank=True)
    aditionalinfo_active = models.BooleanField(default=True,null=False)


    def __unicode__(self):
        return u'%s %s %s' % (self.social_skills, self.organization_skills, self.driving_licence)



class Languages(models.Model):
    user = models.ForeignKey(User)
    active = models.BooleanField(default=True,null=False)
    slot = models.IntegerField()
    language = models.CharField(max_length=64)
    language_active = models.BooleanField(default=True,null=False)
    listening = models.CharField(max_length=32)
    listening_active = models.BooleanField(default=True,null=False)
    reading = models.CharField(max_length=32)
    reading_active = models.BooleanField(default=True,null=False)
    spoken_interaction = models.CharField(max_length=32)
    spoken_interaction_active = models.BooleanField(default=True,null=False)
    spoken_production = models.CharField(max_length=32)
    spoken_production_active = models.BooleanField(default=True,null=False)
    writing = models.CharField(max_length=32)
    writing_active = models.BooleanField(default=True,null=False)   

    def __unicode__(self):
        return u' %d %s ' % ( self.slot, self.language )

class Education(models.Model):
    user = models.ForeignKey(User)
    active = models.BooleanField(default=True,null=False)
    slot = models.IntegerField()
    init_date = models.DateField()
    init_date_active = models.BooleanField(default=True,null=False)
    final_date = models.DateField()
    final_date_active = models.BooleanField(default=True,null=False)
    organization = models.CharField(max_length=128,blank=True)
    organization_active = models.BooleanField(default=True,null=False)
    degree = models.CharField(max_length=128,blank=True)
    degree_active = models.BooleanField(default=True,null=False)
    studies_area = models.CharField(max_length=128,blank=True)
    studies_area_active = models.BooleanField(default=True,null=False)
    main_subjects = models.TextField(blank=True)
    main_subjects_active = models.BooleanField(default=True,null=False)
    average = models.CharField(max_length=32,blank=True)
    average_active = models.BooleanField(default=True)
	
    def __unicode__(self):
        return u'%d %s %s' % (self.slot, self.degree , self.studies_area)


class ProfessionalExperience(models.Model):
    user = models.ForeignKey(User)
    active = models.BooleanField(default=True,null=False)
    slot = models.IntegerField()
    init_date = models.DateField()
    init_date_active = models.BooleanField(default=True,null=False)
    final_date = models.DateField()
    final_date_active = models.BooleanField(default=True,null=False)
    position = models.CharField(max_length=256,blank=True)
    position_active = models.BooleanField(default=True,null=False)
    description = models.TextField(blank=True)
    description_ctive = models.BooleanField(default=True,null=False)
    company = models.TextField(blank=True)
    company_active = models.BooleanField(default=True,null=False)
    business_area = models.TextField(blank=True)
    business_area_active = models.BooleanField(default=True,null=False)


    def __unicode__(self):
        return u'%d %s %s ' % (self.slot, self.position , position.employer)


