function rec() {
    if (!('webkitSpeechRecognition' in window)) {
        console.error('Web Speech API is not supported by this browser.');
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        console.log(speechToText);
        searchByTitle.value = speechToText;
    };

    recognition.start();
}
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
function channels_list() {
    fetch('http://localhost:4040/channels')
        .then(response => response.json())
        .then(channels => {
            let channelsList = document.querySelector('#channels-list');
            for (let channel of channels) {
                channelsList.innerHTML += `<li class="channel" data-id="1">
                            <a href="/${channel.id}">
                                <img src="avatar/${channel.avatar}" alt="channel-icon"
                                    width="30px" height="30px">
                                    <span>${channel.username}</span>
                            </a>
                        </li>`  ;
            }
        })
}
function videos_list() {
    fetch(`http://localhost:4040/search-videos/${getCookie('searchByTitle')}`)
        .then(response => response.json())
        .then(videos => {
            let videosList = document.querySelector('#videos-list');
            for (let video of videos) {
                datalist.innerHTML += `<option value="${video.title}">`;
                fetch(`http://localhost:4040/channels-info/${video.userId}`)
                    .then(response => response.json())
                    .then(channel => {
                        fetch(`http://localhost:4040/get-video-size/${video.fileName}`)
                            .then(response => response.json())
                            .then(data => {
                                videosList.innerHTML += `<li class="iframe">
                                    <video src="video/${video.fileName}" controls=""></video>
                                    <div class="iframe-footer">
                                        <img src="avatar/${channel.avatar}" alt="channel-icon">
                                        <div class="iframe-footer-text">
                                            <h2 class="channel-name">${video.title}</h2>
                                            <h3 class="iframe-title">${channel.username}</h3>
                                            <time class="uploaded-time">${video.dateUploaded} | ${video.time}</time>
                                            <a class="download" href="video/${video.fileName}" download>
                                                <span>${data.size}</span>
                                                <img src="./img/download.png">
                                            </a>
                                        </div>
                                    </div>
                                </li>`;
                            })
                    })
            }
        })
}
function avatar_image() {
    let token = getCookie("token");
    fetch(`http://localhost:4040/admin/${token}`)
        .then(response => response.json())
        .then(admin => { avatarImage.src = 'avatar/' + admin.avatar })
}

channels_list();
videos_list();
avatar_image();
