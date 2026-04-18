// ─────────────────────────────────────────────────────────────────
// App.jsx  —  Admin Application | Root Router & Global State
// ─────────────────────────────────────────────────────────────────
import { useState, useEffect } from 'react';
import { injectFonts } from './Theme';
import { ALL_DEPARTMENTS } from './constants';
import Login      from './Login';
import Home       from './Home';
import Department from './Department';
import Assign     from './Assign';
import Create     from './Create';

// ── Seed data ────────────────────────────────────────────────────
const INITIAL_FACULTY = [
  {
    id: 'F001', employeeId: 'CBIT2001',
    name: 'Dr. Priya Sharma', designation: 'Professor',
    department: 'Computer Science & Engineering',
    evaluator: 'Evaluator A',
    partA: { mobile: '9876543210', qualification: 'Ph.D', dateOfJoining: '2005-07-01', totalService: '20.5 Years', cbitExperience: '20.5 Years' },
    partB: {
      b1OddCourses:  [{ courseTitle: 'Operating Systems', courseCode: 'CS501', successRate: 88, gpa: 8.2, cos: 5, proofPage: '12' }],
      b1EvenCourses: [{ courseTitle: 'Machine Learning',  courseCode: 'CS601', successRate: 92, gpa: 8.8, cos: 5, proofPage: '24' }],
      b2: { oddFeedback: 87, evenFeedback: 91 },
      b3: { ict: 2, alt: 1, cep: 2, proj: 2, itm: 2, cd: 1, obeText: 'Implemented OBE through CO-PO mapping...' },
      b4: { n: 20, meetFreq: 'Monthly', n1: 18, n2: 17, events: 5, awards: 2, nptel: 8, certs: 6, n3: 19 },
    },
    partC: {
      c11: [{ id: 'p1', title: 'Deep Learning for NLP', indexing: 'Scopus', authorPosition: 'first', proofPage: '35' }],
      c12: [{ id: 'p2', title: 'Neural Architecture Search', quartile: 'Q1', authorPosition: 'first', proofPage: '42' }],
      c13: [{ id: 'ci1', title: 'ML survey paper', type: 'Q1', count: 12, proofPage: '50' }],
      c14: [], c15: [],
      c21: [{ id: 'pr1', title: 'AI for Healthcare', amount: 1500000, role: 'PI', proofPage: '60' }],
      c22: [{ id: 'out1', title: 'AI for Healthcare', outcomeType: 'Paper Publication', proofPage: '65' }],
      c3: { products: 1, models: 0, patentsGranted: 0, patentsPublished: 1, moneyGenerated: 0, startupInvestment: 0 },
      c4: { title: 'ML Consulting for TCS', amount: 75000 },
      c5: { supervising: 3, guided: 1 },
      c6: { projects: 4, presentations: 2 },
    },
    partD: {
      d1: { longFDP: 1, shortFDP: 2, workshops: 3, certs: 1, longTraining: 1, shortTraining: 0, valueCourses: 1 },
      d2: { lifetimeMemberships: 2, annualMemberships: 1, accreditation: true, editorQ1: false, editorQ2: true, projectExaminer: 2, questionPaper: true, labExaminer: 1, resourcePerson: 1, intlVisit: false, mous: 0, awards: 1 },
      d3: { institutionText: 'Served as Exam Committee member.', deptText: 'Coordinated departmental curriculum revision.', d31Score: 4, d32Score: 8 },
    },
    submittedPoints: { b: 105, c: 280, d: 62 },
    evaluatedPoints: { b: 100, c: 270, d: 60 },
  },
  {
    id: 'F002', employeeId: 'CBIT2008',
    name: 'Dr. Ravi Kumar', designation: 'Associate Professor',
    department: 'Computer Science & Engineering',
    evaluator: null,
    partA: { mobile: '9123456780', qualification: 'M.Tech + Ph.D', dateOfJoining: '2010-07-01', totalService: '15.5 Years', cbitExperience: '15.5 Years' },
    partB: {
      b1OddCourses:  [{ courseTitle: 'Data Structures', courseCode: 'CS301', successRate: 82, gpa: 7.9, cos: 4, proofPage: '5' }],
      b1EvenCourses: [{ courseTitle: 'Algorithms',      courseCode: 'CS302', successRate: 79, gpa: 7.6, cos: 4, proofPage: '10' }],
      b2: { oddFeedback: 83, evenFeedback: 85 },
      b3: { ict: 1, alt: 2, cep: 1, proj: 1, itm: 1, cd: 0, obeText: '' },
      b4: { n: 25, meetFreq: 'Bi-Weekly', n1: 22, n2: 20, events: 3, awards: 1, nptel: 5, certs: 4, n3: 23 },
    },
    partC: {
      c11: [], c12: [{ id: 'p3', title: 'Graph Algorithms Survey', quartile: 'Q2', authorPosition: 'second', proofPage: '30' }],
      c13: [{ id: 'ci2', title: 'Graph paper', type: 'Other', count: 8, proofPage: '38' }],
      c14: [], c15: [], c21: [], c22: [],
      c3: { products: 0, models: 1, patentsGranted: 0, patentsPublished: 0, moneyGenerated: 0, startupInvestment: 0 },
      c4: { title: '', amount: 0 },
      c5: { supervising: 2, guided: 0 },
      c6: { projects: 3, presentations: 1 },
    },
    partD: {
      d1: { longFDP: 0, shortFDP: 1, workshops: 2, certs: 0, longTraining: 0, shortTraining: 1, valueCourses: 0 },
      d2: { lifetimeMemberships: 1, annualMemberships: 2, accreditation: false, editorQ1: false, editorQ2: false, projectExaminer: 3, questionPaper: false, labExaminer: 2, resourcePerson: 0, intlVisit: false, mous: 1, awards: 0 },
      d3: { institutionText: 'Library committee member.', deptText: 'Handled timetable coordination.', d31Score: 3, d32Score: 6 },
    },
    submittedPoints: { b: 88, c: 95, d: 40 },
    evaluatedPoints: { b: 0, c: 0, d: 0 },
  },
  {
    id: 'F003', employeeId: 'CBIT2018',
    name: 'Ms. Anitha Reddy', designation: 'Assistant Professor',
    department: 'Information Technology',
    evaluator: 'Evaluator B',
    partA: { mobile: '9988776655', qualification: 'M.Tech', dateOfJoining: '2018-07-01', totalService: '7.5 Years', cbitExperience: '7.5 Years' },
    partB: {
      b1OddCourses:  [{ courseTitle: 'Programming in C', courseCode: 'CS101', successRate: 78, gpa: 7.2, cos: 3, proofPage: '3' }],
      b1EvenCourses: [{ courseTitle: 'OOP with Java',    courseCode: 'CS201', successRate: 80, gpa: 7.4, cos: 4, proofPage: '7' }],
      b2: { oddFeedback: 80, evenFeedback: 82 },
      b3: { ict: 1, alt: 1, cep: 1, proj: 1, itm: 0, cd: 0, obeText: '' },
      b4: { n: 30, meetFreq: 'Monthly', n1: 26, n2: 24, events: 2, awards: 0, nptel: 4, certs: 3, n3: 28 },
    },
    partC: {
      c11: [{ id: 'p4', title: 'IoT Security Framework', indexing: 'Scopus', authorPosition: 'second', proofPage: '15' }],
      c12: [], c13: [], c14: [], c15: [], c21: [], c22: [],
      c3: { products: 0, models: 0, patentsGranted: 0, patentsPublished: 0, moneyGenerated: 0, startupInvestment: 0 },
      c4: { title: '', amount: 0 },
      c5: { supervising: 0, guided: 0 },
      c6: { projects: 2, presentations: 0 },
    },
    partD: {
      d1: { longFDP: 1, shortFDP: 0, workshops: 1, certs: 1, longTraining: 0, shortTraining: 0, valueCourses: 0 },
      d2: { lifetimeMemberships: 0, annualMemberships: 1, accreditation: false, editorQ1: false, editorQ2: false, projectExaminer: 1, questionPaper: false, labExaminer: 1, resourcePerson: 0, intlVisit: false, mous: 0, awards: 0 },
      d3: { institutionText: 'Sports committee member.', deptText: 'Lab coordinator for Programming lab.', d31Score: 2, d32Score: 5 },
    },
    submittedPoints: { b: 76, c: 42, d: 28 },
    evaluatedPoints: { b: 76, c: 40, d: 28 },
  },
];

