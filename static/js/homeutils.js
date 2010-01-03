
function getNewId()
{
	var id=0;
	var forms = document.getElementsByTagName("form")
	for (c=0; c< forms.length ; c++ )
	{
		if (parseInt(forms[c].getAttribute('id'))>id  )
			id = parseInt(forms[c].getAttribute('id'));
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
			warning(locale['Existe um registo totalmente em branco na secção. Preencha este.']);
			return false;
		}
	}
	return true;
}


function hideStatus()
{
    window.status = "";
    return;
}

function validation(form_)
{
	var found_html=0;
	for (c=0;c<form_.length ; c++)
	{
		var strInputCode = form_[c].value;
		strInputCode = strInputCode.replace(/&(lt|gt);/g, function (strMatch, p1){return (p1 == "lt")? "<" : ">";});
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
						warning(locale['Formatação HTML não permitida foi removida']);
					}
				}
			}
		}
		form_[c].value =	strTagStrippedText;	
	}
}



function resetDate(object)
{
	object.value = "";
}


function reconfigure_slot(tipo_form)
{
	var forms = document.getElementById(tipo_form).getElementsByTagName("FORM");
	var k = parseInt(forms.length);
	//k;

	var c=0;
	
	for ( c=0; c<parseInt(forms.length) ; c++ )
	{
		forms[c].setAttribute('slot',k);
		k--;
	}		
}

function slot_forms(tipo_form)
{
	
	var forms = document.getElementById(tipo_form).getElementsByTagName("FORM");

	var slot=0 ;
	var c = 0 ;

	for (c=0 ; c < parseInt(forms.length) ; c++ )
	{
		if (parseInt(forms[c].getAttribute("slot")) > slot)
		{
			slot = parseInt(forms[c].getAttribute("slot"));
		}
	}

	slot++;
	return slot ;
	
}

function cutValue(txtarea)
{
	if (txtarea.value.length>4000)
	{
		txtarea.value=txtarea.value.substring(0,4000);
		warning(locale['Foi atingido o limite de caracteres neste campo']);
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



function setLanguage(language)
{
    openEffect()
    Set_Cookie(settings.locale_cookie_name,language,'','/','','');
    location.reload(true);
}


function checkCookies()
{
	Set_Cookie( 'test', 'none', '', '/', '', '' );
    if ( Get_Cookie( 'test' ) )
	{
		cookie_set = true;
		Delete_Cookie('test', '/', '');
        return true;
	}
	else
	{
        warning(locale["Os seus cookies estão desactivados, estes necessitam de serem activados para poder proseguir"])
        return false;
    } 
}


function setLocale(object)
{
    var labels = object.getElementsByTagName('label')
    for (c=0;c<labels.length;c++)
    {
       try{
                if (locale[labels[c].getAttribute('type')])
                {
                    labels[c].innerHTML = locale[labels[c].getAttribute('type')]
                    labels[c].getElementsByTagName('select')[0].setAttribute('name',labels[c].getAttribute('name'))
                }
                else if (locale[labels[c].innerHTML])
                    labels[c].innerHTML=locale[labels[c].innerHTML]
            }
       catch(err){} 
    }

    var as = object.getElementsByTagName('A')
    for (c=0;c<as.length;c++)
    {                                       
        try{
                if (locale[as[c].innerHTML])
                    as[c].innerHTML=locale[as[c].innerHTML]
            }
        catch(err){} 
    }

    var img = object.getElementsByTagName('img')
    for (c=0;c<img.length;c++)
    {          
        try{
                if (locale[img[c].getAttribute('title')])   
                        img[c].setAttribute('title',locale[img[c].getAttribute('title')])
            }
        catch(err){} 
    }     
}
/*
function init()
{
    setLocale(document)
    fbInit() 
    document.getElementById('body').style.display = "block"
    closeEffect();
}
*/
