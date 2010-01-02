
function warning(message)
{
    document.getElementById('warning').getElementsByTagName('span')[0].innerHTML = message;
    document.getElementById('background').style.visibility = "visible";
    document.getElementById('background').style.display = "block";
    document.getElementById('warning').style.visibility = "visible";
    document.getElementById('warning').style.display = "block"; 
  
    document.getElementById('warning').getElementsByTagName("a")[0].onclick = function(){
                            document.getElementById('warning').style.display = "none";
                            document.getElementById('warning').style.visibility = "hidden";
                            document.getElementById('background').style.visibility = "hidden";
                            document.getElementById('background').style.display = "none";
                            return true;
                         }
}

function sure(id_form,tipo_form)
{
    document.getElementById("sure").getElementsByTagName('span')[0].innerHTML = locale['Deseja mesmo apagar o registo?'];
    document.getElementById("sure").getElementsByTagName('a')[0].setAttribute('href','#no');
    document.getElementById("sure").getElementsByTagName('a')[1].setAttribute('href','javascript:erase('+id_form+',"'+tipo_form+'")');

    document.getElementById("background").style.visibility = "visible";
    document.getElementById("background").style.display = "block";
    document.getElementById("sure").style.visibility = "visible";
    document.getElementById("sure").style.display = "block";

    document.getElementById("sure").getElementsByTagName('a')[0].onclick=function()
    {
        document.getElementById("background").style.visibility = "hidden";
        document.getElementById("background").style.display = "none";
        document.getElementById("sure").style.visibility = "hidden";
        document.getElementById("sure").style.display = "none";             
    }
    document.getElementById("sure").getElementsByTagName('a')[1].onclick=function()
    {
        document.getElementById("sure").style.visibility = "hidden"               
        document.getElementById("sure").style.display = "none"             
    }  
}

//#################################################################################
function showPublishDiv()
{
    document.getElementById('background').style.visibility = "visible"
    document.getElementById('background').style.display = "block"
    document.getElementById('publish_div').style.visibility = "visible"
    document.getElementById('publish_div').style.display = "block"
}

function hidePublishDiv()
{
    document.getElementById('publish_div').style.visibility = "hidden"
    document.getElementById('publish_div').style.display = "none"
    document.getElementById('background').style.visibility = "hidden"
    document.getElementById('background').style.display = "none"
}
//#################################################################################
function hideInfoDiv()
{     
    if (globalOpacity <= parseFloat(0.05) )
    {
        globalOpacity = parseFloat(1) ; 
        document.getElementById('request_report').style.visibility = "hidden"
        document.getElementById('request_report').style.display = "none"
        document.getElementById('request_report').style.opacity =  globalOpacity     
        document.getElementById('request_report').style.filter = 'alpha(opacity='+globalOpacity*100+')' 
        return;
    }
    if ( globalOpacity > parseFloat(0.05) )
    { 
        globalOpacity = globalOpacity - parseFloat(0.005)
        document.getElementById('request_report').style.opacity = globalOpacity; 
        document.getElementById('request_report').style.filter = 'alpha(opacity='+globalOpacity*100+')'
        lastSetTimeOut = window.setTimeout(hideInfoDiv, 10)
    }
}


function showInfoDiv(color, message)
{
    globalOpacity = parseFloat(1) ; 
    clearTimeout(lastSetTimeOut) ;
    
    if (color=='green')
    {
        document.getElementById('request_report').style.backgroundColor = settings.info_positive_color
        document.getElementById('request_report').style.backgroundcolor = settings.info_positive_color
    }
    if (color=='red')
    {
        document.getElementById('request_report').style.backgroundColor = settings.info_negative_color
        document.getElementById('request_report').style.backgroundcolor = settings.info_negative_color
    }

    document.getElementById('request_report').innerHTML = message
    document.getElementById('request_report').style.visibility = "visible"
    document.getElementById('request_report').style.display = "inline"

    lastSetTimeOut = window.setTimeout(hideInfoDiv, 2000);

}
// ######################################################################################################

function openEffect()
{
	document.getElementById("background").style.display="block";
	document.getElementById("background").style.visibility="visible";
	document.getElementById("loading").style.display="block";
	document.getElementById("loading").style.visibility="visible";
}



function closeEffect()
{
	document.getElementById("loading").style.display="none";
	document.getElementById("loading").style.visibility="hidden";
	document.getElementById("background").style.display="none";
	document.getElementById("background").style.visibility="hidden";
}

// ##############################################################################

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

function init()
{
    setLocale(document)
    fbInit() 
    document.getElementById('body').style.display = "block"
    closeEffect();
}

