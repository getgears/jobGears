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
    var ajax = getAjax();
    //var url = settings.root_url + "form/init/experienceInit.html" 
    var url = settings.root_url + settings.init_path + settings.init_experience_filename
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState==4)
        {   
            experienceReady = true;
        }
    }        

    ajax.open("GET",encodeURI(url),true);
    ajax.send(null);

    return;
}

function initEducation()
{
    var ajax = getAjax();
    //var url = settings.root_url + "form/init/educationInit.html"
    var url = settings.root_url + settings.init_path + settings.init_education_filename

    ajax.onreadystatechange = function()
    {
        if (ajax.readyState==4)
        {
            educationReady = true;
        }    
    }        

    ajax.open("GET",encodeURI(url),true);
    ajax.send(null);
}

function initLanguage()
{
    var ajax = getAjax();
    //var url = settings.root_url + "form/init/languageInit.html"
    var url = settings.root_url + settings.init_path + settings.init_languages_filename
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState==4)
        {
            languageReady = true;
        }
    }        

    ajax.open("GET",encodeURI(url),true);
    ajax.send(null);
}

function oldOnToReady()
{
    if ((educationReady==true) && (experienceReady==true) && (languageReady==true))
    {
        setLocale(document);
        fbInit();
        document.getElementById('body').style.display = "block";
        closeEffect();
    }
    else{ window.setTimeout(oldOnToReady, 50); }
}


function init()
{
    var ajax = getAjax();
    var url = settings.root_url + settings.get_profile_url;
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState == 4)
        {
//            educationReady = true;
//            experienceReady = true;
//            languageReady = true;
            initExperience();
            initEducation();
            initLanguage();
            oldOnToReady();
        }
    }
    ajax.open("GET",encodeURI(url),true);
    ajax.send(null);
}
