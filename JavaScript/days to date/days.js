function DaysBetween2Dates(end_date) {
	start_date = (function(a){return [parseInt(a[0]), parseInt(a[1]), parseInt(a[2])] })(new Date().toLocaleDateString().split("/"))
	//end_date = [31, 12, 2019];

	// Add a day to February for leap years
	days_in_each_month = [31,28,31,30,31,30,31,31,30,31,30,31];
	leap_year_count = 2000;
	function add_day_4_leap_year() {
		while (leap_year_count <= start_date[2]) {
			if (leap_year_count == start_date[2]) {
				days_in_each_month[1] = 29;
				return;
			} else {
				leap_year_count += 4;
			}
		}
	}

	add_day_4_leap_year();
	days_in_current_month = days_in_each_month[start_date[1]];
	days_count = 0;

	// same year?
	if (start_date[2] == end_date[2]) {
	
		// same month?
		if (start_date[1] == end_date[1]) {
			days_count = end_date[0]-start_date[0];
		} else {
			// days left in current month
			days_count += days_in_each_month[start_date[1]-1] - start_date[0];
		
			// days in full months between
			for (i=0; i < end_date[1] - start_date[1];i++) {
				current_month = start_date[1] + i + 1;
				if (current_month < end_date[1]) {
					days_count += days_in_each_month[current_month];
				}
			}
		
			// days in end month
			days_count += end_date[0];
		}
	}
	
	return days_count;
}

// start date till 31st Dec
// full years between
// days in end year