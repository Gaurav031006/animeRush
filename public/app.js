/* ── AnimeRush shared components & utilities ── */

/* ─────────── API CONSTANTS ─────────── */
const AR = {
  JIKAN: 'https://api.jikan.moe/v4',
  ANILIST: 'https://graphql.anilist.co',
  CONSUMET: 'https://api.consumet.org',
  GOGO_EMBED: 'https://gogoanime3.co/embed/'
};

/* ─────────── CACHE ─────────── */
const Cache = {
  get(k){
    try{
      const d = sessionStorage.getItem('ar_' + k);
      return d ? JSON.parse(d) : null;
    }catch{
      return null;
    }
  },

  set(k,v,ttl=300){
    try{
      sessionStorage.setItem(
        'ar_' + k,
        JSON.stringify({
          v:v,
          exp:Date.now() + ttl * 1000
        })
      );
    }catch{}
  },

  valid(k){
    const d = Cache.get(k);
    return d && d.exp > Date.now() ? d.v : null;
  }
};

/* ─────────── JIKAN HELPERS ─────────── */
const Jikan = {
  async get(path, params={}){
    const q = new URLSearchParams(params).toString();
    const url = `${AR.JIKAN}${path}${q ? '?' + q : ''}`;
    const ck = 'jk_' + url;

    const cached = Cache.valid(ck);
    if(cached) return cached;

    await sleep(350);

    const r = await fetch(url);

    if(!r.ok){
      throw new Error('Jikan ' + r.status);
    }

    const d = await r.json();
    Cache.set(ck, d, 600);

    return d;
  },

  async topAnime(page=1, filter='airing'){
    return Jikan.get('/top/anime', {
      page:page,
      filter:filter,
      limit:24
    });
  },

  async seasonNow(page=1){
    return Jikan.get('/seasons/now', {
      page:page,
      limit:24
    });
  },

async search(q, page=1, filters={}){
  const cleanFilters = {};

  Object.keys(filters).forEach(function(key){
    if(filters[key] !== "" && filters[key] !== null && filters[key] !== undefined){
      cleanFilters[key] = filters[key];
    }
  });

  return Jikan.get('/anime', {
    q: q || "",
    page: page,
    limit: 24,
    sfw: true,
    ...cleanFilters
  });
},

  async animeById(id){
    return Jikan.get(`/anime/${id}/full`);
  },

  async episodes(id, page=1){
    return Jikan.get(`/anime/${id}/episodes`, {
      page:page
    });
  },

  async schedule(filter='monday'){
    return Jikan.get('/schedules', {
      filter:filter,
      limit:25
    });
  },

  async genre(genreId, page=1){
    return Jikan.get('/anime', {
      genres:genreId,
      page:page,
      limit:24,
      order_by:'score',
      sort:'desc',
      sfw:true
    });
  },

  async movies(page=1){
    return Jikan.get('/anime', {
      type:'movie',
      page:page,
      limit:24,
      order_by:'score',
      sort:'desc',
      sfw:true
    });
  },

  async recommendations(id){
    return Jikan.get(`/anime/${id}/recommendations`);
  }
};

/* ─────────── ANILIST HELPERS ─────────── */
const AniList = {
  async query(gql, vars={}){
    const ck = 'al_' + JSON.stringify({gql:gql, vars:vars});
    const cached = Cache.valid(ck);

    if(cached) return cached;

    const r = await fetch(AR.ANILIST, {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({
        query:gql,
        variables:vars
      })
    });

    const d = await r.json();
    Cache.set(ck,d,600);

    return d;
  },

  async trending(page=1){
    const q = `
      query($page:Int){
        Page(page:$page,perPage:24){
          media(sort:TRENDING_DESC,type:ANIME,isAdult:false){
            id
            title{romaji english}
            coverImage{large}
            averageScore
            episodes
            status
            format
          }
        }
      }
    `;

    return AniList.query(q,{page:page});
  },

  async popular(page=1){
    const q = `
      query($page:Int){
        Page(page:$page,perPage:24){
          media(sort:POPULARITY_DESC,type:ANIME,isAdult:false){
            id
            title{romaji english}
            coverImage{large}
            averageScore
            episodes
            status
            format
          }
        }
      }
    `;

    return AniList.query(q,{page:page});
  }
};

/* ─────────── STREAMING ─────────── */
const Stream = {
  gogoEmbed(slug, ep=1){
    return `${AR.GOGO_EMBED}${slug}-episode-${ep}`;
  },

  async consumetEpisodes(animeTitle){
    const ck = 'cons_' + animeTitle;
    const cached = Cache.valid(ck);

    if(cached) return cached;

    try{
      const r = await fetch(`${AR.CONSUMET}/anime/gogoanime/${encodeURIComponent(animeTitle)}`);

      if(!r.ok) return null;

      const d = await r.json();
      Cache.set(ck,d,1800);

      return d;
    }catch{
      return null;
    }
  },

  async consumetLinks(epId){
    try{
      const r = await fetch(`${AR.CONSUMET}/anime/gogoanime/watch/${encodeURIComponent(epId)}`);

      if(!r.ok) return null;

      return await r.json();
    }catch{
      return null;
    }
  },

  sources(slug, ep){
    return [
      {
        label:'Server 1 (HD)',
        type:'embed',
        url:Stream.gogoEmbed(slug, ep)
      },
      {
        label:'Server 2 (SUB)',
        type:'embed',
        url:`https://embtaku.pro/embedding.php?id=${slug}-episode-${ep}`
      },
      {
        label:'Server 3 (DUB)',
        type:'embed',
        url:`https://www.dubhappy.com/embed/${slug}-dub-episode-${ep}`
      }
    ];
  }
};

