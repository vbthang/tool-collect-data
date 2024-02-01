import {data} from './FetchData.js';



btn.addEventListener('click', () => {
    const btn = document.querySelector('#btn')
    console.log(btn);
    db = {}
    console.log("Here");
    for(const [key, value] of Object.entries(data)){
        console.log(key)
        db[key] = document.getElementById(key).value;
    }

    console.log(db);
})