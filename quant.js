// -----------------------------------------------------------
// QUANT PRACTICE — 20-problem bank
// Each day a seeded shuffle picks 10 problems from the full bank.
// Problems rotate daily so you never see the same set two days in a row.
// -----------------------------------------------------------

const QUANT_BANK = [
  // --- ORIGINAL 10 (moderate) ---
  {
    topic: 'Probability',
    question: 'A fair coin is flipped 5 times. What is the probability of getting exactly 3 heads?',
    answer: 'Use the binomial formula: C(5,3) / 2^5 = 10/32 = 5/16 ≈ 0.3125.'
  },
  {
    topic: 'Expectation',
    question: 'A stock moves +2% with probability 0.4 and −1% with probability 0.6 each day. What is the expected daily return?',
    answer: 'E[R] = 0.4(0.02) + 0.6(−0.01) = 0.008 − 0.006 = 0.002 = 0.2%.'
  },
  {
    topic: 'Statistics',
    question: 'If X has mean 10 and variance 9, what are the mean and variance of Y = 2X + 3?',
    answer: 'E[Y] = 2·10 + 3 = 23. Var(Y) = 4·9 = 36.'
  },
  {
    topic: 'Linear Algebra',
    question: 'What are the eigenvalues of the matrix [[4,1],[0,2]]?',
    answer: 'Upper triangular ⟹ eigenvalues are the diagonal entries: λ = 4 and λ = 2.'
  },
  {
    topic: 'Calculus',
    question: 'Find the derivative of f(x) = x² eˣ.',
    answer: 'Product rule: f′(x) = 2x eˣ + x² eˣ = eˣ(x² + 2x).'
  },
  {
    topic: 'Stochastic Processes',
    question: 'For standard Brownian motion W_t, what is Var(W_t)?',
    answer: 'W_t ~ N(0,t), so Var(W_t) = t.'
  },
  {
    topic: 'Options',
    question: 'A European call option is in the money when what condition holds at expiration?',
    answer: 'Payoff = max(S_T − K, 0). It is in the money when S_T > K.'
  },
  {
    topic: 'Covariance',
    question: 'Corr(X,Y) = 0.5, Std(X) = 4, Std(Y) = 3. What is Cov(X,Y)?',
    answer: 'Cov(X,Y) = Corr·Std(X)·Std(Y) = 0.5·4·3 = 6.'
  },
  {
    topic: 'Optimization',
    question: 'What point minimizes f(x) = (x − 7)² + 4?',
    answer: 'Minimum at x = 7, giving f(7) = 4.'
  },
  {
    topic: 'Market Making',
    question: 'Why do market makers care about inventory risk?',
    answer: 'Excess inventory exposes the market maker to adverse price moves. Inventory risk directly affects bid-ask spread and quoting strategy.'
  },

  // --- HARDER 10 ---
  {
    topic: 'Itô Calculus',
    question: 'Using Itô\'s lemma, if S follows dS = μS dt + σS dW, what is d(ln S)?',
    answer: 'd(ln S) = (μ − σ²/2) dt + σ dW. The σ²/2 correction arises from the second-order Itô term.'
  },
  {
    topic: 'Risk-Neutral Pricing',
    question: 'In the risk-neutral world, what drift does a stock price process use, and why?',
    answer: 'Under the risk-neutral measure Q, stocks drift at the risk-free rate r (not the real-world drift μ). This ensures no-arbitrage pricing of derivatives.'
  },
  {
    topic: 'Portfolio Theory',
    question: 'Two assets have expected returns 8% and 12%, standard deviations 10% and 20%, and correlation 0.3. What is the variance of an equal-weight portfolio?',
    answer: 'Var = 0.25·(0.1)² + 0.25·(0.2)² + 2·0.5·0.5·0.3·0.1·0.2 = 0.0025 + 0.01 + 0.006 = 0.0185. Std ≈ 13.6%.'
  },
  {
    topic: 'Fixed Income',
    question: 'A bond with face value $1000, 5% annual coupon, 3 years to maturity, and YTM = 6%. What is its price (approximately)?',
    answer: 'Price = 50/1.06 + 50/1.06² + 1050/1.06³ ≈ 47.17 + 44.50 + 881.68 ≈ $973.35.'
  },
  {
    topic: 'Greeks',
    question: 'What does Delta of an option measure, and what is the Delta of a deep in-the-money call?',
    answer: 'Delta = ∂V/∂S, the sensitivity of option price to the underlying. A deep ITM call has Delta ≈ 1 (moves almost dollar-for-dollar with the stock).'
  },
  {
    topic: 'Conditional Probability',
    question: 'A test is 99% accurate for a disease affecting 1% of the population. You test positive. What is P(disease | positive)?',
    answer: 'Bayes: P = (0.99·0.01) / (0.99·0.01 + 0.01·0.99) = 0.0099/0.0198 = 50%. False positives dominate rare diseases.'
  },
  {
    topic: 'VaR',
    question: 'A portfolio has daily mean return 0 and daily std dev 1%. At 99% confidence, what is the 1-day VaR (assume normality)?',
    answer: 'VaR₉₉ = 2.326 · 1% ≈ 2.33%. So there is a 1% chance of losing more than 2.33% in one day.'
  },
  {
    topic: 'Martingales',
    question: 'Is W_t² − t a martingale, where W_t is standard Brownian motion? Justify.',
    answer: 'Yes. By Itô\'s lemma d(W_t²) = 2W_t dW_t + dt, so d(W_t² − t) = 2W_t dW_t, which is a local martingale with no dt term.'
  },
  {
    topic: 'Regression',
    question: 'In OLS regression Y = βX + ε, what is the formula for the least-squares estimator β̂?',
    answer: 'β̂ = (XᵀX)⁻¹ Xᵀ Y. In the univariate case: β̂ = Cov(X,Y) / Var(X).'
  },
  {
    topic: 'Sharpe Ratio',
    question: 'A strategy returns 15% annually with 20% volatility. The risk-free rate is 3%. What is its Sharpe ratio? Is it good?',
    answer: 'Sharpe = (15% − 3%) / 20% = 0.6. A Sharpe above 1 is considered strong; 0.6 is modest but acceptable for most strategies.'
  }
];

