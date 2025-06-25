---
title: Manage JATOS users
slug: /User-Manager.html
sidebar_position: 2
---

Each experimenter with access to the JATOS server (via the GUI) is considered a JATOS user. Users can add, modify, and delete studies they are members of, as well as export and delete results. Users may also be assigned special roles: **Admin** or **Superuser**.

- **Admin users** have access to the [*Administration* page](Administration.html) and can manage other users' access to JATOS.
- **Superusers** (since JATOS 3.7.4) can access all studies and their result data on the JATOS instance, regardless of membership.

---

## Manage Users

Only users with **Admin rights** can access the **User Manager** (found in the *Administration* page). Admins can:

  * Add new users.
  * Delete existing users.
  * Change user passwords.
  * Deactivate/activate users.
  * View information about each user's studies.

JATOS comes with one **default Admin user** (username: 'admin'). This Admin user always has unrevokable admin rights. The initial password for 'admin' is 'admin', which **should be changed immediately after installation and kept secure!**

Any user can be granted Admin rights by checking the corresponding box in the 'Admin' column of the user table. Only Admins can access the *Administration* pages (such as *User Manager* or *Study Info*).

![User manager screenshot](/img/v39x/user_manager_3.png)

Users can be **deactivated** (and later reactivated) via the switch in the 'Active' column. Deactivated users cannot log in, but their studies remain accessible to participants. To prevent a study from being run, deactivate it on its study *Administration* page.

For more information about a user's studies, click the *Studies* column. Metrics such as *Result Data Size* and *Result File Size* indicate the server resources consumed by that user's studies.

![User manager screenshot](/img/v39x/user_manager_4.png)

Clicking the **Export** button at the top of the page allows you to export user data in CSV format. This is useful for purposes such as obtaining a list of emails to notify all users about server downtime, a JATOS update, etc.

## Superusers

By default, granting Superuser status is disabled. To enable it, add the following line to your `conf/jatos.conf` file (or `conf/production.conf` for versions < 3.8.3):

```
jatos.user.role.allowSuperuser = true
```

Once enabled, any user can be granted the Superuser role by checking the corresponding box in the 'Superuser' column of the user table.

---

## Authentication Methods

### LDAP

JATOS supports LDAP (Lightweight Directory Access Protocol) for password authentication, allowing centralized user management. LDAP is disabled by default. To enable it, [modify the JATOS configuration file](JATOS_Configuration.html#ldap-authentication).

With LDAP enabled, an 'LDAP' switch appears when adding a new user. Checking this enforces LDAP authentication for that user. Both local and LDAP users can coexist, but LDAP users must be added manually by an Admin.

### Google Sign-In

Google Sign-In is disabled by default. To enable, add your Google Client ID to `conf/jatos.conf` (or `conf/production.conf` for versions < 3.8.3):

```
jatos.user.authentication.oauth.googleClientId = "1234567890-abc123abc123.apps.googleusercontent.com"
```

When a new user signs in with Google, their account is created automatically. Google user accounts cannot be added manually by an Admin.

### OpenID Connect (OIDC)

Since version 3.8.5, JATOS supports [OIDC](https://openid.net/developers/how-connect-works/) authentication. OIDC requires an external provider (e.g., [Keycloak](https://www.keycloak.org/)). See [JATOS configuration](JATOS_Configuration.html#openid-connect-oidc-authentication) for setup details.

New users authenticating via OIDC are created automatically. OIDC user accounts cannot be added manually by an Admin.

### ORCID

Since version 3.8.5, JATOS supports [ORCID Sign-In](https://info.orcid.org/documentation/features/public-api/orcid-as-a-sign-in-option-to-your-system/). To enable, set your ORCID *client ID* and *client secret* in the configuration. See [how to obtain these](https://info.orcid.org/documentation/integration-guide/registering-a-public-api-client/) and [how to configure JATOS](JATOS_Configuration.html#orcid-orcidorg-authentication).

New users authenticating via ORCID are created automatically. ORCID user accounts cannot be added manually by an Admin.

### SURF SRAM and SURFconext

Since version 3.9.6, JATOS supports authentication via [SURF SRAM](https://sram.surf.nl) and [SURFconext](https://surfconext.nl), which are widely used federated identity solutions for research and education in the Netherlands.

- **SURF SRAM** allows users from participating institutions to log in using their institutional credentials, simplifying access management for collaborative research projects.
- **SURFconext** enables single sign-on (SSO) for users from Dutch educational and research organizations, streamlining authentication and user provisioning.

To enable either authentication method, configure the relevant settings in your JATOS configuration file. For detailed setup instructions, see:
- [SURF SRAM configuration](JATOS_Configuration.html#surf-sram-sramsurfnl-authentication)
- [SURFconext configuration](JATOS_Configuration.html#surfconext-surfconextnl-authentication)

New users authenticating via SURF SRAM or SURFconext are created automatically. These user accounts cannot be added manually by an Admin.