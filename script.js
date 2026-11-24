const quiz = [
  {
    type: "choice",
    question: "1. Jak se v programu projeví porušení věcné správnosti?",
    choices: [
      "Program se nikdy nespustí a překladač nahlásí syntaktickou chybu.",
      "Program se zacyklí a bude nutné ho násilně ukončit.",
      "Program zdánlivě pracuje bez problému, ale poskytuje chybné výsledky.",
      "Program skončí ihned po načtení prvního vstupního údaje."
    ],
    answer: 2,
    explanation: "Chyba se na první pohled nepozná, protože výpočet proběhne, ale se špatným vzorcem."
  },
  {
    type: "choice",
    question: "2. Který zápis správně převádí (A+B)/(C+D)?",
    choices: [
      "X := A+B / C+D",
      "X := (A+B) / (C+D)",
      "X := A+B / (C+D)",
      "X := (A+B) / C+D"
    ],
    answer: 1,
    explanation: "Zlomkovou čáru nahrazujeme lomítkem; závorky zachovají prioritu čitatele i jmenovatele."
  },
  {
    type: "choice",
    question: "3. Jak se značí blok pro načtení vstupních dat?",
    choices: ["Obdélníkem s textem Načti:", "Kosočtvercem s textem Vstup:", "Kosodélníkem s textem Čti:", "Oválem s textem Začátek:"],
    answer: 2,
    explanation: "Kosodélník s příkazem Čti: slouží pro vstup dat."
  },
  {
    type: "choice",
    question: "4. Která vlastnost zajišťuje stejné výsledky při stejných vstupních datech?",
    choices: ["Obecnost", "Srozumitelnost", "Jednoznačnost", "Opakovatelnost"],
    answer: 3,
    explanation: "Opakovatelnost zaručuje stejné chování a výsledky při stejných podmínkách a vstupech."
  },
  {
    type: "choice",
    question: "5. Jaký je hlavní účel překladače?",
    choices: [
      "Převádí vývojový diagram na slovní popis.",
      "Překládá program do strojového kódu.",
      "Automaticky opravuje logické chyby.",
      "Převádí cizojazyčné komentáře do češtiny."
    ],
    answer: 1,
    explanation: "Počítač rozumí strojovému kódu, do kterého překladač převede zdrojový program."
  },
  {
    type: "open",
    question: "6. Vyjmenujte všech 6 základních vlastností správného algoritmu.",
    keywords: ["konečnost", "věcná správnost", "jednoznačnost", "obecnost", "opakovatelnost", "srozumitelnost"],
    answer: "Konečnost (začátek a konec), věcná správnost, jednoznačnost, obecnost, opakovatelnost a srozumitelnost.",
    explanation: "Doplňte také význam začátku a konce: algoritmus má po konečném počtu kroků skončit."
  },
  {
    type: "open",
    question: "7. Jaké dvě hlavní podmínky řešitelnosti musíme nejčastěji ošetřit?",
    keywords: ["dělení", "nula", "jmenovatel", "odmocnin", "záporn"],
    answer: "Jmenovatel zlomku nesmí být nula; výraz pod odmocninou nesmí být záporný v oboru reálných čísel.",
    explanation: "Obě podmínky se typicky ošetřují větvením."
  },
  {
    type: "open",
    question: "8. Jaký je rozdíl mezi AND a OR?",
    keywords: ["obě", "alespoň", "součin", "součet"],
    answer: "A AND B je 1 pouze tehdy, když jsou obě proměnné 1. A OR B je 1, když je alespoň jedna proměnná 1.",
    explanation: "AND představuje logický součin a OR logický součet."
  },
  {
    type: "open",
    question: "9. K čemu slouží spojka a jak se označuje?",
    keywords: ["části", "přeruš", "číslo", "stejn"],
    answer: "Spojuje části diagramu, které nelze nakreslit souvisle. Na konci přerušení i na začátku pokračování je stejné číslo.",
    explanation: "To například umožňuje spojit část přes další sloupec či stránku."
  }
];

const form = document.getElementById("quiz-form");
const progress = document.getElementById("progress");
const submitButton = document.getElementById("submit-quiz");
const restartButton = document.getElementById("restart-quiz");
const result = document.getElementById("quiz-result");

function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ");
}

