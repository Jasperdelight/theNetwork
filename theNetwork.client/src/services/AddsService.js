import { AppState } from "../AppState.js"
import { Add } from "../models/Add.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class AddsService {
  async getAds() {
    const res = await api.get('api/ads')
    // logger.log('adds', res.data)
    const adds = res.data.map(a => new Add(a))
    AppState.adds = adds

  }

}
export const addsService = new AddsService()