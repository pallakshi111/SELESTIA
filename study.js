const friendInput = document.querySelector('#friendInput');
const inviteButton = document.querySelector('#inviteButton');
const inviteStatus = document.querySelector('#inviteStatus');
const videoGrid = document.querySelector('#videoGrid');
const topicInput = document.querySelector('#topicInput');
const focusInput = document.querySelector('#focusInput');
const breakInput = document.querySelector('#breakInput');
const timerDisplay = document.querySelector('#timerDisplay');
const timerProgress = document.querySelector('#timerProgress');
const phaseLabel = document.querySelector('#phaseLabel');
const timerState = document.querySelector('#timerState');
const startButton = document.querySelector('#startButton');
const pauseButton = document.querySelector('#pauseButton');
const resetButton = document.querySelector('#resetButton');
const todayMinutes = document.querySelector('#todayMinutes');
const goalInput = document.querySelector('#goalInput');
const goalButton = document.querySelector('#goalButton');
const goalList = document.querySelector('#goalList');
const goalCount = document.querySelector('#goalCount');
const chatFeed = document.querySelector('#chatFeed');
const messageInput = document.querySelector('#messageInput');
const sendButton = document.querySelector('#sendButton');
const dailyQuoteText = document.querySelector('#dailyQuoteText');
const dailyQuoteAuthor = document.querySelector('#dailyQuoteAuthor');
const quoteStatus = document.querySelector('#quoteStatus');
const refreshQuote = document.querySelector('#refreshQuote');

let timerId = null;
let mode = 'focus';
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let focusedSeconds = Number(localStorage.getItem('selestiaStudyFocusedSeconds') || 0);

todayMinutes.textContent = Math.floor(focusedSeconds / 60) + 'm';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return minutes + ':' + secs;
};

const addMessage = (author, text) => {
  const bubble = document.createElement('div');
  bubble.className = author === 'System' ? 'message system' : 'message';
  bubble.innerHTML = author === 'System' ? text : '<strong>' + author + '</strong><span>' + text + '</span>';
  chatFeed.appendChild(bubble);
  chatFeed.scrollTop = chatFeed.scrollHeight;
};

const updateTimer = () => {
  timerDisplay.textContent = formatTime(remainingSeconds);
  const elapsed = totalSeconds - remainingSeconds;
  timerProgress.style.width = totalSeconds ? Math.max(0, Math.min(100, (elapsed / totalSeconds) * 100)) + '%' : '0%';
  phaseLabel.textContent = mode === 'focus' ? 'Focus Session' : 'Break Time';
};

const resetTimer = () => {
  clearInterval(timerId);
  timerId = null;
  mode = 'focus';
  totalSeconds = Math.max(1, Number(focusInput.value || 25)) * 60;
  remainingSeconds = totalSeconds;
  timerState.textContent = 'Idle';
  updateTimer();
};

const switchMode = () => {
  mode = mode === 'focus' ? 'break' : 'focus';
  totalSeconds = Math.max(1, Number((mode === 'focus' ? focusInput : breakInput).value || 5)) * 60;
  remainingSeconds = totalSeconds;
  timerState.textContent = mode === 'focus' ? 'Focus resumed' : 'Break started';
  addMessage('System', mode === 'focus' ? 'Break finished. Back to focus.' : 'Focus block complete. Take your break.');
  updateTimer();
};

const startTimer = () => {
  if (timerId) return;
  timerState.textContent = mode === 'focus' ? 'Studying' : 'On break';
  if (mode === 'focus' && topicInput.value.trim()) addMessage('System', 'Session started: ' + topicInput.value.trim());
  timerId = setInterval(() => {
    remainingSeconds -= 1;
    if (mode === 'focus') {
      focusedSeconds += 1;
      localStorage.setItem('selestiaStudyFocusedSeconds', focusedSeconds);
      todayMinutes.textContent = Math.floor(focusedSeconds / 60) + 'm';
    }
    if (remainingSeconds <= 0) switchMode();
    updateTimer();
  }, 1000);
};

const pauseTimer = () => {
  clearInterval(timerId);
  timerId = null;
  timerState.textContent = 'Paused';
};

const inviteFriend = () => {
  const name = friendInput.value.trim();
  if (!name) {
    inviteStatus.textContent = 'Type a friend username first.';
    return;
  }
  const tile = document.createElement('div');
  tile.className = 'video-tile';
  tile.innerHTML = '<div class="avatar">' + name.slice(0, 1).toUpperCase() + '</div><strong>' + name + '</strong><span>Invited • waiting to join</span>';
  videoGrid.appendChild(tile);
  inviteStatus.textContent = 'Invite sent to ' + name + '.';
  addMessage('System', name + ' was invited to the video room.');
  friendInput.value = '';
};

const updateGoals = () => {
  const goals = [...goalList.querySelectorAll('input[type="checkbox"]')];
  goalCount.textContent = goals.filter((goal) => goal.checked).length + ' done';
};

const addGoal = () => {
  const text = goalInput.value.trim();
  if (!text) return;
  const li = document.createElement('li');
  li.innerHTML = '<label><input type="checkbox" /> ' + text + '</label>';
  goalList.appendChild(li);
  goalInput.value = '';
  updateGoals();
};

const sendMessage = () => {
  const text = messageInput.value.trim();
  if (!text) return;
  addMessage('You', text);
  messageInput.value = '';
};

const fallbackQuote = {
  quote: 'The expert in anything was once a beginner.',
  author: 'Helen Hayes'
};

const setQuote = (quote) => {
  dailyQuoteText.textContent = quote.quote || fallbackQuote.quote;
  dailyQuoteAuthor.textContent = '— ' + (quote.author || fallbackQuote.author);
};

const loadQuote = async () => {
  if (!dailyQuoteText || !dailyQuoteAuthor || !quoteStatus) return;
  quoteStatus.textContent = 'Loading';
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error('Quote API unavailable');
    setQuote(await response.json());
    quoteStatus.textContent = 'DummyJSON';
  } catch (error) {
    setQuote(fallbackQuote);
    quoteStatus.textContent = 'Offline';
  }
};

inviteButton.addEventListener('click', inviteFriend);
friendInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') inviteFriend(); });
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
focusInput.addEventListener('change', resetTimer);
breakInput.addEventListener('change', resetTimer);
goalButton.addEventListener('click', addGoal);
goalInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') addGoal(); });
goalList.addEventListener('change', updateGoals);
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keydown', (event) => { if (event.key === 'Enter') sendMessage(); });
refreshQuote?.addEventListener('click', loadQuote);
resetTimer();
updateGoals();
loadQuote();
