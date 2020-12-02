<template>
  <div class="row">
    <div class="col-12 col-md-4">
      <h2>Refine</h2>
      <form @:submit.prevent>
        <div class="form-group">
          <label for="Name" class="d-block"><strong>Name:</strong></label>

          <input
            class="form-control"
            name="Name"
            type="text"
            v-model="search_name"
            @blur="new_results"
          />
        </div>
        <div class="form-group">
          <label for="age"><strong>Age:</strong></label>
          <select
            class="form-control"
            name="gender"
            id="age"
            v-model="search_age"
            @change="new_results"
          >
            <option :value="-1">All age groups</option>
            <option
              v-for="(age_group, index) in age_groups"
              :value="age_group"
              :key="index"
            >
              {{ age_group }}
            </option>
          </select>
        </div>

        <label for="gender" class="d-block"><strong>Gender:</strong></label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="male"
          v-model="search_gen"
          @change="new_results"
        />
        <label for="male">Male</label><br />
        <input
          type="radio"
          id="female"
          name="gender"
          value="female"
          v-model="search_gen"
          @change="new_results"
        />
        <label for="female">Female</label><br />
        <input
          type="radio"
          id="all-gen"
          name="gender"
          value="all-gen"
          v-model="search_gen"
          @change="new_results"
        />
        <label for="all-gen">All genders</label><br />
      </form>
      <button @click="reset" class="btn btn-primary">Reset</button>
    </div>
    <div class="col-12 col-md-8" v-cloak>
      <div class="prof_number font-weight-bold mb-2">
        {{ num_results }} of {{ profiles.length }}
      </div>
      <transition-group
        name="fade"
        tag="div"
        class="row more"
        v-if="num_results > 0"
      >
        <div
          v-for="(prof, key) in filtered_prof"
          :key="key"
          class="col-12 col-md-6"
        >
          <div class="prof my-2">
            <div class="person__header">
              <img
                :src="prof.picture.large"
                :alt="prof.name.first + ' ' + prof.name.last"
                class="img-fluid w-100"
              />
            </div>
            <div class="person__name font-weight-bold mt-2">
              <h2 class="main_name">
                {{ prof.name.first }} {{ prof.name.last }}
              </h2>
            </div>
            <div class="font-weight-bold person__age font-weight-normal person">
              <span>Age:</span> {{ prof.dob.age }}
            </div>
            <div class="font-weight-bold person__gen font-weight-normal person">
              <span>Gender:</span> {{ prof.gender }}
            </div>
            <div class="font-weight-bold person__email person">
              <span>Email:</span>
              <a :href="'mailto:' + prof.email">{{ prof.email }}</a>
            </div>
            <!--remove comments to have the google maps to show per profile-->
            <div class="person__map">
              <!-- <iframe width="100%" height="170" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" :src="'https://maps.google.com/maps?q=' + prof.location.coordinates.latitude +',' + prof.location.coordinates.longitude + '&z=7&amp;output=embed'">
                </iframe> -->
            </div>
            <hr class="m-0 mt-2" />
          </div>
        </div>
      </transition-group>
      <div v-else class="text-center mt-5">
        <h1>
          Unfortunately, no results were found, please change search critera.
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
let start_no = 0;
let end_no = 0;
let first_name,
last_name,
full_name = "";
let has_name;
export default {
  props: ["profiles"],
  data() {
    return {
      age_groups: [],
      search_name: "",
      search_age: -1,
      search_gen: "all-gen",
      filtered_prof: [],
      num_results: 0,
    };
  },
  methods: {
    //dynamically generated based on max age and inc_by var
    age_range(inc_by) {
      let start_no = 0;
      let end_no = 0;
      let oldest_person = 0;
      setTimeout(() => {
        oldest_person = Math.max.apply(Math,this.profiles.map(function (people) {return people.dob.age;})
        );
        while (start_no < oldest_person) {
          end_no = start_no + inc_by;
          this.age_groups.push(start_no + 1 + "-" + end_no);
          start_no = start_no + inc_by;
        }
      }, 1000);
      return this.age_groups;
    },
    reset() {
      this.search_age = -1;
      this.search_name = " ";
      this.search_gen = "all-gen";
      this.new_results();
    },
    new_results() {
      this.filtered_prof = [];
      if (typeof this.search_age !== "number") {
        start_no = 0;
        end_no = 0;
        let str = this.search_age.split("-");
        start_no = str[0];
        end_no = str[1];
      }
      for (let i = 0; i < this.profiles.length; i++) {
        first_name = this.profiles[i].name.first.toLowerCase();
        last_name = this.profiles[i].name.last.toLowerCase();

        full_name = first_name + " " + last_name;
        has_name = full_name.includes(this.search_name);

        if (
          (has_name || this.search_name == "") &&
          (this.profiles[i].gender == this.search_gen ||
            this.search_gen == "all-gen") &&
          ((this.profiles[i].dob.age >= start_no &&
            this.profiles[i].dob.age <= end_no) ||
            this.search_age == -1)
        ) {
          this.filtered_prof.push(this.profiles[i]);
        }
      }
      this.num_results = this.filtered_prof.length;
    },
  },
  computed: {
    ageChanged() {
      return this.search_age + "pass";
    },
  },
  mounted() {
    this.age_range(10);
  },
  watch: {
    profiles: function (val) {
      this.new_results();
    },
  },
};
</script>

<style>
</style>