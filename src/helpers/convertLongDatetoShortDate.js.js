const convertLongDateToShortDate = (dateStr) => {
	const [day, month, year] = dateStr.split(".");

	const date = new Date(year, month - 1, day);

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const formattedDay = date.getDate();
	const formattedMonth = monthNames[date.getMonth()];

	return `${formattedMonth} ${formattedDay}`;
};

export default convertLongDateToShortDate;
