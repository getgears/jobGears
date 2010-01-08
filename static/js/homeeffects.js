function localeSelection()
{
    $('#cover').css('visibility','visible');
    $('#cover').css('opacity','0.5');           
    $('#cover').show();                         
    $('#lang_div').css('visibility','visible');
    $('#lang_div').show();
}

function hideLocaleSelection()
{
    $('#lang_div').hide();
    $('#cover').fadeOut('fast');


}
// #########################################################################################
function warning(message)
{
    $('span','#warning').attr('innerHTML',message);
    $('#cover').css('visibility','visible');
    $('#cover').css('opacity','0.5');
    $('#cover').show();
    $('#warning').css('visibility','visible');
    $('#warning').show();
    $('a','#warning').click(function () {
                            $('#warning').hide();
                            $('#cover').fadeOut('fast');
                            return true;
                    });
}

function sure(id_form,tipo_form)
{
    $('span','#sure').attr('innerHTML',locale['Are you sure?']);
    $('#sure a')[0].setAttribute('href','javascript:void(0);');
    $('#sure a')[1].setAttribute('href','javascript:erase('+id_form+',"'+tipo_form+'")');

    $('#cover').css('opacity','0.5');
    $('#cover').show();
    $('#sure').css('visibility','visible');
    $('#sure').show();

    $('#sure a')[0].onclick=function()
    {
        $('#sure').hide();
        $('#cover').fadeOut('fast');
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
    $('#cover').css('opacity','0.5');
    $('#cover').css('visibility','visible');
    $('#cover').show();
    $('#publish_div').css('visibility','visible');
    $('#publish_div').show();
}

function hidePublishDiv()
{
    $('#loading').hide();
    $('#publish_div').hide();
    $('#cover').fadeOut('fast');
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
    $('#cover').css('visibility','visible');
    $('#loading').css('visibility','visible');
    $('#cover').css('opacity','0.5');
    $('#cover').show();
    $('#loading').show();
}

function closeEffect()
{
    $('#loading').hide();       
    $('#cover').fadeOut();
}
