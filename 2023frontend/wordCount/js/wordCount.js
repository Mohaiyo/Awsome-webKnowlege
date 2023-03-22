class WordCounter {
  constructor(inputText) {
    this.inputText = inputText
    this.inputText.addEventListener('input', () => this.count())
  }

  count() {
    console.log('this', this)
    let wordStat = this.getWordState(this.inputText.value.trim())
    this.countEmit(wordStat)
  }

  getWordState(str) {
    let matches = str.match(/\S+/g)
    return {
      characters: str.length,
      words: matches ? matches.length : 0
    }
  }

  countEmit(wordStat) {
    let countEvent = new CustomEvent('count', {
      bubbles: true,
      cancelable: true,
      detail: wordStat
    })

    this.inputText.dispatchEvent(countEvent)
  }
}