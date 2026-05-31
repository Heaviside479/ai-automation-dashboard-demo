document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");

      const isOpen = navLinks.classList.contains("open");
      menuToggle.textContent = isOpen ? "✕" : "☰";
      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const workflowForm = document.getElementById("workflowForm");
  const emptyState = document.getElementById("emptyState");
  const generatedResult = document.getElementById("generatedResult");

  const resultTitle = document.getElementById("resultTitle");
  const automationScore = document.getElementById("automationScore");
  const timeSaved = document.getElementById("timeSaved");
  const complexity = document.getElementById("complexity");
  const workflowSteps = document.getElementById("workflowSteps");
  const toolTags = document.getElementById("toolTags");
  const benefitList = document.getElementById("benefitList");

  const workflowData = {
    "lead-management": {
      title: "Lead Management Automation",
      score: "88%",
      time: "10–15h / week",
      complexity: "Medium",
      steps: [
        "Capture incoming leads from forms, emails or messages.",
        "Analyze lead details and detect urgency, budget and intent.",
        "Automatically categorize leads by priority and service type.",
        "Add qualified leads to a CRM or structured database.",
        "Generate a personalized follow-up message.",
        "Notify the responsible team member."
      ],
      tools: ["OpenAI", "Zapier", "HubSpot", "Google Sheets", "Email Automation"],
      benefits: [
        "Faster lead response times",
        "Less manual sorting",
        "Better sales pipeline overview",
        "Higher chance of converting inquiries into customers"
      ]
    },

    "customer-support": {
      title: "Customer Support Automation",
      score: "82%",
      time: "8–12h / week",
      complexity: "Medium",
      steps: [
        "Collect incoming customer questions from email or contact forms.",
        "Use AI to classify the request by topic and urgency.",
        "Generate a suggested response based on predefined service rules.",
        "Route complex cases to the correct person.",
        "Send automatic confirmations to customers.",
        "Track unresolved tickets in a dashboard."
      ],
      tools: ["OpenAI", "Helpdesk System", "Notion", "Slack", "Email Automation"],
      benefits: [
        "Faster customer replies",
        "Reduced repetitive support work",
        "Improved service consistency",
        "Clear overview of open requests"
      ]
    },

    "document-processing": {
      title: "Document Processing Automation",
      score: "91%",
      time: "12–18h / week",
      complexity: "High",
      steps: [
        "Upload or receive documents automatically.",
        "Extract relevant information such as names, dates, amounts and topics.",
        "Summarize long documents into short internal notes.",
        "Classify documents by type and priority.",
        "Store extracted data in a structured system.",
        "Create alerts when important information is detected."
      ],
      tools: ["OpenAI", "OCR", "Google Drive", "Airtable", "Make"],
      benefits: [
        "Less manual document review",
        "Faster information extraction",
        "Reduced human error",
        "Better document organization"
      ]
    },

    "appointment-booking": {
      title: "Appointment Booking Automation",
      score: "86%",
      time: "6–10h / week",
      complexity: "Low",
      steps: [
        "Receive appointment requests from website forms or email.",
        "Check requested date, time and availability.",
        "Suggest available time slots automatically.",
        "Send confirmation messages to customers.",
        "Add appointments to a calendar.",
        "Send reminders before the appointment."
      ],
      tools: ["Google Calendar", "Calendly", "Zapier", "Email Automation", "OpenAI"],
      benefits: [
        "Fewer back-and-forth messages",
        "Faster appointment confirmations",
        "Reduced missed appointments",
        "Better customer experience"
      ]
    },

    "reporting": {
      title: "Reporting Automation",
      score: "84%",
      time: "7–14h / week",
      complexity: "Medium",
      steps: [
        "Collect data from different sources automatically.",
        "Clean and organize the information.",
        "Generate weekly or monthly performance summaries.",
        "Highlight important changes or anomalies.",
        "Create visual reports for decision-makers.",
        "Send reports automatically to the right people."
      ],
      tools: ["Google Sheets", "Looker Studio", "OpenAI", "Make", "Airtable"],
      benefits: [
        "Faster reporting cycles",
        "Better decision-making",
        "Less manual data preparation",
        "Clearer business insights"
      ]
    },

    "email-workflows": {
      title: "Email Workflow Automation",
      score: "89%",
      time: "8–16h / week",
      complexity: "Low",
      steps: [
        "Monitor incoming emails for specific keywords or intent.",
        "Classify emails by topic, urgency and customer type.",
        "Generate suggested replies or internal summaries.",
        "Forward emails to the correct department.",
        "Create tasks from important messages.",
        "Archive or label completed conversations."
      ],
      tools: ["Gmail", "OpenAI", "Zapier", "Notion", "CRM"],
      benefits: [
        "Less inbox overload",
        "Faster response times",
        "Better internal organization",
        "More consistent communication"
      ]
    }
  };

  const industryAddons = {
    restaurant: "Restaurant workflows should focus on reservations, customer communication, reviews and repeat bookings.",
    realestate: "Real estate workflows should prioritize lead qualification, viewing requests, document handling and follow-ups.",
    consulting: "Consulting workflows should focus on client onboarding, reporting, proposals and meeting summaries.",
    ecommerce: "E-commerce workflows should prioritize order handling, customer support, inventory updates and abandoned carts.",
    healthcare: "Healthcare workflows should focus on appointment management, document handling and patient communication.",
    construction: "Construction workflows should support project updates, quote requests, document tracking and client communication.",
    general: "General business workflows should focus on reducing repetitive manual work and improving process transparency."
  };

  const goalBenefits = {
    "save-time": "This workflow is optimized to reduce repetitive manual work and save time every week.",
    "reduce-errors": "This workflow focuses on standardizing steps to reduce mistakes and improve consistency.",
    "faster-response": "This workflow is designed to improve response speed and customer communication.",
    "improve-overview": "This workflow improves visibility by organizing information into a clear process.",
    "scale-operations": "This workflow helps the business handle more requests without increasing manual workload."
  };

  if (workflowForm) {
    workflowForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const industry = document.getElementById("industry").value;
      const process = document.getElementById("process").value;
      const goal = document.getElementById("goal").value;
      const details = document.getElementById("details").value.trim();

      const selectedWorkflow = workflowData[process];

      if (!selectedWorkflow) return;

      resultTitle.textContent = selectedWorkflow.title;
      automationScore.textContent = selectedWorkflow.score;
      timeSaved.textContent = selectedWorkflow.time;
      complexity.textContent = selectedWorkflow.complexity;

      workflowSteps.innerHTML = "";
      toolTags.innerHTML = "";
      benefitList.innerHTML = "";

      selectedWorkflow.steps.forEach((step) => {
        const li = document.createElement("li");
        li.textContent = step;
        workflowSteps.appendChild(li);
      });

      const industryNote = document.createElement("li");
      industryNote.textContent = industryAddons[industry] || industryAddons.general;
      workflowSteps.appendChild(industryNote);

      if (details.length > 0) {
        const customNote = document.createElement("li");
        customNote.textContent = `Custom input considered: "${details}"`;
        workflowSteps.appendChild(customNote);
      }

      selectedWorkflow.tools.forEach((tool) => {
        const span = document.createElement("span");
        span.textContent = tool;
        toolTags.appendChild(span);
      });

      selectedWorkflow.benefits.forEach((benefit) => {
        const li = document.createElement("li");
        li.textContent = benefit;
        benefitList.appendChild(li);
      });

      if (goalBenefits[goal]) {
        const li = document.createElement("li");
        li.textContent = goalBenefits[goal];
        benefitList.appendChild(li);
      }

      emptyState.classList.add("hidden");
      generatedResult.classList.remove("hidden");

      generatedResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    });
  }

  const animatedElements = document.querySelectorAll(
    ".hero-content, .hero-panel, .stats-section div, .section-heading, .generator-form, .result-panel, .feature-card, .example-card, .value-card, .cta-section"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    animatedElements.forEach((element) => {
      element.classList.add("fade-element");
      observer.observe(element);
    });
  }

  console.log(
    "%cFlowPilot AI Workflow Generator",
    "color:#38bdf8;font-size:22px;font-weight:bold;"
  );

  console.log(
    "%cCreated by Heaviside Solutions",
    "color:#94a3b8;font-size:14px;"
  );
});
