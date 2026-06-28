import { Check, X } from "lucide-react";

const packages = [
  { id: 1, name: "Essential", price: "$99", items: "1 item", popular: false },
  {
    id: 2,
    name: "Personal Collection",
    price: "$149",
    items: "3 items",
    popular: false,
  },
  { id: 3, name: "Standard", price: "$229", items: "5 items", popular: true },
  {
    id: 4,
    name: "Transition",
    price: "$329",
    items: "8 items",
    popular: false,
  },
  { id: 5, name: "Complete", price: "$449", items: "15 items", popular: false },
  {
    id: 6,
    name: "Furniture Small",
    price: "$499",
    items: "3 large",
    popular: false,
  },
  {
    id: 7,
    name: "Furniture Medium",
    price: "$699",
    items: "5 items",
    popular: false,
  },
  {
    id: 8,
    name: "Furniture Large",
    price: "$999",
    items: "8 items",
    popular: false,
  },
  {
    id: 9,
    name: "Full Household",
    price: "$1,499+",
    items: "9+ items",
    popular: false,
  },
];

const features = [
  {
    label: "Photo Inventory",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "Real-Time Tracking",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "Customer Portal",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "Digital Agreements",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "Status Notifications",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "Neutral Coordination",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "On-Demand Scheduling",
    check: [true, true, true, true, true, true, true, true, true],
  },
  {
    label: "Priority Scheduling",
    check: [false, false, true, true, true, true, true, true, true],
  },
];

export default function PackageComparisonTable() {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[800px] border-collapse">
        <thead>
          <tr>
            <th className="p-4 text-left font-display text-cream text-sm tracking-wide sticky left-0 bg-navy/90 backdrop-blur-sm z-10">
              Feature
            </th>
            {packages.map((pkg) => (
              <th
                key={pkg.id}
                className={`p-4 text-center min-w-[100px] ${
                  pkg.popular
                    ? "bg-coral/20 border-t-2 border-coral"
                    : "bg-navy/40"
                }`}
              >
                <div className="font-display text-cream text-xs tracking-wide mb-1">
                  {pkg.name}
                </div>
                <div className="text-coral font-bold text-sm">{pkg.price}</div>
                <div className="text-silver text-[10px]">{pkg.items}</div>
                {pkg.popular && (
                  <div className="mt-1 text-[9px] bg-coral text-navy px-2 py-0.5 rounded-full font-bold inline-block">
                    POPULAR
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {features.map((feature, idx) => (
            <tr
              key={feature.label}
              className={idx % 2 === 0 ? "bg-navy/20" : "bg-transparent"}
            >
              <td className="p-4 text-left text-silver text-sm sticky left-0 bg-navy/90 backdrop-blur-sm z-10">
                {feature.label}
              </td>
              {feature.check.map((checked, i) => (
                <td key={`${feature.label}-${i}`} className="p-4 text-center">
                  {checked ? (
                    <Check className="w-5 h-5 text-emerald mx-auto" />
                  ) : (
                    <X className="w-5 h-5 text-silver/30 mx-auto" />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
