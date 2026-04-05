# StableRail Pitch Script (2:30)

Target: StableHacks 2026 Demo Video

---

## Slide 1: Title (15s)

> Stablecoins are a $200 billion market. But swapping between them at scale? Still broken.
>
> We built StableRail, the first Solana-native implementation of Paradigm's Orbital AMM, with an institutional settlement layer on top.

---

## Slide 2: The Problem (25s)

> Here's the problem. If you're an institution moving millions in stablecoins, you have two bad options.
>
> Curve gives you multi-asset pools, but they're capital-inefficient. LPs need to deposit 100x the liquidity just to keep spreads tight.
>
> Uniswap V3 is capital-efficient, but it only handles two assets per pool. And when a token depegs, LPs get crushed.
>
> And neither has a compliance layer. No KYC, no audit trail, no Travel Rule. Institutions can't touch it.

---

## Slide 3: The Solution (25s)

> Orbital solves this with three innovations.
>
> First, the Sphere Invariant. It's a geometric formula that enables N-asset pools on a hypersphere. Think Curve, but mathematically elegant.
>
> Second, Concentrated Ticks. Each LP can focus their capital in a specific price range, getting up to 18x capital efficiency. Like Uniswap V3, but for any number of assets.
>
> Third, Depeg Isolation. When a token loses its peg, the affected tick flips to Boundary status. LPs outside that range are completely safe. Risk stays contained.

---

## Slide 4: How It Works (25s)

> Under the hood, everything runs on-chain in a single Anchor program with four Rust modules.
>
> The core math uses Q64.64 fixed-point arithmetic on i128 for maximum precision. Swaps are computed analytically with a closed-form quadratic solver... no Newton iterations, no loops, just pure math. CU-optimized for Solana.
>
> Trade segmentation handles multi-tick swaps with alpha-based crossing detection. When a swap crosses a tick boundary, the engine automatically flips the tick and continues the trade in the next range.

---

## Slide 5: Institutional Layer (25s)

> What makes StableRail different from every other AMM is the institutional compliance layer.
>
> Every settlement executor must have a verified KYC entry on-chain, with a risk score, jurisdiction check, and AML clearance.
>
> For large settlements, we enforce the FATF Travel Rule, requiring originator and beneficiary identification right in the transaction.
>
> There's a policy engine with per-trade limits and daily volume caps. And every settlement is recorded as an immutable audit entry with a SHA256 action hash. Fully on-chain, fully verifiable.

---

## Slide 6: Roadmap (20s)

> For this hackathon, we shipped the complete MVP. Sphere invariant, concentrated ticks, trade segmentation, and the full KYC/AML compliance layer. All deployed and running on Solana devnet with a $150 million demo pool.
>
> Next up: virtual reserve amplification to convert concentrated liquidity into even lower slippage, per-tick fee distribution for LPs, and mainnet deployment.

---

## Slide 7: Closing (15s)

> StableRail. The institutional-grade stablecoin AMM that Solana deserves.
>
> All code is open source under AGPL-3.0. Check it out on GitHub, and try it live on devnet.
>
> Built for StableHacks 2026. Thank you.

---

## Timing Summary

| Slide | Content | Duration |
|-------|---------|----------|
| 1 | Title + hook | 15s |
| 2 | The Problem | 25s |
| 3 | The Solution | 25s |
| 4 | How It Works | 25s |
| 5 | Institutional Layer | 25s |
| 6 | Roadmap | 20s |
| 7 | Closing | 15s |
| **Total** | | **~2:30** |

## Delivery Notes

- Speak at a natural pace, not rushed
- Pause briefly between slides for visual transition
- Emphasize "18x capital efficiency" and "depeg isolation" as key differentiators
- On Slide 5, slow down slightly... the compliance layer is the unique selling point
- Keep energy high on the closing... end with confidence
