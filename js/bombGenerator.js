function bombPlacer(bombNumber, gridSize) {
    const bombPositionsArray = []

    for (let i = 0; i < bombNumber; i++) {
        do{//do while generated int is already in array
            randomInt = Math.floor(Math.random() * gridSize);
        }while(isExisting(randomInt, bombPositionsArray))
        //push rand int in bomb array
        bombPositionsArray.push(randomInt);
        //get the bomb indexed box
        const bombTarget = document.getElementById('box-'+bombPositionsArray[i])
        console.log('box-'+bombPositionsArray[i]);
        //add bomb event to indexed box
        bombTarget.firstChild.addEventListener('click', () => {
            //show all placed bombs
            for (let i = 0; i < bombPositionsArray.length; i++) {
                const element = document.querySelector('#box-'+bombPositionsArray[i]);
                element.lastChild.src = '../img/bomb.png'
                element.style.backgroundColor = '#ffc107'
            }
            bombTarget.firstChild.textContent = ''
            //set background of the exploded bomb
            bombTarget.style.backgroundColor = 'red'
            //show lose animation
            endGameAnimation('LOST', gridSize);
            //reset score
            scoreOutput.textContent = ''
        })
    }
}

//checks if the number is already in the array
function isExisting(number, array){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === number){
            return true;
        }        
    }
    return false;
}

//animation game esit
function endGameAnimation(esit, gridSize){
    //get the whole grid section
    const animatedElement = document.getElementById('game-container')
    animatedElement.style.transition = '8s'
    animatedElement.style.opacity = '0'
    animatedElement.style.transform = 'translateX(-100%)'
    //get the top score counter
    const scoreContainer = document.querySelector('.score-container');
    scoreContainer.transition = '2s'
    //create new div for output
    const loseContainer = document.createElement('div');
    loseContainer.classList.add('lose-container','bg-light', 'p-5', 'shadow', 'rounded');
    //add WON or LOST string param to output string
    loseContainer.textContent = 'YOU ' + esit + '! Score: ' + scoreOutput.textContent
    //create new reset button
    const loseButton = document.createElement('button')
    loseButton.classList.add('btn','btn-outline-success')
    loseButton.textContent = 'Play again'
    //play again button listener
    loseButton.addEventListener('click', () => {
        //reset all positions and grid contents
        loseContainer.style.display = 'none'
        animatedElement.style.opacity = '1'
        animatedElement.style.transition = '2s'
        animatedElement.style.transform = 'translateX(0)'
        writeGrid(gridSize);
        bombPlacer(16,gridSize);
        scoreOutput.textContent = '0'
    })
    //append reset button to output container
    loseContainer.appendChild(loseButton);
    //append lose container to main
    document.querySelector('main').appendChild(loseContainer)
}