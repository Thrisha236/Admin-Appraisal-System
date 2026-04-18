// ─────────────────────────────────────────────────────────────────
// Department.jsx  —  Admin Application | Faculty Detail View
// ─────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { THEME, labelStyle } from './Theme';
import { TopBar } from './Home';
import { DESIGNATION_ORDER } from './constants';

// ── Tiny helpers ──────────────────────────────────────────────────
const pill = (bg, color, border, text) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center',
    background: bg, color, border: `1px solid ${border}`,
    borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 700,
  }}>{text}</span>
);

const DESIG_COLOR = {
  'Professor':           { bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  'Associate Professor': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'Assistant Professor': { bg: '#F0FDF4', color: '#166534', border: '#86EFAC' },
};

function InfoRow({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: `1px solid ${THEME.borderLight}` }}>
      <span style={{ ...labelStyle, marginBottom: 0, minWidth: 180, flexShrink: 0, alignSelf: 'center', fontSize: 10 }}>{label}</span>
      <span style={{ fontSize: 13, color: THEME.text, fontFamily: THEME.fontBody }}>{String(value)}</span>
    </div>
  );
}

function SectionPanel({ title, icon, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ background: '#fff', borderRadius: THEME.radiusLg, border: `1.5px solid ${THEME.borderLight}`, marginBottom: 12, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '14px 18px', background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: THEME.fontHeading, fontSize: 16, fontWeight: 600, color: THEME.text,
        }}
      >
        <span>{icon} {title}</span>
        <span style={{ fontSize: 12, color: THEME.textMuted, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
      </button>
      {open && <div style={{ padding: '0 18px 16px' }}>{children}</div>}
    </div>
  );
}

function ScoreCompare({ label, submitted, evaluated }) {
  return (
    <div style={{ background: THEME.bg, borderRadius: THEME.radiusSm, padding: '10px 14px', textAlign: 'center', minWidth: 90 }}>
      <div style={{ fontSize: 10, fontWeight: 700, color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 14, fontFamily: THEME.fontBody }}>
        <span style={{ fontWeight: 700, color: THEME.text }}>{submitted}</span>
        <span style={{ color: THEME.textLight, margin: '0 4px' }}>→</span>
        <span style={{ fontWeight: 700, color: evaluated > 0 ? THEME.primary : THEME.textMuted }}>{evaluated}</span>
      </div>
      <div style={{ fontSize: 10, color: THEME.textMuted, marginTop: 2 }}>Sub → Eval</div>
    </div>
  );
}

// ── Part detail panels ────────────────────────────────────────────
function PartAPanel({ faculty }) {
  const a = faculty.partA || {};
  return (
    <SectionPanel title="Part A — Faculty Information" icon="👤">
      <InfoRow label="Employee ID"     value={faculty.employeeId} />
      <InfoRow label="Name"            value={faculty.name} />
      <InfoRow label="Department"      value={faculty.department} />
      <InfoRow label="Designation"     value={faculty.designation} />
      <InfoRow label="Mobile"          value={a.mobile} />
      <InfoRow label="Qualification"   value={a.qualification} />
      <InfoRow label="Date of Joining" value={a.dateOfJoining} />
      <InfoRow label="Total Service"   value={a.totalService} />
      <InfoRow label="CBIT Experience" value={a.cbitExperience} />
    </SectionPanel>
  );
}

