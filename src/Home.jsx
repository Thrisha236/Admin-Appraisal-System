// ─────────────────────────────────────────────────────────────────
// Home.jsx  —  Admin Application | Dashboard & Stats
// ─────────────────────────────────────────────────────────────────
import { THEME } from './Theme';
import { ALL_DEPARTMENTS } from './constants';

// ── TopBar — exported, used by all pages ─────────────────────────
export function TopBar({ user, navigate, title = 'Admin Dashboard' }) {
  return (
    <nav style={{
      background: THEME.cardBg, borderBottom: `1px solid ${THEME.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px', height: 60,
      position: 'sticky', top: 0, zIndex: 100,
      boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
      fontFamily: THEME.fontBody,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span
          style={{ fontFamily: THEME.fontHeading, fontSize: 20, fontWeight: 600, color: THEME.primary, cursor: 'pointer', userSelect: 'none' }}
          onClick={() => navigate('home')}
        >
          CBIT Admin
        </span>
        <span style={{ color: THEME.borderLight, fontSize: 20 }}>|</span>
        <span style={{ fontWeight: 500, color: THEME.text, fontSize: 15 }}>{title}</span>
      </div>

      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <NavBtn onClick={() => navigate('home')}    label="🏠 Home" />
        <NavBtn onClick={() => navigate('assign')}  label="👥 Assign Evaluators" />
        <NavBtn onClick={() => navigate('create')}  label="＋ Add Faculty" accent />
        <NavBtn onClick={() => navigate('login')}   label="Sign Out" danger />
      </div>
    </nav>
  );
}

function NavBtn({ onClick, label, accent, danger }) {
  const base = {
    padding: '6px 14px', borderRadius: THEME.radius, cursor: 'pointer',
    fontSize: 13, fontWeight: 600, fontFamily: THEME.fontBody,
    transition: 'all 0.15s', border: 'none',
  };
  const style = accent
    ? { ...base, background: THEME.primaryLight, border: `1.5px solid ${THEME.primary}`, color: THEME.primary }
    : danger
      ? { ...base, background: 'none', border: `1px solid ${THEME.errorBorder}`, color: THEME.error }
      : { ...base, background: 'none', border: `1px solid ${THEME.border}`, color: THEME.textMuted };
  return <button style={style} onClick={onClick}>{label}</button>;
}

// ── Home Component ────────────────────────────────────────────────
export default function Home({ user, navigate, facultyList }) {
  const total  = facultyList.length;
  const prof   = facultyList.filter(f => f.designation === 'Professor').length;
  const assoc  = facultyList.filter(f => f.designation === 'Associate Professor').length;
  const asst   = facultyList.filter(f => f.designation === 'Assistant Professor').length;
  const unassigned = facultyList.filter(f => !f.evaluator).length;

  const STAT_CARDS = [
    { label: 'Total Faculty',        value: total,      color: THEME.primary,  icon: '👥' },
    { label: 'Professors',           value: prof,       color: '#92400E',       icon: '🎓' },
    { label: 'Associate Professors', value: assoc,      color: '#1D4ED8',       icon: '📘' },
    { label: 'Assistant Professors', value: asst,       color: '#166534',       icon: '📗' },
    { label: 'Unassigned',           value: unassigned, color: THEME.error,     icon: '⚠️' },
  ];

  const DEPT_ICONS = {
    'Computer Science & Engineering': '💻',
    'Electronics & Communication Engineering': '📡',
    'Electrical & Electronics Engineering': '⚡',
    'Mechanical Engineering': '⚙️',
    'Civil Engineering': '🏗️',
    'Chemical Engineering': '🧪',
    'Bio Technology': '🧬',
    'Mathematics': '📐',
    'Physics': '🔬',
    'Chemistry': '⚗️',
    'English': '📚',
    'MBA': '💼',
    'MCA': '🖥️',
    'Information Technology': '🌐',
    'Artificial Intelligence and Data Science': '🤖',
    'CSE (IOT & CSBCT)': '📱',
    'CSE(AIML) & AIML': '🧠',
    'Physical Education': '🏃',
    'Other': '🏫',
  };

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: THEME.fontBody }}>
      <TopBar user={user} navigate={navigate} title="Dashboard" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 28px 60px' }}>

        {/* Welcome */}
        <div style={{
          background: `linear-gradient(135deg, ${THEME.primaryMid} 0%, ${THEME.primaryDark} 100%)`,
          borderRadius: THEME.radiusXl, padding: '24px 32px', marginBottom: 28,
          color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', right: -40, top: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div>
            <h1 style={{ fontFamily: THEME.fontHeading, fontSize: 24, fontWeight: 600, marginBottom: 4 }}>
              Welcome, {user?.name || 'Admin'}
            </h1>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>
              Chaitanya Bharathi Institute of Technology — Performance Appraisal 2025–26
            </p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: THEME.radiusLg, padding: '10px 20px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 26, fontWeight: 700, fontFamily: THEME.fontHeading }}>{total}</div>
            <div style={{ fontSize: 11, letterSpacing: '0.1em', opacity: 0.8 }}>TOTAL FACULTY</div>
          </div>
        </div>

        {/* Stat cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 14, marginBottom: 32 }}>
          {STAT_CARDS.map(s => (
            <div key={s.label} style={{
              background: '#fff', border: `1px solid ${THEME.border}`,
              borderRadius: THEME.radiusLg, padding: '18px 16px', boxShadow: THEME.shadow,
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, fontFamily: THEME.fontHeading, color: s.color, lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: 11, color: THEME.textMuted, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Departments */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <h3 style={{ fontFamily: THEME.fontHeading, fontSize: 20, fontWeight: 600, color: THEME.text, margin: 0 }}>
            Departments
          </h3>
          <div style={{ flex: 1, height: 1, background: THEME.borderLight }} />
          <span style={{ fontSize: 12, color: THEME.textMuted }}>{ALL_DEPARTMENTS.length} departments</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
          {ALL_DEPARTMENTS.map(dept => {
            const deptFaculty = facultyList.filter(f => f.department === dept);
            const count = deptFaculty.length;
            const unassignedCount = deptFaculty.filter(f => !f.evaluator).length;

            return (
              <div
                key={dept}
                onClick={() => navigate('department', dept)}
                style={{
                  background: '#fff', border: `1.5px solid ${THEME.borderLight}`,
                  padding: '18px 20px', borderRadius: THEME.radiusLg,
                  cursor: count > 0 ? 'pointer' : 'default',
                  transition: 'all 0.15s', boxShadow: THEME.shadow,
                  position: 'relative', overflow: 'hidden',
                  opacity: count === 0 ? 0.6 : 1,
                }}
                onMouseEnter={e => { if (count > 0) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = THEME.shadowMd; e.currentTarget.style.borderColor = THEME.primary; }}}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = THEME.shadow; e.currentTarget.style.borderColor = THEME.borderLight; }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${THEME.primary}, ${THEME.primaryMid})` }} />
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginTop: 4 }}>
                  <span style={{ fontSize: 24 }}>{DEPT_ICONS[dept] || '🏫'}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: THEME.text, marginBottom: 4, lineHeight: 1.3 }}>{dept}</div>
                    <div style={{ fontSize: 12, color: THEME.textMuted }}>{count} faculty member{count !== 1 ? 's' : ''}</div>
                    {count > 0 && unassignedCount > 0 && (
                      <div style={{ fontSize: 11, color: THEME.error, marginTop: 4, fontWeight: 600 }}>
                        ⚠️ {unassignedCount} unassigned
                      </div>
                    )}
                    {count > 0 && unassignedCount === 0 && (
                      <div style={{ fontSize: 11, color: THEME.success, marginTop: 4, fontWeight: 600 }}>
                        ✓ All assigned
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}