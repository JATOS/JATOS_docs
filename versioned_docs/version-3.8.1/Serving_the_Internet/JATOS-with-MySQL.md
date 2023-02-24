---
title: JATOS with MySQL
slug: /JATOS-with-MySQL.html
sidebar_position: 7
---

By default JATOS uses an embedded H2 database and no further setup is necessary but it can be easily configured to work with a MySQL database.

Possible scenarios why one would use an external database are
* your JATOS will be used by more than a few users (e.g. several research groups or an institute-wide installation)
* your JATOS will run studies with many participants
* the expected traffic is rather high (the studies produce a lot of result data)
* you want to be able to do a regular database backup (with the embedded H2 database this would involve stopping JATOS)
* higher trust in the reliability of MySQL (although we had no problems with H2 so far)

## Installation

One could install the external database on the same server as JATOS is running or on an extra server depending on ones need.

There are many manuals out there, e.g. [this one](https://www.digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04). One way to set up MySQL:
   
   1. Install MySQL, e.g. on Ubuntu

      **JATOS requires MySQL >= 5.7 (8.x is fine)**

      ```bash
      sudo apt install mysql-server
      ```
   
   1. Log in to MySQL's command line terminal:

      ```bash
      mysql -u root -p
      ```
   
   1. Create a database for JATOS:

      **Character set and collation are important - otherwise you won't have full UTF-8 support**
   
      ```bash
      CREATE DATABASE jatos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
      ```
   
   1. Create a user for JATOS: 

      ```bash
      CREATE USER 'jatosuser'@'localhost' IDENTIFIED BY 'myPassword';
      ```
      
      Remember your username and password. You need them when configuring JATOS later on.

   1. Grant privileges to the new user:
  
      ```bash
      GRANT ALL PRIVILEGES ON jatos.* TO 'jatosuser'@'localhost';
      ```
   
   1. You can test the new user: log out of MySQL with `exit` and back in with the newly created user:
   
      ```bash
      mysql -u jatosuser -p
      ```

**Appart from giving JATOS access to the database it is not necessary to create any tables - JATOS is doing this automatically.**

Now you have to configure JATOS to use your MySQL.


## Configure JATOS

There are three ways to set up JATOS to work with a MySQL database. If you are in doubt use 'production.conf'.

1. Via JATOS config file which is in your JATOS folder in the `conf` folder: `conf/production.conf`

   Change IP, port, username and password to your needs.

   ~~~ bash
   db.default.url="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
   db.default.user="jatosuser"
   db.default.password="mypassword"
   db.default.driver=com.mysql.cj.jdbc.Driver
   ~~~

   **Always restart JATOS after making any changes to the configuration (e.g. with `./loader.sh restart`)**

1. Via command-line arguments:
   * `-DJATOS_DB_URL` - specifies the URL to the database
   * `-DJATOS_DB_USERNAME` - set your username
   * `-DJATOS_DB_PASSWORD` - set your password
   * `-DJATOS_DB_DRIVER` - always `com.mysql.cj.jdbc.Driver` for MySQL
   
   E.g. to connect to a MySQL running on 127.0.0.1 and port 3306 use (but change username and password):
   
   ~~~ bash   
   ./loader.sh start -DJATOS_DB_URL='jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC' -DJATOS_DB_USERNAME=sa -DJATOS_DB_PASSWORD=sa -DJATOS_DB_DRIVER=com.mysql.cj.jdbc.Driver
   ~~~
   
1. Via environment variables (change IP, port, username and password)

   ~~~ bash
   export JATOS_DB_URL="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
   export JATOS_DB_USERNAME=jatosuser
   export JATOS_DB_PASSWORD='mypassword'
   export JATOS_DB_DRIVER=com.mysql.cj.jdbc.Driver
   ~~~

You can confirm that JATOS is accessing the correct database by opening JATOS' _Administration_ page in a browser and then click on _System Info_: The field _DB URL_ should resemble the one from your config. Another way is by looking in the logs: you should see a line after JATOS started similar to this (with your database URI):

~~~ bash
14:06:01.760 [info] - p.a.d.DefaultDBApi - Database [default] initialized at jdbc:mysql://localhost/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
~~~

Done. Your JATOS uses your MySQL now.


## [Optional] Deactivate MySQL's binary log

MySQL's binary logs (also called binlogs) serve two purposes: replication and data recovery. More can be found in [MySQLs documentation](https://dev.mysql.com/doc/internals/en/binary-log-overview.html#:~:text=The%20binary%20log%20is%20a,14.).

The problem with binary logs is that they can take up quite some disk space depending on the experiments you run on your JATOS. The location of those log files is specified in MySQL's config but on many systems they are under `/var/lib/mysql`. If you have a single MySQL instance (and therefore do not use replication) and you do not need MySQL's data recovery (e.g. have a different backup mechanism) than it is safe to deactivate the binary logs. 

Add `skip-log-bin` to the end of your MySQL config ([details](https://dev.mysql.com/doc/refman/8.0/en/replication-options-binary-log.html#option_mysqld_log-bin)). On many Linux systems the config is in `/etc/mysql/mysql.conf.d/mysqld.cnf`.

The part of your 'mysqld.cnf' that configures the binary logs could then look similar to this:

```bash
# The following can be used as easy to replay backup logs or for replication.
# note: if you are setting up a replication slave, see README.Debian about
#       other settings you may need to change.
# server-id             = 1
# log_bin                       = /var/log/mysql/mysql-bin.log
# binlog_expire_logs_seconds    = 2592000
# max_binlog_size   = 100M
# binlog_do_db          = include_database_name
# binlog_ignore_db      = include_database_name
skip-log-bin
```

You have to restart MySQL for the changes to take effect.


## [Optional] Increase 'max_allowed_packet' size in older MySQLs

If you have an older MySQL (< 8.x.x) and your experiments will have large resut data you might want to increase the '[max_allowed_packet](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_allowed_packet)' size. If your result data is larger than the 'max_allowed_packet' JATOS will just return an 'internal server error'. In JATOS' log in will look similar to this:

```
[ERROR] - g.ErrorHandler - Internal JATOS error
[ERROR] - o.h.e.j.s.SqlExceptionHelper - Packet for query is too large (5,920,824 > 4,194,304). You can change this value on the server by setting the 'max_allowed_packet' variable.
[WARN] - o.h.e.j.s.SqlExceptionHelper - SQL Error: 0, SQLState: S1000
```

From 8.x.x the 'max_allowed_packet' is by default 64MB and this is usually more than enough. But in version smaller than 8.x.x it is just 4MB by default and before 5.6.6 it's just 1MB.  

To increase the 'max_allowed_packet' size just add it to the end of your MySQL config. On many Linux systems the config is in `/etc/mysql/mysql.conf.d/mysqld.cnf`. E.g. to set it to 64MB:

```bash
max_allowed_packet=64M
```

You have to restart MySQL for the changes to take effect.
