import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth } from "@/hooks/use-admin-auth";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signIn } = useAdminAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);

      // After sign-in, check admin status
      const { supabase } = await import("@/integrations/supabase/client");
      const { data } = await supabase
        .from("admins")
        .select("id")
        .eq("email", email)
        .maybeSingle();

      if (!data) {
        await supabase.auth.signOut();
        toast({ title: "Access Denied", description: "You are not authorized as admin.", variant: "destructive" });
      } else {
        navigate("/admin");
      }
    } catch (error: any) {
      toast({
        title: "Invalid credentials",
        description: error?.message || "Please check your email and password.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6 rounded-2xl border bg-card p-8 shadow-lg">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Lock className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-xl font-semibold">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Enter your credentials to continue</p>
        </div>
        <div className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          {loading ? "Signing in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default AdminLogin;
