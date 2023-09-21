const syncOptions = () => {
    chrome.storage.sync.get({
        option:null,
    },(items) => {
        document.getElementById('option_key').value = items.option;
    });
}

//load any options already saved
document.addEventListener('DOMContentLoaded', syncOptions);

//save options
const saveOptions = (e) => {
    e.preventDefault();
    const optionValue = document.getElementById('option_key').value;
    
    chrome.storage.sync.set({
        option: optionValue,
    }, () => {
        const status = document.getElementById('status');
        status.textContent = 'your changes have been saved';
        setTimeout(() => {
            status.textContent = '';
        }, 750);
    });
}

//Update options on form save
document.getElementById('options-form').addEventListener('submit'
, saveOptions);