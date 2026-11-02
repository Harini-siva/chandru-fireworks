import { wa, generalEnquiry } from '../utils/whatsapp.js'
import Reveal from './Reveal.jsx'
import Icon from './Icons.jsx'

export default function Contact() {
  const send = (e) => {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    window.open(wa(`Hi, I am ${d.get('n')} (${d.get('p')}). ${d.get('m')}`), '_blank', 'noopener')
  }
  return (
    <section id="contact" className="section section--contact">
      <div className="container contact-grid">
        <Reveal className="contact-copy">
          <span className="eyebrow">Contact us</span>
          <h2 className="section-title">Questions? Ask us on WhatsApp</h2>
          <p className="section-lead">Tell us what you are looking for and we will get back to you with the details.</p>
          <a className="btn btn-wa btn-lg" href={generalEnquiry()} target="_blank" rel="noopener noreferrer">
            <Icon name="whatsapp" size={22} /> Enquire on WhatsApp
          </a>
        </Reveal>
        <Reveal delay={120}>
          <form className="contact-form" onSubmit={send}>
            <label>Your name<input name="n" placeholder="Your name" autoComplete="name" required /></label>
            <label>Phone number<input name="p" type="tel" inputMode="tel" placeholder="Phone number" autoComplete="tel" required /></label>
            <label>Message<textarea name="m" rows="4" placeholder="What would you like to know?" required /></label>
            <button className="btn btn-gold" type="submit"><Icon name="whatsapp" size={20} /> Send via WhatsApp</button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
