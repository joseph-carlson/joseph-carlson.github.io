---
date: 2025-09-08
draft: false
title: 'Proxmox VE'
hidden: false
tags: 
  - all
  - homelab
---

## Stage 3: Proxmox Virtual Environment (VE)

Hosted on my Framework 13 Laptop.

1. Create Proxmox VE Installer using Rufus
2. Boot to Proxmox VE USB
3. Accept the EULA
4. Select disk and confirm format (ext4)
5. Select Country, Time zone, and Keyboard layout
6. Create root password and enter email
7. A few more selections:
  - Select the management interface
  - FQDN: pve.localdomain
    - Later changed to pve.home.arpa
  - IP Address (CIDR): 192.168.1.3 /24
    - I may change it to a non-standard IP range in the future to avoid conflicts with my VPN.

** DHCP Range 192.168.1.10 - 192.168.1.245 **

8. Click next and install
9. Navigate to the web portal
  - https://192.168.1.3:8006/
  - Accept the risk of the self-signed certificate
  - Sign into the root account with the above password

10. Accept that you don't have a valid subscription and decide to do something about it.
11. The following directions remove that message.

Disclaimer: Paying for software is good- definitely do that. I pay for Obsidian when I don't have to because I find their app so incredibly useful. I'm just not doing it for this because it's not in a production or mission-critical environment.

{{< code lang="zsh" >}}
ssh root@192.168.1.3

# enter the super secret password

cd /usr/share/javascript/proxmox-widget-toolkit

cp proxmoxlib.js proxmoxlib.js.bak

nano proxmoxlib.js
{{</ code >}}


- Ctrl+W
- "if (false)"
- Enter 
- That will jump to the line we're looking for.
- then replace 

{{< code lang="JS" >}}
Ext.Msg.show({
 title: gettext('No valid subscription'),
{{</ code >}}

with 

{{< code lang="JS" >}}
void({ //Ext.Msg.show({
 title: gettext('No valid subscription'),
{{</ code >}}

{{< code lang="zsh" >}}
systemctl restart pveproxy.service
{{</ code >}}

Poof, no annoying message on sign in.

One last thing.

Edit "/etc/systemd/logind.conf"
{{< code lang="txt" >}}
#HandleLidSwitch=suspend
#HandleLidSwitchExternalPower=suspend
#HandleLidSwitchDocked=suspend
{{</ code >}}

{{< code lang="txt" >}}
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
HandleLidSwitchDocked=ignore
{{</ code >}}

This ensures the Proxmox environment remains available when the laptop lid is closed.

{{< img path="/projects/home-lab/proxmox/proxmox-management-console.png" caption="Proxmox VE Management Console" alt="Screenshot" >}}

Until next time, keep learning.