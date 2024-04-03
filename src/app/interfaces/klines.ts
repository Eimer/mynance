export interface KlinesRequest {
  symbol: string,
  interval: string
}

export interface KlinesResponse {
  0: string,  // Kline open time
  1: string,  // Open price
  2: string,  // High price
  3: string,  // Low price
  4: string,  // Close price
  5: string,  // Volume
  6: string,  // Kline Close time
  7: string,  // Quote asset volume
  8: string,  // Number of trades
  9: string,  // Taker buy base asset volume
  10: string, // Taker buy quote asset volume
  11: string, // Unused field, ignore.
}

export interface Kline {
  time: any, // yyyy-mm-dd
  open: number,
  high: number,
  low: number
  close: number,
  label: any
}
