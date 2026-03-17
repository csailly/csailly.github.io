(() => {
  const escapeHtml = (str) =>
    String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');

  const renderTags = (tags) =>
    tags.map((t) => `<span>${escapeHtml(t)}</span>`).join('');

  const renderProject = (project) => {
    const tagsHtml =
      project.tags?.length > 0
        ? `<div class="tags">${renderTags(project.tags)}</div>`
        : '';

    const introHtml = project.intro
      ? `<p>${escapeHtml(project.intro)}</p>`
      : '';

    const tasksHtml =
      project.tasks?.length > 0
        ? `<ul>${project.tasks
            .map(
              (task) =>
                `<li><i class="fa-solid fa-circle"></i> ${escapeHtml(task)}</li>`
            )
            .join('')}</ul>`
        : '';

    return `
      <li class="project">
        <div class="project-label">
          <i class="fa-solid fa-gear"></i>
          <span class="project-name">${escapeHtml(project.name)}</span>
          — <span class="project-description-small">${escapeHtml(project.description)}</span>
        </div>
        ${tagsHtml}
        ${introHtml}
        ${tasksHtml}
      </li>`;
  };

  const renderAssignment = (assignment) => {
    const tagsHtml =
      assignment.tags?.length > 0
        ? `<section class="tags">${renderTags(assignment.tags)}</section>`
        : '';

    const descHtml =
      assignment.descriptionLines?.length > 0
        ? `<section>${assignment.descriptionLines
            .map((line) => `<p>${escapeHtml(line)}</p>`)
            .join('')}</section>`
        : '';

    const projectsHtml =
      assignment.projects?.length > 0
        ? `<section class="projects"><ul>${assignment.projects
            .map(renderProject)
            .join('')}</ul></section>`
        : '';

    return `
      <section class="assignment animate-on-scroll">
        <header>
          <span class="badge">${escapeHtml(assignment.badge)}</span>
          <h2 class="label">${escapeHtml(assignment.label)}</h2>
        </header>
        ${tagsHtml}
        ${descHtml}
        ${projectsHtml}
      </section>`;
  };

  const renderExperience = (data) => {
    const article = document.getElementById('experience');
    if (!article) return;

    const headerHtml = `
      <header>
        <i class="fa-solid fa-briefcase"></i>
        <span>Expériences</span>
        <div class="quote">
          <i class="fa-solid fa-quote-left"></i>
          ${escapeHtml(data.quote.text)}
          <i class="fa-solid fa-quote-right"></i>
          <span>${escapeHtml(data.quote.author)}</span>
        </div>
      </header>`;

    const assignmentsHtml = data.assignments.map(renderAssignment).join('');

    article.innerHTML = headerHtml + assignmentsHtml;

    // Re-observe newly added elements for scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    article.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });
  };

  fetch('./data/experience.json', { cache: 'no-store' })
    .then((response) => response.json())
    .then(renderExperience);
})();
