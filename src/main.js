import { categories, guideItems, timeline, officialLinks } from './data.js';

const app = document.querySelector('#app');
let currentCategory = 'all';

const mapResources = [
  { id: 'campus-map', title: 'HEU 校园平面图', tag: '总览', image: './assets/maps/heu-campus-map.jpg', desc: '教学楼、宿舍、食堂、停车场与校门分布', keywords: '校园总览 校园地图 平面图 教学楼 宿舍 食堂 校门 停车场 位置 导航' },
  { id: 'panorama', title: '校园手绘全景图', tag: '全景', image: './assets/maps/campus-panorama.jpg', desc: '按道路字母和建筑数字快速定位校园地点', keywords: '全景 手绘 建筑 道路 1号楼 图书馆 体育馆 公寓 医院 食堂' },
  { id: 'building-11', title: '11 号教学楼楼层图', tag: '教学楼', image: './assets/maps/building-11.jpg', desc: '1—5 层教室、楼梯、卫生间位置示意', keywords: '11号楼 11楼 教室 101 102 1层 2层 3层 4层 5层 楼梯 卫生间' },
  { id: 'bus-route', title: '校园小公交路线', tag: '交通', image: './assets/maps/campus-bus-route.jpg', desc: '北门、教学楼、体育馆、医院、公寓等站点', keywords: '公交 小公交 校车 路线 北门 东门 31号楼 41号楼 21B 11号楼 校医院 美食城 主楼 动力楼 水声楼' },
  { id: 'class-times', title: '上课时间表', tag: '时间', image: './assets/maps/class-times.jpg', desc: '第 1—13 小节上下课时间，一眼看懂', keywords: '上课时间 下课 时间表 第一大节 第二大节 第三大节 第四大节 第五大节 早八 晚课' },
  { id: 'colleges', title: '学院名称与代码', tag: '学院', image: './assets/maps/college-names.jpg', desc: '学院代码与学院名称快速对照', keywords: '学院代码 学院名称 学院 名称 代码 船舶 航建 动力 智能 水声 计算机 软件 保密 机电 信通 经管 材化 外语 人文 核 体育 马克思 数学 物理' }
];

