let userScore = 0;
let comScore = 0;
const userScore_para = document.querySelector("#user");
const comScore_para = document.querySelector("#com");
const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#result");
const restartBtn = document.querySelector("#restart-btn"); // Restart button
const genComChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randomIdx = Math.floor(Math.random() * 3);
    return options[randomIdx];
}

const drowGame = () => {
    msg.innerText = "It's a draw!";
    msg.style.backgroundColor = "yello";
    msg.style.color = "while";
}
// console.log(`computer choice is ${comChoice}`);


const endGame = () => {
    let finalWinner = '';
    if (userScore > comScore) {
        finalWinner = 'You';
        msg.style.backgroundColor = "green";
    }
    else if(userScore<comScore){
        finalWinner = 'Computer';
        msg.style.backgroundColor = "red";
    }
        msg.innerText = `Game Over! The final score is: You ${userScore} - ${comScore} Computer. ${finalWinner} win the game!`;
    
    // Disable the choice buttons so the user can't play anymore
    choices.forEach((choice) => {
        choice.style.pointerEvents = "none";
        choice.style.opacity = 0.5;
    });

    // You can also show a restart button here
    restartBtn.style.display = "block";
}

const restartGame = () => {
    // Reset scores
    userScore = 0;
    comScore = 0;
    userScore_para.innerText = userScore;
    comScore_para.innerText = comScore;

    // Reset message
    msg.innerText = "Pick your move";
    msg.style.backgroundColor = "#081b31"; // Assuming a default background color
    msg.style.color = "white"; // Assuming a default text color

    // Re-enable choice buttons
    choices.forEach((choice) => {
        choice.style.pointerEvents = "auto";
        choice.style.opacity = 1;
    });

    // Hide the restart button again
    restartBtn.style.display = "none";
};
const showWinner = (userWin, userChoice, comChoice) => {
    if (userWin) {
        userScore++;
        userScore_para.innerText = userScore;
        msg.innerText = `You Win! your${userChoice} beats ${comChoice}. You win!`;
        msg.style.backgroundColor = "green";
    }
    else {
        comScore++;
        comScore_para.innerText = comScore;
        msg.innerText = `You Lose! your ${userChoice} loses to ${comChoice}. You lose!`;
        msg.style.backgroundColor = "red";
    }
    if (userScore + comScore >= 10) {
        endGame();
    }
}
const playGame = (userChoice) => {
    const comChoice = genComChoice();

    if (userChoice === comChoice) {
        drowGame();
    }
    else {
        let userWin = true;
        if (userChoice === "rock") {
            userWin = comChoice === "paper" ? false : true;
        }

        else if (userChoice === "paper") {
            userWin = comChoice === "scissors" ? false : true;
        }
        else {
            userWin = comChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, comChoice);
    }

}

choices.forEach((choice) => {
    choice.addEventListener('click', () => {
        const userChoice = choice.getAttribute("id");
        console.log(userChoice);
        playGame(userChoice);

    })
})

// Add an event listener to the restart button
restartBtn.addEventListener('click', restartGame);

