import { Link } from "react-router-dom";
import { ArrowRight, Clock, } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerNav from "@/components/CustomerNav";
import { useServices } from "@/hooks/use-services";
import heroImage from "@/assets/salon-hero.webp";
import Features from "@/components/Home/Features";
import Video_imgShowcase from "@/components/Home/Video_imgShowcase";
import Footer_ from "@/components/Home/Footer_";
import Whatpp from "@/components/Home/Whatpp";
import Testimonials from "@/components/Home/Testimonials";
import { motion } from "framer-motion";


const Index = () => {
  const { data: services = [], isLoading } = useServices(true);
  const topServices = services.slice(0, 3);

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: -80 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

  const fadeRight = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8 },
    },
  };

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
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <Features />
      </motion.div>

      {/* Popular Services */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }} className="relative border-t bg-gradient-to-br from-secondary/40 to-background py-24">
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
            <motion.div
              style={{ overflow: "hidden" }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.2 }} className="grid gap-8 md:grid-cols-3">
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
            </motion.div>
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
      </motion.section>

      {/* Video Showcase */}

      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
        className="overflow-hidden"
      >
        <Video_imgShowcase />
      </motion.div>


      {/* Testimonials */}
      <motion.div
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <Testimonials />
      </motion.div>

      {/* Floating WhatsApp Button */}
      <Whatpp />


      {/* Footer */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <Footer_ />
      </motion.div>

    </div>
  );
};

export default Index;
