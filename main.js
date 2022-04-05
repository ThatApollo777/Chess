'use strict';
let current = [];
let move = 'l';
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
            availableMoves(clicked[3].charAt(0));
            $('.'+clicked[0]+'.'+clicked[1]).addClass('current');
        }
    });
});
function availableMoves(piece) {
    if (piece==='k') {

    } else if (piece==='q') {

    } else if (piece==='r') {

    } else if (piece==='b') {

    } else if (piece==='n') {

    } else if (piece==='p') {
        
    }
}