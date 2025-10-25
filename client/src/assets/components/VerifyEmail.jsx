import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import './VerifyEmail.css';

const VerifyEmail = () => {
  const storedUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user')); } catch { return null; }
  }, []);

  const [email, setEmail] = useState(storedUser?.email || '');
  const [name, setName] = useState(storedUser?.name || '');
  const [sending, setSending] = useState(false);
  const [sendMsg, setSendMsg] = useState('');
  const [sendError, setSendError] = useState('');
  const [devCode, setDevCode] = useState('');

  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyMsg, setVerifyMsg] = useState('');
  const [verifyError, setVerifyError] = useState('');

  const disableIdentityInputs = Boolean(storedUser);

  const handleSend = async (e) => {
    e.preventDefault();
    setSending(true);
    setSendMsg('');
    setSendError('');
    setDevCode('');
    try {
      const { data } = await axios.post('/api/verification/send', { email, name });
      setSendMsg(data?.message || 'Verification code sent');
      if (data?.code) setDevCode(String(data.code));
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to send code';
      setSendError(msg);
    } finally {
      setSending(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setVerifying(true);
    setVerifyMsg('');
    setVerifyError('');
    try {
      const { data } = await axios.post('/api/verification/confirm', { email, code });
      setVerifyMsg(data?.message || 'Email verified successfully');
      // Mark user as verified in localStorage so protected routes unlock
      try {
        const u = JSON.parse(localStorage.getItem('user') || '{}');
        if (u && u.email === email) {
          u.verified = true;
          localStorage.setItem('user', JSON.stringify(u));
        }
      } catch {}
    } catch (err) {
      const msg = err?.response?.data?.error || err?.message || 'Verification failed';
      setVerifyError(msg);
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="verify-container">
      <div className="verify-card">
        <h2 className="verify-title">Verify your email</h2>
        <p className="verify-subtitle">We’ll send a 6‑digit code to your email address.</p>

        <form className="verify-form" onSubmit={handleSend}>
          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={sending || disableIdentityInputs}
            />
          </div>
          <div className="form-row">
            <label>Name (optional)</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              disabled={sending || disableIdentityInputs}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={sending || !email}>
            {sending ? 'Sending…' : 'Send code'}
          </button>
          {sendMsg && <div className="msg success" role="status">{sendMsg}</div>}
          {sendError && <div className="msg error" role="alert">{sendError}</div>}
          {devCode && (
            <div className="dev-hint">Dev code: <code>{devCode}</code></div>
          )}
        </form>

        <form className="verify-form" onSubmit={handleVerify}>
          <div className="form-row">
            <label>Enter code</label>
            <input
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0,6))}
              placeholder="123456"
              required
              disabled={verifying}
            />
          </div>
          <button type="submit" className="btn-secondary" disabled={verifying || code.length !== 6}>
            {verifying ? 'Verifying…' : 'Verify email'}
          </button>
          {verifyMsg && <div className="msg success" role="status">{verifyMsg}</div>}
          {verifyError && <div className="msg error" role="alert">{verifyError}</div>}
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
