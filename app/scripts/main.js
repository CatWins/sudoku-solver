document.addEventListener("DOMContentLoaded", () => {
  let sudoku_table = document.querySelector('.sudoku')
  let number_selector = document.querySelector('.number-selector')
  let number_selector_table = document.querySelector('.number-selector_table')
  let button_solve = document.querySelector('.button-solve')
  let button_clear = document.querySelector('.button-clear')
  let error = document.querySelector('.error')
  let error_message = document.querySelector('.error_message')
  let error_close = document.querySelector('.error_close')

  let selected_cell = null

  function error_show(message) {
    error_message.innerHTML = message
    error.classList.toggle('popup__visible')
  }

  sudoku_table.addEventListener("click", e => {
    if (e.target.classList.contains('sudoku_cell')) {
      if (!number_selector.classList.contains('popup__visible')) {
        selected_cell = e.target
        number_selector.classList.toggle('popup__visible')
      }
    }
  })

  number_selector.addEventListener("click", e => {
    if (number_selector.classList.contains('popup__visible')) {
      number_selector.classList.toggle('popup__visible')
    }
  })

  number_selector_table.addEventListener("click", e => {
    if (e.target.classList.contains('number-selector_cell')) {
      if (!e.target.classList.contains('number-selector_close')) {
        selected_cell.innerHTML = e.target.innerHTML
      }
    }
  })

  button_solve.addEventListener("click", e => {
    let puzzle = table_parse(sudoku_table)
    if (puzzle_is_valid(puzzle)) {
      let solution = sudoku(puzzle)
      table_fill(sudoku_table, solution)
    } else {
      error_show('Invalid puzzle')
    }
  })

  button_clear.addEventListener("click", e => {
    table_clear(sudoku_table)
  })

  error_close.addEventListener("click", e => {
    if (error.classList.contains('popup__visible')) {
      error.classList.toggle('popup__visible')
    }
  })

})

function table_parse(table) {
  let puzzle = []
  for (let y = 0; y < table.rows.length; y++) {
    if (!puzzle[y]) puzzle[y] = []
    for (let x = 0; x < table.rows[y].cells.length; x++) {
      puzzle[y][x] = table.rows[y].cells[x].innerHTML
      if (!puzzle[y][x]) puzzle[y][x] = 0
    }
  }
  return puzzle
}

function table_fill(table, puzzle) {
  for (let y = 0; y < table.rows.length; y++) {
    for (let x = 0; x < table.rows[y].cells.length; x++) {
      if (!puzzle[y][x]) {
        table.rows[y].cells[x].innerHTML = ''
      } else {
        table.rows[y].cells[x].innerHTML = puzzle[y][x]
      }
    }
  }
}

function number_set(cell, n) {
  cell.innerHTML = n
}

