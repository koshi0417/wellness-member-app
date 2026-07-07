/* ============================================
   VitalConnect Desktop App
   PC / Tablet Application Logic
   ============================================ */

// ===== Mock User Data =====
const USER = { name: '田中 正男', age: 78, hr: 78, spo2: 97, weight: 68.2, sleep: 6.5 };

// ===== Schedule Data =====
const SCHEDULE = [
  { time: '10:00', period: '午前', title: '水中ウォーキング', meta: 'プールエリア・30分', icon: '🏊' },
  { time: '11:30', period: '午前', title: 'PT個別指導（山本先生）', meta: 'リハビリルーム・45分', icon: '🧑‍⚕️' },
  { time: '14:00', period: '午後', title: 'マシントレーニング', meta: 'マシンエリア・20分', icon: '💪' }
];

const UPCOMING_BOOKINGS = [
  { date: '7月4日（金）', time: '10:00', title: '水中ウォーキング', status: '確定' },
  { date: '7月4日（金）', time: '14:00', title: 'チェアヨガ', status: '確定' },
  { date: '7月7日（月）', time: '10:00', title: 'PT個別指導', status: '確定' },
  { date: '7月7日（月）', time: '11:30', title: 'アクアビクス', status: '確定' },
  { date: '7月9日（水）', time: '10:00', title: '水中ウォーキング', status: '仮予約' }
];

const EXERCISE_LOG = [
  { date: '7/3', name: '水中ウォーキング', duration: '30分' },
  { date: '7/3', name: 'エルゴメーター（低負荷）', duration: '20分' },
  { date: '7/2', name: '水中ウォーキング', duration: '25分' },
  { date: '7/2', name: 'ストレッチ', duration: '15分' },
  { date: '7/1', name: 'チェアヨガ', duration: '40分' },
  { date: '7/1', name: 'レッグプレス（軽負荷）', duration: '15分' },
  { date: '6/30', name: '水中ウォーキング', duration: '30分' },
  { date: '6/30', name: 'バランス訓練', duration: '20分' },
  { date: '6/29', name: 'アクアビクス', duration: '25分' },
  { date: '6/28', name: 'トレッドミル（ウォーキング）', duration: '20分' },
  { date: '6/28', name: 'ストレッチ＆バランス訓練', duration: '30分' },
  { date: '6/27', name: '水中ウォーキング', duration: '30分' }
];

const CHAT_THREADS = [
  {
    id: 1, name: '山本 理恵', role: '理学療法士', roleClass: 'pt', avatar: '山', unread: 1,
    messages: [
      { sender: 'them', text: 'おはようございます、田中さん。昨日の水中ウォーキング、とてもフォームが良くなっていますよ！', time: '昨日 16:30' },
      { sender: 'me', text: 'ありがとうございます！膝の調子も良い感じです。', time: '昨日 17:00' },
      { sender: 'them', text: '素晴らしいですね。今日のPT指導では少し負荷を上げてみましょうか？体調がよければですが。', time: '本日 09:15' }
    ]
  },
  {
    id: 2, name: '佐藤 健一', role: '主治医（循環器内科）', roleClass: 'doctor', avatar: '佐', unread: 0,
    messages: [
      { sender: 'them', text: '田中さん、先日の心エコー結果をお伝えします。EF62%で安定しており、心機能は良好です。現在の運動プログラムを安心して続けてください。', time: '7/2 14:45' },
      { sender: 'me', text: '安心しました。ありがとうございます。次の定期診察はいつでしょうか？', time: '7/2 15:00' },
      { sender: 'them', text: '次回は7月16日（水）14:00に千葉大学附属病院の外来でお待ちしています。血液検査もありますので、朝食は軽めにお願いしますね。', time: '7/2 15:10' }
    ]
  },
  {
    id: 3, name: '鈴木 美咲', role: '保健師', roleClass: 'nurse', avatar: '鈴', unread: 2,
    messages: [
      { sender: 'them', text: '田中さん、おはようございます。今朝の血圧はいかがですか？', time: '本日 08:30' },
      { sender: 'me', text: '130/78でした。少し高めかもしれません。', time: '本日 08:45' },
      { sender: 'them', text: '許容範囲内ですのでご安心ください。ただ、昨晩の睡眠が6.5時間と少し短めですね。睡眠不足は血圧を上げる要因になりますので、今夜は少し早めにお休みになることをお勧めします😊', time: '本日 09:00' },
      { sender: 'them', text: 'あと、本日午後のマシントレーニング前に、ラウンジで水分をしっかりとってからいらしてくださいね。', time: '本日 09:05' }
    ]
  }
];

