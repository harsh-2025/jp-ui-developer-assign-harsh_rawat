import { BellIcon, Command, LucideHistory, Moon, Search, SidebarIcon, Star, Sun } from "lucide-react";
import useThemeStore from "../store/useThemestore";

function Header() {
    // const [darkMode, setDarkMode] = useState(false);
    const { darkMode, setDarkMode } = useThemeStore(); // Access the state and setter
  console.log(darkMode);
  const { sideBarOpen, setSideBarOpen } = useThemeStore();

  // Load the theme from localStorage on mount (optional)
  
    return (
        <>
           <div className={darkMode ? 'dark' : ''}>
            <div className='w-full h-[4rem] p-3 bg-white dark:bg-dark_color dark:text-dark_color  text-black  transition-all duration-300 border-r-[0.5px] border-b-[0.5px]  border-gray-600'>
            <div className="flex flex-row items-center justify-between w-full">

  {/* Left section (Dashboard Info) */}
  <div className="w-2/3 flex flex-row items-center space-x-4">
    <div><SidebarIcon /></div>
    <div><Star /></div>
    <div className="text-gray_color">Dashboard</div>
    <div>/</div>
    <div>Default</div>
                        </div>
  {/* Right section (Search and Icons) */}
  <div className="w-3/5 flex flex-row items-center justify-end space-x-4">
    {/* Search Bar */}
    <div className="relative w-full">
      <input
        className="bg-gray-200 py-2 px-4 pl-10 pr-10 w-full rounded-md"
        placeholder="Search"
      />
      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <Command className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    </div>

    {/* Icons (Dark mode toggle, History, Bell, etc.) */}
    <div className="flex flex-row items-center space-x-4">
      {darkMode ? (
        <Sun onClick={() => setDarkMode(!darkMode)} className="cursor-pointer" />
      ) : (
        <Moon onClick={() => setDarkMode(!darkMode)} className="cursor-pointer" />
      )}
      <LucideHistory />
      <BellIcon />
      <SidebarIcon />
    </div>
                        </div>
                        <div className="w-1/3 flex flex-row"> </div>

</div>

                </div>
            </div>
        </>
    )
}

export default Header;