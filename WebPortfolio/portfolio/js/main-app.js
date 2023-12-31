
import jsonData from '../JSON/sample.json' assert {type: 'json'};
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
    const projectsContainer = document.getElementById('projects-container')
    const projectsImgContainer = document.getElementById('projects-img-container')
    const projectsHeader = document.getElementById('projects-header')
    const projectsPara = document.getElementById('projects-paragraph')

    //Record 1
    if (index == 0){
        //Card Title
        projectsHeaderContent = projectsHeader.children[0]
        projects
        //Card
    }
}
