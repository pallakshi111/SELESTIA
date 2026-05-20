const selestiaSpaceProfile = (() => {
  try {
    return JSON.parse(localStorage.getItem('selestiaProfile') || 'null');
  } catch {
    return null;
  }
})();

if (!selestiaSpaceProfile) {
  alert('Please login first to open this Selestia Space.');
  sessionStorage.setItem('selestiaRedirectAfterLogin', location.pathname.split('/').pop() + location.search + location.hash);
  window.location.href = 'login.html';
  throw new Error('Selestia Space requires login.');
}
