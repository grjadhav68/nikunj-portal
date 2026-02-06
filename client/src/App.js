import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// API Configuration for deployment
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// DEMO DATA
const DEMO_EMPLOYEES = [
  { id: 'EMP-001', name: 'Nikunj', role: 'PM', dept: 'MGMT', status: 'Active', screenTime: '8h 30m' },
  { id: 'EMP-002', name: 'Asst PM', role: 'Ass_PM', dept: 'MGMT', status: 'Active', screenTime: '8h 15m' },
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

// DEMO ISSUES - Bug/Issue tracking
const DEMO_ISSUES = [
  { id: 'BUG-001', title: 'Login button not responsive on mobile', description: 'Button click not working on mobile devices', reportedBy: 'QA-001', assignedTo: 'DEV-001', dept: 'DEV', severity: 'High', status: 'Open', createdDate: '2026-02-04' },
  { id: 'BUG-002', title: 'Dashboard layout broken on Safari', description: 'Grid layout not displaying correctly in Safari', reportedBy: 'QA-001', assignedTo: 'MEDIA-001', dept: 'MEDIA', severity: 'Medium', status: 'In Progress', createdDate: '2026-02-03' },
  { id: 'BUG-003', title: 'API timeout issues', description: 'API calls timing out after 5 seconds', reportedBy: 'QA-002', assignedTo: 'DEV-003', dept: 'DEV', severity: 'High', status: 'Open', createdDate: '2026-02-02' },
];

function NikunjApp() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('DASHBOARD');
  const [tasks, setTasks] = useState(DEMO_TASKS);
  const [issues, setIssues] = useState(DEMO_ISSUES);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Fetch tasks and issues from backend on component mount
  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(err => console.warn('Using demo tasks. Backend unavailable:', err));
    
    fetch(`${API_URL}/api/issues`)
      .then(res => res.json())
      .then(data => setIssues(data))
      .catch(err => console.warn('Using demo issues. Backend unavailable:', err));
  }, []);

  // Auto-login as Nikunj (PM) on app load
  useEffect(() => {
    if (!user) {
      const defaultUser = DEMO_EMPLOYEES.find(e => e.id === 'EMP-001');
      if (defaultUser) {
        setUser({ ...defaultUser, id: defaultUser.id });
      }
    }
  }, []);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showCreateIssueModal, setShowCreateIssueModal] = useState(false);
  const [showIssueDetailModal, setShowIssueDetailModal] = useState(false);
  const [showEmployeeDetailModal, setShowEmployeeDetailModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const getAssignableEmployees = () => {
    if (!user) return [];
    return DEMO_EMPLOYEES.filter(e => e.id !== user.id);
  };

  const generateTaskId = () => {
    const maxId = Math.max(...tasks.map(t => {
      const num = parseInt(t.id.split('-')[1]);
      return isNaN(num) ? 0 : num;
    }), 0);
    return `NIK-${maxId + 1}`;
  };

  const createTask = (taskData) => {
    const newTask = {
      id: generateTaskId(),
      title: taskData.title,
      description: taskData.description,
      assignee: taskData.assignee,
      status: 'To Do',
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      createdBy: user.id,
      createdDate: new Date().toISOString().split('T')[0]
    };

    setTasks([...tasks, newTask]);
    setShowCreateModal(false);

    fetch(`${API_URL}/api/tasks/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask)
    }).catch(err => console.warn('Task saved locally. Backend sync failed:', err));
  };

  const assignTask = (taskId, newAssigneeId) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, assignee: newAssigneeId } : t
    ));
    setShowAssignModal(false);
    
    fetch(`${API_URL}/api/tasks/assign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, empId: newAssigneeId })
    }).catch(err => console.warn('Task reassigned locally. Backend sync failed:', err));
  };

  const updateTaskTimeline = (taskId, newDueDate) => {
    setTasks(tasks.map(t => 
      t.id === taskId ? { ...t, dueDate: newDueDate } : t
    ));

    fetch(`${API_URL}/api/tasks/update-timeline`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ taskId, dueDate: newDueDate })
    }).catch(err => console.warn('Timeline updated locally. Backend sync failed:', err));
  };

  // ISSUE MANAGEMENT FUNCTIONS
  const generateIssueId = () => {
    const maxId = Math.max(...issues.map(i => {
      const num = parseInt(i.id.split('-')[1]);
      return isNaN(num) ? 0 : num;
    }), 0);
    return `BUG-${String(maxId + 1).padStart(3, '0')}`;
  };

  const createIssue = (issueData) => {
    const newIssue = {
      id: generateIssueId(),
      title: issueData.title,
      description: issueData.description,
      reportedBy: user.id,
      assignedTo: issueData.assignedTo,
      dept: DEMO_EMPLOYEES.find(e => e.id === issueData.assignedTo)?.dept || 'DEV',
      severity: issueData.severity,
      status: 'Open',
      createdDate: new Date().toISOString().split('T')[0]
    };

    setIssues([...issues, newIssue]);
    setShowCreateIssueModal(false);
    setView('ISSUES'); // Navigate to Issues view to show the newly created issue

    fetch(`${API_URL}/api/issues/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    }).catch(err => console.warn('Issue reported locally. Backend sync failed:', err));
  };

  const updateIssueStatus = (issueId, newStatus) => {
    setIssues(issues.map(i => 
      i.id === issueId ? { ...i, status: newStatus } : i
    ));

    fetch(`${API_URL}/api/issues/update-status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId, status: newStatus })
    }).catch(err => console.warn('Issue status updated locally. Backend sync failed:', err));
  };

  const reassignIssue = (issueId, newAssigneeId) => {
    setIssues(issues.map(i => 
      i.id === issueId ? { ...i, assignedTo: newAssigneeId, dept: DEMO_EMPLOYEES.find(e => e.id === newAssigneeId)?.dept } : i
    ));
    setShowIssueDetailModal(false);

    fetch(`${API_URL}/api/issues/reassign`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ issueId, assignedTo: newAssigneeId })
    }).catch(err => console.warn('Issue reassigned locally. Backend sync failed:', err));
  };

  const login = (id) => {
    const validUser = DEMO_EMPLOYEES.find(e => e.id === id.toUpperCase());
    if (validUser) {
      setUser({ ...validUser, id: validUser.id });
    } else {
      alert('Invalid Employee ID. Try: EMP-001, DEV-001, QA-001, TL-MEDIA-01, etc.');
    }
  };

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        fetch(`${API_URL}/api/heartbeat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ empId: user.id, status: 'ACTIVE', taskId: 'NIK-101' })
        }).catch(err => console.warn('Heartbeat sync failed:', err));
      }, 60000);
      return () => clearInterval(interval);
    }
  }, [user]);

  if (!user) return <LoginScreen onLogin={login} />;

  const canAssignTasks = user && (user.role === 'PM' || user.role === 'Ass_PM' || user.role === 'TL');
  const assignableEmps = getAssignableEmployees();

  const handleUserSwitch = (empId) => {
    const selectedEmp = DEMO_EMPLOYEES.find(e => e.id === empId);
    if (selectedEmp) {
      setUser({ ...selectedEmp, id: selectedEmp.id });
    }
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <h2>📊 NIKUNJ PRO</h2>
        <div className="user-switcher-container">
          <label htmlFor="user-select">👤 Current User:</label>
          <select 
            id="user-select"
            className="user-switcher"
            value={user.id}
            onChange={(e) => handleUserSwitch(e.target.value)}
          >
            {DEMO_EMPLOYEES.map(emp => (
              <option key={`user-${emp.id}`} value={emp.id}>
                {emp.name} ({emp.role})
              </option>
            ))}
          </select>
        </div>
        <button className={view === 'DASHBOARD' ? 'active' : ''} onClick={() => setView('DASHBOARD')}>🏠 Dashboard</button>
        <button className={view === 'TASKS' ? 'active' : ''} onClick={() => setView('TASKS')}>📋 Tasks</button>
        <button className={view === 'TEAM' ? 'active' : ''} onClick={() => setView('TEAM')}>👥 Team</button>
        <button className={view === 'LIVE_MAP' ? 'active' : ''} onClick={() => setView('LIVE_MAP')}>🌐 Live Map</button>
        <button className={view === 'REPORTS' ? 'active' : ''} onClick={() => setView('REPORTS')}>📊 Reports</button>
        <button className={view === 'ISSUES' ? 'active' : ''} onClick={() => setView('ISSUES')}>🐛 Issues</button>
        <button className="create-task-btn" onClick={() => setShowCreateModal(true)}>➕ Create Task</button>
        {user && (user.role === 'QA' || user.id === 'TL-QA-01') && (
          <button className="create-task-btn" onClick={() => setShowCreateIssueModal(true)}>🐛 Report Issue</button>
        )}
        <button className="logout" onClick={() => setUser(null)}>🚪 Logout</button>
      </aside>

      <main className="content">
        <header>
          <h1>{view}</h1>
          <span>👤 {user.name} ({user.role}) | {user.dept}</span>
        </header>
        <RenderView 
          view={view} 
          user={user} 
          tasks={tasks}
          issues={issues}
          canAssignTasks={canAssignTasks}
          assignableEmps={assignableEmps}
          onAssignClick={(task) => { setSelectedTask(task); setShowAssignModal(true); }}
          onUpdateTimeline={updateTaskTimeline}
          onIssueClick={(issue) => { setSelectedIssue(issue); setShowIssueDetailModal(true); }}
          onCreateIssueClick={() => setShowCreateIssueModal(true)}
          onEmployeeClick={(emp) => { setSelectedEmployee(emp); setShowEmployeeDetailModal(true); }}
        />

        {showAssignModal && selectedTask && (
          <AssignModal
            task={selectedTask}
            assignableEmps={assignableEmps}
            onAssign={(empId) => assignTask(selectedTask.id, empId)}
            onClose={() => setShowAssignModal(false)}
          />
        )}

        {showCreateModal && (
          <CreateTaskModal
            onCreateTask={createTask}
            onClose={() => setShowCreateModal(false)}
            employees={DEMO_EMPLOYEES}
          />
        )}

        {showCreateIssueModal && (
          <CreateIssueModal
            isOpen={showCreateIssueModal}
            onClose={() => setShowCreateIssueModal(false)}
            departments={['DEV', 'MEDIA', 'CLIENT']}
            employees={DEMO_EMPLOYEES}
            selectedUser={user}
            onCreate={createIssue}
          />
        )}

        {showEmployeeDetailModal && selectedEmployee && (
          <EmployeeDetailModal
            employee={selectedEmployee}
            tasks={tasks.filter(t => t.assignee === selectedEmployee.id)}
            issues={issues.filter(i => i.assignedTo === selectedEmployee.id)}
            onClose={() => setShowEmployeeDetailModal(false)}
          />
        )}

        {showIssueDetailModal && selectedIssue && (
          <IssueDetailModal
            issue={selectedIssue}
            isOpen={showIssueDetailModal}
            employees={DEMO_EMPLOYEES}
            selectedUser={user}
            onUpdateStatus={updateIssueStatus}
            onReassign={reassignIssue}
            onClose={() => setShowIssueDetailModal(false)}
          />
        )}
      </main>
    </div>
  );
}

// SUB-COMPONENTS
function RenderView({ view, user, tasks, issues, canAssignTasks, assignableEmps, onAssignClick, onUpdateTimeline, onIssueClick, onCreateIssueClick, onEmployeeClick }) {
  if (view === 'LIVE_MAP') {
    return <LiveMapView />;
  }
  if (view === 'ISSUES') {
    return <IssuesView 
      issues={issues} 
      selectedUser={user} 
      onSelectIssue={onIssueClick}
      onCreateClick={onCreateIssueClick} 
    />;
  }
  if (view === 'TASKS') {
    return <TasksView tasks={tasks} canAssignTasks={canAssignTasks} onAssignClick={onAssignClick} />;
  }
  if (view === 'TEAM') {
    return <TeamView />;
  }
  if (view === 'REPORTS') {
    return <ReportsView />;
  }
  return <DashboardView user={user} tasks={tasks} issues={issues} canAssignTasks={canAssignTasks} onAssignClick={onAssignClick} onUpdateTimeline={onUpdateTimeline} onIssueClick={onIssueClick} onEmployeeClick={onEmployeeClick} />;
}

// DASHBOARD VIEW
function DashboardView({ user, tasks, issues, canAssignTasks, onAssignClick, onUpdateTimeline, onIssueClick, onEmployeeClick }) {
  // Get team members if user is a Team Lead
  const teamMembers = user.role === 'TL' 
    ? DEMO_EMPLOYEES.filter(e => e.dept === user.dept && e.id !== user.id)
    : [];

  // Get team data for Team Leads
  const teamTasks = user.role === 'TL'
    ? tasks.filter(t => teamMembers.some(m => m.id === t.assignee))
    : [];

  const teamIssues = user.role === 'TL'
    ? issues.filter(i => i.dept === user.dept)
    : [];

  // Show issues that are assigned to user OR reported by user (for QA/DEV/others)
  const myIssues = issues.filter(i => i.assignedTo === user.id || i.reportedBy === user.id);
  
  // Determine what to display based on role
  const displayTasks = user.role === 'TL' ? teamTasks : tasks;
  const displayMembers = user.role === 'TL' ? teamMembers : DEMO_EMPLOYEES.filter(e => e.status === 'Active').slice(0, 6);
  const displayIssues = user.role === 'PM' || user.role === 'Ass_PM' 
    ? issues 
    : user.role === 'TL' 
      ? teamIssues 
      : myIssues;
  const avgAttendance = user.role === 'TL' 
    ? Math.round((Math.floor(Math.random() * 15) + 80 + Math.floor(Math.random() * 15) + 80) / 2) 
    : null;
  
  return (
    <div className="dashboard">
      <div className="stats-container">
        <div className="stat-card">
          <h3>👥 {user.role === 'TL' ? 'Team Members' : 'Total Employees'}</h3>
          <p className="big-number">{user.role === 'TL' ? teamMembers.length : DEMO_EMPLOYEES.length}</p>
          <span className="stat-detail">{user.role === 'TL' ? `In ${user.dept}` : `Active: ${DEMO_EMPLOYEES.filter(e => e.status === 'Active').length}`}</span>
        </div>
        <div className="stat-card">
          <h3>📋 {user.role === 'TL' ? 'Team Tasks' : 'Total Tasks'}</h3>
          <p className="big-number">{displayTasks.length}</p>
          <span className="stat-detail">In Progress: {displayTasks.filter(t => t.status === 'In Progress').length}</span>
        </div>
        <div className="stat-card">
          <h3>🐛 {user.role === 'TL' ? 'Team Issues' : 'Open Issues'}</h3>
          <p className="big-number">{displayIssues.filter(i => i.status !== 'Closed').length}</p>
          <span className="stat-detail">Total: {displayIssues.length}</span>
        </div>
        {user.role === 'TL' && (
          <div className="stat-card">
            <h3>📅 Team Attendance</h3>
            <p className="big-number">{avgAttendance}%</p>
            <span className="stat-detail">Average This Month</span>
          </div>
        )}
        {user.role !== 'TL' && (
          <div className="stat-card">
            <h3>✅ Completed</h3>
            <p className="big-number">{tasks.filter(t => t.status === 'Done').length}</p>
            <span className="stat-detail">Completion Rate: {Math.round(tasks.filter(t => t.status === 'Done').length / tasks.length * 100)}%</span>
          </div>
        )}
      </div>

      {displayIssues.length > 0 && (
        <div className="recent-section">
          <h2>🐛 {user.role === 'TL' ? 'Team Issues' : 'Your Issues'}</h2>
          <div className="issue-list">
            {displayIssues.slice(0, 5).map(issue => (
              <div 
                key={`issue-${issue.id}`} 
                className={`issue-item severity-${issue.severity.toLowerCase()}`}
                onClick={() => onIssueClick(issue)}
              >
                <div className="issue-info">
                  <strong>{issue.id}</strong> - {issue.title}
                  <p className="issue-desc">{issue.description}</p>
                  <span className="issue-assignee">👤 Assigned to: {DEMO_EMPLOYEES.find(e => e.id === issue.assignedTo)?.name}</span>
                </div>
                <div className="issue-meta">
                  <span className={`status-badge status-${issue.status.toLowerCase()}`}>{issue.status}</span>
                  <span className={`severity-badge ${issue.severity.toLowerCase()}`}>{issue.severity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="recent-section">
        <h2>🎯 {user.role === 'TL' ? 'Team Tasks' : 'Recent Tasks'}</h2>
        <div className="task-list">
          {[...displayTasks].reverse().slice(0, 5).map(task => (
            <div key={task.id} className={`task-item status-${task.status.toLowerCase().replace(' ', '-')}`}>
              <div className="task-info">
                <strong>{task.id}</strong> - {task.title}
                <span className="task-timeline">📅 Due: {task.dueDate}</span>
                <span className="task-assignee">👤 Assigned to: {DEMO_EMPLOYEES.find(e => e.id === task.assignee)?.name}</span>
              </div>
              <div className="task-meta">
                <span className="status-badge">{task.status}</span>
                <span className="priority-badge">{task.priority}</span>
                {canAssignTasks && <button className="assign-btn" onClick={() => onAssignClick(task)}>✏️ Assign</button>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-section">
        <h2>👥 {user.role === 'TL' ? 'My Team Members' : 'Team Members Online'}</h2>
        <div className="emp-grid">
          {displayMembers.map(emp => (
            <div key={emp.id} className="emp-card emp-clickable" onClick={() => onEmployeeClick(emp)}>
              <div className="emp-header">
                <strong>{emp.name}</strong>
                <span className={`status-indicator ${emp.status.toLowerCase()}`}></span>
              </div>
              <p className="emp-role">{emp.role}</p>
              <p className="emp-dept">Dept: {emp.dept}</p>
              <p className="emp-time">Screen: {emp.screenTime}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// TASKS VIEW
function TasksView({ tasks, canAssignTasks, onAssignClick }) {
  const tasksByStatus = {
    'To Do': tasks.filter(t => t.status === 'To Do'),
    'In Progress': tasks.filter(t => t.status === 'In Progress'),
    'Done': tasks.filter(t => t.status === 'Done'),
  };

  return (
    <div className="tasks-view">
      <div className="kanban-board">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={`col-${status}`} className="kanban-column">
            <h3 className={`column-header status-${status.toLowerCase().replace(' ', '-')}`}>
              {status} <span className="count">{statusTasks.length}</span>
            </h3>
            <div className="tasks-column">
              {statusTasks.map(task => (
                <div key={task.id} className="kanban-card">
                  <div className="card-id">{task.id}</div>
                  <h4>{task.title}</h4>
                  <p className="card-assignee">👤 {DEMO_EMPLOYEES.find(e => e.id === task.assignee)?.name}</p>
                  <div className="card-footer">
                    <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
                    <span className="due-date">📅 {task.dueDate}</span>
                  </div>
                  {canAssignTasks && (
                    <button className="assign-btn-small" onClick={() => onAssignClick(task)}>✏️ Reassign</button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// TEAM VIEW
function TeamView() {
  return (
    <div className="team-view">
      <div className="team-grid">
        {DEMO_EMPLOYEES.map(emp => (
          <div key={emp.id} className="team-card">
            <div className="card-avatar">{emp.name.charAt(0)}</div>
            <div className="card-content">
              <h4>{emp.name}</h4>
              <p className="role">{emp.role}</p>
              <p className="dept">Department: {emp.dept}</p>
              <p className="email">{emp.id}@nikunj.com</p>
              <div className="meta">
                <span className={`status ${emp.status.toLowerCase()}`}>● {emp.status}</span>
                <span className="screen-time">⏱️ {emp.screenTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// LIVE MAP VIEW
function LiveMapView() {
  const deptStats = {
    'MGMT': DEMO_EMPLOYEES.filter(e => e.dept === 'MGMT').length,
    'DEV': DEMO_EMPLOYEES.filter(e => e.dept === 'DEV').length,
    'QA': DEMO_EMPLOYEES.filter(e => e.dept === 'QA').length,
    'MEDIA': DEMO_EMPLOYEES.filter(e => e.dept === 'MEDIA').length,
    'ID': DEMO_EMPLOYEES.filter(e => e.dept === 'ID').length,
  };

  return (
    <div className="live-map">
      <h2>🌐 Live Team Distribution</h2>
      <div className="dept-stats">
        {Object.entries(deptStats).map(([dept, count]) => (
          <div key={`dept-${dept}`} className="dept-card">
            <h3>{dept}</h3>
            <p className="count">{count} Members</p>
            <div className="members">
              {DEMO_EMPLOYEES.filter(e => e.dept === dept).map(emp => (
                <div key={`mini-${emp.id}`} className="mini-member" title={emp.name}>
                  {emp.name.charAt(0)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// REPORTS VIEW
function ReportsView() {
  const totalScreenTime = DEMO_EMPLOYEES.reduce((sum, e) => {
    const [hours] = e.screenTime.split('h');
    return sum + parseInt(hours);
  }, 0);

  return (
    <div className="reports-view">
      <div className="report-cards">
        <div className="report-card">
          <h3>📊 Productivity Report</h3>
          <p>Total Screen Time: <strong>{totalScreenTime}h</strong></p>
          <p>Average per Employee: <strong>{(totalScreenTime / DEMO_EMPLOYEES.length).toFixed(1)}h</strong></p>
          <p className="detail">Active Employees: {DEMO_EMPLOYEES.filter(e => e.status === 'Active').length}/{DEMO_EMPLOYEES.length}</p>
        </div>
        
        <div className="report-card">
          <h3>✅ Task Completion</h3>
          <p>Completed Tasks: <strong>{DEMO_TASKS.filter(t => t.status === 'Done').length}/{DEMO_TASKS.length}</strong></p>
          <p>Completion Rate: <strong>{Math.round(DEMO_TASKS.filter(t => t.status === 'Done').length / DEMO_TASKS.length * 100)}%</strong></p>
          <p className="detail">On Progress: {DEMO_TASKS.filter(t => t.status === 'In Progress').length}</p>
        </div>

        <div className="report-card">
          <h3>🎯 Department Stats</h3>
          <p>Development Team: <strong>4 members</strong></p>
          <p>QA Team: <strong>3 members</strong></p>
          <p>Management: <strong>2 members</strong></p>
        </div>
      </div>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  return (
    <div className="login">
      <input 
        id="uid" 
        placeholder="Employee ID" 
      />
      <button onClick={() => onLogin(document.getElementById('uid').value)}>Login</button>
    </div>
  );
}

// CREATE TASK MODAL
function CreateTaskModal({ onCreateTask, onClose, employees }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: employees[0]?.id || '',
    priority: 'Medium',
    dueDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.assignee && formData.dueDate) {
      onCreateTask(formData);
      setFormData({
        title: '',
        description: '',
        assignee: employees[0]?.id || '',
        priority: 'Medium',
        dueDate: ''
      });
    } else {
      alert('Please fill in all required fields');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Create New Task</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Task Title *</label>
            <input 
              id="title"
              type="text" 
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g., Build Login Page"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Task description..."
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="assignee">Assign To *</label>
              <select 
                id="assignee"
                value={formData.assignee}
                onChange={(e) => setFormData({...formData, assignee: e.target.value})}
                required
              >
                {employees.map(emp => (
                  <option key={`opt-${emp.id}`} value={emp.id}>
                    {emp.name} ({emp.role})
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select 
                id="priority"
                value={formData.priority}
                onChange={(e) => setFormData({...formData, priority: e.target.value})}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input 
              id="dueDate"
              type="date" 
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              required
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-create">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ASSIGN MODAL
function AssignModal({ task, assignableEmps, onAssign, onClose }) {
  const assignee = DEMO_EMPLOYEES.find(e => e.id === task.assignee);
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📝 Assign Task</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        
        <div className="modal-body">
          <div className="task-detail">
            <h3>{task.id} - {task.title}</h3>
            <p className="current-assignee">Currently assigned to: <strong>{assignee?.name}</strong></p>
          </div>

          <div className="assign-list">
            <h4>👥 Select Team Member:</h4>
            {assignableEmps.length === 0 ? (
              <p className="no-permission">You don't have permission to assign tasks.</p>
            ) : (
              <div className="emp-list">
                {assignableEmps.map(emp => (
                  <div 
                    key={`assign-${emp.id}`}
                    className="emp-option"
                    onClick={() => onAssign(emp.id)}
                  >
                    <div className="emp-info">
                      <strong>{emp.name}</strong>
                      <span className="emp-role-small">{emp.role}</span>
                    </div>
                    <span className="status-dot active"></span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

// Issues View Component
function IssuesView({ issues, selectedUser, onSelectIssue, onCreateClick }) {
  // Show issues based on user role:
  // 1. PM: All issues
  // 2. Ass_PM: All issues
  // 3. TL: All issues in their department
  // 4. QA/DEV/Other: Issues assigned to them or reported by them
  let userAssignedIssues;
  
  if (selectedUser.role === 'PM' || selectedUser.role === 'Ass_PM') {
    userAssignedIssues = issues; // All issues
  } else if (selectedUser.role === 'TL') {
    // Team Lead sees all issues in their department
    const tlDept = selectedUser.dept;
    userAssignedIssues = issues.filter(issue => issue.dept === tlDept);
  } else {
    // Everyone else sees only their assigned or reported issues
    userAssignedIssues = issues.filter(issue => issue.assignedTo === selectedUser.id || issue.reportedBy === selectedUser.id);
  }
  
  const [filterStatus, setFilterStatus] = React.useState('all');
  const [recentCreated, setRecentCreated] = React.useState(null);

  React.useEffect(() => {
    // Show notification for recently created issue
    if (userAssignedIssues.length > 0) {
      const newest = userAssignedIssues[userAssignedIssues.length - 1];
      setRecentCreated(newest.id);
      setTimeout(() => setRecentCreated(null), 3000); // Hide after 3 seconds
    }
  }, [userAssignedIssues.length]);

  const filteredIssues = filterStatus === 'all' 
    ? userAssignedIssues 
    : userAssignedIssues.filter(issue => issue.status === filterStatus);

  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'High': return '#d9534f';
      case 'Medium': return '#f0ad4e';
      case 'Low': return '#5cb85c';
      default: return '#5bc0de';
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Open': return '#d9534f';
      case 'In Progress': return '#f0ad4e';
      case 'Closed': return '#5cb85c';
      default: return '#5bc0de';
    }
  };

  return (
    <div className="view-container">
      <div className="view-header">
        <h2>🐛 Issues Management</h2>
        {selectedUser.role === 'QA' && (
          <button className="btn-primary" onClick={onCreateClick}>+ Report Issue</button>
        )}
      </div>

      {recentCreated && (
        <div className="notification-success">
          ✅ Issue reported successfully! View it below.
        </div>
      )}

      <div className="filter-controls">
        <label>Filter by Status:</label>
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Issues</option>
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="issue-list">
        {filteredIssues.length === 0 ? (
          <p className="empty-state">No issues assigned to you</p>
        ) : (
          filteredIssues.map(issue => (
            <div 
              key={`issue-${issue.id}`}
              className={`issue-item ${recentCreated === issue.id ? 'highlight' : ''}`}
              onClick={() => onSelectIssue(issue)}
              style={{ borderLeft: `4px solid ${getSeverityColor(issue.severity)}` }}
            >
              <div className="issue-header">
                <h3>{issue.title}</h3>
                <div className="issue-badges">
                  <span 
                    className="severity-badge" 
                    style={{ backgroundColor: getSeverityColor(issue.severity) }}
                  >
                    {issue.severity}
                  </span>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: getStatusColor(issue.status) }}
                  >
                    {issue.status}
                  </span>
                </div>
              </div>
              <p className="issue-description">{issue.description}</p>
              <div className="issue-meta">
                <span>Reported by: {issue.reportedBy}</span>
                <span>Department: {issue.dept}</span>
                <span>Created: {issue.createdDate}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

// Create Issue Modal Component
function CreateIssueModal({ isOpen, onClose, departments, employees, selectedUser, onCreate }) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    dept: 'DEV',
    assignedTo: '',
    severity: 'Medium'
  });

  if (!isOpen) return null;

  const deptEmployees = employees.filter(emp => emp.dept === formData.dept);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'dept' && { assignedTo: '' })
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.assignedTo) {
      alert('Please fill in all required fields');
      return;
    }
    onCreate({
      ...formData,
      reportedBy: selectedUser.id,
      createdDate: new Date().toLocaleDateString()
    });
    setFormData({
      title: '',
      description: '',
      dept: 'DEV',
      assignedTo: '',
      severity: 'Medium'
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🐛 Report New Issue</h2>
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="issue-title">Issue Title *</label>
            <input
              id="issue-title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of the issue"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="issue-description">Description</label>
            <textarea
              id="issue-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Detailed description of the issue"
              rows={4}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="issue-severity">Severity *</label>
            <select 
              id="issue-severity"
              name="severity" 
              value={formData.severity} 
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="issue-dept">Report To Department *</label>
            <select 
              id="issue-dept"
              name="dept" 
              value={formData.dept} 
              onChange={handleChange}
            >
              {departments.map(dept => (
                <option key={`opt-${dept}`} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="issue-assignTo">Assign To Team Member *</label>
            <select 
              id="issue-assignTo"
              name="assignedTo" 
              value={formData.assignedTo} 
              onChange={handleChange}
              required
            >
              <option value="">Select a team member</option>
              {deptEmployees.map(emp => (
                <option key={`emp-${emp.id}`} value={emp.id}>{emp.name} ({emp.id})</option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">Report Issue</button>
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Issue Detail Modal Component
function IssueDetailModal({ issue, isOpen, onClose, employees, selectedUser, onUpdateStatus, onReassign }) {
  const [showReassignForm, setShowReassignForm] = React.useState(false);
  const [newAssignee, setNewAssignee] = React.useState(issue?.assignedTo || '');

  if (!isOpen || !issue) return null;

  const assignedEmployee = employees.find(emp => emp.id === issue.assignedTo);
  const reportedByEmployee = employees.find(emp => emp.id === issue.reportedBy);
  const deptEmployees = employees.filter(emp => emp.dept === issue.dept);

  const handleStatusChange = (newStatus) => {
    onUpdateStatus(issue.id, newStatus);
  };

  const handleReassign = () => {
    if (newAssignee && newAssignee !== issue.assignedTo) {
      onReassign(issue.id, newAssignee);
      setShowReassignForm(false);
    }
  };

  const canCloseIssue = selectedUser.role === 'QA' && selectedUser.id === issue.reportedBy;

  return (
    <div className="modal-overlay">
      <div className="modal-content issue-detail-content">
        <div className="modal-header">
          <h2>{issue.title}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>

        <div className="issue-detail-body">
          <div className="issue-detail-section">
            <h3>Issue Details</h3>
            <div className="detail-row">
              <span className="label">ID:</span>
              <span className="value">{issue.id}</span>
            </div>
            <div className="detail-row">
              <span className="label">Status:</span>
              <span className={`status-badge status-${issue.status.toLowerCase()}`}>
                {issue.status}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Severity:</span>
              <span className={`severity-badge severity-${issue.severity.toLowerCase()}`}>
                {issue.severity}
              </span>
            </div>
            <div className="detail-row">
              <span className="label">Department:</span>
              <span className="value">{issue.dept}</span>
            </div>
            <div className="detail-row">
              <span className="label">Description:</span>
              <span className="value">{issue.description}</span>
            </div>
          </div>

          <div className="issue-detail-section">
            <h3>People</h3>
            <div className="detail-row">
              <span className="label">Reported By:</span>
              <span className="value">{reportedByEmployee?.name} ({issue.reportedBy})</span>
            </div>
            <div className="detail-row">
              <span className="label">Assigned To:</span>
              <span className="value">{assignedEmployee?.name} ({issue.assignedTo})</span>
            </div>
            <div className="detail-row">
              <span className="label">Created:</span>
              <span className="value">{issue.createdDate}</span>
            </div>
          </div>

          {(selectedUser.id === issue.assignedTo || selectedUser.role === 'QA') && (
            <div className="issue-detail-section">
              <h3>Actions</h3>
              
              {selectedUser.id === issue.assignedTo && issue.status !== 'Closed' && (
                <div className="action-group">
                  <label>Change Status:</label>
                  <div className="status-buttons">
                    {issue.status !== 'Open' && (
                      <button 
                        className="btn-sm btn-secondary"
                        onClick={() => handleStatusChange('Open')}
                      >
                        Mark as Open
                      </button>
                    )}
                    {issue.status !== 'In Progress' && (
                      <button 
                        className="btn-sm btn-secondary"
                        onClick={() => handleStatusChange('In Progress')}
                      >
                        Mark as In Progress
                      </button>
                    )}
                    {issue.status !== 'Closed' && (
                      <button 
                        className="btn-sm btn-primary"
                        onClick={() => handleStatusChange('Closed')}
                      >
                        Mark as Closed
                      </button>
                    )}
                  </div>
                </div>
              )}

              {selectedUser.id === issue.assignedTo && (
                <div className="action-group">
                  <button 
                    className="btn-secondary"
                    onClick={() => setShowReassignForm(!showReassignForm)}
                  >
                    {showReassignForm ? 'Cancel Reassign' : 'Reassign Issue'}
                  </button>
                  {showReassignForm && (
                    <div className="reassign-form">
                      <select 
                        value={newAssignee}
                        onChange={(e) => setNewAssignee(e.target.value)}
                      >
                        <option value="">Select team member</option>
                        {deptEmployees.map(emp => (
                          <option key={`reassign-${emp.id}`} value={emp.id}>
                            {emp.name} ({emp.id})
                          </option>
                        ))}
                      </select>
                      <button 
                        className="btn-sm btn-primary"
                        onClick={handleReassign}
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </div>
              )}

              {canCloseIssue && issue.status !== 'Closed' && (
                <div className="action-group qa-verify">
                  <button 
                    className="btn-danger"
                    onClick={() => handleStatusChange('Closed')}
                  >
                    ✓ Verify & Close Issue
                  </button>
                  <small>You can verify and close this issue as the reporter</small>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

// EMPLOYEE DETAIL MODAL
function EmployeeDetailModal({ employee, tasks, issues, onClose }) {
  const totalCoursesCreated = tasks.filter(t => t.title.toLowerCase().includes('course') || t.title.toLowerCase().includes('learning') || t.title.toLowerCase().includes('training')).length;
  
  const tasksByStatus = {
    'To Do': tasks.filter(t => t.status === 'To Do').length,
    'In Progress': tasks.filter(t => t.status === 'In Progress').length,
    'Done': tasks.filter(t => t.status === 'Done').length,
  };

  const issuesByStatus = {
    'Open': issues.filter(i => i.status === 'Open').length,
    'In Progress': issues.filter(i => i.status === 'In Progress').length,
    'Closed': issues.filter(i => i.status === 'Closed').length,
  };

  // Mock attendance data - 80% average, some days off
  const attendancePercentage = Math.floor(Math.random() * 15) + 80; // 80-95%

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content emp-detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 {employee.name} - Employee Details</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="emp-detail-body">
          {/* Employee Info Header */}
          <div className="emp-detail-section emp-info-header">
            <div className="emp-avatar-large">{employee.name.charAt(0)}</div>
            <div className="emp-info-grid">
              <div className="info-item">
                <span className="label">ID:</span>
                <span className="value">{employee.id}</span>
              </div>
              <div className="info-item">
                <span className="label">Role:</span>
                <span className="value">{employee.role}</span>
              </div>
              <div className="info-item">
                <span className="label">Department:</span>
                <span className="value">{employee.dept}</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className={`status-indicator ${employee.status.toLowerCase()}`}>● {employee.status}</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">{employee.id}@nikunj.com</span>
              </div>
              <div className="info-item">
                <span className="label">Screen Time:</span>
                <span className="value">{employee.screenTime}</span>
              </div>
            </div>
          </div>

          {/* Tasks Section */}
          <div className="emp-detail-section">
            <h3>📋 Assigned Tasks ({tasks.length})</h3>
            <div className="status-summary">
              <div className="summary-item">
                <span className="count todo">{tasksByStatus['To Do']}</span>
                <span className="label">To Do</span>
              </div>
              <div className="summary-item">
                <span className="count inprogress">{tasksByStatus['In Progress']}</span>
                <span className="label">In Progress</span>
              </div>
              <div className="summary-item">
                <span className="count done">{tasksByStatus['Done']}</span>
                <span className="label">Done</span>
              </div>
            </div>
            {tasks.length > 0 ? (
              <div className="task-list-detail">
                {tasks.map(task => (
                  <div key={`emp-task-${task.id}`} className={`task-item-small status-${task.status.toLowerCase().replace(' ', '-')}`}>
                    <strong>{task.id}</strong> - {task.title}
                    <div className="task-badges">
                      <span className="badge priority">{task.priority}</span>
                      <span className="badge status">{task.status}</span>
                      <span className="badge date">📅 {task.dueDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No tasks assigned</p>
            )}
          </div>

          {/* Issues Section */}
          <div className="emp-detail-section">
            <h3>🐛 Assigned Issues ({issues.length})</h3>
            <div className="status-summary">
              <div className="summary-item">
                <span className="count open">{issuesByStatus['Open']}</span>
                <span className="label">Open</span>
              </div>
              <div className="summary-item">
                <span className="count inprogress">{issuesByStatus['In Progress']}</span>
                <span className="label">In Progress</span>
              </div>
              <div className="summary-item">
                <span className="count closed">{issuesByStatus['Closed']}</span>
                <span className="label">Closed</span>
              </div>
            </div>
            {issues.length > 0 ? (
              <div className="issue-list-detail">
                {issues.map(issue => (
                  <div key={`emp-issue-${issue.id}`} className={`issue-item-small severity-${issue.severity.toLowerCase()}`}>
                    <strong>{issue.id}</strong> - {issue.title}
                    <div className="issue-badges">
                      <span className={`badge severity severity-${issue.severity.toLowerCase()}`}>{issue.severity}</span>
                      <span className={`badge status status-${issue.status.toLowerCase()}`}>{issue.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="empty-message">No issues assigned</p>
            )}
          </div>

          {/* Attendance & Courses Section */}
          <div className="emp-detail-section emp-metrics">
            <div className="metric-card">
              <h4>📅 Attendance</h4>
              <div className="metric-value">{attendancePercentage}%</div>
              <p className="metric-desc">Monthly attendance rate</p>
              <div className="progress-bar">
                <div className="progress-fill" style={{width: `${attendancePercentage}%`}}></div>
              </div>
            </div>

            <div className="metric-card">
              <h4>📚 Courses Created (This Month)</h4>
              <div className="metric-value">{totalCoursesCreated}</div>
              <p className="metric-desc">Training/Learning modules</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}

export default NikunjApp;
