import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Login from "@/components/auth/Login";
import Register from "@/components/auth/Register";
import OtpVerification from "@/components/auth/OtpVerification";
import StudentDashboard from "@/components/dashboards/StudentDashboard";
import CounselorDashboard from "@/components/dashboards/CounselorDashboard";
import AdminDashboard from "@/components/dashboards/AdminDashboard";
import { UserRole } from "@/types/auth";

type View = 'home' | 'login' | 'register' | 'otp' | 'dashboard';

const Index = () => {
  const [view, setView] = useState<View>('home');
  const [userRole, setUserRole] = useState<UserRole | null>(null);

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setView('home');
  };

  const renderDashboard = () => {
    if (!userRole) return null;
    
    switch (userRole) {
      case 'student':
        return <StudentDashboard onLogout={handleLogout} />;
      case 'counselor':
        return <CounselorDashboard onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => view !== 'home' && setView('home')}>
              <div className="w-12 h-12 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wider">EGUIDANCE</h1>
                <p className="text-xs text-muted-foreground">Student Guidance System</p>
              </div>
            </div>

            {/* Navigation */}
            {view !== 'dashboard' ? (
              <nav className="hidden md:flex items-center gap-2">
                <Button
                  variant={view === 'home' ? 'default' : 'ghost'}
                  onClick={() => setView('home')}
                  className="transition-all"
                >
                  Home
                </Button>
                <Button
                  variant={view === 'login' ? 'default' : 'ghost'}
                  onClick={() => setView('login')}
                  className="transition-all"
                >
                  Login
                </Button>
                <Button
                  variant={view === 'register' ? 'default' : 'ghost'}
                  onClick={() => setView('register')}
                  className="transition-all"
                >
                  Register
                </Button>
              </nav>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-muted-foreground capitalize">
                  {userRole} Dashboard
                </span>
              </div>
            )}

            {/* Mobile menu */}
            <div className="md:hidden">
              {view !== 'dashboard' ? (
                <select
                  value={view}
                  onChange={(e) => setView(e.target.value as View)}
                  className="bg-secondary text-foreground px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="home">Home</option>
                  <option value="login">Login</option>
                  <option value="register">Register</option>
                </select>
              ) : (
                <span className="text-sm text-muted-foreground capitalize">
                  {userRole}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {view === 'home' && (
          <>
            {/* Hero Section */}
            <section className="mb-12">
              <Card className="overflow-hidden border-border/50 bg-gradient-card backdrop-blur-sm shadow-card">
                <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                  <div className="flex flex-col justify-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent leading-tight">
                      Welcome to EGUIDANCE
                    </h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                      A comprehensive student guidance and counseling platform. Connect with counselors, 
                      track your academic progress, and get personalized support for your educational journey.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        onClick={() => setView('register')}
                        size="lg"
                        className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      >
                        Get Started
                      </Button>
                      <Button
                        onClick={() => setView('login')}
                        size="lg"
                        variant="outline"
                        className="border-primary/30 hover:bg-primary/10 transition-all"
                      >
                        Sign In
                      </Button>
                    </div>
                  </div>
                  <div className="hidden md:flex items-center justify-center">
                    <div className="relative">
                      <div className="w-64 h-64 rounded-2xl bg-gradient-primary shadow-glow opacity-80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-32 h-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </section>

            {/* Features Section */}
            <section className="mb-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Platform Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-glow transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">For Students</h4>
                  <p className="text-muted-foreground text-sm">
                    Access counseling sessions, track progress, and manage your academic profile.
                  </p>
                </Card>

                <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-glow transition-all">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">For Counselors</h4>
                  <p className="text-muted-foreground text-sm">
                    Manage student cases, schedule sessions, and provide personalized guidance.
                  </p>
                </Card>

                <Card className="p-6 border-border/50 bg-gradient-card backdrop-blur-sm shadow-card hover:shadow-glow transition-all">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold mb-2">For Administrators</h4>
                  <p className="text-muted-foreground text-sm">
                    Oversee platform operations, manage users, and generate comprehensive reports.
                  </p>
                </Card>
              </div>
            </section>
          </>
        )}

        {view === 'login' && (
          <Card className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-card p-6 md:p-8">
            <Login onSuccess={handleLoginSuccess} onNavigateToOtp={() => setView('otp')} />
          </Card>
        )}

        {view === 'register' && (
          <Card className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-card p-6 md:p-8">
            <Register onSuccess={() => setView('login')} />
          </Card>
        )}

        {view === 'otp' && (
          <Card className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-card p-6 md:p-8">
            <OtpVerification onSuccess={handleLoginSuccess} />
          </Card>
        )}

        {view === 'dashboard' && renderDashboard()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} EGUIDANCE — Empowering Students, Supporting Growth</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
