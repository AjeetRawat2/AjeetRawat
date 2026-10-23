const body=document.body;
const root=document.documentElement;
const finePointer=matchMedia('(pointer:fine)').matches;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
const main=document.querySelector('main');
const hero=main.querySelector('.hero');
const ticker=main.querySelector('.ticker');
const workSection=main.querySelector('#work');
const about=main.querySelector('#about');
const experience=main.querySelector('#experience');
const footer=main.querySelector('footer');
const projectTitle=workSection.querySelector('.section-top');
const projects=[...workSection.querySelectorAll('.project')];
const moreProjects=workSection.querySelector('.other-projects');
const aboutCopy=about.querySelector('.about-left');
const toolkit=about.querySelector('.skills-panel');
toolkit.querySelectorAll('.skill-group > div').forEach(group=>{
  const chips=group.textContent.split('·').map(text=>text.trim()).filter(Boolean).map(text=>{const chip=document.createElement('span');chip.className='skill-chip';chip.textContent=text;return chip});
  group.replaceChildren(...chips);
});
const experienceTitle=experience.querySelector('.section-top');
const timeline=experience.querySelector('.timeline');
const certificates=experience.querySelector('.certs');

const scenes=[
  {id:'top',label:'INTRODUCTION',caption:'Curiosity becomes a direction.',nodes:[hero],nav:null},
  {id:'work',label:'SELECTED WORK',caption:'A few ideas worth exploring.',nodes:[projectTitle],nav:'work'},
  {id:'triage',label:'MACHINE LEARNING',caption:'Turn a crowded hackathon into a clear signal.',nodes:[projects[0]]},
  {id:'inspector',label:'NLP · FULL STACK',caption:'Look closer. Find the evidence.',nodes:[projects[1]]},
  {id:'vibecheck',label:'DEVELOPER SECURITY',caption:'Build tools developers can trust.',nodes:[projects[2],moreProjects]},
  {id:'about',label:'A LITTLE ABOUT ME',caption:'Stay curious. Keep iterating.',nodes:[aboutCopy],nav:'about'},
  {id:'toolkit',label:'TOOLKIT & EDUCATION',caption:'A toolkit shaped by real projects.',nodes:[toolkit]},
  {id:'experience',label:'EXPERIENCE & LEARNING',caption:'Every step adds a capability.',nodes:[experienceTitle,timeline,certificates,footer],nav:'experience'}
];
const track=document.createElement('div');track.className='story-track';track.id='story-track';
const stage=document.createElement('div');stage.className='story-stage';
stage.innerHTML='<canvas class="particle-canvas" aria-hidden="true"></canvas><div class="story-vignette"></div><div class="story-grain"></div><div class="story-layers"></div><div class="story-topline"><span class="story-system"><i></i> AJ / FIELD NOTES</span><span class="story-counter">01 <b>/ 08</b></span></div><div class="story-caption"><span class="caption-kicker">SCROLL TO EXPLORE</span><strong class="caption-line"></strong></div><div class="story-rail"><i></i></div><div class="story-cursor" aria-hidden="true"></div>';
const layer=stage.querySelector('.story-layers');
scenes.forEach((scene,index)=>{
  const panel=document.createElement('section');
  panel.className='story-scene';panel.id=scene.id;panel.dataset.index=String(index);
  const content=document.createElement('div');content.className='scene-content';
  if(scene.nodes.some(node=>node?.classList?.contains('project'))){
    const grid=document.createElement('div');grid.className='scene-projects';
    scene.nodes.filter(node=>node?.classList?.contains('project')).forEach(node=>grid.append(node));
    content.append(grid);
  }
  scene.nodes.filter(node=>node&&!node.classList?.contains('project')).forEach(node=>content.append(node));
  panel._revealItems=[...content.querySelectorAll('.eyebrow,.hero h1,.intro,.actions,.quick-contact,.hero-meta,.section-top .eyebrow,.section-top h2,.section-top>p,.project-type,.project h3,.project-body>p,.project .tags,.project-link,.about-left h2,.about-copy,.text-link,.personal-details,.skills-heading,.skill-group,.school,.timeline article,.certs,footer,.other-heading,.other-projects>a')];
  panel.append(content);layer.append(panel);
});
const steps=document.createElement('div');steps.className='story-steps';steps.setAttribute('aria-hidden','true');
scenes.forEach(()=>{const step=document.createElement('div');step.className='story-step';steps.append(step)});
main.replaceChildren(track);track.append(stage,steps);
const canvas=stage.querySelector('.particle-canvas');
const cursor=stage.querySelector('.story-cursor');
const ctx=canvas.getContext('2d',{alpha:true});
const panels=[...layer.children],line=stage.querySelector('.caption-line'),counter=stage.querySelector('.story-counter'),rail=stage.querySelector('.story-rail i');
let active=-1,storyPosition=0,raf=0,particleRaf=0,particleFrameTime=0,width=0,height=0,dpr=1;
const pointer={x:-1000,y:-1000};
const trail=[];
const bursts=[];
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
const particles=Array.from({length:300},(_,i)=>({x:Math.random(),y:Math.random(),seed:i,r:.7+Math.random()*1.3}));
function resizeCanvas(){
  const rect=stage.getBoundingClientRect();width=rect.width;height=rect.height;dpr=Math.min(devicePixelRatio||1,1.6);
  canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);canvas.style.width=width+'px';canvas.style.height=height+'px';
  ctx.setTransform(dpr,0,0,dpr,0,0);scheduleParticles();
}
function targetPoint(scene,index){
  const u=index/particles.length,noise=Math.sin(index*19.17+scene*11.3)*.009;
  if(scene===0){const ring=index%5,r=.12+ring*.045+noise,a=u*Math.PI*22;return [.5+Math.cos(a)*r,.48+Math.sin(a)*r*.82]}
  if(scene===1){const wave=u*Math.PI*16;return [.14+u*.72,.5+Math.sin(wave)*.14]}
  if(scene===2){const col=Math.floor(u*10),t=(u*10)%1,h=[.22,.32,.25,.44,.38,.57,.43,.65,.53,.73][col];return [.18+col*.071,.79-t*h]}
  if(scene===3){if(u<.72){const a=u/.72*Math.PI*2;return [.43+Math.cos(a)*(.19+noise),.47+Math.sin(a)*(.19+noise)]}const t=(u-.72)/.28;return [.57+t*.2,.61+t*.22]}
  if(scene===4){if(u<.58){const e=Math.floor(u/.58*8),t=(u/.58*8)%1,p=[[.5,.2],[.7,.29],[.68,.5],[.62,.68],[.5,.8],[.38,.68],[.32,.5],[.3,.29]],a=p[e],b=p[(e+1)%8];return [a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t]}const t=(u-.58)/.42;return [.39+(t*9%1)*.22,.34+Math.floor(t*9)*.045]}
  if(scene===5){if(u<.3){const a=u/.3*Math.PI*2;return [.5+Math.cos(a)*.12,.32+Math.sin(a)*.12]}const t=(u-.3)/.7;return [.5+Math.sin(t*Math.PI*2)*(.12+.16*t),.55+t*.25]}
  if(scene===6){const col=index%6,row=Math.floor(index/6)%10;return [.31+col*.076,.24+row*.052+Math.sin(col+row)*.007]}
  const t=u;return [.35+Math.sin(t*Math.PI*2)*.25,.24+t*.5];
}
const particleTargets=scenes.map((_,scene)=>particles.map((_,index)=>targetPoint(scene,index)));function drawParticles(now=performance.now()){
  particleRaf=0;if(!ctx)return;
  const dt=particleFrameTime?Math.min(50,now-particleFrameTime):16.7;particleFrameTime=now;
  const follow=1-Math.exp(-dt/125);let particlesMoving=false;
  particleRaf=0;if(!ctx)return;
  ctx.clearRect(0,0,width,height);
  const current=Math.floor(storyPosition),blend=storyPosition-current;
  const points=particles.map((p,i)=>{
    const a=particleTargets[current][i],b=particleTargets[Math.min(scenes.length-1,current+1)][i];
    const tx=(a[0]+(b[0]-a[0])*blend)*width,ty=(a[1]+(b[1]-a[1])*blend)*height;
    const mx=tx-p.x,my=ty-p.y;if(Math.abs(mx)+Math.abs(my)>.45)particlesMoving=true;
    const ease=reducedMotion?1:follow;p.x+=mx*ease;p.y+=my*ease;
    const dx=p.x-pointer.x,dy=p.y-pointer.y,d=Math.hypot(dx,dy);
    if(!reducedMotion&&d<130&&d>0){p.x+=dx/d*(130-d)*.025;p.y+=dy/d*(130-d)*.025;particlesMoving=true}
    return p;
  });
  const cellSize=54,grid=new Map();
  points.forEach((point,index)=>{const gx=Math.floor(point.x/cellSize),gy=Math.floor(point.y/cellSize),key=gx+','+gy;let cell=grid.get(key);if(!cell)grid.set(key,cell=[]);cell.push(index)});
  const linePaths=[new Path2D(),new Path2D(),new Path2D(),new Path2D()];
  for(let i=0;i<points.length;i++){
    const a=points[i],gx=Math.floor(a.x/cellSize),gy=Math.floor(a.y/cellSize);
    for(let ox=-1;ox<=1;ox++)for(let oy=-1;oy<=1;oy++){
      const cell=grid.get((gx+ox)+','+(gy+oy));if(!cell)continue;
      for(const j of cell){if(j<=i)continue;const b=points[j],dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy;if(d2<cellSize*cellSize){const bucket=Math.min(3,Math.floor((1-Math.sqrt(d2)/cellSize)*4));linePaths[bucket].moveTo(a.x,a.y);linePaths[bucket].lineTo(b.x,b.y)}}
    }
  }
  ctx.lineWidth=.65;
  for(let bucket=0;bucket<linePaths.length;bucket++){ctx.strokeStyle='rgba(116,213,235,'+((bucket+1)*.042)+')';ctx.stroke(linePaths[bucket])}
  points.forEach((p,i)=>{ctx.beginPath();ctx.arc(p.x,p.y,p.r*(i%15===0?1.8:1),0,Math.PI*2);ctx.fillStyle=i%7===0?'rgba(191,163,255,.9)':'rgba(144,226,239,.82)';ctx.shadowColor='rgba(116,213,235,.55)';ctx.shadowBlur=i%15===0?10:3;ctx.fill()});
  ctx.shadowBlur=0;
  if(pointer.x>-500){const light=ctx.createRadialGradient(pointer.x,pointer.y,0,pointer.x,pointer.y,180);light.addColorStop(0,'rgba(86,200,255,.16)');light.addColorStop(1,'rgba(86,200,255,0)');ctx.fillStyle=light;ctx.fillRect(pointer.x-180,pointer.y-180,360,360)}

  for(let i=trail.length-1;i>=0;i--){const p=trail[i],age=(now-p.t)/460;if(age>1){trail.splice(i,1);continue}if(i>0){const q=trail[i-1];ctx.beginPath();ctx.moveTo(q.x,q.y);ctx.lineTo(p.x,p.y);ctx.strokeStyle='rgba(139,231,255,'+((1-age)*.48)+')';ctx.lineWidth=(1-age)*4;ctx.shadowBlur=12;ctx.shadowColor='rgba(97,223,255,.8)';ctx.stroke()}}
  ctx.shadowBlur=0;
  for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.x+=b.vx;b.y+=b.vy;b.vx*=.97;b.vy*=.97;b.life-=.025;if(b.life<=0){bursts.splice(i,1);continue}ctx.beginPath();ctx.arc(b.x,b.y,b.size*b.life,0,Math.PI*2);ctx.fillStyle='rgba(180,242,255,'+(b.life*.8)+')';ctx.fill()}
  if(!reducedMotion&&(particlesMoving||trail.length||bursts.length))particleRaf=requestAnimationFrame(drawParticles);else particleFrameTime=0;
}
function scheduleParticles(){if(!particleRaf)particleRaf=requestAnimationFrame(drawParticles)}
function burstAt(x,y){if(reducedMotion)return;for(let i=0;i<15;i++){const a=Math.random()*Math.PI*2,v=1.2+Math.random()*3;bursts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,size:1+Math.random()*2})}scheduleParticles()}
function renderStory(){
  raf=0;
  const travel=Math.max(1,track.offsetHeight-stage.offsetHeight);
  const progress=clamp(scrollY/travel,0,1),position=progress*(panels.length-1),nearest=Math.round(position);
  storyPosition=position;
  panels.forEach((panel,index)=>{
    const offset=position-index;
    let opacity=0,local=0;
    if(index===panels.length-1){
      if(offset>=0){opacity=1;local=1}
      else if(offset>-.5){opacity=(offset+.5)/.5;local=opacity}
    }else if(offset>=0&&offset<.82){opacity=1;local=clamp(offset/.82,0,1)}
    else if(offset>=.82&&offset<1){opacity=1-(offset-.82)/.18;local=1}
    else if(offset<0&&offset>-.18){opacity=1+offset/.18;local=0}
    const visible=opacity>.002;
    panel.style.setProperty('--scene-opacity',opacity.toFixed(4));
    panel.style.setProperty('--scene-y',(offset<0?(1-opacity)*18:(1-opacity)*-18)+'px');
    panel.style.setProperty('--scene-blur','0px');
    panel.classList.toggle('is-active',visible);panel.inert=opacity<.96;
    const items=panel._revealItems||[],count=Math.max(1,items.length);
    if((index===panels.length-1?offset>-.5:offset>-.18)&&offset<1){items.forEach((item,step)=>{
      const reveal=clamp(local*count-step,0,1);
      item.style.setProperty('--reveal',reveal.toFixed(3));
      item.style.setProperty('--reveal-y',((1-reveal)*12)+'px');
    });}
  });
  stage.style.setProperty('--story-progress',progress.toFixed(4));
  rail.style.transform='scaleX('+progress+')';scheduleParticles();
  if(nearest!==active){
    active=nearest;stage.dataset.scene=String(active);
    counter.innerHTML=String(active+1).padStart(2,'0')+' <b>/ '+String(panels.length).padStart(2,'0')+'</b>';
    line.classList.remove('caption-enter');void line.offsetWidth;line.textContent=scenes[active].caption;line.classList.add('caption-enter');
  }
}function scheduleStory(){if(!raf)raf=requestAnimationFrame(renderStory)}
function goToScene(index){
  const travel=Math.max(1,track.offsetHeight-stage.offsetHeight);
  scrollTo({top:travel*index/(panels.length-1),behavior:reducedMotion?'auto':'smooth'});
}
resizeCanvas();main.replaceChildren(track);track.append(stage,steps);resizeCanvas();scheduleStory();
addEventListener('resize',()=>{resizeCanvas();scheduleStory()},{passive:true});
addEventListener('scroll',scheduleStory,{passive:true});
addEventListener('pointermove',event=>{pointer.x=event.clientX;pointer.y=event.clientY;if(cursor){cursor.style.transform='translate3d('+event.clientX+'px,'+event.clientY+'px,0) translate(-50%,-50%)';cursor.classList.add('visible')}trail.push({x:event.clientX,y:event.clientY,t:performance.now()});if(trail.length>26)trail.shift();scheduleParticles()},{passive:true});
addEventListener('pointerleave',()=>{pointer.x=-1000;pointer.y=-1000;cursor?.classList.remove('visible')});
document.querySelectorAll('.nav a[href^="#"],.button[href^="#"]').forEach(link=>link.addEventListener('click',event=>{const id=link.getAttribute('href').slice(1),index=scenes.findIndex(scene=>scene.id===id||scene.nav===id);if(index<0)return;event.preventDefault();goToScene(index)}));
document.querySelectorAll('.project').forEach(card=>{
  if(!finePointer)return;
  card.addEventListener('pointermove',event=>{const r=card.getBoundingClientRect(),x=(event.clientX-r.left)/r.width-.5,y=(event.clientY-r.top)/r.height-.5;card.style.setProperty('--rx',(-y*2.5)+'deg');card.style.setProperty('--ry',(x*3)+'deg')});
  card.addEventListener('pointerleave',()=>{card.style.setProperty('--rx','0deg');card.style.setProperty('--ry','0deg')});
});document.querySelectorAll('a,button').forEach(element=>{
  element.addEventListener('pointerenter',()=>{const r=element.getBoundingClientRect();burstAt(r.left+r.width/2,r.top+r.height/2)},{passive:true});
});
const themeButton=document.querySelector('.theme-toggle'),themeIcon=themeButton?.querySelector('.theme-icon'),themeWord=themeButton?.querySelector('.theme-word');
function setTheme(theme){root.dataset.theme=theme;const next=theme==='dark'?'light':'dark';if(themeIcon)themeIcon.textContent=next==='dark'?'☾':'☼';if(themeWord)themeWord.textContent=next.toUpperCase();themeButton?.setAttribute('aria-label','Switch to '+next+' mode');themeButton?.setAttribute('title','Switch to '+next+' mode')}
setTheme('dark');themeButton?.addEventListener('click',()=>{const next=root.dataset.theme==='dark'?'light':'dark';setTheme(next)});

