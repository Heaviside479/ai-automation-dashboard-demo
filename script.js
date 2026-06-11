document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workflowForm");

  const elements = {
    industry: document.getElementById("industry"),
    process: document.getElementById("process"),
    goal: document.getElementById("goal"),
    details: document.getElementById("details"),

    emptyState: document.getElementById("emptyState"),
    generatedResult: document.getElementById("generatedResult"),

    resultTitle: document.getElementById("resultTitle"),
    automationScore: document.getElementById("automationScore"),
    timeSaved: document.getElementById("timeSaved"),
    complexity: document.getElementById("complexity"),
    workflowSteps: document.getElementById("workflowSteps"),
    toolTags: document.getElementById("toolTags"),
    benefitList: document.getElementById("benefitList"),
  };

    const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  const copyWorkflowBtn = document.getElementById("copyWorkflowBtn");
  const copyStatus = document.getElementById("copyStatus");
  
  const storageKey = "flowpilot_workflow_demo";

  const workflowLibrary = {
    sales: {
      title: "KI-Automatisierungsplan für Vertrieb & Lead-Management",
      baseScore: 91,
      baseHours: "10–16 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "CRM", "Make", "E-Mail", "Google Sheets"],
      steps: [
        "Neue Leads automatisch aus Formularen, E-Mails oder CRM-Systemen erfassen.",
        "Lead-Daten analysieren und nach Relevanz, Budget, Bedarf und Dringlichkeit bewerten.",
        "KI erstellt personalisierte Erstnachrichten oder Follow-ups.",
        "Qualifizierte Leads werden automatisch an Vertrieb, CRM oder E-Mail-Sequenz übergeben.",
        "Dashboard zeigt Lead-Status, Priorität, nächste Aktion und geschätztes Potenzial.",
      ],
      benefits: [
        "Schnellere Reaktion auf neue Anfragen",
        "Mehr qualifizierte Verkaufsgespräche",
        "Weniger manuelle CRM-Pflege",
        "Bessere Priorisierung im Vertrieb",
      ],
    },

    support: {
      title: "KI-Automatisierungsplan für Kundenservice & Support",
      baseScore: 88,
      baseHours: "8–14 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "Helpdesk", "Zapier", "E-Mail", "Notion"],
      steps: [
        "Neue Support-Anfragen automatisch aus E-Mail, Formularen oder Helpdesk erfassen.",
        "KI erkennt Thema, Stimmung, Dringlichkeit und Kundentyp.",
        "Häufige Anfragen werden automatisch beantwortet oder vorformuliert.",
        "Komplexe Tickets werden an die passende Person oder Abteilung weitergeleitet.",
        "Dashboard zeigt offene Tickets, Antwortzeiten, Kategorien und wiederkehrende Probleme.",
      ],
      benefits: [
        "Kürzere Antwortzeiten",
        "Weniger repetitive Support-Arbeit",
        "Bessere Kundenzufriedenheit",
        "Klare Priorisierung wichtiger Anfragen",
      ],
    },

    operations: {
      title: "KI-Automatisierungsplan für interne Prozesse",
      baseScore: 84,
      baseHours: "6–12 Std. / Woche",
      complexity: "Niedrig bis Mittel",
      tools: ["OpenAI", "Make", "Airtable", "Google Drive", "Slack"],
      steps: [
        "Wiederkehrende interne Aufgaben und Engpässe identifizieren.",
        "Dokumente, Tabellen, E-Mails oder Anfragen automatisch auslesen.",
        "KI fasst Informationen zusammen und erkennt nächste Schritte.",
        "Aufgaben, Benachrichtigungen oder Freigaben werden automatisch erstellt.",
        "Dashboard zeigt Prozessstatus, offene Aufgaben und Automatisierungspotenzial.",
      ],
      benefits: [
        "Weniger manuelle Abstimmung",
        "Bessere Prozessübersicht",
        "Reduzierte Fehlerquote",
        "Mehr Zeit für wertschöpfende Aufgaben",
      ],
    },

    marketing: {
      title: "KI-Automatisierungsplan für Marketing & Content",
      baseScore: 87,
      baseHours: "7–13 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "Canva", "Buffer", "CMS", "Google Sheets"],
      steps: [
        "Content-Ideen aus Zielgruppe, Angebot und Kampagnenziel ableiten.",
        "KI erstellt Entwürfe für Posts, Newsletter, Anzeigen oder Landingpages.",
        "Inhalte werden automatisch an Kanal, Tonalität und Zielgruppe angepasst.",
        "Freigaben, Veröffentlichung und Content-Planung werden vorbereitet.",
        "Dashboard zeigt Content-Status, Kampagnenleistung und nächste Aufgaben.",
      ],
      benefits: [
        "Schnellere Content-Erstellung",
        "Konsistentere Kommunikation",
        "Bessere Kampagnenplanung",
        "Weniger operative Marketing-Arbeit",
      ],
    },

    default: {
      title: "Individueller KI-Automatisierungsplan",
      baseScore: 86,
      baseHours: "8–14 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "Make", "Zapier", "Google Sheets", "CRM"],
      steps: [
        "Ausgewählten Geschäftsprozess analysieren.",
        "Wiederholbare manuelle Aufgaben und Zeitfresser erkennen.",
        "Benötigte Datenquellen, Tools und Verantwortlichkeiten definieren.",
        "KI für Analyse, Klassifizierung, Zusammenfassung oder Textgenerierung einsetzen.",
        "Ergebnisse automatisch an das passende System oder Team weitergeben.",
        "Workflow regelmäßig messen, verbessern und skalieren.",
      ],
      benefits: [
        "Weniger manuelle Arbeit",
        "Schnellere Abläufe",
        "Bessere Übersicht",
        "Weniger Fehler",
        "Skalierbare Prozesse",
      ],
    },
  };

  if (!form || !elements.generatedResult || !elements.emptyState) {
    console.error("Wichtige HTML-Elemente für die Demo wurden nicht gefunden.");
    return;
  }

  const sanitizeText = (value) => {
    return String(value || "")
      .replace(/[<>]/g, "")
      .trim();
  };

  const getSelectedText = (selectElement) => {
    if (!selectElement) return "";
    return selectElement.options[selectElement.selectedIndex]?.text || "";
  };

  const calculateScore = (baseScore, details) => {
    const detailLength = details.length;

    if (detailLength > 120) return Math.min(baseScore + 5, 97);
    if (detailLength > 50) return Math.min(baseScore + 3, 95);
    if (detailLength === 0) return Math.max(baseScore - 4, 72);

    return baseScore;
  };

  const getGoalBenefit = (goal) => {
    const benefits = {
      save_time: "Fokus auf Zeitersparnis und Entlastung wiederkehrender Aufgaben.",
      reduce_costs: "Fokus auf geringere Prozesskosten und effizientere Ressourcennutzung.",
      increase_sales: "Fokus auf mehr qualifizierte Chancen und höhere Abschlusswahrscheinlichkeit.",
      improve_quality: "Fokus auf weniger Fehler, konsistentere Ergebnisse und bessere Datenqualität.",
      scale_processes: "Fokus auf skalierbare Abläufe, die auch bei steigendem Volumen funktionieren.",
    };

    return benefits[goal] || "Fokus auf messbare Verbesserung des ausgewählten Prozesses.";
  };

  const renderList = (element, items) => {
    if (!element) return;
    element.innerHTML = "";

    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      element.appendChild(li);
    });
  };

  const renderTags = (element, tags) => {
    if (!element) return;
    element.innerHTML = "";

    tags.forEach((tag) => {
      const span = document.createElement("span");
      span.textContent = tag;
      element.appendChild(span);
    });
  };

  const saveState = (data) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn("Demo-Daten konnten nicht gespeichert werden.", error);
    }
  };

  const loadState = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey)) || null;
    } catch {
      return null;
    }
  };

  const showResult = () => {
    elements.emptyState.classList.add("hidden");
    elements.generatedResult.classList.remove("hidden");

    elements.generatedResult.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const generateWorkflow = ({ industry, process, goal, details }) => {
    const selectedWorkflow = workflowLibrary[process] || workflowLibrary[industry] || workflowLibrary.default;
    const score = calculateScore(selectedWorkflow.baseScore, details);

    elements.resultTitle.textContent = selectedWorkflow.title;
    elements.automationScore.textContent = `${score}%`;
    elements.timeSaved.textContent = selectedWorkflow.baseHours;
    elements.complexity.textContent = selectedWorkflow.complexity;

    const workflowSteps = [
      ...selectedWorkflow.steps,
      `Ausgewählte Branche: ${getSelectedText(elements.industry) || "Nicht angegeben"}.`,
      `Ausgewähltes Ziel: ${getSelectedText(elements.goal) || "Nicht angegeben"}.`,
      getGoalBenefit(goal),
      details
        ? `Individueller Kontext: ${details}`
        : "Empfehlung: Ergänze konkrete Tools, Engpässe oder Datenquellen für eine präzisere Einschätzung.",
    ];

    const benefits = [
      ...selectedWorkflow.benefits,
      "Bessere Entscheidungsgrundlage für den nächsten Automatisierungsschritt",
    ];

    renderList(elements.workflowSteps, workflowSteps);
    renderTags(elements.toolTags, selectedWorkflow.tools);
    renderList(elements.benefitList, benefits);

    showResult();
  };

  const restorePreviousInput = () => {
    const savedData = loadState();
    if (!savedData) return;

    if (elements.industry) elements.industry.value = savedData.industry || "";
    if (elements.process) elements.process.value = savedData.process || "";
    if (elements.goal) elements.goal.value = savedData.goal || "";
    if (elements.details) elements.details.value = savedData.details || "";
  };

  restorePreviousInput();

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = {
      industry: sanitizeText(elements.industry?.value),
      process: sanitizeText(elements.process?.value),
      goal: sanitizeText(elements.goal?.value),
      details: sanitizeText(elements.details?.value),
    };

    if (!data.industry || !data.process || !data.goal) {
      alert("Bitte wähle Branche, Prozess und Ziel aus.");
      return;
    }

    saveState(data);
    generateWorkflow(data);
  });

  if (copyWorkflowBtn) {
  copyWorkflowBtn.addEventListener("click", async () => {
    try {
      const title = elements.resultTitle?.textContent || "";
      const score = elements.automationScore?.textContent || "";
      const time = elements.timeSaved?.textContent || "";
      const complexityLevel = elements.complexity?.textContent || "";

      const steps = Array.from(
        document.querySelectorAll("#workflowSteps li")
      )
        .map((li) => `• ${li.textContent}`)
        .join("\n");

      const benefits = Array.from(
        document.querySelectorAll("#benefitList li")
      )
        .map((li) => `• ${li.textContent}`)
        .join("\n");

      const text = `
${title}

Automatisierungspotenzial: ${score}
Zeitersparnis: ${time}
Komplexität: ${complexityLevel}

Workflow:
${steps}

Nutzen:
${benefits}
      `.trim();

      await navigator.clipboard.writeText(text);

      if (copyStatus) {
        copyStatus.textContent = "✓ Workflow kopiert";
      }

      setTimeout(() => {
        if (copyStatus) {
          copyStatus.textContent = "";
        }
      }, 3000);
    } catch (error) {
      console.error(error);

      if (copyStatus) {
        copyStatus.textContent = "Kopieren fehlgeschlagen";
      }
    }
  });
}
});
