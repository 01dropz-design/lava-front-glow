import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, Mail, Send } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface LoginProps {
  onSuccess: (role: UserRole) => void;
  onNavigateToOtp: () => void;
}

export default function Login({ onSuccess, onNavigateToOtp }: LoginProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/api/login', { email });
      if (res.data && res.data.success) {
        await Swal.fire({
          title: 'OTP Sent!',
          text: 'Please check your email for the OTP code',
          icon: 'success',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
        });
        onNavigateToOtp();
      } else {
        Swal.fire({
          title: 'Error',
          text: (res.data && res.data.message) || 'Failed to send OTP',
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
          <Mail className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-muted-foreground">
          Enter your email to receive an OTP code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-input border-border focus:border-primary transition-all"
          />
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
              Sending OTP...
            </>
          ) : (
            <>
              <Send className="mr-2 h-4 w-4" />
              Send OTP
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
