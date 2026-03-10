import { FaTwitter, FaFacebookF, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white py-10">

      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* NAV LINKS */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-800 font-medium mb-4">

          <Link to="https://searchmyadmission.com/">Home</Link>
          <Link to="https://searchmyadmission.com/careers/">Careers</Link>
          <Link to="https://searchmyadmission.com/top-colleges-in-delhi-ncr-direct-admission/">Top Colleges</Link>
          <Link to="https://searchmyadmission.com/direct-admission/">Direct Admission</Link>
          <Link to="https://searchmyadmission.com/online/">Online Universities</Link>
          <Link to="https://searchmyadmission.com/online-courses/">Online Courses</Link>

        </div>

        {/* SECOND ROW LINKS */}
        <div className="flex flex-wrap justify-center gap-8 text-gray-700 mb-6">

          <Link to="https://searchmyadmission.com/online-mba-colleges/">Online MBA Colleges</Link>
          <Link to="https://searchmyadmission.com/online-mba-specializations/">Online MBA Specializations</Link>
          <Link to="https://searchmyadmission.com/contact/">Contact</Link>

        </div>

        {/* SOCIAL ICONS */}
        <div className="flex justify-center gap-6 text-blue-600 text-lg mb-6">

          <a href="https://www.instagram.com/searchmyadmission">
            <FaTwitter className="hover:scale-110 transition" />
          </a>

          <a href="https://www.facebook.com/searchmyadmission">
            <FaFacebookF className="hover:scale-110 transition" />
          </a>

          <a href="https://searchmyadmission.com/contact/#">
            <FaInstagram className="hover:scale-110 transition" />
          </a>

        </div>

        {/* COPYRIGHT */}
        <p className="text-sm text-gray-700">
          Copyright © 2026 SearchMyAdmission | Powered by SearchMyAdmission
        </p>

      </div>

    </footer>
  );
}