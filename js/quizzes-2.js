Object.assign(QUIZ_DATA, {
  "pips-lots-spreads-margin": [
    { q: "For most currency pairs, what is one pip?", options: ["0.1", "0.01", "0.0001", "0.000001"], correct: 2 },
    { q: "How many units are in a standard lot?", options: ["100,000", "1,000", "10,000", "1,000,000"], correct: 0 },
    { q: "On a USD account, what is one pip worth on a 0.10-lot EUR/USD trade?", options: ["$0.10", "$10", "$1", "$100"], correct: 2 },
    { q: "EUR/USD is quoted 1.1000 / 1.1002. What is the spread?", options: ["2 pips", "0.2 pips", "20 pips", "1.1 pips"], correct: 0 },
    { q: "At 1:100 leverage, roughly how much margin does a $10,000 position need?", options: ["$10", "$100", "$1,000", "$10,000"], correct: 1 },
    { q: "What is a margin call?", options: ["A phone call from your broker with trade signals", "A bonus paid out when you add more funds", "The fee that is charged to open a trade", "A broker warning that equity is running too low"], correct: 3 },
  ],
  "choosing-a-broker": [
    { q: "Where can you check whether a broker is authorised to provide financial services in South Africa?", options: ["On the broker's own homepage banner", "On a popular broker-review website", "The FSCA's register of providers", "In a trading forum discussion thread"], correct: 2 },
    { q: "Which of these is a red flag?", options: ["A published and detailed fee schedule", "Unsolicited pressure to deposit more", "A free demo account to practice on", "Clear and documented withdrawal terms"], correct: 1 },
    { q: "Besides spreads, which costs should you compare between brokers?", options: ["Commissions, swaps and account fees", "Only the logo and website design", "Nothing else matters besides spreads", "Only the maximum leverage offered"], correct: 0 },
    { q: "Why test a small withdrawal soon after opening an account?", options: ["It earns you a welcome bonus", "The law requires it for new accounts", "It shows you can get your money out", "It raises your available leverage"], correct: 2 },
    { q: "Why should you check which legal entity you're signing up with?", options: ["It directly changes the spread you get", "Protection depends on the entity you sign", "It determines the platform color scheme", "It makes no difference to you either way"], correct: 1 },
    { q: "What's the best way to use a demo account?", options: ["As a game where no rules need following", "Only on the very first day you open it", "Skip it when the broker offers a bonus", "With the size and rules you'll use live"], correct: 3 },
  ],
  "trends-ranges-and-timeframes": [
    { q: "What defines an uptrend?", options: ["Higher highs and higher lows", "Lower highs and lower lows", "Price moving between two flat levels", "Any run of green candles"], correct: 0 },
    { q: "In multi-timeframe analysis, what is the higher timeframe mainly used for?", options: ["Pinpointing exact entries", "Choosing how much leverage to use", "Predicting upcoming news events", "Overall direction and key levels"], correct: 3 },
    { q: "Someone can only look at charts for about an hour a day. Which style is likely to suit them best?", options: ["Scalping on one-minute charts all day", "Watching every single tick all day long", "Swing trading on higher timeframes", "Holding trades without placing any stops"], correct: 2 },
    { q: "Why do spreads matter more to scalpers than to swing traders?", options: ["It takes a bigger share of a small target", "Scalpers are exempt from paying any spread", "Swing traders always pay a triple spread", "Spreads only exist during the weekend"], correct: 0 },
    { q: "The daily chart is in a downtrend, but the 15-minute chart shows a buy setup. What's sensible?", options: ["Always take it, as the setup is clean", "Be extra selective: it is counter-trend", "Double the size since the entry is good", "Switch down to the 1-minute chart"], correct: 1 },
    { q: "What's a common timeframe mistake?", options: ["Using the daily chart for direction", "Writing your plan down in advance", "Hopping timeframes until one agrees", "Waiting for a candle to confirm it"], correct: 2 },
  ],
  "moving-averages": [
    { q: "How does an EMA differ from an SMA?", options: ["It gives recent prices more weight", "It ignores the most recent prices", "It only works on the daily chart", "It never lags behind price at all"], correct: 0 },
    { q: "Which moving average length is probably the most widely watched as a long-term trend gauge?", options: ["5", "20", "200", "1,000"], correct: 2 },
    { q: "What is a 'golden cross'?", options: ["Price falling below the 200 average", "The 50 crossing above the 200 average", "Two candles that share the same high", "RSI climbing above the 70 level"], correct: 1 },
    { q: "Why do moving average crossovers perform badly in a range?", options: ["The averages stop updating in ranges", "Ranges do not produce any candles", "They flatten and cross back and forth", "Crossovers only work during weekends"], correct: 2 },
    { q: "In an uptrend, price pulls back to a rising 50 EMA and holds. How is that best treated?", options: ["A possible area of dynamic support", "A guaranteed buy signal for the trend", "A sell signal from the average", "Noise that you should simply ignore"], correct: 0 },
    { q: "What is the problem with tuning average lengths until a backtest looks perfect?", options: ["It makes the averages react faster", "It removes the lag from the lines", "It causes no problems at all", "It's curve-fitting to past data only"], correct: 3 },
  ],
  "momentum-and-volatility-indicators": [
    { q: "What does an RSI reading above 70 tell you?", options: ["Price is certain to fall soon", "Momentum has been strong lately", "It is time to buy the pair", "Volatility in the market is low"], correct: 1 },
    { q: "What does the MACD histogram show?", options: ["Total trading volume for the session", "The broker's current spread on the pair", "The gap between the MACD and signal lines", "The central bank's current interest rate"], correct: 2 },
    { q: "What does a Bollinger Band squeeze indicate?", options: ["A guaranteed upward breakout coming", "Low volatility before a bigger move", "The existing trend has now ended", "An unusually high level of volume"], correct: 1 },
    { q: "What does ATR measure?", options: ["The size of recent price moves", "The direction of the current trend", "The volume traded each session", "How overbought the pair has become"], correct: 0 },
    { q: "How can ATR help with stop placement?", options: ["It picks the trade's direction for you", "It makes your stop losses unnecessary", "It scales the stop to current volatility", "It tells you to place stops randomly"], correct: 2 },
    { q: "Why avoid stacking RSI, Stochastic and MACD on one chart?", options: ["They mostly measure the same momentum", "TradingView does not allow stacking", "They always contradict one another", "It makes the chart load faster"], correct: 0 },
  ],
  "trading-plan-and-backtesting": [
    { q: "What is a trading plan for?", options: ["Predicting exactly where price will go", "Fixing your rules before you trade", "Replacing the need for stop losses", "Guaranteeing a profit on every trade"], correct: 1 },
    { q: "Which TradingView tool lets you step through past price bar by bar to backtest by hand?", options: ["Bar Replay", "The Screener", "The Object Tree", "The Order Panel"], correct: 0 },
    { q: "What is hindsight bias in backtesting?", options: ["Risking too small an amount per trade", "Running your plan on a demo account", "Letting what happened next sway entries", "Keeping a detailed trading journal"], correct: 2 },
    { q: "Why aren't 10 backtest trades enough to judge a strategy?", options: ["Luck can dominate such a small sample", "Brokers insist on a hundred trades", "Ten trades are always profitable", "Trades must be placed on a weekend"], correct: 0 },
    { q: "A strategy wins 40% of the time, with an average win of 2R and an average loss of 1R. What is its expectancy per trade?", options: ["−0.2R", "+0.2R", "+0.8R", "0R"], correct: 1 },
    { q: "In a weekly journal review, which question should usually come first?", options: ["How much money did I make?", "What will the market do next?", "Which indicator works best?", "Did I follow my written plan?"], correct: 3 },
  ],
});

