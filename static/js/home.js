
function hideStatus()
{
	window.status=" ";
	return true;
}


function resetDate(object)
{
	object.value = "";
}



function reconfigure_slot(tipo_form)
{
	var forms = document.getElementById(tipo_form).getElementsByTagName("FORM")
	var k= parseInt(forms.length)
	k;

	var c=0;
	
	for (c=0;c<parseInt(forms.length) ; c++)
	{
		forms[c].setAttribute('slot',k)
		k--
	}	
	
}


function slot_forms(tipo_form)
{
	
	var forms = document.getElementById(tipo_form).getElementsByTagName("FORM")


	var slot=0 ;
	var c = 0 ;

	for (c=0 ; c < parseInt(forms.length) ; c++ )
	{
		if (parseInt(forms[c].getAttribute("slot")) > slot)
		{
			slot = parseInt(forms[c].getAttribute("slot"))
		}
	}

	slot++;
	return slot ;
	
}

function cutValue(txtarea)
{
	if (txtarea.value.length>4000)
	{
		txtarea.value=txtarea.value.substring(0,4000)
		alert("Foi atingido o limite de caracteres neste campo.")
	}
}

function check_blanck_fields(id,tipo_form)
{

	if (id== -1)
		return 1;

	var elements = document.getElementById(id)
	
	if (tipo_form=="languages")
	{
		if ((elements[0].value!="") && (elements[0].value!=" "))
			{	return 1;	}
		if ((elements[0].value=="") || (elements[0].value==" "))
			{	return 0;	}
	}
	
	var start_index=0;

	for (c = start_index ; c<elements.length ; c++)
	{
		if ((elements[c].getAttribute('tipo')!="data") && (elements[c].value!="") && (elements[c].value!=" ") )
		{
			return 1; 
		}
	}

	return 0; 
}



function erase(id_form,tipo_form,ask)
{

/*ask is set to True if it was demanded by the user*/
	if((document.getElementById('calendarDiv')) && (document.getElementById('calendarDiv').style.display=="block"))
        {
		document.getElementById('calendarDiv').style.display="none";
	}
	

	if ((tipo_form=="personal") || (tipo_form=="skills"))                                                         {
		return;
	}

	if (ask != false)
		if (confirm("Deseja mesmo apagar o registo?")==0)
			return;
	 
	
	openEffect();

	var ajax = getAjax();
	var form = document.getElementById(id_form)
    var postString = "?&slot="+form.getAttribute('slot')

	if (tipo_form=="education")
		url = document.location + "deleteeducationform/"

	if (tipo_form=="experience")
		url = document.location + "deleteexperienceform/"
		
	if (tipo_form=="languages")             	
		url = document.location + "deletelanguageform/"


	ajax.onreadystatechange = function ()
	{
		if ((ajax.readyState==4) || (ajax.readyState=="complete"))
		{

            if (!ajax.responseText)
            {
                alert("Não foi possivel obter resposta do servidor, verifique a sua ligação.")
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
                    showInfoDiv('red',response.Content)
			        closeEffect()
                    return;
                }
                if (resonse.Report=='0')
                {
                    showInfoDiv('red',response.Content)
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
	
	openEffect();


	var slot = form.getAttribute('slot')

	if (tipo_form=="education")
		url = "saveeducationform/?&slot="+slot

	if (tipo_form=="experience")
		url = "saveexperienceform/?&slot="+slot	
		
	if (tipo_form=="languages")             	
		url = "savelanguageform/?&slot="+slot

	if (tipo_form=="skills")
		url = "saveskillsform/?"

	if (tipo_form=="personal")
		url = "savepersonalform/?"

	for (c=0; c < form.length ; c++)
	{
		url = url + "&"+ form[c].getAttribute('name')+"="+form[c].value
	}


	ajax.onreadystatechange = function ()
	{
		if ((ajax.readyState==4) || (ajax.readyState=="complete"))
		{
            if (!ajax.responseText)
            {
                alert("Não foi possivel obter resposta do servidor, verifique a sua ligação.")
                closeEffect();
                return;
            }
            if (ajax.responseText)
            {
                //response = JSON.parse(ajax.responseText)
                response = eval('('+ajax.responseText+')')
                if (response.Report == '1')
                {
                    showInfoDiv('green',response.Content)
                    closeEffect()
                    return;
                }
                if (response.Report == '0')
                {
                    showInfoDiv('red',response.Content)
                    closeEffect()
                    return;
                }
            }
		}
	}

	ajax.open("GET",encodeURI(url),true)
	ajax.send(null)
}



function edit(form,tipo_form)
{
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
	

}

function checkDivInnerHTML(vector)
{
	var c=0;
	
	for (c = 0 ; c< vector.length ; c++ )
	{
		if ((vector[c]!="") && (vector[c]!=" "))
		{
			return 1;
		}
	}

	return 0;
}


function cancel(form_id,tipo_form)
{

	if ((document.getElementById('calendarDiv') ) && (document.getElementById('calendarDiv').style.display=="block"))
      	{
		closeCalendar()
	}

	var form = document.getElementById(form_id);

	if ( (tipo_form!='personal')  && (tipo_form!='skills' ) )
	{
		if (check_blanck_fields(form.getAttribute('id'),tipo_form)==0)  
		{

			erase(form_id,tipo_form,false)
			return;
		}
	}               
	
		
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
	
	closeEffect()

}




function move(form_id,tipo_form,move)
{
    var form = document.getElementById(form_id)
    var slot = parseInt(form.getAttribute('slot'))

    if (((slot>=document.getElementById(tipo_form).getElementsByTagName("form").length) && (move=="up")) || ( (slot<=1) && move=="down") )
        return ;

    openEffect()    
    var ajax = getAjax()

     if (tipo_form=="education")                                  
         url = "moveeducationform/?&slot="+slot+"&move="+move
     if (tipo_form=="experience")
         url = "moveexperienceform/?&slot="+slot+"&move="+move
     if (tipo_form=="languages")
         url = "movelanguageform/?&slot="+slot+"&move="+move
 

 

    ajax.onreadystatechange = function()
    {
        if ((ajax.readyState==4) || (ajax.readyState=="complete"))
        {
            if (!ajax.responseText)
            {
                alert("Não foi possivel obter resposta do servidor, verifique a sua ligação.")
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
                        showInfoDiv('green', response.Content)
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
                        showInfoDiv('green', response.Content)
                        closeEffect()
                        return ;
                    }      
                    closeEffect()
                }

                if (response.Report == '0' )
                {
                    showInfoDiv('red',response.Content)
                    closeEffect()
                    return;
                }
            }
            
        }
    }

    ajax.open("GET",url,true)
    ajax.send(null)
}



function validation(form_)
{
	var found_html=0;
	
	for (c=0;c<form_.length ; c++)
	{


		var strInputCode = form_[c].value;

		strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){
			return (p1 == "lt")? "<" : ">";
		});
		var strTagStrippedText = strInputCode.replace(/<\/?[^>]+(>|$)/g, "");
		
		for (k=0;k<strInputCode.length; k++)
		{
			if ((strInputCode.charAt(k)=='<') && (strInputCode.charAt(k+1)!='>'))
			{
				for (x=k+1;x<strInputCode.length;x++)
				{
					if ( (strInputCode.charAt(x)=='>') && (found_html!=1) )
					{
						var found_html=1;
						alert('Aten\347\343o Formata\347\343o HTML n\343o permitida foi removida. ');
					}
				}
			}
		}
		
		form_[c].value =	strTagStrippedText;	
	}
}
