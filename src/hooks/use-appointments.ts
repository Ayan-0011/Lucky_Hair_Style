import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface Appointment {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  service_id: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}

export interface AppointmentWithService extends Appointment {
  services: { name: string; price: number; duration: number } | null;
}

export function useAppointments() {
  const qc = useQueryClient();

  const query = useQuery({
    queryKey: ["appointments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("appointments")
        .select("*, services(name, price, duration)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as AppointmentWithService[];
    },
  });

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel("appointments-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "appointments" }, () => {
        qc.invalidateQueries({ queryKey: ["appointments"] });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [qc]);

  return query;
}

export function useBookedSlots(date: string) {
  return useQuery({
    queryKey: ["booked-slots", date],
    queryFn: async () => {
      if (!date) return [];
      const { data, error } = await supabase
        .from("appointments")
        .select("time")
        .eq("date", date)
        .eq("status", "confirmed");
      if (error) throw error;
      return data.map(d => d.time);
    },
    enabled: !!date,
  });
}

export function useCreateAppointment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (appt: {
      customer_name: string;
      customer_phone: string;
      customer_email?: string;
      service_id: string;
      date: string;
      time: string;
    }) => {
      const { data, error } = await supabase
        .from("appointments")
        .insert({ ...appt, status: "pending" })
        .select()
        .single();
      if (error) {
        if (error.code === "23505") throw new Error("This time slot is already booked. Please choose another.");
        throw error;
      }
      return data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["appointments"] });
      qc.invalidateQueries({ queryKey: ["booked-slots"] });
    },
  });
}

export function useUpdateAppointmentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("appointments").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["appointments"] }),
  });
}
