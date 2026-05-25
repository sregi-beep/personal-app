// -----------------------------------------------------------
// QUANT PRACTICE — 100-problem bank
// 5 difficulty levels: Intro, Easy, Medium, Hard, Expert
// Topics: Probability, Statistics, Linear Algebra, Calculus,
//   Stochastic Processes, Options & Derivatives, Portfolio Theory,
//   Fixed Income, Risk Management, Market Microstructure,
//   Regression & ML, Optimization, Game Theory, Financial Math
//
// Each day: seeded shuffle picks 10 problems (2 per difficulty).
// Rotates daily — new set every midnight.
// -----------------------------------------------------------

const QUANT_BANK = [

  // =========================================================
  // INTRO (Level 1)
  // =========================================================
  { level:1, topic:'Probability',
    question:'A fair six-sided die is rolled once. What is the probability of rolling a 4?',
    answer:'There is 1 favorable outcome out of 6 equally likely outcomes. P(4) = 1/6 ≈ 0.167.' },

  { level:1, topic:'Statistics',
    question:'What is the mean of the dataset {2, 4, 6, 8, 10}?',
    answer:'Mean = (2+4+6+8+10)/5 = 30/5 = 6.' },

  { level:1, topic:'Finance Basics',
    question:'If you invest $1000 at a 5% annual simple interest rate for 3 years, how much interest do you earn?',
    answer:'Simple interest = P·r·t = 1000·0.05·3 = $150.' },

  { level:1, topic:'Probability',
    question:'A bag has 3 red and 7 blue balls. What is the probability of drawing a red ball at random?',
    answer:'P(red) = 3/10 = 0.3.' },

  { level:1, topic:'Statistics',
    question:'What is the median of {3, 7, 1, 9, 5}?',
    answer:'Sort: {1,3,5,7,9}. Median is the middle value = 5.' },

  { level:1, topic:'Finance Basics',
    question:'What does a positive correlation between two assets mean for portfolio diversification?',
    answer:'Positive correlation means the assets tend to move together, which reduces diversification benefit. Lower or negative correlation is better for diversification.' },

  { level:1, topic:'Calculus',
    question:'What is the derivative of f(x) = 5x³?',
    answer:'f′(x) = 15x² by the power rule.' },

  { level:1, topic:'Linear Algebra',
    question:'What is the dot product of vectors a = [1, 2] and b = [3, 4]?',
    answer:'a·b = 1·3 + 2·4 = 3 + 8 = 11.' },

  { level:1, topic:'Statistics',
    question:'What does variance measure in a dataset?',
    answer:'Variance measures the average squared deviation from the mean. High variance means data points are spread far from the mean.' },

  { level:1, topic:'Probability',
    question:'Two fair coins are flipped. What is the probability of getting exactly one head?',
    answer:'Outcomes: HH, HT, TH, TT. Exactly one head: HT or TH. P = 2/4 = 1/2.' },

  { level:1, topic:'Finance Basics',
    question:'What is compound interest and how does it differ from simple interest?',
    answer:'Compound interest earns interest on previously accumulated interest, so growth is exponential: A = P(1+r)^t. Simple interest grows linearly: A = P(1+rt).' },

  { level:1, topic:'Probability',
    question:'If P(A) = 0.3 and P(B) = 0.5 and A and B are independent, what is P(A and B)?',
    answer:'For independent events: P(A∩B) = P(A)·P(B) = 0.3·0.5 = 0.15.' },

  // =========================================================
  // EASY (Level 2)
  // =========================================================
  { level:2, topic:'Probability',
    question:'A fair coin is flipped 5 times. What is the probability of getting exactly 3 heads?',
    answer:'C(5,3)/2^5 = 10/32 = 5/16 ≈ 0.3125.' },

  { level:2, topic:'Expectation',
    question:'A stock moves +2% with probability 0.4 and −1% with probability 0.6 each day. What is the expected daily return?',
    answer:'E[R] = 0.4(0.02) + 0.6(−0.01) = 0.008 − 0.006 = 0.002 = 0.2%.' },

  { level:2, topic:'Statistics',
    question:'If X has mean 10 and variance 9, what are the mean and variance of Y = 2X + 3?',
    answer:'E[Y] = 2·10 + 3 = 23. Var(Y) = 4·9 = 36.' },

  { level:2, topic:'Linear Algebra',
    question:'What are the eigenvalues of the matrix [[4,1],[0,2]]?',
    answer:'Upper triangular ⟹ eigenvalues are the diagonal entries: λ = 4 and λ = 2.' },

  { level:2, topic:'Calculus',
    question:'Find the derivative of f(x) = x² eˣ.',
    answer:'Product rule: f′(x) = 2x eˣ + x² eˣ = eˣ(x² + 2x).' },

  { level:2, topic:'Stochastic Processes',
    question:'For standard Brownian motion W_t, what is Var(W_t)?',
    answer:'W_t ~ N(0,t), so Var(W_t) = t.' },

  { level:2, topic:'Options',
    question:'What is the payoff of a European call option at expiration?',
    answer:'Payoff = max(S_T − K, 0), where S_T is the final stock price and K is the strike price.' },

  { level:2, topic:'Covariance',
    question:'Corr(X,Y) = 0.5, Std(X) = 4, Std(Y) = 3. What is Cov(X,Y)?',
    answer:'Cov(X,Y) = Corr·Std(X)·Std(Y) = 0.5·4·3 = 6.' },

  { level:2, topic:'Fixed Income',
    question:'What happens to a bond’s price when interest rates rise?',
    answer:'Bond prices move inversely to interest rates. When rates rise, the present value of future cash flows falls, so bond prices decrease.' },

  { level:2, topic:'Statistics',
    question:'What is the standard deviation of a dataset with variance 25?',
    answer:'Std dev = √25 = 5.' },

  { level:2, topic:'Probability',
    question:'What is the complement rule in probability?',
    answer:'P(Aᶜ) = 1 − P(A). The probability of an event not occurring equals 1 minus the probability it does occur.' },

  { level:2, topic:'Market Making',
    question:'Why do market makers care about inventory risk?',
    answer:'Excess inventory exposes the market maker to adverse price moves. Managing inventory is central to quoting competitive bid-ask spreads safely.' },

  // =========================================================
  // MEDIUM (Level 3)
  // =========================================================
  { level:3, topic:'Conditional Probability',
    question:'P(A) = 0.4, P(B) = 0.5, P(A∩B) = 0.2. What is P(A|B)?',
    answer:'P(A|B) = P(A∩B)/P(B) = 0.2/0.5 = 0.4.' },

  { level:3, topic:'Statistics',
    question:'What is the Central Limit Theorem (CLT) and why is it important in finance?',
    answer:'The CLT states that the sum (or mean) of a large number of i.i.d. random variables converges to a normal distribution, regardless of the underlying distribution. In finance it justifies using normal models for portfolio returns and hypothesis testing.' },

  { level:3, topic:'Portfolio Theory',
    question:'Two assets have returns 8% and 12%, std devs 10% and 20%, and correlation 0.3. What is the variance of an equal-weight portfolio?',
    answer:'Var = 0.25·(0.01) + 0.25·(0.04) + 2·0.5·0.5·0.3·0.1·0.2 = 0.0025 + 0.01 + 0.006 = 0.0185. Std ≈ 13.6%.' },

  { level:3, topic:'Fixed Income',
    question:'A bond has face $1000, 5% annual coupon, 3 years to maturity, YTM = 6%. Approximate its price.',
    answer:'Price = 50/1.06 + 50/1.06² + 1050/1.06³ ≈ 47.17 + 44.50 + 881.68 ≈ $973.35.' },

  { level:3, topic:'Greeks',
    question:'What does Delta of an option measure, and what is Delta of a deep ITM call?',
    answer:'Delta = ∂V/∂S. A deep ITM call has Delta ≈ 1, meaning it moves almost dollar-for-dollar with the stock.' },

  { level:3, topic:'VaR',
    question:'A portfolio has daily mean 0% and daily std dev 1%. At 99% confidence, what is the 1-day VaR?',
    answer:'VaR₉₉ = z₉₉·σ = 2.326·0.01 ≈ 2.33% of portfolio value.' },

  { level:3, topic:'Regression',
    question:'In OLS regression Y = βX + ε, what is the estimator β̂?',
    answer:'β̂ = (XᵀX)⁻¹XᵀY. In the univariate case: β̂ = Cov(X,Y)/Var(X).' },

  { level:3, topic:'Sharpe Ratio',
    question:'A fund returns 15% with 20% volatility. Risk-free rate is 3%. Compute the Sharpe ratio.',
    answer:'Sharpe = (15 − 3)/20 = 0.6. Above 1 is considered strong; 0.6 is modest.' },

  { level:3, topic:'Probability',
    question:'What is the expected value of rolling a fair six-sided die?',
    answer:'E[X] = (1+2+3+4+5+6)/6 = 21/6 = 3.5.' },

  { level:3, topic:'Calculus',
    question:'Evaluate the integral ∫₀¹ x² dx.',
    answer:'∫₀¹ x² dx = [x³/3]₀¹ = 1/3.' },

  { level:3, topic:'Stochastic Processes',
    question:'What does it mean for a process to be a martingale?',
    answer:'A process M_t is a martingale if E[M_t | F_s] = M_s for all s < t. In other words, the best prediction of the future value is the current value.' },

  { level:3, topic:'Linear Algebra',
    question:'What conditions make a square matrix invertible?',
    answer:'A matrix is invertible if and only if its determinant is non-zero, equivalently if all its eigenvalues are non-zero, and its rows (columns) are linearly independent.' },

  { level:3, topic:'Options',
    question:'What is put-call parity for European options?',
    answer:'C − P = S − K·e^(−rT). A call minus a put with same strike and expiry equals the stock minus the discounted strike. Violation implies arbitrage.' },

  // =========================================================
  // HARD (Level 4)
  // =========================================================
  { level:4, topic:'Itô Calculus',
    question:'If S follows dS = μS dt + σS dW, derive d(ln S) using Itô’s lemma.',
    answer:'Let f = ln S. f′ = 1/S, f″ = −1/S². Itô: d(ln S) = (1/S)dS − (σ²S²/2S²)dt = (μ − σ²/2)dt + σ dW.' },

  { level:4, topic:'Risk-Neutral Pricing',
    question:'Why does the stock drift at rate r (not μ) under the risk-neutral measure?',
    answer:'Under the risk-neutral measure Q, we remove the market price of risk by a Girsanov change of measure. This sets every asset’s drift to r so that discounted prices are martingales, enabling no-arbitrage derivative pricing.' },

  { level:4, topic:'Martingales',
    question:'Show that W_t² − t is a martingale for standard Brownian motion.',
    answer:'By Itô: d(W_t²) = 2W_t dW_t + dt. So d(W_t² − t) = 2W_t dW_t. This has no dt term, so it is a local martingale. With integrability conditions it is a true martingale.' },

  { level:4, topic:'Black-Scholes',
    question:'State the Black-Scholes PDE for a derivative V(S,t).',
    answer:'∂V/∂t + rS·∂V/∂S + (σ²S²/2)·∂²V/∂S² − rV = 0. This is a backward parabolic PDE structurally equivalent to the heat equation.' },

  { level:4, topic:'Conditional Probability',
    question:'A disease affects 1% of the population. A test is 99% sensitive and 99% specific. You test positive. What is P(disease)?',
    answer:'Bayes: P = (0.99·0.01)/(0.99·0.01 + 0.01·0.99) = 0.0099/0.0198 = 50%. Even a highly accurate test has high false positive rates for rare diseases.' },

  { level:4, topic:'Portfolio Optimization',
    question:'State the Markowitz mean-variance optimization problem.',
    answer:'Minimize wᵀΣw subject to wᵀμ = μ_target and wᵀ1 = 1. Here w = portfolio weights, Σ = covariance matrix, μ = expected returns vector. Solution traces the efficient frontier.' },

  { level:4, topic:'Fixed Income',
    question:'What is duration and how does it relate to interest rate sensitivity?',
    answer:'Modified Duration = −(1/P)·dP/dy. A bond with duration D loses approximately D% in price for every 1% rise in yield. It is the weighted average time to receive cash flows.' },

  { level:4, topic:'Statistics',
    question:'What is the difference between Type I and Type II errors in hypothesis testing?',
    answer:'Type I error (α): rejecting a true null hypothesis (false positive). Type II error (β): failing to reject a false null (false negative). Power = 1 − β.' },

  { level:4, topic:'Stochastic Calculus',
    question:'State Itô’s lemma for a function f(t, W_t).',
    answer:'df = (∂f/∂t)dt + (∂f/∂x)dW_t + (1/2)(∂²f/∂x²)dt. The extra second-derivative term comes from (dW)^2 = dt.' },

  { level:4, topic:'Greeks',
    question:'A call has Gamma 0.05 and Delta 0.5. If the stock jumps +$2, what is the approximate new Delta?',
    answer:'ΔDelta ≈ Gamma·ΔS = 0.05·2 = 0.10. New Delta ≈ 0.60.' },

  { level:4, topic:'Regression',
    question:'What is multicollinearity in regression and why is it a problem?',
    answer:'Multicollinearity means regressors are highly correlated. It inflates variance of coefficient estimates, making them unstable and hard to interpret.' },

  { level:4, topic:'Probability',
    question:'If X and Y are i.i.d. Uniform(0,1), what is E[max(X,Y)]?',
    answer:'For the maximum of two i.i.d. Uniform(0,1), E[max(X,Y)] = 2/3.' },

  { level:4, topic:'Market Microstructure',
    question:'What is adverse selection in market making and how does it affect spreads?',
    answer:'Adverse selection is the risk that better-informed traders trade against the market maker. To compensate, market makers widen spreads.' },

  // =========================================================
  // EXPERT (Level 5)
  // =========================================================
  { level:5, topic:'Stochastic Calculus',
    question:'State the Girsanov theorem and explain its role in derivatives pricing.',
    answer:'Girsanov says a Brownian motion under one measure can become a Brownian motion with shifted drift under another equivalent measure. In pricing, it changes the real-world measure into the risk-neutral measure so discounted asset prices become martingales.' },

  { level:5, topic:'Black-Scholes',
    question:'Derive the Black-Scholes call price formula from the risk-neutral expectation.',
    answer:'Under Q, C = e^(−rT)E[max(S_T−K,0)]. Since log S_T is normal, evaluating the truncated expectation yields C = S_0N(d_1) − Ke^(−rT)N(d_2), where d_1 = [ln(S/K)+(r+σ²/2)T]/(σ√T), d_2 = d_1 − σ√T.' },

  { level:5, topic:'Measure Theory',
    question:'What is the Radon-Nikodým theorem and why does it matter in quantitative finance?',
    answer:'It says that if one measure is absolutely continuous with respect to another, there exists a density dQ/dP relating them. In finance, this density connects the real-world and risk-neutral measures.' },

  { level:5, topic:'Interest Rate Models',
    question:'Write down the Vasicek model and describe its key property.',
    answer:'dr_t = κ(θ − r_t)dt + σ dW_t. Its key property is mean reversion: rates tend to move back toward long-run level θ.' },

  { level:5, topic:'Portfolio Theory',
    question:'What is beta in CAPM and how is it defined?',
    answer:'β_i = Cov(R_i, R_m) / Var(R_m). It measures an asset’s sensitivity to market returns.' },

  { level:5, topic:'Numerical Methods',
    question:'How does Monte Carlo pricing of a European option work?',
    answer:'Simulate many terminal prices under the risk-neutral measure, compute the discounted payoff for each path, then average. Accuracy improves like 1/√N.' },

  { level:5, topic:'Exotic Options',
    question:'Why is an arithmetic Asian option harder to price than a vanilla European option?',
    answer:'Its payoff depends on the path average, not just terminal price. That destroys the simple lognormal closed form, so pricing often needs Monte Carlo or PDE methods.' },

  { level:5, topic:'Risk Management',
    question:'Why is Expected Shortfall often preferred to VaR?',
    answer:'VaR gives only a threshold loss, while Expected Shortfall measures the average loss beyond that threshold. ES captures tail severity and is a coherent risk measure.' },

  { level:5, topic:'Stochastic Volatility',
    question:'State the Heston model SDEs.',
    answer:'dS = μSdt + √v S dW_1 and dv = κ(θ−v)dt + ξ√v dW_2 with corr(dW_1,dW_2)=ρdt. Variance itself is stochastic and mean-reverting.' },

  { level:5, topic:'Optimization',
    question:'State the KKT conditions for constrained optimization.',
    answer:'They are stationarity, primal feasibility, dual feasibility, and complementary slackness. Together they characterize optimality for constrained problems under regularity conditions.' },

  { level:5, topic:'Information Theory',
    question:'What is the Kelly Criterion used for?',
    answer:'It gives the bankroll fraction that maximizes expected log wealth growth over repeated bets or trades.' },

  { level:5, topic:'Volatility',
    question:'What is implied volatility and what does a volatility smile suggest?',
    answer:'Implied volatility is the volatility input that matches an option’s market price. A smile suggests the constant-volatility Black-Scholes model is misspecified.' }
];

