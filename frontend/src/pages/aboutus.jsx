import { Header, Aboutus, Footer } from "../components";
const aboutus = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-grow">
				<Aboutus />
			</div>
			<Footer />
		</div>
	);
};

export default aboutus;
