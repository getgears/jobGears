function fbInit()
{          
    try
    {    
        FB.Connect.get_status().waitUntilReady(function(status) 
            {           
                if (status == FB.ConnectState.connected)
                {
                    $('#fbloggedin').css('visibility','visible');
                    $('#fbloggedin').css('display','inline');
                }
                if ((status == FB.ConnectState.userNotLoggedIn) || (status == FB.ConnectState.appNotAuthorized))
                {
                    $('#fblogin').css('visibility','visible');
                    $('#fblogin').css('display','inline');
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
    //var postString = "?&fbuid="+ FB.Connect.get_loggedInUser()
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

