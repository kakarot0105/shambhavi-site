(function () {
  const e = React.createElement;

  // Use existing images from the repo; replace with your preferred ones later.
  const LISTINGS = [
    {
      id: 1,
      title: "2BHK – East Facing",
      image: "hero.jpg",          // swap to your preferred image later
      beds: 2,
      baths: 2,
      size: 1170,
      status: "Ready to Move",
      tower: "Block A",
      floor: 3,
      facing: "East",
      link: "https://wa.me/917013991990"
    },
    {
      id: 2,
      title: "3BHK – Corner Unit",
      image: "hero.jpg",     // swap to your preferred image later
      beds: 3,
      baths: 3,
      size: 1590,
      status: "Ready to Move",
      tower: "Block B",
      floor: 5,
      facing: "North-East",
      link: "https://wa.me/917013991990"
    }
  ];

  function ListingCard({ item }) {
    return e(
      "article",
      { className: "listing-card" },
      e("div", { className: "img-wrap brochure" },
        e("img", { src: item.image, alt: item.title, loading: "lazy" }),
        e("div", { className: "img-brochure-overlay" }),
        e("div", { className: "brochure-caption" },
          e("h3", null, item.title),
          e("p", null, `${item.beds} Bed • ${item.baths} Bath • ${item.size}sft`),
          e("span", { className: `badge ${item.status === "Ready to Move" ? "good" : "warn"}` }, item.status)
        )
      ),
      e("div", { className: "card-body" },
        e("div", { className: "submeta" }, `${item.tower} • Floor ${item.floor} • ${item.facing} facing`),
        e("div", { className: "cta-row" },
          e("a", { className: "btn btn-primary", href: item.link, target: "_blank", rel: "noopener" }, "Enquire"),
          e("button", { className: "btn btn-ghost", onClick: () => share(item) },
            e("i", { className: "fa-solid fa-share-nodes" }), " Share")
        )
      )
    );
  }

  function share(item) {
    const text = `${item.title} | ${item.size}sft • ${item.beds}BHK`;
    const url = location.href.split('#')[0];
    if (navigator.share) {
      navigator.share({ title: item.title, text, url }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text + "\n" + url).then(() => {
        alert("Listing copied to clipboard!");
      });
    }
  }

  function ListingsApp() {
    return e("div", { className: "card-grid" }, LISTINGS.map((item) => e(ListingCard, { key: item.id, item })));
  }

  const root = document.getElementById("listings-root");
  if (root) ReactDOM.render(e(ListingsApp), root);

  // === Make Gallery images brochure-style too (same overlay/caption look) ===
  document.querySelectorAll("#gallery img").forEach(img => {
    const wrapper = document.createElement("div");
    wrapper.className = "gallery-brochure";
    img.parentNode.replaceChild(wrapper, img);
    wrapper.appendChild(img);

    const overlay = document.createElement("div");
    overlay.className = "img-brochure-overlay";
    wrapper.appendChild(overlay);

    const caption = document.createElement("div");
    caption.className = "brochure-caption";
    caption.innerHTML = `<h3>${img.alt || "JGD Residency"}</h3>`;
    wrapper.appendChild(caption);
  });
})();
