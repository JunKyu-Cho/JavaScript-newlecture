//Ex10 : 클릭한 컬럼을 기준으로 레코드 정렬하기 #1
window.addEventListener("load", function(){

    var notices = [
        {"id":1, "title":"유투브에 끌려다니지 않으려고 했는데....ㅜㅜ..", "regDate":"2019-02-05", "writerId":"newlec", "hit":2},
        {"id":2, "title":"자바스크립트란..", "regDate":"2019-02-02", "writerId":"newlec", "hit":0},
        {"id":3, "title":"기본기가 튼튼해야....", "regDate":"2019-02-01", "writerId":"newlec", "hit":1},
        {"id":4, "title":"근데 조회수가 ㅜㅜ..", "regDate":"2019-01-25", "writerId":"newlec", "hit":0}
    ];

    var section = document.querySelector("#section10");
    
    var noticeList =section.querySelector(".notice-list");
    var titldTd = section.querySelector(".title");
    var tbodyNode = noticeList.querySelector("tbody");

    var bindData = function(){
        var template = section.querySelector("template");

        for(var i=0; i<notices.length; i++){
            var cloneNode = document.importNode(template.content, true);
            var tds = cloneNode.querySelectorAll("td");
            tds[0].textContent = notices[i].id;            

            var aNode = tds[1].children[0];
            aNode.href=notices[i].id;
            aNode.textContent = notices[i].title;

            tds[2].textContent = notices[i].regDate;
            tds[3].textContent = notices[i].writerId;
            tds[4].textContent = notices[i].hit;

            tbodyNode.appendChild(cloneNode);
        }
    };

    bindData();

    var titleSorted = false;

    titldTd.onclick = function(){

        tbodyNode.innerHTML = "";

        if(!titleSorted) {
            notices.sort(function(a, b){
                titleSorted = true;

                if(a.title < b.title)
                    return -1;
                else if(a.title > b.title)
                    return 1;
                else
                    return 0;    
            });
        }
        else
           notices.reverse();
        
        bindData();
    };
});

// Ex9 : 다중 노드선택 방법과 일괄삭제, 노드의 자리바꾸기
window.addEventListener("load", function() {
    var section = document.querySelector("#section9");

    var noticeList = section.querySelector(".notice-list");
    var tbody = noticeList.querySelector("tbody");
    var allChekckbox = section.querySelector(".overall-checkbox");
    var delButton = section.querySelector(".del-button");
    var swapButton = section.querySelector(".swap-button");

    allChekckbox.onchange = function() {
        var checkBoxs = section.querySelectorAll('input[type="checkbox"]');
        for(var i=0; i<checkBoxs.length; i++) {
            checkBoxs[i].checked = allChekckbox.checked;
        }        
    };

    delButton.onclick = function() {
        var inputs = tbody.querySelectorAll('input[type="checkbox"]:checked');
        // for(i in inputs) {
        for(var i=0; i<inputs.length; i++) {
            inputs[i].parentElement.parentElement.remove();
        }
    };

    swapButton.onclick = function() {
        var inputs = tbody.querySelectorAll('input[type="checkbox"]:checked');

        if(inputs.length != 2)
        {
            alert("노드 두개를 선택");
            return;
        }

        var trs = [];
        for(var i=0; i<inputs.length; i++)
            trs.push(inputs[i].parentElement.parentElement);

        var cloneNode = trs[0].cloneNode(true);

        trs[1].replaceWith(cloneNode);
        trs[0].replaceWith(trs[1]);
        //tbody.replaceChild(trs[1], trs[0]);
    };

});

// Ex8 : 노드 삽입과 바꾸기
window.addEventListener("load", function() {
    var section = document.querySelector("#section8");

    var noticeList = document.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");
    var upButton = section.querySelector(".up-button");
    var downButton = section.querySelector(".down-button");

    var currentNode = tbodyNode.firstElementChild;

    downButton.onclick = function() {
        var nextNode = currentNode.nextElementSibling;

        if(nextNode == null)
        {
            alert("마지막 위치 - 이동 불가");
            return;
        }
           
        // tbodyNode.removeChild(nextNode);
        // tbodyNode.insertBefore(nextNode, currentNode);
        currentNode.insertAdjacentElement("beforebegin", nextNode);
    };

    upButton.onclick = function() {
        var previousNode = currentNode.previousElementSibling;

        if(previousNode == null)
        {
            alert("첫번째 위치 - 이동 불가");
            return;
        }

        // tbodyNode.removeChild(currentNode);
        // tbodyNode.insertBefore(currentNode, previousNode);

        currentNode.insertAdjacentElement("afterend", previousNode);
    };

});

