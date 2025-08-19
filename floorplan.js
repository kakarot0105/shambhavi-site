(function () {
  const { useState, useEffect } = React;

  function FloorPlan() {
    const [open, setOpen] = useState(false);
    const [pdfAvailable, setPdfAvailable] = useState(true);

    useEffect(function () {
      fetch('Dathunagar%20-%20Typical%20Floor%20Plan.pdf', { method: 'HEAD' })
        .then(function (res) {
          if (!res.ok) setPdfAvailable(false);
        })
        .catch(function () {
          setPdfAvailable(false);
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
