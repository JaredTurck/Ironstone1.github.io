function check(criteria, panel) {
	Items = panel.getElementsByClassName("panel-raffle-items")[0].children; // get raffle items div
	ItemsArray = [];
		
	for(item=0;item < Items.length;item++) {
		Class = Items[item].getAttribute("data-classes"); // get item class
		Slot = Items[item].getAttribute("data-slot"); // get item slot
		Name =  $("<div>"+Items[item].getAttribute("data-title")+"</div>")[0].textContent; // item name
		ItemsArray.push([Name, Class, Slot]) // add properties to an array
			
		// check against criteria
		for (ii=1;ii<criteria.length;ii++) {
			for (i=0;i<criteria[ii].length;i++) {
				if (criteria[ii][i] === ItemsArray[item][ii]) {
					return true; // if criteria met, return true
				}
			}
		} if (criteria[0] !== "" && Name.includes(criteria[0])) {return true} // if no criteria, true
	} return false
}
criteria = ["", ["medic"], []];

//for (i=0;i<30;i++) {
//	RafflesList = document.getElementsByClassName("panel-auction")
//	if (check(criteria, RafflesList[0]) === false) {
//		document.getElementById("raffles-list").removeChild(RafflesList[0])
//	}
//}

i=0
n = document.getElementsByClassName("panel-auction");
if (check(criteria, n[i]) === false) {
	document.getElementById("raffles-list").removeChild(n[i]);
} else {i++}