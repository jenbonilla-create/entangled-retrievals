import { useState } from "react";

export default function Documents() {
  const [docs] = useState([
    { id: 1, name: "Retrieval Agreement", type: "PDF", date: "2026-06-15" },
    { id: 2, name: "Photo Inventory", type: "Photos", date: "2026-06-15" },
    { id: 3, name: "Incident Report", type: "PDF", date: "2026-06-14" },
  ]);

  const [filter, setFilter] = useState("All");
  const categories = ["All", "PDF", "Photos", "Videos", "Receipts"];

  const filteredDocs =
    filter === "All" ? docs : docs.filter((d) => d.type === filter);

  const typeIcon = (type: string) => {
    if (type === "PDF") return "📄";
    if (type === "Photos") return "📷";
    if (type === "Videos") return "🎥";
    return "📎";
  };

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <h1 className="font-hero text-3xl font-bold text-cream mb-2 tracking-[0.08em]">
          Documents
        </h1>
        <p className="text-silver mb-8">Manage your retrieval documentation</p>

        {/* Upload */}
        <div className="glass-card-premium glass-card-hover p-6 mb-8 rounded-xl">
          <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
            Upload Document
          </h2>
          <div className="border-dashed-rose-gold rounded-xl p-8 text-center transition-smooth">
            <p className="text-silver mb-4">
              Drag and drop files here or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,image/*,video/*"
              className="text-cream w-full"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((c) => (
            <button
              type="button"
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg transition-smooth ${
                filter === c
                  ? "bg-coral text-navy font-bold shadow-coral-glow"
                  : "bg-navy/50 text-silver border border-silver/20 hover:border-coral/50 hover:text-cream"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Documents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className="glass-card-premium glass-card-hover p-6 rounded-xl"
            >
              <div className="text-4xl mb-4">{typeIcon(doc.type)}</div>
              <h3 className="font-display text-lg font-semibold text-cream mb-2 tracking-[0.08em]">
                {doc.name}
              </h3>
              <div className="flex justify-between text-sm">
                <span className="text-coral font-medium">{doc.type}</span>
                <span className="text-silver">{doc.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
