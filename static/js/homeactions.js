function erase(form_id,section)
{
    if((document.getElementById('calendarDiv')) && (document.getElementById('calendarDiv').style.display=="block"))
        document.getElementById('calendarDiv').style.display="none";
    
    if ((section=="personal") || (section=="skills"))                                                         
        return;
    
    openEffect();

    if (section=="education")
        url_ = settings.education_delete_url + $('#'+form_id).attr('slot') + '/';
    else if (section=="experience")
        url_ =  settings.professional_experience_delete_url + $('#'+form_id).attr('slot') + '/';
    else if (section=="languages")             
        url_ =  settings.languages_delete_url + $('#'+form_id).attr('slot') + '/';

    $.ajax({type: 'DELETE', url: url_ ,
        sucess: function()
        {
            $('#'+form_id+':parent').remove();
            reconfigure_slot(tipo_form)
            showInfoDiv('red',locale['item deleted'])
            closeEffect()
            return;        
        }            
    });
}


function save(form_id,section) 
{
    if ((document.getElementById('calendarDiv') ) && (document.getElementById('calendarDiv').style.display=="block"))
        closeCalendar()

    openEffect();
    reconfigure_slot(section);

    var $form = $('#'+form_id);
    validation($form.get(0));

    var postString = $form.serialize();

    if (section=="education")
        url =  settings.education_save_url + $form.attr('slot')+'/';
    else if (section=="experience")
        url =  settings.professional_experience_save_url + $form.attr('slot')+'/';
    else if (section=="languages")
        url =  settings.languages_save_url + $form.attr('slot')+'/';
    else if (section=="skills")
        url =  settings.personal_skills_save_url;
    else if (section=="personal")
        url =  settings.personal_data_save_url;

    $.post(url,postString,function(reportData)
    {              
        if (section=='personal')
            start_index = parseInt(0);
        else if (section!='personal')
            start_index = parseInt(2);

        for (c=start_index;c<$('#'+form_id+' img').length;c++)
        {
            var $img = $('#'+form_id+' img:eq('+c+')');           
            $img.hide();                                
        }

        for (c=0;c<$('#'+form_id+' :input').length;c++)
        {
            var $element = $('#'+form_id+' :input:eq('+c+')');
            var $div = $('#'+form_id+' div:eq('+c+')');
            if ($element.attr('type')!='select-one')
                $div.attr('innerHTML', $element.attr('value').split('\n').join('<br/>') );
            else if ($element.attr('type')=='select-one')
                $div.attr('innerHTML', $element.get(0).options[$element.attr('selectedIndex')].innerHTML); 
            $element.hide();
            $div.css('visibility','visible');
            $div.css('display','inline');
        }
                     
        for (c=0; c<$('#'+form_id+' span').length ;c++)
        {
            var $span = $('#'+form_id+' span:eq('+c+')');
            if (($span.attr('tipo')=='guardar') || ($span.attr('tipo')=='cancelar'))
                $span.hide();
            if($span.attr('tipo')=='editar')
            {
                $span.css('visibility','visible');
                $span.show();
           }
        } 
       
        if (section=="experience")
            globalEditingExperience = false;
        else if (section=="languages")
            globalEditingLanguage = false;
        else if (section=="education")
            globalEditingEducation = false;

        $form.attr('isnew','0');
        
        showInfoDiv('green',locale['saved']);
        closeEffect();

        return;
    },'text');
}


function edit(form_id,section)
{
    if ((section=="experience") && (globalEditingExperience==true))
    {
        warning(locale['There is already an experience item being edited']);
        return;
    }
    if ((section=="education") && (globalEditingEducation==true))
    {
        warning(locale['There is already an education item being edited']);
        return;
    }
    if ((section=="languages") && (globalEditingLanguage==true))
    {
        warning(locale['There is already an language item being edited']);
        return;
    }

    var ELEMENT_LENGTH = $('#'+form_id+' :input').length;
    for (c=0;c<ELEMENT_LENGTH;c++)
    {
        $element = $('#'+form_id+' :input:eq('+c+')');
        $div = $('#'+form_id+' div:eq('+c+')');
        $element.css('visibility','visible');
        $element.show();
        $div.hide();
    }

    var IMG_LENGTH = $('#'+form_id+' img').length;
    for (c=0 ; c<IMG_LENGTH  ; c++)
    {
        var $img = $('#'+form_id+' img:eq('+c+')');
        $img.css('visibility','visible');
        $img.show();
    }

    var SPAN_LENGTH = $('#'+form_id+' span').length;
    for (c=0; c < SPAN_LENGTH ; c++)
    {
        var $span = $('#'+form_id+' span:eq('+c+')');
        if (($span.attr('tipo')=='guardar') || ($span.attr('tipo')=='cancelar'))
            {
                $span.css('visibility','visible');
                $span.show();
            }
        if ($span.attr('tipo')=='editar')
            $span.hide();
    }

    if (section=="experience")
        globalEditingExperience = true;        
    else if (section=="education")
        globalEditingEducation = true;
    else if (section=="languages")
        globalEditingLanguage = true;
}

function cancel(form_id,section)
{
    if ((document.getElementById('calendarDiv') ) && (document.getElementById('calendarDiv').style.display=="block"))
        closeCalendar()

    openEffect();

    var FORM_LENGTH = $('#'+form_id+' :input').length
    for (c=0;c<FORM_LENGTH;c++)
    {
        $element = $('#'+form_id+' :input:eq('+c+')');
        $div = $('#'+form_id+' div:eq('+c+')');
        $element.hide();
        $element.attr('value',$div.html().split('<br/>').join('\n'));
        $div.css('visibility','visible');
        $div.show();
    }

    var IMG_LENGTH = $('#'+form_id+' img').length;
    if (section=="personal")
        start_index = 0 
    if (section!="personal")
        start_index = 2
    for (c=start_index ; c<IMG_LENGTH ; c++)
    {
        $img = $('#'+form_id+' img:eq('+c+')');
        $img.hide();
    } 

    var SPAN_LENGTH = $('#'+form_id+' span').length;
    for (c=0; c < SPAN_LENGTH ; c++ )
    {
        $span = $('#'+form_id+' span:eq('+c+')');
        if (($span.attr('tipo')=='guardar') || ($span.attr('tipo')=='cancelar'))
            $span.hide();
        if ($span.attr('tipo')=='editar')
        {
            $span.css('visibility','visible');
            $span.show();
        }
    }

    if ((section!='personal')  && (section!='skills' ) && (check_blanck_fields(form_id,section)==0))
    {            
        $form = $('#'+form_id);
        if (section=="experience")
            globalEditingExperience = false;
        else if (section=="education")
            globalEditingEducation = false;
        else if (section=="languages")
            globalEditingLanguage = false;

        if ($form.attr('isnew')=='1')
        {
            openEffect();
            $('#'+form_id+':parent').slideUp(function(){
                $('#'+form_id+':parent').remove();
                reconfigure_slot(section);
                showInfoDiv('red',locale['item deleted']);
                closeEffect();
            });
        }
        else if ($form.attr('isnew')=='0')
            erase(form_id,section);

        return;   
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
    },'text');
}
