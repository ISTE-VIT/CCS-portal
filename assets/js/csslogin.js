auth.onAuthStateChanged(async (user) => {
  if (user) {
    //now we check if user is already in db

    console.log(user)
    const doc = await db.collection('Users').doc(user.uid).get()

    if (doc.exists) {
      window.location.href = './instruction.html'
      //   alert('registered for core committe selections already')
    } else {
      alert('Your registration was not completed, try again from signup page')
      window.location.href = './signup.html'
    }
  } else {
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#login-form')
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = loginForm['email'].value
    const password = loginForm['password'].value
    auth
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        // Signed in
        // ...
        window.location.href = './instruction.html'
      })
      .catch((error) => {
        var errorCode = error.code
        var errorMessage = error.message
        alert('User not found, check your credentials')
        // ..
      })
  })
})
