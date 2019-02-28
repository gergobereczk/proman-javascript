// It uses data_handler.js to visualize elements
import { dataHandler } from "./data_handler.js";

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
        dataHandler.getBoards(function(boards){
            dom.showBoards(boards);
        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also

        let boardList = '';

        for(let board of boards){
            boardList += `
                <li>${board.title}</li>
            `;
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


};


    let registerModal = document.getElementById('registermodal');
    let loginModal = document.getElementById('loginmodal');
    let registerButton = document.getElementById("register");
    let loginButton = document.getElementById("login");
    let logSpan = document.getElementsByClassName("logclose")[0];
    let regSpan = document.getElementsByClassName("regclose")[0];
    let loginSubmit = document.getElementById("loginbutton");
    let registerSubmit = document.getElementById("registerbutton");

    registerButton.onclick = function() {
        registerModal.style.display = "block";
    };

    loginButton.onclick = function() {
        loginModal.style.display = "block";
    };

    regSpan.onclick = function() {
        registerModal.style.display = "none";
    };

    logSpan.onclick = function() {
        loginModal.style.display = "none";
    };

    window.onclick = function(event) {
      if (event.target == registerModal || event.target == loginModal) {
          registerModal.style.display = "none";
          loginModal.style.display = "none";
      }
    };

    loginSubmit.onclick = function() {
        loginModal.style.display = "none";
    };

    registerSubmit.onclick = function() {
        registerModal.style.display = "none";
    };


    let usernameText = document.getElementById('loginusername');
    let passwordText = document.getElementById('loginpassword');
    loginSubmit.addEventListener('click', function () {
        fetch(`http://127.0.0.1:5000/login/${usernameText.value}/${passwordText.value}`)
    });

    let registerUserText = document.getElementById('regusername');
    let registerPasswordText = document.getElementById('regpassword');
    registerSubmit.addEventListener('click', function () {
        fetch(`http://127.0.0.1:5000/register/${registerUserText.value}/${registerPasswordText.value}`)
    });