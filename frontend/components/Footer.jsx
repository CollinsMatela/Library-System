import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Library,
} from "lucide-react";

const Footer = ({ setShowLogin }) => {
  return (
    <footer className="w-full">



      {/* Footer Information */}
      <section className="bg-stone-100 px-6 md:px-16 py-14">

        <div className="max-w-6xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Library */}
            <div>
              <h3 className="text-xl font-bold text-stone-800 mb-4">
                Naic Municipal Library
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                A public library dedicated to providing accessible books,
                information, educational resources, and digital services
                to the community.
              </p>
            </div>


            {/* Location */}
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-4">
                Location
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                Naic Town Plaza,
                <br />
                Cavite 4110
              </p>
            </div>


            {/* Contact */}
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-4">
                Contact Us
              </h3>

              <div className="space-y-2 text-sm text-stone-500">
                <p>
                  <span className="font-semibold text-stone-700">
                    Email:
                  </span>{" "}
                  naiclibrary4110@gmail.com
                </p>

                <p>
                  <span className="font-semibold text-stone-700">
                    Phone:
                  </span>{" "}
                  (046) 412 0413
                </p>
              </div>
            </div>


            {/* Opening Hours */}
            <div>
              <h3 className="text-lg font-bold text-stone-800 mb-4">
                Opening Hours
              </h3>

              <p className="text-stone-500 text-sm leading-relaxed">
                <span className="font-semibold text-stone-700">
                  Monday – Thursday
                </span>
                <br />
                8:00 AM – 5:00 PM
              </p>
            </div>

          </div>

          {/* Bottom */}
          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">

            <p className="text-sm text-stone-500">
              © {new Date().getFullYear()} Naic Municipal Library. All rights reserved.
            </p>

            <p className="text-sm text-stone-400">
              Digital Library Platform
            </p>

          </div>

        </div>

      </section>

    </footer>
  );
};

export default Footer;

