'use strict';
const cube = document.getElementById('cube');

class MainLogic{
  #count;
  #uvMarker = 1;
  #lockUntilSix = 1;
  #firstPlayed;
  constructor(){
    this.#count = 1;
    this.#firstPlayed = false;
    cube.addEventListener('click',this._diceOnclick.bind(this));
    cube.addEventListener('transitionend',this._convertFaceToNum.bind(this));
  }

/*
Updating UI and Generating Dice Logic
*/

// Dice Logic Begins Here

  _diceOnclick(){
    const min = 1;
    const max = 24;
    const xRand = this._getRandom(max, min);
    const yRand = this._getRandom(max, min);

    cube.style.webkitTransform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
    cube.style.transform = 'rotateX('+xRand+'deg) rotateY('+yRand+'deg)';
  }

  _getRandom(max, min) {
    return (Math.floor(Math.random() * (max-min)) + min) * 90;
  }

  _getFace(){
    const ar = ["front","back","top","bottom","left","right"];
    for(let position in ar){
      let {height,width} = document.querySelector(`.${ar[position]}`).getBoundingClientRect();
      height = Math.trunc(height);
      width = Math.trunc(width);
      if(height > 220 && width > 220){
        return ar[position];
      }
    }
  }

  _convertFaceToNum(){
    const position = this._getFace();
    const posObj = {
      front: 1,
      back: 2,
      top: 5,
      bottom: 6,
      right: 3,
      left: 4
    };
    for(let property in posObj){
      if(position === `${property}`){
        this._setPos(posObj[property]);
      }
    }
  }


// Dice Logic Ends Here

/*
Handling Movements Logic
*/
//if get a six then start the process

_setPos(diceNum){
  this.#count += diceNum;
  if(this.#count >= 51){
    this.#count = 1;
  }
  const el = document.querySelector(`.uv-${this.#count}`).outerHTML.split("=\"")[2].split("\"")[0].split(" ");
  this._putOnPath(el);
}

_putOnPath(el){
  //removing previous element
  if(this.#firstPlayed){
    this._removePawn();
  }

  //creating image element
  const pawn = document.createElement('img');
  console.log(pawn);
  pawn.src = "pawns/red-pawn.svg";
  const atr1 = el[0].slice(0,-1);
  const val1 = el[1];
  const atr2 = el[2].slice(0,-1).slice(1);
  const val2 = el[3];
  pawn.style.setProperty(atr1,val1);
  pawn.style.setProperty(atr2,val2);
  pawn.style.zIndex = 1;
  document.querySelector('.uv-1').insertAdjacentElement('afterend', pawn);
  pawn.classList.add("cells");
  pawn.classList.add("markToDelete");
  this.#firstPlayed = true;
  }

  _removePawn(){
    const delPawn = document.querySelector(".markToDelete");
    delPawn.remove();
  }







//Class ends here don't delete the following parenthesis
}

  const run = new MainLogic();


  // _Handler(){
  //   if(count%4 === 0){
  //     const yellow = new Yellow();
  //   }
  //   if(count%4 === 1){
  //     const yellow = new Green();
  //   }
  //   if(count%4 === 2){
  //     const yellow = new Red();
  //   }
  //   if(count%4 === 3){
  //     const yellow = new Blue();
  //   }
  //
  // }
// }

// class Yellow extends MainLogic{
//
// }
//
// class Green extends MainLogic{
//
// }
//
// class Red extends MainLogic{
//
// }
//
// class Blue extends MainLogic{
//
// }
