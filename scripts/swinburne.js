/*  Swinburne Javascript Functions - (JQUERY)

	High Contrast Style Sheet Switcher 
	Allows users to switch to a high contrast style sheet. 
	
	Text Resize Styles
	Allows users to switch to a smaller or larger text size
	  
	Cookies
	Set/Get/Delete Cookies
 
    Updated: Wed 11.11.09 - Upgraded to JQUERY 1.3.2 - needed to remove @ from line 57 as @ is deprecated
	Updated: Thurs 27.11.08
   ----------------------------------------------------*/

$(document).ready(function() {
						   
	//if highcontrast link is selected
	$('.swinstyleswitch').click(function()
	{
		//Call swinSwitchStyle function passing the stylesheet name
		swinSwitchStyle(this.getAttribute("rel"));
		return false;
	});
	
	//if resize text links are selected
	$('.textsize').click(function()
	{
		//Call swinTextResize function passing the id (size) value
		swinTextResize(this.getAttribute("id"));
		return false;
	});
	
	//Get Style Switcher Cookie
	var swinStyleCookie = $.cookie('swin-style');
	//if cookie exists call switchstyle function
	if (swinStyleCookie) swinSwitchStyle(swinStyleCookie);
	
	//Get Text Resize Cookie
	var swinResizeCookie = $.cookie('swin-textsize');
	//if cookie exists call switchstyle function
	if (swinResizeCookie) swinTextResize(swinResizeCookie);
	
});


/*  function swinSwitchStyle()
 
 	Enables the alternative stylesheet(high contrast) and sets a cookie with style name. 
	
 	parameter: swinStyleName - Name of the alternative style sheet to enable. 
   ----------------------------------------------------*/ 

function swinSwitchStyle(swinStyleName)
{
	//Gets all the style sheets on the page
	//$('link[@rel*=style][@title]').each(function(i) 
	$('link[rel*=style][title]').each(function(i) 										 
	{
		//if default style sheet is selected pass value as null to delete cookie.
		if (swinStyleName == 'import') {
			swinStyleName = null;
		}
		
		//Disabled style sheets
		this.disabled = true;
		//If alternative style sheet is the same as swinStyleName then enable stylesheet.
		if (this.getAttribute('title') == swinStyleName) this.disabled = false;
	});
	
	//Create swin-style Cookie
	$.cookie('swin-style', swinStyleName, { path: '/', domain: '.swinburne.edu.au'});
}


/*  function swinSwitchStyle()
 
 	Changes the font-size of the 'body' style and sets a cookie with text size. 
	
 	parameter: swinTextSize - Size of the font (smaller, small, default, large, larger)
   ----------------------------------------------------*/ 
function swinTextResize(swinTextSize)
{

	if (swinTextSize == 'smaller'){
		$('body').css("font-size","0.6em");	
	}
	
	else if (swinTextSize == 'small'){
		$('body').css("font-size","0.7em");	
	}
	
	else if (swinTextSize == 'large'){
		$('body').css("font-size","0.9em");	
	}
	
	else if (swinTextSize == 'larger'){
		$('body').css("font-size","1em");	
	}
	
	else {
		swinTextSize = null;
		$('body').css("font-size","0.75em");
	}

	//Create swin-textsize cookie
	$.cookie('swin-textsize', swinTextSize, { path: '/', domain: '.swinburne.edu.au'});
}


/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};