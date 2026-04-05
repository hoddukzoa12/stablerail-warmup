<p align="center">
  <img src="logo.png" alt="StableRail" width="160" />
</p>

<h1 align="center">StableRail: Orbital AMM on Solana</h1>

<p align="center">
  <strong>The first Solana-native implementation of Paradigm's Orbital AMM — multi-asset stablecoin pools with concentrated liquidity, depeg isolation, and institutional settlement</strong>
</p>

<p align="center">
  <a href="https://www.paradigm.xyz/2025/06/orbital">Paper</a> ·
  <a href="https://solana.com/">Solana</a> ·
  <a href="https://www.anchor-lang.com/">Anchor</a> ·
  <a href="https://www.colosseum.org/">Seoulana Warmup Hackathon</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-Devnet-blue?logo=solana" />
  <img src="https://img.shields.io/badge/Anchor-0.31.1-purple" />
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img src="https://img.shields.io/badge/License-AGPL--3.0-blue" />
</p>

---

## Why StableRail?

### The Problem

Stablecoin trading on Solana is **fragmented and capital-inefficient**:

- **Curve-style pools** (e.g., Saber) handle multi-asset swaps but lack concentrated liquidity — LPs earn thin yields
- **Uniswap V3-style pools** (e.g., Orca Whirlpools) offer concentrated liquidity but only for **2-asset pairs** — routing through multiple pools adds slippage and latency
- **No depeg protection** — when UST, USDD, or any stablecoin depegs, all LPs in the pool absorb the loss equally
- **No institutional on-ramp** — regulated entities (exchanges, payment processors, treasuries) cannot use permissionless pools due to compliance requirements

### The Market Opportunity

| Metric | Value |
|--------|-------|
| **Solana DEX stablecoin volume** | $2B+/day (2025) |
| **Global stablecoin market cap** | $230B+ |
| **Institutional stablecoin settlement** | Fastest-growing DeFi segment — Stripe, PayPal, Visa all entering |
| **Target TAM** | Solana stablecoin liquidity ($5B+) + institutional settlement flows |

Every stablecoin swap on Solana today goes through Orca, Raydium, or Jupiter routing — often splitting across 2-3 hops. StableRail replaces those multi-hop routes with a **single N-asset pool** that is mathematically superior.

### Our Solution

StableRail combines **three innovations in one protocol**:

