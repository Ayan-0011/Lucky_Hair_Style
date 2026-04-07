import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Clock, Instagram, Mail, MapPin, Phone, PhoneIncoming, Sparkles, Star, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerNav from "@/components/CustomerNav";
import { useServices } from "@/hooks/use-services";
import heroImage from "@/assets/salon-hero.webp";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import v1 from "../assets/v-1.mp4"
import v2 from "../assets/v-2.mp4"
import v3 from "../assets/v-3.mp4"
import v4 from "../assets/v-4.mp4"
import v5 from "../assets/v-5.mp4"
import v6 from "../assets/v-6.mp4"
import v7 from "../assets/v-7.mp4"
import v8 from "../assets/v-8.mp4"
import i0 from "../assets/0.1.jpg"
import i00 from "../assets/0.jpg"
import i1 from "../assets/1.jpg"
import i2 from "../assets/2.jpg"
import i3 from "../assets/3.jpg"
import i4 from "../assets/4.jpg"
import i5 from "../assets/5.jpg"
import i6 from "../assets/6.jpg"
import i7 from "../assets/7.jpg"
import i8 from "../assets/8.jpg"
import Features from "@/components/Home/Features";


const Index = () => {
  const { data: services = [], isLoading } = useServices(true);
  const topServices = services.slice(0, 3);


  return (
    <div className="min-h-screen">
      <CustomerNav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Lucky hair studio interior" className="h-full w-full object-cover" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 to-foreground/30" />
        </div>
        <div className="container relative z-10 flex min-h-[70vh] flex-col items-start justify-center py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest animate-fade-in text-yellow-300" style={{ animationDelay: "0.1s" }}>
            Welcome to Lucky hair studio
          </p>
          <h1 className="mb-6 max-w-xl text-4xl font-bold leading-tight text-primary-foreground md:text-6xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Where Elegance Meets Style
          </h1>
          <p className="mb-8 max-w-md text-base text-primary-foreground/80 font-body animate-fade-in" style={{ animationDelay: "0.3s" }}>
            Experience premium grooming and beauty services in a refined atmosphere. Book your appointment today.
          </p>
          <Link to="/book">
            <Button size="lg" className="gap-2  animate-fade-in" style={{ animationDelay: "0.4s" }}>
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <Features/>

      {/* Popular Services */}
<section className="relative border-t bg-gradient-to-br from-secondary/40 to-background py-24">
  <div className="container">
    
    {/* Heading */}
    <div className="mb-16 text-center">
      <h2 className="mb-4 text-4xl font-bold tracking-tight">
        Popular Services
      </h2>
      <p className="text-muted-foreground font-body text-lg">
        Our most loved hair & skin treatments ✨
      </p>
    </div>

    {isLoading ? (
      <div className="text-center text-muted-foreground">
        Loading services...
      </div>
    ) : (
      <div className="grid gap-8 md:grid-cols-3">
        {topServices.map((s, i) => (
          <div
            key={s.id}
            className="group relative overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-md p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 animate-fade-in"
            style={{ animationDelay: `${0.15 * (i + 1)}s` }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/10 via-transparent to-primary/10"></div>

            {/* Service Name */}
            <h3 className="relative mb-2 text-xl font-semibold tracking-wide">
              {s.name}
            </h3>

            {/* Description */}
            <p className="relative mb-5 text-sm text-muted-foreground font-body leading-relaxed">
              {s.description}
            </p>

            {/* Price + Time */}
            <div className="relative flex items-center justify-between">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                ₹{s.price}
              </span>

              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" /> {s.duration} min
              </span>
            </div>

            {/* Hover Button */}
            <div className="mt-6 opacity-0 translate-y-4 opacity-100 translate-y-0 transition-all duration-300">
              <Link to="/services">
              <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:opacity-90">
                Book Now
              </Button>
              </Link>
            </div>

            {/* Bottom Accent */}
            <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></div>
          </div>
        ))}
      </div>
    )}

    {/* View All Button */}
    <div className="mt-14 text-center">
      <Link to="/services">
        <Button className="gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:opacity-90 px-6 py-2 rounded-full shadow-md">
          View All Services <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  </div>
</section>

      {/* Video Showcase */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-5">

          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold mb-3 text-gray-800">
              Our Work in Action
            </h2>
            <p className="text-gray-500">
              Real transformations from our salon
            </p>
          </div>

          {/* Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">

            {[v1, v2 ,v3, v4, v5, v6, v7, v8].map((video, i) => (
              <div
                key={i}
                className="min-w-[140px] md:min-w-[180px] h-[260px] md:h-[320px] 
          rounded-2xl overflow-hidden border border-gray-200 
          shadow-sm hover:shadow-lg transition duration-300 group relative"
              >

                {/* Video */}
                <video
                  src={video}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  autoPlay
                  loop
                  muted
                  playsInline
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />

                {/* Label */}
                <span className="absolute bottom-2 left-2 text-xs bg-white/80 px-2 py-1 rounded-md text-gray-700">
                  Style {i + 1}
                </span>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 text-center">

          <h2 className="text-3xl font-semibold mb-3 text-gray-800">
            Our Work
          </h2>
          <p className="text-gray-500 mb-10">
            A glimpse of our styling excellence
          </p>

          <Swiper
            modules={[EffectCoverflow, Navigation, Autoplay]}
            effect="coverflow"
            centeredSlides={true}
            slidesPerView={2}
            loop={true}
            navigation={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
          >
            {[i0, i00, i1, i2, i3, i4, i5, i6, i7, i8].map((img, i) => (
              <SwiperSlide key={i}>
                <div className="overflow-hidden rounded-xl transition duration-300">
                  <img
                    src={img}
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5">

          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-3 text-gray-800">
              What Our Clients Say
            </h2>
            <p className="text-gray-500">Real experiences from our happy customers</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              {
                name: "Ayan Ansari",
                review: "I booked an appointment online and everything was smooth. No waiting time and great service. Loved the experience.",
              },
              {
                name: "Kasim Ansari",
                review: "Best salon in town. Clean environment and great styling.",
              },
              {
                name: "Sadan Pathan",
                review: "Top-tier service and a very classy environment. If you’re looking for a premium salon experience, this is the place to visit.",
              },
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl p-6 
          hover:shadow-xl hover:-translate-y-2 transition duration-300"
              >

                <h4 className="font-semibold ms-0.5 text-gray-800">{t.name}</h4>

                {/* Stars */}
                <div className="text-yellow-500 mb-3 text-lg">
                  ★★★★★
                </div>
                <p className="text-gray-600 text-sm mb-4">"{t.review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>





      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917043124577?text=Hello%2C%20I%20want%20to%20book%20an%20appointment%20at%20Lucky%20Hair%20Style."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
        style={{ backgroundColor: "#25D366" }}
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>



      {/* Footer */}
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
                  <span>info@luckyhairstyle.com</span>
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
                    bg-gradient-to-r from-pink-700 via-purple-500 to-yellow-300
                    hover:scale-110 transition duration-300"
                  >
                    <Instagram size={22} />
                  </a>

                  <a
                    href="https://www.youtube.com/@luckyhairstyle57/featured"
                    className="p-3 rounded-full text-white border border-white/10 
                    bg-red-600 hover:scale-110 
                    hover:shadow-lg hover:shadow-red-500/30 
                    transition duration-300"
                  >
                    <Youtube size={22} />
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
            © 2026 Lucky Hair Studio. All rights reserved.
          </div>

        </div>
      </footer>

    </div>
  );
};

export default Index;
