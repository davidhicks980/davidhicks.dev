import { html } from 'lit';
import { kineticsDataURI } from '../icons/kinetics.data-uri';
import { elderDrugDataURI } from '../icons/elder-drug.data-uri';
import { state } from '../util/primitives/store';
import { ContentModification } from '../components/content/content.component';

export const portfolioSection = {
  title: 'Portfolio',
  marker: '🎨',
 content: html`
      <style>
        #kinetics-card  {
          --panel--image:  url("${kineticsDataURI('#b5c0e8')}");
           
          --panel--image--size: 90%;
          --panel--icon--size: 105%
        }
        
        #elder-drug-card  {
          --panel--image:  url("${elderDrugDataURI('#b5c0e8')}");
          --panel--image--size: 80%;
          --panel--icon--size: 65%
        }
        
            details {
              border: 1px solid #aaa;
              border-radius: 4px;
              padding: .5em .5em 0;
              margin: 0.5em 0em;
            }

            summary {
              font-weight: bold;
              margin: -.5em -.5em 0;
              padding: .5em;
            }

            summary:hover{
              cursor:pointer;
            }
            
            details[open] {
              padding: .5em;
            }

            details[open] summary {
              border-bottom: 1px solid #aaa;
              margin-bottom: .5em;
            }
            hicks-expansion{
              --expand-card--header-font: var(--title-font);
              --expand-card--content-font: var(--body-font);

            }
            hicks-expansion h1{
                  font-size: 18pt;
    font-weight: 500;
            }
            hicks-expansion h2{
                  font-size: 16pt;
    font-weight: 500;
            }
            hicks-expansion p{
                  font-size: 12pt;
                  font-family: var(--body-font)
            }
      </style>
       
      <hicks-expansion id="kinetics-card">
          <span slot="header">Pharmacokinetics Components</span>
          <span slot="description">
            The pharmacokinetic web components project was developed to provide a customizable, portable, and interactive platform for pharmacy professors to demonstrate how changes in pharmacokinetic properties affect drug absorption and metabolism.
          </span>
          <img slot="icon"  src="./assets/icons/logo-lit.svg" alt="LitElement was used to create performant web components" title="LitElement">
          <img slot="icon"  src="./assets/icons/logo-rxjs.svg" alt="RxJS was used to handle user events" title="RxJS">
          <img slot="icon"  src="./assets/icons/logo-typescript.svg" alt="Typescript is my preferred superset of Javascript" title="Typescript">
          <img slot="icon"  src="./assets/icons/logo-rollup.svg" alt="Rollup was used for bundling each component" title="Rollup">
          <span slot="button-label">SEE DEMO</span>
          <div slot="content">
            <h1>Project Description</h1>
            <p>
              The pharmacokinetic web components project was created to supplement
              the UNC Eshelman School of Pharmacy's pharmacokinetics curriculum. A
              set of custom graphs had been created by a third-party vendor using canvas and Adobe Animate, but the graphs had errors, were undocumented, and each required a separate large bundle to function. I decided that to improve scalability and ease-of-implementation, web
              components could be used. The resulting web components generate charts and quizzes using a single object property, and render an interactive chart with a realtime equation and range-inputs.
            </p>

              <h2>Challenges</h2>
                <details>
                <summary>Multiple Dosing Equations </summary>
                Multiple dosing equations require a kinetic
                function to be run for each dose given to a (theoretical) patient. Alongside plot generation, this
                is computationally intensive when working with larger numbers. To reduce jankiness when interacting with the component, web workers were used to computation on a separate thread, which greatly improved performance on lower-end devices. You can see an earlier version without web workers <a href="https://davidhicks980.github.io">here</a>
              </details>
              <details>
              <summary>Ease of use</summary>
              The audience for these components were pharmacy professors. As such, I had to make sure that any setup was intuitive -- in other words, no LaTeX or MathML knowledge should be required to create a chart. MathJax could render ASCII, but was very slow. I decided on KaTeX, which meant I had to transform an ASCII input into LaTeX. Luckily, a library called <a href="https://github.com/christianp/asciimath2tex">ASCIIMath2Tex</a> made KaTeX easy to implement.
              </details>
            <plot-engine></plot-engine>
          </div>
        </hicks-expansion>
        <br />
        <hicks-expansion id="elder-drug-card">
          <span slot="header">Elder Drug</span>
          <span slot="description">
            <a href='https://www.elderdrug.com'>ElderDrug.com</a> is an Angular PWA that uses the RxNorm API to make it easier to screen medication lists for drugs on Beers Criteria. Beers Criteria is a list of medications to be used with caution in adults 65+. 
          </span>
          The Stack: 
          <img slot="icon"  src="./assets/icons/logo-angula.svg" title="Angular">
          <img slot="icon"  src="./assets/icons/logo-rxjs.svg" title="RxJS">
          <img slot="icon"  src="./assets/icons/logo-typescript.svg" title="Typescript">
          <img slot="icon"  src="./assets/icons/logo-sass.svg" title="Sass">
          <img slot="icon"  src="./assets/icons/logo-firebase.svg" title="Firebase">

          <span slot="button-label">LEARN MORE</span>

          <div slot="content">
            <h1>Project Description</h1>
            <p>
              Beers Criteria is distributed as a PDF containing nearly 300 separate entries spread across several pages. Traditionally, a student applying the criteria to a patient's medication list could dedicate a few minutes per drug screened, which can become daunting when screening dozens of medications per patient. Elder Drug was created to make working up patients easier. It adds a comprehensive search that permits multiple drugs in a single query. Elder Drug also allows searching brands and generics even for entries pertaining to an entire therapeutic category (e.g. searching 'Abilify' would return any entries pertaining to antipsychotics). </p>

              <h2>Challenges</h2>
            <details>
              <summary>Therapeutic Categories</summary>
              <p>Drug classes and therapeutic categories do not have uniform nomenclature. For example, zolpidem can be called a hypnotic, a Z-drug, a non-benzodiazepine sedative, or a Gaba-A Receptor Agonist. The consequences of this can be illustrated with amitriptyline: it is an antidepressant, but if I associated all antidepressants with the effects of Amitriptyline, relatively benign drugs like Sertraline would be categorized as anticholinergics. As a result, I had to find drug classes that accurately corresponded to each entry on Beers Criteria while also containing a queryable ID on RxNorm. To do so, I created a compound index using therapeutic categories and classes from both DailyMed and Veterans Affairs. </p>
            </details>
          <details>
             <summary>
              Database Structure
             </summary>
             A MySQL/NodeJS instance hosted on UNC's OpenShift service was initially used to host Elder Drug's database. However, the database was migrated to Firebase upon the realization that I'd eventually be graduating. If I were to host all entries on Firebase, my 20k queries/day free tier could be reached with relatively few users (with 20 drugs queried in a single session, it would take only 1000 users to hit my limit). Considering my database of brand and generic drug names contains around 1600 drugs that each correspond to one or many of the ~300 entries on Beers criteries, I came to the conclusion that it would make more sense to serve all entries with the user, and provide a single key-value index relating drug names and their respective entry numbers (i.e. [drugName]: [...entries] ). 
           </details>
          </div>
        </hicks-expansion>
         
        
        
        
    `
};
state.update({sectionAdditions: { position: 1, template: portfolioSection , change: ContentModification.INSERT}})