import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

const Navbar = () => {
	return (
		<>
			<Nav>
				<NavMenu>
                    <NavLink to="/" activeStyle>
                        Home
                    </NavLink>
					<NavLink to="/about" activeStyle>
						About
					</NavLink>
					<NavLink to="/contact" activeStyle>
						Contact Us
					</NavLink>
					<NavLink to="/PlayAnalyzer" activeStyle>
						PlayAnalyzer
					</NavLink>
					<NavLink to="/Interactive" activeStyle>
						Interactive
					</NavLink>
				</NavMenu>
			</Nav>
		</>
	);
};

export default Navbar;

