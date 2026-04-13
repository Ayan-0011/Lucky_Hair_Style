import { useLocation, Link, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import CustomerNav from "@/components/CustomerNav";
import { useEffect } from "react";

const BookingConfirmed = () => {
  const location = useLocation();
  const data = location.state as { service: string; date: string; time: string; name: string } | null;
  const navigate = useNavigate();


  return (
    <div className="min-h-screen">
      <CustomerNav />
      <div className="container flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md rounded-xl border bg-card p-8 text-center animate-fade-in">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
          <h1 className="mb-2 text-2xl font-bold">Booking Confirmed!</h1>
          <p className="mb-6 text-muted-foreground font-body">Your appointment has been successfully booked.</p>

          {data && (
            <div className="mb-6 space-y-2 rounded-lg bg-secondary/50 p-4 text-left text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{data.name}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{data.service}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{data.date}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{data.time}</span></div>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <Link to="/"><Button variant="outline">Back to Home</Button></Link>
            <Link to="/book"><Button>Book Another</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmed;
