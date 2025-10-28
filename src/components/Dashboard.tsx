import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, LogOut, User, Mail, Shield, CheckCircle2 } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<{id?: number; email?: string; role?: string} | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const res = await api.get('/auth/dashboard', { 
          headers: { 'X-Requested-With': 'XMLHttpRequest' } 
        });
        if (res.data && res.data.success) {
          setUser(res.data.user);
        } else {
          // Not authenticated
          Swal.fire({
            title: 'Not Authenticated',
            text: 'Please log in to access the dashboard',
            icon: 'warning',
            confirmButtonColor: 'hsl(220, 91%, 67%)',
          });
        }
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'Failed to load dashboard data',
          icon: 'error',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await api.get('/auth/logout', { 
        headers: { 'X-Requested-With': 'XMLHttpRequest' } 
      });
      if (res.data && res.data.success) {
        Swal.fire({
          title: 'Logged Out',
          text: 'You have been logged out successfully',
          icon: 'success',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
        setUser(null);
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Failed to logout',
        icon: 'error',
        confirmButtonColor: 'hsl(220, 91%, 67%)',
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Shield className="w-8 h-8 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
        <p className="text-muted-foreground mb-6">
          Please log in to access your dashboard
        </p>
        <Button className="bg-gradient-primary hover:shadow-glow transition-all">
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-primary mb-4 shadow-glow">
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
        <p className="text-muted-foreground">
          You're successfully authenticated
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <Card className="p-6 border-border/50 bg-secondary/50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Account Status</h3>
              <p className="text-sm text-muted-foreground">Your account is active and verified</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-secondary/50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Mail className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">Email Address</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-secondary/50">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">User Role</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {user.role || 'User'}
                {user.role === 'counselor' && ' (Counselor Access)'}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleLogout}
          variant="outline"
          size="lg"
          className="border-destructive/30 text-destructive hover:bg-destructive/10 transition-all"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
