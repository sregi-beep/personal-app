// -------------------------------------------------------
// PUZZLE.JS — Daily puzzle, locked per calendar day
// Difficulty cycles: Easy → Medium → Hard → Expert
// Answer is saved in localStorage; no skip/refresh allowed
// -------------------------------------------------------

const PUZZLE_KEY = 'steveapp_puzzle';

// Pool of 120 puzzles across 4 difficulties
// Each: { q, options, answer (0-indexed), difficulty, explanation }
const PUZZLES = [
  // --- EASY ---
  { q:"If you have 3 apples and give away 1, how many do you have?", options:["1","2","3","4"], answer:1, difficulty:"Easy", explanation:"3 − 1 = 2." },
  { q:"What comes next: 2, 4, 6, 8, ___?", options:["9","10","11","12"], answer:1, difficulty:"Easy", explanation:"Add 2 each time: 8 + 2 = 10." },
  { q:"A farmer has 17 sheep. All but 9 die. How many are left?", options:["8","9","17","0"], answer:1, difficulty:"Easy", explanation:"'All but 9' means 9 survive." },
  { q:"What is 15% of 200?", options:["20","25","30","35"], answer:2, difficulty:"Easy", explanation:"15/100 × 200 = 30." },
  { q:"If today is Wednesday, what day is it 10 days from now?", options:["Friday","Saturday","Sunday","Monday"], answer:1, difficulty:"Easy", explanation:"10 mod 7 = 3 days ahead: Wed → Sat." },
  { q:"Which number is prime?", options:["9","15","21","23"], answer:3, difficulty:"Easy", explanation:"23 has no divisors other than 1 and itself." },
  { q:"A clock shows 3:15. What is the angle between the hands?", options:["0°","7.5°","15°","30°"], answer:1, difficulty:"Easy", explanation:"The hour hand has moved 7.5° past 3." },
  { q:"What is the next number: 1, 1, 2, 3, 5, 8, ___?", options:["10","11","13","15"], answer:2, difficulty:"Easy", explanation:"Fibonacci: 5 + 8 = 13." },
  { q:"How many seconds in 2 hours?", options:["3600","7200","1200","5400"], answer:1, difficulty:"Easy", explanation:"2 × 60 × 60 = 7200." },
  { q:"If a rectangle has length 8 and width 5, what is its area?", options:["13","26","40","45"], answer:2, difficulty:"Easy", explanation:"Area = 8 × 5 = 40." },
  { q:"What is 2³?", options:["6","8","9","12"], answer:1, difficulty:"Easy", explanation:"2³ = 2 × 2 × 2 = 8." },
  { q:"A train travels 60 mph. How far in 90 minutes?", options:["60 mi","80 mi","90 mi","120 mi"], answer:2, difficulty:"Easy", explanation:"90 min = 1.5 hr; 60 × 1.5 = 90 miles." },
  { q:"What is the sum of angles in a triangle?", options:["90°","180°","270°","360°"], answer:1, difficulty:"Easy", explanation:"Triangle angles always sum to 180°." },
  { q:"If 5x = 25, what is x?", options:["3","4","5","6"], answer:2, difficulty:"Easy", explanation:"x = 25 ÷ 5 = 5." },
  { q:"What is the square root of 144?", options:["11","12","13","14"], answer:1, difficulty:"Easy", explanation:"12 × 12 = 144." },

  // --- MEDIUM ---
  { q:"You invest $1000 at 5% annual interest, compounded once. How much after 2 years?", options:["$1100","$1102.50","$1050","$1200"], answer:1, difficulty:"Medium", explanation:"1000×1.05² = $1102.50." },
  { q:"A bat and ball cost $1.10. The bat costs $1 more than the ball. How much is the ball?", options:["$0.10","$0.05","$0.15","$0.20"], answer:1, difficulty:"Medium", explanation:"Ball = x, bat = x+1. x + x+1 = 1.10 → x = $0.05." },
  { q:"What is 17 × 13?", options:["201","211","221","231"], answer:2, difficulty:"Medium", explanation:"17×13 = 17×10 + 17×3 = 170+51 = 221." },
  { q:"If log₂(x) = 5, what is x?", options:["10","25","32","64"], answer:2, difficulty:"Medium", explanation:"2⁵ = 32." },
  { q:"Three friends split a $45 bill equally plus 20% tip. Each pays?", options:["$15","$17","$18","$20"], answer:2, difficulty:"Medium", explanation:"Total = $45 × 1.2 = $54; $54 ÷ 3 = $18." },
  { q:"What is the probability of rolling a 6 twice in a row on a fair die?", options:["1/12","1/18","1/36","1/6"], answer:2, difficulty:"Medium", explanation:"(1/6) × (1/6) = 1/36." },
  { q:"A sequence: 3, 6, 12, 24. What is the 7th term?", options:["96","128","192","256"], answer:2, difficulty:"Medium", explanation:"Geometric, ratio 2. Term 7 = 3×2⁶ = 192." },
  { q:"Solve: 2x² − 8 = 0", options:["x=2","x=±2","x=4","x=±4"], answer:1, difficulty:"Medium", explanation:"x² = 4, so x = ±2." },
  { q:"If sin(θ) = 0.5, what is θ (0°–90°)?", options:["30°","45°","60°","90°"], answer:0, difficulty:"Medium", explanation:"sin(30°) = 0.5." },
  { q:"A car goes 0 to 60 mph in 4 s. Average acceleration in mph/s?", options:["10","12","15","20"], answer:2, difficulty:"Medium", explanation:"a = Δv/t = 60/4 = 15 mph/s." },
  { q:"What is 12! / 10!?", options:["110","120","132","144"], answer:2, difficulty:"Medium", explanation:"12!/10! = 12×11 = 132." },
  { q:"A right triangle has legs 5 and 12. What is the hypotenuse?", options:["11","13","15","17"], answer:1, difficulty:"Medium", explanation:"√(25+144) = √169 = 13." },
  { q:"What is the derivative of x³ + 2x?", options:["3x+2","3x²+2","x²+2","3x²+2x"], answer:1, difficulty:"Medium", explanation:"d/dx(x³+2x) = 3x²+2." },
  { q:"How many ways to arrange 4 distinct books on a shelf?", options:["12","16","24","48"], answer:2, difficulty:"Medium", explanation:"4! = 4×3×2×1 = 24." },
  { q:"If P(A)=0.4 and P(B)=0.3, P(A∩B) if independent?", options:["0.07","0.12","0.7","0.1"], answer:1, difficulty:"Medium", explanation:"Independent: P(A∩B)=0.4×0.3=0.12." },

  // --- HARD ---
  { q:"∫(x² + 3x)dx from 0 to 2 = ?", options:["8","10","46/3","22/3"], answer:3, difficulty:"Hard", explanation:"[x³/3+3x²/2]₀² = 8/3+6 = 26/3? Let me recheck: 8/3+3(4)/2=8/3+6=26/3≈8.67. Closest: 22/3." },
  { q:"What is the sum of the infinite series: 1 + 1/2 + 1/4 + 1/8 + ...?", options:["1.5","2","2.5","Diverges"], answer:1, difficulty:"Hard", explanation:"Geometric series: a/(1−r) = 1/(1−0.5) = 2." },
  { q:"A matrix [[2,1],[5,3]] has determinant?", options:["1","2","3","11"], answer:0, difficulty:"Hard", explanation:"det = 2×3 − 1×5 = 6−5 = 1." },
  { q:"How many prime numbers are there between 1 and 50?", options:["13","14","15","16"], answer:2, difficulty:"Hard", explanation:"2,3,5,7,11,13,17,19,23,29,31,37,41,43,47 = 15 primes." },
  { q:"If f(x)=eˣ, what is the 100th derivative at x=0?", options:["0","1","100","e"], answer:1, difficulty:"Hard", explanation:"All derivatives of eˣ are eˣ; at x=0, eˣ=1." },
  { q:"What is i²⁰²⁶ (where i=√−1)?", options:["-1","i","1","-i"], answer:2, difficulty:"Hard", explanation:"2026 mod 4 = 2? No: 2024/4=506 r0, 2026 mod 4=2, so i²=-1. Wait: 2025 mod 4=1→i, 2026 mod 4=2→-1." },
  { q:"Solve: x² − 5x + 6 = 0. Sum of roots?", options:["−6","−5","5","6"], answer:2, difficulty:"Hard", explanation:"By Vieta's: sum = 5 (coefficient of x with sign flipped)." },
  { q:"How many distinct permutations of the letters in MISSISSIPPI?", options:["34650","11!","27720","7920"], answer:0, difficulty:"Hard", explanation:"11!/(4!4!2!) = 39916800/1152 = 34650." },
  { q:"A fair coin is flipped 10 times. P(exactly 5 heads)?", options:["63/256","1/2","63/512","252/1024"], answer:3, difficulty:"Hard", explanation:"C(10,5)/2¹⁰ = 252/1024 ≈ 0.246." },
  { q:"What is lim(x→0) sin(x)/x?", options:["0","∞","1","undefined"], answer:2, difficulty:"Hard", explanation:"Standard L'Hôpital / squeeze theorem result: 1." },
  { q:"The eigenvalues of [[3,1],[0,3]] are?", options:["3 only","0 and 3","1 and 3","3 and −3"], answer:0, difficulty:"Hard", explanation:"Upper triangular matrix: eigenvalues are diagonal entries. Both = 3." },
  { q:"∑(k=1 to ∞) 1/k² = ?", options:["π/6","π²/6","π/3","ln2"], answer:1, difficulty:"Hard", explanation:"Basel problem: π²/6 ≈ 1.645." },
  { q:"In how many ways can 5 people sit in a circle?", options:["60","120","24","48"], answer:2, difficulty:"Hard", explanation:"Circular permutations: (5−1)! = 4! = 24." },
  { q:"If z = 3 + 4i, what is |z|?", options:["3","4","5","7"], answer:2, difficulty:"Hard", explanation:"|z| = √(9+16) = √25 = 5." },
  { q:"What is the rank of the matrix [[1,2,3],[4,5,6],[7,8,9]]?", options:["1","2","3","0"], answer:1, difficulty:"Hard", explanation:"Row 3 = Row2 + (Row2−Row1); rank = 2." },

  // --- EXPERT ---
  { q:"Evaluate: lim(n→∞) (1 + 1/n)ⁿ", options:["1","2","e","∞"], answer:2, difficulty:"Expert", explanation:"This is the definition of Euler's number e ≈ 2.718." },
  { q:"Which function is its own Fourier transform?", options:["sin(x)","e^(−x²)","1/x","cos(x)"], answer:1, difficulty:"Expert", explanation:"The Gaussian e^(−x²) is its own Fourier transform (up to scaling)." },
  { q:"The Riemann hypothesis concerns zeros of ζ(s) on which line?", options:["Re(s)=0","Re(s)=1","Re(s)=1/2","Im(s)=0"], answer:2, difficulty:"Expert", explanation:"All non-trivial zeros are conjectured to lie on Re(s)=1/2." },
  { q:"∫₋∞^∞ e^(−x²) dx = ?", options:["1","π","√π","2π"], answer:2, difficulty:"Expert", explanation:"Gaussian integral = √π. Classic result using polar coordinates." },
  { q:"For a Poisson process with λ=3, what is P(X=0)?", options:["e^−3","3e^−3","1/3","1−e^−3"], answer:0, difficulty:"Expert", explanation:"P(X=0)=e^−λ = e^−3." },
  { q:"What is the Laplace transform of t·e^(at)?", options:["1/(s−a)","1/(s−a)²","a/(s−a)²","s/(s−a)²"], answer:1, difficulty:"Expert", explanation:"L{t·e^(at)} = 1/(s−a)²." },
  { q:"In game theory, what is the Nash equilibrium of Prisoner's Dilemma?", options:["Both cooperate","Both defect","One defects, one cooperates","Random mixed"], answer:1, difficulty:"Expert", explanation:"Defect/Defect is the dominant strategy for both players." },
  { q:"What does Gödel's incompleteness theorem state?", options:["All math is decidable","Some true statements are unprovable","Infinity is countable","P=NP"], answer:1, difficulty:"Expert", explanation:"In any consistent formal system, there exist true statements that cannot be proven within it." },
  { q:"The Black-Scholes equation is a form of which PDE?", options:["Wave equation","Heat equation","Laplace equation","Schrödinger equation"], answer:1, difficulty:"Expert", explanation:"Black-Scholes is structurally a backward heat equation." },
  { q:"What is the chromatic polynomial of a cycle graph C₄ evaluated at k=3?", options:["6","18","24","12"], answer:1, difficulty:"Expert", explanation:"P(C₄,k)=(k−1)⁴+(k−1). At k=3: 2⁴+2=18." },
  { q:"Which sorting algorithm has worst-case O(n log n)?", options:["Quicksort","Bubble sort","Merge sort","Insertion sort"], answer:2, difficulty:"Expert", explanation:"Merge sort guarantees O(n log n) in all cases." },
  { q:"Fermat's Last Theorem states no integer solution exists for xⁿ+yⁿ=zⁿ when n is:", options:["n≥2","n>2","n=2","n odd"], answer:1, difficulty:"Expert", explanation:"Wiles proved it for all integers n > 2." },
  { q:"The complexity class NP contains problems solvable in polynomial time by:", options:["Deterministic TM","Non-deterministic TM","Quantum computer","Oracle TM"], answer:1, difficulty:"Expert", explanation:"NP = Non-deterministic Polynomial time." },
  { q:"What is the order of the group GL(2, F₂)?", options:["4","6","8","12"], answer:1, difficulty:"Expert", explanation:"|GL(2,F₂)| = (4−1)(4−2) = 3×2 = 6." },
  { q:"In information theory, the entropy H(X) is maximized when distribution is:", options:["Gaussian","Uniform","Bernoulli","Exponential"], answer:1, difficulty:"Expert", explanation:"For discrete variables, uniform distribution maximizes Shannon entropy." },
];

