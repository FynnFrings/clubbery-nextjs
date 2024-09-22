import { useRef, useEffect } from "react";

const SelectDropdownList = ({ items, itemSelection, showDropdown }) => {
	// Using ref to track the currently focused list item for keyboard navigation
	const dropdownRef = useRef(null);

	// Handle item click
	const onClickHandler = (item) => {
		itemSelection(item); // Call the item selection handler from props
	};

	// Handle keyboard navigation (ArrowUp, ArrowDown, Enter)
	const handleKeyDown = (e) => {
		const listItems = dropdownRef.current?.children;
		if (!listItems) return;

		const currentIndex = Array.from(listItems).findIndex((item) => item === document.activeElement);

		switch (e.key) {
			case "ArrowDown":
				e.preventDefault();
				const nextIndex = (currentIndex + 1) % listItems.length; // Move to the next item
				listItems[nextIndex].focus();
				break;
			case "ArrowUp":
				e.preventDefault();
				const prevIndex = (currentIndex - 1 + listItems.length) % listItems.length; // Move to the previous item
				listItems[prevIndex].focus();
				break;
			case "Enter":
				if (currentIndex >= 0) {
					onClickHandler(items[currentIndex]);
				}
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		if (showDropdown && dropdownRef.current) {
			dropdownRef.current.children[0]?.focus();
		}
	}, [showDropdown]);

	return (
		<>
			{showDropdown && (
				<ul
					ref={dropdownRef}
					className="absolute h-fit top-14 w-full z-50 text-center border-2 border-slate-500 rounded-xl inset-0 bg-[#262730] text-white overflow-y-auto overflow-x-hidden animate-fade animate-duration-300 animate-ease-out"
					onKeyDown={handleKeyDown} // Listen for keyboard events
				>
					{/* Render each item in the dropdown */}
					{items.map((item, index) => (
						<li
							tabIndex="0" // Make the list item focusable
							className="py-3 focus:outline-none focus:bg-gray-800 cursor-pointer" // Style for focused item
							key={index}
							onClick={() => onClickHandler(item)} // Call the click handler when an item is clicked
							onKeyPress={(e) => e.key === "Enter" && onClickHandler(item)} // Handle Enter key
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</>
	);
};

export default SelectDropdownList;