1. **Orbital AMM** (Paradigm's design) — N-asset pools on a hypersphere invariant, combining Curve's multi-asset efficiency with Uniswap V3's concentrated liquidity
2. **Depeg Isolation** — when an asset depegs, the tick flips to `Boundary` status, isolating risk from other LPs instead of socializing losses
3. **Institutional Settlement Layer** — policy engine, KYC/AML registry, allowlists, volume limits, and on-chain audit trails for regulated entities

---

## How It's Different

| | **Saber (Curve)** | **Orca (CLMM)** | **StableRail (Orbital)** |
|---|---|---|---|
| Assets per pool | N-asset | 2-asset only | **N-asset** |
| Concentrated liquidity | No | Yes | **Yes** |
| Depeg isolation | No | No | **Yes** |
| Institutional compliance | No | No | **Yes (KYC, allowlist, audit trail)** |
| Swap hops for 3+ assets | 2+ hops via router | 2+ hops via router | **Single pool, 1 hop** |
| Capital efficiency | Low (full-range) | High (ticks) | **High (spherical cap ticks)** |

### Why This Matters for Solana Ecosystem Growth

- **More block space usage**: Single-pool N-asset swaps replace multi-hop routes, but institutional settlement adds entirely new on-chain transaction volume that currently happens off-chain
- **New user segment**: Institutional settlement brings regulated entities (exchanges, payment processors, corporate treasuries) on-chain for the first time
- **Composability**: Any Solana protocol can route stablecoin swaps through StableRail's pool via CPI — Jupiter, marginfi, Drift, etc.

---

## Why Solana?

Orbital AMM was designed on paper but never deployed to a production-grade L1. Solana is the **ideal chain** for this:

| Solana Feature | StableRail Benefit |
|---|---|
| **400ms block times** | Real-time swap execution — institutional settlement confirms in <1 second |
| **Sub-cent fees** | Micro-swaps viable — LPs can rebalance frequently without fee friction |
| **Parallel execution (Sealevel)** | Multiple independent swaps can execute simultaneously across asset pairs |
| **PDAs & account model** | Tick accounts, LP positions, and audit trails are natively composable on-chain |
| **SPL Token standard** | Unified token interface for USDC, USDT, PYUSD — no wrapper overhead |

---

## Key Innovations

| Feature | Description |
|---------|-------------|
| **Sphere Invariant** | `‖r - x‖² = r²` — geometric invariant enabling N-asset pools on a hypersphere |
| **Nested Ticks** | Spherical cap-based concentrated liquidity with per-tick reserves |
| **Depeg Isolation** | When an asset depegs, its tick flips to `Boundary` — isolating risk from other LPs |
| **Trade Segmentation** | Multi-tick swap execution with boundary detection and automatic tick crossing |
| **Analytical Swap Solver** | Closed-form quadratic solution (no Newton iteration) — optimized for Solana's compute units |
| **Institutional Settlement** | Policy engine, allowlists, daily volume limits, and on-chain audit trails |
| **KYC/AML Compliance** | On-chain KYC registry, risk scoring, jurisdiction filtering, FATF Travel Rule |

---

## Architecture

Single Anchor program with 4 bounded contexts as Rust modules:

```
orbital/
├── math/               # Core math engine
│   ├── sphere.rs       # Sphere invariant, price, equal-price point
│   ├── torus.rs        # Tick crossing detection, delta-to-boundary
│   ├── tick.rs         # k bounds, x_min/x_max, capital efficiency
│   ├── newton.rs       # Analytical swap solver (quadratic)
│   ├── fixed_point.rs  # Q64.64 fixed-point arithmetic (i128)
│   └── reserve_state.rs # O(1) invariant verification
│
├── domain/             # Business logic
│   ├── core/           # Pool operations, swap math
│   ├── liquidity/      # LP position management
│   ├── settlement/     # Institutional settlement orchestration
│   └── policy/         # Access control, compliance
│
├── instructions/       # On-chain instruction handlers
│   ├── initialize_pool     # Create N-asset pool with sphere invariant
│   ├── execute_swap        # Multi-segment swap with tick crossing
│   ├── create_tick         # Deploy concentrated liquidity tick
│   ├── add_liquidity       # Deposit to full-range or tick position
│   ├── remove_liquidity    # Withdraw with boundary-aware logic
│   ├── create_policy       # Define settlement policy
│   ├── update_policy       # Modify policy parameters
│   ├── manage_allowlist    # Add/remove institutional participants
│   ├── manage_kyc_entry    # KYC/KYT/AML registry per member
│   ├── execute_settlement  # Policy-checked institutional swap
│   └── close_pool          # Authority-only pool shutdown
│
├── state/              # Account definitions (PDA)
│   ├── pool, position, tick
│   ├── policy, allowlist, kyc_entry
│   └── settlement, audit_entry
│
├── errors.rs           # Program error codes
└── events.rs           # CPI event definitions
```

---

## Math Reference

Based on the [Paradigm Orbital paper](https://www.paradigm.xyz/2025/06/orbital):

| Formula | Description | Implementation |
|---------|-------------|----------------|
| `Σ(r - xᵢ)² = r²` | Sphere invariant | `sphere.rs` |
| `(r - xⱼ) / (r - xᵢ)` | Marginal price | `sphere.rs` |
| `q = r(1 - 1/√n)` | Equal price point | `sphere.rs` |
| `α = Σxᵢ / √n` | Alpha (torus coordinate) | `torus.rs` |
| `k_min = r(√n - 1)` | Minimum tick bound | `tick.rs` |
| `k_max = r(n-1) / √n` | Maximum tick bound | `tick.rs` |
| `D = √(k²n - n((n-1)r - k√n)²)` | Tick discriminant | `tick.rs` |
| `x_min = (k√n - D) / n` | Lower reserve bound | `tick.rs` |
| `x_max = min(r, (k√n + D) / n)` | Upper reserve bound | `tick.rs` |
| `s(α) = √(r² - (α - r√n)²)` | Boundary sphere radius | `torus.rs` |
| `d_out = -b + √(b² + 2ad - d²)` | Analytical swap output | `newton.rs` |

**Precision**: Q64.64 fixed-point (`i128` backing, 64 fractional bits) for all on-chain math.

---

## Frontend

Next.js 16 app with real-time Solana devnet integration:

| Page | Features |
|------|----------|
| **Swap** | Token selection, real-time quote with tick-aware calculator, slippage settings |
| **Dashboard** | Pool overview, reserve chart, LP positions, tick selector for concentrated liquidity |
| **Settlement** | Policy-compliant institutional swap form, Travel Rule data input, compliance preview |
| **Faucet** | Devnet SPL token faucet (USDC, USDT, PYUSD) |
| **Admin** | Policy management (KYC toggle, risk score, Travel Rule threshold), KYC registry, allowlist |

---

## Business Model

| Revenue Stream | Mechanism |
|---|---|
| **Swap Fees** | 1 bps (0.01%) per swap — competitive with Curve, cheaper than Orca's 1-5 bps tiers |
| **Settlement Fees** | Premium fee tier (5-10 bps) for institutional settlement with compliance guarantees |
| **Protocol Revenue** | Configurable protocol fee share (e.g., 10% of swap fees to treasury) |
| **Enterprise Licensing** | Custom policy engine deployments for exchanges and payment processors |

**Unit Economics**: At $100M daily volume, 1 bps fee = **$10K/day** protocol revenue. Institutional settlement at 5 bps on $50M volume = **$25K/day**. Combined: **$12.7M annualized**.

---

## Composability & Open Source

StableRail is designed to be a **public good** for the Solana ecosystem:

- **CPI-composable**: Any Solana program can call `execute_swap` via CPI — Jupiter aggregator, lending protocols (marginfi, Kamino), perp DEXes (Drift)
- **Open source (AGPL-3.0)**: Full source code available, auditable, forkable
- **Standard interfaces**: Uses SPL Token accounts and PDAs — no proprietary wrappers
- **Modular policy engine**: Other protocols can build on the settlement layer for their own compliance needs
- **SDK-ready**: TypeScript client library and IDL for frontend/backend integration

---

## Getting Started

### Prerequisites

- [Rust](https://www.rust-lang.org/tools/install) 1.75+
- [Solana CLI](https://docs.solanalabs.com/cli/install) 1.18+
- [Anchor](https://www.anchor-lang.com/docs/installation) 0.31.1
- [Node.js](https://nodejs.org/) 20+

### Build & Test

```bash
# Install dependencies
npm install

# Build Anchor program
npm run anchor-build

# Run on-chain tests
npm run anchor-test

# Start frontend dev server
npm run dev
```

### Deploy to Devnet

```bash
# Deploy program
npm run deploy:devnet

# Bootstrap pool + ticks with demo liquidity
npm run bootstrap:devnet
```

### Program ID

```
BZDXfJTBpH9ZMo2dz57BFKGNw4FYFCDr1KaUUkFtfRVD
```

---

## Demo Configuration (Devnet)

3-asset pool: **USDC · USDT · PYUSD**

| Parameter | Value |
|-----------|-------|
| Pool TVL | $150M (demo tokens) |
| Fee | 1 bps (0.01%) |
| Assets | 3 (n = 3) |
| Ticks | 5 concentrated ticks (3.5x - 18x concentration) |
| Tick TVL | $49M/asset across ticks |

---

## Implementation Status

Comprehensive analysis against the [Paradigm Orbital paper](https://www.paradigm.xyz/2025/06/orbital):

| Paper Concept | Status | Notes |
|---------------|--------|-------|
| Sphere invariant | ✅ Complete | Both O(n) and O(1) verification paths |
| Multi-asset pools (n ≤ 8) | ✅ Complete | Parameterized n with Q64.64 precision |
| Price formula | ✅ Complete | Marginal price, equal-price point |
| Tick math (k bounds, x_min/x_max) | ✅ Complete | All formulas verified against paper |
| Trade segmentation loop | ✅ Complete | While loop with boundary detection and tick flip |
| Analytical swap solver | ✅ Complete | Closed-form quadratic (CU-optimized) |
| Depeg isolation (tick flip) | ✅ Complete | Interior → Boundary status transition |
| Torus tick-crossing detection | ⚠️ Partial | Alpha-based detection works; full torus consolidation deferred |
| KYC/AML compliance | ✅ Complete | On-chain KYC registry, risk scoring, jurisdiction filter, Travel Rule |

> **Note**: The MVP prioritizes correctness of the sphere invariant, trade segmentation, and institutional compliance. Virtual reserve amplification and per-tick fee distribution are post-MVP enhancements.

---

## Project Structure

```
stablerail/
├── anchor/                 # Solana program (Rust/Anchor)
│   ├── programs/orbital/   # Main program source
│   └── Anchor.toml         # Anchor configuration
│
├── app/                    # Next.js frontend
│   ├── components/         # React components (swap, dashboard, settlement)
│   ├── hooks/              # Custom hooks (usePool, useSwapQuote, usePoolTicks, useKycEntries, useExecuteSettlement)
│   └── lib/                # Math library, config, deserializers
│
├── scripts/                # Deployment & bootstrap scripts
│   ├── deploy-devnet.sh    # Program deployment
│   ├── bootstrap-pool.ts   # Pool + tick + liquidity setup
│   └── create-demo-ticks.ts # Demo tick creation
│
└── docs/                   # Documentation
    ├── Orbital_Math_Reference.md
    ├── Orbital_DDD_Architecture.md
    ├── Orbital_Settlement_Protocol_PRD_v2.1.md
    └── DESIGN_SYSTEM.md
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Rust, Anchor 0.31.1 |
| Math Engine | Custom Q64.64 fixed-point (i128) |
| Frontend | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 4 |
| Charts | Recharts |
| Wallet | @solana/kit, Phantom |
| Network | Solana Devnet |

---

## Team

Built by a solo developer for the Seoulana Warmup Hackathon.

- Researched and implemented Paradigm's Orbital paper from scratch on Solana
- Full-stack: on-chain program (Rust/Anchor) + frontend (Next.js) + institutional settlement layer
- 10-day sprint from paper to working devnet deployment

---

## Roadmap

### Post-Hackathon

| Feature | Description |
|---------|-------------|
| Virtual reserve amplification | Use x_min from concentrated ticks to amplify swap math, reducing slippage |
| LP fee claim mechanism | Per-tick fee distribution and `claim_fees` instruction |
| Mainnet deployment | Security audit + mainnet launch |
| Jupiter integration | Route stablecoin swaps through StableRail via Jupiter aggregator |
| Multi-pool support | Deploy pools for different stablecoin sets (e.g., EUR stablecoins) |

---

## References

- [Paradigm — Orbital: A Multi-Asset Automated Market Maker](https://www.paradigm.xyz/2025/06/orbital)
- [Anchor Framework](https://www.anchor-lang.com/)
- [Solana Documentation](https://docs.solanalabs.com/)

---

## License

[AGPL-3.0](LICENSE)
