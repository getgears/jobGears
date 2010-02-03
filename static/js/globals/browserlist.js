var userAgent = navigator.userAgent.toLowerCase();
$.browser = {
        version: (userAgent.match( /.+(?:rv|it|ra|ie|me)[\/: ]([\d.]+)/ ) || [])[1],
        chrome: /chrome/.test( userAgent ),
        safari: /webkit/.test( userAgent ) && !/chrome/.test( userAgent ),
        opera: /opera/.test( userAgent ),
        msie: /msie/.test( userAgent ) && !/opera/.test( userAgent ),
        mozilla: /mozilla/.test( userAgent ) && !/(compatible|webkit)/.test( userAgent )
};

var browserList = new Object();
browserList['msie'] = new Object();
browserList['msie']['7.0']= true;
browserList['msie']['8.0']= true;


browserList['chrome'] = new Object();
browserList['safari'] = new Object();
browserList['mozilla'] = new Object();
browserList['opera'] = new Object();
