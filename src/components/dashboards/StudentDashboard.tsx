import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, LogOut, User, Mail, BookOpen, Calendar, MessageSquare, Edit, Save } from 'lucide-react';
import { User as UserType } from '@/types/auth';

interface StudentDashboardProps {
  onLogout: () => void;
}

export default function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [profileData, setProfileData] = useState({
    full_name: '',
    phone: '',
    grade_level: '',
    bio: ''
  });

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
        setProfileData({
          full_name: res.data.user.profile?.full_name || '',
          phone: res.data.user.profile?.phone || '',
          grade_level: res.data.user.profile?.grade_level || '',
          bio: res.data.user.profile?.bio || ''
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

  const handleUpdateProfile = async () => {
    try {
      const res = await api.post('/auth/update-profile', profileData);
      if (res.data && res.data.success) {
        await Swal.fire({
          title: 'Success!',
          text: 'Profile updated successfully',
          icon: 'success',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
        setEditMode(false);
        loadUserData();
      }
    } catch {
      Swal.fire({
        title: 'Error',
        text: 'Failed to update profile',
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
          <h2 className="text-3xl font-bold mb-2">Student Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, {user?.username || user?.email}</p>
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
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">5</h3>
          <p className="text-muted-foreground text-sm">Active Courses</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-accent/10">
              <Calendar className="w-6 h-6 text-accent" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">3</h3>
          <p className="text-muted-foreground text-sm">Upcoming Sessions</p>
        </Card>

        <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">12</h3>
          <p className="text-muted-foreground text-sm">Messages</p>
        </Card>
      </div>

      {/* Profile Section */}
      <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">My Profile</h3>
          <Button
            onClick={() => editMode ? handleUpdateProfile() : setEditMode(true)}
            variant="outline"
            className="border-primary/30"
          >
            {editMode ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{user?.email}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <div className="flex items-center gap-2 p-3 bg-secondary/50 rounded-lg">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm capitalize">{user?.role}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full_name">Full Name</Label>
            <Input
              id="full_name"
              value={profileData.full_name}
              onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
              disabled={!editMode}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!editMode}
              className="bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="grade_level">Grade Level</Label>
            <Input
              id="grade_level"
              value={profileData.grade_level}
              onChange={(e) => setProfileData({ ...profileData, grade_level: e.target.value })}
              disabled={!editMode}
              className="bg-input"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              disabled={!editMode}
              className="bg-input min-h-[100px]"
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 pb-4 border-b border-border/50">
            <div className="p-2 rounded-lg bg-primary/10">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Counseling Session Scheduled</p>
              <p className="text-sm text-muted-foreground">Tomorrow at 2:00 PM</p>
            </div>
          </div>
          <div className="flex items-start gap-4 pb-4 border-b border-border/50">
            <div className="p-2 rounded-lg bg-accent/10">
              <MessageSquare className="w-4 h-4 text-accent" />
            </div>
            <div>
              <p className="font-medium">New Message from Counselor</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-medium">Course Material Updated</p>
              <p className="text-sm text-muted-foreground">Yesterday</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
