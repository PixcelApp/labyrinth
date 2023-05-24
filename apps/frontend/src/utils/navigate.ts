export const navigate = (path: string) => {
  // change the url without reloading the page
  history.pushState(null, '', path)
  // allow it to be picked up by the router
  window.dispatchEvent(new PopStateEvent('popstate'))
}