function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(s) / 0xffffffff;
  };
}

function getDayIndex() {
  return Math.floor(Date.now() / 86400000);
}

function getDailyProblems() {
  const rng = seededRandom(getDayIndex());
  const levels = [1,2,3,4,5];
  const result = [];

  for (const lvl of levels) {
    const pool = QUANT_BANK.filter(p => p.level === lvl);
    const indices = pool.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    result.push(pool[indices[0]], pool[indices[1]]);
  }

  return result;
}

const LEVEL_LABELS = { 1:'Intro', 2:'Easy', 3:'Medium', 4:'Hard', 5:'Expert' };
const LEVEL_COLORS = { 1:'#4ade80', 2:'#60a5fa', 3:'#facc15', 4:'#f97316', 5:'#f87171' };

const DAILY_PROBLEMS = getDailyProblems();
let quantIndex = 0;

function renderQuantProblem() {
  const numberEl = document.getElementById('quant-problem-number');
  const questionEl = document.getElementById('quant-problem-question');
  const answerEl = document.getElementById('quant-problem-answer');
  const showBtn = document.getElementById('quant-show-answer');
  if (!numberEl || !questionEl || !answerEl) return;

  const p = DAILY_PROBLEMS[quantIndex];
  const col = LEVEL_COLORS[p.level];
  const lbl = LEVEL_LABELS[p.level];

  numberEl.innerHTML = `Problem ${quantIndex + 1} of ${DAILY_PROBLEMS.length} &nbsp;&bull;&nbsp; <span style="color:${col};font-weight:700">${lbl}</span> &nbsp;&bull;&nbsp; ${p.topic}`;
  questionEl.textContent = p.question;
  answerEl.textContent = p.answer;
  answerEl.style.display = 'none';
  if (showBtn) showBtn.innerHTML = '<i class="fas fa-eye"></i> Show Answer';
}

const showBtn = document.getElementById('quant-show-answer');
const nextBtn = document.getElementById('quant-next-problem');
const prevBtn = document.getElementById('quant-prev-problem');

if (showBtn) {
  showBtn.addEventListener('click', () => {
    const el = document.getElementById('quant-problem-answer');
    if (el) el.style.display = 'block';
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
