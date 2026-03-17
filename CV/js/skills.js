(() => {
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const renderSkills = (data) => {
    const article = document.getElementById('skills');
    if (!article) return;

    const headerHtml = `
      <header>
        <i class="fa-solid fa-code"></i>
        <span>Compétences</span>
        <div class="quote">
          <i class="fa-solid fa-quote-left"></i>
          ${escapeHtml(data.quote.text)}
          <i class="fa-solid fa-quote-right"></i>
          <span>${escapeHtml(data.quote.author)}</span>
        </div>
      </header>`;

    const sectionsHtml = data.sections
      .map(
        (section) => `
        <section class="skill-section">
          <header class="skill-section-label">${escapeHtml(section.label)}</header>
          <div class="skill-pills">
            ${section.items.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
          </div>
        </section>`
      )
      .join('');

    article.innerHTML = headerHtml + sectionsHtml;
  };

  fetch('./data/skills.json', { cache: 'no-store' })
    .then((response) => response.json())
    .then(renderSkills);
})();
