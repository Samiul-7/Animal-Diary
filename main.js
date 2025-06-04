const name=document.getElementById("txt");
const url=document.getElementById("txt1");
const display=document.getElementById("display");
const search=document.getElementById("search");






function addAnimal(){
    let animal=name.value.trim();
    let animal_url=url.value.trim();

    if(animal===""||animal_url=== ""){
        alert("Please enter both name and URL.");
        return;
    }

    const allRows=display.querySelectorAll("tr");
    for(const tr of allRows){
        const td1=tr.children[0];
        if (td1.textContent===animal){
            alert("Already Exists");
            return; 
        }
    }

    let tr=document.createElement("tr");
    let td1=document.createElement("td");
    td1.textContent=animal;

    let td2=document.createElement("td");
    let img=document.createElement("img");
    img.src=animal_url;
    img.alt=animal;
    td2.appendChild(img);

    let td3=document.createElement("td");
    let div=document.createElement("div");
    div.style.display="flex";
    div.style.gap="10px";
    div.style.justifyContent="center";
    div.style.alignItems="center";

    let deleteButton=document.createElement("button");
    deleteButton.textContent="Delete";
    deleteButton.style.padding="5px 10px";
    deleteButton.style.backgroundColor="red";
    deleteButton.style.color="white";
    deleteButton.style.border="none";
    deleteButton.style.borderRadius="5px";
    deleteButton.style.cursor="pointer";
    deleteButton.onclick=function(){
        tr.remove();
        saveData();
    };

    let updateButton=document.createElement("button");
    updateButton.textContent="Update";
    updateButton.style.padding="5px 10px";
    updateButton.style.backgroundColor="red";
    updateButton.style.color="white";
    updateButton.style.border="none";
    updateButton.style.borderRadius="5px";
    updateButton.style.cursor="pointer";
    updateButton.onclick=function(){
        const newName=prompt("Enter new animal name:",td1.textContent);
        const newUrl=prompt("Enter new image URL:",img.src);
        if(newName&&newUrl){
            td1.textContent=newName;
            img.src=newUrl;
            img.alt=newName;
            saveData();
        }
    };

    div.appendChild(deleteButton);
    div.appendChild(updateButton);
    td3.appendChild(div);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    display.appendChild(tr);

    name.value="";
    url.value="";
    saveData();
}





function searchAnimal(){
    display.innerHTML=localStorage.getItem("data");
    showTask();
    let term=search.value.trim();
    let found=false;

    const allRows=display.querySelectorAll("tr");
    for (const tr of allRows) {
        const td1=tr.children[0];
        const td2 =tr.children[1];
        const img=td2.querySelector("img");
        if (td1.textContent===term) {
            found=true;
            document.getElementById("popup-name").textContent = td1.textContent;
            document.getElementById("popup-img").src = img.src;
            document.getElementById("popup").style.display = "block";
            search.value="";
            return; 
        }
    }
    if(!found){
        document.getElementById("popup-name").textContent ="You haven't seen this animal yet";
        document.getElementById("popup-img").src ="";
        document.getElementById("popup").style.display = "block";
        search.value="";
    }
}






function closePopup() {
    document.getElementById("popup").style.display = "none";
}






function saveData(){
    localStorage.setItem("data",display.innerHTML);
}






function showTask(){
    display.innerHTML=localStorage.getItem("data");

    const allRows=display.querySelectorAll("tr");
    allRows.forEach((tr)=>{
        const td1=tr.children[0];
        const td2=tr.children[1];
        const img=td2.querySelector("img");

        const buttons=tr.querySelectorAll("button");
        const deleteBtn=buttons[0];
        const updateBtn=buttons[1];

        if(deleteBtn){
            deleteBtn.onclick=function(){
                tr.remove();
                saveData();
            };
        }

        if(updateBtn){
            updateBtn.onclick=function(){
                const newName=prompt("Enter new animal name:", td1.textContent);
                const newUrl=prompt("Enter new image URL:", img.src);
                if (newName&&newUrl){
                    td1.textContent=newName;
                    img.src=newUrl;
                    img.alt=newName;
                    saveData();
                }
            };
        }
    });
}
showTask();

