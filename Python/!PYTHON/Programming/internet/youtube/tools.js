//YouTube:

document.getElementById("watch7-sidebar-contents").style.display = "none"; //remove sidebar
document.getElementById("watch-discussion").style.display = "none"; //remove comments

//auto replay video
play = document.getElementsByClassName("ytp-play-button ytp-button")[0];
if (play.getAttribute("title") === "Replay") {play.click()}