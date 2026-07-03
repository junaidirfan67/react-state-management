const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function ProductGrid({ products, onAddToCart }) {
  return (
    <section aria-labelledby="products-heading" className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">Products</p>
          <h2 id="products-heading" className="text-2xl font-bold text-slate-950">
            Shop Catalog
          </h2>
        </div>
        <p className="max-w-md text-sm leading-6 text-slate-600">
          Each tab uses this same product grid and sends actions to its own cart
          state.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
          >
            <div className="relative h-40 overflow-hidden border-b border-slate-200 bg-slate-200">
              <img
                src={product.image}
                alt={product.imageAlt}
                className="h-full w-full object-cover transition duration-300 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/45 to-transparent" />
              <span className="absolute left-3 top-3 rounded-md bg-white/90 px-2.5 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                {product.category}
              </span>
            </div>

            <div className="space-y-4 p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-950">
                    {product.name}
                  </h3>
                  <p className="shrink-0 text-base font-bold text-emerald-700">
                    {currencyFormatter.format(product.price)}
                  </p>
                </div>
                <p className="text-sm leading-6 text-slate-600">
                  {product.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span aria-hidden="true" className="text-lg leading-none">
                  +
                </span>
                Add to Cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
