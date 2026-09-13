import test from 'node:test';
import assert from 'node:assert/strict';
import { naturalFrequency, response, scalingRatio, residualWithThreshold, targetParams, cost, improve, initialParams, toyRadius } from '../src/lib/models.ts';
test('oscillator responds to stiffness, inertia and damping in the expected directions',()=>{
 assert.equal(naturalFrequency(4,1),2);assert.equal(naturalFrequency(1,4),.5);
 assert.ok(response(1,.1)>response(1,.3));assert.equal(response(0,.1),1);
});
test('RSM scaling preserves squared radius and frequency dependence',()=>{
 assert.ok(Math.abs(scalingRatio(1,1.1)-1.21)<1e-12);assert.equal(scalingRatio(2,1),4);assert.equal(scalingRatio(1,1),1);
});
test('uncertainty gate zeroes only residuals strictly below threshold',()=>{
 assert.equal(residualWithThreshold(.19,.2),0);assert.equal(residualWithThreshold(-.19,.2),0);
 assert.equal(residualWithThreshold(.21,.2),.21);assert.equal(residualWithThreshold(.2,.2),.2);
});
test('synthetic generating parameters fit observations exactly',()=>assert.equal(cost(targetParams,0,true).total,0));
test('toy search decreases cost without nonfinite values',()=>{
 let p={...initialParams};const first=cost(p,0,true).total;
 for(let i=0;i<30;i++){const before=cost(p,0,true).total;p=improve(p,0,true,i);assert.ok(cost(p,0,true).total<=before);assert.ok(Object.values(p).every(Number.isFinite));}
 assert.ok(cost(p,0,true).total<first/10);
});
test('regularization exposes implausible parameters even with matching residual threshold',()=>{
 const bad={...targetParams,pd:160};assert.ok(cost(bad,.2,true).penalty>0);assert.equal(cost(bad,.2,false).penalty,0);
 assert.ok(toyRadius(targetParams,5,true)>toyRadius(targetParams,5,false));
});
test('perfect-fit preset demonstrates nonidentifiability, not a fake mismatch',()=>{
 const r0=targetParams.r0*(1+targetParams.pd/700)/(1+160/700);
 const alternate={...targetParams,pd:160,r0,pulse:targetParams.pulse*targetParams.r0/r0};
 assert.ok(cost(alternate,0,false).data<1e-25);assert.ok(cost(alternate,0,true).penalty>0);
});
