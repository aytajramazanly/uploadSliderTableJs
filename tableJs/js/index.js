let firstName=document.querySelector("#name")
let surname=document.querySelector("#surname")
let salary=document.querySelector("#salary")
let addBtn=document.querySelector(".add")
let uploadIcon=document.querySelector(".upload .icon i")
let table=document.querySelector(".table")
let filter=document.querySelector(".filter i")
let search=document.querySelector("#search")
let popup=document.querySelector("#popup")
let largeImg=document.querySelector("#popup .inner .img-box img")
let closeBtn=document.querySelector(".close-icon")
let nextBtn=document.querySelector(".next")
let prevBtn=document.querySelector(".previous")
let removeBtn=document.querySelector("#remove i")
uploadIcon.addEventListener("click", function (e) {
    this.nextElementSibling.click()
})
closeBtn.addEventListener("click",()=>{
    popup.style.display="none"
})

uploadIcon.nextElementSibling.addEventListener("change",function (e) {
    const {files}=e.target
    for (const file of files) {
        let fileReader=new FileReader()
        fileReader.onloadend=function (e) {
            const {result}=e.target
           if (checkInputs(firstName.value,surname.value,salary.value)) {
            addTable(firstName.value,surname.value,salary.value,result,file.name)
            table.querySelectorAll("#checkbox").forEach(item=>{
               item.addEventListener("click",()=>{
                   item.parentElement.parentElement.classList.add("remove")
                removeBtn.addEventListener("click",()=>{
                    remove()
                })
               })
             })
            document.querySelector("form").reset()
            edit()
            document.querySelectorAll(".image").forEach((item)=>{
                item.addEventListener("click", ()=>{
                    largeImg.setAttribute("src",item.getAttribute("src"))
                    popup.style.display="flex"
                })
            })
        }
           }
        fileReader.readAsDataURL(file)
    }
   
})


search.addEventListener("keyup", function(){
    let filter, tr, td, i, txtValue;
        filter = this.value.toUpperCase();
        tr = table.getElementsByClassName("child");
        for (i = 0; i < tr.length; i++) {
          td = tr[i].getElementsByTagName("td")[1];
          if (td) {
            txtValue = td.textContent ;
            console.log(txtValue);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
        }
    }
})


filter.addEventListener("click", function(){
    let min=document.querySelector(".min").value
    let max=document.querySelector(".max").value
    let lines = table.getElementsByClassName("child");
        for (i = 0; i < lines.length; i++) {
          let salary = lines[i].getElementsByTagName("td")[3];
          if (salary) {
            let salaryValue = +salary.textContent;
           if (salaryValue>min && salaryValue<max) {
               continue
           }
           else{
            lines[i].style.display="none"
           }
        }
    }    
})

function addTable(name,surname,salary,result,alt) {
    table.lastElementChild.innerHTML+=`<tbody>
    <tr class="child">
         <td><input type="checkbox" name="" id="checkbox"></td>
        <td><span class="change name">${name}</span></td>
        <td><span class="change">${surname}</span></td>
        <td><span class="change">${salary}</span></td>
        <td style="width: 28px;" class="p-0"><img src="${result}" alt="${alt}" class="image"></td>
    </tr>
    </tbody>`
}

function remove() {
    document.querySelectorAll(".remove").forEach(item=>item.remove())
}

function checkInputs(name,surname,salary) {
    if (name.split("").some(item=>item!==" ") || surname.split("").some(item=>item!==" ") || salary.split("").some(item=>item!==" ")) {
        return true
    }
    else{
        return false
    }
}

function createChangeInput(span,width) {
    let input=document.createElement("input")
    input.classList.add("edit")
    input.style.maxWidth=width+20+"px"
    input.value=span.innerText
    return input
}

function edit() {
    document.querySelectorAll(".change").forEach((item)=>{
        item.addEventListener("click", ()=>{
            let width=item.offsetWidth
            item.style.display="none"
            item.parentElement.appendChild(createChangeInput(item,width))
            document.querySelector(".edit").addEventListener("blur", function(){
                item.innerText=this.value
                this.remove()
                item.style.display="block"
            })
        })
    })
}