function twitterAuthorize()
{

    var ajax  = getAjax()
    var url = "./twitterauth/"

    ajax.onreadystatechange = function ()
    {
        if ((ajax.readyState == 4) || (ajax.readyState == "complete"))
        {  
            var response = eval('('+ajax.responseText+')')
            if (response.auth=='0')
            {
                popupWindow = window.open(response.url,'Twitter','location=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no,height=400,width=800')
                window.setInterval(function() { if (popupWindow.closed){  window.location.reload()  }  }  ,1000)
            }
            if (response.auth=='1')
            {
                /*********************this section must be removed when the twiter popup is ready***************************/
                var auxAjax = getAjax()
                var url = "./twittersendstatus/?status="
                status = response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears'
                url = url + status
                alert(status)
                alert(response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears')
                auxAjax.open("GET",encodeURI(url),true)
                auxAjax.send(null)
                /***********************************************************************************************************/
            }            
        }
    }

    ajax.open("GET",encodeURI(url),true)
    ajax.send(null)

}


function twitterConnect()
{
    var ajax  = getAjax()
    var url = "./generatepermlink/"

    ajax.onreadystatechange = function ()
    {
        if ((ajax.readyState == 4) || (ajax.readyState == "complete"))
        {       
            var response = eval('('+ajax.responseText+')')
            var message = response.message+" em "+response.jobgearscv

            if (confirm("Publicar no Twitter?")==1)
                window.open('http://twitter.com/home?status='+encodeURI(message),"_blank")
            else
                return;
            
        }
    }

    ajax.open("GET",encodeURI(url),true)
    ajax.send(null)


}
