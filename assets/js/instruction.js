auth.onAuthStateChanged(async (user) => {
  if (user) {
    //now we check if user is already in db
    console.log(user.uid)
    const doc = await db.collection('Users').doc(user.uid).get()
    if (!doc.exists) {
      window.location.href = './index.html'
    }
    if ((await db.collection('Attempted').doc(user.uid).get()).exists) {
      alert('Test already attempted!')
      auth.signOut()
    }
  } else {
    // User is signed out
    // ...
    window.location.href = './index.html'
  }
})
