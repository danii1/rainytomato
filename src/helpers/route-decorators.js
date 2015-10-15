import GoogleAnalytics from '../api/google-analytics';

// post transition actions
function routeTransitionActions(target) {
  target.willTransitionTo = (transition) => {
    if (document.body.clientWidth < 650) {
      const element = document.getElementById('react');
      element.className = '';
    }
    GoogleAnalytics.trackPageView(transition.path);
  };
}

export default routeTransitionActions;
