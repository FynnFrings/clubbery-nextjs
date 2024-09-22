export const paginateItems = (items, pageNumber, pageSize) => {
	const startIndex = (pageNumber - 1) * pageSize;
	return items.slice(startIndex, startIndex + pageSize);
};
