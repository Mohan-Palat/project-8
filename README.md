# MoveMe
An application used to track boxed items during a relocation.

Moving is stressful.  Whether you hire someone or not.  Many people choose to box smaller items themselves.  Packing and unpacking could take days or weeks.  Inevitably, things get lost, some of which, could be important or irreplaceable (e.g., pictures, family heirlooms).  

Sometimes you need a packed item immediately before/during/after the move?  Do you know what box it’s in?  Was it unpacked already?  Is it still at the old house.  Was it even packed yet?  You need to know this information quickly.  Looking through random boxes, even ones with some form of organization, is time consuming and frustrating.  This application will allow you to manage your move and help solve these problems.

## Log In Page
![MoveMe Login](/documentation/MoveMeLogin.png "Login Page")

## Box List Page
![MoveMe Box Listing](/documentation/MoveMeBoxListing.png "Box List Page")

## Box Detail Page
![MoveMe Details](/documentation/MoveMeBoxDetails.png "Box Details Page")

# User Stories Implemented
- As a user, I should be able to create a new account.
- As a user, I should be able to log in.
- As a user, I should be able to log out.
- As a user, I should be able to see a high level listing of my boxes only.
- As a user, I should be able to see the details of a specific box.
- As a user, I should be able to edit a box.
- As a user, I should be able to create a new box. 
- As a user, I should be able to remove a box.
- As a user, I should be able to add a category to a box (e.g., clothes, tools, cookware).
- As a user, I should be able to update the contents of a box.


## Additional Features
- Included sign up/log in functionality, with encrypted passwords & an authorization flow.
- Leveraged Materialize and custom styling to create a professional looking website.
- Seed files/routes can be used to prepopulate the database.


# Technologies

* HTML
* CSS
* Javascript
* Node JS
* Materialize
* Express
* Express Layouts
* EJS
* Mongo DB
* Mongoose
* Bcrypt


# Getting Started
You can access the site via this link:  [MoveMe](https://paul-project2.herokuapp.com/)


# Application Design

## Entity Relationship Diagram

![MoveMe ERD](/documentation/MoveMeERD.png "ERD Diagram")

## RESTful Routes

![MoveMe RESTful Routes For Users](/documentation/REST_RoutesForUsers.png "Users RESTful Routes")

![MoveMe RESTful Routes For Boxes](/documentation/REST_RoutesForBoxes.png "Boxes RESTful Routes")

## Wireframe  NEED TO COMPLETE

[Tic Tac Toe wireframe](/documentation/Wireframe.png "Tic Tac Toe wireframe")

## Application design
This application employs the Model View Controller principle to create a basic interactive web application.  It uses RESTful practices to manage the available services.

### Front-end
The front-end is a Node JS application which relies on Express and EJS.  Page styling is handled primarily by Materialize and custom CSS overrides. 

### Back-end
It utilizes Mongo as a non-relationship data store.  There are three collections defined: user, box, category.  User has a one-to-many relationship with box.  They are associated via a referential tie defined using Mongoose schemas.  The Category is a stand alone collection which is used to populate drop down boxes.  

There two seeds files and associated routes which can be used to prepopulate the collections. 


# Known Issues
- Some input fields can be blank which results in crashes if the field is queried at a future point in time.
- Site crashes when setting up a new user with an existing username. 


# Future Improvements
- Make login and new user errors more presentable and friendly to user.
- Finish implementing 'unpacked' and 'relocated' functionality.  This includes adding fields to models as well as card identification (maybe different colors) to identify state of box (i.e., moved, unpacked).
- Create a printable label that van be attached to box.
- Use pagination to limit the amount of boxes shown per page.
- Add search features such as show all boxes by: category, wildcard search, relocated, unpacked.
- Add destination field to associated collection.  This ties into the lable concept.  The label will include the destination in the new location (structure/floor/room) where movers can place the box.  This will avoid having boxes in wrong places or all in one location in the destination.
- Add options to set 'unpacked' and 'relocated' indicators on/off for all boxes for situations when a move is done at one time.
