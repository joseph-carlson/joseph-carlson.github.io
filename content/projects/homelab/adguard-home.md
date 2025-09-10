---
date: 2025-08-21
draft: false
title: 'AdGuard Home + Unbound DNS'
hidden: false
tags: 
  - all
  - homelab
---

In this section, I will set up AdGuard Home with Unbound DNS in my home lab environment. This provides an added layer of security on my home network, blocking malicious domains at the network level before they have a chance to load. I selected Unbound DNS as the upstream server from AdGuard Home because of it's privacy, performance, reliability, and flexibility.

## 1. Create and update an Linux Container (LXC)

I selected the Alpine linux container from the available Proxmox templates because of it's lightweight and secure characteristics. Configure this container with a static IP. This is necessary to redirect DNS queries to AdGuard Home before Unbound DNS. 

## 2. Install AdGuard Home within LXC


{{< code lang="BASH" >}}
curl -s -S -L https://raw.githubusercontent.com/AdguardTeam/AdGuardHome/master/scripts/install.sh | sh -s -- -v
{{</ code >}}

<br>

{{< newtablink url="https://github.com/AdguardTeam/AdGuardHome" text="Official AdGuard Home GitHub Repo" >}}



## 3. Navigate to AdGuard Home and Follow Setup Wizard

Navigate to "http://\<YOUR-CONTAINER-IP\>:3000"

In my case, the address is "http://192.168.1.4:3000"

The key is step 2, where you configure AdGuard Home to listen on all interfaces.

Port 80 for the web interface and 53 for the DNS server.

{{< img path="/projects/home-lab/adguard-home/adguard-home-interface.png" caption="AdGuard Home Interface" alt="AdGuard Home Interface Listening Ports 80 and 53" >}}

For all further configuration, AdGuard Home can be reached at the container IP. No port should be specified because 80 is the default port for HTTP traffic.

## 4. Configure Upstream DNS

Navigate to "AdGuard Home Web Interface > Settings > DNS Settings"

Under Upstream DNS Servers, replace default value with your desired DNS.

I entered 192.168.1.1 so DNS lookups get forward to the Unbound DNS Service in OPNsense.

{{< img path="/projects/home-lab/adguard-home/adguard-home-upstream-dns.png" caption="AdGuard Home Upstream DNS" alt="Upstream DNS Edited" >}}

Navigate to OPNsense > Services > Unbound DNS > General

## 5. Ensure Unbound is Configured

Make sure Unbound DNS is enabled and listening at port 53 on all interfaces.

{{< img path="/projects/home-lab/adguard-home/unbound-enabled.png" caption="Unbound Service Configured" alt="Unbound Service Configuration" >}}

## 6. Change OPNsense DNS Settings (System + DHCP)

OPNsense > System > Settings > General > DNS Servers: 127.0.0.1 

{{< img path="/projects/home-lab/adguard-home/system-dns.png" caption="System DNS" alt="System DNS Config" >}}

OPNsense > Services > ISC DHCPv4 > LAN > DNS Servers: 192.168.1.4 

Enter your AdGuard Home IP configured in step #1

This is the name server utilized by network client configured with DHCP.

{{< img path="/projects/home-lab/adguard-home/ipv4-dhcp-dns.png" caption="IPv4 DHCP DNS" alt="IPv4 DHCP DNS" >}}

---

{{< img path="/projects/home-lab/adguard-home/adguard-home-dashboard.png" caption="AdGuard Home Dashboard" alt="AdGuard Home Dashboard" >}}

---

When properly configured, the traffic flows as follows...

Network Clients → OPNsense DNS Setting → AdGuard (192.168.1.4:53) → Unbound (192.168.1.1:53) → Internet