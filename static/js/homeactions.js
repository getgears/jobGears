function erase(id_form,tipo_form)
{
    if((document.getElementById('calendarDiv')) && (document.getElementById('calendarDiv').style.display=="block"))
        document.getElementById('calendarDiv').style.display="none";
    
    if ((tipo_form=="personal") || (tipo_form=="skills"))                                                         
        return;
    
    openEffect();

    var form = document.getElementById(id_form)
    var postString = "?&slot="+form.getAttribute('slot')

    if (tipo_form=="education")
        url = settings.education_delete_url

    if (tipo_form=="experience")
        url =  settings.professional_experience_delete_url

    if (tipo_form=="languages")             
        url =  settings.languages_delete_url

     $.post(url,postString,function(reportData){
                if(reportData=='true')
                {
                    document.getElementById(tipo_form).removeChild(form.parentNode)
                    reconfigure_slot(tipo_form)
                    showInfoDiv('red',locale['item deleted'])
                    closeEffect()
                    return;
                }
                else if (reportData=='false')
                {
                    showInfoDiv('red',locale['error'])
                    closeEffect()
                    return;
                }
    },'text');
}


function save(form_id,tipo_form) 
{
    var form = document.getElementById(form_id);
    var divs = form.getElementsByTagName("div")

    if ((document.getElementById('calendarDiv') ) && (document.getElementById('calendarDiv').style.display=="block"))
        closeCalendar()
    
    openEffect();

    validation(form)

    var imgs = form.getElementsByTagName("img")
    if (tipo_form=="personal")
        c=0
    if (tipo_form!="personal")
        c=2
    for (c=c ; c < imgs.length ; c++)
    {
        imgs[c].style.display='none';
        imgs[c].style.visibility='hidden';
    }

    for (c=0;c<form.length;c++)
    {
        if (form[c].type=="textarea")
            divs[c].innerHTML = form[c].value.split('\n').join('<br>')
        

        if (form[c].type=="select-one")
            divs[c].innerHTML = form[c].options[form[c].selectedIndex].innerHTML

        if ((form[c].type!="textarea") && (form[c].type!="select-one"))
            divs[c].innerHTML=form[c].value;

        form[c].style.display='none';
        form[c].style.visibility='hidden';

        if (( divs[c].innerHTML!="" ) && ( divs[c].innerHTML!=" " ))
        {
            divs[c].style.display='inline'; 
            divs[c].style.visibility='visible';
        }
    }

    var spans=form.getElementsByTagName("SPAN");

    for (c=0;c<spans.length;c++)
    {
        if ((spans[c].getAttribute('tipo')=='guardar') || (spans[c].getAttribute('tipo')=='cancelar'))
        {
            spans[c].style.visibility='hidden';
            spans[c].style.display='none';
        }
        if (spans[c].getAttribute('tipo')=='editar')
        {
            spans[c].style.visibility='visible';
            spans[c].style.display='inline';
        }
    }

    reconfigure_slot(tipo_form)

    var ajax = getAjax();
    var postString = "?&slot="+form.getAttribute('slot')
    
    if (tipo_form=="education")
        url =  settings.education_save_url

    if (tipo_form=="experience")
        url =  settings.professional_experience_save_url

    if (tipo_form=="languages")
        url =  settings.languages_save_url

    if (tipo_form=="skills")
        url =  settings.personal_skills_save_url

    if (tipo_form=="personal")
        url =  settings.personal_data_save_url

    for (c=0; c < form.length ; c++)
    {
        postString = postString + "&"+ form[c].getAttribute('name')+"="+form[c].value+"&"+form[c].getAttribute('name')+"_active=1"
    }


    $.post(url,postString,function(reportData)
    {
        if (reportData=='true')
            showInfoDiv('green',locale['saved'])
        
        if (reportData=='false')
            showInfoDiv('red',locale['error'])
        

        if (tipo_form=="experience")
            globalEditingExperience = false;
        else if (tipo_form=="languages")
            globalEditingLanguage = false;
        else if (tipo_form=="education")
            globalEditingEducation = false;

        closeEffect();

        return;
    },'text');
}



function edit(form,tipo_form)
{
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
        warning(locale['There is already an language item being edited']);
        return;
    }


    var form =document.getElementById(form);
    var spans=form.getElementsByTagName("SPAN");
    var divs = form.getElementsByTagName("div")

    for (c=0;c<form.length;c++)
    {
        form[c].style.display='inline';
        form[c].style.visibility = 'visible';
        form[c].disabled = false ;

        divs[c].style.display='none';
        divs[c].style.visibility='hidden';
    }

    var imgs = form.getElementsByTagName("img")
    for (c=0 ; c < imgs.length ; c++)
    {
        imgs[c].style.display='inline';
        imgs[c].style.visibility='visible';
    }

    for (c=0;c<spans.length;c++)
    {
        if ((spans[c].getAttribute('tipo')=="guardar") || (spans[c].getAttribute('tipo')=="cancelar"))
        {
            spans[c].style.visibility='visible';
            spans[c].style.display='inline';
        }
        if (spans[c].getAttribute('tipo')=='editar')
        {
            spans[c].style.visibility='hidden';
            spans[c].style.display='none';
        }
    }
    
    if (tipo_form=="experience")
        globalEditingExperience = true;        
    if (tipo_form=="education")
        globalEditingEducation = true;
    if (tipo_form=="languages")
        globalEditingLanguage = true;
}