app.innerHTML = `
  <div class="notice"><span>信息提示</span> 本站为学生团队整理，具体安排请以学校、学院 2026 年官方通知为准。</div>
  <header class="nav shell">
    <a class="brand" href="#top"><span class="brand-mark">H</span><span>启航 <b>HEU</b><small>2026 新生指南</small></span></a>
    <nav><a href="#maps">校园地图</a><a href="#guide">入学指南</a><a href="#market">校园集市</a><a href="#ask">AI 问答</a></nav>
    <button class="nav-ask" data-focus-ask>问问启航助手 <span>→</span></button>
  </header>

  <main id="top">
    <section class="hero shell">
      <div class="hero-copy">
        <div class="eyebrow"><i></i> HARBIN ENGINEERING UNIVERSITY · 2026</div>
        <h1>从这里，<br>开始你的<span>大学航程。</span></h1>
        <p>一份由在校生共同维护的新生生存指南。把零散通知、真实经验和官方入口，整理成你随时找得到的答案。</p>
        <div class="hero-actions"><a class="primary" href="#guide">开始探索 <span>↓</span></a><button class="ghost" data-focus-ask>直接提问 <span>⌘ K</span></button></div>
        <div class="trust"><span>✓ 标注信息来源</span><span>✓ 清晰标记适用范围</span><span>✓ 不确定就明确告诉你</span></div>
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

    <section class="map-hub shell section" id="maps">
      <div class="map-intro">
        <div>
          <div class="eyebrow"><i></i> CAMPUS NAVIGATION</div>
          <h2>第一次来，也不会迷路</h2>
          <p>输入地点、楼号或需求，快速找到对应地图和实用信息。</p>
        </div>
        <div class="map-search">
          <span>⌕</span><input id="map-query" placeholder="搜地点：例如 11号楼、小公交、上课时间" autocomplete="off"><button id="map-search-clear" aria-label="清空搜索">×</button>
        </div>
      </div>
      <div class="map-suggestions"><span>快速查找</span><button>校园总览</button><button>11号楼</button><button>小公交</button><button>上课时间</button><button>学院代码</button></div>
      <div class="map-grid" id="map-grid"></div>
      <div class="map-empty" id="map-empty"><b>没有找到对应地图</b><span>试试搜索“教学楼”“公交”或“学院”</span></div>
      <div class="map-note">地图资料来源于校内公开信息与同学整理，建筑用途和线路可能调整，请以现场标识及学校最新通知为准。</div>
    </section>

    <section class="section shell" id="guide">
      <div class="section-head"><div><div class="eyebrow"><i></i> FRESHMAN FIELD GUIDE</div><h2>新生必备指南</h2><p>过来人的经验，配上可追溯的信息来源。</p></div><div class="filters"><button class="active" data-filter="all">全部</button>${categories.map(c=>`<button data-filter="${c.id}">${c.name}</button>`).join('')}</div></div>
      <div id="guide-grid" class="guide-grid"></div>
    </section>

    <section class="timeline-wrap" id="timeline"><div class="shell section">
      <div class="section-head light"><div><div class="eyebrow"><i></i> BEFORE ARRIVAL</div><h2>从录取到报到</h2><p>把重要事情放进一条时间线，少一点手忙脚乱。</p></div></div>
      <div class="timeline">${timeline.map((t,i)=>`<article><div class="num">${String(i+1).padStart(2,'0')}</div><div class="line"></div><small>${t.date}</small><h3>${t.title}</h3><p>${t.detail}</p></article>`).join('')}</div>
    </div></section>

    <section class="market-section section" id="market"><div class="shell market-layout">
      <div class="market-mark"><img src="./assets/life/zanou-campus-market-logo.jpg" alt="赞噢校园集市标识" loading="lazy"><div><b>赞噢校园集市</b><small>Campus Market</small></div><i>✓</i></div>
      <div class="market-copy"><div class="eyebrow"><i></i> CAMPUS COMMUNITY</div><h2>校园里的新消息，也能有人一起解答</h2><p>在微信搜索“赞噢校园集市”，可以浏览校园即时信息，或发帖向学长学姐请教课程、生活和社团经验。</p><div class="market-actions"><button class="primary" data-market-question>问问校园集市怎么用 <span>→</span></button><a class="ghost" href="./guide.html?id=zanou-campus-market">查看使用提醒 <span>↗</span></a></div><small>它适合交流经验；报到、缴费、账号和政策类信息，请始终以学校官方通知为准。</small></div>
    </div></section>

    <section class="ask-section shell section" id="ask">
      <div class="ask-copy"><div class="eyebrow"><i></i> GROUNDED ANSWERS</div><h2>有问题，问启航助手</h2><p>它只根据本站整理的知识库回答，并把参考条目列出来。遇到未收录或可能变化的信息，会建议你去对应官方渠道确认。</p><div class="sample-title">大家常问</div><div class="chips"><button>宿舍是几人寝，有没有阳台？</button><button>洗浴中心几点营业？</button><button>宿舍会查寝吗？</button><button>报到要带哪些材料？</button></div><div class="popular-box"><b>高频问题自动汇总</b><span id="popular-questions">提问后会在本机匿名汇总，帮助后续补充知识库</span></div></div>
      <div class="chat-card">
        <div class="chat-head"><div><span class="bot">H</span><b>启航助手</b><small><i></i> 本地 RAG · ${guideItems.length} 篇知识</small></div><button id="clear-chat" title="清空对话">↻</button></div>
        <div class="messages" id="messages"><div class="message bot-msg"><span class="bot">H</span><div>你好！我是启航助手 👋<br>你可以问我关于报到、选课、培养方案和校园生活的问题。<small>回答会附参考信息，请以最新官方通知为准。</small></div></div></div>
        <form id="ask-form"><input id="question" autocomplete="off" placeholder="例如：新生报到需要带什么？" /><button type="submit">发送 ↑</button></form>
      </div>
    </section>

    <section class="polish-section section" id="polish"><div class="shell polish-layout">
      <div class="polish-copy"><div class="eyebrow"><i></i> NOTICE ORGANIZER</div><h2>把碎片通知，整理成可执行的信息</h2><p>粘贴班群公告、楼内通知或学长学姐经验。助手会提取关键事项和待办，保留不确定信息供你回看原文。</p><small>本地处理，不上传文本；涉及日期、费用和管理规定仍请核对原通知。</small></div>
      <div class="polish-tool"><form id="polish-form"><label for="notice-input">原始内容</label><textarea id="notice-input" required placeholder="例如：18、19公寓浴池下午四点到晚上十一点开，周二不开放。使用校园卡，具体以公告为准。"></textarea><button class="primary" type="submit">整理通知 <span>→</span></button></form><section id="polish-result" class="polish-result" hidden aria-live="polite"></section></div>
    </div></section>

    <section class="sources section" id="sources"><div class="shell"><div class="section-head"><div><div class="eyebrow"><i></i> OFFICIAL CHANNELS</div><h2>认准官方信息入口</h2><p>关键政策、日期和流程，以这些渠道发布的信息为准。</p></div></div><div class="source-grid">${officialLinks.map((l,i)=>`<a href="${l.url}" target="_blank" rel="noopener"><span>0${i+1}</span><div><b>${l.name}</b><small>${l.desc}</small></div><i>↗</i></a>`).join('')}</div></div></section>
  </main>
  <footer><div class="shell"><div class="brand inverse"><span class="brand-mark">H</span><span>启航 HEU<small>2026 新生入学指南</small></span></div><p>学生团队整理 · 非学校官方网站<br>信息有误？欢迎帮助我们一起完善。</p><button id="feedback">提交纠错 / 使用反馈 ↗</button></div><div class="footline shell"><span>学生团队整理</span><span>愿你在这里，找到自己的航向。</span></div></footer>
  <dialog id="detail-dialog"><button class="dialog-close">×</button><div id="dialog-body"></div></dialog>
  <dialog id="map-dialog"><button class="dialog-close">×</button><div class="map-dialog-head"><div><span id="map-dialog-tag"></span><h2 id="map-dialog-title"></h2><p id="map-dialog-desc"></p></div><a id="map-original" target="_blank">查看原图 ↗</a></div><div class="map-image-wrap"><img id="map-dialog-image" alt="校园地图大图"></div></dialog>
  <dialog id="feedback-dialog"><button class="dialog-close">×</button><div class="feedback-form"><div class="eyebrow"><i></i> FEEDBACK</div><h2>帮助我们做得更准</h2><p>这是演示版反馈入口。部署时可将表单接入腾讯问卷、金数据或你们自己的后端。</p><label>反馈类型<select><option>信息有误</option><option>缺少内容</option><option>使用体验</option><option>其他建议</option></select></label><label>具体内容<textarea placeholder="请描述你遇到的问题或建议……"></textarea></label><button class="primary" id="fake-submit">提交反馈</button></div></dialog>
`;

