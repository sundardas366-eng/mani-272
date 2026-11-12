"use client";

import React, { useState } from "react";
import { site } from "@/lib/site";
import styles from "./SdksSection.module.css";

interface SdkLanguage {
  id: string;
  name: string;
  filename: string;
  lines: React.ReactNode[];
  rawCode: string;
}

export function SdksSection() {
  const [activeLang, setActiveLang] = useState<string>("csharp");
  const [copied, setCopied] = useState<boolean>(false);

  const sdkLanguages: SdkLanguage[] = [
    {
      id: "csharp",
      name: "C# / .NET",
      filename: "Program.cs",
      rawCode: `// MANI 272 C# (.NET Core & Framework)
using MANI_272;

var client = new Mani272Client("YOUR_APP_ID", "YOUR_SECRET_KEY");
var result = client.ValidateLicense(userLicenseKey);

if (result.Success) {
    Console.WriteLine($"Welcome {result.Username}! Expiry: {result.Expiry}");
    // Launch secured features
} else {
    Console.WriteLine($"Access Denied: {result.Message}");
    Environment.Exit(0);
}`,
      lines: [
        <span key="1" className={styles.tokenComment}>// MANI 272 C# (.NET Core &amp; Framework)</span>,
        <span key="2"><span className={styles.tokenKeyword}>using</span> <span className={styles.tokenType}>MANI_272</span>;</span>,
        <span key="3"></span>,
        <span key="4"><span className={styles.tokenKeyword}>var</span> client = <span className={styles.tokenKeyword}>new</span> <span className={styles.tokenType}>Mani272Client</span>(<span className={styles.tokenString}>&quot;YOUR_APP_ID&quot;</span>, <span className={styles.tokenString}>&quot;YOUR_SECRET_KEY&quot;</span>);</span>,
        <span key="5"><span className={styles.tokenKeyword}>var</span> result = client.<span className={styles.tokenMethod}>ValidateLicense</span>(userLicenseKey);</span>,
        <span key="6"></span>,
        <span key="7"><span className={styles.tokenKeyword}>if</span> (result.<span className={styles.tokenVariable}>Success</span>) &#123;</span>,
        <span key="8">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>Console</span>.<span className={styles.tokenMethod}>WriteLine</span>($<span className={styles.tokenString}>&quot;Welcome &#123;result.Username&#125;! Expiry: &#123;result.Expiry&#125;&quot;</span>);</span>,
        <span key="9">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenComment}>// Launch secured features</span></span>,
        <span key="10">&#125; <span className={styles.tokenKeyword}>else</span> &#123;</span>,
        <span key="11">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>Console</span>.<span className={styles.tokenMethod}>WriteLine</span>($<span className={styles.tokenString}>&quot;Access Denied: &#123;result.Message&#125;&quot;</span>);</span>,
        <span key="12">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>Environment</span>.<span className={styles.tokenMethod}>Exit</span>(0);</span>,
        <span key="13">&#125;</span>,
      ],
    },
    {
      id: "cpp",
      name: "C++ Native",
      filename: "main.cpp",
      rawCode: `// MANI 272 C++ Native Client (MSVC / GCC)
#include "mani272_auth.hpp"

int main() {
    Mani272::Client client("YOUR_APP_ID", "YOUR_SECRET_KEY", "v2.6.4");
    auto session = client.validate_hwid(user_license_key);

    if (session.is_valid()) {
        std::cout << "[✓] Authenticated: " << session.username() << "\\n";
        launch_protected_features();
    } else {
        std::cerr << "[✗] Access Denied: " << session.error_code() << "\\n";
        exit(1);
    }
    return 0;
}`,
      lines: [
        <span key="1" className={styles.tokenComment}>// MANI 272 C++ Native Client (MSVC / GCC)</span>,
        <span key="2"><span className={styles.tokenKeyword}>#include</span> <span className={styles.tokenString}>&quot;mani272_auth.hpp&quot;</span></span>,
        <span key="3"></span>,
        <span key="4"><span className={styles.tokenKeyword}>int</span> <span className={styles.tokenMethod}>main</span>() &#123;</span>,
        <span key="5">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>Mani272::Client</span> client(<span className={styles.tokenString}>&quot;YOUR_APP_ID&quot;</span>, <span className={styles.tokenString}>&quot;YOUR_SECRET_KEY&quot;</span>, <span className={styles.tokenString}>&quot;v2.6.4&quot;</span>);</span>,
        <span key="6">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenKeyword}>auto</span> session = client.<span className={styles.tokenMethod}>validate_hwid</span>(user_license_key);</span>,
        <span key="7"></span>,
        <span key="8">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenKeyword}>if</span> (session.<span className={styles.tokenMethod}>is_valid</span>()) &#123;</span>,
        <span key="9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>std::cout</span> &lt;&lt; <span className={styles.tokenString}>&quot;[✓] Authenticated: &quot;</span> &lt;&lt; session.<span className={styles.tokenMethod}>username</span>() &lt;&lt; <span className={styles.tokenString}>&quot;\\n&quot;</span>;</span>,
        <span key="10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>launch_protected_features</span>();</span>,
        <span key="11">&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className={styles.tokenKeyword}>else</span> &#123;</span>,
        <span key="12">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>std::cerr</span> &lt;&lt; <span className={styles.tokenString}>&quot;[✗] Access Denied: &quot;</span> &lt;&lt; session.<span className={styles.tokenMethod}>error_code</span>() &lt;&lt; <span className={styles.tokenString}>&quot;\\n&quot;</span>;</span>,
        <span key="13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>exit</span>(1);</span>,
        <span key="14">&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>,
        <span key="15">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenKeyword}>return</span> 0;</span>,
        <span key="16">&#125;</span>,
      ],
    },
    {
      id: "python",
      name: "Python",
      filename: "main.py",
      rawCode: `# MANI 272 Python SDK (3.9+)
from mani272 import ManiAuthClient, LicenseError

client = ManiAuthClient(app_id="YOUR_APP_ID", app_secret="YOUR_SECRET_KEY")

try:
    session = client.authenticate(license_key=user_key)
    print(f"[✓] Active Session: {session.username} (HWID: {session.hwid})")
    # Execute protected application code
except LicenseError as e:
    print(f"[✗] Handshake Denied: {e.message}")
    exit(1)`,
      lines: [
        <span key="1" className={styles.tokenComment}># MANI 272 Python SDK (3.9+)</span>,
        <span key="2"><span className={styles.tokenKeyword}>from</span> mani272 <span className={styles.tokenKeyword}>import</span> <span className={styles.tokenType}>ManiAuthClient</span>, <span className={styles.tokenType}>LicenseError</span></span>,
        <span key="3"></span>,
        <span key="4">client = <span className={styles.tokenType}>ManiAuthClient</span>(app_id=<span className={styles.tokenString}>&quot;YOUR_APP_ID&quot;</span>, app_secret=<span className={styles.tokenString}>&quot;YOUR_SECRET_KEY&quot;</span>)</span>,
        <span key="5"></span>,
        <span key="6"><span className={styles.tokenKeyword}>try</span>:</span>,
        <span key="7">&nbsp;&nbsp;&nbsp;&nbsp;session = client.<span className={styles.tokenMethod}>authenticate</span>(license_key=user_key)</span>,
        <span key="8">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>print</span>(f<span className={styles.tokenString}>&quot;[✓] Active Session: &#123;session.username&#125; (HWID: &#123;session.hwid&#125;)&quot;</span>)</span>,
        <span key="9">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenComment}># Execute protected application code</span></span>,
        <span key="10"><span className={styles.tokenKeyword}>except</span> <span className={styles.tokenType}>LicenseError</span> <span className={styles.tokenKeyword}>as</span> e:</span>,
        <span key="11">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>print</span>(f<span className={styles.tokenString}>&quot;[✗] Handshake Denied: &#123;e.message&#125;&quot;</span>)</span>,
        <span key="12">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>exit</span>(1)</span>,
      ],
    },
    {
      id: "rust",
      name: "Rust",
      filename: "main.rs",
      rawCode: `// MANI 272 Rust Native Crate
use mani272_auth::{ManiClient, Result};

#[tokio::main]
async fn main() -> Result<()> {
    let client = ManiClient::new("YOUR_APP_ID", "YOUR_SECRET_KEY")?;
    let verification = client.verify_key(&user_license).await?;

    if verification.is_active() {
        println!("[✓] HWID bound to: {}", verification.device_hash());
        run_app();
    } else {
        eprintln!("[✗] Access rejected: {}", verification.reason());
        std::process::exit(1);
    }
    Ok(())
}`,
      lines: [
        <span key="1" className={styles.tokenComment}>// MANI 272 Rust Native Crate</span>,
        <span key="2"><span className={styles.tokenKeyword}>use</span> mani272_auth::&#123;<span className={styles.tokenType}>ManiClient</span>, <span className={styles.tokenType}>Result</span>&#125;;</span>,
        <span key="3"></span>,
        <span key="4"><span className={styles.tokenKeyword}>#[tokio::main]</span></span>,
        <span key="5"><span className={styles.tokenKeyword}>async fn</span> <span className={styles.tokenMethod}>main</span>() -&gt; <span className={styles.tokenType}>Result</span>&lt;()&gt; &#123;</span>,
        <span key="6">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenKeyword}>let</span> client = <span className={styles.tokenType}>ManiClient</span>::<span className={styles.tokenMethod}>new</span>(<span className={styles.tokenString}>&quot;YOUR_APP_ID&quot;</span>, <span className={styles.tokenString}>&quot;YOUR_SECRET_KEY&quot;</span>)?;</span>,
        <span key="7">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenKeyword}>let</span> verification = client.<span className={styles.tokenMethod}>verify_key</span>(&amp;user_license).<span className={styles.tokenKeyword}>await</span>?;</span>,
        <span key="8"></span>,
        <span key="9">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenKeyword}>if</span> verification.<span className={styles.tokenMethod}>is_active</span>() &#123;</span>,
        <span key="10">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>println!</span>(<span className={styles.tokenString}>&quot;[✓] HWID bound to: &#123;&#125;&quot;</span>, verification.<span className={styles.tokenMethod}>device_hash</span>());</span>,
        <span key="11">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>run_app</span>();</span>,
        <span key="12">&nbsp;&nbsp;&nbsp;&nbsp;&#125; <span className={styles.tokenKeyword}>else</span> &#123;</span>,
        <span key="13">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenMethod}>eprintln!</span>(<span className={styles.tokenString}>&quot;[✗] Access rejected: &#123;&#125;&quot;</span>, verification.<span className={styles.tokenMethod}>reason</span>());</span>,
        <span key="14">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>std::process</span>::<span className={styles.tokenMethod}>exit</span>(1);</span>,
        <span key="15">&nbsp;&nbsp;&nbsp;&nbsp;&#125;</span>,
        <span key="16">&nbsp;&nbsp;&nbsp;&nbsp;<span className={styles.tokenType}>Ok</span>(())</span>,
        <span key="17">&#125;</span>,
      ],
    },
    {
      id: "nodejs",
      name: "Node.js",
      filename: "index.js",
      rawCode: `// MANI 272 Node.js & TypeScript SDK
import { Mani272Auth } from "@mani272/sdk";

const auth = new Mani272Auth({
  appId: process.env.MANI_APP_ID,
  secretKey: process.env.MANI_SECRET_KEY,
});

const { valid, user, error } = await auth.verifyKey(userLicenseKey);

if (valid) {
  console.log(\`[✓] License confirmed for \${user.name}. Seats: \${user.seats}\`);
  startServices();
} else {
  console.error(\`[✗] Access Denied: \${error.message}\`);
  process.exit(1);
}`,
      lines: [
        <span key="1" className={styles.tokenComment}>// MANI 272 Node.js &amp; TypeScript SDK</span>,
        <span key="2"><span className={styles.tokenKeyword}>import</span> &#123; <span className={styles.tokenType}>Mani272Auth</span> &#125; <span className={styles.tokenKeyword}>from</span> <span className={styles.tokenString}>&quot;@mani272/sdk&quot;</span>;</span>,
        <span key="3"></span>,
        <span key="4"><span className={styles.tokenKeyword}>const</span> auth = <span className={styles.tokenKeyword}>new</span> <span className={styles.tokenType}>Mani272Auth</span>(&#123;</span>,
        <span key="5">&nbsp;&nbsp;appId: process.env.MANI_APP_ID,</span>,
        <span key="6">&nbsp;&nbsp;secretKey: process.env.MANI_SECRET_KEY,</span>,
        <span key="7">&#125;);</span>,
        <span key="8"></span>,
        <span key="9"><span className={styles.tokenKeyword}>const</span> &#123; valid, user, error &#125; = <span className={styles.tokenKeyword}>await</span> auth.<span className={styles.tokenMethod}>verifyKey</span>(userLicenseKey);</span>,
        <span key="10"></span>,
        <span key="11"><span className={styles.tokenKeyword}>if</span> (valid) &#123;</span>,
        <span key="12">&nbsp;&nbsp;<span className={styles.tokenType}>console</span>.<span className={styles.tokenMethod}>log</span>($<span className={styles.tokenString}>&quot;[✓] License confirmed for $&#123;user.name&#125;. Seats: $&#123;user.seats&#125;&quot;</span>);</span>,
        <span key="13">&nbsp;&nbsp;<span className={styles.tokenMethod}>startServices</span>();</span>,
        <span key="14">&#125; <span className={styles.tokenKeyword}>else</span> &#123;</span>,
        <span key="15">&nbsp;&nbsp;<span className={styles.tokenType}>console</span>.<span className={styles.tokenMethod}>error</span>($<span className={styles.tokenString}>&quot;[✗] Access Denied: $&#123;error.message&#125;&quot;</span>);</span>,
        <span key="16">&nbsp;&nbsp;<span className={styles.tokenType}>process</span>.<span className={styles.tokenMethod}>exit</span>(1);</span>,
        <span key="17">&#125;</span>,
      ],
    },
    {
      id: "rest",
      name: "REST API",
      filename: "verify.sh",
      rawCode: `# MANI 272 Cryptographic API Gateway
curl -X POST "https://auth.mani272api.xyz/api/v2/verify" \\
  -H "Content-Type: application/json" \\
  -H "X-MANI-App-Id: YOUR_APP_ID" \\
  -H "X-MANI-Signature: HMAC_SHA256_HASH" \\
  -d '{
    "license_key": "M272-XXXX-YYYY-ZZZZ",
    "hwid": "d41d8cd98f00b204e9800998ecf8427e",
    "timestamp": 1794505800
  }'`,
      lines: [
        <span key="1" className={styles.tokenComment}># MANI 272 Cryptographic API Gateway</span>,
        <span key="2"><span className={styles.tokenKeyword}>curl</span> -X POST <span className={styles.tokenString}>&quot;https://auth.mani272api.xyz/api/v2/verify&quot;</span> \</span>,
        <span key="3">&nbsp;&nbsp;-H <span className={styles.tokenString}>&quot;Content-Type: application/json&quot;</span> \</span>,
        <span key="4">&nbsp;&nbsp;-H <span className={styles.tokenString}>&quot;X-MANI-App-Id: YOUR_APP_ID&quot;</span> \</span>,
        <span key="5">&nbsp;&nbsp;-H <span className={styles.tokenString}>&quot;X-MANI-Signature: HMAC_SHA256_HASH&quot;</span> \</span>,
        <span key="6">&nbsp;&nbsp;-d <span className={styles.tokenString}>&#39;&#123;</span></span>,
        <span key="7"><span className={styles.tokenString}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;license_key&quot;: &quot;M272-XXXX-YYYY-ZZZZ&quot;,</span></span>,
        <span key="8"><span className={styles.tokenString}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;hwid&quot;: &quot;d41d8cd98f00b204e9800998ecf8427e&quot;,</span></span>,
        <span key="9"><span className={styles.tokenString}>&nbsp;&nbsp;&nbsp;&nbsp;&quot;timestamp&quot;: 1794505800</span></span>,
        <span key="10"><span className={styles.tokenString}>&nbsp;&nbsp;&#125;&#39;</span></span>,
      ],
    },
  ];

  const currentSdk = sdkLanguages.find((l) => l.id === activeLang) || sdkLanguages[0];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentSdk.rawCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="sdks" className={styles.section} aria-labelledby="sdks-heading">
      <div className={styles.container}>
        {/* Header matching screenshot */}
        <div className={styles.headerArea}>
          <span className={styles.badgeLabel}>DEVELOPER SDKS</span>
          <h2 id="sdks-heading" className={styles.sectionTitle}>
            Integrate in Under 3 Minutes
          </h2>
          <p className={styles.sectionSubtitle}>
            Native client libraries with automatic cryptographic heartbeats and anti-tamper guards.
          </p>
        </div>

        {/* Code Window Container */}
        <div className={styles.codeWindow} role="region" aria-label="SDK Integration Code Sample">
          {/* Window Chrome Header Bar */}
          <div className={styles.windowHeader}>
            {/* Left: Window Controls + Active File Badge */}
            <div className={styles.windowControls}>
              <div className={styles.dotsRow} aria-hidden="true">
                <span className={styles.dotRed} />
                <span className={styles.dotYellow} />
                <span className={styles.dotGreen} />
              </div>

              <div className={styles.fileBadge}>
                <span className={styles.fileIcon}>&lt;/&gt;</span>
                <span className={styles.fileName}>{currentSdk.filename}</span>
              </div>
            </div>

            {/* Middle: Language Tabs */}
            <div className={styles.tabsRow} role="tablist" aria-label="Select SDK language">
              {sdkLanguages.map((lang) => {
                const isActive = activeLang === lang.id;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`${styles.tabBtn} ${isActive ? styles.tabBtnActive : ""}`}
                    onClick={() => setActiveLang(lang.id)}
                  >
                    {lang.name}
                  </button>
                );
              })}
            </div>

            {/* Right: Copy Code Button */}
            <button
              type="button"
              className={`${styles.copyBtn} ${copied ? styles.copyBtnSuccess : ""}`}
              onClick={handleCopy}
              aria-label="Copy SDK source code to clipboard"
            >
              {copied ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
              <span>{copied ? "Copied!" : "Copy Code"}</span>
            </button>
          </div>

          {/* Code Body with Line Numbers & Syntax Highlighting */}
          <div className={styles.codeBody}>
            {/* Left Gutter: 1 to N */}
            <div className={styles.gutter} aria-hidden="true">
              {currentSdk.lines.map((_, index) => (
                <span key={index} className={styles.lineNumber}>
                  {index + 1}
                </span>
              ))}
            </div>

            {/* Code Content */}
            <div className={styles.codeContent}>
              <pre className={styles.codePre}>
                <code>
                  {currentSdk.lines.map((line, idx) => (
                    <div key={idx} className={styles.codeLine}>
                      {line}
                    </div>
                  ))}
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Teaser matching bottom banner in screenshot */}
        <div className={styles.resellerBanner}>
          <div className={styles.resellerLeft}>
            <div className={styles.resellerIcon}>👥</div>
            <div>
              <div className={styles.resellerTitle}>Scale with Dedicated Resellers &amp; Managers</div>
              <div className={styles.resellerDesc}>
                Automated sub-key generation, tiered margin controls, and real-time HWID resets.
              </div>
            </div>
          </div>
          <a
            href={site.portalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resellerBtn}
          >
            Reseller Portal &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
