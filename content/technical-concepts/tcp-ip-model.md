---
date: ''
draft: false
title: 'TCP IP Model'
tags: ['all', 'infrastructure', 'networking']
---

## A Little Context

The origins of computer networking can be traced back to ARPANET (The U.S. Advanced Research Projects Agency Network) in 1969. ARPANET was the first wide-area packet-switched network relying on TCP/IP, enabling communication between universities across the country.

As mentioned in the last article, the TCP/IP model is a more targeted approach for modeling modern networks, as nearly every network in use these days rely on TCP and UDP traffic. While this is extremely useful, the OSI model is still used to break down networking infrastructure with more granularity while allowing for more flexibility in implementing these networks.

The TCP/IP model merges the OSI model's physical and data link layers into the network interface layer, which is also known as the internet layer. The transport layer remains unchanged. Then, the session, presentation, and application layers are merged into the application layer.

## The Four Layers

The network interface layer consists of the physical infrastructure and the low-level protocols that enable the communication of these devices within their local area network. Copper and fiber optic cables, hubs, repeaters, and media converters are a few devices that serve as the backbone of nearly every network operating at layer 1 of the TCP/IP model. The protocols used by these physical devices consist of Ethernet and Point-to-Point Protocol, while each device is identified by its MAC address.

Ethernet: A protocol designated by the IEEE 802.3 standard, enabling the communication between devices in a local area network by identifying a target device by its MAC (Media Access Control) address. While MAC addressed can be spoofed, assuming there have been no manufacturing errors, each network interface card has a unique MAC address found on no other device in the whole world.

The Internet layer is made up of protocols that allow devices to communicate outside of their respective local area networks using logical addresses. These logical addresses can be from the IPv4 or IPv6 range. The former uses a 32-bit identifier broken up into four (referred to as dotted decimal notation), while the latter uses a 128-bit identifier broken up into eight groups of four hexadecimal digits. The protocols operating at this layer are IP, ICMP, ARP, and Reverse ARP.

IP (Internet Protocol): A logical addressing system using a 32-bit or 128-bit address to identify a machine on a local or wide area network. There is more to cover, but that deserves its own article.

ICMP (Internet Control Message Protocol): While this protocol can be used in DDoS attacks, its more mundane use is the ping command. This is because it was designed for error reporting and network diagnostics.

ARP (Address Resolution Protocol): This protocol obtains the MAC address associated with a given IP address so the traffic can be routed on the local area network to the correct device.

Reverse ARP: This legacy protocol is used to obtain the IP address for a MAC address. This was replaced by the Bootstrap Protocol (BOOTP), then the Dynamic Host Configuration Protocol (DHCP) in modern networks. This evolution because each protocol offered more features than its predecessor.

The transport layer builds upon everything beneath it, introducing TCP, UDP, and RTP.

Transmission Control Protocol (TCP) is a connection-oriented protocol that ensures the transmission of data between devices on a network. While slower, TCP ensures the recipient receives every bit of data as the sender requested. The connectionless User Datagram Protocol (UDP) ensures a faster transmission of data in use cases where the importance of low latency supersedes a reliable transmission of every bit over the wire. Streaming video is one case where UDP is a better fit than TCP. Real-Time Protocol (RTP) is a protocol often used for VoIP.

Lastly, the application layer of the TCP/IP model includes SSL, TLS, Telnet, SSH, HTTP, DNS, DHCP, and many others.

Secure Socket Layer (SSL) and Transport Layer Security (TLS) are used to encrypt the contents of packets sent over the wire. The remaining protocols mentioned above are used to provide services to applications.