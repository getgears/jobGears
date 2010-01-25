
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
    var slot = getNewSlot(tipo_form);

    if ( ((tipo_form=="education") && (globalEducationForm!=false)) || ((tipo_form=="experience") && (globalExperienceForm!=false)) || ((tipo_form=="languages") && (globalLanguageForm!=false)))
    {
        var $form = $('<span></span>');

        if (tipo_form=="education")
            $form.attr('innerHTML',globalEducationForm.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString()).replace(new RegExp('[#]{2}slot[#]{2}','g'),slot.toString()));
        else if (tipo_form=="experience")
            $form.attr('innerHTML',globalExperienceForm.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString()).replace(new RegExp('[#]{2}slot[#]{2}','g'),slot.toString()));
        else if (tipo_form=="languages")
            $form.attr('innerHTML',globalLanguageForm.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString()).replace(new RegExp('[#]{2}slot[#]{2}','g'),slot.toString()));

        if ($('#'+tipo_form+' span').length==0)
            $form.appendTo('#'+tipo_form);
        else
            $form.insertBefore('#'+tipo_form+' span:first');

        if (tipo_form=="education")                                                                                                                               
             globalEditingEducation = true;                                                  
        else if(tipo_form=="languages")                                                                                                                       
            globalEditingLanguage = true;                                           
        else if (tipo_form=="experience")                                                                                                                        
            lobalEditingExperience = true;                                         
        
        showInfoDiv('green',locale['item added']);
        closeEffect();

        return;
    }
     
    if (tipo_form=="education")
        url = settings.render_path + settings.render_education_filename ;
    else if (tipo_form=="languages")
        url = settings.render_path + settings.render_languages_filename ;
    else if (tipo_form=="experience")
        url = settings.render_path + settings.render_experience_filename;

    $.get(encodeURI(url),function(requestData)
    {
        var $form = $("<span></span>");
        $form.attr('innerHTML',requestData.replace(new RegExp('[#]{2}id[#]{2}','g'),id.toString()).replace(new RegExp('[#]{2}slot[#]{2}','g'),slot.toString()));
        setLocale($form.get(0));

        if ($('#'+tipo_form+' span').length==0)
            $form.appendTo('#'+tipo_form);
        else
            $form.insertBefore('#'+tipo_form+' span:first');

        if (tipo_form=="education")
        {    
            globalEducationForm = requestData;                       
            globalEditingEducation = true;
        }
        else if (tipo_form=="experience")
        {
            globalExperienceForm = requestData;                      
            globalEditingExperience = true;
        }
        else if (tipo_form=="languages")
        {
            globalLanguageForm = requestData;
            globalEditingLanguage = true;
        }
        showInfoDiv('green',locale['item added']);
        closeEffect();
        return;
    });
}