function cancel(form_id,tipo_form)
{
    if ((document.getElementById('calendarDiv') ) && (document.getElementById('calendarDiv').style.display=="block"))
        closeCalendar()

    var form = document.getElementById(form_id);

    openEffect()

    var divs = form.getElementsByTagName("div")

    for (c=0;c<form.length;c++)
    {
        form[c].style.display='none';
        form[c].style.visibility='hidden';

        if  (form[c].type=="textarea")
        {
            if ( (divs[c].innerHTML!="") && (divs[c].innerHTML!=" ") )
                    form[c].value = divs[c].innerHTML.split('<br>').join('\n')
                
            if ( (divs[c].innerHTML=="") || (divs[c].innerHTML==" ") )
                    form[c].value=divs[c].innerHTML                
        }
        if (form[c].type!="textarea")
            form[c].value=divs[c].innerHTML;
        
        if ((divs[c].innerHTML!="") && (divs[c].innerHTML!=" "))
        {
            divs[c].style.display='inline';
            divs[c].style.visibility='visible';
        }
    }

    var imgs = form.getElementsByTagName("img")
    if (tipo_form=="personal")
        c=0 
    if (tipo_form!="personal")
        c=2
    for (c=c ; c < imgs.length ; c++)
    {
        imgs[c].style.display='none';
        imgs[c].style.visibility='hidden';
    }

    var spans=form.getElementsByTagName("SPAN");

    for (c=0;c<spans.length;c++)
    {
        if ((spans[c].getAttribute('tipo')=='guardar') || (spans[c].getAttribute('tipo')=='cancelar'))
        {
            spans[c].style.visibility='hidden';
            spans[c].style.display='none';
        }
        if (spans[c].getAttribute('tipo')=='editar')
        {
            spans[c].style.visibility='visible';
            spans[c].style.display='inline';
        }
    }

    if ( (tipo_form!='personal')  && (tipo_form!='skills' ) )
    {
        if (check_blanck_fields(form.getAttribute('id'),tipo_form)==0)  
        {            
            if (tipo_form=="experience")
                globalEditingExperience = false;
            if (tipo_form=="education")
                globalEditingEducation = false;
            if (tipo_form=="languages")
                globalEditingLanguage = false;

            if (form.getAttribute('isnew')=='1')
            {
                openEffect();
                document.getElementById(tipo_form).removeChild(form.parentNode);
                reconfigure_slot(tipo_form);
                showInfoDiv('red',locale['item deleted']);
                closeEffect();
            }
            else if (form.getAttribute('isnew')=='0')
                erase(form_id,tipo_form);

            return;
        }
    }               
    closeEffect();
}



function move(form_id,tipo_form,move)
{
    var form = document.getElementById(form_id)
    var slot = parseInt(form.getAttribute('slot'))

    if (((slot>=document.getElementById(tipo_form).getElementsByTagName("form").length) && (move=="up")) || ( (slot<=1) && move=="down") )
        return ;

    openEffect()    
    var ajax = getAjax()
    var postString = "?&slot="+slot+"&move="+move

     if (tipo_form=="education")                                  
         url =  settings.education_move_url
     if (tipo_form=="experience")
         url =  settings.professional_experience_move_url
     if (tipo_form=="languages")
         url =  settings.languages_move_url
 
    $.post(encodeURI(url),postString,function(reportData)
    {
        if (reportData='true')
        {
            len = parseInt(document.getElementById(tipo_form).getElementsByTagName("form").length)
            if (move=="up")
            {
                form.setAttribute('slot',parseInt(slot)+1)
                document.getElementById(tipo_form).getElementsByTagName("form")[len-slot-1].setAttribute('slot',parseInt(slot))
                span1 = form.parentNode
                span2 = document.getElementById(tipo_form).getElementsByTagName("form")[len-slot-1].parentNode
                auxinnerHTML = span1.innerHTML
                span1.innerHTML = span2.innerHTML
                span2.innerHTML = auxinnerHTML
                showInfoDiv('green', locale['item moved'])
                closeEffect()
                return ;
            }
            if (move=="down")
            {
                form.setAttribute('slot',parseInt(slot)-1)
                document.getElementById(tipo_form).getElementsByTagName("form")[len-slot+1].setAttribute('slot',parseInt(slot))
                span1 = form.parentNode
                span2 = document.getElementById(tipo_form).getElementsByTagName("form")[len-slot+1].parentNode
                auxinnerHTML = span1.innerHTML
                span1.innerHTML = span2.innerHTML
                span2.innerHTML = auxinnerHTML
                showInfoDiv('green', locale['item moved'])
                closeEffect()
                return ;
            }      
            closeEffect()
        }

        else if (reportData='false')
        {
            showInfoDiv('red',locale['error'])
            closeEffect()
            return;
        }
    },'text');
}
