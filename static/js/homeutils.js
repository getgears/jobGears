function trueFalseToOneZero(val)
{
    if (val==true)
        return 1;
    else if (val==false)
        return 0;
}

function browserCheck()
{
    if (($.browser.chrome) || ( $.browser.mozilla)  || ( $.browser.opera) || ($.browser.safari))
        return true;
    
    else if ($.browser.msie)
    {
        if ($.browser.version in browserList['msie'])
            return true;
        else
        {
            warning('jobGears does not support your browser ');
            return false;
        }
    }
    else if ((!$.browser.chrome) && (!$.browser.mozilla) && (!$.browser.opera) && (!$.browser.msie))
        return false;

    return false;
}

function getNewId()
{
    var forms = $('#cv form');
    var id = parseInt(0);
    for (c=0;c<forms.length;c++)
        if (parseInt(forms.get(c).getAttribute('id'))>id)
            id = parseInt(forms.get(c).getAttribute('id'));
    id++;
    return id;
}

function checkEmptyForms(section)
{
    var forms = $('#'+section+' form')
    for (c=0;c<forms.length;c++)
        if (check_blanck_fields(forms.get(c).getAttribute('id'),section)==0)
        {
            warning(locale['There is an empty record in the section']);
            return false;
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
                        //warning(locale['Not allowed HTML tags removed']);
                    }
                }
            }
        }
        form_[c].value = strTagStrippedText;    
    }
}

function resetDate(object)
{
    object.value = "";
}

function reconfigure_slot(section)
{
    var forms = $('#'+section+' form');
    for ( c=0 ; c<parseInt(forms.length) ; c++ )
        forms.get(c).setAttribute('slot',forms.length-c);
    
}

function getNewSlot(section)
{
    var slot = parseInt($('#'+section+' form').length);
    slot++;
    return slot;
}

function cutValue(txtarea)
{
    if (txtarea.value.length>4000)
    {
        txtarea.value=txtarea.value.substring(0,4000);
        warning(locale['You reached the maximum character number in this field']);
    }
}

function check_blanck_fields(form_id,section)
{
    if (section=="languages")
    {    
        if (($('#'+form_id+' input:eq(0)').attr('value')!='') && ($('#'+form_id+' input:eq(0)').attr('value')!=' '))
            return 1;
        else if (($('#'+form_id+' input:eq(0)').attr('value')=='') || ($('#'+form_id+' input:eq(0)').attr('value')==' '))
            return 0;
    }

    var ELEMENTS_LENGTH = $('#'+form_id+' :input').length
    for (c=0;c<ELEMENTS_LENGTH;c++)
    {        
        $element = $('#'+form_id+' :input:eq('+c+')');     
        if (($element.attr('type')!='checkbox') && ($element.attr('tipo')!='data') && ($element.attr('value')!='') && ($element.attr('value')!=' '))
            return 1;
    }
    return 0;
}


function setLanguage(language)
{
    openEffect()
    set_cookie(settings.locale_cookie_name,language,'','/','','');
    location.reload(true);
}


function checkCookies()
{
    set_cookie( 'test', 'none', '', '/', '', '' );
    if ( get_cookie( 'test' ) )
    {
        cookie_set = true;
        delete_cookie('test', '/', '');
        return true;
    }
    else
    {
        warning(locale["Your cookies are disabled. Enable it in order to continue"])
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

    var option = object.getElementsByTagName('option')
    for (c=0;c<option.length;c++)
    {          
        try{
                if (locale[option[c].innerHTML])   
                        option[c].innerHTML = locale[option[c].innerHTML]
            }
        catch(err){} 
    }                                                                                    
}
