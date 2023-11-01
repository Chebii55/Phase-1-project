//SEARCH

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/474/modelyear/2015?format=json")
  .then(function (response) {
    return response.json();
  })
  .then(onSearch)
  .catch(error=>{console.log(error)}
    )
})
function onSearch(data){
 console.log(data)

 const cars=data.Results;
 console.log(cars);
const make=document.getElementById("make");
const model=document.getElementById("model");
const searchInput = document.getElementById("searchValue").value.toLowerCase(); 

const matchingResult = cars.find((car) => car.Model_Name.toLowerCase() === searchInput);
//console.log (matchingResult);
    if (matchingResult) {
        make.textContent =matchingResult.Make_Name;
        model.textContent = matchingResult.Model_Name;
    } else {
        make.textContent = "No match found for: " + searchInput;
        model.textContent = "";
}

}
//COMMENTS

const btn=document.getElementById("submitComment");
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    const uName=document.getElementById("uName").value;
    const uMail=document.getElementById("uMail").value;
    const uMessage=document.getElementById("uComment").value;
    const uModel=document.getElementById("model").value;
    const formData={
        "name": uName,
        "email": uMail,
        "message": uMessage,
        "Model_Name":uModel
      }
   
    const configObj={
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(formData),
      }

  
    fetch("http://localhost:3000/comments",configObj )
    .then(function (response) {
      return response.json();
    })
   .then(data=>
{console.log(data)}) }
    )
   
    
  
  //COMMENT SECTION

  document.addEventListener('DOMContentLoaded',theComments) 
   
  function theComments(){
    
  const container=document.getElementById("perComment");
   
        fetch(`http://localhost:3000/comments`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const detail=data.Results;

        data.forEach(detail => {
            const commentName=document.createElement("h4")
           // const commentModel=document.createElement("");
            const commentMessage=document.createElement("p")
            const model=detail.model;
            const comment=detail.message;
            container.appendChild(commentName)
            container.appendChild(commentMessage)
            commentName.innerHTML =detail.name;
            commentMessage.innerHTML =`<b>Honda ${model}:</b>${comment}<br>|.......................................................................................................|`; 
        });
           
        });
}
