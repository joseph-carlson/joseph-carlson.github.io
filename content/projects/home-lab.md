---
date: ''
draft: false
title: 'Home Lab'
tags: ['all', 'homelab']
---
## The Plan

Make things. Break things. Fix things. Then find a new way to break them.

Along the way, there are a few points I would like to hit on my implementation.

- Increase my home network security beyond the stock configuration from my ISP via OpenVPN Wireguard Plugin.
- Implement network-wide ad-blocking via Pi-Hole.
- Allow me to remotely connect to my Windows laptop from anywhere via Wireguard and RustDesk.
- Secure the network via 802.1x authentication on ports and a guest Wi-Fi network on an isolated VLAN.
- Generate, aggregate, and analyze suspicious activity using various tools that will be mentioned later.

---

<h2 style="display: center">How to Make The Plan Work...</h2>

Diagram coming soon..

---

### Stage 1

**The Aliexpress Mini PC**

Considerations
Q: Why use this PC and not device privided by my ISP, or even an off-the-shelf model?
A: Definitely not using device from my ISP because after a couple years, this mini pc will pay for itself in the rental costs. Then the off-the-shelf model just seemed a little less fun then taking down my network several times a day when tinkering with the configuration.

Q: Why did I decide against virtualizing OPNsense within a Proxmox instance and host the Pi-Hole DNS service on the same device? 
A: Because that adds an extra point of failure within the system. While I can always hook up my old ASUS router in a pinch, I'm lazy and that seems like a lot of work.


- Install OPNsense
- Install Wireguard Plugin

FQDN: OPNsense.localdomain
IP: 192.168.1.1/24

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
11. Power cycle modem to aquire WAN IP
12. Update OPNsense firmware
13. Search google.com, and sigh in relief

Next to configure the LAN Bridge for igc1 and igc2
[OPNSense Documentation](https://docs.opnsense.org/manual/how-tos/lan_bridge.html)

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
    #5 Member Inferface Tunable
    <br>
    #6 Bridge Interface Tunable
    
{{< /credit >}}

### Stage 2

**Framework 13 Proxmox Instance**

1. Create Proxmox VE Installer using Rufus
2. Boot to Proxmox VE USB
3. Accept the EULA
4. Select disk and confirm format (ext4)
5. Select Country, Time zone, and Keyboard layout
6. Create root password and enter email
7. A few more configuration
Select the management interface
FQDN: pve.localdomain
IP Address (CIDR): 192.168.1.3 /24
** DHCP Range 192.168.1.10 - 192.168.1.245 **
8. Click next and install
9. Navigate to the web portal
https://192.168.1.3:8006/
Accept the risk of the self-signed certifictae
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
Ctrl+W
```if (false)```
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
Now for some reason following these instructions didn't work for me... but it seems to work for everyone else on the internet, so give it a shot.


### Stage 2

**Configure VLANs**

1. TheLowSeas
2. TheOpenSeas
3. TheHighSeas
4. DumbShit

---

## Mistakes

#1 Purchasing the Cisco Switch

In my mind, I was blinded by, I need to learn Cisco. I didn't place enough value on local bandwidth.


---

## AI...

I decided to splurge and go for the paid tier of OpenAI's ChatGPT. 

TLDR - it was worth it.

It wasn't long ago when I was an AI cynic. Now don't mistake my words. AI is not to be trusted absolutely, but even with the occasional hallucinations, I can live with them for two reasons.

- Review the output and verify.
- Nothing I am using it for is particularly high stakes.

I remember using one of the first ChatGPT models and being very impressed yet dissapointed when using it. Impressed because something like this could run without an internet connection. The idea of compressing a large quanity of human knowledge into a nueral network was fascinating. Yet, for my use case, it dissapointed because it did not yet accomadate how I would use it.

Next, there were the first models that started to reference online resources in real time. Still, it look me longer to determine where the model hallucinated than for me to do it by myself to begin with. It wasn't until I started using the most recent models from ChatGPT while working on this project when it became an asset.

Though it is useful, all users should be aware of the current state of data confidentiality.

https://openai.com/index/response-to-nyt-data-demands/

---

## Hardware for this Project

- Spectrum Provided Modem
- Ubiquiti U6+ Wireless Access Point
- Topton Intel N100 Fanless Mini PC

{{< datatable headers="Specifications, Software" >}}
*, *
*, *
*, *
{{< /datatable >}}

- MacBook Pro M3 Pro

{{< datatable headers="Specifications, Software" >}}
*, *
*, *
*, *
{{< /datatable >}}

- Framework 13 Laptop

{{< datatable headers="Specifications, Software" >}}
*, *
*, *
*, *
{{< /datatable >}}

- Del 2n1 Laptop


{{< datatable headers="Specifications, Software" >}}
*, *
*, *
*, *
{{< /datatable >}}

- Lenovo Thinkpad 

{{< datatable headers="Specifications, Software" >}}
*, *
*, *
*, *
{{< /datatable >}}

- Raspberry Pi 3
- VFD Display controlled by Arduino

---
Resources

**Home Network Guy**


**Other**
1. {{< newtablink url="https://logz.io/learn/complete-guide-elk-stack/" text="ELK Stack">}}

