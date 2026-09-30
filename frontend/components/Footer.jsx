import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Library,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Footer = ({ setShowLogin }) => {

  const navigate = useNavigate();

  return (
    <footer className="w-full bg-stone-900">

      {/* Footer Information */}
      <section className="px-6 md:px-16 py-14">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

            {/* Library */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Library size={22} className="text-stone-200" />

                <h3 className="text-xl font-bold text-stone-100">
                  Naic Municipal Library
                </h3>
              </div>

              <p className="text-stone-400 text-sm leading-relaxed">
                A public library dedicated to providing accessible books,
                information, educational resources, and digital services
                to the community.
              </p>
            </div>


            {/* Location */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-stone-300" />

                <h3 className="text-lg font-bold text-stone-100">
                  Location
                </h3>
              </div>

              <p className="text-stone-400 text-sm leading-relaxed">
                Naic Town Plaza,
                <br />
                Cavite 4110
              </p>
            </div>


            {/* Contact */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Mail size={18} className="text-stone-300" />

                <h3 className="text-lg font-bold text-stone-100">
                  Contact Us
                </h3>
              </div>

              <div className="space-y-2 text-sm text-stone-400">

                <p>
                  <span className="font-semibold text-stone-300">
                    Email:
                  </span>{" "}
                  naiclibrary4110@gmail.com
                </p>

                <p>
                  <span className="font-semibold text-stone-300">
                    Phone:
                  </span>{" "}
                  (046) 412 0413
                </p>

              </div>
            </div>


            {/* Opening Hours */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-stone-300" />

                <h3 className="text-lg font-bold text-stone-100">
                  Opening Hours
                </h3>
              </div>

              <p className="text-stone-400 text-sm leading-relaxed">

                <span className="font-semibold text-stone-300">
                  Monday – Thursday
                </span>

                <br />

                8:00 AM – 5:00 PM

              </p>
            </div>


            {/* Librarian Login */}
            <div>
              <div className="flex items-center gap-2 mb-4">

                <Library size={18} className="text-stone-300" />

                <h3 className="text-lg font-bold text-stone-100">
                  Librarian Login
                </h3>

              </div>

              <p className="text-stone-400 text-sm mb-4">
                Access the library management system.
              </p>

              <button
                className="
                  bg-stone-100
                  text-stone-900
                  px-4
                  py-2
                  rounded-lg
                  text-xs
                  font-semibold
                  hover:bg-white
                  transition
                  cursor-pointer
                "
                onClick={() => navigate("/admin-login")}
              >
                Go to Login
              </button>

            </div>

          </div>


          {/* Bottom */}
          <div className="
            border-t
            border-stone-700
            mt-12
            pt-6
            flex
            flex-col
            md:flex-row
            justify-between
            items-center
            gap-3
          ">

            <p className="text-sm text-stone-400 text-center md:text-left">
              © {new Date().getFullYear()} Naic Municipal Library.
              All rights reserved.
            </p>

            <p className="text-sm text-stone-500">
              Digital Library Platform
            </p>

          </div>

        </div>

      </section>

    </footer>
  );
};

export default Footer;