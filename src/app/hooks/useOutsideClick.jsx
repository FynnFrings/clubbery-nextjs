import { useEffect, useRef } from "react";

const useOutsideClick = (callback) => {
	// Create a ref to store a reference to the element that we need to check clicks outside of
	const ref = useRef(null);

	useEffect(() => {
		// Add an event listener to the document that will handle outside click events
		const handleClick = (event) => {
			// Check if the clicked element is outside of the target element
			if (ref.current && !ref.current.contains(event.target)) {
				// If the clicked element is outside of the target element, call the provided callback function
				callback();
			}
		};

		// Attach the event listener to the document
		document.addEventListener("click", handleClick);

		// Clean up by removing the event listener when the component unmounts
		return () => {
			document.removeEventListener("click", handleClick);
		};
	});

	// Return the ref to the target element so that it can be used in the parent component
	return ref;
};

export default useOutsideClick;
