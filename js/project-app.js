import jsonData from '../JSON/data.json' assert {type: 'json'};
export function getDataPassed(){
    const queryParams = new URLSearchParams(window.location.search);
    // Retrieve the value of the 'id' parameter from the url
    var projectId = queryParams.get('id');
    var itemRecord = {}
    const jsonDataArray = jsonData.data;
    jsonDataArray.forEach(function(item, index, array){
        if (item.id == projectId){
            itemRecord = item
        }
    })
    console.log(itemRecord)
    populateProjectsPage(itemRecord)
}
function populateProjectsPage(item){
    if (item != {}){
        //Carousel
        let videoURL  = item.video
        item.images.forEach(function(item, index){
            cloneCarouselImages(item, index, videoURL)
        })
        //Title & Date
        const titleWrapper = document.getElementById('title-container')
        titleWrapper.children[0].children[0].textContent = item.title
        titleWrapper.children[0].children[1].textContent = item.date
        //Main Content (About, Roles & Contri, Learned)
        const contentWrapper = document.getElementById('content-container')
        const aboutContainer = contentWrapper.querySelector('#about-project-container')
        const rolesContainer = contentWrapper.querySelector('#roles-container')
        const learnedContainer = contentWrapper.querySelector('#learned-container')
        aboutContainer.children[1].innerHTML = (item.about).replace(/\n/g, '<br><br>') //header exists before para
        rolesContainer.children[1].innerHTML = (item.roles).replace(/\n/g, '<br><br>')
        learnedContainer.children[1].innerHTML = (item.learned).replace(/\n/g, '<br><br>') // TODO: replace with list when needed
        //Side Content (Members and Links)
        const otherInfoWrapper = document.getElementById('other-info-container')
        const membersContainer = otherInfoWrapper.querySelector('#members-container')
        const achievementsContainer = otherInfoWrapper.querySelector('#achievements-container')
        const techContainer = otherInfoWrapper.querySelector('#tech-container')
        const linksContainer = otherInfoWrapper.querySelector('#links-container')   
        //Members
        if(item.members.length > 0){
            item.members.forEach(i =>{
                const node = document.createElement("li");
                node.textContent = i;
                membersContainer.children[1].appendChild(node)
            })
        }
        else{
            membersContainer.children[0].innerHTML = ''
        }
        //Achievements
        if(item.achievements != ''){
            const node = document.createElement("p");
            node.textContent = item.achievements;
            achievementsContainer.appendChild(node)
        }
        else{
            achievementsContainer.children[0].innerHTML = ''
        }
        //Tech
        if(item.technologies.length > 0){
            item.technologies.forEach(i =>{
                const node = document.createElement("li");
                node.textContent = i;
                techContainer.children[1].appendChild(node)
            })
        }
        else{
            techContainer.children[0].innerHTML = ''
        }
        // Links
        if(item.links.length > 0){
            item.links.forEach(i =>{
                const [key, value] = Object.entries(i)[0];
                const node = document.createElement("a");
                node.textContent = key;
                node.setAttribute('href',value)
                const node2 = document.createElement("br");
                linksContainer.appendChild(node)
                linksContainer.appendChild(node2)
            })
        }
        else{
            linksContainer.children[0].innerHTML = ''
        }
    }
}
function cloneCarouselImages(item, index, videoURL){
    const carouselOuter = document.getElementById('carousel-outer')
    const carouselInner  = carouselOuter.querySelector('.carousel-inner')
    var carouselContainer = carouselInner.querySelector('.carousel-item')
    let imagesPrefix = './assets/'
    //after first video
    if(index > 0){
        carouselContainer = carouselContainer.cloneNode(true)
        carouselContainer.setAttribute('class','carousel-item')
        //remove iframe and add image when video is added, else full of duplicates
        if(videoURL != "" || videoURL != null){
            carouselContainer.innerHTML = ''
            const imgObj = document.createElement('img');
            carouselContainer.appendChild(imgObj);
        }
        carouselContainer.children[0].src = imagesPrefix+item
        carouselInner.appendChild(carouselContainer)
    }
    // youtube video if available
    else if(index == 0 && (videoURL != '' || videoURL != null)){ 
        carouselContainer.innerHTML = ''
        const iframeObj = document.createElement('iframe');
        iframeObj.src = videoURL;  // Set the URL                 
        iframeObj.frameborder = '0';
        iframeObj.allowfullscreen = true;
        iframeObj.autoplay = true;
        carouselContainer.appendChild(iframeObj)

        //pause auto scroll when theres a video
        $('#carousel-outer').carousel('pause');
    }
    //first picture, no video
    else{
        carouselContainer.children[0].src = imagesPrefix+item
    }
}