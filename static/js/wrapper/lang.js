function langMenuInit()
{   
    var locale = Get_Cookie('locale');
    $div = $('<div></div>');
    $div.attr('class','menu');
    $div.attr('id','lang');
    $div.attr('innerHTML','<a href="javascript:void(0);" onclick="localeSelection();"><img src="../locale/'+locale+'/images/lang.jpg" alt="Publish" /></a>');
    $div.insertBefore('#wrapper div:first');
}
