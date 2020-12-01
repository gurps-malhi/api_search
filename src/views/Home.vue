<template>
   <div class="container-fluid">
      <div class="row">
        <div class="col-12">
            <filter-form v-if="profiles !== null" :profiles="profiles"></filter-form>
        </div>
      </div>
    </div>
</template>

<script>
import filterForm from '../components/filterForm.vue';
import profileService from '../services/profileService.js';
export default {
  components: { 
    filterForm,
   },
name: 'App',
  data() {
    return {
      profiles:[],
    };
  },
  methods:{
   
 
  
  },
  created() {  
    profileService.getProfiles()
      .then( response => {
        this.profiles = response.data.results;
      })
      .catch(error => {
        console.log('error' + error.response);
      })
  },
  watch: {
 
  }
};

</script>

<style>

</style>