import React from "react";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

const Pagination = ({ items, pageSize, currentPage, onPageChange }) => {
	const pagesCount = Math.ceil(items / pageSize);

	if (pagesCount === 0) return null; // If only one page, don't show pagination

	const pages = Array.from({ length: pagesCount }, (_, i) => i + 1);

	// Define the number of pages to show at a time
	const pagesToShow = 5;

	// Calculate the start and end indices for the pages to display
	let startIndex = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
	let endIndex = Math.min(startIndex + pagesToShow - 1, pagesCount);

	// Adjust the startIndex if the currentPage is near the end
	if (endIndex - startIndex + 1 < pagesToShow) {
		startIndex = Math.max(endIndex - pagesToShow + 1, 1);
	}

	// Create a sliced array of pages to display
	const visiblePages = pages.slice(startIndex - 1, endIndex);

	return (
		<div className="flex items-center space-x-4 justify-center mt-4">
			<ul className="flex items-center space-x-2">
				<li>
					<button className={`px-3 py-1 rounded-lg ${currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100"}`} disabled={currentPage === 1} aria-label="Previous" onClick={() => onPageChange(currentPage - 1)}>
						<SlArrowLeft />
					</button>
				</li>
				{visiblePages.map((page) => (
					<li key={page}>
						<button onClick={() => onPageChange(page)} className={`px-3 py-1 rounded-lg ${page === currentPage ? "bg-clubbery-orange text-white" : "bg-clubbery-orange hover:opacity-80"}`}>
							{page}
						</button>
					</li>
				))}
				<li>
					<button className={`px-3 py-1 rounded-lg ${currentPage === pagesCount ? "text-gray-400 cursor-not-allowed" : "text-blue-500 hover:bg-blue-100"}`} disabled={currentPage === pagesCount} aria-label="Next" onClick={() => onPageChange(currentPage + 1)}>
						<SlArrowRight />
					</button>
				</li>
			</ul>
		</div>
	);
};

export default Pagination;
