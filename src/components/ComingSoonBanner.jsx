const ComingSoonBanner = () => {
	return (
		<div className="fixed z-10 top-28 w-full flex justify-center animate-fade-down">
			<div className="w-1/3 rounded-lg bg-[#CC7503] animate-fade-down animate-reverse animate-delay-[3000ms]">
				<h2 className="text-lg text-slate-200 my-5 pl-2 text-center">Bitte laden Sie die App herunter!</h2>
				<div className="fixed h-2 bottom-0 bg-[#e5bf8d] animate-fill rounded-b-lg"></div>
			</div>
		</div>
	);
};

export default ComingSoonBanner;
