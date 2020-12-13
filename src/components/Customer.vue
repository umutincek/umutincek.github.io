<template>
    <div>
        <b-alert
            :show="dismissCountDown"
            dismissible
            fade
            variant="warning"
            @dismiss-count-down="countDownChanged"
        >
            {{getMessage}} <span>Automatic close message after {{dismissCountDown}} seconds</span> 
        </b-alert>
        <h1>Customers</h1>
        <b-link @click="goAdd" class="link">Add Customer</b-link>
        <div style="clear:both;"></div>
        <hr>
        <b-form-input
            v-model="filter"
            type="search"
            placeholder="Search customer"
        ></b-form-input>
        <br>
        <b-table
            striped
            :items="getCustomers"
            :filter="filter"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            v-if="!loading"
        >
           <template #cell(View)="row">
               <b-button @click="detail(row.item)" variant="outline-dark">View</b-button>
           </template>
        </b-table>
        <b-pagination
            v-if="!loading"
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
            size="lg"
            align="center"
        ></b-pagination>
        <b-icon v-if="loading" class="icon" icon="arrow-clockwise" animation="spin-pulse" font-scale="7"></b-icon>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                filter: null,
                fields: ['firstName','lastName','email','View'],
                currentPage: 1,
                perPage: 4,
                loading: false,
                dismissSecs: 5,
                dismissCountDown: 0,
            }
        },
        created() {
            this.$store.dispatch('getCustomer')
        },
        computed: {
            getCustomers() {
                let vm = this
                vm.loading = true
                return this.$store.getters.getCustomers
            },
            getMessage() {
                return this.$store.getters.getMessage
            },
            rows() {
                return this.getCustomers.length;
            }
        },
        methods: {
            detail(item) {
                this.$router.push(`/view-customer/${item.id}`)
            },
            goAdd() {
                this.$router.push('/add')
            },
            countDownChanged(dismissCountDown) {
                this.dismissCountDown = dismissCountDown
            },
            showAlert() {
                this.dismissCountDown = this.dismissSecs
            },
        },
        watch: {
            getCustomers() {
                setTimeout(() => {
                    this.loading = false
                }, 200);
            },
            getMessage() {
                if(this.getMessage != null) {
                    this.showAlert()
                    setTimeout(() => {
                        this.$store.commit('setMessage', null)
                    }, 5000);
                }
            },
        }
    }
</script>
<style scoped>
    h1 {
        width: 90%;
        float: left;
        margin-bottom: 20px;
        font-weight: normal;
    }
    span {
        float: right;
    }
    .link {
        width: 10%;
        float: right;
        margin-top: 10px;
    }
    .icon {
        width: 100%;
    }  
</style>