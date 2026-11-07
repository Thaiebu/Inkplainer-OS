/**
 * doodles.js
 * Curated CC0/MIT Vector Doodle & Icon Library for Inkplainer-OS
 * Includes 48 hand-drawn vector SVG doodles across 6 categories,
 * local storage for recently used assets, and instant 1-click canvas insertion.
 */

(function(window) {
  'use strict';

  const DOODLE_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'ideas', label: '💡 Ideas & Strategy' },
    { id: 'people', label: '👥 People & Teams' },
    { id: 'business', label: '📈 Business & Growth' },
    { id: 'tech', label: '💻 Tech & Digital' },
    { id: 'arrows', label: '🎯 Arrows & Badges' },
    { id: 'education', label: '📚 Education & Time' },
  ];

  const DOODLES = [
    // ─── 1. IDEAS & STRATEGY ───
    {
      id: 'lightbulb',
      title: 'Idea Lightbulb',
      category: 'ideas',
      tags: ['idea', 'creative', 'innovation', 'thought', 'solution', 'spark'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8a18 18 0 0 0-14 29c3 3 5 7 5 11h18c0-4 2-8 5-11a18 18 0 0 0-14-29z"/>
        <path d="M25 48h14M27 54h10M30 60h4"/>
        <path d="M32 2v3M10 16l3 2M54 16l-3 2M4 32h4M56 32h4M28 26l4 6 4-6"/>
      </svg>`
    },
    {
      id: 'brain',
      title: 'Brain / Thinking',
      category: 'ideas',
      tags: ['brain', 'thinking', 'mind', 'intelligence', 'ai', 'psychology'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 12c-4-4-10-4-14 0-5 5-4 12-1 16-4 3-5 9-2 14 3 5 9 6 13 4 1 4 5 7 9 7v-41z"/>
        <path d="M32 12c4-4 10-4 14 0 5 5 4 12 1 16 4 3 5 9 2 14-3 5-9 6-13 4-1 4-5 7-9 7v-41z"/>
        <path d="M22 26c-2 2-3 6-1 8M42 26c2 2 3 6 1 8M20 40c2 2 6 3 8 1M44 40c-2 2-6 3-8 1"/>
      </svg>`
    },
    {
      id: 'target',
      title: 'Target / Goal',
      category: 'ideas',
      tags: ['target', 'goal', 'bullseye', 'aim', 'focus', 'objective', 'kpi'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <circle cx="32" cy="32" r="16"/>
        <circle cx="32" cy="32" r="8"/>
        <path d="M48 16l10-10M58 6h-6M58 6v6M32 32l16-16"/>
      </svg>`
    },
    {
      id: 'rocket',
      title: 'Rocket Launch',
      category: 'ideas',
      tags: ['rocket', 'launch', 'startup', 'fast', 'speed', 'scale', 'future'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8c8 4 16 16 16 26l-10 6-6-6-6 6-10-6c0-10 8-22 16-26z"/>
        <circle cx="32" cy="22" r="4"/>
        <path d="M16 34l-8 10 10 2 4-4M48 34l8 10-10 2-4-4M26 44v8l6 6 6-6v-8"/>
      </svg>`
    },
    {
      id: 'trophy',
      title: 'Winner Trophy',
      category: 'ideas',
      tags: ['trophy', 'winner', 'cup', 'award', 'success', 'first', 'champion'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 10h28v16a14 14 0 0 1-28 0V10z"/>
        <path d="M18 16H8a6 6 0 0 0 6 6h4M46 16h10a6 6 0 0 1-6 6h-4"/>
        <path d="M32 40v10M22 50h20M20 58h24"/>
        <path d="M32 18l2 4 4 1-3 3 1 4-4-2-4 2 1-4-3-3 4-1z"/>
      </svg>`
    },
    {
      id: 'flag',
      title: 'Goal Flag',
      category: 'ideas',
      tags: ['flag', 'milestone', 'mission', 'mountain', 'achieve', 'summit'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 10v46M16 12l26 7-26 7z"/>
        <path d="M10 56h16"/>
      </svg>`
    },
    {
      id: 'compass',
      title: 'Compass / Roadmap',
      category: 'ideas',
      tags: ['compass', 'direction', 'guide', 'roadmap', 'explore', 'navigation'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <polygon points="32,16 38,32 32,48 26,32"/>
        <circle cx="32" cy="32" r="3" fill="#1e293b"/>
        <path d="M32 4v4M32 56v4M4 32h4M56 32h4"/>
      </svg>`
    },
    {
      id: 'puzzle',
      title: 'Puzzle Pieces',
      category: 'ideas',
      tags: ['puzzle', 'solution', 'problem', 'fit', 'integration', 'match'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 12h14a6 6 0 0 1 12 0h14v14a6 6 0 0 1 0 12v14H38a6 6 0 0 1-12 0H12V38a6 6 0 0 0 0-12V12z"/>
      </svg>`
    },
    {
      id: 'diamond',
      title: 'Diamond / Value',
      category: 'ideas',
      tags: ['diamond', 'value', 'quality', 'gem', 'premium', 'luxury'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="18,14 46,14 56,28 32,54 8,28"/>
        <line x1="8" y1="28" x2="56" y2="28"/>
        <line x1="18" y1="14" x2="32" y2="54"/>
        <line x1="46" y1="14" x2="32" y2="54"/>
      </svg>`
    },

    // ─── 2. PEOPLE & COLLABORATION ───
    {
      id: 'user',
      title: 'User / Person',
      category: 'people',
      tags: ['user', 'person', 'avatar', 'human', 'profile', 'individual'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="20" r="12"/>
        <path d="M12 54c0-11 9-20 20-20s20 9 20 20"/>
      </svg>`
    },
    {
      id: 'team',
      title: 'Team / Group',
      category: 'people',
      tags: ['team', 'group', 'people', 'community', 'collaborate', 'together'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="18" r="9"/>
        <path d="M18 52c0-8 6-15 14-15s14 7 14 15"/>
        <circle cx="16" cy="24" r="7"/>
        <path d="M6 50c0-6 4-11 10-12"/>
        <circle cx="48" cy="24" r="7"/>
        <path d="M58 50c0-6-4-11-10-12"/>
      </svg>`
    },
    {
      id: 'thumbsup',
      title: 'Thumbs Up',
      category: 'people',
      tags: ['thumbs', 'up', 'like', 'agree', 'approve', 'positive', 'good'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 28v24h-8a4 4 0 0 1-4-4V32a4 4 0 0 1 4-4h8z"/>
        <path d="M22 28l6-16a4 4 0 0 1 6 3v9h14a6 6 0 0 1 6 7l-4 15a6 6 0 0 1-6 4H22"/>
      </svg>`
    },
    {
      id: 'handshake',
      title: 'Handshake / Deal',
      category: 'people',
      tags: ['handshake', 'deal', 'agreement', 'partnership', 'trust', 'contract'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 32l12-8 12 12-6 6-18-10z"/>
        <path d="M56 32l-12-8-12 12 6 6 18-10z"/>
        <path d="M26 30l6-6 6 6-6 6-6-6z"/>
        <path d="M26 42l6 6M34 38l6 6"/>
      </svg>`
    },
    {
      id: 'speaking',
      title: 'Dialogue / Speak',
      category: 'people',
      tags: ['speaking', 'talk', 'conversation', 'dialogue', 'chat', 'feedback'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 14h28a8 8 0 0 1 8 8v12a8 8 0 0 1-8 8h-14l-10 8v-8h-4a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8z"/>
        <circle cx="20" cy="28" r="2" fill="#1e293b"/>
        <circle cx="26" cy="28" r="2" fill="#1e293b"/>
        <circle cx="32" cy="28" r="2" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'heart',
      title: 'Heart / Care',
      category: 'people',
      tags: ['heart', 'love', 'care', 'health', 'like', 'passion', 'customer'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 54S10 40 10 24a12 12 0 0 1 22-7 12 12 0 0 1 22 7c0 16-22 30-22 30z"/>
      </svg>`
    },

    // ─── 3. BUSINESS & GROWTH ───
    {
      id: 'growth-chart',
      title: 'Growth Bar Chart',
      category: 'business',
      tags: ['growth', 'chart', 'bar', 'stats', 'analytics', 'revenue', 'success'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 54h46"/>
        <rect x="14" y="38" width="8" height="16" rx="2"/>
        <rect x="28" y="26" width="8" height="28" rx="2"/>
        <rect x="42" y="14" width="8" height="40" rx="2"/>
        <path d="M16 30l12-10 14-8 12-6M48 6h6v6"/>
      </svg>`
    },
    {
      id: 'line-chart',
      title: 'Trending Line Chart',
      category: 'business',
      tags: ['line', 'trend', 'metric', 'progress', 'upward', 'performance'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 10v44h46"/>
        <path d="M14 42l12-14 10 8 18-20"/>
        <polyline points="46 16 54 16 54 24"/>
      </svg>`
    },
    {
      id: 'pie-chart',
      title: 'Pie Chart',
      category: 'business',
      tags: ['pie', 'chart', 'share', 'distribution', 'segments', 'stats'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 32L12 32A20 20 0 1 0 32 12v20z"/>
        <path d="M36 28V8a20 20 0 0 1 20 20H36z"/>
      </svg>`
    },
    {
      id: 'dollar-coin',
      title: 'Money / Coin',
      category: 'business',
      tags: ['dollar', 'money', 'coin', 'currency', 'cash', 'finance', 'price'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="22"/>
        <circle cx="32" cy="32" r="16" stroke-dasharray="3 3"/>
        <path d="M32 20v24M36 24h-6a4 4 0 0 0 0 8h8a4 4 0 0 1 0 8h-8"/>
      </svg>`
    },
    {
      id: 'cash-stack',
      title: 'Cash / Banknotes',
      category: 'business',
      tags: ['cash', 'notes', 'money', 'capital', 'funding', 'wealth'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="8" y="24" width="40" height="24" rx="4"/>
        <circle cx="28" cy="36" r="6"/>
        <path d="M16 16h40v24"/>
      </svg>`
    },
    {
      id: 'briefcase',
      title: 'Business Briefcase',
      category: 'business',
      tags: ['briefcase', 'work', 'job', 'corporate', 'case', 'office', 'portfolio'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="20" width="44" height="34" rx="4"/>
        <path d="M24 20V14a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v6"/>
        <path d="M10 32h44M28 32v6h8v-6"/>
      </svg>`
    },
    {
      id: 'shopping-cart',
      title: 'Shopping Cart',
      category: 'business',
      tags: ['cart', 'shop', 'ecommerce', 'checkout', 'buy', 'order'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="22" cy="54" r="4"/>
        <circle cx="48" cy="54" r="4"/>
        <path d="M6 10h8l6 30h30l6-20H18"/>
      </svg>`
    },
    {
      id: 'megaphone',
      title: 'Megaphone / Shout',
      category: 'business',
      tags: ['megaphone', 'marketing', 'announce', 'speaker', 'broadcast', 'promo'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 28h8l18-12v32L20 36h-8a4 4 0 0 1-4-4v-0a4 4 0 0 1 4-4z"/>
        <path d="M22 36v14a4 4 0 0 0 4 4h2"/>
        <path d="M44 26a8 8 0 0 1 0 12M50 20a16 16 0 0 1 0 24"/>
      </svg>`
    },

    // ─── 4. TECH & DIGITAL ───
    {
      id: 'laptop',
      title: 'Laptop Computer',
      category: 'tech',
      tags: ['laptop', 'computer', 'screen', 'device', 'software', 'digital'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="14" y="14" width="36" height="26" rx="3"/>
        <path d="M6 46h52a2 2 0 0 1 2 2v2H4v-2a2 2 0 0 1 2-2z"/>
        <line x1="28" y1="46" x2="36" y2="46"/>
      </svg>`
    },
    {
      id: 'smartphone',
      title: 'Smartphone',
      category: 'tech',
      tags: ['phone', 'mobile', 'smartphone', 'cell', 'app', 'touch'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="20" y="8" width="24" height="48" rx="5"/>
        <line x1="28" y1="14" x2="36" y2="14"/>
        <circle cx="32" cy="48" r="2" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'cloud',
      title: 'Cloud / Sync',
      category: 'tech',
      tags: ['cloud', 'sync', 'online', 'server', 'backup', 'data'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 48a12 12 0 0 1-2-24 16 16 0 0 1 31-4 12 12 0 0 1 1 28H18z"/>
        <path d="M32 34v12M26 40l6-6 6 6"/>
      </svg>`
    },
    {
      id: 'database',
      title: 'Database Server',
      category: 'tech',
      tags: ['database', 'storage', 'data', 'server', 'sql', 'backend'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="32" cy="16" rx="20" ry="8"/>
        <path d="M12 16v16c0 4.4 9 8 20 8s20-3.6 20-8V16"/>
        <path d="M12 32v16c0 4.4 9 8 20 8s20-3.6 20-8V32"/>
      </svg>`
    },
    {
      id: 'gear',
      title: 'Settings / Gear',
      category: 'tech',
      tags: ['gear', 'settings', 'cog', 'configure', 'automation', 'process'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="8"/>
        <path d="M32 10v6M32 48v6M10 32h6M48 32h6M16 16l4 4M44 44l4 4M16 48l4-4M44 20l4-4"/>
      </svg>`
    },
    {
      id: 'shield',
      title: 'Security Shield',
      category: 'tech',
      tags: ['shield', 'security', 'protection', 'privacy', 'safe', 'verified'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8l18 6v16c0 14-8 24-18 28-10-4-18-14-18-28V14z"/>
        <polyline points="24 32 30 38 42 24"/>
      </svg>`
    },
    {
      id: 'code',
      title: 'Code Brackets',
      category: 'tech',
      tags: ['code', 'programming', 'developer', 'html', 'syntax', 'software'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 20 8 32 20 44"/>
        <polyline points="44 20 56 32 44 44"/>
        <line x1="36" y1="14" x2="28" y2="50"/>
      </svg>`
    },
    {
      id: 'globe',
      title: 'Global / World',
      category: 'tech',
      tags: ['globe', 'world', 'earth', 'global', 'international', 'network'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <ellipse cx="32" cy="32" rx="10" ry="24"/>
        <line x1="8" y1="32" x2="56" y2="32"/>
        <path d="M12 20h40M12 44h40"/>
      </svg>`
    },

    // ─── 5. ARROWS & BADGES ───
    {
      id: 'arrow-right-hand',
      title: 'Hand-drawn Arrow',
      category: 'arrows',
      tags: ['arrow', 'right', 'next', 'direction', 'point', 'lead'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 32c12-3 28 3 42-1"/>
        <path d="M40 18c4 5 8 10 12 13-4 4-8 8-12 15"/>
      </svg>`
    },
    {
      id: 'arrow-curved',
      title: 'Curved Up Arrow',
      category: 'arrows',
      tags: ['arrow', 'curve', 'turn', 'growth', 'flow', 'up'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 50c6-20 18-32 38-34"/>
        <polyline points="36 10 50 16 46 30"/>
      </svg>`
    },
    {
      id: 'speech-bubble',
      title: 'Speech Bubble',
      category: 'arrows',
      tags: ['speech', 'bubble', 'callout', 'message', 'text', 'comment'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 16h44a6 6 0 0 1 6 6v18a6 6 0 0 1-6 6H24l-12 10v-10h-2a6 6 0 0 1-6-6V22a6 6 0 0 1 6-6z"/>
      </svg>`
    },
    {
      id: 'checkmark',
      title: 'Success Checkmark',
      category: 'arrows',
      tags: ['check', 'done', 'yes', 'success', 'correct', 'pass', 'valid'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <polyline points="20 32 28 40 44 24"/>
      </svg>`
    },
    {
      id: 'crossmark',
      title: 'Cancel / Cross',
      category: 'arrows',
      tags: ['cross', 'x', 'cancel', 'no', 'wrong', 'delete', 'fail'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <line x1="22" y1="22" x2="42" y2="42"/>
        <line x1="42" y1="22" x2="22" y2="42"/>
      </svg>`
    },
    {
      id: 'star',
      title: 'Star Badge',
      category: 'arrows',
      tags: ['star', 'favorite', 'rating', 'badge', 'best', 'highlight'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="32,6 39,22 56,24 43,36 47,54 32,44 17,54 21,36 8,24 25,22"/>
      </svg>`
    },
    {
      id: 'sticky-note',
      title: 'Sticky Note',
      category: 'arrows',
      tags: ['sticky', 'note', 'postit', 'reminder', 'memo', 'card'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 10h40v30l-12 14H12z"/>
        <path d="M40 40h12l-12 14v-14z"/>
        <line x1="20" y1="22" x2="36" y2="22"/>
        <line x1="20" y1="30" x2="34" y2="30"/>
      </svg>`
    },
    {
      id: 'warning',
      title: 'Warning Alert',
      category: 'arrows',
      tags: ['warning', 'alert', 'caution', 'notice', 'hazard', 'exclamation'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="32,8 58,54 6,54"/>
        <line x1="32" y1="24" x2="32" y2="38"/>
        <circle cx="32" cy="46" r="2" fill="#1e293b"/>
      </svg>`
    },

    // ─── 6. EDUCATION & TIME ───
    {
      id: 'book',
      title: 'Open Book',
      category: 'education',
      tags: ['book', 'education', 'read', 'learn', 'knowledge', 'study'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 16c6-4 16-4 26 0 10-4 20-4 26 0v34c-6-4-16-4-26 0-10-4-20-4-26 0z"/>
        <line x1="32" y1="16" x2="32" y2="50"/>
      </svg>`
    },
    {
      id: 'grad-cap',
      title: 'Graduation Cap',
      category: 'education',
      tags: ['graduation', 'cap', 'degree', 'university', 'student', 'graduate'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="32,12 60,24 32,36 4,24"/>
        <path d="M12 28v18c6 6 34 6 40 0V28"/>
        <path d="M54 27v20l3 3"/>
      </svg>`
    },
    {
      id: 'clock',
      title: 'Clock / Time',
      category: 'education',
      tags: ['clock', 'time', 'deadline', 'hour', 'schedule', 'watch', 'quick'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <polyline points="32 16 32 32 44 32"/>
      </svg>`
    },
    {
      id: 'calendar',
      title: 'Calendar Date',
      category: 'education',
      tags: ['calendar', 'date', 'event', 'month', 'plan', 'schedule'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="14" width="44" height="42" rx="4"/>
        <line x1="10" y1="26" x2="54" y2="26"/>
        <line x1="20" y1="8" x2="20" y2="16"/>
        <line x1="44" y1="8" x2="44" y2="16"/>
        <circle cx="22" cy="36" r="2" fill="#1e293b"/>
        <circle cx="32" cy="36" r="2" fill="#1e293b"/>
        <circle cx="42" cy="36" r="2" fill="#1e293b"/>
        <circle cx="22" cy="46" r="2" fill="#1e293b"/>
        <circle cx="32" cy="46" r="2" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'flask',
      title: 'Science Flask',
      category: 'education',
      tags: ['flask', 'science', 'chemistry', 'lab', 'research', 'experiment'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M26 8h12M28 8v14L10 52a4 4 0 0 0 4 4h36a4 4 0 0 0 4-4L36 22V8"/>
        <path d="M16 44h32"/>
      </svg>`
    },
    {
      id: 'magnifier',
      title: 'Search / Explore',
      category: 'education',
      tags: ['magnifier', 'search', 'explore', 'look', 'find', 'discovery'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="28" cy="28" r="18"/>
        <line x1="42" y1="42" x2="56" y2="56"/>
      </svg>`
    }
  ];

  // ═══════════════════════════════════════════
  // RECENT ASSETS MANAGEMENT (LocalStorage)
  // ═══════════════════════════════════════════
  const RECENTS_KEY = 'inkplainer_recent_assets';
  const MAX_RECENTS = 12;

  function getRecentAssets() {
    try {
      const data = localStorage.getItem(RECENTS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveRecentAsset(asset) {
    try {
      let list = getRecentAssets();
      // Remove duplicate if already present
      list = list.filter(item => item.id !== asset.id && item.name !== asset.name);
      list.unshift({
        id: asset.id || 'asset-' + Date.now(),
        name: asset.name || 'Doodle',
        svg: asset.svg || null,
        src: asset.src || null,
        timestamp: Date.now()
      });
      if (list.length > MAX_RECENTS) list = list.slice(0, MAX_RECENTS);
      localStorage.setItem(RECENTS_KEY, JSON.stringify(list));
      renderRecentAssets();
    } catch (e) {
      console.warn('Could not save recent asset', e);
    }
  }

  function clearRecentAssets() {
    try {
      localStorage.removeItem(RECENTS_KEY);
      renderRecentAssets();
    } catch (e) {}
  }

  // ═══════════════════════════════════════════
  // DOODLE INSERTION TO CANVAS
  // ═══════════════════════════════════════════
  function insertDoodleToCanvas(doodle, posX, posY) {
    if (!doodle) return;
    let svgStr = doodle.svg;
    if (!svgStr) return;

    // Ensure valid standalone SVG with XML namespace and dimensions
    if (!svgStr.includes('xmlns=')) {
      svgStr = svgStr.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if (!svgStr.includes('width=') && !svgStr.includes('height=')) {
      svgStr = svgStr.replace('<svg', '<svg width="256" height="256"');
    }

    const dataUrl = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svgStr);
    const img = new Image();

    img.onload = () => {
      img.width = 256;
      img.height = 256;
      if (typeof window.addLayer === 'function') {
        window.addLayer(img, doodle.title || doodle.name || 'Doodle', posX, posY);
        saveRecentAsset({
          id: doodle.id,
          name: doodle.title || doodle.name,
          svg: doodle.svg,
          src: dataUrl
        });
        if (typeof window.showToast === 'function') {
          window.showToast(`Inserted "${doodle.title || doodle.name}"`);
        }
      }
    };

    img.onerror = (e) => {
      console.warn('DataURL SVG load failed, trying Blob...', e);
      try {
        const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const fb = new Image();
        fb.onload = () => {
          URL.revokeObjectURL(url);
          fb.width = 256;
          fb.height = 256;
          if (typeof window.addLayer === 'function') {
            window.addLayer(fb, doodle.title || doodle.name || 'Doodle', posX, posY);
            saveRecentAsset({ id: doodle.id, name: doodle.title || doodle.name, svg: doodle.svg });
          }
        };
        fb.src = url;
      } catch (err) {
        console.error('All SVG image conversions failed:', err);
      }
    };

    img.src = dataUrl;
  }

  // Render recent assets row in DOM
  function renderRecentAssets() {
    if (typeof document === 'undefined') return;
    const container = document.getElementById('recent-doodles-list');
    if (!container) return;
    const recents = getRecentAssets();
    if (!recents.length) {
      container.innerHTML = '<span style="font-size:10px;color:var(--muted);font-style:italic;padding:4px 0;">No recently used doodles yet</span>';
      return;
    }
    container.innerHTML = recents.map(item => `
      <div class="recent-doodle-chip" title="${item.name}" onclick="DoodleLibrary.insertRecent('${item.id}')">
        ${item.svg ? item.svg : `<img src="${item.src}" style="width:20px;height:20px;object-fit:contain;">`}
        <span class="recent-doodle-label">${item.name}</span>
      </div>
    `).join('');
  }

  function insertRecent(id) {
    const recents = getRecentAssets();
    const found = recents.find(r => r.id === id);
    if (!found) return;
    if (found.svg) {
      insertDoodleToCanvas(found);
    } else if (found.src) {
      const img = new Image();
      img.onload = () => {
        img.width = img.naturalWidth || img.width || 256;
        img.height = img.naturalHeight || img.height || 256;
        window.addLayer(img, found.name);
      };
      img.src = found.src;
    }
  }

  // Render main doodle library grid
  let _activeDoodleCategory = 'all';
  let _doodleSearchQuery = '';

  function renderDoodleGrid() {
    if (typeof document === 'undefined') return;
    const grid = document.getElementById('doodle-library-grid');
    if (!grid) return;

    let items = DOODLES;
    if (_activeDoodleCategory !== 'all') {
      items = items.filter(d => d.category === _activeDoodleCategory);
    }
    if (_doodleSearchQuery.trim()) {
      const q = _doodleSearchQuery.toLowerCase().trim();
      items = items.filter(d => 
        d.title.toLowerCase().includes(q) || 
        d.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (!items.length) {
      grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px 8px;font-size:11px;color:var(--muted);">No doodles match your search</div>';
      return;
    }

    grid.innerHTML = items.map(d => `
      <div class="doodle-card" onclick="DoodleLibrary.insertDoodle('${d.id}')" title="${d.title} (Click to insert)">
        <div class="doodle-card-preview">${d.svg}</div>
        <div class="doodle-card-title">${d.title}</div>
      </div>
    `).join('');
  }

  function filterCategory(catId, btnEl) {
    _activeDoodleCategory = catId;
    document.querySelectorAll('.doodle-cat-pill').forEach(p => p.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderDoodleGrid();
  }

  function onDoodleSearch(q) {
    _doodleSearchQuery = q;
    renderDoodleGrid();
  }

  function insertDoodleById(id) {
    const found = DOODLES.find(d => d.id === id);
    if (found) {
      insertDoodleToCanvas(found);
    }
  }

  // Export to global scope
  window.DoodleLibrary = {
    CATEGORIES: DOODLE_CATEGORIES,
    DOODLES,
    getRecentAssets,
    saveRecentAsset,
    clearRecentAssets,
    insertDoodle: insertDoodleById,
    insertRecent,
    filterCategory,
    onDoodleSearch,
    renderDoodleGrid,
    renderRecentAssets
  };

  console.log('✓ Doodle Library initialized (48 vector doodles)');

})(window);

