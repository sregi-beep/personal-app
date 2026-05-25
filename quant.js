// ============================================================
// QUANT PRACTICE — 100+ problem bank
// 5 levels: 1=Intro 2=Easy 3=Medium 4=Hard 5=Expert
// 8 topic groups: Probability, Statistics, Stochastic Calculus,
//   Derivatives, Portfolio, Linear Algebra, Risk, Finance
//
// Daily: seeded shuffle picks 2 per level (10 total).
// Topic filter narrows the viewed set from today's 10.
// ============================================================

const QUANT_BANK = [

  // ---- PROBABILITY ----------------------------------------
  { level:1, group:'Probability', topic:'Probability',
    question:'A fair six-sided die is rolled. What is P(rolling a number > 4)?',
    answer:'Favorable outcomes: 5 and 6. P = 2/6 = 1/3.' },

  { level:1, group:'Probability', topic:'Probability',
    question:'A bag has 4 red, 6 blue balls. What is P(blue)?',
    answer:'P(blue) = 6/10 = 0.6.' },

  { level:2, group:'Probability', topic:'Probability',
    question:'A fair coin is flipped 5 times. What is P(exactly 3 heads)?',
    answer:'C(5,3)/2^5 = 10/32 = 5/16 ≈ 0.3125.' },

  { level:2, group:'Probability', topic:'Conditional Probability',
    question:'P(A)=0.4, P(B)=0.5, P(A∩B)=0.2. Find P(A|B).',
    answer:'P(A|B) = P(A∩B)/P(B) = 0.2/0.5 = 0.4.' },

  { level:3, group:'Probability', topic:'Bayes Theorem',
    question:'A disease affects 1% of people. A test is 99% sensitive and 99% specific. You test positive. What is P(disease | positive)?',
    answer:'Bayes: (0.99×0.01)/[(0.99×0.01)+(0.01×0.99)] = 0.0099/0.0198 = 50%.' },

  { level:3, group:'Probability', topic:'Expectation',
    question:'X ~ Binomial(n=10, p=0.3). What are E[X] and Var(X)?',
    answer:'E[X] = np = 3. Var(X) = np(1−p) = 10×0.3×0.7 = 2.1.' },

  { level:4, group:'Probability', topic:'Order Statistics',
    question:'X,Y are i.i.d. Uniform(0,1). What is E[max(X,Y)]?',
    answer:'E[X_(2:2)] = 2/(2+1) = 2/3 for Uniform(0,1).' },

  { level:4, group:'Probability', topic:'Generating Functions',
    question:'What is the moment generating function of X ~ N(μ,σ²)?',
    answer:'M_X(t) = E[e^{tX}] = exp(μt + σ²t²/2). Obtained by completing the square in the Gaussian integral.' },

  { level:5, group:'Probability', topic:'Optional Stopping',
    question:'State the Optional Stopping Theorem and a condition for it to hold.',
    answer:'E[M_τ] = E[M_0] for martingale M_t and stopping time τ, provided τ is bounded or M is uniformly integrable.' },

  { level:5, group:'Probability', topic:'Concentration Inequalities',
    question:'State Markov’s inequality and Chebyshev’s inequality.',
    answer:'Markov: P(X≥a) ≤ E[X]/a for non-negative X. Chebyshev: P(|X−μ|≥kσ) ≤ 1/k². Chebyshev follows from Markov applied to (X−μ)².' },

  // ---- STATISTICS -----------------------------------------
  { level:1, group:'Statistics', topic:'Descriptive Stats',
    question:'What is the median of {3,7,1,9,5}?',
    answer:'Sorted: {1,3,5,7,9}. Median = 5.' },

  { level:1, group:'Statistics', topic:'Descriptive Stats',
    question:'What does variance measure?',
    answer:'Variance = E[(X−μ)²], the average squared deviation from the mean.' },

  { level:2, group:'Statistics', topic:'Linear Transforms',
    question:'X has mean 10, variance 9. What are E[Y] and Var(Y) for Y = 2X+3?',
    answer:'E[Y] = 23, Var(Y) = 4×9 = 36.' },

  { level:2, group:'Statistics', topic:'Normal Distribution',
    question:'What is the 97.5th percentile of N(0,1)?',
    answer:'z = 1.96. Used in 95% two-sided confidence intervals.' },

  { level:3, group:'Statistics', topic:'CLT',
    question:'State the Central Limit Theorem.',
    answer:'For i.i.d. X_i with mean μ and variance σ², (ΣX_i − nμ)/(  σ√n) → N(0,1) as n→∞.' },

  { level:3, group:'Statistics', topic:'Hypothesis Testing',
    question:'What is the difference between Type I and Type II errors?',
    answer:'Type I (α): reject a true null. Type II (β): fail to reject a false null. Power = 1−β.' },

  { level:4, group:'Statistics', topic:'Regression',
    question:'In OLS Y = βX + ε, what is β̂ and what assumptions are needed?',
    answer:'β̂ = (XᵀX)⁻¹XᵀY. Key assumptions: linearity, exogeneity E[ε|X]=0, homoskedasticity, no perfect multicollinearity.' },

  { level:4, group:'Statistics', topic:'MLE',
    question:'What is Maximum Likelihood Estimation (MLE)?',
    answer:'MLE finds parameters θ that maximize L(θ) = P(data|θ). Equivalently minimizes −log-likelihood. Under regularity conditions MLE is consistent, asymptotically efficient and normal.' },

  { level:5, group:'Statistics', topic:'Time Series',
    question:'What is an AR(1) process and when is it stationary?',
    answer:'X_t = φX_{t−1} + ε_t. Stationary when |φ| < 1. Mean = 0, Var = σ²/(1−φ²).' },

  { level:5, group:'Statistics', topic:'Bootstrapping',
    question:'What is the bootstrap method and what does it estimate?',
    answer:'Bootstrap resamples the observed data with replacement many times to empirically approximate the sampling distribution of any statistic, without assuming a parametric form.' },

  // ---- STOCHASTIC CALCULUS --------------------------------
  { level:2, group:'Stochastic Calculus', topic:'Brownian Motion',
    question:'What are the key properties of standard Brownian motion W_t?',
    answer:'W_0=0, independent increments, W_t−W_s ~ N(0,t−s), and paths are continuous but nowhere differentiable.' },

  { level:2, group:'Stochastic Calculus', topic:'Martingales',
    question:'What does it mean for a process to be a martingale?',
    answer:'E[M_t | F_s] = M_s for all s < t. Best forecast of the future equals the current value.' },

  { level:3, group:'Stochastic Calculus', topic:'Martingales',
    question:'Is W_t² − t a martingale? Justify.',
    answer:'Yes. By Itô: d(W_t²−t) = 2W_t dW_t. No dt term means it is a local (and true) martingale.' },

  { level:3, group:'Stochastic Calculus', topic:'Itô Calculus',
    question:'State Itô’s lemma for f(t, W_t).',
    answer:'df = ∂f/∂t dt + ∂f/∂x dW_t + (1/2)∂²f/∂x² dt. The extra second-order term arises because (dW)^2 = dt.' },

  { level:4, group:'Stochastic Calculus', topic:'Itô Calculus',
    question:'If dS = μS dt + σS dW, derive d(ln S).',
    answer:'Apply Itô with f=ln S: d(ln S) = (μ − σ²/2)dt + σ dW. The σ²/2 drift correction is the Itô convexity term.' },

  { level:4, group:'Stochastic Calculus', topic:'SDEs',
    question:'What is the solution to the SDE dX_t = μX_t dt + σX_t dW_t?',
    answer:'X_t = X_0 exp[(μ−σ²/2)t + σW_t]. This is Geometric Brownian Motion.' },

  { level:5, group:'Stochastic Calculus', topic:'Girsanov',
    question:'State Girsanov’s theorem and explain its use.',
    answer:'Girsanov: under a new measure Q defined by dQ/dP = exp(−∫θ_s dW_s − θ²t/2), the process Wᵗ_t = W_t + ∫θ_s ds is a Q-Brownian motion. In pricing, θ removes the excess drift μ−r, making discounted asset prices Q-martingales.' },

  { level:5, group:'Stochastic Calculus', topic:'Feynman-Kac',
    question:'State the Feynman-Kac formula.',
    answer:'If u(t,x) = E^x[e^{-rT} g(X_T)], then u solves ∂u/∂t + Lu − ru = 0 with terminal condition u(T,x)=g(x), where L is the generator of X. This connects PDEs to expectations over stochastic processes.' },

  // ---- DERIVATIVES ----------------------------------------
  { level:1, group:'Derivatives', topic:'Options Basics',
    question:'What is the payoff of a European call at expiration?',
    answer:'max(S_T − K, 0). You profit only if the stock finishes above strike K.' },

  { level:2, group:'Derivatives', topic:'Put-Call Parity',
    question:'State put-call parity for European options.',
    answer:'C − P = S − Ke^{−rT}. Violation implies riskless arbitrage.' },

  { level:3, group:'Derivatives', topic:'Greeks',
    question:'Define Delta, Gamma, Vega, Theta, Rho for options.',
    answer:'Delta=∂V/∂S, Gamma=∂²V/∂S², Vega=∂V/∂σ, Theta=∂V/∂t, Rho=∂V/∂r. Together they capture first- and second-order sensitivities.' },

  { level:3, group:'Derivatives', topic:'Greeks',
    question:'A call has Gamma 0.05 and Delta 0.5. Stock jumps +$2. What is the new approximate Delta?',
    answer:'ΔDelta ≈ Gamma×ΔS = 0.1. New Delta ≈ 0.60.' },

  { level:4, group:'Derivatives', topic:'Black-Scholes',
    question:'State the Black-Scholes PDE for derivative V(S,t).',
    answer:'∂V/∂t + rS∂V/∂S + (σ²S²/2)∂²V/∂S² − rV = 0. Terminal condition V(S,T) = payoff(S).' },

  { level:4, group:'Derivatives', topic:'Black-Scholes',
    question:'What is the Black-Scholes formula for a European call?',
    answer:'C = S N(d1) − Ke^{−rT} N(d2), where d1=[ln(S/K)+(r+σ²/2)T]/(σ√T), d2=d1−σ√T.' },

  { level:5, group:'Derivatives', topic:'Exotic Options',
    question:'Why is an arithmetic Asian option harder to price than a vanilla European?',
    answer:'Its payoff depends on the path average. The arithmetic average of log-normals is not log-normal, so there is no closed-form solution and Monte Carlo or PDE methods are needed.' },

  { level:5, group:'Derivatives', topic:'Implied Volatility',
    question:'What is implied volatility and what does a volatility smile imply?',
    answer:'Implied vol is the σ that equates B-S formula to market price. A smile (ITM/OTM implied vols > ATM) means the market prices fat tails and skew not captured by constant-σ B-S.' },

  // ---- PORTFOLIO ------------------------------------------
  { level:1, group:'Portfolio', topic:'Diversification',
    question:'Why does adding uncorrelated assets to a portfolio reduce risk?',
    answer:'Idiosyncratic shocks average out across many uncorrelated assets. Portfolio variance → 0 as n→∞ (for equal weights, zero correlation). Only systematic risk remains.' },

  { level:2, group:'Portfolio', topic:'Portfolio Variance',
    question:'Two assets, weights 50/50, std devs 10% and 20%, correlation 0.3. What is portfolio variance?',
    answer:'Var = 0.25(0.01) + 0.25(0.04) + 2(0.5)(0.5)(0.3)(0.1)(0.2) = 0.0025+0.01+0.006 = 0.0185.' },

  { level:3, group:'Portfolio', topic:'Sharpe Ratio',
    question:'A fund returns 15% with 20% vol. Rf=3%. Compute Sharpe ratio.',
    answer:'Sharpe = (15−3)/20 = 0.6.' },

  { level:3, group:'Portfolio', topic:'CAPM',
    question:'State the CAPM formula and interpret beta.',
    answer:'E[R_i] = Rf + β_i(E[Rm]−Rf). Beta = Cov(R_i,Rm)/Var(Rm) measures systematic risk relative to the market.' },

  { level:4, group:'Portfolio', topic:'Markowitz',
    question:'State the Markowitz portfolio optimization problem.',
    answer:'min wᵀΣw subject to wᵀμ=μ_target and wᵀ1=1. The solution traces the efficient frontier in mean-variance space.' },

  { level:4, group:'Portfolio', topic:'Factor Models',
    question:'What is the Fama-French 3-factor model?',
    answer:'R_i − Rf = α + β_mkt(Rm−Rf) + β_smb SMB + β_hml HML + ε. SMB is small-minus-big (size premium), HML is high-minus-low (value premium).' },

  { level:5, group:'Portfolio', topic:'Risk Parity',
    question:'What is risk parity and how does it differ from mean-variance optimization?',
    answer:'Risk parity allocates so each asset contributes equally to total portfolio risk (not equal capital). Unlike MV it requires no return forecasts, only covariance estimates, and tends to be more stable out-of-sample.' },

  { level:5, group:'Portfolio', topic:'Kelly Criterion',
    question:'Derive the Kelly Criterion for a simple bet paying b:1 with win probability p.',
    answer:'Maximize E[ln W]. Set d/df E[ln(1+fX)] = 0: p/(1+fb) − (1−p)/(1−f) = 0. Solution: f* = p − (1−p)/b = (pb−(1−p))/b.' },

  // ---- LINEAR ALGEBRA ------------------------------------
  { level:1, group:'Linear Algebra', topic:'Vectors',
    question:'What is the dot product of a=[1,2] and b=[3,4]?',
    answer:'a·b = 1×3 + 2×4 = 11.' },

  { level:2, group:'Linear Algebra', topic:'Eigenvalues',
    question:'What are the eigenvalues of [[4,1],[0,2]]?',
    answer:'Upper triangular ⟹ eigenvalues = diagonal: 4 and 2.' },

  { level:3, group:'Linear Algebra', topic:'Invertibility',
    question:'When is a square matrix invertible?',
    answer:'When det(A) ≠ 0, equivalently all eigenvalues are non-zero, and rows/columns are linearly independent.' },

  { level:3, group:'Linear Algebra', topic:'PCA',
    question:'What is PCA and how is it computed?',
    answer:'PCA finds orthogonal directions (principal components) of maximum variance. Compute the covariance matrix, then decompose it as Σ = VΛVᵀ. Eigenvectors in V are the principal components; eigenvalues Λ are their variances.' },

  { level:4, group:'Linear Algebra', topic:'SVD',
    question:'What is the Singular Value Decomposition (SVD) of a matrix A?',
    answer:'A = UΣVᵀ where U,V are orthogonal and Σ is diagonal with non-negative singular values. SVD is used in PCA, regression, and dimensionality reduction.' },

  { level:4, group:'Linear Algebra', topic:'Cholesky',
    question:'What is the Cholesky decomposition and when is it applicable?',
    answer:'For a positive-definite matrix A, A = LLᵀ where L is lower triangular. Used to simulate correlated normals: X = L Z where Z ~ N(0,I).' },

  { level:5, group:'Linear Algebra', topic:'Spectral Theorem',
    question:'State the spectral theorem for symmetric matrices.',
    answer:'Every real symmetric matrix A has a complete set of real orthonormal eigenvectors and is diagonalized as A = QΛQᵀ. This underlies PCA, covariance analysis, and quadratic form optimization.' },

  { level:5, group:'Linear Algebra', topic:'Positive Definite',
    question:'What does it mean for a covariance matrix to be positive semi-definite?',
    answer:'For all non-zero w: wᵀΣw ≥ 0. This guarantees portfolio variance is always non-negative. Equivalently all eigenvalues of Σ are ≥ 0.' },

  // ---- RISK ----------------------------------------------
  { level:2, group:'Risk', topic:'VaR',
    question:'What is Value-at-Risk (VaR)?',
    answer:'VaR at confidence level α is the loss L such that P(loss > L) = 1−α. E.g. 1-day 99% VaR = 2.33σ for normal returns.' },

  { level:3, group:'Risk', topic:'CVaR',
    question:'What is Expected Shortfall (CVaR) and why is it preferred to VaR?',
    answer:'ES = E[Loss | Loss > VaR]. It captures average tail severity and is a coherent risk measure (sub-additive), unlike VaR.' },

  { level:3, group:'Risk', topic:'Duration',
    question:'What is modified duration and how does it relate to price sensitivity?',
    answer:'D_mod = −(1/P)dP/dy. A bond with duration 5 loses ~5% for a 1% rise in yield.' },

  { level:4, group:'Risk', topic:'Greeks',
    question:'What is Gamma risk and why does it matter for options traders?',
    answer:'Gamma = ∂²V/∂S² measures how fast Delta changes. High Gamma means a delta-hedged position needs frequent rebalancing; large moves cause P&L that is second-order in ΔS.' },

  { level:4, group:'Risk', topic:'Stress Testing',
    question:'What is the difference between VaR and stress testing?',
    answer:'VaR uses historical/model-based distributions to estimate typical tail losses. Stress tests apply specific extreme scenarios (e.g. 2008 crisis, rate shock) that may be outside the historical distribution.' },

  { level:5, group:'Risk', topic:'Coherent Risk Measures',
    question:'What are the four axioms of a coherent risk measure?',
    answer:'(1) Monotonicity, (2) Sub-additivity: ρ(X+Y)≤ρ(X)+ρ(Y), (3) Positive homogeneity, (4) Translation invariance. VaR violates sub-additivity; ES satisfies all four.' },

  { level:5, group:'Risk', topic:'Extreme Value Theory',
    question:'What does the Generalized Pareto Distribution model in EVT?',
    answer:'By the Pickands-Balkema-de Haan theorem, exceedances above a high threshold converge to a GPD. It enables parametric estimation of very far tail probabilities with limited data.' },

  // ---- FINANCE -------------------------------------------
  { level:1, group:'Finance', topic:'Compound Interest',
    question:'$1000 invested at 5% compounded annually for 3 years. What is the final value?',
    answer:'A = 1000×1.05³ = 1000×1.1576 = $1157.63.' },

  { level:2, group:'Finance', topic:'Fixed Income',
    question:'What happens to a bond’s price when interest rates rise?',
    answer:'Bond prices fall. Higher rates reduce the present value of future cash flows.' },

  { level:3, group:'Finance', topic:'Bond Pricing',
    question:'A bond: face $1000, 5% annual coupon, 3 years, YTM=6%. What is its price?',
    answer:'P = 50/1.06 + 50/1.06² + 1050/1.06³ ≈ $973.35.' },

  { level:3, group:'Finance', topic:'Arbitrage',
    question:'What is the law of one price and when does it break down?',
    answer:'Identical cash flows must have identical prices. It breaks down when there are transaction costs, short-selling constraints, or market segmentation.' },

  { level:4, group:'Finance', topic:'Interest Rate Models',
    question:'Write the Vasicek SDE and state its key properties.',
    answer:'dr_t = κ(θ−r_t)dt + σ dW_t. Mean-reverting to θ, Gaussian rates (can go negative), closed-form bond prices.' },

  { level:4, group:'Finance', topic:'Market Microstructure',
    question:'What is adverse selection and how does it affect bid-ask spreads?',
    answer:'Informed traders extract value from market makers. To break even, makers widen spreads to recover losses to informed flow with gains from uninformed flow.' },

  { level:5, group:'Finance', topic:'Stochastic Volatility',
    question:'State the Heston model and describe the vol-of-vol parameter.',
    answer:'dS=μS dt+√v S dW_1; dv=κ(θ−v)dt+ξ√v dW_2; corr=ρ. Parameter ξ is vol-of-vol: higher ξ creates fatter tails and a steeper volatility smile.' },

  { level:5, group:'Finance', topic:'Numerical Methods',
    question:'How does variance reduction improve Monte Carlo pricing?',
    answer:'Standard MC error ∼ 1/√N. Antithetic variates: pair each path with its mirror to reduce variance. Control variates: exploit a known analytic price (e.g. geometric Asian) to reduce error on the unknown arithmetic Asian.' },

];