const remiPanel=document.querySelector('#remi-chat'),remiBackdrop=document.querySelector('.remi-backdrop'),remiLauncher=document.querySelector('.remi-launch'),remiClose=document.querySelector('.remi-close'),remiForm=document.querySelector('.remi-form'),remiInput=document.querySelector('#remi-input'),remiMessages=document.querySelector('.remi-messages'),remiTyping=document.querySelector('.remi-typing');
function openRemi(){if(!remiPanel)return;remiPanel.hidden=false;remiBackdrop.hidden=false;remiLauncher?.setAttribute('aria-expanded','true');setTimeout(()=>remiInput?.focus(),80)}
function closeRemi(){if(!remiPanel)return;remiPanel.hidden=true;remiBackdrop.hidden=true;remiPanel.classList.remove('is-thinking');remiTyping.hidden=true;remiLauncher?.setAttribute('aria-expanded','false');remiLauncher?.focus()}
remiLauncher?.addEventListener('click',openRemi);remiClose?.addEventListener('click',closeRemi);remiBackdrop?.addEventListener('click',closeRemi);
addEventListener('keydown',event=>{if(event.key==='Escape'&&remiPanel&&!remiPanel.hidden)closeRemi()});
const remiAnswers=[
{keys:['tell me about ajeet','about ajeet','who is ajeet','introduce','about you','yourself','profile'],answer:'Ajeet Rawat is a Computer Science student at Starex University focused on AI/ML and UI/UX. He builds machine-learning applications, AI-assisted systems, web apps, and Figma prototypes, with strengths in Python, NLP, supervised learning, full-stack development, and user-centered design.'},
{keys:['projects','what has he built','what did he build','portfolio work','built'],answer:'Ajeet’s featured work includes a Hackathon ML Triage & AI Judging System, Fake News Inspector, and VibeCheck Backend. He has also built an AQI Checker, Django Tweet App, and portfolio website. Each project is linked from the work chapters.'},
{keys:['triage','hackathon','82','f1','judge co-pilot','organizer'],answer:'The Hackathon ML Triage & AI Judging System uses TF-IDF and Logistic Regression to classify abstracts into technical tracks. Its Groq API / LLaMA 3.1 judge co-pilot writes architecture summaries and award justifications, while GitHub commit-history checks flag activity that predates the hackathon. It achieved 82% weighted F1 on a held-out test set and reduced estimated organizer triage effort by about 80%. https://github.com/AjeetRawat2/TriageSystem'},
{keys:['fake news','inspector','credibility','news','claim','evidence'],answer:'Fake News Inspector extracts claims from news, retrieves supporting evidence, and produces credibility scores with a clear verdict. It combines AI/ML, NLP, JavaScript, and Node.js. https://github.com/AjeetRawat2/fakenews'},
{keys:['vibecheck','security','ast','osv','scanner','crawler','playwright'],answer:'VibeCheck Backend is a dual-engine microservice pairing a Babel AST static scanner with a dynamic DOM crawler using Playwright and Docker. It also includes OSV.dev vulnerability scanning. https://github.com/AjeetRawat2/VibeCheck-backend'},
{keys:['aqi','air quality'],answer:'AQI Checker is one of Ajeet’s additional projects, built with Flask and an API. https://github.com/AjeetRawat2/AQI-check'},
{keys:['tweet','django app'],answer:'Ajeet built a Django Tweet App using Django. https://github.com/AjeetRawat2/MyDjangoTweet'},
{keys:['portfolio website','older portfolio'],answer:'Ajeet has also built a portfolio website with HTML, CSS, and JavaScript. https://github.com/AjeetRawat2/MyPortfolio-web'},
{keys:['skill','technology','tech stack','programming','tools','know','proficien'],answer:'His toolkit includes Python, TypeScript, JavaScript, HTML, CSS; Node.js, Express, Django, Flask, and REST APIs; machine learning, supervised learning, NLP, feature engineering, model evaluation, AI/LLM integration, Scikit-learn, Pandas, NLTK, TF-IDF, and Logistic Regression. He has worked with Groq API, LLaMA 3.1, Babel AST, OSV.dev, Playwright, Docker, Git/GitHub, SQL, and PostgreSQL. His design and cloud skills include Figma, wireframing, prototyping, and cloud fundamentals.'},
{keys:['experience','intern','job','work history','yuva','nsk','sklz','designer'],answer:'Ajeet is a remote Logistics Data Analyst Intern with Yuva Intern by NSDC since September 9, 2026. Previously, he was a UI/UX Designer at SKLZ TECT LLP from July to August 2025, designing a complete website interface and an interactive Figma prototype.'},
{keys:['education','university','study','degree','college','starex'],answer:'Ajeet is pursuing a B.Tech in Computer Science at Starex University, from 2024 and ongoing.'},
{keys:['certification','certificate','oracle','azure','python palette'],answer:'Ajeet’s certifications are Oracle Cloud Infrastructure 2025: Foundation Associate; Python Palette: Visualizing Insight from SKLZ TECT LLP; and Azure Insights: Data and Cloud Foundation from SKLZ TECT LLP.'},
{keys:['contact','email','phone','reach','location','where'],answer:'Ajeet is based in Gurugram, Haryana. Email: rawatajeet287@gmail.com. Phone: +91 98686 31055.'},
{keys:['hobby','photography','instagram','soft skill','personal','outside'],answer:'Beyond technology, Ajeet lists problem solving, team collaboration, adaptability, photography, and editing. His photography Instagram is @wanders_in_pics.'},
{keys:['hi','hello','hey','good morning','good evening'],answer:'Hi there! I’m Remi, Ajeet’s resume assistant. Ask about his projects, skills, education, experience, certifications, or contact details.'}
];
function answerFor(question){const q=question.toLowerCase().replace(/[^a-z0-9@.+%\s-]/g,' ').replace(/\s+/g,' ').trim();const match=remiAnswers.find(item=>item.keys.some(key=>q.includes(key)));return match?.answer??'I can answer questions using Ajeet’s resume and portfolio. Try asking about his projects, technical skills, education, experience, certifications, or contact details.'}
function addMessage(text,role){const message=document.createElement('div');message.className='remi-message '+role;const label=document.createElement('span');label.className='message-label';label.textContent=role==='user'?'YOU':'REMI';if(role==='agent'){const time=document.createElement('small');time.textContent='JUST NOW';label.append(time)}const p=document.createElement('p');p.textContent=text;message.append(label,p);remiMessages.append(message);remiMessages.scrollTop=remiMessages.scrollHeight}
function sendRemi(question){const value=question.trim();if(!value||remiPanel.classList.contains('is-thinking'))return;addMessage(value,'user');remiInput.value='';remiPanel.classList.add('is-thinking');remiTyping.hidden=false;const answer=answerFor(value);setTimeout(()=>{remiPanel.classList.remove('is-thinking');remiTyping.hidden=true;addMessage(answer,'agent')},650+Math.min(value.length*5,550))}
remiForm?.addEventListener('submit',event=>{event.preventDefault();sendRemi(remiInput.value)});
document.querySelectorAll('.remi-suggestions button').forEach(button=>button.addEventListener('click',()=>sendRemi(button.textContent)));
scheduleStory();



