import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import SelectDropdownList from "./SelectDropdownList";
import useOutsideClick from "@/app/hooks/useOutsideClick";

const SelectDropdown = ({ selectItem, itemSelection, listOfItems }) => {
	const [showDropdown, setShowdropDown] = useState(false);

	const toggleDropDown = () => {
		setShowdropDown((prev) => !prev);
	};

	const ref = useOutsideClick(() => setShowdropDown(false));

	return (
		<div ref={ref} className="relative w-full lg:w-1/3">
			<button
				aria-expanded={showDropdown} // Accessibility: indicates dropdown is open or closed
				className="w-full h-12 bg-transparent text-white px-5 flex rounded-lg items-center justify-between border-2 border-slate-500"
				onClick={toggleDropDown} // Toggle dropdown visibility on button click
			>
				<span>{selectItem ? selectItem : "Select filter"}</span>

				{showDropdown ? <IoIosArrowUp className="w-5 h-5" /> : <IoIosArrowDown className="w-5 h-5" />}
			</button>

			{showDropdown && (
				<SelectDropdownList
					items={listOfItems} // Pass items array to DropDown component
					showDropdown={showDropdown} // Pass dropdown visibility to DropDown component
					toggleDropDown={toggleDropDown} // Pass toggle function to DropDown component
					itemSelection={itemSelection} // Pass item selection handler function to DropDown component
				/>
			)}
		</div>
	);
};

export default SelectDropdown;
