---
date: 2025-08-20
draft: false
title: 'Proxmox VE'
hidden: false
tags: 
  - all
  - homelab
---

### Stage 3: Proxmox Virtual Environment

Hosted on my Framework 13 Laptop

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
    - Will later be changed to a non-standard IP range to avoid conflicts

** DHCP Range 192.168.1.10 - 192.168.1.245 **

8. Click next and install
9. Navigate to the web portal
https://192.168.1.3:8006/
Accept the risk of the self-signed certificate
Sign into the root account with the above password
10. Accept that you don't have a valid subscription and decide to do something about it.
11. Followed the following directions to get rid of that message.
You didn't actually think I would pay for the license? Did you?
```zsh
ssh root@192.168.1.3
```
- enter the super secret password
```zsh
cd /usr/share/javascript/proxmox-widget-toolkit
```
```zsh
cp proxmoxlib.js proxmoxlib.js.bak
```
```zsh
nano proxmoxlib.js
```
- Ctrl+W
- "if (false)"
- Enter 
- That will jump to the line we're looking for.
- then replace 
```javascript
Ext.Msg.show({
 title: gettext('No valid subscription'),
```
with 
```javascript
void({ //Ext.Msg.show({
 title: gettext('No valid subscription'),
```
```zsh
systemctl restart pveproxy.service
```
Poof, no annoying message on sign in.

One last thing.

Edit "/etc/systemd/logind.conf"
```txt
#HandleLidSwitch=suspend
#HandleLidSwitchExternalPower=suspend
#HandleLidSwitchDocked=suspend
```

```txt
HandleLidSwitch=ignore
HandleLidSwitchExternalPower=ignore
HandleLidSwitchDocked=ignore
```

This ensures the Proxmox environment remains available when the laptop lid is closed.