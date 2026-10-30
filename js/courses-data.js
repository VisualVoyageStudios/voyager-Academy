const COURSE_DATA = [
  // Beginner
  { slug: "what-is-forex", track: "beginner", title: "What Is Forex Trading?", summary: "Currency pairs, base vs. quote, and how sessions drive the market." },
  { slug: "pips-lots-spreads-margin", track: "beginner", title: "Pips, Lots, Spreads & Margin", summary: "The vocabulary of a trade: how moves are measured, how size works, and what it costs." },  
  { slug: "risk-management-basics", track: "beginner", title: "Risk Management Basics", summary: "Position sizing, risk-to-reward, and what leverage really does." },
  { slug: "trading-psychology-basics", track: "beginner", title: "Trading Psychology Basics", summary: "Why managing yourself matters more than managing the chart." },
  { slug: "choosing-a-broker", track: "beginner", title: "Choosing a Broker & Opening a Demo Account", summary: "How to check regulation, compare real costs and spot red flags before you deposit." },

  // Intermediate
  { slug: "support-resistance-and-zones", track: "intermediate", title: "Support, Resistance & Zones", summary: "Why S/R levels flip roles, reading zones, and pivot points." },
  { slug: "trends-ranges-and-timeframes", track: "intermediate", title: "Trends, Ranges & Multi-Timeframe Analysis", summary: "Read the market's condition first, then match your timeframe and trading style to it." },
  { slug: "chart-patterns-and-fakeouts", track: "intermediate", title: "Chart Patterns & Market Fakeouts", summary: "Reversal, continuation, and bilateral patterns — and how fakeouts trap traders." },
  { slug: "candlestick-confirmations", track: "intermediate", title: "Candlestick Confirmation Patterns", summary: "Engulfing, stars, soldiers, crows, and what a candle's wick tells you." },
  { slug: "moving-averages", track: "intermediate", title: "Moving Averages", summary: "SMA vs EMA, how traders use them, and where they fail." },
  { slug: "momentum-and-volatility-indicators", track: "intermediate", title: "RSI, MACD, Bollinger Bands & ATR", summary: "What momentum and volatility indicators really tell you, and how not to misuse them." },
  { slug: "fibonacci-and-market-structure", track: "intermediate", title: "Fibonacci Levels & Market Structure", summary: "Golden zone, manipulation levels, BOS, CHoCH, EQH/EQL." },
  { slug: "layered-risk-budgeting", track: "intermediate", title: "Layered Risk Budgeting", summary: "Per-trade, daily, and weekly limits — plus the circuit breakers that protect you from yourself." },
  { slug: "trading-plan-and-backtesting", track: "intermediate", title: "Your Trading Plan, Backtesting & Journal", summary: "Turn the course into rules, test them honestly, and track whether you follow them." },
  { slug: "trade-planning-essentials", track: "intermediate", title: "Trade Planning & Order Types", summary: "Order types, the 6-step 'boxing the market' method, and a pre-trade checklist." },

  // Advanced
  { slug: "smc-ict-foundations", track: "advanced", title: "SMC & ICT Foundations", summary: "Order blocks, draw on liquidity, and reading order flow." },
  { slug: "liquidity-crt-and-ranges", track: "advanced", title: "Candle Range Theory & Liquidity Ranges", summary: "The 3-candle CRT model and range dynamics." },
  { slug: "irl-erl-and-fvg", track: "advanced", title: "Internal/External Liquidity & Fair Value Gaps", summary: "IRL vs ERL, premium/discount, and the four FVG types." },
  { slug: "elliott-wave-and-market-cycles", track: "advanced", title: "Elliott Wave & Market Cycles", summary: "The 5-3 wave structure and where order blocks tend to form." },
  { slug: "mt4-mt5-and-synthetic-indices", track: "advanced", title: "Platform Walkthrough & Synthetic Indices", summary: "MT4/5 navigation, Volatility/Crash/Boom indices, and account rules." },
  { slug: "cot-positioning", track: "advanced", title: "Reading COT Positioning", summary: "Using CFTC positioning data to gauge institutional sentiment." },

  // Macro
  { slug: "macro-fundamentals-intro", track: "macro", title: "What Fundamental Analysis Actually Is", summary: "Why the 'why' behind price matters, even to a pure chart trader." },
  { slug: "economic-calendar-mastery", track: "macro", title: "Reading the Economic Calendar", summary: "Actual vs. forecast vs. previous, impact levels, and the releases that matter most." },
  { slug: "central-banks-and-rates", track: "macro", title: "Central Banks & Interest Rates", summary: "How rate decisions move currencies, and reading hawkish vs. dovish language." },
  { slug: "top-down-trade-thesis", track: "macro", title: "Building a Top-Down Trade Thesis", summary: "Combining a macro bias with a technical entry — a full worked example." },

  // Tradingview
  { slug: "tradingview-interface-tour", track: "tradingview", title: "Getting to Know the TradingView Interface", summary: "Chart area, toolbars, watchlist sidebar, and saving layouts." },
  { slug: "tradingview-drawing-tools", track: "tradingview", title: "Drawing Tools: Trend Lines, Fibonacci & More", summary: "Trend lines, Fib retracement, shapes, and locking your drawings." },
  { slug: "tradingview-indicators-and-strategies", track: "tradingview", title: "Adding Indicators & Understanding Pine Script", summary: "Applying built-in indicators, customizing them, and what Pine Script is." },
  { slug: "tradingview-alerts-and-watchlists", track: "tradingview", title: "Alerts, Watchlists & the Screener", summary: "Setting price/indicator alerts and organizing symbols to watch." },
  { slug: "tradingview-paper-and-live-trading", track: "tradingview", title: "Paper Trading & Connecting a Broker", summary: "Practicing with TradingView's free simulator, then trading live from the chart." },

  // Funded challenge - Prop firms
  { slug: "how-funded-challenges-work", track: "funded", title: "How Funded Trader Challenges Actually Work", summary: "The business model, the typical rules, and what you're really paying for." },
  { slug: "challenge-rules-risk-plan", track: "funded", title: "Turning Challenge Rules into a Risk Plan", summary: "Translate a firm's loss limits into R, buffers, and a drawdown ladder." },
  { slug: "pacing-a-challenge", track: "funded", title: "Pacing a Challenge Without Gambling It", summary: "Sunk cost, target-chasing, and the real maths of attempts." },
  { slug: "choosing-a-prop-firm", track: "funded", title: "Choosing a Firm and Spotting Red Flags", summary: "A checklist for telling reputable operators from traps — before you pay." },

];