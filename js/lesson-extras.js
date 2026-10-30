const LESSON_EXTRAS = {
  "what-is-forex": {
    takeaways: [
      "A pair quotes one currency in terms of another: EUR/USD is the price of one euro in US dollars.",
      "Buy if you expect the base currency to strengthen; sell if you expect it to weaken.",
      "There's no central exchange, which is why forex runs around the clock on weekdays.",
      "Technical analysis reads price; fundamental analysis reads the economy behind it. Neither is a guarantee.",
    ],
    mistake:
      "Going live before you can place, manage and close a trade comfortably on a demo account.",
    apply: [
      "Open a chart of EUR/USD and say aloud which currency is the base and which is the quote.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "pips-lots-spreads-margin": {
    takeaways: [
      "A pip is usually the fourth decimal place (the second for yen pairs); lots are 100,000, 10,000 and 1,000 units.",
      "The spread is a cost you pay on entry, and it widens around news.",
      "Margin is a deposit, not a fee, and leverage doesn't change what a stop-out costs; position size does.",
      "Swap is charged for holding past the daily cut-off, so check your broker's rates for longer trades.",
    ],
    mistake:
      "Treating high leverage as extra buying power to use, instead of a limit to stay far inside.",
    apply: [
      "Work out the position size for a 30-pip stop on a $1,000 account risking 1%, then check it in the calculator.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "risk-management-basics": {
    takeaways: [
      "Risk a small, fixed percentage of your account on each trade, decided before you enter.",
      "Set the stop first; the target and position size follow from it.",
      "A 1:3 risk-to-reward ratio lets you be wrong more often than right and still come out ahead.",
      "Losses compound against you: a 50% loss needs a 100% gain to recover.",
    ],
    mistake:
      "Moving a stop further away because you 'know' the trade will come back.",
    apply: [
      "Pick a trade you might take this week and size it from the stop, not from how much you'd like to make.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "trading-psychology-basics": {
    takeaways: [
      "You can't control the market; you can control your size, your rules and your reactions.",
      "Technical skills come in months; emotional discipline takes much longer.",
      "Be wary of anyone selling promised results rather than a verifiable track record.",
      "A daily loss limit set in advance stops one bad session becoming a bad month.",
    ],
    mistake:
      "Looking for evidence that supports your trade while ignoring the signs that you're wrong.",
    apply: [
      "Write down one rule you won't break this week, such as 'no trade without a stop', and keep it where you trade.",
      null,
      null,
    ],
  },
  "choosing-a-broker": {
    takeaways: [
      "Verify the regulator, licence number and exact legal entity before you deposit.",
      "Compare the total cost: spreads, commissions, swaps and deposit, withdrawal and inactivity fees.",
      "Test a small withdrawal early and read bonus terms carefully.",
      "Guarantees, pushy 'account managers' and countdown timers are red flags.",
    ],
    mistake:
      "Choosing a broker for its bonus or its advertising instead of its regulation and withdrawal record.",
    apply: [
      "Pick one broker you're considering and write down its legal entity, licence number, fees and withdrawal terms.",
      null,
      null,
    ],
  },
  "support-resistance-and-zones": {
    takeaways: [
      "Broken resistance often becomes support (and the reverse) when price retests it.",
      "A trend line needs at least three touches before you rely on it.",
      "Zones are areas, not exact lines, and a fresh zone carries more weight than a heavily tested one.",
      "Supply and demand zones mark where a move began; support and resistance mark where price keeps reacting.",
    ],
    mistake:
      "Drawing a dozen lines on every chart until something always seems to hold.",
    apply: [
      "On a daily chart, mark only the two or three most obvious levels and watch how price treats them this week.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "trends-ranges-and-timeframes": {
    takeaways: [
      "Uptrend: higher highs and higher lows. Downtrend: lower highs and lower lows. Range: sideways between two levels.",
      "Use a higher timeframe for direction and levels, a middle one for the setup and a lower one for the entry.",
      "Higher-timeframe levels carry more weight than lower-timeframe signals.",
      "Choose a trading style that fits your time, temperament and account.",
    ],
    mistake:
      "Flicking between timeframes until one agrees with the trade you already want.",
    apply: [
      "Label the daily trend on one pair as up, down or range, then check whether the 1-hour chart agrees.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "chart-patterns-and-fakeouts": {
    takeaways: [
      "Continuation patterns pause a trend, reversal patterns challenge it, and bilateral patterns can break either way.",
      "A real breakout closes decisively beyond the level; repeated weak attempts suggest a fakeout.",
      "A retest of the broken level (a throwback) is common before the move continues.",
      "The measured move projects the pattern's height from the breakout to give a target.",
    ],
    mistake:
      "Entering on the first poke through a level instead of waiting for a close beyond it.",
    apply: [
      "Scroll back on a chart, find one flag or triangle, and measure where its measured move would have landed.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "candlestick-confirmations": {
    takeaways: [
      "Long wicks show rejection: price went somewhere and was pushed back.",
      "A pattern at a meaningful level beats the same pattern in the middle of nowhere.",
      "Judge candle size against ATR, because the same pip move means different things on different pairs.",
      "Wait for the candle to close before treating a pattern as confirmed.",
    ],
    mistake:
      "Trading every engulfing candle or pin bar regardless of where it forms.",
    apply: [
      "Find three pin bars on a chart. Note which formed at a real level and what price did next.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "moving-averages": {
    takeaways: [
      "An EMA weights recent prices more than an SMA, so it reacts faster; both lag.",
      "Averages show trend direction and can act as dynamic support or resistance in a trend.",
      "Crossovers lag and whipsaw in ranges.",
      "Don't tune lengths until the past looks perfect; that's curve-fitting.",
    ],
    mistake: "Using crossover signals in a market that's clearly ranging.",
    apply: [
      "Add a 20 and a 50 EMA to a chart and watch how price reacts to them in a trend and in a range.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "momentum-and-volatility-indicators": {
    takeaways: [
      "RSI above 70 isn't a sell signal; in strong trends it can stay overbought.",
      "The MACD histogram shows whether momentum is speeding up or slowing down.",
      "A Bollinger squeeze signals low volatility, not direction.",
      "ATR measures how much price moves, which makes it useful for stops and for judging candle size.",
    ],
    mistake:
      "Selling just because RSI is above 70, or buying just because price touched a band.",
    apply: [
      "Add RSI(14) and ATR(14) to one chart and note what each tells you that price alone doesn't.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "fibonacci-and-market-structure": {
    takeaways: [
      "Anchor Fibonacci to the obvious swing that other traders would also pick.",
      "Retracements show where a pullback may end; extensions estimate targets beyond the move.",
      "A break of structure shows the trend continuing; a change of character is the first warning that behaviour has flipped.",
      "Fibonacci works best alongside structure and other levels, not on its own.",
    ],
    mistake:
      "Re-drawing the Fibonacci from a different swing until a level lines up with your idea.",
    apply: [
      "Draw one retracement from the most obvious recent swing and note which levels price actually reacted to.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "trade-planning-essentials": {
    takeaways: [
      "Plan the trade before you enter: level, stop, target and size.",
      "Pending orders such as a buy stop let you set entries in advance instead of chasing.",
      "The London and New York overlap is usually the most active window.",
      "Grade the setup honestly before entering, not after.",
    ],
    mistake:
      "Skipping the pre-trade checklist because this setup 'looks perfect'.",
    apply: [
      "Write a one-line plan for your next setup: where you'd enter, where you're wrong, where you'd take profit.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "layered-risk-budgeting": {
    takeaways: [
      "Measure risk in R so your limits keep their meaning as your account grows.",
      "Layer your limits: per trade, per day, per week, plus a cap on open risk.",
      "Correlated trades count as one position.",
      "Decide your circuit breakers and drawdown ladder while calm, not mid-losing streak.",
    ],
    mistake: "Raising size after a loss to 'win it back'.",
    apply: [
      "Write your per-trade, daily and weekly limits in R and put them at the top of your journal.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "trading-plan-and-backtesting": {
    takeaways: [
      "A trading plan fixes your setups, entries, exits and risk rules in advance.",
      "Backtest by hand in Bar Replay: write the rules first and log every signal in R.",
      "Expectancy = win rate × average win − loss rate × average loss.",
      "In your journal, check 'did I follow my plan?' before you look at profit.",
    ],
    mistake:
      "Judging a strategy after ten trades, or changing the rules halfway through a test.",
    apply: [
      "Write a one-page plan, log 20 backtest trades in Bar Replay, then check your expectancy in the calculator.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "smc-ict-foundations": {
    takeaways: [
      "An order block is the last candle before a strong impulsive move, and it's valid only if followed by a real break of structure or an imbalance.",
      "Find order blocks on higher timeframes first, then refine on lower ones.",
      "Price is drawn towards liquidity: obvious highs, lows and stop clusters.",
      "These are frameworks for reading price, not guarantees.",
    ],
    mistake: "Marking every candle before a move as an order block.",
    apply: [
      "Find one order block on the 4-hour chart and check whether a break of structure followed it.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "liquidity-crt-and-ranges": {
    takeaways: [
      "Liquidity sits just beyond obvious highs and lows, where stops cluster.",
      "A wick through a level that closes back inside suggests a liquidity grab; a close beyond it suggests a genuine break.",
      "In a range, the 50% midpoint is the first target after entering from an edge.",
      "The Asian session range is often swept around the London open.",
    ],
    mistake: "Treating every wick through a level as a reversal signal.",
    apply: [
      "Mark yesterday's high and low on an intraday chart and watch what price does when it reaches them.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "irl-erl-and-fvg": {
    takeaways: [
      "External range liquidity sits outside the range; internal range liquidity sits inside it.",
      "Look to buy in discount and sell in premium relative to the range.",
      "Not all fair value gaps are equal: expansion gaps may never retest, and deep-retracement gaps are low probability.",
      "Overlap between a fair value gap and an order block makes a stronger zone.",
    ],
    mistake:
      "Buying in premium or selling in discount just because a gap formed there.",
    apply: [
      "On one chart, mark the range's 50% level and label the premium and discount halves.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "elliott-wave-and-market-cycles": {
    takeaways: [
      "An impulse has five waves, followed by a three-wave (A-B-C) correction.",
      "Wave 3 is usually the strongest and is never the shortest.",
      "Wave counts are subjective, so use them as one piece of confluence.",
      "An ending diagonal can signal exhaustion.",
    ],
    mistake:
      "Forcing a wave count onto the chart to fit the trade you already want.",
    apply: [
      "Try to count the last big move on a daily chart, then ask a classmate in chat whether they'd count it the same way.",
      "chat.html",
      "Open live chat",
    ],
  },
  "mt4-mt5-and-synthetic-indices": {
    takeaways: [
      "The Trade tab shows your open positions plus balance, equity and margin.",
      "Test strategies on a demo account first, and expect live execution to differ (slippage, speed).",
      "A trailing stop follows price in your favour and never moves back.",
      "Synthetic indices are generated by the provider's algorithm, so news and fundamentals don't apply the same way.",
    ],
    mistake:
      "Assuming a strategy that works on demo will behave identically on a live account.",
    apply: [
      "Open the Trade tab on a demo account and find your balance, equity and free margin.",
      null,
      null,
    ],
  },
  "cot-positioning": {
    takeaways: [
      "The CFTC publishes the COT report weekly, with positions as of Tuesday released on Friday.",
      "It's lagging data, best for medium-term context rather than short-term entries.",
      "Extreme, one-sided positioning can signal a stretched trend.",
      "The COT Index puts current positioning in the context of its recent range.",
    ],
    mistake:
      "Using weekly, delayed positioning data to time short-term entries.",
    apply: [
      "Look up this week's COT figures for one currency and note whether positioning looks stretched.",
      null,
      null,
    ],
  },
  "macro-fundamentals-intro": {
    takeaways: [
      "You never trade one currency alone: every pair compares two economies.",
      "The main themes are growth, inflation, employment, monetary policy and trade.",
      "Markets are forward-looking, so what's already priced in matters more than the headline number.",
      "A rough macro view adds useful context to technical setups.",
    ],
    mistake:
      "Reading a strong data release as automatically bullish without asking what was expected.",
    apply: [
      "Pick one pair and write one sentence about each economy's current direction.",
      "calendar.html",
      "Open the economic calendar",
    ],
  },
  "economic-calendar-mastery": {
    takeaways: [
      "Actual versus forecast versus previous: the surprise against expectations moves price.",
      "High-impact releases like NFP and CPI can move markets sharply, and spreads widen around them.",
      "The first spike after a release is often not the real move.",
      "Many traders stay flat around major releases.",
    ],
    mistake: "Opening a trade seconds before a high-impact release.",
    apply: [
      "Find the next high-impact release for a pair you follow and decide in advance what you'll do around it.",
      "calendar.html",
      "Open the economic calendar",
    ],
  },
  "central-banks-and-rates": {
    takeaways: [
      "Central banks set the base interest rate for their currency.",
      "A hawkish tone supports a currency; a dovish tone weighs on it.",
      "Rate differentials drive capital flows and the carry trade.",
      "Markets trade expectations of future rates, so tone can matter more than the decision itself.",
    ],
    mistake: "Ignoring the press conference after a rate decision.",
    apply: [
      "Look up the next rate decision for a central bank you care about and note what the market expects.",
      "calendar.html",
      "Open the economic calendar",
    ],
  },
  "top-down-trade-thesis": {
    takeaways: [
      "Go top-down: macro bias, then the pair, then the chart.",
      "Take trades where fundamentals and technicals agree.",
      "When they disagree, wait for alignment.",
      "A rough sense of the macro backdrop is usually enough.",
    ],
    mistake: "Forcing a trade when the macro view and the chart disagree.",
    apply: [
      "Write a three-line thesis for one pair: the macro view, the chart view, and whether they agree.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "tradingview-interface-tour": {
    takeaways: [
      "The timeframe selector is next to symbol search, drawing tools are in the left toolbar, and the Trading Panel is at the bottom.",
      "Layouts save a whole chart setup so you can switch between them.",
      "The Object Tree manages every drawing and indicator in one place.",
      "The camera icon creates a shareable snapshot of your chart.",
    ],
    mistake:
      "Cluttering the chart with so many tools that you can't read price.",
    apply: [
      "Open a chart, find each of those four areas, and save a layout called 'Main'.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "tradingview-drawing-tools": {
    takeaways: [
      "Magnet Mode snaps drawings to candle highs, lows and closes.",
      "Lock finished drawings so they can't be moved by accident.",
      "Save a drawing template so new drawings match your style.",
      "The Long/Short Position tool shows risk, reward and (with an account size) position size on the chart.",
    ],
    mistake:
      "Placing a stop or target by eye without checking the real risk-to-reward.",
    apply: [
      "Draw a Long Position on a chart and read off its risk-to-reward ratio.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "tradingview-indicators-and-strategies": {
    takeaways: [
      "Free plans limit how many indicators you can run per chart; check TradingView's current limits.",
      "Community indicators can be added in one click; you only need code to change them.",
      "Stacking similar momentum indicators repeats the same signal.",
      "The Pine Editor lets you read how published scripts work.",
    ],
    mistake: "Adding indicator after indicator hoping for certainty.",
    apply: [
      "Add one community indicator, open its settings, and read its description to see what it actually measures.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "tradingview-alerts-and-watchlists": {
    takeaways: [
      "Alerts let you step away from the screen, and 'Once Per Bar Close' avoids mid-candle noise.",
      "Free plans cap alerts, and free-plan alerts expire, so check the current limits and conditions your plan includes.",
      "Watchlists keep your pairs organised, and the Screener filters the market by criteria.",
      "Manage your alerts in the Alerts panel (the clock icon).",
    ],
    mistake: "Relying on alerts that have silently expired.",
    apply: [
      "Set one price alert at a level you care about and check the Alerts panel to see its expiry.",
      "live-chart.html",
      "Open the live chart",
    ],
  },
  "tradingview-paper-and-live-trading": {
    takeaways: [
      "Paper trading needs no broker and starts with virtual money you can reset.",
      "Reset the balance to your real trading size so your habits carry over.",
      "The order panel's calculator can work out position size from your risk % and stop.",
      "A bracket order attaches your stop and target to the entry.",
    ],
    mistake: "Practising with an unrealistically large paper balance.",
    apply: [
      "Reset your paper balance to your planned real account size and place one bracket order.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "how-funded-challenges-work": {
    takeaways: [
      "A challenge is a paid test, and the fee buys an attempt, not a result.",
      "Typical rules: a profit target, a maximum daily loss and a maximum overall loss.",
      "Pass rates are hard to verify, so treat marketing numbers cautiously.",
      "Many 'funded' accounts are simulated or only partly backed by real capital.",
    ],
    mistake:
      "Treating the fee as an investment instead of the price of an attempt.",
    apply: [
      "Decide the most you'd be comfortable losing to fees in total, and write it down before you buy anything.",
      null,
      null,
    ],
  },
  "challenge-rules-risk-plan": {
    takeaways: [
      "Translate the firm's limits into R before you trade.",
      "Static limits are measured from the starting balance; trailing limits from your peak.",
      "Keep your own limits well inside the firm's.",
      "Per-trade size is the big lever on whether you survive a bad run.",
    ],
    mistake:
      "Reading the daily loss limit without checking whether open losses count towards it.",
    apply: [
      "Take a firm's published rules and convert the daily and overall limits into R at your risk per trade.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "pacing-a-challenge": {
    takeaways: [
      "The fee is a sunk cost; only the next trade matters.",
      "Never raise risk because you're behind schedule.",
      "Work out the expected cost per funded account before you start.",
      "After you pass, change nothing.",
    ],
    mistake: "Increasing size in the last week to hit the target.",
    apply: [
      "Work out how many trades your edge needs to reach a target at your risk per trade.",
      "tools.html",
      "Open the calculators",
    ],
  },
  "choosing-a-prop-firm": {
    takeaways: [
      "Guarantees are a red flag.",
      "Check regulator warnings and read the full rules before paying.",
      "Be sceptical of reviews paid per sale.",
      "Compare any challenge with the same skills on a small live account.",
    ],
    mistake: "Buying because of a countdown timer.",
    apply: [
      "Search a regulator's warning list for the name of any firm you're considering.",
      null,
      null,
    ],
  },
};
