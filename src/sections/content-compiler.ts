import { aboutSection } from './about-me.section';
import { portfolioSection } from './portfolio.section';
//import {out} from './cv.section'
import { contact } from './contact.section';
import { state } from '../util/primitives/store';
import { resumeSection } from './resume.section';

state.update({pageOutline: [aboutSection, portfolioSection,resumeSection,  contact]})

