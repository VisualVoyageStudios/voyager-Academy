// Guided live-chart exercises, inserted at the end of the named section (see lesson-ux.js).
// A live chart changes every day, so these are procedures with a way to check yourself,
// not pre-solved answers.
const LESSON_CHARTS = {

  "what-is-forex": {
    after: "Majors, minors, and exotics",
    symbol: "FX_IDC:EURUSD", interval: "D",
    title: "Compare a major with an exotic",
    steps: [
      "Say out loud which currency in EUR/USD is the base and which is the quote.",
      "Hold Alt (Option on a Mac) and drag across the last 20 daily candles to measure the move in price and in percent.",
      "Type USDZAR into the symbol box at the top left and measure the same period. Then try EURGBP, a cross.",
    ],
    check: "Which pair moved furthest in percent, and which looks roughest from candle to candle? Exotics usually swing more than majors, which is part of why their spreads are wider. Today's numbers will differ from tomorrow's; the pattern is what to look for.",
  },

  "support-resistance-and-zones": {
    after: "Trading the level, not just marking it",
    symbol: "FX_IDC:EURUSD", interval: "D",
    title: "Find the levels that matter",
    steps: [
      "Zoom out until you can see about six months of daily candles.",
      "Draw rectangles (not thin lines) over the two or three areas where price turned at least twice.",
      "For each zone, note how many times price reacted and when it last touched.",
      "Find one level that broke and was later retested. Did it flip role?",
    ],
    check: "You should be able to say in one sentence why each zone matters. If you can't, delete it. Then compare zones price has barely touched with ones it has hit three or more times: the lesson's idea is that heavily tested zones are more likely to give way.",
  },

  "chart-patterns-and-fakeouts": {
    after: "Measuring a target, not just a direction",
    symbol: "FX_IDC:GBPUSD", interval: "240",
    title: "Test a pattern against what happened next",
    steps: [
      "Scroll back through a few months of 4-hour candles and find one flag, pennant or triangle.",
      "Draw its boundary lines.",
      "Look at the breakout: did a candle close beyond the line, or did price only wick through?",
      "Measure the pattern's height (Alt + drag) and project that distance from the breakout point.",
      "Scroll forward. Did price retest the broken level? Did it reach your target?",
    ],
    check: "Write down three things per pattern: closed beyond or wick only, retest or no retest, target reached or not. After two or three patterns you'll see why the lesson says to wait for a close, and why a textbook pattern still fails sometimes.",
  },

  "candlestick-confirmations": {
    after: "Location matters more than the pattern itself",
    symbol: "FX_IDC:EURUSD", interval: "240",
    studies: ["ATR@tv-basicstudies"],
    title: "Does location matter more than the pattern?",
    steps: [
      "If ATR isn't already on the chart, add ATR(14) from the Indicators menu.",
      "Find three pin bars or engulfing candles.",
      "For each one, ask whether it formed at a real level (a swing high or low, a zone) or in open space.",
      "Compare its size with the ATR reading. Is it big or ordinary for this pair right now?",
      "Scroll forward ten candles and note what price did.",
    ],
    check: "Put the candles that formed at a level in one group and the ones in open space in another, and compare. The lesson's point is that location matters more than the pattern itself. Three examples is a hint, not proof.",
  },

  "fibonacci-and-market-structure": {
    after: "Putting it together: a confluence example",
    symbol: "FX_IDC:EURUSD", interval: "240",
    title: "Anchor a Fibonacci the right way",
    steps: [
      "Label the swing highs and lows of the last strong move. Is it higher highs and higher lows, or the reverse?",
      "Pick the most obvious swing low and swing high, the ones other traders would also pick, and draw a Fibonacci retracement between them.",
      "Note which levels price actually reacted at: the shallow ones, or the Golden Zone (78.6% to 88.6%)?",
      "Now redraw it from a minor wiggle instead and watch how far the levels move.",
      "Look for a break of structure or a change of character after the pullback.",
    ],
    check: "Where a Fibonacci level, an old support or resistance zone and a trend line land in the same few pips, that's confluence. If you had to squint to justify your anchor swing, it wasn't the right one.",
  },

  "trade-planning-essentials": {
    after: "Before you open a trade, check:",
    symbol: "FX_IDC:EURUSD", interval: "60",
    title: "Plan a practice trade",
    steps: [
      "Pick a clear level and write your bias in one sentence: long or short, and why.",
      "Find the Long Position or Short Position tool in the left toolbar and place it with your entry at the level.",
      "Put the stop where your idea is proven wrong and the target at the next level. Read the risk-to-reward ratio it shows.",
      "Grade the setup A+, B or C and write down why, before you look at what happens next.",
      "Then work out the position size in the calculators.",
    ],
    link: ["tools.html", "Open the calculators"],
    check: "A complete plan has an entry, a stop that invalidates the idea, a target and a size, all decided before price moves. This is a practice drawing, not a recommendation to trade.",
  },

  "smc-ict-foundations": {
    after: "Validating an order block",
    symbol: "FX_IDC:EURUSD", interval: "240",
    title: "Find and validate an order block",
    steps: [
      "Find a strong impulsive move that clearly broke a previous swing high or low.",
      "Mark the last candle before it, the order block candidate, with a rectangle.",
      "Validate it: did the move break structure or leave a fair value gap? If not, delete the box.",
      "Scroll forward. Did price come back to retest the block, and did it hold?",
    ],
    check: "Count how many candidates you marked and how many passed validation. The lesson's rule is that not every candle before a move counts, so a clean chart should end up with only a few blocks.",
  },

  "liquidity-crt-and-ranges": {
    after: "A second example: session liquidity",
    symbol: "FX_IDC:EURUSD", interval: "15",
    title: "Watch the Asian range get swept",
    steps: [
      "Chart times are UTC (add 2 hours for South Africa). Pick a recent weekday.",
      "Mark that day's Asian session high and low with two horizontal lines. Definitions vary; one common choice is midnight to 07:00 UTC. Use the same one every time.",
      "Scroll to the London open, around 07:00 to 08:00 UTC depending on daylight saving. Did price sweep one side of the range?",
      "Did a candle close back inside the range (a grab) or stay outside (a break)? What happened next?",
      "Repeat on four more days.",
    ],
    check: "Tally the five days: swept one side, swept both, or no sweep. Some days won't fit, and that's normal. Five days gives you a feel for how often the idea shows up, not a statistic.",
  },

  "irl-erl-and-fvg": {
    after: "CE: the FVG's own midpoint",
    symbol: "FX_IDC:EURUSD", interval: "60",
    title: "Find a fair value gap and track it",
    steps: [
      "Find a fair value gap: three candles where candle 1's high and candle 3's low don't overlap (bullish), or candle 1's low and candle 3's high don't (bearish).",
      "Draw a rectangle over the gap and a line through its midpoint, the CE.",
      "Scroll forward. Did price return? Did it reach the CE, or fill the whole gap?",
      "Try to classify it using the lesson's four gap types.",
      "Is it sitting in premium or discount, relative to the range it formed in?",
    ],
    check: "The lesson says gaps from fast, expansive moves often never retest. Do your examples agree? Note any you couldn't classify. Ambiguity is normal, and it's a good reason to want confluence.",
  },

  "elliott-wave-and-market-cycles": {
    after: "A validity check: the overlap rule",
    symbol: "FX_IDC:EURUSD", interval: "D",
    title: "Count a move, then try to break your count",
    steps: [
      "Find one big move on the daily chart and try to label it 1, 2, 3, 4, 5.",
      "Run the overlap check: does wave 4 trade back into wave 1's territory? If so, your count is probably wrong.",
      "Compare the lengths. Wave 3 should never be the shortest of waves 1, 3 and 5.",
      "Ask someone else to count the same move and compare.",
    ],
    link: ["chat.html", "Ask in live chat"],
    check: "If two reasonable counts exist, that's the lesson's warning in action: wave counts are subjective, so use them as one piece of confluence, not a trigger.",
  },

  "central-banks-and-rates": {
    after: "A worked example",
    symbol: "TVC:DXY", interval: "60",
    title: "See how the dollar reacted to the last Fed decision",
    steps: [
      "Open the economic calendar and find the most recent Fed (FOMC) rate decision. Note the forecast and the actual.",
      "Come back to this chart and scroll to that date. The statement comes out at 2:00 pm New York time and the press conference starts about 30 minutes later. Chart times are UTC, so convert first.",
      "Mark both moments. Which one moved the dollar index more?",
      "Was the decision itself a surprise? Where was price a day later?",
    ],
    link: ["calendar.html", "Open the economic calendar"],
    check: "The lesson's claim is that tone and the press conference often matter more than the decision itself, because markets trade expectations. One event can't prove it. Try the ECB or the Bank of England the same way.",
  },

};