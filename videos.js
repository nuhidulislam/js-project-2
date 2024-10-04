
function getTimeString(time){
    const hour= parseInt(time/3600);
    let remaingSeconds=time%3600;
    const minutes= parseInt(remaingSeconds/60);
    const second=remaingSeconds%60;

return `${hour} hour ${minutes} minutes ${second} seconds ago`

}



const loadCategoryVideos=(id)=>{

    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then ((res)=>res.json())
    .then ((data)=>{
        removeActiveClass();
        const activeBtn= document.getElementById(`btn-${id}`);
        activeBtn.classList.add("active");
        displayVideos(data.category)
    })
    .catch((error)=> console.log(error));
}

const removeActiveClass=()=>{
    const buttons= document.getElementsByClassName("category-btn");
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}





// 1. Fetch, Load and show categories on html

// create loadcategories
const loadCategories= () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then ((res)=>res.json())
    .then ((data)=>displayCategories(data.categories))
    .catch((error)=> console.log(error));
}




const cardDemo={
    "category_id": "1001",
    "video_id": "aaah",
    "thumbnail": "https://i.ibb.co/hY496Db/coloer-of-the-wind.jpg",
    "title": "Colors of the Wind",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/6r4cx4P/ethen-clack.png",
            "profile_name": "Ethan Clark",
            "verified": true
        }
    ],
    "others": {
        "views": "233K",
        "posted_date": "16090"
    },
    "description": "Ethan Clark's 'Colors of the Wind' is a vibrant musical exploration that captivates listeners with its rich, expressive melodies and uplifting rhythm. With 233K views, this song is a celebration of nature's beauty and human connection, offering a soothing and enriching experience for fans of heartfelt, nature-inspired music."
}

const displayVideos=(videos)=>{
    const videoContainer=document.getElementById('videos');
    videoContainer.innerHTML=" ";

    if(videos.length==0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML=`
        <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
        <img src="images/Icon.png"/>
        <h2 class="text-center font-extrabold text-[30px]">No Content Here In This Category</h2>

        </div>
    
        `;
        return;

    }else{
        videoContainer.classList.add('grid');
    }


    videos.forEach((video)=>{
        console.log(video);
        const card=document.createElement('div')
        card.classList="card card-compact";
        card.innerHTML=
        `
        <figure class="h-[200px] relative">
    <img
      src=${video.thumbnail}
      class="h-full w-full object-cover "
      alt="Shoes" />
      ${video.others.posted_date?.length==0? "":`<span class="absolute bg-black text-xs text-white rounded p-1 right-2 bottom-2">${getTimeString(video.others.posted_date)}</span>`}
  </figure >
  <div class="px-0 py-2 flex gap-2">
    <div>
    <img class="w-10 h-10 rounded-full" src="${video.authors[0].profile_picture}"/>
    </div>
    <div>
    <h1 class="font-bold">${video.title}</h1>
    <div class="flex items-center gap-2">
    <p class="text-gray-500">${video.authors[0].profile_name}</p>
    ${video.authors[0].verified==true?`<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=D9RtvkuOe31p&format=png"/>`:""}
    </div>
    </div>
  </div>
        `
        videoContainer.append(card);
    });
}
// create displaycategories
const displayCategories=(categories)=>{
    const categoryContainer=document.getElementById("categories");
   categories.forEach((item) => {
    console.log(item)

    const buttonContainer= document.createElement('div')
    buttonContainer.innerHTML=
    `
    <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="bg-gray-300 px-5 py-2 text-black rounded-2xl category-btn" >${item.category}</button>
    `;




    categoryContainer.append(buttonContainer);

   })
}
const loadVideos= (searchText=" ") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchText}`)
    .then ((res)=>res.json())
    .then ((data)=>displayVideos(data.videos))
    .catch((error)=> console.log(error));
}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
    loadVideos(e.target.value);
});

loadCategories()
loadVideos()