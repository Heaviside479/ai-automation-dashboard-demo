document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workflowForm");
  const emptyState = document.getElementById("emptyState");
  const generatedResult = document.getElementById("generatedResult");

  const resultTitle = document.getElementById("resultTitle");
  const automationScore = document.getElementById("automationScore");
  const timeSaved = document.getElementById("timeSaved");
  const complexity = document.getElementById("complexity");
  const workflowSteps = document.getElementById("workflowSteps");
  const toolTags = document.getElementById("toolTags");
  const benefitList = document.getElementById("benefitList");

  if (!form) {
    console.error("Formular nicht gefunden.");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const industry = document.getElementById("industry").value;
    const process = document.getElementById("process").value;
    const goal = document.getElementById("goal").value;
    const details = document.getElementById("details").value;

    if (!industry || !process || !goal) {
      alert("Please select industry, process and goal.");
      return;
    }

    resultTitle.textContent = "AI Automation Workflow Plan";
    automationScore.textContent = "86%";
    timeSaved.textContent = "8–14h / week";
    complexity.textContent = "Medium";

    workflowSteps.innerHTML = `
      <li>Analyze the selected business process.</li>
      <li>Identify repetitive manual tasks.</li>
      <li>Collect required customer or process data.</li>
      <li>Use AI to classify, summarize or generate responses.</li>
      <li>Send results to the correct tool, person or system.</li>
      <li>Monitor performance and improve the workflow over time.</li>
      <li>Custom context: ${details || "No additional details provided."}</li>
    `;

    toolTags.innerHTML = `
      <span>OpenAI</span>
      <span>Zapier</span>
      <span>Make</span>
      <span>Google Sheets</span>
      <span>CRM</span>
    `;

    benefitList.innerHTML = `
      <li>Less manual work</li>
      <li>Faster response times</li>
      <li>Better process overview</li>
      <li>Reduced errors</li>
      <li>Improved scalability</li>
    `;

    emptyState.classList.add("hidden");
    generatedResult.classList.remove("hidden");
  });
});
