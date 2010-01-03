
function erase(id_form,tipo_form)
{
/*ask is set to True if it was demanded by the user*/
	if((document.getElementById('calendarDiv')) && (document.getElementById('calendarDiv').style.display=="block"))
    {
		document.getElementById('calendarDiv').style.display="none";
	}	
	if ((tipo_form=="personal") || (tipo_form=="skills"))                                                         
    {
		return;
	}

	/*if (ask != false)
		if (confirm(locale['Deseja mesmo apagar o registo?'])==0)
			return;
	*/ 
	
	openEffect();

	var ajax = getAjax();
	var form = document.getElementById(id_form)
    var postString = "?&slot="+form.getAttribute('slot')

	if (tipo_form=="education")
		url = settings.root_url + "ajax/deleteeducationform/"

	if (tipo_form=="experience")
		url = settings.root_url + "ajax/deleteexperienceform/"
		
	if (tipo_form=="languages")             	
		url = settings.root_url + "ajax/deletelanguageform/"


	ajax.onreadystatechange = function ()
	{
		if ((ajax.readyState==4) || (ajax.readyState=="complete"))
		{

            if (!ajax.responseText)
            {
                warning(locale['Não foi possivel obter resposta do servidor, verifique a sua ligação'])
                closeEffect()
                return;
            }
            if (ajax.responseText)
            {
                //response = JSON.parse(ajax.responseText)
                response = eval('('+ajax.responseText+')')
                if (response.Report=='1')
                {
			        document.getElementById(tipo_form).removeChild(form.parentNode)
			        reconfigure_slot(tipo_form)
                    showInfoDiv('red',locale['item apagado'])
			        closeEffect()
                    return;
                }
                if (resonse.Report=='0')
                {
                    showInfoDiv('red',locale['item apagado'])
                    closeEffect()
                    return;
                }
            }
		}
	}


	ajax.open("POST",encodeURI(url),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Referer", document.location);
	ajax.send(encodeURI(postString));


}


function save(form_id,tipo_form) 
{
	var form = document.getElementById(form_id);
	var divs = form.getElementsByTagName("div")
	
	
	if ((document.getElementById('calendarDiv') ) && (document.getElementById('calendarDiv').style.display=="block"))
	{
		closeCalendar()
	}

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
		{
            divs[c].innerHTML = form[c].value.split('\n').join('<br>')
		}

	    if (form[c].type=="select-one")                                         	
        {
            divs[c].innerHTML = form[c].options[form[c].selectedIndex].innerHTML
        }

        if ((form[c].type!="textarea") && (form[c].type!="select-one"))
		{
			divs[c].innerHTML=form[c].value;
		}

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
		url = settings.root_url + "ajax/saveeducationform/"

	if (tipo_form=="experience")
		url = settings.root_url + "ajax/saveexperienceform/"
		
	if (tipo_form=="languages")             	
		url = settings.root_url + "ajax/savelanguageform/"

	if (tipo_form=="skills")
		url = settings.root_url + "ajax/saveskillsform/"

	if (tipo_form=="personal")
		url = settings.root_url + "ajax/savepersonalform/"

	for (c=0; c < form.length ; c++)
	{
		postString = postString + "&"+ form[c].getAttribute('name')+"="+form[c].value
	}


	ajax.onreadystatechange = function ()
	{
		if ((ajax.readyState==4) || (ajax.readyState=="complete"))
		{
            if (!ajax.responseText)
            {
                warning(locale['Não foi possivel obter resposta do servidor, verifique a sua ligação'])
                closeEffect();
                return;
            }
            if (ajax.responseText)
            {
                //response = JSON.parse(ajax.responseText)
                response = eval('('+ajax.responseText+')')
                if (response.Report == '1')
                {
                    showInfoDiv('green',locale['item salvo'])
                    closeEffect()
                }
                if (response.Report == '0')
                {
                    showInfoDiv('red',locale['erro'])
                    closeEffect()
                }

                if (tipo_form=="experience")
                    globalEditingExperience = false;
                else if (tipo_form=="languages")
                    globalEditingLanguage = false;
                else if (tipo_form=="education")
                    globalEditingEducation = false;
                
                return;
            }
		}
	}

	ajax.open("POST",encodeURI(url),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Referer", document.location);
	ajax.send(encodeURI(postString));
}



function edit(form,tipo_form)
{
    if ((tipo_form=="experience") && (globalEditingExperience==true))
    {
        warning(locale['Já existe um registo de experiência a ser editado']);
        return;
    }
    if ((tipo_form=="education") && (globalEditingEducation==true))
    {
        warning(locale['Já existe um registo de educação a ser editado']);
        return;
    }
    if ((tipo_form=="languages") && (globalEditingLanguage==true))
    {
        warning(locale['Já existe um registo de línguas a ser editado']);
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
      	{
		closeCalendar()
	}

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
				{
                    form[c].value = divs[c].innerHTML.split('<br>').join('\n')
				}
			if ( (divs[c].innerHTML=="") || (divs[c].innerHTML==" ") )
				{
					form[c].value=divs[c].innerHTML
				}
		}
		if (form[c].type!="textarea")
		{
			form[c].value=divs[c].innerHTML;
		}

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

			erase(form_id,tipo_form)
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
         url = settings.root_url + "ajax/moveeducationform/"
     if (tipo_form=="experience")
         url = settings.root_url + "ajax/moveexperienceform/"
     if (tipo_form=="languages")
         url = settings.root_url + "ajax/movelanguageform/"
 

 
    ajax.onreadystatechange = function()
    {
        if ((ajax.readyState==4) || (ajax.readyState=="complete"))
        {
            if (!ajax.responseText)
            {
                warning(locale['Não foi possivel obter resposta do servidor, verifique a sua ligação'])
                closeEffect();
                return;
            }
                
            if (ajax.responseText)
            {
                //response = JSON.parse(ajax.responseText)
                response = eval('('+ajax.responseText+')')
                if (response.Report == '1')
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
                        showInfoDiv('green', locale['item movido'])
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
                        showInfoDiv('green', locale['item movido'])
                        closeEffect()
                        return ;
                    }      
                    closeEffect()
                }

                if (response.Report == '0' )
                {
                    showInfoDiv('red',locale['erro'])
                    closeEffect()
                    return;
                }
            }
            
        }
    }

    ajax.open("POST",encodeURI(url),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Referer", document.location);
    ajax.send(encodeURI(postString))
}
