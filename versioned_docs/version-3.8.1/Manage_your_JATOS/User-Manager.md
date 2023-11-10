---
title: Manage JATOS users
slug: /User-Manager.html
sidebar_position: 2
---

Each experimenter with access to the JATOS server (though the GUI) is a JATOS User. Users can create, modify and delete the studies they are members of. They can also export and delete results. Users may also have special roles: **Admin** or **Superusers**. Only Admin users have access to the [_Administration_ page](Administration.html) and control other users' access to JATOS. Superusers exist only since JATOS version 3.7.4 and they can access all studies on this JATOS including their result data. 


## Manage users

Only users with admin rights have access to the **User Manager** (in the _Administration_ page). From the _User Manager_, admins can create new users or delete existing ones, or change passwords. Admins can also deactivate/activate users and see information about the user's studies.

JATOS comes with one **Admin user** out-of-box (username: 'admin'). User Admin always has admin rights that cannot be revoked. The initial password for Admin is 'admin' and it should be changed immediately after installation and kept safe!

Every user can be granted Admin rights, by checking the corresponding box in the _Admin_ column of the table. Only admins can access the _Administration_ pages (like _User Manager_ or _Study Info_).

![User manager screenshot](/img/Screenshot_User_Manager3.png)

A user can be **deactivated** (and activated again) by clicking the checkbox in the 'Active' column. A deactivated user cannot log in anymore but their studies can still be run by participants (to prevent a study from running, deactivate it in the study _Administration_ page).

If you're an admin and need to get more information about a user's studies, click on the _Studies_ column. You'll see _Result Data Size_ and _Result File size_, which can give you an idea of how many of the server's resources this user needs.

![User manager screenshot](/img/Screenshot_User_Manager4.png)

Clicking on the _Export_ button on the top of the page, you can export user data in CSV format. This is useful to e.g. get a list of emails if you need to notify all users about a server downtime, JATOS update, etc.   


## Superusers

By default the ability to turn a user into a Superuser is deactivated and has to be activated in `conf/jatos.conf` (or `conf/production.conf` in version < 3.8.3) by adding:

```
jatos.user.role.allowSuperuser = true
```

Then every user can be granted the Superuser role by checking the corresponding box in the _Superuser_ column of the table.

Superusers can access all studies on this JATOS instance regardless if they were added as a member user. This includes changing the study properties, accessing the result data or deleting the study. This is useful for single-lab or training JATOS installations where one user needs fast access to everything to help other researchers or students. However unlike Admin users Superusers cannot access the Administration page or manage other users.


## Authentication via LDAP

JATOS allows password authentication via LDAP (which lets an institution manage their users in a centralized way). LDAP is disabled by default. To enable it [change the JATOS config file](JATOS_Configuration.html#ldap-authentication). 

Once LDAP is enabled, there will be an additional checkbox 'LDAP' on the overlay dialog when an admin creates a new user. Check this box to enforce authentication by LDAP. Normal JATOS users (locally authenticated) and LDAP users can co-exist in the same JATOS instance.

At the moment it is not possible to let JATOS create LDAP users automatically - they must be created by an JATOS admin manually.


## Authentication via Google Sign-In

Google Sign-In is deactivated by default and can be activated by adding your Google Client-ID in the `conf/jatos.conf` (or `conf/production.conf` in version < 3.8.3), similar to this:

```
jatos.user.authentication.oauth.googleClientId = "1234567890-abc123abc123.apps.googleusercontent.com"
```

If a new user authenticates the first time with Google Sign-In the user will be automatically created in JATOS. This means a 'Google' user cannot be created by a JATOS Admin.


## Authentication via OpenId Connect (OIDC)

Since version 3.8.5 JATOS users can be authenticated by [OIDC](https://openid.net/developers/how-connect-works/). OIDC is an authentication protocol that offers an easy-to-use sign in button. It needs an OIDC provider that is not part of JATOS (e.g. [Keycloak](https://www.keycloak.org/)). You can find more about [how to configure JATOS to use OIDC](/JATOS_Configuration.html#openid-connect-oidc) in the JATOS configuration page.

If a new user authenticates the first time with OIDC the user will be automatically created in JATOS. This means an OIDC user cannot be created by a JATOS Admin.


## Authentication via ORCID (orcid.org)

Since version 3.8.5 JATOS users can be authenticated by [ORCID sign-in](https://info.orcid.org/documentation/features/public-api/orcid-as-a-sign-in-option-to-your-system/). ORCID offers an easy way to configure and use a _Sign in with ORCID_ button.

You only need to set two parameters in JATOS' configuration to make your JATOS use ORCID's authentication: your ORCID _client ID_ and _client secret_. Read [here](https://info.orcid.org/documentation/integration-guide/registering-a-public-api-client/) more about how to get these (but the short version is: Go to your ORCID user page -> expand your username top right: click _Developer Tools_). Then [configure your JATOS with your client ID and secret](/JATOS_Configuration.html#orcid-orcidorg-authentication).

If a new user authenticates the first time with ORCID the user will be automatically created in JATOS. This means an ORCID user cannot be created by a JATOS Admin.