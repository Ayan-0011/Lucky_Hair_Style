import { Clock, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import React from 'react'
import iglogo from '../../assets/insta_logo.png'

const Footer_ = () => {
  return (
    <>

      <footer className="bg-gradient-to-b from-black to-neutral-900 text-white pt-12 pb-6 px-5">

        <div className="max-w-7xl mx-auto">

          {/* Grid */}
          <div className="grid gap-10 md:grid-cols-3">

            {/* Contact */}
            <div>
              <h2 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Contact
              </h2>

              <div className="space-y-4 text-sm text-gray-300">

                <div className="flex items-center gap-3 hover:text-yellow-400 transition">
                  <Phone size={16} />
                  <span>+91 63591 39911</span>
                </div>

                <div className="flex items-center gap-3 hover:text-yellow-400 transition">
                  <Mail size={16} />
                  <span>luckyhairstyle77@gmail.com</span>
                </div>

                <div className="flex items-center gap-3 hover:text-yellow-400 transition">
                  <Clock size={16} />
                  <span>Mon - Sat: 10AM - 8PM</span>
                </div>

              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                Location
              </h2>

              <div className="flex items-start gap-3 text-sm text-gray-300 hover:text-yellow-400 transition">
                <MapPin size={16} className="mt-1" />
                <p>
                  Mill Road Nadiad,<br />
                  Gujarat, 387001

                </p>
              </div>
            </div>

            {/* Social + Owner */}
            <div className="flex flex-col justify-between">

              <div>
                <h2 className="text-lg font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                  Follow Us
                </h2>

                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/lucky_hairstyle_/"
                    className="p-3 rounded-full text-white border border-white/10 
                    hover:scale-110 transition duration-300"
                  >
                    {/* <Instagram size={22} /> */}
                    <img src={iglogo} alt="insta logo" className='h-7 w-7' />
                  </a>

                  <a
                    href="https://www.youtube.com/@luckyhairstyle57/featured"
                    className="p-3 rounded-full text-white border border-white/10 
                    bg-red-600 hover:scale-110 
                    hover:shadow-lg hover:shadow-red-500/30 
                    transition duration-300"
                  >
                    <Youtube size={28} />
                  </a>
                </div>
              </div>

              <p className="text-xs text-end text-gray-400 mt-8">
                Developed by{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 font-medium">
                  ~Ayan Ansari
                </span>
              </p>

            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mt-10 pt-5 text-center text-xs text-gray-500">
            © 2026 Lucky Hair Style. All rights reserved.
          </div>

        </div>
      </footer>

    </>
  )
}

export default Footer_
