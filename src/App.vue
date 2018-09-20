<template>
  <div id="app">
    <info-menu  v-show="!gameStarted" @startGame="startGame"></info-menu>
    <transition name="fade"> 
      <div :class="{'shake animated': animated}" @animationend="animated = false" v-if="gameStarted" v-show="!faded" id="mainCard">
        <roman-riddle v-if="currentType==='roman'" @goodAnswer="goodAnswer" @badAnswer="badAnswer" v-bind:riddle="currentRiddle" class="riddle"></roman-riddle>
        <arabic-riddle v-if="currentType==='arabic'" @goodAnswer="goodAnswer" @badAnswer="badAnswer" v-bind:riddle="currentRiddle" class="riddle"></arabic-riddle>
      </div>
    </transition>
    <div id="bg" ref="bg">
      <progress-bar v-show="gameStarted" :progress="progress"></progress-bar>
      <div v-show="gameStarted" id="levelInfo">
        Obecny poziom:<span id="level"> {{level}}</span>
      </div>
      <div v-show="gameStarted" id="pointContainer">
        <animated-number id="points" :number="points"></animated-number> pkt.
      </div>
    </div>
    <!-- side help menu -->
    <div id="btn"  @click="showHelp" :class="{'active': modalOpened}">
      <div id='top'></div>
      <div id='middle'></div>
      <div id='bottom'></div>
    </div>
    <div id="box" :class="{'active': modalOpened}">
      <div id="items">
          <div class="item">I - 1</div>
          <div class="item">V - 5</div>
          <div class="item">X - 10</div>
          <div class="item">L - 50</div>
          <div class="item">C - 100</div>
          <div class="item">D - 500</div>
          <div class="item">M - 1000</div>
      </div>
      <div id="copyright">
        &#9400; 2018 Kamil Soćko 
      </div>
    </div>
  </div>
</template>

<script>
import animatedNumber from './components/animatedNumber.vue'
import arabicRiddle from './components/arabicRiddle.vue'
import infoMenu from './components/infoMenu.vue'
import romanRiddle from './components/romanRiddle.vue'
import progressBar from './components/progressBar.vue'
import Howler from 'howler'
const { Howl } = Howler


