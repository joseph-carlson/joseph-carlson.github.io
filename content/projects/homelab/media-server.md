---
date: 2026-04-12
draft: false
title: 'Media Server'
hidden: false
tags: 
  - all
  - homelab
---

Streaming platforms cost too much. Why pay Netflix when I can spend hundreds of dollars on hardware, hours of my time acquiring and ripping physical media, self-host a streaming service, then access that server over my WireGuard VPN? Ever since swapping out my laptop with a proper workstation in my home lab, I've decided to deploy a Jellyfin media server. This article is a little more hands off because I didn't take screenshots throughout the process, and quite frankly I can't be bothered to run through this setup again for those screenshots.

1. Create Windows VM

If you're on Windows, I advise creating a windows ISO which automatically bypasses the Windows 11 hardware requirements with Rufus. Otherwise, you can edit the registry and make the following changes prior immediately you boot to the USB installer.
- Navigate to HKEY_LOCAL_MACHINE\SYSTEM\Setup
- Right Click > New Key > Name the key LabConfig
- Within LabConfig > Create the following DWORD (32 bit) values and set to 1
  - BypassTPMCheck
  - BypassSecureBootCheck
  - BypassCPUCheck
  - Optional Keys depending on hardware
    - BypassRAMCheck
    - BypassCPUCheck

2. Configure Storage

You can do several things for this. The easiest method is to pass through a USB SSD or HDD to the Windows VM. Alternatively, you can create a ZFS pool or configure the RAID array in the BIOS. What I chose to do was use mdadm to create a software RAID5 array which I can partition and format as NTFS. I then passed this through to my virtual machine. 

{{< code lang="bash" >}}
# install requisite packages
apt install mdadm ntfs-3g parted
# create the RAID5 array with the devices 
# you can find the available devices with the lsblk command
mdadm --create /dev/md0 --level=5 --raid-devices=3 /dev/sda /dev/sdb /dev/sdc
# wipes any existing filesystem
wipefs -a /dev/md0
# partition the RAID array 
parted /dev/md0
mklabel gpt
mkprimary ntfs 0% 100%
quit
# create the NTFS file system
mkfs.ntfs -f /dev/md0p1

# pass through to guest OS
# 110 is the host ID
# sata0 is the interface
# /dev/md0 is the device
qm set 110 -sata0 /dev/md0
{{< /code >}}

3. Rip Media with Exact Audio Copy or MakeMKV

The three software tools that I utilized while ripping CDs, DVDs and Blu-rays I purchased are Exact Audio Copy, MakeMKV, and Handbrake. After installing, configuring Exact Audio Copy (EAC) with AccurateRip and MusicBrainz makes quick work of creating a digital archive of media. Blu-rays are a bit more tricky due to the more advanced AACS encryption on the discs. MakeMKV can utilize LibreDrive with certain drives to read the raw data and from the discs and save to MKV files. Once ripped, its as simple as transcoding to MP4 with Handbrake for efficient storage and playback on the media server.

* [Exact Audio Copy](https://www.exactaudiocopy.de/download/)
* [MakeMKV](https://www.makemkv.com/download/)
* [Handbrake](https://handbrake.fr/downloads.php)

4. Host Jellyfin Server and point to Storage with Media

This is the easy part. I'll double back and add instructions for the install if I have to set up my media server from scratch, but until then, there are dozens of other resources to set this 