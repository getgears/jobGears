function fbInit()
{          
    try
    {    
        FB.Connect.get_status().waitUntilReady(function(status) 
            {           
                if (status == FB.ConnectState.connected)
                {
                    document.getElementById('fbloggedin').style.visibility = "visible"
                    document.getElementById('fbloggedin').style.display = "inline"
                }
                if ((status == FB.ConnectState.userNotLoggedIn) || (status == FB.ConnectState.appNotAuthorized))
                {
                    document.getElementById('fblogin').style.visibility = "visible"
                    document.getElementById('fblogin').style.display = "inline"
                }
                // ATTENTION REMOVE THIS LATTER!!!!!!!!!! 
                document.getElementById("body").style.display="block"
                closeEffect();
            });     
    }
    catch(err)
        {   
            window.setTimeout(fbInit,500) 
        }

}
            

function fbLoggedIn()
{
    var ajax = getAjax()
    var url = "setfbuid/?&fbuid="+ FB.Connect.get_loggedInUser()

    ajax.open("GET",encodeURI(url),true)
    ajax.send(null)    

    FB.Connect.showPermissionDialog("offline_access, publish_stream",function(perms) {
            if (!perms)
            {
                // user didn't gave his premissions 
            }   
            if (perms)
            {
                // user gave his permissions 
            }
            location.reload(true);
    },true);
    
}

function fbStreamPublish()
{
    var ajax  = getAjax()
    //var url = "./generatepermlink/"
    var url = "./publishfb/"

    ajax.onreadystatechange = function ()
    {
        if ((ajax.readyState==4) || (ajax.readyState=="complete"))
        {
            //var response = JSON.parse(ajax.responseText
            var response = eval('('+ajax.responseText+')')
 
            var attachment = {'media': [{'type': response.type ,
                             'src': response.src ,
                             'href': response.href  }]}         
 
            FB.Connect.streamPublish(response.message+' '+response.jobgearscv , attachment)

        }
    }

    ajax.open("GET",encodeURI(url),true)
    ajax.send(null)

}