export default {
  name: 'app',
  components: {
    arabicRiddle,
    infoMenu,
    romanRiddle,
    progressBar,
    animatedNumber
  },
  data () {
    return {
      amountToLevelUp: 4,
      gameStarted: false,
      currentType: String,
      currentRiddle: Number,
      level: 1,
      streak: 0,
      progress: 0,
      animated: false,
      faded: false,
      points: 0,
      prevRand: 0,
      modalOpened: false
    }
  },
  created () {
    if(!localStorage.getItem('currentLevel')){
      localStorage.setItem('currentLevel', 1)
    }
    else {
      this.level = localStorage.getItem('currentLevel')
    }

    if(!localStorage.getItem('points')){
      localStorage.setItem('points', 0)
    }
    else {
      this.points = localStorage.getItem('points')
    }

    this.initializeSounds()
    this.updateAmountToLevelUp()
    // setInterval(()=>this.createRiddle(),1000)
  }, 
  methods: {
    showHelp () {
      this.modalOpened = !this.modalOpened
    },
    addPoints(amount) {
      console.log(`Added ${amount} points to score`)
      this.points = parseInt(parseInt(this.points) + amount)
      localStorage.setItem('points', this.points)
    },
    updateAmountToLevelUp() {
      this.amountToLevelUp = parseInt(this.level) + 5
    },
    updateProgress () {
      this.progress = (this.streak / this.amountToLevelUp) * 100
    },
    getCurrentLevel() {
      // return parseInt(localStorage.getItem('currentLevel'))
      return this.level
    },
    setLevel(num) {
      localStorage.setItem('currentLevel', num)
    },
    incrementLevel() {
      this.level = parseInt(this.getCurrentLevel())+1
      localStorage.setItem('currentLevel', this.level)
    },
    decrementLevel() {
      if(this.getCurrentLevel() > 1) {
        this.level = parseInt(this.getCurrentLevel())-1
        localStorage.setItem('currentLevel', this.level)
      }
    },
    romanize (num) {
      if (!+num)
        return false;
      var	digits = String(+num).split(""),
        key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
              "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
              "","I","II","III","IV","V","VI","VII","VIII","IX"],
        roman = "",
        i = 3;
      while (i--)
        roman = (key[+digits.pop() + (i * 10)] || "") + roman;
      return Array(+digits.join("") + 1).join("M") + roman;
    },
    arabize (str) {
        str = str.toUpperCase();
        var validator = /^M*(?:D?C{0,3}|C[MD])(?:L?X{0,3}|X[CL])(?:V?I{0,3}|I[XV])$/,
        token = /[MDLV]|C[MD]?|X[CL]?|I[XV]?/g,
        key = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},
        num = 0, m;
      if (!(str && validator.test(str)))
        return false;
      while (m = token.exec(str))
        num += key[m[0]];
      return num;
    },
    randomBetween(min,max) {
      return Math.floor(Math.random()*(max-min+1)+min)
    },
    randomBetweenNoDup(min,max, prev = 0) {
      do {
        var rand = Math.floor(Math.random()*(max-min+1)+min)
      } while (rand == prev)
      return rand
    },
    createRiddle () {
      if (this.level == 1) {
        var bottomLine = 1
      }
      else {
        bottomLine = parseInt(this.level) * 10 - 10
      }
      var topLine = parseInt(this.level) * 50

      var rand = this.randomBetweenNoDup(bottomLine,topLine, this.prevRand)
      // var rand = this.randomBetweenNoDup(1,3, this.prevRand)
      
      this.prevRand = parseInt(rand)
      this.currentRiddle = parseInt(rand)
      this.currentType = 'roman'
      // setTimeout(()=>this.randomBetween(0,1) === 0 ? this.currentType = 'roman' : this.currentType = 'arabic',10)
      // this.randomBetween(0,1) === 0 ? this.currentType = 'roman' : this.currentType = 'arabic'
    },
    goodAnswer(){
      this.streak++
      this.updateProgress()
      this.addPoints(parseInt(this.level) * 5 + (2*parseInt(this.streak)))
      if (this.streak >= this.amountToLevelUp) {
        this.levelupSound.play()
        this.incrementLevel()
        this.updateAmountToLevelUp()
        this.streak = 0
        setTimeout(()=>this.updateProgress(),400)
      }
      else {
        this.correctSound.play()
      }

      // alert('dobra odpowiedz')
      this.makeFade(400)
      setTimeout(()=>this.createRiddle(),400)
      
    },
    badAnswer(){
      this.streak = 0
      this.wrongSound.play()
      this.shakeCard()
      this.updateProgress()
    },
    startGame(){
      this.gameStarted = true
      this.createRiddle()
    },
    initializeSounds(){
      this.wrongSound = new Howl({
        src: ['./static/sounds/wrong.mp3', './static/sounds/wrong.ogg'],
        volume: 0.6
      })
      this.correctSound = new Howl({
        src: ['./static/sounds/correct.mp3', './static/sounds/correct.ogg'],
        volume: 0.4
      })
      this.levelupSound = new Howl({
        src: ['./static/sounds/levelup.mp3', './static/sounds/levelup.ogg'],
        volume: 0.6
      })
    },
    shakeCard() {
      this.animated = true
    },
    makeFade(interval) {
      this.faded = true
      setTimeout(()=>this.faded = false, interval)
    }
  }
}
</script>

<style>
#copyright {
  bottom: 5px;
  position: absolute;
  text-align: center;
  width: 100%;
  font-family: Roboto;
  color: #a2a2a2;
}

#btn {
  position: fixed;
  z-index: 5;
  top: 15px;
  left: 15px;
  cursor: pointer;
  transition: left 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
}
#btn div {
  width: 35px;
  height: 2px;
  margin-bottom: 8px;
  background-color: rgb(255, 255, 255);
  transition: opacity 500ms, background-color 250ms, -webkit-transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
  transition: transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91), opacity 500ms, background-color 250ms;
  transition: transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91), opacity 500ms, background-color 250ms, -webkit-transform 500ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
}

