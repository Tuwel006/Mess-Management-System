// script.js
const loader = document.createElement("div");
    loader.className = 'pageLoader';
    const body = document.querySelector("body");
    const webpage = document.querySelector(".webpage")
    body.appendChild(loader);
    function hideLoader() {
        loader.style.display = 'none';
        // webpage.style.filter = 'brightness(1)';
    }
    function showLoader() {
        loader.style.display = 'flex';
    }
window.addEventListener("load", ()=>{
    // webpage.style.filter= 'brightness(0.5)';
    setTimeout(hideLoader, 100);
})


// function UpdateTime(){
//     const date = document.getElementById('datetime');
//     const now=new Date();
//     const options = {weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'}
//     const formatTime = now.toLocaleDateString('en-US', options);
//     date.textContent = formatTime;

// setInterval(UpdateTime,1000);
// }
// UpdateTime();
// const button = document.getElementsByTagNameNS("button", "http://127.0.0.1:3000/");
// button.addEventListener('click', ()=> {
//         fetch('/run-server-file')
//             .then(response => response.text())
//             .then(data => {
//                 responseDiv.textContent = data;
//             })
//             .catch(error => {
//                 responseDiv.textContent = 'Error running server file';
//                 console.error('Error:', error);
//             });
// })
const currentUrl = window.location.href;
            const encodedUrl = encodeURIComponent(currentUrl);
            const newUrl = `${window.location.origin}${window.location.pathname}?encodedUrl=${encodedUrl}`;
            window.history.replaceState({}, document.title, newUrl);

const currPath = window.location.pathname;
if(currPath!="/register" && currPath!="/login"){
    
function getGroup() {
    fetch('/getgroups', {
        method: "GET",
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(group => {
        return group;
    })
}


const cros=document.getElementById('cross');
        const menuArea=document.getElementById("menuArea");
        const webpage=document.querySelector('.webpage');
        const overlay=document.getElementsByClassName('overlayForMenu');
        function run(){                       
            menuArea.style.left='0';
            cros.style.display='block';
            webpage.classList.add('menu-open');
            cros.classList.add('bright');
            menuArea.classList.add("bright");
        }
        cros.addEventListener("click",function run2(){
                menuArea.style.left='-365px';
                cros.style.display='none';
                webpage.classList.remove('menu-open');
            })
        
        // function brightness(){
        //     webpage.classList.add('bright');            
            
        // }
        // function bright(){
        //     webpag.classList.remove('bright');
        // }

        let randomColor = getRandomColor();
        const profileImg = document.querySelector('.profile');
        const userNameArea = document.getElementById("userNameArea");
        async function profileView() {
            const response2 = await fetch('/getUser');
            const user = await response2.json();
            const userName = user.name;
            profileImg.textContent = userName.charAt(0).toUpperCase();
            profileImg.style.color = randomColor;
            userNameArea.textContent = userName;
        }
        profileView();
        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
}

if(currPath === '/register' || currPath === '/login'){
    function formCheck() {
        try {
            const form = document.querySelector('form');
        const errorMessage = document.getElementById('error-message');
        console.log("form: "+form);
        form.addEventListener('submit', (event) => {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required]');
    
            inputs.forEach(input => {
                console.log(input);
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.border = '1px solid red';
                } else {
                    input.style.border = '';
                }
            });
    
            if (!isValid) {
                event.preventDefault();
                errorMessage.textContent = 'Please fill out all required fields.';
            }
        });
        } catch (error) {
            console.log(error);
        }
    }
    formCheck();
}


if(currPath === '/register') {
    let countdown;
    const submitBtn = document.getElementById('submitBtn');
    const mobileNumber = document.getElementById("email").value.trim();
    
    function toggleName(){
        const admin = document.getElementById('admin');
    const member = document.getElementById('member');
    const adminName = document.getElementById('adminName');
    const memberName = document.getElementById('memberName');
    if(admin.checked){
        adminName.classList.remove('hidden');
        memberName.classList.add('hidden');

    }
    else if(member.checked){
        adminName.classList.add('hidden');
        memberName.classList.remove('hidden');
    }
    }
    const otpBtn = document.getElementById("otpBtn");
    let sendFlag = 0;
     otpBtn.addEventListener("click", ()=>{
        let timeSec = 60;
        let timeMin = 0;
        
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validate mobile number
        if (email === '' || !emailRegex.test(email)) {
            alert('Please enter a valid Email.');
            return;
        }
    
        fetch('/send-otp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                otpBtn.disabled = true;
                const otpArea = document.getElementById("otpArea");
                const otpText = document.createElement('div');
                
                

                    let countdown = setInterval(()=>{
                       
                        otpText.innerText = `Resen OTP after ${timeMin}. ${timeSec}`;
                        timeSec--;
                        
                        if(timeMin === 0 && timeSec === 0){
                            clearInterval(countdown);
                            otpArea.removeChild(otpText);
                    otpText.innerText = `Send OTP`;
                    
                        }
                        if(!timeSec){
                            timeSec = 60;
                            timeMin--;
                        }
                        
                    },1000);
                    
               
                function populateCountdown(){
                    otpArea.appendChild(otpText);
                }
                populateCountdown();
                setTimeout(() => {
                    
                    otpBtn.disabled = false;
                }, 60000);
            } 
            else {
                alert('Failed to send OTP. Please try again.');
            }
        });
     });
    
    
        // submitBtn.addEventListener("submit", ()=> {
        //     const otp = document.getElementById('otp').value.trim();
        
        //     // Validate OTP
        //     if (otp === '' || isNaN(otp)) {
        //         alert('Please enter a valid OTP.');
        //         return;
        //     }
        
        //     fetch(this.action, {
        //         method: this.method,
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: otp
        //     })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.success) {
        //             alert('OTP verified successfully. You are logged in.');
        //         } else {
        //             alert('Invalid OTP. Please try again.');
        //         }
        //     });
