---
title: Manage JATOS users
slug: /User-Manager.html
sidebar_position: 2
---

Each experimenter who has access to the JATOS server (via the GUI) is considered a JATOS user. Users can add, modify, and delete studies they are members of, and can also export and delete results. Users may also be assigned special roles: **Admin** or **Superuser**.

  * **Admin users** have access to the [*Administration* page](Administration.html) and can control other users' access to JATOS.
  * **Superusers** (available since JATOS version 3.7.4) can access all studies on that JATOS instance, including their result data, regardless of their membership status.

### Manage Users

Only users with **Admin rights** have access to the **User Manager**, found within the *Administration* page. From the User Manager, Admins can:

  * Add new users.
  * Delete existing users.
  * Change user passwords.
  * Deactivate/activate users.
  * View information about each user's studies.

JATOS comes with one **default Admin user** (username: 'admin'). This Admin user always has unrevokable admin rights. The initial password for 'admin' is 'admin', which **should be changed immediately after installation and kept secure!**

Any user can be granted Admin rights by checking the corresponding box in the 'Admin' column of the user table. Only Admins can access the *Administration* pages (such as *User Manager* or *Study Info*).

![User manager screenshot](/img/v39x/user_manager_3.png)

A user can be **deactivated** (and later reactivated) by clicking the switch in the 'Active' column. A deactivated user can no longer log in, but their studies can still be run by participants. (To prevent a study from being run, deactivate it directly on its study *Administration* page.)

If you're an Admin and need more information about a user's studies, click on the *Studies* column. You'll see metrics like *Result Data Size* and *Result File Size*, which provide an indication of the server resources that user's studies are consuming.

![User manager screenshot](/img/v39x/user_manager_4.png)

Clicking the **Export** button at the top of the page allows you to export user data in CSV format. This is useful for purposes such as obtaining a list of emails to notify all users about server downtime, a JATOS update, etc.

### Superusers

By default, the ability to grant a user Superuser status is deactivated. To enable it, you must add the following line to your `conf/jatos.conf` file (or `conf/production.conf` for versions < 3.8.3):

```
jatos.user.role.allowSuperuser = true
```

Once enabled, any user can be granted the Superuser role by checking the corresponding box in the 'Superuser' column of the user table.

Superusers can access all studies on that JATOS instance, regardless of whether they are explicitly listed as a member. This includes the ability to change study properties, access result data, and delete studies. This role is particularly useful for single-lab or training JATOS installations where one user needs quick, comprehensive access to assist other researchers or students. However, unlike Admin users, Superusers cannot access the Administration page or manage other users.

### Authentication via LDAP

JATOS supports password authentication via LDAP (Lightweight Directory Access Protocol), enabling institutions to manage their users centrally. LDAP is disabled by default. To enable it, [modify the JATOS configuration file](JATOS_Configuration.html#ldap-authentication).

Once LDAP is enabled, an additional 'LDAP' switch will appear in the overlay dialog when an Admin adds a new user. Checking this box enforces authentication for that user via LDAP. Both standard JATOS users (locally authenticated) and LDAP users can coexist within the same JATOS instance.

Currently, JATOS does not automatically add LDAP users; they must be added manually by a JATOS Admin.

### Authentication via Google Sign-In

Google Sign-In is deactivated by default. To activate it, add your Google Client ID to `conf/jatos.conf` (or `conf/production.conf` for versions < 3.8.3), similar to this:

```
jatos.user.authentication.oauth.googleClientId = "1234567890-abc123abc123.apps.googleusercontent.com"
```

If a new user authenticates for the first time using Google Sign-In, their user account will be automatically created in JATOS. This means a 'Google' user account cannot be added manually by a JATOS Admin.

### Authentication via OpenID Connect (OIDC)

Since version 3.8.5, JATOS users can be authenticated using [OIDC](https://openid.net/developers/how-connect-works/). OIDC is an authentication protocol that provides an easy-to-use sign-in button. It requires an external OIDC provider (e.g., [Keycloak](https://www.keycloak.org/)) that is not part of JATOS itself. You can find more details on [how to configure JATOS to use OIDC](JATOS_Configuration.html#openid-connect-oidc-authentication) on the JATOS configuration page.

If a new user authenticates for the first time using OIDC, their user account will be automatically created in JATOS. This means an OIDC user account cannot be added manually by a JATOS Admin.

### Authentication via ORCID (orcid.org)

Since version 3.8.5, JATOS users can also be authenticated via [ORCID Sign-In](https://info.orcid.org/documentation/features/public-api/orcid-as-a-sign-in-option-to-your-system/). ORCID offers a straightforward way to configure and use a "Sign in with ORCID" button.

To use ORCID authentication, you only need to set two parameters in JATOS' configuration: your ORCID *client ID* and *client secret*. For information on how to [obtain these](https://info.orcid.org/documentation/integration-guide/registering-a-public-api-client/) (the short version: Go to your ORCID user page, expand your username at the top right, and click *Developer Tools*), then [configure your JATOS with your client ID and secret](JATOS_Configuration.html#orcid-orcidorg-authentication).

If a new user authenticates for the first time using ORCID, their user account will be automatically created in JATOS. This means an ORCID user account cannot be added manually by a JATOS Admin.