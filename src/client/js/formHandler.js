import { result } from "lodash";

const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const lang = "en";
const results = document.getElementById("results").firstElementChild;
const resultList = document.getElementById("result-list");
const resultsTxt = document.getElementById("results-title");

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

const getAnalysis = async (url, key, lang) => {
    const formdata = new FormData();
    formdata.append("key", key);
    formdata.append("url", url);
    formdata.append("lang", lang); // 2-letter code, like en es fr ...

    const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
    };

    const response = await fetch(baseURL, requestOptions);

    try {
        const allData = await response.json();
        return allData;
    } catch (error) {
        console.log("error", error);
    }
};

const updateUI = async () => {
    fetch("http://localhost:3000/addEntry")
        .then((res) => res.json())
        .then(function (res) {
            results.style.display = "block";
            resultsTxt.innerHTML = "Analysis Results: ";
            resultList.innerHTML = "";

            for (let key in res) {
                resultList.insertAdjacentHTML(
                    "beforeend",
                    `<li><span class="topic">${key}:</span>  ${res[key]}</li>`
                );
            }
        });
};

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("name").value;

    // Check for a valid url
    if (Client.isUrl(formText)) {
        fetch("http://localhost:3000/key")
            .then((res) => res.json())
            .then(function (res) {
                getAnalysis(formText, res.key, lang)
                    .then(function (data) {
                        postData("http://localhost:3000/addEntry", {
                            agreement: data.agreement,
                            confidence: data.confidence,
                            irony: data.irony,
                            subjectivity: data.subjectivity,
                        });
                        console.log("::: Form Submitted :::");
                    })
                    .then(updateUI);
            });
    } else {
        alert("Please, enter a valid URL.");
    }
}

export { handleSubmit };
