function PageLoaded(){
    syncOptions();

    //Update options on form save
    document.getElementById('options-form').addEventListener('submit'
    , saveOptions);
}

const syncOptions = () => {
    chrome.storage.sync.get({
        option:200,
    },(items) => {
        document.getElementById('readTimeSelect').value = items.option;
    });
}

//save options
const saveOptions = (e) => {
    e.preventDefault();
    const optionValue = document.getElementById('readTimeSelect').value;
    
    chrome.storage.sync.set({
        option: optionValue,
    }, () => {
        const status = document.getElementById('status');
        status.innerHTML += 'your changes have been saved';
        setTimeout(() => {
            status.innerHTML = '';
        }, 750);
    });
}

//load any options already saved
document.addEventListener('DOMContentLoaded', PageLoaded);
