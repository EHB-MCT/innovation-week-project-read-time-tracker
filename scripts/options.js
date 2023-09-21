function PageLoaded() {
    syncOptions();

    //Update options on form save
    document.getElementById('options-form').addEventListener('submit', saveOptions);
}

const syncOptions = () => {
    chrome.storage.sync.get(
        {
            option: 200,
            color: '16d05d', //default green
        },
        (items) => {
            document.getElementById('readTimeSelect').value = items.option;
            document.getElementById('colorSelect').value = items.color;
        }
    );
};

//save options
const saveOptions = (e) => {
    e.preventDefault();
    const optionValue = document.getElementById('readTimeSelect').value;
    const colorValue = document.getElementById('colorSelect').value;

    chrome.storage.sync.set(
        {
            option: optionValue,
            color: colorValue,
        },
        () => {
            const status = document.getElementById('status');
            status.innerHTML = 'Your changes have been saved';
            setTimeout(() => {
                status.innerHTML = '';
            }, 10750);
        }
    );
};

//load any options already saved
document.addEventListener('DOMContentLoaded', PageLoaded);
