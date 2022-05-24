import Vue from "vue";
const Store = function(options = {}) {
  console.log("new Store this", this);
  console.log(typeof this);
  const { mutations = {}, state = {} } = options;
  this._vm = new Vue({
    data: {
      $$state: state,
    },
  });
  this._mutations = mutations;
};

Store.prototype.commit = function(type, payload) {
  console.log("Store prototype this", this);
  console.log("Store.prototype", Store.prototype);
  if (this._mutations[type]) {
    this._mutations[type](this.state, payload);
  }
};

Object.defineProperties(Store.prototype, "state", {
  get: function() {
    return this._vm._data.$$state;
  },
});

export default { Store };
