

function return_to_mainpage() {
  location.replace("mainpage.html");
}

next_goal_id = 0;
const params = new URLSearchParams(window.location.search);
const project_id = params.get("project-id");
goals_list = JSON.parse(localStorage.getItem(project_id));
/* local storage should look like this
  project-id : [
    {
      goal_id:
      goal_name:
      goal_details:
      is_completed:
    }, ...
  ]
*/

document.addEventListener('DOMContentLoaded', init);

function init() {
  init_buttons();
  console.log(goals_list);
  if (goals_list === null) {
    goals_list = [];
  } else {
    goals_list.map((x)=>{create_init_goal(x)});
  }
}

function init_buttons(){
  back_btn = document.getElementById("return-btn");
  back_btn.addEventListener("click", return_to_mainpage);
  create_form = document.getElementById("creation-form");
  new_btn = document.getElementById("create-btn");
  new_btn.addEventListener('click', ()=>show_hide_form(create_form, true));
  cancel_btn = document.getElementById("form-cancel");
  cancel_btn.addEventListener('click', ()=>show_hide_form(create_form, false));
  create_btn = document.getElementById("form-create");
  create_btn.addEventListener('click', create_goal);
  edit_form = document.getElementById("edit-form");
  edit_cancel_btn = document.getElementById("edit-form-cancel");
  edit_cancel_btn.addEventListener("click", ()=>show_hide_form(edit_form, false));
}

function create_init_goal(goal_dict) {
  new_goal_dict = create_goal_div(goal_dict["goal_name"], goal_dict["goal_details"], goal_dict["goal_id"]);
  document.getElementById("uncompleted-list").appendChild(new_goal_dict["div"]);
  if (goal_dict["is_completed"]) {
    complete_goal(new_goal_dict["div"].querySelector(".complete-btn"), false);
  }
}

function create_goal() {
  goal_name = document.getElementById("form-goal-name").value;
  if (goal_name === "") {goal_name = "placeholder"}
  goal_details = document.getElementById("form-goal-details").value;
  if (goal_details === "") {goal_details = "placeholder"};
  new_goal_dict = create_goal_div(goal_name, goal_details);
  document.getElementById("uncompleted-list").appendChild(new_goal_dict["div"]);
  goals_list.push({
    "goal_id": new_goal_dict["id"], 
    "goal_name": goal_name, 
    "goal_details": goal_details, 
    "is_completed": false});
  localStorage.setItem(project_id, JSON.stringify(goals_list));
}

function create_goal_div(goal_name, goal_details, id = -1) {
  new_goal_div = document.createElement("div");
  new_goal_div.setAttribute("class", "goal-block");
  if (id === -1) { //if id wasnt supplied, generate one
    id = next_goal_id;
    next_goal_id += 1;
  } else if (id >= next_goal_id) {
    next_goal_id = id+1;
  }
  new_goal_div.setAttribute("id", id);

  new_goal_com = document.createElement("div");
  new_goal_com.setAttribute("class", "base-btn complete-btn");
  new_goal_com.appendChild(make_tick());
  new_goal_com.addEventListener("click", com_btn_closure(new_goal_com));
  new_goal_div.appendChild(new_goal_com);

  new_goal_uncom = document.createElement("div");
  new_goal_uncom.setAttribute("class", "base-btn uncomplete-btn");
  new_goal_uncom.style.display = "none";
  new_goal_uncom.appendChild(make_tick());
  new_goal_uncom.addEventListener("click", uncom_btn_closure(new_goal_uncom));
  new_goal_div.appendChild(new_goal_uncom);

  new_goal_edit = document.createElement("div");
  new_goal_edit.setAttribute("class", "base-btn");
  new_goal_edit.appendChild(make_edit());
  new_goal_edit.addEventListener("click", edit_btn_closure(new_goal_edit));
  new_goal_div.appendChild(new_goal_edit);

  new_goal_del = document.createElement("div");
  new_goal_del.setAttribute("class", "base-btn delete-btn");
  new_goal_del.appendChild(make_cross());
  new_goal_del.addEventListener('click', del_btn_closure(new_goal_del));
  new_goal_div.appendChild(new_goal_del);

  new_goal_h1 = document.createElement('h1');
  new_goal_h1.setAttribute("class", "goal-text-field");
  if (goal_name === "") {new_goal_h1.innerText = "New project";}
  else {new_goal_h1.innerText = goal_name;}
  new_goal_div.appendChild(new_goal_h1);

  new_goal_p = document.createElement('p');
  new_goal_p.setAttribute("class", "goal-text-field");
  if (goal_details === "") {new_goal_p.innerText = "Placeholder description";}
  else {new_goal_p.innerText = goal_details;}
  new_goal_div.appendChild(new_goal_p);

  return {
    "id": id,
    "goal_name": goal_name,
    "goal_details": goal_details,
    "div": new_goal_div};
}

