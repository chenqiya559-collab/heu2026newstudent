import { categories, guideItems, timeline, officialLinks } from './data.js';

const app = document.querySelector('#app');
let currentCategory = 'all';

app.innerHTML = `
  <div class="notice"><span>信息提示</span> 本站为学生团队整理，具体安排请以学校、学院 2026 年官方通知为准。</div>
  <header class="nav shell">
    <a class="brand" href="#top"><span class="brand-mark">H</span><span>启航 <b>HEU</b><small>2026 新生指南</small></span></a>
    <nav><a href="#guide">入学指南</a><a href="#timeline">报到时间线</a><a href="#ask">AI 问答</a><a href="#sources">官方入口</a></nav>
    <button class="nav-ask" data-focus-ask>问问启航助手 <span>→</span></button>
  </header>

  <main id="top">
    <section class="hero shell">
      <div class="hero-copy">
        <div class="eyebrow"><i></i> HARBIN ENGINEERING UNIVERSITY · 2026</div>
        <h1>从这里，<br>开始你的<span>大学航程。</span></h1>
        <p>一份由在校生共同维护的新生生存指南。把零散通知、真实经验和官方入口，整理成你随时找得到的答案。</p>
        <div class="hero-actions"><a class="primary" href="#guide">开始探索 <span>↓</span></a><button class="ghost" data-focus-ask>直接提问 <span>⌘ K</span></button></div>
        <div class="trust"><span>✓ 标注信息来源</span><span>✓ 显示更新时间</span><span>✓ 不确定就明确告诉你</span></div>
      </div>
      <div class="hero-card">
        <div class="orbit one"></div><div class="orbit two"></div>
        <div class="compass"><div class="needle"></div><span>启</span></div>
        <div class="float-card fc1"><b>06</b><span>大核心板块</span></div>
        <div class="float-card fc2"><b>2026</b><span>持续更新</span></div>
        <div class="float-card fc3"><b>AI</b><span>检索有出处</span></div>
      </div>
    </section>

    <section class="quick shell" aria-label="快速分类">
      ${categories.map(c => `<button data-category="${c.id}"><span style="--c:${c.color}">${c.icon.slice(0,1)}</span><b>${c.name}</b><small>${guideItems.filter(i=>i.category===c.id).length} 篇指南</small></button>`).join('')}
    </section>

    <section class="section shell" id="guide">
      <div class="section-head"><div><div class="eyebrow"><i></i> FRESHMAN FIELD GUIDE</div><h2>新生必备指南</h2><p>过来人的经验，配上可追溯的信息来源。</p></div><div class="filters"><button class="active" data-filter="all">全部</button>${categories.map(c=>`<button data-filter="${c.id}">${c.name}</button>`).join('')}</div></div>
      <div id="guide-grid" class="guide-grid"></div>
    </section>

    <section class="timeline-wrap" id="timeline"><div class="shell section">
      <div class="section-head light"><div><div class="eyebrow"><i></i> BEFORE ARRIVAL</div><h2>从录取到报到</h2><p>把重要事情放进一条时间线，少一点手忙脚乱。</p></div></div>
      <div class="timeline">${timeline.map((t,i)=>`<article><div class="num">${String(i+1).padStart(2,'0')}</div><div class="line"></div><small>${t.date}</small><h3>${t.title}</h3><p>${t.detail}</p></article>`).join('')}</div>
    </div></section>

    <section class="ask-section shell section" id="ask">
      <div class="ask-copy"><div class="eyebrow"><i></i> GROUNDED ANSWERS</div><h2>有问题，问启航助手</h2><p>它只根据本站整理的知识库回答，并把参考条目列出来。遇到未收录或可能变化的信息，会建议你去对应官方渠道确认。</p><div class="sample-title">大家常问</div><div class="chips"><button>选课前要准备什么？</button><button>宿舍能用大功率电器吗？</button><button>怎么选择社团？</button><button>报到要带哪些材料？</button></div></div>
      <div class="chat-card">
        <div class="chat-head"><div><span class="bot">H</span><b>启航助手</b><small><i></i> 本地知识库检索</small></div><button id="clear-chat" title="清空对话">↻</button></div>
        <div class="messages" id="messages"><div class="message bot-msg"><span class="bot">H</span><div>你好！我是启航助手 👋<br>你可以问我关于报到、选课、培养方案和校园生活的问题。<small>回答会附参考信息，请以最新官方通知为准。</small></div></div></div>
        <form id="ask-form"><input id="question" autocomplete="off" placeholder="例如：新生报到需要带什么？" /><button type="submit">发送 ↑</button></form>
      </div>
    </section>

    <section class="sources section" id="sources"><div class="shell"><div class="section-head"><div><div class="eyebrow"><i></i> OFFICIAL CHANNELS</div><h2>认准官方信息入口</h2><p>关键政策、日期和流程，以这些渠道发布的信息为准。</p></div></div><div class="source-grid">${officialLinks.map((l,i)=>`<a href="${l.url}" target="_blank" rel="noopener"><span>0${i+1}</span><div><b>${l.name}</b><small>${l.desc}</small></div><i>↗</i></a>`).join('')}</div></div></section>
  </main>
  <footer><div class="shell"><div class="brand inverse"><span class="brand-mark">H</span><span>启航 HEU<small>2026 新生入学指南</small></span></div><p>学生团队整理 · 非学校官方网站<br>信息有误？欢迎帮助我们一起完善。</p><button id="feedback">提交纠错 / 使用反馈 ↗</button></div><div class="footline shell"><span>最后更新：2026 年 8 月 1 日</span><span>愿你在这里，找到自己的航向。</span></div></footer>
  <dialog id="detail-dialog"><button class="dialog-close">×</button><div id="dialog-body"></div></dialog>
  <dialog id="feedback-dialog"><button class="dialog-close">×</button><div class="feedback-form"><div class="eyebrow"><i></i> FEEDBACK</div><h2>帮助我们做得更准</h2><p>这是演示版反馈入口。部署时可将表单接入腾讯问卷、金数据或你们自己的后端。</p><label>反馈类型<select><option>信息有误</option><option>缺少内容</option><option>使用体验</option><option>其他建议</option></select></label><label>具体内容<textarea placeholder="请描述你遇到的问题或建议……"></textarea></label><button class="primary" id="fake-submit">提交反馈</button></div></dialog>
`;

