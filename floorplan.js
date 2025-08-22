(function () {
  const { useState, useEffect, useRef } = React;

  function FloorPlan() {
    const [open, setOpen] = useState(false);
    const [hasImage, setHasImage] = useState(null);
    const [pdfOk, setPdfOk] = useState(null);
    const tsRef = useRef(Date.now());
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    useEffect(() => {
      if (!open) return;
      tsRef.current = Date.now();

      if (hasImage === null) {
        const img = new Image();
        img.onload = () => setHasImage(true);
        img.onerror = () => setHasImage(false);
        img.src = `images/floorplan1.png?v=${tsRef.current}`;
      }

      if (pdfOk === null) {
        fetch(`floorplan/JGD-Floorplan.pdf?v=${tsRef.current}`, { method: 'HEAD' })
          .then((res) => setPdfOk(res.ok))
          .catch(() => setPdfOk(false));
      }
    }, [open, hasImage, pdfOk]);

    const isMobile = window.matchMedia('(max-width: 640px)').matches;

    let viewer = null;
    if (isMobile && hasImage === null) {
      viewer = React.createElement('div', { className: 'fp-skeleton' });
    } else if (isMobile && hasImage) {
      viewer = React.createElement('img', {
        src: `images/floorplan1.png?v=${tsRef.current}`,
        alt: 'Floor plan preview',
        decoding: 'async',
        loading: 'lazy',
        style: {
          width: '100%',
          height: 'auto',
          borderRadius: '12px',
          border: '1px solid #ddd',
          background: '#fff'
        }
      });
    } else if (pdfOk) {
      viewer = React.createElement(
        'object',
        {
          className: 'floorplan-embed',
          data: 'floorplan/JGD-Floorplan.pdf#view=FitH',
          type: 'application/pdf',
          'aria-label': 'Floor Plan PDF Viewer'
        },
        React.createElement('iframe', {
          className: 'floorplan-embed',
          src: 'floorplan/JGD-Floorplan.pdf#view=FitH',
          title: 'Floor Plan PDF Viewer'
        })
      );
    }

    if (!viewer && pdfOk === false && (!isMobile || hasImage === false)) {
      viewer = React.createElement(
        'p',
        { className: 'floorplan-message' },
        'Floor plan file will be available soon.'
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
          className: 'collapsible-content' + (open ? ' open' : ' hidden')
        },
        open
          ? React.createElement(
              'div',
              {
                className: 'floorplan-card',
                role: 'region',
                'aria-label': 'Floor Plan Viewer'
              },
              React.createElement(
                'div',
                { className: 'floorplan-toolbar' },
                React.createElement('div', { className: 'fp-title' }, 'Floor Plan'),
                React.createElement(
                  'div',
                  { className: 'fp-actions' },
                  React.createElement(
                    'a',
                    {
                      className: 'btn btn-ghost',
                      href: 'floorplan/JGD-Floorplan.pdf',
                      target: '_blank',
                      rel: 'noopener'
                    },
                    'Open Full PDF'
                  ),
                  React.createElement(
                    'a',
                    Object.assign(
                      {
                        className: 'btn btn-primary',
                        href: 'floorplan/JGD-Floorplan.pdf'
                      },
                      isIOS ? {} : { download: '' }
                    ),
                    'Download PDF'
                  )
                )
              ),
              viewer
            )
          : null
      )
    );
  }

  const root = document.getElementById('floorplan-root');
  if (root) {
    ReactDOM.render(React.createElement(FloorPlan), root);
  }
})();