/* ─────────── HELPERS ─────────── */
function sleep(ms){
  return new Promise(r => setTimeout(r,ms));
}

function slug(title=''){
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g,'')
    .trim()
    .replace(/\s+/g,'-');
}

function scoreColor(s){
  if(!s) return 'var(--text3)';
  if(s >= 80) return 'var(--green)';
  if(s >= 65) return 'var(--yellow)';
  return 'var(--text2)';
}

function formatScore(s){
  return s ? (s/10).toFixed(1) : 'N/A';
}

function statusBadge(s=''){
  const m = {
    'RELEASING':'Ongoing',
    'FINISHED':'Finished',
    'NOT_YET_RELEASED':'Upcoming',
    'CANCELLED':'Cancelled',
    'Currently Airing':'Airing',
    'Finished Airing':'Finished'
  };

  return m[s] || s;
}

function animeTypeBadge(t=''){
  const m = {
    TV:'SUB',
    Movie:'MOVIE',
    OVA:'OVA',
    ONA:'ONA',
    Special:'SP',
    Music:'MV'
  };

  return m[t] || t;
}

function imgFallback(el){
  el.src = 'https://placehold.co/160x230/1c1d26/444?text=No+Image';
}

function openAnime(id){
  if(!id) return;
  window.location.href = `watch.html?id=${encodeURIComponent(id)}&ep=1`;
}

/* ─────────── CARD BUILDER ─────────── */
function makeAnimeCard(anime, source='jikan'){
  let id,title,img,ep,score,type;

  if(source === 'jikan'){
    id = anime.mal_id;
    title = anime.title || anime.title_english || 'Unknown Anime';
    img = anime.images?.jpg?.large_image_url || anime.images?.jpg?.image_url || '';
    ep = anime.episodes ? `EP ${anime.episodes}` : (anime.airing ? 'Ongoing' : '?');
    score = anime.score ? anime.score.toFixed(1) : null;
    type = anime.type || 'TV';
  }else{
    id = 'al_' + anime.id;
    title = anime.title?.english || anime.title?.romaji || 'Unknown Anime';
    img = anime.coverImage?.large || '';
    ep = anime.episodes ? `EP ${anime.episodes}` : (anime.status === 'RELEASING' ? 'Ongoing' : '?');
    score = anime.averageScore ? (anime.averageScore/10).toFixed(1) : null;
    type = anime.format || 'TV';
  }

  const badgeTxt = animeTypeBadge(type);
  const badgeCls = type === 'Movie' || type === 'MOVIE' ? 'movie' : 'sub';

 return `
  <div class="acard"
       onclick="openAnime('${id}')"
       data-id="${id}">

    <div class="acard-thumb">
      <img src="${img}" alt="${title}" loading="lazy" onerror="imgFallback(this)">

      <div class="acard-overlay">
        <div class="play-ic">▶</div>
      </div>

      <span class="abadge ${badgeCls}">
        ${badgeTxt}
      </span>

      <span class="ep-count">
        ${ep}
      </span>
    </div>

    <div class="acard-info">
      <div class="acard-title">
        ${title}
      </div>

      <div class="acard-meta">
        ${score ? `<span class="acard-rating">★ ${score}</span>` : ''}
        <span>${type}</span>
      </div>
    </div>

  </div>
`;
}

function skeletonCards(n=8){
  return Array(n).fill(`
    <div class="skel-card">
      <div class="skel-thumb skeleton" style="padding-bottom:148%"></div>
      <div class="skel-line skeleton"></div>
      <div class="skel-line short skeleton"></div>
    </div>
  `).join('');
}

