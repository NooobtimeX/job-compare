"use client";

import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-gray-900">
            🎓 Job-Compare
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