// ============================================================
// TOPIC GROUPS for filter buttons
// ============================================================
const TOPIC_GROUP_MAP = {
  'Probability':         'Probability',
  'Statistics':          'Statistics',
  'Stochastic Calculus': 'Stochastic Calculus',
  'Derivatives':         'Derivatives',
  'Portfolio':           'Portfolio',
  'Linear Algebra':      'Linear Algebra',
  'Risk':                'Risk',
  'Finance':             'Finance',
};

// ============================================================
// Seeded RNG + daily problem selection
// ============================================================
function seededRandom(seed) {
  let s = seed >>> 0;
  return () => {
    s = Math.imul(s, 1664525) + 1013904223 >>> 0;
    return s / 0x100000000;
  };
}

function getDayIndex() {
  return Math.floor(Date.now() / 86400000);
}

function getDailyProblems() {
  const rng = seededRandom(getDayIndex());
  const result = [];
  for (let lvl = 1; lvl <= 5; lvl++) {
    const pool = QUANT_BANK.filter(p => p.level === lvl);
    // Fisher-Yates shuffle with seeded rng
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    result.push(pool[0], pool[1]);
  }
  return result; // 10 problems, 2 per level
}

// ============================================================
// Render
// ============================================================
const LEVEL_LABELS = {1:'Intro',2:'Easy',3:'Medium',4:'Hard',5:'Expert'};
const LEVEL_COLORS = {1:'#4ade80',2:'#60a5fa',3:'#facc15',4:'#f97316',5:'#f87171'};

