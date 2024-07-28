// Function to filter items by title
const filterItemsByName = (itemName, searchInput) => {
	const title = itemName ? itemName.toLowerCase() : ""; // Get the lowercased title or set it as an empty string if it doesn't exist

	const lowercaseSearchInput = searchInput.toLowerCase();

	// Check if the lowercased title includes the lowercased search input or if the search input is empty
	return title.includes(lowercaseSearchInput) || !searchInput;
};

export default filterItemsByName;
