/* TYPER */
const TYPER = function () {
    if (TYPER.instance_) {
        return TYPER.instance_
    }
    TYPER.instance_ = this

    this.WIDTH = window.innerWidth
    this.HEIGHT = window.innerHeight-100
    this.canvas = null
    this.ctx = null

    this.words = []
    this.word = null
    this.wordMinLength = 5
    this.gameScore = 0
    this.gameMultiplier = 1
    this.missType = 50
    this.gamePoint = 0
    this.gameStart = false


    this.init()
}


    window.TYPER = TYPER

    TYPER.prototype = {
        init: function () {

            this.canvas = document.getElementsByTagName('canvas')[0]
            this.ctx = this.canvas.getContext('2d')
            var playerName = document.getElementById("playerName").value;

            this.canvas.style.width = this.WIDTH + 'px'
            this.canvas.style.height = this.HEIGHT + 'px'

            this.canvas.width = this.WIDTH * 2
            this.canvas.height = this.HEIGHT * 2

            this.loadWords()
        },

        loadWords: function () {
            const xmlhttp = new XMLHttpRequest()

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState === 4 && (xmlhttp.status === 200 || xmlhttp.status === 0)) {
                    const response = xmlhttp.responseText
                    const wordsFromFile = response.split('\n')

                    typer.words = structureArrayByWordLength(wordsFromFile)

                    typer.start()
                }
            }

            xmlhttp.open('GET', './lemmad2013.txt', true)
            xmlhttp.send()
        },

        start: function () {
            this.generateWord()
            this.word.Draw()

            window.addEventListener('keypress', this.keyPressed.bind(this))
        },

        generateWord: function () {
            const generatedWordLength = this.wordMinLength + parseInt(this.gameScore / 75)
            const randomIndex = (Math.random() * (this.words[generatedWordLength].length - 1)).toFixed()
            const wordFromArray = this.words[generatedWordLength][randomIndex]

            this.word = new Word(wordFromArray, this.canvas, this.ctx)
        },

        keyPressed: function (event) {
                const letter = String.fromCharCode(event.which)
                document.getElementById('scoreboard').innerHTML = "Score: " + Math.round(this.gameScore, 1) + "<br>";
                document.getElementById('lifeboard').innerHTML = "Lives left: " + Math.round(this.missType, 1);
                console.log(this.gameStart)

                if (letter === this.word.left.charAt(0)) {
                    console.log(this.gameStart)
                    this.word.removeFirstLetter()

                    this.gameScore = 1 * this.gameMultiplier
                    this.gameMultiplier += 3.6
                    if (this.word.left.length === 0) {
                        this.generateWord()
                    }

                    this.word.Draw()
                } else {
                    this.missType -= 1;
               }

                if (this.missType <= 0) {
                    score = []
                    if (window.localStorage.length == 0) {
                        score.push([document.getElementById("playerName").value, Math.round(this.gameScore, 1)])
                        localStorage.setItem('score', JSON.stringify(score));
                    } else {
                        let local = JSON.parse(localStorage.getItem('score'));
                        local.push([document.getElementById("playerName").value, Math.round(this.gameScore, 1)])
                        localStorage.setItem("score", JSON.stringify(local));
                    }
                    this.gamePoint = 0
                    this.restart = confirm("Restart game?")
                    if (this.restart == true) {
                        this.gameScore = 0
                        this.gameMultiplier = 1
                        this.missType = 50
                        this.gamePoint = 0
                        restartGame()
                    } else {
                        window.location.reload();
                    }
                }

        }
    }

    /* WORD */
    const Word = function (word, canvas, ctx) {
        this.word = word
        this.left = this.word
        this.canvas = canvas
        this.ctx = ctx
    }

    Word.prototype = {
        Draw: function () {
            this.ctx.clearRect(0, 100, this.canvas.width, this.canvas.height)
            this.ctx.textAlign = 'center'
            this.ctx.font = '140px Courier'
            this.ctx.fillText(this.left, this.canvas.width / 2, this.canvas.height / 2)
        },

        removeFirstLetter: function () {
            this.left = this.left.slice(1)
        }
    }
    window.onload = function () {
        const typer = new TYPER()
        window.typer = typer
    }
function structureArrayByWordLength (words) {
    let tempArray = []

    for (let i = 0; i < words.length; i++) {
        const wordLength = words[i].length
        if (tempArray[wordLength] === undefined)tempArray[wordLength] = []

        tempArray[wordLength].push(words[i])
    }

    return tempArray
}



function restartGame(){
    const typer = new TYPER()
    window.typer = typer
    typer.generateWord()
    typer.word.Draw()
}

function checkNameInput(gameStart) {
    let x = document.getElementById("playerName").value;
    if (document.getElementById("playerName").value != ""){
        console.log(document.getElementById("playerName").value)
        this.gameStart = gameStart
        this.gameStart = false
        console.log(this.gameStart)
        $("#startScreen").hide();
        $("#gameCanvas").show();

    } else {
        alert("Name field is empty!")
    }
}

