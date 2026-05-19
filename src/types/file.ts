export type FileType = 'contract' | 'quote' | 'rfp' | 'rfq' | 'proposal' | 'other';

export type TemplateType = 'contract-template' | 'quote-template' | 'proposal-template' | 'other';

export type ProjectPhase = 'pre-sales' | 'contract' | 'execution' | 'acceptance';

export interface ProjectFile {
  id: string;
  name: string;
  type: FileType;
  phase: ProjectPhase;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
  source: 'ai' | 'manual';
  emailSent?: boolean;
  url: string;
}

export interface TemplateFile {
  id: string;
  name: string;
  type: TemplateType;
  size: number;
  uploadedAt: string;
  url: string;
}
