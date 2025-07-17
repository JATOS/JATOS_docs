---
title: Performance Tweaking
slug: /Performance-Tweaking.html
sidebar_position: 7
---

JATOS works well out of the box, but its performance can be improved with some adjustments. Optimizing JATOS for your specific use case requires tuning both JATOS and its database. There is no universal configuration—performance depends on your workload (e.g., frequent study asset requests or large result data uploads).

## Adjustments in JATOS

### Memory

JATOS can run with 1 GB of RAM, but at least 2 GB is recommended for production.  
Set the maximum memory JATOS can use via the Java system property `-J-Xmx`.  
If not set, Java may not use available memory efficiently or may take memory from other programs or the OS.

**Example:**  
On a host with 4 GB RAM and no other applications, limit JATOS to 3500 MB with:  
`-J-Xmx3500M`

### Thread Pool Size and Database Connection Pool Size

Since version 3.9.7, JATOS uses fixed-size pools for threads and database connections since it mostly does blocking database calls and file system access.

there is no one-size-fits-all setting. If pool sizes are too low, CPU resources may be underutilized and if too high, pools may consume excessive resources.

**Configuration details:**  
- [JATOS thread pool size](JATOS_Configuration.html#jatos-thread-pool-size)
- [Database connection pool size](JATOS_Configuration.html#database-connection-pool-size)

Set both in conjunction. For example, with 8 CPUs and 8 GB RAM, values like 140 (threads) and 210 (connections) may work well.

### Study Logs

Generating study logs requires JATOS to calculate hashes of result data and files, which is CPU-intensive, especially for large datasets.  
If you do not need this feature, you can [disable study logging](JATOS_Configuration.html#study-logs).

---

## Adjustments in MySQL / MariaDB

There are many ways to tune database performance; here we highlight a few of the most important ones.

### Deactivate the Binary Log

Disabling the binary log can improve performance if you do not need replication or point-in-time recovery. See [JATOS with MySQL](JATOS-with-MySQL.html#optional---deactivate-the-binary-log-of-your-mysqlmariadb) for instructions.

### Increase InnoDB Buffer Pool Size


The `innodb_buffer_pool_size` variable controls the memory allocated to the InnoDB buffer pool, which caches frequently accessed data and indexes for faster retrieval.  
A larger buffer pool reduces disk I/O and improves performance.  
A common recommendation is to allocate 50–75% of your system’s memory (if JATOS and the database are on separate hosts).

**Via config file:**
```
[mysqld]
innodb_buffer_pool_size = 2G
```

**Via MySQL CLI:**
```
SET GLOBAL innodb_buffer_pool_size=2G;
```

### Maximum Connections

Increase the maximum permitted number of simultaneous client connections, especially if you have increased [JATOS's database connection pool size](JATOS_Configuration.html#database-connection-pool-size).

**Via config file:**
```
[mysqld]
max_connections = 300
```

**Via MySQL CLI:**
```
SET GLOBAL max_connections = 300;
```

---

## Outsource Serving of Static Files

By default, JATOS serves static files (e.g., images, audio/video files, scripts) from its study assets folder. This is recommended, as it ensures only participants with a valid study code can access these files.

However, serving many static files via JATOS can slow down the system or even cause crashes.

A solution is to serve static files from an external source (e.g., a separate web server). This reduces load on the JATOS host and allows for better caching. There are many ways to host static files. See [JATOS with Apache](JATOS-with-Apache.html#serving-additional-static-files) for an example setup.
