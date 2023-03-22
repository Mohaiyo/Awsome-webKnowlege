class PopUpInfo extends HTMLElement {
	constructor() {
		super()
		// create shadow root
		const shadow = this.attachShadow({ mode: 'open' })
		// create a spans
		const wrapper = document.createElement('span')
		wrapper.setAttribute('class', 'wrapper')
		const icon = wrapper.appendChild(document.createElement('span'))

		icon.setAttribute('class', 'icon')
		icon.setAttribute('tabindex', 0)

		const img = icon.appendChild(document.createElement('img'))
		img.src = this.hasAttribute('img') ? this.getAttribute('img') : 'img/default.png'
		img.alt = this.hasAttribute('alt') ? this.getAttribute('alt') : ''

		const info = wrapper.appendChild(document.createElement('span'))
		info.setAttribute('class', 'info')

		// 获取text属性上的内容，并添加到一个span标签内
		const text = this.getAttribute('data-text')
		info.textContent = text

    
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', 'style.css')
    shadow.appendChild(linkElem)
    shadow.appendChild(wrapper)
	}
}

customElements.define('popup-info', PopUpInfo)
