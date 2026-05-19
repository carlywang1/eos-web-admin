import { Link } from 'react-router-dom';
import styles from './ProjectCard.module.css';
import { Badge } from '../common/Badge';
import { StageChip } from '../common/StageChip';
import { ProgressTrack } from '../common/ProgressTrack';
import { MilestoneList } from './MilestoneList';
import type { Project } from '../../types/project';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`} className={styles.card}>
      <div className={styles.header}>
        <div className={styles.info}>
          <h3 className={styles.name}>{project.name}</h3>
          <div className={styles.meta}>
            <span className={styles.metaItem}>
              <span className="material-icons-outlined">person_outline</span>
              {project.manager}
            </span>
            {project.eta && (
              <span className={styles.metaItem}>
                <span className="material-icons-outlined">event_available</span>
                {project.eta}
              </span>
            )}
          </div>
        </div>
        <div className={styles.badges}>
          {project.types.map((t) => (
            <Badge key={t} type={t} />
          ))}
          <StageChip stage={project.stage} label={project.stageLabel} />
        </div>
      </div>

      <ProgressTrack steps={project.steps} />

      {project.milestones && project.milestones.length > 0 && (
        <div onClick={(e) => e.preventDefault()}>
          <MilestoneList milestones={project.milestones} />
        </div>
      )}

      <div className={styles.update}>
        <span className="material-icons-outlined">{project.latestUpdate.icon}</span>
        <span className={styles.updateText}>{project.latestUpdate.text}</span>
        <span className={styles.updateTime}>{project.latestUpdate.time}</span>
      </div>
    </Link>
  );
}
