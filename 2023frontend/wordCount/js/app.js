const inputText = document.querySelector('#text')
const statEle = document.querySelector('#stat')
const clearBtn = document.querySelector('#clear-btn')

new WordCounter(inputText)

const render = (event) => {
  console.log('event', event)
  const { words, characters } = event.detail
	statEle.innerHTML = `<p>You've written <span class="highlight">${words} words</span> 
      and <span class="highlight">${characters} characters</span>.</p>`
}

clearBtn.addEventListener('click', () => {
  inputText.value = ''
})

inputText.addEventListener('count', render)