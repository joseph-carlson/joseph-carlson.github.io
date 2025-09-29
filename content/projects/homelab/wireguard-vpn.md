---
date: 2025-09-01
draft: false
title: 'Wireguard VPN'
hidden: false
tags: 
  - all
  - homelab
---

## Stage 2: Remote Access

WireGuard is what makes it possible to visit to a nice coffee shop, order a latte and pastry, open my laptop, and pick up where I left off (without exposing my network to the internet). 

At the time of writing this, I am running OPNsense version 25.7.2.

First, I created a WireGuard instance, which defines the local tunnel address, port, and private/public key pair. Once created and enabled, this instance will listen for incoming traffic on the WAN IP through the designated port.

{{< img path="/projects/home-lab/wireguard/wireguard-instance.png" caption="WireGuard Instance" alt="WireGuard Instance" >}} 

Second, I enabled the WireGuard interface so I can configure the necessary firewall rules.

{{< img path="/projects/home-lab/wireguard/wireguard-interface.png" caption="WireGuard Interface" alt="WireGuard Interface" >}} 

Third, the firewall rules must be configured. Traffic from the internet must pass through the WAN firewall into the local network on port 51820 for WireGuard traffic. Then the WireGuard interface must allow traffic to local resources and the internet. "PrivateNetworks" is an alias I defined by he Private IPv4 Ranges established in RFC 1918.

{{< img path="/projects/home-lab/wireguard/wan-fw-rule.png" caption="WAN Firewall Rules" alt="WAN Firewall Rules" >}} 

{{< img path="/projects/home-lab/wireguard/wireguard-fw-rule.png" caption="WG Firewall Rules" alt="WG Firewall Rules" >}} 

Lastly, I used the Peer Generator to add both my MacBook and iPhone as peers on the WireGuard instance.  

{{< img path="/projects/home-lab/wireguard/mac-peer.png" caption="Mac Peer" alt="Mac Peer" >}} 

{{< img path="/projects/home-lab/wireguard/ios-peer.png" caption="IOS Peer" alt="IOS Peer" >}} 

<br>
Until next time, keep learning.