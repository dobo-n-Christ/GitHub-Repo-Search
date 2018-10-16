'use strict';

function getUserHandle() {
    const searchText = $('#searchText').val();
    return searchText;
}

function generateRepoElement(item) {
    return `
    <p>${item.name}</p>
    <a href="${item.html_url}"></a>
    `;
}

function generateRepoDataString(array) {
    const repos = array.map((repo) => generateRepoElement(repo));
    return repos.join('');
}

function displayRepoData(data) {
    const repoDataString = generateRepoDataString(data);
    $('.js-results').html(repoDataString);
}

function getRepoData() {
    const userHandle = getUserHandle();
    fetch(`https://api.github.com/users/${userHandle}/repos`)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        else {
            throw new Error(response.message);
        }
    }).then(responseJson => displayRepoData(responseJson))
    .catch(err => {$('.js-results').text(`Something went wrong: ${err.message}`);
});
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        getRepoData();
        $('#searchText').val('');
    })
}

$(watchForm);