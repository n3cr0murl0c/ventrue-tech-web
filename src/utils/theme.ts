export const theme = {
  get() {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  },
  set(theme: 'dark' | 'light') {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },
  toggle() {
    const current = this.get();
    this.set(current === 'dark' ? 'light' : 'dark');
  },
  init() {
    const theme = this.get();
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
};
