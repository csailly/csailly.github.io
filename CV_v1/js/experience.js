(function () {
  fetch('./data/experience.json', {
    cache: 'no-store',
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderExperience(data);
    });

  function renderExperience(data) {
    var article = document.getElementById('experience');
    if (!article) return;

    var header = document.createElement('header');
    header.innerHTML =
      '<em class="fa fa-industry"></em>' +
      '<span>Expériences</span>' +
      '<div class="quote">' +
      '<em class="fa fa-quote-left"></em>' +
      escapeHtml(data.quote.text) +
      '<em class="fa fa-quote-right"></em>' +
      '<span>' +
      escapeHtml(data.quote.author) +
      '</span>' +
      '</div>';
    article.appendChild(header);

    data.assignments.forEach(function (assignment) {
      article.appendChild(renderAssignment(assignment));
    });
  }

  function renderAssignment(assignment) {
    var section = document.createElement('section');
    section.className = 'assignment';

    var header = document.createElement('header');
    header.innerHTML =
      '<span class="badge">' +
      escapeHtml(assignment.badge) +
      '</span>' +
      '<h2 class="label">' +
      escapeHtml(assignment.label) +
      '</h2>';
    section.appendChild(header);

    if (assignment.tags && assignment.tags.length > 0) {
      var tagsSection = document.createElement('section');
      tagsSection.className = 'tags';
      tagsSection.innerHTML = assignment.tags
        .map(function (t) {
          return '<span>' + escapeHtml(t) + '</span>';
        })
        .join('\n');
      section.appendChild(tagsSection);
    }

    if (assignment.descriptionLines && assignment.descriptionLines.length > 0) {
      var descSection = document.createElement('section');
      assignment.descriptionLines.forEach(function (line) {
        var p = document.createElement('p');
        p.textContent = line;
        descSection.appendChild(p);
      });
      section.appendChild(descSection);
    }

    if (assignment.projects && assignment.projects.length > 0) {
      var projectsSection = document.createElement('section');
      projectsSection.className = 'projects';
      var ul = document.createElement('ul');
      assignment.projects.forEach(function (project) {
        ul.appendChild(renderProject(project));
      });
      projectsSection.appendChild(ul);
      section.appendChild(projectsSection);
    }

    return section;
  }

  function renderProject(project) {
    var li = document.createElement('li');
    li.className = 'project';

    var labelDiv = document.createElement('div');
    labelDiv.className = 'project-label';
    labelDiv.innerHTML =
      '<em class="fa fa-gear"></em>' +
      ' <span class="project-name">' +
      escapeHtml(project.name) +
      '</span>' +
      ' — ' +
      '<span class="project-description-small">' +
      escapeHtml(project.description) +
      '</span>';
    li.appendChild(labelDiv);

    if (project.tags && project.tags.length > 0) {
      var tagsDiv = document.createElement('div');
      tagsDiv.className = 'tags';
      tagsDiv.innerHTML = project.tags
        .map(function (t) {
          return '<span>' + escapeHtml(t) + '</span>';
        })
        .join('\n');
      li.appendChild(tagsDiv);
    }

    if (project.intro) {
      li.appendChild(document.createTextNode(project.intro));
    }

    if (project.tasks && project.tasks.length > 0) {
      var taskUl = document.createElement('ul');
      project.tasks.forEach(function (task) {
        var taskLi = document.createElement('li');
        taskLi.innerHTML = '<em class="fa fa-circle"></em> ' + escapeHtml(task);
        taskUl.appendChild(taskLi);
      });
      li.appendChild(taskUl);
    }

    return li;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
})();
