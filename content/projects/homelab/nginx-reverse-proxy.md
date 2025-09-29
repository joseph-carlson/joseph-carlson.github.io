---
date: '2025-09-29'
draft: false
title: 'Nginx Reverse Proxy'
hidden: false
tags: 
  - all
  - homelab
---

## Stage 5: Nginx Reverse Proxy

In this article, I will lay out how I implemented a reverse proxy so my local resources can have a proper **signed certificate** (i.e. OPNsense and Proxmox VE management consoles). Nginx will serve as the reverse proxy, installed via Docker Compose on a virtual machine, utilizing the free certificate provided by my domain registered with DuckDNS. After that, the only tasks remaining were to add the Hosts (the previously mentioned OPNsense and Proxmox VE), add a DNS Override in Unbound, and adjust some security settings in OPNsense. Simple as that, I can access OPNsense and Proxmox VE with those good 'ol padlocks next to the URL with **no** certificate warnings. 

### Install Docker Compose

Let's assume you have a machine (bare-metal or virtual), already provisioned and updated with a static IP. The next step is to install Docker Compose. I chose a Debian 12 virtual machine within Proxmox VE with the static IP 192.168.1.2. 

Docker maintains it's own repository separate from the default APT (Advanced Package Tool) for Debian-based linux distributions, so it must be manually added prior to installation. 

Source: https://docs.docker.com/engine/install/debian/#install-using-the-repository

<br>

{{< code lang="bash" >}}
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

## Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
{{</ code >}}

### Install Docker Packages

Now that the repository has been added, the following command will install the required components.

{{< code lang="bash" >}}
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
{{</ code >}}

### Verify Docker Is Running 
Docker should auto-start after installation.
{{< code lang="bash" >}}
sudo systemctl status docker
{{</ code >}}


### Provision Nginx Container
{{< code lang="bash" >}}
# Create the "~/docker/nginx/" directory and the docker compose file within
cd ~
mkdir docker
cd docker
mkdir nginx
cd nginx
nano docker-compose.yml
{{</ code >}}

DOCKER COMPOSE FILE CONTENTS
{{< code lang="TXT" >}}
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      # These ports are in format <host-port>:<container-port>
      - '80:80' # Public HTTP Port
      - '443:443' # Public HTTPS Port
      - '81:81' # Admin Web Port
      # Add any other Stream port you want to expose
      # - '21:21' # FTP

    #environment:
      # Uncomment this if you want to change the location of
      # the SQLite DB file within the container
      # DB_SQLITE_FILE: "/data/database.sqlite"

      # Uncomment this if IPv6 is not enabled on your host
      # DISABLE_IPV6: 'true'

    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
{{</ code >}}

The following command will start the docker compose container in detached mode so it can run in the background. This must be run from within the same directory as the previously saved docker compose file.

{{< code lang="bash" >}}
# Current Directory: ~/docker/nginx/
sudo docker compose up -d
{{</ code >}}

Navigate to Admin Portal: http://192.168.1.2:81/

{{< img path="/projects/home-lab/nginx/nginx-proxy-manager-login.png" caption="Nginx Proxy Manager Login" alt="Screenshot of Admin panel login" >}}

And change the password! No defaults allowed here.

Designating the port with ":81" following the IP address is necessary, because otherwise, the browser will navigate to the default ports 80 or 443. If you do that, be prepared to meet this very unhelpful page.

{{< img path="/projects/home-lab/nginx/not-here.png" alt="Screenshot of web page" >}}

### Claim Free DuckDNS Domain

Unless you want to install your local certificate on every client device, you'll need a public domain with a publicly available certificate. And because I'm cheap, DuckDNS was where I ended up for this stage of the Home Lab. DuckDNS is funded by donations to provide free domains with certificates. 

I chose the domain "break2fix.duckdns.org" because that's my favorite way of learning. I break something, struggle to fix it, eventually get it to work, and leave with a better understanding of how and why the system was architected in the way it was.

{{< img path="/projects/home-lab/nginx/select-duck-dns.png" caption="Select Duck DNS Domain" alt="Screenshot of DuckDNS website" >}}

### Add DuckDNS Certificate to Nginx

{{< img path="/projects/home-lab/nginx/add-certificate.png" caption="Add Certificate to Nginx" alt="Screenshot of Nginx while adding certificate" >}}

### Add Hosts to Nginx

{{< imgs
    "/projects/home-lab/nginx/proxmox-host-1.png"
    "/projects/home-lab/nginx/proxmox-host-2.png"
>}}
{{< credit >}}
    1. Main Page
    <br>
    2. Select Certificate
{{< /credit >}}

### OPNsense Configuration Changes

{{< img path="/projects/home-lab/nginx/unbound-dns-override.png" caption="Add Unbound DNS Override" alt="OPNsense Screenshot" >}}

This happens because the domain is trying to access local resources (i.e. OPNsense). This built-in protection must be disabled to access the management console via the domain name (https://opnsense.break2fix.duckdns.org/) instead of the IP address (https://192.168.1.1/ui/core/dashboard).

{{< img path="/projects/home-lab/nginx/disable-dns-rebind.png" caption="Disable DNS Rebind" alt="OPNsense Screenshot" >}}

{{< img path="/projects/home-lab/nginx/disable-http-refer-enforcement.png" caption="Disable HTTP Refer Enforcement" alt="OPNsense Screenshot" >}}

---

### The Moment of Truth...

{{< img path="/projects/home-lab/nginx/proxmox-with-nginx.png" caption="Proxmox Through Nginx Reverse Proxy" alt="OPNsense Screenshot" >}}

{{< img path="/projects/home-lab/nginx/valid-certificate.png" alt="Screenshot of \"Verified by Let\'s Encrypt\"" >}}

---
## Future Plans

Now here's the deal. This was a neat project, but I don't like disabling those security settings and introducing DuckDNS with little-to-no true security benefit on my home network. Even without running the reverse proxy, I'm still connected to OPNsense and Proxmox over HTTPS. 

For the moment, I have shut down Nginx and will not be using it as a reverse proxy. I also reverted the configuration changes within Unbound DNS and OPNsense. Eventually, I will purchase a domain and reconfigure my home lab environment to utilize that domain, but today is not that day. 

Until next time, keep learning.