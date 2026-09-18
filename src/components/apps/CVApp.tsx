// components/apps/CVApp.tsx
'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Status = 'idle' | 'loading' | 'success' | 'error';

const COOLDOWN_MS = 60 * 60 * 1000; // 1 hour
const STORAGE_KEY = 'cv-last-sent';

export default function CVApp() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // check for an existing cooldown on mount
  useEffect(() => {
    const lastSent = localStorage.getItem(STORAGE_KEY);
    if (!lastSent) return;

    const elapsed = Date.now() - Number(lastSent);
    if (elapsed < COOLDOWN_MS) {
      setCooldownRemaining(COOLDOWN_MS - elapsed);
    }
  }, []);

  // tick the cooldown down every second so the UI updates live
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const interval = setInterval(() => {
      setCooldownRemaining((prev) => Math.max(0, prev - 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldownRemaining > 0]);

  function formatCooldown(ms: number) {
    const totalMinutes = Math.ceil(ms / 60000);
    if (totalMinutes >= 60) return `${Math.ceil(totalMinutes / 60)}h`;
    return `${totalMinutes}m`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/send-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong.');
        setStatus('error');
        return;
      }

      localStorage.setItem(STORAGE_KEY, String(Date.now()));
      setCooldownRemaining(COOLDOWN_MS);
      setStatus('success');
    } catch {
      setErrorMsg('Network error — please try again.');
      setStatus('error');
    }
  }

  const isOnCooldown = cooldownRemaining > 0 && status !== 'success';

  return (
    <div
      className="w-full h-72 flex flex-col items-center justify-center gap-4 select-none px-6"
      style={{
        background: 'radial-gradient(circle at top, #1a2740, #0a0f1c)',
        color: '#e8edf5',
      }}
    >
      <motion.div
        animate={status === 'loading' ? { rotate: 360 } : { rotate: 0 }}
        transition={
          status === 'loading'
            ? { repeat: Infinity, ease: 'linear', duration: 1.2 }
            : { duration: 0.3 }
        }
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold"
        style={{
          background: 'linear-gradient(135deg, #3fa9f5, #1e6fd9)',
          boxShadow: '0 0 20px rgba(63,169,245,0.5)',
        }}
      >
        {status === 'success' ? '✓' : status === 'error' ? '!' : '⇩'}
      </motion.div>

      <AnimatePresence mode="wait">
        {status !== 'success' ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 w-full max-w-xs"
          >
            <p className="text-sm text-center text-gray-300">
              Enter your email and I&apos;ll send my CV straight to your inbox.
            </p>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isOnCooldown}
              className="w-full px-3 py-2 rounded text-sm text-black"
              style={{ border: 'none', outline: 'none', opacity: isOnCooldown ? 0.6 : 1 }}
            />

            <motion.button
              whileTap={{ scale: 0.96 }}
              type="submit"
              disabled={status === 'loading' || isOnCooldown}
              className="w-full py-2 rounded text-sm font-bold"
              style={{
                background: status === 'loading' || isOnCooldown ? '#2a5fa8' : '#3fa9f5',
                cursor: status === 'loading' || isOnCooldown ? 'default' : 'pointer',
                opacity: isOnCooldown ? 0.7 : 1,
              }}
            >
              {status === 'loading'
                ? 'Sending…'
                : isOnCooldown
                ? `Try again in ${formatCooldown(cooldownRemaining)}`
                : 'Send my CV'}
            </motion.button>

            {status === 'error' && (
              <p className="text-xs text-red-400 text-center">{errorMsg}</p>
            )}
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-1 text-center"
          >
            <p className="font-bold">Sent!</p>
            <p className="text-xs text-gray-300">Check {email} for my CV.</p>
            <button
              onClick={() => { setStatus('idle'); setEmail(''); }}
              className="text-xs underline text-blue-300 mt-2"
            >
              Send to another address
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}