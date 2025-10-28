import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, LogOut, Users, Calendar, FileText, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';
import { User } from '@/types/auth';

interface CounselorDashboardProps {
  onLogout: () => void;
}

export default function CounselorDashboard({ onLogout }: CounselorDashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const res = await api.get('/auth/dashboard', { 
        headers: { 'X-Requested-With': 'XMLHttpRequest' } 
      });
      if (res.data && res.data.success) {
        setUser(res.data.user);
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

  const handleLogout = async () => {
    try {
      await api.get('/auth/logout', { 
        headers: { 'X-Requested-With': 'XMLHttpRequest' } 
      });
      await Swal.fire({
        title: 'Logged Out',
        text: 'You have been logged out successfully',
        icon: 'success',
        confirmButtonColor: 'hsl(220, 91%, 67%)',
      });
      onLogout();
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
      <div className="text-center py-12">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Counselor Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Counselor {user?.username || user?.email}</p>
        </div>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-destructive/30 text-destructive hover:bg-destructive/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">48</h3>
          <p className="text-muted-foreground text-sm">Active Students</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">12</h3>
          <p className="text-muted-foreground text-sm">Scheduled Sessions</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <FileText className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">23</h3>
          <p className="text-muted-foreground text-sm">Pending Reports</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">87%</h3>
          <p className="text-muted-foreground text-sm">Success Rate</p>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-primary" />
          Today's Schedule
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Academic Counseling - John Doe</p>
                <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</p>
              </div>
            </div>
            <Button size="sm" className="bg-gradient-primary">
              Start Session
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-accent/10">
                <Calendar className="w-4 h-4 text-accent" />
              </div>
              <div>
                <p className="font-medium">Career Guidance - Jane Smith</p>
                <p className="text-sm text-muted-foreground">11:00 AM - 12:00 PM</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-primary/30">
              View Details
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium">Personal Counseling - Mike Johnson</p>
                <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="border-primary/30">
              View Details
            </Button>
          </div>
        </div>
      </Card>

      {/* Recent Students & Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">Recent Students</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">Last session: 2 days ago</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  JS
                </div>
                <div>
                  <p className="font-medium">Jane Smith</p>
                  <p className="text-xs text-muted-foreground">Last session: 1 week ago</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-accent" />
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
                <div>
                  <p className="font-medium">Mike Johnson</p>
                  <p className="text-xs text-muted-foreground">Last session: 3 days ago</p>
                </div>
              </div>
              <CheckCircle2 className="w-5 h-5 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <Button className="w-full justify-start bg-gradient-primary hover:shadow-glow transition-all">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
              <FileText className="mr-2 h-4 w-4" />
              Create Progress Report
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
              <Users className="mr-2 h-4 w-4" />
              View All Students
            </Button>
            <Button variant="outline" className="w-full justify-start border-primary/30 hover:bg-primary/10">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Analytics
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
