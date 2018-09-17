<template>
    <div>
        <span class="riddleText" ref="riddleText">{{riddleRomanized}}</span>
        <v-text-field id="answerInArabic" class="answerInput" autofocus type="number" v-model="answer" @keyup.enter="guess" ref="questionInput"></v-text-field>
    </div>
</template>

<script>
//
export default {
    props: {
        riddle: {
            type: Number
        }
    },
    data () {
        return {
            riddleArabized: this.riddle,
            answer: null,
            riddleRomanized: this.$parent.romanize(this.riddle),
        }
    },
    watch: {
        riddle(newVal) {
            this.riddle = newVal
            this.riddleRomanized = this.$parent.romanize(this.riddle)
            this.riddleArabized = this.riddle
        },
        riddleRomanized() {
            this.$nextTick(()=>{
                this.fixTextWidth()
            })
        }
    },
    created () {
        this.$nextTick(() => {
            this.$refs.questionInput.focus()
            this.fixTextWidth()
        })
    },
    methods: {
        guess() {
            if (this.answer != null && this.answer.trim() == this.riddleArabized) {
                console.log(`Good answer! ${this.answer} == ${this.riddleArabized}`)
                this.$emit('goodAnswer')
            }
            else {
                console.log(`Bad answer! ${this.answer} != ${this.riddleArabized}`)
                this.$emit('badAnswer')
            }
            this.answer = null
        },
        fixTextWidth() {
            var rt = this.$refs['riddleText']
            var riddleTextWidth = rt.getBoundingClientRect().width
            var bgWidth = this.$parent.$refs['bg'].getBoundingClientRect().width
            var bgMargin = 30

            rt.style.fontSize = ''
            while (bgWidth - bgMargin < riddleTextWidth) {
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

#answerInArabic {
    text-align:center;
    font-size: 32px;
}

#answerInArabic::-webkit-inner-spin-button, #answerInArabic::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
    -moz-appearance:textfield !important;
}
</style>
