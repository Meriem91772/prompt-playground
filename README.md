<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:7F5AF0,50:00C2FF,100:2CB67D&height=220&section=header&text=Prompt%20Engineering%20Playground&fontSize=34&fontColor=ffffff&animation=fadeIn&fontAlignY=38" alt="header" />
</p>

<p align="center">
  <a href="https://prompt-playground-5i2s.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit%20App-7F5AF0?style=for-the-badge&logo=vercel&logoColor=white" />
  </a>
  <a href="https://github.com/YOUR_USERNAME/prompt-playground">
    <img src="https://img.shields.io/badge/GitHub-Repository-00C2FF?style=for-the-badge&logo=github&logoColor=white" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/Gemini_API-4285F4?style=flat-square&logo=google&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel" />
</p>

---

## Overview

**Prompt Engineering Playground** is an interactive AI web application built to explore how different prompts influence the behavior of a large language model.

The app allows users to:

- test the **same input** against multiple prompts
- compare outputs **side by side**
- save the most useful results
- rate prompt quality
- add notes and mark the **best prompt**

This project was created as part of an AI Engineering learning roadmap to build practical intuition around **prompt design, iteration, and evaluation**.

---

## Live Demo

<p align="center">
  <a href="https://prompt-playground-5i2s.vercel.app/">
    <img src="https://img.shields.io/badge/Open%20the%20App-prompt--playground--5i2s.vercel.app-2CB67D?style=for-the-badge" />
  </a>
</p>

---

## Features

- Compare multiple prompts on the same user input
- View responses side by side
- Save prompt-result pairs locally
- Store:
  - user input
  - prompt
  - generated response
- Rate each saved result
- Add evaluation notes
- Mark the best prompt
- Data persistence with `localStorage`
- Public deployment with Vercel

---

## Why This Project Matters

Prompt engineering is not just about writing prompts — it is about **testing**, **comparing**, and **evaluating** them systematically.

This project helps practice:

- prompt iteration
- response comparison
- qualitative evaluation
- prompt tracking and refinement

It turns prompt experimentation into a small but real workflow tool.

---

## Tech Stack

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>Next.js, React, TypeScript</td>
  </tr>
  <tr>
    <td><strong>Styling</strong></td>
    <td>Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Next.js API Routes</td>
  </tr>
  <tr>
    <td><strong>AI Model</strong></td>
    <td>Google Gemini API</td>
  </tr>
  <tr>
    <td><strong>Storage</strong></td>
    <td>Browser localStorage</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Vercel</td>
  </tr>
</table>

---

## Project Structure

```bash
app/
├── api/
│   └── compare/
│       └── route.ts
├── favicon.ico
├── globals.css
├── layout.tsx
└── page.tsx

public/
├── file.svg
├── globe.svg
├── vercel.svg
└── window.svg

package.json
package-lock.json
tsconfig.json
next.config.ts
postcss.config.mjs
eslint.config.mjs
.gitignore
README.md
