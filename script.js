let events
const isTouchDevice = 'ontouchstart' in document.documentElement;

function getEvents(eventData)
{
    const EventContainer = document.querySelector('.eventcontainer')
    events = eventData['events']

    for(let i = 0; i < events.length; ++i)
    {
        let current = events[i]
        EventContainer.innerHTML += `
            <div class="capsule">
                <div class="eventimage" data-info="${current.info}">
                    <img src="${current.image}" alt="">
                </div>
                <div class="elements">
                    <h2> ${current.name} </h2>
                </div>
                <div class="buttons">
                    <div class="info" onclick="buttonPressed(${i})"> More Info </div>
                    <a href="${current.apply}"> <div class="apply"> Apply </div> </a>
                </div>
            </div>   
        `
    }
}

function buttonPressed(id)
{
    let eventInfo = document.querySelector('.eventinfo')
    eventInfo.dataset.active = true

    let innertable = ''

    let current = events[id]
    console.log(current)
    let properties = current.properties
    console.log(current)
    console.log(properties)
    Object.keys(properties).forEach( (k) => {
        let v = properties[k]
        innertable += `
            <tr>
                <th> ${k} </th>
                <td> ${v} </td>
            </tr>
        `
    } )

    eventInfo.innerHTML = `
        <div class="innerinfo">
            <button onclick="backButton()">Back</button>
            <h2> ${current.name} </h2>
            <div class="tableinfo">
                <table>
                    ${innertable}
                </table>
                <div class="spacing" style="height: 100px;"></div>
            </div>
            <div class="bottom">
                <a href="${current.apply}"> Apply </a>
            </div>
        </div>
    `
}

function backButton()
{
    let eventInfo = document.querySelector('.eventinfo')
    eventInfo.dataset.active = false
}

function setPositions()
{
    if(scrollY < 900){
        const seperator = document.querySelector('.seperator')
        const foreground = document.querySelector('.seperator .foreground')
        const titles = document.querySelectorAll('.title h1')
        const subtitles = document.querySelectorAll('.title h3')
        let top = (window.innerHeight - seperator.clientHeight) / 2 + scrollY
        let left = (window.innerWidth - seperator.clientWidth + scrollY) / 2
        seperator.style.setProperty('--position-top', `${top}px`)
        seperator.style.setProperty('--position-left', `${left}px`)
        foreground.style.setProperty('--position-top', `${-top}px`)
        foreground.style.setProperty('--position-left', `${-left}px`)
        titles[0].style.top = `${scrollY * 0.85}px`
        titles[1].style.top = `${scrollY * 0.85}px`
        subtitles[0].style.top = `${scrollY * 1.2}px`
        subtitles[1].style.top = `${scrollY * 1.2}px`
        subtitles[0].style.left = `${scrollY * -0.2}px`
        subtitles[1].style.left = `${scrollY * -0.2}px`
    }
}

function setupTitle()
{
    const background = document.querySelector('.background')
    const foreground = document.querySelector('.foreground')
    foreground.innerHTML = background.innerHTML
}

function slideshow()
{
    const slidebox = document.querySelector('.slidebox')
    let children = slidebox.children
    slidebox.dataset.activeIndex ++
    let index = slidebox.dataset.activeIndex
    index %= children.length
    children[index].dataset.active = true
    for(let i = 0; i < children.length; ++i)
    {
        if (i == index)
            continue
        children[i].dataset.active = false
    }
}

function scrollEvent(event) 
{
    eventback.style.opacity = scrollY/500 - 0.2 - 200/500
    eventlist.style.opacity = scrollY/500 - 0.2 - 200/500

    if (isTouchDevice) return

    setPositions()
}

var eventback = document.querySelector('.eventback')
var eventlist = document.querySelector('.eventlist')

slideshow()
setInterval(slideshow, 5000)
setupTitle()
scrollEvent(null)
setPositions()
window.addEventListener('scroll', scrollEvent)
window.addEventListener('resize', setPositions)

fetch("/assets/templateevents.json").then(e => e.json()).then(getEvents)
