function fetchin() {
  fetch("https://dev.foleyprep.com/interview/2023/november/task1")
    .then((response) => {
      if (!response.ok) {
        throw new Error("failed" + response);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      friyay(data);
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("report").innerText = "Failed to load data.";
    });
}

function friyay(data) {
  const test = data.tests[2];
  const record = data.records[4];
  const heatmap = data.records.forEach((record) => {
    if (record.test === "New 00") {
      console.log(record.responses);
    }
  });
  console.log("test", test, "record", record);
  if (!test || !record) {
    document.getElementById("report").innerHTML =
      "<p>Test or record not found.</p>";
    return;
  }

  let content = `<h1>Test Report: ${test.id}</h1>`;
  content += `<h1>Student: ${record.name}</h1>`;
  content += `<table>`;
  content += `<tr><th>#</th><th>Correct</th><th>Student</th><th>Key</th></tr>`;

  test.sections.forEach((section) => {
    section.problems.forEach((problem, problemIndex) => {
      const response = record.responses[problemIndex];
      const isCorrect = response === problem.key;
      content += `<tr>
                <td>${problemIndex + 1}</td>
                <td>${problem.key}</td>
                <td>${response || "No Response"}</td>
                <td>${isCorrect ? "✅" : "❌"}</td>
              </tr>`;
    });
  });

  content += `</table>`;

  document.getElementById("report").innerHTML = content;
}

fetchin();
