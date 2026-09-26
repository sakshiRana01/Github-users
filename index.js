const searchBtn = document.querySelector(".search-btn");
const container = document.querySelector(".user-portfolio");

async function getUserDetails(userName) {
  const url = `https://api.github.com/search/users?q=${userName}`;
  try {
    let response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("FAILED TO FETCH DATA:", error);
  }
}

function creatUserLi(key, value) {
  const card = document.createElement("li");
  card.classList.add("user-card");

  const image = document.createElement("img");
  image.src = value.avatar_url;

  const name = document.createElement("h3");
  name.textContent = value.login;

  const link = document.createElement("a");
  link.href = value.html_url;
  link.textContent = "View Profile";

  card.append(image, name, link);
  container.append(card);
}
function deleteCurrentData() {
  document.querySelector(".user-portfolio").innerHTML = "";
}
function creatUserList(list) {
  console.log("list", list);
  if (list.length == 0) {
    const card = document.createElement("li");
    const name = document.createElement("h3");
    name.textContent = "NO DATA!";
    card.append(name);
    container.append(card);
  } else {
    Object.entries(list).forEach(([Key, value]) => {
      creatUserLi(Key, value);
    });
  }
}

searchBtn.addEventListener("click", function (e) {
  deleteCurrentData();
  const inputValue = document.querySelector("#search-field").value;
  getUserDetails(inputValue).then((data) => {
    console.log(data);
    creatUserList(data.items);
  });
});
