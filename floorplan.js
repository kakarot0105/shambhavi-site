(function () {
  const { useState, useEffect } = React;

  function FloorPlan() {
    const [open, setOpen] = useState(false);
    const [pdfAvailable, setPdfAvailable] = useState(true);

    useEffect(function () {
      fetch('Dathunagar%20-%20Typical%20Floor%20Plan.pdf', { method: 'HEAD' })
        .then(function (res) {
          // Some hosts (e.g., GitHub Pages) do not support HEAD requests and
          // return 405 even though the file exists. Treat that as success so
          // the PDF preview remains visible.
          if (!res.ok && res.status !== 405) setPdfAvailable(false);
        })
        .catch(function () {
          // If the request itself fails (offline, CORS, etc.) default to
          // showing the viewer rather than hiding it.
          // The browser will handle displaying a broken object if necessary.
        });
    }, []);

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
          className:
            'collapsible-content floorplan-wrapper' + (open ? ' open' : ' hidden'),
          role: 'region',
          'aria-label': 'Floor plan'
        },
        pdfAvailable
          ? React.createElement('object', {
              data: 'Dathunagar%20-%20Typical%20Floor%20Plan.pdf',
              type: 'application/pdf',
              width: '100%',
              height: '600px',
              className: 'floorplan-frame',
              'aria-label': 'Floor Plan PDF Viewer'
            })
          : React.createElement(
              'p',
              { className: 'pdf-message' },
              'Unable to display the floor plan. Please use the link below to download the PDF.'
            ),
        React.createElement(
          'a',
          {
            className: 'download-link',
            href: 'Dathunagar%20-%20Typical%20Floor%20Plan.pdf',
            download: ''
          },
          'Download Floor Plan (PDF)'
        )
      )
    );
  }

  var root = document.getElementById('floorplan-root');
  if (root) {
    ReactDOM.render(React.createElement(FloorPlan), root);
  }
})();
