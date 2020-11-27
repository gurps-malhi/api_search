<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
        <!-- <div class="col-12 col-md-4">
          <h2>Refine</h2>
            <form @:submit.prevent>
            <div class="form-group">
              <label for="Name"><strong>Name:</strong></label>
              <input class="form-control" name="Name" type="text" v-model="search_name" @blur="new_results">
            </div>
            <div class="form-group">
              <label for="age"><strong>Age:</strong></label>
              <select class="form-control" name="gender" id="age" v-model="search_age" @change="new_results">
                  <option :value="-1">All age groups</option>
                  <option v-for="(age_range, index) in age_groups" :value="age_range" :key="index">{{age_range}}</option>
                </select>
            </div>

            <label for="gender" class="d-block"><strong>Gender:</strong></label>
            <input type="radio" id="male" name="gender" value="male" v-model="search_gen" @change="new_results">
            <label for="male">Male</label><br>
            <input type="radio" id="female" name="gender" value="female" v-model="search_gen" @change="new_results">
            <label for="female">Female</label><br>
            <input type="radio" id="all-gen" name="gender" value="all-gen" v-model="search_gen" @change="new_results">
            <label for="all-gen">All genders</label><br>
          </form>
            <button @click="reset" class="btn btn-primary">Reset</button>
        </div> -->
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
       console.log("checked");
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