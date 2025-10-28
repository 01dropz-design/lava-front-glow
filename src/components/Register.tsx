import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, UserPlus, User, Mail, Lock } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = new URLSearchParams();
      payload.append('username', username);
      payload.append('email', email);
      payload.append('password', password);

      const res = await api.post('/auth/register', payload, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });

      if (res.data && res.data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'Account created successfully. Please log in.',
          icon: 'success',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
        // Reset form
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        Swal.fire({
          title: 'Error',
          text: (res.data && res.data.message) || 'Failed to register',
          icon: 'error',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Network error';
      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonColor: 'hsl(220, 91%, 67%)',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary mb-4 shadow-glow">
          <UserPlus className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-muted-foreground">
          Sign up to get started with EGUIDANCE
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="username" className="text-foreground">
            Username
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={loading}
              className="pl-10 bg-input border-border focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="pl-10 bg-input border-border focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="pl-10 bg-input border-border focus:border-primary transition-all"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
          size="lg"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating Account...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 h-4 w-4" />
              Create Account
            </>
          )}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <button className="text-primary hover:text-primary-glow transition-colors font-medium">
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
