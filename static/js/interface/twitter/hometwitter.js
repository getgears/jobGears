function twitterAuthorize()
{
    var ajax  = getAjax()
    var url = settings.twitter_auth_url

    $.getJSON(encodeURI(url),function(response)
    {
            //var response = eval('('+ajax.responseText+')')
            if (response.auth=='0')
            {
                popupWindow = window.open(response.url,'twitter','height=400,width=800,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no')
                window.setInterval(function() { if (popupWindow.closed){  window.location.reload()  }  }  ,1000)
            }
            if (response.auth=='1')
            {
                /*********************this section must be removed when the twitter popup is ready***************************/
                var auxAjax = getAjax()
                var url = settings.root_url + settings.twitter_status_url + "?status="
                status = response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears'
                url = url + status
                warning(status)
                warning(response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears')
                auxAjax.open("GET",encodeURI(url),true)
                auxAjax.send(null)
                /***********************************************************************************************************/
            }            
    });
}


function twitterSendStatus()
{
    var auxAjax = getAjax()
    var url = settings.root_url + settings.twitter_status_url +"?status="
    status = response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears'
    url = url + status
    warning(status)
    warning(response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears')
    auxAjax.open("GET",encodeURI(url),true)
    auxAjax.send(null)
}
