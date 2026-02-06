const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 5000;

// Initialize Firebase Admin SDK
try {
  const serviceAccount = require('./firebase-config.json');
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('✅ Firebase initialized successfully');
} catch (error) {
  console.warn('⚠️ Firebase config not found. Using demo mode.');
  console.log('To enable Firebase:');
  console.log('1. Download firebase-config.json from Firebase Console');
  console.log('2. Place it in d:\\nikunj-portal\\server\\');
  console.log('3. Restart the server');
}

const db = admin.firestore();
const app = express();

// CORS configuration for live deployment
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:5000',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());

// DEMO DATA
const DEMO_EMPLOYEES = [
  { id: 'EMP-001', name: 'Nikunj', role: 'PM', dept: 'MGMT', status: 'Active', screenTime: '8h 30m' },
  { id: 'EMP-002', name: 'Asst PM', role: 'Asst_PM', dept: 'MGMT', status: 'Active', screenTime: '8h 15m' },
  { id: 'TL-DEV-01', name: 'Dev Lead A', role: 'TL', dept: 'DEV', status: 'Active', screenTime: '8h 45m' },
  { id: 'TL-DEV-02', name: 'Dev Lead B', role: 'TL', dept: 'DEV', status: 'Active', screenTime: '7h 20m' },
  { id: 'DEV-001', name: 'Alice', role: 'Developer', dept: 'DEV', status: 'Active', screenTime: '8h 30m' },
  { id: 'DEV-002', name: 'Bob', role: 'Developer', dept: 'DEV', status: 'Idle', screenTime: '5h 10m' },
  { id: 'DEV-003', name: 'Charlie', role: 'Developer', dept: 'DEV', status: 'Active', screenTime: '8h 50m' },
  { id: 'TL-QA-01', name: 'QA Lead', role: 'TL', dept: 'QA', status: 'Active', screenTime: '8h 20m' },
  { id: 'QA-001', name: 'Diana', role: 'QA', dept: 'QA', status: 'Active', screenTime: '8h 10m' },
  { id: 'QA-002', name: 'Eve', role: 'QA', dept: 'QA', status: 'Active', screenTime: '8h 40m' },
  { id: 'TL-MEDIA-01', name: 'Media Lead', role: 'TL', dept: 'MEDIA', status: 'Active', screenTime: '8h 25m' },
  { id: 'MEDIA-001', name: 'Frank', role: 'Designer', dept: 'MEDIA', status: 'Active', screenTime: '8h 30m' },
  { id: 'MEDIA-002', name: 'Grace', role: 'Designer', dept: 'MEDIA', status: 'Active', screenTime: '8h 35m' },
  { id: 'TL-ID-01', name: 'ID Lead', role: 'TL', dept: 'ID', status: 'Active', screenTime: '8h 40m' },
  { id: 'ID-01', name: 'Henry', role: 'Instructional Designer', dept: 'ID', status: 'Active', screenTime: '8h 25m' },
  { id: 'ID-02', name: 'Iris', role: 'Instructional Designer', dept: 'ID', status: 'Active', screenTime: '8h 30m' },
  { id: 'ID-03', name: 'Jack', role: 'Instructional Designer', dept: 'ID', status: 'Active', screenTime: '8h 45m' },
  { id: 'ID-04', name: 'Karen', role: 'Instructional Designer', dept: 'ID', status: 'Idle', screenTime: '6h 15m' },
  { id: 'ID-05', name: 'Liam', role: 'Instructional Designer', dept: 'ID', status: 'Active', screenTime: '8h 35m' },
];

