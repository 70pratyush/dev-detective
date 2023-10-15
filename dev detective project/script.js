const get = (param) => document.getElementById(`${param}`);
const api = "https://api.github.com/users/"
const input = get("input");
const search = get("submit");
const noResult = get("no-results");
const avatar = get("avatar");
const userName = get("name");
const userID = get("user");
const bio = get("bio");
const repo = get("repos");
const followers = get("followers");
const following = get("following");
const userLocation = get("location");
const page = get("page");
const twitter = get("twitter");
const company = get("company");

const searchbar = document.querySelector(".searchbar-container");
const profilecontainer = document.querySelector(".profile-container");


// EVENT LISTNERS 1- searching on clicking search btn
search.addEventListener("click", function() {
    if(input.value !== ""){
        getUserData(api + input.value)
    }
});

// EVENT LISTNERS 2- searching on pressing enter
input.addEventListener("keydown", evnt => {

    // error:since evnt.key === "enter" is not working on my device i've to use keycode 13 for enter
    // resolve:i was stupid enough to use small e in Enter
    if (evnt.key === "Enter" || evnt.keyCode == 13) {
        if(input.value !== ""){
            getUserData(api + input.value)
        }
    }
}, false);

// EVENT LISTNERS 3- hiding no result after start typing
input.addEventListener("input", () => {
    noResult.style.display = "none";
})





// api call 
async function getUserData(apiCall) {
    fetch(apiCall)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      updatingUI(data);
    })
}

// updating ui using the fetched 
function updatingUI(data){
    if(data.message !== "Not Found"){
        noResult.style.display = "none";
        avatar.src = data.avatar_url;
        userName.innerText = data.name === "null" ? data.login : data.name;
        userID.innerText = `@${data.login}`
        userID.href = data.html_url
        bio.innerText = data.bio;
        repo.innerText = data.public_repos;
        followers.innerText = data.followers;
        following.innerText = data.following;
        userLocation.innerText = data.location === "null" ? "" : data.location;
        page.href = data.blog !== "" ? data.blog : "#";
        twitter.innerText = data.twitter_username === "null" ? "" : data.twitter_username;
        company.innerText = data.company !== "null" ? data.company : "No Company";
        searchbar.classList.toggle("active");
        profilecontainer.classList.toggle("active");

        return;
    }

    noResult.style.display = "block";
}

function initialise() {
    getUserData(api + "70pratyush")
}

initialise()