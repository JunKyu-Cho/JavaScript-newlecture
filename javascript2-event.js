// Ex4-서로 다른 기능의 여러 버튼을 가진 화면에서 이벤트를 처리하는 방법
window.addEventListener("load", function(){

    var section = document.querySelector("#section4");

    var tbody = section.querySelector(".notice-list tbody"); 
    
    
    tbody.onclick = function(e){
        e.preventDefault(); 
    
        var target = e.target;        
        if(target.nodeName != "A")  return;
        // if(target.nodeName != "INPUT")  return;
        if(target.classList.contains("sel-button")){
            var tr = target.parentElement;
            for(; tr.nodeName != "TR"; tr=tr.parentElement);

            tr.style.background = "yellow";
        }
        else if(target.classList.contains("edit-button")){

        }
        else if(target.classList.contains("del-button")){
            
        }
    };
}); 

// Ex3-이벤트 버블링 멈추기
window.addEventListener("load", function(){

    var section = document.querySelector("#section3");
    
    var imgList = section.querySelector(".img-list"); 
    var addButton = section.querySelector(".add-button");
    var currentImg = section.querySelector(".current-img");
    
    imgList.onclick = function(e){
        console.log("imgList onclick");
        if(e.target.nodeName != "IMG")    return;

        currentImg.src = e.target.src;        
    };

    addButton.onclick = function(e){
        e.stopPropagation();    // 버블 이벤트 방지 (중복 이벤트 발생 방지)

        console.log("addButton onclick");

        var img = document.createElement("img");
        img.src = "images/img1.jpg";

        currentImg.insertAdjacentElement("afterend", img);
    };

}); 

//Ex2-이벤트 버블링을 이용해 사용자 이벤트 처리하기:event Bubbling
window.addEventListener("load", function(){

    var section = document.querySelector("#section2");
    var imgList = section.querySelector(".img-list"); 
    var currentImg = section.querySelector(".current-img");
    
    imgList.onclick = function(e){
        if(e.target.nodeName != "IMG")  return;

        currentImg.src = e.target.src;
    };
}); 

window.addEventListener("load", function(){
    var section = document.querySelector("#section1-1");

    var buttons = section.querySelectorAll(".del-button");
    
    section.onclick = function(e){
        if(e.target.type == "button")
            e.target.parentElement.parentElement.remove();
    };
});

window.addEventListener("load", function(){
    var section = document.querySelector("#section1");

    var imgs = section.querySelectorAll(".img");
    var currentImg = section.querySelector(".current-img");

    // for(var i=0; i<imgs.length; i++){
    //     imgs[i].onclick = function(e){
    //         currentImg.src = e.target.src;
    //     }
    // }
    section.onclick = function(e){
        if(e.target.tagName == "IMG")
            currentImg.src = e.target.src;
    };
});