#btn.active {
  left: 230px;
}
#btn.active div {
  background-color: #343838;
}
#btn.active #top {
  -webkit-transform: translateY(10px) rotate(-135deg);
          transform: translateY(10px) rotate(-135deg);
}
#btn.active #middle {
  opacity: 0;
  -webkit-transform: rotate(135deg);
          transform: rotate(135deg);
}
#btn.active #bottom {
  -webkit-transform: translateY(-10px) rotate(-45deg);
          transform: translateY(-10px) rotate(-45deg);
}

#box {
  border-right: 1px solid rgb(224, 224, 224);
  position: fixed;
  z-index: 4;
  overflow: auto;
  top: 0px;
  left: -275px;
  width: 275px;
  opacity: 0;
  padding: 20px 0px;
  height: 100%;
  background-color: #f6f6f6;
  color: #343838;
  transition: all 350ms cubic-bezier(0.6, 0.05, 0.28, 0.91);
}

#box.active {
  left: 0px;
  opacity: 1;
}

#items {
  position: relative;
  top: 50%;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
}
#items .item {
  position: relative;
  font-size: 2.5em;
  padding: 15px 50px;
  -webkit-transition: all 250ms;
  transition: all 250ms;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
}
/* #items .item:hover {
  padding: 15px 45px;
  background-color: rgba(52, 56, 56, 0.2);
} */

#btn, #btn * {
  will-change: transform;
}

#box {
  will-change: transform, opacity;
}

html {
  overflow-y:auto!important;
}

#app {
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}


#mainCard {
  position:absolute;
  /* width:400px; */
}
#info {
  width: 435px;
}
#bg {
  position: absolute;
  z-index: -2;
  min-width:600px;
  height: 600px;
  background-color: #f6f6f6;
}


@media screen and (max-width: 625px) {
  #bg,#mainCard,#info {
    min-width: 94vw!important;
    width: 94vw!important;
  }
  #bg {
    height: calc(100vh - 89px);
  }
}

@media screen and (max-height: 690px) {
  #bg {
    height: calc(100vh - 89px);
  }

  #info {
    width: 600px;
  }
}

@-webkit-keyframes blue-purple {
    0%{background-position:84% 0%}
    50%{background-position:17% 100%}
    100%{background-position:84% 0%}
}
@-moz-keyframes blue-purple {
    0%{background-position:84% 0%}
    50%{background-position:17% 100%}
    100%{background-position:84% 0%}
}
@-o-keyframes blue-purple {
    0%{background-position:84% 0%}
    50%{background-position:17% 100%}
    100%{background-position:84% 0%}
}
@keyframes blue-purple { 
    0%{background-position:84% 0%}
    50%{background-position:17% 100%}
    100%{background-position:84% 0%}
}

html, body {
  width:100%;
  height:100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#levelInfo {
  font-family: Roboto;
  font-size: 16px;
  margin-top: 3px;
  font-weight: 200;
}

#level {
  font-weight: 600;
}

#pointContainer {
  position: absolute;
    padding: 8px;
    bottom: 0;
    right: 0;
    font-family: roboto;
    font-size: 18px;
    
}

#points {
  font-weight: 500;
}

body{
  background: linear-gradient(0deg, #00b5f9, #a412f5, #12adf5);
  background-size: 600% 600%;
  -webkit-animation: blue-purple 40s ease infinite;
  -moz-animation: blue-purple 40s ease infinite;
  -o-animation: blue-purple 40s ease infinite;
  animation: blue-purple 40s ease infinite;
}

.riddle {
  font-size:72px;
}

#mainCard {
  padding: 10px;
}

.faded-enter-active {
  transition: opacity 0.5s
}
.faded-enter, .faded-leave-active {
  opacity: 0
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter, .fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
