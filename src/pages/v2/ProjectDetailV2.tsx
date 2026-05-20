import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from './ProjectDetailV2.module.css';
import { ProgressTrack } from '../../components/common/ProgressTrack';
import { getProjects } from '../../mocks/projects';
import { getFiles } from '../../mocks/files';
import { FilePreview } from '../../components/files/FilePreview';
import type { ProjectFile } from '../../types/file';

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ProjectDetailV2() {
  const { t, i18n } = useTranslation();
  const { projectId } = useParams<{ projectId: string }>();
  const projects = getProjects(i18n.language);
  const allFiles = getFiles(i18n.language);
  const project = projects.find((p) => p.id === projectId);
  const files = allFiles[projectId || ''] || [];
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);
  const [templateFile, setTemplateFile] = useState<ProjectFile | null>(null);
  const [templateType, setTemplateType] = useState('contract-template');

  if (!project) {
    return <div className={styles.empty}>{t('detail.notFound')}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link to="/projects" className={styles.backLink}>
          <span className="material-icons-outlined">arrow_back</span>
        </Link>
        <span className={styles.projectName}>{project.name}</span>
      </div>

      <div className={styles.infoCard}>
        <div className={styles.infoRow}>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{t('detail.type')}</span>
            <span className={styles.infoValue}>
              {project.types.map((tp) => tp.toUpperCase()).join(' / ')}
            </span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{t('detail.client')}</span>
            <span className={styles.infoValue}>{project.client}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{t('detail.manager')}</span>
            <span className={styles.infoValue}>{project.manager}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.infoLabel}>{t('detail.stage')}</span>
            <span className={styles.infoValue}>{project.stageLabel}</span>
          </div>
          {project.eta && (
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>{t('detail.eta')}</span>
              <span className={styles.infoValue}>{project.eta}</span>
            </div>
          )}
        </div>
      </div>

      <div className={styles.progressCard}>
        <ProgressTrack steps={project.steps} />
      </div>

      <div className={styles.filesCard}>
        <div className={styles.filesHeader}>
          <span>{t('detail.projectFiles')} ({files.length})</span>
        </div>
        <div className={styles.tableHead}>
          <span>{t('detail.columns.fileName')}</span>
          <span>{t('detail.columns.phase')}</span>
          <span>{t('detail.columns.size')}</span>
          <span>{t('detail.columns.uploader')}</span>
          <span>{t('detail.columns.time')}</span>
          <span>{t('detail.columns.actions')}</span>
        </div>
        {files.map((file) => (
          <div key={file.id} className={styles.tableRow} onClick={() => setPreviewFile(file)}>
            <span className={styles.fileName}>
              <span className="material-icons-outlined">
                {file.name.endsWith('.pdf') ? 'picture_as_pdf' : 'description'}
              </span>
              {file.name}
            </span>
            <span><span className={styles.phaseTag}>{t(`detail.phases.${file.phase}`)}</span></span>
            <span>{formatSize(file.size)}</span>
            <span>{file.uploadedBy}</span>
            <span>{file.uploadedAt}</span>
            <span className={styles.actions} onClick={(e) => e.stopPropagation()}>
              <button className={styles.actionBtn} title={t('detail.download')}>
                <span className="material-icons-outlined">download</span>
              </button>
              <button className={styles.actionBtn} title={t('detail.saveAsTemplate')} onClick={() => setTemplateFile(file)}>
                <span className="material-icons-outlined">file_copy</span>
              </button>
            </span>
          </div>
        ))}
        {files.length === 0 && (
          <div className={styles.emptyRow}>{t('detail.noFiles')}</div>
        )}
      </div>

      <FilePreview file={previewFile} onClose={() => setPreviewFile(null)} />

      {templateFile && (
        <div className={styles.overlay} onClick={() => setTemplateFile(null)}>
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.dialogTitle}>{t('detail.saveAsTemplate')}</h3>
            <p className={styles.dialogText}>
              {t('detail.confirmTemplate', { name: templateFile.name })}
            </p>
            <div className={styles.dialogField}>
              <label className={styles.dialogLabel}>{t('templates.selectType')}</label>
              <select
                className={styles.dialogSelect}
                value={templateType}
                onChange={(e) => setTemplateType(e.target.value)}
              >
                <option value="contract-template">{t('templates.types.contract-template')}</option>
                <option value="quote-template">{t('templates.types.quote-template')}</option>
                <option value="proposal-template">{t('templates.types.proposal-template')}</option>
                <option value="other">{t('templates.types.other')}</option>
              </select>
            </div>
            <div className={styles.dialogActions}>
              <button className={styles.dialogCancel} onClick={() => setTemplateFile(null)}>
                {t('detail.cancel')}
              </button>
              <button className={styles.dialogConfirm} onClick={() => setTemplateFile(null)}>
                {t('detail.confirm')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
