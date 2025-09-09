---
date: 2025-08-11
draft: false
title: "XZ Utils: Open-Source Exploitation"
tags:
  - all
  - malware
  - open-source
---
## XZ Utils - a wake-up call for open-source software

{{< newtablink url="https://www.cve.org/CVERecord?id=CVE-2024-3094" text="CVE-2024-3094" >}}

Free and open-source software is great. People assume it is secure- after all, it has the eyes of the world on it. Like most things, the reality is much more nuanced than it appears. Much of the responsibility of this open-source code lies on individual maintainers, who are oftentimes unpaid volunteers working in isolation without institutional support. These conditions could have set the stage for open-source's worst-case scenario, if it weren't for a single engineer who discovered the backdoor by chance.

---
### High-Level Root Cause Analysis 

In March of 2024, a severe backdoor was discovered in XZ Utils, a widely used core compression utility in several Linux distributions. This backdoor, discovered by Andres Freund and announced to the public on Openwall's "oss-security" mailing list[^1], demonstrated how a long-con insider threat successfully committed malicious code to this open-source project.

The attacker who goes by "Jia Tan" (JiaT75), presented themselves as a helpful contributor and gradually gained trust in the XZ Utils project over the duration of two years. Through several commits, detailed in the picture below (created by Thomas Roccia and posted on infosec.exchange)[^2], JiaT75 introduced one of the most impressive supply chain exploits ever discovered.

Three main factors aided in the obscurity of the malicious code:
- Blended with legitimate commits
- Spread across multiple files
- Dormant under normal circumstances

{{< img path="/case-studies/xz-utils.png" caption="Backdoor Infographic"  alt="Backdoor Infographic" >}}

For more details, visit {{< newtablink url="https://daily.dev/blog/xz-backdoor-the-full-story-in-one-place" text="daily.dev" >}}or {{< newtablink url="https://www.akamai.com/blog/security-research/critical-linux-backdoor-xz-utils-discovered-what-to-know?utm_source=chatgpt.com" text="Akamai Breakdown" >}}for great breakdowns on the exploit.

---
### Open Source to Blame? 

While JiaT75 was the sole contributor behind the backdoor, we still don't know who was behind that alias. Due to the complexity of this backdoor, most industry professionals have speculated that this was a nation-state threat actor. Unfortunately, this alone doesn't do us much good moving forward. The circumstances that allowed JiaT75 to commit such a severe backdoor into such a widely utilized tool must be scrutinized to prevent a future where the next backdoor goes undetected.

---
### What Can be Done?

CISA highlighted some takeaways following the discovery and remediation of this backdoor[^3]. Though we got lucky this time with early detection, there needs to be a fundamental shift where for-profit corporations that use these open-source projects must help contribute to the sustainability of these projects. Whether that be through more dedicated developer time where employees can directory contribute, funding through grants and sponsorships, security audits, bug bounty programs, and legal support. 

Though companies like Google contribute to open source with the Chromium and Android projects, that funding rarely makes it to the individual contributors maintaining smaller, lesser-known repositories. 

---
### Resources
- {{< newtablink url="https://youtu.be/vV_WdTBbww4?si=6xFXWjXsMSkz-f9w" text="For a Deeper Explanation: Ed from Low Level" >}}
- {{< newtablink url="https://youtu.be/F7iLfuci75Y?si=1n9KBi4UV3kseKLz" text="Excellent Story with Animations: Fern" >}} 
- {{< newtablink url="https://youtu.be/vtce4vmZIC8?si=qBOLjGZnhrSuxY3G" text="Linus Torvalds: Trust in the Open Source Community" >}}

{{< youtube bS9em7Bg0iU >}}

[^1]: https://www.openwall.com/lists/oss-security/2024/03/29/4

[^2]: https://infosec.exchange/@fr0gger/112189232773640259

[^3]: https://www.cisa.gov/news-events/news/lessons-xz-utils-achieving-more-sustainable-open-source-ecosystem