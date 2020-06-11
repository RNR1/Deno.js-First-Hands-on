# Deno.js First Hands-on

This is some first hands-on with the so-promising [Deno.js](https://deno.land) followed by Academind(Maximillian Schwarzmuller) course.

just a simple Todo App built with DORM Stack(Deno.js, Oak, React & MongoDB). 

overall seems like a really interesting technology, can't wait to have a further dive into it.

## Running the app
* Make sure you have an installed instance of Deno.js

1. Clone the project.
2. navigate to frontend-app, run `npm install`, then `npm start`
3. on root folder, run `cp .sample.env .env` and enter your MongoDB cluster details into the copied file.
4. run `deno run --allow-net --unstable --allow-read --allow-write --allow-plugin --allow-env app.ts`
5. navigate to http://localhost:3000