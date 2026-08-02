import { categories, guideItems } from './data.js';

const root = document.querySelector('#guide-page-app');
const params = new URLSearchParams(location.search);
const item = guideItems.find(guide => guide.id === params.get('id'));

function mediaHtml(media = []) {
  if (!media.length) return '';
  return `<div class="detail-media ${media.length === 1 ? 'single' : ''}">${media.map(entry => `<figure><a href="${entry.src}" target="_blank" rel="noopener"><img src="${entry.src}" alt="${entry.alt}" loading="lazy"></a><figcaption>${entry.caption}</figcaption></figure>`).join('')}</div>`;
}

if (!item) {
  document.title = '未找到指南｜启航 HEU';
  root.innerHTML = `<main class="detail-missing"><div><span>404</span><h1>没有找到这篇指南</h1><p>链接可能不完整，或者文章已经更新。</p><a href="./index.html#guide">返回全部指南</a></div></main>`;
} else {
  const category = categories.find(entry => entry.id === item.category);
  const related = guideItems.filter(entry => entry.category === item.category && entry.id !== item.id).slice(0, 3);
  document.title = `${item.title}｜启航 HEU`;
  root.innerHTML = `
    <div class="notice"><span>信息提示</span> 学生团队整理，具体政策与安排以学校、学院最新通知为准。</div>
    <header class="detail-nav shell"><a class="brand" href="./index.html"><span class="brand-mark">H</span><span>启航 <b>HEU</b><small>2026 新生指南</small></span></a><a class="detail-back" href="./index.html#guide">← 返回指南首页</a></header>
    <main class="detail-shell">
      <article class="detail-article">
        <div class="detail-breadcrumb"><a href="./index.html">首页</a><span>/</span><a href="./index.html#guide">新生指南</a><span>/</span><b>${category.name}</b></div>
        <div class="detail-hero"><span class="cat" style="--c:${category.color}">${category.name}</span><h1>${item.title}</h1><p>${item.summary}</p><div><span>信息状态：${item.verified}</span></div></div>
        ${mediaHtml(item.media)}
        ${item.sections ? `<section class="detail-keypoints"><h2>先看重点</h2><div>${item.sections.map(section => `<article><h3>${section.title}</h3><p>${section.text}</p></article>`).join('')}</div></section>` : ''}
        ${item.download ? `<a class="detail-download" href="${item.download.href}" download><span>↓</span><div><b>${item.download.label}</b><small>${item.download.size}</small></div><i>下载文件</i></a>` : ''}
        <section class="detail-content"><h2>完整说明</h2><ol>${item.content.map((paragraph, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><p>${paragraph}</p></li>`).join('')}</ol></section>
        <section class="detail-source"><div><small>参考来源</small><b>${item.source}</b></div>${item.sourceUrl ? `<a href="${item.sourceUrl}" target="_blank" rel="noopener">访问来源 ↗</a>` : ''}</section>
      </article>
      <aside class="detail-aside"><div><small>信息状态</small><strong>${item.verified}</strong><p>涉及费用、账号、开放时间和管理规定时，请再核对学校最新通知。</p></div>${related.length ? `<div><small>同类指南</small>${related.map(entry => `<a href="./guide.html?id=${entry.id}"><b>${entry.title}</b><span>查看全文 →</span></a>`).join('')}</div>` : ''}<a class="ask-side" href="./index.html#ask">还有疑问？<b>问启航助手 →</b></a></aside>
    </main>
    <footer><div class="footline shell"><span>启航 HEU · 学生团队整理</span><a href="./index.html">返回首页</a></div></footer>`;
}
