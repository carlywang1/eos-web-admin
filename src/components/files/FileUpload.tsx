import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styles from './FileUpload.module.css';
import type { FileType } from '../../types/file';

interface FileUploadProps {
  onUpload?: (file: File, type: FileType) => void;
  inputId?: string;
}

export function FileUpload({ onUpload, inputId }: FileUploadProps) {
  const [fileType, setFileType] = useState<FileType>('other');

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      onUpload?.(file, fileType);
    });
  }, [fileType, onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <div
        {...getRootProps()}
        className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} id={inputId} />
        <span className="material-icons-outlined">cloud_upload</span>
        <p className={styles.text}>
          {isDragActive ? '松开即可上传' : '拖拽文件到此处，或点击选择文件'}
        </p>
        <p className={styles.hint}>支持 PDF、Word、Excel、PPT 等格式</p>
      </div>
      <div className={styles.typeSelect}>
        <label>文件类型：</label>
        <select value={fileType} onChange={(e) => setFileType(e.target.value as FileType)}>
          <option value="contract">合同</option>
          <option value="quote">报价</option>
          <option value="rfp">RFP</option>
          <option value="rfq">RFQ</option>
          <option value="proposal">方案</option>
          <option value="other">其他</option>
        </select>
      </div>
    </div>
  );
}