//});
    
    


    const groupNameInput = document.getElementById('groupNameInput');
 
    async function toggleMember() {
        
        const memberName = document.getElementById('memberName');


        const groupName = groupNameInput.value;
        memberName.innerHTML = '<option value="">Select Your Name</option>'
        const fragment = document.createDocumentFragment();

        try {
            const response = await fetch(`/getMembersForReg?groupName=${groupName}`);
            if(response.ok) {
                const data = await response.json();
                const existMembers = data.groupMembers;

                existMembers.forEach((member, index) => {
                    
                    if(!member.email){
                        const option = document.createElement('option');
                    option.value = member.name;
                    option.textContent = member.name;

                    memberName.appendChild(option);
                    }

                });

            }
        } catch (error) {
            console.log(error);
        }
    }

    groupNameInput.addEventListener("change", toggleMember);

}



else if(currPath === '/moneydeposit' || currPath === "/seeDepositList") {
    const addNew = document.getElementById('addNew');
const inputName = document.getElementById('inputName');
const saveOption = document.getElementById('saveBtn');
const inputBox = document.getElementById('inputBox');
const nameTable = document.getElementById('nameTable');
const nameTableContainer = document.getElementById('nameTableContainer');


async function fetchAndDisplayNames() {
    try {
        const response = await fetch('/getMembers');
        if(response.ok) {
            const data = await response.json();
            const existMembers = data.groupMembers;

            existMembers.forEach((member, index) => {
                const newRow = nameTable.insertRow();
                const slCell = newRow.insertCell(0);
                const nameCell = newRow.insertCell(1);
                const moneyCell = newRow.insertCell(2);
                const totalCell = newRow.insertCell(-1);
                // slCell.classList.add('slCell');
                // nameCell.classList.add('nameCell');
                let overlay = document.getElementsByClassName('div');
                overlay.className = 'overlay';
                let main = document.getElementsByTagName("main");
                let holdTimer;
                // console.log('One more time'+member.name);
                slCell.textContent = index+1;
                slCell.className = 'slCell';
               
                if(member.Admin===true){
                    nameCell.textContent = member.name+"*";
                
                }
                else{
                    nameCell.textContent = member.name;
                  
                }
                nameCell.id = `nameCell-${member.name}`;
                nameCell.className = 'nameCell';
                newRow.className = 'newRow';
                moneyCell.id = `moneyCell-${member.name}`;
                moneyCell.className = 'moneyCell slidable';
                totalCell.textContent ="Tatal Momey";
                totalCell.id = `totalCell-${member.name}`;
                totalCell.className = 'totalCell-moneyDeposit';
                // moneyCell.textContent = '';
                const displyMoney = document.createElement('div');
                displyMoney.className = 'displayMoney';
                displyMoney.id = `displayMoney-${member.name}`;
                
                const button = document.createElement('BUTTON');
                button.id = `addMoneyBtn-${member.name}`;
                button.className = `moneyCellBtn`;
                button.value = `${member.name}`;
                button.textContent = 'Add Money';
                moneyCell.appendChild(displyMoney);
                if(currPath === '/moneydeposit'){
                    moneyCell.appendChild(button);
                }
                
                const newNameCell = document.getElementById(`nameCell-${member.name}`);
                if(currPath ==="/moneydeposit"){
                    newNameCell.addEventListener('mousedown', ()=> {
                       
                        
                        holdTimer = setTimeout(()=>{
                            
                            
                                
                            
                            // console.log(overlay);
                            // overlay.style.display = 'block';
                            const newTable = document.getElementById("nameTableArea");
                            newTable.classList.remove("hidden");
                            
                            // adminBtn.focus();
                            let adminBtn = document.createElement('button');
                            adminBtn.textContent = 'Make Admin';
                            newTable.appendChild(adminBtn);
                            adminBtn.classList.add('focus');
                            adminBtn.addEventListener('click', ()=> {
                               
                                const cnfmArea = document.createElement("div");
                                if(member.Admin===true){
                                    cnfmArea.textContent = `Do You want to Remove Adimin to ${member.name}`;
                                }
                                else{
                                    cnfmArea.textContent = `Do You want to make Adimin to ${member.name}`;
                                }
                                
                                let newName = member.name;
                                const cnfmBtnArea = document.createElement('div');
                                const yesBtn = document.createElement('button');
                                yesBtn.textContent = 'Yes';
                                const cancelBtn = document.createElement('button');
                                cancelBtn.textContent = 'Cancel';
                                cnfmBtnArea.appendChild(yesBtn);
                                cnfmBtnArea.appendChild(cancelBtn);
                                cnfmArea.appendChild(cnfmBtnArea);
                                newTable.removeChild(adminBtn);
                                newTable.appendChild(cnfmArea);
                                cancelBtn.style.transitionDelay = "1s";
                                yesBtn.style.transitionDelay = "1s";
                                cnfmArea.style.backgroundColor = 'black';
                                cnfmArea.style.color = 'white';
                                cnfmArea.classList.add("transition");
                                cnfmArea.offsetHeight;
                                cnfmArea.style.height = "150px";
                                yesBtn.style.margin = '10px'
                                cancelBtn.style.margin = '10px'
                                yesBtn.style.backgroundColor = "green";
                                cancelBtn.style.backgroundColor = "red";
                                yesBtn.addEventListener("click", ()=> {
                                    let adminValue;
                                  
                                    if(member.Admin === true){
                                        adminValue = false;
                                    }
                                    else{
                                        adminValue = true;
                                    }
                                    fetch('/adminValue', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify({newName, adminValue})
                                    })
                                    .then((response) => {
                                        
                                            if(response.ok){
                                                newTable.removeChild(cnfmArea);
                                            newTable.classList.add("hidden");
                                            }
                                        
                                })
                                location.reload();
                                    
                                 })
                                
                            })
                            
                            
                        },1000)
                        
                        
                    })
                }   

                newNameCell.addEventListener('mouseup', function() {
                    clearTimeout(holdTimer);
                });
            
                newNameCell.addEventListener('mouseleave', function() {
                    clearTimeout(holdTimer);
                });
            });

        }
    } catch (error) {
        console.log(error);
    }
}

