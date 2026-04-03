import { Link } from "react-router-dom";
import { Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerNav from "@/components/CustomerNav";
import { useServices } from "@/hooks/use-services";

const Services = () => {
  const { data: services = [], isLoading } = useServices(true);

  return (
    <div className="min-h-screen">
      <CustomerNav />
      <div className="container py-16">
        <div className="mb-12 text-center">
          <h1 className="mb-3 text-4xl font-bold">Our Services</h1>
          <p className="text-muted-foreground font-body">Choose from our range of premium treatments</p>
        </div>
        {isLoading ? (
          <div className="text-center text-muted-foreground">Loading services...</div>
        ) : (
          <div className="mx-auto grid max-w-4xl gap-6">
            {services.map((s, i) => (
              <div
                key={s.id}
                className="
        group relative overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-md p-6 
        transition-all duration-300 animate-fade-in

        /* Mobile default */
        shadow-lg border-primary/30

        /* Desktop hover */
        md:hover:shadow-2xl md:hover:-translate-y-1 md:hover:border-primary/40
      "
                style={{ animationDelay: `${0.05 * (i + 1)}s` }}
              >
                {/* Glow Effect */}
                <div className="
        absolute inset-0 transition duration-300 
        bg-gradient-to-br from-primary/10 via-transparent to-primary/10
        
        opacity-100
        md:opacity-0 md:group-hover:opacity-100
      "></div>

                <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  {/* Left Content */}
                  <div>
                    <h3 className="text-lg font-semibold tracking-wide">
                      {s.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-body">
                      {s.description}
                    </p>
                  </div>

                  {/* Right Content */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10">

                    {/* Price */}
                    <div className="">
                      <p className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                        ₹{s.price}
                      </p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {s.duration} min
                      </p>
                    </div>

                    {/* Button */}
                    <Link to={`/book?service=${s.id}`}>
                      <Button
                        size="sm"
                        className="
                gap-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white 
                hover:opacity-90 transition-all duration-300

                /* Mobile visible */
                opacity-100

                /* Desktop hover */
                md:opacity-0 md:translate-y-2 
                md:group-hover:opacity-100 md:group-hover:translate-y-0
              "
                      >
                        Book <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className="
        absolute bottom-0 left-0 h-[3px] 
        bg-gradient-to-r from-yellow-400 to-yellow-600 transition-all duration-300
        
        w-full
        md:w-0 md:group-hover:w-full
      "></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
