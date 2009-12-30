function twitterAuthorize()
{
    var ajax  = getAjax()
    var url = "twitter/auth/"

    ajax.onreadystatechange = function ()
    {
        if ((ajax.readyState == 4) || (ajax.readyState == "complete"))
        {  
            var response = eval('('+ajax.responseText+')')
            if (response.auth=='0')
            {
                popupWindow = window.open(response.url,'twitter','height=400,width=800,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no')
                window.setInterval(function() { if (popupWindow.closed){  window.location.reload()  }  }  ,1000)
            }
            if (response.auth=='1')
            {
                /*********************this section must be removed when the twiter popup is ready***************************/
                var auxAjax = getAjax()
                var url = "./sendstatus/?status="
                status = response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears'
                url = url + status
                warning(status)
                warning(response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears')
                auxAjax.open("GET",encodeURI(url),true)
                auxAjax.send(null)
                /***********************************************************************************************************/
            }            
        }
    }

    ajax.open("GET",encodeURI(url),true)
    ajax.send(null)

}


