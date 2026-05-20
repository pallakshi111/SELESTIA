const safeJson = (key, fallback = []) => {
  try { return JSON.parse(localStorage.getItem(key) || 'null') || fallback; }
  catch { return fallback; }
};
const number = (key) => Number(localStorage.getItem(key) || 0);
const getProfile = () => { try { return JSON.parse(localStorage.getItem('selestiaProfile') || 'null'); } catch { return null; } };
const showAuthNotice = (profile) => {
  const notice = document.querySelector('#xpAuthNotice');
  if (notice) notice.hidden = Boolean(profile);
  document.body.classList.toggle('no-profile', !profile);
};
const fmtMinutes = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return minutes + 'm';
  const hours = Math.floor(minutes / 60);
  return hours + 'h ' + (minutes % 60) + 'm';
};
const rankForLevel = (level) => {
  if (level >= 10) return 'Star Architect';
  if (level >= 6) return 'Celestial Pro';
  if (level >= 3) return 'Rising Navigator';
  return 'New Explorer';
};
const calcXp = () => {
  const gamingXp = number('selestiaXP');
  const gamingWins = number('selestiaWins');
  const focusSeconds = number('selestiaStudyFocusedSeconds');
  const focusMinutes = Math.floor(focusSeconds / 60);
  const musicQueue = safeJson('selestiaMusicQueue').length;
  const musicPlaylists = safeJson('selestiaMusicPlaylists').length;
  const communityPosts = safeJson('selestiaCommunityPosts').length;
  const techXp = number('selestiaTechXP');
  const techProjects = safeJson('selestiaTechProjects').length;
  const techTasks = safeJson('selestiaTechTasks').filter((task) => task.status === 'done').length;
  const artXp = number('selestiaArtXP');
  const artCompleted = safeJson('selestiaArtCompleted').length;
  const studyXp = focusMinutes * 2;
  const musicXp = (musicQueue * 3) + (musicPlaylists * 15);
  const communityXp = communityPosts * 15;
  const totalXp = gamingXp + studyXp + musicXp + communityXp + techXp + artXp;
  const level = Math.floor(totalXp / 100) + 1;
  const levelXp = totalXp % 100;
  return { gamingXp, gamingWins, focusSeconds, focusMinutes, musicQueue, musicPlaylists, studyXp, musicXp, communityXp, communityPosts, techXp, techProjects, techTasks, artXp, artCompleted, totalXp, level, levelXp };
};
const setText = (id, value) => { document.querySelector('#' + id).textContent = value; };
const renderLocked = () => {
  setText('xpLevel', '--');
  setText('rankTitle', 'Login Required');
  setText('totalXp', 'Login to sync XP');
  setText('nextLevel', 'No live profile connected');
  setText('ringPercent', '--');
  document.querySelector('#xpFill').style.width = '0%';
  document.querySelector('.mini-ring').style.setProperty('--ring', '0%');
  document.querySelector('#breakdownGrid').innerHTML = ['Gaming', 'Study', 'Music', 'Community', 'Tech', 'Art'].map((label) => '<div class="break-card locked-stat"><span>' + label + '</span><strong>Login</strong></div>').join('');
  document.querySelector('#levelLadder').innerHTML = '<div class="ladder-row"><div><strong>Locked</strong><span> Personal levels unlock after login</span></div><span>Live only</span></div>';
  document.querySelector('#activityList').innerHTML = '<div class="activity-row"><span>Login to connect your live XP sources.</span><strong>Locked</strong></div>';
};
const renderLive = () => {
  const data = calcXp();
  const nextAmount = 100 - data.levelXp;
  setText('xpLevel', data.level);
  setText('rankTitle', rankForLevel(data.level));
  setText('totalXp', data.totalXp + ' XP');
  setText('nextLevel', nextAmount + ' XP to Level ' + (data.level + 1));
  setText('ringPercent', data.levelXp + '%');
  document.querySelector('#xpFill').style.width = data.levelXp + '%';
  document.querySelector('.mini-ring').style.setProperty('--ring', data.levelXp + '%');
  const breakdown = [['Gaming', data.gamingXp + ' XP'], ['Study', data.studyXp + ' XP'], ['Music', data.musicXp + ' XP'], ['Community', data.communityXp + ' XP'], ['Tech', data.techXp + ' XP'], ['Art', data.artXp + ' XP']];
  document.querySelector('#breakdownGrid').innerHTML = breakdown.map(([label, value]) => '<div class="break-card"><span>' + label + '</span><strong>' + value + '</strong></div>').join('');
  const ladder = [[1, 'New Explorer', 'Start your Selestia identity'], [3, 'Rising Navigator', 'Build steady activity'], [6, 'Celestial Pro', 'Become a strong space member'], [10, 'Star Architect', 'Master your digital universe']];
  document.querySelector('#levelLadder').innerHTML = ladder.map(([level, title, text]) => {
    const active = data.level >= level ? ' active' : '';
    return '<div class="ladder-row' + active + '"><div><strong>Level ' + level + '</strong><span> ' + title + '</span></div><span>' + text + '</span></div>';
  }).join('');
  const activity = [['Gaming wins', data.gamingWins], ['Focused study time', fmtMinutes(data.focusSeconds)], ['Songs in queue', data.musicQueue], ['Saved playlists', data.musicPlaylists], ['Community posts', data.communityPosts], ['Tech projects', data.techProjects], ['Tech tasks done', data.techTasks], ['Art completed', data.artCompleted]];
  document.querySelector('#activityList').innerHTML = activity.map(([label, value]) => '<div class="activity-row"><span>' + label + '</span><strong>' + value + '</strong></div>').join('');
};
const render = () => {
  const profile = getProfile();
  showAuthNotice(profile);
  if (!profile) {
    renderLocked();
    return;
  }
  renderLive();
};
document.querySelector('#refreshXp').addEventListener('click', render);
const startLiveXpSync = () => {
  let lastSnapshot = '';
  const watchedKeys = ['selestiaProfile','selestiaXP','selestiaWins','selestiaStudyFocusedSeconds','selestiaMusicQueue','selestiaMusicPlaylists','selestiaCommunityPosts','selestiaTechXP','selestiaTechProjects','selestiaTechTasks','selestiaTechResources','selestiaTechSprintSeconds','selestiaArtXP','selestiaArtCompleted','selestiaArtFreeCanvas'];
  const snapshot = () => watchedKeys.map((key) => key + ':' + (localStorage.getItem(key) || '')).join('|');
  const sync = () => {
    const nextSnapshot = snapshot();
    if (nextSnapshot === lastSnapshot) return;
    lastSnapshot = nextSnapshot;
    render();
  };
  sync();
  setInterval(sync, 1000);
  window.addEventListener('storage', sync);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) sync(); });
};
startLiveXpSync();
