import { foundations } from './foundations';
import { rsm } from './rsm';
import { thesis } from './thesis';
import { bridge } from './bridge';
export const lessons = [...foundations,...rsm,...thesis,...bridge];
export const groups = [
{id:'foundations',name:'Foundations',description:'The eight ideas everything else builds on.',icon:'layers'},
{id:'rsm',name:'RSM paper',description:'Pressure, tension, and a resonant response.',icon:'activity'},
{id:'thesis',name:'Jaffe thesis',description:'From a force sweep to an inverse finite element model.',icon:'book'},
{id:'comsol',name:'COMSOL bridge',description:'Know what each part of a model is asking.',icon:'box'},
{id:'connect',name:'Connect the papers',description:'Different perturbations, a shared inverse question.',icon:'link'}
];
export const studyLinks = [
{title:'COMSOL · Prestressed analyses',url:'https://doc.comsol.com/6.3/doc/com.comsol.help.comsol/comsol_ref_solver.36.082.html',description:'Supplemental background for stationary → prestressed vibration study sequencing.'},
{title:'COMSOL · Frequency-domain analysis basics',url:'https://www.comsol.com/support/learning-center/article/basics-of-frequency-domain-analysis-in-structural-mechanics-123882',description:'Supplemental background on harmonic excitation, damping, and response.'}
];
