// ─────────────────────────────────────────────────────────────────
// Create.jsx  —  Admin Application | Add New Faculty
// ─────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { THEME, labelStyle } from './Theme';
import { TopBar } from './Home';
import { ALL_DEPARTMENTS } from './constants';

const DESIGNATIONS = ['Professor', 'Associate Professor', 'Assistant Professor'];

const inp = (focused) => ({
  width: '100%', padding: '9px 13px', borderRadius: THEME.radius,
  border: `1.5px solid ${focused ? THEME.primary : THEME.border}`,
  background: '#fff', color: THEME.text, fontSize: 14,
  fontFamily: THEME.fontBody, outline: 'none',
  boxSizing: 'border-box', transition: 'border-color 0.15s',
});

const selInp = (focused) => ({
  ...inp(focused),
  appearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M0 0l5 7 5-7z' fill='%23999'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: 34,
});

function Field({ id, label, required, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label htmlFor={id} style={labelStyle}>
        {label}{required && <span style={{ color: THEME.error, marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function FocusInput({ id, value, onChange, placeholder, type = 'text' }) {
  const [focus, setFocus] = useState(false);
  return (
    <input
      id={id} type={type} value={value} placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={inp(focus)}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
    />
  );
}

function FocusSelect({ id, value, onChange, options, placeholder }) {
  const [focus, setFocus] = useState(false);
  return (
    <select id={id} value={value} onChange={e => onChange(e.target.value)}
      style={selInp(focus)}
      onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <option value="">{placeholder}</option>
      {options.map(o => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

export default function Create({ user, navigate, addFaculty }) {
  const [form,    setForm]    = useState({ employeeId: '', name: '', department: '', designation: '' });
  const [errors,  setErrors]  = useState({});
  const [success, setSuccess] = useState(false);

  const set = (key) => (value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.employeeId.trim()) e.employeeId = 'Employee ID is required.';
    if (!form.name.trim())       e.name       = 'Name is required.';
    if (!form.department)        e.department = 'Please select a department.';
    if (!form.designation)       e.designation = 'Please select a designation.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    addFaculty(form);
    setSuccess(true);
    setForm({ employeeId: '', name: '', department: '', designation: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: THEME.fontBody }}>
      <TopBar user={user} navigate={navigate} title="Add Faculty" />

      <div style={{ maxWidth: 600, margin: '0 auto', padding: '36px 28px 60px' }}>

        <button
          onClick={() => navigate('home')}
          style={{ background: 'none', border: 'none', color: THEME.primary, cursor: 'pointer', marginBottom: 20, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to Dashboard
        </button>

        <div style={{
          background: '#fff', borderRadius: THEME.radiusLg,
          border: `1.5px solid ${THEME.borderLight}`, boxShadow: THEME.shadow,
          overflow: 'hidden',
        }}>
          {/* Card header */}
          <div style={{
            background: `linear-gradient(135deg, ${THEME.primaryMid}, ${THEME.primaryDark})`,
            padding: '20px 28px', color: '#fff',
          }}>
            <h2 style={{ fontFamily: THEME.fontHeading, fontSize: 22, fontWeight: 600, marginBottom: 4 }}>
              Add New Faculty
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>
              Create a new faculty account. Parts A–D can be filled by the faculty after login.
            </p>
          </div>

          <div style={{ padding: '28px 28px 24px' }}>

            {/* Employee ID */}
            <Field id="new-emp-id" label="A.1  Employee ID" required>
              <FocusInput id="new-emp-id" value={form.employeeId} onChange={set('employeeId')} placeholder="e.g., CBIT2025001" />
              {errors.employeeId && <p style={{ fontSize: 11, color: THEME.error, marginTop: 4 }}>{errors.employeeId}</p>}
            </Field>

            {/* Name */}
            <Field id="new-name" label="A.2  Name of Faculty" required>
              <FocusInput id="new-name" value={form.name} onChange={set('name')} placeholder="e.g., Dr. Sample Faculty" />
              {errors.name && <p style={{ fontSize: 11, color: THEME.error, marginTop: 4 }}>{errors.name}</p>}
            </Field>

            {/* Department */}
            <Field id="new-dept" label="A.3  Department" required>
              <FocusSelect id="new-dept" value={form.department} onChange={set('department')}
                options={ALL_DEPARTMENTS} placeholder="— Select Department —" />
              {errors.department && <p style={{ fontSize: 11, color: THEME.error, marginTop: 4 }}>{errors.department}</p>}
            </Field>

            {/* Designation */}
            <Field id="new-desg" label="A.4  Designation" required>
              <FocusSelect id="new-desg" value={form.designation} onChange={set('designation')}
                options={DESIGNATIONS} placeholder="— Select Designation —" />
              {errors.designation && <p style={{ fontSize: 11, color: THEME.error, marginTop: 4 }}>{errors.designation}</p>}
            </Field>

            {/* Info note */}
            <div style={{
              padding: '10px 14px', marginBottom: 20,
              background: THEME.infoBg, border: `1px solid ${THEME.infoBorder}`,
              borderRadius: THEME.radiusSm, fontSize: 12, color: THEME.info,
            }}>
              ℹ️ The faculty member will complete Parts A–E after logging in with their Employee ID.
            </div>

            {/* Success badge */}
            {success && (
              <div style={{
                padding: '10px 16px', marginBottom: 16,
                background: THEME.successBg, border: `1px solid ${THEME.successBorder}`,
                borderRadius: THEME.radius, fontSize: 13, color: THEME.success, fontWeight: 600,
              }}>
                ✅ Faculty <strong>{form.name || 'member'}</strong> created successfully!
              </div>
            )}

            {/* Buttons */}
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={handleSubmit}
                style={{
                  flex: 1, padding: '11px', borderRadius: THEME.radius, border: 'none',
                  background: `linear-gradient(135deg, ${THEME.primaryMid}, ${THEME.primaryDark})`,
                  color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  fontFamily: THEME.fontBody, boxShadow: THEME.shadow,
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Add Faculty
              </button>
              <button
                onClick={() => { setForm({ employeeId: '', name: '', department: '', designation: '' }); setErrors({}); }}
                style={{
                  padding: '11px 20px', borderRadius: THEME.radius,
                  border: `1.5px solid ${THEME.border}`, background: '#fff',
                  color: THEME.textMuted, fontSize: 14, fontWeight: 600,
                  cursor: 'pointer', fontFamily: THEME.fontBody,
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}