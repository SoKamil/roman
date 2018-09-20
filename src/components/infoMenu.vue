<template>
    <div id="info">
        <div id="infoTitle" class="display-2 font-weight-medium">Zasady gry</div>
        <div id="infoBody" class="body-1">
            Gra polega na zamianie liczb rzymskich na arabskie i odwrotnie.<br>
            Odpowiadając sześć razy z rzędu bez pomyłek - zapełniając pasek, awansujesz na kolejny, trudniejszy poziom.<br>
            Z każdym poziomem wzrasta pula liczb możliwych do wylosowania i ilość odpowiedzi potrzebnych do awansowania na kolejny, a także mnożnik punktów.<br>
            Punkty, jak i obecny poziom nie znikają po odświeżeniu strony, resetuje się natomiast licznik poprawnych pod rząd odpowiedzi.<br>
            Ściągawka znajduje się w lewym górnym rogu.<br>
            Powodzenia!
        </div>
        <div style="text-align: center;">
            <v-btn id="start" @click="startGame" large color="blue">GRAJ</v-btn>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        startGame () {
            this.$emit('startGame')
        },
    }
}
</script>
<style>
    #infoTitle {
        text-align: center;
        margin-bottom: 20px;
    }
    #infoBody {
        margin: 10px;
        font-family: Roboto, sans-serif;
        line-height: 19px;
        text-align:justify;
    }
    #info{
        max-width: 600px;
        padding:10px;
        text-align: left;
    }
    #start {
        color: #f6f6f6;
        font-family: Roboto;
    }
    .answerInput {
        width: 400px;
    }
</style>