fetchAndDisplayNames();



if(currPath==="/moneydeposit"){
    addNew.addEventListener("click", async () => {
      
        inputBox.classList.remove('hidden');
        addNew.classList.add('hidden');
    
    });


    saveOption.addEventListener('click', async ()=>{
        const name = inputName.value;
        // const groupName = await fetchGroupName();
        fetch('/addMember', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name })
        })
        .then(response => response.json())
        .then(data => {
            const inputNamemsg = document.getElementById('inputNamemsg');
            if(data.message === 'existName') {
                
    
                inputNamemsg.textContent = `${name} is alredy exist in you group`;
                return;
            }
            if(data.success) {
                inputName.value = "";
                inputBox.classList.add('hidden');
                addNew.classList.remove('hidden');
                inputNamemsg.textContent ='';
    
    
                const newRow = nameTable.insertRow();
                const slCell = newRow.insertCell(0);
                const nameCell = newRow.insertCell(1);
                const moneyCell = newRow.insertCell(2);
                // slCell.classList.add('slCell');
                // nameCell.classList.add('nameCell');
                const displyMoney = document.createElement('div');
                displyMoney.className = 'displayMoney';
                displyMoney.id = `displayMoney-${name}`;
                slCell.textContent = nameTable.rows.length;
                nameCell.textContent = name;
                nameCell.className = 'nameCell';
                slCell.className = 'slCell';
                newRow.className = 'newRow';
                moneyCell.id = `moneyCell-${name}`
                moneyCell.className = 'moneyCell';
    
                const button = document.createElement('BUTTON');
                button.id = `addMoneyBtn-${name}`;
                button.className = `moneyCellBtn`;
                button.value = `${name}`;
                moneyCell.appendChild(button);
            }
    
        })
    });
    function buttonFunction() {

        fetch('/getgroups', {
            method: 'GET',
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
        })
        .then(group => {
            const groupMembers = group.groupMembers;
            // console.log(groupMembers);
            groupMembers.forEach((member, index) => {
                // console.log(member.name);
                const addMoneyBtns = document.getElementById(`addMoneyBtn-${member.name}`);
                // console.log(addMoneyBtns);
                addMoneyBtns.addEventListener("click", () => {
                   
                    addMoney(addMoneyBtns.value);
                })
            })
  
        })



    }
        
buttonFunction();

function addMoney(name) {
    const displayMoney = document.getElementById(`displayMoney-${name}`);
    displayMoney.innerHTML =`<div id="moneyDiv-${name}" class="moneyDiv">
    <input class="moneyInput" id="moneyInput-${name}" type="number",name="amount" placeholder="Enter Amount">
    <button id="addBtn-${name}"="addBtn">ADD</button>
    <div id="error-${name}"></div>
</div>`

const addBtn = document.getElementById(`addBtn-${name}`);
const moneyInput = document.getElementById(`moneyInput-${name}`);
addBtn.addEventListener("click", () => {
    // location.reload();
    let enterAmount = moneyInput.value;
    if(enterAmount === "") {
        const error = document.getElementById(`error-${name}`);
        error.textContent =`Please Enter The Value`;
        return;
    }
    enterAmount = moneyInput.value;
    fetch('/addAmount', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, enterAmount}),
    })
    .then(response => {
        if(response.ok){
            const moneyDiv = document.getElementById(`moneyDiv-${name}`);
            moneyDiv.innerHTML ="";
            return response.json();
        }
        
    })
    .then(groupMembers => {
        //data
    })
    location.reload();
})


}
}






    
    // Loop through the collection and add the event listener to each button