const NOTIFICATIONS = [
  { icon: '🏊', title: '明日の予約リマインダー', body: '7月4日（金）10:00「水中ウォーキング」の予約があります。', time: '1時間前', unread: true },
  { icon: '💓', title: 'バイタルレポート', body: '6月のバイタルサマリーが作成されました。心拍数・SpO2ともに安定しています。', time: '昨日', unread: true },
  { icon: '📢', title: '施設からのお知らせ', body: '7月10日（木）はプールエリアの定期メンテナンスのため、13:00〜17:00の間ご利用いただけません。', time: '2日前', unread: true },
  { icon: '🎉', title: '運動目標達成！', body: '今週の運動目標（5回）を達成しました！素晴らしい継続力です。', time: '3日前', unread: false },
  { icon: '💊', title: '服薬リマインダー', body: '本日のお薬（バイアスピリン、アムロジピン）の服用はお済みですか？', time: '今朝', unread: false },
  { icon: '📋', title: '体調記録のお願い', body: '本日の体調記録がまだ入力されていません。体調を記録して、スタッフに共有しましょう。', time: '今朝', unread: false }
];

// ===== State =====
let currentPage = 'home';
let selectedSlot = null;
let selectedMood = null;
let currentChatId = null;
let hrChart = null;
let exerciseChart = null;

// ===== Page Titles =====
const PAGE_TITLES = {
  home: 'ダッシュボード',
  booking: '予約管理',
  condition: '体調記録',
  exercise: '運動履歴',
  chat: 'メッセージ',
  notif: 'お知らせ'
};

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  bindLoginEvents();
});

// ===== Login =====
function bindLoginEvents() {
  document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('login-id').value.trim();
    const pw = document.getElementById('login-password').value.trim();
    if (!id || !pw) { document.getElementById('login-error').classList.remove('hidden'); return; }
    document.getElementById('login-error').classList.add('hidden');
    const btn = document.getElementById('login-btn');
    btn.classList.add('loading');
    btn.textContent = 'ログイン中...';
    setTimeout(() => {
      const ls = document.getElementById('login-screen');
      ls.classList.add('fade-out');
      setTimeout(() => {
        ls.classList.add('hidden');
        document.getElementById('app-layout').classList.remove('hidden');
        initApp();
      }, 500);
    }, 800);
  });
}

function initApp() {
  updateGreeting();
  renderHome();
  renderBookings();
  renderExerciseLog();
  renderChatList();
  renderNotifications();
  bindEvents();
  startVitalSimulation();
  initBookingDate();
}

// ===== Greeting =====
function updateGreeting() {
  const h = new Date().getHours();
  const g = h < 10 ? 'おはようございます' : h < 17 ? 'こんにちは' : 'こんばんは';
  document.getElementById('greeting-text').textContent = g;
}

// ===== Navigation =====
function navigateTo(page) {
  currentPage = page;
  document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
  document.getElementById(`page-${page}`).classList.remove('hidden');
  document.querySelectorAll('.sb-nav-item').forEach(n => n.classList.remove('active'));
  document.querySelector(`.sb-nav-item[data-page="${page}"]`)?.classList.add('active');
  document.getElementById('page-title-text').textContent = PAGE_TITLES[page] || '';
  if (page === 'home' && !hrChart) renderHRChart();
  if (page === 'exercise' && !exerciseChart) renderExerciseChart();
}

// ===== Home =====
function renderHome() {
  const el = document.getElementById('today-schedule');
  el.innerHTML = SCHEDULE.map(s => `
    <div class="schedule-item">
      <div class="schedule-icon">${s.icon}</div>
      <div class="schedule-time"><div class="time">${s.time}</div><div class="period">${s.period}</div></div>
      <div class="schedule-info"><div class="s-title">${s.title}</div><div class="s-meta">${s.meta}</div></div>
    </div>`).join('');
  setTimeout(() => renderHRChart(), 100);
}

