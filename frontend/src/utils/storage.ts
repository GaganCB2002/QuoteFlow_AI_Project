const KEYS = {
  TOKEN: 'qf_token',
  USER_ID: 'qf_user_id',
  USER_NAME: 'qf_user_name',
  USER_EMAIL: 'qf_user_email',
  COMPANY_NAME: 'qf_company_name',
  USER_ROLE: 'qf_user_role',
  THEME: 'qf_theme',
  COOKIE_CONSENT: 'qf_cookie_consent',
} as const;

function get(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function set(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

function remove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {}
}

export const storage = {
  getToken: () => get(KEYS.TOKEN),
  setToken: (t: string) => set(KEYS.TOKEN, t),
  removeToken: () => remove(KEYS.TOKEN),

  getUserId: () => get(KEYS.USER_ID),
  setUserId: (id: string) => set(KEYS.USER_ID, id),
  removeUserId: () => remove(KEYS.USER_ID),

  getUserName: () => get(KEYS.USER_NAME) || 'User',
  setUserName: (n: string) => set(KEYS.USER_NAME, n),
  removeUserName: () => remove(KEYS.USER_NAME),

  getUserEmail: () => get(KEYS.USER_EMAIL) || '',
  setUserEmail: (e: string) => set(KEYS.USER_EMAIL, e),
  removeUserEmail: () => remove(KEYS.USER_EMAIL),

  getCompanyName: () => get(KEYS.COMPANY_NAME) || '',
  setCompanyName: (c: string) => set(KEYS.COMPANY_NAME, c),
  removeCompanyName: () => remove(KEYS.COMPANY_NAME),

  getUserRole: () => get(KEYS.USER_ROLE) || 'ROLE_USER',
  setUserRole: (r: string) => set(KEYS.USER_ROLE, r),
  removeUserRole: () => remove(KEYS.USER_ROLE),

  getTheme: (): 'light' | 'dark' | null => {
    const t = get(KEYS.THEME);
    if (t === 'light' || t === 'dark') return t;
    return null;
  },
  setTheme: (t: 'light' | 'dark') => set(KEYS.THEME, t),

  getCookieConsent: () => get(KEYS.COOKIE_CONSENT),
  setCookieConsent: (v: string) => set(KEYS.COOKIE_CONSENT, v),

  clearSession: () => {
    remove(KEYS.TOKEN);
    remove(KEYS.USER_ID);
    remove(KEYS.USER_NAME);
    remove(KEYS.USER_EMAIL);
    remove(KEYS.COMPANY_NAME);
    remove(KEYS.USER_ROLE);
  },

  getUserInitials: (): string => {
    try {
      const name = get(KEYS.USER_NAME) || 'User';
      return name.split(' ').map(s => s[0]).join('').toUpperCase().slice(0, 2);
    } catch {
      return 'U';
    }
  },
};