export default function App() {
  const [page,         setPage]         = useState('login');
  const [user,         setUser]         = useState(null);
  const [facultyList,  setFacultyList]  = useState(INITIAL_FACULTY);
  const [selectedDept, setSelectedDept] = useState(null);

  useEffect(() => { injectFonts(); }, []);

  const navigate = (targetPage, dept = null) => {
    if (dept !== null) setSelectedDept(dept);
    setPage(targetPage);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    navigate('home');
  };

  const assignEvaluator = (facultyId, evaluatorName) => {
    setFacultyList(prev =>
      prev.map(f => f.id === facultyId ? { ...f, evaluator: evaluatorName || null } : f)
    );
  };

  const addFaculty = (newFaculty) => {
    const id = `F${String(facultyList.length + 1).padStart(3, '0')}`;
    setFacultyList(prev => [...prev, {
      ...newFaculty,
      id,
      evaluator: null,
      partA: { mobile: '', qualification: '', dateOfJoining: '', totalService: '', cbitExperience: '' },
      partB: { b1OddCourses: [], b1EvenCourses: [], b2: { oddFeedback: 0, evenFeedback: 0 }, b3: {}, b4: { n: 0 } },
      partC: { c11: [], c12: [], c13: [], c14: [], c15: [], c21: [], c22: [], c3: {}, c4: {}, c5: {}, c6: {} },
      partD: { d1: {}, d2: {}, d3: { institutionText: '', deptText: '', d31Score: 0, d32Score: 0 } },
      submittedPoints: { b: 0, c: 0, d: 0 },
      evaluatedPoints: { b: 0, c: 0, d: 0 },
    }]);
  };

  const pageProps = { user, navigate, facultyList, selectedDept, assignEvaluator, addFaculty };

  const PAGES = {
    login:      <Login      onLogin={handleLogin} />,
    home:       <Home       {...pageProps} />,
    department: <Department {...pageProps} />,
    assign:     <Assign     {...pageProps} />,
    create:     <Create     {...pageProps} />,
  };

  return PAGES[page] ?? PAGES.login;
}