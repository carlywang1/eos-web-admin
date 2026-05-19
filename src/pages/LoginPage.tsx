import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { setLanguage } from '../i18n';
import styles from './LoginPage.module.css';

export function LoginPage() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, password);
    navigate('/');
  };

  const toggleLang = () => {
    setLanguage(i18n.language === 'zh' ? 'en' : 'zh');
  };

  return (
    <div className={styles.page}>
      <button
        onClick={toggleLang}
        style={{ position: 'absolute', top: '20px', right: '20px', border: '1px solid #e8eaed', borderRadius: '100px', padding: '4px 10px', fontSize: '12px', background: 'transparent', cursor: 'pointer', color: '#5f6368' }}
      >
        {i18n.language === 'zh' ? 'EN' : '中'}
      </button>
      <form className={styles.card} onSubmit={handleSubmit}>
        <div className={styles.logo}>EOS</div>
        <h1 className={styles.title}>{t('login.title')}</h1>
        <p className={styles.subtitle}>{t('login.subtitle')}</p>
        <div className={styles.field}>
          <input
            type="email"
            placeholder={t('login.email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />
        </div>
        <div className={styles.field}>
          <input
            type="password"
            placeholder={t('login.password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          {t('login.submit')}
        </button>
      </form>
    </div>
  );
}
