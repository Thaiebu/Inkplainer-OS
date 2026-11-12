# Project: Inkplainer OS – Feature Architecture Analysis and Implementation Plan

You are a Senior Software Architect and Full-Stack Engineer specializing in browser-based whiteboard animation software, Canvas rendering, IndexedDB, AI-powered content generation and interactive editors.

Repository: this repo 

## Objective

I am building Inkplainer OS, a free, browser-based alternative to VideoScribe.

I want to improve the application with three major capabilities:

1. A built-in local asset library containing avatars, characters, doodles, illustrations and clip art.
2. AI-powered prompt-to-slide generation.
3. Reliable multi-slide project management and persistence.

**IMPORTANT: First analyze the existing repository and produce a detailed implementation plan. Do not modify any code yet.**

---

# Phase 1: Understand the Existing Architecture

Analyze the entire repository before proposing solutions.

Pay particular attention to:

- index.html
- animations.js
- Existing multi-scene / multi-slide implementation.
- Canvas rendering and layer management.
- Image and text layer creation.
- Animation sequencing and transitions.
- Project save/load functionality.
- IndexedDB implementation.
- Undo/redo implementation.
- Existing local storage and browser storage usage.
- Existing UI components and sidebar structure.

Identify:

1. How a project is represented internally.
2. How slides/scenes are represented.
3. How layers are associated with individual slides.
4. How images and text are stored.
5. How slide switching works.
6. How automatic saving works.
7. How projects are restored after refreshing the browser.
8. How video export handles multiple slides and transitions.

Do not assume the README accurately describes every implementation detail. Verify everything in the actual source code.

# Feature 1: Built-in Asset Library (VideoScribe-style)

## Goal

I want users to access a built-in collection of visual assets without uploading every image manually.

Similar to VideoScribe, users should be able to search, browse and insert visual elements directly onto the canvas.

### Asset categories

Create a plan for these categories:

- Human avatars
- Cartoon characters
- Business people
- Male and female characters
- Hand-drawn doodles
- Objects and everyday items
- Technology illustrations
- Education illustrations
- Business illustrations
- Animals
- Arrows and pointers
- Icons and symbols
- Background illustrations
- Speech bubbles
- Decorative elements

### Asset Library UI

Propose a dedicated Asset Library panel or tab.

Expected functionality:

- Search assets by name.
- Browse assets by category.
- Display thumbnail previews.
- Click an asset to insert it into the current slide.
- Drag and drop assets onto the canvas.
- Resize and reposition assets.
- Rotate and flip assets.
- Change opacity.
- Delete and duplicate assets.
- Support transparent backgrounds.
- Allow users to import their own assets.
- Add favorites or recently used assets.

### Local Asset Architecture

I prefer assets to be available locally without depending on external APIs.

Investigate the best approach:

- Store default SVG illustrations and PNG assets inside the repository.
- Organize assets into category-based directories.
- Use SVG for scalable doodles and illustrations where appropriate.
- Use PNG/WebP for suitable raster illustrations.
- Create a searchable asset metadata JSON catalog.
- Generate thumbnails for the asset browser.
- Support user-imported assets separately from built-in assets.

Example structure (propose a better one if needed):

assets/
  avatars/
  characters/
  doodles/
  objects/
  education/
  business/
  technology/
  animals/
  arrows/
  icons/
  backgrounds/
  thumbnails/
  asset-manifest.json

Investigate how these assets can integrate with the existing image layer and animation engine.

**Important:** Adding an asset should create a normal editable layer, not a separate rendering mechanism.

The inserted asset should support the existing animation controls wherever technically possible.

Also investigate licensing requirements for distributing third-party illustrations and clip art. Do not assume assets found online can be redistributed.

# Feature 2: AI Prompt-to-Slide Creation

## Goal

I want users to describe an idea using a text prompt and automatically generate a visually attractive whiteboard slide.

Initially, support generating ONE slide only.

Example prompt:

"Create a whiteboard explainer about how artificial intelligence works. Show a human interacting with a computer, an AI brain illustration, and three simple steps explaining input, processing and output. Use hand-drawn doodles, arrows and short text."

### Expected workflow

1. User opens an AI Slide Creation option.
2. User enters a text prompt.
3. User selects a visual style if needed.
4. AI analyzes the prompt.
5. AI generates a structured slide layout.
6. The application displays a preview.
7. User clicks Apply to Canvas.
8. All generated elements become editable layers.
9. User can modify text, resize images, move objects and change animation settings.

### Important requirement

Do not generate a single flattened image as the final slide.

I want individual editable elements.

For example, an AI-generated slide should contain:

- Title text layer.
- Subtitle text layer.
- Avatar or character image layer.
- Doodle/illustration layers.
- Arrow layers.
- Supporting text layers.

Each element must be independently editable.

### AI architecture

Investigate a structured output approach.

The AI should return JSON describing the slide rather than directly manipulating the canvas.

Example conceptual structure:

{
  "title": "How AI Works",
  "elements": [
    {
      "type": "text",
      "content": "How Artificial Intelligence Works",
      "position": {
        "x": 500,
        "y": 100
      },
      "style": {
        "fontSize": 42
      }
    },
    {
      "type": "asset",
      "assetId": "ai-brain-001",
      "position": {
        "x": 700,
        "y": 300
      }
    },
    {
      "type": "doodle",
      "assetId": "arrow-right-001",
      "position": {
        "x": 400,
        "y": 350
      }
    }
  ]
}

This is only an example. Design the actual schema based on the existing layer model.

### AI implementation considerations

Investigate:

- LLM integration options.
- OpenRouter compatibility.
- Gemini API compatibility.
- Structured JSON generation.
- JSON validation.
- Asset matching using the local asset catalog.
- Automatic layout and positioning.
- Canvas boundary validation.
- Handling unavailable assets.
- Prompt error handling.

