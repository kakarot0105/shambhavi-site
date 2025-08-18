const listings = [
  { img: 'building.jpg', title: 'JGD Residency', desc: 'Premium 2 & 3 BHK homes in Hyderabad' },
  { img: 'hero.jpg', title: 'Modern Interiors', desc: 'Thoughtfully designed living spaces' }
];

function Listing(props) {
  return React.createElement(
    'div',
    { className: 'property fade-in' },
    React.createElement('img', { src: props.img, alt: props.title }),
    React.createElement('h3', null, props.title),
    React.createElement('p', null, props.desc)
  );
}

function Listings() {
  return React.createElement(
    'div',
    { className: 'listings' },
    listings.map((item, i) => React.createElement(Listing, { key: i, ...item }))
  );
}

ReactDOM.render(
  React.createElement(Listings, null),
  document.getElementById('listings-root')
);
