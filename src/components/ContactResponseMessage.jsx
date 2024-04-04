const ContactResponseMessage = ({ response, fill, background }) => {
	return (
		<>
			<div className={`fixed z-10  left-[50%] -translate-x-[50%] w-[50%] lg:w-[25%] h-[7%] rounded-lg ${background} animate-popup flex items-center`}>
				<h2 className="text-lg text-[#F0FDF4] p-2">{response}</h2>
				<div className={`fixed h-2 bottom-0 ${fill} animate-fill rounded-b-lg`}></div>
			</div>
		</>
	);
};

export default ContactResponseMessage;
