<template>
    <div class="list">
        <strong>{{ list.name }}</strong>

        <draggable v-model="list.cards" group="cards" class="dragArea" @change="cardMoved">
            <card v-for="card in list.cards" :key="card.id" :card="card" :list="list"></card>
        </draggable>

        <a v-if="!editing" v-on:click="startEditing">Add a card</a>
        <textarea v-if="editing" ref="message" v-model="message" class="form-control mb-2"></textarea>
        <button v-if="editing" v-on:click="createCard" class="btn btn-secondary">Add</button>
        <a v-if="editing" v-on:click="editing=false">Cancel</a>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import card from 'components/card'

export default {
    components: { draggable, card },

    props: ["list"],

    data: function() {
        return {
            editing: false,
            message: ""
        }
    },

    methods: {
        startEditing: function() {
            this.editing = true
            this.$nextTick(() => { this.$refs.message.focus() })
        },

        cardMoved: function(event) {
            console.log(event)
            const evt = event.added || event.moved
            if (evt == undefined) { return }

            const element = evt.element
            const list_index = this.$store.state.lists.findIndex((list) => {
                return list.cards.find((card) => {
                    return card.id == element.id
                })
            })

            var data = new FormData
            data.append("card[list_id]", this.$store.state.lists[list_index].id)
            data.append("card[position]", evt.newIndex + 1)

            Rails.ajax({
                url: `cards/${element.id}/move`,
                type: "PATCH",
                data: data,
                dataType: "json"
            })
        },

        createCard: function() {
            var data = new FormData
            data.append("card[list_id]", this.list.id)
            data.append("card[name]", this.message)

            Rails.ajax({
                url: "/cards",
                type: "POST",
                data: data,
                dataType: "json",
                success: (data) => {
                    this.$store.commit('addCard', data)
                    this.message = ""
                    this.$nextTick(() => { this.$refs.message.focus() })
                }
            })
        }
    }
}
</script>

<style scoped>
.dragArea {
    min-height: 20px;
}

.card {
    padding: 1rem;
    border: 1px solid #fff;
    margin-top: 0.5rem;
    border-radius: 3px;
    background-color: #fff;
}
</style>
