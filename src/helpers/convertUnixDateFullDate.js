const convertUnixDateToFullDate = (unixData) => {
	const { startDate, endDate } = unixData;

	const fullStartDate = new Date(startDate._seconds * 1000 + startDate._nanoseconds / 1000000);
	const fullEndDate = new Date(endDate._seconds * 1000 + endDate._nanoseconds / 1000000);

	const dataOption = {
		year: "numeric",
		month: "2-digit",
		day: "numeric",
	};
	const timeOption = {
		hour: "numeric",
		minute: "numeric",
		hour12: false,
	};

	const validStartDate = fullStartDate.toLocaleDateString("de-DE", dataOption);
	const validStartTime = fullStartDate.toLocaleTimeString("de-DE", timeOption);
	const validEndDate = fullEndDate.toLocaleDateString("de-DE", dataOption);
	const validEndTime = fullEndDate.toLocaleTimeString("de-DE", timeOption);

	return {
		openTime: validStartTime,
		openDate: validStartDate,
		closeTime: validEndTime,
		closeDate: validEndDate,
	};
};

export default convertUnixDateToFullDate;
