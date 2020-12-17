auth.onAuthStateChanged(async (user) => {
  if (user) {
    //now we check if user is already in db
    const doc = await db.collection('Users').doc(user.uid).get()
    if (!doc.exists) {
      window.location.href = './ccslogin.html'
    }
  } else {
    // User is signed out
    // ...
    window.location.href = './ccslogin.html'
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const logoutButton = document.querySelector('#logout')
  logoutButton.addEventListener('click', async () => {
    try {
      await auth.signOut()
    } finally {
      window.location.href = './ccslogin.html'
    }
  })
})
