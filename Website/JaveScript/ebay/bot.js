//store maxBid in local storage
var maxBid = 20

if (timeLeft.minute <= 10) {
    if (document.getElementById("w1-4-_msg").innerHTML == "You've been outbid. ") {
        var bidPrice = parseFloat(document.getElementById("prcIsum_bidPrice").innerHTML.replace("£",""))
        if (bidPrice <= maxBid) {
            document.getElementById("MaxBidId").value = parseInt(bidPrice + 1)
            document.getElementById("bidBtn_btn").click();

            setTimeout(function() {
                if (document.getElementById("w1-37-_reviewBidSec_btn") != null) {
                    document.getElementById("w1-37-_reviewBidSec_btn").click();
                }
            }, 5000)

            setTimeout(function() {
                if (document.getElementsByClassName("clzBtn")[0] != null) {
                    document.getElementsByClassName("clzBtn")[0].click();
                }
            }, 15000)
        } setTimeout(function() {location.reload()}, 20000)
    }
}