function del_btn_closure(to_del) {
  to_del;
  return ()=>delete_goal(to_del);
}

// Removes the given delete button's parent node
function delete_goal(to_del) {
  goal_id = to_del.parentNode.id;
  del_index = goals_list.findIndex((x) => x["goal_id"] == goal_id);
  goals_list.splice(del_index, 1);
  to_del.parentNode.remove();
  localStorage.setItem(project_id, JSON.stringify(goals_list));
}

function com_btn_closure(to_com) {
  to_com;
  return ()=>complete_goal(to_com);
}

// Marks a goal as completed, moving it between lists
// also changes visibility of complete and uncomplete buttons
function complete_goal(to_com) {
  swap_lists(to_com, false);
  to_com.parentNode.querySelector(".uncomplete-btn").style.display = "block";
  to_com.style.display = "none";
}

function uncom_btn_closure(to_uncom) {
  return ()=>uncomplete_goal(to_uncom);
}

// Marks a goal and uncomplete, moving it between lists
// also changes visibilty of complete and uncomplete buttons
function uncomplete_goal(to_uncom) {
  swap_lists(to_uncom, true);
  to_uncom.parentNode.querySelector(".complete-btn").style.display = "block";
  to_uncom.style.display = "none";
}

// Given a generic complete/uncomplete button and the nodes state,
// swaps it from/to the completed list from/to the uncompleted list
function swap_lists(to_swap, completed) {
  completed_list = document.getElementById("completed-list");
  uncompleted_list = document.getElementById("uncompleted-list");
  goal_div = to_swap.parentNode;
  remove_from = "";
  add_to = "";
  if (completed) {
    remove_from = completed_list;
    add_to = uncompleted_list;
  } else {
    remove_from = uncompleted_list;
    add_to = completed_list;
  }
  remove_from.removeChild(goal_div);
  add_to.appendChild(goal_div);
  swap_goal_id = to_swap.parentNode.id;
  replace_index = goals_list.findIndex((x) => x["goal_id"] == swap_goal_id);
  goals_list[replace_index]["is_completed"] = !completed;
  localStorage.setItem(project_id, JSON.stringify(goals_list));
}

function swap_goal_dict(goal) {
  goal_name = goal.querySelector("h1").innerText;
  goal_details = goal.querySelector("p").innerText;
  is_completed = !(goal.querySelector(".complete-btn").style.display === "none");
  return {"goal_name": goal_name, "goal_details": goal_details, "is_completed": is_completed};
}

function edit_btn_closure(edit_btn) {
  return ()=>edit_goal(edit_btn.parentNode);
}

function edit_goal(to_edit) {
  edit_form = document.getElementById("edit-form");
  show_hide_form(edit_form, true);
  form_edit_btn = document.getElementById("edit-form-create");
  form_edit_btn.addEventListener("click", ()=>change_goal(to_edit));
}

function change_goal(to_edit) {
  
  new_name_field = document.getElementById("edit-form-goal-name");
  
  new_name = new_name_field.value;
  old_name_f = to_edit.querySelector("h1");
  if (new_name === "") {new_name = old_name_f.innerText};
  new_det_field = document.getElementById("edit-form-goal-details");
  new_det = new_det_field.value;
  old_det_f = to_edit.querySelector("p");
  if (new_det === "") {new_det = old_det_f.innerText};

  old_name_f.innerText = new_name;
  old_det_f.innerText = new_det;

  edit_index = goals_list.findIndex((x)=> x["goal_id"] == to_edit.id);
  goals_list[edit_index]['goal_name'] = new_name;
  goals_list[edit_index]['goal_details'] = new_det;
  localStorage.setItem(project_id, JSON.stringify(goals_list));

  edit_form = document.getElementById("edit-form");
  show_hide_form(edit_form, false);
}