function table_clear(table) {
  for (let y = 0; y < table.rows.length; y++) {
    for (let x = 0; x < table.rows[y].cells.length; x++) {
      table.rows[y].cells[x].innerHTML = ''
    }
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//  CHECKS IF PUZZLE IS VALID
function puzzle_is_valid(arg_puzzle) {
  let puzzle = arg_puzzle.map(row => row.slice())

  for (let y in puzzle) {
    for (let x in puzzle) {
      if (puzzle[y][x]) {
        let tmp = puzzle[y][x]
        puzzle[y][x] = 0
        let restricted = puzzle[y]
          .concat(getColumn(x, puzzle))
          .concat(getSquare(x, y, puzzle))
          .sort((a,b) => a-b)
          .filter((curr, i, arr) => (!curr || curr == arr[i + 1]) ? false : true)
        puzzle[y][x] = tmp
        if (restricted && restricted.includes(puzzle[y][x])) return false
      }
    }
  }
  let map = makeMap(puzzle)
  return Boolean(map)
}

//  WRITE EXACT ONE NUMBER IF CAN
//  RETURNS {BOOL : SUCCESS, ARRAY : PUZZLE OR NULL}
function solve_cell(arg_puzzle) {
  let puzzle = arg_puzzle.map(row => row.slice())
  let map = makeMap(puzzle)
  if (!map) {
    // console.log('solve_cell | No map generated')
    return {'success': false, 'puzzle': null}
  }

  for (let y in map) {
    for (let x in map[y]) {
      if (map[y][x].length == 1) {
        puzzle[y][x] = map[y][x][0]
        // console.log('Writing ' + map[y][x][0] + ' at ' + parseInt(parseInt(x) + 1) + ' | ' + parseInt(parseInt(y) + 1))
        if (puzzle[y][x] > 9 || puzzle[y][x] < 1) console.error("WRONG NUMBER! " + puzzle[y][x])
        return {'success': true, 'puzzle': puzzle}
      }
    }
  }
  return {'success': false, 'puzzle': arg_puzzle}
}

//  RETURNS PUZZLE SOLUTION AS ARRAY
function sudoku(arg_puzzle) {
  let puzzle = arg_puzzle.map(row => row.slice())
  // console.log(puzzle[2][3] + ' | ' + puzzle[2][4])

  let res = solve_cell(puzzle)
  if (!res.success && res.puzzle) res = make_guess(puzzle)

  // console.log((res.puzzle) ? 'Step succeeded.' : 'Step failed.')

  if (res.puzzle && res.puzzle.some(row => row.some(cell => (cell == 0)))) res.puzzle = sudoku(res.puzzle)
  if (!res.puzzle) return false
  return res.puzzle
}

function make_guess(arg_puzzle) {
  let puzzle = arg_puzzle.map(row => row.slice())
  let id = getRandomInt(0, 100000000)
  // console.log("Guesser started with id = " + id)

  let map = makeMap(puzzle)
  if (!map) {
    // console.log('id = ' + id + ' | No map generated')
    return {'success': false, 'puzzle': null}
  }

  for (let i = 2; i <= 9; i++) {  //was <
    for (let y in map) {
      for (let x in map) {
        if (map[y][x].length == i) {
          for (let guess in map[y][x]) {
            let puzzle_guess = puzzle.map(row => row.slice())
            puzzle_guess[y][x] = map[y][x][guess]
            // console.log('id = ' + id + ' | Guess that ' + map[y][x][guess] + ' at ' + parseInt(1 + parseInt(x)) + ' | ' + parseInt(1 + parseInt(y)))
            puzzle_guess = sudoku(puzzle_guess)
            //puzzle_guess[y][x] = 0
            if (puzzle_guess) return {'success': true, 'puzzle': puzzle_guess}
          }
          // console.error('Guesser with id = ' + id + ' finished.')
          return {'success': false, 'puzzle': null}
        }
      }
    }
  }
  // console.error('Guesser with id = ' + id + ' finished.')
  return {'success': false, 'puzzle': null}
}

function array_diff (arr_1, arr_2) {
  let res = arr_1.filter((curr) => {
    for (let i in arr_2) {
      if (arr_2[i] == curr) return false
    }
    // console.log('yaya')
    return true
  })
  // console.log('diff finished')
  return res
}

function makeMap(arg_puzzle) {
  let puzzle = arg_puzzle.map(row => row.slice())

  // puzzle.forEach(row => {console.log(row.join('|'))})
  // console.log('mapping')
  var digits = [1,2,3,4,5,6,7,8,9]
  let fail = false
  let map = []

  puzzle.forEach((row, y) => row.forEach((cell, x) => {
    // console.log(row)
    if (!map[y]) map[y] = []
    if (!cell) {
      map[y][x] = row
        .concat(getColumn(x, puzzle))
        .concat(getSquare(x, y, puzzle))
        .sort((a,b) => a-b)
        .filter((curr, i, arr) => (!curr || curr == arr[i + 1]) ? false : true)
        if (map[y][x].length >= 9) {
          // console.warn('fail = true')
          fail = true
        }
        map[y][x] = array_diff(digits, map[y][x])
        // if (map[y][x].length < 1) {
        //   console.error('fail miss')
        // }
    } else {
      map[y][x] = []
    }
    // if (map[y][x].length > 9) console.error('WOOF! Length is ' + map[y][x].length + '\n Array is ' + map[y][x].join('|'))
  }))
  // console.log('mapping complete with ' + !fail)
  // console.log(map)
  return (fail) ? false : map
}

//  RETURNS COLUMN AS ARRAY
function getColumn(x, arr) {
  var res = []
  arr.forEach(row => res.push(row[x]))
  return res
}

//  RETURNS QUADRANT AS ARRAY
function getSquare(x, y, arr) {
  var res = []
  y = Math.floor(y / 3)*3
  x = Math.floor(x / 3)*3
  for (let j = y; j < y + 3; j++) {
   for (let i = x; i < x + 3; i++) {
     res.push(arr[j][i])
   }
  }
  return res
}
