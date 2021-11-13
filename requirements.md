# Software Requirements

## Vision

### What is the vision of this product?

- _Treat Your Elves_ is an app designed to simplify the Secret Santa process. This app allows a group or organization to easily create members. Each member has the ability to create wishlists. Each member is randomly assigned a Secret Santa granting them the capability to view that individual's wishlist to choose a gift from.  

### What pain point does this project solve?

- _Treat Your Elves_  alleviates the stress of planning and organizing a Secret Santa gift exchange! It does all the work for you, randomly assigning each member a Secret Santa within the group and granting them visibility to that user's wishlist. No more accidentally finding out who your Secret Santa is or wondering what in the world you are going to buy for your person! Cozy up and spend your time enjoying the holidays, while we simplify the process for you!  

### Why should we care about your product?

- Many of us have been a part of Secret Santas that didn't go smoothly. Whether it's trying to find a gift for a coworker you don't know very well, accidentally finding out who your Secret Santas is, or the awkward moment as you open a gift that you don't understand.  _Treat Your Elves_ is focused on solving all your Secret Santa problems while ensuring you receive the gifts you ACTUALLY WANT.

## Scope (In/Out)

### IN - What will your product do

- Describe the individual features that your product will do.

- High overview of each. Only need to list 4-5

#### _Treat Your Elves_

- Utilizes authorization and authenticate of users.

- Allows users to create a wishlist of gifts they would like to receive from a Secret Santa.

- Allows groups/organizations to add members to a Secret Santa gift exchange.

- Randomly assigns Secret Santas to members within the same group.

- Displays price of items in user's wishlist.


### OUT - What will your product not do

<!-- - These should be features that you will make very clear from the beginning that you will not do during development. These should be limited and very few. Pick your battles wisely. This should only be 1 or 2 things. Example: My website will never turn into an IOS or Android app. -->

- _Treat Your Elves_ will not make a users information public without authorization. User wishlist is only to be shared with Secret Santa.

- _Treat Your Elves_ will never turn into an online ordering app or shopping cart.

### Minimum Viable Product vs

#### What will your MVP functionality be?

MVP is reached by implementing the following features:

  - Models for `users` and `groups` 
  - Roles assigned to users
  - Users will have a wishlist
  - Authentication
  - Ability to create users, user groups, user roles, wishlists
  - Ability to update wishlists and user profiles
  - Ability to read own and partner's wishlist
  - Ability to delete own wishlist
  - Ability to assign a Secret Santa to user / randomizing function

#### What are your stretch goals?

- integrate a more game style atmosphere where user's have ability to steal gifts (white elephant style)
- can rate a user as naughty or nice, depending on rating user is granted advantages or disadvantages

### Stretch

#### What stretch goals are you going to aim for?

- integrating a game style atmosphere to the application giving the user ability to steal gifts

## Functional Requirements

1. An admin can create and delete groups consisting of user accounts
2. A user can add, delete, or update their wishlist
3. A user is randomly assigned as a Secret Santa to a group member
4. A user can view their randomly assigned user's wishlist

### Data Flow


1. User is assigned to a group
2. User prompted to sign up/log in
3. User prompted to create wishlist
4. User randomly assigned as a Secret Santa to a group member.
5. User can view wishlist of assigned user.
6. User can log out and log back in as needed.

## Non-Functional Requirements (301 & 401 only)


1. Security

   _Treat Your Elves_ uses authentication and authorization for a secure app experience. By utilizing this implementation, we create a safe space for our clients to participate in a Secret Santa gift exchange. _Treat Your Elves_ takes our client's privacy as a top concern.

2. Usability

   _Treat Your Elves_ is a server-based app designed to appeal to a diverse group of clients. Each client will be guided through a user friendly setup. This application is designed specifically for desktop usage but could eventually convert into a mobile phone app.
