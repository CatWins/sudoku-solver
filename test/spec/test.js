(function () {
  'use strict';

  // describe('Give it some context', function () {
  //   describe('maybe a bit more context here', function () {
  //     it('should run here few assertions', function () {
  //
  //     });
  //   });
  // });

  function str2twod(str) {
    var inner = [], outer = [];
    for (var i = 0; i < 9; i++) {
      outer = [];
      for (var j = 0; j < 9; j++) outer.push(parseInt(str[(i*9)+j]));
      inner.push(outer);
    }
    return inner;
  }

  function twod2str(arr) {
    var temp = [];
    for (var z in arr) {
      for (var y in arr[z]) temp.push(arr[z][y].toString());
    }
    return temp.join('');
  }

  describe('Array diff', function () {
    let cases = [
      [[1,2,3,4], [4,5,2], [1,3]],
      [[6,3,2,1,6,25,774,23], [774,25,41,1,2,2,3,6,44,21], [23]]
    ];

    for (let c in cases) {
      it('Case ' + (parseInt(c) + 1), function () {
        assert.equal(array_diff(cases[c][0], cases[c][1]).join(','), cases[c][2].join(','))
      });
    }
  });

  function printPuzzle(puzzle) {
    let res = ''
    puzzle.forEach(row => res += row.join('|') + '\n')
    return res
  }

  // describe('makeMap function', function () {
  //   let sp = [
  //     ['070254163162389475405716298216908547754160839983540612040820001301095084508001326',
  //       '101000000000000000010000000000010000000001000000001000102002210010100100010110000']
  //   ]
  //
  //   for (let i in sp) {
  //     it('Puzzle '+ (parseInt(i)+1), function(){
  //         assert.equal(twod2str(sudoku(str2twod(sp[i][0]))), sp[i][1])
  //     });
  //   }
  // })

  describe('Sudoku Solver', function () {
    describe('Easy', function () {
      let sp = [
        ['605720039400005100020100004090030706100809005204050080800003020002900001350067408',
         '615724839487395162923186574598432716136879245274651983849513627762948351351267498'],
        ['008030540300407900410008002043502060500000008060309410100800027005603004029070800',
         '978231546352467981416958372843512769591746238267389415134895627785623194629174853'],
        ['600108203020040090803005400504607009030000050700803102001700906080030020302904005',
          '645198273127346598893275461514627389238419657769853142451782936986531724372964815'],
        ['019060540000000000820974036001503800000000000002701600750138092000000000083040710',
          '319862547467315289825974136671593824538426971942781653756138492194257368283649715'],
        ['046000000902060008008400250000800070500702003010006000064003900300080102000000730',
          '146258397952367418738491256623849571589712643417536829264173985375984162891625734'],
        ['006020050002000194000100207607082019085070030000605400090013040001009000730008900',
          '416927853372856194859134267647382519985471632123695478598213746261749385734568921'],
        ['080204539923000006060098000210903807000610902490502003000006710005030620602070098',
          '781264539923751486564398271216943857358617942497582163839426715175839624642175398'],
        ['070254163162389475405716298216908547754160839983540612040820001301095084508001326',
          '879254163162389475435716298216938547754162839983547612647823951321695784598471326']
      ];

      for (let i in sp) {
        it('Puzzle '+ (parseInt(i)+1), function(){
            assert.equal(twod2str(sudoku(str2twod(sp[i][0]))), sp[i][1])
        });
      }
    });
    describe('Hard', function () {
      let sp = [
        ['503020700000000100002700650006015000000079500740300210980100000020000305000000000',
          '563821794479536128812794653296415837138279546745368219987153462621947385354682971'],
        ['400601002502000109030000070000169000001000200000238000040000050307000406600403008',
          '479681532582347169136592874823169745961754283754238691248916357397825416615473928'],
        ['300000004000237000007809600403000708070000090205000406006304100000726000500000007',
          '382615974649237851157849623463592718871463592295178436726354189918726345534981267'],
        ['006700008050060020900001600600009500040030080009800004007200005020040090500007300',
          '236794158451368729978521643682479531745132986319856274897213465123645897564987312']
      ];

      for (let i in sp) {
        it('Puzzle '+ (parseInt(i)+1), function(){
            let solution = str2twod(sp[i][1])
            let result = sudoku(str2twod(sp[i][0]))
            assert.equal(twod2str(result), sp[i][1], '\n| RESULT |\n' + printPuzzle(result) + '| ACTUAL SOLUTION |\n' + printPuzzle(solution))
        });
      }
    });
  });
})();