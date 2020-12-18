auth.onAuthStateChanged(async (user) => {
  if (user) {
    //now we check if user is already in db
    const doc = await db.collection('Users').doc(user.uid).get()
    if (!doc.exists) {
      window.location.href = './index.html'
    }
  } else {
    // User is signed out
    // ...
    window.location.href = './index.html'
  }
})

window.addEventListener('DOMContentLoaded', () => {})