function renderGuides() {
  const list = currentCategory === 'all' ? guideItems : guideItems.filter(i => i.category === currentCategory);
  document.querySelector('#guide-grid').innerHTML = list.map((item, index) => {
    const cat = categories.find(c => c.id === item.category);
    return `<a class="guide-card" href="./guide.html?id=${item.id}" style="--delay:${index*40}ms" data-id="${item.id}"><div class="card-top"><span class="cat" style="--c:${cat.color}">${cat.name}</span><span class="badge ${item.priority==='必看'?'hot':''}">${item.priority}</span></div><h3>${item.title}</h3><p>${item.summary}</p><div class="card-meta"><span>参考信息已标注</span><span>阅读全文 →</span></div></a>`;
  }).join('');
  document.querySelectorAll('.guide-card').forEach(card => card.addEventListener('click', () => openGuide(card.dataset.id)));
}

function renderMaps(query = '') {
  const normalized = query.trim().toLowerCase();
  const list = normalized ? mapResources.filter(item => `${item.title} ${item.tag} ${item.desc} ${item.keywords}`.toLowerCase().includes(normalized)) : mapResources;
  const grid = document.querySelector('#map-grid');
  grid.innerHTML = list.map((item, index) => `<article class="map-card ${index === 0 && !normalized ? 'featured' : ''}" data-map="${item.id}"><div class="map-thumb"><img src="${item.image}" alt="${item.title}" loading="lazy"><span>${item.tag}</span><i>点击放大</i></div><div class="map-card-copy"><small>0${mapResources.indexOf(item)+1}</small><div><h3>${item.title}</h3><p>${item.desc}</p></div><button aria-label="查看${item.title}">↗</button></div></article>`).join('');
  document.querySelector('#map-empty').classList.toggle('show', list.length === 0);
  grid.querySelectorAll('[data-map]').forEach(card => card.addEventListener('click', () => openMap(card.dataset.map)));
}

function openMap(id) {
  const item = mapResources.find(map => map.id === id);
  document.querySelector('#map-dialog-tag').textContent = item.tag;
  document.querySelector('#map-dialog-title').textContent = item.title;
  document.querySelector('#map-dialog-desc').textContent = item.desc;
  document.querySelector('#map-dialog-image').src = item.image;
  document.querySelector('#map-dialog-image').alt = item.title;
  document.querySelector('#map-original').href = item.image;
  document.querySelector('#map-dialog').showModal();
}

function openGuide(id) {
  window.location.href = `./guide.html?id=${encodeURIComponent(id)}`;
}

