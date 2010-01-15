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
function initPersonalData(jsonPersonalData)
{
    if (jsonPersonalData)
    {
        //alert(jsonPersonalData['birthdate'].replace(RegExp("\(\d+\):\(\d+\):\(\d+\)$","g"),''));
        $('#personal :input:eq(0)').attr('value',jsonPersonalData['name']);
        $('#1 div:eq(0)').html(jsonPersonalData['name']);

        $('#personal :input:eq(2)').attr('value',jsonPersonalData['birthdate']);
        $('#1 div:eq(2)').html(jsonPersonalData['birthdate']);

        $('#personal :input:eq(4)').attr('value',jsonPersonalData['address']);
        $('#1 div:eq(4)').html(jsonPersonalData['address']);

        $('#personal :input:eq(6)').attr('value',jsonPersonalData['postal_code']);
        $('#1 div:eq(6)').html(jsonPersonalData['postal_code']);

        $('#personal :input:eq(8)').attr('value',jsonPersonalData['city']);
        $('#1 div:eq(8)').html(jsonPersonalData['city']);

        $('#personal :input:eq(10)').attr('value',jsonPersonalData['country']);
        $('#1 div:eq(10)').html(jsonPersonalData['country']);

        $('#personal :input:eq(12)').attr('value',jsonPersonalData['phone']);
        $('#1 div:eq(12)').html(jsonPersonalData['phone']);

        $('#personal :input:eq(14)').attr('value',jsonPersonalData['cell_phone']);
        $('#1 div:eq(14)').html(jsonPersonalData['cell_phone']);

        $('#personal :input:eq(16)').attr('value',jsonPersonalData['fax']);
        $('#1 div:eq(16)').html(jsonPersonalData['fax']);

        $('#personal :input:eq(18)').attr('value',jsonPersonalData['email']);
        $('#1 div:eq(18)').html(jsonPersonalData['email']);

        $('#personal :input:eq(20)').attr('value',jsonPersonalData['nationality']);
        $('#1 div:eq(20)').html(jsonPersonalData['nationality']);
 
        $('#personal select').attr('value',jsonPersonalData['gender']);
        $('#1 div:eq(22)').html($('#personal select').get(0).options[$('#personal select').get(0).selectedIndex].innerHTML);

        $('#personal :input:eq(24)').attr('value',jsonPersonalData['home_language']);
        $('#1 div:eq(24)').html(jsonPersonalData['home_language']);

        $('#personal :input:eq(26)').attr('value',jsonPersonalData['desired_employment']);
        $('#1 div:eq(26)').html(jsonPersonalData['desired_employment']);

        return;
    }
    else { return; }
}
function initPersonalSkills(jsonPersonalSkills)
{
    if (jsonPersonalSkills)
    {    
        $('#skills textarea:eq(0)').attr('value',jsonPersonalSkills['social_skills']);
        $('#0 div:eq(0)').html(jsonPersonalSkills['social_skills'].split('\n').join('<br/>'));

        $('#skills textarea:eq(2)').attr('value',jsonPersonalSkills['organization_skills']);
        $('#0 div:eq(2)').html(jsonPersonalSkills['organization_skills'].split('\n').join('<br/>'));

        $('#skills textarea:eq(4)').attr('value',jsonPersonalSkills['technical_skills']);
        $('#0 div:eq(4)').html(jsonPersonalSkills['technical_skills'].split('\n').join('<br/>'));

        $('#skills textarea:eq(6)').attr('value',jsonPersonalSkills['informatic_skills']);
        $('#0 div:eq(6)').html(jsonPersonalSkills['informatic_skills'].split('\n').join('<br/>'));

        $('#skills textarea:eq(8)').attr('value',jsonPersonalSkills['artistic_skills']);
        $('#0 div:eq(8)').html(jsonPersonalSkills['artistic_skills'].split('\n').join('<br/>'));

        $('#skills textarea:eq(10)').attr('value',jsonPersonalSkills['other_skills']);
        $('#0 div:eq(10)').html(jsonPersonalSkills['other_skills'].split('\n').join('<br/>'));

        $('#skills textarea:eq(12)').attr('value',jsonPersonalSkills['driving_licence']);
        $('#0 div:eq(12)').html(jsonPersonalSkills['driving_licence'].split('\n').join('<br/>'));

        $('#skills textarea:eq(14)').attr('value',jsonPersonalSkills['aditionalinfo']);
        $('#0 div:eq(14)').html(jsonPersonalSkills['aditionalinfo'].split('\n').join('<br/>'));

        return;
    }
    else { return; }
}



