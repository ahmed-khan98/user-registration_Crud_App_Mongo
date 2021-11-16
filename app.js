function post() {
  let name = document.getElementById("name").value
  let email = document.getElementById("email").value
  let add = document.getElementById("add").value

  axios.post('https://server-with-mongo.herokuapp.com/user', {
    name: name,
    email: email,
    address: add
  })
    .then(function (response) {
      document.getElementById("alert1").innerHTML = `<div class="alert alert-success" role="alert">
        user created succesfully</div>`
      get()

    })
    .catch(function (error) {
      document.getElementById("alert1").innerHTML = `<div class="alert alert-danger" role="alert">
        please fulfill all field </div>`
    });
  setTimeout(() => {
    document.getElementById("alert1").innerHTML = '';
  }, 3000)

  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("add").value = "";
}


function get() {
  axios.get('https://server-with-mongo.herokuapp.com/users')
    .then(function (response) {
      document.getElementById('table-b').innerHTML = response.data.map((e, i) => `
        <tr>
        <td scope="col">${e._id}</td>
        <td scope="col">${e.name}</td>
        <td scope="col">${e.email}</td>
        <td scope="col">${e.address}</td>
        <td>
              <button onclick="edit('${e._id}',${i},'${e.name}','${e.email}','${e.address}')" type="button" class="btn btn-success"><i class="fa fa-edit"></i></button>
            <button onclick="dlt('${e._id}')" type="button" class="btn btn-danger"><i class="fa fa-trash""></i></button>
            </td>
  </tr>`).join(" ")
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
}

function dlt(_id) {
  axios.delete(`https://server-with-mongo.herokuapp.com/user/${_id}`)
    .then(function (res) {
      get()
      alert("user deleted");
    })

    .catch(function (error) {

      alert(error);
    })
}
function edit(_id, i, name, email, add) {
  document.getElementById('table-b').innerHTML = `
 <tr>
 <td scope="col">${_id}</td>
 <td scope="col"><input type="text" class="form-control" id="name1" value="${name}"></td>
 <td scope="col"><input type="text" class="form-control" id="email1" value="${email}"></td>
 <td scope="col"><input type="text" class="form-control" id="add1" value="${add}"></td>
 <td><button onclick="update('${_id}')" type="button" class="btn btn-warning">update</button>
 <button onclick="get()" type="button" class="btn btn-danger">cancel</button></td>
 </tr>

 `
}
function update(_id) {
  let name = document.getElementById("name1").value
  let email = document.getElementById("email1").value
  let address = document.getElementById("add1").value
  axios.put(`https://server-with-mongo.herokuapp.com/user/${_id}`, { name, email, address })
    .then(function (response) {
      document.getElementById("alert1").innerHTML = `<div class="alert alert-success" role="alert">
      user updated</div>`

      setTimeout(() =>
       {
        document.getElementById("alert1").innerHTML = '';
       }, 3000)
      get()
    })
    .catch(function (error) {
      alert("An Error Occurred.")
    });
}

get()