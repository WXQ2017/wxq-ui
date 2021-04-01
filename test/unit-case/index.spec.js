import chai from "chai"
const expect = chai.expect;
import Vue from "vue";
import message from "../../packages/base/message/message";

describe("message.vue", function() {
  it("work for app", function() {
    const Constructor = Vue.extend(message);
    const vm = new Constructor().$mount();
    console.log(vm.$el);
    expect(vm.$el.querySelector(".achor").text()).to.be.toEqual("111");
  });
});
