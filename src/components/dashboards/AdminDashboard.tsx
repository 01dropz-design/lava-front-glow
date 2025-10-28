import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, LogOut, Users, UserCheck, Shield, Activity, Trash2, Edit, BarChart3 } from 'lucide-react';
import { User } from '@/types/auth';

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUserData();
    loadAllUsers();
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

  const loadAllUsers = async () => {
    try {
      const res = await api.get('/admin/users');
      if (res.data && res.data.success) {
        setUsers(res.data.users || []);
      }
    } catch (error) {
      // Mock data for demo purposes
      setUsers([
        { id: 1, email: 'student1@example.com', username: 'student1', role: 'student' },
        { id: 2, email: 'counselor1@example.com', username: 'counselor1', role: 'counselor' },
        { id: 3, email: 'student2@example.com', username: 'student2', role: 'student' },
      ]);
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

  const handleDeleteUser = async (userId: number) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'hsl(0, 85%, 60%)',
      cancelButtonColor: 'hsl(220, 91%, 67%)',
      confirmButtonText: 'Yes, delete user'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/admin/users/${userId}`);
        await Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted',
          icon: 'success',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
        loadAllUsers();
      } catch {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete user',
          icon: 'error',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-2">Administrator Dashboard</h2>
          <p className="text-muted-foreground">System overview and user management</p>
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
          <h3 className="text-2xl font-bold mb-1">156</h3>
          <p className="text-muted-foreground text-sm">Total Users</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <UserCheck className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">142</h3>
          <p className="text-muted-foreground text-sm">Active Students</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">12</h3>
          <p className="text-muted-foreground text-sm">Counselors</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Activity className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">98%</h3>
          <p className="text-muted-foreground text-sm">System Uptime</p>
        </Card>
      </div>

      {/* User Management */}
      <Card className="border-border/50 bg-gradient-card backdrop-blur-sm">
        <div className="p-6 border-b border-border/50">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">User Management</h3>
            <Button className="bg-gradient-primary hover:shadow-glow transition-all">
              <Users className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.id} className="border-border/50">
                  <TableCell className="font-mono text-sm">{u.id}</TableCell>
                  <TableCell className="font-medium">{u.username || 'N/A'}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                      u.role === 'admin' ? 'bg-primary/10 text-primary' :
                      u.role === 'counselor' ? 'bg-accent/10 text-accent' :
                      'bg-secondary text-secondary-foreground'
                    }`}>
                      {u.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="ghost" className="hover:bg-primary/10">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-destructive/10 text-destructive"
                        onClick={() => handleDeleteUser(u.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* System Analytics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            User Growth
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">This Month</span>
              <span className="font-bold text-primary">+23</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Month</span>
              <span className="font-bold">+18</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Growth Rate</span>
              <span className="font-bold text-accent">+27.8%</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Status</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mail Service</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">Active</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
