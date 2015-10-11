class Router {
  static router = null;

  static get() {
    return Router.router;
  }

  static set(router) {
    Router.router = router;
  }

  static transitionTo(path) {
    Router.router.props.history.pushState(null, path);
  }
}

export default Router;
