Kernest Konstellations Font Browser
================================

A few years ago, AppSumo had a deal with [Garrick van Buren](https://garrickvanburen.com/) on the [Kernest Konstellations fonts](http://kernest.com/). I purchased them, and have been getting fonts ever since (I think he stopped creating them in 2013).

This morning I wanted to browse through them and was tired of clicking in each of the directories, so I wrote a quick express app to parse the directory and makes some links. 

### The Fonts (not included)
These are paid fonts. They are not included (you can [buy them here](http://kernest.com/)). 


## Installation

clone and run 

    npm install

copy your fonts to the `font` directory. For instance, you might see:

	./fonts/
	./fonts/00-flouris/
	./fonts/00-flouris/index.html
	./fonts/00-flouris/fonts
	./fonts/01-velo/
	./fonts/01-velo/index.html
	./fonts/01-velo/fonts


## Run

### nodemon
I use nodemon, so if you want to use it:

	npm install -g nodemon 
	npm start

Otherwise
	
	node server/server.js


And visit 

	http://localhost:3000/


