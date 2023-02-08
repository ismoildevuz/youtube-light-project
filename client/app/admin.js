function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function updateTitle(fileName) {
    let newTitle = document.getElementById(`${fileName}`).value;
    data = { title: newTitle }
    fetch(`http://localhost:4040/admin/update_title/${fileName}`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    location.reload();
}
function deleteVideo(fileName) {
    if (confirm('Are you sure')) {
        fetch(`http://localhost:4040/admin/delete_video/${fileName}`, {
            method: "DELETE"
        })
        location.reload();
    }
}

function videos_list() {
    fetch(`http://localhost:4040/admin/videos/${getCookie('token')}`)
        .then(response => response.json())
        .then(videos => {
            let videosList = document.querySelector('#videos-list');
            for (let video of videos) {
                videosList.innerHTML += `<li class="video-item">
                        <video src="video/${video.fileName}" controls=""></video>
                        <input type="text" class="content" id="${video.fileName}" onchange="updateTitle('${video.fileName}')" value="${video.title}"></input>
                        <button onclick="deleteVideo('${video.fileName}')"><img src="./img/delete.png" width="25px" alt="upload" class="delete-icon" data-id="2"></button>
                    </li>`;
            }
        })
}

videos_list();