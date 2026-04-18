// ─────────────────────────────────────────────────────────────────
// Login.jsx  —  Admin Application | Authentication Page
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { THEME } from './Theme';
import ReCAPTCHA from "react-google-recaptcha";

const DECORATIONS = [
  { size: 320, top: -80, left: -100, opacity: 0.08 },
  { size: 200, top: '55%', left: -60, opacity: 0.06 },
  { size: 260, top: 10, left: '55%', opacity: 0.05 },
];

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 60); }, []);

  const handleSubmit = () => {
    setError('');
    if (!username.trim() || !password.trim()) { setError('Credentials required.'); return; }
    if (!captchaToken) { setError('Please complete the security check.'); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ role: 'admin', name: 'System Admin', username });
    }, 1000);
  };

  const S = {
    page: { display: 'flex', minHeight: '100vh', fontFamily: THEME.fontBody, background: THEME.bg, opacity: visible ? 1 : 0, transition: 'opacity 0.45s ease' },
    left: { width: '42%', background: `linear-gradient(155deg, ${THEME.primaryMid} 0%, ${THEME.primaryDark} 100%)`, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' },
    right: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: THEME.cardBg },
    input: { width: '100%', padding: '10px 14px', borderRadius: THEME.radius, border: `1.5px solid ${THEME.border}`, marginBottom: 16, fontFamily: THEME.fontBody, fontSize: 14 },
    btn: { width: '100%', padding: '12px', background: THEME.primary, color: '#fff', border: 'none', borderRadius: THEME.radius, fontWeight: 600, cursor: 'pointer', fontSize: 15 },

    // ✅ UPDATED LOGO (bigger, clean like previous page)
    logo: {
      width: '220px',   // 🔥 main fix
      height: 'auto',
      marginBottom: '25px',
      zIndex: 2,
      display: 'block',
      filter: 'drop-shadow(0px 6px 15px rgba(0,0,0,0.35))'
    }
  };

  return (
    <div style={S.page}>
      <div style={S.left}>
        {DECORATIONS.map((d, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: d.size,
            height: d.size,
            top: d.top,
            left: d.left,
            borderRadius: '50%',
            background: `radial-gradient(circle, rgba(255,255,255,${d.opacity}) 0%, transparent 70%)`
          }} />
        ))}

        {/* ✅ UPDATED LOGO (no container, direct image) */}
        <img 
          src="/logo.png" 
          alt="CBIT Logo" 
          style={S.logo}
        />

        <h1 style={{ fontFamily: THEME.fontHeading, fontSize: 28, color: '#fff', textAlign: 'center', zIndex: 2, lineHeight: '1.2' }}>
          Chaitanya Bharathi<br />Institute of Technology
        </h1>

        <p style={{ color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontSize: 12, zIndex: 2, marginTop: '10px' }}>
          APPRAISAL SYSTEM
        </p>
      </div>

      <div style={S.right}>
        <div style={{ width: 380 }}>
          <h2 style={{ fontFamily: THEME.fontHeading, fontSize: 32, marginBottom: 8, color: THEME.text }}>Admin Login</h2>
          <p style={{ color: THEME.textMuted, marginBottom: 30, fontSize: 14 }}>Sign in to manage faculty appraisals.</p>

          <label style={{ fontSize: 12, fontWeight: 600, color: THEME.textMuted, textTransform: 'uppercase' }}>Admin Username</label>
          <input style={S.input} type="text" placeholder="e.g. ADMIN01" value={username} onChange={e => setUsername(e.target.value)} />

          <label style={{ fontSize: 12, fontWeight: 600, color: THEME.textMuted, textTransform: 'uppercase' }}>Password</label>
          <input style={S.input} type="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '24px 0' }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: THEME.textMuted, alignSelf: 'center', marginBottom: '12px', textTransform: 'uppercase' }}>
              Security Check
            </label>
            <ReCAPTCHA
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
              onChange={(val) => setCaptchaToken(val)}
            />
          </div>

          {error && <div style={{ color: THEME.error, fontSize: 13, marginBottom: 16 }}>⚠️ {error}</div>}
          <button style={S.btn} onClick={handleSubmit}>{loading ? 'Signing in...' : 'Sign In'}</button>
        </div>
      </div>
    </div>
  );
}