<template><span>{{displayNumber}}</span></template>

<script>
export default {
    props:['number'],
    data () {
        return {
            displayNumber:0,
            intNumber: parseInt(this.number),
            interval:false
        }
    },

    mounted(){
        this.displayNumber = this.intNumber ? this.intNumber : 0
    },
    watch: {
        number() {
            this.intNumber = parseInt(this.number)
        },
        intNumber() {
        clearInterval(this.interval);

            if(this.intNumber == this.displayNumber){
            return;
            }

            this.interval = window.setInterval(function(){

            if(this.displayNumber != this.intNumber){

                var change = (this.intNumber - this.displayNumber) / 10;

                change = change >= 0 ? Math.ceil(change) : Math.floor(change);

                this.displayNumber = this.displayNumber + change;
            }
            }.bind(this), 20);
        }
  }
}
</script>
