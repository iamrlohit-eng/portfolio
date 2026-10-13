const chartData = {
  7: {
    events: '2,481',
    anomalies: '18',
    aria: 'Events reviewed rose steadily over the last seven days',
    labels: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    line: 'M0 118 C24 106 36 120 60 99 S100 82 120 92 S160 74 180 80 S218 50 240 67 S280 47 300 51 S338 28 360 40 S398 15 420 22',
    fill: 'M0 118 C24 106 36 120 60 99 S100 82 120 92 S160 74 180 80 S218 50 240 67 S280 47 300 51 S338 28 360 40 S398 15 420 22 L420 150 L0 150 Z',
    point: [420, 22]
  },
  30: {
    events: '9,764',
    anomalies: '64',
    aria: 'Events reviewed varied over the last thirty days with an overall upward trend',
    labels: ['01', '05', '10', '15', '20', '25', '30'],
    line: 'M0 91 C20 73 42 101 60 84 S98 109 120 76 S158 84 180 57 S218 81 240 48 S278 69 300 39 S338 54 360 32 S398 39 420 17',
    fill: 'M0 91 C20 73 42 101 60 84 S98 109 120 76 S158 84 180 57 S218 81 240 48 S278 69 300 39 S338 54 360 32 S398 39 420 17 L420 150 L0 150 Z',
    point: [420, 17]
  }
};

const projectDetails = {
  retail: {
    category: '01 / DATA ANALYSIS',
    title: 'Reading the retail pulse',
    summary: 'A sample-data exploration into how sales patterns might help a small retail team make more informed decisions.',
    sections: [
      ['THE QUESTION', 'Which products and time periods appear to drive the strongest changes in weekly sales?'],
      ['THE APPROACH', 'Clean a public or simulated dataset, compare weekly performance, and make assumptions visible in a compact dashboard.'],
      ['THE BUILD', 'Add your analysis notebook, visualization tool, data source, and the reasoning behind each chart here.'],
      ['THE OUTCOME', 'Replace this with a verified finding, a limitation, and what a store team could investigate next.']
    ]
  },
  prompt: {
    category: '02 / GENERATIVE AI',
    title: 'Better prompts, clearer outputs',
    summary: 'An experiment in how role, context, and constraints can make a data-summary prompt more useful and easier to evaluate.',
    sections: [
      ['THE QUESTION', 'Can a structured prompt make an AI-generated summary more specific and easier to verify?'],
      ['THE APPROACH', 'Compare prompt versions against the same sample input and define a simple rubric for clarity, evidence, and usefulness.'],
      ['THE BUILD', 'Document the model, prompt variants, test cases, scoring method, and examples of outputs, including failures.'],
      ['THE OUTCOME', 'Share observed results without overstating them; note where human review remains essential.']
    ]
  },
  security: {
    category: '03 / CYBERSECURITY',
    title: 'Following the signal',
    summary: 'A fictional threat-modeling exercise for learning how to map a request path and identify useful investigation questions.',
    sections: [
      ['THE QUESTION', 'What should an analyst examine when a fictional service records an unusual request path?'],
      ['THE APPROACH', 'Map components and trust boundaries, identify plausible threats, then list the evidence needed to investigate them.'],
      ['THE BUILD', 'Add your lab environment, safe simulation details, threat-model framework, and sanitized diagrams here.'],
      ['THE OUTCOME', 'Explain what the exercise helped you learn and what you would validate in an authorized test environment.']
    ]
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  siteNav.classList.toggle('is-open', !isOpen);
});

siteNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    siteNav.classList.remove('is-open');
  }
});

document.querySelectorAll('.range-button').forEach((button) => {
  button.addEventListener('click', () => {
    const data = chartData[button.dataset.range];
    document.querySelectorAll('.range-button').forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    document.querySelector('#metric-events').textContent = data.events;
    document.querySelector('#metric-anomalies').textContent = data.anomalies;
    document.querySelector('#chart-area').setAttribute('aria-label', data.aria);
    document.querySelector('#chart-line').setAttribute('d', data.line);
    document.querySelector('#chart-fill-path').setAttribute('d', data.fill);
    document.querySelector('#chart-point').setAttribute('cx', data.point[0]);
    document.querySelector('#chart-point').setAttribute('cy', data.point[1]);
    document.querySelector('#chart-labels').innerHTML = data.labels.map((label) => `<span>${label}</span>`).join('');
  });
});

const projectDialog = document.querySelector('#project-dialog');
const dialogDetails = document.querySelector('#dialog-details');

document.querySelectorAll('.project-open').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projectDetails[button.dataset.project];
    document.querySelector('#dialog-kicker').textContent = project.category;
    document.querySelector('#dialog-title').textContent = project.title;
    document.querySelector('#dialog-summary').textContent = project.summary;
    dialogDetails.replaceChildren(...project.sections.map(([heading, copy]) => {
      const section = document.createElement('div');
      const title = document.createElement('h3');
      const description = document.createElement('p');
      title.textContent = heading;
      description.textContent = copy;
      section.append(title, description);
      return section;
    }));
    projectDialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  if (event.target === projectDialog) projectDialog.close();
});

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');
const workCount = document.querySelector('#work-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    projectCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('is-hidden', !visible);
      if (visible) visibleCount += 1;
    });
    workCount.textContent = `SHOWING ${String(visibleCount).padStart(2, '0')} PROJECT${visibleCount === 1 ? '' : 'S'}`;
  });
});

const toast = document.querySelector('#toast');
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('is-visible');
  window.clearTimeout(toastTimeout);
  toastTimeout = window.setTimeout(() => toast.classList.remove('is-visible'), 2400);
}

document.querySelector('.copy-email').addEventListener('click', async (event) => {
  const email = event.currentTarget.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    showToast('Email address copied.');
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

document.querySelector('#contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const subject = `Portfolio inquiry from ${form.get('name')}`;
  const body = `Hi Lohith,\n\n${form.get('message')}\n\nFrom: ${form.get('name')}\nEmail: ${form.get('email')}`;
  const mailto = `mailto:hello@lohithraj.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#form-note').textContent = 'Opening your email app with the message filled in...';
  window.location.href = mailto;
});

const revealElements = document.querySelectorAll('.section-heading, .project-card, .approach-step, .about-content, .contact-copy, .contact-form');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealElements.forEach((element) => {
    element.classList.add('js-reveal');
    revealObserver.observe(element);
  });
}