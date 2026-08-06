# NOTES — 個人部落格（Astro + GitHub Pages）

以淺色教室風 UI 打造的個人文章站，支援文字、圖片、短片（mp4）與外部連結。

## 本機開發

```bash
npm install
npm run dev
```

## 新增文章

1. 在 `src/content/posts/` 新增 `.md` 或 `.mdx`
2. 圖片放到 `public/images/`
3. 短片放到 `public/videos/`（建議數秒、檔案精簡）

文章 frontmatter 範例：

```yaml
---
title: 文章標題
description: 一句話摘要
pubDate: 2026-08-06
category: essay   # essay | tech | life | learn
tone: "#cce8f3"   # 卡片淺色底
jp: "記事"         # 卡片右上裝飾字
coverLabel: "Hello"
coverHint: "一起看看"
---
```

MDX 中嵌入短片：

```html
<video controls preload="metadata">
  <source src="/videos/demo.mp4" type="video/mp4" />
</video>
```

> 若網站是 GitHub **專案頁**（`username.github.io/repo`），媒體路徑前要加上 repo 名稱，或把 `BASE` 設好後改用帶 base 的路徑。

## 部署到 GitHub Pages

1. 建立 GitHub repository，把本專案推上去
2. Repo → Settings → Pages → Source 選 **GitHub Actions**
3. 推送到 `main` 後，workflow 會自動 build / deploy

預設把 `BASE` 設成 `/<repo>/`。若你要用 `username.github.io` 這個使用者站根目錄，請把 `.github/workflows/deploy.yml` 裡的 `BASE` 改成 `/`。

## 設計備註

配色沿用參考模板：

- 背景 `#f7f7f7` / 白色卡片
- 文字 `#575757` / 咖啡棕 `#4a261d`
- 強調橘 `#ffa600`、紅 `#fd5229`、藍 `#4079b6`

閱讀區刻意維持淺色，不使用深色大面積作為文字背景。
