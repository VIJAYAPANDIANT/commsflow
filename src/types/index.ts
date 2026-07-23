export type WorkspaceType = 'engineering' | 'hr' | 'finance' | 'marketing' | 'support' | 'operations';

export interface TemplateItem {
  id: string;
  title: string;
  category: string;
  updated: string;
  pinned: boolean;
  favorite: boolean;
  workspace: WorkspaceType;
  previewColor: string;
  htmlContent?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}
