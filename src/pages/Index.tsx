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
      <section className="container py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-tight">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            Premium care tailored to your unique style ✨
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Star, title: "Expert Stylists", desc: "Professional Hair & Facial Artists✨" },
            { icon: Sparkles, title: "Premium Products", desc: "Luxury products for flawless hair & skin " },
            { icon: Clock, title: "Flexible Hours", desc: "Open 7 days for your convenience, Your Time, Your Style 🔥" },
          ].map((f, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-2xl border bg-card/60 backdrop-blur-md p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/40 animate-fade-in"
              style={{ animationDelay: `${0.15 * (i + 1)}s` }}
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-primary/10 via-transparent to-primary/10"></div>

              {/* Icon */}
              <div className="relative mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-md group-hover:scale-110 transition">
                <f.icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="relative mb-3 text-xl font-semibold tracking-wide">
                {f.title}
              </h3>

              {/* Description */}
              <p className="relative text-sm text-muted-foreground font-body leading-relaxed">
                {f.desc}
              </p>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </section>


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
      <section className="py-20 bg-white">
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

            {[
              "/videos/v1.mp4",
              "/videos/v2.mp4",
              "/videos/v3.mp4",
              "/videos/v4.mp4",
              "/videos/v5.mp4",
            ].map((video, i) => (
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
      <section className="py-20 bg-white">
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
            {[
              "data:image/jpeg;base64,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",
              "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxITEhUTEhIVFRUXFxUVFxcVFRUVGBUVFRUWFhUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMsNygtLi0BCgoKDg0OFRAQFS0dHR0rLSsrLS0rLS0rLS0tLS0tLSstKystKy0tKy0tLS0tKy0rLS0tLS0rLS0tLS0tKzctLf/AABEIASwAqAMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAACAwEEAAUGBwj/xAA7EAABAwEFBQYFAQgDAQEAAAABAAIRAwQSITFBBVFhcZEGEyKBobEyQsHR8OEHFBUzUmJy8SOCkrJD/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAIBEBAQACAQUAAwAAAAAAAAAAAAECEQMSEyExQSIyUf/aAAwDAQACEQMRAD8Apdq7A6tFwZLkamwa4zavTXUSUBshXnmena4vK6myn6sSP4aQQccF6w/ZwObQqdt2NLHBrcYwWu4nS5vYlkBBdd1XRUbO5HsTZbmMhwgytyygAs5ZLI1jbETqgsOww2qapcTIyW5bTTWU4WeqrottnCaAAmAIXU1FLLll8IrigsWojMN6GCi7tYFUSwJjSoBRSqJhGxAEbSqhoIRJbQE1rVpGByxFdWINTCIBQAjAXndAIsEUKLiASFgamBiguAOaAmtROIGaTbKt1hcMYh0bwCCfOJXM7X2sXAuZkDhwGh9StSbR1gKJpXKWDtTTgBxx1/OiO39oWZMfzMHDgB1Tpo6e+FBAXCHbbj8DyTpEEHhwS/4raicWyN5xHnDvotdKbdwLTTmA9pO4EE9ExhBxBXC1q4eBfa0ETBEQCfLDkVWvvptvNJAbJuB2EE8/DvyV0bejXAjbTXn1h7VmbpcROpM+8/gXQWTtMA4MrwJ+GoAbjjEwRiWuz4YHkmh0JYpuqvZrbTqfC9ruRHsrTQqiWtTGlA1EtIZKxAxYg1neIb6wAqe7XndEtKMOVWramNmXDDiuf21twubdogycyDw4xCsmxttobdpskOI9z0yXOWztIx58DXAjWInjx1XMV7NUcfER5uJ6pbbK7RxB4b+Ts11mMZ26e1baLm4g46tJEHiFrqNYkG6QTORyIObeeo4Hgtd3VqHwuvjUGQfYj1QnvmmTTAIzh7cfKVdJtY/idIGHUwHAwQQQeufon/v9MgEBuHEYdQEgtbUEOAdhgfmHCR9FWGw2YkOuzoRIP/z6gq+DyO1bSAmDc3loPrOCr9+4AO75xGgII84kT6D6ubYmsII7sRqGmfKGkqvb2tObXEj+13pLVUWqfaWAZ8Qyki9PD5QfVMZtylUzaWneA3dy+q0zbGDjlwnHpGHRKrWQfKQHbsp+yaibra2ig2p/LeyRoSWnyvfdXLHXc1hZWkAETO7f5G6Z+y5gWojwvb9COSu0tsubg6HN0nE++CaNursVjquPgcHECQJgug+INdo7X3hbzZHaksIbWJLcrxzbvvclxVitzSZp1S3SJgg6QcuvrkmWis8O7x2MnxZQ6czAOHks6a29lovDmggyCmQvNuw3aXuyaFQnu8Sx5BN3CbhjgMOXHDs9k7epVy4NIBEkDUtESSNDjlxCqNnabS2mwvcYDRJWLgO2m3e8d3TD4G5kfM4fQLEHammtB2i22KU0mAvqEZDENB3nfwW6t1ou03OGYBjCcdMF59t6o6m3xvDS6XETL4JmXnK8d2mkQuOM23a09vtdaZceAGJI6ZKg7a5OF7yvfaUm1OYcS7yGZ5kpDLQwH4Y5+L1K76c7Vh1rd/QfP/aJm0HDAt9/oUlzwfm+3nuSXPYNJP8Abl1hNG2wpW9syGuPI/Qq1TtLn5YDWTh74H83LUCsY0A4mf0Te9nAkkcAT54BNG1mpa3g4Oy3fUySUdDapnxOjiIVNkZNbH+WJ6T7pb7JOJIn/wAj0+6aN10TbRSqZvIO8EE9CBgqto2dqKhcNBe9hkFojUczIyOX4UVLaRBggj1HQ4po3Dq9K6cQZ6H3QAB2EDzOKtNtZIwcPOD7pVe0P3TyACBbtmuPzCNIN7P80Q1tmOywJ1xAMjn7ptDajgZIyy+HDccldp12uGMkbsSPMN+qqeGn/htQHwtLuDS09IlbGwUa5ibzW6tJ0/N4WVu5OAqBvAtw9DPVKaxgwvk8QA0Dq4yguVqTpugEicwSOZgmAPMLb2S2OplkaT4sTmwtdkMBELmTVI3Bo1BJ9Bh+aq8ytUIutOEAm9EARldJgnnvUXa1aBGZlYmV6bCxt1w9sgMOOM9ViK7vtRt9lAXYvPi8BoADg5x0x0Xlm3Lc6rULnGTM8JyyW47X2p5qkvzd4gNzQbrfafPiuYqGTM4rOE0ZUstxk+sonVYgAN5QpqGAOSrMxMrbC13wHyn/ANYeUhSK7Sfh6n8CQWzmfJEAOfT7oDLyPlI5k/RY95Gn0Rh4A+KORQOe3ifRFFTtJ0HmfspfWLsz6fRJmcuu5WLKBO88UEsYBiWyd5JP+kJunMAJtZwynAZxqdwSI4dSUBAEZEFMFbi4cQ5V3B24fnMqHbiMeE/VBYdVnN8/9AT1zQCJ8IB9Eg0yNCFEHeiLeGo6mFgqj+kHmfz2VMcSj4Yjnn0QWqlscBAgf449JyRWOrAl3Hite9w06KxRa6L0RGX3j7orbUAXFriA0TPwxrnKxJoBwc0vJg446niFiixvf2g2Q06lLAx3bRMYYOxHNchXszhU7vW8W+YMH2Xu239iU7VTLHjkRm07wV5Z2g2RUs9sF4Xrxvh0YOPz5cc+axhk1lHMWlpy/MFNCiXZK9tGyuGMc/NXtgWYOYTzVueptcePeWnP1BisurZPsBFa4RmcPPEfnBP2hsstEwr1xOi+WlARBWqVHeo7la2xoiSmNcRkmil+qaLOptdK5OCgOgZeSsGzZeZ+qFlAyrs0gPwknH0A5KGVAMYx/PyUbqG7j+dED6RHP8CJoqs/z6pCa8aoXaogC5Y3P8/CpACYMvt7IBBjn7Ig8k5k+nRCKR6o8AQg21Ct4Gsw344ycSff3WLXVXRHPD291iLt9ELT9p6FN1MXwC68Lh1Bg3o4RI81ulp+0+zHVqQLDFSmb7dx8JDmnmCfMBeZ3ntyVTZ9MggjPNVdnbJZTcYOB09lze09o2tjodeHlh1Q0rdaoktdzhTt3Xt07s36d1V2c1xBgSNeG5NqWNpEEA81zuze0NQQKjHRlJBjquns9obUbIK45Y3F2wsyaav2Zouylp/t+y1lr7LOHwm8Oh5rsQFIak5Mp9W8WN+PPf4a5uDhpHSEz9z/AD0+67i1WQOGS1r7Aus5NuOXHpzQsnD9JwRHZ8Yx5dPzzXS07AJTBYxuWu4x23MDZ8aR+HNV7TYcMuX16rsDZBzSKlkGoTunacJbLNuy/wB/Zaqo2F31s2dguV2jYSCcMF2xylcc8bGpcU1hySy1ZK25muOQ36+agE9MUIOIUOJCC00XroWK7sSwuqGGiSBew3CJ/OSxS3TUj3uEu2VbrDygeaZK0m2rSTgOX3Xlyuo9HHj1VzO0gCYCTYGjEO4EK86zrQbepV2kOpYADnPCN3quePnw9GV15bsNHNPov3LjrK62PMF10Tjdb1zldjsyyEASSeaZY6+mOXV8W2PlPYEHdwmMXKusEWpTqSsAoHLUZzisWQhDUyokvqQrazjiK7JgJrLNTyv47pHstbb65uQDdLzdB1yJgcYBVHZdiPwnRR1kjeWzZ+EjELktuWGQcOP56LptmV3NqGm4ktIJE6Roqe3aQAK6ceWq4c2E08xr04cQq7lsNpYOWvK90fPqQUxwk/n5qgaF1PYrYH7xUDnj/jZi7+4nJqW6JNut7D7E7pgrOwc9oAG4b+Zn0WLqG4YBYvNbuusmlu0V4w3+y1FsYCn7Up1PiYL2EEDPmBqtLTtoc4tJhwzBBB6Fcc97evhk6UvcMkZpSFr9pWgA4ZyFuKbcAsOug0LM0aKzAGSQSpD1DQnFCCoLkDnIoxUQvqFBKghEtEwohRDjBUDJVrRa+7gxJdlu5oNHaa7K1+kHYtd4Tli05gq/sSvUDgypjgYdkTG/elfwYuF4N4zkr1ioFkF+YkNAxM8Vq601JdjP86RoCq23XeAq2xkEk5nE/Za7bz4YmH7Rjmv4vP8AaJxWuhX7YZKqimSV9Geny77XdibMfaKrabBi4wTuGZJ4QF7LsTZLbPSbTbpmd53n0HkFruw/Z/8AdqN54/5agBdObBGDOe/iukXHPLbpjNFFhWI3OKhc2lhq5ztiwO7tvzCTOoGAGPOei6YFc12jDmvvuE0zHiHyHLxcPupl6b45+TRWLZpc8Oe4uAMgHKdOa395a+lWGEHBWG1Fwr1w5zkKi8ovIuxOKBZKlEQQsBUkoXIJc7BRQp3g3EYkYuybOpO5JecENCqWCNEWL9KoYN7LEYa8Qqzi0ZYneUupWc7gopsWWurQgVqO0PwhbhVbdQvBb47quWfmOBrWTFdH2C7Pd7W76oPBSOAPzVMx0z6I62zs8F2/ZmyilZmNGsuPNx+0L1de48eWGm0hQpB4KHLKIcsWOhYgbK1PaOiXU/hvNE3gBOEfEeA+q3Vks7n5YAZnd+q21mptaPCMPV3Pgr0dUWZ9N28ZNlez+Q6B/S7Fvlu8lt7FVJAvCDqM8eBU7TYBWqFghhe4tAyAnTglArz3+PZvflfDlIKrtemByy1syVl9KvKLyIdfUEpMqXVAENpcUouQOqysaFKQ9iYltRhZVgUlqgIwkKS2kumsQhjBuaFzzV0WzzNNvn7ld+O7rhzTxDihJCksSyxdXnS4LELliK6Cu8CGNAA4aIW1RMaBVXVfFKr0q2Lua67Y042u264sdm0kHy1SboXUW7ZLK0uJLXAfEMZ3AjVaV+yKgOh5H7rzZcdj1Y8svtTkKAVsaOxKrtAOZ+y2Vm7MTi9+Gt0exP2UnHlWry4z652Up1aF21DYdBolzJH9xJJXI7csHc1YAIa4Xmzu3TwP0Vy47JtMeSZXSm6qUBUtCktXN1SxNBSgEYWaHtKYkNKa0rKmBEgaiIQSFstl2268U3/A/AH+l+/2n9FrArF0Xccsp/pJyd5GFvjuqzyTeNdA+QSDmMEIcrFkouq2dtQj/kbLXf3BpLeohU7y9VeJLyoUOCxRVlz81Xou8R4hZUfiVOzhm4/LgOZXRlZqmBd680ujSvFQZJWzs9G6I1SCaFEZJ7mzhoFIwyWHALTJNV3ouG7f7SuVKDDiIe5x1xIAhdvdlcP+0mwFzG1m/wD5kh3+Lox8iB1WM/TpxftGra5EqOz7QHtHqr7QvHZp7UQiCwLAoqQmNSwjaVA5iYltTAFFGwJldpLS0CS7wgDMk4ABA0HAAEk5AYk+S6PY+zrnjfBfoMwwffj+HfHhcqxyZzGN1saiadJjCZLWtBO9wzPWVq9q2a4/DJ2I+o/N63FlVfb9EuouLRLmeNo33fib5iRzhe6zw+fvy0DipQUa7XtDm4g4/ooXJ0UqG1GP4O3H6HVbmzNhg4+Lrl6QvOrEDWqMpifE4Cdw1PkJPkvTKbZMDLLyC1hu+15JJfBtjo6q6AoYABwQufK25GSgdUlQ90BKY5UGagGWJWttgDgWuAIMgg4gg5ghbItwlULRT1Uqx51tXYFWzvL6AL6Wrc3M4EZuHHrvM2S0hwkLuHiFQteyaNTEthx+Zvhd56HzlccuPfp3w5de3PX1ivVezjx/Lqgjc8EHq3PoELdj1/6Wnk4fVcbx2O05Mb9VQmhXaew6xzuDmT9Ar1HYA+eoTwaLvripOPK/C8uM+tSwrZWPZlR+JFxu9wx8m/dbiy2anT+BgHHM9TirUrpjw/1zy578KsVkZT+EY6uOZ89OQVunEpAMZ4IqTzpz6LvJp57bW2p6Af74qyYVagWgTv1T74XRh5vaX/ulrqUj/Kc6R/bfxBHATHksW87ebM7xgqNElkzvuH7H3KhZsjUrjP2cjva1R+lNgH/aoSB6Nd1XpdGmAOK4D9kNO7ZH1DnUquj/ABY1rfe8u771WoY96imVjSChrODRggCq+SoFSEg1Ul9QqKv1LUISHWhqplpKJlnKAnvakkbvVWO5AUFqgSAd31U3kwMTG0yilMcmgE6H290Yai7tNAWt3nomAbkbKY1Ul8ZIBbT1KZdGmCC9KfTpykQ+zMkcsPt6QrNNkJFmBBjDH6fh6JtSscitMoqgHA5HA8VKxpWKjgv2fWe5YLON7C//ANuc/wCq6aFp+zFK7ZLO0/LRpDzDAtyxwUUbcFVr1JKZXfOAS6VHVRSxTlGyirLKSl7wEC20gEL3IH1iclDWoMRXVgasL9yCcApQhTfAQG3imXwq14pjWICc8omU0TGQmtCaNsa0BMFTcETKaYKaqFMOIJ3/AKfVWmtGUnzQimMk5pEY8vMYKoEUwFiJxGixBy1mZdAaMgAPIYK2CkEImuWWjWU06QEl1UDJVnvLkD61q0CUxpdmipUd6dCAA1EBGaJ0NzVZzi4oDfUnJDCNrYUilvQLEpjaaKRoia0lBLGJrWoWgBGCqg2hOZCQ0J7QgaEQQAIgCiGAFSGHGD+fkrGtKMFUJjFYmmFiDlpKy8mvCAU1loIEqzRpLKVJOHBBkIarw3msrVQ3LNV2NvYoIALjJTmtWRCFz9FQwkBDiVDAmhBDGIy7chc9GwIjGjejASy5TIGJKBrU68BmYVIWhxwYE6nZdXn1QO/ehoJRCo85YLGGmP0TG2hu4oIa1/8AUmB51O73Ud8DopI1VRNQbliCocVKg0tyU1lFWWsCkhFIupVetGAR2h2C197FRTGtJMlPvJbdFJQY9yFgQomoGNKy9OSW44pjVQxgWGpuSbQ85KZhhIzQTVrhvEqGUyfFUMcNUnZ7QWl5xdMY6ckNNxe4h2Q0381BaNs+WmOmJ6plOz1XbhzxKfZmCMEVauRkqiWWD+p58oHsjNmpDPHmSVrn2hx1QtE5koL720QMuhKrG0R8MxuJP3WNohFcCBlK1jUeW7lvWKu9ghYg/9k=",
              "data:image/jpeg;base64,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",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv4CiuVmsVGLQN8tMvC0tjot5IYD_MawPD2qll3YVfwA&s",
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZf8ktjRCqXawpK736Yn_XJFzQR1UFM0sXTw&s",
            ].map((img, i) => (
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
                review: "Amazing service! The staff is very professional and friendly.",
              },
              {
                name: "Kasim Ansari",
                review: "Best salon in town. Clean environment and great styling.",
              },
              {
                name: "Sadan Pathan",
                review: "Loved the haircut and beard styling. Highly recommend!",
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
        className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
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
