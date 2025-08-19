(function () {
  const { useState } = React;

  function FloorPlan() {
    const [open, setOpen] = useState(false);

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
        React.createElement('img', {
          src: 'floorplan1.png',
          className: 'floorplan-frame',
          alt: 'Floor Plan Image'
        }),
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
