
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const footerSections = [
    {
      title: "Your Orders",
      links: [
        { name: "Track Packages", href: "#" },
        { name: "Edit or Cancel Orders", href: "#" },
      ],
    },
    {
      title: "Customer Service",
      links: [
        { name: "Help Center", href: "#" },
        { name: "Returns", href: "#" },
        { name: "Shipping Info", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Careers", href: "#" },
        { name: "Press", href: "#" },
      ],
    },
    {
      title: "Let Us Help You",
      links: [
        { name: "Your Account", href: "#" },
        { name: "Delivery Address", href: "#" },
        { name: "Order List", href: "#" },
      ],
    },
    {
      title: "Download App",
      links: [
        { name: "iOS", href: "#" },
        { name: "Android", href: "#" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebookF />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaYoutube />, href: "#", label: "YouTube" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1E293B] text-gray-300 mt-auto pt-0 border-t border-gray-700">
      {/* MAIN FOOTER CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Section: Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-3 text-sm uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="hover:text-[#FFB703] transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider (ALL IN ONE) */}
        <div className="border-t border-gray-600 my-8"></div>

        {/* Middle Section: Logo & Socials */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 mb-8">
          <a
            href="/"
            className="flex items-center space-x-2 mb-3 sm:mb-0"
            aria-label="Kids World Home"
          >
            <img
              src="https://t4.ftcdn.net/jpg/01/34/68/65/360_F_134686594_s4TLh4Vh6QplrTQnrHANQ7EJhCheaAtJ.jpg"
              alt="Kids World company logo"
              className="h-12 w-auto rounded-md"
            />
            <span className="text-white font-semibold text-sm">KIDS WORLD</span>
          </a>

          <div className="flex space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 hover:text-[#FFB703] text-lg transition-colors duration-200"
              >
                {social.icon}
              </a>
            ))}
          </div>






          
        </div>

        {/* Divider (same style for uniformity) */}
        <div className="border-t border-gray-600 my-6"></div>

        {/* Bottom Section: Legal + Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 relative">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-[#FFB703] font-semibold">KIDS WORLD</span>. All
            rights reserved.
          </p>

          <p className="mt-2 sm:mt-0 space-x-1">
            <a href="#" className="hover:text-[#FFB703]">
              Privacy Policy
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#FFB703]">
              Terms of Use
            </a>
            <span>|</span>
            <a href="#" className="hover:text-[#FFB703]">
              Cookies
            </a>
          </p>

      
        </div>
      </div>
    </footer>
  );
};

export default Footer;
