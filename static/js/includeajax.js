function getAjax()
{
	var xmlHttp=null;

	try
  	{
  		xmlHttp=new XMLHttpRequest();
  	}
  	catch (e)
  	{
  		try
    		{
    			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
    		}
  		catch (e)
    		{
    			try
      			{
      				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
      			}
     			catch (e)
     			{
      				warning("Browser não suporta as funcionalidades.");
      				return false;
      			}
		}
  	}
  		
	return xmlHttp;
}

