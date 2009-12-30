
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
			warning(locale['Existe um registo totalmente em branco na secção. Preencha este.'])
			return false;
		}
	}
	return true;
}


function new_form(tipo_form)  
{
	if (checkEmptyForms(tipo_form)== false)
		return;   
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

	openEffect()

	var id = getNewId();
	var ajax = getAjax()
    var slot = slot_forms(tipo_form)
  
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
                //response = eval('('+ajax.responseText+')')
                //if (response.Report=='1')
                //{
                    var form = document.createElement('span')
                    var response = new Object();

                    //response.Slot='1'

                    if ((tipo_form=="education") && (globalEducationForm!=false))
                    {
                        form.innerHTML = globalEducationForm.split('##id##').join(id.toString()).split('##slot##').join(slot.toString())
                        //form.innerHTML = globalEducationForm.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                    }
                    else if ((tipo_form=="experience") && (globalExperienceForm!=false))
                    {
                        form.innerHTML =globalExperienceForm.split('##id##').join(id.toString()).split('##slot##').join(slot.toString())
//                        form.innerHTML =globalExperienceForm.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                    } 
                    else if ((tipo_form=="languages") && (globalLanguageForm!=false))
                    {
                        form.innerHTML = globalLanguageForm.split('##id##').join(id.toString()).split('##slot##').join(slot.toString())
//                        form.innerHTML = globalLanguageForm.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                    }
                    else{
                            //form.innerHTML = response.Html.split('##id##').join(id.toString()).split('##slot##').join(response.Slot)
                            form.innerHTML = ajax.responseText.split('##id##').join(id.toString()).split('##slot##').join(slot.toString())
                            if (tipo_form=="education")
                            {
                                globalEducationForm = ajax.responseText
                                //globalEducationForm = response.Html
                            }
                            if (tipo_form=="experience")
                            {
                                globalExperienceForm = ajax.responseText
                                //globalExperienceForm = response.Html
                            }
                            if (tipo_form=="languages")
                            {
                                globalLanguageForm = ajax.responseText
                                //globalLanguageForm = response.Html
                            }
                            
                        }

                    setLocale(form)

        	        if (document.getElementById(tipo_form).getElementsByTagName("span")[0])
                    {                     
		                document.getElementById(tipo_form).insertBefore(form , document.getElementById(tipo_form).getElementsByTagName("span")[0])
			        }
			        if (!document.getElementById(tipo_form).getElementsByTagName("span")[0])
			        {
			            document.getElementById(tipo_form).appendChild(form)
			        }
                    showInfoDiv('green',locale['item adicionado'])
			        closeEffect()
                    return;
                //}
                //if (response.Report=='0')
                //{
                //    showInfoDiv('red',response.Content)
                //    closeEffect()
                //    return
                //}
            }
		}
	}


	if (tipo_form=="education")
    {
        globalEditingEducation = true;
		//url = document.location + "form/render/educationRender.html"
        url = "http://andrefsp.servehttp.com/form/render/educationRender.html"
        if (globalEducationForm==false)
            postString = "?&sendform=1"
        else
            postString = "?&sendform=0"
    }
	if (tipo_form=="languages")
    {
        globalEditingLanguage = true;
		//url = document.location + "form/render/languageRender.html"
        url = "http://andrefsp.servehttp.com/form/render/languageRender.html"
        if (globalLanguageForm==false)
            postString = "?&sendform=1"
        else
            postString = "?&sendform=0"
    }
	if (tipo_form=="experience")
    {
        globalEditingExperience = true;
		//url = document.location + "form/render/experienceRender.html"
        url = "http://andrefsp.servehttp.com/form/render/experienceRender.html"
        if (globalExperienceForm==false)
            postString = "?&sendform=1"
        else
            postString = "?&sendform=0"
    }

    ajax.open("POST", encodeURI(url), true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Referer", document.location);
    ajax.send(encodeURI(postString));
}
