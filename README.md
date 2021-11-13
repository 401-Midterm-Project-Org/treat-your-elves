# Treat Your Elves

Authors: George Mead, Katy Roffe, Barrett Nance, Sarah Creager, Justin Hamerly

---

## About

Treat Your Elves is an application to simplify the secret santa process.  This app allows a group or an organization to create members, allow those members to create wishlists, and randomly assigns each member a secret santa.  

---

## MVP

* Models for `users` and `groups`
* Roles assigned to users
* Users will have a wishlist
* Authentication
* Ability to create users, user groups, user roles, wishlists
* Ability to update wishlists and user profiles
* Ability to read own and partner's wishlist
* Ability to delete own wishlist
* Ability to assign a secret santa to user / randomizing function

---

## User Stories

### WISHLIST

As a group member I want to be able to add items to my wishlist for my secret santa to view  

*Feature Tasks:*  

* User can search for, and add an item to their wishlist.
* Wishlist items can come from an external api and show prices for the items
* users wishlists will be displayed to secret santas 

*Acceptance:*

* When the user searches for an item, they can click an add button, and the item will be added to their wishlist in a database
* When a group member is logged in they will see the wishlist of their secret gift recipent

### CREATE A GROUP

As a group administrator I want to be able to add my group members to the secret santa event

*Feature tasks:*

* admin can create a group and add users to the group
* admin has priveledges to add and remove members.  
* Users cannot add members/can request invitation for new members

*Acceptance:*

* The admin has an interface for adding and removing members.
* When members are added or removed, the group member list will update
* users have a request button, and when they request an add to the group, the admin will receive a request to approve or deny the request

### SECRET SANTA ASSIGNMENT

As a group admin, I want to be able to randomly assign everyone in the group a unique member of the group as their secret santa

*Feature tasks:*

* each member of the group is assigned a unique secret santa
* there are no duplicate secret santas
* you will not be assigned yourself as your secret santa

*Acceptance:*

* Group members will each be assigned a random secret santa using a linked list.  This will ensure that each member is tied to another unique member
The member on the end of the linked list will be linked to the head of the list

### PERSISTING DATABASE

As a secret santa, I want to be able to revisit the app to view any updates or changes made to my assigned partner

*Feature Tasks:*

* Wishlists will be stored on a Mongo database
* The database can receive CRUD requests to make changes and view wishlists

*Acceptance:*

* When doing CRUD requests, the Mongo database will reflect the changes.
* Status messages will be sent back upon successful/unsuccessful database requests.

### SECURITY

As an app user, I want to be able to log into my app and keep my data secure

*Feature Tasks:*

* Authentication and authorization for group members and administrators
User roles and capabilities to define appropriate CRUD capabilities

*Acceptance:*

* an admin will be able to do all CRUD methods when it comes to managing the users in the group
a user will only be able to view other members and update their own wishlists.
