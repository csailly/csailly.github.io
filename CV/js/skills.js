(function () {
  fetch('./data/skills.json', {
    cache: 'no-store',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderSkills(data);
    });

  function renderSkills(data) {
    var article = document.getElementById('skills');
    if (!article) return;

    var header = document.createElement('header');
    header.innerHTML =
      '<em class="fa fa-code"></em>' +
      '<span>Compétences</span>' +
      '<div class="quote">' +
      '<em class="fa fa-quote-left"></em>' +
      escapeHtml(data.quote.text) +
      '<em class="fa fa-quote-right"></em>' +
      '<span>' +
      escapeHtml(data.quote.author) +
      '</span>' +
      '</div>';
    article.appendChild(header);

    data.sections.forEach(function (skillSection) {
      var section = document.createElement('section');
      section.className = 'skill-section';

      var sectionHeader = document.createElement('header');
      sectionHeader.className = 'skill-section-label';
      sectionHeader.textContent = skillSection.label;
      section.appendChild(sectionHeader);

      section.appendChild(
        document.createTextNode(skillSection.items.join(', ')),
      );

      article.appendChild(section);
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
})();
