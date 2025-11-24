function convertFile() {
    const fileInput = document.getElementById("fileInput");
    const format = document.getElementById("formatSelect").value;

    if (!fileInput.files.length) {
        alert("Please upload a file first!");
        return;
    }

    const file = fileInput.files[0];
    const fileName = file.name.split(".")[0];

    const blob = new Blob(["Converted File Content"], { type: "text/plain" });

    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = fileName + "." + format;
    downloadLink.style.display = "block";
    downloadLink.textContent = "Download " + fileName + "." + format;
}