function PartBPanel({ partB }) {
  if (!partB) return null;
  const { b1OddCourses = [], b1EvenCourses = [], b2 = {}, b3 = {}, b4 = {} } = partB;

  const CourseTable = ({ label, courses }) => (
    <div style={{ marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 6 }}>{label}</div>
      {courses.length === 0
        ? <p style={{ fontSize: 12, color: THEME.textMuted, fontStyle: 'italic' }}>No courses added.</p>
        : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ background: THEME.bg }}>
                  {['Course', 'Code', 'Success Rate', 'GPA', 'COs', 'Proof Page'].map(h => (
                    <th key={h} style={{ padding: '6px 10px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: `2px solid ${THEME.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i} style={{ borderBottom: `1px solid ${THEME.borderLight}` }}>
                    <td style={{ padding: '7px 10px' }}>{c.courseTitle}</td>
                    <td style={{ padding: '7px 10px', color: THEME.textMuted }}>{c.courseCode}</td>
                    <td style={{ padding: '7px 10px' }}>{c.successRate}%</td>
                    <td style={{ padding: '7px 10px' }}>{c.gpa}</td>
                    <td style={{ padding: '7px 10px' }}>{c.cos}</td>
                    <td style={{ padding: '7px 10px', color: THEME.textMuted }}>{c.proofPage || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );

  const b3Fields = [
    ['ICT Tools', b3.ict], ['Alt. Assessments', b3.alt], ['CEP / Cases', b3.cep],
    ['Projects / Reports', b3.proj], ['Innovative Methods', b3.itm], ['Content Dev.', b3.cd],
  ];

  return (
    <SectionPanel title="Part B — Teaching, Learning & Evaluation" icon="📚">
      <CourseTable label="Odd Semester"  courses={b1OddCourses} />
      <CourseTable label="Even Semester" courses={b1EvenCourses} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px', marginTop: 10 }}>
        <InfoRow label="Feedback — Odd Sem (%)"  value={b2.oddFeedback} />
        <InfoRow label="Feedback — Even Sem (%)" value={b2.evenFeedback} />
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>B.3 Pedagogical Initiatives</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
          {b3Fields.map(([label, val]) => (
            <div key={label} style={{ background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px' }}>
              <div style={{ fontSize: 10, color: THEME.textMuted }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: THEME.text }}>{val ?? 0}</div>
            </div>
          ))}
        </div>
        {b3.obeText && (
          <div style={{ marginTop: 10, padding: '8px 12px', background: THEME.warningBg, border: `1px solid ${THEME.warningBorder}`, borderRadius: THEME.radiusSm, fontSize: 12, color: THEME.text, lineHeight: 1.6 }}>
            <strong style={{ color: THEME.warning }}>OBE Description:</strong> {b3.obeText}
          </div>
        )}
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>B.4 Student Mentoring</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8 }}>
          {[
            ['Students Mentored (N)', b4.n],
            ['Frequency', b4.meetFreq],
            ['Cleared Odd (N1)', b4.n1],
            ['Cleared Even (N2)', b4.n2],
            ['Events', b4.events],
            ['Awards', b4.awards],
            ['NPTEL/MOOC', b4.nptel],
            ['Certifications', b4.certs],
            ['Attendance ≥75% (N3)', b4.n3],
          ].map(([label, val]) => (
            <div key={label} style={{ background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px' }}>
              <div style={{ fontSize: 10, color: THEME.textMuted }}>{label}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: THEME.text }}>{val ?? 0}</div>
            </div>
          ))}
        </div>
      </div>
    </SectionPanel>
  );
}

function PartCPanel({ partC }) {
  if (!partC) return null;

  const SimpleTable = ({ title, rows, cols }) => {
    if (!rows.length) return (
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 4 }}>{title}</div>
        <p style={{ fontSize: 12, color: THEME.textMuted, fontStyle: 'italic' }}>No entries.</p>
      </div>
    );
    return (
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 6 }}>{title}</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead><tr style={{ background: THEME.bg }}>
              {cols.map(c => <th key={c} style={{ padding: '6px 10px', textAlign: 'left', fontSize: 10, fontWeight: 700, color: THEME.textMuted, textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: `2px solid ${THEME.border}`, whiteSpace: 'nowrap' }}>{c}</th>)}
            </tr></thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${THEME.borderLight}` }}>
                  {Object.values(r).slice(1, cols.length + 1).map((v, j) => (
                    <td key={j} style={{ padding: '7px 10px' }}>{v ?? '—'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const c3 = partC.c3 || {};
  const c4 = partC.c4 || {};
  const c5 = partC.c5 || {};
  const c6 = partC.c6 || {};

  return (
    <SectionPanel title="Part C — Research Contribution" icon="🔬">
      <SimpleTable title="C.1.1 Conference Papers"      rows={partC.c11||[]} cols={['Title','Indexing','Author Position','Proof Page']} />
      <SimpleTable title="C.1.2 Journal Publications"   rows={partC.c12||[]} cols={['Title','Quartile','Author Position','Proof Page']} />
      <SimpleTable title="C.1.3 Citations"               rows={partC.c13||[]} cols={['Title','Type','Count','Proof Page']} />
      <SimpleTable title="C.1.4 Book Chapters"           rows={partC.c14||[]} cols={['Title','Indexing','Author Position','Proof Page']} />
      <SimpleTable title="C.1.5 Textbooks"               rows={partC.c15||[]} cols={['Title','ISBN','Author Position','Proof Page']} />
      <SimpleTable title="C.2.1 Funded Projects"         rows={partC.c21||[]} cols={['Title','Amount (₹)','Role','Proof Page']} />
      <SimpleTable title="C.2.2 Research Outcomes"       rows={partC.c22||[]} cols={['Title','Outcome Type','Proof Page']} />

      <div style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>C.3  Products & Patents</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 8 }}>
          {[['Products', c3.products],['Software/Models', c3.models],['Patents Granted', c3.patentsGranted],['Patents Published', c3.patentsPublished],['Money from Patent (₹)', c3.moneyGenerated||0],['Startup Investment (₹)', c3.startupInvestment||0]].map(([l,v]) => (
            <div key={l} style={{ background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px' }}>
              <div style={{ fontSize: 10, color: THEME.textMuted }}>{l}</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: THEME.text }}>{v ?? 0}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>C.4  Consultancy</div>
        <InfoRow label="Project Title"   value={c4.title || '—'} />
        <InfoRow label="Amount (₹)"      value={c4.amount ? `₹${c4.amount}` : '—'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 6 }}>C.5  PhD Supervisorship</div>
          <InfoRow label="Currently Supervising" value={c5.supervising ?? 0} />
          <InfoRow label="Guided & Awarded"       value={c5.guided ?? 0} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 6 }}>C.6  Student Projects</div>
          <InfoRow label="Projects Guided"     value={c6.projects ?? 0} />
          <InfoRow label="→ Paper/Publication" value={c6.presentations ?? 0} />
        </div>
      </div>
    </SectionPanel>
  );
}

function PartDPanel({ partD }) {
  if (!partD) return null;
  const { d1 = {}, d2 = {}, d3 = {} } = partD;

  return (
    <SectionPanel title="Part D — Extension Activities & Professional Development" icon="🏅">
      <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>D.1 Professional Development</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginBottom: 14 }}>
        {[['FDP/NPTEL 8–12wk', d1.longFDP],['Sponsored FDP 1–2wk', d1.shortFDP],['Workshops (<1wk)', d1.workshops],['Certifications', d1.certs],['Training Conducted (1–2wk)', d1.longTraining],['Training Conducted (<1wk)', d1.shortTraining],['Value-Added Courses', d1.valueCourses]].map(([l,v]) => (
          <div key={l} style={{ background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px' }}>
            <div style={{ fontSize: 10, color: THEME.textMuted }}>{l}</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.text }}>{v ?? 0}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>D.2 Professional Interactions</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 8, marginBottom: 14 }}>
        {[['Lifetime Memberships', d2.lifetimeMemberships],['Annual Memberships', d2.annualMemberships],['Accreditation Body', d2.accreditation?'Yes':'No'],['Journal Editor Q1', d2.editorQ1?'Yes':'No'],['Journal Editor Q2', d2.editorQ2?'Yes':'No'],['Project Examiner', d2.projectExaminer],['Question Paper Setting', d2.questionPaper?'Yes':'No'],['Lab Examiner', d2.labExaminer],['Resource Person', d2.resourcePerson],['International Visits', d2.intlVisit?'Yes':'No'],['MOUs', d2.mous],['Awards', d2.awards]].map(([l,v]) => (
          <div key={l} style={{ background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px' }}>
            <div style={{ fontSize: 10, color: THEME.textMuted }}>{l}</div>
            <div style={{ fontSize: typeof v === 'number' ? 16 : 13, fontWeight: 700, color: THEME.text }}>{v ?? '—'}</div>
          </div>
        ))}
      </div>

      <div style={{ fontSize: 12, fontWeight: 600, color: THEME.primary, marginBottom: 8 }}>D.3 Administrative Contributions</div>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 11, color: THEME.textMuted, marginBottom: 4 }}>
          Institution Contribution <span style={{ background: THEME.primaryLight, color: THEME.primary, borderRadius: 4, padding: '1px 6px', fontSize: 10, marginLeft: 4 }}>Score: {d3.d31Score ?? 0}/5</span>
        </div>
        <div style={{ fontSize: 12, color: THEME.text, background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px', lineHeight: 1.6 }}>
          {d3.institutionText || <em style={{ color: THEME.textMuted }}>No description.</em>}
        </div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: THEME.textMuted, marginBottom: 4 }}>
          Department Contribution <span style={{ background: THEME.primaryLight, color: THEME.primary, borderRadius: 4, padding: '1px 6px', fontSize: 10, marginLeft: 4 }}>Score: {d3.d32Score ?? 0}/10</span>
        </div>
        <div style={{ fontSize: 12, color: THEME.text, background: THEME.bg, borderRadius: THEME.radiusSm, padding: '8px 12px', lineHeight: 1.6 }}>
          {d3.deptText || <em style={{ color: THEME.textMuted }}>No description.</em>}
        </div>
      </div>
    </SectionPanel>
  );
}

// ── Faculty detail modal ──────────────────────────────────────────
function FacultyDetail({ faculty, onClose }) {
  const [tab, setTab] = useState('a');
  const dc = DESIG_COLOR[faculty.designation] || DESIG_COLOR['Assistant Professor'];
  const { submittedPoints: sp = {}, evaluatedPoints: ep = {} } = faculty;

  const TABS = [
    { key: 'a', label: 'Part A', icon: '👤' },
    { key: 'b', label: 'Part B', icon: '📚' },
    { key: 'c', label: 'Part C', icon: '🔬' },
    { key: 'd', label: 'Part D', icon: '🏅' },
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
      zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{
        background: '#fff', borderRadius: THEME.radiusLg,
        width: '100%', maxWidth: 820,
        maxHeight: '90vh', display: 'flex', flexDirection: 'column',
        boxShadow: THEME.shadowLg,
        overflow: 'hidden',
      }}>
        {/* Modal header */}
        <div style={{
          padding: '16px 22px', borderBottom: `1px solid ${THEME.borderLight}`,
          display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${THEME.primaryMid}, ${THEME.primaryDark})`,
            color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: THEME.fontHeading, fontSize: 18, fontWeight: 600,
          }}>
            {faculty.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 600, fontFamily: THEME.fontHeading, color: THEME.text }}>
              {faculty.name}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3, flexWrap: 'wrap' }}>
              {pill(dc.bg, dc.color, dc.border, faculty.designation)}
              <span style={{ fontSize: 12, color: THEME.textMuted }}>{faculty.employeeId}</span>
            </div>
          </div>
          {/* Score compare */}
          <div style={{ display: 'flex', gap: 8 }}>
            <ScoreCompare label="Part B" submitted={sp.b ?? 0} evaluated={ep.b ?? 0} />
            <ScoreCompare label="Part C" submitted={sp.c ?? 0} evaluated={ep.c ?? 0} />
            <ScoreCompare label="Part D" submitted={sp.d ?? 0} evaluated={ep.d ?? 0} />
          </div>
          <button onClick={onClose} style={{ background: 'none', border: `1px solid ${THEME.border}`, borderRadius: THEME.radiusSm, padding: '5px 10px', cursor: 'pointer', color: THEME.textMuted, fontSize: 16, flexShrink: 0 }}>✕</button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, padding: '8px 16px', background: THEME.bg, borderBottom: `1px solid ${THEME.borderLight}`, flexShrink: 0 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              padding: '7px 16px', borderRadius: THEME.radius, border: 'none',
              background: tab === t.key ? THEME.primary : 'transparent',
              color: tab === t.key ? '#fff' : THEME.textMuted,
              fontSize: 13, fontWeight: tab === t.key ? 600 : 400,
              cursor: 'pointer', fontFamily: THEME.fontBody, transition: 'all 0.15s',
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 22px' }}>
          {tab === 'a' && <PartAPanel faculty={faculty} />}
          {tab === 'b' && <PartBPanel partB={faculty.partB} />}
          {tab === 'c' && <PartCPanel partC={faculty.partC} />}
          {tab === 'd' && <PartDPanel partD={faculty.partD} />}
        </div>
      </div>
    </div>
  );
}

