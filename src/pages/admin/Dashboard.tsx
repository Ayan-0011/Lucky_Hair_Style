import { CalendarDays, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointments } from "@/hooks/use-appointments";
import { useServices } from "@/hooks/use-services";
import { format } from "date-fns";

const Dashboard = () => {
  const { data: appointments = [], isLoading: loadingAppts } = useAppointments();
  const { data: services = [], isLoading: loadingServices } = useServices();
  const today = format(new Date(), "yyyy-MM-dd");
  const todayAppts = appointments.filter(a => a.date === today);

  // Count services popularity
  const serviceCount: Record<string, number> = {};
  appointments.forEach(a => { serviceCount[a.service_id] = (serviceCount[a.service_id] || 0) + 1; });
  const popularServices = Object.entries(serviceCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => ({ name: services.find(s => s.id === id)?.name || "Unknown", count }));

  const isLoading = loadingAppts || loadingServices;

  const stats = [
    { title: "Total Bookings", value: appointments.length, icon: CalendarDays, color: "text-primary" },
    { title: "Today's Bookings", value: todayAppts.length, icon: Clock, color: "text-success" },
    { title: "Active Services", value: services.filter(s => s.active).length, icon: TrendingUp, color: "text-warning" },
    { title: "Pending", value: appointments.filter(a => a.status === "pending").length, icon: Users, color: "text-destructive" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {isLoading ? (
        <div className="text-center text-muted-foreground py-12">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Card key={i} className="animate-fade-in" style={{ animationDelay: `${0.05 * i}s` }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground font-body">{s.title}</CardTitle>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{s.value}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader><CardTitle className="text-lg">Popular Services</CardTitle></CardHeader>
              <CardContent>
                {popularServices.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No bookings yet</p>
                ) : (
                  <div className="space-y-3">
                    {popularServices.map((s, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3">
                        <span className="font-medium">{s.name}</span>
                        <span className="text-sm text-muted-foreground">{s.count} bookings</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-lg">Recent Appointments</CardTitle></CardHeader>
              <CardContent>
                {appointments.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No appointments yet</p>
                ) : (
                  <div className="space-y-3">
                    {appointments.slice(0, 5).map(a => (
                      <div key={a.id} className="flex items-center justify-between rounded-lg bg-secondary/50 p-3 text-sm">
                        <div>
                          <p className="font-medium">{a.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{a.services?.name} · {a.date}</p>
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
        </>
      )}
    </div>
  );
};

export default Dashboard;
