---
date: ''
draft: false
title: 'The OSI Model'
tags: ['all', 'infrastructure', 'networking']
---

Networks are complex. Modems, routers, switches, hubs, wireless access points, repeaters, media converters, twisted pair, fiber, coax, bits, frames, packets, segments, TCP, UDP, and so much more. Organizing the concepts and technologies in a way that makes it comprehensible to those that did not engineer the systems was an extremely high priority for the pioneers of computing. That is where the OSI model comes in.

The OSI, or Open Systems Interconnection Model, divides networks into seven layers. Each layer has its own devices, protocols, terms, and role in enabling the flow of data. While the OSI model provides a general framework for how to conceptualize and troubleshoot all networks, the TCP/IP model more cleanly applies to most networks in use today.

Layer 1 of the OSI model is the physical layer. Data is transferred in bits, a binary one or zero determined by the modulation of electricity through a copper wire, light through a fiber optic cable, or electromagnetic waves through the air.

Layer 2 of the OSI model is the data link layer. Data travels in frames, abstracting away the bits on the physical layer. This allows different protocols such as Ethernet, also known as IEEE 802.11, Point to Point Protocol, and packet switching.

Layer 3 of the OSI model is the network layer. Data travels in packets, which are  encapsulated by the frames from layer 2 into packets. Protocols that manage packets on layer 3 include Internet Protocol, Internet Control Message Protocol, IP Security, and Internet Group Management Protocol. Layer 3 allows devices to reach outside of their local area networks.

Layer 4 of the OSI model is the transport layer, also known as the heart of the OSI model. Data traverses networks in TCP segments and UDP datagrams. These segments and datagrams encapsulate the packets from the network layer.

Layer 5 of the OSI Model is the Session layer. This layer creates, maintains, and tears down the channels required for devices to communicate. These channels can operate at full-duplex, half-duplex, or simplex.

Layer 6 of the OSI model is the presentation layer. This layer facilitates how devices encode, encrypt, and compress data so that both devices can understand the received messages. After the messages are encoded, encrypted, and compressed, they are ready to be sent across the channels the session layer has prepared. SSL and TLS are the most common protocols used in the presentation layer.

Layer 7 of the OSI model is the application layer. This layer is comprised of the protocols applications directly rely on such as HTTP, FTP, IMAP4, POP3, SMTP, and many more. Applications directly interface with these protocols. One such example is a mail client and how it relies on IMAP4 or POP3 and SMTP for the sending and receiving of emails.

These seven layers allow network technicians and engineers to diagnose where the communication has broken down and get these networks back up and running in a timely manner. With that being said, the TCP/IP model is still more applicable in modern days, as nearly all networks rely on TCP and UDP as the backbone for communication. Nevertheless, a protocol-agnostic framework will stand the test of time and likely stay relevant past the TCP/IP model, as it will likely be adapted to the technologies of tomorrow.