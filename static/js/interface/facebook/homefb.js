function fbInit()
{          
    try
    {    
        FB.Connect.get_status().waitUntilReady(function(status) 
            {           
                if (status == FB.ConnectState.connected)
                {
                    $('#fbloggedin').css('visibility','visible');
                    $('#fbloggedin').show();
                    //document.getElementById('fbloggedin').style.visibility = "visible"
                    //document.getElementById('fbloggedin').style.display = "inline"
                }
                if ((status == FB.ConnectState.userNotLoggedIn) || (status == FB.ConnectState.appNotAuthorized))
                {
                    $('#fblogin').css('visibility','visible');
                    $('#fblogin').show();
                    //document.getElementById('fblogin').style.visibility = "visible"
                    //document.getElementById('fblogin').style.display = "inline"
                }
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
/*    var url = settings.root_url + "facebook/setfbuid/"
    var postString = "?&fbuid="+ FB.Connect.get_loggedInUser()


    ajax.open("POST",encodeURI(url),true);
    ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    ajax.setRequestHeader("X-Referer", document.location);
    ajax.send(encodeURI(postString));
*/
    FB.Connect.showPermissionDialog("offline_access, publish_stream",function(perms) {
            if (!perms)
            {
                // user didn't gave his premissions 
            }   
            if (perms){ }
            location.reload(true);
    },true);
    
}

function fbStreamPublish()
{
    var url = settings.facebook_publish_url

    $.getJSON(encodeURI(url),function(response){
        var attachment = {'media': [{'type': response.type ,
                          'src': response.src ,
                          'href': response.href  }]}         
        FB.Connect.streamPublish(response.message+' '+response.jobgearscv , attachment)
    });
}

