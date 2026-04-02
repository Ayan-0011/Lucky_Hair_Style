import { useState } from "react";
import { useSettings, useUpdateSettings } from "@/hooks/use-settings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { formatTime12h } from "@/lib/store";

const SalonSettings = () => {
  const { data: settings, isLoading } = useSettings();
  const updateSettings = useUpdateSettings();
  const [newSlot, setNewSlot] = useState("");

  if (isLoading || !settings) {
    return <div className="text-center text-muted-foreground py-12">Loading settings...</div>;
  }

  const toggleBooking = () => {
    updateSettings.mutate({ id: settings.id, booking_enabled: !settings.booking_enabled });
  };

  const addClosedDate = (date: Date | undefined) => {
    if (!date) return;
    const d = format(date, "yyyy-MM-dd");
    const newDates = settings.closed_dates.includes(d)
      ? settings.closed_dates.filter(x => x !== d)
      : [...settings.closed_dates, d];
    updateSettings.mutate({ id: settings.id, closed_dates: newDates });
  };

  const addSlot = () => {
    if (!newSlot || settings.available_slots.includes(newSlot)) return;
    const slots = [...settings.available_slots, newSlot].sort();
    updateSettings.mutate({ id: settings.id, available_slots: slots });
    setNewSlot("");
    toast.success("Time slot added");
  };

  const removeSlot = (slot: string) => {
    updateSettings.mutate({ id: settings.id, available_slots: settings.available_slots.filter(s => s !== slot) });
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Salon Settings</h1>

      <Card>
        <CardHeader><CardTitle className="text-lg">Booking Control</CardTitle></CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Enable Online Booking</p>
              <p className="text-sm text-muted-foreground font-body">When disabled, customers cannot book appointments</p>
            </div>
            <Switch checked={settings.booking_enabled} onCheckedChange={toggleBooking} />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-lg">Closed Dates</CardTitle></CardHeader>
          <CardContent>
            <p className="mb-3 text-sm text-muted-foreground font-body">Click dates to mark as closed (holidays)</p>
            <Calendar
              mode="single"
              onSelect={addClosedDate}
              modifiers={{ closed: settings.closed_dates.map(d => new Date(d + "T00:00:00")) }}
              modifiersClassNames={{ closed: "bg-destructive/20 text-destructive" }}
              className="pointer-events-auto"
            />
            {settings.closed_dates.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1">
                {settings.closed_dates.sort().map(d => (
                  <Badge key={d} variant="outline" className="gap-1">
                    {d}
                    <button onClick={() => addClosedDate(new Date(d + "T00:00:00"))}><X className="h-3 w-3" /></button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg">Available Time Slots</CardTitle></CardHeader>
          <CardContent>
            <div className="mb-4 flex gap-2">
              <Input type="time" value={newSlot} onChange={e => setNewSlot(e.target.value)} className="w-36" />
              <Button onClick={addSlot} size="sm" className="gap-1"><Plus className="h-4 w-4" /> Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {settings.available_slots.map(s => (
                <Badge key={s} variant="secondary" className="gap-1 px-3 py-1.5">
                  {formatTime12h(s)}
                  <button onClick={() => removeSlot(s)}><X className="h-3 w-3" /></button>
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SalonSettings;
