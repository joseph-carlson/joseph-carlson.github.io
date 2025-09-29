---
date: 2025-08-17
draft: false
title: About This Lab
tags:
  - all
  - homelab
---

## The Plan

Make things. Break things. Fix things. Then find a new way to break them.

Along the way, there are a few points I would like to hit on my implementation.

- Increase my network security.
- Network-wide ad-blocking with AdGuard Home.
- Remote network access with WireGuard VPN.
- Implement a reverse proxy to have valid certificates for local resources.
- Generate, aggregate, and analyze activity on the network.
- Display all this in a screenshot-worthy dashboard.

----


{{< img path="/projects/home-lab/network-diagram.png" caption="Network Diagram" alt="Network Diagram" >}}

---
### Roadmap:
- [X] [OPNsense](../opnsense)
- [X] [WireGuard VPN](../wireguard-vpn)
- [X] [Proxmox VE](../proxmox-ve)
- [X] [AdGuard Home](../adguard-home)
- [X] [Nginx Reverse Proxy](../nginx-reverse-proxy)
- [ ] Lab Environment Clients
  - General Use VMs (Fedore 42 KDE, Windows 11)
  - Windows 11 Bare Metal Device w/ RustDesk
  - Raspberry Pi 3b
- [ ] [Wazuh + ELK Stack SIEM](../siem-implementation)
- [ ] [Homepage](../homepage)
- [ ] SIEM AI Summaries with MLX-LM... maybe?

---

## Hardware for this Project

- ISP Provided Modem
- MacBook Pro M3
  - M3 Pro, 18 GB Unified Memory, 500 GB SSD
- Topton Fanless Mini PC
  - Intel N100, 16 GB DDR5 RAM, 265 GB NVMe SSD
- Framework 13 Laptop
  - AMD Ryzen 5 7640U, 32 GB DDR5 RAM, 1TB NVMe SSD
- NETGEAR Switch (Amazon Sale)
- ASUS Router (Goodwill Purchase)

---

## AI...

I decided to splurge and go for the paid tier of OpenAI's ChatGPT. 

TLDR - it was worth it.

It wasn't long ago when I was an AI cynic. Now don't mistake my words. AI is not to be trusted absolutely, but even with the occasional hallucinations, it's still worth it when I verify the output.

I remember using one of the first ChatGPT models and being very impressed yet disappointed when using it. Impressed because something like that could run without an internet connection. The idea of compressing a large quantity of human knowledge into a neural network was fascinating. Yet, for my use case, it disappointed because it did not yet accommodate how I would use it.

Next, there were the first models that started to reference online resources in real time. Still, it look me longer to determine where the model hallucinated than me doing it myself to begin with. It wasn't until I started using the most recent models from ChatGPT while working on this project when it became an asset. My understanding is the differentiator has been the larger context window. 

Though it is useful, all users should be aware of the current state of data confidentiality with these models.

https://openai.com/index/response-to-nyt-data-demands/