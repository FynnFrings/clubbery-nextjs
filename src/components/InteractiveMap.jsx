const InteractiveMap = ({ location, latitude, longitude }) => {
	const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;
	const PARAMETERS = `q=${location}&center=${latitude},${longitude}&language=DE&zoom=17&maptype=roadmap`;
	const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${KEY}&${PARAMETERS}`;
	return <iframe className="w-full h-56 md:h-96 rounded-lg" style={{ filter: "invert(80%) hue-rotate(180deg)" }} data-type="lazy" data-src={mapUrl} referrerPolicy="no-referrer-when-downgrade" src={mapUrl} allowFullScreen />;
};

export default InteractiveMap;
