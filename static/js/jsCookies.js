function Set_Cookie( name, value, expires, path, domain, secure )
{
	var today = new Date();
	today.setTime( today.getTime() );
	
	if ( expires )
	{
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );

	document.cookie = name + "=" +escape( value ) +
	( ( expires ) ? ";expires=" + expires_date.toGMTString() : "" ) +
	( ( path ) ? ";path=" + path : "" ) +
	( ( domain ) ? ";domain=" + domain : "" ) +
	( ( secure ) ? ";secure" : "" );

}



function Get_Cookie( check_name ) 
{
	var a_all_cookies = document.cookie.split( ';' );
	var a_temp_cookie = '';
	var cookie_name = '';
	var cookie_value = '';
	var b_cookie_found = false; 

	for ( i = 0; i < a_all_cookies.length; i++ )
	{
		a_temp_cookie = a_all_cookies[i].split( '=' );
		cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

		if ( cookie_name == check_name )
		{
			b_cookie_found = true;
			
			if ( a_temp_cookie.length > 1 )
			{
				cookie_value = unescape( a_temp_cookie[1].replace(/^\s+|\s+$/g, '') );
			}

			return cookie_value;
			
			break;
		}
		a_temp_cookie = null;
		cookie_name = '';
	}
	if ( !b_cookie_found )
	{
		return null;
	}

}


function Delete_Cookie( name, path, domain ) 
{
	if ( Get_Cookie( name ) ) document.cookie = name + "=" +
	( ( path ) ? ";path=" + path : "") +
	( ( domain ) ? ";domain=" + domain : "" ) + 
	";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}



function checkCookies()
{
	Set_Cookie( 'test', 'none', '', '/', '', '' );
	if ( Get_Cookie( 'test' ) )
	{
		//alert( 'your cookies are enabled' );
		cookie_set = true;
		Delete_Cookie('test', '/', '');
	}
	else
	{
		var ajax = getAjax();
		url = "./cookiesdisabled/"


		ajax.onreadystatechange = function ()
			{
				if ((ajax.readyState == 4) || (ajax.readyState == "complete"))
				{
					alert(ajax.responseText)
				}
			
			}
		//alert( 'cookies are not currently enabled.' );

		cookie_set = false;
		ajax.open("GET",url,true)
		ajax.send(null)

	}

}
