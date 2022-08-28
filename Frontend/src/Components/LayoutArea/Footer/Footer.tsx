import "./Footer.css";

function Footer(): JSX.Element {

    const year = new Date().getFullYear()

    return (
        <div className="Footer">
			<h3>כל הזכויות שמורות - ניב יולביץ | {year}</h3>
        </div>
    );
}

export default Footer;
