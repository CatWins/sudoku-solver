"use strict";function table_parse(e){for(var n=[],r=0;r<e.rows.length;r++){n[r]||(n[r]=[]);for(var t=0;t<e.rows[r].cells.length;t++)n[r][t]=e.rows[r].cells[t].innerHTML,n[r][t]||(n[r][t]=0)}return n}function table_fill(e,n){for(var r=0;r<e.rows.length;r++)for(var t=0;t<e.rows[r].cells.length;t++)n[r][t]?e.rows[r].cells[t].innerHTML=n[r][t]:e.rows[r].cells[t].innerHTML=""}function number_set(e,n){e.innerHTML=n}function table_clear(e){for(var n=0;n<e.rows.length;n++)for(var r=0;r<e.rows[n].cells.length;r++)e.rows[n].cells[r].innerHTML=""}function getRandomInt(e,n){return Math.floor(Math.random()*(n-e))+e}function puzzle_is_valid(e){var n=e.map(function(e){return e.slice()});for(var r in n)for(var t in n)if(n[r][t]){var u=n[r][t];n[r][t]=0;var o=n[r].concat(getColumn(t,n)).concat(getSquare(t,r,n)).sort(function(e,n){return e-n}).filter(function(e,n,r){return!(!e||e==r[n+1])});if(n[r][t]=u,o&&o.includes(n[r][t]))return!1}var l=makeMap(n);return Boolean(l)}function solve_cell(e){var n=e.map(function(e){return e.slice()}),r=makeMap(n);if(!r)return{success:!1,puzzle:null};for(var t in r)for(var u in r[t])if(1==r[t][u].length)return n[t][u]=r[t][u][0],n[t][u]>9||n[t][u]<1,{success:!0,puzzle:n};return{success:!1,puzzle:e}}function sudoku(e){var n=e.map(function(e){return e.slice()}),r=solve_cell(n);return!r.success&&r.puzzle&&(r=make_guess(n)),r.puzzle&&r.puzzle.some(function(e){return e.some(function(e){return 0==e})})&&(r.puzzle=sudoku(r.puzzle)),!!r.puzzle&&r.puzzle}function make_guess(e){var n=e.map(function(e){return e.slice()}),r=(getRandomInt(0,1e8),makeMap(n));if(!r)return{success:!1,puzzle:null};for(var t=2;t<=9;t++)for(var u in r)for(var o in r)if(r[u][o].length==t){for(var l in r[u][o]){var c=n.map(function(e){return e.slice()});if(c[u][o]=r[u][o][l],c=sudoku(c))return{success:!0,puzzle:c}}return{success:!1,puzzle:null}}return{success:!1,puzzle:null}}function array_diff(e,n){var r=e.filter(function(e){for(var r in n)if(n[r]==e)return!1;return!0});return r}function makeMap(e){var n=e.map(function(e){return e.slice()}),r=[1,2,3,4,5,6,7,8,9],t=!1,u=[];return n.forEach(function(e,o){return e.forEach(function(l,c){u[o]||(u[o]=[]),l?u[o][c]=[]:(u[o][c]=e.concat(getColumn(c,n)).concat(getSquare(c,o,n)).sort(function(e,n){return e-n}).filter(function(e,n,r){return!(!e||e==r[n+1])}),u[o][c].length>=9&&(t=!0),u[o][c]=array_diff(r,u[o][c]))})}),!t&&u}function getColumn(e,n){var r=[];return n.forEach(function(n){return r.push(n[e])}),r}function getSquare(e,n,r){var t=[];n=3*Math.floor(n/3),e=3*Math.floor(e/3);for(var u=n;u<n+3;u++)for(var o=e;o<e+3;o++)t.push(r[u][o]);return t}document.addEventListener("DOMContentLoaded",function(){function e(e){s.innerHTML=e,c.classList.toggle("popup__visible")}var n=document.querySelector(".sudoku"),r=document.querySelector(".number-selector"),t=document.querySelector(".number-selector_table"),u=document.querySelector(".button-solve"),o=document.querySelector(".button-clear"),l=document.querySelector(".button-new"),c=document.querySelector(".error"),s=document.querySelector(".error_message"),i=document.querySelector(".error_close"),a=null;n.addEventListener("click",function(e){e.target.classList.contains("sudoku_cell")&&(r.classList.contains("popup__visible")||(a=e.target,r.classList.toggle("popup__visible")))}),r.addEventListener("click",function(e){r.classList.contains("popup__visible")&&r.classList.toggle("popup__visible")}),t.addEventListener("click",function(e){e.target.classList.contains("number-selector_cell")&&(e.target.classList.contains("number-selector_close")||(a.innerHTML=e.target.innerHTML))}),u.addEventListener("click",function(r){var t=table_parse(n);if(puzzle_is_valid(t)){var u=sudoku(t);u||e("Invalid puzzle"),table_fill(n,u)}else e("Invalid puzzle")}),o.addEventListener("click",function(e){table_clear(n)}),l.addEventListener("click",function(n){e("This feature is unavalable yet")}),i.addEventListener("click",function(e){c.classList.contains("popup__visible")&&c.classList.toggle("popup__visible")})});