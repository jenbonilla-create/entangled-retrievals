import { useState } from "react";

export default function Inventory() {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "MacBook Pro",
      value: "$1,200",
      priority: "High",
      status: "Retrieved",
      condition: "Good",
    },
    {
      id: 2,
      name: "Television",
      value: "$400",
      priority: "Medium",
      status: "Pending",
      condition: "Unknown",
    },
    {
      id: 3,
      name: "Clothing Bundle",
      value: "$200",
      priority: "Low",
      status: "Retrieved",
      condition: "Good",
    },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    value: "",
    priority: "medium",
    condition: "",
  });

  const addItem = () => {
    if (newItem.name) {
      setItems([
        ...items,
        { id: items.length + 1, ...newItem, status: "Pending" },
      ]);
      setNewItem({ name: "", value: "", priority: "medium", condition: "" });
    }
  };

  const priorityColor = (p: string) => {
    if (p === "High") return "bg-coral text-navy";
    if (p === "Medium") return "bg-orange-coral text-navy";
    return "bg-emerald text-navy";
  };

  const statusColor = (s: string) => {
    if (s === "Retrieved") return "text-emerald";
    if (s === "Pending") return "text-orange-coral";
    return "text-silver";
  };

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-hero text-3xl font-bold text-cream mb-2 tracking-[0.08em]">
          Inventory
        </h1>
        <p className="text-silver mb-8">
          Manage and track your retrieval items
        </p>

        {/* Add Item */}
        <div className="glass-card-premium glass-card-hover p-6 mb-8 rounded-xl">
          <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
            Add Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              placeholder="Item Name"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              className="px-4 py-2 rounded-lg bg-navy/50 border border-silver/20 text-cream focus:outline-none focus:border-coral/50 transition-smooth"
            />
            <input
              placeholder="Estimated Value"
              value={newItem.value}
              onChange={(e) =>
                setNewItem({ ...newItem, value: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-navy/50 border border-silver/20 text-cream focus:outline-none focus:border-coral/50 transition-smooth"
            />
            <select
              value={newItem.priority}
              onChange={(e) =>
                setNewItem({ ...newItem, priority: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-navy/50 border border-silver/20 text-cream focus:outline-none focus:border-coral/50 transition-smooth"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <input
              placeholder="Condition"
              value={newItem.condition}
              onChange={(e) =>
                setNewItem({ ...newItem, condition: e.target.value })
              }
              className="px-4 py-2 rounded-lg bg-navy/50 border border-silver/20 text-cream focus:outline-none focus:border-coral/50 transition-smooth"
            />
          </div>
          <div className="mt-4 flex gap-4 items-center">
            <div className="border-dashed-rose-gold rounded-lg p-4 flex-1 transition-smooth">
              <input
                type="file"
                accept="image/*"
                capture="environment"
                className="text-cream w-full"
              />
            </div>
            <button
              type="button"
              onClick={addItem}
              className="bg-emerald text-navy font-bold px-6 py-3 rounded-lg hover:bg-emerald-light transition-smooth shadow-emerald-glow"
            >
              Add Item
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="glass-card-premium glass-card-hover p-6 rounded-xl"
            >
              <div className="w-full h-32 bg-navy-deep rounded-lg mb-4 flex items-center justify-center border border-rose-gold/10">
                <span className="text-silver/40 text-sm">Photo</span>
              </div>
              <h3 className="font-display text-lg font-semibold text-cream mb-2 tracking-[0.08em]">
                {item.name}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                <span
                  className={`px-2 py-1 rounded-lg text-xs font-bold ${priorityColor(item.priority)}`}
                >
                  {item.priority}
                </span>
                <span
                  className={`text-sm font-medium ${statusColor(item.status)}`}
                >
                  {item.status}
                </span>
              </div>
              <p className="text-silver text-sm">Value: {item.value}</p>
              <p className="text-silver text-sm">Condition: {item.condition}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