const DEMO_TASKS = [
  { id: 'NIK-101', title: 'Course Alpha Build', assignee: 'DEV-001', status: 'In Progress', priority: 'High', dueDate: '2026-02-10' },
  { id: 'NIK-102', title: 'Dashboard UI Redesign', assignee: 'DEV-002', status: 'In Progress', priority: 'High', dueDate: '2026-02-12' },
  { id: 'NIK-103', title: 'API Integration', assignee: 'DEV-003', status: 'Done', priority: 'Medium', dueDate: '2026-02-05' },
  { id: 'NIK-104', title: 'Database Optimization', assignee: 'TL-DEV-01', status: 'In Progress', priority: 'High', dueDate: '2026-02-15' },
  { id: 'NIK-105', title: 'Testing Sprint 1', assignee: 'QA-001', status: 'In Progress', priority: 'High', dueDate: '2026-02-08' },
  { id: 'NIK-106', title: 'Bug Fixes', assignee: 'QA-002', status: 'To Do', priority: 'Medium', dueDate: '2026-02-20' },
  { id: 'NIK-107', title: 'Documentation', assignee: 'DEV-001', status: 'To Do', priority: 'Low', dueDate: '2026-02-25' },
  { id: 'NIK-108', title: 'Performance Testing', assignee: 'TL-QA-01', status: 'In Progress', priority: 'Medium', dueDate: '2026-02-18' },
  { id: 'NIK-109', title: 'Course Content Development', assignee: 'ID-01', status: 'In Progress', priority: 'High', dueDate: '2026-02-12' },
  { id: 'NIK-110', title: 'Learning Modules Design', assignee: 'ID-02', status: 'In Progress', priority: 'High', dueDate: '2026-02-15' },
  { id: 'NIK-111', title: 'Training Material Creation', assignee: 'TL-ID-01', status: 'In Progress', priority: 'Medium', dueDate: '2026-02-20' },
];

const DEMO_ISSUES = [
  { id: 'BUG-001', title: 'Login button not responsive on mobile', description: 'Button click not working on mobile devices', reportedBy: 'QA-001', assignedTo: 'DEV-001', dept: 'DEV', severity: 'High', status: 'Open', createdDate: '2026-02-04' },
  { id: 'BUG-002', title: 'Dashboard layout broken on Safari', description: 'Grid layout not displaying correctly in Safari', reportedBy: 'QA-001', assignedTo: 'MEDIA-001', dept: 'MEDIA', severity: 'Medium', status: 'In Progress', createdDate: '2026-02-03' },
  { id: 'BUG-003', title: 'API timeout issues', description: 'API calls timing out after 5 seconds', reportedBy: 'QA-002', assignedTo: 'DEV-003', dept: 'DEV', severity: 'High', status: 'Open', createdDate: '2026-02-02' },
];

// In-memory fallback storage
let employees = DEMO_EMPLOYEES;
let tasks = DEMO_TASKS;
let issues = DEMO_ISSUES;
let attendance = {};

// Sync data to Firebase on startup
async function syncDataToFirebase() {
  try {
    for (const emp of DEMO_EMPLOYEES) {
      await db.collection('employees').doc(emp.id).set(emp, { merge: true });
    }
    for (const task of DEMO_TASKS) {
      await db.collection('tasks').doc(task.id).set(task, { merge: true });
    }
    for (const issue of DEMO_ISSUES) {
      await db.collection('issues').doc(issue.id).set(issue, { merge: true });
    }
    console.log('✅ All data synced to Firebase Firestore');
  } catch (error) {
    console.log('ℹ️ Firebase sync skipped (offline mode)');
  }
} 

// API: Track Screen Time (Heartbeat)
app.post('/api/heartbeat', async (req, res) => {
  const { empId, status, taskId } = req.body;
  const today = new Date().toISOString().split('T')[0];

  try {
    await db.collection('attendance').doc(`${empId}_${today}`).set(
      { empId, status, taskId, date: today, timestamp: new Date() },
      { merge: true }
    );
  } catch (error) {
    console.log('ℹ️ Heartbeat stored locally');
  }

  if (!attendance[empId]) attendance[empId] = {};
  if (!attendance[empId][today]) attendance[empId][today] = { active: 0, idle: 0 };
  if (status === 'ACTIVE') attendance[empId][today].active += 1;
  else attendance[empId][today].idle += 1;

  res.json({ success: true });
});

