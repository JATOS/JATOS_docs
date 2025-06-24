---
title: JATOS with MySQL
slug: /JATOS-with-MySQL.html
sidebar_position: 7
---

By default, JATOS uses an embedded H2 database and requires no further setup. However, it can easily be configured to work with a MySQL or MariaDB database.

**Why use an external database?**
- Your JATOS will be used by more than a few users (e.g., several research groups or an institute-wide installation)
- Your JATOS will run studies with many participants
- You expect high traffic or large amounts of result data
- You want to perform regular database backups (with the embedded H2 database, this requires stopping JATOS)
- You trust the reliability of MySQL/MariaDB more

## Installation

You can install the external database on the same machine as JATOS or on a separate machine, depending on your needs.

**JATOS requires MySQL >= 5.7 (8.x is fine). JATOS was tested with MariaDB 10.9.7 (other versions likely work too).**

1. **Create a database for JATOS:**

   In MySQL's command line execute:

   ```sql
   CREATE DATABASE jatos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

   _Character set and collation are important for full UTF-8 support._

2. **Create a user for JATOS:**
   ```sql
   CREATE USER 'jatosuser'@'localhost' IDENTIFIED BY 'myPassword';
   ```
   - Change the password.
   - Leave out `@'localhost'` if the database is not on the same host as your JATOS instance.

3. **Grant privileges to the new user:**
   ```sql
   GRANT ALL PRIVILEGES ON jatos.* TO 'jatosuser'@'localhost';
   ```

4. **Test the new user:**  
   Log out of MySQL's command line with `exit` and log back in with the new user:
   ```shell
   mysql -u jatosuser -p
   ```

**You do not need to create any tables—JATOS will do this automatically.**

Now configure JATOS to use your MySQL/MariaDB database.

## Configure JATOS

There are three ways to set up JATOS to work with MySQL/MariaDB.

> The properties starting with `db.default` are **deprecated** and should not be used. Use `jatos.db.*` instead.

**Change IP, port, username, and password** to match your database. The _driver_ is always `com.mysql.cj.jdbc.Driver` for both MySQL and MariaDB.

**Always restart JATOS after making configuration changes.**

### 1. Via config file

The config file (`jatos.conf` or `production.conf`) is located in the `conf` folder of your JATOS installation.

- For JATOS version >= 3.8.3, set these in `jatos.conf`:
    ```properties
    jatos.db.url = "jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
    jatos.db.username = "jatosuser"
    jatos.db.password = "mypassword"
    jatos.db.driver = "com.mysql.cj.jdbc.Driver"
    ```
- For JATOS version < 3.8.3, use `production.conf` and the properties `db.default.url`, `db.default.username`, `db.default.password`, and `db.default.driver`.

### 2. Via command-line arguments

- For JATOS version >= 3.8.3, use:
    ```shell
    ./loader.sh start \
      -Djatos.db.url="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC" \
      -Djatos.db.username="jatosuser" \
      -Djatos.db.password="mypassword" \
      -Djatos.db.driver="com.mysql.cj.jdbc.Driver"
    ```
- For JATOS version < 3.8.3, use `-Ddb.default.url`, etc.

### 3. Via environment variables

Set the following variables:
```shell
JATOS_DB_URL="jdbc:mysql://127.0.0.1:3306/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC"
JATOS_DB_USERNAME='jatosuser'
JATOS_DB_PASSWORD='mypassword'
JATOS_DB_DRIVER='com.mysql.cj.jdbc.Driver'
```

You can confirm that JATOS is using the correct database by opening the _Administration_ page in your browser and checking _System Info_ (the _DB URL_ should match your config). Alternatively, check the logs for a line like:

```text
Database [default] initialized at jdbc:mysql://localhost/jatos?characterEncoding=UTF-8&useJDBCCompliantTimezoneShift=true&useLegacyDatetimeCode=false&serverTimezone=UTC
```

Done! JATOS now uses your MySQL/MariaDB database.

---

## Optional - Deactivate the Binary Log of Your MySQL/MariaDB

The binary log (binlog) is used for replication and data recovery. However, it can consume significant disk space, especially with large experiments. If you do not use replication and have another backup mechanism, it is safe to deactivate the binary log.

Add `skip-log-bin` to your MySQL/MariaDB config (often `/etc/mysql/mysql.conf.d/mysqld.cnf`):

```ini
# Example mysqld.cnf
skip-log-bin
```

Restart MySQL/MariaDB for the changes to take effect.

More info: [MariaDB documentation](https://mariadb.com/kb/en/binary-log/)

---

## Optional: Increase _max_allowed_packet_ Size in Older MySQL/MariaDB

If you use an older MySQL (< 8.x.x) and expect large result data, you may need to increase the [_max_allowed_packet_](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_max_allowed_packet) size. If your result data exceeds this limit, JATOS will return an 'internal server error' and the logs will show an error like:

```
[ERROR] - g.ErrorHandler - Internal JATOS error
[ERROR] - o.h.e.j.s.SqlExceptionHelper - Packet for query is too large (5,920,824 > 4,194,304). You can change this value on the server by setting the 'max_allowed_packet' variable.
[WARN] - o.h.e.j.s.SqlExceptionHelper - SQL Error: 0, SQLState: S1000
```

- MySQL 8.x.x and newer: default is 64MB (usually sufficient)
- MySQL before 8: default is 4MB
- MySQL before 5.6.6: default is 1MB

To increase the size, add to your MySQL/MariaDB config (e.g., `/etc/mysql/mysql.conf.d/mysqld.cnf`):

```ini
max_allowed_packet=64M
```

Restart the database for the changes to take effect.
