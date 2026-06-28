import { useEffect, useMemo, useState } from "react";

import { RetrievalType } from "@/backend";
import CostCalculator, { type AddOnsState } from "@/components/CostCalculator";
import { useCreateBooking } from "@/hooks/useQueries";
import { useNavigate, useSearch } from "@tanstack/react-router";

const packageSlugToId: Record<string, number> = {
  essentials: 1,
  personal: 2,
  standard: 3,
  transition: 4,
  complete: 5,
  "furniture-small": 6,
  "furniture-medium": 7,
  "furniture-large": 8,
  "full-household": 9,
};

export default function Booking() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/booking" });
  const createBooking = useCreateBooking();

  const preselectedPackageId = useMemo(() => {
    if (search.package && typeof search.package === "string") {
      return packageSlugToId[search.package] ?? null;
    }
    return null;
  }, [search.package]);

  const [step, setStep] = useState(preselectedPackageId ? 1 : 1);

  const [selectedPackage, setSelectedPackage] = useState<number | null>(
    preselectedPackageId,
  );

  useEffect(() => {
    if (preselectedPackageId && selectedPackage !== preselectedPackageId) {
      setSelectedPackage(preselectedPackageId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselectedPackageId, selectedPackage]);
  const [addOns, setAddOns] = useState<AddOnsState>({
    noContact: false,
    stairCarry: 0,
    protectiveWrap: false,
    twoWay: false,
    additionalStops: 0,
  });
  const [address, setAddress] = useState({
    street: "",
    unit: "",
    city: "",
    state: "",
    zip: "",
    gateCode: "",
    instructions: "",
  });
  const [safety, setSafety] = useState({
    conflict: false,
    restrainingOrder: false,
    police: false,
    weapons: false,
    threats: false,
    children: false,
    pets: false,
  });
  const [inventory, setInventory] = useState<
    { name: string; description: string; value: string; priority: string }[]
  >([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    value: "",
    priority: "medium",
  });
  const [scheduleDate, setScheduleDate] = useState("");
  const [isEmergency, setIsEmergency] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<bigint | null>(
    null,
  );
  const [submitError, setSubmitError] = useState<string | null>(null);

  const packages = [
    {
      id: 1,
      name: "Essential Item Retrieval",
      price: 99,
      items: "1 personal item",
      examples: ["Backpack", "Gym bag", "Keys", "Purse", "Laptop bag"],
    },
    {
      id: 2,
      name: "Personal Collection Retrieval",
      price: 149,
      items: "Up to 3 personal items",
      examples: [
        "Backpacks",
        "Storage bins",
        "Suitcases",
        "Clothing bags",
        "Small electronics",
      ],
    },
    {
      id: 3,
      name: "Standard Retrieval",
      price: 229,
      items: "Up to 5 personal items",
      examples: [
        "Storage totes",
        "Suitcases",
        "Electronics",
        "Personal effects",
      ],
    },
    {
      id: 4,
      name: "Transition Retrieval",
      price: 329,
      items: "Up to 8 personal items",
      examples: [
        "Clothing bundles",
        "Storage bins",
        "Laundry baskets",
        "Mixed personal belongings",
      ],
    },
    {
      id: 5,
      name: "Complete Personal Property Retrieval",
      price: 449,
      items: "Up to 15 personal items",
      examples: [
        "Bedroom contents",
        "Office contents",
        "Multiple storage containers",
        "Personal collections",
      ],
    },
    {
      id: 6,
      name: "Furniture Retrieval (Small Load)",
      price: 499,
      items: "Up to 3 large furniture items",
      examples: [
        "Mattress",
        "Couch",
        "Dresser",
        "Desk",
        "Recliner",
        "Washer",
        "Dryer",
      ],
    },
    {
      id: 7,
      name: "Furniture Retrieval (Medium Load)",
      price: 699,
      items: "Up to 5 furniture items",
      examples: [
        "Sofa",
        "Dining table",
        "Bedroom furniture",
        "Refrigerator",
        "Washer and dryer",
      ],
    },
    {
      id: 8,
      name: "Furniture Retrieval (Large Load)",
      price: 999,
      items: "Up to 8 furniture items",
      examples: [
        "Full bedroom set",
        "Living room set",
        "Dining room set",
        "Multi-room furniture recovery",
      ],
    },
    {
      id: 9,
      name: "Full Household Retrieval",
      price: 1499,
      items: "9+ furniture items",
      examples: [
        "Two retrieval specialists",
        "Extended coordination",
        "Priority scheduling",
        "High-conflict support",
      ],
      isStartingAt: true,
    },
  ];

  const calculateTotal = () => {
    if (!selectedPackage) return 0;
    const pkg = packages.find((p) => p.id === selectedPackage);
    if (!pkg) return 0;
    let total = pkg.price;
    if (addOns.twoWay) total += Math.round(pkg.price * 0.75);
    if (addOns.noContact) total += 99;
    if (addOns.protectiveWrap) total += 25;
    if (addOns.stairCarry > 0) total += addOns.stairCarry * 15;
    if (addOns.additionalStops > 0) total += addOns.additionalStops * 50;
    if (isEmergency) total += 79;
    return total;
  };

  const selectedPackageData = packages.find((p) => p.id === selectedPackage);

  const addInventoryItem = () => {
    if (newItem.name) {
      setInventory([...inventory, newItem]);
      setNewItem({ name: "", description: "", value: "", priority: "medium" });
    }
  };

  const handleSubmit = async () => {
    setSubmitError(null);
    if (!selectedPackage || !scheduleDate) {
      setSubmitError(
        "Please select a package and schedule date before submitting.",
      );
      return;
    }
    if (!address.street || !address.city || !address.state || !address.zip) {
      setSubmitError("Please complete the pickup address before submitting.");
      return;
    }

    const retrievalType = isEmergency
      ? RetrievalType.emergency
      : RetrievalType.separation;
    const pickupAddress = {
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      unit: address.unit || undefined,
      gateCode: address.gateCode || undefined,
      specialInstructions: address.instructions || undefined,
    };
    const safetyAssessment = {
      historyOfConflict: safety.conflict,
      restrainingOrder: safety.restrainingOrder,
      policeInvolvement: safety.police,
      weaponsConcern: safety.weapons,
      potentialThreats: safety.threats,
      childrenPresent: safety.children,
      petsPresent: safety.pets,
      notes: undefined,
    };
    const scheduledDate = BigInt(new Date(scheduleDate).getTime() * 1_000_000);
    const totalAmount = BigInt(calculateTotal());

    try {
      const booking = await createBooking.mutateAsync({
        retrievalType,
        pickupAddress,
        safetyAssessment,
        scheduledDate,
        totalAmount,
      });
      setConfirmedBookingId(booking.id);
    } catch (err) {
      setSubmitError(
        typeof err === "string"
          ? err
          : "Booking creation failed. Please try again.",
      );
    }
  };

  if (confirmedBookingId !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-transparent relative">
        <div className="glass-card w-full max-w-lg p-8 text-center">
          <h1 className="font-hero text-2xl font-bold text-cream mb-4 tracking-[0.08em] neon-glow-coral">
            Booking Confirmed!
          </h1>
          <p className="text-silver mb-2">
            Your booking number is{" "}
            <span className="text-coral font-bold">
              #{confirmedBookingId.toString()}
            </span>
          </p>
          <p className="text-silver mb-6">
            A confirmation email has been sent.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/dashboard" })}
            className="bg-coral text-navy font-bold px-6 py-3 rounded-lg hover:bg-orange-coral transition"
            data-ocid="booking.confirm_dashboard_button"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent py-8 px-4 relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main booking flow */}
        <div className="lg:col-span-2">
          <h1 className="font-hero text-3xl font-bold text-cream mb-8 text-center tracking-[0.08em]">
            Book Retrieval
          </h1>

          {/* Progress */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3, 4, 5, 6, 7].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  s === step
                    ? "bg-coral text-navy"
                    : s < step
                      ? "bg-emerald text-navy"
                      : "bg-silver/30 text-silver"
                }`}
                data-ocid={`booking.progress.step.${s}`}
              >
                {s}
              </div>
            ))}
          </div>

          <div className="glass-card p-8">
            {step === 1 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-cream mb-2 tracking-[0.08em]">
                  Select Your Package
                </h2>
                <p className="text-silver text-sm mb-4">
                  Choose the package that best fits your retrieval needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                  {packages.map((pkg) => (
                    <button
                      type="button"
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg.id)}
                      className={`p-4 rounded-lg border text-left transition glass-card-hover ${
                        selectedPackage === pkg.id
                          ? "border-coral bg-coral/20 text-cream"
                          : "border-silver/30 text-silver hover:border-coral"
                      }`}
                      data-ocid={`booking.package.item.${pkg.id}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-cream text-sm">
                          {pkg.name}
                        </span>
                        <span className="text-coral font-bold">
                          {pkg.isStartingAt
                            ? `From ${pkg.price}`
                            : `${pkg.price}`}
                        </span>
                      </div>
                      <p className="text-xs text-silver/80 mb-2">{pkg.items}</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.examples.slice(0, 3).map((ex) => (
                          <span
                            key={ex}
                            className="text-[10px] bg-navy/50 px-2 py-0.5 rounded text-silver"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
                  Pickup Address
                </h2>
                <input
                  placeholder="Street Address"
                  value={address.street}
                  onChange={(e) =>
                    setAddress({ ...address, street: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                  data-ocid="booking.address.street_input"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    placeholder="City"
                    value={address.city}
                    onChange={(e) =>
                      setAddress({ ...address, city: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                    data-ocid="booking.address.city_input"
                  />
                  <input
                    placeholder="State"
                    value={address.state}
                    onChange={(e) =>
                      setAddress({ ...address, state: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                    data-ocid="booking.address.state_input"
                  />
                </div>
                <input
                  placeholder="ZIP Code"
                  value={address.zip}
                  onChange={(e) =>
                    setAddress({ ...address, zip: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                  data-ocid="booking.address.zip_input"
                />
                <input
                  placeholder="Unit Number"
                  value={address.unit}
                  onChange={(e) =>
                    setAddress({ ...address, unit: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                  data-ocid="booking.address.unit_input"
                />
                <input
                  placeholder="Gate Code"
                  value={address.gateCode}
                  onChange={(e) =>
                    setAddress({ ...address, gateCode: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                  data-ocid="booking.address.gatecode_input"
                />
                <textarea
                  placeholder="Special Instructions"
                  value={address.instructions}
                  onChange={(e) =>
                    setAddress({ ...address, instructions: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream"
                  rows={3}
                  data-ocid="booking.address.instructions_input"
                />
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
                  Safety Assessment
                </h2>
                <div className="space-y-3">
                  {Object.entries(safety).map(([key, value]) => (
                    <label
                      key={key}
                      className="flex items-center text-silver hover:text-cream transition cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setSafety({ ...safety, [key]: e.target.checked })
                        }
                        className="mr-3 accent-coral"
                        data-ocid={`booking.safety.${key}_checkbox`}
                      />
                      {key
                        .replace(/([A-Z])/g, " $1")
                        .replace(/^./, (str) => str.toUpperCase())}
                      ?
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
                  Inventory Builder
                </h2>
                <div className="space-y-3 mb-4">
                  <input
                    placeholder="Item Name"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition"
                    data-ocid="booking.inventory.name_input"
                  />
                  <input
                    placeholder="Description"
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({ ...newItem, description: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition"
                    data-ocid="booking.inventory.description_input"
                  />
                  <input
                    placeholder="Estimated Value"
                    value={newItem.value}
                    onChange={(e) =>
                      setNewItem({ ...newItem, value: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition"
                    data-ocid="booking.inventory.value_input"
                  />
                  <select
                    value={newItem.priority}
                    onChange={(e) =>
                      setNewItem({ ...newItem, priority: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition"
                    data-ocid="booking.inventory.priority_select"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <button
                    type="button"
                    onClick={addInventoryItem}
                    className="bg-emerald text-navy font-bold px-4 py-2 rounded hover:bg-emerald/80 transition shadow-lg shadow-emerald/20"
                    data-ocid="booking.inventory.add_button"
                  >
                    Add Item
                  </button>
                </div>
                {inventory.length > 0 && (
                  <div className="space-y-2">
                    {inventory.map((item, idx) => (
                      <div
                        key={`${item.name}-${idx}`}
                        className="flex justify-between items-center bg-navy/30 p-3 rounded"
                        data-ocid={`booking.inventory.item.${idx + 1}`}
                      >
                        <span className="text-cream">{item.name}</span>
                        <span className="text-coral text-sm">
                          {item.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
                  Upload Documentation
                </h2>
                <div className="border-2 border-dashed border-coral/40 rounded-lg p-8 text-center hover:border-coral/70 transition cursor-pointer">
                  <p className="text-silver mb-4">
                    Drag and drop photos, videos, or PDFs here
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*,.pdf"
                    className="text-cream"
                    data-ocid="booking.documents.file_input"
                  />
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
                  Schedule
                </h2>
                <input
                  type="date"
                  value={scheduleDate}
                  onChange={(e) => setScheduleDate(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-navy/50 border border-silver/30 text-cream focus:outline-none focus:border-coral focus:ring-1 focus:ring-coral/30 transition"
                  data-ocid="booking.schedule.date_input"
                />
                <label className="flex items-center text-silver hover:text-cream transition cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isEmergency}
                    onChange={(e) => setIsEmergency(e.target.checked)}
                    className="mr-3 accent-coral"
                    data-ocid="booking.schedule.emergency_checkbox"
                  />
                  Emergency Same-Day Request (+$79)
                </label>
              </div>
            )}

            {step === 7 && (
              <div>
                <h2 className="font-display text-xl font-semibold text-cream mb-4 tracking-[0.08em]">
                  Payment
                </h2>
                <div className="space-y-2 text-silver mb-6">
                  <p>
                    Package:{" "}
                    <span className="text-cream">
                      {selectedPackageData
                        ? selectedPackageData.name
                        : "Not selected"}
                    </span>
                  </p>
                  <p>
                    Base Price:{" "}
                    <span className="text-cream">
                      {selectedPackageData
                        ? selectedPackageData.isStartingAt
                          ? `From ${selectedPackageData.price}`
                          : `${selectedPackageData.price}`
                        : "—"}
                    </span>
                  </p>
                  <p>
                    Items:{" "}
                    <span className="text-cream">{inventory.length}</span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="text-cream">
                      {scheduleDate || "Not selected"}
                    </span>
                  </p>
                  {addOns.twoWay && (
                    <p>
                      Two-Way Retrieval:{" "}
                      <span className="text-cream">
                        +75% (
                        {selectedPackageData
                          ? `+${Math.round(selectedPackageData.price * 0.75)}`
                          : ""}
                        )
                      </span>
                    </p>
                  )}
                  {addOns.noContact && (
                    <p>
                      No-Contact Coordination:{" "}
                      <span className="text-cream">+$99</span>
                    </p>
                  )}
                  {addOns.protectiveWrap && (
                    <p>
                      Protective Wrapping:{" "}
                      <span className="text-cream">+$25</span>
                    </p>
                  )}
                  {addOns.stairCarry > 0 && (
                    <p>
                      Stair Carry:{" "}
                      <span className="text-cream">
                        {addOns.stairCarry} flights (+${addOns.stairCarry * 15})
                      </span>
                    </p>
                  )}
                  {addOns.additionalStops > 0 && (
                    <p>
                      Additional Stops:{" "}
                      <span className="text-cream">
                        {addOns.additionalStops} extra (+$
                        {addOns.additionalStops * 50})
                      </span>
                    </p>
                  )}
                  {isEmergency && (
                    <p>
                      Emergency Same-Day:{" "}
                      <span className="text-cream">+$79</span>
                    </p>
                  )}
                  <p className="text-xl font-bold text-coral mt-4">
                    Total: ${calculateTotal()}
                  </p>
                  <p className="text-sm text-silver/70">
                    Each additional stop beyond pickup and delivery is +$50.
                  </p>
                </div>
                {submitError && (
                  <div
                    className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm"
                    data-ocid="booking.payment.error_state"
                  >
                    {submitError}
                  </div>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={createBooking.isPending}
                  className="w-full bg-coral text-navy font-bold py-3 rounded-lg hover:bg-orange-coral transition shadow-lg shadow-coral/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  data-ocid="booking.payment.submit_button"
                >
                  {createBooking.isPending ? "Processing..." : "Pay Now"}
                </button>
              </div>
            )}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="text-silver hover:text-cream transition px-4 py-2"
                  data-ocid="booking.nav.back_button"
                >
                  ← Back
                </button>
              )}
              {step < 7 && (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="ml-auto bg-coral text-navy font-bold px-6 py-2 rounded hover:bg-orange-coral transition shadow-lg shadow-coral/20"
                  data-ocid="booking.nav.next_button"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Cost Calculator Sidebar */}
        <div className="hidden lg:block">
          <CostCalculator
            selectedPackageId={selectedPackage}
            onPackageChange={(id) => setSelectedPackage(id)}
            addOns={addOns}
            onAddOnsChange={setAddOns}
          />
        </div>
      </div>
    </div>
  );
}
