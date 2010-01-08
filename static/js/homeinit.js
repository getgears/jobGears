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
        $('#personal form')[0][0].setAttribute('value',jsonPersonalData['name']);
        $('#1 div')[0].innerHTML = jsonPersonalData['name'];

        $('#personal form')[0][1].setAttribute('value',jsonPersonalData['birthdate']);
        $('#1 div')[1].innerHTML = jsonPersonalData['birthdate'];

        $('#personal form')[0][2].setAttribute('value',jsonPersonalData['address']);
        $('#1 div')[2].innerHTML = jsonPersonalData['address'];

        $('#personal form')[0][3].setAttribute('value',jsonPersonalData['postal_code']);
        $('#1 div')[3].innerHTML = jsonPersonalData['postal_code'];

        $('#personal form')[0][4].setAttribute('value',jsonPersonalData['city']);
        $('#1 div')[4].innerHTML = jsonPersonalData['city'];

        $('#personal form')[0][5].setAttribute('value',jsonPersonalData['country']);
        $('#1 div')[5].innerHTML = jsonPersonalData['country'];

        $('#personal form')[0][6].setAttribute('value',jsonPersonalData['phone']);
        $('#1 div')[6].innerHTML = jsonPersonalData['phone'];

        $('#personal form')[0][7].setAttribute('value',jsonPersonalData['cell_phone']);
        $('#1 div')[7].innerHTML = jsonPersonalData['cell_phone'];

        $('#personal form')[0][8].setAttribute('value',jsonPersonalData['fax']);
        $('#1 div')[8].innerHTML = jsonPersonalData['fax'];

        $('#personal form')[0][9].setAttribute('value',jsonPersonalData['email']);
        $('#1 div')[9].innerHTML = jsonPersonalData['email'];

        $('#personal form')[0][10].setAttribute('value',jsonPersonalData['nationality']);
        $('#1 div')[10].innerHTML = jsonPersonalData['nationality'];
 
        $('#personal select').attr('value',jsonPersonalData['gender']);
        $('#1 div')[11].innerHTML = $('#personal select').get(0).options[$('#personal select').get(0).selectedIndex].innerHTML

        $('#personal form')[0][12].setAttribute('value',jsonPersonalData['home_language']);
        $('#1 div')[12].innerHTML = jsonPersonalData['home_language'];

        $('#personal form')[0][13].setAttribute('value',jsonPersonalData['desired_employment']);
        $('#1 div')[13].innerHTML = jsonPersonalData['desired_employment'];
    }
    else { return; }
}
function initPersonalSkills(jsonPersonalSkills)
{
    if (jsonPersonalSkills)
    {    
        $('#skills form')[0][1].setAttribute('value',jsonPersonalData['social_skills']);
        $('#0 div')[1].innerHTML = jsonPersonalData['social_skills'];

        $('#skills form')[0][2].setAttribute('value',jsonPersonalData['organization_skills']);
        $('#0 div')[2].innerHTML = jsonPersonalData['organization_skills'];

        $('#skills form')[0][3].setAttribute('value',jsonPersonalData['technical_skills']);
        $('#0 div')[3].innerHTML = jsonPersonalData['technical_skills'];

        $('#skills form')[0][4].setAttribute('value',jsonPersonalData['informatic_skills']);
        $('#0 div')[4].innerHTML = jsonPersonalData['informatic_skills'];

        $('#skills form')[0][5].setAttribute('value',jsonPersonalData['artistic_skills']);
        $('#0 div')[5].innerHTML = jsonPersonalData['artistic_skills'];

        $('#skills form')[0][6].setAttribute('value',jsonPersonalData['other_skills']);
        $('#0 div')[6].innerHTML = jsonPersonalData['other_skills'];

        $('#skills form')[0][7].setAttribute('value',jsonPersonalData['driving_licence']);
        $('#0 div')[7].innerHTML = jsonPersonalData['driving_licence'];

        $('#skills form')[0][8].setAttribute('value',jsonPersonalData['aditionalinfo']);
        $('#0 div')[8].innerHTML = jsonPersonalData['aditionalinfo'];
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
            var form = document.createElement('span');
            form.innerHTML = data;
            setLocale(form);

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
                /*set form here*/
                if (document.getElementById('experience').getElementsByTagName("span")[0])                     
                    document.getElementById('experience').insertBefore(form , document.getElementById('experience').getElementsByTagName("span")[0]);                    
                if (!document.getElementById('experience').getElementsByTagName("span")[0])
                    document.getElementById('experience').appendChild(form);                   

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
            var form = document.createElement('span');
            form.innerHTML = data;
            setLocale(form);

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
                /*set form here*/
                if (document.getElementById('education').getElementsByTagName("span")[0])                                                         
                    document.getElementById('education').insertBefore(form , document.getElementById('education').getElementsByTagName("span")[0]);
                if (!document.getElementById('education').getElementsByTagName("span")[0])                                                        
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
    $('#cv').ajaxError(function()
    {
        educationReady=true;
        experienceReady=true;
        languageReady=true;
        oldOnToReady(); 
    });               
    $.getJSON(encodeURI(url),function(json)
    {            
        initPersonalData(json['personal_data']);
        //initPersonalData(json);
        initPersonalSkills();
        initExperience();
        initEducation();
        initLanguage();
        oldOnToReady(); 
    });
}
