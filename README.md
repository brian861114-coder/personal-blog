# NOTES — 個人部落格（Astro + GitHub Pages）

以淺色中文介面打造的個人文章站，支援文字、圖片、短片（mp4）與外部連結。

## 本機開發（一鍵開啟）

最方便：雙擊桌面捷徑 `NOTES-Blog`，或專案裡的 `start-blog.bat`

也可用：

```bash
cd "C:\Users\brian\Downloads\personal blog"
npm start
```

腳本會自動：

1. 啟動本機開發伺服器（若尚未啟動）
2. 開啟網站：http://127.0.0.1:4321/
3. 開啟後台：http://127.0.0.1:4321/keystatic/

手動啟動仍可用 `npm run dev`。

> 後台只在本機開發時可用。GitHub Pages 是靜態站，線上不會開放後台。

---

## 新增／修改文章檢查清單

### A. 用 Keystatic 後台（推薦日常發文）

1. 執行 `npm run dev`
2. 打開 http://127.0.0.1:4321/keystatic/
3. 進入「文章」
4. 新增文章，或點現有文章修改
5. 填寫：
   - 標題、摘要、發布日期、分類
   - 卡片底色（選填）、封面圖（選填，可從後台上傳）
   - 正文（可插入圖片、連結、「短片（mp4）」元件）
6. 若有草稿，勾選「草稿」；確定發布就取消勾選
7. 儲存後，回前台預覽確認
8. `git add` → `git commit` → `git push`（部署到 GitHub Pages）

### B. 用 Cursor / 檔案直接編輯

1. 在 `src/content/posts/` 新增或修改 `.mdx` 檔
2. 圖片放到 `public/images/`（後台上傳預設進 `public/images/posts/`）
3. 短片放到 `public/videos/`（建議數秒、檔案精簡）
4. `npm run dev` 預覽
5. commit 後 push

Frontmatter 範例：

```yaml
---
title: 文章標題
description: 一句話摘要
pubDate: 2026-08-06
category: essay   # essay | tech | life | learn
tone: "#cce8f3"   # 卡片淺色底
# cover: /images/posts/xxx.jpg  # 卡片封面圖（選填，於後台上傳）
draft: false
---
```

短片寫法（後台也可插入同名元件）：

```mdx
<Video src="/videos/demo.mp4" poster="/images/sample-illustration.svg" />
```

外部連結直接用 Markdown：

```md
[連結文字](https://example.com)
```

### 發布前再確認

- [ ] 標題、摘要、分類正確
- [ ] 不是草稿（或確定要當草稿）
- [ ] 圖片／短片路徑正確，本機預覽看得到
- [ ] 外部連結可點開
- [ ] 已 commit 並 push（若要更新線上站）

---

## 部署到 GitHub Pages

1. 建立 GitHub repository，把本專案推上去
2. Repo → Settings → Pages → Source 選 **GitHub Actions**
3. 推送到 `main` 後，workflow 會自動 build / deploy

預設把 `BASE` 設成 `/<repo>/`。若你要用 `username.github.io` 這個使用者站根目錄，請把 `.github/workflows/deploy.yml` 裡的 `BASE` 改成 `/`。

## 設計備註

- 背景 `#f7f7f7` / 白色卡片
- 文字 `#575757` / 咖啡棕 `#4a261d`
- 強調橘 `#ffa600`、紅 `#fd5229`、藍 `#4079b6`

閱讀區刻意維持淺色，不使用深色大面積作為文字背景。
