import { useState } from 'react';
import styles from './MilestoneList.module.css';
import type { ProjectMilestone } from '../../types/project';

interface MilestoneListProps {
  milestones: ProjectMilestone[];
}

const iconMap: Record<string, string> = {
  done: 'check_circle',
  current: 'arrow_circle_right',
  pending: 'radio_button_unchecked',
};

export function MilestoneList({ milestones }: MilestoneListProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div
        className={`${styles.toggle} ${open ? styles.open : ''}`}
        onClick={() => setOpen(!open)}
      >
        <span className="material-icons-outlined">expand_more</span>
        里程碑
      </div>
      {open && (
        <div className={styles.list}>
          {milestones.map((m) => (
            <div className={styles.item} key={m.id}>
              <div className={`${styles.icon} ${styles[m.status]}`}>
                <span className="material-icons-outlined">{iconMap[m.status]}</span>
              </div>
              <span className={`${styles.text} ${styles[m.status]}`}>{m.title}</span>
              <span className={styles.date}>{m.date}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
