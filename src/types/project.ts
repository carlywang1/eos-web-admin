export interface ProjectMilestone {
  id: string;
  title: string;
  status: 'done' | 'current' | 'pending';
  date: string;
}

export interface ProjectStep {
  label: string;
  status: 'done' | 'current' | 'pending';
}

export type ProjectType = 'saas' | 'raas' | 'ai-agents' | 'apps';

export type ProjectStage =
  | 'submitted'
  | 'requirements-review'
  | 'quotation'
  | 'contract'
  | 'implementation'
  | 'delivery'
  | 'acceptance'
  | 'live';

export type ProjectSource = 'mkp' | 'teams-bot';

export interface Project {
  id: string;
  name: string;
  client: string;
  manager: string;
  types: ProjectType[];
  source: ProjectSource;
  stage: ProjectStage;
  stageLabel: string;
  eta?: string;
  steps: ProjectStep[];
  milestones?: ProjectMilestone[];
  latestUpdate: {
    icon: string;
    text: string;
    time: string;
  };
  completed: boolean;
  updatedAt: string;
}