async function populateMoney() {
    fetch('/getgroups', {
        method: "GET",
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(group => {

        const groupMembers = group.groupMembers;
    groupMembers.forEach(member => {
        const displayMoney = document.getElementById(`displayMoney-${member.name}`);
        const depositedMoney = member.depositMoney;

        let totalMoney = 0;
        depositedMoney.forEach((slot, index) => {
            totalMoney+=slot.value;
            const moneySlotDiv = document.createElement('div');
            moneySlotDiv.className = 'moneySlot right-border'
            moneySlotDiv.id= `money-${member.name}-${index+1}`;
            moneySlotDiv.innerHTML = `<div id="amountValue-${member.name}-${index}">${slot.value}</div>
            <div id="amountDate-${member.name}-${index}">(${slot.depositDate})</div>`
            displayMoney.appendChild(moneySlotDiv);
        })
        const totalCell = document.getElementById(`totalCell-${member.name}`);
        totalCell.textContent = totalMoney;
    })
    })
    
    
}
populateMoney();



}


else if(currPath === '/register' || currPath === '/login') {
    function regform(){
        const input = document.getElementsByClassName('formelm');
        input.addEventListener('click', function () {
            input.classList.add('border');
        })

    }
    regform();
}















else if(currPath === '/addmeal'){

    var lastCheckedDay = localStorage.getItem('lastCheckedDay');
    var lastCheckedMonth = localStorage.getItem('lastCheckedMonth');

    async function groupFetch(){
        const response =  await fetch('/getgroups');
        const group = await response.json();

        const mealStopBtn = document.getElementById(`${group.groupName}stop`);
        const mealStartDate = document.getElementById('mealStartDate');
        const dateHeadCells = document.getElementById('dateHeadCells');
        const mealStartBtn = document.getElementById(`${group.groupName}start`);
        
        var mealStarted = localStorage.getItem('mealStarted');
    
    
    
    //Meal Stop Function
        mealStopBtn.addEventListener("click", () => {
            const webpage = document.querySelector('main');
            const cnfArea = document.createElement('div');
            cnfArea.style.height = "70px";
            cnfArea.classList.add('transition');
            cnfArea.innerHTML = `<p>Are you sure you want clear all data?</p>`;
            const yesBtn = document.createElement('button');
            const noBtn = document.createElement('button');
            yesBtn.textContent ="YES";
            noBtn.textContent = "NO";
            const btnArea = document.createElement('div');
            btnArea.appendChild(yesBtn);
            btnArea.appendChild(noBtn);
            cnfArea.appendChild(btnArea);
            webpage.appendChild(cnfArea);
            btnArea.style.display = "flex";
            btnArea.style.justifyContent= "space-around";
            btnArea.marginTop = "20px";
            cnfArea.style.backgroundColor = "black";
            cnfArea.style.color = "white";
            yesBtn.addEventListener("click", ()=>{
                fetch('/mealStop', {
                    method: "POST",
                })
                .then(response => {
                    if(response.ok) {
                        
        
                        const mealTable = document.getElementById('mealTable');
                        mealTable.classList.add('hidden');
        
        
                        localStorage.setItem('lastCheckedDay', null);
                        localStorage.setItem('lastCheckedMonth', null);
        
                        
        
                        mealStartBtn.classList.remove('hidden');
                        mealStopBtn.classList.add('hidden');
                    }
                })
                location.reload();
            })
            noBtn.addEventListener('click', ()=> {
                location.reload();
            })
            
        })
    
    
    
    
    
        
    // Meal Star function
        mealStartBtn.addEventListener('click', () => {
            
            fetch('/storeDate', {
                method: 'POST',
            })
            .then(response => {
                if(response.ok) {
                    const mealTable = document.getElementById('mealTable');
                    mealTable.classList.remove('hidden');
                    mealStartBtn.classList.add('hidden');
                    mealStopBtn.classList.remove('hidden');
                }
            })
    
    
            const day = new Date().getDate();
            // console.log('Passing Day Query: '+day);
            day.day=3;
            
            fetch('/storeMeal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                
                body: JSON.stringify({ day }),
            })
            .then(response => {
                
                if(response.ok) {
                    
                    const currentDate = new Date();
            
                    
                    const currentDay = currentDate.getDate();
                    const currentMonth = currentDate.getMonth();
    
                    localStorage.setItem('lastCheckedDay', currentDay);
                    localStorage.setItem('lastCheckedMonth', currentMonth);
    
                    
                }
            })
            location.reload();
            populateSaveMealBtns();
        })
    }
groupFetch();




    
    function populateSaveMealBtns() {
        
            fetch('/getgroups', {
                method: "GET",
            })
            .then(response => {
                if(response.ok) {
                    return response.json();
                }
            })
            .then(group => {
                group.mealSave.forEach((data, indx) => {
                   
                    if(data === 'false' || data === null){
                    
                        const mealBtnCell = document.getElementById('mealBtnCell');
                    const mealBtnArea = document.createElement('div');
                    mealBtnArea.innerHTML = `<button class = "mealBtn" id = "mealBtn-${indx+1}">Save<button>`

                    mealBtnArea.className = 'mealBtnArea right-border';
                    mealBtnArea.id = `mealBtnArea-${indx+1}`;

                    mealBtnCell.appendChild(mealBtnArea);
                    }
                    else{
                      
                        const mealBtnCell = document.getElementById('mealBtnCell');
                    const mealBtnArea = document.createElement('div');
                    mealBtnArea.innerHTML = `<button class = "mealBtn" id = "mealBtn-${indx+1}">Edit<button>`

                    mealBtnArea.className = 'mealBtnArea right-border';
                    mealBtnArea.id = `mealBtnArea-${indx+1}`;

                    mealBtnCell.appendChild(mealBtnArea);
                    }
                    

                })
            })
        
    }

populateSaveMealBtns();


function mealSaveBtnEffect() {
    fetch('/getgroups', {
        method: "GET",
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(group => {
        group.mealSave.forEach((data, index) => {
            const mealBtns = document.getElementById(`mealBtn-${index+1}`);
            
                mealBtns.addEventListener('click', async (e) => {
              
                    e.preventDefault();
                    
                    
                    if(data === null || data === 'false') {
                     
                        const groupMembers = group.groupMembers;
                        let myMeal = [{
                            Day:Boolean,
                            Night: Boolean,
                        }];
                            groupMembers.forEach((member, idx) => {
                                
                                const chBoxD = document.getElementById(`${member.name}${index+1}d`);
                                const chBoxN = document.getElementById(`${member.name}${index+1}n`);
                                if(chBoxD && chBoxN){
                                    
                                const dVal = chBoxD.checked;
                                const nVal = chBoxN.checked;
                                // console.log(`Day Value: ${dVal} and Night Value: ${nVal}`);
                                myMeal.push({Day: dVal, Night: nVal});
                                }
                                // console.log('lenght: '+myMeal.length);                                                        
                            })
                        
                        // console.log("If is Fire, Save button Clicked Data: "+ data);
                    fetch('/mealSaveDb', {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ myMeal, index }),
                    })
                    .then(response => {
                        if(response.ok) {
                            
                        }
                    })
                    await mealBoxCheck();
                    mealBtns.textContent = 'Edit';
                    await totalMeal();
                    
                    }
                    

                    else if(data === 'true') {
                        
                                        
                        group.groupMembers.forEach(member => {
                            const chBoxD = document.getElementById(`${member.name}${index+1}d`);
                            const chBoxN = document.getElementById(`${member.name}${index+1}n`);
                            if(chBoxD && chBoxN){
                                chBoxD.disabled = false;
                                chBoxN.disabled = false;
                            }
                            
                        })
                        fetch('/mealSaveStatus', {
                            method: "POST",
                            headers: {
                                 'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ index }),
                        })
                        .then(response => {
                            if(response.ok) {
                             
                                mealBtns.textContent = 'Save';
                            }
                        })
                                            
                                            
                    }
                     location.reload();           
                                
                            })
                        })
                    })
                }          
    mealSaveBtnEffect();
    
//Disply Table Function

function populateDateAndBox() {
  
    


    fetch('/api/getInitialData')
            .then((response) => response.json())
            .then((data) => {
                if (data.success) { 

                    const groupMembers = data.groupMembers;
                    const isEqual = localStorage.getItem('isEqual');
                    
                    const mealForDate = groupMembers[0].meal;
                 
                    mealForDate.forEach((date, index) => {
                       
                        const crrday = date.day;
                        const dateCell = document.createElement('div');
                        dateCell.className = 'date-digit right-border centerAlign'
                        dateCell.textContent = crrday;
                        dateHeadCells.appendChild(dateCell);
                    }) 
                    const maxMeal = groupMembers[0].meal.length;

                    const groupMembersLeng = groupMembers.length;
                    groupMembers.forEach((member, gindx) => {
                        const meal = member.meal;
                        let mealLen = meal.length;
                        let gap = maxMeal-mealLen;
                        localStorage.setItem('isEqual', 'false');
                        for (let i = 1; i <=gap; i++) {
                                const mealRow1 = document.getElementById(`mealRow1-${member.name}`);
                            const mealRow2 = document.getElementById(`mealRow2-${member.name}`);
                            const checkBoxArea1 = document.createElement('div');
                            checkBoxArea1.className = 'date-digit right-border centerAligne';
        
                            mealRow1.appendChild(checkBoxArea1);
                            const checkBoxArea2 = document.createElement('div');
                            checkBoxArea2.className = 'date-digit right-border centerAligne';
                            
                            mealRow2.appendChild(checkBoxArea2);
                            
                                                       
                        }
                        meal.forEach((date, index) => {
                          
                        
                        const mealRow1 = document.getElementById(`mealRow1-${member.name}`);
                        const mealRow2 = document.getElementById(`mealRow2-${member.name}`);
                        const checkBoxArea1 = document.createElement('div');
                        checkBoxArea1.className = 'date-digit right-border centerAligne';
                        checkBoxArea1.innerHTML = `<input id="${member.name}${gap+index+1}d" type="checkbox" class="mealCheck-box right-border centerAligne"></input>`;
                        mealRow1.appendChild(checkBoxArea1);
                        const checkBoxArea2 = document.createElement('div');
                        checkBoxArea2.className = 'date-digit right-border centerAligne';
                        checkBoxArea2.innerHTML = `<input id="${member.name}${gap+index+1}n" type="checkbox" class="mealCheck-box right-border centerAligne"></input>`
                        mealRow2.appendChild(checkBoxArea2);

                        
                        })
                    })
                    
                    
               }
            })
        }   
        
async function mealBoxCheck() {
    fetch('/getgroups', {
        method: "GET",
    })
    .then(response => {
        if(response.ok) {
            return response.json();
        }
    })
    .then(group => {
        const maxMeal = group.groupMembers[0].meal.length;
        const mealSave = group.mealSave;
        group.groupMembers.forEach((member, index) => {
            const meal = member.meal;
                        let mealLen = meal.length;
                        let gap = maxMeal-mealLen;
            member.meal.forEach((date, i) => {
                const dBox = document.getElementById(`${member.name}${gap+i+1}d`);
                const nBox = document.getElementById(`${member.name}${gap+i+1}n`);
                
                if(mealSave[gap+i]==='true'){
                    // console.log("If is Fire Save Function Is Run Data: "+mealSave[i]);
                    dBox.classList.add('checkBox-color');
                    dBox.checked = date.Day;
                    nBox.checked = date.Night;
                    dBox.setAttribute("disabled", "disabled");
                    nBox.setAttribute("disabled", "disabled");
                    
                }
                else if(mealSave[gap+i] === 'false') {
                    // console.log("Else is Fire Edit Function Is Run Data: "+mealSave[i]);
                    dBox.classList.add('checkBox-color');
                    dBox.checked = date.Day;
                    nBox.checked = date.Night;
                    dBox.removeAttribute('disabled');
                    nBox.removeAttribute('disabled');
                  
                }
            }) 
        })
    })
}
mealBoxCheck();


async function totalMeal() {
    try {
        const response = await fetch('getgroups');
        const group = await response.json();
        group.groupMembers.forEach(member => {
            var totalMeal = 0;
            member.meal.forEach(meals => {
                // console.log(meals.Day+" ::: "+meals.Night);
                if(meals.Day === true) {
                    totalMeal++;
                    // console.log("Day "+totalMeal);
                }
                if(meals.Night === true) {
                    totalMeal++;
                    // console.log("Night "+totalMeal);
                }
            })
            const totalMealCell = document.getElementById(`totalMeal-${member.name}`);
            totalMealCell.textContent = totalMeal;
        })
    } catch (error) {
        console.log(error);
    }
}

totalMeal();

        function flagFetch() {
            fetch('/flag', {
                method: "POST",
            })
            .then(response => {
                if(response.ok) {
                    
                    return response.json();
                }
            })
            .then(group => {
                const data = group.mealStartDate;
                const mealStartBtn = document.getElementById(`${group.groupName}start`);
                const mealStopBtn = document.getElementById(`${group.groupName}stop`);
                
                if(data.day!==null){
                    
                    populateDateAndBox();
                    const mealTable = document.getElementById('mealTable');
                    mealTable.classList.remove('hidden');
                    mealStartBtn.classList.add('hidden');
                    mealStopBtn.classList.remove('hidden');
                }
                else{
                    
        
                    const mealTable = document.getElementById('mealTable');
                    mealTable.classList.add('hidden');
        
                    mealStartBtn.classList.remove('hidden');
                    mealStopBtn.classList.add('hidden');
                }
            })
        }
        
        flagFetch();

    }



   else if(currPath === '/spendmoney' || currPath === '/seeSpendList') {
        async function createSpendTable() {
            try {
                const response = await fetch('/getgroups');
            const group = await response.json();
            group.groupMembers[0].meal.forEach((meals,index) => {
                const tableBody = document.getElementById('spend-tableBody');
                const newRow = tableBody.insertRow();
                const dateCell = newRow.insertCell(0);
                const depositCell = newRow.insertCell(1);
                dateCell.textContent = meals.day;
                dateCell.className = 'dateCell';
                newRow.className = 'spendRow';
                depositCell.className = 'spendCell';
                
                const depositMoneyArea = document.createElement('div');
                depositMoneyArea.id = `spendAmountArea-${group.groupMembers[0].name}${index+1}`;
                depositMoneyArea.className = 'spendAmountMoneyArea';
                const depositBtnArea = document.createElement('div');
                if(currPath ==='/spendmoney'){
                    
               
                depositBtnArea.className = 'depositBtnsArea';

                const depositBtns = document.createElement('button');
                depositBtns.id = `spendBtn-${group.groupMembers[0].name}${index+1}`;
                depositBtns.className = 'spendBtns';
                depositBtns.textContent = 'Add';

                const inputDiv = document.createElement('div');
                inputDiv.innerHTML = `<input type= "number" placeholder= "Enter Amount" id="spendInput-${group.groupMembers[0].name}${index+1}">
                <button id="spendSave-${group.groupMembers[0].name}${index+1}">Save</button>`
                inputDiv.id= `spendInputArea-${group.groupMembers[0].name}${index+1}`;
                inputDiv.className = 'hidden';

                depositBtnArea.appendChild(depositBtns);
                
                depositCell.appendChild(inputDiv);
                
                
                }
                depositCell.appendChild(depositMoneyArea);
                depositCell.appendChild(depositBtnArea);
            })
            } catch (error) {
                console.log(error);
            }
        }
        createSpendTable();


        
            
            async function spendBtnsFun() {
                if(currPath === '/spendmoney'){
                const response = await fetch('/getgroups');
                const group = await response.json();
                group.groupMembers[0].meal.forEach((meals, index) => {
                    const spendBtns = document.getElementById(`spendBtn-${group.groupMembers[0].name}${index+1}`);
                    spendBtns.addEventListener('click', async () => {
                        const inputArea = document.getElementById(`spendInputArea-${group.groupMembers[0].name}${index+1}`);
                        inputArea.classList.remove('hidden');
                        spendBtns.classList.add('hidden');
                        const spendSave = document.getElementById(`spendSave-${group.groupMembers[0].name}${index+1}`);
                        spendSave.addEventListener('click', async () => {
                            const amount = document.getElementById(`spendInput-${group.groupMembers[0].name}${index+1}`).value;
                            fetch('/addSpend', {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({index, amount}),
                            })
                            .then(response => {
                                if(response.ok) {
                                    inputArea.classList.add('hidden');
                                    spendBtns.classList.remove('hidden');
                                }
                            })
                            await populateSpend();
                        })
                    })
                })
            }
            
        }
        spendBtnsFun();
        

        async function populateSpend() {
            const response = await fetch('/getgroups');
            const group = await response.json();
            group.spendMoney.forEach((amount, index) => {
                const spendArea = document.getElementById(`spendAmountArea-${group.groupMembers[0].name}${index+1}`);
                spendArea.textContent = amount;
            })
        }
        populateSpend();
    }


    else if(currPath === '/'){
      
        async function populateHome() {
            try {
                const mydiv = document.createElement('div');
                const mealValueArea = document.getElementById('mealValueArea');
                mydiv.classList.add('loader');
                mealValueArea.appendChild(mydiv);
                const response1 = await fetch('/getgroups');
            const group = await response1.json();
           
            const response2 = await fetch('/getUser');
            const user = await response2.json();

            

            const totalMeal = group.totalMeal;
            const totalDeposit = group.totalDeposit;
            const totalSpend = group.totalSpend;

            
            const pMealAmount = document.getElementById('pMealAmount');
            const mealCharge = document.getElementById('mcharge');
            const totalDepositContainer = document.getElementById('damount');
            const totalSpendContainer = document.getElementById('samount');
            const totalMealContainer = document.getElementById('tmeal');

            const yourMealAmount = parseFloat((totalSpend/totalMeal)*user.tmeal);
           
            mealCharge.textContent = parseFloat(totalSpend/totalMeal);
            totalDepositContainer.textContent = totalDeposit;
            totalSpendContainer.textContent = totalSpend;
            totalMealContainer.textContent = totalMeal;
            pMealAmount.textContent = yourMealAmount;
            mydiv.classList.add('hidden');

            
                if(user.Admin === true) {
                
                    const editArea = document.getElementById("editArea");
                    editArea.classList.remove("hidden");
                }
                else{
                    editArea.classList.add("hidden");
                }
            

            } catch (error) {
                console.log(error);
            }

        }
        populateHome();
        const upDownBtn = document.getElementById('upDownBtn');
    const listContainer = document.getElementById('mealValueArea');
    const listItems = document.querySelectorAll('#myList li');

    let expanded = false;
    let height;
    upDownBtn.addEventListener('click', function() {
    
        if (expanded) {
            if (window.innerWidth < 768) {
                listContainer.style.maxHeight = '40px';
                height = 40;
            } else {
                listContainer.style.maxHeight = '69px';
                height = 69
            }
            upDownBtn.innerHTML = `<i class="fa-solid fa-caret-down" style="color: rgb(238 255 219);  font-size: 3rem; position: relative; top: -15px"></i>`
            
        } else {
            listContainer.style.maxHeight = `${listItems.length * height}px`;
            upDownBtn.innerHTML = `<i class="fa-solid fa-caret-up" style="color: rgb(238 255 219);  font-size: 3rem; position: relative; top: -10px"></i>`
        }
        expanded = !expanded;
    });

    window.addEventListener('resize', function() {
        if (!expanded) {
            if (window.innerWidth < 768) {
                listContainer.style.maxHeight = '40px';
                height = 40;
            } else {
                listContainer.style.maxHeight = '69px';
                height = 69;
            }
        }
    });


    const currentImageContainer = document.querySelector('.hero.current');
    const nextImageContainer = document.querySelector('.hero.next');
    const hero = document.querySelector('.hero');
    const images = [
        'url("img1.png")',
        'url("img2.png")',
        'url("img3.png")',
        'url("img4.jpg")',
        'url("img5.png")',
        'url("img6.png")'
    ];
    let currentIndex = 0;

    function changeBackgroundImage() {
        const nextIndex = (currentIndex + 1) % images.length;
        const currentImageSlide = document.createElement('div');
        const nextImageSlide = document.createElement('div');

        currentImageSlide.classList.add('image-slide');
        nextImageSlide.classList.add('image-slide');

        currentImageSlide.style.backgroundImage = images[currentIndex];
        nextImageSlide.style.backgroundImage = images[nextIndex];
        nextImageSlide.style.right = '100%';

        hero.appendChild(currentImageSlide);
        hero.appendChild(nextImageSlide);

        setTimeout(() => {
            nextImageSlide.style.right = '0%';
            currentImageSlide.style.right = '-100%';
        }, 100); // Small delay to ensure the transition happens

        setTimeout(() => {
            hero.style.backgroundImage = images[nextIndex];
            hero.removeChild(currentImageSlide);
            hero.removeChild(nextImageSlide);
            currentIndex = nextIndex;
        }, 1100); // Match this duration with the CSS transition duration
    }

    setInterval(changeBackgroundImage, 5000); // Change image every 5 seconds
    changeBackgroundImage(); // Initial call to set the first image
    }


else if(window.location.pathname ==='/seeMeal'){

    function populateDateAndBox() {

        
    
    
        fetch('/api/getInitialData')
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) { 

                        const groupMembers = data.groupMembers;
                        const isEqual = localStorage.getItem('isEqual');
                        const dateHeadCells = document.getElementById('dateHeadCells')
                        const mealForDate = groupMembers[0].meal;

                        mealForDate.forEach((date, index) => {

                            const crrday = date.day;
                            const dateCell = document.createElement('div');
                            dateCell.className = 'date-digit right-border centerAlign'
                            dateCell.textContent = crrday;
                            dateHeadCells.appendChild(dateCell);
                        }) 
                        const maxMeal = groupMembers[0].meal.length;
    
                        const groupMembersLeng = groupMembers.length;
                        groupMembers.forEach((member, gindx) => {
                            const meal = member.meal;
                            let mealLen = meal.length;
                            let gap = maxMeal-mealLen;
                            localStorage.setItem('isEqual', 'false');
                            for (let i = 1; i <=gap; i++) {
                                    const mealRow1 = document.getElementById(`mealRow1-${member.name}`);
                                const mealRow2 = document.getElementById(`mealRow2-${member.name}`);
                                const checkBoxArea1 = document.createElement('div');
                                checkBoxArea1.className = 'date-digit right-border centerAligne';
            
                                mealRow1.appendChild(checkBoxArea1);
                                const checkBoxArea2 = document.createElement('div');
                                checkBoxArea2.className = 'date-digit right-border centerAligne';
                                
                                mealRow2.appendChild(checkBoxArea2);
                                
                                                           
                            }
                            meal.forEach((date, index) => {
                                
                            
                            const mealRow1 = document.getElementById(`mealRow1-${member.name}`);
                            const mealRow2 = document.getElementById(`mealRow2-${member.name}`);
                            const checkBoxArea1 = document.createElement('div');
                            checkBoxArea1.className = 'date-digit right-border centerAligne';
                            const cellD = document.createElement('div');
                            const cellN = document.createElement('div');
                            cellD.classList.add(date.Day ? 'present' : 'absent');
                            cellN.classList.add(date.Night ? 'present' : 'absent');
                            cellD.id = `${member.name}${gap+index+1}dx`;
                            cellN.id = `${member.name}${gap+index+1}nx`;
                            checkBoxArea1.appendChild(cellD);

                            
                            mealRow1.appendChild(checkBoxArea1);
                            const checkBoxArea2 = document.createElement('div');
                            checkBoxArea2.className = 'date-digit right-border centerAligne';
                            checkBoxArea2.appendChild(cellN);
                            mealRow2.appendChild(checkBoxArea2);
                            
                            })
                        })
                        
                        
                   }
                })
            }   
