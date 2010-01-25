function popUp(href)
{
    popupWindow = window.open(href,null,'height=400,width=800,directories=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,copyhistory=no');    
    window.setInterval(function() { if (popupWindow.closed){  window.location.reload()  }  }  ,1000);
}

function tweetChange()
{
    val = $('#twitter_publish textarea').attr('value').length
    $('#twitter_publish label').css('color','rgb('+parseInt(val*1.82)+','+parseInt(255-val*1.82)+',0)');
    $('#twitter_publish label').css('font-weight','bold');
    $('#twitter_publish label').attr('innerHTML',parseInt(140)-parseInt($('#twitter_publish textarea').attr('value').length));
}

function twitterAuthorize()
{
    var url = settings.twitter_auth_url;
    $('#loading').show();
    $.getJSON(encodeURI(url),function(response)
    {
            if (response.auth=='0')
            {
                $('#twitter_publish textarea').hide();
                $('#twitter_publish a:last').hide();
                $('#twitter_publish span:first').attr('innerHTML','not authorized click <a href="#" onclick="popUp(\''+response.url+'\'); return false;">here</a>'); 
                $('#twitter_publish span:last').hide();
                showTwitterPublishBox();
            }
            if (response.auth=='1')
            {
                $('#twitter_publish textarea').attr('innerHTML',response.twitterScreenName+' actualizou o curriculo em '+response.jobgearscv);
                $('#twitter_publish textarea').show();
                $('#twitter_publish span:last').attr('innerHTML','Characters left ');
                $('#twitter_publish span:first').attr('innerHTML','<a href="'+response.jobgearscv+'">'+response.jobgearscv+'</a>');
                tweetChange();
                $('#twitter_publish a:last').show();
                showTwitterPublishBox();
            }            
    });
}

/*this method is experimental*/
function twitterSendStatus()
{
    var auxAjax = getAjax();
    var url = settings.twitter_status_url +"?status=";
    status = response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears';
    url = url + status;
    warning(status);
    warning(response.twitterScreenName+' '+response.message+' '+response.jobgearscv+' @jobgears');
    auxAjax.open("GET",encodeURI(url),true);
    auxAjax.send(null);
}
