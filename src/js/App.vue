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
    load_profiles(url){
        return new Promise((resolve,reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url);
            xhr.onload = () => {
              if(xhr.status === 200){
                let data = JSON.parse(xhr.responseText);
                resolve(data);
              }else{
                reject(Error(xhr.statusText));
              }
            }
            xhr.onerror = () => {
            reject(Error("network error"))
          };
          xhr.send();
        });
    },   
  },
  created:function(){
     this.load_profiles("https://randomuser.me/api/?results=50")
     .then((value)=> {
       this.profiles = value.results;
     })
     .catch ((err) => {
       console.log(err);
     })  
  },
  watch: {
 
  }
};


</script>