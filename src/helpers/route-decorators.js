// determinates if menu should be closed based on device resolution
export default function hideMenu(target) {
  target.willTransitionTo = () => {
    if (document.body.clientWidth < 650) {
      const element = document.getElementById('react');
      element.className = '';
    }
  };
}
