import assert from 'node:assert/strict';
import {reportingContext,reportingNote} from '../app/anatomy.ts';

const expected = [
 'Brain','Heart','Liver','Gallbladder','Spleen','Pancreas','Right kidney','Left adrenal gland',
 'Aorta','Inferior vena cava','Portal and splenic veins','Right upper lobe','Trachea',
 'Third lumbar vertebra (L3)','Left seventh rib','Urinary bladder',
];
for(const name of expected){
 const context=reportingContext(name);
 assert.ok(context,`${name}: no reporting context`);
 assert.ok(context.landmarks.length>=3,`${name}: too few landmarks`);
 assert.ok(context.variants.length>=2,`${name}: too few variants`);
 assert.ok(context.focus.length>=3,`${name}: too few reporting-focus items`);
 const note=reportingNote(name);
 assert.match(note,/Clinical landmarks/);
 assert.match(note,/Variants to recognize/);
 assert.match(note,/Reporting focus/);
}
assert.equal(reportingContext('Left kidney'),reportingContext('Right kidney'),'paired kidneys should share reporting guidance');
assert.equal(reportingContext('Left upper lobe'),reportingContext('Right lower lobe'),'lung lobes should share reporting guidance');
assert.equal(reportingNote('Unknown structure'),'','unknown structures should keep the existing system explanation only');
console.log(`${expected.length} reporting contexts validated.`);
