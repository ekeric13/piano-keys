var React = require("react");
var Router = require('react-router');
var App = require("./components/App");
var PianoView = require("./components/PianoView/PianoView");
var NotFoundView = require("./components/NotFoundView/NotFoundView");

var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var NotFoundRoute = Router.NotFoundRoute;

// var injectTapEventPlugin = require("react-tap-event-plugin");
// injectTapEventPlugin();

var routes = (
  <Route name="app" path="/" handler={App}>
    <DefaultRoute handler={PianoView} />
    <NotFoundRoute handler={NotFoundView} />
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('main'));
});
