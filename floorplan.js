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
          className: 'collapsible-content floorplan-wrapper' + (open ? ' open' : ''),
          role: 'region',
          'aria-label': 'Floor plan'
        },
        React.createElement(
          'object',
          {
            data: 'floorplan/JGD-Floorplan.pdf',
            type: 'application/pdf',
            className: 'floorplan-frame'
          },
          React.createElement(
            'p',
            { className: 'pdf-message' },
            'PDF failed to load. ',
            React.createElement(
              'a',
              { href: 'floorplan/JGD-Floorplan.pdf' },
              'Download Floor Plan (PDF)'
            )
          )
        ),
        React.createElement(
          'a',
          {
            className: 'download-link',
            href: 'floorplan/JGD-Floorplan.pdf',
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
