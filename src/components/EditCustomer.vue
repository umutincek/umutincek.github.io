<template>
    <div>
        <h1>Edit Customer</h1>
        <hr>
        <b-card
            title="Customer Info"
        >
            <b-card-text>
                <h6>First Name *</h6>
                <b-form-input
                    v-model="customer.firstName"
                    placeholder="First Name"
                ></b-form-input>
            </b-card-text>
            <b-card-text>
                <h6>Last Name *</h6>
                <b-form-input
                    v-model="customer.lastName"
                    placeholder="Last Name"
                ></b-form-input>
            </b-card-text>
        </b-card>
        <br>
        <b-card
            title="Customer Contact"
        >
            <b-card-text>
                <h6>Email *</h6>
                <b-form-input
                    v-model="customer.email"
                    placeholder="Email"
                ></b-form-input>
            </b-card-text>
            <b-card-text>
                <h6>Phone Number *</h6>
                <b-form-input
                    v-model="customer.phone"
                    placeholder="Phone Number"
                ></b-form-input>
            </b-card-text>
        </b-card>
        <br>
        <b-card
            title="Customer Location"
        >
            <b-card-text>
                <h6>Address *</h6>
                <b-form-input
                    v-model="customer.address"
                    placeholder="Address"
                ></b-form-input>
            </b-card-text>
            <b-card-text>
                <h6>City *</h6>
                <b-form-input
                    v-model="customer.city"
                    placeholder="City"
                ></b-form-input>
            </b-card-text>
        </b-card>
        <br>
        <b-button 
            variant="primary"
            :disabled="btnDisable"
            @click="editCustomer"
        >
            Submit
        </b-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                id: null,
                customer: {
                    id: null,
                    firstName: null,
                    lastName: null,
                    email: null,
                    phone: null,
                    address: null,
                    city: null,
                }
            }
        },
        created() {
            this.id = this.$route.params['id']
            this.$store.dispatch('getCustomer')
        },
        computed: {
            editedItem() {
                return this.$store.getters.getCustomers.find(c => c.id == this.id)
            },
            btnDisable() {
                const c = this.customer
                if(c.firstName !== null && c.lastName !== null && c.email !== null && c.phone !== null && c.address !== null && c.city !== null) {
                    return false
                } else {
                    return true
                }
            }
        },
        methods: {
            editCustomer() {
                this.$store.dispatch('editCustomer', {...this.customer})
                this.$router.push('/')
            }
        },
        watch: {
            editedItem() {
                this.customer = {
                    id: this.id,
                    firstName: this.editedItem.firstName,
                    lastName: this.editedItem.lastName,
                    email: this.editedItem.email,
                    phone: this.editedItem.phone,
                    address: this.editedItem.address,
                    city: this.editedItem.city,
                }
            }
        }
    }
</script>
<style scoped>
    h1 {
        margin-bottom: 20px;
    }
</style>