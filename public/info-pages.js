/* info-pages.js — shared content for all static info pages */
const INFO_PAGES = {
  'about': {
    title: 'About AnimeRush',
    content: `
      <div class="breadcrumb" style="padding-top:0"><a href="/">Home</a> › <span>About Us</span></div>
      <h1 style="font-family:'Rajdhani',sans-serif;font-size:36px;font-weight:700;margin:20px 0 16px">About AnimeRush 🎌</h1>
      <p>Welcome to <strong>AnimeRush.in</strong> — your #1 destination to watch anime online free in HD. We are a passionate team of anime fans dedicated to bringing you the best anime streaming experience.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:24px;color:var(--accent);margin:24px 0 10px">Our Mission</h2>
      <p>Our mission is simple: make anime accessible to everyone. Great anime should be free, easy to watch, and available in the highest quality.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:24px;color:var(--accent);margin:24px 0 10px">What We Offer</h2>
      <ul style="color:var(--text2);font-size:15px;line-height:2;padding-left:20px">
        <li>✅ 12,000+ anime series and movies</li>
        <li>✅ English Sub and Dub options</li>
        <li>✅ HD quality up to 1080p</li>
        <li>✅ Daily episode updates</li>
        <li>✅ No registration required</li>
        <li>✅ Mobile-friendly design</li>
      </ul>`
  },
  'contact': {
    title: 'Contact Us',
    content: `
      <div class="breadcrumb" style="padding-top:0"><a href="/">Home</a> › <span>Contact</span></div>
      <h1 style="font-family:'Rajdhani',sans-serif;font-size:36px;font-weight:700;margin:20px 0 16px">Contact Us 📬</h1>
      <p style="color:var(--text2);font-size:15px;margin-bottom:20px">Have a question, suggestion or issue? Reach out to us.</p>
      <div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:28px">
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;flex:1;min-width:170px">
          <div style="font-size:22px;margin-bottom:6px">📧</div>
          <div style="font-size:12px;color:var(--text3)">General</div>
          <a href="mailto:contact@animerush.in" style="color:var(--accent);font-size:14px">contact@animerush.in</a>
        </div>
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;flex:1;min-width:170px">
          <div style="font-size:22px;margin-bottom:6px">⚖️</div>
          <div style="font-size:12px;color:var(--text3)">DMCA / Legal</div>
          <a href="mailto:dmca@animerush.in" style="color:var(--accent);font-size:14px">dmca@animerush.in</a>
        </div>
        <div style="background:var(--bg3);border:1px solid var(--border);border-radius:var(--radius);padding:16px 20px;flex:1;min-width:170px">
          <div style="font-size:22px;margin-bottom:6px">💬</div>
          <div style="font-size:12px;color:var(--text3)">Community</div>
          <a href="#" style="color:var(--accent);font-size:14px">Join Discord →</a>
        </div>
      </div>
      <div style="background:var(--bg2);border:1px solid var(--border);border-radius:var(--radius);padding:28px">
        <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;margin-bottom:18px">Send a Message</h2>
        <div style="margin-bottom:14px"><label style="display:block;font-size:12px;color:var(--text3);margin-bottom:5px;font-weight:500">YOUR NAME</label>
          <input id="cName" type="text" placeholder="Yamada Taro" style="width:100%;background:var(--bg4);border:1px solid var(--border2);color:var(--text);border-radius:7px;padding:10px 14px;font-size:14px;outline:none;font-family:'Inter',sans-serif"/></div>
        <div style="margin-bottom:14px"><label style="display:block;font-size:12px;color:var(--text3);margin-bottom:5px;font-weight:500">EMAIL ADDRESS</label>
          <input id="cEmail" type="email" placeholder="you@example.com" style="width:100%;background:var(--bg4);border:1px solid var(--border2);color:var(--text);border-radius:7px;padding:10px 14px;font-size:14px;outline:none;font-family:'Inter',sans-serif"/></div>
        <div style="margin-bottom:14px"><label style="display:block;font-size:12px;color:var(--text3);margin-bottom:5px;font-weight:500">MESSAGE</label>
          <textarea id="cMsg" rows="5" placeholder="Your message..." style="width:100%;background:var(--bg4);border:1px solid var(--border2);color:var(--text);border-radius:7px;padding:10px 14px;font-size:14px;outline:none;font-family:'Inter',sans-serif;resize:vertical"></textarea></div>
        <button onclick="submitContact()" style="background:var(--accent);border:none;color:#fff;border-radius:7px;padding:12px 28px;font-size:14px;font-weight:600;cursor:pointer">Send Message →</button>
      </div>`
  },
  'privacy': {
    title: 'Privacy Policy',
    content: `
      <div class="breadcrumb" style="padding-top:0"><a href="/">Home</a> › <span>Privacy Policy</span></div>
      <h1 style="font-family:'Rajdhani',sans-serif;font-size:36px;font-weight:700;margin:20px 0 8px">Privacy Policy</h1>
      <p style="color:var(--text3);font-size:13px;margin-bottom:24px"><em>Last updated: January 1, 2025</em></p>
      <p style="color:var(--text2);font-size:15px;line-height:1.85;margin-bottom:14px">AnimeRush ("we","us","our") respects your privacy. This policy explains how we collect, use and protect your information when you use <strong>animerush.in</strong>.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">Information We Collect</h2>
      <ul style="color:var(--text2);font-size:15px;line-height:1.9;padding-left:20px;margin-bottom:14px">
        <li><strong>Usage Data:</strong> Pages visited, browser type, device info via Google Analytics.</li>
        <li><strong>Cookies:</strong> Used for analytics and advertising (Google AdSense).</li>
        <li><strong>Contact Data:</strong> Name and email when you contact us.</li>
      </ul>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">Google AdSense & Cookies</h2>
      <p style="color:var(--text2);font-size:15px;line-height:1.85;margin-bottom:14px">We use Google AdSense to show ads. Google may use cookies to show personalised ads based on your interests. You can opt out at <a href="https://adssettings.google.com" target="_blank" style="color:var(--accent)">adssettings.google.com</a>.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">Contact</h2>
      <p style="color:var(--text2);font-size:15px">Privacy questions: <a href="mailto:privacy@animerush.in" style="color:var(--accent)">privacy@animerush.in</a></p>`
  },
  'terms': {
    title: 'Terms of Use',
    content: `
      <div class="breadcrumb" style="padding-top:0"><a href="/">Home</a> › <span>Terms of Use</span></div>
      <h1 style="font-family:'Rajdhani',sans-serif;font-size:36px;font-weight:700;margin:20px 0 8px">Terms of Use</h1>
      <p style="color:var(--text3);font-size:13px;margin-bottom:24px"><em>Last updated: January 1, 2025</em></p>
      <p style="color:var(--text2);font-size:15px;line-height:1.85;margin-bottom:14px">By using AnimeRush you agree to these terms.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">1. Use of Service</h2>
      <ul style="color:var(--text2);font-size:15px;line-height:1.9;padding-left:20px;margin-bottom:14px">
        <li>Personal, non-commercial use only.</li>
        <li>Do not use for any illegal purpose.</li>
        <li>Do not attempt to hack, scrape or disrupt our servers.</li>
      </ul>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">2. Content Disclaimer</h2>
      <p style="color:var(--text2);font-size:15px;line-height:1.85;margin-bottom:14px">AnimeRush does not host any video content. All videos are embedded from third-party sources. We are not responsible for third-party content availability.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">3. Intellectual Property</h2>
      <p style="color:var(--text2);font-size:15px;line-height:1.85;margin-bottom:14px">All anime titles, characters and content are the property of their respective creators. AnimeRush claims no ownership of any anime content.</p>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">Contact</h2>
      <p style="color:var(--text2);font-size:15px"><a href="mailto:legal@animerush.in" style="color:var(--accent)">legal@animerush.in</a></p>`
  },
  'dmca': {
    title: 'DMCA Policy',
    content: `
      <div class="breadcrumb" style="padding-top:0"><a href="/">Home</a> › <span>DMCA</span></div>
      <h1 style="font-family:'Rajdhani',sans-serif;font-size:36px;font-weight:700;margin:20px 0 16px">DMCA / Copyright Policy ⚖️</h1>
      <div style="background:rgba(230,57,70,.07);border:1px solid rgba(230,57,70,.2);border-radius:var(--radius);padding:16px 20px;margin:14px 0;font-size:14px;color:var(--text2)">
        ⚠️ <strong>AnimeRush does not store any video files on its servers.</strong> All content is embedded from third-party hosts. We are an index service only.
      </div>
      <h2 style="font-family:'Rajdhani',sans-serif;font-size:22px;color:var(--accent);margin:22px 0 8px">Submit a DMCA Notice</h2>
      <p style="color:var(--text2);font-size:15px;line-height:1.85;margin-bottom:14px">To submit a DMCA takedown notice, email us at <a href="mailto:dmca@animerush.in" style="color:var(--accent)">dmca@animerush.in</a> with the following:</p>
      <ul style="color:var(--text2);font-size:15px;line-height:1.9;padding-left:20px;margin-bottom:14px">
        <li>Your name and contact information</li>
        <li>The copyrighted work being infringed</li>
        <li>Specific URL(s) on AnimeRush where the content appears</li>
        <li>A statement of good faith belief</li>
        <li>Your signature (physical or electronic)</li>
      </ul>
      <p style="color:var(--text2);font-size:15px">We will respond within <strong>48–72 hours</strong> and remove valid complaints within 24 hours of verification.</p>`
  }
};

// Render the page
(function(){
  const data = INFO_PAGES[PAGE] || INFO_PAGES['about'];
  document.title = data.title + ' — AnimeRush';
  document.getElementById('pageContent').innerHTML = data.content;
})();

function submitContact(){
  const n=document.getElementById('cName')?.value?.trim();
  const e=document.getElementById('cEmail')?.value?.trim();
  const m=document.getElementById('cMsg')?.value?.trim();
  if(!n||!e||!m){ showToast('Please fill all fields.'); return; }
  showToast('✅ Message sent! We\'ll reply within 24 hours.');
  document.getElementById('cName').value='';
  document.getElementById('cEmail').value='';
  document.getElementById('cMsg').value='';
}
