const searchButon = document.getElementById("search");
const profileButton = document.getElementById("checkProfile");
const input = document.querySelector("input");

const avtar = document.querySelector("img");
const name = document.getElementById("name");
const username = document.getElementById("username");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers-number");
const following = document.getElementById("following-number");
const repos = document.getElementById("repos");
let container = document.getElementById("profile-cotainer");
let initialDiv = document.getElementById('initial-div')

const url = "https://api.github.com/users";

const createProfile = (profile) => {
  return `
  <div class="card">
        <div class="profile">
          <img id="avtar" src="${profile.avatar_url}" alt="avtar" />
          <div class="user-name">
            <h3 id="name">${profile.name}</h3>
            <p id="username">${profile.login}</p>
            <a target="_blank" href="${profile.html_url}"><button id="checkProfile">Check Profile</button></a>
          </div>
        </div>
        <div class="about">
          <h3>About</h3>
          <p id="bio">${profile.bio}</p>
        </div>
        <div class="info">
          <div class="followers">
            <h3>Followers</h3>
            <p id="followers-number">${profile.followers}</p>
          </div>
          <div class="following">
            <h3>Following</h3>
            <p id="following-number">${profile.following}</p>
          </div>
          <div class="repositiries">
            <h3>Repos</h3>
            <p id="repos">${profile.public_repos}</p>
          </div>
        </div>
      </div>
  `;
};

const getUserData = async () => {
  let username = input.value;
  try {
    initialDiv.innerHTML = 'Loading......'
    let user = await fetch(`${url}/${username}`);
    let data = await user.json();
    if(data.login){
      initialDiv.innerHTML = ""
      container.innerHTML = createProfile(data)

    }else{
      initialDiv.innerHTML = "User not found....."
      initialDiv.style.color = "red"
      container.innerHTML = ""
    }
  } catch (error) {
    console.log("Error while fetching the data", error);
  }
};

searchButon.addEventListener("click", getUserData);
