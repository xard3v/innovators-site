
}

//nwm
const tabs = document.querySelectorAll('.tab');
const pages = document.querySelectorAll('.page');
const titleEl = document.getElementById('title');

function showTab(n){
  pages.forEach(p=>p.classList.remove('active'));
  document.getElementById('tab-'+n)?.classList.add('active');
  tabs.forEach(t=>t.classList.remove('active'));
  document.querySelector(`.tab[data-tab="${n}"]`)?.classList.add('active');
  titleEl.textContent = document.querySelector(`.tab[data-tab="${n}"]`)?.textContent;
}

tabs.forEach(t=>t.addEventListener('click',()=>showTab(t.dataset.tab)));


// ----- Społeczności -----
const tiles = document.querySelectorAll('#communities .tile');
const communityView = document.getElementById('community-view');
const backBtn = document.getElementById('backBtn');
const commTitle = document.getElementById('commTitle');
const postsList = document.getElementById('postsList');

let currentCommunity = null;

tiles.forEach(tile=>{
  tile.addEventListener('click',()=>{
    currentCommunity = tile.dataset.name;
    pages.forEach(p=>p.classList.remove('active'));
    communityView.classList.add('active');
    commTitle.textContent = currentCommunity;
    titleEl.textContent = currentCommunity;
    renderPosts();
  });
});

backBtn.addEventListener('click',()=>showTab(1));

function renderPosts(){
  const key = `posts::${currentCommunity}`;
  const posts = JSON.parse(localStorage.getItem(key)||'[]');
  postsList.innerHTML = posts.length
    ? posts.map(p=>`<div class="card"><h4>${p.title}</h4><p>${p.body}</p></div>`).join('')
    : `<div class="card small">Brak postów</div>`;
}

document.getElementById('addPost').onclick=()=>{
  const title=document.getElementById('postTitle').value;
  const body=document.getElementById('postBody').value;
  if(!title)return;
  const key=`posts::${currentCommunity}`;
  const arr=JSON.parse(localStorage.getItem(key)||'[]');
  arr.push({title,body});
  localStorage.setItem(key,JSON.stringify(arr));
  renderPosts();
};

// ----- Stoper -----
let startTime=0,interval=null;
const timer=document.getElementById('timer');

function update(){
  const t=Date.now()-startTime;
  const s=Math.floor(t/1000)%60;
  const m=Math.floor(t/60000);
  timer.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}

document.getElementById('startBtn').onclick=()=>{
  startTime=Date.now();
  interval=setInterval(update,100);
};
document.getElementById('stopBtn').onclick=()=>clearInterval(interval);
document.getElementById('resetBtn').onclick=()=>{
  clearInterval(interval);
  timer.textContent='00:00';
};

// ----- Profil -----
const saveBtn=document.getElementById('saveProfile');
saveBtn.onclick=()=>{
  const profile={
    name:profileName.value,
    age:profileAge.value,
    interests:profileInterests.value
  };
  localStorage.setItem('profile',JSON.stringify(profile));
  alert('Zapisano profil');
};

showTab(1);
