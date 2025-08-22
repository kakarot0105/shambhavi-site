(() => {
  const toggle = document.getElementById('floorplan-toggle');
  const content = document.getElementById('floorplan-content');
  const viewer = document.getElementById('floorplan-viewer');
  if (!toggle || !content || !viewer) return;

  let loaded = false;
  const imgPath = 'images/floorplan1.png';
  const pdfPath = 'floorplan/JGD-Floorplan.pdf';

  function showPlaceholder() {
    viewer.textContent = 'Floor plan will be available soon.';
  }

  function loadViewer() {
    const ts = Date.now();
    const img = new Image();
    img.onload = () => {
      viewer.innerHTML = `<img class="fp-img" src="${imgPath}?v=${ts}" alt="Floor plan preview">`;
    };
    img.onerror = () => {
      fetch(`${pdfPath}?v=${ts}`, { method: 'HEAD' })
        .then((res) => {
          if (res.ok) {
            viewer.innerHTML = `
<object class="fp-embed" data="${pdfPath}#view=FitH" type="application/pdf">
  <iframe class="fp-embed" src="${pdfPath}#view=FitH" title="Floor Plan PDF"></iframe>
</object>`;
          } else {
            showPlaceholder();
          }
        })
        .catch(() => showPlaceholder());
    };
    img.src = `${imgPath}?v=${ts}`;
  }

  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    toggle.textContent = expanded ? 'Show Floor Plan' : 'Hide Floor Plan';
    if (expanded) {
      content.classList.remove('open');
      content.classList.add('hidden');
    } else {
      content.classList.remove('hidden');
      content.classList.add('open');
      if (!loaded) {
        loadViewer();
        loaded = true;
      }
    }
  });
})();
