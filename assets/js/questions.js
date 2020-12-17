var functions = firebase.functions()
var initialTimeValue = 8
var currentTimerValue = 8
let responsesBody = {
  Management: [],
  Design: [],
  TechnicalCSE: [],
  TechnicalElectrical: [],
  General: [],
  Aptitude: [],
}
let quest = []

auth.onAuthStateChanged((user) => {
  if (user) {
  } else {
    window.location.href = 'ccslogin.html'
  }
})
window.addEventListener('DOMContentLoaded', () => {
  const option_list = document.querySelector('.option_list')
  const timerCount = document.querySelector('.timer_sec')
  const nextButton = document.querySelector('.next_btn')
  const quiz_box = document.querySelector('.quiz_box')
  const que_text = document.querySelector('.que_text')
  const optionList = document.querySelector('.option_list')
  const questionCount = document.querySelector('.question .question-count')
  const subjectiveAnswer = document.querySelector('.subjective-answer textarea')
  // var que_count = 0

  // showQuestions(0)

  const finishExam = async () => {
    try {
      await db
        .collection('Applications')
        .doc(auth.currentUser.uid)
        .set(responsesBody)
      alert('Test completed successfully!')
      auth.signOut()
    } catch (e) {
      console.log(e)
      alert('some error occured')
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
          responsesBody[questionBody.domain].push({ ...questionBody, response })
          console.log(responsesBody)
          deselectOptions()
          nextButton.removeEventListener('click', manageCurrentQuestionResponse)
          showQuestion(index + 1)
        }
        nextButton.addEventListener('click', manageCurrentQuestionResponse)
      } else {
        optionList.style.display = 'none'
        subjectiveAnswer.style.display = 'block'
        timerCount.innerText = 'No Time Limit'
        const manageCurrentNonAptitudeResponse = () => {
          responsesBody[questionBody.domain].push({
            ...questionBody,
            response: subjectiveAnswer.value,
          })
          nextButton.removeEventListener(
            'click',
            manageCurrentNonAptitudeResponse,
          )
          console.log(responsesBody)
          showQuestion(index + 1)
        }
        nextButton.addEventListener('click', manageCurrentNonAptitudeResponse)
      }
    }
  }

  const startTest = () => {
    showQuestion(0)
  }

  const fetchFunctions = async () => {
    try {
      let getQuestions = functions.httpsCallable('getQuestions')

      const result = await getQuestions({
        domains: { Management: true, General: true },
      })
      // result.data.
      const questionsCollection = result.data
      Object.keys(questionsCollection)
        .sort()
        .forEach((domainKey) => {
          const domainQuestions = questionsCollection[domainKey]
          domainQuestions.forEach((question) => {
            quest.push({
              ...question,
              domain: domainKey,
            })
          })
        })
      console.log(quest)
      console.log('starting test')
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
})
