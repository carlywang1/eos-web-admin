import type { ProjectFile } from '../types/file';

const filesZh: Record<string, ProjectFile[]> = {
  '1': [
    { id: 'f1', name: 'OMS系统采购合同_v3.pdf', type: 'contract', phase: 'contract', size: 2400000, uploadedAt: '2026-04-15', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f2', name: 'OMS报价方案_final.pdf', type: 'quote', phase: 'pre-sales', size: 1800000, uploadedAt: '2026-04-10', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f3', name: '实施计划书_草稿.docx', type: 'proposal', phase: 'execution', size: 560000, uploadedAt: '2026-05-08', uploadedBy: '王经理', source: 'manual', url: '#' },
    { id: 'f4', name: '数据迁移方案.pdf', type: 'proposal', phase: 'execution', size: 980000, uploadedAt: '2026-05-12', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '2': [
    { id: 'f5', name: 'AGV定制需求规格书.pdf', type: 'rfp', phase: 'pre-sales', size: 3200000, uploadedAt: '2026-03-20', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f6', name: '供应商A报价单.pdf', type: 'rfq', phase: 'pre-sales', size: 1200000, uploadedAt: '2026-04-01', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f7', name: '供应商B报价单.pdf', type: 'rfq', phase: 'pre-sales', size: 1100000, uploadedAt: '2026-04-02', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
    { id: 'f8', name: 'AGV采购合同.pdf', type: 'contract', phase: 'contract', size: 4500000, uploadedAt: '2026-04-20', uploadedBy: '李经理', source: 'manual', emailSent: true, url: '#' },
    { id: 'f9', name: '现场部署方案.docx', type: 'proposal', phase: 'execution', size: 2100000, uploadedAt: '2026-05-10', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '4': [
    { id: 'f10', name: '堆场调度需求初稿.pdf', type: 'rfp', phase: 'pre-sales', size: 890000, uploadedAt: '2026-05-15', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '5': [
    { id: 'f11', name: 'FMS系统合同.pdf', type: 'contract', phase: 'contract', size: 2800000, uploadedAt: '2026-05-05', uploadedBy: '陈经理', source: 'manual', emailSent: true, url: '#' },
    { id: 'f12', name: '车辆数据接口文档.pdf', type: 'proposal', phase: 'execution', size: 1500000, uploadedAt: '2026-05-14', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '6': [
    { id: 'f13', name: 'AI客服系统报价_v2.pdf', type: 'quote', phase: 'pre-sales', size: 1600000, uploadedAt: '2026-05-18', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '7': [
    { id: 'f14', name: '智慧园区报价方案.pdf', type: 'quote', phase: 'pre-sales', size: 2200000, uploadedAt: '2026-05-10', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
    { id: 'f15', name: '智慧园区合同_待签署.pdf', type: 'contract', phase: 'contract', size: 3800000, uploadedAt: '2026-05-19', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
};

const filesEn: Record<string, ProjectFile[]> = {
  '1': [
    { id: 'f1', name: 'OMS_Procurement_Contract_v3.pdf', type: 'contract', phase: 'contract', size: 2400000, uploadedAt: '2026-04-15', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f2', name: 'OMS_Quotation_Final.pdf', type: 'quote', phase: 'pre-sales', size: 1800000, uploadedAt: '2026-04-10', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f3', name: 'Implementation_Plan_Draft.docx', type: 'proposal', phase: 'execution', size: 560000, uploadedAt: '2026-05-08', uploadedBy: 'Manager Wang', source: 'manual', url: '#' },
    { id: 'f4', name: 'Data_Migration_Plan.pdf', type: 'proposal', phase: 'execution', size: 980000, uploadedAt: '2026-05-12', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '2': [
    { id: 'f5', name: 'AGV_Custom_Requirements_Spec.pdf', type: 'rfp', phase: 'pre-sales', size: 3200000, uploadedAt: '2026-03-20', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f6', name: 'Supplier_A_Quotation.pdf', type: 'rfq', phase: 'pre-sales', size: 1200000, uploadedAt: '2026-04-01', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f7', name: 'Supplier_B_Quotation.pdf', type: 'rfq', phase: 'pre-sales', size: 1100000, uploadedAt: '2026-04-02', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
    { id: 'f8', name: 'AGV_Procurement_Contract.pdf', type: 'contract', phase: 'contract', size: 4500000, uploadedAt: '2026-04-20', uploadedBy: 'Manager Li', source: 'manual', emailSent: true, url: '#' },
    { id: 'f9', name: 'On-site_Deployment_Plan.docx', type: 'proposal', phase: 'execution', size: 2100000, uploadedAt: '2026-05-10', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '4': [
    { id: 'f10', name: 'Yard_Scheduling_Requirements_Draft.pdf', type: 'rfp', phase: 'pre-sales', size: 890000, uploadedAt: '2026-05-15', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '5': [
    { id: 'f11', name: 'FMS_System_Contract.pdf', type: 'contract', phase: 'contract', size: 2800000, uploadedAt: '2026-05-05', uploadedBy: 'Manager Chen', source: 'manual', emailSent: true, url: '#' },
    { id: 'f12', name: 'Vehicle_Data_API_Document.pdf', type: 'proposal', phase: 'execution', size: 1500000, uploadedAt: '2026-05-14', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '6': [
    { id: 'f13', name: 'AI_Customer_Service_Quotation_v2.pdf', type: 'quote', phase: 'pre-sales', size: 1600000, uploadedAt: '2026-05-18', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
  '7': [
    { id: 'f14', name: 'Smart_Campus_Quotation.pdf', type: 'quote', phase: 'pre-sales', size: 2200000, uploadedAt: '2026-05-10', uploadedBy: 'EOS AI', source: 'ai', emailSent: true, url: '#' },
    { id: 'f15', name: 'Smart_Campus_Contract_Pending.pdf', type: 'contract', phase: 'contract', size: 3800000, uploadedAt: '2026-05-19', uploadedBy: 'EOS AI', source: 'ai', url: '#' },
  ],
};

export function getFiles(lang: string): Record<string, ProjectFile[]> {
  return lang === 'en' ? filesEn : filesZh;
}

export const mockFiles: Record<string, ProjectFile[]> = filesZh;
