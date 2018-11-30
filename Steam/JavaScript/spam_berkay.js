var message = `   :soabang::ns_green:         :ns_green::soabang:   
:ns_green::shadowportal::stain::ns_green:   :ns_green::stain::shadowportal::ns_green:
:soabang::stain::shadowportal::stain::soabang::stain::shadowportal::stain::soabang:
:ns_green::shadowportal::stain::shadowportal::stain::shadowportal::stain::shadowportal::ns_green:
   :soabang::shadowportal::stain::shadowportal::stain::shadowportal::soabang:   
      :ns_green::shadowportal::stain::shadowportal::ns_green:      
         :soabang::shadowportal::soabang:         
            :ns_green:            `

var timeout = 5 // wait in seconds before posting the next comment.

setInterval(function(){
	document.querySelectorAll('div[class="commentthread_entry_quotebox"] textarea[id^="commentthread_Profile_"]')[0].value = message;
			
	setTimeout(function(){
		document.querySelectorAll('[class="btn_green_white_innerfade btn_small"]')[0].click();
	}, 100);
}, timeout * 1000);