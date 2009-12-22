var globalExperienceForm = false;
var globalEducationForm = false;
var globalLanguageForm = false;

function getNewId()
{
	var id=0;
	var forms = document.getElementsByTagName("form")
	for (c=0; c< forms.length ; c++ )
	{
		if (parseInt(forms[c].getAttribute('id'))>id  )
			id = parseInt(forms[c].getAttribute('id'))
	}
	id++;

	return id;
}

function checkEmptyForms(tipo_form)
{

    var formsaux=document.getElementById(tipo_form).getElementsByTagName('FORM');
	var c=0;

    for (c=0;c < formsaux.length ; c++)
	{
		if (check_blanck_fields(formsaux[c].id,tipo_form)==0)
		{
			alert('O \372ltimo formul\341rio inserido na sec\347\343o est\341 totalmente em branco. Preencha este. ')
			return false;
		}
	}
	return true;
}


function new_form(tipo_form)  
{
	if (checkEmptyForms(tipo_form)== false)
		return;

	openEffect()

	var id = getNewId();
	var ajax = getAjax()
  
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
                if (response.Report=='1')
                {
//================================================================================================================
                    var form = document.createElement('span')
                    
                    if ((tipo_form=="education") && (globalEducationForm!=false))
                    {
                        form.innerHTML = globalEducationForm.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                    }
                    else if ((tipo_form=="experience") && (globalExperienceForm!=false))
                    {
                        form.innerHTML =globalExperienceForm.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                    } 
                    else if ((tipo_form=="languages") && (globalLanguageForm!=false))
                    {
                        form.innerHTML = globalLanguageForm.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                    }
                    else{
                            form.innerHTML = response.Html.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)

                            if (tipo_form=="education")
                                globalEducationForm = response.Html
                            if (tipo_form=="experience")
                                globalExperienceForm = response.Html
                            if (tipo_form=="languages")
                                globalLanguageForm = response.Html
                            
                        }

//================================================================================================================

        	        if (document.getElementById(tipo_form).getElementsByTagName("span")[0])
                    {                     
		                document.getElementById(tipo_form).insertBefore(form , document.getElementById(tipo_form).getElementsByTagName("span")[0])
			        }
			        if (!document.getElementById(tipo_form).getElementsByTagName("span")[0])
			        {
			            document.getElementById(tipo_form).appendChild(form)
			        }
                    showInfoDiv('green',response.Content)
			        closeEffect()
                    return;
                }
                if (response.Report=='0')
                {
                    showInfoDiv('red',response.Content)
                    closeEffect()
                    return
                }
            }
		}
	}


	if (tipo_form=="education")
    {
		url = document.location + "geteducationform/"
        if (globalEducationForm==false)
            postString = "?&sendform=1"
        else
            postString = "?&sendform=0"
    }
	if (tipo_form=="languages")
    {
		url = document.location + "getlanguageform/"
        if (globalLanguageForm==false)
            postString = "?&sendform=1"
        else
            postString = "?&sendform=0"
    }
	if (tipo_form=="experience")
    {
		url = document.location + "getexperienceform/"
        if (globalExperienceForm==false)
            postString = "?&sendform=1"
        else
            postString = "?&sendform=0"
    }

    ajax.open("POST", encodeURI(url), true);
    //ajax.setRequestHeader("Connection", "close");
    //ajax.setRequestHeader("Content-length", postString.length);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Referer", document.location);
    ajax.send(encodeURI(postString));
}
