import { Link } from "react-router-dom";


const Header = () => {
	

	return (
		<header className="bg-gray-900 text-lg">  
			<div className="flex justify-between items-center px-4">
				<Link to="/" className="text-white text-2xl font-bold cursor-pointer">
					Dog Suraksha
				</Link>
				<ul className="flex space-x-7">
					<li>
						<Link
							to="/quoteForm"
							className="text-white hover:text-gray-300 cursor-pointer"
						>
							Quotation
						</Link>
					</li>

					<li>
						<Link
							to="/claim"
							className="text-white hover:text-gray-300 cursor-pointer"
						>
							Claim policy
						</Link>
					</li>

					<li>
						<Link
							to="/admin"
							className="text-white hover:text-gray-300 cursor-pointer"
						>
							Members Login
						</Link>
					</li>

					
					<li>
						<Link
							to="/howToInstructions"
							className="text-white hover:text-gray-300 cursor-pointer"
						>
						Help/Intruction							
						</Link>
					</li>
				</ul>
				
			</div>
		</header>
		
	);
};

export default Header;
