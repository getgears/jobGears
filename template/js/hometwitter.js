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
