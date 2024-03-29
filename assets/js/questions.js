var functions = firebase.functions()
var initialTimeValue = 45
var currentTimerValue = 45
let responsesBody = {
  Management: [],
  Design: [],
  TechnicalCSE: [],
  TechnicalElectrical: [],
  General: [],
  Aptitude: [],
}
let quest = []

auth.onAuthStateChanged(async (user) => {
  if (user) {
    if ((await db.collection('Attempted').doc(user.uid).get()).exists) {
      alert('Test already attempted!')
      auth.signOut()
    }
    const timerCount = document.querySelector('.timer_sec')
    const nextButton = document.querySelector('.next_btn')
    const quiz_box = document.querySelector('.quiz_box')
    const que_text = document.querySelector('.que_text')
    const optionList = document.querySelector('.option_list')
    const subjectiveAnswer = document.querySelector(
      '.subjective-answer textarea',
    )
    const questionCount = document.querySelector('.question .question-count')
    // var que_count = 0

    // showQuestions(0)

    const finishExam = async () => {
      try {
        await db
          .collection('Applications')
          .doc(auth.currentUser.uid)
          .set(responsesBody)
        alert('Test completed successfully!')
      } catch (e) {
        console.log(e)
        alert('Test already submitted')
      } finally {
        auth.signOut()
      }
    }
    const showQuestion = async (index) => {
      if (index == quest.length) {
        finishExam()
      } else {
        nextButton.style.display = 'block'
        currentTimerValue = initialTimeValue
        const questionBody = quest[index]
        questionCount.innerHTML = index + 1
        que_text.innerHTML = questionBody.question
        subjectiveAnswer.value = ''
        if (questionBody.domain === 'Aptitude') {
          optionList.style.display = 'block'
          subjectiveAnswer.style.display = 'none'
          const optionA = optionList.querySelector('.optionA')
          const optionB = optionList.querySelector('.optionB')
          const optionC = optionList.querySelector('.optionC')
          const optionD = optionList.querySelector('.optionD')
          optionA.innerHTML = questionBody.optionA
          optionB.innerHTML = questionBody.optionB
          optionC.innerHTML = questionBody.optionC
          optionD.innerHTML = questionBody.optionD

          optionList.querySelectorAll('.option').forEach((e) =>
            e.addEventListener('click', () => {
              deselectOptions()
              e.querySelector('.option_txt').classList.add('selected')
            }),
          )
          const interval = setInterval(() => {
            timerCount.innerHTML = --currentTimerValue
          }, 1000)
          const timeout = setTimeout(() => {
            manageCurrentQuestionResponse()
          }, initialTimeValue * 1000)
          const manageCurrentQuestionResponse = () => {
            clearInterval(interval)
            clearTimeout(timeout)
            const response = getSelectedOption()
            // console.log(questionBody.domain)
            responsesBody[questionBody.domain].push({
              id: questionBody.id,
              response,
            })
            // console.log(responsesBody)
            deselectOptions()
            nextButton.removeEventListener(
              'click',
              manageCurrentQuestionResponse,
            )
            showQuestion(index + 1)
          }
          nextButton.addEventListener('click', manageCurrentQuestionResponse)
        } else {
          optionList.style.display = 'none'
          subjectiveAnswer.style.display = 'block'
          timerCount.innerText = 'No Time Limit'
          const manageCurrentNonAptitudeResponse = () => {
            responsesBody[questionBody.domain].push({
              id: questionBody.id,
              response: subjectiveAnswer.value,
            })
            nextButton.removeEventListener(
              'click',
              manageCurrentNonAptitudeResponse,
            )
            // console.log(responsesBody)
            showQuestion(index + 1)
          }
          nextButton.addEventListener('click', manageCurrentNonAptitudeResponse)
        }
      }
    }

    document.querySelector('.end_button').addEventListener('click', () => {
      nextButton.click()
      finishExam()
    })
    const startTest = () => {
      showQuestion(0)
    }

    const fetchFunctions = async () => {
      try {
        let getQuestions = functions.httpsCallable('getQuestions')
        const userDocument = await db
          .collection('Users')
          .doc(auth.currentUser.uid)
          .get()
        const {
          Design,
          Management,
          TechnicalCSE,
          TechnicalElectrical,
        } = userDocument.data()
        const result = await getQuestions({
          domains: { Design, Management, TechnicalElectrical, TechnicalCSE },
        })
        const questionsCollection = result.data
        Object.keys(questionsCollection)
          .sort()
          .forEach((domainKey) => {
            const domainQuestions = questionsCollection[domainKey] || []
            domainQuestions.forEach((question) => {
              quest.push({
                ...question,
                domain: domainKey,
              })
            })
          })
        document.querySelector('.loader').style.display = 'none'
        startTest()
      } catch (e) {
        console.log(e)
        alert('Some error occured')
      }
    }

    fetchFunctions()

    const deselectOptions = () => {
      document
        .querySelectorAll('.option .selected')
        .forEach((e) => e.classList.remove('selected'))
    }

    const getSelectedOption = () => {
      const selectedOption = document.querySelector('.option .selected')
      return selectedOption ? selectedOption.innerText.trim() : null
    }
  } else {
    window.location.href = 'index.html'
  }
})
window.addEventListener('DOMContentLoaded', () => {})
