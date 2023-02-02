import "./TandC.css";
import {Link} from 'react-router-dom'

export default function TermsAndCondition(){
	return (
		<div className="legal-cont">
			<div>
				<h2><strong>Terms and Conditions</strong></h2>

				<p>Welcome to Space Shooter!</p>

				<p>These terms and conditions outline the rules and regulations for the use of Space Shooter's Website, located at https://space-shooter-home.vercel.app.</p>

				<p>By accessing this website we assume you accept these terms and conditions. Do not continue to use Space Shooter if you do not agree to take all of the terms and conditions stated on this page.</p>

				<p>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p>

				<h3><strong>Cookies</strong></h3>

				<p>We employ the use of cookies. By accessing Space Shooter, you agreed to use cookies in agreement with the Space Shooter's Privacy Policy. </p>

				<p>Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.</p>

				<h3><strong>License</strong></h3>

				<p>Unless otherwise stated, Space Shooter and/or its licensors own the intellectual property rights for all material on Space Shooter. All intellectual property rights are reserved. You may access this from Space Shooter for your own personal use subjected to restrictions set in these terms and conditions.</p>

				<p>You must not:</p>
				<ul>
				    <li>Republish material from Space Shooter</li>
				    <li>Sell, rent or sub-license material from Space Shooter</li>
				    <li>Reproduce, duplicate or copy material from Space Shooter</li>
				    <li>Redistribute content from Space Shooter</li>
				</ul>



				<p>No use of Space Shooter's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>

				<h3><strong>iFrames</strong></h3>

				<p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>


				<h3><strong>Your Privacy</strong></h3>

				<p>Please read <Link to="/privacy-policy">Privacy Policy</Link></p>


				<h3><strong>Removal of links from our website</strong></h3>

				<p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

				<p>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</p>
			</div>
		</div>
	)
}