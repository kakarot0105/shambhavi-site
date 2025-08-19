(function () {
  const { useState } = React;

  function Gallery() {
    const [open, setOpen] = useState(false);
    const images = [
      { src: 'building1.jpeg', alt: 'Exterior — building elevation', caption: 'Exterior View' },
      { src: 'hero.jpg', alt: 'Site overview', caption: 'Site Overview' },
      { src: 'building.jpg', alt: 'Street view', caption: 'Street View' }
    ];
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        {
          className: 'collapsible-toggle',
          'aria-expanded': open,
          'aria-controls': 'gallery-content',
          onClick: () => setOpen(!open)
        },
        open ? 'Hide Gallery' : 'Show Gallery'
      ),
      React.createElement(
        'div',
        {
          id: 'gallery-content',
          className: 'collapsible-content' + (open ? ' open' : ' hidden'),
          role: 'region',
          'aria-label': 'Project gallery'
        },
        React.createElement(
          'div',
          { className: 'gallery-grid' },
          images.map(function (img, i) {
            return React.createElement(
              'figure',
              { className: 'gallery-card', key: i },
              React.createElement('img', {
                src: img.src,
                alt: img.alt,
                loading: 'lazy',
                width: '400',
                height: '300'
              }),
              React.createElement('figcaption', null, img.caption)
            );
          })
        )
      )
    );
  }

  var root = document.getElementById('gallery-root');
  if (root) {
    ReactDOM.render(React.createElement(Gallery), root);
  }
})();
