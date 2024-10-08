to_edit = undefined; // Global used to edit a project
project_list = []; // Modifed whereever localstorage is set
next_project_id = 0; // Modified only in create_project_div
/* localStorage should look like this
  [
    {
      id:
      name:
    },
  ]
*/
document.addEventListener('DOMContentLoaded', init);

function init() {
  init_buttons();
  init_project_list();
}

// Sets listeners for all static buttons on the page
function init_buttons() {
  create_form = document.getElementById("creation-form")
  proj_btn = document.getElementById('new-project-btn');
  proj_btn.addEventListener('click', ()=>{show_hide_form(create_form, true)});
  cancel_btn = document.getElementById('form-cancel');
  cancel_btn.addEventListener('click', ()=>{show_hide_form(create_form, false)});
  create_btn = document.getElementById('form-create');
  create_btn.addEventListener('click', create_project);
  edit_form = document.getElementById("edit-form");
  cancel_edit_btn = document.getElementById("edit-form-cancel");
  cancel_edit_btn.addEventListener("click", ()=>show_hide_form(edit_form, false));
  edit_btn = document.getElementById("edit-form-create");
  edit_btn.addEventListener("click", edit_proj);
}

// Creates project detail panels from the list in localstorage
function init_project_list() {
  project_list = JSON.parse(localStorage.getItem("projects"));
  if (project_list === null) {
    project_list = [];
    return;
  }
  project_container = document.getElementById('project-list');
  project_list.map((x)=>{
    project_container.appendChild(init_create_project_div(x["name"], x["id"])["div"])});
}

// Creates a new project 
// directly gets the value in name field
// Called on form create button click
function create_project() {
  name_val = document.getElementById('form-proj-name').value;
  if (name_val === "") {name_val = "Project " + next_project_id}
  new_dict = create_project_div(name_val);
  new_proj = new_dict["div"];
  proj_container = document.getElementById('project-list');
  proj_container.appendChild(new_proj);

  project_list.push({"id": new_dict["id"], "name": new_dict["name"]});
  localStorage.setItem("projects", JSON.stringify(project_list));
  show_hide_form(document.getElementById("creation-form"), false);
}

// Creates a new project
// Also sets the next goal field and progress bars
// Only intended to be run when initialising the page
function init_create_project_div(name_val, id) {
  proj_dict = create_project_div(name_val, id);
  proj_div = proj_dict["div"];
  //get projects goals
  goal_list = JSON.parse(localStorage.getItem(proj_dict["id"]));
  if (goal_list === null) {return proj_dict};
  //get first uncompleted goal
  first_goal_index = goal_list.findIndex((x)=>x["is_completed"] === false);
  if (first_goal_index != -1) {
    goal_field = proj_div.querySelector("p");
    goal_field.innerText = goal_list[first_goal_index]["goal_name"];    
  }
  //set the progress meter
  comp = 100*(goal_list.filter((x)=>x["is_completed"] == true).length / goal_list.length);
  col1 = "rgb(100, 155, 255)";
  col2 = "gray";
  proj_div.style.borderImage = `linear-gradient(to right, ${col1}, ${col1} ${comp}%, ${col2} ${comp}%, ${col2}) 10 1`;
  return proj_dict;
}

// Creates, populates and returns a new div element
// with class project-details
function create_project_div(name_val, id = -1) {
  new_project_div = document.createElement('div');
  new_project_div.setAttribute("class", "project-details");
  if (id === -1) { //if id wasnt supplied, generate one
    id = next_project_id;
    next_project_id += 1;
  } else if (id >= next_project_id) {
    next_project_id = id+1;
  }
  new_project_div.setAttribute("id", id);

  proj_det = document.createElement('div');
  proj_det.setAttribute("class", "base-btn details-btn");
  proj_det.appendChild(make_arrow());
  new_project_div.appendChild(proj_det);
  proj_det.addEventListener('click', details_btn_closure(proj_det));

  proj_edit = document.createElement("div");
  proj_edit.setAttribute("class", "base-btn");
  proj_edit.appendChild(make_edit());
  new_project_div.appendChild(proj_edit);
  proj_edit.addEventListener("click", edit_btn_closure(proj_edit));

  proj_del = document.createElement('div');
  proj_del.setAttribute("class", "base-btn delete-btn");
  proj_del.appendChild(make_cross());
  new_project_div.appendChild(proj_del);
  proj_del.addEventListener('click', del_btn_closure(proj_del));

  proj_h1 = document.createElement('h1');
  proj_h1.setAttribute("class", "project-text-field")
  if (name_val === "") {proj_h1.innerText = "New project";}
  else {proj_h1.innerText = name_val;}
  
  new_project_div.appendChild(proj_h1);

  proj_p = document.createElement('p');
  proj_p.setAttribute("class", "project-text-field")
  proj_p.innerText = "No goals left!";
  new_project_div.appendChild(proj_p);
  new_project_div.remove();
  return {
    id: id,
    name: name_val,
    div: new_project_div
  };
}

// Creates a closure for details buttons
// used for addEventListener on details buttons
function details_btn_closure(to_redir) {
  to_redir;
  return ()=>{redir_to_proj(to_redir)};
}

// Called on clicking project details buttons
function redir_to_proj(to_redir) {
  proj_id = to_redir.parentNode.id;
  url = "./project-view.html";
  url += "?project-id=" + proj_id;
  location.replace(url);
}

// Creates a closure for delete buttons
// used for addEventListener on delete buttons
function del_btn_closure(to_del) {
  to_del;
  return ()=>{delete_proj(to_del)};
}

// Given a button, removes the project from the html
// and the project list in localstorage
// Called on clicking project delete buttons
function delete_proj(del_button) {
  proj_id = del_button.parentNode.id;
  del_proj_index = project_list.findIndex((x) => x["id"] == proj_id);
  project_list.splice(del_proj_index, 1);
  del_button.parentNode.remove();
  localStorage.removeItem(proj_id);
  localStorage.setItem("projects", JSON.stringify(project_list));
}

// Creates a small closure for eventListening
// basically just sets a global
function edit_btn_closure(edit_btn) {
  return ()=>{  to_edit = edit_btn.parentNode;
    show_hide_form(document.getElementById("edit-form"), true)};
}

// Alters a projects name, using global to_edit
function edit_proj() {
  old_name_field = to_edit.querySelector("h1");
  new_name = document.getElementById("edit-form-name").value;
  if (new_name === "") {new_name = old_name_field.innerText;}
  old_name_field.innerText = new_name;
  show_hide_form(document.getElementById("edit-form"), false);
  proj_index = project_list.findIndex((x) => x["id"] == to_edit.id);
  project_list[proj_index]["name"] = new_name;
  localStorage.setItem("projects", JSON.stringify(project_list));
}