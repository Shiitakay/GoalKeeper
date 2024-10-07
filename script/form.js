// Given a form, sets its visibility to the given val
// It sets the visibility of the forms container
function show_hide_form(node, is_vis) {
  node.parentNode.style.visibility = is_vis ? "visible" : "hidden";
}