function initExperience(jsonExperience)
{
    if (jsonExperience)
    {
        var url = settings.init_path + settings.init_experience_filename

        $.get(encodeURI(url),function(data)
        {




            var c=0;
            for (c=0;c<len(jsonExperience);c++)
            {
                var id=getNewId();
                var start_date      = jsonExperience[c.toString()]['start_date'];
                var end_date        = jsonExperience[c.toString()]['end_date'];
                var company         = jsonExperience[c.toString()]['company'];
                var business_area   = jsonExperience[c.toString()]['business_area'];
                var position        = jsonExperience[c.toString()]['position'];
                var description     = jsonExperience[c.toString()]['description'];






            }
            experienceReady = true;
        });
    }
    else{ experienceReady = true; return; }
}



function initEducation(jsonEducation)
{
    if (jsonEducation)
    {
        var url = settings.init_path + settings.init_education_filename

        $.get(encodeURI(url),function(data)
        {
   
   
   

            var c=0;
            for (c=0;c<len(jsonExperience);c++)
            {
                var id=getNewId();
                var start_date      = jsonEducation[c.toString()]['start_date'];
                var end_date        = jsonEducation[c.toString()]['end_date'];
                var organization    = jsonEducation[c.toString()]['organization'];
                var degree          = jsonEducation[c.toString()]['degree']; 
                var studies_area    = jsonEducation[c.toString()]['studies_area'];
                var main_subjects   = jsonEducation[c.toString()]['main_subjects'];
                var average         = jsonEducation[c.toString()]['average'];
    
    
    
    
                    document.getElementById('education').appendChild(form);                                                                       
                                                                                                                                                  
            }   
            educationReady = true;
        });
    }
    else { educationReady=true; return; }
}



function initLanguage(jsonLanguage)
{
    if (jsonLanguage)
    {
        var url = settings.init_path + settings.init_languages_filename

        $.get(encodeURI(url),function(data){
            var form = document.createElement('span');
            form.innerHTML = data;
            setLocale(form);
            var c=0;
            
            for (c=0;c<len(jsonLanguage);c++)
            {







            }
            languageReady = true;
        });
    }
    else { languageReady=true; return; }
}

function oldOnToReady()
{
    if ((educationReady==true) && (experienceReady==true) && (languageReady==true))
    {
        fbInit();
        $('#cv').show();
        closeEffect();
    }
    else{ window.setTimeout(oldOnToReady, 50); }
}


function init()
{
    setLocale(document);
    var url = settings.get_profile_url;
    $('#cv').ajaxError(function(event, request, settings)
    {
        fbInit();
        if (!request.responseText)
            warning(locale["Couldn't get any response from the server, check your internet connection"]);
        else if (request.status==500)
            warning(locale['A internal error occurred, we apologize for any inconvenience']);
        else  if (request.status==503)
            warning(locale['Service temporarily unavailable, please try again in a few seconds']);
        else   
            warning(locale['An error ocurred, our team is working to solve the problem']); 
    });               

    $.getJSON(encodeURI(url),function(json)
    {            
        initPersonalData(json['personal_data']);
        initPersonalSkills(json['personal_skills']);
        initExperience();
        initEducation();
        initLanguage();
        oldOnToReady(); 
    });
}