// API: Task Assignment (Used by TLs and PMs)
app.patch('/api/tasks/assign', async (req, res) => {
  const { taskId, empId } = req.body;

  try {
    await db.collection('tasks').doc(taskId).update({ assignee: empId });
  } catch (error) {
    console.log('ℹ️ Task assignment stored locally');
  }

  let task = tasks.find(t => t.id === taskId);
  if (task) task.assignee = empId;
  res.json(task);
});

// API: Update Task Timeline
app.patch('/api/tasks/update-timeline', async (req, res) => {
  const { taskId, dueDate } = req.body;

  try {
    await db.collection('tasks').doc(taskId).update({ dueDate });
  } catch (error) {
    console.log('ℹ️ Timeline update stored locally');
  }

  let task = tasks.find(t => t.id === taskId);
  if (task) task.dueDate = dueDate;
  res.json(task);
});

// API: Create New Issue/Bug
app.post('/api/issues/create', async (req, res) => {
  const { id, title, description, reportedBy, assignedTo, dept, severity, createdDate } = req.body;
  const newIssue = {
      id,
      title,
      description,
      reportedBy,
      assignedTo,
      dept,
      severity,
      status: 'Open',
      createdDate
  };

  try {
    await db.collection('issues').doc(id).set(newIssue);
  } catch (error) {
    console.log('ℹ️ Issue stored locally');
  }

  issues.push(newIssue);
  res.json(newIssue);
});

// API: Update Issue Status
app.patch('/api/issues/update-status', async (req, res) => {
  const { issueId, status } = req.body;

  try {
    await db.collection('issues').doc(issueId).update({ status });
  } catch (error) {
    console.log('ℹ️ Status update stored locally');
  }

  const issue = issues.find(i => i.id === issueId);
  if (issue) {
      issue.status = status;
      res.json(issue);
  } else {
      res.status(404).json({ error: 'Issue not found' });
  }
});

// API: Reassign Issue
app.patch('/api/issues/reassign', async (req, res) => {
  const { issueId, assignedTo } = req.body;
  const assignedEmp = employees.find(e => e.id === assignedTo);
  const dept = assignedEmp?.dept || 'DEV';

  try {
    await db.collection('issues').doc(issueId).update({ assignedTo, dept });
  } catch (error) {
    console.log('ℹ️ Reassignment stored locally');
  }

  const issue = issues.find(i => i.id === issueId);
  if (issue) {
      issue.assignedTo = assignedTo;
      issue.dept = dept;
      res.json(issue);
  } else {
      res.status(404).json({ error: 'Issue not found' });
  }
});

// API: Create Task
app.post('/api/tasks/create', async (req, res) => {
  const { id, title, description, assignee, status, priority, dueDate, createdBy, createdDate } = req.body;
  const newTask = { id, title, description, assignee, status: 'To Do', priority, dueDate, createdBy, createdDate };

  try {
    await db.collection('tasks').doc(id).set(newTask);
  } catch (error) {
    console.log('ℹ️ Task stored locally');
  }

  tasks.push(newTask);
  res.json(newTask);
});

// API: Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const snapshot = await db.collection('tasks').get();
    const firebaseTasks = [];
    snapshot.forEach(doc => {
      firebaseTasks.push(doc.data());
    });
    res.json(firebaseTasks.length > 0 ? firebaseTasks : tasks);
  } catch (error) {
    console.log('ℹ️ Using local tasks');
    res.json(tasks);
  }
});

// API: Get all issues
app.get('/api/issues', async (req, res) => {
  try {
    const snapshot = await db.collection('issues').get();
    const firebaseIssues = [];
    snapshot.forEach(doc => {
      firebaseIssues.push(doc.data());
    });
    res.json(firebaseIssues.length > 0 ? firebaseIssues : issues);
  } catch (error) {
    console.log('ℹ️ Using local issues');
    res.json(issues);
  }
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server running with Firebase integration' });
});

app.listen(PORT, async () => {
  console.log(`🚀 Nikunj Suite Backend running on Port ${PORT}`);
  console.log('📊 Firebase Firestore integration enabled');
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  await syncDataToFirebase();
});