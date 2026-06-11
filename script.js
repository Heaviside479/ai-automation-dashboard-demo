document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("workflowForm");

  const elements = {
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

  if (!form) {
    console.error("Workflow-Formular wurde nicht gefunden.");
    return;
  }

  const automationData = {
    sales: {
      title: "KI-Workflow für Vertrieb & Lead-Management",
      score: "91%",
      time: "10–16 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "CRM", "Make", "Google Sheets", "E-Mail"],
      steps: [
        "Neue Leads automatisch aus Formularen, E-Mails oder CRM erfassen.",
        "Lead-Daten analysieren und nach Potenzial priorisieren.",
        "KI erstellt personalisierte Erstnachrichten oder Follow-ups.",
        "Interessante Leads werden automatisch an Vertrieb oder CRM übergeben.",
        "Dashboard zeigt Status, Priorität und nächste Aktion je Lead.",
      ],
      benefits: [
        "Schnellere Reaktion auf neue Anfragen",
        "Mehr qualifizierte Leads",
        "Weniger manuelle CRM-Pflege",
        "Bessere Übersicht im Vertrieb",
      ],
    },

    support: {
      title: "KI-Workflow für Kundenservice & Support",
      score: "88%",
      time: "8–14 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "Helpdesk", "Zapier", "E-Mail", "Notion"],
      steps: [
        "Neue Support-Anfragen automatisch erfassen.",
        "KI erkennt Thema, Dringlichkeit und Kundentyp.",
        "Häufige Anfragen werden automatisch vorformuliert beantwortet.",
        "Komplexe Tickets werden an die richtige Person weitergeleitet.",
        "Dashboard misst Antwortzeiten, offene Fälle und wiederkehrende Probleme.",
      ],
      benefits: [
        "Kürzere Antwortzeiten",
        "Weniger repetitive Support-Arbeit",
        "Bessere Kundenzufriedenheit",
        "Klare Priorisierung wichtiger Tickets",
      ],
    },

    operations: {
      title: "KI-Workflow für interne Prozesse",
      score: "84%",
      time: "6–12 Std. / Woche",
      complexity: "Niedrig bis Mittel",
      tools: ["OpenAI", "Make", "Airtable", "Google Drive", "Slack"],
      steps: [
        "Wiederkehrende interne Aufgaben identifizieren.",
        "Dokumente, Tabellen oder Anfragen automatisch auslesen.",
        "KI fasst Informationen zusammen und erkennt nächste Schritte.",
        "Aufgaben werden automatisch erstellt oder weitergeleitet.",
        "Fortschritt wird zentral im Dashboard sichtbar gemacht.",
      ],
      benefits: [
        "Weniger manuelle Abstimmung",
        "Bessere Prozessübersicht",
        "Reduzierte Fehlerquote",
        "Mehr Zeit für wertschöpfende Aufgaben",
      ],
    },

    marketing: {
      title: "KI-Workflow für Marketing & Content",
      score: "87%",
      time: "7–13 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "Canva", "Buffer", "Google Sheets", "CMS"],
      steps: [
        "Content-Ideen aus Zielgruppe, Angebot und Kampagnenziel ableiten.",
        "KI erstellt Entwürfe für Posts, Newsletter oder Landingpages.",
        "Beiträge werden nach Kanal und Tonalität angepasst.",
        "Freigaben und Veröffentlichungen werden automatisiert vorbereitet.",
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
      score: "86%",
      time: "8–14 Std. / Woche",
      complexity: "Mittel",
      tools: ["OpenAI", "Make", "Zapier", "Google Sheets", "CRM"],
      steps: [
        "Ausgewählten Geschäftsprozess analysieren.",
        "Wiederholbare manuelle Aufgaben erkennen.",
        "Benötigte Datenquellen und Tools definieren.",
        "KI für Analyse, Zusammenfassung oder Textgenerierung einsetzen.",
        "Ergebnisse automatisch an das passende System weitergeben.",
        "Workflow regelmäßig messen und verbessern.",
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

  const getSelectedText = (selectId) => {
    const select = document.getElementById(selectId);
    return select?.options[select.selectedIndex]?.text || "";
  };

  const renderList = (element, items) => {
    element.innerHTML = items.map((item) => `<li>${item}</li>`).join("");
  };

  const renderTags = (element, tags) => {
    element.innerHTML = tags.map((tag) => `<span>${tag}</span>`).join("");
  };

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const industry = document.getElementById("industry")?.value;
    const process = document.getElementById("process")?.value;
    const goal = document.getElementById("goal")?.value;
    const details = document.getElementById("details")?.value.trim();

    if (!industry || !process || !goal) {
      alert("Bitte wähle Branche, Prozess und Ziel aus.");
      return;
    }

    const data = automationData[process] || automationData[industry] || automationData.default;

    elements.resultTitle.textContent = data.title;
    elements.automationScore.textContent = data.score;
    elements.timeSaved.textContent = data.time;
    elements.complexity.textContent = data.complexity;

    const customSteps = [
      ...data.steps,
      `Ausgewähltes Ziel: ${getSelectedText("goal")}`,
      details
        ? `Individueller Kontext: ${details}`
        : "Empfehlung: Ergänze konkrete Tools, Datenquellen oder Engpässe für einen präziseren Workflow.",
    ];

    renderList(elements.workflowSteps, customSteps);
    renderTags(elements.toolTags, data.tools);
    renderList(elements.benefitList, data.benefits);

    elements.emptyState.classList.add("hidden");
    elements.generatedResult.classList.remove("hidden");

    elements.generatedResult.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