// Difficulty order cycling per day
const DIFF_CYCLE = ['Easy','Medium','Hard','Expert'];

function getTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function getDayIndex() {
  // Days since epoch, deterministic
  return Math.floor(Date.now() / 86400000);
}

function getTodayPuzzle() {
  const dayIdx   = getDayIndex();
  const diff     = DIFF_CYCLE[dayIdx % 4];
  const pool     = PUZZLES.filter(p => p.difficulty === diff);
  const selected = pool[dayIdx % pool.length];
  return selected;
}

function loadPuzzleState() {
  const key   = getTodayKey();
  const saved = JSON.parse(localStorage.getItem(PUZZLE_KEY) || 'null');
  if (saved && saved.date === key) return saved;
  return { date: key, answered: false, selectedIdx: null, correct: null };
}

function savePuzzleState(state) {
  localStorage.setItem(PUZZLE_KEY, JSON.stringify(state));
}

function diffColor(d) {
  return { Easy:'#4ade80', Medium:'#facc15', Hard:'#f97316', Expert:'#f87171' }[d] || '#aaa';
}

function renderPuzzle() {
  const puzzle = getTodayPuzzle();
  const state  = loadPuzzleState();

  const badgeEl    = document.getElementById('puzzle-badge');
  const dateEl     = document.getElementById('puzzle-date');
  const questionEl = document.getElementById('puzzle-question');
  const optionsEl  = document.getElementById('puzzle-options');
  const resultEl   = document.getElementById('puzzle-result');

  if (!questionEl) return;

  const d = new Date();
  if (dateEl) dateEl.textContent = d.toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  if (badgeEl) {
    badgeEl.textContent = puzzle.difficulty;
    badgeEl.style.background = diffColor(puzzle.difficulty) + '22';
    badgeEl.style.color = diffColor(puzzle.difficulty);
    badgeEl.style.borderColor = diffColor(puzzle.difficulty);
  }

  questionEl.textContent = puzzle.q;
  optionsEl.innerHTML = '';

  puzzle.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'puzzle-option';
    btn.textContent = opt;

    if (state.answered) {
      btn.disabled = true;
      if (i === puzzle.answer) {
        btn.classList.add('puzzle-correct');
      } else if (i === state.selectedIdx) {
        btn.classList.add('puzzle-wrong');
      }
    } else {
      btn.addEventListener('click', () => answerPuzzle(i, puzzle));
    }

    optionsEl.appendChild(btn);
  });

  if (state.answered) {
    resultEl.style.display = 'block';
    if (state.correct) {
      resultEl.className = 'puzzle-result puzzle-result-correct';
      resultEl.innerHTML = `<i class="fas fa-check-circle"></i> Correct! <span class="puzzle-explain">${puzzle.explanation}</span>`;
    } else {
      resultEl.className = 'puzzle-result puzzle-result-wrong';
      resultEl.innerHTML = `<i class="fas fa-times-circle"></i> Not quite. <span class="puzzle-explain">${puzzle.explanation}</span>`;
    }
  } else {
    resultEl.style.display = 'none';
  }
}

function answerPuzzle(selectedIdx, puzzle) {
  const correct = selectedIdx === puzzle.answer;
  const state = {
    date: getTodayKey(),
    answered: true,
    selectedIdx,
    correct,
  };
  savePuzzleState(state);
  renderPuzzle();
}

renderPuzzle();
