import { generalEnquiry } from '../utils/whatsapp.js'
import Icon from './Icons.jsx'

export default function FloatingWhatsApp() {
  return (
    <a className="wa-fab" href={generalEnquiry()} target="_blank" rel="noopener noreferrer" aria-label="Enquire on WhatsApp">
      <Icon name="whatsapp" size={28} />
      
    </a>
  )
}
