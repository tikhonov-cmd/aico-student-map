(()=>{'use strict';
const stages=[
 {id:'p1',team:'Где появятся инструкции и когда пройдёт общее знакомство с платформой.',code:'P1',name:'Старт курса',short:'Старт курса',time:'В начале курса',description:'Ты начинаешь учиться по обычной программе. Команда расскажет об исследовании и условиях участия.',actions:['Познакомься с экспериментом и платформой на главной странице.','Уточни, где будут появляться даты, инструкции и сообщения команды.'],note:'Точные сроки определяются календарём твоего курса.'},
 {id:'p2',team:'Ссылку на анкету и срок её заполнения. Если уже заполнил её, повторять не нужно.',code:'P2',name:'Сбор исходных данных',short:'Исходные данные',time:'До выдачи доступа к платформе',description:'Перед началом работы с компаньоном команда собирает сведения о твоём учебном опыте. Они помогут учесть различия между участниками при сравнении результатов.',actions:['Заполни анкеты о мотивации, самоорганизации в учёбе и опыте использования ИИ. Здесь важен твой опыт — правильных ответов нет.','Расскажи немного о себе по инструкции команды курса. Для оценки подготовки команда использует уже имеющиеся данные об успеваемости.'],note:'Дополнительного предметного теста на этом этапе нет. Учебные контрольные и тесты ты проходишь в обычном порядке на своём курсе.'},
 {id:'r',team:'Твою группу, сроки доступа и инструкцию по входу.',code:'R',name:'Распределение доступа',short:'Доступ к платформе',time:'После сбора исходных данных',description:'Команда сообщает, назначен ли тебе доступ к платформе. С этого момента участники учатся в согласованных условиях.',actions:['Если доступ назначен, открой ссылку из сообщения команды и проверь вход.','Если доступа нет, продолжай учиться по обычной программе. Общие замеры остаются частью маршрута. После окончания экспериментального периода ты тоже получишь доступ к платформе.'],note:'Активности на платформе не дают официальных баллов и не становятся условием допуска.'},
 {id:'t1',team:'Будет ли этот этап и как он пройдёт.',code:'T1',name:'Промежуточный тест',short:'Промежуточный тест',time:'Если предусмотрен на курсе',description:'Результаты обычных контрольных и тестов курса помогают понять, как проходит обучение. Для исследования используются уже предусмотренные учебные проверки.',actions:['Проходи контрольные и тесты по расписанию и инструкции преподавателя.','Если предусмотрен опрос, расскажи о нагрузке, использовании ИИ и технических проблемах.'],note:'Формат, срок и правила использования ИИ подтверждаются отдельно. Не на каждом курсе этот этап будет проводиться.'},
 {id:'t2',team:'Дату, формат и правила итоговой проверки.',code:'T2',name:'Итоговый тест',short:'Итоговый тест',time:'В конце основного периода',description:'Итоговая проверка на твоём курсе — главный результат для исследования: что ты понимаешь и можешь применить самостоятельно.',actions:['Выполни предметный тест без компаньона, других ИИ-сервисов и поиска ответов в интернете.','Следуй общей инструкции и заполни итоговые опросы, если они предусмотрены.'],note:'Дата и содержание теста привязаны к твоему курсу. Количество сообщений на платформе не заменяет самостоятельный результат.'},
 {id:'t3',team:'Будет ли проверка спустя время, её дату и инструкцию.',code:'T3',name:'Проверка спустя время',short:'Пост-тест',time:'После итогового теста · если подтверждён',description:'Отсроченный замер помогает понять, что сохранилось в памяти и как знания работают в новой ситуации.',actions:['Уточни у команды, будет ли этот этап на твоём курсе.','Если он проводится, выполни задания самостоятельно, без компаньона, других ИИ-сервисов и поиска ответов в интернете.'],note:'Возможность и дату пост-теста подтверждают отдельно. Он не обязательно повторяет задания итогового теста.'}
];


const $=id=>document.getElementById(id);let active=0;const navButtons=[];
function renderStage(){const s=stages[active];
 $('event-title').textContent=s.name;
 $('event-code').textContent=`Этап ${active+1} из ${stages.length}`;
 $('event-time').textContent=s.time;$('event-note').replaceChildren();const teamLabel=document.createElement('strong');teamLabel.className='event-team-title';teamLabel.textContent='Что сообщит команда';$('event-note').append(teamLabel,document.createTextNode(s.team+' '+s.note));
 $('next').disabled=active===stages.length-1;$('previous').disabled=active===0;
 $('next-text').textContent=active===stages.length-1?'Последний этап':'Дальше';
 const body=$('stage-body');body.replaceChildren();
 const p=document.createElement('p');p.className='event-description';p.textContent=s.description;
 const introHeading=document.createElement('h3');introHeading.textContent='Что происходит';
 const heading=document.createElement('h3');heading.textContent='Что сделать тебе';
 const list=document.createElement('ul');list.className='event-actions';
 s.actions.forEach(t=>{const li=document.createElement('li');li.textContent=t;list.append(li);});body.append(introHeading,p,heading,list);
}
function selectStage(i,writeHash=true){active=i;navButtons.forEach((b,j)=>b.setAttribute('aria-pressed',String(j===i)));renderStage();
 if(writeHash&&location.hash!==`#stage-${stages[i].id}`)history.pushState(null,'',`#stage-${stages[i].id}`);
 $('announcer').textContent=`Этап ${i+1} из 6. ${stages[i].name}. ${stages[i].time}.`;
}
stages.forEach((s,i)=>{const li=document.createElement('li'),b=document.createElement('button');
 b.type='button';b.className='route-button';b.setAttribute('aria-pressed',String(i===0));b.setAttribute('aria-controls','event-copy');
 const optional=s.id==='t1'||s.id==='t3';
 b.innerHTML=`<span class="route-num">0${i+1}</span><span class="route-title">${s.name}<span class="route-code">${optional?'Если предусмотрен курсом':s.time}</span></span>`;
 b.addEventListener('click',()=>selectStage(i));
 b.addEventListener('keydown',e=>{let j=i;if(e.key==='ArrowRight'||e.key==='ArrowDown')j=(i+1)%6;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')j=(i+5)%6;else if(e.key==='Home')j=0;else if(e.key==='End')j=5;else return;e.preventDefault();navButtons[j].focus({preventScroll:true});selectStage(j);});
 li.append(b);$('route-nav').append(li);navButtons.push(b);
});
$('next').addEventListener('click',()=>{if(active<5)selectStage(active+1);});
$('previous').addEventListener('click',()=>{if(active>0)selectStage(active-1);});
function fromHash(){const m=/^#stage-(p1|p2|r|t1|t2|t3)$/.exec(location.hash);selectStage(m?stages.findIndex(s=>s.id===m[1]):0,false);}
window.addEventListener('hashchange',fromHash);window.addEventListener('popstate',fromHash);
fromHash();
window.stabilizePanel($('event-copy'),(clone,sample)=>{
 stages.forEach((s,i)=>{
  clone.querySelector('#event-title').textContent=s.name;
  clone.querySelector('#event-code').textContent=`Этап ${i+1} из 6`;
  clone.querySelector('#event-time').textContent=s.time;
  clone.querySelector('#stage-body').innerHTML=`<h3>Что происходит</h3><p class="event-description">${s.description}</p><h3>Что сделать тебе</h3><ul class="event-actions">${s.actions.map(t=>`<li>${t}</li>`).join('')}</ul>`;
  clone.querySelector('#event-note').innerHTML=`<strong class="event-team-title">Что сообщит команда</strong>${s.team} ${s.note}`;
  clone.querySelector('#next-text').textContent=i===5?'Последний этап':'Дальше';
  sample();
 });
});})();
