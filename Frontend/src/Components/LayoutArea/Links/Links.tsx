import { NavLink } from "react-router-dom";
import "./Links.css";

function Links(): JSX.Element {
    return (
        <div className="Links">
            <NavLink to="/home" >בית</NavLink>
            <NavLink to="/products" >מוצרים</NavLink>
            <NavLink to="/employees" >העובדים שלנו</NavLink>
            <NavLink to="/success-stories" >סיפורי הצלחה</NavLink>
            <NavLink to="/about" >מי אנחנו</NavLink>
        </div>
    );
}

export default Links;
