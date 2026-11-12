/**
 * MONEY 272 — SITE CONTENT & COPY CONSTANTS
 * Structured, typed, single source of truth for all marketing copy.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: "VIP" | "BYPASS" | "TOOL" | "LOADER";
  status: "LIVE" | "UNDETECTED" | "UPDATED";
  popular?: boolean;
  price: string;
  plans: string[];
  features: string[];
  compatibility: string;
  badge?: string;
}

export interface StatItem {
  id: string;
  targetValue: number;
  suffix: string;
  label: string;
  description: string;
}

export interface FeatureItem {
  title: string;
  tag: string;
  description: string;
}

export interface MeaningItem {
  digit: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
  meta: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

export interface ContactCard {
  id: string;
  platform: string;
  handle: string;
  displayValue: string;
  description: string;
  actionText: string;
}

export const navLinks: NavLink[] = [
  { label: "Product Total", href: "#product-total" },
  { label: "UID Bypass", href: "#uid-bypass" },
  { label: "Features", href: "#features" },
  { label: "SDKs", href: "#sdks" },
  { label: "How It Works", href: "#how" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export const productsData: ProductItem[] = [
  {
    id: "prod-lib-bypass",
    name: "MANI 272 — LIB BYPASS",
    tagline: "Kernel lib hook, memory patch & leak-proof bypass architecture. 100% undetected native engine.",
    category: "BYPASS",
    status: "UNDETECTED",
    popular: true,
    price: "$30 / Week · $75 / Month",
    plans: ["7 Days VIP", "30 Days Pro", "Lifetime VIP"],
    features: [
      "Native Lib Memory Hook & Integrity Bypass",
      "Leak-Proof Memory Protection Guard",
      "Anti-Cheat Signature Blacklist Evasion",
      "Zero Crash & Maximum Server Stability",
      "Automated Hardware (HWID) Binding",
    ],
    compatibility: "Windows 10 & 11 (All 64-bit Builds)",
    badge: "LEAK / LIB BYPASS",
  },
  {
    id: "prod-uid-bypass",
    name: "MANI 272 — UID BYPASS",
    tagline: "SAFE ALL SERVER · Advanced Aimbot & Visuals · Internal Panel | Main ID Safe.",
    category: "BYPASS",
    status: "UNDETECTED",
    popular: true,
    price: "$2 (1 Day) to $60 (Lifetime) · API from $20",
    plans: ["1 Day - $2", "3 Days - $4", "1 Week - $5", "1 Month - $12", "Lifetime - $60"],
    features: [
      "SAFE ALL SERVER · Main ID 100% Safe",
      "Advanced Aimbot & Visuals (ESP / Skeleton)",
      "Internal Panel Architecture",
      "Easy Setup & Full 24/7 Support",
      "Regular Emulators Compatible (Except MEmu & LDPlayer)",
      "API Available: 200 to Unlimited UID ($20 - $100)",
    ],
    compatibility: "All Servers · Regular Emulators (Except MEmu & LDPlayer)",
    badge: "SAFE ALL SERVER",
  },
  {
    id: "prod-brutal",
    name: "MANI 272 — BRUTAL EDITION",
    tagline: "Full-unleashed rage combat module with maximum damage register and rapid hit dispatch.",
    category: "VIP",
    status: "UNDETECTED",
    popular: true,
    price: "$25 / Week · $60 / Month",
    plans: ["1 Day Pass", "7 Days VIP", "30 Days Pro", "Lifetime Access"],
    features: [
      "Instant Lock & Extreme Bullet Track",
      "Zero Recoil & Zero Spread Elimination",
      "Rapid Fire & Magic Bullet Dispatch",
      "Full Anti-Tamper Memory Cloak",
      "Streamproof & Hidden Overlay",
    ],
    compatibility: "Windows 10 & 11 (20H2 - 24H2)",
    badge: "RAGE VIP",
  },
  {
    id: "prod-premium",
    name: "MANI 272 — PREMIUM SUITE",
    tagline: "All-in-one private gaming license combining advanced 3D ESP, bone skeleton & humanized aim.",
    category: "VIP",
    status: "UNDETECTED",
    popular: true,
    price: "$20 / Week · $50 / Month",
    plans: ["1 Day Trial", "7 Days VIP", "30 Days Pro", "Lifetime Access"],
    features: [
      "3D Box ESP, Bone Skeleton & Health Line",
      "Player Distance, Name & Weapon Info",
      "Smooth Humanized Aim with FOV Slider",
      "Recoil Smoothing & Trigger Assistance",
      "100% Streamproof Invisible Rendering",
    ],
    compatibility: "Windows 10 & 11 x64",
    badge: "POPULAR",
  },
  {
    id: "prod-internal",
    name: "MANI 272 — INTERNAL",
    tagline: "Direct DLL / Memory injection driver with zero frame drop and native ImGui DirectX hooks.",
    category: "VIP",
    status: "UNDETECTED",
    popular: false,
    price: "$25 / Week · $55 / Month",
    plans: ["7 Days", "30 Days", "Lifetime Access"],
    features: [
      "DirectX 11/12 ImGui Clean In-Game Menu",
      "Direct Memory Access (DMA Safe)",
      "Zero Overlay Lag / Maximum FPS Performance",
      "Anti-Screenshot & Clean Screen Capture",
      "HWID Bound 2 Dedicated Device Seats",
    ],
    compatibility: "Windows 10 / 11 x64",
    badge: "INTERNAL VIP",
  },
  {
    id: "prod-aimkill-exe",
    name: "MANI 272 — AIMKILL EXE",
    tagline: "Standalone executable for automatic target elimination with predictive trajectory calculations.",
    category: "VIP",
    status: "UNDETECTED",
    popular: true,
    price: "$18 / Week · $45 / Month",
    plans: ["1 Day", "7 Days", "30 Days"],
    features: [
      "Standalone External .EXE Architecture",
      "Predictive Velocity & Ballistic Calculations",
      "Target Priority (Closest / Lowest HP / FOV)",
      "Customizable Hotkey & Auto-Trigger",
      "Zero In-Game File Modification",
    ],
    compatibility: "Windows 10 & 11",
    badge: "AIMKILL VIP",
  },
  {
    id: "prod-silent-aim",
    name: "MANI 272 — SILENT AIM",
    tagline: "Invisible bullet redirection without snapping screen view or unnatural crosshair movement.",
    category: "VIP",
    status: "UNDETECTED",
    popular: true,
    price: "$20 / Week · $48 / Month",
    plans: ["1 Day", "7 Days", "30 Days", "Lifetime Access"],
    features: [
      "Zero Screen Snap (100% Legit Spectator View)",
      "Adjustable Bullet Redirection Angle",
      "Customizable FOV Radius & Distance Cap",
      "Bone Selection (Head / Neck / Chest)",
      "Ranked & Tournament Safe Profile",
    ],
    compatibility: "Windows 10 / 11 x64",
    badge: "STEALTH AIM VIP",
  },
  {
    id: "prod-silent-kill",
    name: "MANI 272 — SILENT KILL",
    tagline: "Stealth elimination module with desync compensation and delayed damage packet dispatch.",
    category: "VIP",
    status: "UNDETECTED",
    popular: false,
    price: "$22 / Week · $50 / Month",
    plans: ["7 Days", "30 Days", "Lifetime Access"],
    features: [
      "Stealth Damage Packet Dispatch",
      "Desync Compensation Algorithm",
      "Zero Replay Suspicion Signature",
      "Anti-Report Probability Shield",
      "Cloud Signature Daily Auto-Refresh",
    ],
    compatibility: "Windows 10 / 11 x64",
    badge: "SILENT KILL VIP",
  },
  {
    id: "prod-vault",
    name: "MANI 272 — VAULT",
    tagline: "Encrypted offline key storage, config cloud backups, and multi-profile preset synchronizer.",
    category: "TOOL",
    status: "LIVE",
    popular: false,
    price: "Free with any VIP / $10 Lifetime",
    plans: ["Included with VIP", "Lifetime Standalone"],
    features: [
      "AES-256 Encrypted Profile Storage",
      "One-Click Preset Switcher (Legit / Rage)",
      "Secure Cloud Sync for Configurations",
      "HWID Binding & Seat Re-assignment Tool",
      "Direct Discord Webhook Backup Alerts",
    ],
    compatibility: "All Windows Platforms",
    badge: "UTILITY",
  },
  {
    id: "prod-emote",
    name: "MANI 272 — EMOTE",
    tagline: "Unlock rare, seasonal, and exclusive celebratory character animations and lobby emotes.",
    category: "TOOL",
    status: "LIVE",
    popular: false,
    price: "$12 / Month · $30 / Lifetime",
    plans: ["30 Days Pass", "Lifetime Unlock"],
    features: [
      "All Seasonal & Exclusive Emotes Unlocked",
      "Client-Side & Lobby Visual Synchronization",
      "Safe Cosmetic Memory Hook (Zero Ban Risk)",
      "Instant Hotkey Emote Wheel Trigger",
      "Compatible with All Game Updates",
    ],
    compatibility: "Windows 10 / 11",
    badge: "COSMETIC",
  },
  {
    id: "prod-fps-booster",
    name: "MANI 272 — FPS BOOSTER",
    tagline: "Deep OS latency reduction, CPU thread unparking, and GPU frame pacing optimization.",
    category: "TOOL",
    status: "LIVE",
    popular: true,
    price: "$15 / Lifetime License",
    plans: ["Lifetime License"],
    features: [
      "Timer Resolution Tweak to 0.5ms Precision",
      "DirectX / GPU Driver Stutter Eliminator",
      "RAM Cache & Standby Memory Cleaner",
      "CPU Core Thread Unparking Optimization",
      "Guaranteed +35 to +85 FPS Boost",
    ],
    compatibility: "Windows 10 & 11 (Intel / AMD / Nvidia)",
    badge: "PERFORMANCE",
  },
  {
    id: "prod-streamer",
    name: "MANI 272 — STREAMER",
    tagline: "Clean display filter making all visuals, ESP lines, and menus 100% invisible on stream & recording.",
    category: "TOOL",
    status: "LIVE",
    popular: true,
    price: "Included with VIP / $15 Lifetime",
    plans: ["Included with VIP", "Lifetime Pass"],
    features: [
      "100% Invisible on OBS Studio & Streamlabs",
      "Discord Screen Share Cloak (Zero Overlay Leak)",
      "DirectX Desktop Capture Hooking Bypass",
      "Panic Key / Emergency Instant Hide Switch",
      "Zero Visual Artifacts on Stream Output",
    ],
    compatibility: "OBS Studio, Discord, Medal, Shadowplay",
    badge: "STREAMPROOF",
  },
];

export const heroContent = {
  pillText: "SOFTWARE LICENSING ● HMAC-SHA256 ● HWID BOUND",
  headlinePrefix: "MANI",
  headlineAccent: "272",
  headlineSub: "Software licensing, locked down.",
  description:
    "Issue keys, bind them to hardware, and verify every session in under 7 seconds. Cryptographic integrity meets friction-free developer operations.",
  ctaPrimary: "Enter KeyAuth Portal",
  ctaSecondary: "See how it works",
  ctaGhost: "Sign in",
  trustBadges: [
    { label: "99.98% Uptime SLA", value: "99.98%" },
    { label: "HMAC-SHA256 Verified", value: "CRYPTOGRAPHIC" },
    { label: "2 Devices / Key Default", value: "HWID BOUND" },
  ],
  meaningLine: {
    raw: "272 = 2 layers of protection · 7-second verification · 2 devices per key",
    part1: "2 layers of protection",
    part2: "7-second verification",
    part3: "2 devices per key",
  },
};

export const statsData: StatItem[] = [
  {
    id: "keys-verified",
    targetValue: 154,
    suffix: "K+",
    label: "Keys Verified",
    description: "Tamper-resistant sessions authenticated worldwide",
  },
  {
    id: "uptime",
    targetValue: 99.98,
    suffix: "%",
    label: "Service SLA",
    description: "High-availability geo-distributed edge nodes",
  },
  {
    id: "latency",
    targetValue: 412,
    suffix: "ms",
    label: "Median Verification",
    description: "End-to-end handshake with signature validation",
  },
  {
    id: "devices",
    targetValue: 2,
    suffix: " Devices",
    label: "Hardware Seats",
    description: "Deterministic HWID binding allocated per key",
  },
];

export const featuresContent = {
  badge: "CORE PROTECTION",
  heading: "One key. One machine. Zero leaks.",
  subcopy:
    "Eliminate unauthorized key sharing, cloned seats, and MITM replay attacks. MANI 272 pairs SHA256 hardware fingerprints with cryptographically signed payloads.",
  features: [
    {
      title: "HMAC-SHA256 signed payloads",
      tag: "CRYPTOGRAPHY",
      description:
        "Every heartbeat, license check, and payload returns a cryptographically signed HMAC-SHA256 digest verified by our client SDK before execution is unlocked.",
    },
    {
      title: "Hardware (HWID) lock",
      tag: "ENFORCEMENT",
      description:
        "Extracts irreversible hardware fingerprints combining motherboard UUID, CPU ID, and drive serials. Seats cannot be spoofed, shared, or virtualized without authorization.",
    },
    {
      title: "Reseller quotas & balances",
      tag: "MANAGEMENT",
      description:
        "Allocate isolated key pools, configure duration limits, and delegate license generation to trusted partners without revealing administrative secrets.",
    },
    {
      title: "Cross-platform SDKs",
      tag: "INTEGRATION",
      description:
        "Production-ready libraries for C++, C# (.NET), Python, and Android. Lightweight zero-allocation wrappers designed for high-performance client binaries.",
    },
  ],
  mockLicense: {
    plan: "ENTERPRISE DUAL-SEAT",
    licenseKey: "M272-88FA-71CE-904B-2B18",
    status: "ACTIVE",
    expiry: "Nov 12, 2027 · Lifetime Tier",
    devices: [
      {
        id: "DEV-01",
        name: "PRIMARY-STATION-WIN11",
        hwid: "8F2A-019B-4DCE-981A",
        status: "BOUND",
      },
      {
        id: "DEV-02",
        name: "FIELD-LAPTOP-X64",
        hwid: "17B4-E098-992C-55F0",
        status: "BOUND",
      },
    ],
  },
};

export const meaningData: MeaningItem[] = [
  {
    digit: "2",
    title: "Layers of Protection",
    subtitle: "HMAC + HWID",
    description:
      "2 independent defensive barriers: HMAC-SHA256 signed response payloads plus hardware-bound hardware (HWID) lock.",
  },
  {
    digit: "7",
    title: "Seconds Verification",
    subtitle: "Median < 7s SLA",
    description:
      "7-second maximum guarantee: median end-to-end key verification, handshake, and payload decryption executes in 412ms.",
  },
  {
    digit: "2",
    title: "Devices Per Key",
    subtitle: "Dual Hardware Slots",
    description:
      "2 dedicated device seats per key by default: allows primary desktop and mobile/laptop binding with instant remote seat revocation.",
  },
];

export const stepsData: StepItem[] = [
  {
    number: "01",
    title: "Generate or Acquire a Key",
    description:
      "Issue cryptographic license keys via the KeyAuth web portal or your automated reseller API with predefined durations and seat allowances.",
    meta: "Step 1 · Portal Gateway",
  },
  {
    number: "02",
    title: "Bind Your Hardware (HWID)",
    description:
      "On initial software launch, the SDK generates a deterministic cryptographic hardware hash and binds the machine to an available seat slot.",
    meta: "Step 2 · Machine Fingerprint",
  },
  {
    number: "03",
    title: "Verify Every Session",
    description:
      "Each application launch validates the HMAC-SHA256 signature in under 7 seconds, guaranteeing authentic payloads without local tampering.",
    meta: "Step 3 · Cryptographic Handshake",
  },
];

export const faqData: FaqItem[] = [
  {
    id: "faq-hwid",
    question: "What is HWID hardware binding and how does it prevent piracy?",
    answer:
      "HWID binding creates an irreversible cryptographic hash derived from physical machine components (CPU processor ID, BIOS/motherboard UUID, and drive serials). Once registered, the license will strictly refuse execution on any foreign machine.",
    tag: "SECURITY",
  },
  {
    id: "faq-hardware-change",
    question: "What happens if a user upgrades or replaces their hardware?",
    answer:
      "Minor peripheral changes (such as RAM or USB devices) will not trigger a mismatch. If a primary motherboard or CPU is swapped, the authorized administrator or key holder can trigger a remote HWID reset via the portal.",
    tag: "MAINTENANCE",
  },
  {
    id: "faq-seat-reset",
    question: "Can an administrator reset or reassign a device seat?",
    answer:
      "Yes. The KeyAuth portal provides instant seat management. Administrators can wipe an attached hardware fingerprint, enabling the key to bind to a replacement workstation immediately.",
    tag: "PORTAL CONTROLS",
  },
  {
    id: "faq-resellers",
    question: "How do reseller quotas and sub-accounts operate?",
    answer:
      "Resellers are provisioned scoped portal credentials with a capped balance of key generations. They can create, pause, or view keys for their end-users without accessing administrative secrets or other reseller pools.",
    tag: "COMMERCE",
  },
  {
    id: "faq-sdks",
    question: "Which programming languages and platforms are officially supported?",
    answer:
      "We provide production SDKs and documented integration templates for C++ (native MSVC/GCC), C# (.NET Framework & Core), Python (3.9+), and Android (NDK/Java). Code examples and headers are accessible via the portal documentation.",
    tag: "INTEGRATION",
  },
  {
    id: "faq-latency",
    question: "What are the verification latency and uptime guarantees?",
    answer:
      "Our auth infrastructure maintains a 99.98% uptime SLA with geo-replicated edge nodes. The median verification handshake completes in 412 milliseconds, well beneath our 7-second SLA threshold.",
    tag: "RELIABILITY",
  },
];

export const contactData: ContactCard[] = [
  {
    id: "discord",
    platform: "Discord Community",
    handle: "mani272",
    displayValue: "discord.gg/mani272",
    description: "Join the developer guild for live status alerts, integration support, and release notes.",
    actionText: "Copy Discord Tag",
  },
  {
    id: "email",
    platform: "Direct Support Email",
    handle: "support@mani272.com",
    displayValue: "support@mani272.com",
    description: "Direct engineering contact for enterprise licensing inquiries, custom contracts, and account audits.",
    actionText: "Copy Support Email",
  },
  {
    id: "github",
    platform: "GitHub Repository",
    handle: "mani272",
    displayValue: "github.com/sundardas366-eng/mani-272",
    description: "Browse open-source client SDK examples, quickstarts, and integration samples.",
    actionText: "Copy GitHub Handle",
  },
];

export const footerLinks = [
  { label: "Portal ↗", href: "PORTAL_URL", external: true },
  { label: "Privacy Policy", href: "/privacy", external: false },
  { label: "Terms of Service", href: "/terms", external: false },
  { label: "FAQ", href: "#faq", external: false },
  { label: "Contact", href: "#contact", external: false },
];

