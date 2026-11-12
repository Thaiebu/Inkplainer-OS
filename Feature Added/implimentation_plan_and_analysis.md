### Repository Architecture Overview

**Inkplainer-OS** is an open-source, browser-based whiteboard explainer video generator. Its architecture is intentionally lightweight and dependency-free:

* **Tech Stack**: Pure HTML5, CSS, vanilla JavaScript, and HTML5 2D Canvas. There is no frontend framework (no React/Vue) and no bundler (no Vite/Webpack).
* **Core Files**:
  * [`index.html`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html): Contains the entire UI layout, CSS styles, global `state` store, layer manager, text editor, undo/redo stack (`pushUndoSnapshot`), and media export pipeline.
  * [`animations.js`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/animations.js): Contains procedural drawing and animation algorithms (Scanner, Chunk Jump, Contour, Scribble, IllustFill, OutlineFill, and specialized styles).

---

### How Images and Layers Work Currently

1. **Layer Representation** ([`index.html#L5916-L5962`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html#L5916-L5962)):
   * Layers are stored in `state.layers` as objects containing image reference `img`, canvas coordinates (`x, y, w, h`), animation style, speed, and alpha detection flags.
   * `addLayer(img, name)` handles scaling the image to 80% canvas size maintaining aspect ratio, centers it with a slight stagger offset, takes an undo snapshot, selects the new layer, triggers a redraw, and schedules auto-save.
2. **Current Image Upload Flow** ([`index.html#L8196-L8215`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html#L8196-L8215)):
   * Images are currently only accepted via the sidebar `#drop-zone` (drag & drop) or `#file-input` (file picker).
   * Both route through `loadImageFile(file)`, which reads the file via `FileReader.readAsDataURL` and calls `addLayer(img, name)`.
3. **What's Missing**:
   * There are **no clipboard or paste event listeners** in the codebase.
   * Pressing `Ctrl+V` / `Cmd+V` does nothing unless editing an input field.

---

### Feature Design: Pasting Copied Images on Canvas

To provide a seamless user experience (similar to Figma, Miro, or Excalidraw), the feature needs to address the following requirements:

1. **Global Clipboard Listener**:
   Listen for the `paste` event on `document`. Unlike the asynchronous `navigator.clipboard.read()` API, the native `paste` event does not require intrusive browser permissions and works instantly for screenshots, copied files, and browser "Copy Image".
2. **Smart Focus & Text Safety**:
   If the user is currently editing text (e.g., inside the on-canvas text editor `#text-editor-ta` or project rename input `#project-name-input`) and the clipboard contains plain text, allow native paste into the input without intercepting.
3. **Context-Aware Placement**:
   * If the mouse cursor is currently over `#select-canvas` or `#canvas-wrapper`, paste the image centered at the mouse cursor.
   * If the cursor is outside the canvas, center the image on the canvas using standard layout offsets.
4. **Playback State Handling**:
   If the animation is currently playing (`state.playing`), pause playback before adding the layer to prevent render race conditions.
5. **UI & Discoverability**:
   * Display a quick toast (`showToast('Image pasted from clipboard')`).
   * Update the drop-zone hint in the sidebar to mention `Ctrl+V` / `⌘V`.
   * Automatically select the pasted layer and switch the sidebar tab to the Image panel (`switchTab('image')`).

---

### Implementation Plan

#### 1. Enable Custom Target Coordinates in `addLayer`
In [`index.html#L5916`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html#L5916), accept optional `posX` and `posY` arguments while preserving existing default behavior:

```javascript
function addLayer(img, name, posX, posY) {
  pushUndoSnapshot();
  const id = ++_layerIdCounter;
  const scale = Math.min(state.canvasW / img.width, state.canvasH / img.height) * 0.8;
  const w = Math.round(img.width * scale);
  const h = Math.round(img.height * scale);
  const offset = (state.layers.length % 5) * 20;
  
  // Use custom position if provided, otherwise center with stagger
  const x = (posX !== undefined && posX !== null) ? Math.round(posX) : Math.round((state.canvasW - w) / 2) + offset;
  const y = (posY !== undefined && posY !== null) ? Math.round(posY) : Math.round((state.canvasH - h) / 2) + offset;
  ...
```

#### 2. Track Mouse Coordinates on Canvas
In [`index.html#L6900`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html#L6900):

```javascript
let _canvasMousePos = null;
selectCanvas.addEventListener('mousemove', e => {
  _canvasMousePos = toCanvasCoords(e);
  // ... existing handle hit-test & cursor logic
});
selectCanvas.addEventListener('mouseleave', () => {
  _canvasMousePos = null;
});
```

#### 3. Add the Paste Event Handler
Directly after `loadImageFile` (around [`index.html#L8216`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html#L8216)):

```javascript
// ─── CLIPBOARD PASTE (Ctrl+V / Cmd+V) ───
document.addEventListener('paste', handleClipboardPaste);

function handleClipboardPaste(e) {
  const activeEl = document.activeElement;
  const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
  const cData = e.clipboardData || window.clipboardData;
  if (!cData) return;

  const hasText = cData.types && (cData.types.includes('text/plain') || cData.types.includes('Text'));
  const plainText = hasText ? cData.getData('text/plain') : '';

  // 1. Extract image files from clipboard
  const imageFiles = [];
  if (cData.items) {
    for (let i = 0; i < cData.items.length; i++) {
      const item = cData.items[i];
      if (item.type && item.type.startsWith('image/')) {
        const f = item.getAsFile();
        if (f) imageFiles.push(f);
      }
    }
  }
  if (imageFiles.length === 0 && cData.files && cData.files.length > 0) {
    for (let i = 0; i < cData.files.length; i++) {
      const f = cData.files[i];
      if (f.type && f.type.startsWith('image/')) imageFiles.push(f);
    }
  }

  // If focused on an input/textarea and text is being pasted, let native paste handle it
  if (isInput && hasText && imageFiles.length === 0) return;

  // Process image files
  if (imageFiles.length > 0) {
    e.preventDefault();
    if (state.playing) { state.playing = false; updatePlayIcons(); }
    switchTab('image');

    const targetPos = _canvasMousePos ? { ..._canvasMousePos } : null;
    imageFiles.forEach((file, idx) => {
      const reader = new FileReader();
      reader.onload = ev => {
        const img = new Image();
        img.onload = () => {
          let posX = null, posY = null;
          if (targetPos) {
            const scale = Math.min(state.canvasW / img.width, state.canvasH / img.height) * 0.8;
            const w = Math.round(img.width * scale);
            const h = Math.round(img.height * scale);
            const stagger = idx * 20;
            posX = Math.max(0, Math.min(state.canvasW - w, targetPos.x - w / 2 + stagger));
            posY = Math.max(0, Math.min(state.canvasH - h, targetPos.y - h / 2 + stagger));
          }
          const name = file.name && !file.name.match(/^image\.\w+$/i)
            ? file.name.replace(/\.[^.]+$/, '')
            : `Pasted Image ${state.layers.length + 1}`;
          addLayer(img, name, posX, posY);
          showToast('Image pasted from clipboard');
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
    return;
  }

  // 2. Fallback: handle pasted base64 Data URLs (e.g. data:image/png;base64,...)
  if (!isInput && plainText && plainText.trim().startsWith('data:image/')) {
    e.preventDefault();
    if (state.playing) { state.playing = false; updatePlayIcons(); }
    switchTab('image');
    const img = new Image();
    img.onload = () => {
      let posX = null, posY = null;
      if (_canvasMousePos) {
        const scale = Math.min(state.canvasW / img.width, state.canvasH / img.height) * 0.8;
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        posX = Math.max(0, Math.min(state.canvasW - w, _canvasMousePos.x - w / 2));
        posY = Math.max(0, Math.min(state.canvasH - h, _canvasMousePos.y - h / 2));
      }
      addLayer(img, `Pasted Image ${state.layers.length + 1}`, posX, posY);
      showToast('Image pasted from data URL');
    };
    img.src = plainText.trim();
  }
}
```

#### 4. (Optional Bonus) Direct Canvas Drag & Drop
Add drag-and-drop support directly on `#canvas-wrapper` so users can also drag files directly onto the canvas area in addition to the sidebar drop zone.

---

Would you like me to go ahead and apply these changes to [`index.html`](file:///Users/mohamedthaiebu/Documents/kinodraw/Inkplainer-OS/index.html)?