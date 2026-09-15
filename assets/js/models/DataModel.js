// ================================================
// Model — all mall & spaces data + query helpers
// ================================================

window.KTM = window.KTM || {};

KTM.DataModel = {

  mall: {
    name: "The Kathmandu Mall",
    tagline: "Heart of the City",
    location: "Sundhara, Kathmandu",
    footfall_per_day: 12000,
    outlets: 100,
    floors: 5,
    highlights: [
      { icon: "📍", title: "Prime Location",   text: "New Road / Sundhara — opposite Nepal's busiest bus stop." },
      { icon: "🌏", title: "All 77 Districts", text: "Shoppers from every corner of Nepal converge here." },
      { icon: "🛍️", title: "100+ Outlets",    text: "Fashion, electronics, food, beauty — all under one roof." },
      { icon: "🎉", title: "Rooftop Venue",    text: "Launches, activations & corporate events." }
    ],
    gallery: [
      "flagship_light", "facade_hoarding_b", "way_to_ground_floor",
      "step_branding", "mid_floor_hoarding_a", "lift_interior", "lift_full_wrap"
    ]
  },

  spaces: [
    { id: "EXT-LIGHTBOARD-800",    name: "Flagship Light-Board Hoarding",   category: "Façade / Exterior",    zone: "Exterior",    size: "800 sqft · backlit 24/7",                  price_npr: 208333, price_label: "Rs. 25,00,000 / year",          quantity: 1, status: "available", highlights: ["Largest backlit board on the building", "24/7 illumination", "Visible from both ends of New Road"],                           image: "flagship_light.jpg" },
    { id: "EXT-HOARDING-A",        name: "Façade Hoarding A",               category: "Façade / Exterior",    zone: "Exterior",    size: "Standard façade hoarding",                 price_npr: 120000,  price_label: "Rs. 1,20,000 / month",            quantity: 1, status: "available", highlights: ["Front-facing main road", "High vehicular & pedestrian visibility"],                                                           image: "facade_hoarding_a.jpg" },
    { id: "EXT-HOARDING-B",        name: "Façade Hoarding B",               category: "Façade / Exterior",    zone: "Exterior",    size: "Standard façade hoarding",                 price_npr: 120000,  price_label: "Rs. 1,20,000 / month",            quantity: 1, status: "available", highlights: ["Twin to Hoarding A", "Same prime exterior visibility"],                                                                          image: "facade_hoarding_b.jpg" },
    { id: "GATE-MAIN-ENTRY",       name: "Main Gate Entry",                 category: "Main Gate",            zone: "Ground",      size: "Gate arch / entry frame",                  price_npr: 145000,  price_label: "Rs. 1,45,000 / month each",       quantity: 2, status: "available", highlights: ["Every visitor passes here", "First and last impression"],                                                                       image: "main_entry.jpg" },
    { id: "GATE-MAIN-PILLAR",      name: "Main Gate Pillar",                category: "Main Gate",            zone: "Ground",      size: "Full pillar wrap",                         price_npr: 70000,  price_label: "Rs. 70,000 / month",            quantity: 1, status: "available", highlights: ["Anchors the main entry", "Eye-level brand contact"],                                                                            image: "main_gate_pillar.jpg" },
    { id: "GATE-AFTER-ENTRY-PILLARS", name: "Pillars After Main Entry",     category: "Main Gate",            zone: "Ground",      size: "Twin pillar wrap",                         price_npr: 35000,  price_label: "Rs. 35,000 / month (per pillar)",     quantity: 1, status: "available", highlights: ["First brand contact inside the mall", "Captures every entering visitor"],                                                         image: "pillar_after_main_gate.jpg" },
    { id: "PARK-ENTRY",            name: "Entry to Parking",                category: "Parking",              zone: "Ground",      size: "Parking entry hoarding",                   price_npr: 80000,  price_label: "Rs. 80,000 / month",            quantity: 1, status: "available", highlights: ["Captures every vehicle entering parking"],                                                                                       image: "main_gate_entry.jpg" },
    { id: "PARK-GROUND-WAY",       name: "Way to Ground Floor Parking",     category: "Parking",              zone: "Ground",      size: "Path-side hoarding",                       price_npr: 80000,  price_label: "Rs. 80,000 / month",            quantity: 1, status: "available", highlights: ["Long dwell time as drivers slow into parking"],                                                                                   image: "way_to_ground_floor.jpg" },
    { id: "PARK-FIRST-FLOOR",      name: "First Floor Parking Branding",    category: "Parking",              zone: "Floor 1",     size: "Parking-floor hoarding",                   price_npr: 110000,  price_label: "Rs. 1,10,000 / month",            quantity: 1, status: "available", highlights: ["Premium positioning on first parking deck"],                                                                                      image: "first_floor_parking_branding.jpg" },
    { id: "PARK-EXIT-12X12",       name: "Parking Exit Side 12'×12'",       category: "Parking",              zone: "Ground",      size: "12' × 12' (144 sqft)",                     price_npr: 110000,  price_label: "Rs. 110,000 / month",            quantity: 1, status: "available", highlights: ["Last brand impression as visitors leave"],                                                                                        image: "parking_exit_side.jpg" },
    { id: "PARK-ENTRY-3SPACES",    name: "Entry-Side Parking (3 Spaces)",   category: "Parking",              zone: "Ground",      size: "3 adjacent boards",                        price_npr: 70000,  price_label: "Rs. 70,000 / month each",       quantity: 3, status: "available", highlights: ["Cluster of 3 adjacent boards", "Take all 3 for dominant impact"],                                                                 image: "parking_entry_side.jpg" },
    { id: "PILLAR-PREMIUM",        name: "Pillar Branding — Premium",       category: "Pillars",              zone: "All Floors",  size: "Full pillar wrap",                         price_npr: 12000,   price_label: "Rs. 12,000 / month per pillar",  quantity: 34, status: "available", highlights: ["34 premium pillars across mall", "Min booking: 5 pillars", "High-traffic interior columns"],                                       image: "pillar_branding_premimum.jpg" },
    { id: "PILLAR-STANDARD",       name: "Pillar Branding — Standard",      category: "Pillars",              zone: "All Floors",  size: "Full pillar wrap",                         price_npr: 10000,   price_label: "Rs. 10,000 / month per pillar",  quantity: 34, status: "available", highlights: ["34 standard pillars across mall", "Min booking: 5 pillars", "Best value pillar option"],                                          image: "pillar_branding_standard.jpg" },
    { id: "STAIR-SIDES",           name: "Stair Sides (Both)",              category: "Stairs & Escalator",   zone: "All Floors",  size: "Stair side panels — both sides",           price_npr: 40000,  price_label: "Rs. 40,000 / month (both sides)", quantity: 1, status: "available", highlights: ["Brand contact on every step climbed"],                                                                                          image: "stair_side.jpg" },
    { id: "STAIR-STEPS",           name: "Step Branding",                   category: "Stairs & Escalator",   zone: "All Floors",  size: "Riser-face graphics on steps",             price_npr: 45000,  price_label: "Rs. 45,000 / month",            quantity: 1, status: "available", highlights: ["Unmissable while climbing", "Stand-out creative format"],                                                                        image: "step_branding.jpg" },
    { id: "FLOOR-1-HOARDING",      name: "Floor 1 Horizontal Hoarding",     category: "Floor Hoardings",      zone: "Floor 1",     size: "Floor-wide horizontal board",              price_npr: 225000,  price_label: "Rs. 2,25,000 / month",            quantity: 1, status: "available", highlights: ["Premium first-floor positioning", "Highest footfall floor"],                                                                      image: "floor_1_horizontal.jpg" },
    { id: "FLOOR-2-HOARDING",      name: "Floor 2 Horizontal Hoarding",     category: "Floor Hoardings",      zone: "Floor 2",     size: "Floor-wide horizontal board",              price_npr: 175000,  price_label: "Rs. 1,75,000 / month",            quantity: 1, status: "available", highlights: ["Floor-wide hoarding on Floor 2"],                                                                                                 image: "floor_2_horizontal.jpg" },
    { id: "FLOOR-3-HOARDING",      name: "Floor 3 Horizontal Hoarding",     category: "Floor Hoardings",      zone: "Floor 3",     size: "Floor-wide horizontal board",              price_npr: 155000,  price_label: "Rs. 1,55,000 / month",            quantity: 1, status: "available", highlights: ["Floor-wide hoarding on Floor 3"],                                                                                                 image: "floor_3_hz.jpg" },
    { id: "FLOOR-4-HOARDING",      name: "Floor 4 Horizontal Hoarding",     category: "Floor Hoardings",      zone: "Floor 4",     size: "Floor-wide horizontal board",              price_npr: 125000,  price_label: "Rs. 125,000 / month",            quantity: 1, status: "available", highlights: ["Most affordable floor hoarding"],                                                                                                 image: "image64.jpg",            class: "floor_4_img_edited" },
    { id: "INTERIOR-TIER-A",       name: "Interior Branding — Tier A",      category: "Interior Spots",       zone: "All Floors",  size: "Premium interior spot",                    price_npr: 65000,  price_label: "Rs. 65,000 / month",            quantity: 1, status: "available", highlights: ["Highest-visibility interior spots"],                                                                                              image: "tier_a_vertical.jpg" },
    { id: "INTERIOR-TIER-B",       name: "Interior Branding — Tier B",      category: "Interior Spots",       zone: "All Floors",  size: "Mid-tier interior spot",                   price_npr: 55000,  price_label: "Rs. 55,000 / month",            quantity: 1, status: "available", highlights: ["Strong interior visibility"],                                                                                                     image: "tier_b_vertical.jpg" },
    { id: "INTERIOR-TIER-C",       name: "Interior Branding — Tier C",      category: "Interior Spots",       zone: "All Floors",  size: "Standard interior spot",                   price_npr: 45000,  price_label: "Rs. 45,000 / month",            quantity: 1, status: "available", highlights: ["Best-value interior spot"],                                                                                                       image: "tier_c.jpg" },
    { id: "BTW-2-3-SMALL",         name: "Between Floor 2 & 3 — Small",     category: "Interior Spots",       zone: "Floor 2-3",   size: "Small inter-floor board",                  price_npr: 45000,  price_label: "Rs. 45,000 / month",            quantity: 1, status: "available", highlights: ["Captures escalator riders between floors"],                                                                                       image: "between_floor_2_3.jpg" },
    { id: "BTW-2-3-DUAL",          name: "Between Floor 2 & 3 — Both Sides",category: "Interior Spots",       zone: "Floor 2-3",   size: "Twin board, both sides",                   price_npr: 45000,  price_label: "Rs. 45,000 / month (both)",     quantity: 1, status: "available", highlights: ["Sandwich brand contact — both sides"],                                                                                            image: "between_floor_2_3_both.jpg" },
    { id: "MID-FLOOR-HOARD-A",     name: "Mid-Floor Hoarding A",            category: "Floor Hoardings",      zone: "All Floors",  size: "Mid-size hoarding",                        price_npr: 25000,  price_label: "Rs. 25,000 / month",            quantity: 1, status: "available", highlights: ["Affordable mid-floor option"],                                                                                                    image: "mid_floor_hoarding_a.jpg" },
    { id: "MID-FLOOR-HOARD-B",     name: "Mid-Floor Hoarding B",            category: "Floor Hoardings",      zone: "All Floors",  size: "Mid-size hoarding",                        price_npr: 40000,  price_label: "Rs. 40,000 / month",            quantity: 1, status: "available", highlights: ["Slightly larger than Hoarding A"],                                                                                                image: "mid_floor_hoarding_b.jpg" },
    { id: "LIFT-INTERIOR",         name: "Lift Interior (per side)",        category: "Lift",                 zone: "All Floors",  size: "Single interior lift wall",                price_npr: 15000,   price_label: "Rs. 15,000 / month per side",    quantity: 4, status: "available", highlights: ["Captive audience inside lift", "Multiple sides available"],                                                                       image: "lift_interior.jpg" },
    { id: "LIFT-FULL-WRAP",        name: "Lift Full Wrap",                  category: "Lift",                 zone: "All Floors",  size: "Complete lift exterior + interior",         price_npr: 80000,  price_label: "Rs. 80,000 / month",            quantity: 1, status: "available", highlights: ["100% lift takeover", "Maximum brand immersion"],                                                                                  image: "lift_full_wrap.jpg" }
  ],

  getById(id) {
    return this.spaces.find(s => s.id === id) || null;
  },

  getCategories() {
    const seen = new Set();
    return ["All", ...this.spaces.map(s => s.category).filter(c => seen.has(c) ? false : seen.add(c))];
  },

  getByCategory(category) {
    if (category === "All") return this.spaces;
    return this.spaces.filter(s => s.category === category);
  }
};
