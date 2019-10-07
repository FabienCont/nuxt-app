export default function ({ store, error, redirect, route }) {
  if (!store.state.authUser) {
    error({
      message: 'You are not connected',
      statusCode: 403
    })
  }
}
