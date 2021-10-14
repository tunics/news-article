const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = "c9f5695f138d2189d763edca7ccee474";
const lang = "en";
const url =
    "https://www.androidauthority.com/samsung-galaxy-s21-ultra-vs-iphone-13-pro-max-camera-test-3034358/"; //apagar

// Async POST
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

function getAnalysis(url, key, lang) {
    const formdata = new FormData();
    formdata.append("key", key);
    formdata.append("url", url);
    formdata.append("lang", lang); // 2-letter code, like en es fr ...

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    const response = fetch(
        "https://api.meaningcloud.com/sentiment-2.1",
        requestOptions
    )
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            return data;
        })

        .catch((error) => console.log("error", error));
}

function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById("name").value;
    Client.checkForName(formText);

    getAnalysis(formText, apiKey, lang);

    postData("http://localhost:8081/addEntry", {
        message: formText,
    });

    console.log("::: Form Submitted :::");
    fetch("http://localhost:8081/addEntry")
        .then((res) => res.json())
        .then(function (res) {
            document.getElementById("results").innerHTML = res.message;
        });
}

export { handleSubmit };