populateDateAndBox();
async function stylePersonalRow(){
    const response2 = await fetch('/getUser');
            const user = await response2.json();
            const row = document.getElementById(`mealTableRow-${user.name}`);
            row.classList.add("pRowStyle");
}
stylePersonalRow();

async function notSaveStyle(){
    const response = await fetch('/getgroups');
    const group =  await response.json();
    group.mealSave.forEach((value, index) => {
        if(value === "null"){
            group.groupMembers.forEach(member=>{
                const maxMeal = group.groupMembers[0].meal.length;
                const meal = member.meal;
                            let mealLen = meal.length;
                            let gap = maxMeal-mealLen;
                const boxD = document.getElementById(`${member.name}${index+1}dx`);
                const boxN = document.getElementById(`${member.name}${index+1}nx`);
                const cretBox = document.createElement('div');

                cretBox.style.height = "25px";
                cretBox.style.width = "25px";
                cretBox.style.backgroundColor = "white";
                const newCretBox = cretBox;

                boxD.classList.remove('absent');
                boxN.classList.remove('absent');
                boxD.append(cretBox);
                boxN.appendChild(newCretBox);
                
                
            })
        }
    })
}
notSaveStyle();

async function totalMeal() {
    try {
        const response = await fetch('getgroups');
        const group = await response.json();
        group.groupMembers.forEach(member => {
            var totalMeal = 0;
            member.meal.forEach(meals => {
                // console.log(meals.Day+" ::: "+meals.Night);
                if(meals.Day === true) {
                    totalMeal++;
                    // console.log("Day "+totalMeal);
                }
                if(meals.Night === true) {
                    totalMeal++;
                    // console.log("Night "+totalMeal);
                }
            })
            const totalMealCell = document.getElementById(`totalMeal-${member.name}`);
            totalMealCell.textContent = totalMeal;
        })
    } catch (error) {
        console.log(error);
    }
}

totalMeal();
}
