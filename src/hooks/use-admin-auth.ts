import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  let mounted = true;

  const checkSession = async () => {
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    const currentUser = session?.user ?? null;

    if (!mounted) return;

    setUser(currentUser);

    if (currentUser?.email) {
      const { data } = await supabase
        .from("admins")
        .select("id")
        .eq("email", currentUser.email)
        .maybeSingle();

      setIsAdmin(!!data);
    } else {
      setIsAdmin(false);
    }

    if (mounted) setLoading(false);
  };

  checkSession();

  return () => {
    mounted = false;
  };
}, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
  };

  return { user, isAdmin, loading, signIn, signOut };
}