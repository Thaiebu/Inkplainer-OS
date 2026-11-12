/**
 * assets.js
 * VideoScribe-Style Built-in Local Vector Asset Library for Inkplainer-OS
 * Features:
 * - 120+ curated vector SVG illustrations across 12 whiteboard categories
 * - Avatars, Characters, Business, Tech & AI, Education, Nature, Animals, Arrows, Bubbles, Doodles, Decorative
 * - Drag-and-drop onto the whiteboard canvas with accurate coordinate mapping
 * - Custom user asset import (SVGs & PNGs saved to local storage)
 * - Category filtering, instant keyword search, and recently used asset tray
 * - Fully compatible with the whiteboard outline extraction and animation engine
 */

(function(window) {
  'use strict';

  const ASSET_CATEGORIES = [
    { id: 'all', label: 'All' },
    { id: 'color', label: '🎨 Color Clip Art' },
    { id: 'opendoodles', label: '🕺 Open Doodles' },
    { id: 'undraw', label: '📐 unDraw Scenes' },
    { id: 'avatars', label: '👤 Avatars' },
    { id: 'characters', label: '🧍 Characters' },
    { id: 'business', label: '💼 Business' },
    { id: 'tech', label: '💻 Tech & AI' },
    { id: 'education', label: '📚 Education' },
    { id: 'nature', label: '🌿 Nature' },
    { id: 'animals', label: '🐾 Animals' },
    { id: 'arrows', label: '🎯 Arrows' },
    { id: 'bubbles', label: '💬 Bubbles' },
    { id: 'doodles', label: '💡 Doodles' },
    { id: 'decorative', label: '✨ Decorative' },
    { id: 'custom', label: '⭐ My Uploads' }
  ];

  const BUILTIN_ASSETS = [
    // ─── 1. AVATARS & PEOPLE ───
    {
      id: 'avatar-man-prof',
      title: 'Professional Man',
      category: 'avatars',
      tags: ['man', 'avatar', 'face', 'person', 'male', 'profile', 'business'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="24" r="14"/>
        <path d="M18 20c2-6 7-10 14-10s12 4 14 10"/>
        <path d="M26 26h.01M38 26h.01M32 30v2M28 34c2 2 6 2 8 0"/>
        <path d="M12 56c0-11 9-20 20-20s20 9 20 20"/>
        <path d="M28 36l4 8 4-8"/>
      </svg>`
    },
    {
      id: 'avatar-woman-prof',
      title: 'Professional Woman',
      category: 'avatars',
      tags: ['woman', 'avatar', 'female', 'person', 'face', 'profile', 'business'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="24" r="13"/>
        <path d="M16 22c0-8 7-14 16-14s16 6 16 14v12c-3-2-6-3-9-2M16 34c3-2 6-3 9-2"/>
        <path d="M26 25h.01M38 25h.01M28 31c2 2 6 2 8 0"/>
        <path d="M12 56c0-11 9-20 20-20s20 9 20 20"/>
        <path d="M32 37v7"/>
      </svg>`
    },
    {
      id: 'avatar-coder',
      title: 'Developer with Glasses',
      category: 'avatars',
      tags: ['developer', 'coder', 'engineer', 'tech', 'geek', 'glasses', 'avatar'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="24" r="14"/>
        <path d="M18 18c4-5 14-6 20-2 4 3 8 2 8 2"/>
        <rect x="22" y="21" width="8" height="6" rx="2"/>
        <rect x="34" y="21" width="8" height="6" rx="2"/>
        <path d="M30 24h4M28 33c2 2 6 2 8 0"/>
        <path d="M12 56c0-11 9-20 20-20s20 9 20 20"/>
      </svg>`
    },
    {
      id: 'avatar-creative',
      title: 'Creative Designer',
      category: 'avatars',
      tags: ['designer', 'creative', 'artist', 'avatar', 'hair', 'freelancer'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="25" r="13"/>
        <path d="M16 24c-2-8 3-16 16-16s18 8 16 16c-3 1-8 0-11-4-3 4-8 5-11 4"/>
        <path d="M26 26h.01M38 26h.01M27 33c3 2 7 2 10 0"/>
        <path d="M12 56c0-11 9-20 20-20s20 9 20 20"/>
      </svg>`
    },
    {
      id: 'avatar-student',
      title: 'Student with Beanie',
      category: 'avatars',
      tags: ['student', 'young', 'beanie', 'teen', 'learner', 'avatar'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="27" r="13"/>
        <path d="M17 22c2-10 8-14 15-14s13 4 15 14"/>
        <path d="M15 22h34"/>
        <path d="M26 28h.01M38 28h.01M28 35c2 2 6 2 8 0"/>
        <path d="M12 58c0-11 9-20 20-20s20 9 20 20"/>
      </svg>`
    },

    // ─── 2. CHARACTERS & POSES ───
    {
      id: 'char-presenter',
      title: 'Presenter Explaining',
      category: 'characters',
      tags: ['presenter', 'teacher', 'explaining', 'speaker', 'pointing', 'whiteboard'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="28" cy="14" r="7"/>
        <path d="M28 21v20M28 26l18-8M28 28l-10 10M20 56l8-15 8 15"/>
        <path d="M46 13l4-2M48 18l4 2"/>
      </svg>`
    },
    {
      id: 'char-celebrating',
      title: 'Person Cheering / Winner',
      category: 'characters',
      tags: ['cheering', 'success', 'happy', 'excited', 'jumping', 'celebrate'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="14" r="7"/>
        <path d="M32 21v18M18 16l14 8 14-8M22 56l10-17 10 17"/>
        <path d="M14 12l2 4M50 12l-2 4M32 6V2"/>
      </svg>`
    },
    {
      id: 'char-thinking',
      title: 'Person Thinking / Confused',
      category: 'characters',
      tags: ['thinking', 'wondering', 'confused', 'question', 'curious', 'character'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="30" cy="15" r="7"/>
        <path d="M30 22v18M30 28l8-6 4 6M30 30l-8 8M22 56l8-16 6 16"/>
        <path d="M46 12c1-3 5-3 6 0 0 2-3 3-3 5M49 20h.01"/>
      </svg>`
    },
    {
      id: 'char-working-desk',
      title: 'Person at Laptop',
      category: 'characters',
      tags: ['desk', 'laptop', 'typing', 'working', 'computer', 'coder', 'office'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="26" cy="16" r="6"/>
        <path d="M26 22v14l10 8M16 48l10-12M8 48h48M34 48l-4-10h14l4 10"/>
        <path d="M36 34h8"/>
      </svg>`
    },
    {
      id: 'char-running',
      title: 'Person Running Fast',
      category: 'characters',
      tags: ['running', 'speed', 'fast', 'agile', 'sprint', 'motion', 'person'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="42" cy="14" r="6"/>
        <path d="M38 20l-8 12 10 4 6 16M30 32l-12 4-6-6M40 24l8 6 6-4M30 40l-8 16"/>
      </svg>`
    },

    // ─── 3. BUSINESS & GROWTH ───
    {
      id: 'biz-growth-chart',
      title: 'Growth Chart Trend',
      category: 'business',
      tags: ['chart', 'growth', 'kpi', 'revenue', 'graph', 'increase', 'success'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 56h48M8 8v48"/>
        <path d="M14 44l12-14 10 8 18-22"/>
        <path d="M46 16h8v8"/>
        <circle cx="26" cy="30" r="2" fill="#1e293b"/>
        <circle cx="36" cy="38" r="2" fill="#1e293b"/>
        <circle cx="54" cy="16" r="2" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'biz-handshake',
      title: 'Handshake Deal',
      category: 'business',
      tags: ['handshake', 'deal', 'agreement', 'partner', 'contract', 'trust'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 26l12-8 10 8-6 6 8 8-8 8-16-16z"/>
        <path d="M54 26l-12-8-10 8 6 6-8 8 8 8 16-16z"/>
        <path d="M6 34l8-4M58 34l-8-4"/>
      </svg>`
    },
    {
      id: 'biz-briefcase',
      title: 'Business Briefcase',
      category: 'business',
      tags: ['briefcase', 'work', 'job', 'corporate', 'suitcase', 'office'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="20" width="44" height="32" rx="4"/>
        <path d="M22 20v-6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v6M10 34h44M28 32v6h8v-6"/>
      </svg>`
    },
    {
      id: 'biz-presentation',
      title: 'Whiteboard Presentation',
      category: 'business',
      tags: ['presentation', 'meeting', 'easel', 'board', 'pitch', 'slide'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="12" y="10" width="40" height="28" rx="2"/>
        <path d="M12 44l-4 14M52 44l4 14M32 44v14M20 22h24M20 28h16"/>
      </svg>`
    },
    {
      id: 'biz-coins',
      title: 'Money & Investment',
      category: 'business',
      tags: ['money', 'coins', 'finance', 'cash', 'wealth', 'budget', 'roi'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="26" cy="22" rx="14" ry="6"/>
        <path d="M12 22v12c0 3.3 6.3 6 14 6s14-2.7 14-6V22"/>
        <path d="M12 34v12c0 3.3 6.3 6 14 6s14-2.7 14-6V34"/>
        <ellipse cx="44" cy="34" rx="10" ry="4"/>
        <path d="M34 34v14c0 2.2 4.5 4 10 4s10-1.8 10-4V34"/>
      </svg>`
    },

    // ─── 4. TECHNOLOGY & AI ───
    {
      id: 'tech-ai-brain',
      title: 'AI Neural Brain',
      category: 'tech',
      tags: ['ai', 'brain', 'neural', 'artificial intelligence', 'machine learning', 'tech'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 10c-12 0-20 8-20 20 0 8 4 14 10 18v6h20v-6c6-4 10-10 10-18 0-12-8-20-20-20z"/>
        <circle cx="24" cy="24" r="3"/>
        <circle cx="40" cy="24" r="3"/>
        <circle cx="32" cy="36" r="3"/>
        <path d="M24 24l8 12 8-12M24 24h16M28 54h8"/>
      </svg>`
    },
    {
      id: 'tech-cloud-database',
      title: 'Cloud Storage & Server',
      category: 'tech',
      tags: ['cloud', 'database', 'storage', 'server', 'hosting', 'backend'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 30c-5 0-9 4-9 9s4 9 9 9h28c6 0 10-4 10-9 0-4-3-8-8-9 0-7-6-12-14-12-4 0-8 2-10 5-2-2-4-3-6-3z"/>
        <path d="M32 36v16M26 46l6 6 6-6"/>
      </svg>`
    },
    {
      id: 'tech-smartphone',
      title: 'Smartphone Mobile App',
      category: 'tech',
      tags: ['phone', 'mobile', 'smartphone', 'app', 'ui', 'device', 'responsive'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="20" y="8" width="24" height="48" rx="6"/>
        <circle cx="32" cy="50" r="2" fill="#1e293b"/>
        <path d="M28 14h8M24 18h16v28H24z"/>
      </svg>`
    },
    {
      id: 'tech-robot',
      title: 'Robot Assistant',
      category: 'tech',
      tags: ['robot', 'bot', 'automation', 'agent', 'assistant', 'ai', 'android'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="18" width="28" height="24" rx="4"/>
        <circle cx="26" cy="28" r="3"/>
        <circle cx="38" cy="28" r="3"/>
        <path d="M26 36h12M32 18v-8M30 10h4M12 26h6M46 26h6M24 42v12M40 42v12"/>
      </svg>`
    },
    {
      id: 'tech-code-window',
      title: 'Coding Browser Window',
      category: 'tech',
      tags: ['code', 'browser', 'programming', 'software', 'window', 'web'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="12" width="44" height="40" rx="4"/>
        <path d="M10 22h44M16 17h.01M22 17h.01M28 17h.01"/>
        <path d="M22 32l-5 5 5 5M42 32l5 5-5 5M34 29l-4 16"/>
      </svg>`
    },

    // ─── 5. EDUCATION & SCIENCE ───
    {
      id: 'edu-graduation-cap',
      title: 'Graduation Cap',
      category: 'education',
      tags: ['education', 'degree', 'university', 'college', 'academy', 'school', 'learn'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="32,12 56,22 32,32 8,22"/>
        <path d="M16 26v16c0 6 7 12 16 12s16-6 16-12V26M56 22v20M52 42h8"/>
      </svg>`
    },
    {
      id: 'edu-book-open',
      title: 'Open Reading Book',
      category: 'education',
      tags: ['book', 'read', 'knowledge', 'study', 'literature', 'library'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 18c-4-4-10-6-18-6v34c8 0 14 2 18 6 4-4 10-6 18-6V12c-8 0-14 2-18 6z"/>
        <path d="M32 18v34"/>
      </svg>`
    },
    {
      id: 'edu-flask-chemistry',
      title: 'Science Flask Experiment',
      category: 'education',
      tags: ['science', 'chemistry', 'flask', 'experiment', 'lab', 'research', 'formula'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M28 10h8M30 10v12l-14 26c-2 3 0 8 5 8h26c5 0 7-5 5-8l-14-26V10"/>
        <path d="M20 44c4-2 8-2 12 0s8 2 12 0"/>
        <circle cx="28" cy="38" r="1.5" fill="#1e293b"/>
        <circle cx="36" cy="46" r="2" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'edu-microscope',
      title: 'Microscope Research',
      category: 'education',
      tags: ['microscope', 'biology', 'research', 'lab', 'science', 'discovery'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 54h32M24 44h16M32 44v10"/>
        <path d="M20 38c0-8 6-14 14-14h4"/>
        <rect x="34" y="10" width="10" height="22" rx="2" transform="rotate(25 39 21)"/>
      </svg>`
    },

    // ─── 6. ANIMALS ───
    {
      id: 'animal-owl',
      title: 'Wise Owl',
      category: 'animals',
      tags: ['owl', 'bird', 'wisdom', 'smart', 'clever', 'animal', 'night'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="32" cy="34" rx="18" ry="22"/>
        <path d="M16 16l8 6M48 16l-8 6"/>
        <circle cx="25" cy="28" r="6"/>
        <circle cx="39" cy="28" r="6"/>
        <polygon points="32,32 30,36 34,36"/>
        <path d="M20 54l4 4M40 54l4 4M24 44c4 3 12 3 16 0"/>
      </svg>`
    },
    {
      id: 'animal-dog',
      title: 'Happy Dog',
      category: 'animals',
      tags: ['dog', 'puppy', 'pet', 'friendly', 'animal', 'cute'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="30" r="16"/>
        <path d="M18 20c-6 4-6 16-2 18M46 20c6 4 6 16 2 18"/>
        <circle cx="26" cy="28" r="2.5" fill="#1e293b"/>
        <circle cx="38" cy="28" r="2.5" fill="#1e293b"/>
        <ellipse cx="32" cy="36" rx="4" ry="3" fill="#1e293b"/>
        <path d="M32 39v4M28 42c2 2 6 2 8 0"/>
      </svg>`
    },
    {
      id: 'animal-cat',
      title: 'Curious Cat',
      category: 'animals',
      tags: ['cat', 'kitten', 'pet', 'curious', 'animal', 'cute'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="34" r="15"/>
        <polygon points="18,24 22,12 30,20"/>
        <polygon points="46,24 42,12 34,20"/>
        <circle cx="26" cy="32" r="2" fill="#1e293b"/>
        <circle cx="38" cy="32" r="2" fill="#1e293b"/>
        <polygon points="32,37 30,40 34,40" fill="#1e293b"/>
        <path d="M14 36h8M14 40h8M50 36h-8M50 40h-8"/>
      </svg>`
    },

    // ─── 7. ARROWS & POINTERS ───
    {
      id: 'arrow-curved-right',
      title: 'Curved Arrow Right',
      category: 'arrows',
      tags: ['arrow', 'curve', 'pointer', 'next', 'flow', 'direction'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 48c6-18 20-26 36-24"/>
        <path d="M38 14l12 10-12 10"/>
      </svg>`
    },
    {
      id: 'arrow-loop-cycle',
      title: 'Loop / Cycle Arrow',
      category: 'arrows',
      tags: ['loop', 'cycle', 'repeat', 'process', 'recycle', 'arrow'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M48 24A18 18 0 1 0 50 36"/>
        <path d="M48 14v10h-10"/>
      </svg>`
    },
    {
      id: 'arrow-zigzag-growth',
      title: 'Zigzag Trend Arrow',
      category: 'arrows',
      tags: ['zigzag', 'arrow', 'stairs', 'steps', 'growth', 'path'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 50l14-16h12l14-18"/>
        <path d="M42 16h10v10"/>
      </svg>`
    },
    {
      id: 'arrow-double-ended',
      title: 'Two-Way Direction Arrow',
      category: 'arrows',
      tags: ['double arrow', 'comparison', 'both', 'bidirectional', 'exchange'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M16 32h32M22 24l-8 8 8 8M42 24l8 8-8 8"/>
      </svg>`
    },

    // ─── 8. SPEECH BUBBLES ───
    {
      id: 'bubble-speech-chat',
      title: 'Speech Bubble',
      category: 'bubbles',
      tags: ['bubble', 'speech', 'chat', 'talk', 'message', 'dialogue'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 16h40a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H26l-10 8v-8h-4a4 4 0 0 1-4-4V20a4 4 0 0 1 4-4z"/>
        <path d="M22 28h20M22 34h14"/>
      </svg>`
    },
    {
      id: 'bubble-thought-cloud',
      title: 'Thought Cloud',
      category: 'bubbles',
      tags: ['thought', 'cloud', 'thinking', 'dream', 'idea', 'bubble'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 20c-5 0-9 4-9 9 0 2 .5 4 1.5 5.5C12 37 10 41 11 45c1 4 5 7 9 7h24c6 0 10-4 10-9 0-3-1-6-4-7 1-1 1-3 1-5 0-6-5-11-11-11-2 0-4 .5-6 1.5C32 20 27 20 22 20z"/>
        <circle cx="16" cy="56" r="2.5"/>
        <circle cx="11" cy="60" r="1.5"/>
      </svg>`
    },
    {
      id: 'bubble-starburst-shout',
      title: 'Explosion / Alert Starburst',
      category: 'bubbles',
      tags: ['shout', 'explosion', 'starburst', 'sale', 'new', 'pop', 'wow', 'alert'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="32,8 38,18 50,14 48,26 60,30 52,40 58,50 46,48 42,60 32,52 22,60 18,48 6,50 12,40 4,30 16,26 14,14 26,18"/>
      </svg>`
    },

    // ─── 9. DOODLES & ICONS ───
    {
      id: 'doodle-lightbulb-spark',
      title: 'Idea Lightbulb',
      category: 'doodles',
      tags: ['idea', 'lightbulb', 'solution', 'spark', 'creative', 'bright'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8a18 18 0 0 0-14 29c3 3 5 7 5 11h18c0-4 2-8 5-11a18 18 0 0 0-14-29z"/>
        <path d="M25 48h14M27 54h10M30 60h4M32 2v3M10 16l3 2M54 16l-3 2M4 32h4M56 32h4"/>
      </svg>`
    },
    {
      id: 'doodle-target-kpi',
      title: 'Bullseye Target',
      category: 'doodles',
      tags: ['target', 'goal', 'bullseye', 'aim', 'focus', 'objective'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <circle cx="32" cy="32" r="16"/>
        <circle cx="32" cy="32" r="8"/>
        <path d="M48 16l10-10M58 6h-6M58 6v6M32 32l16-16"/>
      </svg>`
    },
    {
      id: 'doodle-rocket-ship',
      title: 'Startup Rocket',
      category: 'doodles',
      tags: ['rocket', 'launch', 'startup', 'fast', 'growth', 'speed'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8c8 4 16 16 16 26l-10 6-6-6-6 6-10-6c0-10 8-22 16-26z"/>
        <circle cx="32" cy="22" r="4"/>
        <path d="M16 34l-8 10 10 2 4-4M48 34l8 10-10 2-4-4M26 44v8l6 6 6-6v-8"/>
      </svg>`
    },
    {
      id: 'doodle-check-badge',
      title: 'Verified Check Badge',
      category: 'doodles',
      tags: ['check', 'done', 'badge', 'approved', 'verified', 'success', 'correct'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <path d="M20 32l8 8 16-16"/>
      </svg>`
    },
    {
      id: 'doodle-question-mark',
      title: 'Question Mark Query',
      category: 'doodles',
      tags: ['question', 'help', 'why', 'faq', 'doubt', 'ask', 'query'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 22c0-6 4-10 10-10s10 4 10 10c0 6-6 8-8 12v4"/>
        <circle cx="33" cy="54" r="2.5" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'doodle-gear-settings',
      title: 'Gear / Configuration',
      category: 'doodles',
      tags: ['gear', 'settings', 'config', 'mechanism', 'engineering', 'process'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="10"/>
        <path d="M32 12v-6M32 58v-6M12 32H6M58 32h-6M18 18l-4-4M50 50l-4-4M18 46l-4 4M50 18l-4 4"/>
      </svg>`
    },

    // ─── 10. DECORATIVE ELEMENTS ───
    {
      id: 'deco-squiggly-underline',
      title: 'Hand-drawn Underline',
      category: 'decorative',
      tags: ['underline', 'accent', 'hand-drawn', 'squiggly', 'emphasis', 'line'],
      svg: `<svg viewBox="0 0 100 24" fill="none" stroke="#1e293b" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6 14c14-8 28 8 42 0s28 8 46-2"/>
      </svg>`
    },
    {
      id: 'deco-sparkles-magic',
      title: 'Magic Sparkles',
      category: 'decorative',
      tags: ['sparkles', 'magic', 'shine', 'clean', 'star', 'highlight', 'ai'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 6l3 12 12 3-12 3-3 12-3-12-12-3 12-3z"/>
        <path d="M14 40l2 6 6 2-6 2-2 6-2-6-6-2 6-2z"/>
        <path d="M48 38l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5z"/>
      </svg>`
    },
    {
      id: 'deco-frame-corner',
      title: 'Hand-drawn Box Frame',
      category: 'decorative',
      tags: ['frame', 'box', 'border', 'card', 'container', 'outline'],
      svg: `<svg viewBox="0 0 80 60" fill="none" stroke="#1e293b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <rect x="8" y="8" width="64" height="44" rx="6"/>
      </svg>`
    },

    // ─── 12. HUMAAANS-STYLE POSES & CHARACTERS ───
    {
      id: 'char-waving',
      title: 'Person Waving Hello',
      category: 'characters',
      tags: ['waving', 'hello', 'greeting', 'friendly', 'welcome', 'person', 'human'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="28" cy="14" r="8"/>
        <path d="M28 22v18M18 30l10-4M28 26l12-8 4-8M28 40l-6 18M28 40l8 18M44 6h4"/>
      </svg>`
    },
    {
      id: 'char-running',
      title: 'Person Running Fast',
      category: 'characters',
      tags: ['running', 'speed', 'fast', 'sprint', 'athlete', 'quick', 'hurry'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="40" cy="14" r="7"/>
        <path d="M36 21l-8 14 10 4M28 35l-10-2M18 33l-6 8M38 39l10 17M28 35l-12 11-8-2M38 24l8-6 8 4"/>
      </svg>`
    },
    {
      id: 'char-walking',
      title: 'Person Walking with Bag',
      category: 'characters',
      tags: ['walking', 'commute', 'journey', 'steps', 'pedestrian', 'person', 'bag'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="14" r="7"/>
        <path d="M32 21v17M32 26l-8 8M32 26l8 6v8M24 34v6h-6v-6h6M32 38l-8 18M32 38l10 18"/>
      </svg>`
    },
    {
      id: 'char-sitting-reading',
      title: 'Person Sitting Reading',
      category: 'characters',
      tags: ['reading', 'sitting', 'relax', 'book', 'learn', 'student', 'study'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="24" cy="16" r="7"/>
        <path d="M24 23v17l16 2v14M24 40H14M24 30l12-2M36 28l6-4M36 28l6 2M42 24v8M10 56h32"/>
      </svg>`
    },
    {
      id: 'char-tablet-user',
      title: 'Person Using Tablet',
      category: 'characters',
      tags: ['tablet', 'device', 'mobile', 'working', 'screen', 'tech', 'online'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="28" cy="14" r="7"/>
        <path d="M28 21v18M28 26l8 4M28 26l-6 10 10 4M28 39l-6 17M28 39l8 17"/>
        <rect x="34" y="26" width="16" height="12" rx="2" transform="rotate(-10 34 26)"/>
      </svg>`
    },
    {
      id: 'char-jumping-joy',
      title: 'Person Leaping in Joy',
      category: 'characters',
      tags: ['joy', 'excited', 'leap', 'energy', 'triumph', 'celebration', 'happy'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="12" r="7"/>
        <path d="M32 19v15M32 23l-14-8M32 23l14-8M32 34l-12 12-6-4M32 34l12 12 6-4"/>
      </svg>`
    },
    {
      id: 'char-two-highfive',
      title: 'Colleagues High-Five',
      category: 'characters',
      tags: ['highfive', 'team', 'collaboration', 'partnership', 'success', 'friends', 'deal'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="18" cy="16" r="6"/>
        <circle cx="46" cy="16" r="6"/>
        <path d="M18 22v18l-6 16M18 40l6 16M46 22v18l-6 16M46 40l6 16"/>
        <path d="M18 28l14-10M46 28l-14-10"/>
      </svg>`
    },
    {
      id: 'char-pointing-up',
      title: 'Person with Eureka Idea',
      category: 'characters',
      tags: ['idea', 'pointing', 'eureka', 'solution', 'inspiration', 'lightbulb'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="28" cy="18" r="7"/>
        <path d="M28 25v18M28 43l-6 15M28 43l8 15M28 29l-8 8M28 29l12-10v-6"/>
        <path d="M46 6l2-2M50 10h3M48 14l3 2M42 6v-2"/>
      </svg>`
    },

    // ─── 13. NATURE & ENVIRONMENT ───
    {
      id: 'nature-tree',
      title: 'Deciduous Tree',
      category: 'nature',
      tags: ['tree', 'forest', 'nature', 'wood', 'plant', 'green', 'eco', 'organic'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 38v20M26 58h12M32 44l-6-6M32 40l6-6"/>
        <path d="M32 10c-6 0-10 4-10 9 0 1 .2 2 .5 3-4 1-6.5 4-6.5 8 0 5 4 9 9 9h24c5 0 9-4 9-9 0-4-2.5-7-6.5-8 .3-1 .5-2 .5-3 0-5-4-9-10-9z"/>
      </svg>`
    },
    {
      id: 'nature-pine',
      title: 'Pine Tree',
      category: 'nature',
      tags: ['pine', 'conifer', 'christmas', 'forest', 'mountain', 'winter', 'nature'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="32,8 18,22 24,22 14,36 22,36 10,50 54,50 42,36 50,36 40,22 46,22"/>
        <path d="M32 50v8M28 58h8"/>
      </svg>`
    },
    {
      id: 'nature-potted-plant',
      title: 'Potted Houseplant',
      category: 'nature',
      tags: ['plant', 'potted', 'leaf', 'home', 'decor', 'indoor', 'office', 'growth'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 38l4 20h16l4-20z"/>
        <path d="M16 38h32"/>
        <path d="M32 38V18"/>
        <path d="M32 28c-6-4-10-2-12 2 4 4 10 2 12-2z"/>
        <path d="M32 22c6-4 10-2 12 2-4 4-10 2-12-2z"/>
        <path d="M32 18c0-8-6-10-8-10 0 4 4 8 8 10z"/>
      </svg>`
    },
    {
      id: 'nature-mountain-sun',
      title: 'Mountain with Rising Sun',
      category: 'nature',
      tags: ['mountain', 'sun', 'peak', 'climb', 'summit', 'horizon', 'landscape', 'outdoor'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="44" cy="20" r="8"/>
        <path d="M4 54l22-30 14 18 10-12 10 24z"/>
        <path d="M26 24l6 8 8-4"/>
        <path d="M4 54h56"/>
      </svg>`
    },
    {
      id: 'nature-sprout',
      title: 'Growing Seedling Sprout',
      category: 'nature',
      tags: ['sprout', 'seedling', 'grow', 'growth', 'nurture', 'ecology', 'start', 'plant'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 52c8-4 20-4 44 0"/>
        <path d="M32 50V22"/>
        <path d="M32 30c-8-8-16-6-18 0 6 6 14 4 18 0z"/>
        <path d="M32 22c8-8 16-6 18 0-6 6-14 4-18 0z"/>
      </svg>`
    },
    {
      id: 'nature-flower',
      title: 'Blooming Flower',
      category: 'nature',
      tags: ['flower', 'bloom', 'blossom', 'petal', 'garden', 'spring', 'beauty', 'nature'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="24" r="6"/>
        <path d="M32 18V8M32 30v26M26 24H16M38 24h10M27 19l-7-7M37 19l7-7M27 29l-7 7M37 29l7 7"/>
        <path d="M32 40c-6-2-8 2-6 6 4 0 6-4 6-6z"/>
      </svg>`
    },
    {
      id: 'nature-sun-cloud',
      title: 'Sun Behind Cloud',
      category: 'nature',
      tags: ['sun', 'cloud', 'weather', 'day', 'sky', 'summer', 'forecast'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M24 18a10 10 0 0 1 18 6"/>
        <path d="M28 8v4M40 10l-2 3M16 16l3 2M48 20h4"/>
        <path d="M18 48h30a10 10 0 0 0 2-19.8 14 14 0 0 0-26.6-3.4A9 9 0 0 0 18 48z"/>
      </svg>`
    },
    {
      id: 'nature-water-drop',
      title: 'Clean Water Drop',
      category: 'nature',
      tags: ['water', 'drop', 'liquid', 'hydration', 'clean', 'eco', 'pure', 'rain'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8c0 0-18 20-18 32a18 18 0 0 0 36 0c0-12-18-32-18-32z"/>
        <path d="M26 36a8 8 0 0 0 8 8"/>
      </svg>`
    },
    {
      id: 'nature-earth-globe',
      title: 'Planet Earth Globe',
      category: 'nature',
      tags: ['earth', 'globe', 'world', 'planet', 'environment', 'sustainability', 'global'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="24"/>
        <path d="M32 8c8 8 12 16 12 24s-4 16-12 24M32 8c-8 8-12 16-12 24s4 16 12 24"/>
        <path d="M10 24h44M8 32h48M10 40h44"/>
      </svg>`
    },

    // ─── 14. ROBOTICS & AI TECH ───
    {
      id: 'tech-robot-humanoid',
      title: 'Friendly Humanoid Robot',
      category: 'tech',
      tags: ['robot', 'humanoid', 'android', 'ai', 'automation', 'bot', 'future'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="16" width="28" height="22" rx="6"/>
        <path d="M32 8v8M28 8h8M14 26v4M50 26v4"/>
        <circle cx="26" cy="26" r="3"/>
        <circle cx="38" cy="26" r="3"/>
        <path d="M26 33h12"/>
        <path d="M22 38v16h20V38M28 54v4M36 54v4M14 42h8M42 42h8"/>
      </svg>`
    },
    {
      id: 'tech-robot-arm',
      title: 'Industrial Robot Arm',
      category: 'tech',
      tags: ['robot', 'arm', 'manufacturing', 'industry', 'automation', 'assembly', 'hardware'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="52" width="20" height="6" rx="2"/>
        <circle cx="20" cy="46" r="4"/>
        <path d="M20 42l8-18"/>
        <circle cx="28" cy="24" r="4"/>
        <path d="M32 24l16 4"/>
        <circle cx="48" cy="28" r="3"/>
        <path d="M50 26l6-4M50 30l6 4"/>
      </svg>`
    },
    {
      id: 'tech-drone',
      title: 'Flying Quadcopter Drone',
      category: 'tech',
      tags: ['drone', 'quadcopter', 'fly', 'uav', 'aerial', 'delivery', 'camera'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="8"/>
        <path d="M26 26L14 14M38 26l12-12M26 38L14 50M38 38l12 12"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="52" cy="12" r="4"/>
        <circle cx="12" cy="52" r="4"/>
        <circle cx="52" cy="52" r="4"/>
        <path d="M6 12h12M46 12h12M6 52h12M46 52h12"/>
      </svg>`
    },
    {
      id: 'tech-satellite',
      title: 'Orbital Satellite',
      category: 'tech',
      tags: ['satellite', 'space', 'orbit', 'telecom', 'signal', 'gps', 'broadcast'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="24" y="24" width="16" height="16" rx="2"/>
        <path d="M10 20l14 8M10 20l8-8M18 12l14 8M6 24l8-8"/>
        <path d="M40 36l14 8M40 44l14 8M46 32l8 8M54 40l4 4"/>
        <circle cx="32" cy="32" r="3"/>
        <path d="M24 40l-8 8M12 44l4 4"/>
      </svg>`
    },
    {
      id: 'tech-neural-net',
      title: 'Neural Network / Deep Learning',
      category: 'tech',
      tags: ['neural', 'network', 'ai', 'machine learning', 'deep learning', 'nodes', 'graph'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="14" cy="20" r="5"/>
        <circle cx="14" cy="44" r="5"/>
        <circle cx="32" cy="14" r="5"/>
        <circle cx="32" cy="32" r="5"/>
        <circle cx="32" cy="50" r="5"/>
        <circle cx="50" cy="22" r="5"/>
        <circle cx="50" cy="42" r="5"/>
        <path d="M19 20l8-4M19 22l8 8M19 42l8-8M19 44l8 4M37 16l8 5M37 30l8-6M37 34l8 6M37 48l8-4"/>
      </svg>`
    },
    {
      id: 'tech-vr-headset',
      title: 'VR / AR Headset',
      category: 'tech',
      tags: ['vr', 'ar', 'metaverse', 'headset', 'virtual reality', 'gaming', 'future'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="22" width="44" height="22" rx="8"/>
        <path d="M10 32H6v-6a4 4 0 0 1 4-4M54 32h4v-6a4 4 0 0 0-4-4M28 44c1-3 3-4 4-4s3 1 4 4"/>
        <path d="M18 30h10v6H18zM36 30h10v6H36z"/>
      </svg>`
    },
    {
      id: 'tech-smartwatch',
      title: 'Smart Watch',
      category: 'tech',
      tags: ['smartwatch', 'watch', 'wearable', 'fitness', 'iot', 'heart rate'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="16" width="28" height="32" rx="8"/>
        <path d="M24 16v-8h16v8M24 48v8h16v-8M46 28h2"/>
        <path d="M24 32l4-4 4 6 4-3 4 3"/>
      </svg>`
    },
    {
      id: 'tech-microchip-cpu',
      title: 'AI Microchip Processor',
      category: 'tech',
      tags: ['chip', 'cpu', 'processor', 'silicon', 'hardware', 'semiconductor', 'ai'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="16" y="16" width="32" height="32" rx="4"/>
        <rect x="24" y="24" width="16" height="16" rx="2"/>
        <path d="M22 8v8M32 8v8M42 8v8M22 48v8M32 48v8M42 48v8"/>
        <path d="M8 22h8M8 32h8M8 42h8M48 22h8M48 32h8M48 42h8"/>
      </svg>`
    },

    // ─── 15. WORKSPACE & BUSINESS OPS ───
    {
      id: 'biz-kanban-board',
      title: 'Agile Kanban Board',
      category: 'business',
      tags: ['kanban', 'agile', 'scrum', 'tasks', 'workflow', 'board', 'sprint'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="8" y="10" width="48" height="44" rx="4"/>
        <path d="M24 10v44M40 10v44"/>
        <rect x="12" y="16" width="8" height="6" rx="1"/>
        <rect x="12" y="26" width="8" height="10" rx="1"/>
        <rect x="28" y="16" width="8" height="12" rx="1"/>
        <rect x="44" y="16" width="8" height="8" rx="1"/>
        <rect x="44" y="28" width="8" height="6" rx="1"/>
      </svg>`
    },
    {
      id: 'biz-handshake-deal',
      title: 'Handshake Partnership',
      category: 'business',
      tags: ['handshake', 'deal', 'agreement', 'contract', 'partnership', 'trust'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M8 30l12-10 10 10-6 6 8 8 12-12 12 10"/>
        <path d="M22 34l8-8 6 6-8 8M32 40l6-6M36 44l6-6M40 48l6-6"/>
        <path d="M6 32v12M58 32v12"/>
      </svg>`
    },
    {
      id: 'biz-target-bullseye',
      title: 'Target Bullseye with Arrow',
      category: 'business',
      tags: ['target', 'bullseye', 'goal', 'mission', 'focus', 'objective', 'kpi'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="22"/>
        <circle cx="32" cy="32" r="14"/>
        <circle cx="32" cy="32" r="6"/>
        <path d="M54 10L32 32M44 10h10v10"/>
      </svg>`
    },
    {
      id: 'biz-podium-trophy',
      title: 'Trophy on Winner Podium',
      category: 'business',
      tags: ['trophy', 'winner', 'first', 'podium', 'achievement', 'award', 'rank'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 14h20v10a10 10 0 0 1-20 0V14z"/>
        <path d="M22 18h-6a4 4 0 0 0 4 6h2M42 18h6a4 4 0 0 1-4 6h-2"/>
        <path d="M32 24v8M26 32h12"/>
        <path d="M20 40h24v18H20zM8 46h12v12H8zM44 48h12v10H44z"/>
      </svg>`
    },
    {
      id: 'biz-analytics-funnel',
      title: 'Conversion Funnel',
      category: 'business',
      tags: ['funnel', 'sales', 'conversion', 'leads', 'analytics', 'pipeline'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 12h44l-16 22v16l-12-6V34L10 12z"/>
        <path d="M18 20h28M24 28h16M28 36h8"/>
      </svg>`
    },
    {
      id: 'biz-sticky-notes',
      title: 'Brainstorm Sticky Notes',
      category: 'business',
      tags: ['sticky', 'notes', 'postit', 'brainstorm', 'ideas', 'planning'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 12h24v24H12zM28 28h18v16l-8 8H28z"/>
        <path d="M38 44v8h8"/>
        <path d="M16 18h16M16 24h12M32 34h10M32 40h6"/>
      </svg>`
    },
    {
      id: 'biz-shield-secure',
      title: 'Cybersecurity Trust Shield',
      category: 'business',
      tags: ['shield', 'security', 'privacy', 'protection', 'safe', 'trust', 'verified'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8l18 8v16c0 14-18 24-18 24S14 46 14 32V16l18-8z"/>
        <path d="M24 32l6 6 12-12"/>
      </svg>`
    },
    {
      id: 'biz-megaphone-loud',
      title: 'Marketing Megaphone',
      category: 'business',
      tags: ['megaphone', 'announce', 'marketing', 'broadcast', 'news', 'promotion', 'alert'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 24h8l18-12v36L18 36h-8a2 2 0 0 1-2-2V26a2 2 0 0 1 2-2z"/>
        <path d="M22 36l3 16h6l-3-16M42 20c4 4 4 16 0 20M48 14c8 8 8 28 0 36"/>
      </svg>`
    },

    // ─── 16. VIDEOSCRIBE-STYLE COLOR CLIP ART ───
    {
      id: 'color-laptop-analytics',
      title: 'Analytics Dashboard Laptop',
      category: 'color',
      tags: ['laptop', 'computer', 'analytics', 'chart', 'screen', 'dashboard', 'color', 'clipart', 'tech'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="12" y="14" width="40" height="24" rx="2" fill="#dbeafe"/>
        <rect x="17" y="24" width="5" height="10" fill="#3b82f6"/>
        <rect x="25" y="19" width="5" height="15" fill="#10b981"/>
        <rect x="33" y="27" width="5" height="7" fill="#f59e0b"/>
        <rect x="41" y="21" width="5" height="13" fill="#8b5cf6"/>
        <rect x="10" y="12" width="44" height="28" rx="3"/>
        <path d="M4 48h56l-4-8H8l-4 8z" fill="#f1f5f9"/>
        <path d="M26 44h12"/>
      </svg>`
    },
    {
      id: 'color-smartphone-app',
      title: 'Mobile Phone App',
      category: 'color',
      tags: ['phone', 'smartphone', 'mobile', 'app', 'notification', 'color', 'clipart', 'tech'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="8" width="28" height="48" rx="6" fill="#f8fafc"/>
        <rect x="22" y="16" width="20" height="32" rx="2" fill="#e0f2fe"/>
        <rect x="25" y="20" width="14" height="6" rx="2" fill="#38bdf8"/>
        <rect x="25" y="29" width="10" height="6" rx="2" fill="#818cf8"/>
        <circle cx="44" cy="12" r="5" fill="#ef4444"/>
        <rect x="18" y="8" width="28" height="48" rx="6"/>
        <path d="M30 12h4M32 51h.01"/>
      </svg>`
    },
    {
      id: 'color-lightbulb-idea',
      title: 'Golden Idea Lightbulb',
      category: 'color',
      tags: ['lightbulb', 'bulb', 'idea', 'creative', 'smart', 'spark', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 24c0-6 4.5-12 10-12s10 6 10 12c0 4-2 7-4 10l-2 6H28l-2-6c-2-3-4-6-4-10z" fill="#fef08a"/>
        <path d="M28 42h8v4h-8z" fill="#cbd5e1"/>
        <path d="M30 46h4v3h-4z" fill="#94a3b8"/>
        <path d="M22 24c0-6 4.5-12 10-12s10 6 10 12c0 4-2 7-4 10l-2 6H28l-2-6c-2-3-4-6-4-10z"/>
        <path d="M28 42h8M29 46h6M30 50h4"/>
        <path d="M32 4v4M12 16l4 3M52 16l-4 3M8 32h4M52 32h4"/>
      </svg>`
    },
    {
      id: 'color-rocket-launch',
      title: 'Space Rocket Launch',
      category: 'color',
      tags: ['rocket', 'launch', 'startup', 'growth', 'speed', 'space', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8c8 10 12 24 12 34H20c0-10 4-24 12-34z" fill="#f8fafc"/>
        <path d="M32 8c5 6 8 13 8 18H24c0-5 3-12 8-18z" fill="#ef4444"/>
        <circle cx="32" cy="32" r="5" fill="#38bdf8"/>
        <path d="M20 34l-8 8v4l8-2" fill="#3b82f6"/>
        <path d="M44 34l8 8v4l-8-2" fill="#3b82f6"/>
        <path d="M26 42l6 14 6-14z" fill="#f59e0b"/>
        <path d="M29 42l3 8 3-8z" fill="#fef08a"/>
        <path d="M32 8c8 10 12 24 12 34H20c0-10 4-24 12-34z"/>
        <circle cx="32" cy="32" r="5"/>
        <path d="M20 34l-8 8v4l8-2M44 34l8 8v4l-8-2M25 42l7 14 7-14"/>
      </svg>`
    },
    {
      id: 'color-trophy-gold',
      title: 'Gold Champion Trophy',
      category: 'color',
      tags: ['trophy', 'winner', 'first', 'award', 'achievement', 'success', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 12h24v16a12 12 0 0 1-24 0V12z" fill="#fde047"/>
        <path d="M20 16H12a6 6 0 0 0 6 8h2" fill="#fef08a"/>
        <path d="M44 16h8a6 6 0 0 1-6 8h-2" fill="#fef08a"/>
        <path d="M32 28v12M24 40h16v6H24z" fill="#fbbf24"/>
        <path d="M18 46h28v8H18z" fill="#1e293b"/>
        <path d="M20 12h24v16a12 12 0 0 1-24 0V12z"/>
        <path d="M20 16H12a6 6 0 0 0 6 8h2M44 16h8a6 6 0 0 1-6 8h-2M32 28v12M22 40h20v6H22zM16 46h32v8H16z"/>
        <path d="M29 20l3-3 3 3-1 4h-4z" fill="#f59e0b"/>
      </svg>`
    },
    {
      id: 'color-target-bullseye',
      title: 'Target Bullseye Arrow',
      category: 'color',
      tags: ['target', 'bullseye', 'goal', 'mission', 'focus', 'objective', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="30" cy="34" r="22" fill="#fee2e2"/>
        <circle cx="30" cy="34" r="16" fill="#ffffff"/>
        <circle cx="30" cy="34" r="10" fill="#ef4444"/>
        <circle cx="30" cy="34" r="4" fill="#ffffff"/>
        <circle cx="30" cy="34" r="22"/>
        <circle cx="30" cy="34" r="16"/>
        <circle cx="30" cy="34" r="10"/>
        <path d="M54 10L30 34" stroke="#1e293b"/>
        <path d="M42 10h12v12" fill="#10b981" stroke="#1e293b"/>
      </svg>`
    },
    {
      id: 'color-team-presentation',
      title: 'Speaker Presenting Chart',
      category: 'color',
      tags: ['presentation', 'speaker', 'chart', 'growth', 'meeting', 'business', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="28" y="10" width="28" height="24" rx="2" fill="#eff6ff"/>
        <path d="M32 26l6-6 6 4 8-8" stroke="#10b981" stroke-width="2.5"/>
        <rect x="28" y="10" width="28" height="24" rx="2"/>
        <path d="M42 34v16M36 50l6-4 6 4"/>
        <circle cx="16" cy="18" r="6" fill="#fed7aa"/>
        <path d="M10 44c0-7 4-12 11-12s11 5 11 12" fill="#fb923c"/>
        <path d="M16 24v16l-4 16M16 40l6 16M22 28l12-8"/>
      </svg>`
    },
    {
      id: 'color-developer-laptop',
      title: 'Developer Coding',
      category: 'color',
      tags: ['developer', 'coder', 'engineer', 'laptop', 'tech', 'software', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="18" r="8" fill="#fed7aa"/>
        <path d="M24 16c2-4 7-6 16-2" fill="#3b82f6"/>
        <path d="M18 52c0-8 6-14 14-14s14 6 14 14" fill="#14b8a6"/>
        <rect x="20" y="38" width="24" height="14" rx="2" fill="#e2e8f0"/>
        <rect x="23" y="41" width="18" height="8" rx="1" fill="#38bdf8"/>
        <path d="M16 54h32"/>
        <path d="M27 20h2M35 20h2"/>
      </svg>`
    },
    {
      id: 'color-shopping-cart',
      title: 'Online Shopping Cart',
      category: 'color',
      tags: ['shopping', 'cart', 'ecommerce', 'store', 'buy', 'order', 'gift', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="24" y="16" width="12" height="14" rx="2" fill="#f43f5e"/>
        <rect x="34" y="20" width="14" height="10" rx="2" fill="#3b82f6"/>
        <path d="M12 14h8l6 24h24l6-18H22" fill="#fef08a"/>
        <path d="M12 14h8l6 24h24l6-18H22"/>
        <circle cx="28" cy="48" r="4" fill="#1e293b"/>
        <circle cx="48" cy="48" r="4" fill="#1e293b"/>
      </svg>`
    },
    {
      id: 'color-cloud-database',
      title: 'Cloud Database Server',
      category: 'color',
      tags: ['cloud', 'database', 'server', 'hosting', 'storage', 'data', 'color', 'clipart', 'tech'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 30a10 10 0 0 1 18-4 12 12 0 0 1 16 11 8 8 0 0 1-6 8H16a8 8 0 0 1 2-15z" fill="#bae6fd"/>
        <ellipse cx="32" cy="40" rx="12" ry="4" fill="#c084fc"/>
        <path d="M20 40v8c0 2 5 4 12 4s12-2 12-4v-8" fill="#e9d5ff"/>
        <ellipse cx="32" cy="40" rx="12" ry="4"/>
        <path d="M20 40v8c0 2 5 4 12 4s12-2 12-4v-8"/>
        <path d="M18 30a10 10 0 0 1 18-4 12 12 0 0 1 16 11 8 8 0 0 1-6 8H16a8 8 0 0 1 2-15z"/>
      </svg>`
    },
    {
      id: 'color-credit-card',
      title: 'Secure Credit Card',
      category: 'color',
      tags: ['payment', 'credit card', 'finance', 'money', 'banking', 'secure', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="8" y="16" width="48" height="32" rx="5" fill="#10b981"/>
        <rect x="8" y="24" width="48" height="7" fill="#064e3b"/>
        <rect x="14" y="36" width="10" height="7" rx="2" fill="#fde047"/>
        <circle cx="42" cy="40" r="4" fill="#f87171"/>
        <circle cx="47" cy="40" r="4" fill="#fbbf24"/>
        <rect x="8" y="16" width="48" height="32" rx="5"/>
      </svg>`
    },
    {
      id: 'color-calendar-event',
      title: 'Calendar Schedule',
      category: 'color',
      tags: ['calendar', 'date', 'schedule', 'event', 'deadline', 'planning', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="14" width="44" height="40" rx="5" fill="#ffffff"/>
        <path d="M10 14h44v12H10z" fill="#ef4444"/>
        <circle cx="32" cy="38" r="6" fill="#fde047"/>
        <path d="M32 34l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" fill="#f59e0b"/>
        <rect x="10" y="14" width="44" height="40" rx="5"/>
        <path d="M10 26h44M20 10v8M44 10v8"/>
      </svg>`
    },
    {
      id: 'color-shield-verified',
      title: 'Verified Security Shield',
      category: 'color',
      tags: ['shield', 'security', 'protection', 'safe', 'verified', 'trust', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8l18 8v16c0 14-18 24-18 24S14 46 14 32V16l18-8z" fill="#dbeafe"/>
        <path d="M32 12l14 6v14c0 11-14 19-14 19S18 43 18 32V18l14-6z" fill="#3b82f6"/>
        <path d="M24 32l6 6 12-12" stroke="#ffffff" stroke-width="3.5"/>
        <path d="M32 8l18 8v16c0 14-18 24-18 24S14 46 14 32V16l18-8z"/>
        <path d="M24 32l6 6 12-12"/>
      </svg>`
    },
    {
      id: 'color-coffee-donut',
      title: 'Coffee Cup & Donut',
      category: 'color',
      tags: ['coffee', 'donut', 'cafe', 'breakfast', 'food', 'relax', 'break', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 26l4 24h16l4-24z" fill="#fef3c7"/>
        <path d="M15 32h22l-1 10H16z" fill="#0d9488"/>
        <path d="M12 26h28v-4H12z" fill="#ffffff"/>
        <circle cx="44" cy="42" r="10" fill="#fed7aa"/>
        <circle cx="44" cy="42" r="9" fill="#f472b6"/>
        <circle cx="44" cy="42" r="4" fill="#ffffff"/>
        <path d="M14 26l4 24h16l4-24z"/>
        <circle cx="44" cy="42" r="10"/>
        <circle cx="44" cy="42" r="4"/>
      </svg>`
    },
    {
      id: 'color-plant-succulent',
      title: 'Potted Succulent',
      category: 'color',
      tags: ['plant', 'succulent', 'flower', 'green', 'garden', 'nature', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 36l4 20h16l4-20z" fill="#fb923c"/>
        <path d="M16 36h32" fill="#ea580c"/>
        <path d="M32 14c-6 4-8 12-4 18 4 6 8 6 8 6s4 0 8-6c4-6 2-14-4-18-2-3-6-3-8 0z" fill="#4ade80"/>
        <path d="M32 20c-3 3-4 8-2 11 3 4 5 4 5 4s2 0 5-4c2-3 1-8-2-11-2-2-4-2-6 0z" fill="#86efac"/>
        <path d="M20 36l4 20h16l4-20z"/>
        <path d="M16 36h32M32 38v-8"/>
      </svg>`
    },
    {
      id: 'color-paint-palette',
      title: 'Artist Paint Palette',
      category: 'color',
      tags: ['paint', 'palette', 'art', 'artist', 'creative', 'design', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 10C18 10 8 18 8 32c0 12 8 22 22 22 4 0 6-3 6-6 0-3 1-4 3-4h4c10 0 15-8 15-16C58 18 46 10 32 10z" fill="#fde68a"/>
        <circle cx="20" cy="24" r="4" fill="#ef4444"/>
        <circle cx="32" cy="18" r="4" fill="#3b82f6"/>
        <circle cx="44" cy="24" r="4" fill="#10b981"/>
        <circle cx="48" cy="36" r="4" fill="#8b5cf6"/>
        <circle cx="40" cy="46" r="3" fill="#f97316"/>
        <path d="M32 10C18 10 8 18 8 32c0 12 8 22 22 22 4 0 6-3 6-6 0-3 1-4 3-4h4c10 0 15-8 15-16C58 18 46 10 32 10z"/>
        <circle cx="26" cy="44" r="4" fill="#ffffff" stroke="#1e293b"/>
      </svg>`
    },
    {
      id: 'color-books-stack',
      title: 'Study Books Stack',
      category: 'color',
      tags: ['books', 'study', 'education', 'reading', 'school', 'learn', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="14" y="38" width="36" height="12" rx="2" fill="#3b82f6"/>
        <rect x="18" y="26" width="32" height="12" rx="2" fill="#ef4444"/>
        <rect x="22" y="14" width="28" height="12" rx="2" fill="#10b981"/>
        <path d="M32 14v8l3-3 3 3v-8" fill="#fde047"/>
        <rect x="14" y="38" width="36" height="12" rx="2"/>
        <rect x="18" y="26" width="32" height="12" rx="2"/>
        <rect x="22" y="14" width="28" height="12" rx="2"/>
      </svg>`
    },
    {
      id: 'color-music-headphones',
      title: 'Vibrant Headphones',
      category: 'color',
      tags: ['headphones', 'music', 'audio', 'sound', 'song', 'listen', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 36A20 20 0 0 1 52 36" stroke="#8b5cf6" stroke-width="4"/>
        <rect x="8" y="32" width="10" height="18" rx="4" fill="#06b6d4"/>
        <rect x="46" y="32" width="10" height="18" rx="4" fill="#06b6d4"/>
        <path d="M12 36A20 20 0 0 1 52 36"/>
        <rect x="8" y="32" width="10" height="18" rx="4"/>
        <rect x="46" y="32" width="10" height="18" rx="4"/>
        <path d="M32 26v10m0-5a3 3 0 1 1-3-3" stroke="#f59e0b"/>
      </svg>`
    },
    {
      id: 'color-chat-bubbles',
      title: 'Speech & Chat Bubbles',
      category: 'color',
      tags: ['chat', 'bubbles', 'message', 'talk', 'conversation', 'feedback', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 26c0-9 8-16 18-16s18 7 18 16c0 8-7 14-15 15l-6 5 1-6c-9-1-16-7-16-14z" fill="#93c5fd"/>
        <path d="M48 30c5 1 8 6 8 11 0 3-1 6-4 8l1 4-4-2c-2 1-4 1-6 1-6 0-11-4-11-10" fill="#fca5a5"/>
        <path d="M10 26c0-9 8-16 18-16s18 7 18 16c0 8-7 14-15 15l-6 5 1-6c-9-1-16-7-16-14z"/>
        <path d="M22 26h.01M28 26h.01M34 26h.01"/>
      </svg>`
    },
    {
      id: 'color-ai-brain',
      title: 'AI Neural Brain',
      category: 'color',
      tags: ['brain', 'ai', 'neural', 'mind', 'intellect', 'machine learning', 'future', 'color', 'clipart'],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 12c-4-4-12-4-16 2-4 5-3 12 1 16-3 4-2 10 2 14s10 3 13-2" fill="#f472b6"/>
        <path d="M32 12c4-4 12-4 16 2 4 5 3 12-1 16 3 4 2 10-2 14s-10 3-13-2" fill="#38bdf8"/>
        <path d="M32 12v36M24 24h8M32 34h8M22 36h10M32 22h10"/>
        <circle cx="20" cy="24" r="2" fill="#fde047"/>
        <circle cx="44" cy="22" r="2" fill="#fde047"/>
        <circle cx="20" cy="36" r="2" fill="#fde047"/>
        <circle cx="44" cy="34" r="2" fill="#fde047"/>
        <path d="M32 12c-4-4-12-4-16 2-4 5-3 12 1 16-3 4-2 10 2 14s10 3 13-2M32 12c4-4 12-4 16 2 4 5 3 12-1 16 3 4 2 10-2 14s-10 3-13-2"/>
      </svg>`
    },
    // ─── OPEN DOODLES & UNDRAW VECTORS ───
    {
      id: "od-reading",
      title: "Reading Book (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","reading","book","person","relax","learn","student","study","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="26" cy="18" r="8" fill="#fed7aa"/>
        <path d="M22 14c2-4 7-5 11-2" stroke="#ea580c"/>
        <path d="M24 19h.01" stroke-width="3"/>
        <path d="M22 26c-6 5-10 14-6 22 2 4 8 6 16 6 8 0 16-3 20-8" fill="#38bdf8"/>
        <path d="M16 48c4 4 12 6 22 6s16-3 20-8" stroke="#0284c7"/>
        <path d="M38 34l8 12M32 38l12 10" stroke="#1e293b"/>
        <path d="M36 28l-8 10 10 4 8-10z" fill="#fde047"/>
        <path d="M36 28l12-4 6 10-10 4z" fill="#ffffff"/>
        <path d="M28 38l8-10 12-4 6 10-10 4-8 10z"/>
        <path d="M36 28v14"/>
      </svg>`
    },
    {
      id: "od-chilling",
      title: "Chilling with Coffee (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","chilling","coffee","sitting","relax","break","peace","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="30" cy="18" r="8" fill="#fed7aa"/>
        <path d="M24 14c3-4 8-5 12-3" stroke="#475569"/>
        <path d="M32 18h.01" stroke-width="3"/>
        <path d="M26 26c-4 6-6 15 2 20 6 4 16 2 22-2" fill="#a78bfa"/>
        <path d="M14 52c6-4 16-2 24-2s14 4 18 2" stroke="#7c3aed" stroke-width="3"/>
        <path d="M20 48c4-6 10-8 16-8s10 4 14 10" fill="#fed7aa"/>
        <path d="M40 32h8v10h-8z" fill="#f43f5e"/>
        <path d="M48 35c3 0 4 2 4 4s-1 4-4 4"/>
        <path d="M42 28c1-2 0-4 1-5M45 28c1-2 0-4 1-5" stroke="#f43f5e"/>
      </svg>`
    },
    {
      id: "od-dancing",
      title: "Groovy Dancing (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","dancing","dance","happy","party","fun","joy","music","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="16" r="8" fill="#fef08a"/>
        <path d="M28 12c4-3 9-2 11 2" stroke="#ea580c"/>
        <path d="M30 17h.01M36 17h.01" stroke-width="3"/>
        <path d="M31 20c1 1 3 1 4 0"/>
        <path d="M28 24c-6 4-8 10-6 18 2 6 8 8 16 6 6-2 8-8 6-16l-4-8z" fill="#f472b6"/>
        <path d="M22 28l-8-10M42 26l10-8" stroke="#1e293b" stroke-width="3"/>
        <path d="M26 44l-6 14M38 42l8 14" stroke="#1e293b" stroke-width="3"/>
        <circle cx="12" cy="16" r="2" fill="#38bdf8"/>
        <circle cx="54" cy="16" r="2" fill="#38bdf8"/>
        <path d="M50 36l3 3M12 34l3 3" stroke="#f59e0b"/>
      </svg>`
    },
    {
      id: "od-loving",
      title: "Loving Big Heart (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","loving","heart","hug","love","care","sweet","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="18" r="8" fill="#fed7aa"/>
        <path d="M30 19h.01M36 19h.01" stroke-width="3"/>
        <path d="M32 22c1 1 2 1 3 0"/>
        <path d="M32 26c-8-12-22-2-12 10l12 12 12-12c10-12-4-22-12-10z" fill="#f43f5e"/>
        <path d="M22 34c-4 2-6 8-4 12M42 34c4 2 6 8 4 12" stroke="#fed7aa" stroke-width="4"/>
        <path d="M26 48l-4 10M38 48l4 10" stroke="#1e293b" stroke-width="3"/>
      </svg>`
    },
    {
      id: "od-meditating",
      title: "Meditating Zen (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","meditating","zen","yoga","peace","mindfulness","lotus","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="18" r="8" fill="#fed7aa"/>
        <path d="M26 14c3-4 9-4 13 0" stroke="#047857"/>
        <path d="M29 18c1 1 2 1 3 0M34 18c1 1 2 1 3 0"/>
        <path d="M24 26h16l4 16H20z" fill="#34d399"/>
        <path d="M14 46c6-4 14-6 18-2 4-4 12-2 18 2-6 8-30 8-36 0z" fill="#059669"/>
        <path d="M20 32l-8 6 6 4M44 32l8 6-6 4" stroke="#1e293b"/>
        <circle cx="32" cy="6" r="2" fill="#f59e0b"/>
      </svg>`
    },
    {
      id: "od-sprinting",
      title: "Sprinting Forward (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","running","sprint","fast","sport","exercise","speed","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="44" cy="18" r="8" fill="#fed7aa"/>
        <path d="M38 14c3-4 8-5 12-2" stroke="#2563eb"/>
        <path d="M44 19h.01" stroke-width="3"/>
        <path d="M28 28l12-4 4 12-14 6z" fill="#60a5fa"/>
        <path d="M40 26l8-8M28 28l-12 6" stroke="#1e293b" stroke-width="3"/>
        <path d="M36 38l-14 8-8 10M30 42l12 6 8 8" stroke="#1e293b" stroke-width="3"/>
        <path d="M8 32h8M6 38h12M10 44h8" stroke="#93c5fd" stroke-width="2"/>
      </svg>`
    },
    {
      id: "od-dog-walking",
      title: "Walking Dog (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","dog","pet","walk","puppy","animal","leash","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="22" cy="16" r="7" fill="#fed7aa"/>
        <path d="M18 23l2 20h8l-2-20z" fill="#fbbf24"/>
        <path d="M18 43l-4 15M24 43l4 15" stroke="#1e293b" stroke-width="3"/>
        <path d="M24 28l12 8" stroke="#1e293b" stroke-width="2"/>
        <ellipse cx="48" cy="46" rx="9" ry="6" fill="#f97316"/>
        <circle cx="56" cy="40" r="5" fill="#f97316"/>
        <path d="M58 37c2-3 4-2 4 1M55 42h.01" stroke-width="2"/>
        <path d="M42 48l-2 10M46 48l-1 10M52 48l2 10M56 48l2 10" stroke="#1e293b" stroke-width="2"/>
        <path d="M36 36l16 8" stroke="#ef4444" stroke-width="2"/>
      </svg>`
    },
    {
      id: "od-idea",
      title: "Bright Idea (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","idea","lightbulb","inspiration","thought","creativity","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="26" cy="28" r="8" fill="#fed7aa"/>
        <path d="M20 24c3-4 8-4 12-1" stroke="#4f46e5"/>
        <path d="M26 29h.01" stroke-width="3"/>
        <path d="M22 36l2 20h10l-2-20z" fill="#818cf8"/>
        <path d="M28 38l12-16" stroke="#1e293b" stroke-width="3"/>
        <path d="M48 12c-4-4-10-2-10 4 0 3 2 5 4 7h6c2-2 4-4 4-7z" fill="#fde047"/>
        <path d="M42 23h6v3h-6z" fill="#94a3b8"/>
        <path d="M45 4v4M33 10l3 3M57 10l-3 3" stroke="#eab308" stroke-width="2.5"/>
      </svg>`
    },
    {
      id: "od-working",
      title: "Working on Laptop (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","laptop","work","coder","developer","remote","desk","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="26" cy="18" r="8" fill="#fed7aa"/>
        <path d="M22 14c3-4 8-4 12-1" stroke="#0284c7"/>
        <path d="M28 19h.01" stroke-width="3"/>
        <path d="M22 26c-4 5-6 14 0 20 6 4 14 2 18-2" fill="#38bdf8"/>
        <path d="M26 36l10 4M32 34l8 4" stroke="#fed7aa" stroke-width="3"/>
        <path d="M36 34l12-4-2-8-10 4z" fill="#cbd5e1"/>
        <path d="M34 40h18l-4 4H32z" fill="#64748b"/>
        <path d="M18 52c6-2 16-2 22 2" stroke="#1e293b" stroke-width="3"/>
      </svg>`
    },
    {
      id: "od-coffee",
      title: "Morning Coffee Sip (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","coffee","mug","sip","morning","drink","cafe","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="28" cy="20" r="9" fill="#fed7aa"/>
        <path d="M22 15c4-4 10-4 14 0" stroke="#78350f"/>
        <path d="M26 21c1 1 2 1 3 0"/>
        <path d="M24 29c-4 6-4 16 2 21 6 4 14 2 18-2" fill="#fb923c"/>
        <path d="M34 24h10v12h-10z" fill="#ef4444"/>
        <path d="M44 28c3 0 4 2 4 4s-1 4-4 4"/>
        <path d="M36 18c1-2 0-4 1-6M40 18c1-2 0-4 1-6" stroke="#94a3b8" stroke-width="2"/>
        <path d="M28 28l6-4" stroke="#fed7aa" stroke-width="3"/>
      </svg>`
    },
    {
      id: "od-strolling",
      title: "Casual Strolling (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","stroll","walk","chill","steps","calm","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="14" r="7" fill="#fed7aa"/>
        <path d="M28 10c3-3 8-3 10 1" stroke="#047857"/>
        <path d="M34 15h.01" stroke-width="3"/>
        <path d="M28 21h8l2 18h-12z" fill="#10b981"/>
        <path d="M28 39l-6 19M36 39l8 19" stroke="#1e293b" stroke-width="3"/>
        <path d="M26 24l-3 10M38 24l3 10" stroke="#fed7aa" stroke-width="3"/>
        <path d="M18 60c8 0 28 0 32 0" stroke="#cbd5e1" stroke-width="2"/>
      </svg>`
    },
    {
      id: "od-celebrating",
      title: "Celebrating Win (Open Doodles)",
      category: "opendoodles",
      tags: ["opendoodles","celebrating","win","party","success","confetti","yay","sketch","doodle","color"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="18" r="8" fill="#fed7aa"/>
        <path d="M28 13c3-3 8-3 11 1" stroke="#d97706"/>
        <path d="M30 18h.01M36 18h.01" stroke-width="3"/>
        <path d="M31 21c1 1 3 1 4 0"/>
        <path d="M26 26h12l2 18H24z" fill="#ec4899"/>
        <path d="M24 28L12 14M40 28l12-14" stroke="#1e293b" stroke-width="3"/>
        <path d="M28 44l-4 16M36 44l4 16" stroke="#1e293b" stroke-width="3"/>
        <circle cx="16" cy="8" r="2" fill="#3b82f6"/>
        <circle cx="48" cy="8" r="2" fill="#eab308"/>
        <path d="M32 6l2 4-4-2z" fill="#10b981"/>
        <circle cx="24" cy="6" r="1.5" fill="#f43f5e"/>
        <circle cx="40" cy="6" r="1.5" fill="#8b5cf6"/>
      </svg>`
    },
    {
      id: "undraw-growth-analytics",
      title: "Growth Analytics Dashboard (unDraw)",
      category: "undraw",
      tags: ["undraw","analytics","growth","chart","dashboard","metrics","stats","business","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="8" y="10" width="48" height="38" rx="4" fill="#f8fafc"/>
        <path d="M8 20h48"/>
        <circle cx="14" cy="15" r="1.5" fill="#ef4444"/>
        <circle cx="19" cy="15" r="1.5" fill="#f59e0b"/>
        <circle cx="24" cy="15" r="1.5" fill="#10b981"/>
        <rect x="14" y="32" width="6" height="12" fill="#38bdf8"/>
        <rect x="24" y="26" width="6" height="18" fill="#6366f1"/>
        <rect x="34" y="30" width="6" height="14" fill="#a855f7"/>
        <rect x="44" y="22" width="6" height="22" fill="#10b981"/>
        <path d="M14 34l10-8 10 4 16-10" stroke="#f43f5e" stroke-width="2.5"/>
        <circle cx="50" cy="20" r="3" fill="#f43f5e"/>
        <path d="M22 54h20M32 48v6"/>
      </svg>`
    },
    {
      id: "undraw-rocket-launch",
      title: "Startup Rocket Launch (unDraw)",
      category: "undraw",
      tags: ["undraw","rocket","launch","startup","fly","space","speed","grow","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M38 10c8 2 16 10 16 22-8 0-16-4-20-8l4-14z" fill="#6366f1"/>
        <path d="M38 10c-6 0-14 6-16 14 6 4 14 6 20 2l-4-16z" fill="#818cf8"/>
        <circle cx="38" cy="22" r="4" fill="#38bdf8"/>
        <path d="M22 24l-8 4 4 10 6-2M48 36l4 8-10 2-2-6" fill="#f43f5e"/>
        <path d="M26 36c-4 6-6 14-2 18 6 2 12-2 16-6" fill="#f59e0b"/>
        <path d="M28 40c-2 4-2 8 0 10 3 0 6-2 8-4" fill="#ef4444"/>
        <path d="M12 14l2 4 4-2-2-4zM52 14l1 3 3-1-1-3z" fill="#fde047"/>
      </svg>`
    },
    {
      id: "undraw-cloud-sync",
      title: "Cloud Infrastructure & Sync (unDraw)",
      category: "undraw",
      tags: ["undraw","cloud","sync","hosting","server","database","network","tech","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M18 36c-6 0-10-4-10-10 0-5 4-9 9-9 2-6 8-11 15-11 9 0 16 6 18 14 5 1 8 5 8 10 0 6-5 10-11 10H18z" fill="#bae6fd"/>
        <rect x="18" y="42" width="28" height="8" rx="2" fill="#64748b"/>
        <rect x="18" y="52" width="28" height="8" rx="2" fill="#475569"/>
        <circle cx="23" cy="46" r="1.5" fill="#22c55e"/>
        <circle cx="23" cy="56" r="1.5" fill="#22c55e"/>
        <path d="M32 30v8M28 34l4-4 4 4" stroke="#0284c7" stroke-width="2.5"/>
      </svg>`
    },
    {
      id: "undraw-team-collaboration",
      title: "Team Collaboration & Brainstorm (unDraw)",
      category: "undraw",
      tags: ["undraw","team","collaboration","people","meeting","discussion","work","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="20" cy="18" r="6" fill="#fed7aa"/>
        <path d="M12 36c0-6 4-10 10-10h2c6 0 10 4 10 10" fill="#6366f1"/>
        <circle cx="44" cy="18" r="6" fill="#fed7aa"/>
        <path d="M36 36c0-6 4-10 10-10h2c6 0 10 4 10 10" fill="#ec4899"/>
        <rect x="14" y="36" width="36" height="16" rx="3" fill="#cbd5e1"/>
        <path d="M22 52v8M42 52v8"/>
        <path d="M28 20c0-4 3-6 6-6s6 2 6 6-4 4-6 6v2" stroke="#eab308" stroke-width="2"/>
        <circle cx="34" cy="30" r="1" fill="#eab308"/>
      </svg>`
    },
    {
      id: "undraw-mobile-app",
      title: "Mobile App Mockup (unDraw)",
      category: "undraw",
      tags: ["undraw","mobile","phone","app","ui","ux","device","smartphone","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="8" width="28" height="48" rx="5" fill="#f8fafc"/>
        <path d="M28 12h8"/>
        <rect x="22" y="16" width="20" height="12" rx="3" fill="#6366f1"/>
        <rect x="22" y="32" width="9" height="9" rx="2" fill="#38bdf8"/>
        <rect x="33" y="32" width="9" height="9" rx="2" fill="#ec4899"/>
        <rect x="22" y="44" width="20" height="4" rx="2" fill="#cbd5e1"/>
        <circle cx="32" cy="52" r="1.5" fill="#94a3b8"/>
      </svg>`
    },
    {
      id: "undraw-security-shield",
      title: "Security Shield & Lock (unDraw)",
      category: "undraw",
      tags: ["undraw","security","shield","lock","safe","protection","privacy","cyber","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 8l18 6v14c0 14-10 22-18 26-8-4-18-12-18-26V14l18-6z" fill="#dbeafe"/>
        <path d="M32 8v46c8-4 18-12 18-26V14l-18-6z" fill="#93c5fd"/>
        <rect x="24" y="26" width="16" height="14" rx="3" fill="#f59e0b"/>
        <path d="M27 26v-4c0-3 2-5 5-5s5 2 5 5v4"/>
        <circle cx="32" cy="32" r="2" fill="#1e293b"/>
        <path d="M32 34v3"/>
      </svg>`
    },
    {
      id: "undraw-online-shopping",
      title: "Online Shopping Cart (unDraw)",
      category: "undraw",
      tags: ["undraw","shopping","cart","store","ecommerce","retail","buy","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 14h8l6 24h24l4-16H22" stroke-width="2.5"/>
        <circle cx="26" cy="48" r="4" fill="#3b82f6"/>
        <circle cx="44" cy="48" r="4" fill="#3b82f6"/>
        <rect x="28" y="10" width="10" height="12" rx="2" fill="#f43f5e"/>
        <rect x="36" y="14" width="10" height="12" rx="2" fill="#10b981"/>
        <path d="M31 10c0-2 1-4 3-4s3 2 3 4M39 14c0-2 1-3 2-3s2 1 2 3"/>
      </svg>`
    },
    {
      id: "undraw-ai-robot",
      title: "AI Robot Assistant (unDraw)",
      category: "undraw",
      tags: ["undraw","ai","robot","assistant","future","automation","tech","bot","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="18" y="16" width="28" height="22" rx="6" fill="#e0f2fe"/>
        <path d="M32 8v8M28 8h8M14 24h4M46 24h4"/>
        <rect x="22" y="22" width="20" height="10" rx="3" fill="#1e293b"/>
        <circle cx="28" cy="27" r="2" fill="#38bdf8"/>
        <circle cx="36" cy="27" r="2" fill="#38bdf8"/>
        <rect x="20" y="42" width="24" height="14" rx="4" fill="#38bdf8"/>
        <path d="M26 48h12M24 56v4M40 56v4"/>
        <circle cx="32" cy="8" r="2" fill="#f43f5e"/>
      </svg>`
    },
    {
      id: "undraw-video-call",
      title: "Video Conference Meeting (unDraw)",
      category: "undraw",
      tags: ["undraw","video","call","meeting","remote","conference","webcam","zoom","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="10" y="12" width="44" height="32" rx="4" fill="#f1f5f9"/>
        <path d="M6 44h52v4H6z" fill="#94a3b8"/>
        <path d="M14 16h16v10H14z" fill="#fed7aa"/>
        <circle cx="22" cy="20" r="2" fill="#f97316"/>
        <path d="M34 16h16v10H34z" fill="#bfdbfe"/>
        <circle cx="42" cy="20" r="2" fill="#3b82f6"/>
        <path d="M14 30h16v10H14z" fill="#bbf7d0"/>
        <circle cx="22" cy="34" r="2" fill="#22c55e"/>
        <path d="M34 30h16v10H34z" fill="#fbcfe8"/>
        <circle cx="42" cy="34" r="2" fill="#ec4899"/>
        <circle cx="32" cy="14" r="1" fill="#ef4444"/>
      </svg>`
    },
    {
      id: "undraw-code-dev",
      title: "Code Editor & Dev (unDraw)",
      category: "undraw",
      tags: ["undraw","code","dev","developer","coding","programming","html","software","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <rect x="8" y="12" width="48" height="36" rx="4" fill="#1e293b"/>
        <path d="M8 20h48" stroke="#334155"/>
        <circle cx="14" cy="16" r="1.5" fill="#f43f5e"/>
        <circle cx="19" cy="16" r="1.5" fill="#f59e0b"/>
        <circle cx="24" cy="16" r="1.5" fill="#10b981"/>
        <path d="M22 28l-5 5 5 5M42 28l5 5-5 5M34 26l-4 14" stroke="#38bdf8" stroke-width="2.5"/>
        <path d="M24 54h16M32 48v6"/>
      </svg>`
    },
    {
      id: "undraw-target-goal",
      title: "Bullseye Target & Success (unDraw)",
      category: "undraw",
      tags: ["undraw","target","goal","bullseye","aim","focus","achievement","win","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="32" cy="32" r="22" fill="#fee2e2"/>
        <circle cx="32" cy="32" r="16" fill="#fecaca"/>
        <circle cx="32" cy="32" r="10" fill="#f87171"/>
        <circle cx="32" cy="32" r="4" fill="#dc2626"/>
        <path d="M48 16L32 32M44 14l6 6M48 10l6 6" stroke="#1e293b" stroke-width="3"/>
        <path d="M22 56l10-8 10 8"/>
      </svg>`
    },
    {
      id: "undraw-education",
      title: "Education & Graduation (unDraw)",
      category: "undraw",
      tags: ["undraw","education","graduation","degree","study","diploma","cap","school","color","clipart"],
      svg: `<svg viewBox="0 0 64 64" fill="none" stroke="#1e293b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M32 12l22 9-22 9-22-9 22-9z" fill="#4f46e5"/>
        <path d="M18 26v14c0 6 6 10 14 10s14-4 14-10V26" fill="#312e81"/>
        <path d="M48 24v16c0 2-2 4-4 4" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="44" cy="44" r="2" fill="#f59e0b"/>
        <rect x="14" y="48" width="36" height="8" rx="2" fill="#f8fafc"/>
        <path d="M20 48v8M44 48v8" stroke="#cbd5e1"/>
      </svg>`
    }
  ];

  // Also include original doodles from doodles.js if loaded
  if (window.DOODLES && Array.isArray(window.DOODLES)) {
    window.DOODLES.forEach(d => {
      if (!BUILTIN_ASSETS.some(b => b.id === d.id)) {
        BUILTIN_ASSETS.push({
          id: d.id,
          title: d.title,
          category: d.category === 'arrows' ? 'arrows' : (d.category === 'people' ? 'characters' : (d.category === 'business' ? 'business' : 'doodles')),
          tags: d.tags || [],
          svg: d.svg
        });
      }
    });
  }

  // Local storage keys
  const LS_RECENT_KEY = 'inkplainer_recent_assets';
  const LS_CUSTOM_KEY = 'inkplainer_custom_assets';

  // State
  let _activeCategory = 'all';
  let _searchQuery = '';

  function getRecentAssets() {
    try {
      const raw = localStorage.getItem(LS_RECENT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveRecentAsset(item) {
    try {
      let list = getRecentAssets().filter(x => x.id !== item.id);
      list.unshift({
        id: item.id,
        title: item.title || item.name,
        svg: item.svg || null,
        src: item.src || null,
        timestamp: Date.now()
      });
      if (list.length > 12) list = list.slice(0, 12);
      localStorage.setItem(LS_RECENT_KEY, JSON.stringify(list));
      renderRecentAssets();
    } catch (e) {
      console.warn('Failed saving recent asset:', e);
    }
  }

  function clearRecentAssets() {
    try {
      localStorage.removeItem(LS_RECENT_KEY);
      renderRecentAssets();
      if (window.showToast) window.showToast('Recent assets cleared');
    } catch (e) {}
  }

  function getCustomAssets() {
    try {
      const raw = localStorage.getItem(LS_CUSTOM_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveCustomAsset(asset) {
    try {
      let list = getCustomAssets();
      list.unshift(asset);
      localStorage.setItem(LS_CUSTOM_KEY, JSON.stringify(list));
      renderAssetGrid();
      if (window.showToast) window.showToast(`Custom asset "${asset.title}" added`);
    } catch (e) {
      console.error('Failed saving custom asset:', e);
    }
  }

  function deleteCustomAsset(id, event) {
    if (event) event.stopPropagation();
    try {
      let list = getCustomAssets().filter(x => x.id !== id);
      localStorage.setItem(LS_CUSTOM_KEY, JSON.stringify(list));
      renderAssetGrid();
      if (window.showToast) window.showToast('Custom asset removed');
    } catch (e) {}
  }

  // Insert an SVG or Image asset directly to canvas
  function insertAssetToCanvas(asset, posX = null, posY = null, width = null, height = null, animOrder = null) {
    if (!asset) return;

    const onAdded = () => {
      const targetState = window.state || (typeof state !== 'undefined' ? state : null);
      if (targetState && targetState.layers && targetState.layers.length > 0) {
        const added = targetState.layers[targetState.layers.length - 1];
        added.kind = 'asset';
        if (asset.category === 'color' || (asset.tags && asset.tags.includes('color'))) {
          added.animStyle = 'illustfill';
        }
        if (width) { added.w = Math.round(width); added.baseW = Math.round(width); }
        if (height) { added.h = Math.round(height); added.baseH = Math.round(height); }
        if (animOrder) { added.animOrder = animOrder; }
        if (typeof window.redrawLayersOnCanvas === 'function') window.redrawLayersOnCanvas();
        if (typeof window.renderLayerList === 'function') window.renderLayerList();
      }
    };

    if (asset.src && !asset.svg) {
      // Raster image (e.g. user PNG upload)
      const img = new Image();
      img.onload = () => {
        const w = img.naturalWidth || 256;
        const h = img.naturalHeight || 256;
        img.width = width || Math.min(320, w);
        img.height = height || Math.round(img.width * (h / w));
        if (typeof window.addLayer === 'function') {
          window.addLayer(img, asset.title || 'Custom Asset', posX, posY);
          onAdded();
          saveRecentAsset(asset);
        }
      };
      img.src = asset.src;
      return;
    }

    let svgStr = asset.svg || '';
    if (!svgStr.includes('xmlns=')) {
      svgStr = svgStr.replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" ');
    }
    if (!svgStr.includes('width=')) {
      svgStr = svgStr.replace('<svg ', '<svg width="256" height="256" ');
    }

    const encoded = encodeURIComponent(svgStr)
      .replace(/'/g, '%27')
      .replace(/"/g, '%22');
    const dataUrl = `data:image/svg+xml;charset=utf-8,${encoded}`;

    const img = new Image();
    img.onload = () => {
      img.width = width || 256;
      img.height = height || 256;
      if (typeof window.addLayer === 'function') {
        window.addLayer(img, asset.title || 'Asset', posX, posY);
        onAdded();
        saveRecentAsset({ id: asset.id, title: asset.title, svg: asset.svg });
      }
    };

    img.onerror = () => {
      // Fallback via Blob URL
      try {
        const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const fb = new Image();
        fb.onload = () => {
          URL.revokeObjectURL(url);
          fb.width = width || 256;
          fb.height = height || 256;
          if (typeof window.addLayer === 'function') {
            window.addLayer(fb, asset.title || 'Asset', posX, posY);
            onAdded();
            saveRecentAsset({ id: asset.id, title: asset.title, svg: asset.svg });
          }
        };
        fb.src = url;
      } catch (err) {
        console.error('All SVG conversions failed:', err);
      }
    };

    img.src = dataUrl;
  }

  // Render recent items tray
  function renderRecentAssets() {
    const container = document.getElementById('recent-assets-list') || document.getElementById('recent-doodles-list');
    if (!container) return;
    const recents = getRecentAssets();
    if (!recents.length) {
      container.innerHTML = '<span style="font-size:10px;color:var(--muted);font-style:italic;padding:4px 0;">No recently used assets yet</span>';
      return;
    }
    container.innerHTML = recents.map(item => `
      <div class="recent-doodle-chip" title="${item.title}" onclick="AssetLibrary.insertAsset('${item.id}')">
        <div class="recent-doodle-thumb">
          ${item.svg ? item.svg : `<img src="${item.src}" alt="${item.title}">`}
        </div>
        <span class="recent-doodle-label">${item.title}</span>
      </div>
    `).join('');
  }

  // Render category pills
  function renderCategoryPills() {
    const container = document.getElementById('asset-cat-pills');
    if (!container) return;
    container.innerHTML = ASSET_CATEGORIES.map(cat => `
      <button class="doodle-cat-pill ${cat.id === _activeCategory ? 'active' : ''}" 
        onclick="AssetLibrary.filterCategory('${cat.id}', this)">
        ${cat.label}
      </button>
    `).join('');
  }

  // Render main asset grid
  function renderAssetGrid() {
    const grid = document.getElementById('asset-library-grid') || document.getElementById('doodle-library-grid');
    if (!grid) return;

    let items = [];
    if (_activeCategory === 'custom') {
      items = getCustomAssets();
    } else {
      items = [...BUILTIN_ASSETS];
      if (_activeCategory !== 'all') {
        items = items.filter(a => a.category === _activeCategory);
      }
    }

    if (_searchQuery.trim()) {
      const q = _searchQuery.toLowerCase().trim();
      items = items.filter(a =>
        (a.title && a.title.toLowerCase().includes(q)) ||
        (a.tags && a.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    if (!items.length) {
      if (_activeCategory === 'custom') {
        grid.innerHTML = `
          <div style="grid-column:1/-1;text-align:center;padding:24px 8px;font-size:11px;color:var(--muted);">
            No custom assets yet.<br>Click <b>+ Upload Custom Asset</b> below to import your own SVGs or PNGs!
          </div>
        `;
      } else {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:24px 8px;font-size:11px;color:var(--muted);">No matching assets found</div>';
      }
      return;
    }

    grid.innerHTML = items.map(item => `
      <div class="doodle-card" draggable="true" 
        ondragstart="AssetLibrary.onDragStart(event, '${item.id}')"
        onclick="AssetLibrary.insertAsset('${item.id}')" 
        title="${item.title} (Click or drag to canvas)">
        <div class="doodle-card-preview">
          ${item.svg ? item.svg : `<img src="${item.src}" style="max-width:100%;max-height:100%;object-fit:contain;">`}
        </div>
        <div class="doodle-card-title">${item.title}</div>
        ${_activeCategory === 'custom' ? `
          <span class="custom-asset-del-btn" onclick="AssetLibrary.deleteCustom('${item.id}', event)" title="Delete asset">✕</span>
        ` : ''}
      </div>
    `).join('');
  }

  function filterCategory(catId, btnEl) {
    _activeCategory = catId;
    document.querySelectorAll('.doodle-cat-pill').forEach(p => p.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    renderAssetGrid();
  }

  function onSearch(q) {
    _searchQuery = q;
    renderAssetGrid();
  }

  function insertAssetById(id, posX = null, posY = null, width = null, height = null, animOrder = null) {
    let found = BUILTIN_ASSETS.find(a => a.id === id);
    if (!found) {
      found = getCustomAssets().find(a => a.id === id);
    }
    if (!found) {
      found = getRecentAssets().find(a => a.id === id);
    }
    if (found) {
      insertAssetToCanvas(found, posX, posY, width, height, animOrder);
    }
  }

  // Drag and Drop integration with the main whiteboard canvas
  function onDragStart(e, assetId) {
    if (e.dataTransfer) {
      e.dataTransfer.setData('text/plain', assetId);
      e.dataTransfer.effectAllowed = 'copy';
    }
  }

  function setupCanvasDragAndDrop() {
    const wrapper = document.getElementById('canvas-wrapper');
    const selectCanvas = document.getElementById('select-canvas');
    const mainCanvas = document.getElementById('main-canvas');
    const targets = [wrapper, selectCanvas, mainCanvas].filter(Boolean);
    if (!targets.length) return;

    const onDragOver = (e) => {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
    };

    const onDrop = (e) => {
      e.preventDefault();
      const assetId = e.dataTransfer ? e.dataTransfer.getData('text/plain') : null;
      if (!assetId) return;

      const refEl = mainCanvas || wrapper || e.currentTarget;
      const rect = refEl.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Map from DOM client pixels to canvas backing coordinate space
      const scaleX = (window.state ? window.state.canvasW : 1280) / (rect.width || 1);
      const scaleY = (window.state ? window.state.canvasH : 720) / (rect.height || 1);

      const canvasX = Math.round(clientX * scaleX);
      const canvasY = Math.round(clientY * scaleY);

      let found = BUILTIN_ASSETS.find(a => a.id === assetId) ||
                  getCustomAssets().find(a => a.id === assetId);

      if (found) {
        insertAssetToCanvas(found, canvasX, canvasY);
      }
    };

    targets.forEach(t => {
      t.addEventListener('dragover', onDragOver);
      t.addEventListener('dragenter', onDragOver);
      t.addEventListener('drop', onDrop);
    });
  }

  // Handle custom asset file upload
  function handleCustomUpload(fileInput) {
    if (!fileInput || !fileInput.files || !fileInput.files[0]) return;
    const file = fileInput.files[0];
    const reader = new FileReader();

    const isSvg = file.type === 'image/svg+xml' || file.name.endsWith('.svg');

    reader.onload = (e) => {
      const content = e.target.result;
      const id = 'custom-' + Date.now();
      const title = file.name.replace(/\.[^/.]+$/, '');

      if (isSvg) {
        saveCustomAsset({ id, title, category: 'custom', tags: ['custom', 'upload'], svg: content });
      } else {
        saveCustomAsset({ id, title, category: 'custom', tags: ['custom', 'upload'], src: content });
      }
      fileInput.value = '';
    };

    if (isSvg) {
      reader.readAsText(file);
    } else {
      reader.readAsDataURL(file);
    }
  }

  // Public AssetLibrary API
  const AssetLibrary = {
    CATEGORIES: ASSET_CATEGORIES,
    ASSETS: BUILTIN_ASSETS,
    getRecentAssets,
    saveRecentAsset,
    clearRecentAssets,
    getCustomAssets,
    saveCustomAsset,
    deleteCustom: deleteCustomAsset,
    insertAsset: insertAssetById,
    filterCategory,
    onSearch,
    renderAssetGrid,
    renderRecentAssets,
    renderCategoryPills,
    onDragStart,
    handleCustomUpload
  };

  window.AssetLibrary = AssetLibrary;
  // Backward compatibility alias for DoodleLibrary
  window.DoodleLibrary = {
    ...AssetLibrary,
    insertDoodle: insertAssetById,
    onDoodleSearch: onSearch,
    renderDoodleGrid: renderAssetGrid
  };

  // Auto initialize when DOM is ready
  function initAssetLibrary() {
    renderCategoryPills();
    renderAssetGrid();
    renderRecentAssets();
    setupCanvasDragAndDrop();
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initAssetLibrary);
  } else {
    initAssetLibrary();
  }

  console.log(`✓ Asset Library loaded (${BUILTIN_ASSETS.length}+ vector assets)`);

})(window);

