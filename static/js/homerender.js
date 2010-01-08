
function new_form(tipo_form)  
{
    if (checkEmptyForms(tipo_form)== false)
        return;   
    if ((tipo_form=="experience") && (globalEditingExperience==true))
    {
        warning(locale['There is already an experience item being edited']);
        return;
    }
    if ((tipo_form=="education") && (globalEditingEducation==true))
    {
        warning(locale['There is already an education item being edited']);
        return;
    }
    if ((tipo_form=="languages") && (globalEditingLanguage==true))
    {
        warning(locale['There is already and language item being edited']);
        return;
    }

    openEffect();

    var id = getNewId();
    var slot = slot_forms(tipo_form);

    if ( ((tipo_form=="education") && (globalEducationForm!=false)) || ((tipo_form=="experience") && (globalExperienceForm!=false)) || ((tipo_form=="languages") && (globalLanguageForm!=false)))
    {
        var form = document.createElement('span');
        if (tipo_form=="education")
            form.innerHTML = globalEducationForm.split('##id##').join(id.toString()).split('##slot##').join(slot.toString());
        else if (tipo_form=="experience")
            form.innerHTML = globalExperienceForm.split('##id##').join(id.toString()).split('##slot##').join(slot.toString());
        else if (tipo_form=="languages")
            form.innerHTML = globalLanguageForm.split('##id##').join(id.toString()).split('##slot##').join(slot.toString());

        if (document.getElementById(tipo_form).getElementsByTagName("span")[0])                     
            document.getElementById(tipo_form).insertBefore(form , document.getElementById(tipo_form).getElementsByTagName("span")[0]);
        if (!document.getElementById(tipo_form).getElementsByTagName("span")[0])
            document.getElementById(tipo_form).appendChild(form);        

        showInfoDiv('green',locale['item added']);
        closeEffect();

        if (tipo_form=="education")                                                                                                                               
             globalEditingEducation = true;                                          
        
        else if(tipo_form=="languages")                                                                                                                       
            globalEditingLanguage = true;                                           

        else if (tipo_form=="experience")                                                                                                                        
            lobalEditingExperience = true;                                         
                
        return;
    }
     

    if (tipo_form=="education")
    {
        globalEditingEducation = true;
        url = settings.render_path + settings.render_education_filename ;
    }
    else if (tipo_form=="languages")
    {
        globalEditingLanguage = true;
        url = settings.render_path + settings.render_languages_filename ;
    }
    else if (tipo_form=="experience")
    {
        globalEditingExperience = true;
        url = settings.render_path + settings.render_experience_filename;
    }

    $.get(encodeURI(url),function(requestData)
    {
        var form = document.createElement('span');
        form.innerHTML = requestData.split('##id##').join(id.toString()).split('##slot##').join(slot.toString());

        if (tipo_form=="education")
            globalEducationForm = requestData;                       
        if (tipo_form=="experience")
            globalExperienceForm = requestData;                      
        if (tipo_form=="languages")
            globalLanguageForm = requestData;

        setLocale(form);

        if (document.getElementById(tipo_form).getElementsByTagName("span")[0])                     
            document.getElementById(tipo_form).insertBefore(form , document.getElementById(tipo_form).getElementsByTagName("span")[0]);                    
        if (!document.getElementById(tipo_form).getElementsByTagName("span")[0])
            document.getElementById(tipo_form).appendChild(form);                   

        showInfoDiv('green',locale['item added']);
        closeEffect();
        return;
    });
}
