---
layout: ../../layouts/blog.astro
title: Replacing net-tools with iproute2
client: Self
publishDate: 2022-07-22 00:00:00
img: https://images.unsplash.com/photo-1547234935-80c7145ec969?fit=crop&w=1400&h=700&q=75
description: |
  Net tools is an obselete package and the commands are being replaced with newer commands from iproute2 package
tags:
  - Networking
  - Linux
---

## Introduction

`net-tools` is a package being used for many years in any 
distribution of linux but it is admittedly showing it's 
age.

Please keep in mind that most net-tools programs are obsolete now:
|program |obsoleted by|
|--------|------------|
|arp     |ip neigh    |
|ifconfig|ip addr     |
|ipmaddr |ip maddr    |
|iptunnel|ip tunnel   |
|route   |ip route    |
|nameif  |ifrename    |
|mii-tool|ethtool     |

## References
