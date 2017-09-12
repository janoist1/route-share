const injectSaga = (store, { key, saga }) => {
  if (Object.hasOwnProperty.call(store.asyncSagas, key)) return

  store.asyncSagas[key] = saga
  store.runSaga(saga)
}

export default injectSaga
