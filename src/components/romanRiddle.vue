<template>
    <div>
        <span class="display-4 font-weight-regular">{{riddleRomanized}}</span>
        <v-text-field id="answerInArabic" autofocus type="number" v-model="answer" @keyup.enter="guess" ref="questionInput"></v-text-field>
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
        }
    },
    created () {
        this.$nextTick(() => {
            this.$refs.questionInput.focus();
        })
    },
    methods: {
        guess(e) {
            console.log(this.answer)
            if (this.answer != null && this.answer.trim() == this.riddleArabized) {
                console.log(`Good answer! ${this.answer} == ${this.riddleArabized}`)
                this.$emit('goodAnswer')
            }
            else {
                console.log(`Bad answer! ${this.answer} != ${this.riddleArabized}`)
                this.$emit('badAnswer')
            }
            this.answer = null
        }
    }
}
</script>
<style>
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
