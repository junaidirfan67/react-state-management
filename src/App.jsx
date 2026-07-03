import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartPanel } from "./components/CartPanel.jsx";
import { ProductGrid } from "./components/ProductGrid.jsx";
import { useCart } from "./context/CartContext.jsx";
import { products } from "./data/products.js";
import {
  addToCart as reduxAddToCart,
  clearCart as reduxClearCart,
  decreaseQuantity as reduxDecreaseQuantity,
  removeFromCart as reduxRemoveFromCart,
} from "./redux/cartSlice.js";
import { useCartStore } from "./zustand/useCartStore.js";

const tabs = [
  {
    id: "context",
    label: "Context API",
    badge: "Built in",
    summary: "Provider, custom hook, and local React state.",
  },
  {
    id: "redux",
    label: "Redux Toolkit",
    badge: "Structured",
    summary: "Central store, slice reducers, and dispatched actions.",
  },
  {
    id: "zustand",
    label: "Zustand",
    badge: "Hook store",
    summary: "Small global store with state and actions in one hook.",
  },
];

function ContextDemo() {
  const {
    items,
    addToCart,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <DemoLayout
      title="Context API"
      items={items}
      onAddToCart={addToCart}
      onIncrease={addToCart}
      onDecrease={decreaseQuantity}
      onRemove={removeFromCart}
      onClear={clearCart}
    />
  );
}

function ReduxDemo() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  return (
    <DemoLayout
      title="Redux Toolkit"
      items={items}
      onAddToCart={(product) => dispatch(reduxAddToCart(product))}
      onIncrease={(product) => dispatch(reduxAddToCart(product))}
      onDecrease={(id) => dispatch(reduxDecreaseQuantity(id))}
      onRemove={(id) => dispatch(reduxRemoveFromCart(id))}
      onClear={() => dispatch(reduxClearCart())}
    />
  );
}

function ZustandDemo() {
  const items = useCartStore((state) => state.items);
  const addToCart = useCartStore((state) => state.addToCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <DemoLayout
      title="Zustand"
      items={items}
      onAddToCart={addToCart}
      onIncrease={addToCart}
      onDecrease={decreaseQuantity}
      onRemove={removeFromCart}
      onClear={clearCart}
    />
  );
}

function DemoLayout({
  title,
  items,
  onAddToCart,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <ProductGrid products={products} onAddToCart={onAddToCart} />
      <CartPanel
        title={title}
        items={items}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
        onClear={onClear}
      />
    </div>
  );
}

function ActiveDemo({ activeTab }) {
  if (activeTab === "redux") {
    return <ReduxDemo />;
  }

  if (activeTab === "zustand") {
    return <ZustandDemo />;
  }

  return <ContextDemo />;
}

export default function App() {
  const [activeTab, setActiveTab] = useState("context");
  const activeTabDetails = tabs.find((tab) => tab.id === activeTab);

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold text-blue-700">
                React State Management
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                Cart State Comparison
              </h1>
              <p className="mt-3 text-base leading-7 text-slate-600">
                Compare Context API, Redux Toolkit, and Zustand with the same
                shopping cart workflow and shared UI components.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-[420px]">
              <Stat label="Products" value={products.length} />
              <Stat label="Approaches" value={tabs.length} />
              <Stat label="Shared UI" value="2" />
            </div>
          </div>
        </header>

        <section className="space-y-5">
          <div
            role="tablist"
            aria-label="State management examples"
            className="grid gap-3 md:grid-cols-3"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-lg border p-4 text-left shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    isActive
                      ? "border-blue-600 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="text-lg font-bold text-slate-950">
                      {tab.label}
                    </span>
                    <span
                      className={`rounded-md px-2.5 py-1 text-xs font-bold ${
                        isActive
                          ? "bg-blue-600 text-white"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {tab.badge}
                    </span>
                  </span>
                  <span className="mt-3 block text-sm leading-6 text-slate-600">
                    {tab.summary}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
            <div className="flex flex-col gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-700">
                  Active Example
                </p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950">
                  {activeTabDetails.label}
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-6 text-slate-600">
                {activeTabDetails.summary}
              </p>
            </div>

            <div className="pt-5">
              <ActiveDemo activeTab={activeTab} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-950">{value}</p>
    </div>
  );
}
