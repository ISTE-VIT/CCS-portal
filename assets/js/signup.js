firebase.auth().onAuthStateChanged(async (user) => {
  if (user) {
    //now we check if user is already in db
    console.log(user.uid)
    const doc = await db.collection('Users').doc(user.uid).get()
    if (doc.exists) {
      window.location.href = './instructions.html'
    }
  }
})

window.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.querySelector('#signup-form')
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
      const name = signupForm['name'].value
      const registrationNumber = signupForm['registrationNumber'].value
      const email = signupForm['email'].value
      const mobile = signupForm['mobile'].value
      const password = signupForm['password'].value
      const {
        TechnicalCSE,
        TechnicalElectrical,
        Design,
        Management,
      } = signupForm
      let uid
      if (!auth.currentUser) {
        await auth
          .createUserWithEmailAndPassword(email, password)
          .then((user) => {
            // Signed in
            // ...
            uid = user.user.uid
          })
      } else {
        uid = auth.currentUser.uid
      }

      db.collection('Users')
        .doc(uid)
        .set({
          name,
          registrationNumber,
          email,
          mobile,
          password,
          TechnicalCSE: TechnicalCSE.checked,
          TechnicalElectrical: TechnicalElectrical.checked,
          Design: Design.checked,
          Management: Management.checked,
        })
        .then(() => {
          window.location.href = './instruction.html'
        })
    } catch (e) {
      alert('Unable to sign up. User probably already exists!')
    }
  })
})