function renderGuides() {
  const list = currentCategory === 'all' ? guideItems : guideItems.filter(i => i.category === currentCategory);
  document.querySelector('#guide-grid').innerHTML = list.map((item, index) => {
    const cat = categories.find(c => c.id === item.category);
    return `<article class="guide-card" style="--delay:${index*40}ms" data-id="${item.id}"><div class="card-top"><span class="cat" style="--c:${cat.color}">${cat.name}</span><span class="badge ${item.priority==='必看'?'hot':''}">${item.priority}</span></div><h3>${item.title}</h3><p>${item.summary}</p><div class="card-meta"><span>更新于 ${item.updated.slice(5).replace('-','/')}</span><button>阅读全文 →</button></div></article>`;
  }).join('');
  document.querySelectorAll('.guide-card').forEach(card => card.addEventListener('click', () => openGuide(card.dataset.id)));
}

function openGuide(id) {
  const item = guideItems.find(i => i.id === id); const cat = categories.find(c => c.id === item.category);
  document.querySelector('#dialog-body').innerHTML = `<span class="cat" style="--c:${cat.color}">${cat.name}</span><h2>${item.title}</h2><p class="lead">${item.summary}</p><div class="verify">信息状态：<b>${item.verified}</b></div><ol>${item.content.map(c=>`<li>${c}</li>`).join('')}</ol><div class="citation"><small>参考来源</small><b>${item.source}</b>${item.sourceUrl?`<a href="${item.sourceUrl}" target="_blank">访问来源 ↗</a>`:''}<span>整理更新时间：${item.updated}</span></div>`;
  document.querySelector('#detail-dialog').showModal();
}

