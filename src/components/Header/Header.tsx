import { LucidePawPrint } from "lucide-react"

export const Header = () => (
    <div className="p-5 text-md bg-pink-600 text-white flex flex-row shadow-sm">
        <LucidePawPrint className="mr-2" />
        <h1>The Dog Encyclopedia</h1>
        
    </div>
)

export default Header;