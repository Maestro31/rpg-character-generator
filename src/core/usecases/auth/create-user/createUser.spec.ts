import InMemoryAuthGateway from '../../../../adapters/secondary/auth/InMemoryAuthGateway'
import { configureStore, ReduxStore } from '../../../../redux/configureStore'
import { createUser } from './createUser'

describe('Create User', () => {
  let store: ReduxStore
  let authGateway: InMemoryAuthGateway

  beforeEach(() => {
    authGateway = new InMemoryAuthGateway()
    store = configureStore({ authGateway })
  })

  it('should create user with given informations', async () => {
    await store.dispatch(
      createUser('uuid-1', {
        firstname: 'Jack',
        lastname: 'Skellington',
        email: 'jack.skellington@halloween.com',
        password: 'jackh@lloween',
      })
    )

    expect(authGateway.getUser('uuid-1')).toBeDefined()
  })

  it('should login after user creation', async () => {
    await store.dispatch(
      createUser('uuid-1', {
        firstname: 'Jack',
        lastname: 'Skellington',
        email: 'jack.skellington@halloween.com',
        password: 'jackh@lloween',
      })
    )

    expect(authGateway.getUsersLogged()).toHaveProperty('jack-skellington')
  })
})
