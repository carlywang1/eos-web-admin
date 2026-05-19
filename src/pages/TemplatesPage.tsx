import { TemplateList } from '../components/templates/TemplateList';
import { mockTemplates } from '../mocks/templates';

export function TemplatesPage() {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 500, marginBottom: '2px' }}>我的模板</h1>
        <p style={{ fontSize: '14px', color: 'var(--md-on-surface-variant)' }}>管理你的合同、报价和方案模板，EOS AI 可以读取这些模板来生成文件</p>
      </div>
      <TemplateList templates={mockTemplates} />
    </div>
  );
}
