import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProjectListV2.module.css';
import { getProjects } from '../../mocks/projects';
import type { ProjectType, ProjectStage } from '../../types/project';

function getStageStyle(stage: ProjectStage) {
  if (stage === 'implementation') return 'active';
  if (stage === 'requirements-review' || stage === 'quotation') return 'warning';
  if (stage === 'contract' || stage === 'delivery') return 'info';
  if (stage === 'live') return 'done';
  return 'active';
}

export function ProjectListV2() {
  const { t, i18n } = useTranslation();
  const [stageFilter, setStageFilter] = useState<ProjectStage | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<Set<ProjectType>>(new Set());
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const typeMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showTypeMenu) return;
    const handler = (e: MouseEvent) => {
      if (typeMenuRef.current && !typeMenuRef.current.contains(e.target as Node)) {
        setShowTypeMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTypeMenu]);

  const projects = getProjects(i18n.language);

  const stageFilters: { value: ProjectStage | 'all'; label: string }[] = [
    { value: 'all', label: t('projects.all') },
    { value: 'requirements-review', label: t('projects.stages.requirementsReview') },
    { value: 'quotation', label: t('projects.stages.quotation') },
    { value: 'contract', label: t('projects.stages.contract') },
    { value: 'implementation', label: t('projects.stages.implementation') },
    { value: 'delivery', label: t('projects.stages.delivery') },
    { value: 'live', label: t('projects.stages.live') },
  ];

  const typeOptions: { value: ProjectType; label: string }[] = [
    { value: 'saas', label: t('projects.types.saas') },
    { value: 'raas', label: t('projects.types.raas') },
    { value: 'ai-agents', label: t('projects.types.aiAgents') },
    { value: 'apps', label: t('projects.types.apps') },
  ];

  const filtered = projects.filter((p) => {
    const matchStage = stageFilter === 'all' || p.stage === stageFilter;
    const matchType = typeFilter.size === 0 || p.types.some((t) => typeFilter.has(t));
    return matchStage && matchType;
  });

  return (
    <div className={styles.page}>
      <h1>{t('projects.title')}</h1>
      <div className={styles.toolbar}>
        <div className={styles.filters}>
          {stageFilters.map((f) => (
            <button
              key={f.value}
              className={`${styles.filterBtn} ${stageFilter === f.value ? styles.active : ''}`}
              onClick={() => setStageFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className={styles.typeFilterWrap} ref={typeMenuRef}>
          <button
            className={`${styles.filterIconBtn} ${typeFilter.size > 0 ? styles.filterActive : ''}`}
            onClick={() => setShowTypeMenu(!showTypeMenu)}
            title={t('projects.allTypes')}
          >
            <span className="material-icons-outlined">tune</span>
          </button>
          {showTypeMenu && (
            <div className={styles.typeMenu}>
              {typeOptions.map((tp) => {
                const checked = typeFilter.has(tp.value);
                return (
                  <button
                    key={tp.value}
                    className={`${styles.typeMenuItem} ${checked ? styles.typeMenuActive : ''}`}
                    onClick={() => {
                      const next = new Set(typeFilter);
                      if (checked) next.delete(tp.value);
                      else next.add(tp.value);
                      setTypeFilter(next);
                    }}
                  >
                    <span className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
                      {checked && <span className="material-icons-outlined">check</span>}
                    </span>
                    {tp.label}
                  </button>
                );
              })}
              {typeFilter.size > 0 && (
                <button
                  className={styles.typeMenuClear}
                  onClick={() => { setTypeFilter(new Set()); setShowTypeMenu(false); }}
                >
                  {t('projects.all')}
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={styles.table}>
        <div className={styles.tableHead}>
          <span>{t('projects.columns.name')}</span>
          <span>{t('projects.columns.source')}</span>
          <span>{t('projects.columns.client')}</span>
          <span>{t('projects.columns.stage')}</span>
          <span>{t('projects.columns.updatedAt')}</span>
        </div>
        {filtered.map((project) => (
          <Link key={project.id} to={`/projects/${project.id}`} className={styles.tableRow}>
            <span className={styles.projectName}>
              {project.name}
            </span>
            <span className={styles.sourceCell}>{project.source.toUpperCase()}</span>
            <span>{project.client}</span>
            <span>
              <span className={`${styles.stageChip} ${styles[getStageStyle(project.stage)]}`}>
                {project.stageLabel}
              </span>
            </span>
            <span>{project.latestUpdate.time}</span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className={styles.empty}>{t('projects.noProjects')}</div>
        )}
      </div>
    </div>
  );
}