I want the architecture to be provider-independent so I can change the AI provider later.

Do not expose API keys in client-side code. Evaluate a secure backend/proxy or an explicitly user-configured local integration.

### Initial scope

For the first version:

- Generate one slide.
- Use existing local assets.
- Generate editable text and image layers.
- Automatically arrange elements.
- Allow preview before applying.
- Allow regeneration.
- Preserve existing animation functionality.

Do not implement multi-slide AI generation yet.

# Feature 3: Fix Multi-Slide Persistence Bug

## Current problem

I have a multi-slide / multi-scene feature.

I can create multiple slides and work with them.

However, when I refresh the browser, only one slide remains. Other slides disappear.

This is a critical issue.

### Expected behavior

Suppose I create a project:

Project: Psychology Explainer

- Slide 1: Introduction
- Slide 2: Problem Explanation
- Slide 3: Solution
- Slide 4: Conclusion

After refreshing the browser, all four slides should be restored exactly as they were.

The following data must survive refresh:

- All slides.
- Slide IDs and ordering.
- Slide names.
- All layers per slide.
- Images and their references.
- Text and formatting.
- Object positions and sizes.
- Layer ordering.
- Animation settings.
- Slide transitions.
- Background settings.
- Canvas configuration.
- Selected slide.
- Project metadata.

### Investigate the actual bug

Trace the complete save and restore lifecycle.

Look for:

1. Whether the application saves only the active slide.
2. Whether the project serialization includes all slides.
3. Whether slide switching overwrites project data.
4. Whether asynchronous IndexedDB operations race with each other.
5. Whether autosave executes before navigation or refresh.
6. Whether save operations are debounced incorrectly.
7. Whether slide IDs are regenerated during restoration.
8. Whether the load process initializes only one scene.
9. Whether the scene state is accidentally reset during application startup.
10. Whether schema migrations are losing older data.

Identify the exact root cause using source code evidence.

### Expected architecture

Prefer one project-level persistence structure containing all slides.

Conceptual example:

{
  "projectId": "project-001",
  "name": "Psychology Explainer",
  "version": 1,
  "activeSlideId": "slide-001",
  "slides": [
    {
      "id": "slide-001",
      "name": "Introduction",
      "layers": [],
      "background": {},
      "transition": {}
    },
    {
      "id": "slide-002",
      "name": "Problem Explanation",
      "layers": [],
      "background": {},
      "transition": {}
    }
  ]
}

Adapt this structure to the existing application rather than introducing an unnecessary second project model.

### Persistence requirements

- Save the complete project.
- Restore all slides.
- Preserve slide ordering.
- Preserve the active slide.
- Avoid losing changes during rapid slide switching.
- Handle asynchronous save operations safely.
- Ensure autosave is reliable.
- Handle browser refresh and reopening saved projects.
- Provide safe migrations for existing projects.
- Avoid breaking existing single-slide projects.

# Phase 4: Integration and Compatibility

All three features must work together.

Important scenarios:

1. Insert a doodle into slide 1 and refresh. The doodle must remain.
2. Generate an AI slide and refresh. The generated slide must remain.
3. Create multiple slides with different assets. All must remain.
4. Switch between slides. Each slide must maintain its independent layers.
5. Edit an avatar and switch slides. The other slide must not be affected.
6. Generate animations for slides containing local assets.
7. Export a multi-slide video with transitions.
8. Duplicate and delete slides without corrupting project data.
9. Open an existing project created before these changes.

Do not break existing animation, drawing, hand movement, undo/redo, or export functionality.

# Phase 5: Deliverables – Planning Only

After analyzing the repository, provide the following:

## 1. Existing Architecture Report

Explain the current architecture, project model, slide model, rendering pipeline and persistence mechanism.

## 2. Root Cause Analysis

Explain exactly why slides disappear after refresh.

Include:

- Relevant file names.
- Relevant functions.
- Current save flow.
- Current restore flow.
- Root cause.
- Recommended fix.

## 3. Feature Architecture

Design the architecture for:

- Local Asset Library.
- AI Prompt-to-Slide.
- Multi-slide persistence.

Explain how they integrate with existing functionality.

## 4. UI/UX Proposal

Describe where the new features should appear in the current interface.

Keep the existing design language and avoid unnecessary UI redesign.

## 5. Implementation Roadmap

Divide implementation into manageable stages.

For each stage include:

- Tasks.
- Files likely to change.
- New files required.
- Dependencies.
- Complexity.
- Potential risks.
- Testing requirements.

Prioritize the persistence bug first.

## 6. Technology Recommendations

Recommend the simplest suitable architecture that fits the existing browser-based application.

Prefer reusing existing functionality over introducing unnecessary frameworks or dependencies.

## 7. Testing Strategy

Provide test cases for:

- Single-slide projects.
- Multi-slide projects.
- Refresh and restore.
- Asset insertion.
- AI-generated layers.
- Slide duplication/deletion.
- Video export.
- Existing project compatibility.

## 8. Final Recommendations

Provide:

- Recommended implementation order.
- MVP scope.
- Future enhancements.
- Estimated development effort.
- Potential performance and storage limitations.

# STRICT INSTRUCTIONS

- Analyze before implementing.
- Do not modify files.
- Do not create a new framework or rewrite the application.
- Do not replace the existing animation engine.
- Do not flatten AI slides into images.
- Reuse the existing layer system.
- Preserve browser-only operation wherever possible.
- Identify actual root causes instead of guessing.
- Clearly distinguish verified findings from architectural recommendations.

At the end, present a detailed, prioritized implementation plan and wait for my approval before writing any code.