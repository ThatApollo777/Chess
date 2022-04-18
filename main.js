'use strict';
let current = [];
let move = 'l';
let promotion = false;
const LIST = [['a','b','c','d','e','f','g','h'],['one','two','three','four','five','six','seven','eight']];
const MOVE = {
 'n':[false,[[2,1]]],
 'b':[true,[[1,1]]],
 'r':[true,[[1,0]]],
 'q':[true,[[1,1],[1,0]]],
 'k':[false,[[1,1],[1,0]]],
 'p':[false,[[0,0]]]
};
$(document).ready(function () {
    $('th:not(.coords)').hide();
    $('th:not(.coords)').click(function(){
        let promoted = $(this).attr('class').split(' ')[0];
        if (promotion&&promoted.charAt(1)!=move) {
            $((move==='l'?'.pd.':'.pl.')+(move==='l'?'one':'eight')).removeClass(move==='l'?'pd':'pl').addClass(promoted);
            promotion = false;
            $('th:not(.coords)').hide();
        }
    });
    $('td').click(function(){
        if (!promotion) {
            let clicked = $(this).attr('class').split(' ');
            if (clicked.includes('move')) {
                $('td[name="prevMove"]').attr('name','');
                $('.'+current[0]+'.'+current[1]).removeClass(current[3]).attr('name','prevMove');
                if ((clicked.includes('one')&&current.includes('pd'))||(clicked.includes('eight')&&current.includes('pl'))) {
                    promote(clicked);
                }
                $('.'+clicked[0]+'.'+clicked[1]).removeClass(clicked[3]).addClass(current[3]).attr('name','prevMove');
                clicked=[];
                move = move==='l'?'d':'l';
            }
            $('.current').removeClass('current');
            current = [];
            $('.move').removeClass('move');
            if(clicked[3].slice(1)===move){
                $('.current').removeClass('current');
                current = clicked;
                $('.'+clicked[0]+'.'+clicked[1]).addClass('current');
                availableMoves(clicked[3].charAt(0));
            }
        }
    });
});
function availableMoves(piece) {
    let target = MOVE[piece];
    for (let i in target[1]) {
        for (let x=0;x<=7;x++) {
            let bin = ('00'+(x >>> 0).toString(2)).slice(-3).split('');
            let direction = [
                target[1][i][bin[0]]*(bin[1]==1?1:-1),
                target[1][i][1-bin[0]]*(bin[2]==1?1:-1)
            ]
            let y =1;
            do {
                let check = coords('.'+current[0]+'.'+current[1],y*direction[0],y*direction[1]);
                if (check) {
                    let possible = $(check);
                    possible.addClass('move');
                    let end = possible.attr('class').split(' ')[3].charAt(1);
                    if (end === move) {
                        possible.removeClass('move');
                        break;
                    } else if (end === 'l' || end === 'd') {
                        break;
                    }
                } else {
                    break;
                }
                y++;
            } while(target[0])
        }
    }
    if (piece==='p') {
        let check = $(coords('.'+current[0]+'.'+current[1],0,move==='l'?1:-1));
        if (check.attr('class').split(' ').length <= 3) {
            check.addClass('move');
            check = $(coords('.'+current[0]+'.'+current[1],0,current[1]==='two'||current[1]==='seven'?move==='l'?2:-2:0));
            if (check.attr('class').split(' ').length <= 3) {
                check.addClass('move');
            }
        }
        for (let i=-1;i<=1;i=i+2) {
            check = coords('.'+current[0]+'.'+current[1],i,move==='l'?1:-1);
            if (check) {
                check = $(check);
                let classes = check.attr('class').split(' ');
                if (classes.length > 3) {
                    if (classes[3].charAt(1) != move) {
                        check.addClass('move');
                    }
                }
            }
        }
    }
}
function coords (coords, xOff, yOff) {
    let xy = coords.split('.');
    let target = '.' + LIST[0][LIST[0].indexOf(xy[1]) + xOff] + '.' + LIST[1][LIST[1].indexOf(xy[2]) + yOff];
    return target.includes('undefined')?false:target;
}
function promote (clicked) {
    promotion = true;
    $('th.'+move).show();
}