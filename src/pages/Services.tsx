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
          <div className="mx-auto grid max-w-4xl gap-4">
            {services.map((s, i) => (
              <div key={s.id} className="flex flex-col gap-4 rounded-xl border bg-card p-6 transition-all hover:shadow-md hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between animate-fade-in" style={{ animationDelay: `${0.05 * (i + 1)}s` }}>
                <div>
                  <h3 className="text-lg font-semibold">{s.name}</h3>
                  <p className="text-sm text-muted-foreground font-body">{s.description}</p>
                </div>
                <div className="flex items-center justify-center gap-[120px]">
                  <div className="text-right">
                    <p className="text-xl font-bold text-left text-warning">₹{s.price}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" /> {s.duration} min
                    </p>
                  </div>
                  <Link to={`/book?service=${s.id}`}>
                    <Button size="sm" className="gap-1">
                      Book <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
