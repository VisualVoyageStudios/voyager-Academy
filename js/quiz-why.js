// Explanations shown after each quiz answer. Matched by the start of the question text,
// so reordering or editing questions never shows the wrong explanation.
const QUIZ_WHY = {
  "what-is-forex": [
    ["In EUR/USD, which is the base", "The first currency in a pair is the base and the second is the quote. EUR/USD tells you how many US dollars one euro costs."],
    ["If you believe a pair's price will rise", "Buying (going long) profits when price rises. Selling, or shorting, is what you do when you expect it to fall."],
    ["Why does forex trade around the clock", "There's no single exchange. Banks and institutions hand the market from one time zone to the next, so it runs around the clock on weekdays."],
    ["What ultimately determines whether a trade", "Indicators and candles only help you form a view. A trade makes money if price moves your way and loses if it doesn't."],
    ["What's a 'cross pair'", "Pairs like EUR/GBP or AUD/JPY don't include the US dollar, which is what makes them crosses."],
    ["Roughly how much trades through", "Forex is the world's largest financial market, with several trillion dollars changing hands every day, which is why major pairs are generally easy to trade."]
  ],
  "risk-management-basics": [
    ["On a $100 account risking 2%", "2% of $100 is $2. Risk is a fixed percentage of your account, decided before you enter."],
    ["With a 1:3 risk-to-reward ratio", "A 1:3 ratio means the target is three times the risk: 3 × $2 = $6."],
    ["What does leverage actually do", "Leverage lets you control a bigger position than your cash alone, so gains and losses are both magnified. It doesn't create free money or remove risk."],
    ["What should decide when a losing trade", "Decide your exit before you enter, while you're calm. A stop loss removes emotion from the moment a trade goes against you."],
    ["After a 50% account loss", "If $100 falls to $50, you need to double the $50 to get back, which is a 100% gain. Losses are harder to recover than they look."],
    ["Expectancy combines which two", "A strategy can win less than half the time and still make money if its average win is bigger than its average loss. Expectancy weighs both."]
  ],
  "trading-psychology-basics": [
    ["What's the seatbelt analogy", "You don't wear a seatbelt because you expect a crash on every drive. Risk management is for the rare trade that goes badly wrong."],
    ["According to the lesson, what can you actually control", "You can't control where the market goes. You can control your size, your rules and how you react, and that's where discipline lives."],
    ["What's the real warning sign about a paid signal", "Promised returns are easy to claim and hard to check. Someone worth trusting can show a verifiable track record."],
    ["Which is described as learnable", "Chart patterns and indicators can be learned fairly quickly. Emotional discipline takes much longer, and it's usually what separates traders."],
    ["What is confirmation bias", "It's looking for evidence that you're right while ignoring signs you're wrong, a common reason traders hold losing trades too long."],
    ["What's a sensible use of a daily loss limit", "A limit set in advance ends the day before frustration turns one bad session into a big loss. You decide while calm."]
  ],
  "support-resistance-and-zones": [
    ["After resistance breaks and price returns", "Once price breaks above resistance, that level often flips to support, because traders who missed the breakout buy the retest."],
    ["How many points of contact does a valid trend line", "Two points draw any line. A third touch shows the market is actually respecting it."],
    ["Which of these was NOT listed as a way to spot a zone", "Zones come from price behaviour: repeated reactions, sharp moves away from a level, clear swing points. Moving average crossovers aren't one of them."],
    ["What do pivot points use", "Pivots are calculated from the previous period's high, low and close, so they're fixed levels you can plan around."],
    ["What's the key difference between a supply/demand zone", "A supply or demand zone marks where a strong move began. Support and resistance mark where price has repeatedly turned."],
    ["Why does a 'fresh' zone", "Each time price returns, some of the orders resting there get filled. A fresh zone still has most of its orders waiting."]
  ],
  "chart-patterns-and-fakeouts": [
    ["Which pattern type can break in either", "Bilateral patterns, such as symmetrical triangles, don't favour a direction in advance. You wait for the break."],
    ["A Head & Shoulders pattern typically", "It shows an advance losing strength, with a lower high on the right shoulder. A break of the neckline signals a possible reversal."],
    ["A bullish flag or pennant", "Flags and pennants are brief pauses inside a strong move, and they tend to resolve in the direction of the original trend."],
    ["What's a key tell of a market fakeout", "Real breakouts close decisively beyond the level. Repeated, weakening attempts that fail to hold suggest a trap rather than a true break."],
    ["A retest of a broken resistance level", "A throwback is price returning to retest a broken resistance level before moving on. The old resistance now acts as support."],
    ["What does the 'measured move'", "Measure the pattern's height and project it from the breakout point to get a reasonable target."]
  ],
  "candlestick-confirmations": [
    ["A small body with long wicks on both ends", "Long wicks show price travelled in both directions and was pushed back. Neither buyers nor sellers held control."],
    ["Which pattern is a three-candle reversal", "A morning or evening star uses three candles: a strong move, a small indecision candle, then a strong candle the other way."],
    ["In 'accumulation, manipulation, distribution", "Manipulation is the move that sweeps stops or lures traders the wrong way before the real move begins."],
    ["What does the Harami / inside bar", "In this lesson an inside bar is read as a pause: the candle sits inside the previous one's range, usually before the trend continues."],
    ["A Tweezer Top is identified", "A tweezer top is two candles with matching or near-matching highs. Price tried the same level twice and was rejected both times."],
    ["Why should candle size be judged relative", "A 20-pip candle is large on a quiet pair and ordinary on a volatile one. ATR gives you that context."]
  ],
  "fibonacci-and-market-structure": [
    ["What's the Golden Zone range", "In this course the Golden Zone is the deep retracement area between 78.6% and 88.6%."],
    ["Which levels are called 'manipulation levels'", "In this lesson the shallower retracements (23.6%, 38.2%, 50% and 61.8%) are the manipulation levels, separate from the deeper Golden Zone."],
    ["What does BOS stand for", "A break of structure is price closing beyond the previous swing high or low in the direction of the trend, showing it's continuing."],
    ["What does CHoCH indicate", "A change of character is the first sign the market's behaviour has flipped, such as breaking below a swing low after a run of higher lows."],
    ["What's the main rule for choosing which swing", "Fibonacci works partly because many traders watch the same levels. Anchor to the swing others would also pick."],
    ["What do Fibonacci extensions", "Extensions project beyond the original move, so they help you estimate where a trade might reach a target."]
  ],
  "trade-planning-essentials": [
    ["A 'buy stop' order fills", "A buy stop sits above the current price and triggers when price rises through it, confirming momentum before you're in."],
    ["In 'boxing the market,' what's step 1", "Boxing starts by marking the clear support and resistance levels, so you have a frame for the trade before looking for entries."],
    ["When is the highest-volatility window", "When London and New York are both open, trading volume peaks and moves tend to be larger."],
    ["Which of these was NOT listed as a pre-trade check", "Pre-trade checks are about your own plan: levels, risk, timing. Other traders' results aren't something you can know or rely on."],
    ["What does moving a stop loss to breakeven", "With your stop at your entry, the worst case is roughly zero (ignoring slippage). The trade can no longer turn into a loss, though a tight stop can also shake you out early."],
    ["What's the purpose of grading a setup", "Grading before entry makes you judge the setup honestly, instead of inventing reasons to justify a trade you've already taken."]
  ],
  "smc-ict-foundations": [
    ["What is an 'order block'", "An order block is the last candle before a strong, impulsive move. It marks where large orders may have been placed."],
    ["What does DOL stand for", "DOL is draw on liquidity: the level price is being pulled towards, such as an obvious high or low where stops are resting."],
    ["Bullish order flow is defined", "Bullish flow means buyers are in control: price keeps breaking above previous highs and rejecting lower prices."],
    ["Order blocks are usually first identified", "Higher timeframes like 4H or Daily show the bigger picture. Lower timeframes are used afterwards to refine entries."],
    ["What makes an order block 'valid'", "Any candle can come before a move. A valid block is followed by a real break of structure or an imbalance, showing genuine commitment."],
    ["A bullish order block is", "A bullish block is the last down candle before price moves up, showing where buying interest entered before the rally."]
  ],
  "liquidity-crt-and-ranges": [
    ["In the 3-candle CRT model", "On candle 2, price takes out the first candle's high or low and then pulls back with a rejection wick. That purge is the setup."],
    ["What's the simplest liquidity read", "Prior highs and lows are obvious levels where many stops sit, so they're natural targets for price."],
    ["What's the difference between a close beyond a level", "A close beyond a level shows acceptance there. A wick through it that closes back inside suggests liquidity was grabbed and price rejected."],
    ["In range dynamics, what's typically your first draw", "Inside a range, price often travels to the 50% midpoint first, so it's the first target after an entry from an edge."],
    ["Why does liquidity cluster just beyond", "Traders put stops just past obvious highs and lows. Those stops, plus breakout orders, create a pool of liquidity that price is drawn to."],
    ["Which session's range is commonly swept", "The Asian range is usually narrow and clear. Price often sweeps one side of it around the London open before the day's real move."]
  ],
  "irl-erl-and-fvg": [
    ["What does ERL stand for", "ERL is external range liquidity: the highs and lows outside the current range. Internal range liquidity (IRL) sits inside it."],
    ["In premium/discount theory", "The discount is the lower half of a range, where price is cheap relative to it. Buyers look there, and sellers look in the premium."],
    ["Which FVG type is 'low probability'", "In this lesson, a gap created during a deep retracement is the low-probability type: price is likely to trade straight through and fill it."],
    ["Which FVG type tends NOT to retest", "Expansion or breakaway gaps come from strong, fast moves. Price often keeps going without returning to retest them."],
    ["What is 'CE' (Consequent Encroachment)", "CE is the 50% midpoint of a fair value gap, a precise level to watch for reactions inside the gap."],
    ["Why does it matter when an FVG overlaps", "Two independent concepts pointing at the same area is confluence, which makes the zone more significant than either one alone."]
  ],
  "elliott-wave-and-market-cycles": [
    ["How many waves make up the basic impulse", "An impulse has five waves: three that move with the trend (1, 3 and 5) and two pullbacks (2 and 4)."],
    ["How many waves make up the corrective", "The correction that follows a five-wave impulse has three waves, labelled A, B and C."],
    ["Where do order blocks often form", "Wave 4 is the pullback before the final push. The lesson points to order blocks forming there as a place to look for the move into wave 5."],
    ["What caution does the lesson give about Elliott", "Two analysts can count the same chart differently. Treat waves as one piece of confluence, not a standalone trigger."],
    ["What is an 'ending diagonal'", "It's a wedge with overlapping waves that often appears at the end of a trend, signalling exhaustion rather than strength."],
    ["Which wave is classically described", "Wave 3 is usually the strongest, as the trend gains momentum and more traders join. It's never the shortest of the three impulse waves."]
  ],
  "mt4-mt5-and-synthetic-indices": [
    ["Which MT4/5 tab shows Balance", "The Trade tab in the Terminal window lists your open positions along with balance, equity and margin."],
    ["How does the Crash Index typically behave", "Crash indices drift up in small steps and then drop sharply. That's how the product is built, so stops and position sizing matter."],
    ["What does the 1% Rule say", "Risk no more than 1% of your account on any single trade, so a string of losses can't do major damage."],
    ["What should you do before trading a strategy live", "A demo account lets you test the strategy and the platform without risking real money."],
    ["What does a trailing stop do", "A trailing stop follows price at a set distance, locking in more profit as the trade moves your way. It never moves back against you."],
    ["What's a key difference between demo and live", "Live trading involves real order queues, so fills can slip and take longer than they do on a demo."]
  ],
  "cot-positioning": [
    ["Who publishes the COT report", "The US Commodity Futures Trading Commission (CFTC) publishes the Commitments of Traders report every week."],
    ["What can extreme, one-sided positioning", "When almost everyone is on the same side, there are fewer new buyers left, so the trend can be stretched and due for exhaustion."],
    ["Why is COT data considered 'lagging'", "The report shows positions as of Tuesday and is released on Friday, so it's already days old when you see it."],
    ["COT data is best used as what kind", "Because it's weekly and delayed, it suits medium-term context rather than short-term entries."],
    ["What does the COT Index (0-100 scale)", "It scales current positioning against its recent high and low, so you can see whether it's near an extreme."],
    ["In the worked example, what did a falling net position", "A net position that's still positive but falling means large speculators are trimming bullish bets, an early sign of fading enthusiasm."]
  ],
  "tradingview-interface-tour": [
    ["Where do you switch chart timeframe", "The interval selector sits at the top of the chart, next to the symbol search box."],
    ["What lives in TradingView's left toolbar", "The left toolbar holds your drawing tools: trend lines, Fibonacci, shapes, text and measuring tools."],
    ["What do layout tabs let you save", "A layout saves a whole chart arrangement with its symbols, indicators and drawings, so you can switch between setups quickly."],
    ["Where do paper trading and broker connections live", "The Trading Panel at the bottom of the screen is where you connect a broker or use paper trading."],
    ["What does the Object Tree help", "The Object Tree lists every drawing and indicator on the chart, so you can show, hide, lock or delete them from one place."],
    ["What does the camera icon do", "The camera icon takes a snapshot of your exact chart and gives you a link you can share."]
  ],
  "tradingview-drawing-tools": [
    ["What does Magnet Mode do", "Magnet Mode snaps your drawing points to candle highs, lows and closes, so lines land exactly where you aim."],
    ["How do you use the measure tool", "Hold Alt (Option on a Mac) and drag across the chart to measure price and time."],
    ["What happens when you lock a drawing", "A locked drawing stays where you put it, so it can't be moved if you drag the chart by mistake."],
    ["What can you save to auto-apply", "A template stores colours, line widths and other style settings, so you can apply your preferred look to new drawings."],
    ["What does the Long/Short Position tool calculate", "It draws your entry, stop and target on the chart and shows the risk-to-reward ratio, and with an account size it can show position size too."],
    ["Anchored VWAP is commonly used", "You pick the starting point, such as a swing low or a news event, and it shows the volume-weighted average price from there onward."]
  ],
  "tradingview-indicators-and-strategies": [
    ["How many indicators can you run per chart", "The lesson gives two indicators per chart on the free plan. TradingView changes plan limits, so check their current pricing page."],
    ["What do you need to know to simply USE", "You can add community indicators from the Indicators menu with one click. You only need to understand the code if you want to change one."],
    ["Where do you change an indicator's colors", "Hover over the indicator's name in the chart legend and click the gear (settings) icon."],
    ["What is Pine Script", "Pine Script is TradingView's own language for building custom indicators and strategies."],
    ["What's the risk of stacking several similar", "Momentum tools like RSI and Stochastic mostly measure the same thing, so stacking them looks like confirmation without adding new information."],
    ["Where can you view Pine Script code", "Open the Pine Editor panel at the bottom to read the source of many published scripts, even if you never write one."]
  ],
  "tradingview-alerts-and-watchlists": [
    ["How many active alerts does the free plan", "The lesson gives three active alerts on the free plan. TradingView changes plan limits, so check their current pricing page."],
    ["What happens to free-plan alerts", "Free-plan alerts expire after a set period, so check now and then that the ones you rely on are still active."],
    ["How many symbols can a free-plan watchlist", "The lesson gives 30 symbols per watchlist on the free plan. Plan limits can change, so check the current numbers."],
    ["What's the Screener used for", "A screener filters a large list of markets by criteria like price change or volume, so you can find candidates worth a closer look."],
    ["What does 'Once Per Bar Close' do", "Once Per Bar Close waits for the candle to finish before alerting, so a brief mid-candle spike won't trigger it."],
    ["Where do you manage and edit alerts", "Open the Alerts panel (the clock icon) to see, edit, pause or delete your alerts."]
  ],
  "tradingview-paper-and-live-trading": [
    ["What's the default virtual balance", "Paper trading starts with $100,000 of virtual money, which you can reset."],
    ["Why reset your paper balance", "Practising with $100,000 when you'll trade $500 teaches position sizes that won't carry over to your real account."],
    ["Do you need a broker connection to use paper", "Paper trading runs entirely inside TradingView with virtual money, so no broker account is needed."],
    ["What determines which real brokers", "Supported brokers differ by country and change over time, so check the list inside TradingView."],
    ["What can the Order Panel's built-in calculator", "Enter your risk percentage and stop distance and it works out the position size, so you don't have to calculate it by hand."],
    ["What is a 'bracket order'", "A bracket order places your entry with a stop loss and take profit attached, so your exits are in place from the start."]
  ],
  "macro-fundamentals-intro": [
    ["What does fundamental analysis study", "Technical analysis studies price itself. Fundamental analysis studies the economic and political forces behind it."],
    ["A currency pair is best understood", "EUR/USD isn't the value of the euro alone. It compares the Eurozone's economy with the US economy."],
    ["All else equal, what tends to strengthen", "Growth and rising rates tend to attract capital. A shrinking economy and falling rates tend to do the opposite."],
    ["What does 'priced in' mean", "Markets look forward. By the time news arrives, traders have already positioned for what was expected."],
    ["Which of these is NOT one of the major themes", "The major themes are growth, inflation, employment, monetary policy and trade. Lunar cycles aren't an economic driver."],
    ["Why does fundamental analysis matter even", "A surprise rate decision or data release can blow through a clean technical level in seconds."]
  ],
  "economic-calendar-mastery": [
    ["On a calendar entry, what does 'Forecast'", "Forecast is the consensus expectation. Markets react to the gap between actual and forecast, not to the number alone."],
    ["If Actual beats Forecast", "A better-than-expected result usually supports the currency, though how price actually reacts depends on what was already priced in."],
    ["What is NFP", "Non-Farm Payrolls is the monthly US jobs report, known for sharp moves in the dollar."],
    ["What often happens to spreads right before", "Liquidity thins and brokers widen spreads to protect themselves, so entering just before news costs more."],
    ["Why might the very first price spike", "The first spike is often an over-reaction that reverses within seconds, before the real move settles."],
    ["What's one disciplined approach", "Spreads, slippage and chaotic price action make news a different game. Many traders simply stay flat around major releases."]
  ],
  "central-banks-and-rates": [
    ["What does a central bank directly control", "Central banks set the base interest rate for their currency. Everything else they influence indirectly."],
    ["Which central bank is paired with ZAR", "The South African Reserve Bank sets monetary policy for the rand."],
    ["What does 'hawkish' language signal", "Hawkish means leaning towards higher rates to fight inflation, which is generally supportive for the currency."],
    ["What is a 'rate differential'", "It's the gap between two currencies' interest rates, and it influences where capital flows."],
    ["What is a carry trade", "You borrow a low-rate currency to hold a high-rate one and collect the difference. It works until volatility forces everyone out at once."],
    ["Why can a currency move even when rates", "Markets trade expectations of future rates, so a hawkish or dovish tone can move price even when the rate itself doesn't change."]
  ],
  "top-down-trade-thesis": [
    ["In the top-down approach, what comes first", "You start with the big picture, the macro bias for each currency, then narrow to the pair and finally to the chart."],
    ["What should you do when fundamentals and the technical chart disagree", "Disagreement usually means the trade isn't clean yet. Waiting for alignment beats forcing a trade."],
    ["Why does fundamental + technical alignment matter", "When both layers point the same way, a decent setup gains conviction. It still doesn't guarantee a win."],
    ["Intermarket correlations (like Gold vs. USD)", "Correlations come from real links, such as gold being priced in dollars, so they're worth understanding rather than treating as coincidence."],
    ["Do you need a full fundamental analysis", "A rough sense of which way the macro wind is blowing is often enough context to add conviction or caution."],
    ["What does a strong fundamental bias suggest", "A strong bias can eventually pull a messy chart its way, but that can take time, so patience beats forcing entries."]
  ],
  "layered-risk-budgeting": [
    ["At 1% risk per trade, a daily loss limit", "1R is 1% of your account, so 3R is 3%."],
    ["What is 'open risk'", "Open risk is what you'd lose if every open trade were stopped out at the same moment, which is the number to cap."],
    ["Long EUR/USD, long GBP/USD", "All three profit from a weaker dollar, so one US dollar rally can stop out all of them at once."],
    ["What is the main purpose of a circuit breaker", "It's a rule set in advance, so you aren't deciding what to do while frustrated."],
    ["After ten consecutive losses at 2%", "Each loss multiplies your balance by 0.98. After ten, 0.98 to the power of 10 is about 0.82."],
    ["Why express limits in R", "R scales with your per-trade risk, so the same rules still make sense when your account grows."]
  ],
  "how-funded-challenges-work": [
    ["What is a funded-trader challenge", "You pay a fee to trade under a firm's rules. If you hit the target without breaking the limits, you get a funded account and a profit split."],
    ["What does 'maximum overall loss' mean", "It's the firm's cap on total drawdown. Breaking it ends the account."],
    ["Why should pass-rate claims be treated", "Verified pass rates are hard to find, and many figures online come from firms or people paid to promote them."],
    ["Which is a fair way to think about the fee", "The fee buys an attempt, not a result. Only pay what you'd be comfortable losing entirely."],
    ["What do challenge rules mostly punish", "Oversized risk, revenge trading and ignoring stops are what the loss limits catch, and those habits lose money anywhere."],
    ["Which is often true of a 'funded' account", "Many firms use a simulated account, or only partly back it with real capital, and they aren't always clear about it."]
  ],
  "challenge-rules-risk-plan": [
    ["What's the difference between a static and a trailing", "A trailing limit rises with your profits, so it can be much tighter than it first looks."],
    ["On a $100,000 account risking 0.5%", "1R is 0.5% of the account, so a 5% limit is 5 ÷ 0.5 = 10R."],
    ["Where should your own limits sit", "Your limits should trigger first, so you stop yourself long before the firm does it for you."],
    ["At 2% risk per trade, roughly how many", "Two losses at 2% is 4%, which is still inside a 5% limit. The third takes you to 6%, past it."],
    ["Why save a dated copy", "Rules change over time, and a dated copy shows what you agreed to when you bought."],
    ["With an 8% target and 0.5% risk", "8% ÷ 0.5% = 16, so you need about 16R of net profit."]
  ],
  "pacing-a-challenge": [
    ["'I paid for this, so I have to pass'", "The fee is gone whether you trade or not. The only question is whether the next trade is a good one."],
    ["When should your per-trade risk change", "Raising size because you're behind is how challenges get blown. Change it only by a rule you wrote beforehand."],
    ["A strategy averaging +0.25R per trade", "16R ÷ 0.25R per trade = 64 trades."],
    ["If a $500 attempt has a 15% chance", "Expected attempts are 1 ÷ 0.15 ≈ 6.7, and 6.7 × $500 comes to about $3,300."],
    ["What's a sensible approach after passing", "Funded accounts keep the same loss limits, so celebrating by trading bigger is a common way to lose them."],
    ["Why decide in advance how many attempts", "A limit set beforehand stops a run of failures from turning into emotional, chasing purchases."]
  ],
  "choosing-a-prop-firm": [
    ["Which of these is a red flag", "Nobody can guarantee a trading outcome, so promises of guaranteed funding or passing are a warning sign."],
    ["Why be cautious about firm 'reviews'", "Many reviewers earn a commission per sale, which isn't always disclosed."],
    ["What can you check at no cost", "Regulators such as the FSCA publish warnings about unlicensed operators, and searching takes a minute."],
    ["Why start with the cheapest account size", "The rules and your skill are tested the same either way, so the smaller fee costs less to learn from."],
    ["What's the honest benchmark", "A small live account costs no fee and you keep all your profit. It's slower to scale, but it's the fair comparison."],
    ["What should you save at the time of purchase", "Terms can change after you pay, and a dated copy shows what applied when you bought."]
  ]
};