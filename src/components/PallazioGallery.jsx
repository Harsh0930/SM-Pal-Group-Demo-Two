import ProjectGallery from './ProjectGallery.jsx';
import { pallazioGallery } from '../data/pallazioContent.js';

export default function PallazioGallery() {
  return <ProjectGallery images={pallazioGallery} project="Pallazio" imageNote="Architectural visualisation" />;
}
