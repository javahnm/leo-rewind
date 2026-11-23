// ---------- Leo, the black cat: drawn from simple shapes, one scene per card ----------
const CAT='#111115', RIM='rgba(255,255,255,.3)', EYE='#f2d64b', COL='#ff6b35', TAG='#f4f4f4';
const SW=`stroke="${RIM}" stroke-width="1.2"`;
const eyesOpen=(l,r,y,glow)=>`<g class="eyes">${glow?`<circle cx="${l}" cy="${y}" r="11" fill="${EYE}" opacity=".2"/><circle cx="${r}" cy="${y}" r="11" fill="${EYE}" opacity=".2"/>`:''}<ellipse cx="${l}" cy="${y}" rx="6" ry="7" fill="${EYE}"/><ellipse cx="${r}" cy="${y}" rx="6" ry="7" fill="${EYE}"/><ellipse cx="${l}" cy="${y}" rx="1.8" ry="5.4" fill="#000"/><ellipse cx="${r}" cy="${y}" rx="1.8" ry="5.4" fill="#000"/></g>`;
const eyesShut=(l,r,y)=>`<g fill="none" stroke="rgba(255,255,255,.6)" stroke-width="2" stroke-linecap="round"><path d="M${l-6} ${y} q6 4 12 0"/><path d="M${r-6} ${y} q6 4 12 0"/></g>`;
function head(o={}){ // centre (60,58), r 26
  return `<polygon points="36,48 38,20 57,37" fill="${CAT}" ${SW} stroke-linejoin="round"/><polygon points="84,48 82,20 63,37" fill="${CAT}" ${SW} stroke-linejoin="round"/>
  <polygon points="41,41 42,28 51,37" fill="#5a3344"/><polygon points="79,41 78,28 69,37" fill="#5a3344"/>
  <circle cx="60" cy="58" r="26" fill="${CAT}" ${SW}/>${o.closed?eyesShut(50,70,58):eyesOpen(50,70,57,o.glow)}
  <path d="M57 66 h6 l-3 3.5z" fill="#7a4a5a"/>
  <g stroke="rgba(255,255,255,.35)" stroke-width="1" stroke-linecap="round"><line x1="40" y1="66" x2="22" y2="63"/><line x1="40" y1="70" x2="23" y2="72"/><line x1="80" y1="66" x2="98" y2="63"/><line x1="80" y1="70" x2="97" y2="72"/></g>
  ${o.yawn?`<ellipse class="yawn" cx="60" cy="75" rx="4.5" ry="5.5" fill="#6a2236"/>`:''}`;
}
function front(o={}){ // sitting, facing you. box 0 0 120 142
  return `<g class="tail-f"><path d="M82 130 C 114 130, 118 94, 102 82" fill="none" stroke="${CAT}" stroke-width="9" stroke-linecap="round"/></g>
  <ellipse cx="60" cy="106" rx="30" ry="32" fill="${CAT}" ${SW}/><ellipse cx="49" cy="136" rx="9" ry="6" fill="${CAT}" ${SW}/>
  ${o.wave?`<g class="wave"><path d="M80 104 L95 70" stroke="${RIM}" stroke-width="15.5" stroke-linecap="round"/><path d="M80 104 L95 70" stroke="${CAT}" stroke-width="13" stroke-linecap="round"/><circle cx="96" cy="66" r="8.5" fill="${CAT}" ${SW}/></g>`:`<ellipse cx="71" cy="136" rx="9" ry="6" fill="${CAT}" ${SW}/>`}
  <g>${head(o)}</g>
  <rect x="42" y="83" width="36" height="5" rx="2.5" fill="${COL}"/><circle cx="60" cy="92" r="5" fill="${TAG}" stroke="#8a9199" stroke-width="1"/>`;
}
function sideHead(o){ return `<polygon points="108,26 111,6 121,20" fill="${CAT}" ${SW} stroke-linejoin="round"/><polygon points="122,20 131,6 135,26" fill="${CAT}" ${SW} stroke-linejoin="round"/>
  <circle cx="121" cy="34" r="17" fill="${CAT}" ${SW}/>
  ${o.closed?`<path d="M124 33 q4 3 8 0" fill="none" stroke="rgba(255,255,255,.6)" stroke-width="1.8" stroke-linecap="round"/>`:`<g class="eyes"><ellipse cx="128" cy="32" rx="3.6" ry="4.4" fill="${EYE}"/><ellipse cx="128.8" cy="32" rx="1.1" ry="3.6" fill="#000"/></g>`}
  <path d="M136 37 l3 1.6 -3 1.6z" fill="#7a4a5a"/><g stroke="rgba(255,255,255,.35)" stroke-width="1"><line x1="132" y1="41" x2="148" y2="39"/><line x1="132" y1="43" x2="147" y2="46"/></g>`; }
