import { ClipboardCheck, Sun, Moon } from "lucide-react";
import './styles/Header.css'
import { useTheme } from "./components/theme-provider";

function Header() {
    const { theme, setTheme } = useTheme();

    return ( 
        <div className="flex items-center justify-between border bg-background px-5 py-2">
            <div className="my-1 mx-2.5 flex items-center">
                <ClipboardCheck /><span className="mx-2">Todo List</span>
            </div>
            <div className="my-1 mx-2.5">
                { theme === 'dark' && <Moon onClick={() => setTheme('light')} />}
                { theme === 'light' && <Sun onClick={() => setTheme('dark')} />}
            </div>
        </div>
     );
}

export default Header;