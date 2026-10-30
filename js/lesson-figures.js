// Diagrams are inserted after the Nth block following the named heading.
const LESSON_FIGURES = {
  "pips-lots-spreads-margin": [
    { id: "pipAnatomy", after: "Pips: the unit of price movement" },
    { id: "spreadBidAsk", after: "The spread: what it costs to get in" },
    { id: "marginBar", after: "Margin and leverage" },
  ],
  "trends-ranges-and-timeframes": [
    { id: "trendTypes", after: "Trends and ranges" },
    { id: "mtfStack", after: "Multi-timeframe analysis" },
  ],
  "moving-averages": [
    { id: "maPullback", after: "Four ways traders use them" },
    { id: "maWhipsaw", after: "Where they fail" },
  ],
  "momentum-and-volatility-indicators": [
    { id: "rsiDivergence", after: "RSI: how strong has the move been?", n: 2 },
    {
      id: "bollingerSqueeze",
      after: "Bollinger Bands: how stretched is price?",
    },
    { id: "atrStop", after: "ATR: how much is price really moving?", n: 2 },
  ],
  "trading-plan-and-backtesting": [{ id: "planLoop", after: "@intro" }],
  "economic-calendar-mastery": [
    {
      id: "newsReaction",
      after: "How volatility actually behaves around a release",
    },
  ],
  "top-down-trade-thesis": [
    { id: "topDownFunnel", after: "The top-down approach" },
  ],
  "challenge-rules-risk-plan": [
    {
      id: "staticVsTrailing",
      after: "Read the rules like a trader, not a customer",
    },
  ],
  "risk-management-basics": [
    { id: "drawdownRecovery", after: "The math of a drawdown" },
  ],
  "liquidity-crt-and-ranges": [
    { id: "liquiditySweep", after: "Why liquidity sits where it sits" },
  ],
  "tradingview-drawing-tools": [
    { id: "longShortTool", after: "The Long/Short Position tool" },
  ],
};
