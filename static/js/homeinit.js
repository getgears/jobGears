/*    
 *      THIS MODULE IS UNDER DEVELOPMENT
 *
 *    -  This file is ment to be the one who loads a user profile, 
 *  it must be carefully done. 
 *    -  Only one request is need and it must be in JSON format. After object is received
 *  the templates must be rendered from 'form/render' folder. These one contains all the 
 *  templates needed for initiation. 
 *    -  Forms must be set to user's locale. 
*/

function initExperience()
{
    var url = settings.init_path + settings.init_experience_filename

    $.get(url,function(data){
      experienceReady = true;
    });
}

function initEducation()
{
    var url = settings.init_path + settings.init_education_filename

    $.get(url,function(data){
      educationReady = true;
    });
}

function initLanguage()
{
    var url = settings.init_path + settings.init_languages_filename

    $.get(url,function(data){
      languageReady = true;
    });
}

function oldOnToReady()
{
    if ((educationReady==true) && (experienceReady==true) && (languageReady==true))
    {
        setLocale(document);
        fbInit();
        $('#body').show();
        closeEffect();
    }
    else{ window.setTimeout(oldOnToReady, 50); }
}


function init()
{
    var url = settings.get_profile_url;

    $('#body').ajaxError(function()
    {
        educationReady=true;
        experienceReady=true;
        languageReady=true;
        oldOnToReady(); 
    });               

     $.get(url,function(data){
                    initExperience();
                    initEducation();
                    initLanguage();
                    oldOnToReady(); 
    });    
}
