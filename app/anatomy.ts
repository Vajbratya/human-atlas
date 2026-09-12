import type {PlaneId} from './slice';
export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'Skeleton',color:'#e2d9ba',description:'Bones form the supporting framework of the body, protect organs, and provide attachment points for muscles. Their internal tissue also stores minerals and produces blood cells.'},
 {id:'muscular',name:'Muscles',color:'#a85b50',description:'Skeletal muscles generate movement by pulling on their attachments. Together with tendons, they move joints, stabilize posture, and produce heat.'},
 {id:'cardiac',name:'Heart',color:'#b96760',description:'The heart is a muscular pump with four chambers. Its valves direct blood forward through the pulmonary and systemic circuits.'},
 {id:'sensory',name:'Sensory organs',color:'#b0c8ce',description:'These structures contribute to special senses, including sight, hearing, and balance. Their specialized tissues detect stimuli and work with the nervous system to convey information.'},
 {id:'arterial',name:'Arteries',color:'#c05245',description:'The heart drives blood through the circulation. Arteries carry blood away from the heart to supply tissues or, in the pulmonary circuit, to the lungs.'},
 {id:'venous',name:'Veins',color:'#527c9f',description:'Veins return blood toward the heart. Superficial and deep networks collect blood from the tissues; the pulmonary veins bring oxygenated blood back from the lungs.'},
 {id:'nervous',name:'Nervous system',color:'#d8b565',description:'The brain, spinal cord, and peripheral nerves carry and process signals. They support sensation, movement, coordination, and automatic regulation of body functions.'},
 {id:'respiratory',name:'Respiratory',color:'#b98991',description:'The airways conduct air to the lungs, where oxygen and carbon dioxide move between air and blood. Breathing depends on pressure changes produced by respiratory muscles.'},
 {id:'digestive',name:'Digestive',color:'#b8916b',description:'The digestive tract breaks down food, absorbs nutrients and water, and moves waste onward. Accessory organs contribute bile and digestive enzymes.'},
 {id:'urinary',name:'Urinary',color:'#b47961',description:'The kidneys filter blood and regulate fluid, electrolyte, and acid–base balance. Urine travels through the ureters to the bladder and exits through the urethra.'},
 {id:'lymphatic',name:'Lymphatic',color:'#879f7c',description:'Lymphatic vessels return excess tissue fluid to the circulation. Lymph nodes and other lymphoid organs support immune surveillance and responses.'},
 {id:'endocrine',name:'Endocrine',color:'#c5a09a',description:'Endocrine organs release hormones into the blood to coordinate processes such as metabolism, growth, stress responses, and reproduction.'},
 {id:'reproductive',name:'Reproductive',color:'#bda098',description:'The male reproductive structures represented here contribute to sperm production, maturation, transport, and the production of sex hormones.'},
 {id:'integumentary',name:'Body surface',color:'#ba9b7d',description:'The body surface provides an outer anatomical reference. The integumentary system forms a protective barrier and contributes to sensation and temperature regulation.'},
 {id:'connective',name:'Connective tissue',color:'#aec3bb',description:'Cartilage, ligaments, and other connective tissues support, connect, and separate structures. Their roles include stabilizing joints and distributing mechanical loads.'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export type ViewMode = 'anatomy'|'radiograph'|'ct'|'us';
/** `level` and `window` window the radiograph, in attenuation units. `slice` is an index into the
 *  loaded study along the current plane's axis. CT windows come from a named preset in Hounsfield
 *  units. `study` names which magnetic resonance acquisition to show, since a sequence there means
 *  a different study rather than a different way of displaying one. `highlight` names the structure
 *  currently selected, so a section can tint it where the study has a label of the same name. */
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number;
 mode:ViewMode;level:number;window:number;plane:PlaneId;slice:number;ctWindow:string;study:string;highlight:string;labels:boolean}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'A muscular pump in the chest. Its right side sends blood to the lungs; its left side sends blood through the systemic circulation.',
 'liver':'A large organ beneath the right side of the diaphragm. It processes absorbed nutrients, produces bile, and synthesizes many proteins carried in the blood.',
 'brain':'The central organ of the nervous system. Its interconnected regions support perception, movement, memory, language, and the regulation of bodily functions.',
 'stomach':'A muscular chamber between the esophagus and small intestine. It stores and mixes food with acid and enzymes before releasing it into the duodenum.',
 'spleen':'A lymphoid organ in the upper left abdomen. It filters blood, removes aging blood cells, and participates in immune responses.',
 'pancreas':'An abdominal organ with digestive and endocrine roles. It supplies enzymes to the small intestine and releases hormones including insulin and glucagon.',
 'urinary bladder':'A muscular reservoir in the pelvis that stores urine arriving from the kidneys through the ureters.',
 'trachea':'The main airway connecting the larynx to the bronchi. Its cartilage supports keep the airway open during breathing.',
 'diaphragm':'A broad muscle separating the chest and abdomen. When it contracts, it increases chest volume and helps draw air into the lungs.',
};

