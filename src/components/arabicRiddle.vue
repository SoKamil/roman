<template>
    <div>
        <span class="display-4 font-weight-regular">{{riddleArabized}}</span>
        <v-text-field autofocus id="answerInRomanian" type="string" v-model="answer" @keyup.enter="guess" ref="questionInput"></v-text-field>
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
    // directives: {
    //     focus: {
    //         inserted: function (el) {
    //             el.focus()
    //         }
    //     }
    // },
    created() {
        this.$nextTick(() => {
            this.$refs.questionInput.focus();
        })
    },
    data() {
        return {
            riddleArabized: this.riddle,
            answer: '',
            riddleRomanized: this.$parent.romanize(this.riddle),
        }
    },
    watch: {
        riddle(newVal) {
            this.riddle = newVal
            this.riddleArabized = this.riddle
            this.riddleRomanized = this.$parent.romanize(this.riddle)
        }
    },
    methods: {
        guess(e) {
            console.log(this.answer, this.riddleRomanized)
            if (this.answer != null && this.answer.toUpperCase().trim() == this.riddleRomanized) {
                console.log(`Good answer! ${this.answer} == ${this.riddleRomanized}`)
                this.$emit('goodAnswer')
            }
            else {
                console.log(`Bad answer! ${this.answer} != ${this.riddleRomanized}`)
                this.$emit('badAnswer')
            }
            this.answer = null
        }
    }
}
</script>

<style>
#answerInRomanian {
    text-transform: uppercase;
    text-align:center;
    font-size: 32px;
}

#answerInRomanian::-webkit-inner-spin-button, #answerInRomanian::-webkit-outer-spin-button {
    -webkit-appearance: none !important;
    margin: 0 !important;
    -moz-appearance:textfield !important;
}
</style>
