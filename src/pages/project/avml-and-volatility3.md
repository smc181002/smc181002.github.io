---
layout: ../../layouts/project.astro
title: Memory Forensics with AVML and Volatility3 Framework
client: Self
pubDate: Mar 20, 2023
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

AVML is a memory acquisition tool developed under microsoft
and is a portable tool build in rust. This allows the 
software to be executed as a static binary and doesnt 
require any knowledge of the target OS distribution or the 
kernel without which tools like `LiME` wont work.

AVML internally uses the LiME output format (if compression
is not used) for imaging and provides extended features 
allowing the image to be pushed to object storages.

Compression feature in AVML will be useful in terms of 
portability as exporting bigger RAM size machines will use
a lot more memory.

### Installation of AVML

The Software required in the Forensics system are:

- `wget`

The current latest avml can be found in the github
page in the release section. This project uses
[`v0.11.0`](https://github.com/microsoft/avml/releases/tag/v0.11.0).

The software can be downloaded by running the command:
```bash
wget https://github.com/microsoft/avml/releases/download/v0.11.0/avml &&
chmod +x avml
```

### Creating memory image with AVML

To create the memory image, we just need to run the command
```bash
sudo ./avml --compressed ./linux-image.compressed.mem
```

The compressed memory image should now be extracted and 
this can be done with the help of `avml-convert` command 
also provided by avml in the github release page. This can
be installed by using the below command.

```bash
wget https://github.com/microsoft/avml/releases/download/v0.11.0/avml-convert &&
chmod +x avml-convert
```

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
python3 volatility3/vol.py -f ./linux-image.mem banners

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
go build
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
python3 volatility3/vol.py -f ./linux-image.mem --help
```

## Using Volshell

This code basically does the same thing as pslist outputted 
as in the plugin. But we have access to all the attributes 
of the `task_list` class.

```python
from volatility3.plugins.linux import pslist
from volatility3.framework.objects import utility
from volatility3.framework.renderers import format_hints

print("OFFSET (V)      PID     TID     PPID    COMM")
for proc in pslist.PsList.list_tasks(self.context, self.config['kernel']):
    print(
            hex(format_hints.Hex(proc0.vol.offset)) , "\t" , 
            proc.pid, "\t" , 
            proc.parent.tgid,  "\t" , 
            proc.tgid, "\t" , 
            utility.array_to_string(proc.comm), "\t")
```

```python
>>> dir(proc0)
# Output: ['VolTemplateProxy', '__abstractmethods__', '__class__', '__delattr__', '__dict__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattr__', '__getattribute__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__mce_reserved', '__module__', '__ne__', '__new__', '__reduce__', '__reduce_ex__', '__repr__', '__setattr__', '__sizeof__', '__state', '__str__', '__subclasshook__', '__weakref__', '_abc_impl', '_add_process_layer', '_check_members', '_concrete_members', '_context', '_vol', 'acct_rss_mem1', 'acct_timexpd', 'acct_vm_mem1', 'active_memcg', 'active_mm', 'add_process_layer', 'alloc_lock', 'atomic_flags', 'audit_context', 'backing_dev_info', 'bio_list', 'blocked', 'bpf_ctx', 'bpf_storage', 'btrace_seq', 'cached_requested_key', 'capture_control', 'cast', 'cg_list', 'cgroups', 'children', 'clear_child_tid', 'closid', 'comm', 'compat_robust_list', 'core_cookie', 'core_node', 'core_occupation', 'cpu', 'cpus_mask', 'cpus_ptr', 'cpuset_mem_spread_rotor', 'cpuset_slab_spread_rotor', 'cred', 'curr_ret_depth', 'curr_ret_stack', 'default_timer_slack_ns', 'delays', 'dirty_paused_when', 'dl', 'exit_code', 'exit_signal', 'exit_state', 'files', 'flags', 'frozen', 'fs', 'ftrace_timestamp', 'futex_exit_mutex', 'futex_state', 'get_process_memory_sections', 'get_symbol_table_name', 'get_threads', 'group_leader', 'gtime', 'has_member', 'has_valid_member', 'has_valid_members', 'il_prev', 'in_eventfd', 'in_execve', 'in_iowait', 'in_memstall', 'in_ubsan', 'in_user_fault', 'io_context', 'io_uring', 'ioac', 'is_kernel_thread', 'is_thread_group_leader', 'is_user_thread', 'jobctl', 'journal_info', 'kmap_ctrl', 'kretprobe_instances', 'l1d_flush_kill', 'last_siginfo', 'last_sum_exec_runtime', 'last_switch_count', 'last_switch_time', 'last_task_numa_placement', 'last_wakee', 'loginuid', 'maj_flt', 'mce_addr', 'mce_count', 'mce_kflags', 'mce_kill_me', 'mce_ripv', 'mce_vaddr', 'mce_whole_page', 'member', 'memcg_in_oom', 'memcg_nr_pages_over_high', 'memcg_oom_gfp_mask', 'memcg_oom_order', 'mempolicy', 'mems_allowed', 'mems_allowed_seq', 'migration_disabled', 'migration_flags', 'migration_pending', 'min_flt', 'mm', 'nameidata', 'nivcsw', 'no_cgroup_migration', 'node_stamp', 'normal_prio', 'nr_cpus_allowed', 'nr_dirtied', 'nr_dirtied_pause', 'nsproxy', 'numa_faults', 'numa_faults_locality', 'numa_group', 'numa_migrate_retry', 'numa_pages_migrated', 'numa_preferred_nid', 'numa_scan_period', 'numa_scan_period_max', 'numa_scan_seq', 'numa_work', 'nvcsw', 'on_cpu', 'on_rq', 'oom_reaper_list', 'oom_reaper_timer', 'pagefault_disabled', 'parent', 'parent_exec_id', 'patch_state', 'pdeath_signal', 'pending', 'perf_event_ctxp', 'perf_event_list', 'perf_event_mutex', 'personality', 'pf_io_worker', 'pi_blocked_on', 'pi_lock', 'pi_state_cache', 'pi_state_list', 'pi_top_task', 'pi_waiters', 'pid', 'pid_links', 'plug', 'policy', 'posix_cputimers', 'posix_cputimers_work', 'preempt_notifiers', 'pref_node_fork', 'prev_cputime', 'prio', 'psi_flags', 'ptrace', 'ptrace_entry', 'ptrace_message', 'ptraced', 'ptracer_cred', 'pushable_dl_tasks', 'pushable_tasks', 'rcu', 'rcu_users', 'real_blocked', 'real_cred', 'real_parent', 'recent_used_cpu', 'reclaim_state', 'restart_block', 'restore_sigmask', 'ret_stack', 'rmid', 'robust_list', 'rseq', 'rseq_event_mask', 'rseq_sig', 'rss_stat', 'rt', 'rt_priority', 'sas_ss_flags', 'sas_ss_size', 'sas_ss_sp', 'saved_sigmask', 'sched_class', 'sched_contributes_to_load', 'sched_info', 'sched_migrated', 'sched_psi_wake_requeue', 'sched_remote_wakeup', 'sched_reset_on_fork', 'sched_task_group', 'se', 'seccomp', 'security', 'self_exec_id', 'sequential_io', 'sequential_io_avg', 'sessionid', 'set_child_tid', 'sibling', 'sighand', 'signal', 'splice_pipe', 'stack', 'stack_canary', 'stack_refcount', 'stack_vm_area', 'start_boottime', 'start_time', 'static_prio', 'stime', 'syscall_dispatch', 'sysvsem', 'sysvshm', 'task_frag', 'task_works', 'tasks', 'tgid', 'thread', 'thread_group', 'thread_info', 'thread_node', 'thread_pid', 'throttle_queue', 'timer_slack_ns', 'tlb_ubc', 'total_numa_faults', 'trace', 'trace_overrun', 'trace_recursion', 'tracing_graph_pause', 'trc_holdout_list', 'trc_ipi_to_cpu', 'trc_reader_checked', 'trc_reader_nesting', 'trc_reader_special', 'uclamp', 'uclamp_req', 'usage', 'use_memdelay', 'user_cpus_ptr', 'utask', 'utime', 'vfork_done', 'vmacache', 'vol', 'wake_cpu', 'wake_entry', 'wake_q', 'wakee_flip_decay_ts', 'wakee_flips', 'write']
```

## Links

- AVML - https://github.com/microsoft/avml.git
- Voalitlity3 - https://github.com/volatilityfoundation/volatility3.git
