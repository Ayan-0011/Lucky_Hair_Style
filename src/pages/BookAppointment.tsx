import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { Check, ArrowLeft, ArrowRight, Calendar as CalIcon, Clock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import CustomerNav from "@/components/CustomerNav";
import { useServices } from "@/hooks/use-services";
import { useBookedSlots, useCreateAppointment } from "@/hooks/use-appointments";
import { useSettings } from "@/hooks/use-settings";
import { formatTime12h, isValidMobile } from "@/lib/store";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const STEPS = ["Service", "Date", "Time", "Details", "Confirm"];

const BookAppointment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { data: services = [], isLoading: loadingServices } = useServices(true);
  const { data: settings, isLoading: loadingSettings } = useSettings();
  const createAppointment = useCreateAppointment();

  const preselectedService = searchParams.get("service");
  const [step, setStep] = useState(preselectedService ? 1 : 0);
  const [selectedService, setSelectedService] = useState<string>(preselectedService || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  const service = services.find(s => s.id === selectedService);
  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const { data: bookedSlots = [] } = useBookedSlots(dateStr);


  const availableSlots = useMemo(() => {
    if (!settings || !dateStr) return [];

    const isClosed = settings.closed_dates.includes(dateStr);
    const booked = new Set(bookedSlots);

    return settings.available_slots.map(slot => ({
      time: slot,
      isBooked: booked.has(slot),
      isClosed: isClosed
    }));
  }, [dateStr, bookedSlots, settings]);

  const nameError = nameTouched && name.trim().length === 0 ? "Name is required" : "";
  const phoneError = phoneTouched && !isValidMobile(phone) ? "Enter valid 10-digit mobile number" : "";
  const detailsValid = name.trim().length > 0 && isValidMobile(phone);

  if (loadingServices || loadingSettings) {
    return (
      <div className="min-h-screen">
        <CustomerNav />
        <div className="container flex min-h-[60vh] items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (settings && !settings.booking_enabled) {
    return (
      <div className="min-h-screen">
        <CustomerNav />
        <div className="container flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="mb-3 text-2xl font-bold">Booking Currently Unavailable</h1>
            <p className="text-muted-foreground font-body">Please check back later.</p>
          </div>
        </div>
      </div>
    );
  }

  const canNext = () => {
    if (step === 0) return !!selectedService;
    if (step === 1) return !!selectedDate;
    if (step === 2) return !!selectedTime;
    if (step === 3) return detailsValid;
    return true;
  };

  const handleConfirm = async () => {
    if (!service || !selectedDate) return;
    try {
      await createAppointment.mutateAsync({
        customer_name: name,
        customer_phone: phone,
        service_id: service.id,
        date: dateStr,
        time: selectedTime,
      });
      navigate("/booking-confirmed", {
        state: { service: service.name, date: format(selectedDate, "PPP"), time: formatTime12h(selectedTime), name },
      });
    } catch (err: any) {
      toast.error(err.message || "Booking failed. Please try again.");
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(val);
  };

  return (
    <div className="min-h-screen">
      <CustomerNav />
      <div className="container max-w-2xl py-12">
        <h1 className="mb-8 text-center text-3xl font-bold">Book an Appointment</h1>

        {/* Stepper */}
        <div className="mb-10 flex items-center justify-center gap-1">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <div className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors",
                i < step ? "bg-primary text-primary-foreground" :
                  i === step ? "bg-primary text-primary-foreground" :
                    "bg-muted text-muted-foreground"
              )}>
                {i < step ? <Check className="h-4 w-4" /> : i + 1}
              </div>
              {i < STEPS.length - 1 && <div className={cn("h-0.5 w-6 sm:w-10", i < step ? "bg-primary" : "bg-muted")} />}
            </div>
          ))}
        </div>

        <div className="rounded-xl border bg-card p-6 sm:p-8 animate-fade-in">
          {/* Step 0: Service */}
          {step === 0 && (
            <div>
              <h2 className="mb-4 text-xl font-semibold">Select a Service</h2>
              <div className="grid gap-3">
                {services.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedService(s.id)}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-4 text-left transition-all hover:border-primary/50",
                      selectedService === s.id ? "border-primary bg-primary/5" : "bg-background"
                    )}
                  >
                    <div>
                      <p className="font-semibold">{s.name}</p>
                      <p className="text-xs text-muted-foreground font-body">{s.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{s.price}</p>
                      <p className="text-xs text-muted-foreground">{s.duration} min</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Date */}
          {step === 1 && settings && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <CalIcon className="h-5 w-5 text-primary" /> Select a Date
              </h2>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(d) => { setSelectedDate(d); setSelectedTime(""); }}
                  disabled={(date) => {
                    const d = format(date, "yyyy-MM-dd");
                    return date < new Date(new Date().setHours(0, 0, 0, 0)) || settings.closed_dates.includes(d);
                  }}
                  className="pointer-events-auto"
                />
              </div>
            </div>
          )}

          {/* Step 2: Time */}
          {step === 2 && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <Clock className="h-5 w-5 text-primary" /> Select a Time
              </h2>
              {availableSlots.length === 0 ? (
                <p className="text-center text-muted-foreground font-body">No available slots for this date.</p>
              ) : (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => !slot.isBooked && setSelectedTime(slot.time)}
                      disabled={slot.isBooked}
                      className={cn(
                        "rounded-lg border px-3 py-2.5 text-sm font-medium transition-all",

                        slot.isBooked
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300 line-through"
                          : "hover:border-primary/50",

                        selectedTime === slot.time && !slot.isBooked
                          ? "border-primary bg-primary text-primary-foreground"
                          : "bg-background"
                      )}
                    >
                      {formatTime12h(slot.time)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Details */}
          {step === 3 && (
            <div>
              <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
                <User className="h-5 w-5 text-primary" /> Your Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Full Name <span className="text-destructive">*</span></label>
                  <Input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    placeholder="Enter your name"
                  />
                  {nameError && <p className="mt-1 text-xs text-destructive">{nameError}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Mobile Number <span className="text-destructive">*</span></label>
                  <Input
                    value={phone}
                    onChange={handlePhoneChange}
                    onBlur={() => setPhoneTouched(true)}
                    placeholder="Enter 10-digit mobile number"
                    inputMode="numeric"
                    maxLength={10}
                  />
                  {phoneError && <p className="mt-1 text-xs text-destructive">{phoneError}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirm */}
          {step === 4 && service && selectedDate && (
            <div>
              <h2 className="mb-6 text-xl font-semibold">Confirm Your Booking</h2>
              <div className="space-y-3 rounded-lg bg-secondary/50 p-5">
                <div className="flex justify-between"><span className="text-muted-foreground">Service</span><span className="font-medium">{service.name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Date</span><span className="font-medium">{format(selectedDate, "PPP")}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Time</span><span className="font-medium">{formatTime12h(selectedTime)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Name</span><span className="font-medium">{name}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Phone</span><span className="font-medium">{phone}</span></div>
                <hr className="border-border" />
                <div className="flex justify-between text-lg"><span className="font-semibold">Total</span><span className="font-bold text-primary">₹{service.price}</span></div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            <Button variant="outline" onClick={() => setStep(s => s - 1)} disabled={step === 0} className="gap-1">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < 4 ? (
              <Button onClick={() => setStep(s => s + 1)} disabled={!canNext()} className="gap-1">
                Next <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleConfirm} disabled={createAppointment.isPending} className="gap-1">
                {createAppointment.isPending ? "Booking..." : "Confirm Booking"} <Check className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
