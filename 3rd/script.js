const menuButton = document.querySelector('.menu-toggle');
const menuPanel = document.querySelector('.menu-panel');
const closeMenu = document.querySelector('.menu-close');
const searchButton = document.querySelector('.search-toggle');
const searchPanel = document.querySelector('.search-panel');
const searchInput = document.querySelector('#site-search');
const desktopSearchInput = document.querySelector('#desktop-search-input');
const articleCards = [...document.querySelectorAll('.article-card')];
const noResults = document.querySelector('.no-results');

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menuPanel.hidden = !open;
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
closeMenu.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
    searchPanel.hidden = true;
    searchButton.setAttribute('aria-expanded', 'false');
  }
});

searchButton.addEventListener('click', () => {
  const open = searchPanel.hidden;
  searchPanel.hidden = !open;
  searchButton.setAttribute('aria-expanded', String(open));
  if (open) searchInput.focus();
});

function filterArticles(value) {
  const query = value.trim().toLocaleLowerCase();
  let visibleCount = 0;
  articleCards.forEach((card) => {
    const match = card.textContent.toLocaleLowerCase().includes(query);
    card.hidden = !match;
    if (match) visibleCount += 1;
  });
  noResults.hidden = visibleCount > 0;
}
searchInput.addEventListener('input', () => filterArticles(searchInput.value));
desktopSearchInput.addEventListener('input', () => filterArticles(desktopSearchInput.value));
document.querySelector('.search-panel').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#articles-heading').scrollIntoView({ behavior: 'smooth' });
});
document.querySelector('.desktop-search').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#articles-heading').scrollIntoView({ behavior: 'smooth' });
});

document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#subscribe-form').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#subscribe-note').textContent = 'Preview only: connect the Vox Legis mailing list service to enable subscriptions.';
});
