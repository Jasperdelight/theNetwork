import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { postsService } from './PostsService.js'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async editAccount(formData) {
    const res = await api.put('/account', formData)
    // logger.log('account edited', res.data)
    let updatedAccount = new Account(res.data)
    AppState.account = updatedAccount
  }

  setAccountAsActive() {
    let account = AppState.account
    logger.log('account', account)
    AppState.activeProfile = account
    postsService.getActiveProfilePosts(account.id)
  }
}

export const accountService = new AccountService()
