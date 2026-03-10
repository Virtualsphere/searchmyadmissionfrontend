import { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export default function Header() {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className="w-full bg-white shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="https://searchmyadmission.com/wp-content/uploads/2025/06/cropped-cropped-image5-125x42.png"
            alt="logo"
            className="h-8"
          />
        </div>

        {/* NAVIGATION */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-gray-700">

          <a href="https://searchmyadmission.com/" className="hover:text-blue-600">Home</a>
          <a href="https://searchmyadmission.com/about/" className="hover:text-blue-600">About</a>

          {/* ONLINE UNIVERSITIES */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("online")}
              className="flex items-center gap-1 hover:text-blue-600"
            >
              Online Universities <ChevronDown size={16} />
            </button>

            {openDropdown === "online" && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 w-48">
                <a href="https://searchmyadmission.com/online-courses/" className="block py-2 hover:text-blue-600">
                  Online Courses
                </a>
                <a href="https://searchmyadmission.com/online-mba-specializations/" className="block py-2 hover:text-blue-600">
                  Online MBA Specializations
                </a>
                <a href="https://searchmyadmission.com/online-mba-colleges/" className="block py-2 hover:text-blue-600">
                  Online MBA Colleges
                </a>
              </div>
            )}
          </div>

          {/* COUNSELLING INTELLIGENCE */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown("counselling")}
              className="flex items-center gap-1 text-blue-600"
            >
              Counselling Intelligence <ChevronDown size={16} />
            </button>

            {openDropdown === "counselling" && (
              <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg p-4 w-56">
                <a href="/" className="block py-2 hover:text-blue-600">
                  GGSIPU LLB Counselling College Predictor 2026
                </a>
                <a href="/bca/bba" className="block py-2 hover:text-blue-600">
                  GGSIPU CET Counselling College Predictor 2026
                </a>
                <a href="/btech" className="block py-2 hover:text-blue-600">
                  AKTU BTech Counselling College Predictor 2026
                </a>
              </div>
            )}
          </div>

          <a href="https://searchmyadmission.com/top-colleges-in-delhi-ncr-direct-admission/" className="hover:text-blue-600">Top Colleges</a>
          <a href="https://searchmyadmission.com/direct-admission/" className="hover:text-blue-600">Direct Admission</a>
          <a href="https://searchmyadmission.com/blog/" className="hover:text-blue-600">Blog</a>

        </nav>

        {/* SOCIAL ICONS */}
        <div className="flex items-center gap-4 text-blue-600 text-lg">

          <a href="https://www.facebook.com/searchmyadmission">
            <FaFacebook className="hover:scale-110 transition" />
          </a>

          <a href="https://www.instagram.com/searchmyadmission">
            <FaInstagram className="hover:scale-110 transition" />
          </a>

          <a href="https://www.linkedin.com/company/search-my-admission/">
            <FaLinkedin className="hover:scale-110 transition" />
          </a>

        </div>

      </div>
    </header>
  );
}