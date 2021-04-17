<template>
  <div class="tags">
    <div>
      <i class="fa fa-heart-o fa-5x animated swing"
         @click="colour"
         v-if="show">
      </i>
      <i class="fa fa-heart fa-5x animated swing"
         :class="fontclass"
         v-if="!show"
         @click="colour">
      </i>
    </div>

    <div>
      <i class="fa fa-thumbs-o-up fa-5x"
         v-if="show2"
         @click="colour2">
      </i>
      <i class="fa fa-thumbs-up fa-5x"
         :class="fontclass2"
         v-if="!show2"
         @click="colour2">
      </i>
    </div>
  </div>
</template>
<script>

export default {
  name: 'tags',
  props: [''],
  data () {
    return {
      show: true,
      show2: true,
      fontclass: "",
      fontclass2: ""
    };
  },

  methods: {
    colour () {
      if (this.show) {
        this.show = false;
        this.fontclass = "hover";
      } else if (!this.show) {
        this.show = true;
        this.fontclass = "";
      }
    },
    colour2 () {
      if (this.show2) {
        this.show2 = false;
        this.fontclass2 = "hover2";
      } else if (!this.show2) {
        this.show2 = true;
        this.fontclass2 = "";
      }
    }
  },

}
</script>

<style  scoped>
.hover {
  color: #ee3f4d;
}
.hover2 {
  color: rgb(240, 65, 94);
}
</style>
