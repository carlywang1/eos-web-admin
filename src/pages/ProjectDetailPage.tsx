import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProjectInfo } from '../components/projects/ProjectInfo';
import { FileCard } from '../components/files/FileCard';
import { FilePreview } from '../components/files/FilePreview';
import { mockProjects } from '../mocks/projects';
import { mockFiles } from '../mocks/files';
import type { ProjectFile } from '../types/file';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = mockProjects.find((p) => p.id === projectId);
  const files = mockFiles[projectId || ''] || [];
  const [previewFile, setPreviewFile] = useState<ProjectFile | null>(null);

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--md-on-surface-dim)' }}>
        <span className="material-icons-outlined" style={{ fontSize: '48px', marginBottom: '12px', opacity: 0.5 }}>error_outline</span>
        <p>项目不存在</p>
      </div>
    );
  }

  return (
    <div>
      <ProjectInfo project={project} />

      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 500, marginBottom: '16px' }}>项目文件</h2>
        <div style={{ border: '1px solid var(--md-outline)', borderRadius: 'var(--md-radius-md)', background: 'var(--md-surface)', overflow: 'hidden' }}>
          {files.length > 0 ? (
            files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                showPhase
                onClick={setPreviewFile}
                onSaveAsTemplate={() => {}}
              />
            ))
          ) : (
            <div style={{ padding: '24px', textAlign: 'center', fontSize: '13px', color: 'var(--md-on-surface-dim)' }}>
              暂无文件
            </div>
          )}
        </div>
      </div>

      <FilePreview file={previewFile} onClose={() => setPreviewFile(null)} />
    </div>
  );
}
