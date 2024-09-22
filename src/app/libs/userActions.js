import axios from "axios";

export const userBuyTicketFirstAPICall = async (email, uid, eventId, tickets) => {
	const requestBody = {
		email: email,
		firebaseCustomerId: uid,
		voucherCode: null,
		eventId: eventId,
		items: [...tickets],
	};

	try {
		const response = await axios.post(
			"https://stripepaymentintentrequest-qh42lmu4jq-uc.a.run.app",
			requestBody, // Pass the requestBody as the body
			{
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);

		return response;
	} catch (error) {
		console.error("Error during the POST request:", error);
		return error;
	}
};
