import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 md:px-10">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Brand */}
        <div>
          <h2 className="text-white text-xl font-bold">MedBook</h2>
          <p className="mt-3 text-sm text-gray-400">
            Book doctor appointments easily and get healthcare at your fingertips.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Doctors</li>
            <li className="hover:text-white cursor-pointer">Specialties</li>
            <li className="hover:text-white cursor-pointer">Book Appointment</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <p className="text-sm">Email: support@MedBook.com</p>
          <p className="text-sm mt-1">Phone: +91 98765 43210</p>
        </div>

      </div>

      {/* Bottom line */}
      <div className="text-center text-xs text-gray-500 mt-8 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} MedBook. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;