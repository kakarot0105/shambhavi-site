(function () {
  const { useState, useEffect, useRef } = React;

  function FloorPlan() {
    const [open, setOpen] = useState(false);
    const [hasImage, setHasImage] = useState(null);
    const [showEmbed, setShowEmbed] = useState(false);
    const tsRef = useRef(Date.now());
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    useEffect(() => {
      if (!open || hasImage !== null) return;
      tsRef.current = Date.now();
      const img = new Image();
      img.onload = () => setHasImage(true);
      img.onerror = () => setHasImage(false);
      img.src = `images/floorplan1.png?v=${tsRef.current}`;
    }, [open, hasImage]);

    let preview = null;
    if (hasImage === true) {
      preview = React.createElement('img', {
        src: `images/floorplan1.png?v=${tsRef.current}`,
        alt: 'Floor plan preview',
        loading: 'lazy',
        decoding: 'async'
      });
    } else if (hasImage === false) {
      preview = React.createElement(
        'p',
        { className: 'floorplan-message' },
        'Preview coming soon'
      );
    }

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(
        'button',
        {
          className: 'collapsible-toggle',
          'aria-expanded': open,
          'aria-controls': 'floorplan-content',
          onClick: () => setOpen(!open)
        },
        open ? 'Hide Floor Plan' : 'Show Floor Plan'
      ),
      React.createElement(
        'div',
        {
          id: 'floorplan-content',
          className:
            'collapsible-content floorplan-wrapper' + (open ? ' open' : ' hidden')
        },
        React.createElement('div', { className: 'floorplan-viewer' }, preview),
        React.createElement(
          'div',
          { className: 'floorplan-actions' },
          React.createElement(
            'a',
            {
              href: 'floorplan/JGD-Floorplan.pdf',
              target: '_blank',
              rel: 'noopener',
              type: 'application/pdf'
            },
            'Open Floor Plan (PDF)'
          ),
          React.createElement(
            'a',
            Object.assign(
              {
                href: 'floorplan/JGD-Floorplan.pdf',
                target: '_blank',
                rel: 'noopener',
                type: 'application/pdf'
              },
              isIOS ? {} : { download: 'JGD-Floorplan.pdf' }
            ),
            'Download PDF'
          ),
          React.createElement(
            'button',
            {
              className: 'btn btn-ghost floorplan-inline-btn',
              onClick: () => setShowEmbed(true)
            },
            'Open Inline Viewer'
          )
        ),
        showEmbed
          ? React.createElement('object', {
              className: 'floorplan-embed',
              type: 'application/pdf',
              data: 'floorplan/JGD-Floorplan.pdf'
            })
          : null
      )
    );
  }

  const root = document.getElementById('floorplan-root');
  if (root) {
    ReactDOM.render(React.createElement(FloorPlan), root);
  }
})();

