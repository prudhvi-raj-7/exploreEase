import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        {/* Footer Content */}
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Explore Ease. All rights reserved.
        </p>
        <nav className="mt-2">
          <ul className="flex justify-center space-x-4">
            <li>
              <span className="hover:text-gray-400 transition-colors">
                About Us
              </span>
            </li>
            <li>
              <span className="hover:text-gray-400 transition-colors">
                Contact
              </span>
            </li>
            <li>
              <span className="hover:text-gray-400 transition-colors">
                Privacy Policy
              </span>
            </li>
            <li>
              <span className="hover:text-gray-400 transition-colors">
                Terms of Service
              </span>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
