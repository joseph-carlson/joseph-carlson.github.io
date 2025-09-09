---
date: 2025-08-21
draft: false
title: 'AdGuard Home + Unbound DNS'
hidden: false
tags: 
  - all
  - homelab
---

In this section, I will set up AdGuard Home with Unbound DNS in my home lab environment. I am doing this because it provides an added layer of security on my home network, blocking malicious domains at the network level before they have a chance to load. I chose Unbound DNS as the upstream server from AdGuard Home because of its 

Create an alpine linux lxc container

update container

https://github.com/AdguardTeam/AdGuardHome

```
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
```

navigate to http://192.168.1.4:3000, or your container IP

http://192.168.1.4/#

AdGuard Home Web Interface > Settings > DNS Settings
Upstream DNS Servers
Replace default with 192.168.1.1
or your router's IP

Navigate to OPNsense > Services > Unbound DNS > General

Ensure Unbound is enabled, listening on port 53 on all interfaces

Change DNS Servers
OPNsense > System > Settings > General
127.0.0.1 
OPNsense > Services > ISC DHCPv4 > LAN
192.168.1.4 (AdGuard Home IP)

Clients → OPNsense DNS setting → AdGuard (LXC 192.168.1.4) → Unbound (192.168.1.1) → Internet
