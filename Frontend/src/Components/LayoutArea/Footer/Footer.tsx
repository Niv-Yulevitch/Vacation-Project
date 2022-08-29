import "./Footer.css";

function Footer(): JSX.Element {

    const year = new Date().getFullYear()

    return (
        <div className="Footer">
			<h5>Niv Yulevitch All rights reserved {year} ©</h5>
        </div>
    );
}

export default Footer;
