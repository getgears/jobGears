function publishMenuInit()
{   
    var locale = Get_Cookie('locale');
    $div = $('<div></div>');
    $div.attr('class','menu');
    $div.attr('id','publish');
    $div.attr('innerHTML','<a href="javascript:void(0);" onclick="showPublishDiv();"><img src="../locale/'+locale+'/images/publish.jpg" alt="Publish" /></a>');
    $div.insertBefore('#wrapper div:first');
}