/** Compact educational context for reading named anatomy on CT. It adds no diagnostic thresholds or management rules. */
export interface ReportingContext {landmarks:string[];variants:string[];focus:string[]}
const REPORTING_CONTEXT:Record<string,ReportingContext> = {
 brain:{
  landmarks:['cerebral hemispheres and falx','ventricular system and basal ganglia','posterior fossa and basal cisterns'],
  variants:['cavum septi pellucidi or cavum vergae','developmental ventricular asymmetry'],
  focus:['side and compartment','mass effect and ventricular configuration','relationship to the skull base or posterior fossa when relevant'],
 },
 heart:{
  landmarks:['four chambers','atrioventricular grooves','aortic root, pulmonary trunk, and caval inflow'],
  variants:['persistent left superior vena cava may alter venous anatomy','right-sided aortic arch changes the expected great-vessel relationship'],
  focus:['which chamber or great vessel is involved','pericardial relationship','adjacent coronary or mediastinal anatomy when visible'],
 },
 liver:{
  landmarks:['portal veins, hepatic veins, and inferior vena cava','falciform ligament and porta hepatis','right and left lobar anatomy with Couinaud segmental orientation'],
  variants:['Riedel lobe','accessory hepatic fissures or lobulation'],
  focus:['lobe or segment','relationship to portal and hepatic veins','biliary or capsular relationship when relevant'],
 },
 gallbladder:{
  landmarks:['fundus, body, and neck','gallbladder fossa on the inferior liver surface','expected course toward the cystic duct'],
  variants:['Phrygian-cap fold','folded or partially intrahepatic configuration'],
  focus:['anatomic portion involved','relationship to the liver and bile ducts','wall and surrounding fat on cross-sectional imaging'],
 },
 spleen:{
  landmarks:['splenic hilum','left hemidiaphragm and splenic flexure','pancreatic tail and left kidney'],
  variants:['accessory spleen','persistent fetal lobulation'],
  focus:['location within the spleen','hilar or capsular relationship','relationship to pancreatic tail and left kidney'],
 },
 pancreas:{
  landmarks:['head, uncinate process, neck, body, and tail','superior mesenteric vessels behind the neck and uncinate region','splenic vein along the posterior body and tail'],
  variants:['pancreas divisum','annular pancreas'],
  focus:['pancreatic portion','main duct and biliary relationship','relationship to mesenteric or splenic vessels'],
 },
 kidney:{
  landmarks:['upper and lower poles with renal sinus','renal hilum and vessels','collecting system and ureteropelvic junction'],
  variants:['duplicated collecting system','horseshoe kidney','persistent fetal lobulation'],
  focus:['side and pole','cortical, sinus, or collecting-system location','relationship to the hilum and renal vessels'],
 },
 adrenal:{
  landmarks:['body with medial and lateral limbs','diaphragmatic crura posteriorly','right adrenal next to the inferior vena cava and left adrenal beside the aorta'],
  variants:['shape and limb prominence vary normally','accessory adrenal tissue may occur along the embryologic gonadal descent pathway'],
  focus:['side and adrenal limb or body','relationship to kidney, crus, and major vessels','whether a finding is centered in the gland'],
 },
 aorta:{
  landmarks:['ascending aorta, arch, and descending thoracic aorta','diaphragmatic hiatus and abdominal aorta','celiac, superior mesenteric, renal, and iliac branch levels'],
  variants:['common origin of the brachiocephalic and left common carotid arteries','left vertebral artery arising directly from the arch'],
  focus:['anatomic segment','branch-vessel relationship','adjacent mediastinal or retroperitoneal structures'],
 },
 'inferior vena cava':{
  landmarks:['infrarenal and suprarenal segments','renal vein confluence','hepatic segment entering the right atrium'],
  variants:['duplicated inferior vena cava','left-sided inferior vena cava','azygos continuation'],
  focus:['segment and side','renal and hepatic venous relationship','relationship to the aorta and retroperitoneum'],
 },
 portal:{
  landmarks:['splenic vein and superior mesenteric vein confluence','main portal vein at the porta hepatis','right and left intrahepatic portal branches'],
  variants:['early branching or trifurcation of the main portal vein','variant confluence with the inferior mesenteric vein'],
  focus:['main, right, or left portal distribution','relationship to the biliary tree and hepatic artery','splenic and mesenteric venous confluence'],
 },
 lung:{
  landmarks:['lobar fissures','main and lobar bronchi','hilar pulmonary arteries and veins'],
  variants:['azygos lobe','accessory or incomplete fissures'],
  focus:['side, lobe, and segment when possible','pleural or fissural relationship','hilar and bronchovascular relationship'],
 },
 trachea:{
  landmarks:['cervical and intrathoracic trachea','carina','right and left main bronchi'],
  variants:['tracheal bronchus','accessory cardiac bronchus'],
  focus:['level relative to the thoracic inlet and carina','relationship to esophagus and mediastinal vessels','main-bronchus extension when relevant'],
 },
 vertebra:{
  landmarks:['vertebral body and endplates','pedicles, laminae, facets, and spinous process','spinal canal and neural foramina'],
  variants:['lumbosacral transitional vertebra','cervical rib or rudimentary rib','developmental segmentation anomalies'],
  focus:['exact vertebral level','body versus posterior-element location','spinal canal or neural-foraminal relationship'],
 },
 rib:{
  landmarks:['posterior costovertebral articulation','rib angle and shaft','anterior costochondral junction'],
  variants:['cervical rib','bifid rib','rudimentary or absent twelfth rib'],
  focus:['side and rib number','anterior, lateral, or posterior arc','relationship to pleura and adjacent vertebra'],
 },
 'urinary bladder':{
  landmarks:['dome, body, base, and trigone','ureterovesical junctions','relationship to prostate or pelvic reproductive organs'],
  variants:['urachal remnant at the dome','variable contour with degree of distension'],
  focus:['wall region or intraluminal location','relationship to ureteric orifices and pelvic organs','degree of distension when it changes interpretation'],
 },
};

