	function getDayOfWeek(number){
		switch(number){
			case 0:
				return "Mon";		
			case 1:
				return "Tue";
			case 2:
				return "Wed";
			case 3:
				return "Thu";
			case 4:
				return "Fri";
			case 5:
				return "Sat";
			case 6:
				return "Sun";
		}
		
	}
	function getMonth(number){
		
		 var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
	return monthNames[number];
		
	}
export function formatDate(secs){
	
	let date = getFechaFromSeconds(secs);
		let year = (date.getYear()+1900);
		return  getDayOfWeek(date.getDay()) + " " + date.getDate() + " " + getMonth(date.getMonth()) + " " + year;

	}
function getFechaFromSeconds(secs){
	var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
	return t;
}	
export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
	