document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { currentCategory=b.dataset.filter; document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b)); renderGuides(); }));
document.querySelectorAll('[data-category]').forEach(b => b.addEventListener('click', () => { currentCategory=b.dataset.category; document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x.dataset.filter===currentCategory)); renderGuides(); document.querySelector('#guide').scrollIntoView({behavior:'smooth'}); }));
document.querySelectorAll('[data-focus-ask]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#ask').scrollIntoView({behavior:'smooth'});setTimeout(()=>document.querySelector('#question').focus(),500)}));
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelector('#feedback').addEventListener('click',()=>document.querySelector('#feedback-dialog').showModal());
document.querySelector('#fake-submit').addEventListener('click',()=>{alert('感谢反馈！演示版已记录交互；正式部署请接入真实表单。');document.querySelector('#feedback-dialog').close()});

const stopWords = new Set('的了是我你要有吗呢啊什么怎么如何一下可以能不能请问关于需要应该学校新生大学'.split(''));
function tokens(text) { return [...new Set((text.toLowerCase().match(/[\u4e00-\u9fa5]{1,4}|[a-z0-9]+/g)||[]).flatMap(x=>x.length>2&&/[\u4e00-\u9fa5]/.test(x)?[x,...x.split('')]:[x]).filter(x=>!stopWords.has(x)))]; }
function retrieve(query) {
  const q = tokens(query);
  return guideItems.map(item=>{ const hay=`${item.title} ${item.summary} ${item.keywords} ${item.content.join(' ')}`.toLowerCase(); let score=0; q.forEach(t=>{if(hay.includes(t)) score+=t.length>1?3:1}); if(item.title.includes(query))score+=10; return {item,score}; }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
}
function answer(question) {
  const hits=retrieve(question); if(!hits.length) return {html:`这个问题暂时不在本站知识库中，我不想猜测。建议你先查看学校官网或咨询辅导员、学院教学办公室。`,hits:[]};
  const top=hits[0].item; const bullets=top.content.slice(0,4).map(x=>`<li>${x}</li>`).join('');
  return {html:`根据“${top.title}”条目，你可以这样处理：<ul>${bullets}</ul><em>提醒：${top.verified}，涉及具体日期、费用、政策时请再核对最新官方通知。</em>`,hits};
}
function submitQuestion(q) {
  if(!q.trim()) return; const box=document.querySelector('#messages');
  box.insertAdjacentHTML('beforeend',`<div class="message user-msg"><div>${q.replace(/[<>]/g,'')}</div></div><div class="typing"><i></i><i></i><i></i></div>`); box.scrollTop=box.scrollHeight;
  setTimeout(()=>{document.querySelector('.typing')?.remove(); const res=answer(q); box.insertAdjacentHTML('beforeend',`<div class="message bot-msg"><span class="bot">H</span><div>${res.html}${res.hits.length?`<div class="refs"><small>参考条目</small>${res.hits.map((h,i)=>`<button data-open="${h.item.id}">[${i+1}] ${h.item.title}</button>`).join('')}</div>`:''}</div></div>`); box.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openGuide(b.dataset.open));box.scrollTop=box.scrollHeight;},550);
}
document.querySelector('#ask-form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#question');submitQuestion(input.value);input.value=''});
document.querySelectorAll('.chips button').forEach(b=>b.addEventListener('click',()=>submitQuestion(b.textContent)));
document.querySelector('#clear-chat').addEventListener('click',()=>document.querySelector('#messages').innerHTML='<div class="message bot-msg"><span class="bot">H</span><div>对话已清空。还有什么想了解的？</div></div>');
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('#ask').scrollIntoView({behavior:'smooth'});document.querySelector('#question').focus()}});
renderGuides();
