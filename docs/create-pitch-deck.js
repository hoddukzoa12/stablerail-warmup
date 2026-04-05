const pptxgen = require("pptxgenjs");
const pres = new pptxgen();

pres.layout = "LAYOUT_16x9";
pres.author = "StableRail Team";
pres.title = "StableRail: Orbital AMM on Solana";

// ── Color palette ──
const BG = "0A0A0F";
const BG_CARD = "14141F";
const PURPLE = "7C3AED";
const PURPLE_DIM = "5B21B6";
const WHITE = "FFFFFF";
const GRAY = "9CA3AF";
const GREEN = "10B981";
const CYAN = "06B6D4";
const PINK = "EC4899";

// ── Helper: fresh shadow factory ──
const cardShadow = () => ({
  type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.3,
});

// ══════════════════════════════════════════
// SLIDE 1: TITLE
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Accent line top
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04, fill: { color: PURPLE },
  });

  // Title
  s.addText("StableRail", {
    x: 0.5, y: 1.0, w: 9, h: 1.2,
    fontSize: 54, fontFace: "Arial Black", color: WHITE,
    align: "center", bold: true, margin: 0,
  });

  // Subtitle
  s.addText("Paradigm's Orbital AMM on Solana", {
    x: 0.5, y: 2.1, w: 9, h: 0.6,
    fontSize: 22, fontFace: "Arial", color: PURPLE,
    align: "center", margin: 0,
  });

  // Tagline
  s.addText("Multi-asset stablecoin pools. Concentrated liquidity. Institutional settlement.", {
    x: 1, y: 3.0, w: 8, h: 0.5,
    fontSize: 14, fontFace: "Arial", color: GRAY,
    align: "center", margin: 0,
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 3.8, w: 2, h: 0.02, fill: { color: PURPLE_DIM },
  });

  // Bottom badge
  s.addText("StableHacks 2026", {
    x: 0.5, y: 4.6, w: 9, h: 0.5,
    fontSize: 13, fontFace: "Arial", color: GRAY,
    align: "center", margin: 0,
  });
}

// ══════════════════════════════════════════
// SLIDE 2: THE PROBLEM
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("The $200B Stablecoin Problem", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", color: WHITE,
    align: "left", margin: 0,
  });

  const problems = [
    { title: "Curve", color: PINK, desc: "Great multi-asset pools, but capital-inefficient.\nLPs need 100x liquidity for tight spreads." },
    { title: "Uniswap V3", color: CYAN, desc: "Capital-efficient, but only 2 assets per pool.\nNo depeg protection for LPs." },
    { title: "Neither", color: PURPLE, desc: "No compliance layer for institutions.\nNo KYC, no audit trail, no Travel Rule." },
  ];

  problems.forEach((p, i) => {
    const y = 1.4 + i * 1.3;
    // Card bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 9, h: 1.1,
      fill: { color: BG_CARD },
      shadow: cardShadow(),
    });
    // Left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 0.06, h: 1.1,
      fill: { color: p.color },
    });
    // Title
    s.addText(p.title, {
      x: 0.85, y, w: 2.5, h: 1.1,
      fontSize: 18, fontFace: "Arial", color: p.color,
      bold: true, valign: "middle", margin: 0,
    });
    // Description
    s.addText(p.desc, {
      x: 3.2, y, w: 6.0, h: 1.1,
      fontSize: 13, fontFace: "Arial", color: GRAY,
      valign: "middle", margin: 0,
    });
  });
}

