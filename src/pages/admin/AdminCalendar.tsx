import { useState, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointments } from "@/hooks/use-appointments";
import { formatTime12h } from "@/lib/store";
import { format } from "date-fns";

const AdminCalendar = () => {
  const [selected, setSelected] = useState<Date | undefined>(new Date());
  const { data: appointments = [], isLoading } = useAppointments();

  const dateStr = selected ? format(selected, "yyyy-MM-dd") : "";
  const dayAppts = useMemo(() => appointments.filter(a => a.date === dateStr), [dateStr, appointments]);

  const bookedDates = useMemo(() => {
    const dates = new Set(appointments.map(a => a.date));
    return Array.from(dates).map(d => new Date(d + "T00:00:00"));
  }, [appointments]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Calendar View</h1>
      {isLoading ? (
        <div className="text-center text-muted-foreground py-12">Loading...</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[auto_1fr]">
          <Card>
            <CardContent className="p-4">
              <Calendar
                mode="single"
                selected={selected}
                onSelect={setSelected}
                modifiers={{ booked: bookedDates }}
                modifiersClassNames={{ booked: "bg-primary/20 font-bold" }}
                className="pointer-events-auto"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {selected ? format(selected, "PPPP") : "Select a date"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {dayAppts.length === 0 ? (
                <p className="text-sm text-muted-foreground font-body">No appointments on this date.</p>
              ) : (
                <div className="space-y-3">
                  {dayAppts.sort((a, b) => a.time.localeCompare(b.time)).map(a => (
                    <div key={a.id} className="flex items-center justify-between rounded-lg border p-3">
                      <div>
                        <p className="font-medium">{formatTime12h(a.time)} — {a.customer_name}</p>
                        <p className="text-xs text-muted-foreground">{a.services?.name}</p>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        a.status === "confirmed" ? "bg-success/10 text-success" :
                        a.status === "cancelled" ? "bg-destructive/10 text-destructive" :
                        "bg-warning/10 text-warning"
                      }`}>
                        {a.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminCalendar;
