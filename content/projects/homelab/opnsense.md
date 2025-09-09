---
date: 2025-08-18
draft: false
title: 'OPNsense'
hidden: false
tags: 
  - all
  - homelab
---

### Stage 1. OPNsense Router + Firewall

Hosted on a Topton Fanless Mini PC from AliExpress.

Q: Why use this PC and not a router provided by my ISP, or even an off-the-shelf model?

A: I'm not using a router from my ISP because after a couple years, this mini pc will pay for itself in the rental costs. As for the off-the-shelf model, I don't trust the manufacturer to maintain security updates. These updates are especially high priority because I am exposing a port to the internet for VPN access.

Q: Why did I decide against virtualizing OPNsense within my Proxmox server? 

A: Because that adds an extra point of failure within the system. When I break things, I prefer it not take down my whole home network.

---

FQDN: opnsense.localdomain

*Later changed to opnsense.home.arpa*

IP: 192.168.1.1/24

*Will later be changed to a non-standard IP range to avoid conflicts*

Later 

0. Create OPNsense USB installer using Rufus
1. Connect eth0 to my modem
2. Boot into OPNsense USB
3. Enter default credentials:
  - username: installer
  - password: opnsense
4. Continue with default keymap 
5. Install (ZFS) -> ZFS GPT/UEFI Hybrid (Stripe)
6. Select disk
7. Accept default swap size of 8GB
8. Confirm everything on the disk will be destroyed
9. Install, change root password, and reboot
10. Configure WAN & LAN ports:
  - igc0 - WAN
  - igc1 - LAN
  - igc2 - opt1 LAN
  - igc3 - opt2 LAN
11. Power cycle modem to acquire WAN IP
12. Update OPNsense firmware
13. Search google.com, and take a sign of relief

Next to configure the LAN Bridge for igc1 and igc2: {{< newtablink url="https://docs.opnsense.org/manual/how-tos/lan_bridge.html" text="OPNSense Documentation" >}}

{{< imgs
    "/projects/home-lab/bridge-config.png"
    "/projects/home-lab/interface-assignment.png"
    "/projects/home-lab/lan-interface.png"
    "/projects/home-lab/wap-interface.png"
    "/projects/home-lab/tunable-member.png"
    "/projects/home-lab/tunable-bridge.png"
>}}
{{< credit >}}
    #1 Bridge Configuration
    <br>
    #2 Interface Assignment
    <br>
    #3 LAN Interface
    <br>
    #4 WAP Interface
    <br>
    #5 Member Interface Tunable
    <br>
    #6 Bridge Interface Tunable
    
{{< /credit >}}

---

Later, I will configure WireGuard for remote access, Unbound DNS to serve upstream of AdGuard Home, and igc3 as a secure VLAN isolated from my main network (configured for downstream ports on my managed switch).