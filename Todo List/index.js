function loadApp() {
    const innerHTMLDataString = localStorage.getItem('empList');
    if (innerHTMLDataString !== null) {
        const innerHTMLDataParsed = JSON.parse(innerHTMLDataString);
        const list = getElement('empList');
        list.innerHTML = (innerHTMLDataParsed);
    }

    const innerHTMLDataString1 = localStorage.getItem('newDiv');
    if (innerHTMLDataString1 !== null) {
        const innerHTMLDataParsed1 = JSON.parse(innerHTMLDataString1);
        const list = getElement('newDiv');
        list.innerHTML = (innerHTMLDataParsed1);
    }
}

function add() {
    const data = getElement("item");
    const cBtn = getElement("cbtn");
    console.log("Cancel button---->>>>>>>", cBtn);
    console.log("--->>>>>>>>", data.value);
    const uniqueID = Date.now();
    const rowHTML = `<div id="${uniqueID}" style = "width:auto; display:flex;min-height:80px;height:auto;font-size:18px; background-color:#4E4D5C;margin-top:10px;">
    <div style = "color:white;margin:25px;  word-wrap: break-word;" id = "${uniqueID + '-item'}" class = "wrapdata">${data.value}</div>
    <span style = "display:flex;align-items: center; justify-content:flex-end; flex:1;">
    <button class = "dBtn" style = " outline: none;" onclick="deleteRow(${uniqueID})" id = "${uniqueID + '-dBtn'}" ><div class="fa fa-times" style = "margin-left:10px; color:#E16659;font-size:30px;"></div></button>
    <button class = "dBtn" style = " outline: none;" onclick = "Edit(${uniqueID})"><div class="fa fa-pencil" style = "margin-left:10px; color:#F7F878; font-size:30px;"></div></button>
    <button class = "dBtn" style = " outline: none;" onclick = "showOnNewDiv(${uniqueID})"><div class = "fa fa-check" style =" margin-left:10px;color:#5FD4A0;font-size:30px"></div></button>
    </span>
    </div>`;
    const list = getElement('empList');
    list.innerHTML += (rowHTML);
    localStorage.setItem('empList', JSON.stringify(list.innerHTML));
    data.value = '';
    // localStorage.clear();
}

function deleteRow(rowId) {
    console.log("I am in Delete", rowId);
    const list = getElement('empList');
    list.removeChild(getElement(rowId));
    localStorage.setItem('empList', JSON.stringify(list.innerHTML));
}

function Edit(rowId) {
    console.log("I am in Edit", rowId);
    getElement('item').value = getElement(rowId + '-item').innerText;
    const cBtn = getElement("cbtn");
    const sBtn = getElement("sbtn");
    console.log("in adit", cBtn, sBtn);
    getElement("cbtn").style.display = "initial";
    getElement("sbtn").style.display = "initial";
    getElement("abtn").style.display = "none";
    cBtn.onclick = () => cancel(rowId);
    sBtn.onclick = () => onSave(rowId);
}

function showOnNewDiv(rowId) {
    var data = document.getElementById(rowId + '-item');
    console.log("Data from old div", data);
    const rowHTML = `<div id="${rowId + '-complete'}" style = "width:auto; display:flex;min-height:80px;height:auto;font-size:18px; background-color:#571845;margin-top:10px;">
    <div style = "color:white;margin:25px;  word-wrap: break-word;" id = "${rowId + '-item'}" class = "wrapdata">${data.innerHTML}</div>
    <span style = "display:flex;align-items: center; justify-content:flex-end; flex:1;">
    <button class = "uBtn" style = " outline: none;" onclick="returnToOldDiv(${rowId})" id = "${rowId + '-uBtn'}" ><div class="fa fa-undo" style = "margin-left:10px; color:#E16659;font-size:30px;"></div></button>
     </span>
    </div> `;
    const newList = getElement('newDiv');
    newList.innerHTML += (rowHTML);
    localStorage.setItem('newDiv', JSON.stringify(newList.innerHTML));
    const oldList = getElement('empList');
    oldList.removeChild(getElement(rowId));
    localStorage.setItem('empList', JSON.stringify(oldList.innerHTML));
}

function returnToOldDiv(rowId) {
    var data = document.getElementById(rowId + '-item');
    const rowHTML = `<div id="${rowId}" style = "width:auto; display:flex;min-height:80px;height:auto;font-size:18px; background-color:#4E4D5C;margin-top:10px;">
    <div style = "color:white;margin:25px;  word-wrap: break-word;" id = "${rowId + '-item'}" class = "wrapdata">${data.innerHTML}</div>
    <span style = "display:flex;align-items: center; justify-content:flex-end; flex:1;">
    <button class = "dBtn" style = " outline: none;" onclick="deleteRow(${rowId})" id = "${rowId + '-dBtn'}" ><div class="fa fa-times" style = "margin-left:10px; color:#E16659;font-size:30px;"></div></button>
    <button class = "dBtn" style = " outline: none;" onclick = "Edit(${rowId})"><div class="fa fa-pencil" style = "margin-left:10px; color:#F7F878; font-size:30px;"></div></button>
    <button class = "dBtn" style = " outline: none;" onclick = "showOnNewDiv(${rowId})"><div class = "fa fa-check" style =" margin-left:10px;color:#5FD4A0;font-size:30px"></div></button>
    </span>
    </div> `;
    const oldList = getElement('empList');
    oldList.innerHTML += (rowHTML);
    localStorage.setItem('empList', JSON.stringify(oldList.innerHTML));
    const newList = getElement('newDiv');
    newList.removeChild(getElement(rowId + '-complete'));
    console.log("List1----->>>>>>>>>>", newList);
    localStorage.setItem('newDiv', JSON.stringify(newList.innerHTML));

}

function getElement(id) {
    return document.getElementById(id)
}

function cancel(rowId) {
    getElement('item').value = '';
    getElement("cbtn").style.display = "none";
    getElement("sbtn").style.display = "none";
    getElement("abtn").style.display = "initial";
}

function onSave(rowId) {
    console.log("I am in save", rowId);
    const list = getElement('empList');
    getElement(rowId + '-item').innerHTML = getElement('item').value;
    console.log("------onSave>>>>>>>>>", localStorage);
    localStorage.setItem('empList', JSON.stringify(list.innerHTML));
    getElement('item').value = '';
    getElement("abtn").style.display = "initial";
    getElement("cbtn").style.display = "none";
    getElement("sbtn").style.display = "none";
}