function renderQuiz() {
  form.innerHTML = quiz.map((item, index) => {
    if (item.type === "choice") {
      const choices = item.choices.map((choice, choiceIndex) => `
        <label class="choice">
          <input type="radio" name="question-${index}" value="${choiceIndex}">
          <span><strong>${String.fromCharCode(97 + choiceIndex)})</strong> ${choice}</span>
        </label>
      `).join("");
      return `<fieldset class="quiz-question" data-index="${index}">
        <legend>${item.question}</legend>${choices}
        <div class="feedback"></div>
      </fieldset>`;
    }
    return `<fieldset class="quiz-question" data-index="${index}">
      <legend>${item.question}</legend>
      <textarea class="open-answer" name="question-${index}" aria-label="Odpověď na otázku ${index + 1}" placeholder="Napište vlastní odpověď…"></textarea>
      <div class="feedback"></div>
    </fieldset>`;
  }).join("");

  form.querySelectorAll("input, textarea").forEach((control) => {
    control.addEventListener("input", updateProgress);
    control.addEventListener("change", updateProgress);
  });
  updateProgress();
}

function updateProgress() {
  let answered = 0;
  quiz.forEach((item, index) => {
    if (item.type === "choice") {
      if (form.querySelector(`input[name="question-${index}"]:checked`)) answered++;
    } else if (form.querySelector(`[name="question-${index}"]`).value.trim()) {
      answered++;
    }
  });
  progress.textContent = `${answered} / ${quiz.length} zodpovězeno`;
}

function openAnswerIsCorrect(item, value) {
  const normalized = normalizeText(value);
  if (item.question.startsWith("6.")) {
    return item.keywords.every((word) => normalized.includes(normalizeText(word)));
  }
  if (item.question.startsWith("7.")) {
    const division = /delen/.test(normalized) && (/nul/.test(normalized) || /jmenovat/.test(normalized));
    const root = /odmoc/.test(normalized) && /zaporn/.test(normalized);
    return division && root;
  }
  if (item.question.startsWith("8.")) {
    return /and/.test(normalized) && /or/.test(normalized) &&
      (/obe/.test(normalized) || /soucin/.test(normalized)) &&
      (/alespon/.test(normalized) || /soucet/.test(normalized));
  }
  if (item.question.startsWith("9.")) {
    return /spoj/.test(normalized) && (/stejn/.test(normalized) || /cislo/.test(normalized));
  }
  return item.keywords.every((word) => normalized.includes(normalizeText(word)));
}

function evaluateQuiz() {
  let score = 0;

  quiz.forEach((item, index) => {
    const question = form.querySelector(`[data-index="${index}"]`);
    const feedback = question.querySelector(".feedback");
    let correct = false;

    if (item.type === "choice") {
      const selected = form.querySelector(`input[name="question-${index}"]:checked`);
      const selectedValue = selected ? Number(selected.value) : -1;
      correct = selectedValue === item.answer;
    } else {
      const value = form.querySelector(`[name="question-${index}"]`).value;
      correct = openAnswerIsCorrect(item, value);
    }

    if (correct) score++;
    feedback.className = `feedback ${correct ? "correct" : "incorrect"}`;
    const correctAnswer = item.type === "choice" ? item.choices[item.answer] : item.answer;
    feedback.innerHTML = `<strong>${correct ? "Správně" : "Nesprávně"}</strong><br><strong>Správná odpověď:</strong> ${correctAnswer}<br>${item.explanation}`;
  });

  let evaluation;
  if (score >= 8) evaluation = "Výborné! Máte téměř všechny znalosti.";
  else if (score >= 6) evaluation = "Dobrá práce. Ještě zopakujte oblasti, které vám unikly.";
  else if (score >= 4) evaluation = "Učivo máte částečně zvládnuté. Doporučujeme zopakovat hlavní pojmy.";
  else evaluation = "Doporučujeme projít celý materiál a test poté opakovat.";

  result.hidden = false;
  result.textContent = `Skóre: ${score} z ${quiz.length}. ${evaluation}`;
  restartButton.hidden = false;
  submitButton.hidden = true;
  form.querySelectorAll("input, textarea").forEach((control) => { control.disabled = true; });
  result.scrollIntoView({ behavior: "smooth", block: "center" });
}

function restartQuiz() {
  renderQuiz();
  result.hidden = true;
  result.textContent = "";
  restartButton.hidden = true;
  submitButton.hidden = false;
  form.querySelectorAll(".feedback").forEach((feedback) => {
    feedback.className = "feedback";
    feedback.innerHTML = "";
  });
  document.getElementById("test").scrollIntoView({ behavior: "smooth" });
}

submitButton.addEventListener("click", evaluateQuiz);
restartButton.addEventListener("click", restartQuiz);

const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav");
menuToggle.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navigation.querySelectorAll("a").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: "-35% 0px -55%" });
document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

renderQuiz();
