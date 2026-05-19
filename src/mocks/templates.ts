import type { TemplateFile } from '../types/file';

const templatesZh: TemplateFile[] = [
  { id: 't1', name: '标准SaaS服务合同模板.docx', type: 'contract-template', size: 450000, uploadedAt: '2026-03-01', url: '#' },
  { id: 't2', name: 'RaaS硬件采购合同模板.docx', type: 'contract-template', size: 520000, uploadedAt: '2026-03-15', url: '#' },
  { id: 't3', name: '产品报价单模板.xlsx', type: 'quote-template', size: 180000, uploadedAt: '2026-02-20', url: '#' },
  { id: 't4', name: '解决方案模板.pptx', type: 'proposal-template', size: 2800000, uploadedAt: '2026-04-05', url: '#' },
  { id: 't5', name: '项目验收报告模板.docx', type: 'other', size: 320000, uploadedAt: '2026-01-10', url: '#' },
];

const templatesEn: TemplateFile[] = [
  { id: 't1', name: 'Standard_SaaS_Contract_Template.docx', type: 'contract-template', size: 450000, uploadedAt: '2026-03-01', url: '#' },
  { id: 't2', name: 'RaaS_Hardware_Contract_Template.docx', type: 'contract-template', size: 520000, uploadedAt: '2026-03-15', url: '#' },
  { id: 't3', name: 'Product_Quotation_Template.xlsx', type: 'quote-template', size: 180000, uploadedAt: '2026-02-20', url: '#' },
  { id: 't4', name: 'Solution_Template.pptx', type: 'proposal-template', size: 2800000, uploadedAt: '2026-04-05', url: '#' },
  { id: 't5', name: 'Acceptance_Report_Template.docx', type: 'other', size: 320000, uploadedAt: '2026-01-10', url: '#' },
];

export function getTemplates(lang: string): TemplateFile[] {
  return lang === 'en' ? templatesEn : templatesZh;
}

export const mockTemplates: TemplateFile[] = templatesZh;
