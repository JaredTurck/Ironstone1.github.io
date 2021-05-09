content = [
  [ 'https://youtu.be/ao5553wkVe8', '364787379518701569' ],
  [ 'https://youtu.be/gVhC9R6qeGs', '364787379518701569' ],
  [ 'https://youtu.be/sA3juLMhv3A', '364787379518701569' ],
  [ 'https://youtu.be/sA3juLMhv3A', '364787379518701569' ],
  [ 'https://youtu.be/ao5553wkVe8', '364787379518701569' ],
  [ 'https://youtu.be/sA3juLMhv3A', '364787379518701569' ]
]

function find_dups(content) {
	temp_dict = {};
	for (i=0;i<content.length;i++) {
		if (temp_dict[content[i]] == undefined) {
			temp_dict[content[i][0]] = content[i][1];
		}
	}
	
	temp_list = [];
	for (i=0;i<Object.keys(temp_dict).length;i++) {
		temp_list.push([Object.keys(temp_dict)[i], 
		temp_dict[Object.keys(temp_dict)[i]]]);
	}
	return temp_list;
}