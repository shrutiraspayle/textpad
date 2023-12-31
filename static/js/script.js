function ajax(path, method = 'GET') {
    return new Promise(function (resolve, reject) {
        const xhttp = new XMLHttpRequest();
        xhttp.onload = function() {
            if (this.status === 200) {
                resolve(this.responseText);
            } else {
                reject(this.status);
            }
        };
        xhttp.open(method, path);
        xhttp.send();
    });
}

const editor = document.getElementById('editor');

function new_file() {
    editor.reset();
}

async function open_file() {
    const filename = prompt('Enter file name to open');
    try {
        const fileContent = await ajax('/open_file/' + filename);
        editor.elements.content.value = fileContent;
        editor.elements.filename.value = filename;
    } catch (error) {
        if (typeof error === 'number') {
            alert(`ERROR: File "${filename}" not found!`);
        }
    }
}
