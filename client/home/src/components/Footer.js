import "./Footer.css";
import {Link} from "react-router-dom";

export default function Footer(){
	return (
		<div className="footer-cont">
			<div>

				<div>
					<Link className="logo" to="/">
						SpaceShooter
					</Link>
				</div>

				<div>
					<Link to="/">Home</Link>
					<Link to="/">Skins</Link>
					<Link to="/">Scoreboard</Link>
				</div>

				<div>
					<Link to="/contact-us">Contact US</Link>
					<Link to="/privacy-policy">Privacy Policy</Link>
					<Link to="/termsandcondition">Terms and Condition</Link>
					<Link to="/refund-policy">Refund Policy</Link>
				</div>
			</div>
		</div>
	)
}