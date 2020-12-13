<template>
    <div>
        <b-link @click="back">
            Back
        </b-link>
        <div style="clear:both;"></div>
        <h1> {{view.firstName}} {{view.lastName}} </h1>
        <div class="buttons">
            <b-button @click="goEdit" class="btn" variant="primary">Edit</b-button>
            <b-button @click="deleteCustomer" class="btn" variant="danger">Delete</b-button>
        </div>
        <div style="clear:both;"></div>
        <hr>
        <b-list-group>
            <b-list-group-item>
                <b-icon icon="phone-fill"></b-icon>
                {{view.phone}}
            </b-list-group-item>
            <b-list-group-item>
                <b-icon icon="envelope-fill"></b-icon>
                {{view.email}}
            </b-list-group-item>
        </b-list-group>
        <br>
        <b-list-group>
            <b-list-group-item>
                {{view.address}}
            </b-list-group-item>
            <b-list-group-item>
                {{view.city}}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                id: null,
            }
        },
        created() {
            this.id = this.$route.params['id']
            this.$store.dispatch('getCustomer')
        },
        computed: {
            view() {
                return this.$store.getters.getCustomers.find(c => c.id == this.id)
            }
        },
        methods: {
            back() {
                this.$router.push('/')
            },
            goEdit() {
                this.$router.push(`/edit/${this.id}`)
            },
            deleteCustomer() {
                this.$store.dispatch('deleteCustomer', this.id)
                this.$router.push('/')
            },
        }
    }
</script>
<style scoped>
    @media only screen and (max-width: 1263px) {
        .btn {
            float: left;
            box-sizing: content-box;
            font-size: 11px;
            margin-top: 10px;
        }
    }
    h1 {
        width: 85%;
        float: left;
        margin: 20px 0px;
        font-weight: normal;
    }
    .buttons {
        width: 15%;
        float: right;
        margin-top: 30px;
    }
    .btn {
        width: 45%;
        margin-left: 7px;
        float: left;
    }
</style>