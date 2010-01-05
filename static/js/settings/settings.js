var settings = new Object();

// application settings
//settings.root_url = "http://jobgears.net/";
settings.root_url = "http://andrefsp.servehttp.com/";
settings.locale_cookie_name = "locale";



// ##################################    URL CONFIG      ########################################
/* *********actions urls ***************/
// ## save
settings.personal_data_save_url = "ajax/personal_data/save/";
settings.personal_skills_save_url = "ajax/personal_skills/save/";
settings.languages_save_url = "ajax/languages/save/";
settings.education_save_url = "ajax/education/save/";
settings.professional_experience_save_url = "ajax/professional_experience/save/";
// ## delete
settings.languages_delete_url = "ajax/languages/delete/";
settings.education_delete_url = "ajax/education/delete/";
settings.professional_experience_delete_url = "ajax/professional_experience/delete/";

// ## move 
settings.languages_move_url = "ajax/languages/move/";
settings.education_move_url = "ajax/education/move/";
settings.professional_experience_move_url = "ajax/professional_experience/move/";
/************ get profile info ***********/
settings.get_profile_url = "ajax/getprofile/"

/******** form render/init filename and path ****/
settings.init_path = "form/init/";
settings.render_path = "form/render/";
settings.init_experience_filename = "experienceInit.html";
settings.init_languages_filename = "languageInit.html";
settings.init_education_filename = "educationInit.html";

settings.render_experience_filename = "experienceRender.html";
settings.render_languages_filename = "languageRender.html";
settings.render_education_filename = "educationRender.html";
//###############################################################################################



// settings for info div color
settings.info_positive_color = '#008705'
settings.info_negative_color = '#B60008'
