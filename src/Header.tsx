import { ClipboardCheck, Sun } from "lucide-react";
import './styles/Header.css'

function Header() {
    return ( 
        <div className="header">
            <div className="logo">
                <ClipboardCheck /><span className="logo-title">Todo List</span>
            </div>
            <div className="action">
                <Sun />
            </div>
        </div>
     );
}

export default Header;