import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import api from '@/services/api';
import Swal from 'sweetalert2';
import { Loader2, ShieldCheck, Mail, Key } from 'lucide-react';
import { UserRole } from '@/types/auth';

interface OtpVerificationProps {
  onSuccess: (role: UserRole) => void;
}

export default function OtpVerification({ onSuccess }: OtpVerificationProps) {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post('/api/verify_otp', { email, code });
      if (res.data && res.data.success) {
        await Swal.fire({
          title: 'Verified!',
          text: 'OTP verified successfully. Redirecting...',
          icon: 'success',
          confirmButtonColor: 'hsl(220, 91%, 67%)',
          timer: 2000,
        });
        
        // Get user role from response
        const role = res.data.role || res.data.user?.role || 'student';
        onSuccess(role as UserRole);
      } else {
        Swal.fire({
          title: 'Invalid OTP',
          text: (res.data && res.data.message) || 'Please check your code and try again',
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
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold mb-2">Verify Your Identity</h2>
        <p className="text-muted-foreground">
          Enter the OTP code sent to your email
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
          <Label htmlFor="code" className="text-foreground">
            OTP Code
          </Label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="code"
              type="text"
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              disabled={loading}
              maxLength={6}
              className="pl-10 bg-input border-border focus:border-primary transition-all tracking-widest text-lg font-mono"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Enter the 6-digit code from your email
          </p>
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
              Verifying...
            </>
          ) : (
            <>
              <ShieldCheck className="mr-2 h-4 w-4" />
              Verify OTP
            </>
          )}
        </Button>
      </form>
    </div>
  );
}
