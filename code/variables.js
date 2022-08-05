// "use strict";

// In-Game
const canvas = document.querySelector("canvas");

// You need the getContext() method here so you have access to
// the canvas tags 2d drawing functions
// You also need it so that the sprites spawn within the canvas
// and not outside of it (the body element)
const context = canvas.getContext("2d");

// Intro credits
const introCredit1 = document.querySelector(".introCredit1");
const introCredit2 = document.querySelector(".introCredit2");
const countDownTimer = document.querySelector("#timer");
