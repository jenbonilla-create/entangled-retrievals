import { Calculator, Check, ChevronDown, Minus, Plus } from "lucide-react";
import { useMemo, useState } from "react";

interface Package {
  id: number;
  name: string;
  price: number;
  items: string;
}

const packages: Package[] = [
  {
    id: 1,
    name: "Essential Item Retrieval",
    price: 99,
    items: "1 personal item",
  },
  {
    id: 2,
    name: "Personal Collection Retrieval",
    price: 149,
    items: "Up to 3 personal items",
  },
  {
    id: 3,
    name: "Standard Retrieval",
    price: 229,
    items: "Up to 5 personal items",
  },
  {
    id: 4,
    name: "Transition Retrieval",
    price: 329,
    items: "Up to 8 personal items",
  },
  {
    id: 5,
    name: "Complete Personal Property Retrieval",
    price: 449,
    items: "Up to 15 personal items",
  },
  {
    id: 6,
    name: "Furniture Retrieval (Small Load)",
    price: 499,
    items: "Up to 3 large furniture items",
  },
  {
    id: 7,
    name: "Furniture Retrieval (Medium Load)",
    price: 699,
    items: "Up to 5 furniture items",
  },
  {
    id: 8,
    name: "Furniture Retrieval (Large Load)",
    price: 999,
    items: "Up to 8 furniture items",
  },
  {
    id: 9,
    name: "Full Household Retrieval",
    price: 1499,
    items: "9+ furniture items",
  },
];

interface AddOn {
  key: string;
  label: string;
  price: number;
  type: "fixed" | "percent";
  percentOf?: number;
}

const addOnsList: AddOn[] = [
  {
    key: "noContact",
    label: "Strict No-Contact Coordination",
    price: 99,
    type: "fixed",
  },
  { key: "twoWay", label: "Two-Way Retrieval", price: 75, type: "percent" },
  {
    key: "protectiveWrap",
    label: "Protective Wrapping",
    price: 25,
    type: "fixed",
  },
];

export interface AddOnsState {
  noContact: boolean;
  twoWay: boolean;
  protectiveWrap: boolean;
  stairCarry: number;
  additionalStops: number;
}

interface CostCalculatorProps {
  selectedPackageId?: number | null;
  onPackageChange?: (id: number | null) => void;
  addOns?: AddOnsState;
  onAddOnsChange?: (addOns: AddOnsState) => void;
}

