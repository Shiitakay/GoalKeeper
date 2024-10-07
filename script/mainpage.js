proj_btn = document.getElementById('new-project-btn');
proj_btn.addEventListener('click', ()=>{show_hide_creation_form(true)});

cancel_btn = document.getElementById('form-cancel');
cancel_btn.addEventListener('click', ()=>{show_hide_creation_form(false)});

cancel_btn = document.getElementById('form-create');
cancel_btn.addEventListener('click', create_project);

delete_btns = Array.from(document.getElementsByClassName('delete-btn'));
delete_btns.map((x)=>x.addEventListener('click', ()=>{delete_proj(x)}));

project_list = [];
next_project_id = 0;
/* localStorage should look like this
  [
    {
      id:
      name:
    },
  ]
*/

try {
  project_list = JSON.parse(localStorage.getItem("projects"));
  if (project_list === null) {
    project_list = [];
  }
} catch (e) {}
document.addEventListener('DOMContentLoaded', init_project_list);

// Creates project detail panels from the list in localstorage
function init_project_list() {
  if (project_list.length === 0) {return;}
  project_container = document.getElementById('project-list');
  project_list.map((x)=>{
    project_container.appendChild(create_project_div(x["name"], x["id"])["div"])});
}

// Creates a new project 
// directly gets the value in name field
function create_project() {
  name_val = document.getElementById('form-proj-name').value;
  if (name_val === "") {name_val = "Project " + next_project_id}
  new_dict = create_project_div(name_val);
  new_proj = new_dict["div"];
  proj_container = document.getElementById('project-list');
  proj_container.appendChild(new_proj);

  project_list.push({"id": new_dict["id"], "name": new_dict["name"]});
  localStorage.setItem("projects", JSON.stringify(project_list));
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
  proj_det.setAttribute("class", "details-btn");
  new_project_div.appendChild(proj_det);
  proj_det.addEventListener('click', details_btn_closure(proj_det));

  proj_del = document.createElement('div');
  proj_del.setAttribute("class", "delete-btn");
  new_project_div.appendChild(proj_del);
  proj_del.addEventListener('click', del_btn_closure(proj_del));

  proj_h1 = document.createElement('h1');
  if (name_val === "") {proj_h1.innerText = "New project";}
  else {proj_h1.innerText = name_val;}
  
  new_project_div.appendChild(proj_h1);

  proj_p = document.createElement('p');
  proj_p.innerText = "Test paragraph";
  new_project_div.appendChild(proj_p);
  new_project_div.remove();
  return {
    id: id,
    name: name_val,
    div: new_project_div
  };
}


// Creates a closure for details buttons
// used for addEvenListener on details buttons
function details_btn_closure(to_redir) {
  to_redir;
  return ()=>{redir_to_proj(to_redir)};
}

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
function delete_proj(del_button) {
  proj_id = del_button.parentNode.id;
  del_proj_index = project_list.findIndex((x) => x["id"] == proj_id);
  project_list.splice(del_proj_index, 1);
  del_button.parentNode.remove();
  localStorage.removeItem(proj_id);
  localStorage.setItem("projects", JSON.stringify(project_list));
}