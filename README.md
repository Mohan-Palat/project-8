# MoveMe
An application used to track boxed items during a relocation.

Moving is stressful.  Whether you hire someone or not.  Many people choose to box smaller items themselves.  Packing and unpacking could take days or weeks.  Inevitably, things get lost, some of which, could be important or irreplaceable (e.g., pictures, family heirlooms).  

Sometimes you need a packed item immediately before/during/after the move?  Do you know what box it’s in?  Was it unpacked already?  Is it still at the old house.  Was it even packed yet?  You need to know this information quickly.  Looking through random boxes, even ones with some form of organization, is time consuming and frustrating.  This application will allow you to manage your move and help solve these problems.

## Log In Page
![MoveMeLogin](/documentation/MoveMeLogin.png "Login Page")

## Box List Page
![MoveMeBoxListing](/documentation/MoveMeBoxListing.png "Box List Page")

## Box Detail Page
![MoveMeDetails](/documentation/MoveMeBoxDetails.png "Box Details Page")

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


# Technologies

* HTML
* CSS
* Javascript
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

[MoveMeERD](/documentation/MoveMeERD.png "ERD Diagram")

## Wireframe

[Tic Tac Toe wireframe](/documentation/Wireframe.png "Tic Tac Toe wireframe")

## Application design

The application consists of two classes, game (game.js) and player (player.js).  The game class handles all of the game mechanics such as adding players, alternating turns, and scoring.  The player class is for basic player xdata including customized tokens.

The main.js file manages the UI dynamics along with class interactions.

The style sheet controls the numerous sytling aspects making use of flexbox for the overall layout and grid styling for the game grid.

The index.html contains the basic markup along with links to the style sheet, javascript files, and audio files.

### Scoring and Winner Determination

Scoring is maintained in two separate arrays, a row/column tracker and a diagonal tracker.  The row/column tracker has six numeric elements defaulted to 0.  The first three represent columns 1-3 and the last three are for rows 1-3.  

Each time player 1 places a token in a sqaure, 1 is added to the respective column and row.  Similarly, 1 is subtrated from the row/column when player 2 selects a square.

A winner is identified whenever a row or column element has a +3 or -3.

The diagonal array and winner determination is a bit clunky.  It is tracked in an array with 7 characters, the forth element being an arbitrary tilda. That serves as a separater when the array is later evaluated.

The first three elements represent a diagonal win from top left to lower right.  The last three are for a win from top right to lower left.  An 'X' or 'O' is placed in the appropriate element when the user selects it.

The array is converted to a string and inspected for patterns to determine a winner (e.g., the first three elements are 'XXX', last three are 'OOO').  The tilda in the array is used to prevent false positives.

Naturally, if there is no winner the game ends in a draw.

It's important to note that 'X' and 'O' are used behind the scenes for scoring even if the user selects different tokens.


 # Known Issues
 - Players can choose more than one character.  This is mainly because emojis are made up of several charcters and I needed to allow for this.  This presents a problem when several characters are selected; it will not display properly in the game boxes.
 - Players can choose the same character or no charcter at all. 


 # Future Improvements
 - Provide an easier way to select emojis rather than copy/paste from another window/site.
 - Incorporate more feedback to players using sound and visual effects (e.g, audio indicator when game is over, win vs draw, etc).
 - Incorporate media queries for proper formatting on mobile devices.
 - AI competitor
 - Use persistence to allow uninterrupted play after page refreshes or connectivity loss. 
 - Refactor code; make use of DRY techniques. 