document.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { currentCategory=b.dataset.filter; document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b)); renderGuides(); }));
document.querySelectorAll('[data-category]').forEach(b => b.addEventListener('click', () => { currentCategory=b.dataset.category; document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x.dataset.filter===currentCategory)); renderGuides(); document.querySelector('#guide').scrollIntoView({behavior:'smooth'}); }));
document.querySelectorAll('[data-focus-ask]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('#ask').scrollIntoView({behavior:'smooth'});setTimeout(()=>document.querySelector('#question').focus(),500)}));
document.querySelectorAll('[data-market-question]').forEach(button=>button.addEventListener('click',()=>{document.querySelector('#ask').scrollIntoView({behavior:'smooth'});setTimeout(()=>submitQuestion('赞噢校园集市怎么用？'),400)}));
document.querySelectorAll('.dialog-close').forEach(b=>b.addEventListener('click',()=>b.closest('dialog').close()));
document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
document.querySelector('#map-query').addEventListener('input', event => renderMaps(event.target.value));
document.querySelector('#map-search-clear').addEventListener('click', () => { const input=document.querySelector('#map-query'); input.value=''; renderMaps(); input.focus(); });
document.querySelectorAll('.map-suggestions button').forEach(button => button.addEventListener('click', () => { const input=document.querySelector('#map-query'); input.value=button.textContent; renderMaps(button.textContent); }));
document.querySelector('#feedback').addEventListener('click',()=>document.querySelector('#feedback-dialog').showModal());
document.querySelector('#fake-submit').addEventListener('click',()=>{alert('感谢反馈！演示版已记录交互；正式部署请接入真实表单。');document.querySelector('#feedback-dialog').close()});
document.querySelector('#polish-form').addEventListener('submit', event => { event.preventDefault(); renderPolishedNotice(document.querySelector('#notice-input').value); });

const stopWords = new Set('的了是我你要有吗呢啊什么怎么如何一下可以能不能请问关于需要应该学校新生大学'.split(''));
function tokens(text) { return [...new Set((text.toLowerCase().match(/[\u4e00-\u9fa5]{1,4}|[a-z0-9]+/g)||[]).flatMap(x=>x.length>2&&/[\u4e00-\u9fa5]/.test(x)?[x,...x.split('')]:[x]).filter(x=>!stopWords.has(x)))]; }
function legacyRetrieve(query) {
  const q = tokens(query);
  return guideItems.map(item=>{ const sectionText=item.sections?.map(section=>`${section.title} ${section.text}`).join(' ')||''; const hay=`${item.title} ${item.summary} ${item.keywords} ${item.content.join(' ')} ${sectionText}`.toLowerCase(); let score=0; q.forEach(t=>{if(hay.includes(t)) score+=t.length>1?3:1}); if(item.title.includes(query))score+=10; return {item,score}; }).filter(x=>x.score>0).sort((a,b)=>b.score-a.score).slice(0,3);
}
function legacyAnswer(question) {
  const hits=legacyRetrieve(question); if(!hits.length) return {html:`这个问题需要更多具体信息。生活经验类问题可以去“赞噢校园集市”搜索或发帖请教学长学姐；政策、缴费和账号事项请同时核对学校官方通知。`,hits:[]};
  const usefulHits=hits.filter((hit,index)=>index===0||hit.score>=hits[0].score*.55).slice(0,2);
  const details=usefulHits.flatMap((hit,index)=>hit.item.content.slice(0,index===0?5:2)).slice(0,7);
  const downloads=usefulHits.filter(hit=>hit.item.download).map(hit=>`<a class="chat-download" href="${hit.item.download.href}" download>↓ ${hit.item.download.label}（${hit.item.download.size}）</a>`).join('');
  const sourceNames=usefulHits.map(hit=>`“${hit.item.title}”`).join('和');
  return {html:`我检索了${sourceNames}，整理后的建议如下：<ul>${details.map(detail=>`<li>${detail}</li>`).join('')}</ul>${downloads}<em>信息状态：${usefulHits.map(hit=>hit.item.verified).join('；')}。涉及账号、支付、日期和管理政策时，请以 App 当前页面及学校最新通知为准。</em>`,hits};
}
function legacySubmitQuestion(q) {
  if(!q.trim()) return; const box=document.querySelector('#messages');
  box.insertAdjacentHTML('beforeend',`<div class="message user-msg"><div>${q.replace(/[<>]/g,'')}</div></div><div class="typing"><i></i><i></i><i></i></div>`); box.scrollTop=box.scrollHeight;
  setTimeout(()=>{document.querySelector('.typing')?.remove(); const res=legacyAnswer(q); box.insertAdjacentHTML('beforeend',`<div class="message bot-msg"><span class="bot">H</span><div>${res.html}${res.hits.length?`<div class="refs"><small>参考条目</small>${res.hits.map((h,i)=>`<button data-open="${h.item.id}">[${i+1}] ${h.item.title}</button>`).join('')}</div>`:''}</div></div>`); box.querySelectorAll('[data-open]').forEach(b=>b.onclick=()=>openGuide(b.dataset.open));box.scrollTop=box.scrollHeight;},550);
}
document.querySelector('#ask-form').addEventListener('submit',e=>{e.preventDefault();const input=document.querySelector('#question');submitQuestion(input.value);input.value=''});
document.querySelectorAll('.chips button').forEach(b=>b.addEventListener('click',()=>submitQuestion(b.textContent)));
document.querySelector('#clear-chat').addEventListener('click',()=>document.querySelector('#messages').innerHTML='<div class="message bot-msg"><span class="bot">H</span><div>对话已清空。还有什么想了解的？</div></div>');
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();document.querySelector('#ask').scrollIntoView({behavior:'smooth'});document.querySelector('#question').focus()}});
// Local RAG engine: chunk -> retrieve -> grounded answer.
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
function polishNotice(text) {
  const cleaned=String(text||'').replace(/\s+/g,' ').trim();
  const sentences=cleaned.split(/(?<=[。！？；;])/).map(sentence=>sentence.trim()).filter(Boolean);
  const topic=/(浴池|洗浴|洗澡)/.test(cleaned)?'洗浴安排':/(宿舍|公寓|寝室)/.test(cleaned)?'宿舍通知':/(报到|报道)/.test(cleaned)?'新生报到':/(选课|课表)/.test(cleaned)?'选课提醒':'校园通知';
  const keyLines=sentences.filter(sentence=>/(时间|点|周.|日期|地点|开放|休息|费用|校园卡|需|请|禁止|安排|通知)/.test(sentence)).slice(0,5);
  const actions=sentences.filter(sentence=>/(请|需|带|准备|核对|查看|联系|遵守|不要)/.test(sentence)).slice(0,3);
  return {topic,summary:sentences.slice(0,2).join(' ')||cleaned,keyLines:keyLines.length?keyLines:sentences.slice(0,4),actions};
}
function renderPolishedNotice(text) {
  const result=document.querySelector('#polish-result'); const data=polishNotice(text); const actionHtml=data.actions.length?`<div><small>建议操作</small><ul>${data.actions.map(line=>`<li>${escapeHtml(line)}</li>`).join('')}</ul></div>`:'<div><small>建议操作</small><p>请保留原通知，并核对发布部门、日期和适用范围。</p></div>';
  result.hidden=false; result.innerHTML=`<div class="polish-result-head"><span>整理结果</span><button type="button" id="copy-polished" title="复制整理结果">复制</button></div><h3>${escapeHtml(data.topic)}</h3><p>${escapeHtml(data.summary)}</p><div class="polish-points"><div><small>关键信息</small><ul>${data.keyLines.map(line=>`<li>${escapeHtml(line)}</li>`).join('')}</ul></div>${actionHtml}</div><em>自动整理不替代原始通知；有日期、费用或管理规则时请回看来源。</em>`;
  document.querySelector('#copy-polished').addEventListener('click', async () => { const copyText=`${data.topic}\n${data.summary}\n关键信息：\n${data.keyLines.map(line=>`- ${line}`).join('\n')}\n建议操作：\n${data.actions.map(line=>`- ${line}`).join('\n')}`; try { await navigator.clipboard.writeText(copyText); document.querySelector('#copy-polished').textContent='已复制'; } catch (_) { document.querySelector('#copy-polished').textContent='请手动复制'; } });
}
const ragStopWords = new Set(['的','了','是','我','你','要','有','吗','呢','啊','什么','怎么','如何','一下','可以','能不能','请问','关于','需要','应该','学校','新生','大学','帮我','问题','完全','没有','收录','一下','一下子','的话','是不是','有没有','了解','知道','告诉','想问','请教','哈工程','哈尔滨工程大学','heu']);
const ragSynonymGroups = [
  ['报到','报道','到校','入学','现场报到','迎新'], ['材料','证件','通知书','档案','团关系','党关系','照片','绿色通道'],
  ['路线','交通','怎么去','到校路线','车站','机场','地铁','打车','接站'], ['哈尔滨站','哈站'], ['哈尔滨西站','哈西','西站'], ['太平机场','哈尔滨太平国际机场','机场'],
  ['选课','抢课','退课','补选','课表','教务系统'], ['培养方案','培养计划','毕业要求','学分','先修','转专业','推免'],
  ['工科数学分析','高数','数学分析','数分'], ['线性代数','线代'], ['大学英语','英语一'], ['军事技能训练','军训'],
  ['移动校园','校园app','校园 APP','HEU校园','缴费','校园卡充值','财务服务'],
  ['校园卡','饭卡','一卡通','餐卡','澡卡','校园码','电子校园卡','充值','余额','挂失','补卡','电费','充电费'], ['校园网','wifi','wi-fi','无线','无线网','网络','联网','网费','HEU-AUTO','HEU-WLAN'], ['VPN','校外访问','内网','知网','图书馆数据库'],
  ['宿舍','公寓','寝室','宿寝','床位','独卫','独立卫生间','四人寝','四人间','上床下桌','阳台','查寝'], ['洗澡','洗浴','浴池','公共浴池','澡堂'], ['电器','大功率','用电','插排','违规电器'],
  ['吃饭','用餐','就餐','食堂','饭堂','餐厅','大美食堂','大美','小美食堂','小美','至美餐厅','至美','快乐食间','早餐','午饭','晚饭'], ['购物','买东西','超市','生活超市','生活用品','启航活动中心','启航地下','北体育场','北体','公寓楼下','剪头','剪头发','理发','修手机','手机维修','买水果'], ['外卖','外送','叫外卖','点外卖','送餐','取餐','外卖柜','取餐柜','东门','北门','南门'], ['打印','复印','印刷','打印店','21b','21B','PDF','装订'], ['教材','课本','书本','二手书','书店'], ['图书馆','借书','借阅','馆藏','索书号'],
  ['快递','邮寄','驿站','取件','收件','包裹','寄行李','行李'], ['公交','校车','小公交','校园巴士','巴士','摆渡车','接驳车','接站'],
  ['PPT','模板','答辩','汇报','演示'], ['助学贷款','贷款回执','受理证明','助学金','资助'], ['社团','学生组织','学生会','招新','百团'],
  ['诈骗','防骗','骗局','刷单','陌生链接','冒充老师','缴费诈骗']
];
const ragRelations = [
  { triggers:['校园卡','饭卡'], expands:['用途','食堂','吃饭','充值','余额','宿舍电费','缴电费','洗浴','浴池','卡槽','放水','扣费','挂失','校园码'] },
  { triggers:['吃饭','食堂','餐厅','大美','小美','至美','快乐食间'], expands:['大美食堂','小美食堂','至美餐厅','快乐食间','校园卡','电子校园卡','校园码','校园地图','位置'] },
  { triggers:['小公交','校车','公交'], expands:['校园小公交','路线图','站点','校内学生','校外人士','只在校内','不出校门','票价','费用','北门','教学楼','体育馆','校医院','公寓'] },
  { triggers:['洗浴','洗澡','浴池'], expands:['校园卡','卡槽','读卡器','放水','扣费','计费','营业时间'] },
  { triggers:['电费','缴电费'], expands:['校园卡','移动校园','充值','公寓','房间号','缴费'] },
  { triggers:['充值','充钱'], expands:['校园卡','移动校园','余额','到账','重复支付'] },
  { triggers:['丢了','丢失','遗失'], expands:['校园卡','挂失','补卡','余额安全'] },
  { triggers:['报到','报道','到校'], expands:['材料','通知书','身份证','档案','照片','绿色通道','现场','迎新'] },
  { triggers:['路线','怎么去','机场','火车站'], expands:['地铁','工程大学站','哈尔滨站','哈尔滨西站','太平机场','打车','接站'] },
  { triggers:['选课','课表'], expands:['教务系统','培养方案','必修','选修','学分','退补选','时间冲突'] },
  { triggers:['宿舍','寝室','公寓'], expands:['床位','上床下桌','卫生间','空调','供暖','用电','洗浴','报修','门禁'] },
  { triggers:['校园网','wifi','联网'], expands:['HEU-AUTO','HEU-WLAN','学号','统一身份认证','PEAP','VPN','终端','报修'] },
  { triggers:['缴费','支付','学费'], expands:['移动校园','财务服务','订单','扣款','官方入口','验证码','诈骗'] }
];
const ragIntentProfiles = [
  { id:'howto', label:'操作步骤', triggers:['怎么','如何','步骤','流程','操作','怎么办','咋办'], boosts:['流程','步骤','先','再','登录','查询','确认','联系','办理','入口'] },
  { id:'checklist', label:'清单', triggers:['带什么','准备','材料','清单','需要带','要带','必备'], boosts:['材料','准备','证件','通知书','身份证','照片','档案','清单'] },
  { id:'route', label:'路线', triggers:['怎么去','路线','到校','机场','火车站','地铁','打车','接站'], boosts:['路线','地铁','工程大学站','机场','车站','打车','接站','地址'] },
  { id:'risk', label:'风险提醒', triggers:['能不能','可以吗','安全吗','被骗','诈骗','丢了','异常','失败','扣款','陌生'], boosts:['不要','谨防','核对','官方','挂失','异常','保存','联系','不要重复'] },
  { id:'time', label:'时间安排', triggers:['什么时候','几点','时间','开放','报到时间','营业时间','日期'], boosts:['时间','日期','开放','营业','通知','当年','最新'] },
  { id:'download', label:'资源下载', triggers:['下载','pdf','ppt','模板','文件'], boosts:['下载','PDF','PPT','模板','压缩包','文件'] }
];
function ragNormalize(value) { return String(value || '').toLowerCase().replace(/[“”‘’、，。！？：；（）【】《》\s\-_/]/g,''); }
function ragTokens(value) {
  const normalized=ragNormalize(value); const pieces=normalized.match(/[\u4e00-\u9fa5]+|[a-z0-9]+/g)||[]; const result=[];
  pieces.forEach(piece=>{ if(!ragStopWords.has(piece)&&piece.length<=10) result.push(piece); if(piece.length>1&&/[\u4e00-\u9fa5]/.test(piece)){ for(let size=2;size<=4;size++){for(let i=0;i+size<=piece.length;i++) result.push(piece.slice(i,i+size));} } });
  return [...new Set(result.filter(token=>(token.length>1||/[a-z0-9]/.test(token))&&!ragStopWords.has(token)))];
}
function detectIntent(query) {
  const normalized=ragNormalize(query);
  const hits=ragIntentProfiles.map(profile=>({profile,score:profile.triggers.reduce((sum,trigger)=>sum+(normalized.includes(ragNormalize(trigger))?1:0),0)})).filter(hit=>hit.score>0).sort((a,b)=>b.score-a.score);
  return hits[0]?.profile || { id:'general', label:'综合检索', boosts:[] };
}
function ragExpand(tokens) {
  const expanded=new Set(tokens); const joined=tokens.join('');
  ragSynonymGroups.forEach(group=>{
    const matchesGroup=group.some(term=>{
      const normalizedTerm=ragNormalize(term);
      return joined.includes(normalizedTerm)||tokens.some(token=>normalizedTerm.includes(token)||token.includes(normalizedTerm));
    });
    if(matchesGroup) group.forEach(term=>expanded.add(ragNormalize(term)));
  });
  ragRelations.forEach(relation=>{if(relation.triggers.some(term=>joined.includes(ragNormalize(term)))) relation.expands.forEach(term=>expanded.add(ragNormalize(term)));});
  return [...expanded];
}
const ragChunks = guideItems.flatMap(item => {
  const category=categories.find(entry=>entry.id===item.category);
  const chunks=[{text:item.summary,type:'摘要',order:0}];
  item.content.forEach((text,index)=>chunks.push({text,type:`要点 ${index+1}`,order:index+1}));
  (item.sections||[]).forEach((section,index)=>chunks.push({text:`${section.title}：${section.text}`,type:section.title,order:100+index}));
  return chunks.map(chunk=>({item,category,...chunk,titleHay:ragNormalize(item.title),keywordHay:ragNormalize(`${item.keywords} ${category?.name || ''} ${item.priority} ${item.verified}`),textHay:ragNormalize(chunk.text)}));
});
function retrieve(query) {
  const normalized=ragNormalize(query); const intent=detectIntent(query); const baseTerms=ragTokens(query); const baseSet=new Set(baseTerms); const terms=ragExpand(baseTerms); const phraseTerms=[]; for(let size=4;size<=7;size++){for(let i=0;i+size<=normalized.length;i++){const phrase=normalized.slice(i,i+size);if(/[\u4e00-\u9fa5]/.test(phrase)) phraseTerms.push(phrase);}}
  const scored=ragChunks.map(chunk=>{ let score=0; if(normalized&&chunk.titleHay.includes(normalized)) score+=30; if(normalized&&chunk.textHay.includes(normalized)) score+=20;
    if((normalized.includes('用途')||normalized.includes('功能')||normalized.includes('有哪些'))&&chunk.type==='摘要') score+=18;
    if((normalized.includes('丢了')||normalized.includes('丢卡')||normalized.includes('遗失'))&&chunk.textHay.includes('挂失')) score+=32;
    if(intent.id==='time'&&(/[0-9]{1,2}[:：][0-9]{2}/.test(chunk.text)||chunk.type.includes('时间'))) score+=20;
    if(normalized.includes('校训')&&chunk.textHay.includes('大学至真大工至善')) score+=55;
    if((normalized.includes('哈军工精神')||normalized.includes('军工精神'))&&chunk.textHay.includes('哈军工精神')) score+=55;
    if((normalized.includes('成立')||normalized.includes('哪年')||normalized.includes('建校'))&&chunk.textHay.includes('1953')) score+=45;
    if((normalized.includes('学科')||normalized.includes('专业实力')||normalized.includes('优势学科'))&&chunk.textHay.includes('三海一核')) score+=35;
    if(['吃饭','食堂','餐厅','大美','小美','至美','快乐食间'].some(term=>normalized.includes(term))&&chunk.item.id==='campus-canteens-guide') score+=45;
    if(['小公交','校车','校园公交','校园巴士','巴士','摆渡车','接驳车'].some(term=>normalized.includes(term))&&chunk.item.id==='campus-shuttle-guide') score+=45;
    if(['快递','包裹','取件','驿站'].some(term=>normalized.includes(term))&&chunk.item.id==='campus-delivery') score+=45;
    if(['饭卡','一卡通','餐卡','澡卡','补卡','挂失','充电费'].some(term=>normalized.includes(term))&&chunk.item.id==='canteen-card') score+=35;
    intent.boosts.forEach(term=>{const normalizedBoost=ragNormalize(term); if(chunk.textHay.includes(normalizedBoost)) score+=5; if(chunk.keywordHay.includes(normalizedBoost)) score+=3;});
    phraseTerms.forEach(phrase=>{if(chunk.textHay.includes(phrase)) score+=14; if(chunk.titleHay.includes(phrase)) score+=8;});
    terms.forEach(term=>{const weight=baseSet.has(term)?1:.32; if(chunk.textHay.includes(term)) score+=(term.length>=4?8:4)*weight; if(chunk.titleHay.includes(term)) score+=9*weight; if(chunk.keywordHay.includes(term)) score+=1.5*weight;});
    if(chunk.type==='摘要') score+=1.5;
    if(chunk.item.priority==='必看') score+=1.2;
    return {...chunk,score}; }).filter(chunk=>chunk.score>0).sort((a,b)=>b.score-a.score);
  const selected=[]; const perItem=new Map(); const seenText=new Set();
  scored.forEach(chunk=>{const count=perItem.get(chunk.item.id)||0; const fingerprint=chunk.textHay.slice(0,42); if(count<3&&!seenText.has(fingerprint)){selected.push(chunk);perItem.set(chunk.item.id,count+1);seenText.add(fingerprint);}});
  return selected.slice(0,8).map(chunk=>({...chunk,intent}));
}
function schoolFactAnswer(question) {
  const normalized=ragNormalize(question); const item=guideItems.find(entry=>entry.id==='heu-basics'); if(!item) return null;
  const facts=[];
  if(normalized.includes('校训')) facts.push(item.content[1]);
  if(normalized.includes('哈军工')||normalized.includes('军工精神')) facts.push(item.content[2]);
  if(normalized.includes('成立')||normalized.includes('哪年')||normalized.includes('建校')||normalized.includes('历史')||normalized.includes('校史')) facts.push(item.content[0]);
  if(normalized.includes('学科')||normalized.includes('专业实力')||normalized.includes('优势学科')||normalized.includes('三海一核')) facts.push(item.content[3],item.content[4]);
  if(!facts.length) return null;
  return {html:`关于哈工程，这几条可以先记住：<ul>${facts.map(fact=>`<li>${escapeHtml(fact)}</li>`).join('')}</ul><em>这是一份面向新生的基础介绍，表述以学校官网最新信息为准。</em>`,hits:[{item,score:100}]};
}
function hasSpecificQuestionAnchor(question) {
  const normalized=ragNormalize(question); const anchors=['报到','材料','路线','机场','火车站','选课','培养方案','校园卡','饭卡','一卡通','餐卡','澡卡','校园码','充值','余额','挂失','补卡','电费','校园网','无线','wifi','网费','宿舍','寝室','独卫','四人寝','四人间','上床下桌','阳台','查寝','洗澡','洗浴','浴池','澡堂','快递','包裹','取件','驿站','社团','诈骗','哈军工','校训','学科','赞噢','集市','吃饭','食堂','餐厅','大美','小美','至美','快乐食间','小公交','校车','校园巴士','巴士','摆渡车','接驳车','购物','超市','启航','北体育场','北体','剪头','理发','修手机','水果','外卖','外送','取餐','打印','复印','21b','教材','课本','二手书','图书馆','借书','借阅'];
  return anchors.some(anchor=>normalized.includes(ragNormalize(anchor)));
}
function otherSchoolFallback(question) {
  if(!/(哈工大|哈尔滨工业大学)/.test(question)) return null;
  return {html:'这里是面向哈尔滨工程大学新生的助手，无法可靠回答哈尔滨工业大学的校情问题。建议查看对方学校官网或官方招生渠道，避免把两所学校的信息混在一起。',hits:[]};
}
function guidanceFallback(question) {
  const market=guideItems.find(item=>item.id==='zanou-campus-market'); const sensitive=/(缴费|学费|账号|密码|验证码|政策|处分|录取|学籍|成绩|考试|报到)/.test(question);
  const official=sensitive?'这类事项还涉及正式规则，请同时核对学校官网、迎新系统、学院通知或咨询辅导员。':'如果帖子里的回答不一致，再回到学校官方渠道核验。';
  return {html:`这个问题可能需要更多现场经验或具体背景。你可以先到“赞噢校园集市”搜索关键词，没有合适答案时再发帖，把年级、地点和具体需求写清楚，通常更容易得到学长学姐的有效回复。<em>${official}</em>`,hits:market?[{item:market,score:1}]:[]};
}
function answer(question) {
  const otherSchoolAnswer=otherSchoolFallback(question); if(otherSchoolAnswer) return otherSchoolAnswer;
  const schoolAnswer=schoolFactAnswer(question); if(schoolAnswer) return schoolAnswer;
  const chunks=retrieve(question); if(!hasSpecificQuestionAnchor(question)||!chunks.length||chunks[0].score<12) return guidanceFallback(question);
  const topScore=chunks[0].score; const confidence=topScore>=45?'高':topScore>=24?'中':'待确认';
  const docs=[]; const seenDocs=new Set(); chunks.forEach(chunk=>{if(!seenDocs.has(chunk.item.id)){docs.push(chunk.item);seenDocs.add(chunk.item.id);}});
  const evidenceChunks=chunks.filter((chunk,index)=>index===0||chunk.score>=Math.max(10,chunks[0].score*.25)).slice(0,6); const evidence=evidenceChunks.map(chunk=>`<li><b>${escapeHtml(chunk.item.title)}｜${escapeHtml(chunk.type)}</b>：${escapeHtml(chunk.text)}</li>`).join('');
  const evidenceDocs=[...new Set(evidenceChunks.map(chunk=>chunk.item.id))]; const citedDocs=docs.filter(item=>evidenceDocs.includes(item.id));
  const downloads=citedDocs.filter(item=>item.download).map(item=>`<a class="chat-download" href="${item.download.href}" download>↓ ${item.download.label}（${item.download.size}）</a>`).join('');
  const status=[...new Set(citedDocs.map(item=>item.verified))].join('；');
  const sourceList=citedDocs.slice(0,3).map(item=>`“${escapeHtml(item.title)}”`).join('、');
  const intentLabel=chunks[0].intent?.label || '综合检索';
  return {html:`我按“${intentLabel}”理解你的问题，并从 ${sourceList} 中检索到这些依据：<ul>${evidence}</ul>${downloads}<em>检索置信度：${confidence}。信息状态：${escapeHtml(status)}。涉及账号、支付、日期、路线和管理政策时，请以学校最新通知及现场标识为准。</em>`,hits:citedDocs.map(item=>({item,score:chunks.filter(chunk=>chunk.item.id===item.id).reduce((sum,chunk)=>sum+chunk.score,0)}))};
}
function saveQuestionStat(question) { try { const key='heu-rag-question-stats'; const stats=JSON.parse(localStorage.getItem(key)||'{}'); const normalized=ragNormalize(question).slice(0,40); if(normalized) stats[normalized]=(stats[normalized]||0)+1; localStorage.setItem(key,JSON.stringify(stats)); } catch (_) {} }
function renderPopularQuestions() { try { const stats=JSON.parse(localStorage.getItem('heu-rag-question-stats')||'{}'); const entries=Object.entries(stats).sort((a,b)=>b[1]-a[1]).slice(0,3); const target=document.querySelector('#popular-questions'); if(target) target.innerHTML=entries.length?entries.map(([question,count])=>`<button data-popular-question="${escapeHtml(question)}">${escapeHtml(question)} <small>${count} 次</small></button>`).join(''):'提问后会在本机匿名汇总，帮助后续补充知识库'; target?.querySelectorAll('[data-popular-question]').forEach(button=>button.addEventListener('click',()=>submitQuestion(button.dataset.popularQuestion))); } catch (_) {} }
function submitQuestion(q) {
  if(!q.trim()) return; saveQuestionStat(q); renderPopularQuestions(); const box=document.querySelector('#messages'); box.insertAdjacentHTML('beforeend',`<div class="message user-msg"><div>${escapeHtml(q)}</div></div><div class="typing"><i></i><i></i><i></i></div>`); box.scrollTop=box.scrollHeight;
  setTimeout(()=>{document.querySelector('.typing')?.remove(); const res=answer(q); box.insertAdjacentHTML('beforeend',`<div class="message bot-msg"><span class="bot">H</span><div>${res.html}${res.hits.length?`<div class="refs"><small>参考条目 · 可打开全文</small>${res.hits.map((h,i)=>`<button data-open="${h.item.id}">[${i+1}] ${h.item.title}</button>`).join('')}</div>`:''}</div></div>`); box.querySelectorAll('[data-open]').forEach(button=>button.onclick=()=>openGuide(button.dataset.open)); box.scrollTop=box.scrollHeight;},420);
}
renderGuides();
renderPopularQuestions();
export { retrieve, answer };
renderMaps();