// Swap out the one TradingView question whose number we couldn't verify (see step 6 below)
if (QUIZ_DATA["tradingview-alerts-and-watchlists"]) {
  const arr = QUIZ_DATA["tradingview-alerts-and-watchlists"];
  const i = arr.findIndex((x) =>
    /^how many symbols can a free-plan watchlist/i.test(x.q),
  );
  if (i >= 0)
    arr[i] = {
      q: "What is a watchlist for?",
      options: [
        "Keeping the symbols you follow in one organised list",
        "Placing trades automatically",
        "Writing Pine Script",
        "Backtesting a strategy",
      ],
      correct: 0,
    };
}

if (typeof QUIZ_WHY !== "undefined") {
  Object.assign(QUIZ_WHY, {
    "pips-lots-spreads-margin": [
      [
        "For most currency pairs, what is one pip",
        "For most pairs a pip is the fourth decimal place (0.0001). Yen pairs are the exception: there a pip is 0.01.",
      ],
      [
        "How many units are in a standard lot",
        "A standard lot is 100,000 units of the base currency. A mini lot is 10,000 and a micro lot is 1,000.",
      ],
      [
        "On a USD account, what is one pip worth",
        "A 0.10 lot is 10,000 units, so each pip is worth about $1. A standard lot is $10 per pip and a micro lot $0.10.",
      ],
      [
        "EUR/USD is quoted 1.1000 / 1.1002",
        "The spread is the gap between bid and ask: 1.1002 minus 1.1000 is 0.0002, or 2 pips. You pay it when you enter.",
      ],
      [
        "At 1:100 leverage, roughly how much margin",
        "Margin is position size divided by leverage: $10,000 ÷ 100 = $100. It's a deposit, not a fee.",
      ],
      [
        "What is a margin call",
        "A margin call means your equity has fallen too close to the margin your open trades need. If it keeps falling, the broker may close positions automatically.",
      ],
    ],
    "choosing-a-broker": [
      [
        "Where can you check whether a broker",
        "The FSCA keeps a register of authorised financial services providers. Verify the licence number and that it covers the products you want, rather than trusting the broker's own claims.",
      ],
      [
        "Which of these is a red flag",
        "Reputable brokers don't chase you to deposit more. Unsolicited contact and pressure are classic signs of a scam or a high-pressure sales operation.",
      ],
      [
        "Besides spreads, which costs",
        "The cheapest spread can be wiped out by commissions, swaps or fees on deposits, withdrawals and inactivity. Compare the total cost.",
      ],
      [
        "Why test a small withdrawal",
        "Withdrawing a small amount early shows how the process really works and how long it takes, before you have much at stake.",
      ],
      [
        "Why should you check which legal entity",
        "Many brokers run several entities under different regulators. The protections you get depend on the one named in your client agreement.",
      ],
      [
        "What's the best way to use a demo",
        "A demo only builds useful habits if you treat it like real money: the same size and the same rules.",
      ],
    ],
    "trends-ranges-and-timeframes": [
      [
        "What defines an uptrend",
        "An uptrend is a series of higher highs and higher lows. Lower highs and lower lows define a downtrend, and sideways movement between two levels is a range.",
      ],
      [
        "In multi-timeframe analysis",
        "The higher timeframe shows the bigger trend and major levels. Lower timeframes help you refine the setup and entry.",
      ],
      [
        "Someone can only look at charts",
        "Swing trading on higher timeframes needs only a short daily check. Scalping demands constant attention.",
      ],
      [
        "Why do spreads matter more to scalpers",
        "The spread is a fixed cost on every trade. On a small target it eats a far larger share of the potential profit.",
      ],
      [
        "The daily chart is in a downtrend",
        "Higher-timeframe direction carries more weight. A counter-trend trade can work, but the bar for taking it should be higher.",
      ],
      [
        "What's a common timeframe mistake",
        "Hopping between timeframes until one says what you want is confirmation bias, not analysis.",
      ],
    ],
    "moving-averages": [
      [
        "How does an EMA differ",
        "An exponential moving average weights recent prices more heavily, so it turns sooner than a simple average. Both still lag.",
      ],
      [
        "Which moving average length",
        "The 200 is widely watched as the long-term trend line, and because so many traders watch it, it often matters.",
      ],
      [
        "What is a 'golden cross'",
        "A golden cross is a shorter average, typically the 50, crossing above a longer one, typically the 200. The reverse is a death cross. Both lag.",
      ],
      [
        "Why do moving average crossovers perform badly",
        "In a range the averages flatten and keep crossing, so you get repeated false signals (whipsaws).",
      ],
      [
        "In an uptrend, price pulls back to a rising",
        "A rising average can act as dynamic support, but it's a place to look for a confirmed entry, not an automatic buy.",
      ],
      [
        "What is the problem with tuning average lengths",
        "Tuning settings to fit past data (curve-fitting) produces a strategy that suits history rather than the future.",
      ],
    ],
    "momentum-and-volatility-indicators": [
      [
        "What does an RSI reading above 70",
        "Above 70 only says recent momentum has been strong. In a strong trend RSI can stay overbought for a long time, so it isn't a sell signal on its own.",
      ],
      [
        "What does the MACD histogram show",
        "The histogram is the gap between the MACD line and its signal line. When it shrinks, momentum is slowing.",
      ],
      [
        "What does a Bollinger Band squeeze",
        "Narrow bands mean low volatility. Volatility tends to expand afterwards, but a squeeze doesn't tell you which direction.",
      ],
      [
        "What does ATR measure",
        "ATR averages the size of recent candles, so it measures how much price is moving, not which way.",
      ],
      [
        "How can ATR help with stop placement",
        "Basing the stop on ATR scales it to the market's current movement, instead of using the same pip distance in quiet and volatile conditions.",
      ],
      [
        "Why avoid stacking RSI",
        "These tools are all momentum measures, so stacking them repeats one signal and creates false confidence.",
      ],
    ],
    "trading-plan-and-backtesting": [
      [
        "What is a trading plan for",
        "A plan fixes your rules while you're calm, so you aren't improvising under pressure. It doesn't predict the market or guarantee anything.",
      ],
      [
        "Which TradingView tool lets you step",
        "Bar Replay lets you rewind the chart and move forward one candle at a time, as if the market were live. Some features depend on your plan.",
      ],
      [
        "What is hindsight bias in backtesting",
        "If you already know what happened next, it's easy to pick entries that look obvious. Hide the right side of the chart and follow your written rules.",
      ],
      [
        "Why aren't 10 backtest trades enough",
        "A handful of trades can look great or terrible by luck alone. A larger sample across different conditions gives a fairer picture.",
      ],
      [
        "A strategy wins 40% of the time",
        "0.40 × 2R − 0.60 × 1R = 0.8R − 0.6R = +0.2R per trade on average.",
      ],
      [
        "In a weekly journal review",
        "Checking plan adherence first separates good process from luck. A rule-following losing week is fine; a rule-breaking winning week is a warning.",
      ],
    ],
  });
  if (QUIZ_WHY["tradingview-alerts-and-watchlists"]) {
    QUIZ_WHY["tradingview-alerts-and-watchlists"].push([
      "What is a watchlist for",
      "A watchlist keeps the symbols you follow in one organised list, so you can check them quickly. Plan limits on its size vary, so check TradingView's current numbers.",
    ]);
  }
}
