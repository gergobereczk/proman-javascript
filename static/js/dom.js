// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

export let dom = {
    _appendToElement: function (elementToExtend, textToAppend, prepend = false) {
        // function to append new DOM elements (represented by a string) to an existing DOM element
        let fakeDiv = document.createElement('div');
        fakeDiv.innerHTML = textToAppend.trim();

        for (let childNode of fakeDiv.childNodes) {
            if (prepend) {
                elementToExtend.prependChild(childNode);
            } else {
                elementToExtend.appendChild(childNode);
            }
        }

        return elementToExtend.lastChild;
    },
    init: function () {
        // This function should run once, when the page is loaded.
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);
            dom.createNewElement();
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';


        for (let board of boards) {


            boardList +=
                `<div class="board-container">
                    <section class="board">
                        <div class="board-header"><span class="board-title">Board 1</span>
                        <button class="board-add">Add Card</button>
                      
                        </div>`;

            let statusesFromServer = board.statuses;

            for (var i in statusesFromServer) {

                boardList += `
                    
                     <div class="board-column">
                    <div class="board-column-title">${statusesFromServer[i]['title']}</div>
                    <div class="board-column-content">
<div class="dropzone" data-status="${statusesFromServer[i]['id']}">`;

                let cardsFromServer = board.statuses[i]['cards'];

                for (var i in cardsFromServer) {
                    boardList += `
                        <div class="card" data-card_id="${cardsFromServer[i]['id']}" id="cards" draggable="true")>
                            <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                            <div class="card-title">${cardsFromServer[i]['title']}</div>
                   </div>
                `
                }


                boardList += `</div></div></div>
                        `
            }


            boardList += `           
            </div>
        </section>`;
        }


        const outerHtml = `
            <ul class="board-container">
                ${boardList}
            </ul>
        `;

        this._appendToElement(document.querySelector('#boards'), outerHtml);
    },
    loadCards: function (boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function (cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features

    createTestBoards: function () {
        return
    },
    loadTestBoards: function () {
        document.querySelector('#boards').innerHTML = this.createTestBoards();
    },
    createNewElement: function () {
        let addButton = document.getElementsByClassName("board-add");
        addButton[0].addEventListener("click", addCard);


        function addCard() {document.getElementById('id01').style.display='block';




            /*
            let url = '/insert-card';
            let data = {cardName: 'yolo'};

            fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(data), // data can be string or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));*/
        }

    }
};


let registerModal = document.getElementById('registermodal');
let loginModal = document.getElementById('loginmodal');
let registerButton = document.getElementById("register");
let loginButton = document.getElementById("login");
let logSpan = document.getElementsByClassName("logclose")[0];
let regSpan = document.getElementsByClassName("regclose")[0];
let loginSubmit = document.getElementById("loginbutton");
let registerSubmit = document.getElementById("registerbutton");


registerButton.onclick = function () {
    registerModal.style.display = "block";
};

loginButton.onclick = function () {
    loginModal.style.display = "block";
};

regSpan.onclick = function () {
    registerModal.style.display = "none";
};

logSpan.onclick = function () {
    loginModal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == registerModal || event.target == loginModal) {
        registerModal.style.display = "none";
        loginModal.style.display = "none";
    }
};

loginSubmit.onclick = function () {
    loginModal.style.display = "none";
};

registerSubmit.onclick = function () {
    registerModal.style.display = "none";
};


let usernameText = document.getElementById('loginusername');
let passwordText = document.getElementById('loginpassword');
loginSubmit.addEventListener('click', function () {
    fetch(`http://127.0.0.1:5000/login/${usernameText.value}/${passwordText.value}`);
    setTimeout(function () {
        location.reload();
    }, 500);

});

let registerUserText = document.getElementById('regusername');
let registerPasswordText = document.getElementById('regpassword');
registerSubmit.addEventListener('click', function () {
    fetch(`http://127.0.0.1:5000/register/${registerUserText.value}/${registerPasswordText.value}`)
});



function addNewElement() {

}
function addCard(name) {
            let url = '/insert-card';
            let data = {cardName: name};

            fetch(url, {
              method: 'POST', // or 'PUT'
              body: JSON.stringify(data), // data can be string or {object}!
              headers:{
                'Content-Type': 'application/json'
              }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
        }