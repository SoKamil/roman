<template>
    <!-- <riddle :type="riddleType" @goodAnswer="goodAnswer" @badAnswer="badAnswer" v-bind:riddle="currentRiddle" class="riddle"></riddle> -->
    <!-- <roman-riddle v-if="currentType==='roman'" @goodAnswer="goodAnswer" @badAnswer="badAnswer" v-bind:riddle="currentRiddle" class="riddle"></roman-riddle> -->
    <div>
        <span class="riddleText" ref="riddleText">{{currentRiddle}}</span>
        <!-- <v-text-field id="answerInArabic" class="answerInput" autofocus type="number" v-model="answer" @keyup.enter="guess" ref="questionInput"></v-text-field> -->
        <v-text-field id="answerInput" autofocus v-model="answer" @keyup.enter="guess" ref="questionInput"></v-text-field>
    </div>
</template>

<script>
//
export default {
    props: ['type', 'riddle'],
    data () {
        return {
            answer: null
        }
    },
    computed: {
        riddleArabized() {
            return parseInt(this.riddle)
        },
        riddleRomanized () {
            return this.$parent.romanize(this.riddle)
        },
        currentRiddle() {
            return this.type == 'arabic' ? this.riddleArabized : this.riddleRomanized
        },
    },
    watch: {
        type(newVal) {
            this.type = newVal
        },
        riddle(newVal) {
            this.riddle = newVal
            // this.riddleArabized = parseInt(this.riddle)
            // this.riddleRomanized = this.$parent.romanize(this.riddle)
        },
        currentRiddle() {
            this.$nextTick(()=>{
                this.fixTextWidth()
            })
        }
        // riddleRomanized() {
        //     this.$nextTick(()=>{
        //         this.fixTextWidth()
        //     })
        // }
    },
    created () {
        this.$nextTick(() => {
            this.$refs.questionInput.focus()
            this.fixTextWidth()
        })
    },
    methods: {
        guess() {
            if (this.type == 'arabic') {
                if (this.answer != null && this.answer.trim().toUpperCase() == this.riddleRomanized) {
                    console.log(`Good answer! ${this.answer} == ${this.riddleRomanized}`)
                    this.$emit('goodAnswer')
                }
                else {
                    console.log(`Bad answer! ${this.answer} != ${this.riddleRomanized}`)
                    this.$emit('badAnswer')
                }
            } else if (this.type == 'romanic') {
                if (this.answer != null && this.answer.toUpperCase().trim() == this.riddleArabized) {
                    console.log(`Good answer! ${this.answer} == ${this.riddleArabized}`)
                    this.$emit('goodAnswer')
                }
                else {
                    console.log(`Bad answer! ${this.answer} != ${this.riddleArabized}`)
                    this.$emit('badAnswer')
                }
            }

            this.answer = null
        },
        fixTextWidth() {
            var rt = this.$refs['riddleText']
                rt.style.fontSize = ''
            var riddleTextWidth = rt.getBoundingClientRect().width
            var bgWidth = this.$parent.$refs['bg'].getBoundingClientRect().width
            var bgMargin = 30

            while (bgWidth - bgMargin < riddleTextWidth) {
                console.log('resizing')
                var riddleTextSize = parseFloat(getComputedStyle(rt, null).getPropertyValue('font-size'))
                rt.style.fontSize = riddleTextSize - 1 + 'px'
                riddleTextWidth = rt.getBoundingClientRect().width
            }
        }
    }
}
</script>
<style>
.riddleText {
    font-family: Roboto,sans-serif;
    font-size: 112px;
    font-weight: 300;
    letter-spacing: -.04em;
    line-height: 1;
    font-weight: 400;
}

#answerInput {
    text-align:center;
    font-size: 32px;
    text-transform: uppercase;
}

#answerInput::-webkit-inner-spin-button, #answerInput::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
    -moz-appearance:textfield !important;
}
</style>
