function upvote_all() {
	elms = document.querySelectorAll('[onclick^="return VoteUpCommentThread"]');

	for (i=0;i<elms.length;i++) {
		elms[i].click();
	}
}