// Ex7 : 노드 복제와 템플릿 태크
window.addEventListener("load", function() {
    var notices = [
        {id:5, title:"제목 : 5", regDate:"2021-12-15", writerID:"JK", hit:0},
        {id:6, title:"제목 : 6", regDate:"2021-12-15", writerID:"JK", hit:0}
    ];

    var section = document.querySelector("#section7");

    var noticeList = document.querySelector(".notice-list");
    var tbodyNode = noticeList.querySelector("tbody");
    var cloneButton = section.querySelector(".clone-button");
    var templateButton = section.querySelector(".template-button");

    cloneButton.onclick = function() {
        var trNode = noticeList.querySelector("tbody tr");
        var cloneNode = trNode.cloneNode(true); // true : 모든 자손 Node 복제

        var tds = cloneNode.querySelectorAll("td"); 

        for(i in tds)
        {
            tds[i].textContent = notices[0][i];
        }
/*
        tds[0].textContent = notices[0].id;
        tds[1].innerHTML = '<a href="' + notices[0].id + '">' + notices[0].title + '</a>';
        tds[2].textContent = notices[0].regDate;
        tds[3].textContent = notices[0].writerID;
        tds[4].textContent = notices[0].hit;
*/
        tbodyNode.append(cloneNode);        
    };

    templateButton.onclick = function() {
        var template = section.querySelector("template");
        var cloneNode = document.importNode(template.content, true);

        var tds = cloneNode.querySelectorAll("td"); 

        tds[0].textContent = notices[0].id;
        
        // tds[1].innerHTML = '<a href="' + notices[0].id + '">' + notices[0].title + '</a>';
        var aNode = tds[1].children[0];
        aNode.href = notices[0].id;
        aNode.textContent = notices[0].title;

        tds[2].textContent = notices[0].regDate;
        tds[3].textContent = notices[0].writerID;
        tds[4].textContent = notices[0].hit;

        tbodyNode.append(cloneNode);
    };

});

// Ex6 : 노드조작 : 메뉴추가 (createTextNode, Elemnet)
window.addEventListener("load", function() {
    var section = document.querySelector("#section6");

    var titleInput = section.querySelector(".title-input");
    var menuListUl = section.querySelector(".menu-list");
    var addButton = section.querySelector(".add-button");
    var delButton = section.querySelector(".del-button");

    addButton.onclick = function() {
        var title = titleInput.value;

        // Element=>Text=>Element (성능상의 문제 발생)
        // menuListUl.innerHTML += '<li><a href="">' + title + '</a></li>';

        var html = '<a href="">'+title+'</a>';
        var li = document.createElement("li");
        li.innerHTML = html;

        // menuListUl.appendChild(li);

        // menuListUl.append(title);
        menuListUl.append(li);

        /*
        var txtNode = document.createTextNode(title);
        var aNode = document.createElement("a");
        var liNode = document.createElement("li");

        aNode.href = "";
        aNode.appendChild(txtNode);
        liNode.appendChild(aNode);
        menuListUl.appendChild(liNode);
        */        
    };
    delButton.onclick = function() {
        // var txtNode = menuListUl.childNodes[0];

        var liNode = menuListUl.children[0];
        // menuListUl.removeChild(liNode);
        liNode.remove();

        
    };
});

// Ex5 : Element Node 속성 && CSS 속성 변경
window.addEventListener("load", function() {
    var section = document.querySelector("#section5");
    var srcinput = section.querySelector(".src-input");
    var imgSelect = section.querySelector(".img-select");
    var changeButton = section.querySelector(".change-button");
    var img = section.querySelector(".img");
    var colorInput = section.querySelector(".color-input");

    changeButton.onclick = function() {
        img.src = "images/" + srcinput.value;
        // img.src = "images/" + imgSelect.value;
        srcinput.value = "";
        
        // img.style["border-color"] = colorInput.value;
        img.style.borderColor = colorInput.value;
        console.log(img.className);
    };
});

// Ex4 : childNodes를 이용한 노드 선택
window.addEventListener("load", function() {
    var section4 = document.querySelector("#section4");
    var box = section4.querySelector(".box");

    // var input1 = box.childNodes[0];
    // var input2 = box.childNodes[1];

    var input1 = box.children[0];
    var input2 = box.children[1];

    input1.value = "Input 1";
    input2.value = "Input 2";
});

// Ex3 : Selectors API Level1
window.addEventListener("load", function() {
    var section3 = document.getElementById("section3");

    var txtX = section3.querySelector("input[name='x']");
    var txtY = section3.querySelector(".txt-y");
    var btnAdd = section3.querySelector(".btn-add");
    var txtSum = section3.querySelector(".txt-sum");
  
    btnAdd.onclick = function () {
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };
});

// Ex2 : 엘리먼트 선택방법 개선하기
window.addEventListener("load", function() {
    var section2 = document.getElementById("section2");

    var txtX = section2.getElementsByClassName("txt-x")[0];
    var txtY = section2.getElementsByClassName("txt-y")[0];
    var btnAdd = section2.getElementsByClassName("btn-add")[0];
    var txtSum = section2.getElementsByClassName("txt-sum")[0];
    /*
    var inputs = sections2.getElementsByTagName("input");

    var txtX = inputs[0];
    var txtY = inputs[1];
    var btnAdd = inputs[2];
    var txtSum = inputs[3];    
    */

    btnAdd.onclick = function () {
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };
});

// Ex1 : 계산기 프로그램
window.addEventListener("load", function() {
    var txtX = document.getElementById("txt-x");
    var txtY = document.getElementById("txt-y");
    var txtSum = document.getElementById("txt-sum");
    var btnAdd = document.getElementById("btn-add");

    btnAdd.onclick = function () {
        var x = parseInt(txtX.value);
        var y = parseInt(txtY.value);

        txtSum.value = x+y;
    };
});
