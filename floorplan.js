(function () {
  const { useState, useEffect, useRef } = React;

  function FloorPlan() {
    const [open, setOpen] = useState(false);
    const [viewerType, setViewerType] = useState(null); // 'image', 'pdf', 'message', 'pending'
    const [pdfAvailable, setPdfAvailable] = useState(null);
    const tsRef = useRef(Date.now());

    useEffect(() => {
      if (!open || viewerType !== null) return;

      tsRef.current = Date.now();

      const img = new Image();
      img.onload = () => setViewerType('image');
      img.onerror = () => setViewerType('pending');
      img.src = `images/floorplan1.png?v=${tsRef.current}`;

      fetch('floorplan/JGD-Floorplan.pdf', { method: 'HEAD' })
        .then(res => setPdfAvailable(res.ok))
        .catch(() => setPdfAvailable(false));
    }, [open, viewerType]);

    useEffect(() => {
      if (!open) return;
      if (viewerType === 'pending' && pdfAvailable !== null) {
        setViewerType(pdfAvailable ? 'pdf' : 'message');
      }
    }, [open, viewerType, pdfAvailable]);

    let viewer = null;
    if (viewerType === 'image') {
      viewer = React.createElement(
        'div',
        { className: 'floorplan-viewer', role: 'region', 'aria-label': 'Floor Plan Viewer' },
        React.createElement('img', {
          src: `images/floorplan1.png?v=${tsRef.current}`,
          loading: 'lazy',
          decoding: 'async',
          alt: 'Floor plan preview',
          width: 1600,
          height: 1000
        }),
        pdfAvailable
          ? React.createElement(
              'a',
              {
                href: 'floorplan/JGD-Floorplan.pdf',
                target: '_blank',
                rel: 'noopener',
                type: 'application/pdf',
                download: 'JGD-Floorplan.pdf',
                className: 'floorplan-link'
              },
              'View Full Floor Plan (PDF)'
            )
          : null
      );
    } else if (viewerType === 'pdf') {
      viewer = React.createElement(
        'div',
        { className: 'floorplan-viewer', role: 'region', 'aria-label': 'Floor Plan Viewer' },
        React.createElement(
          'object',
          {
            data: 'floorplan/JGD-Floorplan.pdf',
            type: 'application/pdf',
            'aria-label': 'Floor Plan PDF Viewer',
            className: 'floorplan-pdf'
          },
          React.createElement(
            'p',
            null,
            'Your browser does not support PDFs. ',
            React.createElement(
              'a',
              {
                href: 'floorplan/JGD-Floorplan.pdf',
                target: '_blank',
                rel: 'noopener',
                type: 'application/pdf',
                download: 'JGD-Floorplan.pdf'
              },
              'Download PDF'
            )
          )
        )
      );
    } else if (viewerType === 'message') {
      viewer = React.createElement(
        'div',
        { className: 'floorplan-viewer', role: 'region', 'aria-label': 'Floor Plan Viewer' },
        React.createElement('p', { className: 'floorplan-message' }, 'Floor plan will be added shortly.')
      );
    }

    const downloadLink = pdfAvailable
      ? React.createElement(
          'a',
          {
            className: 'floorplan-link',
            href: 'floorplan/JGD-Floorplan.pdf',
            target: '_blank',
            rel: 'noopener',
            type: 'application/pdf',
            download: 'JGD-Floorplan.pdf'
          },
          'Download Floor Plan (PDF)'
        )
      : React.createElement(
          'a',
          {
            className: 'floorplan-link',
            'aria-disabled': 'true'
          },
          'Download Floor Plan (PDF)'
        );

    return React.createElement(
      'div',
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
          className: 'collapsible-content floorplan-wrapper' + (open ? ' open' : ' hidden')
        },
        viewer,
        downloadLink
      )
    );
  }

  const root = document.getElementById('floorplan-root');
  if (root) {
    ReactDOM.render(React.createElement(FloorPlan), root);
  }
})();

