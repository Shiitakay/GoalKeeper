const debug = 0;

proj_btn = document.getElementById('new-project-btn');
proj_btn.addEventListener('click', ()=>{show_hide_creation_form(true)});

cancel_btn = document.getElementById('form-cancel');
cancel_btn.addEventListener('click', ()=>{show_hide_creation_form(false)});

cancel_btn = document.getElementById('form-create');
cancel_btn.addEventListener('click', create_project);

function show_hide_creation_form(is_vis) {
  creation_form = document.getElementById('form-container');
  new_val = "";
  if (is_vis) {new_val = "visible"}
  else {new_val = "hidden"}
  creation_form.style.visibility = new_val;
}

function create_project() {
  name_val = document.getElementById('form-proj-name').value;
  new_proj = create_project_div(name_val);
  proj_container = document.getElementById('project-list');
  proj_container.appendChild(new_proj); 
}

//Creates, populates and returns a new div element
//with class project-details
function create_project_div(name_val) {
  new_project_div = document.createElement('div');
  new_project_div.setAttribute("class", "project-details");

  proj_h1 = document.createElement('h1');
  if (name_val === "") {proj_h1.innerText = "New project";}
  else {proj_h1.innerText = name_val;}
  
  new_project_div.appendChild(proj_h1);

  proj_p = document.createElement('p');
  proj_p.innerText = "Test paragraph";
  new_project_div.appendChild(proj_p);
  if (debug) {
    console.log(new_project_div);
  }
  return new_project_div;
}