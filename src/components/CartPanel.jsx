const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function CartPanel({
  title,
  items,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className="rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-blue-700">{title}</p>
            <h2 className="mt-1 text-2xl font-bold text-slate-950">Cart</h2>
          </div>
          <span className="rounded-md bg-blue-50 px-3 py-1 text-sm font-bold text-blue-700">
            {totalItems} {totalItems === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="p-5">
          <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5 text-center">
            <p className="font-semibold text-slate-800">Your cart is empty.</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Add a product from the catalog to see this state update.
            </p>
          </div>
        </div>
      ) : (
        <div className="divide-y divide-slate-200">
          {items.map((item) => (
            <div key={item.id} className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-950">{item.name}</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {currencyFormatter.format(item.price)} each
                  </p>
                </div>
                <p className="shrink-0 font-bold text-slate-950">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex h-9 items-center rounded-md border border-slate-300 bg-white">
                  <button
                    type="button"
                    onClick={() => onDecrease(item.id)}
                    className="grid size-9 place-items-center rounded-l-md text-lg font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>
                  <span className="grid h-9 min-w-10 place-items-center border-x border-slate-300 px-3 text-sm font-bold text-slate-950">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onIncrease(item)}
                    className="grid size-9 place-items-center rounded-r-md text-lg font-bold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onRemove(item.id)}
                  className="rounded-md border border-red-200 px-3 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4 border-t border-slate-200 p-5">
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-slate-700">Total</span>
          <span className="text-2xl font-bold text-slate-950">
            {currencyFormatter.format(totalPrice)}
          </span>
        </div>

        <button
          type="button"
          onClick={onClear}
          disabled={items.length === 0}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-hidden="true">x</span>
          Clear Cart
        </button>
      </div>
    </aside>
  );
}
