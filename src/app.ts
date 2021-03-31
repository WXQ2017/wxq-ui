import Vue from "vue";
import Component from "vue-class-component";
// import message from "../packages/message";
import Comp from "../packages/index";

Vue.use(Comp);

@Component({
  components: {
    // message,
  },
})
export default class App extends Vue {
  /* 生命钩子 START */
  mounted() {
    //
  }
}
