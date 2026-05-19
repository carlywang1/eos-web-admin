import type { Project } from './project';
import type { ProjectFile, TemplateFile } from './file';

export type SearchResultType = 'project' | 'file' | 'template';

export interface SearchResultItem {
  type: SearchResultType;
  id: string;
  title: string;
  subtitle: string;
  project?: Project;
  file?: ProjectFile;
  template?: TemplateFile;
}
