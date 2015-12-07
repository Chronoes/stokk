const fuckAlt = (target) => {
  const oldDidMount = target.prototype.componentDidMount ?
    target.prototype.componentDidMount :
    () => null;
  target.prototype.componentDidMount = function componentDidMount() {
    oldDidMount();
    console.log('fuck alt, use redux');
  };
};

export default fuckAlt;
