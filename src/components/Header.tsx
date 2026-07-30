import { ClipboardCheck, Sun, Moon, LogOut } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase";

function Header() {
    const { theme, setTheme } = useTheme();

    const handleLogout = async () => {
        await supabase.auth.signOut();
    }

    return (
        <div className="flex items-center justify-between border bg-background px-5 py-2">
            <div className="my-1 mx-2.5 flex items-center">
                <ClipboardCheck /><span className="mx-2">Todo List</span>
            </div>
            <div className="my-1 mx-2.5">
                <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} >
                    {
                        theme === 'dark' ? <Moon /> : <Sun />
                    }
                </Button>
                <Button variant="ghost" size="icon" onClick={handleLogout} >
                    <LogOut />
                </Button>
            </div>
        </div>
    );
}

export default Header;