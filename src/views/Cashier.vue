<template>
    <div>
        <h1>Hello</h1>
        <!-- <form>
            <p>
            <label for="name">Name</label>
            <input type="text" id="name" v-model="name">
            </p>
            <p>
            <label for="comments">Comments</label>
            <textarea id="comments" v-model="comments"></textarea>
            </p>
            
            <p>
            <input type="submit" @click="removeHandler">
            </p>
        </form> -->
    </div> 
</template>

<script>
export default {
    data() {
        return {
            selectedItem: 1,
            // name:'',
            // comments:'',
            // handler: null
        };
    },
    created() {

    },
    // mounted: function () {
    //     if (this.$store.state.is_login == false) {
    //         this.$router.push({ name: "Home" }).catch((error) => {
    //             if (error.name !== "NavigationDuplicated" && !error.message.includes("Avoided redundant navigation to current location")) {
    //                 console.log(error);
    //             }
    //         });
    //     } else {
    //     }
    // },
    methods: {
    },
    
}
</script>

<style>

</style>