// -----------------------------------------------------------
// Deterministic daily shuffle using day-index as seed
// Produces a consistent 10-problem set for each calendar day
// -----------------------------------------------------------
function seededShuffle(arr, seed) {
  const a = [...arr.keys()]; // indices [0..n-1]
  let s = seed;
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.map(i => arr[i]);
}

function getDayIndex() {
  return Math.floor(Date.now() / 86400000);
}

function getDailyProblems() {
  const shuffled = seededShuffle(QUANT_BANK, getDayIndex());
  return shuffled.slice(0, 10);
}

// -----------------------------------------------------------
// Render logic
// -----------------------------------------------------------
const DAILY_PROBLEMS = getDailyProblems();
let quantIndex = 0;

function renderQuantProblem() {
  const numberEl   = document.getElementById('quant-problem-number');
  const questionEl = document.getElementById('quant-problem-question');
  const answerEl   = document.getElementById('quant-problem-answer');
  const showBtn    = document.getElementById('quant-show-answer');
  if (!numberEl || !questionEl || !answerEl) return;

  const p = DAILY_PROBLEMS[quantIndex];
  numberEl.textContent   = `Problem ${quantIndex + 1} of ${DAILY_PROBLEMS.length} · ${p.topic}`;
  questionEl.textContent = p.question;
  answerEl.textContent   = p.answer;
  answerEl.style.display = 'none';
  if (showBtn) showBtn.textContent = '👁 Show Answer';
}

const showBtn = document.getElementById('quant-show-answer');
const nextBtn = document.getElementById('quant-next-problem');
const prevBtn = document.getElementById('quant-prev-problem');

if (showBtn) {
  showBtn.addEventListener('click', () => {
    const answerEl = document.getElementById('quant-problem-answer');
    if (answerEl) answerEl.style.display = 'block';
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    quantIndex = (quantIndex + 1) % DAILY_PROBLEMS.length;
    renderQuantProblem();
  });
}

if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    quantIndex = (quantIndex - 1 + DAILY_PROBLEMS.length) % DAILY_PROBLEMS.length;
    renderQuantProblem();
  });
}

renderQuantProblem();
