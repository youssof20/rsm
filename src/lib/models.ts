/** Teaching models only. No FEM, physiological calibration, or patient prediction. */
export const naturalFrequency = (stiffness:number,mass:number) => Math.sqrt(stiffness/mass);
export const response = (ratio:number,damping:number) => 1/Math.sqrt((1-ratio*ratio)**2+(2*damping*ratio)**2);
export const scalingRatio = (radiusRatio:number,frequencyRatio:number) => radiusRatio**2*frequencyRatio**2;
export const residualWithThreshold = (value:number,threshold:number) => Math.abs(value)<threshold ? 0 : value;
export type Params = {pd:number;pulse:number;e0:number;alpha:number;r0:number};
export const targetParams:Params = {pd:80,pulse:38,e0:45,alpha:3.3,r0:3};
export const initialParams:Params = {pd:67,pulse:31,e0:20,alpha:3,r0:3.2};
export const paramInfo:{key:keyof Params;label:string;unit:string;min:number;max:number;step:number;scale:number;bounds:[number,number]}[] = [
{key:'pd',label:'Diastolic pressure',unit:'mmHg',min:30,max:160,step:1,scale:8,bounds:[56,94]},
{key:'pulse',label:'Pulse pressure',unit:'mmHg',min:5,max:90,step:1,scale:5,bounds:[18,44]},
{key:'e0',label:'Base wall modulus E₀',unit:'kPa',min:5,max:220,step:1,scale:12,bounds:[15,180]},
{key:'alpha',label:'Stiffening coefficient α',unit:'',min:1,max:6,step:.1,scale:.35,bounds:[2.5,4.5]},
{key:'r0',label:'Unperturbed radius r₀',unit:'mm',min:1.5,max:5,step:.05,scale:.15,bounds:[2.5,3.5]}];
// Arbitrary smooth relation chosen to show coupled parameter effects, not the thesis law.
export function toyRadius(p:Params,force:number,systole:boolean):number {
 const pressure=p.pd+(systole?p.pulse:0);
 return p.r0*(1+pressure/700)/(1+force/(.32*p.e0*Math.exp(p.alpha*force/45)));
}
export const observations = Array.from({length:12},(_,i)=>({force:i*1.25,diastole:toyRadius(targetParams,i*1.25,false),systole:toyRadius(targetParams,i*1.25,true)}));
export function cost(p:Params,threshold:number,regularize:boolean) {
 const data=observations.reduce((sum,o)=>sum+residualWithThreshold(toyRadius(p,o.force,false)-o.diastole,threshold)**2+residualWithThreshold(toyRadius(p,o.force,true)-o.systole,threshold)**2,0);
 const penalty=regularize?paramInfo.reduce((sum,x)=>{const v=p[x.key];const d=v<x.bounds[0]?x.bounds[0]-v:v>x.bounds[1]?v-x.bounds[1]:0;return sum+(d/(x.bounds[1]-x.bounds[0]))**2;},0):0;
 return {data,penalty,total:data+penalty};
}
/** One transparent coordinate-search pass; deliberately NOT Nelder–Mead. */
export function improve(p:Params,threshold:number,regularize:boolean,iteration:number):Params {
 let best={...p};let score=cost(best,threshold,regularize).total;
 for(const x of paramInfo) for(const sign of [-1,1]) {
  const candidate={...best,[x.key]:Math.max(x.min,Math.min(x.max,best[x.key]+sign*x.scale/(1+iteration/8)))};
  const candidateScore=cost(candidate,threshold,regularize).total;
  if(candidateScore<score){best=candidate;score=candidateScore;}
 }
 return best;
}
