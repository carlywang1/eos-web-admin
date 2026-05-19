import styles from './ProgressTrack.module.css';

interface Step {
  label: string;
  status: 'done' | 'current' | 'pending';
}

interface ProgressTrackProps {
  steps: Step[];
}

export function ProgressTrack({ steps }: ProgressTrackProps) {
  return (
    <div className={styles.track}>
      <div className={styles.steps}>
        {steps.map((step, i) => (
          <div className={styles.step} key={i}>
            <div className={`${styles.dot} ${styles[step.status]}`} />
            {i < steps.length - 1 && (
              <div className={`${styles.line} ${step.status === 'done' ? styles.done : ''}`} />
            )}
          </div>
        ))}
      </div>
      <div className={styles.labels}>
        {steps.map((step, i) => (
          <span key={i} className={styles[step.status]}>{step.label}</span>
        ))}
      </div>
    </div>
  );
}
