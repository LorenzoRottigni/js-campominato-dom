
function bombPlacer(bombNumber, gridSize) {
    const bombPositionsArray = []
    for (let i = 0; i < bombNumber; i++) {
        do{
            randomInt = Math.floor(Math.random() * gridSize);
        }while(isExisting(randomInt, bombPositionsArray))
        
        bombPositionsArray.push(randomInt);
        console.log(bombPositionsArray[i])
        const bombTarget = document.querySelector('#box-'+bombPositionsArray[i])
        console.log(bombTarget.firstChild)
        bombTarget.firstChild.addEventListener('click', () => {
            bombTarget.lastChild.src = '../img/bomb.png'
            bombTarget.firstChild.textContent = ''
            bombTarget.style.backgroundColor = 'red'
            endGameAnimation('LOST');
        })
        console.log('event listener added to ' + bombTarget.id)
    }
}

function isExisting(number, array){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === number){
            return true;
        }        
    }
    return false;
}

function endGameAnimation(esit){
    const animatedElement = document.getElementById('game-container')
    animatedElement.style.transition = '2s'
    animatedElement.style.opacity = '0'
    animatedElement.style.transform = 'translateX(-100%)'
    const scoreContainer = document.querySelector('.score-container');
    scoreContainer.transition = '2s'
    const loseContainer = document.createElement('div');
    loseContainer.classList.add('lose-container','bg-light', 'p-5', 'shadow', 'rounded');
    loseContainer.textContent = 'YOU ' + esit + '! Score: ' + scoreOutput.textContent
    const loseButton = document.createElement('button')
    loseButton.classList.add('btn','btn-outline-success')
    loseButton.textContent = 'Play again'
    loseButton.addEventListener('click', () => {
        location.reload()
    })
    loseContainer.appendChild(loseButton);
    document.querySelector('main').appendChild(loseContainer)
}