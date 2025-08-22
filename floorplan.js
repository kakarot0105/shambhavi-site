(() => {
  let initialized = false;
  document.addEventListener('DOMContentLoaded', () => {
    if (initialized) return;
    initialized = true;

    const btn = document.getElementById('floorplan-toggle');
    const content = document.getElementById('floorplan-content');
    const viewer = document.getElementById('floorplan-viewer');
    if (!btn || !content || !viewer) {
      console.warn('Floor plan: required elements not found');
      return;
    }

    const pdfPath = 'floorplan/JGD-Floorplan.pdf';
    const imgPath = 'images/floorplan1.png';
    const downloadLink = content.querySelector('.btn-primary');

    function showPlaceholder() {
      viewer.textContent = 'Floor plan will be available soon.';
      if (downloadLink) {
        downloadLink.setAttribute('aria-disabled', 'true');
        downloadLink.addEventListener('click', (e) => e.preventDefault());
      }
    }

    function buildViewer() {
      const ts = Date.now();
      const img = new Image();
      img.onload = () => {
        viewer.innerHTML = '';
        const el = document.createElement('img');
        el.className = 'fp-img';
        el.src = `${imgPath}?v=${ts}`;
        el.alt = 'Floor plan preview';
        viewer.appendChild(el);
      };
      img.onerror = () => {
        fetch(`${pdfPath}?v=${ts}`, { method: 'HEAD' })
          .then((res) => {
            if (res.ok) {
              viewer.innerHTML = `
<object class="fp-embed" type="application/pdf" data="${pdfPath}#view=FitH">
  <iframe class="fp-embed" src="${pdfPath}#view=FitH" title="Floor Plan PDF Viewer"></iframe>
</object>`;
            } else {
              showPlaceholder();
            }
          })
          .catch(() => showPlaceholder());
      };
      img.src = `${imgPath}?v=${ts}`;
    }

    let loaded = false;
    function onToggle() {
      const isOpen = content.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(isOpen));
      btn.textContent = isOpen ? 'Hide Floor Plan' : 'Show Floor Plan';
      if (isOpen && !loaded) {
        buildViewer();
        loaded = true;
      }
    }

    btn.removeEventListener('click', onToggle);
    btn.addEventListener('click', onToggle);
  });
})();
