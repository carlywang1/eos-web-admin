import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function VersionPicker() {
  const { t } = useTranslation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '32px', padding: '40px' }}>
      <Link to="/v1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 48px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', transition: 'box-shadow 0.2s' }}>
        <span className="material-icons-outlined" style={{ fontSize: '40px', color: '#1a73e8' }}>dashboard</span>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>{t('versionPicker.v1Title')}</span>
        <span style={{ fontSize: '13px', color: '#64748b' }}>{t('versionPicker.v1Desc')}</span>
      </Link>
      <Link to="/v2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', padding: '40px 48px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '12px', textDecoration: 'none', transition: 'box-shadow 0.2s' }}>
        <span className="material-icons-outlined" style={{ fontSize: '40px', color: '#1e293b' }}>table_rows</span>
        <span style={{ fontSize: '16px', fontWeight: 600, color: '#1e293b' }}>{t('versionPicker.v2Title')}</span>
        <span style={{ fontSize: '13px', color: '#64748b' }}>{t('versionPicker.v2Desc')}</span>
      </Link>
    </div>
  );
}
