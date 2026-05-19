import { ProjectList } from '../components/projects/ProjectList';
import { mockProjects } from '../mocks/projects';

export function ProjectListPage() {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '2px' }}>我的项目</h1>
        <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)' }}>跟踪所有项目的进展</p>
      </div>
      <ProjectList projects={mockProjects} />
    </div>
  );
}