const ALL_DAILY = getDailyProblems();
let activeGroup  = 'all';
let filteredSet  = [...ALL_DAILY];
let quantIndex   = 0;

function getFilteredProblems() {
  if (activeGroup === 'all') return [...ALL_DAILY];
  return ALL_DAILY.filter(p => p.group === activeGroup);
}

function renderQuantProblem() {
  const numberEl   = document.getElementById('quant-problem-number');
  const questionEl = document.getElementById('quant-problem-question');
  const answerEl   = document.getElementById('quant-problem-answer');
  const counterEl  = document.getElementById('quant-counter');
  if (!numberEl || !questionEl || !answerEl) return;

  if (!filteredSet.length) {
    numberEl.textContent   = 'No problems match this filter today.';
    questionEl.textContent = 'Try another topic filter or check back tomorrow.';
    answerEl.style.display = 'none';
    return;
  }

  const p   = filteredSet[quantIndex];
  const col = LEVEL_COLORS[p.level];
  const lbl = LEVEL_LABELS[p.level];

  numberEl.innerHTML = `
    Problem ${quantIndex + 1} of ${filteredSet.length}
    &nbsp;&bull;&nbsp;
    <span style="color:${col};font-weight:700">${lbl}</span>
    &nbsp;&bull;&nbsp;
    ${p.topic}`;

  if (counterEl) counterEl.textContent = `${ALL_DAILY.length} today`;
  questionEl.textContent = p.question;
  answerEl.textContent   = p.answer;
  answerEl.style.display = 'none';

  const showBtn = document.getElementById('quant-show-answer');
  if (showBtn) { showBtn.innerHTML = '<i class="fas fa-eye"></i> Show Answer'; }
}

// Filter buttons
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.qf-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.qf-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGroup = btn.dataset.topic;
      filteredSet = getFilteredProblems();
      quantIndex  = 0;
      renderQuantProblem();
    });
  });

  const showBtn = document.getElementById('quant-show-answer');
  const nextBtn = document.getElementById('quant-next-problem');
  const prevBtn = document.getElementById('quant-prev-problem');

  if (showBtn) showBtn.addEventListener('click', () => {
    const el = document.getElementById('quant-problem-answer');
    if (el) el.style.display = 'block';
  });

  if (nextBtn) nextBtn.addEventListener('click', () => {
    if (!filteredSet.length) return;
    quantIndex = (quantIndex + 1) % filteredSet.length;
    renderQuantProblem();
  });

  if (prevBtn) prevBtn.addEventListener('click', () => {
    if (!filteredSet.length) return;
    quantIndex = (quantIndex - 1 + filteredSet.length) % filteredSet.length;
    renderQuantProblem();
  });

  renderQuantProblem();
});
