/**
 * aiSlideGenerator.js
 * AI Prompt-to-Slide Generator for Inkplainer-OS
 * 
 * Supports:
 * 1. Google Gemini API (gemini-1.5-flash, gemini-2.0-flash)
 * 2. OpenRouter / OpenAI-compatible API endpoints
 * 3. Smart Offline Layout Synthesizer (instant rule-based generation without API keys)
 * 
 * Outputs structured JSON slide layouts with independent, editable text & vector asset layers.
 */

(function(window) {
  'use strict';

  const LS_API_PROVIDER = 'inkplainer_ai_provider';
  const LS_API_KEY      = 'inkplainer_ai_api_key';
  const LS_API_MODEL    = 'inkplainer_ai_model';

  // In-memory environment variables loaded from .env or window.__ENV__
  const _env = {};

  async function loadEnv() {
    // 1. Check if window.__ENV__ or window.ENV exists (e.g. from an env.js file)
    if (window.__ENV__ || window.ENV) {
      Object.assign(_env, window.__ENV__ || window.ENV);
    }
    // 2. Also try fetching a local .env file (works when served via http/localhost)
    try {
      const res = await fetch('.env');
      if (res.ok) {
        const text = await res.text();
        text.split('\n').forEach(line => {
          line = line.trim();
          if (!line || line.startsWith('#')) return;
          const eqIdx = line.indexOf('=');
          if (eqIdx !== -1) {
            const key = line.slice(0, eqIdx).trim();
            let val = line.slice(eqIdx + 1).trim();
            if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
              val = val.slice(1, -1);
            }
            _env[key] = val;
          }
        });
        console.log('✓ Loaded environment variables from .env');
      }
    } catch (e) {
      // Ignored if .env is missing or blocked by file:// CORS
    }
  }

  // Load env on initialization
  loadEnv();

  // Available styles
  const SLIDE_STYLES = [
    { id: 'whiteboard', name: 'Classic Whiteboard', font: 'Caveat', color: '#1e293b' },
    { id: 'business',   name: 'Modern Corporate',  font: 'DM Sans', color: '#0f172a' },
    { id: 'creative',   name: 'Playful Hand-drawn', font: 'Patrick Hand', color: '#1e1e24' },
    { id: 'tech',       name: 'Tech Blueprint',    font: 'Space Mono', color: '#1a3a5c' }
  ];

  let _lastGeneratedSlide = null;

  function getAiConfig() {
    const envKey = _env.GEMINI_API_KEY || _env.VITE_GEMINI_API_KEY || _env.OPENROUTER_API_KEY || _env.API_KEY || '';
    const envProvider = _env.AI_PROVIDER || (_env.OPENROUTER_API_KEY ? 'openrouter' : (_env.GEMINI_API_KEY ? 'gemini' : null));
    const envModel = _env.AI_MODEL || _env.GEMINI_MODEL || null;

    return {
      provider: localStorage.getItem(LS_API_PROVIDER) || envProvider || 'gemini',
      apiKey: localStorage.getItem(LS_API_KEY) || envKey || '',
      model: localStorage.getItem(LS_API_MODEL) || envModel || 'gemini-1.5-flash'
    };
  }

  function saveAiConfig(provider, apiKey, model) {
    if (provider) localStorage.setItem(LS_API_PROVIDER, provider);
    if (apiKey !== undefined) localStorage.setItem(LS_API_KEY, apiKey.trim());
    if (model) localStorage.setItem(LS_API_MODEL, model.trim());
    if (window.showToast) window.showToast('AI Settings saved');
  }

  // System instructions for LLM
  function getSystemPrompt() {
    const catalogSummary = (window.AssetLibrary ? window.AssetLibrary.ASSETS : [])
      .map(a => `${a.id} (${a.title} - ${a.category})`).join(', ');

    return `You are an expert whiteboard explainer animator and slide designer for Inkplainer OS.
The canvas dimensions are 1280 pixels wide by 720 pixels high (top-left is x=0, y=0).
Given a user prompt describing an idea or lesson, output a structured JSON slide layout.

You must choose visual assets from this available catalog:
[${catalogSummary}]

Return strictly valid JSON conforming to this schema (no markdown fences, no explanatory text outside JSON):
{
  "slideTitle": "Short Title",
  "canvasBg": "#ffffff",
  "elements": [
    {
      "type": "text",
      "text": "Main Headline",
      "x": 300,
      "y": 60,
      "fontSize": 48,
      "bold": true,
      "color": "#1e293b",
      "font": "Caveat",
      "animOrder": 1
    },
    {
      "type": "asset",
      "assetId": "tech-ai-brain",
      "name": "AI Brain Illustration",
      "x": 540,
      "y": 180,
      "w": 200,
      "h": 200,
      "animOrder": 2
    },
    {
      "type": "text",
      "text": "Step 1: Input Data",
      "x": 120,
      "y": 420,
      "fontSize": 32,
      "bold": true,
      "color": "#2563eb",
      "font": "DM Sans",
      "animOrder": 3
    }
  ]
}

Layout guidelines:
- Title centered or top-left (y around 40-80, fontSize 44-56).
- For step-by-step or 3-step flows: layout columns horizontally (e.g. x=120, x=540, x=940, y=360-440).
- Connect steps with arrows (arrow-curved-right or arrow-zigzag-growth).
- Keep all coordinates within canvas bounds: x between 40 and 1100, y between 40 and 650.
- Maintain sequential animOrder starting from 1.`;
  }

  // Smart Offline Layout Synthesizer (runs when user has no API key or selects Offline)
  function synthesizeOfflineSlide(promptText, styleId) {
    const q = promptText.toLowerCase();
    const style = SLIDE_STYLES.find(s => s.id === styleId) || SLIDE_STYLES[0];
    const W = 1280, H = 720;

    let title = promptText.length > 40 ? promptText.slice(0, 37) + '...' : promptText;
    title = title.charAt(0).toUpperCase() + title.slice(1);

    const elements = [];

    // 1. Header Title Text
    elements.push({
      type: 'text',
      text: title,
      x: Math.round(W / 2 - (title.length * 14)),
      y: 60,
      fontSize: 48,
      bold: true,
      color: style.color,
      font: style.font,
      animOrder: 1
    });

    // Detect theme
    const isAiTech = q.includes('ai') || q.includes('intelligence') || q.includes('tech') || q.includes('computer') || q.includes('code');
    const isBusiness = q.includes('business') || q.includes('sales') || q.includes('growth') || q.includes('money') || q.includes('market');
    const isEdu = q.includes('school') || q.includes('learn') || q.includes('education') || q.includes('science');

    if (isAiTech) {
      // Step 1: User / Input
      elements.push({
        type: 'asset',
        assetId: 'avatar-coder',
        x: 140,
        y: 190,
        w: 180,
        h: 180,
        animOrder: 2
      });
      elements.push({
        type: 'text',
        text: '1. Human Input',
        x: 140,
        y: 400,
        fontSize: 32,
        bold: true,
        color: '#2563eb',
        font: style.font,
        animOrder: 3
      });

      // Arrow 1
      elements.push({
        type: 'asset',
        assetId: 'arrow-curved-right',
        x: 360,
        y: 260,
        w: 110,
        h: 70,
        animOrder: 4
      });

      // Step 2: AI Processing
      elements.push({
        type: 'asset',
        assetId: 'tech-ai-brain',
        x: 520,
        y: 190,
        w: 200,
        h: 200,
        animOrder: 5
      });
      elements.push({
        type: 'text',
        text: '2. Neural Processing',
        x: 480,
        y: 400,
        fontSize: 32,
        bold: true,
        color: '#7c3aed',
        font: style.font,
        animOrder: 6
      });

      // Arrow 2
      elements.push({
        type: 'asset',
        assetId: 'arrow-curved-right',
        x: 770,
        y: 260,
        w: 110,
        h: 70,
        animOrder: 7
      });

      // Step 3: Result / Solution
      elements.push({
        type: 'asset',
        assetId: 'doodle-lightbulb-spark',
        x: 930,
        y: 190,
        w: 180,
        h: 180,
        animOrder: 8
      });
      elements.push({
        type: 'text',
        text: '3. Intelligent Output',
        x: 910,
        y: 400,
        fontSize: 32,
        bold: true,
        color: '#16a34a',
        font: style.font,
        animOrder: 9
      });
    } else if (isBusiness) {
      elements.push({
        type: 'asset',
        assetId: 'char-presenter',
        x: 160,
        y: 200,
        w: 190,
        h: 190,
        animOrder: 2
      });
      elements.push({
        type: 'text',
        text: 'Strategic Planning',
        x: 140,
        y: 420,
        fontSize: 30,
        bold: true,
        color: '#1e293b',
        font: style.font,
        animOrder: 3
      });

      elements.push({
        type: 'asset',
        assetId: 'arrow-zigzag-growth',
        x: 400,
        y: 260,
        w: 120,
        h: 80,
        animOrder: 4
      });

      elements.push({
        type: 'asset',
        assetId: 'biz-growth-chart',
        x: 560,
        y: 200,
        w: 200,
        h: 200,
        animOrder: 5
      });
      elements.push({
        type: 'text',
        text: 'Execution & Scale',
        x: 560,
        y: 420,
        fontSize: 30,
        bold: true,
        color: '#2563eb',
        font: style.font,
        animOrder: 6
      });

      elements.push({
        type: 'asset',
        assetId: 'doodle-check-badge',
        x: 880,
        y: 200,
        w: 180,
        h: 180,
        animOrder: 7
      });
      elements.push({
        type: 'text',
        text: 'Target Achieved',
        x: 870,
        y: 420,
        fontSize: 30,
        bold: true,
        color: '#16a34a',
        font: style.font,
        animOrder: 8
      });
    } else {
      // General Educational / Explainer Layout
      elements.push({
        type: 'asset',
        assetId: 'doodle-lightbulb-spark',
        x: 180,
        y: 200,
        w: 190,
        h: 190,
        animOrder: 2
      });
      elements.push({
        type: 'text',
        text: 'Concept & Idea',
        x: 170,
        y: 420,
        fontSize: 32,
        bold: true,
        color: '#d97706',
        font: style.font,
        animOrder: 3
      });

      elements.push({
        type: 'asset',
        assetId: 'arrow-curved-right',
        x: 420,
        y: 270,
        w: 110,
        h: 70,
        animOrder: 4
      });

      elements.push({
        type: 'asset',
        assetId: 'char-thinking',
        x: 580,
        y: 200,
        w: 190,
        h: 190,
        animOrder: 5
      });
      elements.push({
        type: 'text',
        text: 'Exploration',
        x: 600,
        y: 420,
        fontSize: 32,
        bold: true,
        color: '#2563eb',
        font: style.font,
        animOrder: 6
      });

      elements.push({
        type: 'asset',
        assetId: 'arrow-curved-right',
        x: 810,
        y: 270,
        w: 110,
        h: 70,
        animOrder: 7
      });

      elements.push({
        type: 'asset',
        assetId: 'doodle-rocket-ship',
        x: 950,
        y: 200,
        w: 180,
        h: 180,
        animOrder: 8
      });
      elements.push({
        type: 'text',
        text: 'Action & Impact',
        x: 930,
        y: 420,
        fontSize: 32,
        bold: true,
        color: '#16a34a',
        font: style.font,
        animOrder: 9
      });
    }

    return {
      slideTitle: title,
      canvasBg: '#ffffff',
      elements
    };
  }

  // Normalize any AI response into a consistent slide object
  function normalizeSlideData(raw, defaultTitle = 'Whiteboard Slide') {
    if (!raw) return { slideTitle: defaultTitle, canvasBg: '#ffffff', elements: [] };

    let obj = raw;
    if (Array.isArray(obj)) {
      if (obj.length > 0 && Array.isArray(obj[0].elements)) {
        obj = obj[0];
      } else {
        obj = { slideTitle: defaultTitle, elements: obj };
      }
    }

    if (obj.slide && typeof obj.slide === 'object') obj = obj.slide;
    else if (obj.whiteboard && typeof obj.whiteboard === 'object') obj = obj.whiteboard;
    else if (obj.data && typeof obj.data === 'object') obj = obj.data;

    const title = obj.slideTitle || obj.title || obj.name || defaultTitle;
    const bg = obj.canvasBg || obj.background || '#ffffff';

    let rawElements = obj.elements || obj.layers || obj.items || obj.components || obj.objects || [];
    if (!Array.isArray(rawElements)) {
      rawElements = [];
    }

    const elements = rawElements.map((el, idx) => {
      if (!el || typeof el !== 'object') return null;

      const type = String(el.type || '').toLowerCase();
      const isText = type === 'text' || type === 'label' || type === 'title' || (el.text !== undefined && !el.assetId);

      if (isText) {
        return {
          type: 'text',
          text: String(el.text || el.content || el.title || el.name || 'Text'),
          x: Math.max(10, Math.min(1150, Math.round(Number(el.x) || (120 + (idx % 3) * 360)))),
          y: Math.max(10, Math.min(650, Math.round(Number(el.y) || (100 + Math.floor(idx / 3) * 200)))),
          fontSize: Math.max(16, Math.min(120, Number(el.fontSize || el.size) || 36)),
          bold: el.bold !== undefined ? !!el.bold : true,
          color: el.color || '#1e293b',
          font: el.font || 'Caveat',
          animOrder: Number(el.animOrder) || (idx + 1)
        };
      } else {
        return {
          type: 'asset',
          assetId: el.assetId || el.id || el.asset || el.icon || 'doodle-lightbulb-spark',
          name: el.name || el.title || el.assetId || 'Asset',
          x: Math.max(10, Math.min(1150, Math.round(Number(el.x) || (120 + (idx % 3) * 360)))),
          y: Math.max(10, Math.min(650, Math.round(Number(el.y) || (180 + Math.floor(idx / 3) * 200)))),
          w: Math.max(40, Math.min(500, Number(el.w || el.width) || 180)),
          h: Math.max(40, Math.min(500, Number(el.h || el.height) || 180)),
          animOrder: Number(el.animOrder) || (idx + 1)
        };
      }
    }).filter(Boolean);

    return {
      slideTitle: title,
      canvasBg: bg,
      elements
    };
  }

  // Call Gemini API
  async function generateWithGemini(promptText, apiKey, modelName) {
    const model = (modelName || 'gemini-1.5-flash').trim();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: {
        parts: [{ text: getSystemPrompt() }]
      },
      contents: [
        {
          role: 'user',
          parts: [{ text: promptText }]
        }
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let msg = `Gemini API error (${res.status})`;
      try {
        const err = await res.json();
        if (err && err.error) {
          msg = typeof err.error === 'string' ? err.error : (err.error.message || msg);
        }
      } catch (e) {}
      throw new Error(msg);
    }

    const data = await res.json();
    if (!data.candidates || !data.candidates.length) {
      if (data.promptFeedback && data.promptFeedback.blockReason) {
        throw new Error(`Gemini blocked prompt: ${data.promptFeedback.blockReason}`);
      }
      throw new Error('Gemini returned no response candidates');
    }

    const candidate = data.candidates[0];
    const parts = candidate.content?.parts;
    if (!parts || !parts.length || !parts[0].text) {
      throw new Error(`Gemini response was empty (finishReason: ${candidate.finishReason || 'unknown'})`);
    }

    let text = parts[0].text.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error('Could not parse Gemini JSON response: ' + e.message);
    }
  }

  // Call OpenRouter or OpenAI-compatible API
  async function generateWithOpenAI(promptText, apiKey, modelName, endpoint) {
    const targetUrl = endpoint || 'https://openrouter.ai/api/v1/chat/completions';

    const payload = {
      model: modelName || 'google/gemini-2.0-flash-exp:free',
      messages: [
        { role: 'system', content: getSystemPrompt() },
        { role: 'user', content: promptText }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    };

    const res = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      let msg = `OpenRouter/OpenAI error (${res.status})`;
      try {
        const err = await res.json();
        if (err && err.error) {
          msg = typeof err.error === 'string' ? err.error : (err.error.message || msg);
        }
      } catch (e) {}
      throw new Error(msg);
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    if (!content) throw new Error('No content returned by AI provider');

    let text = content.trim();
    if (text.startsWith('```')) {
      text = text.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '').trim();
    }

    try {
      return JSON.parse(text);
    } catch (e) {
      throw new Error('Could not parse AI JSON response: ' + e.message);
    }
  }

  // Main generation entry point
  async function generateSlide(promptText, styleId = 'whiteboard') {
    const config = getAiConfig();
    const apiKey = (config.apiKey || '').trim();

    let rawData;
    if (!apiKey || config.provider === 'offline') {
      rawData = synthesizeOfflineSlide(promptText, styleId);
    } else if (config.provider === 'gemini') {
      rawData = await generateWithGemini(promptText, apiKey, config.model);
    } else {
      rawData = await generateWithOpenAI(promptText, apiKey, config.model);
    }

    const normalized = normalizeSlideData(rawData, promptText.slice(0, 32));
    _lastGeneratedSlide = normalized;
    return normalized;
  }

  // Apply the generated slide JSON onto the current slide as native editable layers
  async function applySlideToCanvas(slideData) {
    if (!slideData || !Array.isArray(slideData.elements)) {
      if (window.showToast) window.showToast('No slide elements to apply');
      return;
    }

    if (window.pushUndoSnapshot) window.pushUndoSnapshot();

    const catalog = (window.AssetLibrary && Array.isArray(window.AssetLibrary.ASSETS)) 
      ? window.AssetLibrary.ASSETS 
      : [];

    for (const el of slideData.elements) {
      if (!el) continue;

      if (el.type === 'text') {
        if (typeof window.createTextLayer === 'function') {
          window.createTextLayer(el.text, el.x, el.y, {
            fontSize: el.fontSize || 40,
            bold: !!el.bold,
            color: el.color || '#1e293b',
            font: el.font || 'Caveat',
            animOrder: el.animOrder || null
          });
        }
      } else if (el.type === 'asset' || el.type === 'doodle') {
        const assetId = el.assetId || el.id;
        let found = catalog.find(a => a && a.id === assetId);

        // Fallback matching by tag or title if exact assetId not found
        if (!found) {
          const elNameLower = String(el.name || el.assetId || '').toLowerCase();
          found = catalog.find(a => {
            if (!a) return false;
            const tags = Array.isArray(a.tags) ? a.tags : [];
            const title = String(a.title || '').toLowerCase();
            return tags.some(t => t && elNameLower.includes(String(t).toLowerCase())) ||
                   title.includes(elNameLower);
          }) || catalog[0];
        }

        if (found && window.AssetLibrary && typeof window.AssetLibrary.insertAsset === 'function') {
          window.AssetLibrary.insertAsset(found.id, el.x, el.y, el.w, el.h, el.animOrder);
        }
      }
    }

    if (window.redrawLayersOnCanvas) window.redrawLayersOnCanvas();
    if (window.renderLayerList) window.renderLayerList();
    if (typeof window.saveCurrentSlide === 'function') window.saveCurrentSlide();
    if (window.scheduleAutoSave) window.scheduleAutoSave();

    if (window.showToast) window.showToast('AI Slide layers added to canvas!');
  }

  // Public API
  window.AiSlideGenerator = {
    generateSlide,
    applySlideToCanvas,
    getAiConfig,
    saveAiConfig,
    getLastGeneratedSlide: () => _lastGeneratedSlide
  };

  console.log('✓ AI Slide Generator initialized (Gemini, OpenRouter & Offline modes ready)');

})(window);

