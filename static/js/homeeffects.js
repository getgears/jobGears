function warning(message)
{
    $('span','#warning').attr('innerHTML',message);
    $('#background').css('opacity','0.5');
    $('#background').show();
    $('#warning').css('visibility','visible');
    $('#warning').show();
    $('a','#warning').click(function () {
                            $('#warning').hide();
                            $('#background').fadeOut();
                            return true;
                    });
}

function sure(id_form,tipo_form)
{
    $('span','#sure').attr('innerHTML',locale['Deseja mesmo apagar o registo?']);
    $('#sure a')[0].setAttribute('href','javascript:void(0);');
    $('#sure a')[1].setAttribute('href','javascript:erase('+id_form+',"'+tipo_form+'")');

//    $('#background').css('visibility','visible');
    $('#background').css('opacity','0.5');
    $('#background').show();

    $('#sure').css('visibility','visible');
    $('#sure').show();

/*
    document.getElementById("background").style.visibility = "visible";
    document.getElementById("background").style.display = "block";
    document.getElementById("sure").style.visibility = "visible";
    document.getElementById("sure").style.display = "block";
*/

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
    $('#loading').hide();
    $('#background').css('opacity','0.5');
    $('#background').show();
    $('#publish_div').css('visibility','visible');
    $('#publish_div').show();
}

function hidePublishDiv()
{
    $('#loading').hide();
    $('#publish_div').hide();
    $('#background').fadeOut();
}
//#################################################################################
function showInfoDiv(color, message)
{
    if (color=='green')
    {
        $('#request_report').css('background-color',settings.info_positive_color);
    }
    if (color=='red')
    {
        $('#request_report').css('background-color',settings.info_negative_color);
    }
    $('#request_report').attr('innerHTML',message);
    $('#request_report').css('visibility','visible');
    $('#request_report').show();
    window.setTimeout(function() { $('#request_report').fadeOut('slow'); } , 2000);

}
// ######################################################################################################

function openEffect()
{
    $('#background').css('visibility','visible');
    $('#loading').css('visibility','visible');
    $('#background').css('opacity','0.5');
    $('#background').show();
    $('#loading').show();
}

function closeEffect()
{
    $('#loading').hide();       
    $('#background').fadeOut();
}
