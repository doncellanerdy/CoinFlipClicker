const buttonClicker = document.querySelector('#clickMe')
let guess = 1
buttonClicker.addEventListener('click', makeReq)
document.querySelector('#guess').addEventListener('click', toggleGuess)

async function makeReq(){
  const queryId = document.querySelector("#score").innerHTML
  const res = await fetch(`http://localhost:8000/api?score=${queryId}`)
  const data = await res.json()

  document.querySelector("#score").innerHTML = +document.querySelector("#score").innerHTML + ((data.flip === guess) ? 1 : 0)

  if(data.flip === 1){
    buttonClicker.removeEventListener('click', makeReq)
    document.querySelector("img").src = "asset/Bronze_11.png"
    setTimeout(changeImage, 2000)
  }else{
    buttonClicker.removeEventListener('click', makeReq)
    document.querySelector("img").src = "asset/Bronze_30.png"
    setTimeout(changeImage, 2000)
  }
  updateLevel(data.level)
}

function changeImage(){
  document.querySelector("img").src = "asset/fast.gif"
  buttonClicker.addEventListener('click', makeReq)
}

function updateLevel(level){
  if(level){
    document.querySelector("#level").innerHTML = level
  }
}

function toggleGuess(){
  let guessSelector = document.querySelector('#guess')

  if(guessSelector.innerText === "Heart"){
    guess = 2
    guessSelector.innerText = "Star"
  }else{
    guess = 1
    guessSelector.innerText = "Heart"
  }
}