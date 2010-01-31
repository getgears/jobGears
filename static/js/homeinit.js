
function initPersonalData(jsonPersonalData)
{
    if (jsonPersonalData)
    {
        $('#personal :input:eq(0)').attr('value',jsonPersonalData['name']);
        $('#1 div:eq(0)').attr('innerHTML',jsonPersonalData['name']);
    
        if (jsonPersonalData['birthdate'])
        {    
            $('#personal :input:eq(2)').attr('value',jsonPersonalData['birthdate'].toString().match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})*','g')));
            $('#1 div:eq(2)').attr('innerHTML',jsonPersonalData['birthdate'].toString().match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})*','g')));
        }

        $('#personal :input:eq(4)').attr('value',jsonPersonalData['address']);
        $('#1 div:eq(4)').attr('innerHTML',jsonPersonalData['address']);

        $('#personal :input:eq(6)').attr('value',jsonPersonalData['postal_code']);
        $('#1 div:eq(6)').attr('innerHTML',jsonPersonalData['postal_code']);

        $('#personal :input:eq(8)').attr('value',jsonPersonalData['city']);
        $('#1 div:eq(8)').attr('innerHTML',jsonPersonalData['city']);

        $('#personal :input:eq(10)').attr('value',jsonPersonalData['country']);
        $('#1 div:eq(10)').attr('innerHTML',jsonPersonalData['country']);

        $('#personal :input:eq(12)').attr('value',jsonPersonalData['phone']);
        $('#1 div:eq(12)').attr('innerHTML',jsonPersonalData['phone']);

        $('#personal :input:eq(14)').attr('value',jsonPersonalData['cell_phone']);
        $('#1 div:eq(14)').attr('innerHTML',jsonPersonalData['cell_phone']);

        $('#personal :input:eq(16)').attr('value',jsonPersonalData['fax']);
        $('#1 div:eq(16)').attr('innerHTML',jsonPersonalData['fax']);

        $('#personal :input:eq(18)').attr('value',jsonPersonalData['email']);
        $('#1 div:eq(18)').attr('innerHTML',jsonPersonalData['email']);

        $('#personal :input:eq(20)').attr('value',jsonPersonalData['nationality']);
        $('#1 div:eq(20)').attr('innerHTML',jsonPersonalData['nationality']);
 
        $('#personal select').attr('value',jsonPersonalData['gender']);
        $('#1 div:eq(22)').attr('innerHTML',$('#personal select').get(0).options[$('#personal select').get(0).selectedIndex].innerHTML);

        $('#personal :input:eq(24)').attr('value',jsonPersonalData['home_language']);
        $('#1 div:eq(24)').attr('innerHTML',jsonPersonalData['home_language']);

        $('#personal :input:eq(26)').attr('value',jsonPersonalData['desired_employment']);
        $('#1 div:eq(26)').attr('innerHTML',jsonPersonalData['desired_employment']);

        return;
    }
    else { return; }
}
function initPersonalSkills(jsonPersonalSkills)
{
    if (jsonPersonalSkills)
    {    
        $('#skills textarea:eq(0)').attr('value',jsonPersonalSkills['social_skills']);
        $('#0 div:eq(0)').attr('innerHTML',jsonPersonalSkills['social_skills'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(2)').attr('value',jsonPersonalSkills['organization_skills']);
        $('#0 div:eq(2)').attr('innerHTML',jsonPersonalSkills['organization_skills'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(4)').attr('value',jsonPersonalSkills['technical_skills']);
        $('#0 div:eq(4)').attr('innerHTML',jsonPersonalSkills['technical_skills'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(6)').attr('value',jsonPersonalSkills['informatic_skills']);
        $('#0 div:eq(6)').attr('innerHTML',jsonPersonalSkills['informatic_skills'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(8)').attr('value',jsonPersonalSkills['artistic_skills']);
        $('#0 div:eq(8)').attr('innerHTML',jsonPersonalSkills['artistic_skills'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(10)').attr('value',jsonPersonalSkills['other_skills']);
        $('#0 div:eq(10)').attr('innerHTML',jsonPersonalSkills['other_skills'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(12)').attr('value',jsonPersonalSkills['driving_licence']);
        $('#0 div:eq(12)').attr('innerHTML',jsonPersonalSkills['driving_licence'].replace(new RegExp('\\n','g'),'<br>'));

        $('#skills textarea:eq(14)').attr('value',jsonPersonalSkills['aditionalinfo']);
        $('#0 div:eq(14)').attr('innerHTML',jsonPersonalSkills['aditionalinfo'].replace(new RegExp('\\n','g'),'<br>'));

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
            var $aux_span = $('<span></span>');

            k = parseInt(1);
            
            while (jsonExperience[k])
            {
                var innerHTML = data.toString();
                var id = getNewId();
                var slot = k.toString();

                var init_date       = jsonExperience[slot]['init_date'];
                var final_date      = jsonExperience[slot]['final_date'];
                var company         = jsonExperience[slot]['company'];
                var business_area   = jsonExperience[slot]['business_area'];
                var position        = jsonExperience[slot]['position'];
                var description     = jsonExperience[slot]['description']; 
                

                innerHTML = innerHTML.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString())
                innerHTML = innerHTML.replace(new RegExp('[#]{2}slot[#]{2}','g'),slot);

                if (init_date)
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}init_date[#]{2}','g'),init_date.toString().match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})*','g')))
                else
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}init_date[#]{2}','g'),'');
                if (final_date)    
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}final_date[#]{2}','g'),final_date.toString().match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})*','g')))
                else
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}final_date[#]{2}','g'),'');
                innerHTML = innerHTML.replace(new RegExp('[#]{2}company[#]{2}','g'),company.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}company_div[#]{2}','g'),company.toString().replace(new RegExp('\\n','g'),'<br>'));
                innerHTML = innerHTML.replace(new RegExp('[#]{2}business_area[#]{2}','g'),business_area.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}business_area_div[#]{2}','g'),business_area.toString().replace(new RegExp('\\n','g'),'<br>'));
                innerHTML = innerHTML.replace(new RegExp('[#]{2}position[#]{2}','g'),position.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}description[#]{2}'),description.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}description_div[#]{2}','g'),description.toString().replace(new RegExp('\\n','g'),'<br>'));
                                
                $form = $('<span></span>');
                $form.attr('innerHTML',innerHTML);                       
                setLocale($form.get(0));

                if ($('#experience span').length==0)
                    $form.appendTo('#experience');
                else
                    $form.insertBefore('#experience span:first');
                
                k++;                
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
            var j=parseInt(1);
            while (jsonEducation[j])
            {
                var innerHTML = data.toString();
                var id=getNewId();
                var slot = j.toString();

                var init_date       = jsonEducation[j.toString()]['init_date'];
                var final_date      = jsonEducation[j.toString()]['final_date'];
                var organization    = jsonEducation[j.toString()]['organization'];
                var degree          = jsonEducation[j.toString()]['degree']; 
                var studies_area    = jsonEducation[j.toString()]['studies_area'];
                var main_subjects   = jsonEducation[j.toString()]['main_subjects'];
                var average         = jsonEducation[j.toString()]['average'];

                innerHTML = innerHTML.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString())
                innerHTML = innerHTML.replace(new RegExp('[#]{2}slot[#]{2}','g'),slot);
                
                if (init_date)
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}init_date[#]{2}','g'),init_date.toString().match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})*','g')));
                else
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}init_date[#]{2}','g'),'');
                if (final_date)    
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}final_date[#]{2}','g'),final_date.toString().match(new RegExp('(\\d{4})-(\\d{2})-(\\d{2})*','g')));    
                else
                    innerHTML = innerHTML.replace(new RegExp('[#]{2}final_date[#]{2}','g'),'');
                innerHTML = innerHTML.replace(new RegExp('[#]{2}organization[#]{2}','g'),organization.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}degree[#]{2}','g'),degree.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}studies_area[#]{2}','g'),studies_area.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}main_subjects[#]{2}'),main_subjects.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}main_subjects_div[#]{2}','g'),main_subjects.toString().replace(new RegExp('\\n','g'),'<br>'));
                innerHTML = innerHTML.replace(new RegExp('[#]{2}average[#]{2}','g'),average.toString());               
                
                $form = $('<span></span>');                                 
                $form.attr('innerHTML',innerHTML);
                setLocale($form.get(0));

                if ($('#education span').length==0)
                    $form.appendTo('#education');
                else
                    $form.insertBefore('#education span:first');
               j++;                                                                                                                              
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

            var i=parseInt(1); 
            while (jsonLanguage[i])
            {
                var innerHTML = data.toString();
                var id = getNewId();
                var slot = i.toString();

                var language = jsonLanguage[i.toString()]['language'];
                var spoken_production = jsonLanguage[i.toString()]['spoken_production'];
                var spoken_interaction = jsonLanguage[i.toString()]['spoken_interaction'];
                var writing = jsonLanguage[i.toString()]['writing']; 
                var reading = jsonLanguage[i.toString()]['reading'];
                var listening = jsonLanguage[i.toString()]['listening'];

                innerHTML = innerHTML.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}slot[#]{2}','g'),slot);               

                
                innerHTML = innerHTML.replace(new RegExp('[#]{2}language[#]{2}','g'),language.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}spoken_production[#]{2}','g'),spoken_production.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}spoken_interaction[#]{2}','g'),spoken_interaction.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}writing[#]{2}','g'),writing.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}reading[#]{2}','g'),reading.toString());
                innerHTML = innerHTML.replace(new RegExp('[#]{2}listening[#]{2}','g'),listening.toString());
                

                $form = $('<span></span>');                                 
                $form.attr('innerHTML',innerHTML);
                setLocale($form.get(0));
 
                if ($('#languages span').length==0)
                    $form.appendTo('#languages');
                else
                    $form.insertBefore('#languages span:first');
                i++;
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
        publishMenuInit();
        langMenuInit();
        $('#wrapper').show();
        closeEffect();
    }
    else{ window.setTimeout(oldOnToReady, 50); }
}


$(document).ready(function(){
    setLocale(document);

    if (browserCheck()==false)
    {
        return;
    }
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

        publishMenuInit();
        langMenuInit();
        $('#wrapper').show();
    });               

    $.getJSON(encodeURI(url),function(json)
    {   

        initPersonalData(json['personal_data']);
        initPersonalSkills(json['personal_skills']);
        initExperience(json['professional_experience']);
        initEducation(json['education']);
        initLanguage(json['languages']);
        oldOnToReady(); 
    });
});