const REPORTING_FAMILIES:[RegExp,string][] = [
 [/^(left|right) kidney$/,'kidney'],
 [/^(left|right) adrenal gland$/,'adrenal'],
 [/^.*lung$|^.* lobe$/,'lung'],
 [/^.*vertebra( \([ctls]\d+\))?$/i,'vertebra'],
 [/^.* rib$/,'rib'],
 [/^portal and splenic veins$/,'portal'],
];

function reportingKey(name:string){
 const key=name.toLowerCase();
 if(REPORTING_CONTEXT[key])return key;
 return REPORTING_FAMILIES.find(([pattern])=>pattern.test(key))?.[1] ?? '';
}

export function reportingContext(name:string):ReportingContext|null{
 const key=reportingKey(name);
 return key?REPORTING_CONTEXT[key]??null:null;
}

export function reportingNote(name:string){
 const context=reportingContext(name);
 if(!context)return '';
 return [
  `Clinical landmarks — ${context.landmarks.join('; ')}.`,
  `Variants to recognize — ${context.variants.join('; ')}.`,
  `Reporting focus — ${context.focus.join('; ')}.`,
 ].join(' ');
}

export function explanation(name:string,system:SystemId){
 const base=EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';
 const reporting=reportingNote(name);
 return reporting?`${base} ${reporting}`:base;
}
