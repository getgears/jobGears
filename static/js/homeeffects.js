function localeSelection()
{
    $('#cover').css('opacity','0.7');           
    $('#cover').show();                         
    $('#lang_div').show();
}

function hideLocaleSelection()
{
    $('#lang_div').hide();
    $('#cover').hide();
}
// #########################################################################################
function warning(message)
{
    $('#loading').hide();
    $('span','#warning').attr('innerHTML',message);
    $('#cover').css('opacity','0.7');
    $('#cover').show();
    $('#warning').show();
    $('a','#warning').click(function () {
                            $('#warning').hide();
                            $('#cover').hide();
                            $('#publish_div').hide();
                            return true;
                    });
}

function sure(id_form,tipo_form)
{
    $('span','#sure').attr('innerHTML',locale['Are you sure?']);
    $('#sure a')[0].setAttribute('href','javascript:void(0);');
    $('#sure a')[1].setAttribute('href','javascript:erase('+id_form+',"'+tipo_form+'")');

    $('#cover').css('opacity','0.7');
    $('#cover').show();
    $('#sure').show();

    $('#sure a')[0].onclick=function()
    {
        $('#sure').hide();
        $('#cover').hide();
    }
    $('#sure a')[1].onclick=function()
    {
        $('#sure').hide();
    }  
}

//#################################################################################
function showPublishDiv()
{
    $('#loading').hide();
    $('#cover').css('opacity','0.7');
    $('#cover').show();
    $('#publish_div').show();
}

function hidePublishDiv()
{
    $('#twitter_publish').hide();
    $('#loading').hide();
    $('#publish_div').hide();
    $('#cover').hide();
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
    $('#cover').css('opacity','0.7');
    $('#cover').show();
    $('#loading').show();
}

function closeEffect()
{
    $('#loading').hide();       
    $('#cover').hide();
}


function showTwitterPublishBox()
{
    $('#loading').hide();
    $('#twitter_publish').show();
}

function hideTwitterPublishBox()
{
    $('#twitter_publish').hide();
}

