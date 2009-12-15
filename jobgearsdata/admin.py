from django.contrib import admin
from jobgears.jobgearsdata.models import * 


# config for model display on admin interface
class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id','active','registered_on','last_IP','openId_diaplayName','openId_email','openId_preferredUsername','openId_provider')




class PersonalDataAdmin(admin.ModelAdmin):
    list_display = ('user','name','birthdate','address','postalcode','town','country','mobile','fax','email','nationality','gender','mother_language','desired_job')





class PersonalSkillsAdmin(admin.ModelAdmin):
    list_display = ('user','social_skills','organization_skills','technical_skills','computer_skills','other_skills','driving_licence')



class LanguagesAdmin(admin.ModelAdmin):
    list_display = ('user','slot','language','listening','reading','writing','spoken_interaction')



class EducationAdmin(admin.ModelAdmin):
    list_display = ('user','slot','organization','degree','studies_area','main_subjects','average_grade','start_date','end_date')




class ProfessionalExperienceAdmin(admin.ModelAdmin):
    list_display = ('user','slot','position','employer','start_date','end_date')




# registering models in admin interface
admin.site.register(User)
admin.site.register(PersonalData)
admin.site.register(PersonalSkills)
admin.site.register(Languages)
admin.site.register(Education)
admin.site.register(ProfessionalExperience)

