const baseURL = "https://api.meaningcloud.com/sentiment-2.1";
const apiKey = "c9f5695f138d2189d763edca7ccee474";
const lang = "en";
const resultsTxt = document.getElementById("results");
const agreementTxt = document.getElementById("agreement");
const confidenceTxt = document.getElementById("confidence");
const ironyTxt = document.getElementById("irony");
const subjectivityTxt = document.getElementById("subjectivity");

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
    fetch("http://localhost:8081/addEntry")
        .then((res) => res.json())
        .then(function (res) {
            resultsTxt.innerHTML = "Analysis Results: ";
            agreementTxt.innerHTML = "Agreement: " + res.agreement;
            confidenceTxt.innerHTML = "Confidence: " + res.confidence;
            ironyTxt.innerHTML = "Irony: " + res.irony;
            subjectivityTxt.innerHTML = "Subjectivity: " + res.subjectivity;
        });
};

function handleSubmit(event) {
    event.preventDefault();

    let formText = document.getElementById("name").value;

    // Check for a valid url
    if (Client.isUrl(formText)) {
        // prettier-ignore
        getAnalysis(formText, apiKey, lang)
            .then(function(data) {
                postData("http://localhost:8081/addEntry", {
                    agreement: data.agreement,
                    confidence: data.confidence,
                    irony: data.irony,
                    subjectivity: data.subjectivity,
                });
            console.log("::: Form Submitted :::");
            })
            .then(updateUI)
    } else {
        alert("Please, enter a valid URL.");
    }
}

export { handleSubmit };
