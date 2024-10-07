const debug = 1;

proj_btn = document.getElementById('new-project-btn');
proj_btn.addEventListener('click', ()=>{show_hide_creation_form(true)});

cancel_btn = document.getElementById('form-cancel');
cancel_btn.addEventListener('click', ()=>{show_hide_creation_form(false)});

cancel_btn = document.getElementById('form-create');
cancel_btn.addEventListener('click', create_project);

delete_btns = Array.from(document.getElementsByClassName('delete-btn'));
delete_btns.map((x)=>x.addEventListener('click', ()=>{delete_proj(x)}));

project_list = [];
next_project_id = 0; //this is next avaliable name, not the actual count
try {
  project_list = JSON.parse(localStorage.getItem("projects"));
  next_project_id = JSON.parse(localStorage.getItem("next_project_id"));
  if (project_list === null) {
    project_list = [];
  }
  if (next_project_id === null) {
    next_project_id = 0;
  }
} catch (e) {}
document.addEventListener('DOMContentLoaded', init_project_list);

// Creates project detail panels from the list in localstorage
function init_project_list() {
  if (project_list.length === 0) {return;}
  project_container = document.getElementById('project-list');
  project_list.map((x)=>project_container.appendChild(create_project_div(x)));
}

// Creates a new project 
// directly gets the value in name field
function create_project() {
  name_val = document.getElementById('form-proj-name').value;
  if (name_val === "") {name_val = "Project " + next_project_id}
  new_proj = create_project_div(name_val);
  project_list.push(name_val);
  proj_container = document.getElementById('project-list');
  proj_container.appendChild(new_proj);
  console.log(JSON.stringify(project_list));
  localStorage.setItem("projects", JSON.stringify(project_list));
  next_project_id += 1;
  localStorage.setItem("next_project_id", JSON.stringify(next_project_id));
}

// Creates, populates and returns a new div element
// with class project-details
function create_project_div(name_val) {
  new_project_div = document.createElement('div');
  new_project_div.setAttribute("class", "project-details");

  proj_det = document.createElement('div');
  proj_det.setAttribute("class", "details-btn");
  proj_det.appendChild(make_arrow());
  new_project_div.appendChild(proj_det);
  proj_det.addEventListener('click', details_btn_closure(proj_det));

  proj_del = document.createElement('div');
  proj_del.setAttribute("class", "delete-btn");
  proj_del.appendChild(make_cross());
  new_project_div.appendChild(proj_del);
  proj_del.addEventListener('click', del_btn_closure(proj_del));

  proj_h1 = document.createElement('h1');
  if (name_val === "") {proj_h1.innerText = "New project";}
  else {proj_h1.innerText = name_val;}
  
  new_project_div.appendChild(proj_h1);

  proj_p = document.createElement('p');
  proj_p.innerText = "Test paragraph";
  new_project_div.appendChild(proj_p);
  if (debug) {
    console.log(new_project_div);
    console.log(delete_btns);
  }
  new_project_div.remove();
  return new_project_div;
}


// Creates a closure for details buttons
// used for addEvenListener on details buttons
function details_btn_closure(to_redir) {
  to_redir;
  return ()=>{redir_to_proj(to_redir)};
}

function redir_to_proj(to_redir) {
  proj_name = to_redir.parentNode.querySelector('h1');
  url = "./project-view.html";
  url += "?project-name=" + proj_name.innerText;
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
function delete_proj(del_button) {
  proj_name = del_button.parentNode.querySelector('h1');
  del_proj_index= project_list.indexOf(proj_name.innerText);
  project_list.splice(del_proj_index, 1);
  del_button.parentNode.remove();
  localStorage.setItem("projects", JSON.stringify(project_list));
}