export default function CostCalculator({
  selectedPackageId: externalPackageId,
  onPackageChange,
  addOns: externalAddOns,
  onAddOnsChange,
}: CostCalculatorProps) {
  const [internalPackageId, setInternalPackageId] = useState<number | null>(
    externalPackageId ?? null,
  );
  const [internalAddOns, setInternalAddOns] = useState<AddOnsState>({
    noContact: false,
    twoWay: false,
    protectiveWrap: false,
    stairCarry: 0,
    additionalStops: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedPackageId = externalPackageId ?? internalPackageId;
  const addOns = externalAddOns ?? internalAddOns;

  const selectedPackage = useMemo(
    () => packages.find((p) => p.id === selectedPackageId) ?? null,
    [selectedPackageId],
  );

  const breakdown = useMemo(() => {
    const lines: {
      label: string;
      amount: number;
      type: "base" | "add-on" | "total";
    }[] = [];
    let total = 0;

    if (selectedPackage) {
      lines.push({
        label: selectedPackage.name,
        amount: selectedPackage.price,
        type: "base",
      });
      total += selectedPackage.price;

      for (const addon of addOnsList) {
        if (addOns[addon.key as keyof AddOnsState]) {
          let amount = 0;
          if (addon.type === "fixed") {
            amount = addon.price;
          } else if (addon.type === "percent" && selectedPackage) {
            amount = Math.round(selectedPackage.price * (addon.price / 100));
          }
          if (amount > 0) {
            lines.push({ label: addon.label, amount, type: "add-on" });
            total += amount;
          }
        }
      }

      if (addOns.stairCarry > 0) {
        const amount = addOns.stairCarry * 15;
        lines.push({
          label: `Stair Carry (${addOns.stairCarry} flights)`,
          amount,
          type: "add-on",
        });
        total += amount;
      }

      if (addOns.additionalStops > 0) {
        const amount = addOns.additionalStops * 50;
        lines.push({
          label: `Additional Stops (${addOns.additionalStops})`,
          amount,
          type: "add-on",
        });
        total += amount;
      }
    }

    lines.push({ label: "Estimated Total", amount: total, type: "total" });
    return { lines, total };
  }, [selectedPackage, addOns]);

  const handlePackageSelect = (id: number) => {
    setInternalPackageId(id);
    setDropdownOpen(false);
    onPackageChange?.(id);
  };

  const toggleAddOn = (key: string) => {
    const next = { ...addOns, [key]: !addOns[key as keyof AddOnsState] };
    if (!externalAddOns) {
      setInternalAddOns(next);
    }
    onAddOnsChange?.(next);
  };

  const adjustStairs = (delta: number) => {
    const next = {
      ...addOns,
      stairCarry: Math.max(0, addOns.stairCarry + delta),
    };
    if (!externalAddOns) {
      setInternalAddOns(next);
    }
    onAddOnsChange?.(next);
  };

  const adjustStops = (delta: number) => {
    const next = {
      ...addOns,
      additionalStops: Math.max(0, addOns.additionalStops + delta),
    };
    if (!externalAddOns) {
      setInternalAddOns(next);
    }
    onAddOnsChange?.(next);
  };

  return (
    <div data-ocid="cost_calculator.panel">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-rose-gold/10 border border-rose-gold/20 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-rose-gold" />
        </div>
        <h3 className="font-display text-lg font-bold text-cream tracking-[0.08em]">
          Cost Calculator
        </h3>
      </div>

      {/* Package Selector */}
      <div className="mb-5 relative">
        <span className="block text-silver text-sm mb-2 font-medium">
          Select Package
        </span>
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full text-left px-4 py-3 rounded-xl bg-navy/60 border border-rose-gold/30 text-cream flex items-center justify-between hover:border-rose-gold/60 transition-smooth"
          data-ocid="cost_calculator.package_dropdown"
        >
          <span className="truncate">
            {selectedPackage
              ? `${selectedPackage.name} — $${selectedPackage.price}`
              : "Choose a package..."}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-rose-gold transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>
        {dropdownOpen && (
          <div className="absolute z-20 mt-2 w-full max-h-64 overflow-y-auto rounded-xl bg-navy/95 border border-rose-gold/30 shadow-xl">
            {packages.map((pkg) => (
              <button
                type="button"
                key={pkg.id}
                onClick={() => handlePackageSelect(pkg.id)}
                className={`w-full text-left px-4 py-3 flex items-center justify-between hover:bg-rose-gold/10 transition-smooth ${
                  selectedPackageId === pkg.id
                    ? "bg-rose-gold/10 border-l-2 border-l-rose-gold"
                    : "border-l-2 border-l-transparent"
                }`}
                data-ocid={`cost_calculator.package_option.${pkg.id}`}
              >
                <div>
                  <p className="text-cream text-sm font-medium">{pkg.name}</p>
                  <p className="text-silver/60 text-xs">{pkg.items}</p>
                </div>
                <span className="text-coral font-bold text-sm">
                  ${pkg.price}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Add-ons */}
      <div className="mb-5">
        <span className="block text-silver text-sm mb-2 font-medium">
          Add-Ons
        </span>
        <div className="space-y-2">
          {addOnsList.map((addon) => (
            <div
              key={addon.key}
              className="flex items-center gap-3 p-3 rounded-xl bg-navy/40 border border-transparent hover:border-rose-gold/20 cursor-pointer transition-smooth"
            >
              <button
                type="button"
                onClick={() => toggleAddOn(addon.key)}
                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-smooth ${
                  addOns[addon.key as keyof AddOnsState]
                    ? "bg-rose-gold border-rose-gold"
                    : "border-silver/40 hover:border-rose-gold/60"
                }`}
                data-ocid={`cost_calculator.addon.${addon.key}`}
              >
                {addOns[addon.key as keyof AddOnsState] && (
                  <Check className="w-3 h-3 text-navy" />
                )}
              </button>
              <div className="flex-1">
                <p className="text-cream text-sm">{addon.label}</p>
              </div>
              <span className="text-coral font-bold text-sm">
                {addon.type === "percent"
                  ? `+${addon.price}%`
                  : `+$${addon.price}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Numeric Steppers */}
      <div className="mb-5 space-y-3">
        <div className="flex items-center justify-between p-3 rounded-xl bg-navy/40">
          <div>
            <p className="text-cream text-sm font-medium">Stair Carry</p>
            <p className="text-silver/60 text-xs">$15 per flight</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => adjustStairs(-1)}
              className="w-8 h-8 rounded-lg bg-navy/60 border border-rose-gold/30 flex items-center justify-center text-rose-gold hover:bg-rose-gold/20 transition-smooth"
              data-ocid="cost_calculator.stairs.minus"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-8 text-center text-cream font-bold"
              data-ocid="cost_calculator.stairs.value"
            >
              {addOns.stairCarry}
            </span>
            <button
              type="button"
              onClick={() => adjustStairs(1)}
              className="w-8 h-8 rounded-lg bg-navy/60 border border-rose-gold/30 flex items-center justify-center text-rose-gold hover:bg-rose-gold/20 transition-smooth"
              data-ocid="cost_calculator.stairs.plus"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 rounded-xl bg-navy/40">
          <div>
            <p className="text-cream text-sm font-medium">Additional Stops</p>
            <p className="text-silver/60 text-xs">$50 per stop</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => adjustStops(-1)}
              className="w-8 h-8 rounded-lg bg-navy/60 border border-rose-gold/30 flex items-center justify-center text-rose-gold hover:bg-rose-gold/20 transition-smooth"
              data-ocid="cost_calculator.stops.minus"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span
              className="w-8 text-center text-cream font-bold"
              data-ocid="cost_calculator.stops.value"
            >
              {addOns.additionalStops}
            </span>
            <button
              type="button"
              onClick={() => adjustStops(1)}
              className="w-8 h-8 rounded-lg bg-navy/60 border border-rose-gold/30 flex items-center justify-center text-rose-gold hover:bg-rose-gold/20 transition-smooth"
              data-ocid="cost_calculator.stops.plus"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="border-t border-rose-gold/20 pt-4">
        <p className="text-silver text-sm font-medium mb-2">
          Itemized Breakdown
        </p>
        <div className="space-y-1.5 mb-3">
          {breakdown.lines
            .filter((l) => l.type !== "total")
            .map((line) => (
              <div key={line.label} className="flex justify-between text-sm">
                <span className="text-silver/80">{line.label}</span>
                <span
                  className={
                    line.type === "base"
                      ? "text-cream font-medium"
                      : "text-coral"
                  }
                >
                  {line.type === "add-on" && line.amount > 0 ? "+" : ""}$
                  {line.amount}
                </span>
              </div>
            ))}
          {breakdown.lines.filter((l) => l.type !== "total").length === 0 && (
            <p className="text-silver/50 text-sm italic">
              Select a package to see breakdown
            </p>
          )}
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-rose-gold/20">
          <span className="text-cream font-bold text-base">
            Estimated Total
          </span>
          <span
            className="text-coral font-bold text-2xl"
            data-ocid="cost_calculator.total"
          >
            ${breakdown.total}
          </span>
        </div>
      </div>
    </div>
  );
}