// ══════════════════════════════════════════
// SLIDE 3: THE SOLUTION
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("Orbital: Best of Both Worlds", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", color: WHITE,
    align: "left", margin: 0,
  });

  const pillars = [
    { title: "Sphere Invariant", desc: "N-asset pools on a hypersphere.\nLike Curve, but mathematically elegant.", icon: "||r-x||=r" },
    { title: "Concentrated Ticks", desc: "Per-LP capital efficiency up to 18x.\nLike Uni V3, but for N assets.", icon: "18x" },
    { title: "Depeg Isolation", desc: "When a token depegs, risk is contained\nper-tick. Safe LPs stay safe.", icon: "SAFE" },
  ];

  pillars.forEach((p, i) => {
    const x = 0.5 + i * 3.1;
    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x, y: 1.4, w: 2.85, h: 3.5,
      fill: { color: BG_CARD },
      shadow: cardShadow(),
    });
    // Icon circle
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.85, y: 1.7, w: 1.15, h: 1.15,
      fill: { color: PURPLE_DIM, transparency: 60 },
    });
    s.addText(p.icon, {
      x: x + 0.85, y: 1.7, w: 1.15, h: 1.15,
      fontSize: 14, fontFace: "Consolas", color: PURPLE,
      align: "center", valign: "middle", bold: true, margin: 0,
    });
    // Title
    s.addText(p.title, {
      x: x + 0.15, y: 3.05, w: 2.55, h: 0.5,
      fontSize: 16, fontFace: "Arial", color: WHITE,
      align: "center", bold: true, margin: 0,
    });
    // Description
    s.addText(p.desc, {
      x: x + 0.15, y: 3.55, w: 2.55, h: 1.1,
      fontSize: 11, fontFace: "Arial", color: GRAY,
      align: "center", margin: 0,
    });
  });
}

// ══════════════════════════════════════════
// SLIDE 4: HOW IT WORKS
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("Under the Hood", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", color: WHITE,
    align: "left", margin: 0,
  });

  const techPoints = [
    { label: "Invariant", val: "||r - x||^2 = r^2", desc: "Geometric invariant for N-asset stablecoin pools" },
    { label: "Ticks", val: "Spherical Caps", desc: "Alpha-based crossing detection, automatic tick flipping" },
    { label: "Solver", val: "Analytical (O(1))", desc: "Closed-form quadratic, no Newton iterations, CU-optimized" },
    { label: "Precision", val: "Q64.64 (i128)", desc: "64 fractional bits for on-chain fixed-point math" },
    { label: "Architecture", val: "1 Program, 4 Modules", desc: "Core, Liquidity, Settlement, Policy as Rust modules" },
  ];

  techPoints.forEach((p, i) => {
    const y = 1.3 + i * 0.8;
    // Row bg
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y, w: 9, h: 0.65,
      fill: { color: i % 2 === 0 ? BG_CARD : BG },
    });
    // Label
    s.addText(p.label, {
      x: 0.7, y, w: 1.6, h: 0.65,
      fontSize: 13, fontFace: "Arial", color: PURPLE,
      bold: true, valign: "middle", margin: 0,
    });
    // Value
    s.addText(p.val, {
      x: 2.4, y, w: 2.6, h: 0.65,
      fontSize: 13, fontFace: "Consolas", color: WHITE,
      valign: "middle", margin: 0,
    });
    // Description
    s.addText(p.desc, {
      x: 5.1, y, w: 4.2, h: 0.65,
      fontSize: 11, fontFace: "Arial", color: GRAY,
      valign: "middle", margin: 0,
    });
  });
}

// ══════════════════════════════════════════
// SLIDE 5: INSTITUTIONAL LAYER
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("Built for Institutions", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", color: WHITE,
    align: "left", margin: 0,
  });

  const features = [
    { title: "On-chain KYC Registry", desc: "Verified status, expiry dates, risk scoring (0-100), AML clearance" },
    { title: "FATF Travel Rule", desc: "Originator/beneficiary identification for settlements above threshold" },
    { title: "Policy Engine", desc: "Per-trade limits, daily volume caps, jurisdiction filtering (ISO codes)" },
    { title: "Immutable Audit Trail", desc: "SHA256 action hash, timestamped settlement records on-chain" },
    { title: "Allowlist Access", desc: "Only authorized wallets can execute institutional settlements" },
  ];

  features.forEach((f, i) => {
    const y = 1.3 + i * 0.8;
    // Accent dot
    s.addShape(pres.shapes.OVAL, {
      x: 0.7, y: y + 0.2, w: 0.22, h: 0.22,
      fill: { color: GREEN },
    });
    // Title
    s.addText(f.title, {
      x: 1.1, y, w: 3.0, h: 0.65,
      fontSize: 14, fontFace: "Arial", color: WHITE,
      bold: true, valign: "middle", margin: 0,
    });
    // Description
    s.addText(f.desc, {
      x: 4.2, y, w: 5.3, h: 0.65,
      fontSize: 12, fontFace: "Arial", color: GRAY,
      valign: "middle", margin: 0,
    });
  });
}

