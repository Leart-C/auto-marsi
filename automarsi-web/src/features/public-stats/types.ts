export type PublicStats = {
  vehicles_in_stock: number
  years_in_business: number
  customer_conversations: number
  follow_up_rate: number
}

export type PublicStatsResponse = {
  data: PublicStats
}
