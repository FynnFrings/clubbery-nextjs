const ContactResponseMessage = ({ response, fill, background }) => {
	return (
		<>
			<div className={`fixed z-50  left-1/2 -translate-x-1/2 w-fit px-5 py-2 rounded-lg ${background} animate-popup flex items-center`}>
				<h2 className="text-lg text-[#F0FDF4] p-2">{response}</h2>
				<div className={`fixed h-2 left-0 bottom-0 ${fill} animate-fill rounded-b-lg`}></div>
			</div>
		</>
	);
};

export default ContactResponseMessage;
