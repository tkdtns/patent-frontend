import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* 배경 */
        bg:        'var(--c-bg)',
        surface:   'var(--c-surface)',
        'bg-muted':'var(--c-bg-muted)',
        /* 보더 */
        border:        'var(--c-border)',
        'border-light':'var(--c-border-light)',
        /* 텍스트 */
        text:  'var(--c-text)',
        muted: 'var(--c-muted)',
        light: 'var(--c-light)',
        /* 브랜드 */
        accent:         'var(--c-accent)',
        'accent-light': 'var(--c-accent-light)',
        'accent-border':'var(--c-accent-border)',
        /* 의미색 */
        green:         'var(--c-green)',
        'green-light': 'var(--c-green-light)',
        amber:         'var(--c-amber)',
        'amber-light': 'var(--c-amber-light)',
        red:           'var(--c-red)',
        'red-light':   'var(--c-red-light)',
        orange:        'var(--c-orange)',
        'orange-light':'var(--c-orange-light)',
        /* Match */
        'match-same':        'var(--c-match-same)',
        'match-same-bg':     'var(--c-match-same-bg)',
        'match-similar':     'var(--c-match-similar)',
        'match-similar-bg':  'var(--c-match-similar-bg)',
        'match-diff':        'var(--c-match-diff)',
        'match-diff-bg':     'var(--c-match-diff-bg)',
        /* Agreement */
        agree:          'var(--c-agree)',
        'agree-bg':     'var(--c-agree-bg)',
        disagree:       'var(--c-disagree)',
        'disagree-bg':  'var(--c-disagree-bg)',
        /* Diff */
        'diff-add':    'var(--c-diff-add)',
        'diff-add-bg': 'var(--c-diff-add-bg)',
        'diff-del':    'var(--c-diff-del)',
        'diff-del-bg': 'var(--c-diff-del-bg)',
      },
      fontFamily: {
        sans:  ['var(--font-sans)'],
        serif: ['var(--font-serif)'],
        mono:  ['var(--font-mono)'],
      },
      width:  { sidebar: 'var(--sidebar-w)' },
      height: { topnav:  'var(--topnav-h)' },
      marginLeft: { sidebar: 'var(--sidebar-w)' },
      borderRadius: { card: 'var(--card-radius)' },
      boxShadow: {
        card:  'var(--shadow-card)',
        panel: 'var(--shadow-panel)',
      },
    },
  },
  plugins: [],
};

export default config;
