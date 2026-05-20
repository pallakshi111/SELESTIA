const form = document.querySelector('#profileForm');
const avatarSelect = document.querySelector('[data-avatar-select]');
const avatarTrigger = document.querySelector('#avatarTrigger');
const avatarMenu = document.querySelector('#avatarMenu');
const avatarInput = document.querySelector('#avatar');
const selectedAvatarIcon = document.querySelector('#selectedAvatarIcon');
const selectedAvatarLabel = document.querySelector('#selectedAvatarLabel');
const bioInput = document.querySelector('#bio');
const bioCount = document.querySelector('#bioCount');
const avatarStatus = document.querySelector('#avatarStatus');
const fields = {
  username: { input: document.querySelector('#username'), error: document.querySelector('#usernameError') },
  bio: { input: bioInput, error: document.querySelector('#bioError') },
  avatar: { input: avatarInput, error: document.querySelector('#avatarError'), wrapper: avatarSelect },
  aura: { error: document.querySelector('#colorError') },
  world: { error: document.querySelector('#worldError') }
};
const setError = (field, message) => {
  const config = fields[field];
  const wrapper = config.wrapper || config.input?.closest('.avatar-field') || config.error.closest('.avatar-field');
  config.error.textContent = message;
  wrapper.classList.toggle('has-error', Boolean(message));
  if (config.input) config.input.setAttribute('aria-invalid', String(Boolean(message)));
};
const getCheckedValue = (name) => form.querySelector('input[name="' + name + '"]:checked')?.value || '';
const validateUsername = () => {
  const value = fields.username.input.value.trim();
  if (!value) return setError('username', 'Please enter a username.'), false;
  if (value.length < 3) return setError('username', 'Username must be at least 3 characters.'), false;
  if (!/^[a-zA-Z0-9_]+$/.test(value)) return setError('username', 'Use only letters, numbers, and underscores.'), false;
  setError('username', '');
  return true;
};
const validateBio = () => fields.bio.input.value.length > 140 ? (setError('bio', 'Bio must be 140 characters or fewer.'), false) : (setError('bio', ''), true);
const validateAvatar = () => fields.avatar.input.value ? (setError('avatar', ''), true) : (setError('avatar', 'Choose an avatar.'), false);
const validateAura = () => getCheckedValue('aura') ? (setError('aura', ''), true) : (setError('aura', 'Choose an aura color.'), false);
const validateWorld = () => {
  if (!getCheckedValue('world')) {
    const firstWorld = form.querySelector('input[name="world"]');
    if (firstWorld) firstWorld.checked = true;
  }
  return getCheckedValue('world') ? (setError('world', ''), true) : (setError('world', 'Choose a starting world.'), false);
};
const validators = [validateUsername, validateBio, validateAvatar, validateAura, validateWorld];
const updateSubmitText = () => {
  const selected = getCheckedValue('world') || 'gaming';
  const label = selected.charAt(0).toUpperCase() + selected.slice(1);
  document.querySelector('.avatar-submit').textContent = 'Enter ' + label + ' Space →';
};
updateSubmitText();
const closeAvatarMenu = () => { avatarSelect.classList.remove('is-open'); avatarTrigger.setAttribute('aria-expanded', 'false'); };
const openAvatarMenu = () => { avatarSelect.classList.add('is-open'); avatarTrigger.setAttribute('aria-expanded', 'true'); };
const selectAvatar = (option) => {
  const label = option.textContent.trim().replace(option.dataset.icon, '').trim();
  avatarMenu.querySelectorAll('[role="option"]').forEach((item) => item.setAttribute('aria-selected', String(item === option)));
  avatarInput.value = option.dataset.value;
  selectedAvatarIcon.textContent = option.dataset.icon;
  selectedAvatarLabel.textContent = label;
  if (avatarStatus) avatarStatus.textContent = label + ' avatar chosen.';
  validateAvatar();
  closeAvatarMenu();
};
avatarTrigger.addEventListener('click', () => avatarSelect.classList.contains('is-open') ? closeAvatarMenu() : openAvatarMenu());
avatarMenu.addEventListener('click', (event) => {
  const option = event.target.closest('[role="option"]');
  if (option) selectAvatar(option);
});
document.addEventListener('click', (event) => { if (!avatarSelect.contains(event.target)) closeAvatarMenu(); });
fields.username.input.addEventListener('input', validateUsername);
bioInput.addEventListener('input', () => { bioCount.textContent = bioInput.value.length; validateBio(); });
form.querySelectorAll('input[name="aura"]').forEach((input) => input.addEventListener('change', validateAura));
form.querySelectorAll('input[name="world"]').forEach((input) => input.addEventListener('change', () => { validateWorld(); updateSubmitText(); }));
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = validators.map((validate) => validate()).every(Boolean);
  if (!isValid) {
    form.querySelector('.has-error input, .has-error textarea, .has-error button')?.focus();
    return;
  }
  const world = getCheckedValue('world');
  const profile = {
    username: fields.username.input.value.trim(),
    bio: fields.bio.input.value.trim(),
    avatar: fields.avatar.input.value,
    avatarIcon: selectedAvatarIcon.textContent,
    avatarLabel: selectedAvatarLabel.textContent,
    aura: getCheckedValue('aura'),
    world,
    createdAt: new Date().toISOString()
  };
  try {
    localStorage.setItem('selestiaProfile', JSON.stringify(profile));
  } catch (error) {
    console.warn('Profile could not be saved locally, continuing to selected space.');
  }
  const redirectTarget = sessionStorage.getItem('selestiaRedirectAfterLogin');
  if (redirectTarget) sessionStorage.removeItem('selestiaRedirectAfterLogin');
  window.location.href = redirectTarget || 'index.html#spaces';
});
