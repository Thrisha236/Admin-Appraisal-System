// ─────────────────────────────────────────────────────────────────
// Assign.jsx  —  Admin Application | Assign Evaluators to Faculty
// ─────────────────────────────────────────────────────────────────
import { useState } from 'react';
import { THEME } from './Theme';
import { TopBar } from './Home';
import { EVALUATORS, ALL_DEPARTMENTS, DESIGNATION_ORDER } from './constants';

const DESIG_COLOR = {
  'Professor':           { bg: '#FEF3C7', color: '#92400E', border: '#FCD34D' },
  'Associate Professor': { bg: '#EFF6FF', color: '#1D4ED8', border: '#BFDBFE' },
  'Assistant Professor': { bg: '#F0FDF4', color: '#166534', border: '#86EFAC' },
};

const selStyle = {
  padding: '6px 10px', borderRadius: THEME.radiusSm,
  border: `1.5px solid ${THEME.border}`,
  fontFamily: THEME.fontBody, fontSize: 13,
  background: '#fff', color: THEME.text, outline: 'none',
  minWidth: 160,
};

export default function Assign({ user, navigate, facultyList, assignEvaluator }) {
  const [deptFilter,  setDeptFilter]  = useState('All');
  const [evalFilter,  setEvalFilter]  = useState('All');
  const [search,      setSearch]      = useState('');

  // Filter + sort
  const filtered = [...facultyList]
    .filter(f =>
      (deptFilter === 'All' || f.department === deptFilter) &&
      (evalFilter === 'All'
        ? true
        : evalFilter === 'Unassigned'
          ? !f.evaluator
          : f.evaluator === evalFilter) &&
      (search === '' || f.name.toLowerCase().includes(search.toLowerCase()) || f.employeeId.toLowerCase().includes(search.toLowerCase()))
    )
    .sort((a, b) => (DESIGNATION_ORDER[a.designation] ?? 9) - (DESIGNATION_ORDER[b.designation] ?? 9));

  const assigned   = facultyList.filter(f => f.evaluator).length;
  const unassigned = facultyList.length - assigned;

  return (
    <div style={{ minHeight: '100vh', background: THEME.bg, fontFamily: THEME.fontBody }}>
      <TopBar user={user} navigate={navigate} title="Assign Evaluators" />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 28px 60px' }}>

        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontFamily: THEME.fontHeading, fontSize: 26, color: THEME.primary, marginBottom: 4 }}>
            Assign Evaluators
          </h2>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, color: THEME.success, fontWeight: 600 }}>✓ {assigned} assigned</span>
            <span style={{ fontSize: 13, color: THEME.error,   fontWeight: 600 }}>⚠️ {unassigned} unassigned</span>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20, padding: '14px 18px', background: '#fff', borderRadius: THEME.radiusLg, border: `1px solid ${THEME.borderLight}`, boxShadow: THEME.shadow }}>
          <input
            type="text"
            placeholder="🔍 Search by name or ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...selStyle, flex: 1, minWidth: 200 }}
          />
          <select value={deptFilter} onChange={e => setDeptFilter(e.target.value)} style={selStyle}>
            <option value="All">All Departments</option>
            {ALL_DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={evalFilter} onChange={e => setEvalFilter(e.target.value)} style={selStyle}>
            <option value="All">All Evaluator Status</option>
            <option value="Unassigned">Unassigned</option>
            {EVALUATORS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: THEME.radiusLg, border: `1px solid ${THEME.borderLight}`, boxShadow: THEME.shadow, overflow: 'hidden' }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, color: THEME.textMuted }}>
              No faculty match the current filters.
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: THEME.primaryLight }}>
                <tr>
                  {['Employee ID', 'Name', 'Designation', 'Department', 'Assign Evaluator', 'Status'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', borderBottom: `1px solid ${THEME.border}`, color: THEME.primary, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((f, i) => {
                  const dc = DESIG_COLOR[f.designation] || DESIG_COLOR['Assistant Professor'];
                  return (
                    <tr
                      key={f.id}
                      style={{ borderBottom: `1px solid ${THEME.borderLight}`, background: i % 2 === 0 ? '#fff' : THEME.bg }}
                    >
                      <td style={{ padding: '12px 16px', fontSize: 13, color: THEME.textMuted, fontFamily: THEME.fontBody }}>{f.employeeId}</td>
                      <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, color: THEME.text }}>{f.name}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', background: dc.bg, color: dc.color, border: `1px solid ${dc.border}`, borderRadius: 99, padding: '2px 10px', fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap' }}>
                          {f.designation}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: 12, color: THEME.textMuted, maxWidth: 200 }}>
                        <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.department}</div>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        <select
                          value={f.evaluator || ''}
                          onChange={e => assignEvaluator(f.id, e.target.value)}
                          style={{ ...selStyle, borderColor: f.evaluator ? THEME.successBorder : THEME.errorBorder }}
                        >
                          <option value="">— Select Evaluator —</option>
                          {EVALUATORS.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                        </select>
                      </td>
                      <td style={{ padding: '12px 16px' }}>
                        {f.evaluator
                          ? <span style={{ fontSize: 12, color: THEME.success, fontWeight: 600 }}>✓ Assigned</span>
                          : <span style={{ fontSize: 12, color: THEME.error,   fontWeight: 600 }}>⚠️ Pending</span>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: 12, fontSize: 12, color: THEME.textMuted, textAlign: 'right' }}>
          Showing {filtered.length} of {facultyList.length} faculty
        </div>
      </div>
    </div>
  );
}