/* ─────────── NAVBAR ─────────── */
function renderNavbar(){
  const navbar = document.getElementById('navbar');
  if(!navbar) return;

  navbar.innerHTML = `
    <div class="nav-inner">

      <a href="index.html" class="logo">
        Anime<span>Rush</span>
      </a>

      <nav class="nav-links" id="navLinks" style="display:flex;gap:28px;align-items:center;">
        <a href="index.html">Home</a>
        <a href="anime-list.html">Anime List</a>
        <a href="movies.html">Movies</a>
        <a href="schedule.html">Schedule</a>
        <a href="manga.html">Manga</a>
        <a href="genre.html">Genre</a>
        <a href="#" id="navRandom">Random</a>
      </nav>

      <div class="search-box dual-search">
  <select id="navSearchType">
    <option value="anime">Anime</option>
    <option value="manga">Manga</option>
  </select>

  <input type="text"
    placeholder="Search anime or manga..."
    id="navSearch">

  <button type="button"
    onclick="navDoSearch()">🔍</button>
</div>

<div id="navAuth"></div>

<button class="hamburger"
  type="button"
  onclick="toggleMobileNav()">☰</button>

    </div>
  `;

  document.getElementById('navSearch')?.addEventListener('keydown', function(e){
    if(e.key === 'Enter') navDoSearch();
  });

  document.getElementById('navRandom')?.addEventListener('click', function(e){
    e.preventDefault();
    goRandom();
  });

  const navAuth = document.getElementById("navAuth");
  const gUser = JSON.parse(localStorage.getItem("ar_google_user"));

  if(gUser){
    navAuth.innerHTML = `
      <div class="nav-user-dropdown">
        <div class="nav-user-top" onclick="toggleUserMenu()">
          <img src="${gUser.photo}" alt="">
          <span>${gUser.name.split(" ")[0]}</span>
        </div>

        <div class="nav-user-menu" id="userMenu">
          <a href="profile.html">Profile</a>
          <a href="profile.html">Continue Watching</a>
          <button onclick="logoutGoogle()">Logout</button>
        </div>
      </div>
    `;
  }else{
    navAuth.innerHTML = `
      <button class="nav-login-btn"
        onclick="location.href='login.html'">
        Sign In
      </button>
    `;
  }
}

function toggleUserMenu(){
  document.getElementById("userMenu")?.classList.toggle("active");
}

function navDoSearch(){
  const q = document.getElementById('navSearch')?.value?.trim();
  const type = document.getElementById('navSearchType')?.value || 'anime';

  if(!q) return;

  if(type === 'manga'){
    location.href = `manga.html?q=${encodeURIComponent(q)}`;
  }else{
    location.href = `search.html?q=${encodeURIComponent(q)}`;
  }
}

function toggleMobileNav(){
  const n = document.getElementById('navLinks');

  if(!n) return;

  n.classList.toggle("mobile-open");
}

async function goRandom(){

  showToast('Finding random anime...');

  try{

    // Random page from top anime
    const page = Math.floor(Math.random() * 50) + 1;

    // Fetch anime list
    const d = await Jikan.topAnime(page, 'bypopularity');

    const list = d.data || [];

    // If anime exists
    if(list.length){

      // Pick random anime
      const a = list[Math.floor(Math.random() * list.length)];

      // Open anime watch page directly
      openAnime(a.mal_id);

    }else{

      showToast('No anime found.');

    }

  }catch(err){

    console.log(err);

    showToast('Try again!');

  }

}

/* ─────────── FOOTER ─────────── */
function renderFooter(){
  const el = document.getElementById('footer');

  if(!el) return;

  el.innerHTML = `
    <div class="footer-inner">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="logo">Anime<span>Rush</span></a>
          <p>
Explore trending anime, official trailers,
streaming platforms, reviews, and episode guides
updated daily for anime fans worldwide.
</p>
        </div>

        <div class="footer-col">
          <h4>Navigation</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="anime-list.html">Anime List</a></li>
            <li><a href="movies.html">Movies</a></li>
            <li><a href="schedule.html">Schedule</a></li>
            <li><a href="genre.html">Genre</a></li>
            <li><a href="search.html">Search</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Genres</h4>
          <ul>
            <li><a href="genre.html?id=1">Action</a></li>
            <li><a href="genre.html?id=22">Romance</a></li>
            <li><a href="genre.html?id=10">Fantasy</a></li>
            <li><a href="genre.html?id=4">Comedy</a></li>
            <li><a href="genre.html?id=8">Drama</a></li>
            <li><a href="genre.html?id=37">Supernatural</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Info</h4>
          <ul>
            <li><a href="about.html">About Us</a></li>
            <li><a href="contact.html">Contact</a></li>
            <li><a href="dmca.html">DMCA</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms of Use</a></li>
            <li><a href="sitemap.xml">Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="dmca-bar">
        ⚠️ AnimeRush does not host any video files. All content is embedded from third-party sources.
        For DMCA requests:
        <a href="mailto:dmca@animerush.in">dmca@animerush.in</a>
      </div>

      <div class="footer-bottom">
        <span>© ${new Date().getFullYear()} AnimeRush.in — All rights reserved.</span>
        <span>
          <a href="privacy.html">Privacy</a> ·
          <a href="terms.html">Terms</a> ·
          <a href="dmca.html">DMCA</a>
        </span>
      </div>
    </div>
  `;
}

/* ─────────── TOAST ─────────── */
function showToast(msg,dur=2500){
  let t = document.getElementById('toast');

  if(!t){
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }

  t.textContent = msg;
  t.classList.add('show');

  setTimeout(function(){
    t.classList.remove('show');
  },dur);
}

/* ─────────── INIT ─────────── */
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('navbar')){
    renderNavbar();
  }

  if(document.getElementById('footer')){
    renderFooter();
  }
});

function toggleUserMenu(){
  document
    .getElementById("userMenu")
    ?.classList.toggle("active");
}