function renderHRChart() {
  const canvas = document.getElementById('hr-chart');
  if (!canvas) return;
  if (hrChart) hrChart.destroy();
  const labels = [], data = [], now = new Date();
  for (let i = 23; i >= 0; i--) {
    const h = new Date(now - i * 3600000);
    labels.push(h.getHours() + ':00');
    let base = USER.hr;
    if (h.getHours() < 6 || h.getHours() > 22) base = Math.round(base * 0.78);
    else if (h.getHours() >= 10 && h.getHours() <= 11) base = Math.round(base * 1.18);
    data.push(base + Math.round((Math.random() - 0.5) * 10));
  }
  hrChart = new Chart(canvas.getContext('2d'), {
    type: 'line',
    data: { labels, datasets: [{ label: '心拍数 (bpm)', data, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.08)', borderWidth: 2.5, fill: true, tension: 0.4, pointRadius: 2, pointHoverRadius: 7, pointBackgroundColor: '#ef4444' }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#2d3142', cornerRadius: 10, padding: 12, displayColors: false } }, scales: { x: { ticks: { color: '#9ca3af', font: { size: 10 }, maxTicksLimit: 8 }, grid: { color: 'rgba(0,0,0,0.04)' } }, y: { min: 45, max: 130, ticks: { color: '#9ca3af', font: { size: 10 } }, grid: { color: 'rgba(0,0,0,0.04)' } } } }
  });
}

// ===== Bookings =====
function renderBookings() {
  document.getElementById('booking-upcoming').innerHTML = UPCOMING_BOOKINGS.map(b => `
    <div class="schedule-item">
      <div class="schedule-icon">${b.status === '確定' ? '✅' : '⏳'}</div>
      <div class="schedule-time"><div class="time">${b.time}</div></div>
      <div class="schedule-info"><div class="s-title">${b.title}</div><div class="s-meta">${b.date}　${b.status}</div></div>
    </div>`).join('');
}

function initBookingDate() {
  const d = document.getElementById('booking-date');
  const tmr = new Date(); tmr.setDate(tmr.getDate() + 1);
  d.valueAsDate = tmr;
  renderSlots();
}

function renderSlots() {
  const slots = ['09:00','09:30','10:00','10:30','11:00','11:30','13:00','13:30','14:00','14:30','15:00','15:30'];
  const unavail = ['09:30','11:00','14:30'];
  document.getElementById('slot-grid').innerHTML = slots.map(s =>
    `<button class="slot-btn ${unavail.includes(s)?'unavailable':''} ${selectedSlot===s?'selected':''}" data-slot="${s}" ${unavail.includes(s)?'disabled':''}>${s}</button>`
  ).join('');
}

// ===== Exercise =====
function renderExerciseLog() {
  document.getElementById('exercise-log-list').innerHTML = EXERCISE_LOG.map(e => `
    <div class="exercise-entry">
      <span class="ex-date">${e.date}</span><span class="ex-name">${e.name}</span><span class="ex-duration">${e.duration}</span>
    </div>`).join('');
  setTimeout(() => renderExerciseChart(), 200);
}

function renderExerciseChart() {
  const canvas = document.getElementById('exercise-chart');
  if (!canvas) return;
  if (exerciseChart) exerciseChart.destroy();
  exerciseChart = new Chart(canvas.getContext('2d'), {
    type: 'bar',
    data: { labels: ['6/27','6/28','6/29','6/30','7/1','7/2','7/3'], datasets: [{ label: '運動時間（分）', data: [30,50,25,50,55,40,50], backgroundColor: 'rgba(26,154,122,0.6)', borderColor: '#1a9a7a', borderWidth: 1, borderRadius: 8, borderSkipped: false }] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, tooltip: { backgroundColor: '#2d3142', cornerRadius: 10, padding: 12, displayColors: false } }, scales: { x: { ticks: { color: '#9ca3af', font: { size: 11 } }, grid: { display: false } }, y: { beginAtZero: true, ticks: { color: '#9ca3af', font: { size: 10 }, callback: v => v + '分' }, grid: { color: 'rgba(0,0,0,0.04)' } } } }
  });
}

// ===== Chat =====
function renderChatList() {
  document.getElementById('chat-list').innerHTML = CHAT_THREADS.map(t => {
    const last = t.messages[t.messages.length - 1];
    return `
    <div class="chat-thread ${currentChatId === t.id ? 'active' : ''}" data-chat-id="${t.id}">
      <div class="chat-avatar ${t.roleClass}">${t.avatar}</div>
      <div class="chat-info">
        <div class="chat-name">${t.name}</div>
        <div class="chat-role-text">${t.role}</div>
        <div class="chat-preview">${last.text}</div>
      </div>
      <div class="chat-meta">
        <span class="chat-time">${last.time.split(' ').pop()}</span>
        ${t.unread > 0 ? `<span class="chat-unread">${t.unread}</span>` : ''}
      </div>
    </div>`;
  }).join('');
}

function openChat(chatId) {
  currentChatId = chatId;
  const thread = CHAT_THREADS.find(t => t.id === chatId);
  if (!thread) return;
  thread.unread = 0;

  document.getElementById('chat-placeholder').classList.add('hidden');
  document.getElementById('chat-window').classList.remove('hidden');
  document.getElementById('chat-partner-name').textContent = `${thread.name}（${thread.role}）`;
  renderMessages(thread);
  renderChatList();
  updateNotifBadge();
}

function renderMessages(thread) {
  const el = document.getElementById('chat-messages');
  el.innerHTML = thread.messages.map(m => `
    <div class="message ${m.sender === 'me' ? 'sent' : ''}">
      ${m.sender !== 'me' ? `<div class="msg-avatar ${thread.roleClass}">${thread.avatar}</div>` : ''}
      <div><div class="msg-bubble">${m.text}</div><div class="msg-time">${m.time}</div></div>
      ${m.sender === 'me' ? `<div class="msg-avatar" style="background:var(--primary-light);color:var(--primary)">田</div>` : ''}
    </div>`).join('');
  el.scrollTop = el.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text || !currentChatId) return;

  // NGワードフィルター
  const ngWords = ['馬鹿','アホ','死ね','殺す','エロ','ちんこ','まんこ','セックス','sex','カス'];
  if (ngWords.some(w => text.includes(w))) { showToast('⚠️ 不適切な表現が含まれているため送信できません'); input.value = ''; return; }

  const thread = CHAT_THREADS.find(t => t.id === currentChatId);
  if (!thread) return;
  const now = new Date();
  const timeStr = `本日 ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  thread.messages.push({ sender: 'me', text, time: timeStr });
  input.value = '';
  renderMessages(thread);

  setTimeout(() => {
    let reply = '承知いたしました。確認のうえ、スタッフより改めてご連絡させていただきます😊';
    if (text.includes('予約') || text.includes('キャンセル') || text.includes('変更')) reply = '予約に関するご連絡ありがとうございます。スケジュールの確認をしてお返事いたしますね。お急ぎの場合はフロントまでお電話くださいませ。';
    else if (text.includes('痛') || text.includes('違和感') || text.includes('きつい') || text.includes('辛い')) reply = 'お体の具合が心配ですね…。決して無理はなさらないでください。次回の運動時は少し負荷を下げて様子を見ましょう。痛みが続くようでしたらスタッフにご相談くださいね。';
    else if (text.includes('ありがとう') || text.includes('お世話')) reply = 'こちらこそ、いつもありがとうございます！引き続き、ご自身のペースで無理なく楽しく続けていきましょう💪';
    else if (text.includes('休') || text.includes('遅れ') || text.includes('欠席')) reply = 'ご連絡ありがとうございます、承知いたしました。お気をつけてお過ごしください。また次回元気なお顔を拝見できるのをお待ちしております！';
    else if (text.includes('こんにちは') || text.includes('おはよう') || text.includes('こんばんは')) reply = 'こんにちは！本日のご体調はいかがですか？マイページの「体調記録」から日々の状態を入力していただけると、私たちもサポートしやすくなります！';
    thread.messages.push({ sender: 'them', text: reply, time: timeStr });
    if (currentChatId === thread.id) renderMessages(thread);
  }, 1500);
}

// ===== Notifications =====
function renderNotifications() {
  document.getElementById('notif-list').innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-item ${n.unread ? 'unread' : ''}">
      <div class="notif-icon">${n.icon}</div>
      <div class="notif-content"><div class="notif-title">${n.title}</div><div class="notif-body">${n.body}</div><div class="notif-time">${n.time}</div></div>
    </div>`).join('');
}

