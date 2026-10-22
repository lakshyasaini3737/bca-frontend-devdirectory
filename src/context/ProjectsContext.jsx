
import { createContext, useContext, useEffect, useState } from 'react';

const MANAGER_EMAIL = 'manager@devsphere.dev';
const STORAGE_KEY = 'devsphere_projects_v1';

const makeId = () => Math.random().toString(36).slice(2, 10);
const getNow = () => new Date().toISOString();

const createProject = (
  id, title, category, level, budget, rate, slots, weeks, skills, description, status = 'open'
) => ({
  id,
  title,
  category,
  level,
  budget,
  rate,
  slots,
  weeks,
  skills,
  description,
  status,
  ownerName: 'Demo Manager',
  ownerEmail: MANAGER_EMAIL,
  createdAt: '2026-10-01T09:00:00.000Z',
});

const INITIAL_DATA = {
  projects: [
    createProject('p1', 'Developer Portfolio Template', 'Frontend', 'Beginner', 600, 30, 2, 2, ['React', 'CSS'], 'Build a responsive portfolio template with dark mode and a contact form.'),
    createProject('p2', 'REST API for Food Delivery App', 'Backend', 'Intermediate', 1800, 45, 2, 5, ['Node.js', 'PostgreSQL'], 'Build APIs for orders, restaurants and payments.'),
    createProject('p3', 'Flutter Fitness Tracker MVP', 'Mobile', 'Intermediate', 2400, 40, 3, 6, ['Flutter', 'Firebase'], 'Create a fitness tracker with workout logs and charts.'),
    createProject('p4', 'CI/CD Pipeline on AWS', 'DevOps', 'Advanced', 1200, 55, 1, 3, ['AWS', 'Docker', 'Terraform'], 'Set up build, test and deployment pipelines.'),
    createProject('p5', 'Landing Page UI Redesign', 'Design', 'Beginner', 450, 28, 1, 1, ['Figma', 'UI'], 'Redesign a landing page with pricing and testimonials.'),
    createProject('p6', 'LLM Support Chatbot Integration', 'AI', 'Advanced', 3000, 65, 2, 6, ['Python', 'LLMs', 'React'], 'Integrate an AI assistant into a helpdesk.'),
    createProject('p7', 'E-commerce Admin Dashboard', 'Full Stack', 'Intermediate', 2800, 42, 3, 8, ['React', 'Node.js', 'MongoDB'], 'Build an admin dashboard for products and orders.'),
    {
      ...createProject('p8', 'Cypress Test Automation Suite', 'QA', 'Intermediate', 900, 32, 1, 3, ['Cypress', 'Jest'], 'Test checkout and onboarding flows.', 'in-progress'),
      createdAt: '2026-09-20T09:00:00.000Z',
    },
  ],
  applications: [
    {
      id: 'a1',
      projectId: 'p8',
      name: 'Neha Gupta',
      email: 'neha.gupta@devsphere.dev',
      note: 'I have experience building Cypress test suites.',
      hours: 15,
      status: 'approved',
      createdAt: '2026-09-21T10:00:00.000Z',
    },
  ],
  messages: [
    {
      id: 'm1',
      projectId: 'p8',
      name: 'Demo Manager',
      email: MANAGER_EMAIL,
      text: 'Welcome Neha! Start with the checkout flow and share a PR by Friday.',
      createdAt: '2026-09-22T09:30:00.000Z',
    },
  ],
};

function loadData() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (
      saved &&
      Array.isArray(saved.projects) &&
      Array.isArray(saved.applications) &&
      Array.isArray(saved.messages)
    ) {
      return saved;
    }
  } catch {
    // Use demo data if saved data cannot be read.
  }

  return INITIAL_DATA;
}

const ProjectsContext = createContext(null);

export function ProjectsProvider({ children }) {
  const [db, setDb] = useState(loadData);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
    } catch {
      // Ignore browser storage errors.
    }
  }, [db]);

  const addProject = (data, owner) => {
    const id = makeId();

    setDb((current) => ({
      ...current,
      projects: [
        {
          ...data,
          id,
          status: 'open',
          ownerName: owner.name,
          ownerEmail: owner.email,
          createdAt: getNow(),
        },
        ...current.projects,
      ],
    }));

    return id;
  };

  const applyToProject = (projectId, user, note, hours) => {
    setDb((current) => ({
      ...current,
      applications: [
        ...current.applications,
        {
          id: makeId(),
          projectId,
          name: user.name,
          email: user.email,
          note,
          hours,
          status: 'pending',
          createdAt: getNow(),
        },
      ],
    }));
  };

  const decideApplication = (appId, status) => {
    setDb((current) => {
      const applications = current.applications.map((application) =>
        application.id === appId ? { ...application, status } : application
      );

      const selected = applications.find((application) => application.id === appId);
      if (!selected) return { ...current, applications };

      const project = current.projects.find((item) => item.id === selected.projectId);
      if (!project) return { ...current, applications };

      const approvedCount = applications.filter(
        (application) =>
          application.projectId === project.id && application.status === 'approved'
      ).length;

      const projects = current.projects.map((item) =>
        item.id === project.id &&
        item.status === 'open' &&
        approvedCount >= item.slots
          ? { ...item, status: 'in-progress' }
          : item
      );

      return { ...current, applications, projects };
    });
  };

  const setStatus = (projectId, status) => {
    setDb((current) => ({
      ...current,
      projects: current.projects.map((project) =>
        project.id === projectId ? { ...project, status } : project
      ),
    }));
  };

  const postMessage = (projectId, user, messageText) => {
    setDb((current) => ({
      ...current,
      messages: [
        ...current.messages,
        {
          id: makeId(),
          projectId,
          name: user.name,
          email: user.email,
          text: messageText,
          createdAt: getNow(),
        },
      ],
    }));
  };

  const resetDemo = () => setDb(INITIAL_DATA);

  const isOwner = (project, user) =>
    Boolean(
      user &&
      project.ownerEmail &&
      user.email &&
      project.ownerEmail.toLowerCase() === user.email.toLowerCase()
    );

  const team = (projectId) =>
    db.applications.filter(
      (application) =>
        application.projectId === projectId && application.status === 'approved'
    );

  const applicationsFor = (projectId) =>
    db.applications.filter((application) => application.projectId === projectId);

  const myApplication = (projectId, user) =>
    user &&
    db.applications.find(
      (application) =>
        application.projectId === projectId && application.email === user.email
    );

  const value = {
    ...db,
    isOwner,
    team,
    applicationsFor,
    myApplication,
    addProject,
    applyToProject,
    decideApplication,
    setStatus,
    postMessage,
    resetDemo,
  };

  return (
    <ProjectsContext.Provider value={value}>
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectsContext);

  if (!context) {
    throw new Error('useProjects must be used inside <ProjectsProvider>');
  }

  return context;
}

export const money = (amount) =>
  `$${Number(amount).toLocaleString('en-US')}`;

export const payout = (project) =>
  project.slots > 0 ? Math.round(project.budget / project.slots) : 0;
