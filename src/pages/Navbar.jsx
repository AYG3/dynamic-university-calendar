import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="fixed bg-gray-200 w-full p-4 shadow-md z-50">
            <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
                <Link 
                    to='/calendar' 
                    className="text-white font-semibold hover:text-gray-200 transition-colors"
                >
                    Calendar
                </Link>
                <Link 
                    to='/event2' 
                    className="text-white font-semibold hover:text-gray-200 transition-colors"
                >
                    Add Event
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;