let platform = document.querySelector('.platform');
let invaders = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,
    20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,
    40,41,42,43,44,45,46,47,48,49,50,51,52,53,54
]
let playerIndex = 380;
let invadersIndex = 0;
let direction = 1;
let goingRight = true
let aliensRemoved = []


for(let i = 0; i < 400; i++){
    let cell = document.createElement('div');
    platform.appendChild(cell);

}
let cells = Array.from(document.querySelectorAll('.platform div'))
function draw(){
    for(let i=0; i<invaders.length; i++){
        if(!aliensRemoved.includes(i)){
        cells[invaders[i]].classList.add('alien')}
        // console.log(cells[invaders[1]])
    }
}
function remove(){
    for(let i=0; i<invaders.length; i++){
        cells[invaders[i]].classList.remove('alien')
    }
}
draw();
let player = cells[playerIndex].classList.add('player')
function movePlayer(e){
    cells[playerIndex].classList.remove('player')
    
    let leftSide = playerIndex % 20 == 0;
    let rightSide = playerIndex % 20 == 19;
        switch(e.key){
            case 'ArrowLeft':
                if(!leftSide) playerIndex --;
                break;
            case 'ArrowRight':
                if(!rightSide) playerIndex ++;
                break;
        }
    cells[playerIndex].classList.add('player')
}
document.addEventListener('keydown', movePlayer);
function moveInvaders(){
    remove();
    let leftSide = invaders[0] % 20 == 0;
    let rightSide = invaders[14] % 20 == 19;
    if(rightSide && goingRight){
        for( let i = 0; i < invaders.length; i++){
              invaders[i] += 21;
              direction = -1
              goingRight = false;
            //   console.log(invaders[i])
        }
    }
    for( let i = 0; i < invaders.length; i++){
        invaders[i]+= direction;
    }
    if(leftSide && !goingRight){
        for( let i = 0; i < invaders.length; i++){
            invaders[i]+= 21;
            direction = 1;
            goingRight = true
        } 
    }
    draw();
    if(cells[playerIndex].classList.contains('alien')){
        console.log('game over')
        clearInterval(timer)
    }
}
let timer = setInterval(moveInvaders, 500)

function shoot(){
    let laserIndex = playerIndex;
    
    
    function moveLaser (){
        cells[laserIndex].classList.remove('laser')
        laserIndex -= 20;
        cells[laserIndex].classList.add('laser')
        for(let i = 0; i<20; i++){
            if(laserIndex == i){
                clearInterval(laserId)
                cells[laserIndex].classList.remove('laser')
            } 
        }  
        if(cells[laserIndex].classList.contains('alien')){
            cells[laserIndex].classList.remove('alien')
            cells[laserIndex].classList.remove('laser')

            let alienRemoved = invaders.indexOf(laserIndex)
            aliensRemoved.push(alienRemoved)
            console.log(aliensRemoved)
        }
        
    }
    let laserId = setInterval(moveLaser, 100)
}


document.addEventListener('click',shoot)


