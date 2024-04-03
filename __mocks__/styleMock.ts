module.exports = new Proxy(
  {},
  {
    get: function (_, name) {
      return name;
    },
  },
);
