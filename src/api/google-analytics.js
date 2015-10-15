class GoogleAnalytics {
  static trackPageView(page){
    if (typeof ga !== 'undefined') {
      ga('send', 'pageview', page);
    }
  }

  static trackEvent(category, action, label) {
    if (typeof ga !== 'undefined') {
      ga('send', 'event', category, action, label);
    }
  }

}

export default GoogleAnalytics;
