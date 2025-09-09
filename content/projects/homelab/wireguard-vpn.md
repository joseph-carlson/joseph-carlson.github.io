---
date: 2025-08-19
draft: false
title: 'Wireguard VPN'
hidden: false
tags: 
  - all
  - homelab
---

### Stage 3: Remote Access

This allows me to visit to a nice coffee shop, order a latte and pastry, open my laptop, and pick up where I left off (without exposing my network to the internet). 

At the time of writing this, I am running OPNsense version 25.7.2.

First, I created a WireGuard instance, which defines the local tunnel address, port, and private/public key pair. Once created and enabled, this instance will listen for incoming traffic on the WAN IP through the designated port.


