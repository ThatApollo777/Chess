'use strict';
let current = [];
let move = 'l';
const LIST = [['a','b','c','d','e','f','g','h'],['one','two','three','four','five','six','seven','eight']];
const KNIGHTMOVE = [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]];
const KINGSMOVE = [[1,1],[1,0],[1,-1],[0,-1],[-1,-1],[-1,0],[-1,1],[0,1]]
$(document).ready(function () {
    $('td').click(function(){
        let clicked = $(this).attr('class').split(' ');
        if (clicked.includes('move')) {
            $('.'+current[0]+'.'+current[1]).removeClass(current[3]);
            $('.'+clicked[0]+'.'+clicked[1]).removeClass(clicked[3]).addClass(current[3]);
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
    });
});
function availableMoves(piece) {
    if (piece==='k') {
        for(let i = 0; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],KINGSMOVE[i][0],KINGSMOVE[i][1]);
            if (check) {
                let possible = $(check);
                possible.addClass('move');
                if (possible.attr('class').split(' ')[3].charAt(1) === move) {
                    possible.removeClass('move');
                }
            }
        }
    }
    if (piece==='r' || piece==='q') {
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],i,0);
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
        }
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],0,i);
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
        }
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],-i,0);
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
        }
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],0,-i);
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
        }
    }
    if (piece==='b' || piece==='q') {
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],i,i);
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
        }
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],i,-i);
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
        }
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],-i,i);
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
        }
        for(let i = 1; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],-i,-i);
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
        }
    }
    if (piece==='n') {
        for(let i = 0; i <= 7;i++){
            let check = coords('.'+current[0]+'.'+current[1],KNIGHTMOVE[i][0],KNIGHTMOVE[i][1]);
            if (check) {
                let possible = $(check);
                possible.addClass('move');
                if (possible.attr('class').split(' ')[3].charAt(1) === move) {
                    possible.removeClass('move');
                }
            }
        }
    }
    if (piece==='p') {
        
    }
    if (!$('.move').length) {
        $('.current').removeClass('current');
        current = [];
    }
}
function coords (coords, xOff, yOff) {
    let xy = coords.split('.');
    let target = '.' + LIST[0][LIST[0].indexOf(xy[1]) + xOff] + '.' + LIST[1][LIST[1].indexOf(xy[2]) + yOff];
    return target.includes('undefined')?false:target;
}