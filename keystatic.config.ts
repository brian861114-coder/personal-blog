import { createElement } from 'react';
import { config, fields, collection } from '@keystatic/core';
import { block } from '@keystatic/core/content-components';

/** Clipboard pastes are often named `image.png`; Keystatic would otherwise overwrite. */
function uniqueImageFilename(originalFilename: string) {
  const lastDot = originalFilename.lastIndexOf('.');
  const ext = lastDot === -1 ? '' : originalFilename.slice(lastDot).toLowerCase();
  const base =
    (lastDot === -1 ? originalFilename : originalFilename.slice(0, lastDot))
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'image';
  const unique = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  return `${base}-${unique}${ext}`;
}

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: { name: 'NOTES 後台' },
  },
  collections: {
    posts: collection({
      label: '文章',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      schema: {
        title: fields.slug({
          name: {
            label: '標題',
            validation: { isRequired: true },
          },
        }),
        description: fields.text({
          label: '摘要',
          multiline: true,
          validation: { isRequired: true },
        }),
        pubDate: fields.date({
          label: '發布日期',
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: '更新日期（選填）',
        }),
        category: fields.select({
          label: '分類',
          options: [
            { label: '隨筆', value: 'essay' },
            { label: '技術', value: 'tech' },
            { label: '生活', value: 'life' },
            { label: '學習', value: 'learn' },
          ],
          defaultValue: 'essay',
        }),
        tone: fields.text({
          label: '卡片底色',
          defaultValue: '#cce8f3',
          description: '封面圖載入前的底色，例如 #cce8f3、#f6d7b8',
        }),
        cover: fields.image({
          label: '封面圖（選填）',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        draft: fields.checkbox({
          label: '草稿（不在前台顯示）',
          defaultValue: false,
        }),
        content: fields.mdx({
          label: '正文',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
              transformFilename: uniqueImageFilename,
            },
          },
          components: {
            Break: block({
              label: '空行',
              description: '文章裡多按的 Enter 會顯示成這段空白',
              schema: {},
              NodeView: () =>
                createElement('div', {
                  title: '空行',
                  style: {
                    height: '2em',
                    margin: '0.2em 0',
                    borderLeft: '3px solid #e8e5e3',
                  },
                }),
            }),
            Video: block({
              label: '短片（mp4）',
              schema: {
                src: fields.text({
                  label: '影片路徑',
                  description: '例如 /videos/demo.mp4',
                  validation: { isRequired: true },
                }),
                poster: fields.text({
                  label: '封面圖路徑（選填）',
                  description: '例如 /images/sample-illustration.svg',
                }),
              },
            }),
          },
        }),
      },
    }),
  },
});
