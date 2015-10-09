class Router {
  router = null;

  get() {
    return this.router;
  }

  set(router) {
    this.router = router;
  }

  transitionTo(path) {
    this.router.props.history.pushState(null, path);
  }
}

const routerInstance = new Router();

export default routerInstance;
