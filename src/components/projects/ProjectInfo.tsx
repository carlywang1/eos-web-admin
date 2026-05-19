import { Link } from 'react-router-dom';
import styles from './ProjectInfo.module.css';
import { Badge } from '../common/Badge';
import { StageChip } from '../common/StageChip';
import { ProgressTrack } from '../common/ProgressTrack';
import { MilestoneList } from './MilestoneList';
import type { Project } from '../../types/project';

interface ProjectInfoProps {
  project: Project;
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  return (
    <div className={styles.container}>
      <Link to="/" className={styles.back}>
        <span className="material-icons-outlined">arrow_back</span>
        返回项目列表
      </Link>

      <div className={styles.card}>
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{project.name}</h1>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {project.types.map((t) => <Badge key={t} type={t} />)}
              <StageChip stage={project.stage} label={project.stageLabel} />
            </div>
          </div>
        </div>

        <div className={styles.metaGrid}>
          <div className={styles.metaItem}>
            <span className="material-icons-outlined">business</span>
            <span className={styles.metaLabel}>客户</span>
            <span className={styles.metaValue}>{project.client}</span>
          </div>
          <div className={styles.metaItem}>
            <span className="material-icons-outlined">person_outline</span>
            <span className={styles.metaLabel}>负责人</span>
            <span className={styles.metaValue}>{project.manager}</span>
          </div>
          {project.eta && (
            <div className={styles.metaItem}>
              <span className="material-icons-outlined">event_available</span>
              <span className={styles.metaLabel}>ETA</span>
              <span className={styles.metaValue}>{project.eta}</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: '20px' }}>
          <ProgressTrack steps={project.steps} />
        </div>

        {project.milestones && project.milestones.length > 0 && (
          <MilestoneList milestones={project.milestones} />
        )}
      </div>
    </div>
  );
}
