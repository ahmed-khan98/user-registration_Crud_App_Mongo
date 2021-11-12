function post() {
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let pass = document.getElementById("pass").value

    axios.post('https://first-node-sever.herokuapp.com/users', {
      name: name,
      email: email,
      pass: pass
    })
      .then(function (response) {
        document.getElementById("alert1").innerHTML = `<div class="alert alert-success" role="alert">
        user created succesfully</div>`
        get()

      })
      .catch(function (error) {
        document.getElementById("alert1").innerHTML = `<div class="alert alert-danger" role="alert">
        400 (Bad Request) </div>`
      });
      setTimeout(()=>{
        document.getElementById("alert1").innerHTML = '';
      },3000)

      document.getElementById("name").value= "";
      document.getElementById("email").value = "";
      document.getElementById("pass").value = "";
  }


  function get() {
    axios.get('https://first-node-sever.herokuapp.com/users')
      .then(function (response) {
        document.getElementById('table-b').innerHTML = response.data.map(e => `
        <tr>
        <td scope="col">${e._id}</td>
        <td scope="col">${e.name}</td>
        <td scope="col">${e.email}</td>
        <td scope="col">${e.pass}</td>
        <td>
              <button onclick="update()" type="button" class="btn btn-success"><i class="fa fa-edit"></i></button>
            <button onclick="dlt()" type="button" class="btn btn-danger"><i class="fa fa-trash""></i></button>
            </td>
  </tr>`).join(" ")
    })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  function dlt() {
    let id = document.getElementById("id").value
    axios.delete(`https://first-node-sever.herokuapp.com/users/${id}`)
      .then(function (res) {
       get()
       alert("user deleted");
      })
      
      .catch(function (error) {

        alert(error);
      })
      document.getElementById("id").value=" ";
  }

  function update() {
    let id = document.getElementById("id").value
    let name = document.getElementById("name").value
    let email = document.getElementById("email").value
    let address = document.getElementById("pass").value
    console.log(name)

    axios.put(`https://first-node-sever.herokuapp.com/users/${id}`, {
        name: name,
        email: email,
        pass: address
    })
    .then(function(response){
             alert("User Updated Successfully")
              get()
        })
       .catch(function(error){
            alert("An Error Occurred.")
        });
        document.getElementById("id").value="";
        document.getElementById("name").value="";
        document.getElementById("email").value="";
        document.getElementById("pass").value="";
}
  get()