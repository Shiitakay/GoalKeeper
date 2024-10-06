function show_hide_creation_form(is_vis) {
  creation_form = document.getElementById('form-container');
  console.log(creation_form);
  new_val = "";
  if (is_vis) {new_val = "visible"}
  else {new_val = "hidden"}
  creation_form.style.visibility = new_val;
}