import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProjectListV2.module.css';
import { getProjects } from '../../mocks/projects';
import type { Project, ProjectType, ProjectStage } from '../../types/project';

type ViewFilter = 'all' | 'sales' | 'pm' | 'completed';

function isEstablished(project: Project): boolean {
  if (project.steps.length <= 3) return true;
  const contractStep = project.steps.find((s) => s.label === '签约' || s.label === 'Contract');
  return contractStep ? contractStep.status === 'done' : false;
}

function getStageStyle(stage: ProjectStage) {
  if (stage === 'implementation' || stage === 'delivery') return 'active';
  if (stage === 'requirements-review' || stage === 'quotation') return 'warning';
  if (stage === 'contract') return 'info';
  if (stage === 'live') return 'done';
  return 'active';
}

export function ProjectListV2() {
  const { t, i18n } = useTranslation();
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [typeFilter, setTypeFilter] = useState<Set<ProjectType>>(new Set());
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const typeMenuRef = useRef<HTMLDivElement>(null);
  const viewMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showTypeMenu && !showViewMenu) return;
    const handler = (e: MouseEvent) => {
      if (showTypeMenu && typeMenuRef.current && !typeMenuRef.current.contains(e.target as Node)) {
        setShowTypeMenu(false);
      }
      if (showViewMenu && viewMenuRef.current && !viewMenuRef.current.contains(e.target as Node)) {
        setShowViewMenu(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showTypeMenu, showViewMenu]);

  const projects = getProjects(i18n.language);

  const viewOptions: { value: ViewFilter; label: string }[] = [
    { value: 'all', label: t('projects.views.all') },
    { value: 'sales', label: t('projects.views.sales') },
    { value: 'pm', label: t('projects.views.pm') },
    { value: 'completed', label: t('projects.views.completed') },
  ];

  const typeOptions: { value: ProjectType; label: string }[] = [
    { value: 'saas', label: t('projects.types.saas') },
    { value: 'raas', label: t('projects.types.raas') },
    { value: 'ai-agents', label: t('projects.types.aiAgents') },
    { value: 'apps', label: t('projects.types.apps') },
  ];

  const filtered = projects.filter((p) => {
    let matchView = true;
    if (viewFilter === 'sales') matchView = !isEstablished(p);
    else if (viewFilter === 'pm') matchView = isEstablished(p) && p.stage !== 'live';
    else if (viewFilter === 'completed') matchView = p.stage === 'live';
    const matchType = typeFilter.size === 0 || p.types.some((t) => typeFilter.has(t));
    return matchView && matchType;
  });

  const currentViewLabel = viewOptions.find((v) => v.value === viewFilter)?.label;

  return (
    <div className={styles.page}>
      <h1>{t('projects.title')}</h1>
      <div className={styles.toolbar}>
        <div className={styles.viewFilterWrap} ref={viewMenuRef}>
          <button
            className={styles.viewBtn}
            onClick={() => setShowViewMenu(!showViewMenu)}
          >
            <span>{currentViewLabel}</span>
            <span className="material-icons-outlined">expand_more</span>
          </button>
          {showViewMenu && (
            <div className={styles.viewMenu}>
              {viewOptions.map((v) => (
                <button
                  key={v.value}
                  className={`${styles.viewMenuItem} ${viewFilter === v.value ? styles.viewMenuActive : ''}`}
                  onClick={() => { setViewFilter(v.value); setShowViewMenu(false); }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          )}
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
