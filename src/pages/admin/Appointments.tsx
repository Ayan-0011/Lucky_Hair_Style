import { useAppointments, useUpdateAppointmentStatus, type AppointmentWithService } from "@/hooks/use-appointments";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Check, X, RefreshCw } from "lucide-react";
import { formatTime12h } from "@/lib/store";
import { toast } from "sonner";


const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const openWhatsApp = (a: AppointmentWithService) => {
  const phone = a.customer_phone.replace(/\D/g, "");
  const fullPhone = phone.startsWith("91") ? phone : `91${phone}`;
  const serviceName = a.services?.name || "your service";
  const msg = encodeURIComponent(
    `Hello *${a.customer_name}* 👋,

Your appointment has been *CONFIRMED* ✅

💇 Service: *${serviceName}*
📅 Date: *${formatDate(a.date)}*
⏰ Time: *${formatTime12h(a.time)}*

Thank you for choosing *Lucky Hair Style* 😊`
  );
  window.open(`https://wa.me/${fullPhone}?text=${msg}`, "_blank");
};

const openCancelWhatsApp = (a: AppointmentWithService) => {
  const phone = a.customer_phone.replace(/\D/g, "");
  const fullPhone = phone.startsWith("91") ? phone : `91${phone}`;
  const serviceName = a.services?.name || "your service";

  const msg = encodeURIComponent(
    `Hello *${a.customer_name}*,

Your appointment for *${serviceName}* has been *CANCELLED* ❌

📅 Date: *${formatDate(a.date)}*
⏰ Time: *${formatTime12h(a.time)}*

Sorry for the inconvenience 🙏  
Please book another time.

*Lucky Hair Style*`
  );
  window.open(`https://wa.me/${fullPhone}?text=${msg}`, "_blank");
};


const Appointments = () => {
  const { data: appointments = [], isLoading } = useAppointments();
  const updateStatus = useUpdateAppointmentStatus();

  const statusBadge = (status: string) => {
    const variants: Record<string, string> = {
      pending: "bg-warning/10 text-warning border-warning/30",
      confirmed: "bg-success/10 text-success border-success/30",
      cancelled: "bg-destructive/10 text-destructive border-destructive/30",
      completed: "bg-blue-100 text-blue-600 border-blue-300",
    };
    return <Badge variant="outline" className={variants[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Appointments</h1>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-12">Loading appointments...</div>
      ) : appointments.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <p className="text-muted-foreground font-body">No appointments yet.</p>
        </div>
      ) : (
        <div className="rounded-xl border bg-card overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map(a => (
                <TableRow key={a.id}>
                  <TableCell>
                    <p className="font-medium">{a.customer_name}</p>
                    <p className="text-xs text-muted-foreground">{a.customer_phone}</p>
                  </TableCell>
                  <TableCell>{a.services?.name || "—"}</TableCell>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>{formatTime12h(a.time)}</TableCell>
                  <TableCell>{statusBadge(a.status)}</TableCell>
                  <TableCell className="text-right">
                    {a.status === "completed" && (
                      <span className="text-md text-muted-foreground">
                        Service Done✔️
                      </span>
                    )}
                    {a.status !== "completed" && (
                      <div className="flex justify-end gap-1">
                        {a.status !== "confirmed" && (
                          <Button size="sm" variant="ghost" onClick={() => {
                            updateStatus.mutate({ id: a.id, status: "confirmed" }, {
                              onSuccess: () => {
                                openWhatsApp(a);
                                toast.success("Appointment confirmed — WhatsApp message opened");
                              },
                            });
                          }} title="Confirm">
                            <Check className="h-4 w-4 text-success" />
                          </Button>
                        )}
                        {a.status !== "cancelled" && (
                          <Button size="sm" variant="ghost" onClick={() => updateStatus.mutate({ id: a.id, status: "cancelled" }, {
                            onSuccess: () => {
                              openCancelWhatsApp(a);
                            },
                          })} title="Cancel">
                            <X className="h-4 w-4 text-destructive" />
                          </Button>
                        )}
                        {a.status !== "pending" && (
                          <Button size="sm" variant="ghost" onClick={() => updateStatus.mutate({ id: a.id, status: "pending" })} title="Reset to pending">
                            <RefreshCw className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        )}
                        {a.status === "confirmed" && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() =>
                              updateStatus.mutate({ id: a.id, status: "completed" }, {
                                onSuccess: () => {
                                  toast.success("Service completed successfully");
                                },
                              })
                            }
                            title="Mark as Completed"
                          >
                            ✅

                          </Button>


                        )}

                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default Appointments;
