import Footer from "./layout/footer";
import Header from "./layout/header";

const Layout = ({ children }) => {
	return (
		<>
			<Header />
			<div className="px-5 md:px-20">{children}</div>
			<Footer />
		</>
	);
};

export default Layout;