// ══════════════════════════════════════════
// SLIDE 6: ROADMAP
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  s.addText("What's Next", {
    x: 0.5, y: 0.3, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Arial Black", color: WHITE,
    align: "left", margin: 0,
  });

  // Left column: Shipped
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.3, w: 4.3, h: 3.7,
    fill: { color: BG_CARD },
    shadow: cardShadow(),
  });
  s.addText("Shipped (MVP)", {
    x: 0.7, y: 1.4, w: 3.9, h: 0.5,
    fontSize: 18, fontFace: "Arial", color: GREEN,
    bold: true, margin: 0,
  });

  const shipped = [
    "Sphere invariant (N-asset pools)",
    "Concentrated tick liquidity (8-18x)",
    "Trade segmentation with tick crossing",
    "KYC/AML compliance layer",
    "FATF Travel Rule support",
    "Devnet deployment ($150M TVL demo)",
  ];
  s.addText(
    shipped.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < shipped.length - 1, color: GRAY, fontSize: 12 },
    })),
    { x: 0.9, y: 2.0, w: 3.7, h: 2.8, fontFace: "Arial", color: GRAY },
  );

  // Right column: Coming Soon
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.3, w: 4.3, h: 3.7,
    fill: { color: BG_CARD },
    shadow: cardShadow(),
  });
  s.addText("Coming Soon", {
    x: 5.4, y: 1.4, w: 3.9, h: 0.5,
    fontSize: 18, fontFace: "Arial", color: PURPLE,
    bold: true, margin: 0,
  });

  const coming = [
    "Virtual reserve amplification",
    "Per-tick fee distribution",
    "Mainnet deployment",
    "Multi-pool routing",
    "Depeg simulation dashboard",
  ];
  s.addText(
    coming.map((t, i) => ({
      text: t,
      options: { bullet: true, breakLine: i < coming.length - 1, color: GRAY, fontSize: 12 },
    })),
    { x: 5.6, y: 2.0, w: 3.7, h: 2.8, fontFace: "Arial", color: GRAY },
  );
}

// ══════════════════════════════════════════
// SLIDE 7: CLOSING
// ══════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: BG };

  // Accent line top
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04, fill: { color: PURPLE },
  });

  s.addText("StableRail", {
    x: 0.5, y: 1.2, w: 9, h: 1.0,
    fontSize: 48, fontFace: "Arial Black", color: WHITE,
    align: "center", bold: true, margin: 0,
  });

  s.addText("The institutional-grade stablecoin AMM\nthat Solana deserves.", {
    x: 1, y: 2.2, w: 8, h: 0.8,
    fontSize: 18, fontFace: "Arial", color: GRAY,
    align: "center", margin: 0,
  });

  // Divider
  s.addShape(pres.shapes.RECTANGLE, {
    x: 4, y: 3.3, w: 2, h: 0.02, fill: { color: PURPLE_DIM },
  });

  // Links
  s.addText([
    { text: "github.com/hoddukzoa12/stablerail", options: { breakLine: true, fontSize: 12, color: PURPLE } },
    { text: "Program: BZDXfJTBpH9ZMo2dz57BFKGNw4FYFCDr1KaUUkFtfRVD", options: { breakLine: true, fontSize: 10, color: GRAY } },
    { text: "Built for StableHacks 2026", options: { fontSize: 11, color: GRAY } },
  ], {
    x: 1, y: 3.6, w: 8, h: 1.5,
    fontFace: "Consolas", align: "center", margin: 0,
  });
}

// ── Write file ──
const outPath = "/Users/hoddukzoa/Desktop/stablerail/docs/StableRail-Pitch-Deck.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("Pitch deck created:", outPath);
}).catch((err) => {
  console.error("Failed:", err);
});
