<template>
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-center">
            <router-link to="/">Home</router-link> |
            <router-link to="/Maps">Maps</router-link>
        </div>
      </div>
      <router-view/>
    </div>
</template>


<script>

export default {
  
name: 'App',
  data() {
    return {
     
    };
  },


};


</script>