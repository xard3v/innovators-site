<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAIkugtARmZck-LA9CaKLjHrt2z05NSJu8",
    authDomain: "iotproject-2644e.firebaseapp.com",
    projectId: "iotproject-2644e",
    storageBucket: "iotproject-2644e.firebasestorage.app",
    messagingSenderId: "300270133705",
    appId: "1:300270133705:web:56904d3e1d882bf2c48818"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
</script>
// laczenie strony z baza
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zqcapljfxmkncbxlbhar.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpxY2FwbGpmeG1rbmNieGxiaGFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzExNDk5MTcsImV4cCI6MjA4NjcyNTkxN30.qSTWa1P3LzZlQ4N2LEY2Bl_8cC0TPXNMmp2RYOD1IfM'
const supabase = createClient(supabaseUrl, supabaseKey)

// Funkcja wysyłająca post
async function sendPost(user, text) {
    const { data, error } = await supabase
        .from('posts')
        .insert([{ username: user, content: text }])
    
    if (error) console.error(error)
    else location.reload(); // Odśwież, żeby zobaczyć nowy post
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