function updateNotifBadge() {
  const total = CHAT_THREADS.reduce((s,t) => s + t.unread, 0) + NOTIFICATIONS.filter(n => n.unread).length;
  const badge = document.getElementById('notif-badge');
  badge.textContent = total;
  badge.style.display = total === 0 ? 'none' : 'inline';
}

// ===== Vital Simulation =====
function startVitalSimulation() {
  setInterval(() => {
    USER.hr = Math.max(55, Math.min(110, USER.hr + Math.round((Math.random() - 0.5) * 4)));
    USER.spo2 = Math.max(93, Math.min(100, USER.spo2 + (Math.random() < 0.2 ? (Math.random() < 0.5 ? -1 : 1) : 0)));
    document.getElementById('home-hr').textContent = USER.hr;
    document.getElementById('home-spo2').textContent = USER.spo2;
    const st = document.getElementById('home-hr-status');
    if (USER.hr > 100) { st.textContent = '⚠ やや高め'; st.className = 'vc-status caution'; }
    else { st.textContent = '● 正常範囲'; st.className = 'vc-status normal'; }
  }, 4000);
}

// ===== Toast =====
function showToast(msg) {
  const ex = document.querySelector('.toast'); if (ex) ex.remove();
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// ===== Events =====
function bindEvents() {
  // Logout
  document.getElementById('btn-logout').addEventListener('click', () => {
    document.getElementById('app-layout').classList.add('hidden');
    const ls = document.getElementById('login-screen');
    ls.classList.remove('hidden', 'fade-out');
    const btn = document.getElementById('login-btn');
    btn.classList.remove('loading'); btn.textContent = 'ログイン';
    document.getElementById('login-id').value = 'VC-00001';
    document.getElementById('login-password').value = 'demo1234';
  });

  // Sidebar Nav
  document.querySelectorAll('.sb-nav-item').forEach(btn => {
    btn.addEventListener('click', () => navigateTo(btn.dataset.page));
  });

  // Top Notif
  document.getElementById('btn-notif-top').addEventListener('click', () => {
    navigateTo('notif');
    NOTIFICATIONS.forEach(n => n.unread = false);
    updateNotifBadge();
    renderNotifications();
  });

  // Chart tabs
  document.querySelectorAll('.chart-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.chart-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderHRChart();
    });
  });

  // Booking slots
  document.getElementById('slot-grid').addEventListener('click', (e) => {
    const btn = e.target.closest('.slot-btn');
    if (btn && !btn.classList.contains('unavailable')) { selectedSlot = btn.dataset.slot; renderSlots(); }
  });

  document.getElementById('booking-date').addEventListener('change', () => { selectedSlot = null; renderSlots(); });

  // Book
  document.getElementById('btn-book').addEventListener('click', () => {
    const prog = document.getElementById('booking-program').value;
    if (!prog) { showToast('プログラムを選択してください'); return; }
    if (!selectedSlot) { showToast('時間帯を選択してください'); return; }
    const names = { pool:'水中ウォーキング', machine:'マシントレーニング', pt:'PT個別指導', yoga:'チェアヨガ', aqua:'アクアビクス', rehab:'リハビリ' };
    const d = new Date(document.getElementById('booking-date').value);
    const ds = `${d.getMonth()+1}月${d.getDate()}日`;
    UPCOMING_BOOKINGS.push({ date: ds, time: selectedSlot, title: names[prog], status: '確定' });
    renderBookings();
    selectedSlot = null;
    document.getElementById('booking-program').value = '';
    renderSlots();
    showToast(`✅ ${ds} ${selectedSlot || ''} の予約が完了しました！`);
  });

  // Mood
  document.getElementById('mood-grid').addEventListener('click', (e) => {
    const opt = e.target.closest('.condition-option');
    if (!opt) return;
    document.querySelectorAll('.condition-option').forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    selectedMood = opt.dataset.mood;
  });

  // Pain
  document.getElementById('pain-slider').addEventListener('input', (e) => {
    document.getElementById('pain-value').textContent = e.target.value;
  });

  // Save condition
  document.getElementById('btn-save-condition').addEventListener('click', () => {
    if (!selectedMood) { showToast('気分を選択してください'); return; }
    USER.weight = parseFloat(document.getElementById('cond-weight').value) || USER.weight;
    document.getElementById('home-weight').textContent = USER.weight;
    showToast('✅ 本日の体調記録を保存しました！');
    selectedMood = null;
    document.querySelectorAll('.condition-option').forEach(o => o.classList.remove('selected'));
    document.getElementById('pain-slider').value = 1;
    document.getElementById('pain-value').textContent = '1';
    document.getElementById('cond-memo').value = '';
  });

  // Chat list
  document.getElementById('chat-list').addEventListener('click', (e) => {
    const thread = e.target.closest('.chat-thread');
    if (thread) openChat(parseInt(thread.dataset.chatId));
  });

  // Chat send
  document.getElementById('btn-chat-send').addEventListener('click', sendMessage);
  document.getElementById('chat-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
  });
}
