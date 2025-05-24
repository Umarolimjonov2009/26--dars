const ul = document.getElementById("ul");
const btn = document.getElementById("btn");
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");
const saveBtn = document.getElementById("save");

async function getUsers() {
  const res = await fetch("https://6831b2e76205ab0d6c3d4c64.mockapi.users");
  const data = await res.json();
  chizish(data);
}

getUsers();

function chizish(malumot) {
  ul.innerHTML = "";
  malumot.map((odam) => {
    const li = document.createElement("li");
    li.innerHTML = `
         <div class="left">
                <img src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png" alt="asd">
                <div>
                    <h2>${odam.name}</h2>
                    <p>${odam.phoneNumber}/${odam.name}</p>
                </div>
             </div>
             <div class="right">
                <button id="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                <button id="delete-btn" onclick='deleteUser(${odam.id})'><i class="fa-solid fa-trash-can"></i></button>
             </div>   
    `;
    ul.appendChild(li);
  });
}


async function deleteUser(id) {
    try {
       const res = await fetch("https://6831b2e76205ab0d6c3d4c64.mockapi.io/users/"+id,
        {
        method: "DELETE",
       });
        getUsers();        

    } catch (error) {
        console.log(error);
        
    }
}

async function addUser(ism,tel) {
    try {
      const res = await fetch("https://6831b2e76205ab0d6c3d4c64.mockapi.io/users",{
        method:"POST",
        headers:{
            "Conntent-type":"application/json"
        }
      })  
    } catch (error) {
        console.log(error);
        
    }
}



btn.addEventListener("click",()=>{
  if(nameInput.value.trim().length<1 || numberInput.value.length<1){
    alert("Ma'lumotlarni kiriting!!")
  }else{
    addUser(nameInput.value,numberInput.value);
  }
});



async function editUser(odam) {
   btn.style.display="none";
   save.style.display="inline";
   console.log(odam);
   nameInput.value=odam.name;
   numberInput.value=odam.phoneNumber;
   saveBtn.addEventListener("click",async()=>{
    const res=await fetch("https://6831b2e76205ab0d6c3d4c64.mockapi.io/users"+odam.id,{
      method:"PUT",
      headers:{
        "Content-type":"application/jsony"
      },
      body: JSON.stringify({name: nameInput.value,phoneNumber:numberInput.value})
    });
    getUsers();
    nameInput.value="";
    numberInput.value="";
   })
}