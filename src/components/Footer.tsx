
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                পি
              </div>
              <span className="font-display font-bold text-xl text-white">
                প্রম্পট শিক্ষা
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              বাংলায় প্রম্পট ইঞ্জিনিয়ারিং শেখার সেরা প্ল্যাটফর্ম।
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">কুইক লিংক</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">হোম</a>
              </li>
              <li>
                <a href="#features" className="text-gray-400 hover:text-white transition-colors">কোর্স</a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors">আমাদের সম্পর্কে</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors">যোগাযোগ</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">আমাদের কোর্স</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">প্রম্পট ফান্ডামেন্টালস</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">উন্নত প্রম্পট কৌশল</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">সৃজনশীল লেখা</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">কোডিং এবং ডেভেলপমেন্ট</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold text-lg mb-4">যোগাযোগ করুন</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">ই:</span>
                <a href="mailto:contact@promptshikkha.com" className="text-gray-400 hover:text-white transition-colors">contact@promptshikkha.com</a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">ফো:</span>
                <a href="tel:+8801712345678" className="text-gray-400 hover:text-white transition-colors">+880 1712 345 678</a>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">ঠি:</span>
                <span className="text-gray-400">ঢাকা, বাংলাদেশ</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} প্রম্পট শিক্ষা। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">গোপনীয়তা নীতি</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">ব্যবহারের শর্তাবলী</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
