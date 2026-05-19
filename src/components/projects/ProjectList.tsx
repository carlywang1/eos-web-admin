import { useState, useMemo } from 'react';
import { ProjectCard } from './ProjectCard';
import styles from './ProjectList.module.css';
import type { Project, ProjectType } from '../../types/project';

interface ProjectListProps {
  projects: Project[];
}

type SortOrder = 'desc' | 'asc';

export function ProjectList({ projects }: ProjectListProps) {
  const [showCompleted, setShowCompleted] = useState(false);
  const [activeTypes, setActiveTypes] = useState<ProjectType[]>(['saas', 'raas', 'ai-agents', 'apps']);
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = projects;

    if (!showCompleted) {
      result = result.filter((p) => !p.completed);
    }

    if (activeTypes.length < 4) {
      result = result.filter((p) => p.types.some((t) => activeTypes.includes(t)));
    }

    result = [...result].sort((a, b) => {
      const diff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return sortOrder === 'desc' ? diff : -diff;
    });

    return result;
  }, [projects, showCompleted, activeTypes, sortOrder]);

  const toggleType = (type: ProjectType) => {
    setActiveTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={(e) => setShowCompleted(e.target.checked)}
          />
          显示已完成
        </label>
        <div className={styles.spacer} />
        <div className={styles.filterWrapper}>
          <button
            className={styles.filterBtn}
            onClick={() => setFilterOpen(!filterOpen)}
          >
            <span className="material-icons-outlined">tune</span>
          </button>
          {filterOpen && (
            <div className={styles.dropdown}>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>类型</div>
                {(['saas', 'raas', 'ai-agents', 'apps'] as ProjectType[]).map((type) => (
                  <label className={styles.filterOption} key={type}>
                    <input
                      type="checkbox"
                      checked={activeTypes.includes(type)}
                      onChange={() => toggleType(type)}
                    />
                    {type === 'saas' ? 'SaaS' : type === 'raas' ? 'RaaS' : type === 'ai-agents' ? 'AI Agents' : 'Apps'}
                  </label>
                ))}
              </div>
              <div className={styles.section}>
                <div className={styles.sectionTitle}>排序</div>
                <div
                  className={`${styles.sortOption} ${sortOrder === 'desc' ? styles.active : ''}`}
                  onClick={() => setSortOrder('desc')}
                >
                  <span className="material-icons-outlined">south</span>
                  最近更新
                </div>
                <div
                  className={`${styles.sortOption} ${sortOrder === 'asc' ? styles.active : ''}`}
                  onClick={() => setSortOrder('asc')}
                >
                  <span className="material-icons-outlined">north</span>
                  最早更新
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={styles.list}>
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>
            <span className="material-icons-outlined">folder_open</span>
            <p>没有匹配的项目</p>
          </div>
        )}
      </div>
    </div>
  );
}
