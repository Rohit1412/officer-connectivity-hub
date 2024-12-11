import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        // Check if this is the admin email
        if (session?.user?.email === 'admin@ipf.gov.in') {
          // Update the user's role to admin
          const { error } = await supabase
            .from('profiles')
            .update({ role: 'admin' })
            .eq('id', session.user.id);

          if (error) {
            toast({
              variant: "destructive",
              title: "Error setting admin role",
              description: error.message
            });
          } else {
            toast({
              title: "Admin account created",
              description: "You have been granted admin privileges."
            });
          }
        }
        navigate("/");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center text-center">
          <Shield className="h-12 w-12 text-accent mb-2" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Welcome to Indian Police Force
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Command Center Access Portal
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Use admin@ipf.gov.in to create an admin account
          </p>
        </div>
        
        <div className="bg-card p-6 rounded-lg shadow-lg">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--accent))',
                    brandAccent: 'hsl(var(--accent))',
                  },
                },
              },
            }}
            providers={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;