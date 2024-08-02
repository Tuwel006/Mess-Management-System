// connectionState.js
module.exports = {
    state: 'connected',
    getState: function() {
      return this.state;
    },
    setState: function(newState) {
      this.state = newState;
    }
  };
  