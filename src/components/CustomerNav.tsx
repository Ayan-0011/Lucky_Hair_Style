import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import luckyLogo from "@/assets/lucky-logo-clean.png";

const CustomerNav = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/book", label: "Book Now" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="container h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src={luckyLogo} alt="Lucky Hair Style" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-display font-semibold tracking-tight text-xl">Lucky Hair Style</span>
        </Link>

        {/* Desktop */}
        <div className="hidden gap-8 md:flex">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === l.to ? "text-primary" : "text-muted-foreground"}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t bg-background p-4 md:hidden animate-fade-in">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-foreground hover:text-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default CustomerNav;
