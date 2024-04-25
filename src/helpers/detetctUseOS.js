import { useEffect } from "react";

const getMobileDetect = (userAgent) => {
	// console.log("🚀 ~ getMobileDetect ~ userAgent:", userAgent);
	const isAndroid = () => Boolean(userAgent.match(/Android/i));
	const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i));
	const isMobile = () => Boolean(isAndroid() || isIos());
	const isDesktop = () => Boolean(!isMobile());
	return {
		isMobile,
		isDesktop,
		isAndroid,
		isIos,
	};
};
const useMobileDetect = () => {
	useEffect(() => {}, []);
	const userAgent = typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
	return getMobileDetect(userAgent);
};

export default useMobileDetect;
