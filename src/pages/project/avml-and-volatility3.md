---
layout: ../../layouts/project.astro
title: Memory Forensics with AVML and Volatility3 Framework
client: Self
date: Mar 20, 2023
image: https://images.unsplash.com/photo-1630568002650-3ee79302fda5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=873&q=80
description: |
  
author: 
  name: Meher Chaitanya
  link:  https://github.com/smc181002
  profile: https://avatars.githubusercontent.com/u/53662575
coauthors:
tags:
  - forensics
  - memory
  - linux
  - avml
  - microsoft
  - volatility
priority: 1
---

## TL;DR

This project consists of the procedure to create a memory 
image for a system using AVLM from Microsoft and perform
analysis on that system using Volatility3 framework.

## AVML (Microsoft)

LiME is installed as a kernel module. This means we need to
cross compile the source code and load it in the suspect 
system.

But compiling in the suspect system will lead to destruction
of the memory in the system itself. To tackle this problem,
we need to know the suspect's architecture and compile it 
in a similar environment and export the file to the 
suspect's machine.

### Installation of LiME

The Software required in the Forensics system are:

- `git`
- `make`

> The commands can be verified by using `command -v git` 
and `command -v make` which should give the file path if 
they exist and empty if they dont exist. Use required 
package managers to download these software

The current experiment is done inside KVM hypervisor with 
two similar instances of `Ubuntu 22.04` where one is the 
`forensics system` and other is `suspect system`.

```bash
# clone the repository
git clone https://github.com/microsoft/avml.git
```

```bash
# running make will automatically find the arch of the system.
cd LiME && \
make 
```

![clone-repo-and-build-kernel-object](../../assets/project/lime-and-volatility/building-kernel-object.png)

Once the `.ko` file is built, we need to move this to the 
directory where the pendrive is mounted so that the object
file can be executed in the suspect's system.

```bash
sudo mkdir /media/usbhp && \
sudo mount /dev/sda1 /media/usbhp && \ # mount USB
sudo cp ./lime-5.15.0-67-generic.ko /media/usbhp # copy to USB
```

### Creating memory image with LiME

To create the memory image, we just need to run the command
```bash
sudo insmod ./lime-5.15.0-67-generic.ko "path=../linux-image.mem format=raw"
```

After running the `insmod` command that loads the kernel 
module, the .mem file will be created in the location 
desired. Now copy back the generated memory file back into
the USB to export and use it inside the forensic system for
analysis of the memory.

## Voalitlity 3

### Installation

The Software required in the Forensics system are:

- `make`
- `dwarfdump`
- `gcc`
- `linux-headers-KERNEL_VERSION`

The `KERNEL_VERSION` can be obtained from the command 
`uname`

```bash
uname -r
# output: 5.15.0-67-generic
```

> The important note is that the kernel release and the 
flavor of the Linux OS should exactly match inorder to 
perform analysis.

### Creating debug symbols in volatility

First, we need to install the source code from the 
repository.

```bash
git clone https://github.com/volatilityfoundation/volatility3.git
```

Volatility3 made a move from `profiles` to `symbol tables` 
which is a major change from v2 to v3. 
[Check all the changes here](https://volatility3.readthedocs.io/en/latest/vol2to3.html).

To get these symbol tables that are required as for the 
image, we can either find it in the 
[Volatility isf-server](https://isf-server.techanarchy.net/).

The search term can be extracted from the volatility 
framework by running the below command.

```bash
python3 volatility3/vol.py -f ./avmlimage.mem banners

# output: 
# 0xacbf6f7	Linux version 5.15.0-67-generic (buildd@lcy02-amd64-116) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #74-Ubuntu SMP Wed Feb 22 14:14:39 UTC 2023 (Ubuntu 5.15.0-67.74-generic 5.15.85)
# 0x27c00200	Linux version 5.15.0-67-generic (buildd@lcy02-amd64-116) (gcc (Ubuntu 11.3.0-1ubuntu1~22.04) 11.3.0, GNU ld (GNU Binutils for Ubuntu) 2.38) #74-Ubuntu SMP Wed Feb 22 14:14:39 UTC 2023 (Ubuntu 5.15.0-67.74-generic 5.15.85)
# .
# .
```

But if the string is not available(which in most case wont 
be available in custom environment of kernel like in my 
case), we need to build our own ISF (Intermediate Symbol 
Format) file. To achieve this, the volatility foundation 
provides us with tools required called `dwarf2json` that 
creates a dump json file.

```bash
git clone https://github.com/volatilityfoundation/dwarf2json.git && \
cd dwarf2json/
```

To get this software, we can comiple from the source and to
install this, we require `golang`. we can install the 
software using `sudo apt-get install golang-go`. 

Once we install the golang compiler, we run `go build` in 
`dwarf2json` directory and use the compiled output to run
the below command.

```bash
sudo ./dwarf2json linux --elf /usr/lib/debug/boot/vmlinux-$(uname -r) > output.json
```

> Reference: https://volatility3.readthedocs.io/en/latest/symbol-tables.html

But when we do this in the real environment, we maynot 
have the kernel debug symbols readily donwloaded system.
To download this, we need to add out own deb repos and the
required GPG key into the keyrings.

```bash
codename=$(lsb_release -c | awk  '{print $2}')
sudo tee /etc/apt/sources.list.d/ddebs.list << EOF
deb http://ddebs.ubuntu.com/ ${codename}      main restricted universe multiverse
deb http://ddebs.ubuntu.com/ ${codename}-security main restricted universe multiverse
deb http://ddebs.ubuntu.com/ ${codename}-updates  main restricted universe multiverse
deb http://ddebs.ubuntu.com/ ${codename}-proposed main restricted universe multiverse
EOF
```

```bash

# FOR UBUNTU >= 16.04
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys C8CAB6595FDFF622

# FOR UBUNTU older versions
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys ECDCAD72428D7C01
```

> Adding the keyring from public newtorks like university 
internet could be restricted.

Now update the repo and start installing the apt debug 
symbols according to the kernel.

```bash
sudo apt-get update && \
sudo apt-get install -y linux-image-$(uname -r)-dbgsym
```

The above will add the `vmlinux-$(uname -r)` into the 
required directory that can be used to construct the json 
formatted debug symbols.

The <u>__important point__</u> to note here is that the 
image maynot be built with minimal memory and for building
large kernels for debug symbols would require atleast 
`8GiB` main memory.

After building the `output.json` file finally, it should be
moved to `volatility3/volatility3/symbols` and the symbols
will be automatically parsed by the framework to perform on
the required memory image.

> Reference: https://hadibrais.wordpress.com/2017/03/13/installing-ubuntu-kernel-debugging-symbols/


### Using Volatility

Once the symbol configuration is done, we can use the image
created from `avml` to use it in analysing the information
like programs running currently with `linux.pstree.PsTree`
option and to check the network connections with 
`linux.sockstart` option.

Help command can be used to find out all the options that
can be used.

```bash
python3 volatility3/vol.py -f ./avmlimage.mem --help
```

## Links

- AVML - https://github.com/microsoft/avml.git
- Voalitlity3 - https://github.com/volatilityfoundation/volatility3.git
