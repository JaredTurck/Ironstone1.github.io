var items = document.querySelectorAll('div[id="search_result_container"] a[href^="https://store.steampowered.com/app"]');
for (var i=0;i<items.length;i++) {
    if (items[0].querySelectorAll('[class="col search_price  responsive_secondrow"]')[0].innerText == "Free") {
        localStorage.setItem("items", JSON.stringify(JSON.parse(localStorage.getItem("items")).concat(items[i].href)));
    }
}