function side(o={}){ // walking right. box 0 0 160 86, feet at y 84
  const gait=o.run?'run':o.still?'still':'walk';
  const leg=(c,x)=>`<rect class="leg ${c}" x="${x}" y="54" width="9" height="30" rx="4.5" fill="${CAT}"/>`;
  return `<g class="${gait}"><g class="tail-s"><path d="M32 46 C 14 40, 10 22, 18 10" fill="none" stroke="${CAT}" stroke-width="8" stroke-linecap="round"/></g>
  ${leg('la',38)}${leg('lb',51)}${leg('lb',90)}${leg('la',103)}
  <ellipse cx="72" cy="52" rx="42" ry="18" fill="${CAT}" ${SW}/>
  <rect x="103" y="40" width="6" height="18" rx="3" fill="${COL}" transform="rotate(-25 106 49)"/><circle cx="109" cy="59" r="3.8" fill="${TAG}" stroke="#8a9199" stroke-width="1"/>
  ${o.down?`<g class="nod"><g transform="translate(4 26)">${sideHead(o)}</g></g>`:`<g class="bob">${sideHead(o)}</g>`}
  ${o.brief?`<g class="case"><line x1="137" y1="42" x2="137" y2="58" stroke="#2a2a2a" stroke-width="2"/><rect x="125" y="58" width="25" height="17" rx="2.5" fill="#8a5a2b" stroke="#5a3a1a" stroke-width="1.2"/><path d="M133 58 v-3 h9 v3" fill="none" stroke="#5a3a1a" stroke-width="2"/></g>`:''}</g>`;
}
const at=(x,y,s,inner)=>`<g transform="translate(${x} ${y}) scale(${s})">${inner}</g>`;
const ground=(y,w=400,op=.22)=>`<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity="${op}"/>`;
const SCENES={
  peek:()=>[`0 0 120 100`,`<g class="peek">${at(0,18,1,head({}))}<ellipse cx="40" cy="99" rx="11" ry="8" fill="${CAT}" ${SW}/><ellipse cx="80" cy="99" rx="11" ry="8" fill="${CAT}" ${SW}/></g>`],
  stroll:()=>[`0 0 400 96`,`${ground(92)}<g class="mover" style="--dur:11s">${at(0,20,.85,side())}</g>`],
  dash:()=>[`0 0 400 96`,`${ground(92)}<g class="mover" style="--dur:3.2s">${at(0,20,.85,side({run:true}))}</g><g class="mover" style="--dur:3.2s;animation-delay:-1.6s">${at(0,20,.85,side({run:true}))}</g>`],
  sunrise:()=>[`0 0 240 150`,`<g class="sun"><circle cx="190" cy="78" r="34" fill="#ffe27a"/></g>${ground(146,240,.3)}${at(30,4,1,front({yawn:true}))}`],
  away:()=>[`0 0 400 104`,`${ground(100)}<path d="M18 84 h50 l-7 15 h-36z" fill="currentColor" opacity=".8"/><text x="43" y="76" text-anchor="middle" font-size="11" fill="currentColor" opacity=".7" font-family="JetBrains Mono, monospace">empty</text><g class="mover" style="--dur:7s;--from:70px">${at(0,28,.85,side())}</g>`],
  eat:()=>[`0 0 230 112`,`${ground(108,230)}${at(10,24,1,side({still:true,down:true}))}<path d="M130 94 h46 l-6 14 h-34z" fill="${COL}"/><g fill="#8a5a2b"><circle cx="142" cy="93" r="3"/><circle cx="150" cy="91" r="3"/><circle cx="160" cy="93" r="3"/></g>`],
  tea:()=>[`0 0 240 150`,`${at(20,4,1,front())}<g class="steam" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".55"><path d="M168 100 q-6 -8 0 -16 q6 -8 0 -16"/><path d="M184 100 q-6 -8 0 -16 q6 -8 0 -16" style="animation-delay:-1s"/></g><path d="M156 108 h44 v12 a22 18 0 0 1 -44 0z" fill="#fff"/><path d="M199 112 q16 3 0 16" fill="none" stroke="#fff" stroke-width="4"/><ellipse cx="178" cy="144" rx="34" ry="4.5" fill="#fff"/>`],
  hike:()=>[`0 0 400 124`,`<g class="hills" style="--dur:9s;--step:-400px"><path d="M0 124 V96 Q100 40 200 96 T400 96 T600 96 T800 96 V124Z" fill="rgba(32,196,172,.28)"/></g><g class="hills" style="--dur:4s;--step:-200px"><path d="M0 124 V108 Q50 84 100 108 T200 108 T300 108 T400 108 T500 108 T600 108 V124Z" fill="rgba(32,196,172,.5)"/></g>${at(130,40,.85,side())}`],
  door:()=>[`0 0 400 100`,`${ground(96)}<rect x="176" y="8" width="52" height="88" rx="3" fill="none" stroke="currentColor" stroke-width="4" opacity=".75"/><rect x="180" y="12" width="44" height="84" fill="currentColor" opacity=".12"/><g class="mover" style="--dur:2.6s">${at(0,24,.85,side({run:true}))}</g>`],
  moon:()=>[`0 0 220 170`,`<g fill="#f5e9b8"><circle class="star" cx="20" cy="20" r="2"/><circle class="star" cx="196" cy="40" r="1.6" style="animation-delay:-1s"/><circle class="star" cx="170" cy="12" r="1.4" style="animation-delay:-2s"/></g><rect x="0" y="148" width="220" height="10" rx="2" fill="#2a3152"/><g fill="#2a3152"><rect x="14" y="120" width="8" height="50"/><rect x="198" y="120" width="8" height="50"/></g>${at(50,8,1,front({glow:true}))}`],
  chair:()=>[`0 0 180 150`,`<rect x="134" y="20" width="12" height="78" rx="3" fill="#8a5632"/><rect x="20" y="92" width="132" height="12" rx="3" fill="#a0683c"/><rect x="28" y="104" width="8" height="44" rx="2" fill="#8a5632"/><rect x="134" y="104" width="8" height="44" rx="2" fill="#8a5632"/>
     <g class="dangle"><path d="M112 90 C 120 104, 112 122, 120 140" fill="none" stroke="${CAT}" stroke-width="7" stroke-linecap="round"/></g>
     <ellipse cx="84" cy="76" rx="42" ry="18" fill="${CAT}" ${SW}/><ellipse cx="58" cy="91" rx="10" ry="4.5" fill="${CAT}" ${SW}/>
     <rect x="54" y="66" width="4" height="16" rx="2" fill="${COL}" transform="rotate(-20 56 74)"/>${at(46,64,.62,`<g transform="translate(-60 -58)">${head({closed:true})}</g>`)}`],
  sleep:()=>[`0 0 190 124`,`<path d="M32 82 C 26 112, 108 116, 132 96" fill="none" stroke="${CAT}" stroke-width="11" stroke-linecap="round"/><g class="breathe"><ellipse cx="82" cy="72" rx="52" ry="30" fill="${CAT}" ${SW}/></g>${at(124,68,.7,`<g transform="translate(-60 -58)">${head({closed:true})}</g>`)}
     <g fill="currentColor" font-family="Bricolage Grotesque, sans-serif" font-weight="800"><text class="z" x="150" y="40" font-size="16">z</text><text class="z" x="160" y="30" font-size="20" style="animation-delay:-1s">z</text><text class="z" x="172" y="18" font-size="24" style="animation-delay:-2s">z</text></g>`],
  twins:()=>[`0 0 280 146`,`<g class="ghost">${at(10,2,1,front())}</g><g class="fresh">${at(150,2,1,front())}</g>`],
  tiny:()=>[`0 0 400 56`,`<g class="mover" style="--dur:12s">${at(0,8,.55,side())}</g>`],
  commute:()=>[`0 0 400 100`,`${ground(96)}<g class="mover" style="--dur:8s">${at(0,24,.85,side({brief:true}))}</g>`],
  wave:()=>[`0 0 130 145`,front({wave:true})],
};
function drawCats(){
  document.querySelectorAll('[data-scene]').forEach(el=>{const [vb,inner]=SCENES[el.dataset.scene]();
    el.innerHTML=`<svg viewBox="${vb}" aria-hidden="true" overflow="visible">${inner}</svg>`;});
  const clk=document.getElementById('clock'); if(!clk) return;
  const g=document.createElementNS('http://www.w3.org/2000/svg','g');
  g.innerHTML=`<line x1="0" y1="0" x2="0" y2="-70" stroke="${COL}" stroke-width="3" stroke-linecap="round">${reduce?'':'<animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="12s" repeatCount="indefinite"/>'}</line>${at(-27,-36,.45,front())}`;
  clk.appendChild(g);
}
drawCats();
