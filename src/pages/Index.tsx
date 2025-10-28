import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Login from "@/components/Login";
import Register from "@/components/Register";
import OtpVerification from "@/components/OtpVerification";
import Dashboard from "@/components/Dashboard";

type View = 'login' | 'register' | 'otp' | 'dashboard';

const Index = () => {
  const [view, setView] = useState<View>('login');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-xl bg-card/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-wider">EGUIDANCE</h1>
                <p className="text-xs text-muted-foreground">Smart Authentication System</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-2">
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
              <Button
                variant={view === 'otp' ? 'default' : 'ghost'}
                onClick={() => setView('otp')}
                className="transition-all"
              >
                Verify OTP
              </Button>
              <Button
                variant={view === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setView('dashboard')}
                className="transition-all"
              >
                Dashboard
              </Button>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden">
              <select
                value={view}
                onChange={(e) => setView(e.target.value as View)}
                className="bg-secondary text-foreground px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="login">Login</option>
                <option value="register">Register</option>
                <option value="otp">Verify OTP</option>
                <option value="dashboard">Dashboard</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        {/* Hero Section */}
        <section className="mb-8 md:mb-12">
          <Card className="overflow-hidden border-border/50 bg-gradient-card backdrop-blur-sm shadow-card">
            <div className="grid md:grid-cols-2 gap-8 p-6 md:p-8">
              <div className="flex flex-col justify-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Welcome to EGUIDANCE
                </h2>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  A secure OTP-driven authentication system. Register your account, verify with OTP, and access your personalized dashboard with ease.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button
                    onClick={() => setView('register')}
                    size="lg"
                    className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    Create Account
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
                  <div className="w-64 h-64 rounded-2xl bg-gradient-primary shadow-glow animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-32 h-32 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Content Section */}
        <section>
          <Card className="border-border/50 bg-gradient-card backdrop-blur-sm shadow-card p-6 md:p-8">
            {view === 'login' && <Login />}
            {view === 'register' && <Register />}
            {view === 'otp' && <OtpVerification />}
            {view === 'dashboard' && <Dashboard />}
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} EGUIDANCE — Secure Authentication Platform</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
