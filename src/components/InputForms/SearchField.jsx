import { FiSearch } from "react-icons/fi";

const SearchField = (props) => {
	const { searchIputPlaceholder, handleSearchInputChange, searchInput } = props;
	return (
		<>
			<div className="w-full lg:w-1/3 h-12 bg-transparent text-white flex rounded-lg items-center border-2 border-slate-500">
				<div className="w-14 flex justify-center items-center">
					<FiSearch className="text-slate-500" />
				</div>
				<input className="w-full text-start text-lg rounded-lg bg-transparent  h-12 border-transparent focus:!outline-offset-0 focus:!outline-none" type="text" placeholder={searchIputPlaceholder} onChange={handleSearchInputChange} value={searchInput} />
			</div>
		</>
	);
};

export default SearchField;
