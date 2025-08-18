const listings = [
  {
    img: 'building.jpg',
    title: 'Jai Guru Datta Residency',
    desc: 'GHMC-approved 2 & 3 BHK homes in Dathanagar, Kanchan Bagh, Hyderabad',
    brochure: 'JGD-Residency-Brochure.pdf'
  },
  { img: 'hero.jpg', title: 'Modern Interiors', desc: 'Thoughtfully designed living spaces' }
];

function Listing(props) {
  return React.createElement(
    'div',
    { className: 'property fade-in' },
    React.createElement('img', { src: props.img, alt: props.title }),
    React.createElement('h3', null, props.title),
    React.createElement('p', null, props.desc),
    props.brochure &&
      React.createElement(
        'a',
        { href: props.brochure, target: '_blank', className: 'brochure-link' },
        'View Brochure'
      )
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
