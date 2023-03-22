const searchTermElem = document.querySelector('#searchTerm')
const searchResultElem = document.querySelector('#searchResult')

searchTermElem.focus()

const debounce = (fn, delay = 1000) => {
	let timeoutId
	return (...args) => {
		if (timeoutId) {
			clearTimeout(timeoutId)
		}

		timeoutId = setTimeout(() => {
			fn.apply(null, args)
		}, delay)
	}
}

const search = debounce(async (searchTerm) => {
  if (!searchTerm) {
    // reset the search result
    searchResultElem.innerHTML = '';
    return;
}

	try {
		const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srlimit=10&srsearch=${searchTerm}`
		const response = await fetch(url)
		const searchResults = await response.json()

		 // render search result
     const searchResultHtml = generateSearchResultHTML(searchResults.query.search, searchTerm);

     // add the search result to the searchResultElem
     searchResultElem.innerHTML = searchResultHtml;
	} catch (error) {
		console.log(error)
	}
})

searchTermElem.addEventListener('input', function (event) {
	search(event.target.value)
})

const stripHtml = (html) => {
	let div = document.createElement('div')
	div.textContent = html
	return div.textContent
}

const highlight = (str, keyword, className = 'highlight') => {
	const hl = `<span class="${className}">${keyword}</span>`
	return str.replace(new RegExp(keyword, 'gi'), hl)
}

const generateSearchResultHTML = (results, searchTerm) => {
	return results
		.map((result) => {
			const title = highlight(stripHtml(result.title), searchTerm)
			const snippet = highlight(stripHtml(result.snippet), searchTerm)

			return `<article>
              <a href="https://en.wikipedia.org/?curid=${result.pageid}">
                  <h2>${title}</h2>
              </a>
              <div class="summary">${snippet}...</div>
          </article>`
		})
		.join('')
}
