---
date: ''
draft: true
title: 'Anatomy of DNS'
tags: ['all', 'infrastructure']
---

"It's Always DNS"

The Domain Name System (DNS) allows us to use the internet without memorizing a 32 or 128-bit address for every single page on the internet. Instead, we can remember the website's name, such as google.com, to arrive at the correct destination.

Before diving into the conversation required to acquire an IP address for a website, we must first understand the destination. Every website has what's known as a fully qualified domain name consisting of a subdomain, domain, and top-level domain. One example is www.google.com. The www indicates that we will be directed to Google's web server. Google is the name of the website. The com is the top-level domain name; however, for other websites, it can use one of many others, including but not limited to edu and gov.

The next thing to know is DNS operates in a hierarchical structure, with a cache stored at each location. This cache stores a local record of which IP address is associated with which domain name. 

Okay, so you type google.com into a web browser. Your computer must establish a channel of communication with the server that hosts google.com. To do this, it requires the IP address of the server hosting google.com. Your computer achieves this through ARP and DNS queries.

1. Your computer checks its local DNS cache for the IP address of google.com.

2. If there is not an entry for google.com, it sends an ARP request over the LAN using the broadcast ID of 255.255.255.255 requesting the MAC address of the local DNS server. The DNS server will reply with its MAC address and the other devices will drop the request. If there is a local entry for google.com in the local cache, it will proceed to the next step.

3. Your computer will then send a DNS query for google.com to the MAC address of the local DNS server. If it has the IP for google.com cached, it will reply to your computer with that IP address. If not, it will refer to the NS record for where to move up the hierarchy to find the IP address of google.com. The local DNS server will send an ARP request out to the broadcast ID for the MAC address of the next name server to reference. If it is on the LAN, it will reply with the MAC address. If it is outside the LAN, the router will respond, saying all traffic destined for that name server outside the LAN will pass through it. The local DNS server then sends the DNS query to the router so it can be sent through the ISP's network to arrive on the next name server's LAN. At each step, an ARP request will be sent out to determine the next step.

4. Lastly, the name server refers to its records and sends the reply back to your computer, caching the IP with google.com for a set period of time at each step.

DNS stores records to associate the domain names with a fully qualified domain name, IP address, or the next DNS server to query at each stage in the hierarchy. Several of the most common DNS records are as follows.

- A Record: Holds the IP address of a fully qualified domain name IPv4 address.

- AAAA Record: Holds the IP addresses of a fully qualified domain name for IPv6-based addresses.

- CNAME Record: Forwards one domain or subdomain to another (google.com -> www.google.com).

- MX Record: Directs mail to a mail server.

- TXT Record: Set for notes and security policies from admins.

              - SPF (Sender Policy Framework): Specifies IP addresses authorized to send an email.

              - DKIM (DomainKeys Identified Mail): Helps prevent spam by storing a public cryptographic key to authenticate where the email originated.

              - DMARC (Domain-Based Message Authentication, Reporting and Conformance): Specified how strictly DMARC checks messages and the recommended action if an email fails an authentication check.

- NS Record: Stores the next DNS record to refer to if there is no cached record for the requested website.

- SOA Record: Stores admin information about a domain.

- SRV Record: Specifies a port for specific services.

- PTR Record: Provides a domain name for reverse lookup.