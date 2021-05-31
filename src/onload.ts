import { query } from '@github/query-selector';
import { listen, stateFunctions } from './state-fns';

window.onload = () => {
  initRouter();
  stateFunctions.set('toolbarHeight', (headerVh: string) => {});
  listen();
};

let initRouter = () => {
  // get root div for rendering
  let root = document.getElementById('app');

  //router instance

  let router = function (name, routes) {
    return {
      name,
      routes,
    };
  };

  //create the route instance
  let instance = router('routerInstance', [
    {
      path: '/home',
      name: 'Home',
    },
    {
      path: '/portfolio',
      name: 'Portfolio',
    },
    {
      path: '/resume',
      name: 'Resume',
    },
    {
      path: '/interests',
      name: 'Interests',
    },
  ]);

  let currentPath = window.location.pathname;
  let definedRoutes = Array.from(document.querySelectorAll('[hicks-route]'));
  let listenForClicks = (trigger) => {
    trigger.addEventListener('click', navigate);
  };
  let navigate = () => {
    if (currentPath === '/') {
      root.innerHTML = 'You are on Home page';
    } else {
      // check if route exist in the router instance
      let route = instance.routes.filter((r) =>
        r.path.includes(currentPath)
      )[0];
      if (route) {
        root.innerHTML = `You are on the ${route.name} path`;
      } else {
        root.innerHTML = `This route is not defined`;
      }
    }
  };
  definedRoutes.forEach(listenForClicks);
};
