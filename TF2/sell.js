function sell_all() {
	elms = document.querySelectorAll('img[src="https://community.cloudflare.steamstatic.com/economy/image/fWFc82js0fmoRAP-qOIPu5THSWqfSmTELLqcUywGkijVjZULUrsm1j-9xgEIfgYFWCT0uSpKidzvAvyzBOESnN97ssQAi2VpxFR6MuKxZGNkc1CSVqILDfc7ol_qXn5k7J8yDIDi9u9TehKv6tXyIw0bbw/96fx96f"]');
	elms[0].parentElement.querySelector('a').click();
	setTimeout(function(){
		document.querySelectorAll('[class="item_market_action_button_contents"]')[0].click();
	}, 1000*1)
	
	setTimeout(function(){
		document.getElementById('market_sell_currency_input').value = "0.01";
		document.getElementById('market_sell_buyercurrency_input').value = "0.03";
		document.getElementById('market_sell_dialog_accept_ssa').checked = true;
	}, 1000*5)
	
	setTimeout(function(){
		document.getElementById('market_sell_dialog_accept').click()
	}, 1000*6)
	
	setTimeout(function(){
		document.getElementById('market_sell_dialog_ok').click()
	}, 1000*14)
} sell_all();
