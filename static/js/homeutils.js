var globalOpacity = parseFloat(1) 
var lastSetTimeOut ;

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
         document.getElementById('request_report').style.backgroundColor = '#008705'
         document.getElementById('request_report').style.backgroundcolor = '#008705'
    }
    if (color=='red')
    {
        document.getElementById('request_report').style.backgroundColor = '#B60008'
        document.getElementById('request_report').style.backgroundcolor = '#B60008'
    }

    document.getElementById('request_report').innerHTML = message
    document.getElementById('request_report').style.visibility = "visible"
    document.getElementById('request_report').style.display = "inline"

    lastSetTimeOut = window.setTimeout(hideInfoDiv, 2000);

}
// ######################################################################################################

function openEffect()
{

	document.getElementById("background").style.display="block"
	document.getElementById("background").style.visibility="visible"

	document.getElementById("loading").style.display="block"
	document.getElementById("loading").style.visibility="visible"
}



function closeEffect()
{
	document.getElementById("loading").style.display="none"
	document.getElementById("loading").style.visibility="hidden"

	document.getElementById("background").style.display="none"
	document.getElementById("background").style.visibility="hidden"
}



function setLanguage(language)
{
    var ajax = getAjax()

    openEffect()
    ajax.onreadystatechange = function()
    {
        if (ajax.readyState==4)
        {
            Set_Cookie('locale',language,'','/','','');
            location.reload(true);
        }
    }

    var url = "setuserlanguage/?&lang="+language
    ajax.open("GET",encodeURI(url),true)
    ajax.send(null)
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
        alert("Os seus cookies estão desactivados, estes necessitam de serem activados para poder proseguir.")
        return false;
    } 
}


function setLocale(object)
{
    var labels = object.getElementsByTagName('label')
    for (c=0;c<labels.length;c++)
    {
       try{
                if (locale[labels[c].innerHTML])
                    labels[c].innerHTML=locale[labels[c].innerHTML]
            }
       catch(err)
            {} 
    }
    var as = object.getElementsByTagName('A')
    for (c=0;c<as.length;c++)
    {                                       
        try{
                if (locale[as[c].innerHTML])
                    as[c].innerHTML=locale[as[c].innerHTML]
            }
        catch(err)
            {} 
    }
    var img = object.getElementsByTagName('img')
    for (c=0;c<img.length;c++)
    {         
        //alert(img[c].getAttribute('title'))                              
        try{
                if (locale[img[c].getAttribute('title')])
                    img[c].setAttribute('title',locale[img[c].getAttribute('title')])
            }
        catch(err)
            {} 
    }                                                       
}

function init()
{
    setLocale(document)
    fbInit() 
    document.getElementById('body').style.display = "block"
    closeEffect();
}

