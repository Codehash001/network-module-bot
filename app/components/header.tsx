import Image from "next/image";
import DarkModeToggle from "./ui/darkModeToggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between text-2xl font-bold p-2 w-full mb-2">
    <div className='flex items-center space-x-2'>
      <span className="bg-gradient-to-r from-shamrock-500 to-shamrock-300 text-transparent bg-clip-text">CHaT BoT</span>
    </div>
    <DarkModeToggle />
  </div>
  );
}
