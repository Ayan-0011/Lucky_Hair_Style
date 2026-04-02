import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SalonSettings {
  id: string;
  booking_enabled: boolean;
  closed_dates: string[];
  available_slots: string[];
}

export function useSettings() {
  return useQuery({
    queryKey: ["salon-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("salon_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        return {
          id: "",
          booking_enabled: true,
          closed_dates: [],
          available_slots: ["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"],
        } as SalonSettings;
      }
      return data as SalonSettings;
    },
  });
}

export function useUpdateSettings() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (updates: Partial<Omit<SalonSettings, "id">> & { id: string }) => {
      const { id, ...rest } = updates;
      const { error } = await supabase.from("salon_settings").update(rest).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["salon-settings"] }),
  });
}
