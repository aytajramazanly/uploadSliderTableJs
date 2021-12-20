let loginBtn=document.querySelector("#login button")
let loginWindow=document.querySelector("#login")
let inputName=document.querySelector("#name")
let gallerySection=document.querySelector("#gallery")
let images=document.querySelectorAll("#gallery .images a")
let popup=document.querySelector("#popup")
let largeImg=document.querySelector("#popup .big-img-box img")
let closeBtn=document.querySelector(".close-icon")


let uploadFile=document.querySelector(".upload-second i")
let sliderInterval

let error=document.createElement("span")
error.classList.add("error")
error.innerText="Please input your Name"
document.querySelector(".login").appendChild(error)

loginBtn.addEventListener("click", ()=>{
    checkInput()
})

uploadFile.addEventListener("click", function (e) {
    this.parentElement.nextElementSibling.click()
})

uploadFile.parentElement.nextElementSibling.addEventListener("change",function (e) {
    const {files}=e.target
    
    for (const file of files) {
        const fileReader=new FileReader()

        fileReader.onloadend=function (e) {
            const {result}=e.target
            createImgBox(result)
            popupWindow()
        }
        fileReader.readAsDataURL(file)
    }
   
})


function createImgBox(imgSrc) {
    let img=document.createElement("img")
    img.classList.add("img-box")
    img.setAttribute("src",imgSrc)
    document.querySelector(".images").prepend(img)
}

function popupWindow() {
    document.querySelectorAll(".img-box").forEach((image)=>{
        image.addEventListener("click", ()=>{
        changeImg(image)
        popupOpen()
        image.classList.add("active-img");
        sliderInterval=setInterval(() => {
            nextImage(document.querySelector(".active-img"))
        }, 1000);
        })
    })
}










document.addEventListener("keydown", (e)=>{
   switch (e.code) {
       case "Enter":
        checkInput()
        break;
       case "Escape":
        popupClose()
      
       default:
           break;
   }
})

closeBtn.addEventListener("click", ()=>{
    popupClose()

})
popup.addEventListener("click", (e) => {
    if (e.target.id==="popup") {
        popupClose()
    }
});



function popupOpen() {
    popup.style.display="flex"
}

function popupClose() {
   
    popup.style.display="none"
    document.querySelectorAll(".img-box").forEach(item=>item.classList.remove("active-img"))
}

function galleryOpen() {
    gallerySection.style.display="block"
    setTimeout(()=>{
        gallerySection.setAttribute("class","gallery-active")
    },300)
    
    let userName=document.createElement("h2")
    userName.classList.add("name-uppercase")
    userName.innerText=inputName.value+"!"
    document.querySelector(".gallery-title").appendChild(userName)
}

function changeImg(image) {
    largeImg.setAttribute("src", image.getAttribute("src"))
}

function checkInput() {
    if (inputName.value.split("").some(item=>item!==" ")) {
        loginWindow.style.transform="translateX(-100%)"    
        setTimeout(()=>{
        loginWindow.style.display="none"
        },1000)
        galleryOpen()
    }
    else{
        error.style.visibility="visible"
        error.style.opacity=1;
        setTimeout(function(){
            error.style.opacity=0;
         }, 3000);
    }
}

function nextImage(image) {
    let nextElement=image.nextElementSibling
    if (nextElement.classList.contains("img-box")) {
        nextElement.classList.add("active-img")
        changeImg(nextElement)
    }
    else{
        image.parentElement.children[0].classList.add("active-img")
        changeImg(image.parentElement.children[0])
    }
    image.classList.remove("active-img")
}


