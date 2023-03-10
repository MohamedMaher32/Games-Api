// active siblings links
$(".nav-link").click(function(){
    $(this).addClass("active")
    $(this).parent().siblings().children().removeClass("active")
    $(".navbar-collapse").addClass("d-none")
    $(".navbar-collapse").removeClass("d-block")
})
$(".navbar-toggler").click(function(){
    $(".navbar-collapse").removeClass("d-none")
})
// landing spinner
let loading = document.querySelector(".loading");
// display games
let gameList =[]
async function getGames(type){
   loading.classList.remove("d-none");
   const options = {
       method: 'GET',
       headers: {
         'X-RapidAPI-Key': '7e5459cb8cmsh9e15f0722147d97p16a88cjsn5688b3201589',
         'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
       }
     } 
     let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${type}`, options)
     let data = await response.json()
     gameList = data
     loading.classList.add("d-none");
     displayGames()
}
getGames("mmorpg")
 function displayGames(){
   let temp = ""
   gameList.forEach((x) => {
       temp += `
     <div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
           <div class="card bg-transparent h-100 overflow-hidden item" game-Id="${x.id}">
             <div class="card-body p-3">
               <img src="${x.thumbnail}" class="card-img-top rounded-2" alt="image">
               <div class="row justify-content-between py-3">
                 <span class="card-title col-8">${x.title}</span>
                 <span class="bg-primary rounded-2 col-3 text-center free align-self-center">Free</span>
               </div>
               <p class="card-text text-center text-muted">${x.short_description}</p>
             </div>
             <div class="footer py-2 border-top border-dark row justify-content-between">
               <span class="bg-dark ms-4 py-1 rounded-pill text-center col-4">${x.genre}</span>
               <span class="bg-dark me-4 col-4 py-1 rounded-pill text-center">${x.platform}</span>
             </div>
           </div>
         </div>`
   })
   document.getElementById("myRow").innerHTML = temp
   getId()
}
let navLinks = document.querySelectorAll(".nav-link")
navLinks.forEach((x)=>{
        x.addEventListener("click",(g)=>{
        let result = g.target.getAttribute("catogry")
        getGames(result)    
      })
})
// id function
function getId(){
  let items = document.querySelectorAll(".item")
  for(let i=0 ; i<items.length ; i++){
      items[i].addEventListener("click" ,function(){
      let reId = this.getAttribute("game-Id")
      startPage.classList.add("d-none")
      detailsPage.classList.remove("d-none")
      details(reId)
      })
  }
}
// transform between pages
let startPage = document.getElementById("myGames")
let detailsPage = document.getElementById("myInfo")
let closeBtn = document.getElementById("closePage")
closeBtn.addEventListener("click",()=>{
  startPage.classList.remove("d-none")
  detailsPage.classList.add("d-none")
})
// details functions
async function details(id){
  loading.classList.remove("d-none");
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '7e5459cb8cmsh9e15f0722147d97p16a88cjsn5688b3201589',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };
  let response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, options)
  let details = await response.json()
  loading.classList.add("d-none");
  displayDetails(details)
}
function displayDetails(response){
  let temp =`<div class="col-md-4 col-sm-12"><img src="${response.thumbnail}" alt="image" class="w-100"></div>
              <div class="col-md-8 col-sm-12">
                <h3 class="pb-2">Title: ${response.title}</h3>
                <h6>Category: <span class="px-2 py-1 bg-info rounded-3 text-dark fw-bold">${response.genre}</span></h6>
                <h6 class="py-2">Platform: <span class="px-2 py-1 bg-info rounded-3 text-dark fw-bold">${response.platform}</span></h6>
                <h6 class="pb-2">Status: <span class="px-2 py-1 bg-info rounded-3 text-dark fw-bold">${response.status}</span></h6>
                <p>${response.description}</p>
                <a href="${response.game_url}" target="_blank" class="btn btn-outline-warning text-white mb-5">Show Game</a>
              </div>`
  document.getElementById("myDeatils").innerHTML = temp
}