// ── Main Department Component ─────────────────────────────────────
export default function Department({ user, navigate, selectedDept, facultyList }) {
  const [detailFaculty, setDetailFaculty] = useState(null);

  const deptFaculty = [...facultyList.filter(f => f.department === selectedDept)]
    .sort((a, b) => (DESIGNATION_ORDER[a.designation] ?? 9) - (DESIGNATION_ORDER[b.designation] ?? 9));

  const DESIG_GROUPS = ['Professor', 'Associate Professor', 'Assistant Professor'];

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: THEME.fontBody }}>
      <TopBar user={user} navigate={navigate} title={selectedDept || 'Department'} />

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '28px 28px 60px' }}>
        <button
          onClick={() => navigate('home')}
          style={{ background: 'none', border: 'none', color: THEME.primary, cursor: 'pointer', marginBottom: 16, fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
        >
          ← Back to Departments
        </button>

        <h2 style={{ fontFamily: THEME.fontHeading, fontSize: 26, color: THEME.primary, marginBottom: 6 }}>
          {selectedDept}
        </h2>
        <p style={{ fontSize: 13, color: THEME.textMuted, marginBottom: 24 }}>
          {deptFaculty.length} faculty member{deptFaculty.length !== 1 ? 's' : ''}
        </p>

        {deptFaculty.length === 0 ? (
          <div style={{ textAlign: 'center', padding: 40, color: THEME.textMuted, background: '#fff', borderRadius: THEME.radiusLg, border: `1px solid ${THEME.borderLight}` }}>
            No faculty found in this department.
          </div>
        ) : (
          DESIG_GROUPS.map(desig => {
            const group = deptFaculty.filter(f => f.designation === desig);
            if (!group.length) return null;
            const dc = DESIG_COLOR[desig];

            return (
              <div key={desig} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  {pill(dc.bg, dc.color, dc.border, `${desig}s`)}
                  <div style={{ flex: 1, height: 1, background: THEME.borderLight }} />
                  <span style={{ fontSize: 12, color: THEME.textMuted }}>{group.length} member{group.length !== 1 ? 's' : ''}</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {group.map(f => {
                    const { submittedPoints: sp = {}, evaluatedPoints: ep = {} } = f;
                    return (
                      <div
                        key={f.id}
                        style={{
                          background: '#fff', border: `1.5px solid ${THEME.borderLight}`,
                          borderRadius: THEME.radiusLg, padding: '16px 20px',
                          display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
                          boxShadow: THEME.shadow, transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = THEME.primary; e.currentTarget.style.boxShadow = THEME.shadowMd; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = THEME.borderLight; e.currentTarget.style.boxShadow = THEME.shadow; }}
                      >
                        {/* Avatar */}
                        <div style={{
                          width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                          background: `linear-gradient(135deg, ${THEME.primaryMid}, ${THEME.primaryDark})`,
                          color: '#fff', fontFamily: THEME.fontHeading, fontSize: 16, fontWeight: 600,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {f.name.split(' ').map(w => w[0]).slice(0, 2).join('')}
                        </div>

                        {/* Name + ID */}
                        <div style={{ flex: 1, minWidth: 160 }}>
                          <div style={{ fontFamily: THEME.fontHeading, fontSize: 16, fontWeight: 600, color: THEME.text, marginBottom: 2 }}>{f.name}</div>
                          <div style={{ fontSize: 12, color: THEME.textMuted }}>{f.employeeId}</div>
                          <div style={{ fontSize: 12, marginTop: 4, color: f.evaluator ? THEME.success : THEME.error, fontWeight: 600 }}>
                            {f.evaluator ? `✓ ${f.evaluator}` : '⚠️ Evaluator not assigned'}
                          </div>
                        </div>

                        {/* Submitted → Evaluated scores */}
                        <div style={{ display: 'flex', gap: 8 }}>
                          <ScoreCompare label="Part B" submitted={sp.b ?? 0} evaluated={ep.b ?? 0} />
                          <ScoreCompare label="Part C" submitted={sp.c ?? 0} evaluated={ep.c ?? 0} />
                          <ScoreCompare label="Part D" submitted={sp.d ?? 0} evaluated={ep.d ?? 0} />
                        </div>

                        {/* View details */}
                        <button
                          onClick={() => setDetailFaculty(f)}
                          style={{
                            padding: '7px 16px', borderRadius: THEME.radius,
                            border: `1.5px solid ${THEME.primary}`,
                            background: THEME.primaryLight, color: THEME.primary,
                            fontSize: 12, fontWeight: 600, cursor: 'pointer',
                            fontFamily: THEME.fontBody, flexShrink: 0,
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Faculty detail modal */}
      {detailFaculty && (
        <FacultyDetail faculty={detailFaculty} onClose={() => setDetailFaculty(null)} />
      )}
    </div>
  );
}