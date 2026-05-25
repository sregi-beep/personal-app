const QUANT_PROBLEMS = [
  {
    topic: 'Probability',
    question: 'A fair coin is flipped 5 times. What is the probability of getting exactly 3 heads?',
    answer: 'Use the binomial formula: C(5,3) / 2^5 = 10 / 32 = 5/16 = 0.3125.'
  },
  {
    topic: 'Expectation',
    question: 'A stock moves +2% with probability 0.4 and -1% with probability 0.6 in one day. What is the expected return?',
    answer: 'Expected return = 0.4(0.02) + 0.6(-0.01) = 0.008 - 0.006 = 0.002, or 0.2%.'
  },
  {
    topic: 'Statistics',
    question: 'If X has mean 10 and variance 9, what are the mean and variance of Y = 2X + 3?',
    answer: 'E[Y] = 2E[X] + 3 = 23. Var(Y) = 2^2 Var(X) = 4*9 = 36.'
  },
  {
    topic: 'Linear Algebra',
    question: 'What are the eigenvalues of the matrix [[4, 1], [0, 2]]?',
    answer: 'Because the matrix is upper triangular, the eigenvalues are the diagonal entries: 4 and 2.'
  },
  {
    topic: 'Calculus',
    question: 'Find the derivative of f(x) = x^2 e^x.',
    answer: 'Use the product rule: f\'(x) = 2x e^x + x^2 e^x = e^x(x^2 + 2x).'
  },
  {
    topic: 'Stochastic Processes',
    question: 'For standard Brownian motion W_t, what is Var(W_t)?',
    answer: 'For standard Brownian motion, W_t ~ N(0, t), so Var(W_t) = t.'
  },
  {
    topic: 'Options',
    question: 'A European call option finishes in the money when what condition holds at expiration?',
    answer: 'A call is in the money when the stock price S_T is greater than the strike K, so payoff = max(S_T - K, 0).' 
  },
  {
    topic: 'Covariance',
    question: 'If Corr(X,Y)=0.5, Std(X)=4, and Std(Y)=3, what is Cov(X,Y)?',
    answer: 'Cov(X,Y) = Corr(X,Y) * Std(X) * Std(Y) = 0.5 * 4 * 3 = 6.'
  },
  {
    topic: 'Optimization',
    question: 'What point minimizes f(x) = (x - 7)^2 + 4?',
    answer: 'The squared term is minimized at x = 7, so the minimum occurs at x = 7 with value 4.'
  },
  {
    topic: 'Market Making',
    question: 'Why do market makers care about inventory risk?',
    answer: 'Holding too much long or short inventory exposes a market maker to adverse price moves. Inventory risk affects quoting and spread decisions.'
  }
];

let quantIndex = 0;

function renderQuantProblem() {
  const numberEl = document.getElementById('quant-problem-number');
  const questionEl = document.getElementById('quant-problem-question');
  const answerEl = document.getElementById('quant-problem-answer');
  if (!numberEl || !questionEl || !answerEl) return;

  const p = QUANT_PROBLEMS[quantIndex];
  numberEl.textContent = `Problem ${quantIndex + 1} of ${QUANT_PROBLEMS.length} · ${p.topic}`;
  questionEl.textContent = p.question;
  answerEl.textContent = p.answer;
  answerEl.style.display = 'none';
}

const showBtn = document.getElementById('quant-show-answer');
const nextBtn = document.getElementById('quant-next-problem');

if (showBtn) {
  showBtn.addEventListener('click', () => {
    const answerEl = document.getElementById('quant-problem-answer');
    if (answerEl) answerEl.style.display = 'block';
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    quantIndex = (quantIndex + 1) % QUANT_PROBLEMS.length;
    renderQuantProblem();
  });
}

renderQuantProblem();
