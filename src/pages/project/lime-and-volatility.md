---
layout: ../../layouts/project.astro
title: Memory Forensics with LiME and Volatility Framework
client: Self
date: Mar 19, 2023
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
  - lime
  - volatility
priority: 1
draft: true
---

## TL;DR

This project consists of the procedure to create a memory 
image for a system and perform analysis on that system.

## LiME

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
git clone https://github.com/504ensicsLabs/LiME.git
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

## Voalitlity

### Installation

The Software required in the Forensics system are:

- `make`
- `dwarfdump`
- `gcc`
- `linux-headers-KERNEL_VERSION`

The `KERNEL_VERSION` can be obtained from the command 
`uname`

```bash
uname --kernel-release
# output: 5.15.0-67-generic
```

> The important note is that the kernel release and the 
flavor of the Linux OS should exactly match inorder to 
perform analysis.

### Creating profile in volatility

First, we need to install the source code from the 
repository.

```bash
git clone https://github.com/volatilityfoundation/volatility.git
```

Now, enter the directory and go to `volatility/tools/linux`.
Now we need to build the module with `make` command and a 
drwaf file will be generated.

```bash
cd ./volatility/tools/linux && \
make
```

> Note: `make` command didnt work in my case and required 
to do some edits.

#### Edits:

- add `MODULE_LICENSE(GPL);` at the end of `module.c` file
- change the `"$(PWD)"` to `$(shell pwd)` (need to remove 
`"` also)
- run `make` command with `sudo` powers.

Even after these edits, the build is failing at clean stage
due to a missing file. But the drwaf file is being created.

After creating the `module.dwarf` file, we need to zip this
file along with symbols file that is available at 
`/boot/System.map-5.15.0-67-generic`.

```bash
cd ../../ && \ 
# if the current directory is still inside /volatility/tools/linux

sudo zip volatility/plugins/overlays/linux/Ubuntu5.15.0-67-generic.zip tools/linux/module.dwarf /boot/System.map-5.15.0-67-generic
```

> For more detailed installation and usage,
[check this link here](https://github.com/volatilityfoundation/volatility/wiki/Linux#acquiring-memory).

## Links

- LiME - https://github.com/504ensicsLabs/LiME
- Voalitlity - https://github.com/volatilityfoundation/volatility
