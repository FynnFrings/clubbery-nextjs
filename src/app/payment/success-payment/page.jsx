import { IoMdCheckmarkCircle } from "react-icons/io";

const SuccessfulPayment = () => {
	return (
		<>
			<div className="w-full h-96 flex flex-col justify-center items-center gap-5">
				<div className="bg-[#3e3f4ae8] shadow-xl text-white p-10 items-center flex flex-col gap-5">
					<IoMdCheckmarkCircle className="text-[#CC7503] h-24 w-24" />
					<h1 className="text-3xl">Erfolgreich!</h1>
					<p className="text-xl w-3/5 text-center">Wir haben deine Bestellung erhalten! Du kannst diese Website jetzt schließen.</p>
				</div>
			</div>
		</>
	);
};

export default SuccessfulPayment;
