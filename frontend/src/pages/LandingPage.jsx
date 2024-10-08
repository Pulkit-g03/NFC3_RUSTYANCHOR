import { Header, Body, Footer } from "../components";
const LandingPage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-grow">
				<Body />
			</div>

			<Footer />
		</div>
	);
};

export default LandingPage;
