//DOM selections...!
const field = document.querySelector('.listfield')
const send = document.querySelector('.send')
const clear = document.querySelector('.clear')
const all = document.querySelector('.selectall')
const btsel = document.querySelector('.btselect')
const legendtitle = document.querySelector('.legendtitle')
const btstrength = document.querySelector('.btstrength')
const stStrength = document.querySelector('#stStrength')

let absentee = ''

// will ask for total strength and will rander that much checkbox
function Init() {
	
	// hiding stuff
	btsel.style.display = 'none'
	send.style.display = 'none'

	//getting the strength:
	legendtitle.innerHTML = "Enter the strength :"

	
	function putCheckboxes() {
		//checking the entered value
		if(stStrength.value > 0 && stStrength.value < 1000) {
			
			//showing the hiden stuff
			btsel.style.display = 'flex'
			send.style.display = 'block'
			
			//changign the legend
			legendtitle.innerHTML = "Check the absentees' Roll No.:"

			//values
			let st = stStrength.value
			let entries = ''

			for (let i = 1; i <= st; i++) {
				entries += `<label for="${i}">
				<input type="checkbox" id="${i}" name="rollno${i}" value="${i}">
				${i}
			</label>`
			}

			field.innerHTML = entries

		}
	}

	//strength getting events...
	btstrength.addEventListener('click', putCheckboxes)
	stStrength.addEventListener('keyup', (e) => {
		if(e.keyCode === 13) {
			e.preventDefault();
	
			btstrength.click();
		}
	})
}

//clear button clikc event
clear.addEventListener('click', ()=> {
	const checkboxes = document.querySelectorAll('input')

	checkboxes.forEach(box => {
		if(box.type === 'checkbox') {
			box.checked = false
		}
	})

	//making sure previous selected item not there
	absentee = ''
})

//selectall button clikc event
all.addEventListener('click', ()=> {
	const checkboxes = document.querySelectorAll('input')
	//making sure previous selected item not there
	absentee = ''

	checkboxes.forEach(box => {
		if(box.type === 'checkbox') {
			box.checked = true
		}
	})
})


//send button click event
send.addEventListener('click', ()=> { 

	//selecting the article highlight
	const article = document.querySelector('.article')
	
	//loading animation and list hiding
	send.setAttribute('aria-busy', 'true')
	article.setAttribute('aria-busy', 'true')
	field.style.display = 'none'

	//selecting all the checkboxes
	const checkboxes = document.querySelectorAll('input')
	
	checkboxes.forEach(box => {
		
		if(box.type === 'checkbox') {
			if (box.checked) {
				absentee += `*${box.value}* \n`
			}
		}
	})

	//clearing animations
	send.setAttribute('aria-busy', 'flse')
	article.setAttribute('aria-busy', 'flse')
	field.style.display = 'block'
	
	//seding msg........
	//whatsApp msg string
	const dt = new Date()
	const msgTitle = `_${dt.getDate()}/${dt.getMonth()}/${dt.getFullYear()}_ \n::_*Absentee List*_::\n\n`
	const msgFooter = `\n\`\`\`taken at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })}\`\`\` `

	//calling whatsapp api
	const linkSource = `whatsapp://send?text=${encodeURI(msgTitle+absentee+msgFooter)}`
	const link = document.createElement('a')
	link.setAttribute('data-action', 'share/whatsapp/share')
	link.setAttribute('target', '_blank')

	link.href = linkSource
	link.click()
	
	//clearing selection after sending
	clear.click()
})



Init()