---
id: personal-blog
name: personal blog
summary: NOTES 個人部落格：Astro 靜態站，本機 Keystatic，Pages 發布。
state: active
locations:
  - host: nitro
    path: C:\Users\brian\Downloads\10_projects\11_active\personal blog
    role: source
status_source: inline
snapshot: summary
related: []
card_reviewed: 2026-09-24
---
## 用途
繁中淺色文章站，放筆記、觀察與實驗紀錄（文字／圖／短片／連結），給外人閱讀。

## 功能
- 前台 Astro＋MDX；本機後台 Keystatic（正式 build 關閉）
- GitHub Actions `deploy.yml`：push `main` → GitHub Pages
- 短片規範：`AGENTS.md`／`CLAUDE.md`（encode 後進 `public/videos/posts/<slug>/`）

## 結構與入口
文章 `src/content/posts/`。一鍵：`start-blog.bat`／`npm start`。README 仍寫舊 `Downloads\personal blog` 路徑。

## 外部依賴
Node ≥22.12、npm（`package.json`：astro、mdx、react、keystatic）。部署用 Pages 環境變數 `SITE`／`BASE`。遠端：`personal-blog`。

## 禁區
未發布草稿若含私人行程或未公開構想，勿外洩。勿把本機 Keystatic 當成線上後台。`node_modules/`、`.astro/`、`dist/` 不當文案來源。

## 給 AI 的注意事項
後台只在 `astro dev`。改片須符合時長／體積契約。勿啟動 dev server。本卡不寫公開站完整 URL。

## 現況
最後 commit：2026-09-20（對比度）。未追蹤 `research/x-post-drafts-2026-09-21.md`。
