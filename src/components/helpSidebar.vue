<template>
    <div>
        <div id="btn"  @click="showHelp" :class="{'active': sidebarOpened}">
        <div id='top'></div>
        <div id='middle'></div>
        <div id='bottom'></div>
        </div>
        <div id="box" :class="{'active': sidebarOpened}">
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
export default {
    data() {
        return {
            sidebarOpened: false
        }
    },
    methods: { 
        showHelp() {
        this.sidebarOpened = !this.sidebarOpened
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

#btn, #btn * {
  will-change: transform;
}

#box {
  will-change: transform, opacity;
}
</style>
