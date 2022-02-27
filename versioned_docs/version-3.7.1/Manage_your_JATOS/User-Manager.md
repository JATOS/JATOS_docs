---
title: Manage JATOS users
slug: /User-Manager.html
sidebar_position: 2
---
import Hl from '@site/src/components/Highlight';

Each experimenter with access to the JATOS server (though the GUI) is a JATOS User. Users can create, modify and delete the studies they are members of. They can also export and delete results. Users may also have **admin rights**, which lets them access the <Hl>Administration</Hl> page and control other users' access to JATOS. 


## Manage users

Only users with admin rights have access to the <Hl>User Manager</Hl> (in the <Hl>Administration_ page</Hl>). From the <Hl>User Manager</Hl>, admins can create new users or delete existing ones, or change passwords. Admins can also deactivate/activate users and see information about the user's studies.

JATOS comes with one <Hl>Admin user</Hl> out-of-box (username: 'admin'). Admin always has admin rights that cannot be revoked. The initial password for Admin is 'admin' and it should be changed immediately after installation and kept safe!

Every user can be granted admin rights, by checking the corresponding box either during creation or in the <Hl>Admin</Hl> column of the table. Only admins can access the <Hl>Administration</Hl> pages (like <Hl>User Manager</Hl> or <Hl>Study Info</Hl>).

![User manager screenshot](/img/Screenshot_User_Manager1.png)

A user can be <Hl>deactivated</Hl> (and activated again) by clicking the checkbox in the <Hl>Active</Hl> column. A deactivated user cannot log in anymore but their studies can still be run by participants (to prevent a study from running, deactivate it in the study <Hl>Administration_ page</Hl>).

If you're an admin and need to get more information about a user's studies, click on the <Hl>Studies</Hl> column. You'll see <Hl>Result Data Size</Hl> and <Hl>Result File size</Hl>, which can give you an idea of how many of the server's resources this user needs.

![User manager screenshot](/img/Screenshot_User_Manager2.png)

Clicking on the <Hl>Export</Hl> button on the top of the page, you can export user data in CSV format. This is useful to e.g. get a list of emails if you need to notify all users about a server downtime, JATOS update, etc.   

## Authentication via LDAP

JATOS allows password authentication via LDAP (which lets an institution manage their users in a centralized way). LDAP is disabled by default. To enable it [change the JATOS config file](Configure-JATOS-on-a-Server.html#ldap-authentication-since-jatos--354). 

Once LDAP is enabled, there will be an additional checkbox <Hl>LDAP</Hl> on the overlay dialog when an admin creates a new user. Check this box to enforce authentication by LDAP. Normal JATOS users (locally authenticated) and LDAP users can co-exist in the same JATOS instance.

At the moment it is not possible to let JATOS create LDAP users automatically - they must be created by an JATOS admin manually.
