---
date: 2025-09-20
draft: false
title: 'Fixing MacOS'
tags: 
  - all
  - opensource
---

Over the years, I have shifted between Windows, Linux, and MacOS for my daily use operating system. Originally, it was Windows 10, then MacOS, then Ubuntu, then Windows 11, then Fedora, and lastly, MacOS. 

The honest reason why I switched to Mac? I spent so much fixing Windows at Technician X, I couldn't bear the idea of coming home to the same thing.

Don't get me wrong. Windows is great in enterprise environments. Compatibility is king. But I have found that MacOS is a far more pleasant operating system to use after some essential utilities.

Starting off with the heavy hitter: Aerospace. This open-source project overrides the terrible built-in window management of MacOS. It heavily utilizes the option key to manage all open windows in virtual desktops without using the mouse. As of now, this project is still in beta, but I have been using it for several months and it's been an absolute game changer.

{{< code lang="zsh" >}}
brew install --cask nikitabobko/tap/aerospace
{{</ code >}}

GitHub Repository: https://github.com/nikitabobko/AeroSpace


Speaking of brew, HomeBrew is an essential package manager for quickly installing applications. I tend to just use it for simple utilities, but some install nearly all apps using this method. To search available apps, visit [brew.sh](https://brew.sh/).

Some utilities I install via HomeBrew are...
- Hugo: locally running this website
- Anki: smart flashcards
- alDente: stop charging laptop at 80% capacity
- Keeping You Awake: prevents laptop from sleeping for set duration
- BetterDisplay: monitor controls (Hi-DPI monitor resolution)
- Scroll Reverser - change scroll direction for trackpad and mouse independently
- RustDesk - remote access to Windows laptop in Home Lab
- balenaEtcher - creating bootable media
- App Cleaner - thoroughly remote residual files during app uninstalls

Optimizing the small things in an operating system makes a world of a difference when you use it every day. If you use a Mac, maybe check out some of these tools. If the Apple ecosystem hasn't already lured you in to the walled garden, take some time to check out what's available for your operating system. 