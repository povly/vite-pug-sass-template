// Index page JavaScript

document.addEventListener('DOMContentLoaded', function() {
  console.log('Index page script loaded')

  // Animate feature cards on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = 'translateY(0)'
      }
    })
  }, observerOptions)

  // Observe feature cards
  const featureCards = document.querySelectorAll('.features__card')
  featureCards.forEach((card, index) => {
    // Initial state
    card.style.opacity = '0'
    card.style.transform = 'translateY(30px)'
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`

    observer.observe(card)
  })

  // Hero title animation
  const heroTitle = document.querySelector('.hero__title')
  if (heroTitle) {
    heroTitle.style.opacity = '0'
    heroTitle.style.transform = 'translateY(20px)'

    setTimeout(() => {
      heroTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease'
      heroTitle.style.opacity = '1'
      heroTitle.style.transform = 'translateY(0)'
    }, 200)
  }

  // Typing effect for subtitle
  const subtitle = document.querySelector('.hero__subtitle')
  if (subtitle) {
    const text = subtitle.textContent
    subtitle.textContent = ''
    subtitle.style.opacity = '1'

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        subtitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      }
    }

    setTimeout(typeWriter, 1000)
  }

  // Interactive features demo
  const demoButton = document.querySelector('.demo-button')
  if (demoButton) {
    demoButton.addEventListener('click', function() {
      // Example of using global utilities
      const showMessage = window.utils.debounce(function() {
        alert('Демо функциональность работает!')
      }, 300)

      showMessage()
    })
  }
})
