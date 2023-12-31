
import jsonData from '../JSON/data.json' assert {type: 'json'};
export function populateCards(){
    const jsonDataArray = jsonData.data;
    jsonDataArray.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));
    console.log(jsonDataArray);
    
    if(jsonDataArray.length > 0){
        jsonDataArray.forEach(cloneCards);
    }
}
function cloneCards(item, index, arr){
    const projectsWrapper = document.getElementById('projects')
    var projectsContainer = projectsWrapper.querySelector('#projects-container')
    let imagesPrefix = './assets/'
    //Record 2 and After
    if (index > 0){
        projectsContainer = projectsContainer.cloneNode(true)
    }
    const projectsImgContainer = projectsContainer.querySelector('#projects-img-container')
    const projectsHeader = projectsContainer.querySelector('#projects-header')
    const projectsPara = projectsContainer.querySelector('#projects-paragraph')
    //Card Title 
    projectsHeader.children[0].children[0].textContent = item.title //children twice becasue of a <b> tag
    //Card Paragraph
    projectsPara.children[0].textContent = item.description
    //Card Image
    projectsImgContainer.children[0].src= imagesPrefix+item.images[0]
    //Assign id (name) to container
    projectsContainer.setAttribute('name', item.id)
    if(index > 0){
        projectsWrapper.appendChild(projectsContainer)
    }
}

export function changePage(item){
    if(item && item != null && item!=''){
        console.log(item.getAttribute('name'))
        let calledItemID = item.getAttribute('name')
        window.location.href = './project.html?id='+parseInt(calledItemID);
    }
}
