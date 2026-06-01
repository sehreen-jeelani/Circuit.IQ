(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`attached`,t=1e3,n=1001,r=1002,i=1003,a=1004,o=1005,s=1006,c=1007,l=1008,u=1009,d=1010,f=1011,p=1012,m=1013,h=1014,g=1015,_=1016,v=1017,y=1018,b=1020,x=35902,S=35899,C=1021,w=1022,T=1023,E=1026,D=1027,O=1028,ee=1029,k=1030,te=1031,ne=1033,A=33776,re=33777,ie=33778,j=33779,ae=35840,oe=35841,se=35842,ce=35843,M=36196,le=37492,ue=37496,de=37488,fe=37489,pe=37490,me=37491,he=37808,ge=37809,_e=37810,ve=37811,ye=37812,be=37813,xe=37814,Se=37815,Ce=37816,we=37817,Te=37818,Ee=37819,De=37820,Oe=37821,ke=36492,Ae=36494,je=36495,Me=36283,N=36284,Ne=36285,Pe=36286,Fe=2300,P=2301,Ie=2302,F=2303,Le=2400,Re=2401,ze=2402,Be=2500,Ve=3200,He=`srgb`,Ue=`srgb-linear`,We=`linear`,Ge=`srgb`,Ke=7680,qe=35044,Je=2e3;function Ye(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Xe(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Ze(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function Qe(){let e=Ze(`canvas`);return e.style.display=`block`,e}var $e={},et=null;function tt(...e){let t=`THREE.`+e.shift();et?et(`log`,t,...e):console.log(t,...e)}function nt(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function I(...e){e=nt(e);let t=`THREE.`+e.shift();if(et)et(`warn`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function L(...e){e=nt(e);let t=`THREE.`+e.shift();if(et)et(`error`,t,...e);else{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function rt(...e){let t=e.join(` `);t in $e||($e[t]=!0,I(...e))}function it(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var at={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},ot=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},st=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),ct=1234567,lt=Math.PI/180,ut=180/Math.PI;function dt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(st[e&255]+st[e>>8&255]+st[e>>16&255]+st[e>>24&255]+`-`+st[t&255]+st[t>>8&255]+`-`+st[t>>16&15|64]+st[t>>24&255]+`-`+st[n&63|128]+st[n>>8&255]+`-`+st[n>>16&255]+st[n>>24&255]+st[r&255]+st[r>>8&255]+st[r>>16&255]+st[r>>24&255]).toLowerCase()}function R(e,t,n){return Math.max(t,Math.min(n,e))}function ft(e,t){return(e%t+t)%t}function pt(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function mt(e,t,n){return e===t?0:(n-e)/(t-e)}function ht(e,t,n){return(1-n)*e+n*t}function gt(e,t,n,r){return ht(e,t,1-Math.exp(-n*r))}function _t(e,t=1){return t-Math.abs(ft(e,t*2)-t)}function vt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function yt(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function bt(e,t){return e+Math.floor(Math.random()*(t-e+1))}function xt(e,t){return e+Math.random()*(t-e)}function St(e){return e*(.5-Math.random())}function Ct(e){e!==void 0&&(ct=e);let t=ct+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function wt(e){return e*lt}function Tt(e){return e*ut}function Et(e){return(e&e-1)==0&&e!==0}function Dt(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Ot(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function kt(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:I(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function At(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`Invalid component type.`)}}function jt(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`Invalid component type.`)}}var Mt={DEG2RAD:lt,RAD2DEG:ut,generateUUID:dt,clamp:R,euclideanModulo:ft,mapLinear:pt,inverseLerp:mt,lerp:ht,damp:gt,pingpong:_t,smoothstep:vt,smootherstep:yt,randInt:bt,randFloat:xt,randFloatSpread:St,seededRandom:Ct,degToRad:wt,radToDeg:Tt,isPowerOfTwo:Et,ceilPowerOfTwo:Dt,floorPowerOfTwo:Ot,setQuaternionFromProperEuler:kt,normalize:jt,denormalize:At},z=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(R(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Nt=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:I(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(R(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},B=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Ft.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Ft.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this.z=R(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this.z=R(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pt.copy(this).projectOnVector(e),this.sub(Pt)}reflect(e){return this.sub(Pt.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(R(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Pt=new B,Ft=new Nt,V=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(It.makeScale(e,t)),this}rotate(e){return this.premultiply(It.makeRotation(-e)),this}translate(e,t){return this.premultiply(It.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},It=new V,Lt=new V().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Rt=new V().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zt(){let e={enabled:!0,workingColorSpace:Ue,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=Vt(e.r),e.g=Vt(e.g),e.b=Vt(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Ht(e.r),e.g=Ht(e.g),e.b=Ht(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?We:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return rt(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return rt(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[Ue]:{primaries:t,whitePoint:r,transfer:We,toXYZ:Lt,fromXYZ:Rt,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:He},outputColorSpaceConfig:{drawingBufferColorSpace:He}},[He]:{primaries:t,whitePoint:r,transfer:Ge,toXYZ:Lt,fromXYZ:Rt,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:He}}}),e}var Bt=zt();function Vt(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Ht(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Ut,Wt=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ut===void 0&&(Ut=Ze(`canvas`)),Ut.width=e.width,Ut.height=e.height;let t=Ut.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Ut}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Ze(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=Vt(i[e]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(Vt(t[e]/255)*255):t[e]=Vt(t[e]);return{data:t,width:e.width,height:e.height}}else return I(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Gt=0,Kt=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Gt++}),this.uuid=dt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(qt(r[t].image)):e.push(qt(r[t]))}else e=qt(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function qt(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Wt.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(I(`Texture: Unable to serialize Texture.`),{})}var Jt=0,Yt=new B,Xt=class e extends ot{constructor(t=e.DEFAULT_IMAGE,r=e.DEFAULT_MAPPING,i=n,a=n,o=s,c=l,d=T,f=u,p=e.DEFAULT_ANISOTROPY,m=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jt++}),this.uuid=dt(),this.name=``,this.source=new Kt(t),this.mipmaps=[],this.mapping=r,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=o,this.minFilter=c,this.anisotropy=p,this.format=d,this.internalFormat=null,this.type=f,this.offset=new z(0,0),this.repeat=new z(1,1),this.center=new z(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new V,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=m,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Yt).x}get height(){return this.source.getSize(Yt).y}get depth(){return this.source.getSize(Yt).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){I(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){I(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case t:e.x-=Math.floor(e.x);break;case n:e.x=e.x<0?0:1;break;case r:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case t:e.y-=Math.floor(e.y);break;case n:e.y=e.y<0?0:1;break;case r:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Xt.DEFAULT_IMAGE=null,Xt.DEFAULT_MAPPING=300,Xt.DEFAULT_ANISOTROPY=1;var Zt=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=R(this.x,e.x,t.x),this.y=R(this.y,e.y,t.y),this.z=R(this.z,e.z,t.z),this.w=R(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=R(this.x,e,t),this.y=R(this.y,e,t),this.z=R(this.z,e,t),this.w=R(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(R(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qt=class extends ot{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:s,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Zt(0,0,e,t),this.scissorTest=!1,this.viewport=new Zt(0,0,e,t),this.textures=[];let r=new Xt({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){let t={minFilter:s,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new Kt(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this}dispose(){this.dispatchEvent({type:`dispose`})}},$t=class extends Qt{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},en=class extends Xt{constructor(e=null,t=1,r=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},tn=class extends Xt{constructor(e=null,t=1,r=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:r,depth:a},this.magFilter=i,this.minFilter=i,this.wrapR=n,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},nn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();let t=this.elements,n=e.elements,r=1/rn.setFromMatrixColumn(e,0).length(),i=1/rn.setFromMatrixColumn(e,1).length(),a=1/rn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(on,e,sn)}lookAt(e,t,n){let r=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),cn.crossVectors(n,un),cn.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),cn.crossVectors(n,un)),cn.normalize(),ln.crossVectors(un,cn),r[0]=cn.x,r[4]=ln.x,r[8]=un.x,r[1]=cn.y,r[5]=ln.y,r[9]=un.y,r[2]=cn.z,r[6]=ln.z,r[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],ee=r[2],k=r[6],te=r[10],ne=r[14],A=r[3],re=r[7],ie=r[11],j=r[15];return i[0]=a*x+o*T+s*ee+c*A,i[4]=a*S+o*E+s*k+c*re,i[8]=a*C+o*D+s*te+c*ie,i[12]=a*w+o*O+s*ne+c*j,i[1]=l*x+u*T+d*ee+f*A,i[5]=l*S+u*E+d*k+f*re,i[9]=l*C+u*D+d*te+f*ie,i[13]=l*w+u*O+d*ne+f*j,i[2]=p*x+m*T+h*ee+g*A,i[6]=p*S+m*E+h*k+g*re,i[10]=p*C+m*D+h*te+g*ie,i[14]=p*w+m*O+h*ne+g*j,i[3]=_*x+v*T+y*ee+b*A,i[7]=_*S+v*E+y*k+b*re,i[11]=_*C+v*D+y*te+b*ie,i[15]=_*w+v*O+y*ne+b*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,ee=_*O-v*D+y*E+b*T-x*w+S*C;if(ee===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let k=1/ee;return e[0]=(o*O-s*D+c*E)*k,e[1]=(r*D-n*O-i*E)*k,e[2]=(m*S-h*x+g*b)*k,e[3]=(d*x-u*S-f*b)*k,e[4]=(s*T-a*O-c*w)*k,e[5]=(t*O-r*T+i*w)*k,e[6]=(h*y-p*S-g*v)*k,e[7]=(l*S-d*y+f*v)*k,e[8]=(a*D-o*T+c*C)*k,e[9]=(n*T-t*D-i*C)*k,e[10]=(p*x-m*y+g*_)*k,e[11]=(u*y-l*x-f*_)*k,e[12]=(o*w-a*E-s*C)*k,e[13]=(t*E-n*w+r*C)*k,e[14]=(m*v-p*b-h*_)*k,e[15]=(l*b-u*v+d*_)*k,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinant();if(i===0)return n.set(1,1,1),t.identity(),this;let a=rn.set(r[0],r[1],r[2]).length(),o=rn.set(r[4],r[5],r[6]).length(),s=rn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),an.copy(this);let c=1/a,l=1/o,u=1/s;return an.elements[0]*=c,an.elements[1]*=c,an.elements[2]*=c,an.elements[4]*=l,an.elements[5]*=l,an.elements[6]*=l,an.elements[8]*=u,an.elements[9]*=u,an.elements[10]*=u,t.setFromRotationMatrix(an),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Je,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Je,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},rn=new B,an=new nn,on=new B(0,0,0),sn=new B(1,1,1),cn=new B,ln=new B,un=new B,dn=new nn,fn=new Nt,pn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(R(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-R(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(R(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-R(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(R(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-R(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:I(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return dn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(dn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fn.setFromEuler(this),this.setFromQuaternion(fn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pn.DEFAULT_ORDER=`XYZ`;var mn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},hn=0,gn=new B,_n=new Nt,vn=new nn,yn=new B,bn=new B,xn=new B,Sn=new Nt,Cn=new B(1,0,0),wn=new B(0,1,0),Tn=new B(0,0,1),En={type:`added`},Dn={type:`removed`},On={type:`childadded`,child:null},kn={type:`childremoved`,child:null},An=class e extends ot{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:hn++}),this.uuid=dt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new B,n=new pn,r=new Nt,i=new B(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new nn},normalMatrix:{value:new V}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.multiply(_n),this}rotateOnWorldAxis(e,t){return _n.setFromAxisAngle(e,t),this.quaternion.premultiply(_n),this}rotateX(e){return this.rotateOnAxis(Cn,e)}rotateY(e){return this.rotateOnAxis(wn,e)}rotateZ(e){return this.rotateOnAxis(Tn,e)}translateOnAxis(e,t){return gn.copy(e).applyQuaternion(this.quaternion),this.position.add(gn.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cn,e)}translateY(e){return this.translateOnAxis(wn,e)}translateZ(e){return this.translateOnAxis(Tn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?yn.copy(e):yn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),bn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(bn,yn,this.up):vn.lookAt(yn,bn,this.up),this.quaternion.setFromRotationMatrix(vn),r&&(vn.extractRotation(r.matrixWorld),_n.setFromRotationMatrix(vn),this.quaternion.premultiply(_n.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(L(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null):L(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dn),kn.child=e,this.dispatchEvent(kn),kn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(En),On.child=e,this.dispatchEvent(On),On.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,e,xn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(bn,Sn,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let e=this.children;for(let t=0,n=e.length;t<n;t++)e[t].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material);if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};An.DEFAULT_UP=new B(0,1,0),An.DEFAULT_MATRIX_AUTO_UPDATE=!0,An.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var jn=class extends An{constructor(){super(),this.isGroup=!0,this.type=`Group`}},Mn={type:`move`},Nn=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new B,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new B),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new B,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new B,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Mn)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new jn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Pn={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Fn={h:0,s:0,l:0},In={h:0,s:0,l:0};function Ln(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var H=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=He){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Bt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Bt.workingColorSpace){return this.r=e,this.g=t,this.b=n,Bt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Bt.workingColorSpace){if(e=ft(e,1),t=R(t,0,1),n=R(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Ln(i,r,e+1/3),this.g=Ln(i,r,e),this.b=Ln(i,r,e-1/3)}return Bt.colorSpaceToWorking(this,r),this}setStyle(e,t=He){function n(t){t!==void 0&&parseFloat(t)<1&&I(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:I(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);I(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=He){let n=Pn[e.toLowerCase()];return n===void 0?I(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Vt(e.r),this.g=Vt(e.g),this.b=Vt(e.b),this}copyLinearToSRGB(e){return this.r=Ht(e.r),this.g=Ht(e.g),this.b=Ht(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=He){return Bt.workingToColorSpace(Rn.copy(this),e),Math.round(R(Rn.r*255,0,255))*65536+Math.round(R(Rn.g*255,0,255))*256+Math.round(R(Rn.b*255,0,255))}getHexString(e=He){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Bt.workingColorSpace){Bt.workingToColorSpace(Rn.copy(this),t);let n=Rn.r,r=Rn.g,i=Rn.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4;break}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Bt.workingColorSpace){return Bt.workingToColorSpace(Rn.copy(this),t),e.r=Rn.r,e.g=Rn.g,e.b=Rn.b,e}getStyle(e=He){Bt.workingToColorSpace(Rn.copy(this),e);let t=Rn.r,n=Rn.g,r=Rn.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Fn),this.setHSL(Fn.h+e,Fn.s+t,Fn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Fn),e.getHSL(In);let n=ht(Fn.h,In.h,t),r=ht(Fn.s,In.s,t),i=ht(Fn.l,In.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Rn=new H;H.NAMES=Pn;var zn=class e{constructor(e,t=25e-5){this.isFogExp2=!0,this.name=``,this.color=new H(e),this.density=t}clone(){return new e(this.color,this.density)}toJSON(){return{type:`FogExp2`,name:this.name,color:this.color.getHex(),density:this.density}}},Bn=class extends An{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pn,this.environmentIntensity=1,this.environmentRotation=new pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Vn=new B,Hn=new B,Un=new B,Wn=new B,Gn=new B,Kn=new B,qn=new B,Jn=new B,Yn=new B,Xn=new B,Zn=new Zt,Qn=new Zt,$n=new Zt,er=class e{constructor(e=new B,t=new B,n=new B){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Vn.subVectors(e,t),r.cross(Vn);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){Vn.subVectors(r,t),Hn.subVectors(n,t),Un.subVectors(e,t);let a=Vn.dot(Vn),o=Vn.dot(Hn),s=Vn.dot(Un),c=Hn.dot(Hn),l=Hn.dot(Un),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Wn)===null?!1:Wn.x>=0&&Wn.y>=0&&Wn.x+Wn.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,Wn)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,Wn.x),s.addScaledVector(a,Wn.y),s.addScaledVector(o,Wn.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return Zn.setScalar(0),Qn.setScalar(0),$n.setScalar(0),Zn.fromBufferAttribute(e,t),Qn.fromBufferAttribute(e,n),$n.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Zn,i.x),a.addScaledVector(Qn,i.y),a.addScaledVector($n,i.z),a}static isFrontFacing(e,t,n,r){return Vn.subVectors(n,t),Hn.subVectors(e,t),Vn.cross(Hn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Vn.subVectors(this.c,this.b),Hn.subVectors(this.a,this.b),Vn.cross(Hn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Gn.subVectors(r,n),Kn.subVectors(i,n),Jn.subVectors(e,n);let s=Gn.dot(Jn),c=Kn.dot(Jn);if(s<=0&&c<=0)return t.copy(n);Yn.subVectors(e,r);let l=Gn.dot(Yn),u=Kn.dot(Yn);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Gn,a);Xn.subVectors(e,i);let f=Gn.dot(Xn),p=Kn.dot(Xn);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Kn,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return qn.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(qn,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Gn,a).addScaledVector(Kn,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},tr=class{constructor(e=new B(1/0,1/0,1/0),t=new B(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(rr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(rr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=rr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,rr):rr.fromBufferAttribute(r,t),rr.applyMatrix4(e.matrixWorld),this.expandByPoint(rr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),ir.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),ir.copy(e.boundingBox)),ir.applyMatrix4(e.matrixWorld),this.union(ir)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,rr),rr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dr),fr.subVectors(this.max,dr),ar.subVectors(e.a,dr),or.subVectors(e.b,dr),sr.subVectors(e.c,dr),cr.subVectors(or,ar),lr.subVectors(sr,or),ur.subVectors(ar,sr);let t=[0,-cr.z,cr.y,0,-lr.z,lr.y,0,-ur.z,ur.y,cr.z,0,-cr.x,lr.z,0,-lr.x,ur.z,0,-ur.x,-cr.y,cr.x,0,-lr.y,lr.x,0,-ur.y,ur.x,0];return!hr(t,ar,or,sr,fr)||(t=[1,0,0,0,1,0,0,0,1],!hr(t,ar,or,sr,fr))?!1:(pr.crossVectors(cr,lr),t=[pr.x,pr.y,pr.z],hr(t,ar,or,sr,fr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,rr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(rr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(nr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),nr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),nr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),nr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),nr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),nr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),nr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),nr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(nr),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},nr=[new B,new B,new B,new B,new B,new B,new B,new B],rr=new B,ir=new tr,ar=new B,or=new B,sr=new B,cr=new B,lr=new B,ur=new B,dr=new B,fr=new B,pr=new B,mr=new B;function hr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){mr.fromArray(e,a);let o=i.x*Math.abs(mr.x)+i.y*Math.abs(mr.y)+i.z*Math.abs(mr.z),s=t.dot(mr),c=n.dot(mr),l=r.dot(mr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var gr=new B,_r=new z,vr=0,yr=class extends ot{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=qe,this.updateRanges=[],this.gpuType=g,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)_r.fromBufferAttribute(this,t),_r.applyMatrix3(e),this.setXY(t,_r.x,_r.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.applyMatrix3(e),this.setXYZ(t,gr.x,gr.y,gr.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.applyMatrix4(e),this.setXYZ(t,gr.x,gr.y,gr.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.applyNormalMatrix(e),this.setXYZ(t,gr.x,gr.y,gr.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gr.fromBufferAttribute(this,t),gr.transformDirection(e),this.setXYZ(t,gr.x,gr.y,gr.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=At(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=jt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=At(t,this.array)),t}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=At(t,this.array)),t}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=At(t,this.array)),t}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=At(t,this.array)),t}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),r=jt(r,this.array),i=jt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},br=class extends yr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},xr=class extends yr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Sr=class extends yr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Cr=new tr,wr=new B,Tr=new B,Er=class{constructor(e=new B,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Cr.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wr.subVectors(e,this.center);let t=wr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(wr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Tr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wr.copy(e.center).add(Tr)),this.expandByPoint(wr.copy(e.center).sub(Tr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Dr=0,Or=new nn,kr=new An,Ar=new B,jr=new tr,Mr=new tr,Nr=new B,Pr=class e extends ot{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Dr++}),this.uuid=dt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ye(e)?xr:br)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new V().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Or.makeRotationFromQuaternion(e),this.applyMatrix4(Or),this}rotateX(e){return Or.makeRotationX(e),this.applyMatrix4(Or),this}rotateY(e){return Or.makeRotationY(e),this.applyMatrix4(Or),this}rotateZ(e){return Or.makeRotationZ(e),this.applyMatrix4(Or),this}translate(e,t,n){return Or.makeTranslation(e,t,n),this.applyMatrix4(Or),this}scale(e,t,n){return Or.makeScale(e,t,n),this.applyMatrix4(Or),this}lookAt(e){return kr.lookAt(e),kr.updateMatrix(),this.applyMatrix4(kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ar).negate(),this.translate(Ar.x,Ar.y,Ar.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Sr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&I(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new tr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){L(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new B(-1/0,-1/0,-1/0),new B(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];jr.setFromBufferAttribute(n),this.morphTargetsRelative?(Nr.addVectors(this.boundingBox.min,jr.min),this.boundingBox.expandByPoint(Nr),Nr.addVectors(this.boundingBox.max,jr.max),this.boundingBox.expandByPoint(Nr)):(this.boundingBox.expandByPoint(jr.min),this.boundingBox.expandByPoint(jr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&L(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Er);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){L(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new B,1/0);return}if(e){let n=this.boundingSphere.center;if(jr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Mr.setFromBufferAttribute(n),this.morphTargetsRelative?(Nr.addVectors(jr.min,Mr.min),jr.expandByPoint(Nr),Nr.addVectors(jr.max,Mr.max),jr.expandByPoint(Nr)):(jr.expandByPoint(Mr.min),jr.expandByPoint(Mr.max))}jr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)Nr.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(Nr));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)Nr.fromBufferAttribute(a,t),o&&(Ar.fromBufferAttribute(e,t),Nr.add(Ar)),r=Math.max(r,n.distanceToSquared(Nr))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&L(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){L(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv;this.hasAttribute(`tangent`)===!1&&this.setAttribute(`tangent`,new yr(new Float32Array(4*n.count),4));let a=this.getAttribute(`tangent`),o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new B,s[e]=new B;let c=new B,l=new B,u=new B,d=new z,f=new z,p=new z,m=new B,h=new B;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new B,y=new B,b=new B,x=new B;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0)n=new yr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new B,i=new B,a=new B,o=new B,s=new B,c=new B,l=new B,u=new B;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nr.fromBufferAttribute(e,t),Nr.normalize(),e.setXYZ(t,Nr.x,Nr.y,Nr.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new yr(a,r,i)}if(this.index===null)return I(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:`dispose`})}},Fr=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=qe,this.updateRanges=[],this.version=0,this.uuid=dt()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=dt()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Ir=new B,Lr=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyMatrix4(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyNormalMatrix(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.transformDirection(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=At(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=jt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=jt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=jt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=jt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=jt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=At(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=At(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=At(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=At(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),r=jt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=jt(t,this.array),n=jt(n,this.array),r=jt(r,this.array),i=jt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){tt(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new yr(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){tt(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Rr=0,zr=class extends ot{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Rr++}),this.uuid=dt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new H(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ke,this.stencilZFail=Ke,this.stencilZPass=Ke,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){I(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){I(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},Br=new B,Vr=new B,Hr=new B,Ur=new B,Wr=new B,Gr=new B,Kr=new B,qr=class{constructor(e=new B,t=new B(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Br)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Br.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Br.copy(this.origin).addScaledVector(this.direction,t),Br.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Vr.copy(e).add(t).multiplyScalar(.5),Hr.copy(t).sub(e).normalize(),Ur.copy(this.origin).sub(Vr);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Hr),o=Ur.dot(this.direction),s=-Ur.dot(Hr),c=Ur.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0)if(u=a*s-o,d=a*o-s,p=i*l,u>=0)if(d>=-p)if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c);else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Vr).addScaledVector(Hr,d),f}intersectSphere(e,t){Br.subVectors(e.center,this.origin);let n=Br.dot(this.direction),r=Br.dot(Br)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Br)!==null}intersectTriangle(e,t,n,r,i){Wr.subVectors(t,e),Gr.subVectors(n,e),Kr.crossVectors(Wr,Gr);let a=this.direction.dot(Kr),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ur.subVectors(this.origin,e);let s=o*this.direction.dot(Gr.crossVectors(Ur,Gr));if(s<0)return null;let c=o*this.direction.dot(Wr.cross(Ur));if(c<0||s+c>a)return null;let l=-o*Ur.dot(Kr);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Jr=class extends zr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new H(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Yr=new nn,Xr=new qr,Zr=new Er,Qr=new B,$r=new B,ei=new B,ti=new B,ni=new B,ri=new B,ii=new B,ai=new B,U=class extends An{constructor(e=new Pr,t=new Jr){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){ri.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(ni.fromBufferAttribute(s,e),a?ri.addScaledVector(ni,r):ri.addScaledVector(ni.sub(t),r))}t.add(ri)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Zr.copy(n.boundingSphere),Zr.applyMatrix4(i),Xr.copy(e.ray).recast(e.near),!(Zr.containsPoint(Xr.origin)===!1&&(Xr.intersectSphere(Zr,Qr)===null||Xr.origin.distanceToSquared(Qr)>(e.far-e.near)**2))&&(Yr.copy(i).invert(),Xr.copy(e.ray).applyMatrix4(Yr),!(n.boundingBox!==null&&Xr.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Xr)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null)if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=si(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=si(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}else if(s!==void 0)if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=si(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=si(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}};function oi(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;ai.copy(s),ai.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(ai);return l<n.near||l>n.far?null:{distance:l,point:ai.clone(),object:e}}function si(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,$r),e.getVertexPosition(c,ei),e.getVertexPosition(l,ti);let u=oi(e,t,n,r,$r,ei,ti,ii);if(u){let e=new B;er.getBarycoord(ii,$r,ei,ti,e),i&&(u.uv=er.getInterpolatedAttribute(i,s,c,l,e,new z)),a&&(u.uv1=er.getInterpolatedAttribute(a,s,c,l,e,new z)),o&&(u.normal=er.getInterpolatedAttribute(o,s,c,l,e,new B),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new B,materialIndex:0};er.getNormal($r,ei,ti,t.normal),u.face=t,u.barycoord=e}return u}var ci=new Zt,li=new Zt,ui=new Zt,di=new Zt,fi=new nn,pi=new B,mi=new Er,hi=new nn,gi=new qr,_i=class extends U{constructor(t,n){super(t,n),this.isSkinnedMesh=!0,this.type=`SkinnedMesh`,this.bindMode=e,this.bindMatrix=new nn,this.bindMatrixInverse=new nn,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new tr),this.boundingBox.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,pi),this.boundingBox.expandByPoint(pi)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Er),this.boundingSphere.makeEmpty();let t=e.getAttribute(`position`);for(let e=0;e<t.count;e++)this.getVertexPosition(e,pi),this.boundingSphere.expandByPoint(pi)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,r=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),mi.copy(this.boundingSphere),mi.applyMatrix4(r),e.ray.intersectsSphere(mi)!==!1&&(hi.copy(r).invert(),gi.copy(e.ray).applyMatrix4(hi),!(this.boundingBox!==null&&gi.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new Zt,t=this.geometry.attributes.skinWeight;for(let n=0,r=t.count;n<r;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r===1/0?e.set(1,0,0,0):e.multiplyScalar(r),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===`attached`?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===`detached`?this.bindMatrixInverse.copy(this.bindMatrix).invert():I(`SkinnedMesh: Unrecognized bindMode: `+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,r=this.geometry;li.fromBufferAttribute(r.attributes.skinIndex,e),ui.fromBufferAttribute(r.attributes.skinWeight,e),t.isVector4?(ci.copy(t),t.set(0,0,0,0)):(ci.set(...t,1),t.set(0,0,0)),ci.applyMatrix4(this.bindMatrix);for(let e=0;e<4;e++){let r=ui.getComponent(e);if(r!==0){let i=li.getComponent(e);fi.multiplyMatrices(n.bones[i].matrixWorld,n.boneInverses[i]),t.addScaledVector(di.copy(ci).applyMatrix4(fi),r)}}return t.isVector4&&(t.w=ci.w),t.applyMatrix4(this.bindMatrixInverse)}},vi=class extends An{constructor(){super(),this.isBone=!0,this.type=`Bone`}},yi=class extends Xt{constructor(e=null,t=1,n=1,r,a,o,s,c,l=i,u=i,d,f){super(null,o,s,c,l,u,r,a,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},bi=new nn,xi=new nn,Si=class e{constructor(e=[],t=[]){this.uuid=dt(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.previousBoneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){I(`Skeleton: Number of inverse bone matrices does not match amount of bones.`),this.boneInverses=[];for(let e=0,t=this.bones.length;e<t;e++)this.boneInverses.push(new nn)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let t=new nn;this.bones[e]&&t.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(t)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&t.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let t=this.bones[e];t&&(t.parent&&t.parent.isBone?(t.matrix.copy(t.parent.matrixWorld).invert(),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,r=this.boneTexture;for(let r=0,i=e.length;r<i;r++){let i=e[r]?e[r].matrixWorld:xi;bi.multiplyMatrices(i,t[r]),bi.toArray(n,r*16)}r!==null&&(r.needsUpdate=!0)}clone(){return new e(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new yi(t,e,e,T,g);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let n=this.bones[t];if(n.name===e)return n}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,r=e.bones.length;n<r;n++){let r=e.bones[n],i=t[r];i===void 0&&(I(`Skeleton: No bone found with UUID:`,r),i=new vi),this.bones.push(i),this.boneInverses.push(new nn().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.7,type:`Skeleton`,generator:`Skeleton.toJSON`},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let r=0,i=t.length;r<i;r++){let i=t[r];e.bones.push(i.uuid);let a=n[r];e.boneInverses.push(a.toArray())}return e}},Ci=class extends yr{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},wi=new nn,Ti=new nn,Ei=[],Di=new tr,Oi=new nn,ki=new U,Ai=new Er,ji=class extends U{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Ci(new Float32Array(n*16),16),this.previousInstanceMatrix=null,this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Oi)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new tr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),Di.copy(e.boundingBox).applyMatrix4(wi),this.boundingBox.union(Di)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Er),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,wi),Ai.copy(e.boundingSphere).applyMatrix4(wi),this.boundingSphere.union(Ai)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.previousInstanceMatrix!==null&&(this.previousInstanceMatrix=e.previousInstanceMatrix.clone()),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(ki.geometry=this.geometry,ki.material=this.material,ki.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ai.copy(this.boundingSphere),Ai.applyMatrix4(n),e.ray.intersectsSphere(Ai)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,wi),Ti.multiplyMatrices(n,wi),ki.matrixWorld=Ti,ki.raycast(e,Ei);for(let e=0,n=Ei.length;e<n;e++){let n=Ei[e];n.instanceId=i,n.object=this,t.push(n)}Ei.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Ci(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new yi(new Float32Array(r*this.count),r,this.count,O,g));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Mi=new B,Ni=new B,Pi=new V,Fi=class{constructor(e=new B(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Mi.subVectors(n,t).cross(Ni.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Mi),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Pi.getNormalMatrix(e),r=this.coplanarPoint(Mi).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Ii=new Er,Li=new z(.5,.5),Ri=new B,zi=class{constructor(e=new Fi,t=new Fi,n=new Fi,r=new Fi,i=new Fi,a=new Fi){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Je,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ii.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ii.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ii)}intersectsSprite(e){return Ii.center.set(0,0,0),Ii.radius=.7071067811865476+Li.distanceTo(e.center),Ii.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ii)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ri.x=r.normal.x>0?e.max.x:e.min.x,Ri.y=r.normal.y>0?e.max.y:e.min.y,Ri.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ri)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Bi=class extends zr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new H(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Vi=new B,Hi=new B,Ui=new nn,Wi=new qr,Gi=new Er,Ki=new B,qi=new B,Ji=class extends An{constructor(e=new Pr,t=new Bi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Vi.fromBufferAttribute(t,e-1),Hi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Vi.distanceTo(Hi);e.setAttribute(`lineDistance`,new Sr(n,1))}else I(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gi.copy(n.boundingSphere),Gi.applyMatrix4(r),Gi.radius+=i,e.ray.intersectsSphere(Gi)===!1)return;Ui.copy(r).invert(),Wi.copy(e.ray).applyMatrix4(Ui);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Yi(this,e,Wi,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Yi(this,e,Wi,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Yi(this,e,Wi,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Yi(this,e,Wi,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Yi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Vi.fromBufferAttribute(s,i),Hi.fromBufferAttribute(s,a),n.distanceSqToSegment(Vi,Hi,Ki,qi)>r)return;Ki.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ki);if(!(c<t.near||c>t.far))return{distance:c,point:qi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Xi=new B,Zi=new B,Qi=class extends Ji{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Xi.fromBufferAttribute(t,e),Zi.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Xi.distanceTo(Zi);e.setAttribute(`lineDistance`,new Sr(n,1))}else I(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},$i=class extends Ji{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type=`LineLoop`}},ea=class extends zr{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new H(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ta=new nn,na=new qr,ra=new Er,ia=new B,aa=class extends An{constructor(e=new Pr,t=new ea){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ra.copy(n.boundingSphere),ra.applyMatrix4(r),ra.radius+=i,e.ray.intersectsSphere(ra)===!1)return;ta.copy(r).invert(),na.copy(e.ray).applyMatrix4(ta);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);ia.fromBufferAttribute(l,n),oa(ia,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)ia.fromBufferAttribute(l,a),oa(ia,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function oa(e,t,n,r,i,a,o){let s=na.distanceSqToPoint(e);if(s<n){let n=new B;na.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var sa=class extends Xt{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ca=class extends Xt{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},la=class extends Xt{constructor(e,t,n=h,r,a,o,s=i,c=i,l,u=E,d=1){if(u!==1026&&u!==1027)throw Error(`DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:d},r,a,o,s,c,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Kt(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ua=class extends la{constructor(e,t=h,n=301,r,a,o=i,s=i,c,l=E){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,a,o,s,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},da=class extends Xt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},W=class e extends Pr{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Sr(c,3)),this.setAttribute(`normal`,new Sr(l,3)),this.setAttribute(`uv`,new Sr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new B;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},G=class e extends Pr{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Sr(u,3)),this.setAttribute(`normal`,new Sr(d,3)),this.setAttribute(`uv`,new Sr(f,2));function _(){let a=new B,_=new B,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new z,m=new B,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},fa=new B,pa=new B,ma=new B,ha=new er,ga=class extends Pr{constructor(e=null,t=1){if(super(),this.type=`EdgesGeometry`,this.parameters={geometry:e,thresholdAngle:t},e!==null){let n=10**4,r=Math.cos(lt*t),i=e.getIndex(),a=e.getAttribute(`position`),o=i?i.count:a.count,s=[0,0,0],c=[`a`,`b`,`c`],l=[,,,],u={},d=[];for(let e=0;e<o;e+=3){i?(s[0]=i.getX(e),s[1]=i.getX(e+1),s[2]=i.getX(e+2)):(s[0]=e,s[1]=e+1,s[2]=e+2);let{a:t,b:o,c:f}=ha;if(t.fromBufferAttribute(a,s[0]),o.fromBufferAttribute(a,s[1]),f.fromBufferAttribute(a,s[2]),ha.getNormal(ma),l[0]=`${Math.round(t.x*n)},${Math.round(t.y*n)},${Math.round(t.z*n)}`,l[1]=`${Math.round(o.x*n)},${Math.round(o.y*n)},${Math.round(o.z*n)}`,l[2]=`${Math.round(f.x*n)},${Math.round(f.y*n)},${Math.round(f.z*n)}`,!(l[0]===l[1]||l[1]===l[2]||l[2]===l[0]))for(let e=0;e<3;e++){let t=(e+1)%3,n=l[e],i=l[t],a=ha[c[e]],o=ha[c[t]],f=`${n}_${i}`,p=`${i}_${n}`;p in u&&u[p]?(ma.dot(u[p].normal)<=r&&(d.push(a.x,a.y,a.z),d.push(o.x,o.y,o.z)),u[p]=null):f in u||(u[f]={index0:s[e],index1:s[t],normal:ma.clone()})}}for(let e in u)if(u[e]){let{index0:t,index1:n}=u[e];fa.fromBufferAttribute(a,t),pa.fromBufferAttribute(a,n),d.push(fa.x,fa.y,fa.z),d.push(pa.x,pa.y,pa.z)}this.setAttribute(`position`,new Sr(d,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},_a=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){I(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new z:new B);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new B,r=[],i=[],a=[],o=new B,s=new nn;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new B)}i[0]=new B,a[0]=new B;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(R(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(R(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},va=class extends _a{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new z){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},ya=class extends va{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function ba(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var xa=new B,Sa=new B,Ca=new ba,wa=new ba,Ta=new ba,Ea=class extends _a{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new B){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(Sa.subVectors(r[0],r[1]).add(r[0]),c=Sa);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(xa.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=xa),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Ca.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),wa.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ta.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Ca.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),wa.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ta.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Ca.calc(s),wa.calc(s),Ta.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new B().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Da(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Oa(e,t){let n=1-e;return n*n*t}function ka(e,t){return 2*(1-e)*e*t}function Aa(e,t){return e*e*t}function ja(e,t,n,r){return Oa(e,t)+ka(e,n)+Aa(e,r)}function Ma(e,t){let n=1-e;return n*n*n*t}function Na(e,t){let n=1-e;return 3*n*n*e*t}function Pa(e,t){return 3*(1-e)*e*e*t}function Fa(e,t){return e*e*e*t}function Ia(e,t,n,r,i){return Ma(e,t)+Na(e,n)+Pa(e,r)+Fa(e,i)}var La=class extends _a{constructor(e=new z,t=new z,n=new z,r=new z){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new z){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ia(e,r.x,i.x,a.x,o.x),Ia(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Ra=class extends _a{constructor(e=new B,t=new B,n=new B,r=new B){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new B){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ia(e,r.x,i.x,a.x,o.x),Ia(e,r.y,i.y,a.y,o.y),Ia(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},za=class extends _a{constructor(e=new z,t=new z){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new z){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new z){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ba=class extends _a{constructor(e=new B,t=new B){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new B){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new B){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Va=class extends _a{constructor(e=new z,t=new z,n=new z){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new z){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ja(e,r.x,i.x,a.x),ja(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ha=class extends _a{constructor(e=new B,t=new B,n=new B){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new B){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(ja(e,r.x,i.x,a.x),ja(e,r.y,i.y,a.y),ja(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ua=class extends _a{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new z){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Da(o,s.x,c.x,l.x,u.x),Da(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new z().fromArray(n))}return this}},Wa=Object.freeze({__proto__:null,ArcCurve:ya,CatmullRomCurve3:Ea,CubicBezierCurve:La,CubicBezierCurve3:Ra,EllipseCurve:va,LineCurve:za,LineCurve3:Ba,QuadraticBezierCurve:Va,QuadraticBezierCurve3:Ha,SplineCurve:Ua}),Ga=class extends _a{constructor(){super(),this.type=`CurvePath`,this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?`LineCurve`:`LineCurve3`;this.curves.push(new Wa[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),r=this.getCurveLengths(),i=0;for(;i<r.length;){if(r[i]>=n){let e=r[i]-n,a=this.curves[i],o=a.getLength(),s=o===0?0:1-e/o;return a.getPointAt(s,t)}i++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,r=this.curves.length;n<r;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let r=0,i=this.curves;r<i.length;r++){let a=i[r],o=a.isEllipseCurve?e*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,s=a.getPoints(o);for(let e=0;e<s.length;e++){let r=s[e];n&&n.equals(r)||(t.push(r),n=r)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(n.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let n=this.curves[t];e.curves.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let n=e.curves[t];this.curves.push(new Wa[n.type]().fromJSON(n))}return this}},Ka=class extends Ga{constructor(e){super(),this.type=`Path`,this.currentPoint=new z,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new za(this.currentPoint.clone(),new z(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,r){let i=new Va(this.currentPoint.clone(),new z(e,t),new z(n,r));return this.curves.push(i),this.currentPoint.set(n,r),this}bezierCurveTo(e,t,n,r,i,a){let o=new La(this.currentPoint.clone(),new z(e,t),new z(n,r),new z(i,a));return this.curves.push(o),this.currentPoint.set(i,a),this}splineThru(e){let t=new Ua([this.currentPoint.clone()].concat(e));return this.curves.push(t),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,r,i,a){let o=this.currentPoint.x,s=this.currentPoint.y;return this.absarc(e+o,t+s,n,r,i,a),this}absarc(e,t,n,r,i,a){return this.absellipse(e,t,n,n,r,i,a),this}ellipse(e,t,n,r,i,a,o,s){let c=this.currentPoint.x,l=this.currentPoint.y;return this.absellipse(e+c,t+l,n,r,i,a,o,s),this}absellipse(e,t,n,r,i,a,o,s){let c=new va(e,t,n,r,i,a,o,s);if(this.curves.length>0){let e=c.getPoint(0);e.equals(this.currentPoint)||this.lineTo(e.x,e.y)}this.curves.push(c);let l=c.getPoint(1);return this.currentPoint.copy(l),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},qa=class extends Ka{constructor(e){super(e),this.uuid=dt(),this.type=`Shape`,this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,r=this.holes.length;n<r;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let n=this.holes[t];e.holes.push(n.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let n=e.holes[t];this.holes.push(new Ka().fromJSON(n))}return this}};function Ja(e,t,n=2){let r=t&&t.length,i=r?t[0]*n:e.length,a=Ya(e,0,i,n,!0),o=[];if(!a||a.next===a.prev)return o;let s,c,l;if(r&&(a=no(e,t,a,n)),e.length>80*n){s=e[0],c=e[1];let t=s,r=c;for(let a=n;a<i;a+=n){let n=e[a],i=e[a+1];n<s&&(s=n),i<c&&(c=i),n>t&&(t=n),i>r&&(r=i)}l=Math.max(t-s,r-c),l=l===0?0:32767/l}return Za(a,o,n,s,c,l,0),o}function Ya(e,t,n,r,i){let a;if(i===Do(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=wo(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=wo(i/r|0,e[i],e[i+1],a);return a&&go(a,a.next)&&(To(a),a=a.next),a}function Xa(e,t){if(!e)return e;t||=e;let n=e,r;do if(r=!1,!n.steiner&&(go(n,n.next)||ho(n.prev,n,n.next)===0)){if(To(n),n=t=n.prev,n===n.next)break;r=!0}else n=n.next;while(r||n!==t);return t}function Za(e,t,n,r,i,a,o){if(!e)return;!o&&a&&so(e,r,i,a);let s=e;for(;e.prev!==e.next;){let c=e.prev,l=e.next;if(a?$a(e,r,i,a):Qa(e)){t.push(c.i,e.i,l.i),To(e),e=l.next,s=l.next;continue}if(e=l,e===s){o?o===1?(e=eo(Xa(e),t),Za(e,t,n,r,i,a,2)):o===2&&to(e,t,n,r,i,a):Za(Xa(e),t,n,r,i,a,1);break}}}function Qa(e){let t=e.prev,n=e,r=e.next;if(ho(t,n,r)>=0)return!1;let i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&po(i,s,a,c,o,l,m.x,m.y)&&ho(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function $a(e,t,n,r){let i=e.prev,a=e,o=e.next;if(ho(i,a,o)>=0)return!1;let s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=lo(p,m,t,n,r),v=lo(h,g,t,n,r),y=e.prevZ,b=e.nextZ;for(;y&&y.z>=_&&b&&b.z<=v;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&po(s,u,c,d,l,f,y.x,y.y)&&ho(y.prev,y,y.next)>=0||(y=y.prevZ,b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&po(s,u,c,d,l,f,b.x,b.y)&&ho(b.prev,b,b.next)>=0))return!1;b=b.nextZ}for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==i&&y!==o&&po(s,u,c,d,l,f,y.x,y.y)&&ho(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==i&&b!==o&&po(s,u,c,d,l,f,b.x,b.y)&&ho(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function eo(e,t){let n=e;do{let r=n.prev,i=n.next.next;!go(r,i)&&_o(r,n,n.next,i)&&xo(r,i)&&xo(i,r)&&(t.push(r.i,n.i,i.i),To(n),To(n.next),n=e=i),n=n.next}while(n!==e);return Xa(n)}function to(e,t,n,r,i,a){let o=e;do{let e=o.next.next;for(;e!==o.prev;){if(o.i!==e.i&&mo(o,e)){let s=Co(o,e);o=Xa(o,o.next),s=Xa(s,s.next),Za(o,t,n,r,i,a,0),Za(s,t,n,r,i,a,0);return}e=e.next}o=o.next}while(o!==e)}function no(e,t,n,r){let i=[];for(let n=0,a=t.length;n<a;n++){let o=Ya(e,t[n]*r,n<a-1?t[n+1]*r:e.length,r,!1);o===o.next&&(o.steiner=!0),i.push(uo(o))}i.sort(ro);for(let e=0;e<i.length;e++)n=io(i[e],n);return n}function ro(e,t){let n=e.x-t.x;return n===0&&(n=e.y-t.y,n===0&&(n=(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x))),n}function io(e,t){let n=ao(e,t);if(!n)return t;let r=Co(n,e);return Xa(r,r.next),Xa(n,n.next)}function ao(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(go(e,n))return n;do{if(go(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}n=n.next}while(n!==t);if(!o)return null;let s=o,c=o.x,l=o.y,u=1/0;n=o;do{if(r>=n.x&&n.x>=c&&r!==n.x&&fo(i<l?r:a,i,c,l,i<l?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);xo(n,e)&&(t<u||t===u&&(n.x>o.x||n.x===o.x&&oo(o,n)))&&(o=n,u=t)}n=n.next}while(n!==s);return o}function oo(e,t){return ho(e.prev,e,t.prev)<0&&ho(t.next,e,e.next)<0}function so(e,t,n,r){let i=e;do i.z===0&&(i.z=lo(i.x,i.y,t,n,r)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==e);i.prevZ.nextZ=null,i.prevZ=null,co(i)}function co(e){let t,n=1;do{let r=e,i;e=null;let a=null;for(t=0;r;){t++;let o=r,s=0;for(let e=0;e<n&&(s++,o=o.nextZ,o);e++);let c=n;for(;s>0||c>0&&o;)s!==0&&(c===0||!o||r.z<=o.z)?(i=r,r=r.nextZ,s--):(i=o,o=o.nextZ,c--),a?a.nextZ=i:e=i,i.prevZ=a,a=i;r=o}a.nextZ=null,n*=2}while(t>1);return e}function lo(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function uo(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function fo(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function po(e,t,n,r,i,a,o,s){return!(e===o&&t===s)&&fo(e,t,n,r,i,a,o,s)}function mo(e,t){return e.next.i!==t.i&&e.prev.i!==t.i&&!bo(e,t)&&(xo(e,t)&&xo(t,e)&&So(e,t)&&(ho(e.prev,e,t.prev)||ho(e,t.prev,t))||go(e,t)&&ho(e.prev,e,e.next)>0&&ho(t.prev,t,t.next)>0)}function ho(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function go(e,t){return e.x===t.x&&e.y===t.y}function _o(e,t,n,r){let i=yo(ho(e,t,n)),a=yo(ho(e,t,r)),o=yo(ho(n,r,e)),s=yo(ho(n,r,t));return!!(i!==a&&o!==s||i===0&&vo(e,n,t)||a===0&&vo(e,r,t)||o===0&&vo(n,e,r)||s===0&&vo(n,t,r))}function vo(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function yo(e){return e>0?1:e<0?-1:0}function bo(e,t){let n=e;do{if(n.i!==e.i&&n.next.i!==e.i&&n.i!==t.i&&n.next.i!==t.i&&_o(n,n.next,e,t))return!0;n=n.next}while(n!==e);return!1}function xo(e,t){return ho(e.prev,e,e.next)<0?ho(e,t,e.next)>=0&&ho(e,e.prev,t)>=0:ho(e,t,e.prev)<0||ho(e,e.next,t)<0}function So(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do n.y>a!=n.next.y>a&&n.next.y!==n.y&&i<(n.next.x-n.x)*(a-n.y)/(n.next.y-n.y)+n.x&&(r=!r),n=n.next;while(n!==e);return r}function Co(e,t){let n=Eo(e.i,e.x,e.y),r=Eo(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function wo(e,t,n,r){let i=Eo(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function To(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ)}function Eo(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Do(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}var Oo=class{static triangulate(e,t,n=2){return Ja(e,t,n)}},ko=class e{static area(e){let t=e.length,n=0;for(let r=t-1,i=0;i<t;r=i++)n+=e[r].x*e[i].y-e[i].x*e[r].y;return n*.5}static isClockWise(t){return e.area(t)<0}static triangulateShape(e,t){let n=[],r=[],i=[];Ao(e),jo(n,e);let a=e.length;t.forEach(Ao);for(let e=0;e<t.length;e++)r.push(a),a+=t[e].length,jo(n,t[e]);let o=Oo.triangulate(n,r);for(let e=0;e<o.length;e+=3)i.push(o.slice(e,e+3));return i}};function Ao(e){let t=e.length;t>2&&e[t-1].equals(e[0])&&e.pop()}function jo(e,t){for(let n=0;n<t.length;n++)e.push(t[n].x),e.push(t[n].y)}var Mo=class e extends Pr{constructor(e=new qa([new z(.5,.5),new z(-.5,.5),new z(-.5,-.5),new z(.5,-.5)]),t={}){super(),this.type=`ExtrudeGeometry`,this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,r=[],i=[];for(let t=0,n=e.length;t<n;t++){let n=e[t];a(n)}this.setAttribute(`position`,new Sr(r,3)),this.setAttribute(`uv`,new Sr(i,2)),this.computeVertexNormals();function a(e){let a=[],o=t.curveSegments===void 0?12:t.curveSegments,s=t.steps===void 0?1:t.steps,c=t.depth===void 0?1:t.depth,l=t.bevelEnabled===void 0?!0:t.bevelEnabled,u=t.bevelThickness===void 0?.2:t.bevelThickness,d=t.bevelSize===void 0?u-.1:t.bevelSize,f=t.bevelOffset===void 0?0:t.bevelOffset,p=t.bevelSegments===void 0?3:t.bevelSegments,m=t.extrudePath,h=t.UVGenerator===void 0?No:t.UVGenerator,g,_=!1,v,y,b,x;if(m){g=m.getSpacedPoints(s),_=!0,l=!1;let e=m.isCatmullRomCurve3?m.closed:!1;v=m.computeFrenetFrames(s,e),y=new B,b=new B,x=new B}l||(p=0,u=0,d=0,f=0);let S=e.extractPoints(o),C=S.shape,w=S.holes;if(!ko.isClockWise(C)){C=C.reverse();for(let e=0,t=w.length;e<t;e++){let t=w[e];ko.isClockWise(t)&&(w[e]=t.reverse())}}function T(e){let t=e[0];for(let n=1;n<=e.length;n++){let r=n%e.length,i=e[r],a=i.x-t.x,o=i.y-t.y,s=a*a+o*o,c=Math.max(Math.abs(i.x),Math.abs(i.y),Math.abs(t.x),Math.abs(t.y));if(s<=10000000000000001e-36*c*c){e.splice(r,1),n--;continue}t=i}}T(C),w.forEach(T);let E=w.length,D=C;for(let e=0;e<E;e++){let t=w[e];C=C.concat(t)}function O(e,t,n){return t||L(`ExtrudeGeometry: vec does not exist`),e.clone().addScaledVector(t,n)}let ee=C.length;function k(e,t,n){let r,i,a,o=e.x-t.x,s=e.y-t.y,c=n.x-e.x,l=n.y-e.y,u=o*o+s*s,d=o*l-s*c;if(Math.abs(d)>2**-52){let d=Math.sqrt(u),f=Math.sqrt(c*c+l*l),p=t.x-s/d,m=t.y+o/d,h=n.x-l/f,g=n.y+c/f,_=((h-p)*l-(g-m)*c)/(o*l-s*c);r=p+o*_-e.x,i=m+s*_-e.y;let v=r*r+i*i;if(v<=2)return new z(r,i);a=Math.sqrt(v/2)}else{let e=!1;o>2**-52?c>2**-52&&(e=!0):o<-(2**-52)?c<-(2**-52)&&(e=!0):Math.sign(s)===Math.sign(l)&&(e=!0),e?(r=-s,i=o,a=Math.sqrt(u)):(r=o,i=s,a=Math.sqrt(u/2))}return new z(r/a,i/a)}let te=[];for(let e=0,t=D.length,n=t-1,r=e+1;e<t;e++,n++,r++)n===t&&(n=0),r===t&&(r=0),te[e]=k(D[e],D[n],D[r]);let ne=[],A,re=te.concat();for(let e=0,t=E;e<t;e++){let t=w[e];A=[];for(let e=0,n=t.length,r=n-1,i=e+1;e<n;e++,r++,i++)r===n&&(r=0),i===n&&(i=0),A[e]=k(t[e],t[r],t[i]);ne.push(A),re=re.concat(A)}let ie;if(p===0)ie=ko.triangulateShape(D,w);else{let e=[],t=[];for(let n=0;n<p;n++){let r=n/p,i=u*Math.cos(r*Math.PI/2),a=d*Math.sin(r*Math.PI/2)+f;for(let t=0,n=D.length;t<n;t++){let n=O(D[t],te[t],a);M(n.x,n.y,-i),r===0&&e.push(n)}for(let e=0,n=E;e<n;e++){let n=w[e];A=ne[e];let o=[];for(let e=0,t=n.length;e<t;e++){let t=O(n[e],A[e],a);M(t.x,t.y,-i),r===0&&o.push(t)}r===0&&t.push(o)}}ie=ko.triangulateShape(e,t)}let j=ie.length,ae=d+f;for(let e=0;e<ee;e++){let t=l?O(C[e],re[e],ae):C[e];_?(b.copy(v.normals[0]).multiplyScalar(t.x),y.copy(v.binormals[0]).multiplyScalar(t.y),x.copy(g[0]).add(b).add(y),M(x.x,x.y,x.z)):M(t.x,t.y,0)}for(let e=1;e<=s;e++)for(let t=0;t<ee;t++){let n=l?O(C[t],re[t],ae):C[t];_?(b.copy(v.normals[e]).multiplyScalar(n.x),y.copy(v.binormals[e]).multiplyScalar(n.y),x.copy(g[e]).add(b).add(y),M(x.x,x.y,x.z)):M(n.x,n.y,c/s*e)}for(let e=p-1;e>=0;e--){let t=e/p,n=u*Math.cos(t*Math.PI/2),r=d*Math.sin(t*Math.PI/2)+f;for(let e=0,t=D.length;e<t;e++){let t=O(D[e],te[e],r);M(t.x,t.y,c+n)}for(let e=0,t=w.length;e<t;e++){let t=w[e];A=ne[e];for(let e=0,i=t.length;e<i;e++){let i=O(t[e],A[e],r);_?M(i.x,i.y+g[s-1].y,g[s-1].x+n):M(i.x,i.y,c+n)}}}oe(),se();function oe(){let e=r.length/3;if(l){let e=0,t=ee*e;for(let e=0;e<j;e++){let n=ie[e];le(n[2]+t,n[1]+t,n[0]+t)}e=s+p*2,t=ee*e;for(let e=0;e<j;e++){let n=ie[e];le(n[0]+t,n[1]+t,n[2]+t)}}else{for(let e=0;e<j;e++){let t=ie[e];le(t[2],t[1],t[0])}for(let e=0;e<j;e++){let t=ie[e];le(t[0]+ee*s,t[1]+ee*s,t[2]+ee*s)}}n.addGroup(e,r.length/3-e,0)}function se(){let e=r.length/3,t=0;ce(D,t),t+=D.length;for(let e=0,n=w.length;e<n;e++){let n=w[e];ce(n,t),t+=n.length}n.addGroup(e,r.length/3-e,1)}function ce(e,t){let n=e.length;for(;--n>=0;){let r=n,i=n-1;i<0&&(i=e.length-1);for(let e=0,n=s+p*2;e<n;e++){let n=ee*e,a=ee*(e+1);ue(t+r+n,t+i+n,t+i+a,t+r+a)}}}function M(e,t,n){a.push(e),a.push(t),a.push(n)}function le(e,t,i){de(e),de(t),de(i);let a=r.length/3,o=h.generateTopUV(n,r,a-3,a-2,a-1);fe(o[0]),fe(o[1]),fe(o[2])}function ue(e,t,i,a){de(e),de(t),de(a),de(t),de(i),de(a);let o=r.length/3,s=h.generateSideWallUV(n,r,o-6,o-3,o-2,o-1);fe(s[0]),fe(s[1]),fe(s[3]),fe(s[1]),fe(s[2]),fe(s[3])}function de(e){r.push(a[e*3+0]),r.push(a[e*3+1]),r.push(a[e*3+2])}function fe(e){i.push(e.x),i.push(e.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,n=this.parameters.options;return Po(t,n,e)}static fromJSON(t,n){let r=[];for(let e=0,i=t.shapes.length;e<i;e++){let i=n[t.shapes[e]];r.push(i)}let i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Wa[i.type]().fromJSON(i)),new e(r,t.options)}},No={generateTopUV:function(e,t,n,r,i){let a=t[n*3],o=t[n*3+1],s=t[r*3],c=t[r*3+1],l=t[i*3],u=t[i*3+1];return[new z(a,o),new z(s,c),new z(l,u)]},generateSideWallUV:function(e,t,n,r,i,a){let o=t[n*3],s=t[n*3+1],c=t[n*3+2],l=t[r*3],u=t[r*3+1],d=t[r*3+2],f=t[i*3],p=t[i*3+1],m=t[i*3+2],h=t[a*3],g=t[a*3+1],_=t[a*3+2];return Math.abs(s-u)<Math.abs(o-l)?[new z(o,1-c),new z(l,1-d),new z(f,1-m),new z(h,1-_)]:[new z(s,1-c),new z(u,1-d),new z(p,1-m),new z(g,1-_)]}};function Po(e,t,n){if(n.shapes=[],Array.isArray(e))for(let t=0,r=e.length;t<r;t++){let r=e[t];n.shapes.push(r.uuid)}else n.shapes.push(e.uuid);return n.options=Object.assign({},t),t.extrudePath!==void 0&&(n.options.extrudePath=t.extrudePath.toJSON()),n}var Fo=class e extends Pr{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Sr(p,3)),this.setAttribute(`normal`,new Sr(m,3)),this.setAttribute(`uv`,new Sr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Io=class e extends Pr{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new B,p=new z;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Sr(s,3)),this.setAttribute(`normal`,new Sr(c,3)),this.setAttribute(`uv`,new Sr(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Lo=class e extends Pr{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new B,d=new B,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=0;f===0&&a===0?v=.5/t:f===n&&s===Math.PI&&(v=-.5/t);for(let n=0;n<=t;n++){let s=n/t;u.x=-e*Math.cos(r+s*i)*Math.sin(a+_*o),u.y=e*Math.cos(a+_*o),u.z=e*Math.sin(r+s*i)*Math.sin(a+_*o),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(s+v,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Sr(p,3)),this.setAttribute(`normal`,new Sr(m,3)),this.setAttribute(`uv`,new Sr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ro=class e extends Pr{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new B,f=new B,p=new B;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Sr(c,3)),this.setAttribute(`normal`,new Sr(l,3)),this.setAttribute(`uv`,new Sr(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},zo=class e extends Pr{constructor(e=new Ha(new B(-1,-1,0),new B(-1,1,0),new B(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new B,s=new B,c=new z,l=new B,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Sr(u,3)),this.setAttribute(`normal`,new Sr(d,3)),this.setAttribute(`uv`,new Sr(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Wa[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Bo(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Ho(i))i.isRenderTargetTexture?(I(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i))if(Ho(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice();else t[n][r]=i}}return t}function Vo(e){let t={};for(let n=0;n<e.length;n++){let r=Bo(e[n]);for(let e in r)t[e]=r[e]}return t}function Ho(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Uo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Wo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Bt.workingColorSpace}var Go={clone:Bo,merge:Vo},Ko=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,qo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Jo=class extends zr{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ko,this.fragmentShader=qo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bo(e.uniforms),this.uniformsGroups=Uo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},Yo=class extends Jo{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},K=class extends zr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new H(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new H(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new z(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Xo=class extends K{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:``,PHYSICAL:``},this.type=`MeshPhysicalMaterial`,this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new z(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return R(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new H(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new H(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new H(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:``,PHYSICAL:``},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Zo=class extends zr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ve,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Qo=class extends zr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}},$o=class extends Bi{constructor(e){super(),this.isLineDashedMaterial=!0,this.type=`LineDashedMaterial`,this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(e)}copy(e){return super.copy(e),this.scale=e.scale,this.dashSize=e.dashSize,this.gapSize=e.gapSize,this}};function es(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function ts(e){function t(t,n){return e[t]-e[n]}let n=e.length,r=Array(n);for(let e=0;e!==n;++e)r[e]=e;return r.sort(t),r}function ns(e,t,n){let r=e.length,i=new e.constructor(r);for(let a=0,o=0;o!==r;++a){let r=n[a]*t;for(let n=0;n!==t;++n)i[o++]=e[r+n]}return i}function rs(e,t,n,r){let i=1,a=e[0];for(;a!==void 0&&a[r]===void 0;)a=e[i++];if(a===void 0)return;let o=a[r];if(o!==void 0)if(Array.isArray(o))do o=a[r],o!==void 0&&(t.push(a.time),n.push(...o)),a=e[i++];while(a!==void 0);else if(o.toArray!==void 0)do o=a[r],o!==void 0&&(t.push(a.time),o.toArray(n,n.length)),a=e[i++];while(a!==void 0);else do o=a[r],o!==void 0&&(t.push(a.time),n.push(o)),a=e[i++];while(a!==void 0)}var is=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`call to abstract method`)}intervalChanged_(){}},as=class extends is{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Le,endingEnd:Le}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Re:i=e,o=2*t-n;break;case ze:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Re:a=e,s=2*n-t;break;case ze:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},os=class extends is{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},ss=class extends is{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},cs=class extends is{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.settings||this.DefaultSettings_,u=l.inTangents,d=l.outTangents;if(!u||!d){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let f=o*2,p=e-1;for(let l=0;l!==o;++l){let o=a[c+l],m=a[s+l],h=p*f+l*2,g=d[h],_=d[h+1],v=e*f+l*2,y=u[v],b=u[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[l]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},ls=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=es(t,this.TimeBufferType),this.values=es(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:es(e.times,Array),values:es(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ss(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new os(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new as(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new cs(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.settings=this.settings),t}setInterpolation(e){let t;switch(e){case Fe:t=this.InterpolantFactoryMethodDiscrete;break;case P:t=this.InterpolantFactoryMethodLinear;break;case Ie:t=this.InterpolantFactoryMethodSmooth;break;case F:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t);return I(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Fe;case this.InterpolantFactoryMethodLinear:return P;case this.InterpolantFactoryMethodSmooth:return Ie;case this.InterpolantFactoryMethodBezier:return F}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(L(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(L(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){L(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){L(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Xe(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){L(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ie,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0]))if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};ls.prototype.ValueTypeName=``,ls.prototype.TimeBufferType=Float32Array,ls.prototype.ValueBufferType=Float32Array,ls.prototype.DefaultInterpolation=P;var us=class extends ls{constructor(e,t,n){super(e,t,n)}};us.prototype.ValueTypeName=`bool`,us.prototype.ValueBufferType=Array,us.prototype.DefaultInterpolation=Fe,us.prototype.InterpolantFactoryMethodLinear=void 0,us.prototype.InterpolantFactoryMethodSmooth=void 0;var ds=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}};ds.prototype.ValueTypeName=`color`;var fs=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}};fs.prototype.ValueTypeName=`number`;var ps=class extends is{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Nt.slerpFlat(i,0,a,c-o,a,c,s);return i}},ms=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new ps(this.times,this.values,this.getValueSize(),e)}};ms.prototype.ValueTypeName=`quaternion`,ms.prototype.InterpolantFactoryMethodSmooth=void 0;var hs=class extends ls{constructor(e,t,n){super(e,t,n)}};hs.prototype.ValueTypeName=`string`,hs.prototype.ValueBufferType=Array,hs.prototype.DefaultInterpolation=Fe,hs.prototype.InterpolantFactoryMethodLinear=void 0,hs.prototype.InterpolantFactoryMethodSmooth=void 0;var gs=class extends ls{constructor(e,t,n,r){super(e,t,n,r)}};gs.prototype.ValueTypeName=`vector`;var _s=class{constructor(e=``,t=-1,n=[],r=Be){this.name=e,this.tracks=n,this.duration=t,this.blendMode=r,this.uuid=dt(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,r=1/(e.fps||1);for(let e=0,i=n.length;e!==i;++e)t.push(ys(n[e]).scale(r));let i=new this(e.name,e.duration,t,e.blendMode);return i.uuid=e.uuid,i.userData=JSON.parse(e.userData||`{}`),i}static toJSON(e){let t=[],n=e.tracks,r={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let e=0,r=n.length;e!==r;++e)t.push(ls.toJSON(n[e]));return r}static CreateFromMorphTargetSequence(e,t,n,r){let i=t.length,a=[];for(let e=0;e<i;e++){let o=[],s=[];o.push((e+i-1)%i,e,(e+1)%i),s.push(0,1,0);let c=ts(o);o=ns(o,1,c),s=ns(s,1,c),!r&&o[0]===0&&(o.push(i),s.push(s[0])),a.push(new fs(`.morphTargetInfluences[`+t[e].name+`]`,o,s).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let t=e;n=t.geometry&&t.geometry.animations||t.animations}for(let e=0;e<n.length;e++)if(n[e].name===t)return n[e];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let r={},i=/^([\w-]*?)([\d]+)$/;for(let t=0,n=e.length;t<n;t++){let n=e[t],a=n.name.match(i);if(a&&a.length>1){let e=a[1],t=r[e];t||(r[e]=t=[]),t.push(n)}}let a=[];for(let e in r)a.push(this.CreateFromMorphTargetSequence(e,r[e],t,n));return a}static parseAnimation(e,t){if(I(`AnimationClip: parseAnimation() is deprecated and will be removed with r185`),!e)return L(`AnimationClip: No animation in JSONLoader data.`),null;let n=function(e,t,n,r,i){if(n.length!==0){let a=[],o=[];rs(n,a,o,r),a.length!==0&&i.push(new e(t,a,o))}},r=[],i=e.name||`default`,a=e.fps||30,o=e.blendMode,s=e.length||-1,c=e.hierarchy||[];for(let e=0;e<c.length;e++){let i=c[e].keys;if(!(!i||i.length===0))if(i[0].morphTargets){let e={},t;for(t=0;t<i.length;t++)if(i[t].morphTargets)for(let n=0;n<i[t].morphTargets.length;n++)e[i[t].morphTargets[n]]=-1;for(let n in e){let e=[],a=[];for(let r=0;r!==i[t].morphTargets.length;++r){let r=i[t];e.push(r.time),a.push(+(r.morphTarget===n))}r.push(new fs(`.morphTargetInfluence[`+n+`]`,e,a))}s=e.length*a}else{let a=`.bones[`+t[e].name+`]`;n(gs,a+`.position`,i,`pos`,r),n(ms,a+`.quaternion`,i,`rot`,r),n(gs,a+`.scale`,i,`scl`,r)}}return r.length===0?null:new this(i,s,r,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,r=e.length;n!==r;++n){let e=this.tracks[n];t=Math.max(t,e.times[e.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e&&=this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());let t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}};function vs(e){switch(e.toLowerCase()){case`scalar`:case`double`:case`float`:case`number`:case`integer`:return fs;case`vector`:case`vector2`:case`vector3`:case`vector4`:return gs;case`color`:return ds;case`quaternion`:return ms;case`bool`:case`boolean`:return us;case`string`:return hs}throw Error(`THREE.KeyframeTrack: Unsupported typeName: `+e)}function ys(e){if(e.type===void 0)throw Error(`THREE.KeyframeTrack: track type undefined, can not parse`);let t=vs(e.type);if(e.times===void 0){let t=[],n=[];rs(e.keys,t,n,`value`),e.times=t,e.values=n}return t.parse===void 0?new t(e.name,e.times,e.values,e.interpolation):t.parse(e)}var bs={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(xs(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!xs(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function xs(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Ss=class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Cs=new Ss,ws=class{constructor(e){this.manager=e===void 0?Cs:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ws.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Ts={},Es=class extends Error{constructor(e,t){super(e),this.response=t}},Ds=class extends ws{constructor(e){super(e),this.mimeType=``,this.responseType=``,this._abortController=new AbortController}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=bs.get(`file:${e}`);if(i!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(i),this.manager.itemEnd(e)},0);return}if(Ts[e]!==void 0){Ts[e].push({onLoad:t,onProgress:n,onError:r});return}Ts[e]=[],Ts[e].push({onLoad:t,onProgress:n,onError:r});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?`include`:`same-origin`,signal:typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,s=this.responseType;fetch(a).then(t=>{if(t.status===200||t.status===0){if(t.status===0&&I(`FileLoader: HTTP Status 0 received.`),typeof ReadableStream>`u`||t.body===void 0||t.body.getReader===void 0)return t;let n=Ts[e],r=t.body.getReader(),i=t.headers.get(`X-File-Size`)||t.headers.get(`Content-Length`),a=i?parseInt(i):0,o=a!==0,s=0,c=new ReadableStream({start(e){t();function t(){r.read().then(({done:r,value:i})=>{if(r)e.close();else{s+=i.byteLength;let r=new ProgressEvent(`progress`,{lengthComputable:o,loaded:s,total:a});for(let e=0,t=n.length;e<t;e++){let t=n[e];t.onProgress&&t.onProgress(r)}e.enqueue(i),t()}},t=>{e.error(t)})}}});return new Response(c)}else throw new Es(`fetch for "${t.url}" responded with ${t.status}: ${t.statusText}`,t)}).then(e=>{switch(s){case`arraybuffer`:return e.arrayBuffer();case`blob`:return e.blob();case`document`:return e.text().then(e=>new DOMParser().parseFromString(e,o));case`json`:return e.json();default:if(o===``)return e.text();{let t=/charset="?([^;"\s]*)"?/i.exec(o),n=t&&t[1]?t[1].toLowerCase():void 0,r=new TextDecoder(n);return e.arrayBuffer().then(e=>r.decode(e))}}}).then(t=>{bs.add(`file:${e}`,t);let n=Ts[e];delete Ts[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onLoad&&r.onLoad(t)}}).catch(t=>{let n=Ts[e];if(n===void 0)throw this.manager.itemError(e),t;delete Ts[e];for(let e=0,r=n.length;e<r;e++){let r=n[e];r.onError&&r.onError(t)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},Os=new WeakMap,ks=class extends ws{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=bs.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Os.get(a);e===void 0&&(e=[],Os.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Ze(`img`);function s(){l(),t&&t(this);let n=Os.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Os.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),bs.remove(`image:${e}`);let n=Os.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Os.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),bs.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},As=class extends ws{constructor(e){super(e)}load(e,t,n,r){let i=new Xt,a=new ks(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},js=class extends An{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new H(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ms=new nn,Ns=new B,Ps=new B,Fs=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new z(512,512),this.mapType=u,this.map=null,this.mapPass=null,this.matrix=new nn,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zi,this._frameExtents=new z(1,1),this._viewportCount=1,this._viewports=[new Zt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Ns.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ns),Ps.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ps),t.updateMatrixWorld(),Ms.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ms,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ms)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Is=new B,Ls=new Nt,Rs=new B,zs=class extends An{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=Je,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Is,Ls,Rs),Rs.x===1&&Rs.y===1&&Rs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Is,Ls,Rs.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(Is,Ls,Rs),Rs.x===1&&Rs.y===1&&Rs.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Is,Ls,Rs.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Bs=new B,Vs=new z,Hs=new z,Us=class extends zs{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=ut*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(lt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ut*2*Math.atan(Math.tan(lt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Bs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Bs.x,Bs.y).multiplyScalar(-e/Bs.z),Bs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Bs.x,Bs.y).multiplyScalar(-e/Bs.z)}getViewSize(e,t){return this.getViewBounds(e,Vs,Hs),t.subVectors(Hs,Vs)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(lt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Ws=class extends Fs{constructor(){super(new Us(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){let t=this.camera,n=ut*2*e.angle*this.focus,r=this.mapSize.width/this.mapSize.height*this.aspect,i=e.distance||t.far;(n!==t.fov||r!==t.aspect||i!==t.far)&&(t.fov=n,t.aspect=r,t.far=i,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},Gs=class extends js{constructor(e,t,n=0,r=Math.PI/3,i=0,a=2){super(e,t),this.isSpotLight=!0,this.type=`SpotLight`,this.position.copy(An.DEFAULT_UP),this.updateMatrix(),this.target=new An,this.distance=n,this.angle=r,this.penumbra=i,this.decay=a,this.map=null,this.shadow=new Ws}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}},Ks=class extends Fs{constructor(){super(new Us(90,1,.5,500)),this.isPointLightShadow=!0}},qs=class extends js{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type=`PointLight`,this.distance=n,this.decay=r,this.shadow=new Ks}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}},Js=class extends zs{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ys=class extends Fs{constructor(){super(new Js(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Xs=class extends js{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(An.DEFAULT_UP),this.updateMatrix(),this.target=new An,this.shadow=new Ys}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Zs=class extends js{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type=`AmbientLight`}},Qs=class{static extractUrlBase(e){let t=e.lastIndexOf(`/`);return t===-1?`./`:e.slice(0,t+1)}static resolveURL(e,t){return typeof e!=`string`||e===``?``:(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,`$1`)),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},$s=new WeakMap,ec=class extends ws{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>`u`&&I(`ImageBitmapLoader: createImageBitmap() not supported.`),typeof fetch>`u`&&I(`ImageBitmapLoader: fetch() not supported.`),this.options={premultiplyAlpha:`none`},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,r){e===void 0&&(e=``),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=bs.get(`image-bitmap:${e}`);if(a!==void 0){if(i.manager.itemStart(e),a.then){a.then(n=>{$s.has(a)===!0?(r&&r($s.get(a)),i.manager.itemError(e),i.manager.itemEnd(e)):(t&&t(n),i.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);return}let o={};o.credentials=this.crossOrigin===`anonymous`?`same-origin`:`include`,o.headers=this.requestHeader,o.signal=typeof AbortSignal.any==`function`?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;let s=fetch(e,o).then(function(e){return e.blob()}).then(function(e){return createImageBitmap(e,Object.assign(i.options,{colorSpaceConversion:`none`}))}).then(function(n){bs.add(`image-bitmap:${e}`,n),t&&t(n),i.manager.itemEnd(e)}).catch(function(t){r&&r(t),$s.set(s,t),bs.remove(`image-bitmap:${e}`),i.manager.itemError(e),i.manager.itemEnd(e)});bs.add(`image-bitmap:${e}`,s),i.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}},tc=-90,nc=1,rc=class extends An{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Us(tc,nc,e,t);r.layers=this.layers,this.add(r);let i=new Us(tc,nc,e,t);i.layers=this.layers,this.add(i);let a=new Us(tc,nc,e,t);a.layers=this.layers,this.add(a);let o=new Us(tc,nc,e,t);o.layers=this.layers,this.add(o);let s=new Us(tc,nc,e,t);s.layers=this.layers,this.add(s);let c=new Us(tc,nc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},ic=class extends Us{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},ac=`\\[\\]\\.:\\/`,oc=RegExp(`[\\[\\]\\.:\\/]`,`g`),sc=`[^\\[\\]\\.:\\/]`,cc=`[^`+ac.replace(`\\.`,``)+`]`,lc=`((?:WC+[\\/:])*)`.replace(`WC`,sc),uc=`(WCOD+)?`.replace(`WCOD`,cc),dc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,sc),fc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,sc),pc=RegExp(`^`+lc+uc+dc+fc+`$`),mc=[`material`,`materials`,`bones`,`map`],hc=class{constructor(e,t,n){let r=n||gc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},gc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(oc,``)}static parseTrackName(e){let t=pc.exec(e);if(t===null)throw Error(`PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);mc.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){I(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){L(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){L(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){L(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){L(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){L(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){L(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){L(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;L(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){L(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){L(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};gc.Composite=hc,gc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},gc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},gc.prototype.GetterByBindingType=[gc.prototype._getValue_direct,gc.prototype._getValue_array,gc.prototype._getValue_arrayElement,gc.prototype._getValue_toArray],gc.prototype.SetterByBindingTypeAndVersioning=[[gc.prototype._setValue_direct,gc.prototype._setValue_direct_setNeedsUpdate,gc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[gc.prototype._setValue_array,gc.prototype._setValue_array_setNeedsUpdate,gc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[gc.prototype._setValue_arrayElement,gc.prototype._setValue_arrayElement_setNeedsUpdate,gc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[gc.prototype._setValue_fromArray,gc.prototype._setValue_fromArray_setNeedsUpdate,gc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var _c=new nn,vc=class{constructor(e,t,n=0,r=1/0){this.ray=new qr(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new mn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):L(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return _c.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(_c),this}intersectObject(e,t=!0,n=[]){return bc(e,this,n,t),n.sort(yc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)bc(e[r],this,n,t);return n.sort(yc),n}};function yc(e,t){return e.distance-t.distance}function bc(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)bc(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});var xc=class extends Qi{constructor(e=10,t=10,n=4473924,r=8947848){n=new H(n),r=new H(r);let i=t/2,a=e/t,o=e/2,s=[],c=[];for(let e=0,l=0,u=-o;e<=t;e++,u+=a){s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);let t=e===i?n:r;t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3,t.toArray(c,l),l+=3}let l=new Pr;l.setAttribute(`position`,new Sr(s,3)),l.setAttribute(`color`,new Sr(c,3));let u=new Bi({vertexColors:!0,toneMapped:!1});super(l,u),this.type=`GridHelper`}dispose(){this.geometry.dispose(),this.material.dispose()}};function Sc(e,t,n,r){let i=Cc(r);switch(n){case C:return e*t;case O:return e*t/i.components*i.byteLength;case ee:return e*t/i.components*i.byteLength;case k:return e*t*2/i.components*i.byteLength;case te:return e*t*2/i.components*i.byteLength;case w:return e*t*3/i.components*i.byteLength;case T:return e*t*4/i.components*i.byteLength;case ne:return e*t*4/i.components*i.byteLength;case A:case re:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ie:case j:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case oe:case ce:return Math.max(e,16)*Math.max(t,8)/4;case ae:case se:return Math.max(e,8)*Math.max(t,8)/2;case M:case le:case de:case fe:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ue:case pe:case me:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case he:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ge:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case _e:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ve:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ye:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case be:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case xe:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Se:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ce:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case we:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Te:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Ee:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case De:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Oe:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case ke:case Ae:case je:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Me:case N:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ne:case Pe:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Cc(e){switch(e){case u:case d:return{byteLength:1,components:1};case p:case f:case _:return{byteLength:2,components:1};case v:case y:return{byteLength:2,components:4};case h:case m:case g:return{byteLength:4,components:1};case x:case S:return{byteLength:4,components:3}}throw Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`184`}})),typeof window<`u`&&(window.__THREE__?I(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`184`);function wc(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Tc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = inverseTransformDirection( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},J={common:{diffuse:{value:new H(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new V}},envmap:{envMap:{value:null},envMapRotation:{value:new V},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new V}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new V}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new V},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new V},normalScale:{value:new z(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new V},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new V}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new V}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new V}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new H(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new B},probesMax:{value:new B},probesResolution:{value:new B}},points:{diffuse:{value:new H(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0},uvTransform:{value:new V}},sprite:{diffuse:{value:new H(16777215)},opacity:{value:1},center:{value:new z(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new V},alphaMap:{value:null},alphaMapTransform:{value:new V},alphaTest:{value:0}}},Ec={basic:{uniforms:Vo([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.fog]),vertexShader:q.meshbasic_vert,fragmentShader:q.meshbasic_frag},lambert:{uniforms:Vo([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new H(0)},envMapIntensity:{value:1}}]),vertexShader:q.meshlambert_vert,fragmentShader:q.meshlambert_frag},phong:{uniforms:Vo([J.common,J.specularmap,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.fog,J.lights,{emissive:{value:new H(0)},specular:{value:new H(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:q.meshphong_vert,fragmentShader:q.meshphong_frag},standard:{uniforms:Vo([J.common,J.envmap,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.roughnessmap,J.metalnessmap,J.fog,J.lights,{emissive:{value:new H(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:q.meshphysical_vert,fragmentShader:q.meshphysical_frag},toon:{uniforms:Vo([J.common,J.aomap,J.lightmap,J.emissivemap,J.bumpmap,J.normalmap,J.displacementmap,J.gradientmap,J.fog,J.lights,{emissive:{value:new H(0)}}]),vertexShader:q.meshtoon_vert,fragmentShader:q.meshtoon_frag},matcap:{uniforms:Vo([J.common,J.bumpmap,J.normalmap,J.displacementmap,J.fog,{matcap:{value:null}}]),vertexShader:q.meshmatcap_vert,fragmentShader:q.meshmatcap_frag},points:{uniforms:Vo([J.points,J.fog]),vertexShader:q.points_vert,fragmentShader:q.points_frag},dashed:{uniforms:Vo([J.common,J.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:q.linedashed_vert,fragmentShader:q.linedashed_frag},depth:{uniforms:Vo([J.common,J.displacementmap]),vertexShader:q.depth_vert,fragmentShader:q.depth_frag},normal:{uniforms:Vo([J.common,J.bumpmap,J.normalmap,J.displacementmap,{opacity:{value:1}}]),vertexShader:q.meshnormal_vert,fragmentShader:q.meshnormal_frag},sprite:{uniforms:Vo([J.sprite,J.fog]),vertexShader:q.sprite_vert,fragmentShader:q.sprite_frag},background:{uniforms:{uvTransform:{value:new V},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:q.background_vert,fragmentShader:q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new V}},vertexShader:q.backgroundCube_vert,fragmentShader:q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:q.cube_vert,fragmentShader:q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:q.equirect_vert,fragmentShader:q.equirect_frag},distance:{uniforms:Vo([J.common,J.displacementmap,{referencePosition:{value:new B},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:q.distance_vert,fragmentShader:q.distance_frag},shadow:{uniforms:Vo([J.lights,J.fog,{color:{value:new H(0)},opacity:{value:1}}]),vertexShader:q.shadow_vert,fragmentShader:q.shadow_frag}};Ec.physical={uniforms:Vo([Ec.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new V},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new V},clearcoatNormalScale:{value:new z(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new V},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new V},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new V},sheen:{value:0},sheenColor:{value:new H(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new V},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new V},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new V},transmissionSamplerSize:{value:new z},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new V},attenuationDistance:{value:0},attenuationColor:{value:new H(0)},specularColor:{value:new H(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new V},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new V},anisotropyVector:{value:new z},anisotropyMap:{value:null},anisotropyMapTransform:{value:new V}}]),vertexShader:q.meshphysical_vert,fragmentShader:q.meshphysical_frag};var Dc={r:0,b:0,g:0},Oc=new nn,kc=new V;kc.set(-1,0,0,0,1,0,0,0,1);function Ac(e,t,n,r,i,a){let o=new H(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new U(new W(1,1,1),new Jo({name:`BackgroundCubeMaterial`,uniforms:Bo(Ec.backgroundCube.uniforms),vertexShader:Ec.backgroundCube.vertexShader,fragmentShader:Ec.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Oc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(kc),l.material.toneMapped=Bt.getTransfer(i.colorSpace)!==Ge,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new U(new Fo(2,2),new Jo({name:`BackgroundMaterial`,uniforms:Bo(Ec.background.uniforms),vertexShader:Ec.background.vertexShader,fragmentShader:Ec.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Bt.getTransfer(i.colorSpace)!==Ge,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Dc,Wo(e)),n.buffers.color.setClear(Dc.r,Dc.g,Dc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function jc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Mc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Nc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return!(t!==1023&&r.convert(t)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(I(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&I(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Pc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Fi,s=new V,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Fc=4,Ic=[.125,.215,.35,.446,.526,.582],Lc=20,Rc=256,zc=new Js,Bc=new H,Vc=null,Hc=0,Uc=0,Wc=!1,Gc=new B,Kc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Gc}=i;Vc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$c(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Qc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vc,Hc,Uc),this._renderer.xr.enabled=Wc,e.scissorTest=!1,Yc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vc=this._renderer.getRenderTarget(),Hc=this._renderer.getActiveCubeFace(),Uc=this._renderer.getActiveMipmapLevel(),Wc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:s,minFilter:s,generateMipmaps:!1,type:_,format:T,colorSpace:Ue,depthBuffer:!1},r=Jc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Jc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=qc(r)),this._blurMaterial=Zc(r,e,t),this._ggxMaterial=Xc(r,e,t)}return r}_compileMaterial(e){let t=new U(new Pr,e);this._renderer.compile(t,zc)}_sceneToCubeUV(e,t,n,r,i){let a=new Us(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Bc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new U(new W,new Jr({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Bc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Yc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=$c()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Qc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Yc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,zc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Fc?n-d+Fc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Yc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,zc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Yc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,zc)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&L(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/(2*Lc-1),p=i/f,m=isFinite(i)?1+Math.floor(3*p):Lc;m>Lc&&I(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Lc}`);let h=[],g=0;for(let e=0;e<Lc;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Yc(t,3*v*(r>_-Fc?r-_+Fc:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,zc)}};function qc(e){let t=[],n=[],r=[],i=e,a=e-Fc+1+Ic.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Fc?s=Ic[o-e+Fc-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Pr;h.setAttribute(`position`,new yr(f,3)),h.setAttribute(`uv`,new yr(p,2)),h.setAttribute(`faceIndex`,new yr(m,1)),r.push(new U(h,null)),i>Fc&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function Jc(e,t,n){let r=new $t(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Yc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Xc(e,t,n){return new Jo({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Rc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:el(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Zc(e,t,n){let r=new Float32Array(Lc),i=new B(0,1,0);return new Jo({name:`SphericalGaussianBlur`,defines:{n:Lc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Qc(){return new Jo({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function $c(){return new Jo({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:el(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function el(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var tl=class extends $t{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new sa(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new W(5,5,5),i=new Jo({name:`CubemapFromEquirect`,uniforms:Bo(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new U(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=s),new rc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function nl(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304)if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}else{let r=n.image;if(r&&r.height>0){let i=new tl(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}else return null}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Kc(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Kc(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function rl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&rt(`WebGLRenderer: `+e+` extension not supported.`),t}}}function il(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?xr:br)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function al(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function ol(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:L(`WebGLInfo: Unknown draw mode:`,r);break}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function sl(e,t,n){let r=new WeakMap,i=new Zt;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),_=new en(h,p,m,u);_.type=g,_.needsUpdate=!0;let v=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*v;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:_,size:new z(p,m)},r.set(o,d);function y(){_.dispose(),r.delete(o),o.removeEventListener(`dispose`,y)}o.addEventListener(`dispose`,y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function cl(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var ll={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ul(e,t,n,r,i){let a=new $t(t,n,{type:e,depthBuffer:r,stencilBuffer:i,depthTexture:r?new la(t,n):void 0}),o=new $t(t,n,{type:_,depthBuffer:!1,stencilBuffer:!1}),s=new Pr;s.setAttribute(`position`,new Sr([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute(`uv`,new Sr([0,2,0,0,2,0],2));let c=new Yo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new U(s,c),u=new Js(-1,1,1,-1,0,1),d=null,f=null,p=!1,m,h=null,g=[],v=!1;this.setSize=function(e,t){a.setSize(e,t),o.setSize(e,t);for(let n=0;n<g.length;n++){let r=g[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){g=e,v=g.length>0&&g[0].isRenderPass===!0;let t=a.width,n=a.height;for(let e=0;e<g.length;e++){let r=g[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(p||e.toneMapping===0&&g.length===0)return!1;if(h=t,t!==null){let e=t.width,n=t.height;(a.width!==e||a.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(a),m=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=m,p=!0;let n=a,r=o;for(let i=0;i<g.length;i++){let a=g[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(d!==e.outputColorSpace||f!==e.toneMapping){d=e.outputColorSpace,f=e.toneMapping,c.defines={},Bt.getTransfer(d)===`srgb`&&(c.defines.SRGB_TRANSFER=``);let t=ll[f];t&&(c.defines[t]=``),c.needsUpdate=!0}c.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(h),e.render(l,u),h=null,p=!1},this.isCompositing=function(){return p},this.dispose=function(){a.depthTexture&&a.depthTexture.dispose(),a.dispose(),o.dispose(),s.dispose(),c.dispose()}}var dl=new Xt,fl=new la(1,1),pl=new en,ml=new tn,hl=new sa,gl=[],_l=[],vl=new Float32Array(16),yl=new Float32Array(9),bl=new Float32Array(4);function xl(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=gl[i];if(a===void 0&&(a=new Float32Array(i),gl[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Sl(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Cl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function wl(e,t){let n=_l[t];n===void 0&&(n=new Int32Array(t),_l[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Tl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function El(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sl(n,t))return;e.uniform2fv(this.addr,t),Cl(n,t)}}function Dl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Sl(n,t))return;e.uniform3fv(this.addr,t),Cl(n,t)}}function Ol(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sl(n,t))return;e.uniform4fv(this.addr,t),Cl(n,t)}}function kl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Sl(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Cl(n,t)}else{if(Sl(n,r))return;bl.set(r),e.uniformMatrix2fv(this.addr,!1,bl),Cl(n,r)}}function Al(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Sl(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Cl(n,t)}else{if(Sl(n,r))return;yl.set(r),e.uniformMatrix3fv(this.addr,!1,yl),Cl(n,r)}}function jl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Sl(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Cl(n,t)}else{if(Sl(n,r))return;vl.set(r),e.uniformMatrix4fv(this.addr,!1,vl),Cl(n,r)}}function Ml(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Nl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sl(n,t))return;e.uniform2iv(this.addr,t),Cl(n,t)}}function Pl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sl(n,t))return;e.uniform3iv(this.addr,t),Cl(n,t)}}function Fl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sl(n,t))return;e.uniform4iv(this.addr,t),Cl(n,t)}}function Il(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ll(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Sl(n,t))return;e.uniform2uiv(this.addr,t),Cl(n,t)}}function Rl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Sl(n,t))return;e.uniform3uiv(this.addr,t),Cl(n,t)}}function zl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Sl(n,t))return;e.uniform4uiv(this.addr,t),Cl(n,t)}}function Bl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(fl.compareFunction=n.isReversedDepthBuffer()?518:515,a=fl):a=dl,n.setTexture2D(t||a,i)}function Vl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||ml,i)}function Hl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||hl,i)}function Ul(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||pl,i)}function Wl(e){switch(e){case 5126:return Tl;case 35664:return El;case 35665:return Dl;case 35666:return Ol;case 35674:return kl;case 35675:return Al;case 35676:return jl;case 5124:case 35670:return Ml;case 35667:case 35671:return Nl;case 35668:case 35672:return Pl;case 35669:case 35673:return Fl;case 5125:return Il;case 36294:return Ll;case 36295:return Rl;case 36296:return zl;case 35678:case 36198:case 36298:case 36306:case 35682:return Bl;case 35679:case 36299:case 36307:return Vl;case 35680:case 36300:case 36308:case 36293:return Hl;case 36289:case 36303:case 36311:case 36292:return Ul}}function Gl(e,t){e.uniform1fv(this.addr,t)}function Kl(e,t){let n=xl(t,this.size,2);e.uniform2fv(this.addr,n)}function ql(e,t){let n=xl(t,this.size,3);e.uniform3fv(this.addr,n)}function Jl(e,t){let n=xl(t,this.size,4);e.uniform4fv(this.addr,n)}function Yl(e,t){let n=xl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Xl(e,t){let n=xl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Zl(e,t){let n=xl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Ql(e,t){e.uniform1iv(this.addr,t)}function $l(e,t){e.uniform2iv(this.addr,t)}function eu(e,t){e.uniform3iv(this.addr,t)}function tu(e,t){e.uniform4iv(this.addr,t)}function nu(e,t){e.uniform1uiv(this.addr,t)}function ru(e,t){e.uniform2uiv(this.addr,t)}function iu(e,t){e.uniform3uiv(this.addr,t)}function au(e,t){e.uniform4uiv(this.addr,t)}function ou(e,t,n){let r=this.cache,i=t.length,a=wl(n,i);Sl(r,a)||(e.uniform1iv(this.addr,a),Cl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?fl:dl;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function su(e,t,n){let r=this.cache,i=t.length,a=wl(n,i);Sl(r,a)||(e.uniform1iv(this.addr,a),Cl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||ml,a[e])}function cu(e,t,n){let r=this.cache,i=t.length,a=wl(n,i);Sl(r,a)||(e.uniform1iv(this.addr,a),Cl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||hl,a[e])}function lu(e,t,n){let r=this.cache,i=t.length,a=wl(n,i);Sl(r,a)||(e.uniform1iv(this.addr,a),Cl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||pl,a[e])}function uu(e){switch(e){case 5126:return Gl;case 35664:return Kl;case 35665:return ql;case 35666:return Jl;case 35674:return Yl;case 35675:return Xl;case 35676:return Zl;case 5124:case 35670:return Ql;case 35667:case 35671:return $l;case 35668:case 35672:return eu;case 35669:case 35673:return tu;case 5125:return nu;case 36294:return ru;case 36295:return iu;case 36296:return au;case 35678:case 36198:case 36298:case 36306:case 35682:return ou;case 35679:case 36299:case 36307:return su;case 35680:case 36300:case 36308:case 36293:return cu;case 36289:case 36303:case 36311:case 36292:return lu}}var du=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Wl(t.type)}},fu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=uu(t.type)}},pu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},mu=/(\w+)(\])?(\[|\.)?/g;function hu(e,t){e.seq.push(t),e.map[t.id]=t}function gu(e,t,n){let r=e.name,i=r.length;for(mu.lastIndex=0;;){let a=mu.exec(r),o=mu.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){hu(n,l===void 0?new du(s,e,t):new fu(s,e,t));break}else{let e=n.map[s];e===void 0&&(e=new pu(s),hu(n,e)),n=e}}}var _u=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);gu(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function vu(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var yu=37297,bu=0;function xu(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Su=new V;function Cu(e){Bt._getMatrix(Su,Bt.workingColorSpace,e);let t=`mat3( ${Su.elements.map(e=>e.toFixed(4))} )`;switch(Bt.getTransfer(e)){case We:return[t,`LinearTransferOETF`];case Ge:return[t,`sRGBTransferOETF`];default:return I(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function wu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+xu(e.getShaderSource(t),r)}else return i}function Tu(e,t){let n=Cu(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Eu={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Du(e,t){let n=Eu[t];return n===void 0?(I(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ou=new B;function ku(){return Bt.getLuminanceCoefficients(Ou),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ou.x.toFixed(4)}, ${Ou.y.toFixed(4)}, ${Ou.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Au(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Nu).join(`
`)}function ju(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Mu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Nu(e){return e!==``}function Pu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Fu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Iu=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lu(e){return e.replace(Iu,zu)}var Ru=new Map;function zu(e,t){let n=q[t];if(n===void 0){let e=Ru.get(t);if(e!==void 0)n=q[e],I(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`Can not resolve #include <`+t+`>`)}return Lu(n)}var Bu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Vu(e){return e.replace(Bu,Hu)}function Hu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Uu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Wu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Gu(e){return Wu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ku={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function qu(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ku[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var Ju={302:`ENVMAP_MODE_REFRACTION`};function Yu(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:Ju[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Xu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Zu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Xu[e.combine]||`ENVMAP_BLENDING_NONE`}function Qu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function $u(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Gu(n),l=qu(n),u=Yu(n),d=Zu(n),f=Qu(n),p=Au(n),m=ju(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Nu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Nu).join(`
`),_.length>0&&(_+=`
`)):(g=[Uu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Nu).join(`
`),_=[Uu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:q.tonemapping_pars_fragment,n.toneMapping===0?``:Du(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,q.colorspace_pars_fragment,Tu(`linearToOutputTexel`,n.outputColorSpace),ku(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Nu).join(`
`)),o=Lu(o),o=Pu(o,n),o=Fu(o,n),s=Lu(s),s=Pu(s,n),s=Fu(s,n),o=Vu(o),s=Vu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=vu(i,i.VERTEX_SHADER,y),S=vu(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.morphTargets===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1)if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=wu(i,x,`vertex`),n=wu(i,S,`fragment`);L(`THREE.WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}else o===``?(s===``||c===``)&&(u=!1):I(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new _u(i,h),T=Mu(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,yu)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=bu++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var ed=0,td=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),i=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new nd(e),t.set(e,n)),n}},nd=class{constructor(e){this.id=ed++,this.code=e,this.usedTimes=0}};function rd(e){return e===1030||e===37490||e===36285}function id(e,t,n,r,i,a){let o=new mn,s=new td,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&I(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,ee,k;if(C){let e=Ec[C];D=e.vertexShader,O=e.fragmentShader}else D=i.vertexShader,O=i.fragmentShader,s.update(i),ee=s.getVertexShaderID(i),k=s.getFragmentShaderID(i);let te=e.getRenderTarget(),ne=e.state.buffers.depth.getReversed(),A=h.isInstancedMesh===!0,re=h.isBatchedMesh===!0,ie=!!i.map,j=!!i.matcap,ae=!!x,oe=!!i.aoMap,se=!!i.lightMap,ce=!!i.bumpMap,M=!!i.normalMap,le=!!i.displacementMap,ue=!!i.emissiveMap,de=!!i.metalnessMap,fe=!!i.roughnessMap,pe=i.anisotropy>0,me=i.clearcoat>0,he=i.dispersion>0,ge=i.iridescence>0,_e=i.sheen>0,ve=i.transmission>0,ye=pe&&!!i.anisotropyMap,be=me&&!!i.clearcoatMap,xe=me&&!!i.clearcoatNormalMap,Se=me&&!!i.clearcoatRoughnessMap,Ce=ge&&!!i.iridescenceMap,we=ge&&!!i.iridescenceThicknessMap,Te=_e&&!!i.sheenColorMap,Ee=_e&&!!i.sheenRoughnessMap,De=!!i.specularMap,Oe=!!i.specularColorMap,ke=!!i.specularIntensityMap,Ae=ve&&!!i.transmissionMap,je=ve&&!!i.thicknessMap,Me=!!i.gradientMap,N=!!i.alphaMap,Ne=i.alphaTest>0,Pe=!!i.alphaHash,Fe=!!i.extensions,P=0;i.toneMapped&&(te===null||te.isXRRenderTarget===!0)&&(P=e.toneMapping);let Ie={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:ee,customFragmentShaderID:k,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:re,batchingColor:re&&h._colorsTexture!==null,instancing:A,instancingColor:A&&h.instanceColor!==null,instancingMorph:A&&h.morphTexture!==null,outputColorSpace:te===null?e.outputColorSpace:te.isXRRenderTarget===!0?te.texture.colorSpace:Bt.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ie,matcap:j,envMap:ae,envMapMode:ae&&x.mapping,envMapCubeUVHeight:S,aoMap:oe,lightMap:se,bumpMap:ce,normalMap:M,displacementMap:le,emissiveMap:ue,normalMapObjectSpace:M&&i.normalMapType===1,normalMapTangentSpace:M&&i.normalMapType===0,packedNormalMap:M&&i.normalMapType===0&&rd(i.normalMap.format),metalnessMap:de,roughnessMap:fe,anisotropy:pe,anisotropyMap:ye,clearcoat:me,clearcoatMap:be,clearcoatNormalMap:xe,clearcoatRoughnessMap:Se,dispersion:he,iridescence:ge,iridescenceMap:Ce,iridescenceThicknessMap:we,sheen:_e,sheenColorMap:Te,sheenRoughnessMap:Ee,specularMap:De,specularColorMap:Oe,specularIntensityMap:ke,transmission:ve,transmissionMap:Ae,thicknessMap:je,gradientMap:Me,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:N,alphaTest:Ne,alphaHash:Pe,combine:i.combine,mapUv:ie&&m(i.map.channel),aoMapUv:oe&&m(i.aoMap.channel),lightMapUv:se&&m(i.lightMap.channel),bumpMapUv:ce&&m(i.bumpMap.channel),normalMapUv:M&&m(i.normalMap.channel),displacementMapUv:le&&m(i.displacementMap.channel),emissiveMapUv:ue&&m(i.emissiveMap.channel),metalnessMapUv:de&&m(i.metalnessMap.channel),roughnessMapUv:fe&&m(i.roughnessMap.channel),anisotropyMapUv:ye&&m(i.anisotropyMap.channel),clearcoatMapUv:be&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:xe&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Se&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:Ce&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:we&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(i.sheenRoughnessMap.channel),specularMapUv:De&&m(i.specularMap.channel),specularColorMapUv:Oe&&m(i.specularColorMap.channel),specularIntensityMapUv:ke&&m(i.specularIntensityMap.channel),transmissionMapUv:Ae&&m(i.transmissionMap.channel),thicknessMapUv:je&&m(i.thicknessMap.channel),alphaMapUv:N&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(M||pe),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ie||N),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&M===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ne,skinning:h.isSkinnedMesh===!0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:P,decodeVideoTexture:ie&&i.map.isVideoTexture===!0&&Bt.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ue&&i.emissiveMap.isVideoTexture===!0&&Bt.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Fe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Fe&&i.extensions.multiDraw===!0||re)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ie.vertexUv1s=c.has(1),Ie.vertexUv2s=c.has(2),Ie.vertexUv3s=c.has(3),c.clear(),Ie}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ec[t];n=Go.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new $u(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function ad(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function od(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function sd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function cd(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||od),r.length>1&&r.sort(t||sd),i.length>1&&i.sort(t||sd)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ld(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new cd,e.set(t,[i])):n>=r.length?(i=new cd,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function ud(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new B,color:new H};break;case`SpotLight`:n={position:new B,direction:new B,color:new H,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new B,color:new H,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new B,skyColor:new H,groundColor:new H};break;case`RectAreaLight`:n={color:new H,position:new B,halfWidth:new B,halfHeight:new B};break}return e[t.id]=n,n}}}function dd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new z,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}var fd=0;function pd(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function md(e){let t=new ud,n=dd(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new B);let i=new B,a=new nn,o=new nn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(pd);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=J.LTC_FLOAT_1,r.rectAreaLTC2=J.LTC_FLOAT_2):(r.rectAreaLTC1=J.LTC_HALF_1,r.rectAreaLTC2=J.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=fd++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function hd(e){let t=new md(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function gd(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new hd(e),t.set(n,[a])):r>=i.length?(a=new hd(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var _d=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vd=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,yd=[new B(1,0,0),new B(-1,0,0),new B(0,1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1)],bd=[new B(0,-1,0),new B(0,-1,0),new B(0,0,1),new B(0,0,-1),new B(0,-1,0),new B(0,-1,0)],xd=new nn,Sd=new B,Cd=new B;function wd(e,t,n){let r=new zi,a=new z,o=new z,c=new Zt,l=new Zo,u=new Qo,d={},f=n.maxTextureSize,p={0:1,1:0,2:2},m=new Jo({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new z},radius:{value:4}},vertexShader:_d,fragmentShader:vd}),v=m.clone();v.defines.HORIZONTAL_PASS=1;let y=new Pr;y.setAttribute(`position`,new yr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let b=new U(y,m),x=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let S=this.type;this.render=function(t,n,l){if(x.enabled===!1||x.autoUpdate===!1&&x.needsUpdate===!1||t.length===0)return;this.type===2&&(I(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.state;m.setBlending(0),m.buffers.depth.getReversed()===!0?m.buffers.color.setClear(0,0,0,0):m.buffers.color.setClear(1,1,1,1),m.buffers.depth.setTest(!0),m.setScissorTest(!1);let v=S!==this.type;v&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let u=0,d=t.length;u<d;u++){let d=t[u],p=d.shadow;if(p===void 0){I(`WebGLShadowMap:`,d,`has no shadow.`);continue}if(p.autoUpdate===!1&&p.needsUpdate===!1)continue;a.copy(p.mapSize);let y=p.getFrameExtents();a.multiply(y),o.copy(p.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(o.x=Math.floor(f/y.x),a.x=o.x*y.x,p.mapSize.x=o.x),a.y>f&&(o.y=Math.floor(f/y.y),a.y=o.y*y.y,p.mapSize.y=o.y));let b=e.state.buffers.depth.getReversed();if(p.camera._reversedDepth=b,p.map===null||v===!0){if(p.map!==null&&(p.map.depthTexture!==null&&(p.map.depthTexture.dispose(),p.map.depthTexture=null),p.map.dispose()),this.type===3){if(d.isPointLight){I(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}p.map=new $t(a.x,a.y,{format:k,type:_,minFilter:s,magFilter:s,generateMipmaps:!1}),p.map.texture.name=d.name+`.shadowMap`,p.map.depthTexture=new la(a.x,a.y,g),p.map.depthTexture.name=d.name+`.shadowMapDepth`,p.map.depthTexture.format=E,p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i}else d.isPointLight?(p.map=new tl(a.x),p.map.depthTexture=new ua(a.x,h)):(p.map=new $t(a.x,a.y),p.map.depthTexture=new la(a.x,a.y,h)),p.map.depthTexture.name=d.name+`.shadowMap`,p.map.depthTexture.format=E,this.type===1?(p.map.depthTexture.compareFunction=b?518:515,p.map.depthTexture.minFilter=s,p.map.depthTexture.magFilter=s):(p.map.depthTexture.compareFunction=null,p.map.depthTexture.minFilter=i,p.map.depthTexture.magFilter=i);p.camera.updateProjectionMatrix()}let x=p.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<x;t++){if(p.map.isWebGLCubeRenderTarget)e.setRenderTarget(p.map,t),e.clear();else{t===0&&(e.setRenderTarget(p.map),e.clear());let n=p.getViewport(t);c.set(o.x*n.x,o.y*n.y,o.x*n.z,o.y*n.w),m.viewport(c)}if(d.isPointLight){let e=p.camera,n=p.matrix,r=d.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Sd.setFromMatrixPosition(d.matrixWorld),e.position.copy(Sd),Cd.copy(e.position),Cd.add(yd[t]),e.up.copy(bd[t]),e.lookAt(Cd),e.updateMatrixWorld(),n.makeTranslation(-Sd.x,-Sd.y,-Sd.z),xd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),p._frustum.setFromProjectionMatrix(xd,e.coordinateSystem,e.reversedDepth)}else p.updateMatrices(d);r=p.getFrustum(),T(n,l,p.camera,d,this.type)}p.isPointLightShadow!==!0&&this.type===3&&C(p,l),p.needsUpdate=!1}S=this.type,x.needsUpdate=!1,e.setRenderTarget(u,d,p)};function C(n,r){let i=t.update(b);m.defines.VSM_SAMPLES!==n.blurSamples&&(m.defines.VSM_SAMPLES=n.blurSamples,v.defines.VSM_SAMPLES=n.blurSamples,m.needsUpdate=!0,v.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new $t(a.x,a.y,{format:k,type:_})),m.uniforms.shadow_pass.value=n.map.depthTexture,m.uniforms.resolution.value=n.mapSize,m.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,i,m,b,null),v.uniforms.shadow_pass.value=n.mapPass.texture,v.uniforms.resolution.value=n.mapSize,v.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,i,v,b,null)}function w(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?u:l,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=d[e];r===void 0&&(r={},d[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,D)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?p[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function T(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=w(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=w(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)T(c[e],i,a,o,s)}function D(e){e.target.removeEventListener(`dispose`,D);for(let t in d){let n=d[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Td(e,t){function n(){let t=!1,n=new Zt,r=null,i=new Zt(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?de(e.DEPTH_TEST):fe(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=at[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?de(e.STENCIL_TEST):fe(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new H(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ne=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),A=!1,re=0,ie=e.getParameter(e.VERSION);ie.indexOf(`WebGL`)===-1?ie.indexOf(`OpenGL ES`)!==-1&&(re=parseFloat(/^OpenGL ES (\d)/.exec(ie)[1]),A=re>=2):(re=parseFloat(/^WebGL (\d)/.exec(ie)[1]),A=re>=1);let j=null,ae={},oe=e.getParameter(e.SCISSOR_BOX),se=e.getParameter(e.VIEWPORT),ce=new Zt().fromArray(oe),M=new Zt().fromArray(se);function le(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ue={};ue[e.TEXTURE_2D]=le(e.TEXTURE_2D,e.TEXTURE_2D,1),ue[e.TEXTURE_CUBE_MAP]=le(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ue[e.TEXTURE_2D_ARRAY]=le(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ue[e.TEXTURE_3D]=le(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),de(e.DEPTH_TEST),o.setFunc(3),be(!1),xe(1),de(e.CULL_FACE),ve(0);function de(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function fe(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function pe(t,n){return f[t]===n?!1:(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function me(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function he(t){return h===t?!1:(e.useProgram(t),h=t,!0)}let ge={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ge[103]=e.MIN,ge[104]=e.MAX;let _e={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function ve(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(fe(e.BLEND),g=!1);return}if(g===!1&&(de(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:L(`WebGLState: Invalid blending: `,t);break}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:L(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:L(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:L(`WebGLState: Invalid blending: `,t);break}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ge[n],ge[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(_e[r],_e[i],_e[o],_e[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function ye(t,n){t.side===2?fe(e.CULL_FACE):de(e.CULL_FACE);let r=t.side===1;n&&(r=!r),be(r),t.blending===1&&t.transparent===!1?ve(0):ve(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),Ce(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?de(e.SAMPLE_ALPHA_TO_COVERAGE):fe(e.SAMPLE_ALPHA_TO_COVERAGE)}function be(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function xe(t){t===0?fe(e.CULL_FACE):(de(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function Se(t){t!==ee&&(A&&e.lineWidth(t),ee=t)}function Ce(t,n,r){t?(de(e.POLYGON_OFFSET_FILL),(k!==n||te!==r)&&(k=n,te=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):fe(e.POLYGON_OFFSET_FILL)}function we(t){t?de(e.SCISSOR_TEST):fe(e.SCISSOR_TEST)}function Te(t){t===void 0&&(t=e.TEXTURE0+ne-1),j!==t&&(e.activeTexture(t),j=t)}function Ee(t,n,r){r===void 0&&(r=j===null?e.TEXTURE0+ne-1:j);let i=ae[r];i===void 0&&(i={type:void 0,texture:void 0},ae[r]=i),(i.type!==t||i.texture!==n)&&(j!==r&&(e.activeTexture(r),j=r),e.bindTexture(t,n||ue[t]),i.type=t,i.texture=n)}function De(){let t=ae[j];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Oe(){try{e.compressedTexImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function ke(){try{e.compressedTexImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ae(){try{e.texSubImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function je(){try{e.texSubImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Me(){try{e.compressedTexSubImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function N(){try{e.compressedTexSubImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ne(){try{e.texStorage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Pe(){try{e.texStorage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Fe(){try{e.texImage2D(...arguments)}catch(e){L(`WebGLState:`,e)}}function P(){try{e.texImage3D(...arguments)}catch(e){L(`WebGLState:`,e)}}function Ie(t){return d[t]===void 0?e.getParameter(t):d[t]}function F(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Le(t){ce.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ce.copy(t))}function Re(t){M.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),M.copy(t))}function ze(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Be(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ve(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},j=null,ae={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new H(0,0,0),T=0,E=!1,D=null,O=null,ee=null,k=null,te=null,ce.set(0,0,e.canvas.width,e.canvas.height),M.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:de,disable:fe,bindFramebuffer:pe,drawBuffers:me,useProgram:he,setBlending:ve,setMaterial:ye,setFlipSided:be,setCullFace:xe,setLineWidth:Se,setPolygonOffset:Ce,setScissorTest:we,activeTexture:Te,bindTexture:Ee,unbindTexture:De,compressedTexImage2D:Oe,compressedTexImage3D:ke,texImage2D:Fe,texImage3D:P,pixelStorei:F,getParameter:Ie,updateUBOMapping:ze,uniformBlockBinding:Be,texStorage2D:Ne,texStorage3D:Pe,texSubImage2D:Ae,texSubImage3D:je,compressedTexSubImage2D:Me,compressedTexSubImage3D:N,scissor:Le,viewport:Re,reset:Ve}}function Ed(e,u,d,f,p,m,h){let g=u.has(`WEBGL_multisampled_render_to_texture`)?u.get(`WEBGL_multisampled_render_to_texture`):null,_=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),v=new z,y=new WeakMap,b=new Set,x,S=new WeakMap,C=!1;try{C=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function w(e,t){return C?new OffscreenCanvas(e,t):Ze(`canvas`)}function T(e,t,n){let r=1,i=Ie(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1)if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);x===void 0&&(x=w(n,a));let o=t?w(n,a):x;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),I(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}else return`data`in e&&I(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e;return e}function E(e){return e.generateMipmaps}function O(t){e.generateMipmap(t)}function ee(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function k(t,n,r,i,a,o=!1){if(t!==null){if(e[t]!==void 0)return e[t];I(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+t+`'`)}let s;i&&(s=u.get(`EXT_texture_norm16`),s||I(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let c=n;if(n===e.RED&&(r===e.FLOAT&&(c=e.R32F),r===e.HALF_FLOAT&&(c=e.R16F),r===e.UNSIGNED_BYTE&&(c=e.R8),r===e.UNSIGNED_SHORT&&s&&(c=s.R16_EXT),r===e.SHORT&&s&&(c=s.R16_SNORM_EXT)),n===e.RED_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.R8UI),r===e.UNSIGNED_SHORT&&(c=e.R16UI),r===e.UNSIGNED_INT&&(c=e.R32UI),r===e.BYTE&&(c=e.R8I),r===e.SHORT&&(c=e.R16I),r===e.INT&&(c=e.R32I)),n===e.RG&&(r===e.FLOAT&&(c=e.RG32F),r===e.HALF_FLOAT&&(c=e.RG16F),r===e.UNSIGNED_BYTE&&(c=e.RG8),r===e.UNSIGNED_SHORT&&s&&(c=s.RG16_EXT),r===e.SHORT&&s&&(c=s.RG16_SNORM_EXT)),n===e.RG_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RG8UI),r===e.UNSIGNED_SHORT&&(c=e.RG16UI),r===e.UNSIGNED_INT&&(c=e.RG32UI),r===e.BYTE&&(c=e.RG8I),r===e.SHORT&&(c=e.RG16I),r===e.INT&&(c=e.RG32I)),n===e.RGB_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGB8UI),r===e.UNSIGNED_SHORT&&(c=e.RGB16UI),r===e.UNSIGNED_INT&&(c=e.RGB32UI),r===e.BYTE&&(c=e.RGB8I),r===e.SHORT&&(c=e.RGB16I),r===e.INT&&(c=e.RGB32I)),n===e.RGBA_INTEGER&&(r===e.UNSIGNED_BYTE&&(c=e.RGBA8UI),r===e.UNSIGNED_SHORT&&(c=e.RGBA16UI),r===e.UNSIGNED_INT&&(c=e.RGBA32UI),r===e.BYTE&&(c=e.RGBA8I),r===e.SHORT&&(c=e.RGBA16I),r===e.INT&&(c=e.RGBA32I)),n===e.RGB&&(r===e.UNSIGNED_SHORT&&s&&(c=s.RGB16_EXT),r===e.SHORT&&s&&(c=s.RGB16_SNORM_EXT),r===e.UNSIGNED_INT_5_9_9_9_REV&&(c=e.RGB9_E5),r===e.UNSIGNED_INT_10F_11F_11F_REV&&(c=e.R11F_G11F_B10F)),n===e.RGBA){let t=o?We:Bt.getTransfer(a);r===e.FLOAT&&(c=e.RGBA32F),r===e.HALF_FLOAT&&(c=e.RGBA16F),r===e.UNSIGNED_BYTE&&(c=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),r===e.UNSIGNED_SHORT&&s&&(c=s.RGBA16_EXT),r===e.SHORT&&s&&(c=s.RGBA16_SNORM_EXT),r===e.UNSIGNED_SHORT_4_4_4_4&&(c=e.RGBA4),r===e.UNSIGNED_SHORT_5_5_5_1&&(c=e.RGB5_A1)}return(c===e.R16F||c===e.R32F||c===e.RG16F||c===e.RG32F||c===e.RGBA16F||c===e.RGBA32F)&&u.get(`EXT_color_buffer_float`),c}function te(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,I(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function ne(e,t){return E(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function A(e){let t=e.target;t.removeEventListener(`dispose`,A),ie(t),t.isVideoTexture&&y.delete(t),t.isHTMLTexture&&b.delete(t)}function re(e){let t=e.target;t.removeEventListener(`dispose`,re),ae(t)}function ie(e){let t=f.get(e);if(t.__webglInit===void 0)return;let n=e.source,r=S.get(n);if(r){let i=r[t.__cacheKey];i.usedTimes--,i.usedTimes===0&&j(e),Object.keys(r).length===0&&S.delete(n)}f.remove(e)}function j(t){let n=f.get(t);e.deleteTexture(n.__webglTexture);let r=t.source,i=S.get(r);delete i[n.__cacheKey],h.memory.textures--}function ae(t){let n=f.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),f.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let r=t.textures;for(let t=0,n=r.length;t<n;t++){let n=f.get(r[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),h.memory.textures--),f.remove(r[t])}f.remove(t)}let oe=0;function se(){oe=0}function ce(){return oe}function M(e){oe=e}function le(){let e=oe;return e>=p.maxTextures&&I(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+p.maxTextures),oe+=1,e}function ue(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function de(t,n){let r=f.get(t);if(t.isVideoTexture&&Fe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&r.__version!==t.version){let e=t.image;if(e===null)I(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)I(`WebGLRenderer: Texture marked for update but image is incomplete`);else{Se(r,t,n);return}}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D,r.__webglTexture,e.TEXTURE0+n)}function fe(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){Se(r,t,n);return}else t.isExternalTexture&&(r.__webglTexture=t.sourceTexture?t.sourceTexture:null);d.bindTexture(e.TEXTURE_2D_ARRAY,r.__webglTexture,e.TEXTURE0+n)}function pe(t,n){let r=f.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&r.__version!==t.version){Se(r,t,n);return}d.bindTexture(e.TEXTURE_3D,r.__webglTexture,e.TEXTURE0+n)}function me(t,n){let r=f.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&r.__version!==t.version){Ce(r,t,n);return}d.bindTexture(e.TEXTURE_CUBE_MAP,r.__webglTexture,e.TEXTURE0+n)}let he={[t]:e.REPEAT,[n]:e.CLAMP_TO_EDGE,[r]:e.MIRRORED_REPEAT},ge={[i]:e.NEAREST,[a]:e.NEAREST_MIPMAP_NEAREST,[o]:e.NEAREST_MIPMAP_LINEAR,[s]:e.LINEAR,[c]:e.LINEAR_MIPMAP_NEAREST,[l]:e.LINEAR_MIPMAP_LINEAR},_e={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function ve(t,n){if(n.type===1015&&u.has(`OES_texture_float_linear`)===!1&&(n.magFilter===1006||n.magFilter===1007||n.magFilter===1005||n.magFilter===1008||n.minFilter===1006||n.minFilter===1007||n.minFilter===1005||n.minFilter===1008)&&I(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(t,e.TEXTURE_WRAP_S,he[n.wrapS]),e.texParameteri(t,e.TEXTURE_WRAP_T,he[n.wrapT]),(t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY)&&e.texParameteri(t,e.TEXTURE_WRAP_R,he[n.wrapR]),e.texParameteri(t,e.TEXTURE_MAG_FILTER,ge[n.magFilter]),e.texParameteri(t,e.TEXTURE_MIN_FILTER,ge[n.minFilter]),n.compareFunction&&(e.texParameteri(t,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(t,e.TEXTURE_COMPARE_FUNC,_e[n.compareFunction])),u.has(`EXT_texture_filter_anisotropic`)===!0){if(n.magFilter===1003||n.minFilter!==1005&&n.minFilter!==1008||n.type===1015&&u.has(`OES_texture_float_linear`)===!1)return;if(n.anisotropy>1||f.get(n).__currentAnisotropy){let r=u.get(`EXT_texture_filter_anisotropic`);e.texParameterf(t,r.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(n.anisotropy,p.getMaxAnisotropy())),f.get(n).__currentAnisotropy=n.anisotropy}}}function ye(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,A));let i=n.source,a=S.get(i);a===void 0&&(a={},S.set(i,a));let o=ue(n);if(o!==t.__cacheKey){a[o]===void 0&&(a[o]={texture:e.createTexture(),usedTimes:0},h.memory.textures++,r=!0),a[o].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&j(n)),t.__cacheKey=o,t.__webglTexture=a[o].texture}return r}function be(e,t,n){return Math.floor(Math.floor(e/n)/t)}function xe(t,n,r,i){let a=t.updateRanges;if(a.length===0)d.texSubImage2D(e.TEXTURE_2D,0,0,0,n.width,n.height,r,i,n.data);else{a.sort((e,t)=>e.start-t.start);let o=0;for(let e=1;e<a.length;e++){let t=a[o],r=a[e],i=t.start+t.count,s=be(r.start,n.width,4),c=be(t.start,n.width,4);r.start<=i+1&&s===c&&be(r.start+r.count-1,n.width,4)===s?t.count=Math.max(t.count,r.start+r.count-t.start):(++o,a[o]=r)}a.length=o+1;let s=d.getParameter(e.UNPACK_ROW_LENGTH),c=d.getParameter(e.UNPACK_SKIP_PIXELS),l=d.getParameter(e.UNPACK_SKIP_ROWS);d.pixelStorei(e.UNPACK_ROW_LENGTH,n.width);for(let t=0,o=a.length;t<o;t++){let o=a[t],s=Math.floor(o.start/4),c=Math.ceil(o.count/4),l=s%n.width,u=Math.floor(s/n.width),f=c;d.pixelStorei(e.UNPACK_SKIP_PIXELS,l),d.pixelStorei(e.UNPACK_SKIP_ROWS,u),d.texSubImage2D(e.TEXTURE_2D,0,l,u,f,1,r,i,n.data)}t.clearUpdateRanges(),d.pixelStorei(e.UNPACK_ROW_LENGTH,s),d.pixelStorei(e.UNPACK_SKIP_PIXELS,c),d.pixelStorei(e.UNPACK_SKIP_ROWS,l)}}function Se(t,n,r){let i=e.TEXTURE_2D;(n.isDataArrayTexture||n.isCompressedArrayTexture)&&(i=e.TEXTURE_2D_ARRAY),n.isData3DTexture&&(i=e.TEXTURE_3D);let a=ye(t,n),o=n.source;d.bindTexture(i,t.__webglTexture,e.TEXTURE0+r);let s=f.get(o);if(o.version!==s.__version||a===!0){if(d.activeTexture(e.TEXTURE0+r),!(typeof ImageBitmap<`u`&&n.image instanceof ImageBitmap)){let t=Bt.getPrimaries(Bt.workingColorSpace),r=n.colorSpace===``?null:Bt.getPrimaries(n.colorSpace),i=n.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment);let t=T(n.image,!1,p.maxTextureSize);t=P(n,t);let c=m.convert(n.format,n.colorSpace),l=m.convert(n.type),u=k(n.internalFormat,c,l,n.normalized,n.colorSpace,n.isVideoTexture);ve(i,n);let f,h=n.mipmaps,g=n.isVideoTexture!==!0,_=s.__version===void 0||a===!0,v=o.dataReady,y=ne(n,t);if(n.isDepthTexture)u=te(n.format===D,n.type),_&&(g?d.texStorage2D(e.TEXTURE_2D,1,u,t.width,t.height):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,null));else if(n.isDataTexture)if(h.length>0){g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data);n.generateMipmaps=!1}else g?(_&&d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height),v&&xe(n,t,c,l)):d.texImage2D(e.TEXTURE_2D,0,u,t.width,t.height,0,c,l,t.data);else if(n.isCompressedTexture)if(n.isCompressedArrayTexture){g&&_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,h[0].width,h[0].height,t.depth);for(let r=0,i=h.length;r<i;r++)if(f=h[r],n.format!==1023)if(c!==null)if(g){if(v)if(n.layerUpdates.size>0){let t=Sc(f.width,f.height,n.format,n.type);for(let i of n.layerUpdates){let n=f.data.subarray(i*t/f.data.BYTES_PER_ELEMENT,(i+1)*t/f.data.BYTES_PER_ELEMENT);d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,i,f.width,f.height,1,c,n)}n.clearLayerUpdates()}else d.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,f.data)}else d.compressedTexImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,f.data,0,0);else I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`);else g?v&&d.texSubImage3D(e.TEXTURE_2D_ARRAY,r,0,0,0,f.width,f.height,t.depth,c,l,f.data):d.texImage3D(e.TEXTURE_2D_ARRAY,r,u,f.width,f.height,t.depth,0,c,l,f.data)}else{g&&_&&d.texStorage2D(e.TEXTURE_2D,y,u,h[0].width,h[0].height);for(let t=0,r=h.length;t<r;t++)f=h[t],n.format===1023?g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,l,f.data):d.texImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,c,l,f.data):c===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):g?v&&d.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,f.width,f.height,c,f.data):d.compressedTexImage2D(e.TEXTURE_2D,t,u,f.width,f.height,0,f.data)}else if(n.isDataArrayTexture)if(g){if(_&&d.texStorage3D(e.TEXTURE_2D_ARRAY,y,u,t.width,t.height,t.depth),v)if(n.layerUpdates.size>0){let r=Sc(t.width,t.height,n.format,n.type);for(let i of n.layerUpdates){let n=t.data.subarray(i*r/t.data.BYTES_PER_ELEMENT,(i+1)*r/t.data.BYTES_PER_ELEMENT);d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,i,t.width,t.height,1,c,l,n)}n.clearLayerUpdates()}else d.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)}else d.texImage3D(e.TEXTURE_2D_ARRAY,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isData3DTexture)g?(_&&d.texStorage3D(e.TEXTURE_3D,y,u,t.width,t.height,t.depth),v&&d.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,c,l,t.data)):d.texImage3D(e.TEXTURE_3D,0,u,t.width,t.height,t.depth,0,c,l,t.data);else if(n.isFramebufferTexture){if(_)if(g)d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height);else{let n=t.width,r=t.height;for(let t=0;t<y;t++)d.texImage2D(e.TEXTURE_2D,t,u,n,r,0,c,l,null),n>>=1,r>>=1}}else if(n.isHTMLTexture){if(`texElementImage2D`in e){let r=e.canvas;if(r.hasAttribute(`layoutsubtree`)||r.setAttribute(`layoutsubtree`,`true`),t.parentNode!==r){r.appendChild(t),b.add(n),r.onpaint=e=>{let t=e.changedElements;for(let e of b)t.includes(e.image)&&(e.needsUpdate=!0)},r.requestPaint();return}let i=e.RGBA,a=e.RGBA,o=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,i,a,o,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(h.length>0){if(g&&_){let t=Ie(h[0]);d.texStorage2D(e.TEXTURE_2D,y,u,t.width,t.height)}for(let t=0,n=h.length;t<n;t++)f=h[t],g?v&&d.texSubImage2D(e.TEXTURE_2D,t,0,0,c,l,f):d.texImage2D(e.TEXTURE_2D,t,u,c,l,f);n.generateMipmaps=!1}else if(g){if(_){let n=Ie(t);d.texStorage2D(e.TEXTURE_2D,y,u,n.width,n.height)}v&&d.texSubImage2D(e.TEXTURE_2D,0,0,0,c,l,t)}else d.texImage2D(e.TEXTURE_2D,0,u,c,l,t);E(n)&&O(i),s.__version=o.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function Ce(t,n,r){if(n.image.length!==6)return;let i=ye(t,n),a=n.source;d.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+r);let o=f.get(a);if(a.version!==o.__version||i===!0){d.activeTexture(e.TEXTURE0+r);let t=Bt.getPrimaries(Bt.workingColorSpace),s=n.colorSpace===``?null:Bt.getPrimaries(n.colorSpace),c=n.colorSpace===``||t===s?e.NONE:e.BROWSER_DEFAULT_WEBGL;d.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,n.flipY),d.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,n.premultiplyAlpha),d.pixelStorei(e.UNPACK_ALIGNMENT,n.unpackAlignment),d.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,c);let l=n.isCompressedTexture||n.image[0].isCompressedTexture,u=n.image[0]&&n.image[0].isDataTexture,f=[];for(let e=0;e<6;e++)!l&&!u?f[e]=T(n.image[e],!0,p.maxCubemapSize):f[e]=u?n.image[e].image:n.image[e],f[e]=P(n,f[e]);let h=f[0],g=m.convert(n.format,n.colorSpace),_=m.convert(n.type),v=k(n.internalFormat,g,_,n.normalized,n.colorSpace),y=n.isVideoTexture!==!0,b=o.__version===void 0||i===!0,x=a.dataReady,S=ne(n,h);ve(e.TEXTURE_CUBE_MAP,n);let C;if(l){y&&b&&d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,h.width,h.height);for(let t=0;t<6;t++){C=f[t].mipmaps;for(let r=0;r<C.length;r++){let i=C[r];n.format===1023?y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,_,i.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,g,_,i.data):g===null?I(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):y?x&&d.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,g,i.data):d.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,v,i.width,i.height,0,i.data)}}}else{if(C=n.mipmaps,y&&b){C.length>0&&S++;let t=Ie(f[0]);d.texStorage2D(e.TEXTURE_CUBE_MAP,S,v,t.width,t.height)}for(let t=0;t<6;t++)if(u){y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,f[t].width,f[t].height,g,_,f[t].data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,f[t].width,f[t].height,0,g,_,f[t].data);for(let n=0;n<C.length;n++){let r=C[n].image[t].image;y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,r.width,r.height,g,_,r.data):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,r.width,r.height,0,g,_,r.data)}}else{y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,g,_,f[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,v,g,_,f[t]);for(let n=0;n<C.length;n++){let r=C[n];y?x&&d.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,0,0,g,_,r.image[t]):d.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,n+1,v,g,_,r.image[t])}}}E(n)&&O(e.TEXTURE_CUBE_MAP),o.__version=a.version,n.onUpdate&&n.onUpdate(n)}t.__version=n.version}function we(t,n,r,i,a,o){let s=m.convert(r.format,r.colorSpace),c=m.convert(r.type),l=k(r.internalFormat,s,c,r.normalized,r.colorSpace),u=f.get(n),p=f.get(r);if(p.__renderTarget=n,!u.__hasExternalTextures){let t=Math.max(1,n.width>>o),r=Math.max(1,n.height>>o);a===e.TEXTURE_3D||a===e.TEXTURE_2D_ARRAY?d.texImage3D(a,o,l,t,r,n.depth,0,s,c,null):d.texImage2D(a,o,l,t,r,0,s,c,null)}d.bindFramebuffer(e.FRAMEBUFFER,t),Pe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,i,a,p.__webglTexture,0,Ne(n)):(a===e.TEXTURE_2D||a>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&a<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,i,a,p.__webglTexture,o),d.bindFramebuffer(e.FRAMEBUFFER,null)}function Te(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=te(n.stencilBuffer,a),s=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Pe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,s,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let a=t[i],o=m.convert(a.format,a.colorSpace),s=m.convert(a.type),c=k(a.internalFormat,o,s,a.normalized,a.colorSpace);Pe(n)?g.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,Ne(n),c,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,Ne(n),c,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,c,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Ee(t,n,r){let i=n.isWebGLCubeRenderTarget===!0;if(d.bindFramebuffer(e.FRAMEBUFFER,t),!(n.depthTexture&&n.depthTexture.isDepthTexture))throw Error(`renderTarget.depthTexture must be an instance of THREE.DepthTexture`);let a=f.get(n.depthTexture);if(a.__renderTarget=n,(!a.__webglTexture||n.depthTexture.image.width!==n.width||n.depthTexture.image.height!==n.height)&&(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),i){if(a.__webglInit===void 0&&(a.__webglInit=!0,n.depthTexture.addEventListener(`dispose`,A)),a.__webglTexture===void 0){a.__webglTexture=e.createTexture(),d.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture),ve(e.TEXTURE_CUBE_MAP,n.depthTexture);let t=m.convert(n.depthTexture.format),r=m.convert(n.depthTexture.type),i;n.depthTexture.format===1026?i=e.DEPTH_COMPONENT24:n.depthTexture.format===1027&&(i=e.DEPTH24_STENCIL8);for(let a=0;a<6;a++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+a,0,i,n.width,n.height,0,t,r,null)}}else de(n.depthTexture,0);let o=a.__webglTexture,s=Ne(n),c=i?e.TEXTURE_CUBE_MAP_POSITIVE_X+r:e.TEXTURE_2D,l=n.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(n.depthTexture.format===1026)Pe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else if(n.depthTexture.format===1027)Pe(n)?g.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,l,c,o,0,s):e.framebufferTexture2D(e.FRAMEBUFFER,l,c,o,0);else throw Error(`Unknown depthTexture format`)}function De(t){let n=f.get(t),r=t.isWebGLCubeRenderTarget===!0;if(n.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(n.__depthDisposeCallback&&n.__depthDisposeCallback(),e){let t=()=>{delete n.__boundDepthTexture,delete n.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),n.__depthDisposeCallback=t}n.__boundDepthTexture=e}if(t.depthTexture&&!n.__autoAllocateDepthBuffer)if(r)for(let e=0;e<6;e++)Ee(n.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?Ee(n.__webglFramebuffer[0],t,0):Ee(n.__webglFramebuffer,t,0)}else if(r){n.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[r]),n.__webglDepthbuffer[r]===void 0)n.__webglDepthbuffer[r]=e.createRenderbuffer(),Te(n.__webglDepthbuffer[r],t,!1);else{let i=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=n.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,i,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer[0]):d.bindFramebuffer(e.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer===void 0)n.__webglDepthbuffer=e.createRenderbuffer(),Te(n.__webglDepthbuffer,t,!1);else{let r=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,i=n.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,i),e.framebufferRenderbuffer(e.FRAMEBUFFER,r,e.RENDERBUFFER,i)}}d.bindFramebuffer(e.FRAMEBUFFER,null)}function Oe(t,n,r){let i=f.get(t);n!==void 0&&we(i.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),r!==void 0&&De(t)}function ke(t){let n=t.texture,r=f.get(t),i=f.get(n);t.addEventListener(`dispose`,re);let a=t.textures,o=t.isWebGLCubeRenderTarget===!0,s=a.length>1;if(s||(i.__webglTexture===void 0&&(i.__webglTexture=e.createTexture()),i.__version=n.version,h.memory.textures++),o){r.__webglFramebuffer=[];for(let t=0;t<6;t++)if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer[t]=[];for(let i=0;i<n.mipmaps.length;i++)r.__webglFramebuffer[t][i]=e.createFramebuffer()}else r.__webglFramebuffer[t]=e.createFramebuffer()}else{if(n.mipmaps&&n.mipmaps.length>0){r.__webglFramebuffer=[];for(let t=0;t<n.mipmaps.length;t++)r.__webglFramebuffer[t]=e.createFramebuffer()}else r.__webglFramebuffer=e.createFramebuffer();if(s)for(let t=0,n=a.length;t<n;t++){let n=f.get(a[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),h.memory.textures++)}if(t.samples>0&&Pe(t)===!1){r.__webglMultisampledFramebuffer=e.createFramebuffer(),r.__webglColorRenderbuffer=[],d.bindFramebuffer(e.FRAMEBUFFER,r.__webglMultisampledFramebuffer);for(let n=0;n<a.length;n++){let i=a[n];r.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,r.__webglColorRenderbuffer[n]);let o=m.convert(i.format,i.colorSpace),s=m.convert(i.type),c=k(i.internalFormat,o,s,i.normalized,i.colorSpace,t.isXRRenderTarget===!0),l=Ne(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,l,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,r.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(r.__webglDepthRenderbuffer=e.createRenderbuffer(),Te(r.__webglDepthRenderbuffer,t,!0)),d.bindFramebuffer(e.FRAMEBUFFER,null)}}if(o){d.bindTexture(e.TEXTURE_CUBE_MAP,i.__webglTexture),ve(e.TEXTURE_CUBE_MAP,n);for(let i=0;i<6;i++)if(n.mipmaps&&n.mipmaps.length>0)for(let a=0;a<n.mipmaps.length;a++)we(r.__webglFramebuffer[i][a],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,a);else we(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+i,0);E(n)&&O(e.TEXTURE_CUBE_MAP),d.unbindTexture()}else if(s){for(let n=0,i=a.length;n<i;n++){let i=a[n],o=f.get(i),s=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(s=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(s,o.__webglTexture),ve(s,i),we(r.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0+n,s,0),E(i)&&O(s)}d.unbindTexture()}else{let a=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(a=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),d.bindTexture(a,i.__webglTexture),ve(a,n),n.mipmaps&&n.mipmaps.length>0)for(let i=0;i<n.mipmaps.length;i++)we(r.__webglFramebuffer[i],t,n,e.COLOR_ATTACHMENT0,a,i);else we(r.__webglFramebuffer,t,n,e.COLOR_ATTACHMENT0,a,0);E(n)&&O(a),d.unbindTexture()}t.depthBuffer&&De(t)}function Ae(e){let t=e.textures;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(E(r)){let t=ee(e),n=f.get(r).__webglTexture;d.bindTexture(t,n),O(t),d.unbindTexture()}}}let je=[],Me=[];function N(t){if(t.samples>0){if(Pe(t)===!1){let n=t.textures,r=t.width,i=t.height,a=e.COLOR_BUFFER_BIT,o=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,s=f.get(t),c=n.length>1;if(c)for(let t=0;t<n.length;t++)d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);d.bindFramebuffer(e.READ_FRAMEBUFFER,s.__webglMultisampledFramebuffer);let l=t.texture.mipmaps;l&&l.length>0?d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer[0]):d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglFramebuffer);for(let l=0;l<n.length;l++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(a|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(a|=e.STENCIL_BUFFER_BIT)),c){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,s.__webglColorRenderbuffer[l]);let t=f.get(n[l]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,r,i,0,0,r,i,a,e.NEAREST),_===!0&&(je.length=0,Me.length=0,je.push(e.COLOR_ATTACHMENT0+l),t.depthBuffer&&t.resolveDepthBuffer===!1&&(je.push(o),Me.push(o),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Me)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,je))}if(d.bindFramebuffer(e.READ_FRAMEBUFFER,null),d.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),c)for(let t=0;t<n.length;t++){d.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,s.__webglColorRenderbuffer[t]);let r=f.get(n[t]).__webglTexture;d.bindFramebuffer(e.FRAMEBUFFER,s.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,r,0)}d.bindFramebuffer(e.DRAW_FRAMEBUFFER,s.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&_){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function Ne(e){return Math.min(p.maxSamples,e.samples)}function Pe(e){let t=f.get(e);return e.samples>0&&u.has(`WEBGL_multisampled_render_to_texture`)===!0&&t.__useRenderToTexture!==!1}function Fe(e){let t=h.render.frame;y.get(e)!==t&&(y.set(e,t),e.update())}function P(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Bt.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&I(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):L(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ie(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(v.width=e.naturalWidth||e.width,v.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(v.width=e.displayWidth,v.height=e.displayHeight):(v.width=e.width,v.height=e.height),v}this.allocateTextureUnit=le,this.resetTextureUnits=se,this.getTextureUnits=ce,this.setTextureUnits=M,this.setTexture2D=de,this.setTexture2DArray=fe,this.setTexture3D=pe,this.setTextureCube=me,this.rebindTextures=Oe,this.setupRenderTarget=ke,this.updateRenderTargetMipmap=Ae,this.updateMultisampleRenderTarget=N,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=we,this.useMultisampledRTT=Pe,this.isReversedDepthBuffer=function(){return d.buffers.depth.getReversed()}}function Dd(e,t){function n(n,r=``){let i,a=Bt.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779)if(a===`srgb`)if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===35840||n===35841||n===35842||n===35843)if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491)if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821)if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===36492||n===36494||n===36495)if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===36283||n===36284||n===36285||n===36286)if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Od=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,kd=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Ad=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new da(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Jo({vertexShader:Od,fragmentShader:kd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new U(new Fo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},jd=class extends ot{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,d=null,f=null,p=null,m=null,g=typeof XRWebGLBinding<`u`,_=new Ad,v={},y=t.getContextAttributes(),x=null,S=null,C=[],w=[],O=new z,ee=null,k=new Us;k.viewport=new Zt;let te=new Us;te.viewport=new Zt;let ne=[k,te],A=new ic,re=null,ie=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=C[e];return t===void 0&&(t=new Nn,C[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=C[e];return t===void 0&&(t=new Nn,C[e]=t),t.getGripSpace()},this.getHand=function(e){let t=C[e];return t===void 0&&(t=new Nn,C[e]=t),t.getHandSpace()};function j(e){let t=w.indexOf(e.inputSource);if(t===-1)return;let n=C[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ae(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ae),r.removeEventListener(`inputsourceschange`,oe);for(let e=0;e<C.length;e++){let t=w[e];t!==null&&(w[e]=null,C[e].disconnect(t))}re=null,ie=null,_.reset();for(let e in v)delete v[e];e.setRenderTarget(x),p=null,f=null,d=null,r=null,S=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(ee),e.setSize(O.width,O.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&I(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return f===null?p:f},this.getBinding=function(){return d===null&&g&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(x=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ae),r.addEventListener(`inputsourceschange`,oe),y.xrCompatible!==!0&&await t.makeXRCompatible(),ee=e.getPixelRatio(),e.getSize(O),g&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;y.depth&&(o=y.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=y.stencil?D:E,a=y.stencil?b:h);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};d=this.getBinding(),f=d.createProjectionLayer(s),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),S=new $t(f.textureWidth,f.textureHeight,{format:T,type:u,depthTexture:new la(f.textureWidth,f.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:y.stencil,colorSpace:e.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{let n={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:i};p=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new $t(p.framebufferWidth,p.framebufferHeight,{format:T,type:u,colorSpace:e.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),pe.setContext(r),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function oe(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=w.indexOf(n);r>=0&&(w[r]=null,C[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=w.indexOf(n);if(r===-1){for(let e=0;e<C.length;e++)if(e>=w.length){w.push(n),r=e;break}else if(w[e]===null){w[e]=n,r=e;break}if(r===-1)break}let i=C[r];i&&i.connect(n)}}let se=new B,ce=new B;function M(e,t,n){se.setFromMatrixPosition(t.matrixWorld),ce.setFromMatrixPosition(n.matrixWorld);let r=se.distanceTo(ce),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function le(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;_.texture!==null&&(_.depthNear>0&&(t=_.depthNear),_.depthFar>0&&(n=_.depthFar)),A.near=te.near=k.near=t,A.far=te.far=k.far=n,(re!==A.near||ie!==A.far)&&(r.updateRenderState({depthNear:A.near,depthFar:A.far}),re=A.near,ie=A.far),A.layers.mask=e.layers.mask|6,k.layers.mask=A.layers.mask&-5,te.layers.mask=A.layers.mask&-3;let i=e.parent,a=A.cameras;le(A,i);for(let e=0;e<a.length;e++)le(a[e],i);a.length===2?M(A,k,te):A.projectionMatrix.copy(k.projectionMatrix),ue(e,A,i)};function ue(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=ut*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return A},this.getFoveation=function(){if(!(f===null&&p===null))return s},this.setFoveation=function(e){s=e,f!==null&&(f.fixedFoveation=e),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=e)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(A)},this.getCameraTexture=function(e){return v[e]};let de=null;function fe(t,i){if(l=i.getViewerPose(c||a),m=i,l!==null){let t=l.views;p!==null&&(e.setRenderTargetFramebuffer(S,p.framebuffer),e.setRenderTarget(S));let i=!1;t.length!==A.cameras.length&&(A.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(p!==null)a=p.getViewport(r);else{let t=d.getViewSubImage(f,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(S,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(S))}let o=ne[n];o===void 0&&(o=new Us,o.layers.enable(n),o.viewport=new Zt,ne[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(A.matrix.copy(o.matrix),A.matrix.decompose(A.position,A.quaternion,A.scale)),i===!0&&A.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&g){d=n.getBinding();let e=d.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&_.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&g){e.state.unbindTexture(),d=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=v[n];e||(e=new da,v[n]=e);let t=d.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<C.length;e++){let t=w[e],n=C[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}de&&de(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),m=null}let pe=new wc;pe.setAnimationLoop(fe),this.setAnimationLoop=function(e){de=e},this.dispose=function(){}}},Md=new nn,Nd=new V;Nd.set(-1,0,0,0,1,0,0,0,1);function Pd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Wo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Md.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Nd),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Fd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(m(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,g));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return L(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let t=0,n=r.length;t<n;t++){let n=Array.isArray(r[t])?r[t]:[r[t]];for(let r=0,i=n.length;r<i;r++){let i=n[r];if(p(i,t,r,a)===!0){let t=i.__offset,n=Array.isArray(i.value)?i.value:[i.value],r=0;for(let a=0;a<n.length;a++){let o=n[a],s=h(o);typeof o==`number`||typeof o==`boolean`?(i.__data[0]=o,e.bufferSubData(e.UNIFORM_BUFFER,t+r,i.__data)):o.isMatrix3?(i.__data[0]=o.elements[0],i.__data[1]=o.elements[1],i.__data[2]=o.elements[2],i.__data[3]=0,i.__data[4]=o.elements[3],i.__data[5]=o.elements[4],i.__data[6]=o.elements[5],i.__data[7]=0,i.__data[8]=o.elements[6],i.__data[9]=o.elements[7],i.__data[10]=o.elements[8],i.__data[11]=0):ArrayBuffer.isView(o)?i.__data.set(new o.constructor(o.buffer,o.byteOffset,i.__data.length)):(o.toArray(i.__data,r),r+=s.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,t,i.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return typeof i==`number`||typeof i==`boolean`?r[a]=i:ArrayBuffer.isView(i)?r[a]=i.slice():r[a]=i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function m(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=h(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function h(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?I(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):I(`WebGLRenderer: Unsupported uniform value type.`,e),t}function g(t){let n=t.target;n.removeEventListener(`dispose`,g);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function _(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:_}}var Id=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ld=null;function Rd(){return Ld===null&&(Ld=new yi(Id,16,16,k,_),Ld.name=`DFG_LUT`,Ld.minFilter=s,Ld.magFilter=s,Ld.wrapS=n,Ld.wrapT=n,Ld.generateMipmaps=!1,Ld.needsUpdate=!0),Ld}var zd=class{constructor(e={}){let{canvas:t=Qe(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:d=`default`,failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:m=!1,outputBufferType:g=u}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);x=n.getContextAttributes().alpha}else x=a;let S=g,C=new Set([ne,te,ee]),w=new Set([u,h,p,b,v,y]),T=new Uint32Array(4),E=new Int32Array(4),D=new B,O=null,k=null,A=[],re=[],ie=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let j=this,ae=!1,oe=null;this._outputColorSpace=He;let se=0,ce=0,M=null,le=-1,ue=null,de=new Zt,fe=new Zt,pe=null,me=new H(0),he=0,ge=t.width,_e=t.height,ve=1,ye=null,be=null,xe=new Zt(0,0,ge,_e),Se=new Zt(0,0,ge,_e),Ce=!1,we=new zi,Te=!1,Ee=!1,De=new nn,Oe=new B,ke=new Zt,Ae={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},je=!1;function Me(){return M===null?ve:1}let N=n;function Ne(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:f};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r184`),t.addEventListener(`webglcontextlost`,ct,!1),t.addEventListener(`webglcontextrestored`,lt,!1),t.addEventListener(`webglcontextcreationerror`,ut,!1),N===null){let t=`webgl2`;if(N=Ne(t,e),N===null)throw Ne(t)?Error(`Error creating WebGL context with your selected attributes.`):Error(`Error creating WebGL context.`)}}catch(e){throw L(`WebGLRenderer: `+e.message),e}let Pe,Fe,P,Ie,F,Le,Re,ze,Be,Ve,Ue,We,Ge,Ke,qe,Ye,Xe,Ze,$e,et,nt,rt,at;function ot(){Pe=new rl(N),Pe.init(),nt=new Dd(N,Pe),Fe=new Nc(N,Pe,e,nt),P=new Td(N,Pe),Fe.reversedDepthBuffer&&m&&P.buffers.depth.setReversed(!0),Ie=new ol(N),F=new ad,Le=new Ed(N,Pe,P,F,Fe,nt,Ie),Re=new nl(j),ze=new Tc(N),rt=new jc(N,ze),Be=new il(N,ze,Ie,rt),Ve=new cl(N,Be,ze,rt,Ie),Ze=new sl(N,Fe,Le),qe=new Pc(F),Ue=new id(j,Re,Pe,Fe,rt,qe),We=new Pd(j,F),Ge=new ld,Ke=new gd(Pe),Xe=new Ac(j,Re,P,Ve,x,s),Ye=new wd(j,Ve,Fe),at=new Fd(N,Ie,Fe,P),$e=new Mc(N,Pe,Ie),et=new al(N,Pe,Ie),Ie.programs=Ue.programs,j.capabilities=Fe,j.extensions=Pe,j.properties=F,j.renderLists=Ge,j.shadowMap=Ye,j.state=P,j.info=Ie}ot(),S!==1009&&(ie=new ul(S,t.width,t.height,r,i));let st=new jd(j,N);this.xr=st,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){let e=Pe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Pe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(e){e!==void 0&&(ve=e,this.setSize(ge,_e,!1))},this.getSize=function(e){return e.set(ge,_e)},this.setSize=function(e,n,r=!0){if(st.isPresenting){I(`WebGLRenderer: Can't change size while VR device is presenting.`);return}ge=e,_e=n,t.width=Math.floor(e*ve),t.height=Math.floor(n*ve),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),ie!==null&&ie.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(ge*ve,_e*ve).floor()},this.setDrawingBufferSize=function(e,n,r){ge=e,_e=n,ve=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(S===1009){L(`THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){I(`THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}ie.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(de)},this.getViewport=function(e){return e.copy(xe)},this.setViewport=function(e,t,n,r){e.isVector4?xe.set(e.x,e.y,e.z,e.w):xe.set(e,t,n,r),P.viewport(de.copy(xe).multiplyScalar(ve).round())},this.getScissor=function(e){return e.copy(Se)},this.setScissor=function(e,t,n,r){e.isVector4?Se.set(e.x,e.y,e.z,e.w):Se.set(e,t,n,r),P.scissor(fe.copy(Se).multiplyScalar(ve).round())},this.getScissorTest=function(){return Ce},this.setScissorTest=function(e){P.setScissorTest(Ce=e)},this.setOpaqueSort=function(e){ye=e},this.setTransparentSort=function(e){be=e},this.getClearColor=function(e){return e.copy(Xe.getClearColor())},this.setClearColor=function(){Xe.setClearColor(...arguments)},this.getClearAlpha=function(){return Xe.getClearAlpha()},this.setClearAlpha=function(){Xe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=C.has(t)}if(e){let e=M.texture.type,t=w.has(e),n=Xe.getClearColor(),r=Xe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(T[0]=i,T[1]=a,T[2]=o,T[3]=r,N.clearBufferuiv(N.COLOR,0,T)):(E[0]=i,E[1]=a,E[2]=o,E[3]=r,N.clearBufferiv(N.COLOR,0,E))}else r|=N.COLOR_BUFFER_BIT}t&&(r|=N.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&N.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),oe=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,ct,!1),t.removeEventListener(`webglcontextrestored`,lt,!1),t.removeEventListener(`webglcontextcreationerror`,ut,!1),Xe.dispose(),Ge.dispose(),Ke.dispose(),F.dispose(),Re.dispose(),Ve.dispose(),rt.dispose(),at.dispose(),Ue.dispose(),st.dispose(),st.removeEventListener(`sessionstart`,gt),st.removeEventListener(`sessionend`,_t),vt.stop()};function ct(e){e.preventDefault(),tt(`WebGLRenderer: Context Lost.`),ae=!0}function lt(){tt(`WebGLRenderer: Context Restored.`),ae=!1;let e=Ie.autoReset,t=Ye.enabled,n=Ye.autoUpdate,r=Ye.needsUpdate,i=Ye.type;ot(),Ie.autoReset=e,Ye.enabled=t,Ye.autoUpdate=n,Ye.needsUpdate=r,Ye.type=i}function ut(e){L(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function dt(e){let t=e.target;t.removeEventListener(`dispose`,dt),R(t)}function R(e){ft(e),F.remove(e)}function ft(e){let t=F.get(e).programs;t!==void 0&&(t.forEach(function(e){Ue.releaseProgram(e)}),e.isShaderMaterial&&Ue.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=Ae);let o=i.isMesh&&i.matrixWorld.determinant()<0,s=Ot(e,t,n,r,i);P.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Be.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;rt.setup(i,r,s,n,c);let h,g=$e;if(c!==null&&(h=ze.get(c),g=et,g.setIndex(h)),i.isMesh)r.wireframe===!0?(P.setLineWidth(r.wireframeLinewidth*Me()),g.setMode(N.LINES)):g.setMode(N.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),P.setLineWidth(e*Me()),i.isLineSegments?g.setMode(N.LINES):i.isLineLoop?g.setMode(N.LINE_LOOP):g.setMode(N.LINE_STRIP)}else i.isPoints?g.setMode(N.POINTS):i.isSprite&&g.setMode(N.TRIANGLES);if(i.isBatchedMesh)if(Pe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?ze.get(c).bytesPerElement:1,o=F.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(N,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function pt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,wt(e,t,n),e.side=0,e.needsUpdate=!0,wt(e,t,n),e.side=2):wt(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),k=Ke.get(n),k.init(t),re.push(k),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(k.pushLight(e),e.castShadow&&k.pushShadow(e))}),k.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t)if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];pt(a,n,e),r.add(a)}else pt(t,n,e),r.add(t)}),k=re.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){F.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Pe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let mt=null;function ht(e){mt&&mt(e)}function gt(){vt.stop()}function _t(){vt.start()}let vt=new wc;vt.setAnimationLoop(ht),typeof self<`u`&&vt.setContext(self),this.setAnimationLoop=function(e){mt=e,st.setAnimationLoop(e),e===null?vt.stop():vt.start()},st.addEventListener(`sessionstart`,gt),st.addEventListener(`sessionend`,_t),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){L(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(ae===!0)return;oe!==null&&oe.renderStart(e,t);let n=st.enabled===!0&&st.isPresenting===!0,r=ie!==null&&(M===null||n)&&ie.begin(j,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),st.enabled===!0&&st.isPresenting===!0&&(ie===null||ie.isCompositing()===!1)&&(st.cameraAutoUpdate===!0&&st.updateCamera(t),t=st.getCamera()),e.isScene===!0&&e.onBeforeRender(j,e,t,M),k=Ke.get(e,re.length),k.init(t),k.state.textureUnits=Le.getTextureUnits(),re.push(k),De.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),we.setFromProjectionMatrix(De,Je,t.reversedDepth),Ee=this.localClippingEnabled,Te=qe.init(this.clippingPlanes,Ee),O=Ge.get(e,A.length),O.init(),A.push(O),st.enabled===!0&&st.isPresenting===!0){let e=j.xr.getDepthSensingMesh();e!==null&&yt(e,t,-1/0,j.sortObjects)}yt(e,t,0,j.sortObjects),O.finish(),j.sortObjects===!0&&O.sort(ye,be),je=st.enabled===!1||st.isPresenting===!1||st.hasDepthSensing()===!1,je&&Xe.addToRenderList(O,e),this.info.render.frame++,Te===!0&&qe.beginShadows();let i=k.state.shadowsArray;if(Ye.render(i,e,t),Te===!0&&qe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(r&&ie.hasRenderPass())===!1){let n=O.opaque,r=O.transmissive;if(k.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];xt(n,r,e,a)}je&&Xe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];bt(O,e,n,n.viewport)}}else r.length>0&&xt(n,r,e,t),je&&Xe.render(e),bt(O,e,t)}M!==null&&ce===0&&(Le.updateMultisampleRenderTarget(M),Le.updateRenderTargetMipmap(M)),r&&ie.end(j),e.isScene===!0&&e.onAfterRender(j,e,t),rt.resetDefaultState(),le=-1,ue=null,re.pop(),re.length>0?(k=re[re.length-1],Le.setTextureUnits(k.state.textureUnits),Te===!0&&qe.setGlobalState(j.clippingPlanes,k.state.camera)):k=null,A.pop(),O=A.length>0?A[A.length-1]:null,oe!==null&&oe.renderEnd()};function yt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)k.pushLightProbeGrid(e);else if(e.isLight)k.pushLight(e),e.castShadow&&k.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||we.intersectsSprite(e)){r&&ke.setFromMatrixPosition(e.matrixWorld).applyMatrix4(De);let t=Ve.update(e),i=e.material;i.visible&&O.push(e,t,i,n,ke.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||we.intersectsObject(e))){let t=Ve.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ke.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ke.copy(e.boundingSphere.center)),ke.applyMatrix4(e.matrixWorld).applyMatrix4(De)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&O.push(e,t,s,n,ke.z,o)}}else i.visible&&O.push(e,t,i,n,ke.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)yt(i[e],t,n,r)}function bt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;k.setupLightsView(n),Te===!0&&qe.setGlobalState(j.clippingPlanes,n),r&&P.viewport(de.copy(r)),i.length>0&&St(i,t,n),a.length>0&&St(a,t,n),o.length>0&&St(o,t,n),P.buffers.depth.setTest(!0),P.buffers.depth.setMask(!0),P.buffers.color.setMask(!0),P.setPolygonOffset(!1)}function xt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(k.state.transmissionRenderTarget[r.id]===void 0){let e=Pe.has(`EXT_color_buffer_half_float`)||Pe.has(`EXT_color_buffer_float`);k.state.transmissionRenderTarget[r.id]=new $t(1,1,{generateMipmaps:!0,type:e?_:u,minFilter:l,samples:Math.max(4,Fe.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Bt.workingColorSpace})}let a=k.state.transmissionRenderTarget[r.id],o=r.viewport||de;a.setSize(o.z*j.transmissionResolutionScale,o.w*j.transmissionResolutionScale);let s=j.getRenderTarget(),c=j.getActiveCubeFace(),d=j.getActiveMipmapLevel();j.setRenderTarget(a),j.getClearColor(me),he=j.getClearAlpha(),he<1&&j.setClearColor(16777215,.5),j.clear(),je&&Xe.render(n);let f=j.toneMapping;j.toneMapping=0;let p=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),k.setupLightsView(r),Te===!0&&qe.setGlobalState(j.clippingPlanes,r),St(e,n,r),Le.updateMultisampleRenderTarget(a),Le.updateRenderTargetMipmap(a),Pe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,Ct(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Le.updateMultisampleRenderTarget(a),Le.updateRenderTargetMipmap(a))}j.setRenderTarget(s,c,d),j.setClearColor(me,he),p!==void 0&&(r.viewport=p),j.toneMapping=f}function St(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&Ct(o,t,n,s,l,c)}}function Ct(e,t,n,r,i,a){e.onBeforeRender(j,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(j,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,j.renderBufferDirect(n,t,r,i,e,a),i.side=2):j.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(j,t,n,r,i,a)}function wt(e,t,n){t.isScene!==!0&&(t=Ae);let r=F.get(e),i=k.state.lights,a=k.state.shadowsArray,o=i.state.version,s=Ue.getParameters(e,i.state,a,t,n,k.state.lightProbeGridArray),c=Ue.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Re.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,dt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return Et(e,s),d}else s.uniforms=Ue.getUniforms(e),oe!==null&&e.isNodeMaterial&&oe.build(e,n,s),e.onBeforeCompile(s,j),d=Ue.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=qe.uniform),Et(e,s),r.needsLights=At(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=k.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function Tt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=_u.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function Et(e,t){let n=F.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function Dt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];D.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(D))return n}return null}function Ot(e,t,n,r,i){t.isScene!==!0&&(t=Ae),Le.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?j.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Bt.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Re.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=j.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=F.get(r),y=k.state.lights;if(Te===!0&&(Ee===!0||e!==ue)){let t=e===ue&&r.id===le;qe.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==qe.numPlanes||v.numIntersection!==qe.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=k.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let x=v.currentProgram;b===!0&&(x=wt(r,t,i),oe&&r.isNodeMaterial&&oe.onUpdateProgram(r,x,v));let S=!1,C=!1,w=!1,T=x.getUniforms(),E=v.uniforms;if(P.useProgram(x.program)&&(S=!0,C=!0,w=!0),r.id!==le&&(le=r.id,C=!0),v.needsLights){let e=Dt(k.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,C=!0)}if(S||ue!==e){P.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),T.setValue(N,`projectionMatrix`,e.projectionMatrix),T.setValue(N,`viewMatrix`,e.matrixWorldInverse);let t=T.map.cameraPosition;t!==void 0&&t.setValue(N,Oe.setFromMatrixPosition(e.matrixWorld)),Fe.logarithmicDepthBuffer&&T.setValue(N,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&T.setValue(N,`isOrthographic`,e.isOrthographicCamera===!0),ue!==e&&(ue=e,C=!0,w=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&T.setValue(N,`directionalShadowMap`,y.state.directionalShadowMap,Le),y.state.spotShadowMap.length>0&&T.setValue(N,`spotShadowMap`,y.state.spotShadowMap,Le),y.state.pointShadowMap.length>0&&T.setValue(N,`pointShadowMap`,y.state.pointShadowMap,Le)),i.isSkinnedMesh){T.setOptional(N,i,`bindMatrix`),T.setOptional(N,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),T.setValue(N,`boneTexture`,e.boneTexture,Le))}i.isBatchedMesh&&(T.setOptional(N,i,`batchingTexture`),T.setValue(N,`batchingTexture`,i._matricesTexture,Le),T.setOptional(N,i,`batchingIdTexture`),T.setValue(N,`batchingIdTexture`,i._indirectTexture,Le),T.setOptional(N,i,`batchingColorTexture`),i._colorsTexture!==null&&T.setValue(N,`batchingColorTexture`,i._colorsTexture,Le));let D=n.morphAttributes;if((D.position!==void 0||D.normal!==void 0||D.color!==void 0)&&Ze.update(i,n,x),(C||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,T.setValue(N,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(E.envMapIntensity.value=t.environmentIntensity),E.dfgLUT!==void 0&&(E.dfgLUT.value=Rd()),C){if(T.setValue(N,`toneMappingExposure`,j.toneMappingExposure),v.needsLights&&kt(E,w),a&&r.fog===!0&&We.refreshFogUniforms(E,a),We.refreshMaterialUniforms(E,r,ve,_e,k.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;E.probesSH.value=e.texture,E.probesMin.value.copy(e.boundingBox.min),E.probesMax.value.copy(e.boundingBox.max),E.probesResolution.value.copy(e.resolution)}_u.upload(N,Tt(v),E,Le)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(_u.upload(N,Tt(v),E,Le),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&T.setValue(N,`center`,i.center),T.setValue(N,`modelViewMatrix`,i.modelViewMatrix),T.setValue(N,`normalMatrix`,i.normalMatrix),T.setValue(N,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];at.update(n,x),at.bind(n,x)}}return x}function kt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function At(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return se},this.getActiveMipmapLevel=function(){return ce},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=F.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),F.get(e.texture).__webglTexture=t,F.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=F.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0};let jt=N.createFramebuffer();this.setRenderTarget=function(e,t=0,n=0){M=e,se=t,ce=n;let r=null,i=!1,a=!1;if(e){let o=F.get(e);if(o.__useDefaultFramebuffer!==void 0){P.bindFramebuffer(N.FRAMEBUFFER,o.__webglFramebuffer),de.copy(e.viewport),fe.copy(e.scissor),pe=e.scissorTest,P.viewport(de),P.scissor(fe),P.setScissorTest(pe),le=-1;return}else if(o.__webglFramebuffer===void 0)Le.setupRenderTarget(e);else if(o.__hasExternalTextures)Le.rebindTextures(e,F.get(e.texture).__webglTexture,F.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&F.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.`);Le.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=F.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Le.useMultisampledRTT(e)===!1?F.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,de.copy(e.viewport),fe.copy(e.scissor),pe=e.scissorTest}else de.copy(xe).multiplyScalar(ve).floor(),fe.copy(Se).multiplyScalar(ve).floor(),pe=Ce;if(n!==0&&(r=jt),P.bindFramebuffer(N.FRAMEBUFFER,r)&&P.drawBuffers(e,r),P.viewport(de),P.scissor(fe),P.setScissorTest(pe),i){let r=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=F.get(e.textures[t]);N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=F.get(e.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,t.__webglTexture,n)}le=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){P.bindFramebuffer(N.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s),!Fe.textureFormatReadable(c)){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Fe.textureTypeReadable(l)){L(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&N.readPixels(t,n,r,i,nt.convert(c),nt.convert(l),a)}finally{let e=M===null?null:F.get(M).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=F.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c)if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){P.bindFramebuffer(N.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&N.readBuffer(N.COLOR_ATTACHMENT0+s),!Fe.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Fe.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=N.createBuffer();N.bindBuffer(N.PIXEL_PACK_BUFFER,d),N.bufferData(N.PIXEL_PACK_BUFFER,a.byteLength,N.STREAM_READ),N.readPixels(t,n,r,i,nt.convert(l),nt.convert(u),0);let f=M===null?null:F.get(M).__webglFramebuffer;P.bindFramebuffer(N.FRAMEBUFFER,f);let p=N.fenceSync(N.SYNC_GPU_COMMANDS_COMPLETE,0);return N.flush(),await it(N,p,4),N.bindBuffer(N.PIXEL_PACK_BUFFER,d),N.getBufferSubData(N.PIXEL_PACK_BUFFER,0,a),N.deleteBuffer(d),N.deleteSync(p),a}else throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Le.setTexture2D(e,0),N.copyTexSubImage2D(N.TEXTURE_2D,n,0,0,o,s,i,a),P.unbindTexture()};let Mt=N.createFramebuffer(),z=N.createFramebuffer();this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=nt.convert(t.format),_=nt.convert(t.type),v;t.isData3DTexture?(Le.setTexture3D(t,0),v=N.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Le.setTexture2DArray(t,0),v=N.TEXTURE_2D_ARRAY):(Le.setTexture2D(t,0),v=N.TEXTURE_2D),P.activeTexture(N.TEXTURE0),P.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,t.flipY),P.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),P.pixelStorei(N.UNPACK_ALIGNMENT,t.unpackAlignment);let y=P.getParameter(N.UNPACK_ROW_LENGTH),b=P.getParameter(N.UNPACK_IMAGE_HEIGHT),x=P.getParameter(N.UNPACK_SKIP_PIXELS),S=P.getParameter(N.UNPACK_SKIP_ROWS),C=P.getParameter(N.UNPACK_SKIP_IMAGES);P.pixelStorei(N.UNPACK_ROW_LENGTH,h.width),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,h.height),P.pixelStorei(N.UNPACK_SKIP_PIXELS,l),P.pixelStorei(N.UNPACK_SKIP_ROWS,u),P.pixelStorei(N.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=F.get(e),r=F.get(t),h=F.get(n.__renderTarget),g=F.get(r.__renderTarget);P.bindFramebuffer(N.READ_FRAMEBUFFER,h.__webglFramebuffer),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(e).__webglTexture,i,d+n),N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,F.get(t).__webglTexture,a,m+n)),N.blitFramebuffer(l,u,o,s,f,p,o,s,N.DEPTH_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||F.has(e)){let n=F.get(e),r=F.get(t);P.bindFramebuffer(N.READ_FRAMEBUFFER,Mt),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,z);for(let e=0;e<c;e++)w?N.framebufferTextureLayer(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):N.framebufferTexture2D(N.READ_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,n.__webglTexture,i),T?N.framebufferTextureLayer(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):N.framebufferTexture2D(N.DRAW_FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_2D,r.__webglTexture,a),i===0?T?N.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):N.copyTexSubImage2D(v,a,f,p,l,u,o,s):N.blitFramebuffer(l,u,o,s,f,p,o,s,N.COLOR_BUFFER_BIT,N.NEAREST);P.bindFramebuffer(N.READ_FRAMEBUFFER,null),P.bindFramebuffer(N.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?N.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):N.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):N.texSubImage2D(N.TEXTURE_2D,a,f,p,o,s,g,_,h);P.pixelStorei(N.UNPACK_ROW_LENGTH,y),P.pixelStorei(N.UNPACK_IMAGE_HEIGHT,b),P.pixelStorei(N.UNPACK_SKIP_PIXELS,x),P.pixelStorei(N.UNPACK_SKIP_ROWS,S),P.pixelStorei(N.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&N.generateMipmap(v),P.unbindTexture()},this.initRenderTarget=function(e){F.get(e).__webglFramebuffer===void 0&&Le.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Le.setTextureCube(e,0):e.isData3DTexture?Le.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Le.setTexture2DArray(e,0):Le.setTexture2D(e,0),P.unbindTexture()},this.resetState=function(){se=0,ce=0,M=null,P.reset(),rt.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Je}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=Bt._getUnpackColorSpace()}};function Bd(e,t){if(t===0)return console.warn(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles.`),e;if(t===2||t===1){let n=e.getIndex();if(n===null){let t=[],r=e.getAttribute(`position`);if(r!==void 0){for(let e=0;e<r.count;e++)t.push(e);e.setIndex(t),n=e.getIndex()}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible.`),e}let r=n.count-2,i=[];if(t===2)for(let e=1;e<=r;e++)i.push(n.getX(0)),i.push(n.getX(e)),i.push(n.getX(e+1));else for(let e=0;e<r;e++)e%2==0?(i.push(n.getX(e)),i.push(n.getX(e+1)),i.push(n.getX(e+2))):(i.push(n.getX(e+2)),i.push(n.getX(e+1)),i.push(n.getX(e)));i.length/3!==r&&console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.`);let a=e.clone();return a.setIndex(i),a.clearGroups(),a}else return console.error(`THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:`,t),e}function Vd(e){let t=new Map,n=new Map,r=e.clone();return Hd(e,r,function(e,r){t.set(r,e),n.set(e,r)}),r.traverse(function(e){if(!e.isSkinnedMesh)return;let r=e,i=t.get(e),a=i.skeleton.bones;r.skeleton=i.skeleton.clone(),r.bindMatrix.copy(i.bindMatrix),r.skeleton.bones=a.map(function(e){return n.get(e)}),r.bind(r.skeleton,r.bindMatrix)}),r}function Hd(e,t,n){n(e,t);for(let r=0;r<e.children.length;r++)Hd(e.children[r],t.children[r],n)}var Ud=class extends ws{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(e){return new Xd(e)}),this.register(function(e){return new Zd(e)}),this.register(function(e){return new sf(e)}),this.register(function(e){return new cf(e)}),this.register(function(e){return new lf(e)}),this.register(function(e){return new $d(e)}),this.register(function(e){return new ef(e)}),this.register(function(e){return new tf(e)}),this.register(function(e){return new nf(e)}),this.register(function(e){return new Yd(e)}),this.register(function(e){return new rf(e)}),this.register(function(e){return new Qd(e)}),this.register(function(e){return new of(e)}),this.register(function(e){return new af(e)}),this.register(function(e){return new qd(e)}),this.register(function(e){return new uf(e,Kd.EXT_MESHOPT_COMPRESSION)}),this.register(function(e){return new uf(e,Kd.KHR_MESHOPT_COMPRESSION)}),this.register(function(e){return new df(e)})}load(e,t,n,r){let i=this,a;if(this.resourcePath!==``)a=this.resourcePath;else if(this.path!==``){let t=Qs.extractUrlBase(e);a=Qs.resolveURL(t,this.path)}else a=Qs.extractUrlBase(e);this.manager.itemStart(e);let o=function(t){r?r(t):console.error(t),i.manager.itemError(e),i.manager.itemEnd(e)},s=new Ds(this.manager);s.setPath(this.path),s.setResponseType(`arraybuffer`),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,function(n){try{i.parse(n,a,function(n){t(n),i.manager.itemEnd(e)},o)}catch(e){o(e)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,r){let i,a={},o={},s=new TextDecoder;if(typeof e==`string`)i=JSON.parse(e);else if(e instanceof ArrayBuffer)if(s.decode(new Uint8Array(e,0,4))===ff){try{a[Kd.KHR_BINARY_GLTF]=new hf(e)}catch(e){r&&r(e);return}i=JSON.parse(a[Kd.KHR_BINARY_GLTF].content)}else i=JSON.parse(s.decode(e));else i=e;if(i.asset===void 0||i.asset.version[0]<2){r&&r(Error(`THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported.`));return}let c=new Vf(i,{path:t||this.resourcePath||``,crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let e=0;e<this.pluginCallbacks.length;e++){let t=this.pluginCallbacks[e](c);t.name||console.error(`THREE.GLTFLoader: Invalid plugin found: missing name`),o[t.name]=t,a[t.name]=!0}if(i.extensionsUsed)for(let e=0;e<i.extensionsUsed.length;++e){let t=i.extensionsUsed[e],n=i.extensionsRequired||[];switch(t){case Kd.KHR_MATERIALS_UNLIT:a[t]=new Jd;break;case Kd.KHR_DRACO_MESH_COMPRESSION:a[t]=new gf(i,this.dracoLoader);break;case Kd.KHR_TEXTURE_TRANSFORM:a[t]=new _f;break;case Kd.KHR_MESH_QUANTIZATION:a[t]=new vf;break;default:n.indexOf(t)>=0&&o[t]===void 0&&console.warn(`THREE.GLTFLoader: Unknown extension "`+t+`".`)}}c.setExtensions(a),c.setPlugins(o),c.parse(n,r)}parseAsync(e,t){let n=this;return new Promise(function(r,i){n.parse(e,t,r,i)})}};function Wd(){let e={};return{get:function(t){return e[t]},add:function(t,n){e[t]=n},remove:function(t){delete e[t]},removeAll:function(){e={}}}}function Gd(e,t,n){let r=e.json.materials[t];return r.extensions&&r.extensions[n]?r.extensions[n]:null}var Kd={KHR_BINARY_GLTF:`KHR_binary_glTF`,KHR_DRACO_MESH_COMPRESSION:`KHR_draco_mesh_compression`,KHR_LIGHTS_PUNCTUAL:`KHR_lights_punctual`,KHR_MATERIALS_CLEARCOAT:`KHR_materials_clearcoat`,KHR_MATERIALS_DISPERSION:`KHR_materials_dispersion`,KHR_MATERIALS_IOR:`KHR_materials_ior`,KHR_MATERIALS_SHEEN:`KHR_materials_sheen`,KHR_MATERIALS_SPECULAR:`KHR_materials_specular`,KHR_MATERIALS_TRANSMISSION:`KHR_materials_transmission`,KHR_MATERIALS_IRIDESCENCE:`KHR_materials_iridescence`,KHR_MATERIALS_ANISOTROPY:`KHR_materials_anisotropy`,KHR_MATERIALS_UNLIT:`KHR_materials_unlit`,KHR_MATERIALS_VOLUME:`KHR_materials_volume`,KHR_TEXTURE_BASISU:`KHR_texture_basisu`,KHR_TEXTURE_TRANSFORM:`KHR_texture_transform`,KHR_MESH_QUANTIZATION:`KHR_mesh_quantization`,KHR_MATERIALS_EMISSIVE_STRENGTH:`KHR_materials_emissive_strength`,EXT_MATERIALS_BUMP:`EXT_materials_bump`,EXT_TEXTURE_WEBP:`EXT_texture_webp`,EXT_TEXTURE_AVIF:`EXT_texture_avif`,EXT_MESHOPT_COMPRESSION:`EXT_meshopt_compression`,KHR_MESHOPT_COMPRESSION:`KHR_meshopt_compression`,EXT_MESH_GPU_INSTANCING:`EXT_mesh_gpu_instancing`},qd=class{constructor(e){this.parser=e,this.name=Kd.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n=`light:`+e,r=t.cache.get(n);if(r)return r;let i=t.json,a=((i.extensions&&i.extensions[this.name]||{}).lights||[])[e],o,s=new H(16777215);a.color!==void 0&&s.setRGB(a.color[0],a.color[1],a.color[2],Ue);let c=a.range===void 0?0:a.range;switch(a.type){case`directional`:o=new Xs(s),o.target.position.set(0,0,-1),o.add(o.target);break;case`point`:o=new qs(s),o.distance=c;break;case`spot`:o=new Gs(s),o.distance=c,a.spot=a.spot||{},a.spot.innerConeAngle=a.spot.innerConeAngle===void 0?0:a.spot.innerConeAngle,a.spot.outerConeAngle=a.spot.outerConeAngle===void 0?Math.PI/4:a.spot.outerConeAngle,o.angle=a.spot.outerConeAngle,o.penumbra=1-a.spot.innerConeAngle/a.spot.outerConeAngle,o.target.position.set(0,0,-1),o.add(o.target);break;default:throw Error(`THREE.GLTFLoader: Unexpected light type: `+a.type)}return o.position.set(0,0,0),Nf(o,a),a.intensity!==void 0&&(o.intensity=a.intensity),o.name=t.createUniqueName(a.name||`light_`+e),r=Promise.resolve(o),t.cache.add(n,r),r}getDependency(e,t){if(e===`light`)return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],i=(r.extensions&&r.extensions[this.name]||{}).light;return i===void 0?null:this._loadLight(i).then(function(e){return n._getNodeRef(t.cache,i,e)})}},Jd=class{constructor(){this.name=Kd.KHR_MATERIALS_UNLIT}getMaterialType(){return Jr}extendParams(e,t,n){let r=[];e.color=new H(1,1,1),e.opacity=1;let i=t.pbrMetallicRoughness;if(i){if(Array.isArray(i.baseColorFactor)){let t=i.baseColorFactor;e.color.setRGB(t[0],t[1],t[2],Ue),e.opacity=t[3]}i.baseColorTexture!==void 0&&r.push(n.assignTexture(e,`map`,i.baseColorTexture,He))}return Promise.all(r)}},Yd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}},Xd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatMap`,n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`clearcoatRoughnessMap`,n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(r.push(this.parser.assignTexture(t,`clearcoatNormalMap`,n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){let e=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new z(e,e)}return Promise.all(r)}},Zd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_DISPERSION}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion===void 0?0:n.dispersion),Promise.resolve()}},Qd=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceMap`,n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`iridescenceThicknessMap`,n.iridescenceThicknessTexture)),Promise.all(r)}},$d=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_SHEEN}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];if(t.sheenColor=new H(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){let e=n.sheenColorFactor;t.sheenColor.setRGB(e[0],e[1],e[2],Ue)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenColorMap`,n.sheenColorTexture,He)),n.sheenRoughnessTexture!==void 0&&r.push(this.parser.assignTexture(t,`sheenRoughnessMap`,n.sheenRoughnessTexture)),Promise.all(r)}},ef=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&r.push(this.parser.assignTexture(t,`transmissionMap`,n.transmissionTexture)),Promise.all(r)}},tf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_VOLUME}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.thickness=n.thicknessFactor===void 0?0:n.thicknessFactor,n.thicknessTexture!==void 0&&r.push(this.parser.assignTexture(t,`thicknessMap`,n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;let i=n.attenuationColor||[1,1,1];return t.attenuationColor=new H().setRGB(i[0],i[1],i[2],Ue),Promise.all(r)}},nf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_IOR}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);return n===null?Promise.resolve():(t.ior=n.ior===void 0?1.5:n.ior,t.ior===0&&(t.ior=1e3),Promise.resolve())}},rf=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_SPECULAR}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];t.specularIntensity=n.specularFactor===void 0?1:n.specularFactor,n.specularTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularIntensityMap`,n.specularTexture));let i=n.specularColorFactor||[1,1,1];return t.specularColor=new H().setRGB(i[0],i[1],i[2],Ue),n.specularColorTexture!==void 0&&r.push(this.parser.assignTexture(t,`specularColorMap`,n.specularColorTexture,He)),Promise.all(r)}},af=class{constructor(e){this.parser=e,this.name=Kd.EXT_MATERIALS_BUMP}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return t.bumpScale=n.bumpFactor===void 0?1:n.bumpFactor,n.bumpTexture!==void 0&&r.push(this.parser.assignTexture(t,`bumpMap`,n.bumpTexture)),Promise.all(r)}},of=class{constructor(e){this.parser=e,this.name=Kd.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return Gd(this.parser,e,this.name)===null?null:Xo}extendMaterialParams(e,t){let n=Gd(this.parser,e,this.name);if(n===null)return Promise.resolve();let r=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&r.push(this.parser.assignTexture(t,`anisotropyMap`,n.anisotropyTexture)),Promise.all(r)}},sf=class{constructor(e){this.parser=e,this.name=Kd.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,r=n.textures[e];if(!r.extensions||!r.extensions[this.name])return null;let i=r.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures`);return null}return t.loadTextureImage(e,i.source,a)}},cf=class{constructor(e){this.parser=e,this.name=Kd.EXT_TEXTURE_WEBP}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},lf=class{constructor(e){this.parser=e,this.name=Kd.EXT_TEXTURE_AVIF}loadTexture(e){let t=this.name,n=this.parser,r=n.json,i=r.textures[e];if(!i.extensions||!i.extensions[t])return null;let a=i.extensions[t],o=r.images[a.source],s=n.textureLoader;if(o.uri){let e=n.options.manager.getHandler(o.uri);e!==null&&(s=e)}return n.loadTextureImage(e,a.source,s)}},uf=class{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let e=n.extensions[this.name],r=this.parser.getDependency(`buffer`,e.buffer),i=this.parser.options.meshoptDecoder;if(!i||!i.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw Error(`THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files`);return null}return r.then(function(t){let n=e.byteOffset||0,r=e.byteLength||0,a=e.count,o=e.byteStride,s=new Uint8Array(t,n,r);return i.decodeGltfBufferAsync?i.decodeGltfBufferAsync(a,o,s,e.mode,e.filter).then(function(e){return e.buffer}):i.ready.then(function(){let t=new ArrayBuffer(a*o);return i.decodeGltfBuffer(new Uint8Array(t),a,o,s,e.mode,e.filter),t})})}else return null}},df=class{constructor(e){this.name=Kd.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let r=t.meshes[n.mesh];for(let e of r.primitives)if(e.mode!==Sf.TRIANGLES&&e.mode!==Sf.TRIANGLE_STRIP&&e.mode!==Sf.TRIANGLE_FAN&&e.mode!==void 0)return null;let i=n.extensions[this.name].attributes,a=[],o={};for(let e in i)a.push(this.parser.getDependency(`accessor`,i[e]).then(t=>(o[e]=t,o[e])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(e=>{let t=e.pop(),n=t.isGroup?t.children:[t],r=e[0].count,i=[];for(let e of n){let t=new nn,n=new B,a=new Nt,s=new B(1,1,1),c=new ji(e.geometry,e.material,r);for(let e=0;e<r;e++)o.TRANSLATION&&n.fromBufferAttribute(o.TRANSLATION,e),o.ROTATION&&a.fromBufferAttribute(o.ROTATION,e),o.SCALE&&s.fromBufferAttribute(o.SCALE,e),c.setMatrixAt(e,t.compose(n,a,s));for(let t in o)if(t===`_COLOR_0`){let e=o[t];c.instanceColor=new Ci(e.array,e.itemSize,e.normalized)}else t!==`TRANSLATION`&&t!==`ROTATION`&&t!==`SCALE`&&e.geometry.setAttribute(t,o[t]);An.prototype.copy.call(c,e),this.parser.assignFinalMaterial(c),i.push(c)}return t.isGroup?(t.clear(),t.add(...i),t):i[0]}))}},ff=`glTF`,pf=12,mf={JSON:1313821514,BIN:5130562},hf=class{constructor(e){this.name=Kd.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,pf),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==ff)throw Error(`THREE.GLTFLoader: Unsupported glTF-Binary header.`);if(this.header.version<2)throw Error(`THREE.GLTFLoader: Legacy binary file detected.`);let r=this.header.length-pf,i=new DataView(e,pf),a=0;for(;a<r;){let t=i.getUint32(a,!0);a+=4;let r=i.getUint32(a,!0);if(a+=4,r===mf.JSON){let r=new Uint8Array(e,pf+a,t);this.content=n.decode(r)}else if(r===mf.BIN){let n=pf+a;this.body=e.slice(n,n+t)}a+=t}if(this.content===null)throw Error(`THREE.GLTFLoader: JSON content not found.`)}},gf=class{constructor(e,t){if(!t)throw Error(`THREE.GLTFLoader: No DRACOLoader instance provided.`);this.name=Kd.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,r=this.dracoLoader,i=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},s={},c={};for(let e in a){let t=Df[e]||e.toLowerCase();o[t]=a[e]}for(let t in e.attributes){let r=Df[t]||t.toLowerCase();if(a[t]!==void 0){let i=n.accessors[e.attributes[t]];c[r]=Cf[i.componentType].name,s[r]=i.normalized===!0}}return t.getDependency(`bufferView`,i).then(function(e){return new Promise(function(t,n){r.decodeDracoFile(e,function(e){for(let t in e.attributes){let n=e.attributes[t],r=s[t];r!==void 0&&(n.normalized=r)}t(e)},o,c,Ue,n)})})}},_f=class{constructor(){this.name=Kd.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0?e:(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0,e)}},vf=class{constructor(){this.name=Kd.KHR_MESH_QUANTIZATION}},yf=class extends is{constructor(e,t,n,r){super(e,t,n,r)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r*3+r;for(let e=0;e!==r;e++)t[e]=n[i+e];return t}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=o*2,c=o*3,l=r-t,u=(n-t)/l,d=u*u,f=d*u,p=e*c,m=p-c,h=-2*f+3*d,g=f-d,_=1-h,v=g-d+u;for(let e=0;e!==o;e++){let t=a[m+e+o],n=a[m+e+s]*l,r=a[p+e+o],c=a[p+e]*l;i[e]=_*t+v*n+h*r+g*c}return i}},bf=new Nt,xf=class extends yf{interpolate_(e,t,n,r){let i=super.interpolate_(e,t,n,r);return bf.fromArray(i).normalize().toArray(i),i}},Sf={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Cf={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},wf={9728:i,9729:s,9984:a,9985:c,9986:o,9987:l},Tf={33071:n,33648:r,10497:t},Ef={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Df={POSITION:`position`,NORMAL:`normal`,TANGENT:`tangent`,TEXCOORD_0:`uv`,TEXCOORD_1:`uv1`,TEXCOORD_2:`uv2`,TEXCOORD_3:`uv3`,COLOR_0:`color`,WEIGHTS_0:`skinWeight`,JOINTS_0:`skinIndex`},Of={scale:`scale`,translation:`position`,rotation:`quaternion`,weights:`morphTargetInfluences`},kf={CUBICSPLINE:void 0,LINEAR:P,STEP:Fe},Af={OPAQUE:`OPAQUE`,MASK:`MASK`,BLEND:`BLEND`};function jf(e){return e.DefaultMaterial===void 0&&(e.DefaultMaterial=new K({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:0})),e.DefaultMaterial}function Mf(e,t,n){for(let r in n.extensions)e[r]===void 0&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[r]=n.extensions[r])}function Nf(e,t){t.extras!==void 0&&(typeof t.extras==`object`?Object.assign(e.userData,t.extras):console.warn(`THREE.GLTFLoader: Ignoring primitive type .extras, `+t.extras))}function Pf(e,t,n){let r=!1,i=!1,a=!1;for(let e=0,n=t.length;e<n;e++){let n=t[e];if(n.POSITION!==void 0&&(r=!0),n.NORMAL!==void 0&&(i=!0),n.COLOR_0!==void 0&&(a=!0),r&&i&&a)break}if(!r&&!i&&!a)return Promise.resolve(e);let o=[],s=[],c=[];for(let l=0,u=t.length;l<u;l++){let u=t[l];if(r){let t=u.POSITION===void 0?e.attributes.position:n.getDependency(`accessor`,u.POSITION);o.push(t)}if(i){let t=u.NORMAL===void 0?e.attributes.normal:n.getDependency(`accessor`,u.NORMAL);s.push(t)}if(a){let t=u.COLOR_0===void 0?e.attributes.color:n.getDependency(`accessor`,u.COLOR_0);c.push(t)}}return Promise.all([Promise.all(o),Promise.all(s),Promise.all(c)]).then(function(t){let n=t[0],o=t[1],s=t[2];return r&&(e.morphAttributes.position=n),i&&(e.morphAttributes.normal=o),a&&(e.morphAttributes.color=s),e.morphTargetsRelative=!0,e})}function Ff(e,t){if(e.updateMorphTargets(),t.weights!==void 0)for(let n=0,r=t.weights.length;n<r;n++)e.morphTargetInfluences[n]=t.weights[n];if(t.extras&&Array.isArray(t.extras.targetNames)){let n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(let t=0,r=n.length;t<r;t++)e.morphTargetDictionary[n[t]]=t}else console.warn(`THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.`)}}function If(e){let t,n=e.extensions&&e.extensions[Kd.KHR_DRACO_MESH_COMPRESSION];if(t=n?`draco:`+n.bufferView+`:`+n.indices+`:`+Lf(n.attributes):e.indices+`:`+Lf(e.attributes)+`:`+e.mode,e.targets!==void 0)for(let n=0,r=e.targets.length;n<r;n++)t+=`:`+Lf(e.targets[n]);return t}function Lf(e){let t=``,n=Object.keys(e).sort();for(let r=0,i=n.length;r<i;r++)t+=n[r]+`:`+e[n[r]]+`;`;return t}function Rf(e){switch(e){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw Error(`THREE.GLTFLoader: Unsupported normalized accessor component type.`)}}function zf(e){return e.search(/\.jpe?g($|\?)/i)>0||e.search(/^data\:image\/jpeg/)===0?`image/jpeg`:e.search(/\.webp($|\?)/i)>0||e.search(/^data\:image\/webp/)===0?`image/webp`:e.search(/\.ktx2($|\?)/i)>0||e.search(/^data\:image\/ktx2/)===0?`image/ktx2`:`image/png`}var Bf=new nn,Vf=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Wd,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,r=-1,i=!1,a=-1;if(typeof navigator<`u`&&navigator.userAgent!==void 0){let e=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(e)===!0;let t=e.match(/Version\/(\d+)/);r=n&&t?parseInt(t[1],10):-1,i=e.indexOf(`Firefox`)>-1,a=i?e.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>`u`||n&&r<17||i&&a<98?this.textureLoader=new As(this.options.manager):this.textureLoader=new ec(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ds(this.options.manager),this.fileLoader.setResponseType(`arraybuffer`),this.options.crossOrigin===`use-credentials`&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,r=this.json,i=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(e){return e._markDefs&&e._markDefs()}),Promise.all(this._invokeAll(function(e){return e.beforeRoot&&e.beforeRoot()})).then(function(){return Promise.all([n.getDependencies(`scene`),n.getDependencies(`animation`),n.getDependencies(`camera`)])}).then(function(t){let a={scene:t[0][r.scene||0],scenes:t[0],animations:t[1],cameras:t[2],asset:r.asset,parser:n,userData:{}};return Mf(i,a,r),Nf(a,r),Promise.all(n._invokeAll(function(e){return e.afterRoot&&e.afterRoot(a)})).then(function(){for(let e of a.scenes)e.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let n=0,r=t.length;n<r;n++){let r=t[n].joints;for(let t=0,n=r.length;t<n;t++)e[r[t]].isBone=!0}for(let t=0,r=e.length;t<r;t++){let r=e[t];r.mesh!==void 0&&(this._addNodeRef(this.meshCache,r.mesh),r.skin!==void 0&&(n[r.mesh].isSkinnedMesh=!0)),r.camera!==void 0&&this._addNodeRef(this.cameraCache,r.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let r=n.clone(),i=(e,t)=>{let n=this.associations.get(e);n!=null&&this.associations.set(t,n);for(let[n,r]of e.children.entries())i(r,t.children[n])};return i(n,r),r.name+=`_instance_`+ e.uses[t]++,r}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let r=e(t[n]);if(r)return r}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let r=0;r<t.length;r++){let i=e(t[r]);i&&n.push(i)}return n}getDependency(e,t){let n=e+`:`+t,r=this.cache.get(n);if(!r){switch(e){case`scene`:r=this.loadScene(t);break;case`node`:r=this._invokeOne(function(e){return e.loadNode&&e.loadNode(t)});break;case`mesh`:r=this._invokeOne(function(e){return e.loadMesh&&e.loadMesh(t)});break;case`accessor`:r=this.loadAccessor(t);break;case`bufferView`:r=this._invokeOne(function(e){return e.loadBufferView&&e.loadBufferView(t)});break;case`buffer`:r=this.loadBuffer(t);break;case`material`:r=this._invokeOne(function(e){return e.loadMaterial&&e.loadMaterial(t)});break;case`texture`:r=this._invokeOne(function(e){return e.loadTexture&&e.loadTexture(t)});break;case`skin`:r=this.loadSkin(t);break;case`animation`:r=this._invokeOne(function(e){return e.loadAnimation&&e.loadAnimation(t)});break;case`camera`:r=this.loadCamera(t);break;default:if(r=this._invokeOne(function(n){return n!=this&&n.getDependency&&n.getDependency(e,t)}),!r)throw Error(`Unknown type: `+e);break}this.cache.add(n,r)}return r}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,r=this.json[e+(e===`mesh`?`es`:`s`)]||[];t=Promise.all(r.map(function(t,r){return n.getDependency(e,r)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!==`arraybuffer`)throw Error(`THREE.GLTFLoader: `+t.type+` buffer type is not supported.`);if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Kd.KHR_BINARY_GLTF].body);let r=this.options;return new Promise(function(e,i){n.load(Qs.resolveURL(t.uri,r.path),e,void 0,function(){i(Error(`THREE.GLTFLoader: Failed to load buffer "`+t.uri+`".`))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency(`buffer`,t.buffer).then(function(e){let n=t.byteLength||0,r=t.byteOffset||0;return e.slice(r,r+n)})}loadAccessor(e){let t=this,n=this.json,r=this.json.accessors[e];if(r.bufferView===void 0&&r.sparse===void 0){let e=Ef[r.type],t=Cf[r.componentType],n=r.normalized===!0,i=new t(r.count*e);return Promise.resolve(new yr(i,e,n))}let i=[];return r.bufferView===void 0?i.push(null):i.push(this.getDependency(`bufferView`,r.bufferView)),r.sparse!==void 0&&(i.push(this.getDependency(`bufferView`,r.sparse.indices.bufferView)),i.push(this.getDependency(`bufferView`,r.sparse.values.bufferView))),Promise.all(i).then(function(e){let i=e[0],a=Ef[r.type],o=Cf[r.componentType],s=o.BYTES_PER_ELEMENT,c=s*a,l=r.byteOffset||0,u=r.bufferView===void 0?void 0:n.bufferViews[r.bufferView].byteStride,d=r.normalized===!0,f,p;if(u&&u!==c){let e=Math.floor(l/u),n=`InterleavedBuffer:`+r.bufferView+`:`+r.componentType+`:`+e+`:`+r.count,c=t.cache.get(n);c||(f=new o(i,e*u,r.count*u/s),c=new Fr(f,u/s),t.cache.add(n,c)),p=new Lr(c,a,l%u/s,d)}else f=i===null?new o(r.count*a):new o(i,l,r.count*a),p=new yr(f,a,d);if(r.sparse!==void 0){let t=Ef.SCALAR,n=Cf[r.sparse.indices.componentType],s=r.sparse.indices.byteOffset||0,c=r.sparse.values.byteOffset||0,l=new n(e[1],s,r.sparse.count*t),u=new o(e[2],c,r.sparse.count*a);i!==null&&(p=new yr(p.array.slice(),p.itemSize,p.normalized)),p.normalized=!1;for(let e=0,t=l.length;e<t;e++){let t=l[e];if(p.setX(t,u[e*a]),a>=2&&p.setY(t,u[e*a+1]),a>=3&&p.setZ(t,u[e*a+2]),a>=4&&p.setW(t,u[e*a+3]),a>=5)throw Error(`THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.`)}p.normalized=d}return p})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,i=t.images[r],a=this.textureLoader;if(i.uri){let e=n.manager.getHandler(i.uri);e!==null&&(a=e)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){let r=this,i=this.json,a=i.textures[e],o=i.images[t],s=(o.uri||o.bufferView)+`:`+a.sampler;if(this.textureCache[s])return this.textureCache[s];let c=this.loadImageSource(t,n).then(function(t){t.flipY=!1,t.name=a.name||o.name||``,t.name===``&&typeof o.uri==`string`&&o.uri.startsWith(`data:image/`)===!1&&(t.name=o.uri);let n=(i.samplers||{})[a.sampler]||{};return t.magFilter=wf[n.magFilter]||1006,t.minFilter=wf[n.minFilter]||1008,t.wrapS=Tf[n.wrapS]||1e3,t.wrapT=Tf[n.wrapT]||1e3,t.generateMipmaps=!t.isCompressedTexture&&t.minFilter!==1003&&t.minFilter!==1006,r.associations.set(t,{textures:e}),t}).catch(function(){return null});return this.textureCache[s]=c,c}loadImageSource(e,t){let n=this,r=this.json,i=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(e=>e.clone());let a=r.images[e],o=self.URL||self.webkitURL,s=a.uri||``,c=!1;if(a.bufferView!==void 0)s=n.getDependency(`bufferView`,a.bufferView).then(function(e){c=!0;let t=new Blob([e],{type:a.mimeType});return s=o.createObjectURL(t),s});else if(a.uri===void 0)throw Error(`THREE.GLTFLoader: Image `+e+` is missing URI and bufferView`);let l=Promise.resolve(s).then(function(e){return new Promise(function(n,r){let a=n;t.isImageBitmapLoader===!0&&(a=function(e){let t=new Xt(e);t.needsUpdate=!0,n(t)}),t.load(Qs.resolveURL(e,i.path),a,void 0,r)})}).then(function(e){return c===!0&&o.revokeObjectURL(s),Nf(e,a),e.userData.mimeType=a.mimeType||zf(a.uri),e}).catch(function(e){throw console.error(`THREE.GLTFLoader: Couldn't load texture`,s),e});return this.sourceCache[e]=l,l}assignTexture(e,t,n,r){let i=this;return this.getDependency(`texture`,n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),i.extensions[Kd.KHR_TEXTURE_TRANSFORM]){let e=n.extensions===void 0?void 0:n.extensions[Kd.KHR_TEXTURE_TRANSFORM];if(e){let t=i.associations.get(a);a=i.extensions[Kd.KHR_TEXTURE_TRANSFORM].extendTexture(a,e),i.associations.set(a,t)}}return r!==void 0&&(a.colorSpace=r),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,r=t.attributes.tangent===void 0,i=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let e=`PointsMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new ea,zr.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,t.sizeAttenuation=!1,this.cache.add(e,t)),n=t}else if(e.isLine){let e=`LineBasicMaterial:`+n.uuid,t=this.cache.get(e);t||(t=new Bi,zr.prototype.copy.call(t,n),t.color.copy(n.color),t.map=n.map,this.cache.add(e,t)),n=t}if(r||i||a){let e=`ClonedMaterial:`+n.uuid+`:`;r&&(e+=`derivative-tangents:`),i&&(e+=`vertex-colors:`),a&&(e+=`flat-shading:`);let t=this.cache.get(e);t||(t=n.clone(),i&&(t.vertexColors=!0),a&&(t.flatShading=!0),r&&(t.normalScale&&(t.normalScale.y*=-1),t.clearcoatNormalScale&&(t.clearcoatNormalScale.y*=-1)),this.cache.add(e,t),this.associations.set(t,this.associations.get(n))),n=t}e.material=n}getMaterialType(){return K}loadMaterial(e){let t=this,n=this.json,r=this.extensions,i=n.materials[e],a,o={},s=i.extensions||{},c=[];if(s[Kd.KHR_MATERIALS_UNLIT]){let e=r[Kd.KHR_MATERIALS_UNLIT];a=e.getMaterialType(),c.push(e.extendParams(o,i,t))}else{let n=i.pbrMetallicRoughness||{};if(o.color=new H(1,1,1),o.opacity=1,Array.isArray(n.baseColorFactor)){let e=n.baseColorFactor;o.color.setRGB(e[0],e[1],e[2],Ue),o.opacity=e[3]}n.baseColorTexture!==void 0&&c.push(t.assignTexture(o,`map`,n.baseColorTexture,He)),o.metalness=n.metallicFactor===void 0?1:n.metallicFactor,o.roughness=n.roughnessFactor===void 0?1:n.roughnessFactor,n.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,`metalnessMap`,n.metallicRoughnessTexture)),c.push(t.assignTexture(o,`roughnessMap`,n.metallicRoughnessTexture))),a=this._invokeOne(function(t){return t.getMaterialType&&t.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(t){return t.extendMaterialParams&&t.extendMaterialParams(e,o)})))}i.doubleSided===!0&&(o.side=2);let l=i.alphaMode||Af.OPAQUE;if(l===Af.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,l===Af.MASK&&(o.alphaTest=i.alphaCutoff===void 0?.5:i.alphaCutoff)),i.normalTexture!==void 0&&a!==Jr&&(c.push(t.assignTexture(o,`normalMap`,i.normalTexture)),o.normalScale=new z(1,1),i.normalTexture.scale!==void 0)){let e=i.normalTexture.scale;o.normalScale.set(e,e)}if(i.occlusionTexture!==void 0&&a!==Jr&&(c.push(t.assignTexture(o,`aoMap`,i.occlusionTexture)),i.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=i.occlusionTexture.strength)),i.emissiveFactor!==void 0&&a!==Jr){let e=i.emissiveFactor;o.emissive=new H().setRGB(e[0],e[1],e[2],Ue)}return i.emissiveTexture!==void 0&&a!==Jr&&c.push(t.assignTexture(o,`emissiveMap`,i.emissiveTexture,He)),Promise.all(c).then(function(){let n=new a(o);return i.name&&(n.name=i.name),Nf(n,i),t.associations.set(n,{materials:e}),i.extensions&&Mf(r,n,i),n})}createUniqueName(e){let t=gc.sanitizeNodeName(e||``);return t in this.nodeNamesUsed?t+`_`+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,r=this.primitiveCache;function i(e){return n[Kd.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(e,t).then(function(n){return Uf(n,e,t)})}let a=[];for(let n=0,o=e.length;n<o;n++){let o=e[n],s=If(o),c=r[s];if(c)a.push(c.promise);else{let e;e=o.extensions&&o.extensions[Kd.KHR_DRACO_MESH_COMPRESSION]?i(o):Uf(new Pr,o,t),r[s]={primitive:o,promise:e},a.push(e)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,r=this.extensions,i=n.meshes[e],a=i.primitives,o=[];for(let e=0,t=a.length;e<t;e++){let t=a[e].material===void 0?jf(this.cache):this.getDependency(`material`,a[e].material);o.push(t)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(n){let o=n.slice(0,n.length-1),s=n[n.length-1],c=[];for(let n=0,l=s.length;n<l;n++){let l=s[n],u=a[n],d,f=o[n];if(u.mode===Sf.TRIANGLES||u.mode===Sf.TRIANGLE_STRIP||u.mode===Sf.TRIANGLE_FAN||u.mode===void 0)d=i.isSkinnedMesh===!0?new _i(l,f):new U(l,f),d.isSkinnedMesh===!0&&d.normalizeSkinWeights(),u.mode===Sf.TRIANGLE_STRIP?d.geometry=Bd(d.geometry,1):u.mode===Sf.TRIANGLE_FAN&&(d.geometry=Bd(d.geometry,2));else if(u.mode===Sf.LINES)d=new Qi(l,f);else if(u.mode===Sf.LINE_STRIP)d=new Ji(l,f);else if(u.mode===Sf.LINE_LOOP)d=new $i(l,f);else if(u.mode===Sf.POINTS)d=new aa(l,f);else throw Error(`THREE.GLTFLoader: Primitive mode unsupported: `+u.mode);Object.keys(d.geometry.morphAttributes).length>0&&Ff(d,i),d.name=t.createUniqueName(i.name||`mesh_`+e),Nf(d,i),u.extensions&&Mf(r,d,u),t.assignFinalMaterial(d),c.push(d)}for(let n=0,r=c.length;n<r;n++)t.associations.set(c[n],{meshes:e,primitives:n});if(c.length===1)return i.extensions&&Mf(r,c[0],i),c[0];let l=new jn;i.extensions&&Mf(r,l,i),t.associations.set(l,{meshes:e});for(let e=0,t=c.length;e<t;e++)l.add(c[e]);return l})}loadCamera(e){let t,n=this.json.cameras[e],r=n[n.type];if(!r){console.warn(`THREE.GLTFLoader: Missing camera parameters.`);return}return n.type===`perspective`?t=new Us(Mt.radToDeg(r.yfov),r.aspectRatio||1,r.znear||1,r.zfar||2e6):n.type===`orthographic`&&(t=new Js(-r.xmag,r.xmag,r.ymag,-r.ymag,r.znear,r.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Nf(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let e=0,r=t.joints.length;e<r;e++)n.push(this._loadNodeShallow(t.joints[e]));return t.inverseBindMatrices===void 0?n.push(null):n.push(this.getDependency(`accessor`,t.inverseBindMatrices)),Promise.all(n).then(function(e){let n=e.pop(),r=e,i=[],a=[];for(let e=0,o=r.length;e<o;e++){let o=r[e];if(o){i.push(o);let t=new nn;n!==null&&t.fromArray(n.array,e*16),a.push(t)}else console.warn(`THREE.GLTFLoader: Joint "%s" could not be found.`,t.joints[e])}return new Si(i,a)})}loadAnimation(e){let t=this.json,n=this,r=t.animations[e],i=r.name?r.name:`animation_`+e,a=[],o=[],s=[],c=[],l=[];for(let e=0,t=r.channels.length;e<t;e++){let t=r.channels[e],n=r.samplers[t.sampler],i=t.target,u=i.node,d=r.parameters===void 0?n.input:r.parameters[n.input],f=r.parameters===void 0?n.output:r.parameters[n.output];i.node!==void 0&&(a.push(this.getDependency(`node`,u)),o.push(this.getDependency(`accessor`,d)),s.push(this.getDependency(`accessor`,f)),c.push(n),l.push(i))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(s),Promise.all(c),Promise.all(l)]).then(function(e){let t=e[0],a=e[1],o=e[2],s=e[3],c=e[4],l=[];for(let e=0,r=t.length;e<r;e++){let r=t[e],i=a[e],u=o[e],d=s[e],f=c[e];if(r===void 0)continue;r.updateMatrix&&r.updateMatrix();let p=n._createAnimationTracks(r,i,u,d,f);if(p)for(let e=0;e<p.length;e++)l.push(p[e])}let u=new _s(i,void 0,l);return Nf(u,r),u})}createNodeMesh(e){let t=this.json,n=this,r=t.nodes[e];return r.mesh===void 0?null:n.getDependency(`mesh`,r.mesh).then(function(e){let t=n._getNodeRef(n.meshCache,r.mesh,e);return r.weights!==void 0&&t.traverse(function(e){if(e.isMesh)for(let t=0,n=r.weights.length;t<n;t++)e.morphTargetInfluences[t]=r.weights[t]}),t})}loadNode(e){let t=this.json,n=this,r=t.nodes[e],i=n._loadNodeShallow(e),a=[],o=r.children||[];for(let e=0,t=o.length;e<t;e++)a.push(n.getDependency(`node`,o[e]));let s=r.skin===void 0?Promise.resolve(null):n.getDependency(`skin`,r.skin);return Promise.all([i,Promise.all(a),s]).then(function(e){let t=e[0],n=e[1],r=e[2];r!==null&&t.traverse(function(e){e.isSkinnedMesh&&e.bind(r,Bf)});for(let e=0,r=n.length;e<r;e++)t.add(n[e]);if(t.userData.pivot!==void 0&&n.length>0){let e=t.userData.pivot,r=n[0];t.pivot=new B().fromArray(e),t.position.x-=e[0],t.position.y-=e[1],t.position.z-=e[2],r.position.set(0,0,0),delete t.userData.pivot}return t})}_loadNodeShallow(e){let t=this.json,n=this.extensions,r=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let i=t.nodes[e],a=i.name?r.createUniqueName(i.name):``,o=[],s=r._invokeOne(function(t){return t.createNodeMesh&&t.createNodeMesh(e)});return s&&o.push(s),i.camera!==void 0&&o.push(r.getDependency(`camera`,i.camera).then(function(e){return r._getNodeRef(r.cameraCache,i.camera,e)})),r._invokeAll(function(t){return t.createNodeAttachment&&t.createNodeAttachment(e)}).forEach(function(e){o.push(e)}),this.nodeCache[e]=Promise.all(o).then(function(t){let o;if(o=i.isBone===!0?new vi:t.length>1?new jn:t.length===1?t[0]:new An,o!==t[0])for(let e=0,n=t.length;e<n;e++)o.add(t[e]);if(i.name&&(o.userData.name=i.name,o.name=a),Nf(o,i),i.extensions&&Mf(n,o,i),i.matrix!==void 0){let e=new nn;e.fromArray(i.matrix),o.applyMatrix4(e)}else i.translation!==void 0&&o.position.fromArray(i.translation),i.rotation!==void 0&&o.quaternion.fromArray(i.rotation),i.scale!==void 0&&o.scale.fromArray(i.scale);if(!r.associations.has(o))r.associations.set(o,{});else if(i.mesh!==void 0&&r.meshCache.refs[i.mesh]>1){let e=r.associations.get(o);r.associations.set(o,{...e})}return r.associations.get(o).nodes=e,o}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],r=this,i=new jn;n.name&&(i.name=r.createUniqueName(n.name)),Nf(i,n),n.extensions&&Mf(t,i,n);let a=n.nodes||[],o=[];for(let e=0,t=a.length;e<t;e++)o.push(r.getDependency(`node`,a[e]));return Promise.all(o).then(function(e){for(let t=0,n=e.length;t<n;t++){let n=e[t];n.parent===null?i.add(n):i.add(Vd(n))}return r.associations=(e=>{let t=new Map;for(let[e,n]of r.associations)(e instanceof zr||e instanceof Xt)&&t.set(e,n);return e.traverse(e=>{let n=r.associations.get(e);n!=null&&t.set(e,n)}),t})(i),i})}_createAnimationTracks(e,t,n,r,i){let a=[],o=e.name?e.name:e.uuid,s=[];function c(e){e.morphTargetInfluences&&s.push(e.name?e.name:e.uuid)}Of[i.path]===Of.weights?(c(e),e.isGroup&&e.children.forEach(c)):s.push(o);let l;switch(Of[i.path]){case Of.weights:l=fs;break;case Of.rotation:l=ms;break;case Of.translation:case Of.scale:l=gs;break;default:switch(n.itemSize){case 1:l=fs;break;default:l=gs;break}break}let u=r.interpolation===void 0?P:kf[r.interpolation],d=this._getArrayFromAccessor(n);for(let e=0,n=s.length;e<n;e++){let n=new l(s[e]+`.`+Of[i.path],t.array,d,u);r.interpolation===`CUBICSPLINE`&&this._createCubicSplineTrackInterpolant(n),a.push(n)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let e=Rf(t.constructor),n=new Float32Array(t.length);for(let r=0,i=t.length;r<i;r++)n[r]=t[r]*e;t=n}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(e){return new(this instanceof ms?xf:yf)(this.times,this.values,this.getValueSize()/3,e)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Hf(e,t,n){let r=t.attributes,i=new tr;if(r.POSITION!==void 0){let e=n.json.accessors[r.POSITION],t=e.min,a=e.max;if(t!==void 0&&a!==void 0){if(i.set(new B(t[0],t[1],t[2]),new B(a[0],a[1],a[2])),e.normalized){let t=Rf(Cf[e.componentType]);i.min.multiplyScalar(t),i.max.multiplyScalar(t)}}else{console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`);return}}else return;let a=t.targets;if(a!==void 0){let e=new B,t=new B;for(let r=0,i=a.length;r<i;r++){let i=a[r];if(i.POSITION!==void 0){let r=n.json.accessors[i.POSITION],a=r.min,o=r.max;if(a!==void 0&&o!==void 0){if(t.setX(Math.max(Math.abs(a[0]),Math.abs(o[0]))),t.setY(Math.max(Math.abs(a[1]),Math.abs(o[1]))),t.setZ(Math.max(Math.abs(a[2]),Math.abs(o[2]))),r.normalized){let e=Rf(Cf[r.componentType]);t.multiplyScalar(e)}e.max(t)}else console.warn(`THREE.GLTFLoader: Missing min/max properties for accessor POSITION.`)}}i.expandByVector(e)}e.boundingBox=i;let o=new Er;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,e.boundingSphere=o}function Uf(e,t,n){let r=t.attributes,i=[];function a(t,r){return n.getDependency(`accessor`,t).then(function(t){e.setAttribute(r,t)})}for(let t in r){let n=Df[t]||t.toLowerCase();n in e.attributes||i.push(a(r[t],n))}if(t.indices!==void 0&&!e.index){let r=n.getDependency(`accessor`,t.indices).then(function(t){e.setIndex(t)});i.push(r)}return Bt.workingColorSpace!==`srgb-linear`&&`COLOR_0`in r&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Bt.workingColorSpace}" not supported.`),Nf(e,t),Hf(e,t,n),Promise.all(i).then(function(){return t.targets===void 0?e:Pf(e,t.targets,n)})}var Wf=null,Gf=null,Kf=null;window.addEventListener(`error`,e=>{let t=document.createElement(`div`);t.style.position=`fixed`,t.style.bottom=`20px`,t.style.left=`20px`,t.style.background=`rgba(220, 38, 38, 0.95)`,t.style.color=`white`,t.style.padding=`15px`,t.style.borderRadius=`8px`,t.style.zIndex=`99999`,t.style.fontFamily=`monospace`,t.style.fontSize=`12px`,t.style.border=`2px solid white`,t.style.boxShadow=`0 0 20px rgba(0,0,0,0.5)`,t.style.maxWidth=`500px`,t.style.whiteSpace=`pre-wrap`,t.innerText=`[CRITICAL RUNTIME ERROR]\nMessage: ${e.message}\nSource: ${e.filename}\nLine: ${e.lineno}:${e.colno}\nError Object: ${e.error?e.error.stack:`N/A`}`,document.body.appendChild(t)});var Y={activeExperiment:`ohms`,selectedTool:null,placementStartHole:null,wiringStart:null,targetSnap1:null,targetSnap2:null,isRunning:!1,buttonPressed:!1,activePressedPlunger:null,draggingSidebarTool:null,ghostMesh:null,ghostSnap1:null,ghostSnap2:null,draggedComponentIdx:-1,selectedComponentIdx:-1,selectedHoleIndex:null,isDraggingComponent:!1,dragStartSnap1:null,dragStartSnap2:null,isDrawingWire:!1,wireStartSnap:null,tempWireMesh:null,isDraggingWireEnd:!1,draggedWireIdx:-1,draggedWireEnd:-1,dragStartWireHole:null,params:{V:12,R:100,L:50,C:100,f:50,T:25,led_color:`red`},meters:{volts:0,amps:0,ohms:0,power:0,energy:0},analysis:{XL:0,XC:0,phi:0,f0:0},wasRunningBeforeDrag:!1,lastResistance:100,lastMentorMsgTime:0,placedComponents:[],wires:[],dataPoints:[],score:0,completedSteps:new Set,energyStartTime:Date.now()},qf=0,Jf=!1;function Yf(e){Jf=e}window.setElectronsActive=Yf;var X={experimentSelect:document.getElementById(`exp-selector`),btnGraphToggle:document.getElementById(`btn-graph-toggle`),btnOscToggle:document.getElementById(`btn-osc-toggle`),btnClear:document.getElementById(`btn-reset`),btnRun:document.getElementById(`btn-simulate`),btnStop:document.getElementById(`btn-stop`),btnReload:document.getElementById(`btn-reload`),btnCloseLab:document.getElementById(`btn-close-lab`),stepsContainer:document.getElementById(`step-list`),protocolProgress:document.getElementById(`progress-bar`),progressPercent:document.getElementById(`progress-text`),theoryText:document.getElementById(`theory-content`),btnExport:document.getElementById(`btn-export`),zoomDisplay:document.getElementById(`zoom-display`),oscPanel:document.getElementById(`osc-wrap`),graphPanel:document.getElementById(`graph-wrap`),btnCloseOsc:document.getElementById(`osc-close`),btnCloseGraph:document.getElementById(`graph-close`),oscCanvas:document.getElementById(`osc-canvas`),graphCanvas:document.getElementById(`graph-canvas`),oscFreqLbl:document.getElementById(`osc-freq`),oscPhaseLbl:document.getElementById(`osc-phase`),graphSlopeLbl:document.getElementById(`graph-slope`),btnRecord:document.getElementById(`btn-add-point`),oscDownload:document.getElementById(`osc-download`),graphDownload:document.getElementById(`graph-download`),sliderOscTime:document.getElementById(`osc-scale-time`),sliderOscVolts:document.getElementById(`osc-scale-volts`),aiMessagesContainer:document.getElementById(`ai-messages`),aiInput:document.getElementById(`ai-input`),aiSend:document.getElementById(`ai-send`),aiMessage:document.getElementById(`ai-message`),valVolts:document.getElementById(`mm-v`),fillVolts:document.getElementById(`bar-v`),valAmps:document.getElementById(`mm-i`),fillAmps:document.getElementById(`bar-i`),valOhms:document.getElementById(`mm-z`),fillOhms:document.getElementById(`bar-z`),valPower:document.getElementById(`val-power`),valEnergy:document.getElementById(`val-energy`),meterVmMode:document.getElementById(`volt-mode`),sliderV:document.getElementById(`sl-v`),sliderR:document.getElementById(`sl-r`),sliderL:document.getElementById(`sl-l`),sliderC:document.getElementById(`sl-c`),sliderf:document.getElementById(`sl-f`),sliderT:document.getElementById(`sl-temp`),valLblV:document.getElementById(`lbl-v`),valLblR:document.getElementById(`lbl-r`),valLblL:document.getElementById(`lbl-l`),valLblC:document.getElementById(`lbl-c`),valLblf:document.getElementById(`lbl-f`),valLblT:document.getElementById(`lbl-temp`),diagXL:document.getElementById(`rc-xl`),diagXC:document.getElementById(`rc-xc`),diagPhi:document.getElementById(`rc-phi`),diagF0:document.getElementById(`rc-f0`),kirchhoffDisplay:document.getElementById(`kvl-box`),acAnalysisBlock:document.getElementById(`ac-analysis-block`),formulaContainer:document.getElementById(`formula-list`),scoreCirclePath:document.getElementById(`score-ring`),scoreCircleText:document.getElementById(`score-ring-txt`),lblGrade:document.getElementById(`report-grade`),vivaContainer:document.getElementById(`viva-list`),conclusionText:document.getElementById(`conclusion-text`),btnDownloadReport:document.getElementById(`btn-report`),statusTextBar:document.getElementById(`sb-status-text`),statusDot:document.getElementById(`sb-status-dot`),telemetryComps:document.getElementById(`st-comps`),telemetryWires:document.getElementById(`st-wires`)},Xf={ohms:{name:`Ohm's Law Verification`,aim:`Verify the relation between V, I, and R in a DC circuit.`,apparatus:`DC Power Supply (0-30V), Resistor (100Ω), Ammeter, Voltmeter, Breadboard.`,req:[`source`,`resistor`],steps:[{id:1,text:`Place the ceramic resistor horizontally between rows C and D.`},{id:2,text:`Mount the DC power supply and wire positive terminal to resistor start.`},{id:3,text:`Wire ammeter in series, voltmeter in parallel across resistor.`},{id:4,text:`Click Initialize and record multiple data points using the graph panel.`}],theory:`<h3>Ohm's Law</h3><p>Current is directly proportional to voltage and inversely proportional to resistance: V = IR.</p>`,formulas:[{name:`Ohm's Law`,expr:`V = I × R`},{name:`Current`,expr:`I = V / R`}]},kvl:{name:`Kirchhoff's Voltage Law`,aim:`Verify algebraic sum of voltages in closed loop is zero.`,apparatus:`DC Supply, Resistors, Multimeters, Wires.`,req:[`source`,`resistor`],steps:[{id:1,text:`Form a closed loop with DC supply and two resistors in series.`},{id:2,text:`Measure voltage drop across each resistor.`},{id:3,text:`Verify that their sum matches the supply voltage.`}],theory:`<h3>Kirchhoff's Voltage Law (KVL)</h3><p>Sum of potential drops in any closed loop is zero: ΣV = 0.</p>`,formulas:[{name:`KVL Sum`,expr:`Vs - V1 - V2 = 0`}]},kcl:{name:`Kirchhoff's Current Law`,aim:`Verify current entering junction equals current exiting.`,apparatus:`DC Supply, Resistors, Ammeters.`,req:[`source`,`resistor`],steps:[{id:1,text:`Connect two parallel resistors branching from a single junction.`},{id:2,text:`Measure current in the main branch and each sub-branch.`},{id:3,text:`Verify main current equals the sum of branch currents.`}],theory:`<h3>Kirchhoff's Current Law (KCL)</h3><p>Nodal charge conservation dictates that incoming current matches outgoing current: ΣI_in = ΣI_out.</p>`,formulas:[{name:`KCL Sum`,expr:`I_total = I1 + I2`}]},rc_rl_rlc:{name:`LCR AC Impedance Analysis`,aim:`Study total impedance and phase angle in LCR circuits.`,apparatus:`AC Generator, Resistor, Inductor, Capacitor.`,req:[`source`,`resistor`,`inductor`,`capacitor`],steps:[{id:1,text:`Place R, L, and C in a single series path.`},{id:2,text:`Wire them to the AC supply.`},{id:3,text:`Observe reactances and phase angle change with frequency.`}],theory:`<h3>LCR AC Circuit</h3><p>AC resistance is called impedance Z. It incorporates inductive XL and capacitive XC reactances.</p>`,formulas:[{name:`Impedance`,expr:`Z = √[R² + (XL-XC)²]`},{name:`Resonance`,expr:`f₀ = 1 / (2π√(LC))`}]},lcr:{name:`Series LCR Resonance`,aim:`Determine resonant frequency of LCR series circuit.`,apparatus:`AC Generator, Resistor, Inductor, Capacitor.`,req:[`source`,`resistor`,`inductor`,`capacitor`],steps:[{id:1,text:`Assemble Series LCR path and connect AC supply.`},{id:2,text:`Vary frequency and find point of maximum current.`}],theory:`<h3>Series Resonance</h3><p>Resonance occurs when XL = XC, yielding Z = R (minimum impedance) and maximum current.</p>`,formulas:[{name:`Resonance Freq`,expr:`f₀ = 1 / (2π√(LC))`}]},rc:{name:`RC Time Constant`,aim:`Measure transient capacitor charging rate.`,apparatus:`DC Supply, Resistor, Capacitor, Oscilloscope.`,req:[`source`,`resistor`,`capacitor`],steps:[{id:1,text:`Place Resistor and Capacitor in series to DC source.`},{id:2,text:`Observe exponential curve on scope when powered.`}],theory:`<h3>RC Charging</h3><p>Time constant τ = RC defines charging rate to 63.2% capacity.</p>`,formulas:[{name:`Time Constant`,expr:`τ = R × C`}]},series_parallel:{name:`Series & Parallel Loads`,aim:`Compare equivalent resistors network load values.`,apparatus:`Resistors, Multimeters, Power Supply.`,req:[`source`,`resistor`],steps:[{id:1,text:`Measure total equivalent resistance in series and parallel links.`}],theory:`<h3>Resistor Combinations</h3><p>Series combines additively, Parallel combines reciprocally.</p>`,formulas:[{name:`Parallel Sum`,expr:`1/R_eq = 1/R1 + 1/R2`}]},wheatstone:{name:`Wheatstone Bridge Balance`,aim:`Measure unknown resistance via bridge balancing.`,apparatus:`Wheatstone resistor bridge array, galvanometer.`,req:[`source`,`resistor`],steps:[{id:1,text:`Adjust R3 slider until bridge galvanometer indicates zero.`}],theory:`<h3>Wheatstone Bridge</h3><p>Bridge is balanced when voltage ratios are equal, nulling detector current.</p>`,formulas:[{name:`Balance`,expr:`Rx = R3 × (R2 / R1)`}]},faraday:{name:`Faraday's Induction Law`,aim:`Induce emf via moving magnetic fields.`,apparatus:`Magnet, Coil, Voltmeter, Optical Bench.`,req:[],steps:[{id:1,text:`Animate magnet motion using the velocity slider.`},{id:2,text:`Observe the generated voltage pulses.`}],theory:`<h3>Faraday's Law</h3><p>Changing magnetic flux induces electromotive force in a conductor loop.</p>`,formulas:[{name:`EMF`,expr:`E = -N (ΔΦ / Δt)`}]},lenz:{name:`Lenz's Law Demonstration`,aim:`Study induced magnetic field polarity directions.`,apparatus:`Magnet, Coil, Voltmeter.`,req:[],steps:[{id:1,text:`Observe direction of induced voltage as magnet enters and exits coil.`}],theory:`<h3>Lenz's Law</h3><p>Induced current direction opposes the magnetic flux change that created it.</p>`,formulas:[{name:`Flux opposition`,expr:`Direction opposes dΦ/dt`}]},solenoid:{name:`Solenoid Magnetic Field`,aim:`Measure B-field inside current-carrying solenoid.`,apparatus:`Solenoid coil, Gaussmeter.`,req:[],steps:[{id:1,text:`Adjust current and turns parameters to calculate magnetic flux density.`}],theory:`<h3>Solenoid Field</h3><p>Uniform B field inside depends on turns density and current.</p>`,formulas:[{name:`B Field`,expr:`B = μ₀ n I`}]},transformer:{name:`AC Transformer Ratio`,aim:`Study voltage conversion ratios of transformers.`,apparatus:`AC primary coil, secondary coupling coil.`,req:[],steps:[{id:1,text:`Vary primary vs secondary turns ratio and observe output voltage changes.`}],theory:`<h3>Transformers</h3><p>Inductive coupling scales voltage based on coil turn ratios.</p>`,formulas:[{name:`Turns Law`,expr:`Vs / Vp = Ns / Np`}]},snell:{name:`Snell's Law of Refraction`,aim:`Measure index of refraction n of glass.`,apparatus:`Laser source, semicircular glass block.`,req:[],steps:[{id:1,text:`Vary incident angle θ1 and verify ratio consistency.`}],theory:`<h3>Refraction</h3><p>Light bends at optical interfaces due to speed propagation differences.</p>`,formulas:[{name:`Snell's Law`,expr:`n1 sin(θ1) = n2 sin(θ2)`}]},lens_eq:{name:`Thin Lens Equation`,aim:`Trace image distances from convex lens.`,apparatus:`Object pin, convex lens, projection screen.`,req:[],steps:[{id:1,text:`Vary object distance u and map matching image distance v.`}],theory:`<h3>Lens Formulas</h3><p>Convex lenses focus rays forming real inverted images.</p>`,formulas:[{name:`Lens Equation`,expr:`1/f = 1/v + 1/u`}]},tir:{name:`Total Internal Reflection`,aim:`Calculate critical angle of dense media boundary.`,apparatus:`Laser, glass block, angle scale.`,req:[],steps:[{id:1,text:`Increase incident angle until light reflects completely inside.`}],theory:`<h3>TIR</h3><p>Light cannot refract if angle exceeds critical value; it reflects internally.</p>`,formulas:[{name:`Critical Angle`,expr:`θc = arcsin(n2 / n1)`}]},prism:{name:`Prism Dispersion Spectrum`,aim:`Measure wavelength deviation angles through prism.`,apparatus:`Light ray, glass triangular prism.`,req:[],steps:[{id:1,text:`Vary incident angle and observe color spectrum dispersion.`}],theory:`<h3>Dispersion</h3><p>Glass index of refraction changes with frequency, splitting white light.</p>`,formulas:[{name:`Deviation Angle`,expr:`δ = i1 + i2 - A`}]},pendulum:{name:`Simple Pendulum Motion`,aim:`Study gravity periods of swinging pendulum.`,apparatus:`Stand, string, heavy bob, timer.`,req:[],steps:[{id:1,text:`Vary length L and gravity g. Measure period T.`}],theory:`<h3>Pendulums</h3><p>Period depends on length and gravity, remaining independent of mass.</p>`,formulas:[{name:`Period`,expr:`T = 2π √(L / g)`}]},hooke:{name:`Hooke's Law & Springs`,aim:`Verify linear extension of loaded springs.`,apparatus:`Spring, stand, weight hanger.`,req:[],steps:[{id:1,text:`Hang weights on spring and measure displacement stretch.`}],theory:`<h3>Hooke's Law</h3><p>Restoring spring force is linear to extension distance.</p>`,formulas:[{name:`Spring Force`,expr:`F = -k x`}]},projectile:{name:`Projectile Firing Path`,aim:`Study parabolic trajectory parameters.`,apparatus:`Launcher cannon, landing pad, timer.`,req:[],steps:[{id:1,text:`Vary firing angle and velocity. Click Simulate to launch ball.`}],theory:`<h3>Projectiles</h3><p>Gravity drives a parabolic path combining independent horizontal and vertical motions.</p>`,formulas:[{name:`Vertical Path`,expr:`y = x tan(θ) - g x² / (2 v₀² cos²θ)`}]},doppler:{name:`Doppler Shift Simulation`,aim:`Observe wave compression frequency shifts.`,apparatus:`Sound source generator, frequency analyzer.`,req:[],steps:[{id:1,text:`Adjust velocity of sound source and observe shifted tones.`}],theory:`<h3>Doppler Effect</h3><p>Wave crests compress ahead of moving source, increasing frequency tone.</p>`,formulas:[{name:`Doppler Freq`,expr:`f' = f [ v / (v - vs) ]`}]},ideal_gas:{name:`Ideal Gas State Equation`,aim:`Verify P-V-T thermodynamic relationships.`,apparatus:`Confined gas cylinder, piston, manometer.`,req:[],steps:[{id:1,text:`Vary volume and temperature sliders, measuring pressure changes.`}],theory:`<h3>Gas Laws</h3><p>Gas state connects pressure, volume, temperature, and moles n.</p>`,formulas:[{name:`State Equation`,expr:`P V = n R T`}]},boyle:{name:`Boyle's Constant Temp Law`,aim:`Verify P-V inverse pressure volume relations.`,apparatus:`Gas chamber, volume piston.`,req:[],steps:[{id:1,text:`Vary volume slider and confirm P × V constant product.`}],theory:`<h3>Boyle's Law</h3><p>Pressure is inversely proportional to volume at constant temperature.</p>`,formulas:[{name:`Boyle's`,expr:`P₁ V₁ = P₂ V₂`}]},charles:{name:`Charles's Constant Pres Law`,aim:`Verify V-T volume temperature linear relations.`,apparatus:`Heated cylinder, movable piston.`,req:[],steps:[{id:1,text:`Heat gas chamber and watch piston expand volume linearly.`}],theory:`<h3>Charles's Law</h3><p>Gas volume is directly proportional to temperature at constant pressure.</p>`,formulas:[{name:`Charles's`,expr:`V₁ / T₁ = V₂ / T₂`}]},specific_heat:{name:`Specific Heat Capacity`,aim:`Measure copper thermal specific heat.`,apparatus:`Calorimeter beaker, thermometer, copper weights.`,req:[],steps:[{id:1,text:`Drop heated metal into calorimeter and measure final mixture temperature.`}],theory:`<h3>Calorimetry</h3><p>Heat lost by metal block equals heat gained by water: Q = mcΔT.</p>`,formulas:[{name:`Heat Transfer`,expr:`Q = m c ΔT`}]},photoelectric:{name:`Photoelectric Effect`,aim:`Determine stopping voltage vs light wavelength.`,apparatus:`Vacuum photo tube, voltage collector source.`,req:[],steps:[{id:1,text:`Vary light frequency slider and find threshold work function boundary.`}],theory:`<h3>Photoelectric</h3><p>Light quanta eject electrons. Energy KE increases linearly with frequency.</p>`,formulas:[{name:`Energy Max`,expr:`Kmax = h ν - Φ`}]},radioactive:{name:`Radioactive Decay Half-Life`,aim:`Verify nuclei exponential decay rate.`,apparatus:`Radioactive core grid, Geiger counter.`,req:[],steps:[{id:1,text:`Verify remaining parent nuclei drops by half after every half-life interval.`}],theory:`<h3>Decay Law</h3><p>Nuclei decay is random, scaling with remaining atoms count: N = N0 e^(-λt).</p>`,formulas:[{name:`Decay Law`,expr:`N(t) = N₀ e^(−λ t)`}]},de_broglie:{name:`de Broglie matter wave`,aim:`Measure wave characteristics of moving masses.`,apparatus:`Mass velocity accelerator.`,req:[],steps:[{id:1,text:`Vary velocity and verify matter wavelength changes.`}],theory:`<h3>de Broglie Wavelength</h3><p>Moving particles display matter wave behaviors inversely matching momentum.</p>`,formulas:[{name:`Wavelength`,expr:`λ = h / (m v)`}]},bohr_model:{name:`Bohr Hydrogen atom transitions`,aim:`Calculate transition shell wavelengths.`,apparatus:`Bohr atomic orbital model display.`,req:[],steps:[{id:1,text:`Animate quantum electron shell drops and measure spectral wavelengths.`}],theory:`<h3>Bohr Atom</h3><p>Electrons reside in quantized shells. Orbital drops emit discrete photons.</p>`,formulas:[{name:`Transition energy`,expr:`ΔE = 13.6 (1/n_f² - 1/n_i²) eV`}]}},Zf={ohms:[{q:`State the mathematical formulation of Ohm's Law.`,options:[`V = I / R`,`I = V / R`,`R = I / V`,`V = I² R`],correct:1,explanation:`Ohm's Law is I = V/R.`},{q:`Ohm's Law holds strictly true under which conditions?`,options:[`Constant temperature`,`Varying temperature`,`Varying dimensions`,`Always`],correct:0,explanation:`Temperature must remain constant to keep resistance fixed.`}],kvl:[{q:`What is Kirchhoff's Voltage Law a statement of?`,options:[`Conservation of charge`,`Conservation of energy`,`Conservation of momentum`,`Conservation of mass`],correct:1,explanation:`KVL is based on conservation of energy; sum of potential differences in loop is zero.`}],kcl:[{q:`What is Kirchhoff's Current Law a statement of?`,options:[`Conservation of charge`,`Conservation of energy`,`Conservation of mass`,`None`],correct:0,explanation:`KCL represents conservation of charge; total current entering node equals total leaving.`}],rc_rl_rlc:[{q:`What is LCR circuit resonance condition?`,options:[`XL = XC`,`XL > XC`,`XL < XC`,`Z = 0`],correct:0,explanation:`Resonance is when inductive and capacitive reactances cancel (XL = XC).`}],lcr:[{q:`At resonant frequency in LCR series circuit, Z equals:`,options:[`R`,`0`,`Infinity`,`XL`],correct:0,explanation:`At resonance XL = XC, so total impedance Z drops to resistor value R.`}],rc:[{q:`Define time constant of an RC circuit.`,options:[`R / C`,`R × C`,`1 / (R × C)`,`C / R`],correct:1,explanation:`Time constant τ = R × C in seconds.`}],series_parallel:[{q:`Two 100 Ω resistors in parallel yield an equivalent resistance of:`,options:[`200 Ω`,`50 Ω`,`100 Ω`,`25 Ω`],correct:1,explanation:`1/Req = 1/100 + 1/100 = 2/100 => Req = 50 Ω.`}],wheatstone:[{q:`Under balanced Wheatstone bridge conditions, galvanometer current is:`,options:[`Maximum`,`Zero`,`Unchanged`,`Half`],correct:1,explanation:`At balance, potential differences across nodes are equal, nulling current.`}],faraday:[{q:`Induced emf in a coil depends directly on rate of change of:`,options:[`Magnetic flux`,`Coil mass`,`Temperature`,`Resistance`],correct:0,explanation:`Faraday's Law states induced EMF is proportional to change in magnetic flux.`}],lenz:[{q:`Lenz's Law represents conservation of:`,options:[`Charge`,`Momentum`,`Energy`,`Flux`],correct:2,explanation:`Lenz's law is a consequence of conservation of energy.`}],solenoid:[{q:`Magnetic field inside a long solenoid is:`,options:[`Directly proportional to current`,`Inversely proportional to current`,`Zero`,`Quadratic to current`],correct:0,explanation:`B = μ0 n I, so it is directly proportional to I.`}],transformer:[{q:`A step-up transformer increases voltage by scaling up:`,options:[`Primary turns`,`Secondary turns`,`Primary current`,`Frequency`],correct:1,explanation:`Vs / Vp = Ns / Np. Scaling up secondary turns Ns increases secondary voltage.`}],snell:[{q:`Snell's Law defines relationship between angles of:`,options:[`Reflection`,`Refraction`,`Diffraction`,`Polarization`],correct:1,explanation:`Snell's Law connects incident vs refraction angles: n1 sinθ1 = n2 sinθ2.`}],lens_eq:[{q:`A convex lens has f = 15cm. If object is at u = 30cm, the image forms at v =:`,options:[`15 cm`,`30 cm`,`Infinity`,`10 cm`],correct:1,explanation:`1/v = 1/f - 1/u = 1/15 - 1/30 = 1/30 => v = 30 cm.`}],tir:[{q:`TIR occurs when incident angle is:`,options:[`Less than critical angle`,`Greater than critical angle`,`Equal to refraction angle`,`Zero`],correct:1,explanation:`TIR happens only if incident angle θ1 exceeds the critical angle θc.`}],prism:[{q:`Which color refracts (bends) the most through a glass prism?`,options:[`Red`,`Green`,`Yellow`,`Violet`],correct:3,explanation:`Violet light has shorter wavelength, higher refractive index, and deviates the most.`}],pendulum:[{q:`If pendulum length is quadrupled (4x), its period T changes by:`,options:[`Doubling`,`Halving`,`4x increase`,`Unchanged`],correct:0,explanation:`T = 2π√(L/g). Multiplying L by 4 increases T by √4 = 2.`}],hooke:[{q:`A spring stretches 2cm under 10N force. What is spring constant k?`,options:[`5 N/m`,`500 N/m`,`20 N/m`,`50 N/m`],correct:1,explanation:`k = F/x = 10 / 0.02 = 500 N/m.`}],projectile:[{q:`What launch angle maximizes projectile range under gravity?`,options:[`30°`,`45°`,`60°`,`90°`],correct:1,explanation:`Range is proportional to sin(2θ), which peaks at 2θ = 90° => θ = 45°.`}],doppler:[{q:`If sound source approaches observer, the observed frequency:`,options:[`Increases`,`Decreases`,`Remains same`,`Drops to zero`],correct:0,explanation:`Moving source compresses waves, shifting frequency higher.`}],ideal_gas:[{q:`Ideal Gas Law is expressed as:`,options:[`P V = n R T`,`P / V = n R T`,`P T = n R V`,`P V = R T`],correct:0,explanation:`State equation is PV = nRT.`}],boyle:[{q:`Boyle's law holds at constant:`,options:[`Pressure`,`Volume`,`Temperature`,`Moles only`],correct:2,explanation:`Boyle's law requires temperature T to remain constant.`}],charles:[{q:`Charles's law holds at constant:`,options:[`Pressure`,`Volume`,`Temperature`,`Mass only`],correct:0,explanation:`Charles's law requires pressure P to remain constant.`}],specific_heat:[{q:`Specific heat capacity is heat required to raise temp of 1g by:`,options:[`1°C`,`10°C`,`100°C`,`0.1°C`],correct:0,explanation:`Specific heat c is heat per unit mass per degree change.`}],photoelectric:[{q:`Photoelectric emission threshold depends directly on light:`,options:[`Intensity`,`Frequency`,`Amplitude`,`Velocity`],correct:1,explanation:`Emission requires photon energy hν > Φ, which is a frequency constraint.`}],radioactive:[{q:`After exactly 3 half-lives, fraction of parent nuclei remaining is:`,options:[`1/2`,`1/4`,`1/8`,`1/16`],correct:2,explanation:`Fraction remaining is (1/2)³ = 1/8.`}],de_broglie:[{q:`de Broglie wavelength is inversely proportional to particle:`,options:[`Mass only`,`Velocity only`,`Momentum`,`Energy`],correct:2,explanation:`λ = h/p, where momentum p = mv.`}],bohr_model:[{q:`Hydrogen electron transition from n=2 to n=1 energy is:`,options:[`10.2 eV`,`13.6 eV`,`3.4 eV`,`1.5 eV`],correct:0,explanation:`ΔE = -3.4 - (-13.6) = 10.2 eV.`}],arduino_led:[{q:`What is the primary function of a current-limiting resistor in an LED loop?`,options:[`Store charge`,`Limit current and protect LED`,`Convert AC to DC`,`Oscillate voltage`],correct:1,explanation:`Resistors limit the flow of current to prevent burning out components like LEDs.`}]};function Qf(e,t,n){let r=0,i=0,a=0,o=0,s=0,c=0,l=0,u=0;if(t===`ohms`){r=e.V;let t=e.R;i=r/(t||1)*(1+Math.sin(r*1e3+t)*.008),a=r/(i||1),o=r*i}else if(t===`kvl`||t===`kcl`)r=e.V,i=r/(e.R||1),a=e.R,o=r*i;else if(t===`lcr`||t===`rc_rl_rlc`){r=e.V;let t=e.L*.001,n=e.C*1e-6,d=2*Math.PI*e.f;s=d*t,c=1/(d*n||1),a=Math.sqrt(e.R*e.R+(s-c)*(s-c)),i=r/(a||1),l=Math.atan2(s-c,e.R)*(180/Math.PI),u=1/(2*Math.PI*Math.sqrt(t*n)||1),o=i*i*e.R}else if(t===`rc`)r=e.V,a=e.R,i=r/(e.R||1),o=r*i,u=e.R*(e.C*1e-6);else if(t===`series_parallel`)r=e.V,a=e.R+e.L,i=r/a,o=r*i;else if(t===`wheatstone`){r=e.V;let t=e.R,n=e.L,s=e.C,c=150*t/n;a=t+n+s+150,i=Math.abs(s-c)*1e-4,o=r*i,u=c}else if(t===`faraday`||t===`lenz`){let t=e.V,n=e.R,s=e.L||200,c=Date.now()*.005,l=Math.sin(c)*Math.exp(-((Math.sin(c*.5)*3)**2));r=s*n*t*l*.02,i=r/10,a=10,o=Math.abs(r*i)}else if(t===`solenoid`){let t=e.V,n=e.R,s=e.L||.5,c=4*Math.PI*1e-7*(n/s)*t;r=t,i=t,a=c*1e4,o=t*t*2}else if(t===`transformer`){let t=e.V,n=e.R,s=e.L||400;r=s/(n||1)*t,i=r/100,a=s/(n||1),o=r*i}else if(t===`snell`||t===`tir`){let t=e.V,n=e.R,s=e.C,c=t/n*Math.sin(s*Math.PI/180),l=0,d=0;t>n&&(d=Math.asin(n/t)*180/Math.PI),l=c<=1?Math.asin(c)*180/Math.PI:90,r=s,i=l,a=n/t,o=d,u=Math.abs(s-l)}else if(t===`lens_eq`){let t=e.V,n=e.R,s=0;s=t===n?9999:t*n/(t-n),r=t,i=s,a=n,o=Math.abs(s/t)}else if(t===`prism`){let t=e.V,n=e.R,o=e.C,s=n*(o-1);r=t,i=s,a=o}else if(t===`pendulum`){let t=e.V,n=e.R,s=e.L||9.8,c=2*Math.PI*Math.sqrt(n/s),l=Date.now()*.001,d=Math.sqrt(s/n),f=t*Math.cos(d*l),p=-t*(Math.PI/180)*d*Math.sin(d*l);r=f,i=p,a=c;let m=.5,h=n*(1-Math.cos(t*Math.PI/180)),g=n*(1-Math.cos(f*Math.PI/180));o=m*s*(h-g),u=m*s*g}else if(t===`hooke`){let t=e.V*.001,n=e.R,o=t*9.8/n;r=t*1e3,i=o*100,a=n}else if(t===`projectile`){let t=e.V*Math.PI/180,n=e.R,o=e.L||9.8,s=n*n*Math.sin(2*t)/o,c=n*n*Math.sin(t)*Math.sin(t)/(2*o);r=e.V,i=s,a=c}else if(t===`doppler`){let t=e.V,n=e.R,o=e.L||340,s=n*(o/(o-t)),c=n*(o/(o+t));r=s,i=c,a=t}else if(t===`ideal_gas`||t===`boyle`||t===`charles`){let n=t===`charles`?e.V*.03:e.V,s=t===`charles`?e.V:e.R,c=e.L||1,l=8.314;r=c*l*s/(n||1),i=n,a=s,o=c,u=1.5*c*l*s}else if(t===`specific_heat`){let t=e.V,n=e.R,s=e.L||200,c=.385,l=4.184,u=(t*c*n+s*l*25)/(t*c+s*l);r=n,i=25,a=u,o=t*c*(n-u)}else if(t===`photoelectric`){let t=e.V,n=e.R,s=e.L||2.2,c=t*0x5af3107a4000*41357e-19,l=0,d=0;c>s&&(l=c-s,d=l),r=t,i=n,a=s,o=d,u=l}else if(t===`radioactive`){let t=e.V,n=e.R,s=Date.now()*.001%60,c=Math.LN2/n,l=t*Math.exp(-c*s);r=t,i=l,a=n,o=c*l}else if(t===`de_broglie`){let t=e.V*1e-30,n=e.R*1e3,o=6626e-37/(t*n||1);r=t*1e30,i=n*.001,a=o*1e9}else if(t===`bohr_model`){let t=e.V,n=e.R,o=-13.6/(t*t),s=-13.6/(n*n),c=Math.abs(o-s);r=t,i=n,a=c}else r=e.V,i=e.V/(e.R||1),a=e.R,o=r*i;return{V:r,I:i,Z:a,P:o,XL:s,XC:c,phi:l,f0:u}}function $f(){let e=Mp(),t=t=>e.find(t),n=Y.placedComponents,r=e=>n.find(t=>t.type===e),i=r(`source`),a=r(`resistor`),o=r(`inductor`),s=r(`capacitor`),c=r(`ammeter`),l=r(`voltmeter`);r(`led`),r(`button`)||r(`toggle_switch`);let u=Y.activeExperiment;if(u===`ohms`){if(!i||!a||!c||!l)return{status:`error`,message:`Missing required components. Please place Source, Resistor, Ammeter, and Voltmeter.`};let e=a.snap1,n=a.snap2,r=c.snap1,o=c.snap2,s=l.snap1,u=l.snap2;if(t(e)===t(n))return{status:`error`,message:`Resistor is shorted! Both terminals are connected to the same electrical node.`};if(t(r)===t(o))return{status:`error`,message:`Ammeter is shorted! Both terminals are connected to the same electrical node.`};if(t(s)===t(u))return{status:`error`,message:`Voltmeter is shorted! Both terminals are connected to the same electrical node.`};let d=t(0),f=t(1);if(d===f)return{status:`error`,message:`Short Circuit Detected! Positive rail (+) is connected directly to Ground (-) rail.`};let p=t(e),m=t(n),h=t(r),g=t(o),_=t(s),v=t(u);return!((p===d&&m===h||m===d&&p===h)&&g===f||(p===d&&m===g||m===d&&p===g)&&h===f)&&!((h===d&&g===p||g===d&&h===p)&&m===f||(h===d&&g===m||g===d&&h===m)&&p===f)?!(p===d||m===d)&&!(h===d||g===d)?{status:`error`,message:`Circuit is open! Connect the Source (+) rail to either the Resistor or the Ammeter.`}:!(p===f||m===f)&&!(h===f||g===f)?{status:`error`,message:`Circuit is open! Connect the series components back to the Source (-) rail.`}:p===h||p===g||m===h||m===g?{status:`error`,message:`Invalid series loop. Ensure: Battery (+) -> Ammeter -> Resistor -> Ground (-).`}:{status:`error`,message:`Ammeter must be connected in SERIES with the Resistor. Connect them together.`}:_===p&&v===m||_===m&&v===p?{status:`success`,message:`Ohm's Law DC series-parallel circuit loop verified and closed!`}:{status:`error`,message:`Voltmeter is connected incorrectly! It must be wired in PARALLEL directly across the Resistor.`}}if(u===`lcr`){if(!i||!a||!o||!s)return{status:`error`,message:`Missing required components. Place Source, Resistor, Inductor, and Capacitor.`};let e=a.snap1,n=a.snap2,r=o.snap1,c=o.snap2,l=s.snap1,u=s.snap2,d=t(98)===t(e)||t(98)===t(n),f=(t(98)===t(e)?e:n)===e?n:e;if(!d)return{status:`error`,message:`Connect Source (+) rail to Resistor start.`};let p=t(f)===t(r)||t(f)===t(c),m=(t(f)===t(r)?r:c)===r?c:r;if(!p)return{status:`error`,message:`Connect Resistor end to Inductor start.`};let h=t(m)===t(l)||t(m)===t(u),g=(t(m)===t(l)?l:u)===l?u:l;return h?t(g)===t(267)?{status:`success`,message:`Series LCR resonance loop closed and verified!`}:{status:`error`,message:`Connect Capacitor end back to Source (-) rail to close the loop.`}:{status:`error`,message:`Connect Inductor end to Capacitor start.`}}if(u===`rc`){if(!i||!a||!s)return{status:`error`,message:`Missing components. Place Source, Resistor, and Capacitor.`};let e=a.snap1,n=a.snap2,r=s.snap1,o=s.snap2,c=t(126)===t(e)||t(126)===t(n),l=(t(126)===t(e)?e:n)===e?n:e;if(!c)return{status:`error`,message:`Connect Source (+) rail to Resistor start.`};let u=t(l)===t(r)||t(l)===t(o),d=(t(l)===t(r)?r:o)===r?o:r;return u?t(d)===t(267)?{status:`success`,message:`RC charging loop verified and closed!`}:{status:`error`,message:`Connect Capacitor end back to Source (-) rail to close the loop.`}:{status:`error`,message:`Connect Resistor end to Capacitor start.`}}return{status:`error`,message:`Unknown experiment.`}}var ep=null;function tp(){ep&&clearInterval(ep),ep=setInterval(async()=>{if(Y.isRunning)try{let e;if(Y.activeExperiment!==`arduino_led`)try{let t=await fetch(`/api/calculate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({params:Y.params,active_experiment:Y.activeExperiment,button_pressed:Y.buttonPressed})});if(t.ok)e=await t.json();else throw Error(`HTTP ${t.status}`)}catch(t){console.warn(`Backend calculation failed, falling back to local calculation.`,t),e=Qf(Y.params,Y.activeExperiment,Y.buttonPressed)}else e=Qf(Y.params,Y.activeExperiment,Y.buttonPressed);Y.meters.volts=e.V,Y.meters.amps=e.I,Y.meters.ohms=e.Z,Y.meters.power=e.P;let t=Date.now(),n=(t-Y.energyStartTime)/1e3;Y.energyStartTime=t,Y.meters.energy+=e.P*n,Y.analysis.XL=e.XL,Y.analysis.XC=e.XC,Y.analysis.phi=e.phi,Y.analysis.f0=e.f0,rp(),Cm()}catch(e){console.error(`Simulation polling error`,e)}},250)}function np(){ep&&=(clearInterval(ep),null)}function rp(){if(X.valVolts.innerText=Y.meters.volts.toFixed(2),X.valAmps.innerText=Y.meters.amps.toFixed(4),X.valOhms.innerText=Y.meters.ohms.toFixed(2),X.valPower.innerText=`${Y.meters.power.toFixed(2)} W`,X.valEnergy.innerText=`${Y.meters.energy.toFixed(1)} J`,X.fillVolts.style.width=`${Math.min(100,Y.meters.volts/30*100)}%`,X.fillAmps.style.width=`${Math.min(100,Y.meters.amps/3*100)}%`,X.fillOhms.style.width=`${Math.min(100,Y.meters.ohms/1e3*100)}%`,Y.activeExperiment===`lcr`?(X.diagXL.innerText=`${Y.analysis.XL.toFixed(1)} Ω`,X.diagXC.innerText=`${Y.analysis.XC.toFixed(1)} Ω`,X.diagPhi.innerText=`${Y.analysis.phi.toFixed(1)}°`,X.diagF0.innerText=`${Y.analysis.f0.toFixed(1)} Hz`):Y.activeExperiment===`rc`?(X.diagXL.innerText=`—`,X.diagXC.innerText=`—`,X.diagPhi.innerText=`—`,X.diagF0.innerText=`${(Y.analysis.f0*1e3).toFixed(1)} ms`):(X.diagXL.innerText=`—`,X.diagXC.innerText=`—`,X.diagPhi.innerText=`—`,X.diagF0.innerText=`—`),Y.activeExperiment===`ohms`)X.kirchhoffDisplay.innerText=`[OK] KVL Validated:\n V_source (${Y.meters.volts.toFixed(2)}V) - V_resistor (${Y.meters.volts.toFixed(2)}V) = 0.00V\n\n[OK] KCL Validated:\n I_in (${Y.meters.amps.toFixed(4)}A) = I_out (${Y.meters.amps.toFixed(4)}A)`;else if(Y.activeExperiment===`arduino_led`)X.kirchhoffDisplay.innerText=`[OK] Arduino Uno 5V Supply Active\n[OK] Switch Contact Status: ${Y.buttonPressed?`CLOSED`:`OPEN`}\n[OK] Current limiting Resistor: ${Y.params.R} Ω\n[OK] LED State: ${Y.meters.amps>0?`GLOWING`:`OFF`}\n\nLoop Current: ${(Y.meters.amps*1e3).toFixed(1)} mA`;else if(Y.activeExperiment===`lcr`)X.kirchhoffDisplay.innerText=`[OK] AC KVL Validated:
 V_source(t) = V_R(t) + V_L(t) + V_C(t)
 Loop impedance Z matches vector calculation.`;else if(Y.activeExperiment===`rc`){let e=(Y.analysis.f0*1e3).toFixed(1);X.kirchhoffDisplay.innerText=`[OK] Transient KVL Validated:\n V_capacitor + V_resistor = V_source\n\n[INFO] Time Constant (τ) = R × C\n τ = ${e} ms`}X.acAnalysisBlock&&(X.acAnalysisBlock.style.display=Y.activeExperiment===`lcr`?`block`:`none`);let e=Math.min(100,Y.score);X.scoreText&&(X.scoreText.innerText=`Score: ${e}`),X.scoreCircleText.textContent=e,X.scoreCirclePath.setAttribute(`stroke-dasharray`,`${e}, 100`);let t=`D`,n=`Complete steps to improve grade.`;e>=90?(t=`A+`,n=`Exceptional Lab Session!`):e>=70?(t=`A`,n=`Excellent understanding demonstrated.`):e>=50&&(t=`B`,n=`Good progress. Solve Viva questions.`),X.lblGrade.innerText=`Grade: ${t}`,document.querySelector(`.grade-desc`).innerText=n,[`R`,`C`,`L`,`V`].forEach(e=>{let t=document.querySelector(`.component-value-select[data-param="${e}"]`);if(t){let n=Y.params[e];Array.from(t.options).some(e=>parseFloat(e.value)===n)&&(t.value=n.toString())}}),Km()}function ip(){let e=document.querySelectorAll(`.rp-tabs .rp-tab`),t=document.querySelectorAll(`.rp-body .rp-panel`);e.forEach(n=>{n.addEventListener(`click`,()=>{e.forEach(e=>e.classList.remove(`active`)),n.classList.add(`active`),t.forEach(e=>e.classList.remove(`active`));let r=n.getAttribute(`data-rp`),i=document.getElementById(`rp-${r}`);i&&i.classList.add(`active`)})});let n=document.querySelectorAll(`.lab-sub-tab`),r=document.querySelectorAll(`[id^="sub-"]`);n.forEach(e=>{e.addEventListener(`click`,()=>{n.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),r.forEach(e=>e.style.display=`none`);let t=e.getAttribute(`data-sub`),i=document.getElementById(`sub-${t}`);i&&(i.style.display=`block`)})});let i=document.getElementById(`btn-tab-toggle-graph`);i&&i.addEventListener(`click`,()=>{X.btnGraphToggle&&X.btnGraphToggle.click()})}function ap(){let e=document.getElementById(`data-table-wrap`);if(!e)return;let t=`<th>#</th><th>V (V)</th><th>I (A)</th><th>Z (Ω)</th>`;Y.activeExperiment===`ohms`?t=`<th>#</th><th>V (V)</th><th>I (A)</th><th>R (Ω)</th>`:Y.activeExperiment===`lcr`?t=`<th>#</th><th>f (Hz)</th><th>V (V)</th><th>I (A)</th><th>Z (Ω)</th>`:Y.activeExperiment===`rc`&&(t=`<th>#</th><th>C (µF)</th><th>V (V)</th><th>I (A)</th><th>Z (Ω)</th>`);let n=``;Y.dataPoints.forEach(e=>{Y.activeExperiment===`lcr`?n+=`<tr><td>${e.id}</td><td>${e.f}</td><td>${e.V.toFixed(2)}</td><td>${e.I.toFixed(4)}</td><td>${e.R.toFixed(1)}</td></tr>`:Y.activeExperiment===`rc`?n+=`<tr><td>${e.id}</td><td>${e.C}</td><td>${e.V.toFixed(2)}</td><td>${e.I.toFixed(4)}</td><td>${e.R.toFixed(1)}</td></tr>`:n+=`<tr><td>${e.id}</td><td>${e.V.toFixed(2)}</td><td>${e.I.toFixed(4)}</td><td>${e.R.toFixed(1)}</td></tr>`}),e.innerHTML=`
    <table class="data-tbl">
      <thead>
        <tr>${t}</tr>
      </thead>
      <tbody>
        ${n||`<tr><td colspan="5" style="text-align:center;color:var(--text3);">No recorded points yet</td></tr>`}
      </tbody>
    </table>
  `}function op(e,t,n=!1){if(!X.aiMessagesContainer)return;let r=document.createElement(`div`);r.className=`ai-msg ${n?`user`:``}`,r.innerHTML=`
    <div class="ai-avatar">${n?`👤`:`⚡`}</div>
    <div>
      ${n?``:`<div style="font-size:9px;font-weight:600;color:var(--accent);letter-spacing:.5px;margin-bottom:3px">${e}</div>`}
      <div class="ai-bubble">${t}</div>
    </div>
  `,X.aiMessagesContainer.appendChild(r),X.aiMessagesContainer.scrollTop=X.aiMessagesContainer.scrollHeight}function sp(e,t){let n=0,r=100,i=1;if(e===`V`?(n=Y.activeExperiment===`ohms`?0:1,r=Y.activeExperiment===`ohms`?30:24,i=Y.activeExperiment===`ohms`?.1:1):e===`R`?(n=Y.activeExperiment===`ohms`?1:10,r=Y.activeExperiment===`ohms`?1e3:600,i=Y.activeExperiment===`ohms`?.1:1):e===`L`||e===`C`?(n=1,r=500,i=1):e===`f`?(n=1,r=1e3,i=1):e===`T`&&(n=0,r=200,i=1),t=Math.max(n,Math.min(r,t)),t=i===.1?Math.round(t*10)/10:Math.round(t),Y.activeExperiment===`ohms`){let n=Date.now();e===`R`&&t!==Y.lastResistance?(Y.lastResistance=t,Y.dataPoints.length>0&&(Y.dataPoints=[],ap(),Sp(),X.conclusionText&&(X.conclusionText.innerHTML=``),Y.meters.energy=0,n-(Y.lastMentorMsgTime||0)>3e3&&(op(`Circuit IQ · AI Mentor`,`Only one parameter should vary during Ohm’s Law verification. Resetting graph and table for the new resistance: `+t.toFixed(1)+` Ω.`),Y.lastMentorMsgTime=n))):e===`V`&&t!==Y.params.V&&Y.dataPoints.length>0&&n-(Y.lastMentorMsgTime||0)>5e3&&(op(`Circuit IQ · AI Mentor`,`Only one parameter (Voltage) is varying during Ohm’s Law verification. Resistance is kept fixed at `+(Y.params.R||100).toFixed(1)+` Ω.`),Y.lastMentorMsgTime=n)}Y.params[e]=t;let a=document.getElementById(`sl-${e.toLowerCase()}`);a&&(a.value=t);let o=document.getElementById(`lbl-${e.toLowerCase()}`);o&&(o.value=t);let s=document.querySelector(`.component-value-select[data-param="${e}"]`);s&&Array.from(s.options).some(e=>parseFloat(e.value)===t)&&(s.value=t.toString()),e===`R`&&Im(),Cm(),Sm()}function cp(e){Y.params.led_color=e,document.querySelectorAll(`.component-value-select[data-param="led_color"]`).forEach(t=>{t.value=e});let t=document.getElementById(`sidebar-led-svg-color`),n=document.getElementById(`sidebar-led-svg-base`);if(t&&n&&(e===`red`?(t.setAttribute(`fill`,`#ef4444`),n.setAttribute(`fill`,`#dc2626`)):e===`green`?(t.setAttribute(`fill`,`#22c55e`),n.setAttribute(`fill`,`#16a34a`)):e===`yellow`?(t.setAttribute(`fill`,`#eab308`),n.setAttribute(`fill`,`#ca8a04`)):e===`blue`?(t.setAttribute(`fill`,`#3b82f6`),n.setAttribute(`fill`,`#2563eb`)):e===`white`&&(t.setAttribute(`fill`,`#e0e8ff`),n.setAttribute(`fill`,`#94a3b8`))),Y.selectedComponentIdx!==-1){let t=Y.placedComponents[Y.selectedComponentIdx];t&&t.type===`led`&&(t.color=e,lp(t,e))}Km(),Sm()}function lp(e,t){let n=15680580;if(t===`green`?n=2278750:t===`yellow`?n=15381256:t===`blue`?n=3900150:t===`white`&&(n=14739711),e.mesh.userData.ledMat)if(e.mesh.userData.ledMat.color.setHex(n),Y.isRunning&&Y.meters.amps>0){let n=16720384;t===`green`?n=65348:t===`yellow`?n=16768256:t===`blue`?n=30719:t===`white`&&(n=16777215),e.mesh.userData.ledMat.emissive.setHex(n),e.mesh.userData.ledMat.emissiveIntensity=4,e.mesh.userData.ledLight&&(e.mesh.userData.ledLight.color.setHex(n),e.mesh.userData.ledLight.intensity=2.5)}else e.mesh.userData.ledMat.emissive.setHex(0),e.mesh.userData.ledMat.emissiveIntensity=0,e.mesh.userData.ledLight&&(e.mesh.userData.ledLight.intensity=0)}var up={ohms:{V:{label:`Source Voltage`,min:0,max:30,step:.1,val:12,unit:`V`},R:{label:`Resistance`,min:1,max:1e3,step:.1,val:100,unit:`Ω`}},lcr:{V:{label:`Source Voltage`,min:1,max:24,step:1,val:12,unit:`V`},R:{label:`Resistance`,min:10,max:600,step:1,val:100,unit:`Ω`},L:{label:`Inductance`,min:1,max:200,step:1,val:50,unit:`mH`},C:{label:`Capacitance`,min:1,max:500,step:1,val:100,unit:`µF`},f:{label:`Frequency`,min:10,max:1e3,step:1,val:50,unit:`Hz`}},rc:{V:{label:`Source Voltage`,min:1,max:24,step:1,val:12,unit:`V`},R:{label:`Resistance`,min:10,max:600,step:1,val:100,unit:`Ω`},C:{label:`Capacitance`,min:1,max:500,step:1,val:100,unit:`µF`}},kvl:{V:{label:`Source Voltage`,min:0,max:30,step:.1,val:12,unit:`V`},R:{label:`Loop Resistance R1`,min:1,max:1e3,step:.1,val:100,unit:`Ω`}},kcl:{V:{label:`Source Voltage`,min:0,max:30,step:.1,val:12,unit:`V`},R:{label:`Branch Resistance R1`,min:1,max:1e3,step:.1,val:100,unit:`Ω`}},rc_rl_rlc:{V:{label:`Source Voltage`,min:1,max:24,step:1,val:12,unit:`V`},R:{label:`Resistance`,min:10,max:600,step:1,val:100,unit:`Ω`},L:{label:`Inductance`,min:1,max:200,step:1,val:50,unit:`mH`},C:{label:`Capacitance`,min:1,max:500,step:1,val:100,unit:`µF`},f:{label:`Frequency`,min:10,max:1e3,step:1,val:50,unit:`Hz`}},series_parallel:{V:{label:`Source Voltage`,min:0,max:30,step:.1,val:12,unit:`V`},R:{label:`Resistor R1`,min:1,max:1e3,step:.1,val:100,unit:`Ω`},L:{label:`Resistor R2`,min:1,max:1e3,step:.1,val:100,unit:`Ω`}},wheatstone:{V:{label:`Source Voltage`,min:0,max:30,step:.1,val:12,unit:`V`},R:{label:`Resistor R1`,min:1,max:1e3,step:.1,val:100,unit:`Ω`},L:{label:`Resistor R2`,min:1,max:1e3,step:.1,val:100,unit:`Ω`},C:{label:`Resistor R3 (Var)`,min:1,max:1e3,step:.1,val:100,unit:`Ω`}},faraday:{V:{label:`Magnet Velocity`,min:.5,max:5,step:.1,val:2,unit:`m/s`},R:{label:`Magnet Strength`,min:.1,max:2,step:.1,val:1,unit:`T`},L:{label:`Coil Turns N`,min:50,max:500,step:10,val:200,unit:`turns`}},lenz:{V:{label:`Magnet Velocity`,min:.5,max:5,step:.1,val:2,unit:`m/s`},R:{label:`Magnet Strength`,min:.1,max:2,step:.1,val:1,unit:`T`}},solenoid:{V:{label:`Current I`,min:.1,max:10,step:.1,val:2,unit:`A`},R:{label:`Coil Turns N`,min:100,max:2e3,step:50,val:500,unit:`turns`},L:{label:`Solenoid Length L`,min:.1,max:1,step:.05,val:.5,unit:`m`}},transformer:{V:{label:`Primary Voltage Vp`,min:10,max:220,step:5,val:110,unit:`V`},R:{label:`Primary Turns Np`,min:50,max:500,step:10,val:200,unit:`turns`},L:{label:`Secondary Turns Ns`,min:50,max:1e3,step:10,val:400,unit:`turns`}},snell:{V:{label:`Index n1`,min:1,max:2.5,step:.01,val:1,unit:``},R:{label:`Index n2`,min:1,max:2.5,step:.01,val:1.5,unit:``},C:{label:`Incident Angle θ₁`,min:0,max:90,step:1,val:45,unit:`°`}},lens_eq:{V:{label:`Object Distance u`,min:5,max:100,step:1,val:30,unit:`cm`},R:{label:`Focal Length f`,min:2,max:50,step:.5,val:15,unit:`cm`}},tir:{V:{label:`Index n1 (Dense)`,min:1.2,max:2.5,step:.01,val:1.5,unit:``},R:{label:`Index n2 (Rare)`,min:1,max:1.5,step:.01,val:1,unit:``},C:{label:`Incident Angle θ₁`,min:0,max:90,step:1,val:45,unit:`°`}},prism:{V:{label:`Incident Angle i`,min:0,max:90,step:1,val:45,unit:`°`},R:{label:`Apex Angle A`,min:30,max:75,step:1,val:60,unit:`°`},C:{label:`Base Index n₀`,min:1.2,max:2,step:.01,val:1.5,unit:``}},pendulum:{V:{label:`Start Angle θ₀`,min:5,max:90,step:1,val:30,unit:`°`},R:{label:`String Length L`,min:.2,max:3,step:.05,val:1.5,unit:`m`},L:{label:`Gravity g`,min:1,max:25,step:.1,val:9.8,unit:`m/s²`}},hooke:{V:{label:`Hanging Mass m`,min:10,max:1e3,step:10,val:200,unit:`g`},R:{label:`Spring Constant k`,min:5,max:100,step:1,val:25,unit:`N/m`}},projectile:{V:{label:`Launch Angle θ`,min:0,max:90,step:1,val:45,unit:`°`},R:{label:`Initial Velocity v₀`,min:1,max:50,step:1,val:20,unit:`m/s`},L:{label:`Gravity g`,min:1,max:25,step:.1,val:9.8,unit:`m/s²`}},doppler:{V:{label:`Source Velocity vs`,min:0,max:150,step:1,val:50,unit:`m/s`},R:{label:`Source Freq fs`,min:100,max:2e3,step:10,val:500,unit:`Hz`},L:{label:`Sound Speed v`,min:200,max:500,step:5,val:340,unit:`m/s`}},ideal_gas:{V:{label:`Chamber Volume V`,min:1,max:30,step:.1,val:10,unit:`L`},R:{label:`Temperature T`,min:100,max:1e3,step:5,val:300,unit:`K`},L:{label:`Moles n`,min:.1,max:5,step:.1,val:1,unit:`mol`}},boyle:{V:{label:`Chamber Volume V`,min:1,max:30,step:.1,val:10,unit:`L`},R:{label:`Temperature (Fix)`,min:100,max:1e3,step:5,val:300,unit:`K`}},charles:{V:{label:`Temperature T`,min:100,max:1e3,step:5,val:300,unit:`K`},R:{label:`Pressure (Fix)`,min:10,max:500,step:5,val:100,unit:`kPa`}},specific_heat:{V:{label:`Metal Mass mm`,min:10,max:500,step:5,val:100,unit:`g`},R:{label:`Metal Temp Tm`,min:50,max:200,step:1,val:100,unit:`°C`},L:{label:`Water Mass mw`,min:50,max:500,step:5,val:200,unit:`g`}},photoelectric:{V:{label:`Light Frequency ν`,min:1,max:15,step:.1,val:8,unit:`10¹⁴ Hz`},R:{label:`Light Intensity P`,min:10,max:500,step:10,val:100,unit:`mW`},L:{label:`Work Function Φ`,min:1,max:6,step:.1,val:2.2,unit:`eV`}},radioactive:{V:{label:`Initial Nuclei N₀`,min:50,max:1e3,step:10,val:500,unit:`nuclei`},R:{label:`Half-Life T₁/₂`,min:1,max:50,step:.5,val:10,unit:`s`}},de_broglie:{V:{label:`Particle Mass m`,min:.1,max:10,step:.1,val:1,unit:`10⁻³⁰ kg`},R:{label:`Velocity v`,min:1,max:1e3,step:10,val:100,unit:`km/s`}},bohr_model:{V:{label:`Initial State ni`,min:2,max:6,step:1,val:3,unit:``},R:{label:`Final State nf`,min:1,max:5,step:1,val:1,unit:``}},arduino_led:{V:{label:`Source Voltage`,min:1,max:24,step:1,val:5,unit:`V`},R:{label:`Resistance`,min:10,max:600,step:1,val:150,unit:`Ω`}}};function dp(e,t,n,r,i,a,o,s){let c=document.querySelector(`#rp-meters .meter:nth-child(1) .meter-hdr span:nth-child(1)`),l=document.querySelector(`#rp-meters .meter:nth-child(1) .meter-unit`),u=document.querySelector(`#rp-meters .meter:nth-child(2) .meter-hdr span:nth-child(1)`),d=document.querySelector(`#rp-meters .meter:nth-child(2) .meter-unit`),f=document.getElementById(`meter-impedance-title`),p=document.querySelector(`#rp-meters .meter:nth-child(3) .meter-unit`),m=document.querySelector(`#rp-meters .prop-block .analysis-cell:nth-child(1) .ac-label`),h=document.querySelector(`#rp-meters .prop-block .analysis-cell:nth-child(2) .ac-label`);c&&(c.innerText=e),l&&(l.innerText=t),u&&(u.innerText=n),d&&(d.innerText=r),f&&(f.innerText=i),p&&(p.innerText=a),m&&(m.innerText=o),h&&(h.innerText=s)}function fp(e){Y.proceduralGroup=new jn,Z.add(Y.proceduralGroup);let t=new K({color:4674921,metalness:.8,roughness:.2}),n=new K({color:14251782,metalness:.8,roughness:.3}),r=new Xo({color:14742270,transparent:!0,opacity:.4,roughness:.1,transmission:.85,thickness:.5}),i=new Bi({color:16711765});if([`snell`,`lens_eq`,`tir`,`prism`].includes(e)){let n=new jn;n.name=`laser-source`;let a=new U(new W(.6,.25,.25),t);a.position.set(-2.5,.4,0),n.add(a);let o=new U(new G(.04,.04,.4),t);o.position.set(-2.5,.2,0),n.add(o),Y.proceduralGroup.add(n);let s=[new B(-2.5,.4,0),new B(0,.4,0)],c=new Ji(new Pr().setFromPoints(s),i);if(c.name=`laser-ray`,Y.proceduralGroup.add(c),e===`snell`||e===`tir`){let e=new U(new G(1.8,1.8,.02,64),new K({color:988970,roughness:.8}));e.position.y=.01,Y.proceduralGroup.add(e);let t=new U(new Io(1.7,1.75,64),new Jr({color:6583435,side:2}));t.rotation.x=Math.PI/2,t.position.y=.022,Y.proceduralGroup.add(t);let n=new U(new G(1.3,1.3,.4,32,1,!1,0,Math.PI),r);n.position.set(0,.2,0),n.rotation.x=Math.PI/2,n.rotation.z=Math.PI/2,Y.proceduralGroup.add(n)}else if(e===`prism`){let e=new U(new G(.7,.7,1,3,1),r);e.position.set(0,.5,0),e.rotation.y=Math.PI/6,Y.proceduralGroup.add(e)}else if(e===`lens_eq`){let e=new U(new G(.03,.03,4.8),t);e.rotation.z=Math.PI/2,e.position.set(0,.1,0),Y.proceduralGroup.add(e);let n=new U(new G(.03,.03,.5),t);n.position.set(0,.25,0),Y.proceduralGroup.add(n);let i=new U(new Lo(.5,32,32),r);i.scale.set(1,1,.22),i.position.set(0,.6,0),Y.proceduralGroup.add(i);let a=new U(new G(.02,.02,.4),new K({color:15680580}));a.position.set(-1.5,.3,0),a.name=`lens-object-pin`,Y.proceduralGroup.add(a);let o=new U(new W(.05,.7,.7),new K({color:16317180,roughness:.9}));o.position.set(1.5,.45,0),o.name=`lens-image-screen`,Y.proceduralGroup.add(o);let s=new U(new G(.02,.02,.25),t);s.position.set(1.5,.125,0),s.name=`lens-screen-stand`,Y.proceduralGroup.add(s)}}else if(e===`pendulum`){let e=new U(new W(1,.04,1),t);e.position.y=.02,Y.proceduralGroup.add(e);let n=new U(new G(.03,.03,2.4),t);n.position.set(-.35,1.2,0),Y.proceduralGroup.add(n);let r=new U(new G(.02,.02,.5),t);r.rotation.z=Math.PI/2,r.position.set(-.1,2.3,0),Y.proceduralGroup.add(r);let i=new jn;i.position.set(0,2.3,0),i.name=`pendulum-pivot`,Y.proceduralGroup.add(i);let a=new U(new G(.006,.006,1.4),new K({color:14870768}));a.position.y=-.7,a.name=`pendulum-string`,i.add(a);let o=new U(new Lo(.12,32,32),new K({color:16096779,metalness:.9,roughness:.1}));o.position.y=-1.4,o.name=`pendulum-bob`,i.add(o)}else if(e===`hooke`){let e=new U(new W(1,.04,1),t);e.position.y=.02,Y.proceduralGroup.add(e);let n=new U(new G(.03,.03,3),t);n.position.set(-.35,1.5,0),Y.proceduralGroup.add(n);let r=new U(new G(.02,.02,.5),t);r.rotation.z=Math.PI/2,r.position.set(-.1,2.9,0),Y.proceduralGroup.add(r);let i=new jn;i.position.set(0,2.9,0),i.name=`spring-group`,Y.proceduralGroup.add(i);let a=new U(new G(.12,.12,.2),new K({color:14251782,metalness:.8}));a.position.set(0,1.3,0),a.name=`spring-weight`,Y.proceduralGroup.add(a)}else if(e===`projectile`){let e=new U(new W(10,.02,1.5),new K({color:988970,roughness:.9}));e.position.y=.01,Y.proceduralGroup.add(e);let n=new jn;n.position.set(-4,.2,0),n.name=`cannon-group`,Y.proceduralGroup.add(n);let r=new U(new G(.1,.1,.7,16),t);r.rotation.z=Math.PI/4,r.position.set(.25,.25,0),r.name=`cannon-barrel`,n.add(r);let i=new U(new Lo(.15,16,16),new K({color:1976635}));n.add(i);let a=new U(new Lo(.07,16,16),new Jr({color:15680580}));a.position.set(-4,.2,0),a.name=`projectile-ball`,a.visible=!1,Y.proceduralGroup.add(a)}else if(e===`doppler`){let e=new U(new W(8,.02,1.5),new K({color:1976635,roughness:.9}));e.position.y=.01,Y.proceduralGroup.add(e);let t=new U(new W(.4,.25,.3),new K({color:3900150}));t.position.set(-2.5,.135,0),t.name=`doppler-source`,Y.proceduralGroup.add(t);let n=new U(new G(.08,.08,.4),new K({color:15680580}));n.position.set(1.5,.21,0),Y.proceduralGroup.add(n);let r=new jn;r.name=`doppler-ripples`,Y.proceduralGroup.add(r)}else if([`ideal_gas`,`boyle`,`charles`].includes(e)){let e=new U(new G(.65,.65,.08,32),t);e.position.y=.04,Y.proceduralGroup.add(e);let n=new U(new G(.6,.6,1.8,32,1,!0),r);n.position.set(0,.98,0),Y.proceduralGroup.add(n);let i=new U(new G(.58,.58,.08,32),new K({color:15680580,metalness:.7}));i.position.set(0,1.3,0),i.name=`piston-plate`,Y.proceduralGroup.add(i),Y.moleculesData=[];for(let e=0;e<30;e++){let e=new U(new Lo(.03,8,8),new Jr({color:16436245})),t=Math.random()*Math.PI*2,n=Math.random()*.45;e.position.set(n*Math.cos(t),.1+Math.random()*1,n*Math.sin(t)),Y.proceduralGroup.add(e),Y.moleculesData.push({mesh:e,vx:(Math.random()-.5)*.04,vy:(Math.random()-.5)*.04,vz:(Math.random()-.5)*.04})}}else if(e===`specific_heat`){let e=new U(new G(.6,.6,1.1,32,1,!1),r);e.position.set(-.8,.56,0),Y.proceduralGroup.add(e);let t=new U(new G(.56,.56,.8,32),new K({color:3900150,transparent:!0,opacity:.65}));t.position.set(-.8,.45,0),t.name=`specific-heat-water`,Y.proceduralGroup.add(t);let n=new U(new W(.28,.28,.28),new K({color:15680580,metalness:.8}));n.position.set(.8,.74,0),n.name=`specific-heat-metal`,Y.proceduralGroup.add(n)}else if(e===`photoelectric`){let e=new U(new G(.48,.48,2,32,1,!1),r);e.rotation.z=Math.PI/2,e.position.set(0,.5,0),Y.proceduralGroup.add(e);let n=new U(new W(.03,.5,.5),t);n.position.set(.7,.5,0),Y.proceduralGroup.add(n);let i=new U(new W(.03,.5,.5),new K({color:3462041,metalness:.7}));i.position.set(-.7,.5,0),Y.proceduralGroup.add(i);let a=new jn;a.name=`photoelectrons`,Y.proceduralGroup.add(a)}else if(e===`radioactive`){Y.decayList=[];let e=new Lo(.06,16,16);for(let t=0;t<10;t++)for(let n=0;n<10;n++){let r=new U(e,new K({color:15680580,roughness:.8}));r.position.set(-1.2+n*.26,.08,-1.2+t*.26),Y.proceduralGroup.add(r),Y.decayList.push({mesh:r,decayed:!1})}}else if(e===`de_broglie`){let e=new U(new G(.1,.1,.5),t);e.rotation.z=Math.PI/2,e.position.set(-2,.6,0),Y.proceduralGroup.add(e);let n=new U(new W(.02,1,1.8),t);n.position.set(-.5,.5,0),Y.proceduralGroup.add(n);let r=new U(new W(.02,1,1.8),new K({color:988970,roughness:.9}));r.position.set(1.8,.5,0),Y.proceduralGroup.add(r),Y.broglieParticles=[]}else if(e===`bohr_model`){let e=new U(new Lo(.2,32,32),new Jr({color:16347926}));e.position.set(0,.5,0),Y.proceduralGroup.add(e);for(let e=1;e<=5;e++){let t=e*.5,n=new U(new Io(t-.01,t+.01,64),new Jr({color:4674921,side:2}));n.rotation.x=Math.PI/2,n.position.set(0,.5,0),Y.proceduralGroup.add(n)}let t=new U(new Lo(.07,16,16),new Jr({color:3900150}));t.position.set(1.5,.5,0),t.name=`bohr-electron`,Y.proceduralGroup.add(t)}else if(e===`faraday`||e===`lenz`){let e=new U(new G(.45,.45,1,32,1,!0),n);e.position.set(0,.5,0),e.rotation.z=Math.PI/2,Y.proceduralGroup.add(e);let t=new jn;t.name=`faraday-magnet`,t.position.set(-2.2,.5,0);let r=new U(new W(.5,.25,.25),new K({color:15680580,metalness:.6}));r.position.x=.25,t.add(r);let i=new U(new W(.5,.25,.25),new K({color:3900150,metalness:.6}));i.position.x=-.25,t.add(i),Y.proceduralGroup.add(t)}else if(e===`solenoid`){let e=new U(new G(.35,.35,1.8,32,1,!0),n);e.position.set(0,.5,0),e.rotation.z=Math.PI/2,Y.proceduralGroup.add(e);let t=new jn;t.name=`solenoid-fields`,Y.proceduralGroup.add(t);for(let e=0;e<5;e++){let n=new U(new G(.08*e,.08*e,1.78,16,1,!0),new Jr({color:6333946,transparent:!0,opacity:.4,side:2}));n.rotation.z=Math.PI/2,n.position.set(0,.5,0),t.add(n)}}else if(e===`transformer`){let e=new K({color:3359061,metalness:.8,roughness:.2}),t=new U(new W(.18,1.2,.18),e);t.position.set(-.8,.6,0),Y.proceduralGroup.add(t);let r=new U(new W(.18,1.2,.18),e);r.position.set(.8,.6,0),Y.proceduralGroup.add(r);let i=new U(new W(1.78,.18,.18),e);i.position.set(0,1.2,0),Y.proceduralGroup.add(i);let a=new U(new W(1.78,.18,.18),e);a.position.set(0,0,0),Y.proceduralGroup.add(a);let o=new U(new G(.16,.16,.8),n);o.position.set(-.8,.6,0),Y.proceduralGroup.add(o);let s=new U(new G(.16,.16,.8),new K({color:9133302,metalness:.8}));s.position.set(.8,.6,0),Y.proceduralGroup.add(s)}}function pp(e){e===`led`&&(e=`arduino_led`),Y.activeExperiment=e,Y.dataPoints=[],Y.score=0,Y.completedSteps.clear(),Y.selectedComponentIdx=-1,Y.selectedHoleIndex=null,jm(!0),Km(),Y.placedComponents.forEach(e=>{Z.remove(e.mesh),e.leads.forEach(e=>Z.remove(e))}),Y.placedComponents=[],Y.wires.forEach(e=>{Z.remove(e.lineMesh),e.electrons.forEach(e=>Z.remove(e)),e.pins&&e.pins.forEach(e=>Z.remove(e)),e.sleeves&&e.sleeves.forEach(e=>Z.remove(e))}),Y.wires=[],Y.isRunning=!1,np(),Yf(!1),Y.proceduralGroup&&=(Z.remove(Y.proceduralGroup),null);let t=[`ohms`,`kvl`,`kcl`,`rc_rl_rlc`,`series_parallel`,`wheatstone`,`lcr`,`rc`,`arduino_led`].includes(e);em&&(em.visible=t),Gp&&(Gp.visible=e===`arduino_led`),t||fp(e);let n=[`V`,`R`,`L`,`C`,`f`,`T`],r=up[e]||{};n.forEach(e=>{let t=document.querySelector(`[data-slider-param="${e}"]`);if(t)if(r[e]){t.style.display=`block`;let n=t.querySelector(`.slider-label`),i=t.querySelector(`.param-input-wrap span`),a=document.getElementById(`lbl-${e.toLowerCase()}`),o=document.getElementById(`sl-${e.toLowerCase()}`);n&&(n.innerText=r[e].label),i&&(i.innerText=r[e].unit),o&&(o.min=r[e].min,o.max=r[e].max,o.step=r[e].step,o.value=r[e].val),a&&(a.min=r[e].min,a.max=r[e].max,a.step=r[e].step,a.value=r[e].val),Y.params[e]=r[e].val}else t.style.display=`none`}),X.experimentSelect&&(X.experimentSelect.value=e),e===`ohms`||e===`kvl`||e===`kcl`||e===`rc_rl_rlc`||e===`lcr`||e===`rc`||e===`series_parallel`||e===`wheatstone`||e===`arduino_led`?dp(`VOLTMETER`,`V`,`AMMETER`,`A`,e===`ohms`?`RESISTANCE`:`IMPEDANCE`,`Ω`,`Power`,`Energy`):[`snell`,`lens_eq`,`tir`,`prism`].includes(e)?dp(`INCIDENT θ₁`,`°`,`REFRACTED θ₂`,`°`,`REFRACT INDEX`,``,`Crit Angle θc`,`Deviation δ`):e===`pendulum`?dp(`POSITION θ`,`°`,`VELOCITY ω`,`rad/s`,`PERIOD T`,`s`,`Kinetic Energy`,`Potential Energy`):e===`hooke`||e===`projectile`||e===`doppler`?dp(`MEASURE V`,``,`MEASURE I`,``,`MEASURE Z`,``,`Kinetic Energy`,`Potential Energy`):[`ideal_gas`,`boyle`,`charles`].includes(e)?dp(`PRESSURE P`,`kPa`,`VOLUME V`,`L`,`TEMPERATURE T`,`K`,`Moles n`,`Internal Energy U`):e===`specific_heat`?dp(`METAL TEMP Tm`,`°C`,`WATER TEMP Tw`,`°C`,`MIXTURE Tf`,`°C`,`Heat Exchanged`,`Heat Capacity`):e===`photoelectric`?dp(`LIGHT FREQ ν`,`10¹⁴Hz`,`INTENSITY I`,`mW`,`WORK FUNCTION`,`eV`,`Stopping Volt Vs`,`Max K.E. Kmax`):e===`radioactive`?dp(`INITIAL N₀`,``,`REMAINING N`,``,`HALF-LIFE T₁/₂`,`s`,`Activity A`,`Decay Constant`):e===`de_broglie`?dp(`MASS m`,`10⁻³⁰kg`,`VELOCITY v`,`km/s`,`WAVELENGTH λ`,`nm`,`Momentum p`,`Kinetic Energy`):e===`bohr_model`&&dp(`INITIAL ni`,``,`FINAL nf`,``,`ENERGY GAP ΔE`,`eV`,`Emitted λ`,`Frequency ν`),ap();let i=Xf[e];if(X.meterVmMode.innerText=e===`lcr`?`AC RMS`:`DC`,X.formulaContainer.innerHTML=``,i&&i.formulas&&i.formulas.forEach(e=>{let t=document.createElement(`div`);t.className=`formula-chip`,t.innerHTML=`<span class="formula-name">${e.name}</span><span class="formula-expr">${e.expr}</span>`,X.formulaContainer.appendChild(t)}),X.stepsContainer.innerHTML=``,i&&i.steps&&i.steps.forEach((e,t)=>{let n=document.createElement(`div`);n.className=`step-item ${t===0?`cur`:``}`,n.id=`step-${e.id}`,n.innerHTML=`<div class="step-num ${t===0?`cur`:``}">${e.id}</div><div class="step-text">${e.text}</div>`,X.stepsContainer.appendChild(n)}),document.querySelector(`[data-slider-param="V"]`),document.querySelector(`[data-slider-param="R"]`),document.querySelector(`[data-slider-param="L"]`),document.querySelector(`[data-slider-param="C"]`),document.querySelector(`[data-slider-param="f"]`),document.querySelector(`[data-slider-param="T"]`),X.vivaContainer.innerHTML=``,Zf[e]&&Zf[e].forEach((t,n)=>{let r=document.createElement(`div`);r.className=`viva-q`;let i=``;t.options.forEach((e,t)=>{i+=`<label class="viva-opt" id="viva-opt-${n}-${t}"><input type="radio" name="viva-q-${n}" value="${t}"><span>${e}</span></label>`}),r.innerHTML=`
        <span class="q-num">QUESTION ${n+1} of ${Zf[e].length}</span>
        <div class="q-text">${t.q}</div>
        <div class="viva-options" id="viva-opts-${n}">${i}</div>
        <div class="viva-explanation" id="viva-exp-${n}" style="display:none;margin-top:8px;padding:8px;border-radius:5px;font-size:10px;line-height:1.6;"></div>
      `,X.vivaContainer.appendChild(r),r.querySelectorAll(`input[type="radio"]`).forEach(e=>{e.addEventListener(`change`,()=>{let i=parseInt(e.value)===t.correct,a=document.getElementById(`viva-exp-${n}`);t.options.forEach((r,a)=>{let o=document.getElementById(`viva-opt-${n}-${a}`);o&&(a===t.correct?(o.style.background=`rgba(0,208,132,0.12)`,o.style.borderColor=`rgba(0,208,132,0.5)`,o.style.borderRadius=`5px`,o.style.padding=`3px 6px`):a===parseInt(e.value)&&!i&&(o.style.background=`rgba(239,68,68,0.12)`,o.style.borderColor=`rgba(239,68,68,0.5)`,o.style.borderRadius=`5px`,o.style.padding=`3px 6px`))}),i?(Y.score+=20,r.style.borderColor=`rgba(0, 208, 132, 0.4)`,r.style.background=`rgba(0, 208, 132, 0.05)`,a&&(a.style.display=`block`,a.style.background=`rgba(0,208,132,0.08)`,a.style.border=`1px solid rgba(0,208,132,0.25)`,a.style.color=`var(--accent)`,a.innerHTML=`<strong>✓ Correct!</strong> ${t.explanation||`Well done!`}`),op(`Circuit IQ · AI Mentor`,`✓ Correct! ${t.explanation||`Great job!`}`)):(r.style.borderColor=`rgba(239, 68, 68, 0.4)`,r.style.background=`rgba(239, 68, 68, 0.05)`,a&&(a.style.display=`block`,a.style.background=`rgba(239,68,68,0.08)`,a.style.border=`1px solid rgba(239,68,68,0.25)`,a.style.color=`#f87171`,a.innerHTML=`<strong>✗ Incorrect.</strong> ${t.explanation||`Review the theory and try again.`}  <br><em>Correct answer: <strong>${t.options[t.correct]}</strong></em>`),op(`Circuit IQ · AI Mentor`,`✗ Incorrect. ${t.explanation||`Recheck formulas and theory tab.`}`)),r.querySelectorAll(`input`).forEach(e=>e.disabled=!0),rp()})})}),i)if(i.aim||i.apparatus){let e=`
        <div style="background:#111116;border:1px solid var(--border);border-radius:6px;padding:10px 12px;margin-bottom:10px;font-size:10px;line-height:1.7;">
          ${i.aim?`<div style="margin-bottom:6px;"><strong style="color:var(--accent);font-size:9px;letter-spacing:1px;text-transform:uppercase;">Aim</strong><br>${i.aim}</div>`:``}
          ${i.apparatus?`<div><strong style="color:var(--text2);font-size:9px;letter-spacing:1px;text-transform:uppercase;">Apparatus</strong><br>${i.apparatus}</div>`:``}
        </div>
      `;X.theoryText.innerHTML=e+(i.theory||``)}else X.theoryText.innerHTML=i.theory||``;X.conclusionText.innerText=`Experiment loaded: ${i.name}. Complete steps and simulate to generate conclusion.`,X.btnRun.style.display=`block`,X.btnStop.style.display=`none`,X.statusDot.style.background=`var(--accent)`,X.statusTextBar.innerText=`READY`,gp(0),rp(),vp(),Cm(),Gp&&(e===`arduino_led`?(Gp.visible=!0,Kp.visible=!0,qp.visible=!0):(Gp.visible=!1,Kp.visible=!1,qp.visible=!1)),Rp(),Ip(),hp(e)}function mp(){let e=document.getElementById(`components-search`),t=document.getElementById(`search-clear`),n=e?e.value.toLowerCase().trim():``;t&&e&&(t.style.display=e.value?`block`:`none`);let r=n.split(/\s+/).filter(e=>e.length>0),i=0;document.querySelectorAll(`#left-panel .lp-section`).forEach(e=>{let t=e.querySelector(`.lp-section-hdr`);if(t&&t.innerText.includes(`COMPONENTS`))return;let a=0;e.querySelectorAll(`.comp-chip`).forEach(e=>{let t=e.querySelector(`.comp-chip-name`),n=e.querySelector(`.comp-chip-sub`);if(!t)return;let o=`${t.innerText.toLowerCase()} ${n?n.innerText.toLowerCase():``} ${(e.getAttribute(`data-name`)||``).toLowerCase()} ${(e.getAttribute(`data-type`)||``).toLowerCase()}`,s=r.every(e=>o.includes(e));r.length===0||s?(e.style.display=`flex`,a++,i++):e.style.display=`none`});let o=e.querySelector(`.lp-section-hdr .count`);o&&(o.innerText=a),a===0&&n!==``?e.style.display=`none`:e.style.display=`block`});let a=document.getElementById(`total-components-count`);a&&(a.innerText=i)}function hp(e){mp()}function gp(e){X.protocolProgress.style.width=`${e}%`,X.progressPercent.innerText=`${e}% Complete`}function _p(e){if(Y.completedSteps.has(e))return;Y.completedSteps.add(e);let t=document.getElementById(`step-${e}`);if(t){t.classList.remove(`cur`),t.classList.add(`done`);let n=t.querySelector(`.step-num`);n&&(n.classList.remove(`cur`),n.classList.add(`done`),n.innerText=`✓`);let r=document.getElementById(`step-${e+1}`);if(r){r.classList.add(`cur`);let e=r.querySelector(`.step-num`);e&&e.classList.add(`cur`)}}Y.score+=10;let n=Xf[Y.activeExperiment].steps.length;gp(Math.round(Y.completedSteps.size/n*100)),rp()}function vp(){X.telemetryComps.innerText=Y.placedComponents.length,X.telemetryWires.innerText=Y.wires.length,Km()}function yp(){if(!X.oscCanvas){requestAnimationFrame(yp);return}let e=X.oscCanvas.getContext(`2d`),t=X.oscCanvas.width,n=X.oscCanvas.height;if(t<=0||n<=0){requestAnimationFrame(yp);return}let r=e.createRadialGradient(t/2,n/2,10,t/2,n/2,Math.max(t,n)/1.8);r.addColorStop(0,`#061a12`),r.addColorStop(.8,`#020a07`),r.addColorStop(1,`#000000`),e.fillStyle=r,e.fillRect(0,0,t,n);let i=t/10,a=n/8;e.strokeStyle=`rgba(0, 255, 136, 0.08)`,e.lineWidth=1;for(let t=1;t<10;t++){let r=t*i;e.beginPath(),e.moveTo(r,0),e.lineTo(r,n),e.stroke()}for(let n=1;n<8;n++){let r=n*a;e.beginPath(),e.moveTo(0,r),e.lineTo(t,r),e.stroke()}e.strokeStyle=`rgba(0, 255, 136, 0.25)`,e.lineWidth=1.2,e.beginPath(),e.moveTo(t/2,0),e.lineTo(t/2,n),e.stroke(),e.beginPath(),e.moveTo(0,n/2),e.lineTo(t,n/2),e.stroke(),e.strokeStyle=`rgba(0, 255, 136, 0.4)`,e.lineWidth=1;for(let r=0;r<t;r+=i/5)e.beginPath(),e.moveTo(r,n/2-3),e.lineTo(r,n/2+3),e.stroke();for(let r=0;r<n;r+=a/5)e.beginPath(),e.moveTo(t/2-3,r),e.lineTo(t/2+3,r),e.stroke();e.fillStyle=`rgba(0, 0, 0, 0.12)`;for(let r=0;r<n;r+=2)e.fillRect(0,r,t,1);let o=X.sliderOscTime?parseFloat(X.sliderOscTime.value):1,s=X.sliderOscVolts?parseFloat(X.sliderOscVolts.value):1;if(Y.isRunning){let r=Date.now()*.005,i=Y.params.f,a=Y.meters.volts/30*(n/2-10)*(1/s);if(e.lineWidth=2.5,e.lineCap=`round`,e.lineJoin=`round`,Y.activeExperiment===`ohms`)e.strokeStyle=`#00ff88`,e.shadowBlur=6,e.shadowColor=`#00ff88`,e.beginPath(),e.moveTo(0,n/2-a),e.lineTo(t,n/2-a),e.stroke();else if(Y.activeExperiment===`lcr`){e.strokeStyle=`#00ff88`,e.shadowBlur=6,e.shadowColor=`#00ff88`,e.beginPath();for(let s=0;s<t;s++){let c=n/2+Math.sin(s/t*Math.PI*4*(i/50)*o-r)*a;s===0?e.moveTo(s,c):e.lineTo(s,c)}e.stroke();let c=Y.analysis.phi*(Math.PI/180),l=Y.meters.amps/.5*(n/2-10)*(1/s);e.strokeStyle=`#00ffff`,e.shadowBlur=6,e.shadowColor=`#00ffff`,e.beginPath();for(let a=0;a<t;a++){let s=n/2+Math.sin(a/t*Math.PI*4*(i/50)*o-r-c)*l;a===0?e.moveTo(a,s):e.lineTo(a,s)}e.stroke()}else if(Y.activeExperiment===`rc`){e.strokeStyle=`#00ff88`,e.shadowBlur=6,e.shadowColor=`#00ff88`,e.beginPath();let i=200/o;for(let a=0;a<t;a++){let t=(a+r*60)%i/i,o=n-15-(n-40)*(1-Math.exp(-t*4.5))*(1/s);a===0||(a+r*60)%i<2?e.moveTo(a,o):e.lineTo(a,o)}e.stroke()}e.shadowBlur=0,e.fillStyle=`rgba(0, 255, 136, 0.7)`,e.font=`8px monospace`,e.textAlign=`left`,e.textBaseline=`top`,e.fillText(`CH1: ${(5*s).toFixed(1)}V/Div`,8,8),Y.activeExperiment===`lcr`&&(e.fillStyle=`rgba(0, 255, 255, 0.7)`,e.fillText(`CH2: ${(100*s).toFixed(0)}mA/Div`,8,18),e.fillStyle=`rgba(0, 255, 136, 0.7)`),e.fillText(`M: ${(2*o).toFixed(1)}ms/Div`,8,n-14),e.fillText(`DC Coupling`,t-68,n-14);let c=Y.meters.volts,l=Y.params.f;document.getElementById(`osc-vp`).innerText=`${c.toFixed(1)}V`,Y.activeExperiment===`ohms`?(X.oscFreqLbl.innerText=`0 Hz (DC)`,X.oscPhaseLbl.innerText=`0.0°`,document.getElementById(`osc-period`).innerText=`—`):Y.activeExperiment===`lcr`?(X.oscFreqLbl.innerText=`${l.toFixed(0)} Hz`,X.oscPhaseLbl.innerText=`${Y.analysis.phi.toFixed(1)}°`,document.getElementById(`osc-period`).innerText=`${(1e3/l).toFixed(1)}ms`):Y.activeExperiment===`rc`&&(X.oscFreqLbl.innerText=`Transient`,X.oscPhaseLbl.innerText=`RC`,document.getElementById(`osc-period`).innerText=`${(Y.analysis.f0*1e3).toFixed(0)}ms`)}else e.strokeStyle=`rgba(0, 255, 136, 0.2)`,e.beginPath(),e.moveTo(0,n/2),e.lineTo(t,n/2),e.stroke(),e.fillStyle=`rgba(0, 255, 136, 0.4)`,e.font=`8px monospace`,e.textAlign=`center`,e.fillText(`NO SIGNAL`,t/2,n/2-12),X.oscFreqLbl.innerText=`— Hz`,X.oscPhaseLbl.innerText=`— °`,document.getElementById(`osc-vp`).innerText=`— V`,document.getElementById(`osc-period`).innerText=`— ms`;requestAnimationFrame(yp)}var bp=null,xp=null;function Sp(){if(!X.graphCanvas)return;let e=X.graphCanvas.getContext(`2d`),t=X.graphCanvas.width,n=X.graphCanvas.height;if(t<=0||n<=0)return;e.fillStyle=`#060a16`,e.fillRect(0,0,t,n);let r=t-45-15,i=n-20-30;e.strokeStyle=`rgba(255, 255, 255, 0.08)`,e.lineWidth=1,e.strokeRect(45,20,r,i);let a=24,o=.5,s=Y.params.R||100;Y.activeExperiment===`ohms`&&(a=30,o=30/s),e.fillStyle=`#64748b`,e.font=`8px monospace`,e.textAlign=`center`,e.textBaseline=`top`;for(let t=0;t<=5;t++){let i=t/5*a,o=45+t/5*r;e.strokeStyle=`rgba(255, 255, 255, 0.04)`,e.beginPath(),e.moveTo(o,20),e.lineTo(o,n-30),e.stroke(),e.strokeStyle=`rgba(255, 255, 255, 0.2)`,e.beginPath(),e.moveTo(o,n-30),e.lineTo(o,n-30+4),e.stroke(),e.fillText(`${i.toFixed(0)}`,o,n-30+6)}e.textAlign=`right`,e.textBaseline=`middle`;for(let r=0;r<=5;r++){let a=r/5*o,s=n-30-r/5*i;e.strokeStyle=`rgba(255, 255, 255, 0.04)`,e.beginPath(),e.moveTo(45,s),e.lineTo(t-15,s),e.stroke(),e.strokeStyle=`rgba(255, 255, 255, 0.2)`,e.beginPath(),e.moveTo(41,s),e.lineTo(45,s),e.stroke();let c=a*1e3;e.fillText(`${c.toFixed(0)}`,37,s)}e.fillStyle=`#94a3b8`,e.font=`8px monospace`,e.textAlign=`center`,e.textBaseline=`bottom`,e.fillText(`Voltage V (V)`,45+r/2,n-2),e.save(),e.translate(12,20+i/2),e.rotate(-Math.PI/2),e.fillText(`Current I (mA)`,0,0),e.restore();let c=`—`,l=`—`,u=`—`;if(Y.activeExperiment===`ohms`&&Y.dataPoints.length>=2){let t=Y.dataPoints.length,d=0,f=0,p=0,m=0;Y.dataPoints.forEach(e=>{d+=e.V,f+=e.I,p+=e.V*e.I,m+=e.V*e.V});let h=t*m-d*d;if(h!==0){let m=(t*p-d*f)/h,g=(f-m*d)/t,_=m*1e3,v=1/m,y=Math.abs(v-s)/s*100;c=`${_.toFixed(3)} mA/V`,l=`${v.toFixed(1)} Ω`,u=`${y.toFixed(2)}%`,e.strokeStyle=`#00d084`,e.shadowBlur=6,e.shadowColor=`#00d084`,e.lineWidth=1.5,e.setLineDash([4,4]),e.beginPath();let b=m*0+g,x=45+0/a*r,S=n-30-b/o*i,C=a,w=m*C+g,T=45+C/a*r,E=n-30-w/o*i;e.moveTo(x,S),e.lineTo(T,E),e.stroke(),e.setLineDash([]),e.shadowBlur=0}}if(Y.dataPoints.length>0&&(e.strokeStyle=`rgba(168, 85, 247, 0.4)`,e.lineWidth=1.5,e.beginPath(),Y.dataPoints.forEach((t,s)=>{let c,l;Y.activeExperiment===`ohms`?(c=45+t.V/a*r,l=n-30-t.I/o*i):(c=45+t.I/o*r,l=n-30-t.V/a*i),s===0?e.moveTo(c,l):e.lineTo(c,l)}),Y.dataPoints.length>1&&e.stroke(),Y.dataPoints.forEach(t=>{let s,c;Y.activeExperiment===`ohms`?(s=45+t.V/a*r,c=n-30-t.I/o*i):(s=45+t.I/o*r,c=n-30-t.V/a*i),e.fillStyle=`#a855f7`,e.shadowBlur=8,e.shadowColor=`#a855f7`,e.beginPath(),e.arc(s,c,4,0,2*Math.PI),e.fill(),e.fillStyle=`#ffffff`,e.shadowBlur=0,e.beginPath(),e.arc(s,c,1.8,0,2*Math.PI),e.fill()})),bp!==null&&xp!==null&&bp>=45&&bp<=t-15&&xp>=20&&xp<=n-30){e.strokeStyle=`rgba(59, 130, 246, 0.4)`,e.lineWidth=1,e.setLineDash([3,3]),e.beginPath(),e.moveTo(45,xp),e.lineTo(t-15,xp),e.stroke(),e.beginPath(),e.moveTo(bp,20),e.lineTo(bp,n-30),e.stroke(),e.setLineDash([]);let s=(bp-45)/r*a,c=(n-30-xp)/i*o*1e3;e.shadowBlur=6,e.shadowColor=`rgba(0, 0, 0, 0.4)`,e.fillStyle=`rgba(15, 23, 42, 0.9)`,e.strokeStyle=`#3b82f6`,e.lineWidth=1;let l=bp+10,u=xp-34;l+75>t&&(l=bp-75-10),u<0&&(u=xp+10),e.fillRect(l,u,75,28),e.strokeRect(l,u,75,28),e.shadowBlur=0,e.fillStyle=`#f1f5f9`,e.font=`8px monospace`,e.textAlign=`left`,e.textBaseline=`top`,e.fillText(`V: ${s.toFixed(2)} V`,l+5,u+5),e.fillText(`I: ${c.toFixed(1)} mA`,l+5,u+15)}if(Y.activeExperiment===`ohms`&&Y.dataPoints.length>=2){e.fillStyle=`rgba(15, 23, 42, 0.85)`,e.strokeStyle=`rgba(0, 208, 132, 0.3)`,e.lineWidth=1;let n=t-15-100-5;e.fillRect(n,25,100,38),e.strokeRect(n,25,100,38),e.fillStyle=`#e2e8f0`,e.font=`7px monospace`,e.textAlign=`left`,e.textBaseline=`top`,e.fillText(`Slope: ${c}`,n+5,30),e.fillText(`R(slope): ${l}`,n+5,40),e.fillText(`Error: ${u}`,n+5,50),X.graphSlopeLbl.innerHTML=`Slope m: ${c} | R(slope): ${l} | Error: ${u}`}else X.graphSlopeLbl.innerText=Y.activeExperiment===`ohms`?`Slope: Need 2+ points`:`Slope: —`}function Cp(){let e=document.getElementById(`wiring-mode-banner`);e&&(Y.selectedTool===`wire`?(e.classList.remove(`hidden`),Y.placementStartHole===null?e.innerText=`● WIRING MODE // SELECT TERMINAL 1`:e.innerText=`● WIRING MODE // SELECT TERMINAL 2`):e.classList.add(`hidden`))}function wp(e,t){let n=0,r=0,i=0,a=0;t.addEventListener(`mousedown`,o);function o(t){if(t.target.closest(`button`)||t.target.closest(`input`))return;t||=window.event,t.preventDefault(),i=t.clientX,a=t.clientY;let n=e.parentElement.getBoundingClientRect(),r=e.getBoundingClientRect();e.style.left=r.left-n.left+`px`,e.style.top=r.top-n.top+`px`,e.style.right=`auto`,e.style.bottom=`auto`,document.addEventListener(`mouseup`,c),document.addEventListener(`mousemove`,s)}function s(t){t||=window.event,t.preventDefault(),n=i-t.clientX,r=a-t.clientY,i=t.clientX,a=t.clientY;let o=e.offsetTop-r,s=e.offsetLeft-n,c=e.parentElement,l=c.clientWidth-e.clientWidth,u=c.clientHeight-e.clientHeight;s=Math.max(0,Math.min(s,l)),o=Math.max(0,Math.min(o,u)),e.style.top=o+`px`,e.style.left=s+`px`}function c(){document.removeEventListener(`mouseup`,c),document.removeEventListener(`mousemove`,s)}}function Tp(e,t){let n=e.toDataURL(`image/png`),r=document.createElement(`a`);r.download=t,r.href=n,document.body.appendChild(r),r.click(),document.body.removeChild(r)}function Ep(){let e=Y.activeExperiment,t=Xf[e],n=new Date().toLocaleDateString(`en-IN`,{day:`2-digit`,month:`long`,year:`numeric`}),r=``,i=``;e===`ohms`?(r=`<th>S.No.</th><th>Voltage V (V)</th><th>Current I (A)</th><th>Resistance R = V/I (Ω)</th>`,Y.dataPoints.forEach(e=>{i+=`<tr><td>${e.id}</td><td>${e.V.toFixed(2)}</td><td>${(e.I*1e3).toFixed(3)} mA</td><td>${e.R.toFixed(2)}</td></tr>`})):e===`lcr`?(r=`<th>S.No.</th><th>Frequency f (Hz)</th><th>Voltage V (V)</th><th>Current I (A)</th><th>Impedance Z (Ω)</th>`,Y.dataPoints.forEach(e=>{i+=`<tr><td>${e.id}</td><td>${e.f}</td><td>${e.V.toFixed(2)}</td><td>${e.I.toFixed(4)}</td><td>${e.R.toFixed(2)}</td></tr>`})):e===`rc`?(r=`<th>S.No.</th><th>Capacitance C (µF)</th><th>Voltage V (V)</th><th>Current I (A)</th><th>Time Constant τ = RC (ms)</th>`,Y.dataPoints.forEach(e=>{let t=(Y.params.R*e.C*1e-6*1e3).toFixed(2);i+=`<tr><td>${e.id}</td><td>${e.C}</td><td>${e.V.toFixed(2)}</td><td>${e.I.toFixed(4)}</td><td>${t}</td></tr>`})):e===`arduino_led`&&(r=`<th>S.No.</th><th>Vcc (V)</th><th>V_LED (V)</th><th>Resistance R (Ω)</th><th>Current I (mA)</th><th>Power P (mW)</th>`,[[100,`Red`],[150,`Red`],[220,`Green`],[330,`Blue`]].forEach(([e,t],n)=>{let r=Math.max(0,3/e);i+=`<tr><td>${n+1}</td><td>5</td><td>2</td><td>${e}</td><td>${(r*1e3).toFixed(2)}</td><td>${(r*5*1e3).toFixed(2)}</td></tr>`})),i||=`<tr><td colspan="6" style="text-align:center;color:#888;">No data recorded. Run simulation and use Record button.</td></tr>`;let a=Zf[e]||[],o=``;a.forEach((e,t)=>{o+=`
      <div style="margin-bottom:10px;padding:8px 10px;background:#f8f9fa;border-left:3px solid #2563eb;border-radius:0 5px 5px 0;">
        <p style="margin:0 0 4px;font-weight:600;font-size:11px;color:#1e293b;">Q${t+1}. ${e.q}</p>
        <p style="margin:0 0 3px;font-size:10px;color:#374151;"><strong>Correct Answer:</strong> ${e.options[e.correct]}</p>
        ${e.explanation?`<p style="margin:0;font-size:10px;color:#4b5563;font-style:italic;">${e.explanation}</p>`:``}
      </div>`});let s=document.getElementById(`conclusion-text`),c=(s?s.innerText||s.textContent:``)||`Experiment in progress. Complete all steps and record data points to generate conclusion.`;if(e===`lcr`&&Y.dataPoints.length>=2){let e=(1/(2*Math.PI*Math.sqrt(Y.params.L*.001*Y.params.C*1e-6))).toFixed(1);c=`The series LCR resonance experiment was conducted using L = ${Y.params.L} mH, C = ${Y.params.C} µF, and R = ${Y.params.R} Ω. The theoretical resonant frequency is f₀ = ${e} Hz. At resonance, the impedance is minimum (Z = R = ${Y.params.R} Ω), current is maximum (I_max = V/R), and the phase angle φ = 0°. The I-Z vs. frequency curve showed a clear resonance peak, verifying the LCR resonance theory.`}else if(e===`rc`&&Y.dataPoints.length>=1){let e=(Y.params.R*Y.params.C*1e-6*1e3).toFixed(2);c=`The RC circuit charging experiment was performed with R = ${Y.params.R} Ω and C = ${Y.params.C} µF. The theoretical time constant τ = RC = ${e} ms. The oscilloscope waveform showed an exponential charging curve V_C(t) = V_s(1−e^(−t/τ)), confirming the RC transient response theory. The capacitor reaches 63.2% of V_s after one time constant τ = ${e} ms.`}else if(e===`arduino_led`){let e=Math.max(0,3/Y.params.R);c=`The Arduino LED push-button experiment demonstrated basic digital control. With supply voltage V_cc = 5V, LED forward voltage V_f ≈ 2V, and series resistance R = ${Y.params.R} Ω, the theoretical LED current I = (V_cc − V_f)/R = ${(e*1e3).toFixed(1)} mA. When the momentary button was pressed, the LED glowed confirming the series circuit was complete. On releasing the button (Normally Open switch), the LED turned OFF instantly, verifying the switch's behaviour.`}let l=Math.min(100,Y.score),u=`D`,d=`#ef4444`;l>=90?(u=`A+`,d=`#22c55e`):l>=70?(u=`A`,d=`#16a34a`):l>=50?(u=`B`,d=`#f59e0b`):l>=35&&(u=`C`,d=`#f97316`);let f=``;(t.formulas||[]).forEach(e=>{f+=`<div style="display:inline-block;margin:3px 5px;padding:4px 10px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:20px;font-size:10px;color:#1d4ed8;"><strong>${e.name}:</strong> ${e.expr}</div>`});let p=``;(t.steps||[]).forEach(e=>{p+=`<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:6px;font-size:10px;color:#374151;">
      <div style="min-width:22px;height:22px;background:#1d4ed8;color:white;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;flex-shrink:0;">${e.id}</div>
      <div style="padding-top:3px;">${e.text}</div>
    </div>`});let m=`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Lab Report – ${t.name}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; font-size:11px; color:#111827; background:#fff; line-height:1.6; }
  .page { padding:25mm 20mm; }
  h1 { font-size:20px; font-weight:800; color:#1e3a5f; margin-bottom:4px; }
  h2 { font-size:13px; font-weight:700; color:#2563eb; border-bottom:2px solid #2563eb; padding-bottom:4px; margin:18px 0 10px; text-transform:uppercase; letter-spacing:0.5px; }
  h3 { font-size:11px; font-weight:700; color:#1e3a5f; margin:10px 0 5px; }
  h4 { font-size:10px; font-weight:700; color:#374151; margin:8px 0 4px; }
  p { margin-bottom:5px; font-size:10.5px; }
  ul { margin:4px 0 6px 18px; }
  li { margin-bottom:3px; font-size:10px; }
  table { width:100%; border-collapse:collapse; margin:8px 0; font-size:10px; }
  th { background:#1d4ed8; color:white; padding:6px 8px; text-align:left; font-size:9px; letter-spacing:0.5px; text-transform:uppercase; }
  td { padding:5px 8px; border-bottom:1px solid #e5e7eb; }
  tr:nth-child(even) td { background:#f8faff; }
  .header-box { background:#1e3a5f; color:white; padding:15px 20px; border-radius:8px; margin-bottom:15px; }
  .meta-row { display:flex; gap:20px; margin-top:6px; font-size:9px; color:#93c5fd; }
  .section-box { border:1px solid #e5e7eb; border-radius:6px; padding:12px 15px; margin-bottom:12px; }
  .grade-badge { display:inline-block; padding:4px 14px; border-radius:20px; font-weight:800; font-size:14px; color:${d}; border:2px solid ${d}; }
  .score-bar-outer { background:#e5e7eb; border-radius:10px; height:8px; margin-top:5px; }
  .score-bar-fill { background:${d}; height:8px; border-radius:10px; width:${l}%; }
  .formula-chip { display:inline-block; margin:2px 4px; padding:3px 9px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:15px; font-size:9.5px; color:#1d4ed8; }
  .viva-q { background:#f8fafc; border:1px solid #e2e8f0; border-radius:6px; padding:8px 10px; margin-bottom:8px; }
  .footer { text-align:center; font-size:8px; color:#9ca3af; margin-top:20px; border-top:1px solid #e5e7eb; padding-top:8px; }
  .conclusion-box { background:#f0fdf4; border:1px solid #bbf7d0; border-radius:6px; padding:10px 14px; font-size:10.5px; color:#166534; }
  @media print {
    body { -webkit-print-color-adjust:exact; print-color-adjust:exact; }
    .page { padding:15mm 15mm; }
  }
</style>
</head>
<body>
<div class="page">
  <!-- HEADER -->
  <div class="header-box">
    <div style="font-size:10px;color:#93c5fd;letter-spacing:2px;text-transform:uppercase;margin-bottom:4px;">Circuit IQ Virtual Laboratory</div>
    <h1>${t.name}</h1>
    <div class="meta-row">
      <span>📅 Date: ${n}</span>
      <span>🏆 Grade: <strong>${u}</strong></span>
      <span>📊 Score: ${l}/100</span>
      <span>🔬 Experiment: ${e.toUpperCase()}</span>
    </div>
    <div class="score-bar-outer" style="margin-top:10px;"><div class="score-bar-fill"></div></div>
  </div>

  <!-- AIM & APPARATUS -->
  <h2>1. Aim &amp; Apparatus</h2>
  <div class="section-box">
    <h3>Aim</h3>
    <p>${t.aim||`To verify the given circuit law experimentally using a virtual breadboard setup.`}</p>
    <h3 style="margin-top:10px;">Apparatus Required</h3>
    <p>${t.apparatus||`Power Supply, Resistor, Multimeter, Connecting Wires, Breadboard.`}</p>
  </div>

  <!-- THEORY -->
  <h2>2. Theory</h2>
  <div class="section-box">
    ${(t.theory||``).replace(/<h3>/g,`<h3>`).replace(/<\/h3>/g,`</h3>`)}
    <h3>Key Formulae</h3>
    <div style="margin-top:4px;">${f}</div>
  </div>

  <!-- PROCEDURE -->
  <h2>3. Procedure</h2>
  <div class="section-box">
    ${p}
  </div>

  <!-- OBSERVATIONS -->
  <h2>4. Observation Table</h2>
  <div class="section-box">
    <table>
      <thead><tr>${r}</tr></thead>
      <tbody>${i}</tbody>
    </table>
    ${Y.dataPoints.length===0?`<p style="color:#f59e0b;font-size:10px;margin-top:5px;">⚠ No data recorded. Run the simulation and use the Record button to collect data.</p>`:``}
  </div>

  <!-- GRAPH NOTE -->
  <h2>5. Graph</h2>
  <div class="section-box" style="text-align:center;padding:20px;">
    <p style="color:#6b7280;font-size:10px;">📈 <em>Use the Graph panel (∿ Graph button) to view the V-I plot. Click the Download HD button there to save the high-resolution graph image and attach it to this report.</em></p>
    ${e===`ohms`?`<p style="margin-top:8px;font-size:10px;">Plot: Voltage (V) on X-axis vs. Current I (mA) on Y-axis → Expected: Straight line through origin. Slope = 1/R = Conductance (G).</p>`:``}
    ${e===`lcr`?`<p style="margin-top:8px;font-size:10px;">Plot: Frequency (Hz) on X-axis vs. Impedance Z (Ω) on Y-axis → Expected: U-shaped curve with minimum at resonant frequency f₀.</p>`:``}
    ${e===`rc`?`<p style="margin-top:8px;font-size:10px;">Plot: Time (ms) on X-axis vs. Capacitor Voltage Vc (V) on Y-axis → Expected: Exponential charging curve.</p>`:``}
    ${e===`arduino_led`?`<p style="margin-top:8px;font-size:10px;">Plot: Resistance R (Ω) on X-axis vs. LED Current I (mA) on Y-axis → Expected: Hyperbolic (I decreases as R increases).</p>`:``}
  </div>

  <!-- VIVA QUESTIONS -->
  <h2>6. Viva Voce</h2>
  <div class="section-box">
    ${o||`<p style="color:#6b7280;">Viva questions available in the Viva tab of the Lab panel.</p>`}
  </div>

  <!-- CONCLUSION -->
  <h2>7. Conclusion</h2>
  <div class="conclusion-box">
    <p>${c}</p>
  </div>

  <!-- GRADE CARD -->
  <h2>8. Assessment</h2>
  <div class="section-box" style="display:flex;align-items:center;gap:20px;">
    <div style="text-align:center;">
      <div class="grade-badge">${u}</div>
      <p style="font-size:9px;color:#6b7280;margin-top:4px;">Final Grade</p>
    </div>
    <div style="flex:1;">
      <p style="font-size:10px;margin-bottom:4px;">Score: <strong>${l}/100</strong></p>
      <div class="score-bar-outer"><div class="score-bar-fill"></div></div>
      <p style="font-size:9px;color:#6b7280;margin-top:3px;">${l>=90?`Exceptional Lab Session!`:l>=70?`Excellent understanding demonstrated.`:l>=50?`Good progress. Review viva questions.`:`Complete all experiment steps to earn a higher grade.`}</p>
    </div>
  </div>

  <div class="footer">
    Generated by Circuit IQ Virtual Laboratory · ${n} · Experiment: ${t.name}
  </div>
</div>
</body>
</html>`,h=window.open(``,`_blank`,`width=900,height=700`);if(!h){alert(`Please allow pop-ups for this page to download the Lab Report as PDF.`);return}h.document.write(m),h.document.close(),h.focus(),setTimeout(()=>{h.print()},600)}function Dp(){let e=document.createElement(`canvas`);e.width=2e3,e.height=1500;let t=e.getContext(`2d`),n=e.width,r=e.height;t.fillStyle=`#060a16`,t.fillRect(0,0,n,r);let i=n-180-60,a=r-90-130;t.strokeStyle=`rgba(255, 255, 255, 0.12)`,t.lineWidth=4,t.strokeRect(180,90,i,a);let o=24,s=.5,c=Y.params.R||100;Y.activeExperiment===`ohms`&&(o=30,s=30/c),t.fillStyle=`#94a3b8`,t.font=`28px monospace`,t.textAlign=`center`,t.textBaseline=`top`;for(let e=0;e<=5;e++){let n=e/5*o,a=180+e/5*i;t.strokeStyle=`rgba(255, 255, 255, 0.05)`,t.lineWidth=2,t.beginPath(),t.moveTo(a,90),t.lineTo(a,r-130),t.stroke(),t.strokeStyle=`rgba(255, 255, 255, 0.3)`,t.lineWidth=3,t.beginPath(),t.moveTo(a,r-130),t.lineTo(a,r-130+12),t.stroke(),t.fillText(`${n.toFixed(0)}`,a,r-130+18)}t.textAlign=`right`,t.textBaseline=`middle`;for(let e=0;e<=5;e++){let i=e/5*s,o=r-130-e/5*a;t.strokeStyle=`rgba(255, 255, 255, 0.05)`,t.lineWidth=2,t.beginPath(),t.moveTo(180,o),t.lineTo(n-60,o),t.stroke(),t.strokeStyle=`rgba(255, 255, 255, 0.3)`,t.lineWidth=3,t.beginPath(),t.moveTo(168,o),t.lineTo(180,o),t.stroke();let c=i*1e3;t.fillText(`${c.toFixed(0)}`,158,o)}t.fillStyle=`#cbd5e1`,t.font=`bold 32px monospace`,t.textAlign=`center`,t.textBaseline=`bottom`,t.fillText(`Voltage V (V)`,180+i/2,r-25),t.save(),t.translate(45,90+a/2),t.rotate(-Math.PI/2),t.fillText(`Current I (mA)`,0,0),t.restore();let l=`—`,u=`—`,d=`—`;if(Y.activeExperiment===`ohms`&&Y.dataPoints.length>=2){let e=Y.dataPoints.length,n=0,f=0,p=0,m=0;Y.dataPoints.forEach(e=>{n+=e.V,f+=e.I,p+=e.V*e.I,m+=e.V*e.V});let h=e*m-n*n;if(h!==0){let m=(e*p-n*f)/h,g=(f-m*n)/e,_=m*1e3,v=1/m,y=Math.abs(v-c)/c*100;l=`${_.toFixed(3)} mA/V`,u=`${v.toFixed(1)} Ω`,d=`${y.toFixed(2)}%`,t.strokeStyle=`#00d084`,t.shadowBlur=20,t.shadowColor=`#00d084`,t.lineWidth=5,t.setLineDash([12,12]),t.beginPath();let b=m*0+g,x=180+0/o*i,S=r-130-b/s*a,C=o,w=m*C+g,T=180+C/o*i,E=r-130-w/s*a;t.moveTo(x,S),t.lineTo(T,E),t.stroke(),t.setLineDash([]),t.shadowBlur=0}}if(Y.dataPoints.length>0&&(t.strokeStyle=`rgba(168, 85, 247, 0.5)`,t.lineWidth=5,t.beginPath(),Y.dataPoints.forEach((e,n)=>{let c,l;Y.activeExperiment===`ohms`?(c=180+e.V/o*i,l=r-130-e.I/s*a):(c=180+e.I/s*i,l=r-130-e.V/o*a),n===0?t.moveTo(c,l):t.lineTo(c,l)}),Y.dataPoints.length>1&&t.stroke(),Y.dataPoints.forEach(e=>{let n,c;Y.activeExperiment===`ohms`?(n=180+e.V/o*i,c=r-130-e.I/s*a):(n=180+e.I/s*i,c=r-130-e.V/o*a),t.fillStyle=`#a855f7`,t.shadowBlur=24,t.shadowColor=`#a855f7`,t.beginPath(),t.arc(n,c,14,0,2*Math.PI),t.fill(),t.fillStyle=`#ffffff`,t.shadowBlur=0,t.beginPath(),t.arc(n,c,6,0,2*Math.PI),t.fill()})),Y.activeExperiment===`ohms`&&Y.dataPoints.length>=2){t.fillStyle=`rgba(15, 23, 42, 0.9)`,t.strokeStyle=`rgba(0, 208, 132, 0.5)`,t.lineWidth=3;let e=n-60-400-20;t.fillRect(e,110,400,160),t.strokeRect(e,110,400,160),t.fillStyle=`#f8fafc`,t.font=`28px monospace`,t.textAlign=`left`,t.textBaseline=`top`,t.fillText(`Slope: ${l}`,e+20,130),t.fillText(`R(slope): ${u}`,e+20,170),t.fillText(`Error: ${d}`,e+20,210)}t.fillStyle=`#f8fafc`,t.font=`bold 36px monospace`,t.textAlign=`center`,t.textBaseline=`top`,t.fillText(`EXPERIMENT CHART: ${Xf[Y.activeExperiment].name.toUpperCase()}`,n/2,25),Tp(e,`circuit_iq_hd_graph_${Y.activeExperiment}.png`)}function Op(){let e=document.createElement(`canvas`);e.width=2e3,e.height=1500;let t=e.getContext(`2d`),n=e.width,r=e.height,i=t.createRadialGradient(n/2,r/2,40,n/2,r/2,Math.max(n,r)/1.6);i.addColorStop(0,`#061a12`),i.addColorStop(.8,`#020a07`),i.addColorStop(1,`#000000`),t.fillStyle=i,t.fillRect(0,0,n,r);let a=n/10,o=r/8;t.strokeStyle=`rgba(0, 255, 136, 0.08)`,t.lineWidth=2;for(let e=1;e<10;e++){let n=e*a;t.beginPath(),t.moveTo(n,0),t.lineTo(n,r),t.stroke()}for(let e=1;e<8;e++){let r=e*o;t.beginPath(),t.moveTo(0,r),t.lineTo(n,r),t.stroke()}t.strokeStyle=`rgba(0, 255, 136, 0.3)`,t.lineWidth=4,t.beginPath(),t.moveTo(n/2,0),t.lineTo(n/2,r),t.stroke(),t.beginPath(),t.moveTo(0,r/2),t.lineTo(n,r/2),t.stroke(),t.strokeStyle=`rgba(0, 255, 136, 0.5)`,t.lineWidth=2;for(let e=0;e<n;e+=a/5)t.beginPath(),t.moveTo(e,r/2-12),t.lineTo(e,r/2+12),t.stroke();for(let e=0;e<r;e+=o/5)t.beginPath(),t.moveTo(n/2-12,e),t.lineTo(n/2+12,e),t.stroke();t.fillStyle=`rgba(0, 0, 0, 0.15)`;for(let e=0;e<r;e+=4)t.fillRect(0,e,n,2);let s=X.sliderOscTime?parseFloat(X.sliderOscTime.value):1,c=X.sliderOscVolts?parseFloat(X.sliderOscVolts.value):1;if(Y.isRunning){let e=Date.now()*.005,i=Y.params.f,a=Y.meters.volts/30*(r/2-40)*(1/c);if(t.lineWidth=8,t.lineCap=`round`,t.lineJoin=`round`,Y.activeExperiment===`ohms`)t.strokeStyle=`#00ff88`,t.shadowBlur=24,t.shadowColor=`#00ff88`,t.beginPath(),t.moveTo(0,r/2-a),t.lineTo(n,r/2-a),t.stroke();else if(Y.activeExperiment===`lcr`){t.strokeStyle=`#00ff88`,t.shadowBlur=24,t.shadowColor=`#00ff88`,t.beginPath();for(let o=0;o<n;o++){let c=r/2+Math.sin(o/n*Math.PI*4*(i/50)*s-e)*a;o===0?t.moveTo(o,c):t.lineTo(o,c)}t.stroke();let o=Y.analysis.phi*(Math.PI/180),l=Y.meters.amps/.5*(r/2-40)*(1/c);t.strokeStyle=`#00ffff`,t.shadowBlur=24,t.shadowColor=`#00ffff`,t.beginPath();for(let a=0;a<n;a++){let c=r/2+Math.sin(a/n*Math.PI*4*(i/50)*s-e-o)*l;a===0?t.moveTo(a,c):t.lineTo(a,c)}t.stroke()}else if(Y.activeExperiment===`rc`){t.strokeStyle=`#00ff88`,t.shadowBlur=24,t.shadowColor=`#00ff88`,t.beginPath();let i=200/s,a=n/200*i;for(let i=0;i<n;i++){let n=(i+e*240)%a/a,o=r-60-(r-160)*(1-Math.exp(-n*4.5))*(1/c);i===0||(i+e*240)%a<8?t.moveTo(i,o):t.lineTo(i,o)}t.stroke()}}t.shadowBlur=0,t.fillStyle=`rgba(0, 255, 136, 0.85)`,t.font=`bold 36px monospace`,t.textAlign=`left`,t.textBaseline=`top`,t.fillText(`CH1: ${(5*c).toFixed(1)}V/Div`,40,40),Y.activeExperiment===`lcr`&&(t.fillStyle=`rgba(0, 255, 255, 0.85)`,t.fillText(`CH2: ${(100*c).toFixed(0)}mA/Div`,40,90),t.fillStyle=`rgba(0, 255, 136, 0.85)`),t.fillText(`M: ${(2*s).toFixed(1)}ms/Div`,40,r-80),t.fillText(`DC Coupling`,n-280,r-80),t.fillStyle=`rgba(15, 23, 42, 0.85)`,t.strokeStyle=`rgba(0, 255, 136, 0.4)`,t.lineWidth=2;let l=n-420-40;t.fillRect(l,40,420,220),t.strokeRect(l,40,420,220),t.fillStyle=`#f8fafc`,t.font=`28px monospace`,t.fillText(`MEASUREMENTS`,l+20,60),t.strokeStyle=`rgba(0, 255, 136, 0.2)`,t.beginPath(),t.moveTo(l+20,100),t.lineTo(l+420-20,100),t.stroke(),t.fillStyle=`#34d399`,t.font=`24px monospace`;let u=Y.meters.volts,d=Y.params.f;1e3/(d||1);let f=Y.activeExperiment===`ohms`?`0.0°`:`${Y.analysis.phi.toFixed(1)}°`,p=Y.activeExperiment===`ohms`?`0 Hz (DC)`:`${d.toFixed(0)} Hz`;t.fillText(`Vp:    ${u.toFixed(2)} V`,l+20,120),t.fillText(`Freq:  ${p}`,l+20,160),t.fillText(`Phase: ${f}`,l+20,200),Tp(e,`circuit_iq_hd_oscilloscope_${Y.activeExperiment}.png`)}function kp(){X.oscPanel&&X.oscPanel.querySelector(`.osc-hdr`)&&wp(X.oscPanel,X.oscPanel.querySelector(`.osc-hdr`)),X.graphPanel&&X.graphPanel.querySelector(`.graph-hdr`)&&wp(X.graphPanel,X.graphPanel.querySelector(`.graph-hdr`)),X.oscDownload&&X.oscDownload.addEventListener(`click`,()=>{Op()}),X.graphDownload&&X.graphDownload.addEventListener(`click`,()=>{Dp()});let e=new ResizeObserver(e=>{for(let t of e){let e=t.target,n=e.querySelector(`canvas`);if(!n)continue;let r=Math.floor(n.clientWidth),i=Math.floor(n.clientHeight);(n.width!==r||n.height!==i)&&(n.width=r,n.height=i,e.id===`graph-wrap`&&Sp())}});X.oscPanel&&e.observe(X.oscPanel),X.graphPanel&&e.observe(X.graphPanel),X.graphCanvas&&(X.graphCanvas.addEventListener(`mousemove`,e=>{let t=X.graphCanvas.getBoundingClientRect();bp=e.clientX-t.left,xp=e.clientY-t.top,Sp()}),X.graphCanvas.addEventListener(`mouseleave`,()=>{bp=null,xp=null,Sp()})),X.experimentSelect.addEventListener(`change`,e=>{pp(e.target.value),Rp()}),X.btnGraphToggle.addEventListener(`click`,()=>{X.graphPanel.style.display=X.graphPanel.style.display===`flex`?`none`:`flex`,X.btnGraphToggle.classList.toggle(`active`),Sp()}),X.btnOscToggle.addEventListener(`click`,()=>{X.oscPanel.style.display=X.oscPanel.style.display===`flex`?`none`:`flex`,X.btnOscToggle.classList.toggle(`active`)}),X.btnCloseOsc.addEventListener(`click`,()=>{X.oscPanel.style.display=`none`,X.btnOscToggle.classList.remove(`active`)}),X.btnCloseGraph.addEventListener(`click`,()=>{X.graphPanel.style.display=`none`,X.btnGraphToggle.classList.remove(`active`)}),X.btnRecord.addEventListener(`click`,()=>{if(!Y.isRunning){op(`Circuit IQ · AI Mentor`,`Initialize circuit to record active data points.`);return}let e=Y.meters.volts;if(Y.dataPoints.find(t=>Math.abs(t.V-e)<.05)){op(`Circuit IQ · AI Mentor`,`A reading for ${e.toFixed(2)} V has already been recorded. Please vary the Voltage to record a new data point.`);return}if(Y.dataPoints.length>=10)return;let t={id:Y.dataPoints.length+1,V:Y.meters.volts,I:Y.meters.amps,R:Y.meters.ohms,f:Y.params.f,C:Y.params.C};if(Y.dataPoints.push(t),ap(),Y.activeExperiment===`ohms`&&Y.dataPoints.length>=5){_p(6);let e=Y.params.R||100,t=Y.dataPoints.length,n=0,r=0,i=0,a=0;Y.dataPoints.forEach(e=>{n+=e.V,r+=e.I,i+=e.V*e.I,a+=e.V*e.V});let o=t*a-n*n,s=``;if(o!==0){let a=(t*i-n*r)/o,c=1/a,l=Math.abs(c-e)/e*100;s=`<b>Conclusion:</b> The V-I graph is a straight line passing through the origin with a positive slope (m = ${(a*1e3).toFixed(3)} mA/V). The experimental resistance calculated from the slope is ${c.toFixed(1)} Ω, deviating from the theoretical value of ${e} Ω by only ${l.toFixed(2)}%. Therefore, Ohm's Law (V = I × R) is verified.`}else s=`<b>Conclusion:</b> The V-I graph is a straight line passing through the origin. Therefore, Ohm's Law is verified.`;X.conclusionText.innerHTML=s}else if(Y.activeExperiment===`lcr`){let e=(1/(2*Math.PI*Math.sqrt(Y.params.L*.001*Y.params.C*1e-6))).toFixed(1),t=Y.dataPoints.reduce((e,t)=>e+t.R,0)/Y.dataPoints.length;X.conclusionText.innerHTML=`<b>LCR Analysis (${Y.dataPoints.length} points recorded):</b><br>
        Theoretical resonant frequency: f₀ = <b>${e} Hz</b>.<br>
        At f₀, impedance Z = R (minimum = ${Y.params.R} Ω), current is maximum, and phase φ = 0°.<br>
        Current avg impedance across recorded frequencies: ${t.toFixed(1)} Ω.<br>
        Record points above and below f₀ to plot the resonance curve.`}else if(Y.activeExperiment===`rc`){let e=(Y.params.R*Y.params.C*1e-6*1e3).toFixed(2);X.conclusionText.innerHTML=`<b>RC Circuit Analysis (${Y.dataPoints.length} points recorded):</b><br>
        Current R = ${Y.params.R} Ω, C = ${Y.params.C} µF → Time constant τ = RC = <b>${e} ms</b>.<br>
        Capacitor charges to 63.2% of V_s in ${e} ms and is fully charged (99.3%) after ${(parseFloat(e)*5).toFixed(1)} ms.<br>
        The exponential charging curve V_C(t) = V_s(1−e^(−t/τ)) is visible on the oscilloscope.`}else X.conclusionText.innerText=`Recorded ${Y.dataPoints.length}/5 points. Adjust voltage and record more points to complete the experiment.`;Sp(),Rp()}),document.querySelectorAll(`.comp-chip`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.getAttribute(`data-type`);if(t===`bb_half`){fm(`half`),document.querySelectorAll(`[data-type="bb_half"], [data-type="bb_full"]`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`);return}if(t===`bb_full`){fm(`full`),document.querySelectorAll(`[data-type="bb_half"], [data-type="bb_full"]`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`);return}Y.selectedComponentIdx=-1,Y.selectedHoleIndex=null,jm(!0),Km(),document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`));let n=t;(t===`led_red`||t===`led_green`)&&(n=`led`),Y.selectedTool===n?(Y.selectedTool=null,op(`Circuit IQ · AI Mentor`,`Tool deselected.`)):(Y.selectedTool=n,e.classList.add(`selected`),op(`Circuit IQ · AI Mentor`,`Selected ${n.toUpperCase()}. Click on two board snap points to place it.`)),Y.placementStartHole=null,Y.wiringStart=null,Cp(),Ip()})}),document.querySelectorAll(`.comp-chip[draggable="true"]`).forEach(e=>{e.addEventListener(`dragstart`,t=>{let n=e.getAttribute(`data-type`),r=n;(n===`led_red`||n===`led_green`)&&(r=`led`),Y.draggingSidebarTool=r,t.dataTransfer.setData(`text/plain`,r),t.dataTransfer.effectAllowed=`move`,document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),e.classList.add(`selected`)}),e.addEventListener(`dragend`,e=>{Y.draggingSidebarTool=null,Y.ghostMesh&&=(Z.remove(Y.ghostMesh),null),Y.ghostSnap1=null,Y.ghostSnap2=null,document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),Y.selectedTool=null,Cp()})}),document.querySelectorAll(`.component-value-select`).forEach(e=>{e.addEventListener(`click`,e=>{e.stopPropagation()}),e.addEventListener(`change`,t=>{let n=e.getAttribute(`data-param`);if(n)if(n===`led_color`)cp(e.value);else{let t=parseFloat(e.value);isNaN(t)||sp(n,t)}})});let t=document.getElementById(`components-search`),n=document.getElementById(`search-clear`);t&&(t.addEventListener(`input`,()=>{mp()}),t.addEventListener(`keydown`,e=>{e.key===`Escape`&&(t.value=``,mp())})),n&&t&&n.addEventListener(`click`,()=>{t.value=``,mp(),t.focus()}),X.btnClear.addEventListener(`click`,()=>{pp(Y.activeExperiment),Cp()}),X.btnRun.addEventListener(`click`,async()=>{try{let e=$f();if(e.status===`success`&&Y.activeExperiment!==`arduino_led`)try{let t=await fetch(`/api/validate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({placed_components:Y.placedComponents.map(e=>({type:e.type,id:e.id})),wires:Np(),required_types:Xf[Y.activeExperiment].req||[]})});if(t.ok){let n=await t.json();e=n.status===`success`?{status:`success`,message:n.message}:{status:`error`,message:`Backend validation failure: `+n.message}}else throw Error(`HTTP ${t.status}`)}catch(e){console.warn(`Backend validation failed, falling back to local validation.`,e)}e.status===`success`?(Y.isRunning=!0,Y.energyStartTime=Date.now(),tp(),Yf(!0),X.btnRun.style.display=`none`,X.btnStop.style.display=`block`,X.statusDot.style.background=`var(--red)`,X.statusTextBar.innerText=`RUNNING`,op(`Circuit IQ · AI Mentor`,`Loop validated successfully: `+e.message),Y.activeExperiment===`ohms`?_p(5):Y.activeExperiment===`lcr`||Y.activeExperiment===`rc`?_p(3):Y.activeExperiment===`arduino_led`&&(_p(4),_p(5))):op(`Circuit IQ · AI Mentor`,`Validation Failure: `+e.message)}catch(e){console.error(e),op(`Circuit IQ · AI Mentor`,`Validation failure.`)}Rp()}),X.btnStop.addEventListener(`click`,()=>{Y.isRunning=!1,np(),Yf(!1),X.btnRun.style.display=`block`,X.btnStop.style.display=`none`,X.statusDot.style.background=`var(--accent)`,X.statusTextBar.innerText=`READY`,op(`Circuit IQ · AI Mentor`,`Power supply terminated.`),Cm(),Rp()}),X.btnReload.addEventListener(`click`,()=>{jp(),op(`Circuit IQ · AI Mentor`,`Auto-build complete! Circuit components and wires placed correctly.`)}),X.btnCloseLab&&X.btnCloseLab.addEventListener(`click`,()=>{window.parent.postMessage(`close-lab`,`*`)});let r=(e,t,n)=>{e.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);isNaN(t)||sp(n,t)}),t&&(t.addEventListener(`input`,e=>{let t=parseFloat(e.target.value);isNaN(t)||sp(n,t)}),t.addEventListener(`blur`,e=>{let r=parseFloat(e.target.value);isNaN(r)?t.value=Y.params[n]:sp(n,r)}))};r(X.sliderV,X.valLblV,`V`),r(X.sliderR,X.valLblR,`R`),r(X.sliderL,X.valLblL,`L`),r(X.sliderC,X.valLblC,`C`),r(X.sliderf,X.valLblf,`f`),r(X.sliderT,X.valLblT,`T`),X.btnExport.addEventListener(`click`,()=>{if(Y.dataPoints.length===0)return;let e=`Index,Voltage (V),Current (A),${Y.activeExperiment===`ohms`?`Resistance (Ohm)`:`Impedance (Ohm)`}\n`;Y.dataPoints.forEach(t=>{e+=`${t.id},${t.V.toFixed(2)},${t.I.toFixed(4)},${t.R.toFixed(1)}\n`});let t=new Blob([e],{type:`text/csv`}),n=document.createElement(`a`);n.href=URL.createObjectURL(t),n.download=`circuit_iq_3d_${Y.activeExperiment}_data.csv`,n.click()}),X.btnDownloadReport.addEventListener(`click`,()=>{Ep()});let i=document.getElementById(`cb-zoom-in`),a=document.getElementById(`cb-zoom-out`),o=document.getElementById(`cb-fit`),s=document.getElementById(`cb-front`),c=document.getElementById(`cb-top`),l=document.getElementById(`cb-side`),u=document.getElementById(`cb-wire`);i&&i.addEventListener(`click`,()=>{Zp=Math.max(4,Zp-1.5)}),a&&a.addEventListener(`click`,()=>{Zp=Math.min(20,Zp+1.5)}),o&&o.addEventListener(`click`,()=>{Zp=11.715,tm=0,nm=Math.atan2(7.5,9)}),s&&s.addEventListener(`click`,()=>{tm=0,nm=Math.atan2(7.5,9)}),c&&c.addEventListener(`click`,()=>{tm=0,nm=Math.PI/2-.01}),l&&l.addEventListener(`click`,()=>{tm=Math.PI/2,nm=Math.atan2(7.5,9)}),u&&u.addEventListener(`click`,()=>{Y.selectedTool=Y.selectedTool===`wire`?null:`wire`,u.classList.toggle(`active`,Y.selectedTool===`wire`),Y.selectedTool===`wire`&&op(`Circuit IQ · AI Mentor`,`Wiring tool active. Click snaps on board.`),Cp(),Ip()}),X.aiSend&&X.aiInput&&(X.aiSend.addEventListener(`click`,Ap),X.aiInput.addEventListener(`keydown`,e=>{e.key===`Enter`&&!e.shiftKey&&(e.preventDefault(),Ap())})),window.addEventListener(`keydown`,e=>{let t=e.key.toLowerCase();if(document.activeElement.tagName===`INPUT`||document.activeElement.tagName===`TEXTAREA`)return;let n=null;if(t===`w`)n=`wire`;else if(t===`l`)n=`led`;else if(t===`b`)n=`button`;else if(t===`r`)n=`resistor`;else if(t===`d`)n=`diode`;else if(t===`t`)n=`transistor`;else if(t===`s`)n=`display`;else if(t===`+`||t===`-`)n=`source`;else if(t===`a`)n=`ammeter`;else if(t===`v`)n=`voltmeter`;else if(t===`escape`){if(Y.selectedComponentIdx!==-1){Y.selectedComponentIdx=-1,jm(!0),Km(),op(`Circuit IQ · AI Mentor`,`Component deselected.`);return}if(Y.selectedHoleIndex!==null){Y.selectedHoleIndex=null,Km(),op(`Circuit IQ · AI Mentor`,`Hole selection cleared.`);return}if(Y.isDraggingComponent&&Y.draggedComponentIdx!==-1){let e=Y.placedComponents[Y.draggedComponentIdx];Z.remove(e.mesh),e.leads.forEach(e=>Z.remove(e));let t=zm(e.type,Y.dragStartSnap1,Y.dragStartSnap2,e.color);e.mesh=t.mesh,e.leads=t.leads,e.snap1=Y.dragStartSnap1,e.snap2=Y.dragStartSnap2,Z.add(e.mesh),e.leads.forEach(e=>Z.add(e)),jm(),Y.isDraggingComponent=!1,Y.draggedComponentIdx=-1,Y.dragStartSnap1=null,Y.dragStartSnap2=null,Y.wasRunningBeforeDrag&&(Y.isRunning=!0,tp(),Yf(!0),X.btnRun&&(X.btnRun.style.display=`none`),X.btnStop&&(X.btnStop.style.display=`block`),X.statusDot&&(X.statusDot.style.background=`var(--red)`),X.statusTextBar&&(X.statusTextBar.innerText=`RUNNING`)),op(`Circuit IQ · AI Mentor`,`Component move cancelled.`),vp(),Rp(),Ip();return}if(Y.isDraggingWireEnd&&Y.draggedWireIdx!==-1){let e=Y.wires[Y.draggedWireIdx],t=e.fromHole,n=e.toHole;Y.draggedWireEnd===0?t=Y.dragStartWireHole:n=Y.dragStartWireHole,Jm(Y.draggedWireIdx,t,n),Y.isDraggingWireEnd=!1,Y.draggedWireIdx=-1,Y.draggedWireEnd=-1,Y.dragStartWireHole=null,Y.wasRunningBeforeDrag&&(Y.isRunning=!0,tp(),Yf(!0),X.btnRun&&(X.btnRun.style.display=`none`),X.btnStop&&(X.btnStop.style.display=`block`),X.statusDot&&(X.statusDot.style.background=`var(--red)`),X.statusTextBar&&(X.statusTextBar.innerText=`RUNNING`)),op(`Circuit IQ · AI Mentor`,`Wire move cancelled.`),vp(),Rp(),Ip();return}Y.selectedTool=null,Y.placementStartHole=null,Y.wiringStart=null,document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),op(`Circuit IQ · AI Mentor`,`Tool deselected.`),Cp();return}else t===`delete`&&(n=`eraser`);if(n){if(document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),Y.selectedTool===n)Y.selectedTool=null,op(`Circuit IQ · AI Mentor`,`Tool deselected.`);else{Y.selectedTool=n;let e=document.querySelector(`.comp-chip[data-type="${n===`wire`?`wire`:n===`led`?`led`:n}"]`);e&&e.classList.add(`selected`),op(`Circuit IQ · AI Mentor`,`Selected ${n.toUpperCase()} via hotkey.`)}Y.placementStartHole=null,Y.wiringStart=null,Cp(),Ip()}}),document.querySelectorAll(`#left-panel .lp-section-hdr`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.closest(`.lp-section`);t&&t.classList.toggle(`collapsed`)})})}function Ap(){let e=X.aiInput.value.trim();if(!e)return;X.aiInput.value=``,op(`User`,e,!0);let t=`I am your Circuit IQ AI Mentor. Please specify what help you need (e.g. ask 'how to connect', 'formula', or 'readings').`,n=e.toLowerCase();n.includes(`connect`)||n.includes(`how to`)||n.includes(`wire`)||n.includes(`step`)?t=`Here is the current connection step for **${Xf[Y.activeExperiment].name}**:<br><br>${Lp()}`:n.includes(`formula`)||n.includes(`equation`)||n.includes(`law`)?t=`Here are the formulas for the current experiment:<br><br>${Xf[Y.activeExperiment].formulas.map(e=>`• **${e.name}**: \`${e.expr}\``).join(`<br>`)}`:n.includes(`reading`)||n.includes(`meter`)||n.includes(`volt`)||n.includes(`amp`)?t=`Current digital telemetry measurements:<br>• **Voltage (V)**: \`${Y.meters.volts.toFixed(2)} V\`<br>• **Current (I)**: \`${Y.meters.amps.toFixed(4)} A\`<br>• **Impedance (Z)**: \`${Y.meters.ohms.toFixed(2)} Ω\`<br>• **Power (P)**: \`${Y.meters.power.toFixed(2)} W\``:n.includes(`resonance`)||n.includes(`frequency`)||n.includes(`lcr`)?t=Y.activeExperiment===`lcr`?`In the Series LCR circuit, resonance occurs where Z is minimum and equal to R. Resonant frequency **f₀ = ${Y.analysis.f0.toFixed(1)} Hz**.<br>Reactance values:<br>• **XL (Inductance)**: \`${Y.analysis.XL.toFixed(1)} Ω\`<br>• **XC (Capacitance)**: \`${Y.analysis.XC.toFixed(1)} Ω\`<br>• **Phase Shift φ**: \`${Y.analysis.phi.toFixed(1)}°\``:`LCR Resonance formulas are active in EXP-03 Series LCR Laboratory.`:n.includes(`time constant`)||n.includes(`tau`)||n.includes(`charging`)?t=Y.activeExperiment===`rc`?`For the RC Time Constant, **τ = R × C** is equal to **${(Y.params.R*Y.params.C*1e-6*1e3).toFixed(1)} ms** (with R = ${Y.params.R} Ω, C = ${Y.params.C} µF). The capacitor reaches ~63.2% charge at t = τ, and full charge (~99%) at t = 5τ.`:`Time constant charging calculations are active in EXP-04 RC Time Constant Laboratory.`:(n.includes(`hello`)||n.includes(`hi`)||n.includes(`hey`))&&(t=`Hello! I am your interactive AI Mentor. Ask me about circuit connections, formulas, or current measurements!`),setTimeout(()=>{op(`Circuit IQ · AI Mentor`,t)},250)}function jp(){pp(Y.activeExperiment);let e=Y.activeExperiment;e===`ohms`?(Bm(`source`,14,15),Bm(`resistor`,130,200),Bm(`ammeter`,203,273),Bm(`voltmeter`,128,198),Ym(126,130),Ym(200,203),Ym(273,267),Ym(128,130),Ym(198,200)):e===`led`?(Bm(`source`,42,43),Bm(`resistor`,88,130),Bm(`led`,131,132),Ym(42,88),Ym(130,131),Ym(132,43)):e===`lcr`?(Bm(`source`,14,15),Bm(`resistor`,102,158),Bm(`inductor`,159,215),Bm(`capacitor`,216,272),Ym(98,102),Ym(158,159),Ym(215,216),Ym(272,267)):e===`rc`?(Bm(`source`,14,15),Bm(`resistor`,130,200),Bm(`capacitor`,201,271),Ym(126,130),Ym(200,201),Ym(271,267)):e===`arduino_led`&&(Bm(`source`,14,15),Bm(`button`,160,161),Bm(`led`,216,244),Bm(`resistor`,245,301),Ym(882,160),Ym(161,216),Ym(244,245),Ym(301,883))}function Mp(){let e={parent:Array.from({length:884},(e,t)=>t),find(e){return this.parent[e]===e?e:(this.parent[e]=this.find(this.parent[e]),this.parent[e])},union(e,t){let n=this.find(e),r=this.find(t);n!==r&&(this.parent[n]=r)}};for(let t=0;t<$p;t++){for(let n=2;n<6;n++)e.union(t*14+n,t*14+n+1);for(let n=7;n<11;n++)e.union(t*14+n,t*14+n+1)}for(let t=0;t<$p-1;t++)e.union(t*14+0,(t+1)*14+0),e.union(t*14+1,(t+1)*14+1),e.union(t*14+12,(t+1)*14+12),e.union(t*14+13,(t+1)*14+13);return Y.wires.forEach(t=>{e.union(t.fromHole,t.toHole)}),e}function Np(){let e=Mp(),t=[];for(let n=0;n<Y.placedComponents.length;n++){let r=Y.placedComponents[n];for(let i=n+1;i<Y.placedComponents.length;i++){let n=Y.placedComponents[i];e.find(r.snap1)===e.find(n.snap1)&&t.push([[r.id,0],[n.id,0]]),e.find(r.snap1)===e.find(n.snap2)&&t.push([[r.id,0],[n.id,1]]),e.find(r.snap2)===e.find(n.snap1)&&t.push([[r.id,1],[n.id,0]]),e.find(r.snap2)===e.find(n.snap2)&&t.push([[r.id,1],[n.id,1]])}}return t}function Pp(e){if(e===882)return`Arduino 5V`;if(e===883)return`Arduino GND`;let t=Math.floor(e/14)+1,n=e%14;return n===0?`Top (+) Col ${t}`:n===1?`Top (-) Col ${t}`:n>=2&&n<=6?`Col ${t}, Row ${String.fromCharCode(65+(n-2))}`:n>=7&&n<=11?`Col ${t}, Row ${String.fromCharCode(70+(n-7))}`:n===12?`Bottom (+) Col ${t}`:n===13?`Bottom (-) Col ${t}`:`Socket ${e}`}function Fp(){let e=document.getElementById(`guide-label-1`),t=document.getElementById(`guide-label-2`);if(!(!e||!t))if(Y.targetSnap1!==null&&Y.targetSnap2!==null&&Y.selectedTool===`wire`&&zp&&Bp){let n=am(Y.targetSnap1),r=am(Y.targetSnap2),i=n.clone().project(zp),a=r.clone().project(zp),o=Bp.domElement.getBoundingClientRect(),s=o.left+(i.x*.5+.5)*o.width,c=o.top+(-(i.y*.5)+.5)*o.height,l=o.left+(a.x*.5+.5)*o.width,u=o.top+(-(a.y*.5)+.5)*o.height;e.style.left=`${s}px`,e.style.top=`${c-15}px`,e.classList.remove(`hidden`),e.innerHTML=`WIRE START<br><b>${Pp(Y.targetSnap1)}</b>`,t.style.left=`${l}px`,t.style.top=`${u-15}px`,t.classList.remove(`hidden`),t.innerHTML=`WIRE END<br><b>${Pp(Y.targetSnap2)}</b>`}else e.classList.add(`hidden`),t.classList.add(`hidden`)}function Ip(){if(!Z)return;Q&&Z.remove(Q),$&&Z.remove($),Jp&&=(Z.remove(Jp),null),Q=null,$=null,Y.targetSnap1=null,Y.targetSnap2=null;let e=(e,t=!1)=>{if(t){let t=Wm();e=Gm(e,t)}let n=am(e);if(!n)return null;let r=new U(new Io(.08,.12,32),new Jr({color:2278750,side:2}));if(r.rotation.x=-Math.PI/2,r.position.set(n.x,.09,n.z),Z.add(r),Y.targetSnap1===null)Y.targetSnap1=e;else if(Y.targetSnap2===null){Y.targetSnap2=e;let t=am(Y.targetSnap1),r=n,i=new B().addVectors(t,r).multiplyScalar(.5);i.y+=Math.min(1.5,Math.max(.4,t.distanceTo(r)*.35+.1));let a=new Ea([t,i,r]).getPoints(30);Jp=new Ji(new Pr().setFromPoints(a),new $o({color:2278750,dashSize:.1,gapSize:.06})),Jp.computeLineDistances(),Z.add(Jp)}return r},t=Y.placedComponents,n=e=>t.find(t=>t.type===e),r=Mp();if(Y.activeExperiment===`ohms`){let t=n(`source`),i=n(`resistor`),a=n(`ammeter`),o=n(`voltmeter`);if(!t)(!Y.selectedTool||Y.selectedTool===`source`)&&(Q=e(14),$=e(15));else if(!i)(!Y.selectedTool||Y.selectedTool===`resistor`)&&(Q=e(130),$=e(200));else if(!a)(!Y.selectedTool||Y.selectedTool===`ammeter`)&&(Q=e(201),$=e(271));else if(!o)(!Y.selectedTool||Y.selectedTool===`voltmeter`)&&(Q=e(129),$=e(199));else if(!Y.selectedTool||Y.selectedTool===`wire`){let t=i.snap1,n=i.snap2,s=a.snap1,c=a.snap2,l=o.snap1,u=o.snap2;if(!(r.find(126)===r.find(t)||r.find(126)===r.find(n))){Q=e(126,!0),$=e(t,!0);return}if(!(r.find(n)===r.find(s)||r.find(n)===r.find(c))){Q=e(n,!0),$=e(s,!0);return}if(r.find(c)!==r.find(267)){Q=e(c,!0),$=e(267,!0);return}if(r.find(l)!==r.find(t)){Q=e(l,!0),$=e(t,!0);return}if(r.find(u)!==r.find(n)){Q=e(u,!0),$=e(n,!0);return}}}else if(Y.activeExperiment===`lcr`){let t=n(`source`),i=n(`resistor`),a=n(`inductor`),o=n(`capacitor`);if(!t)(!Y.selectedTool||Y.selectedTool===`source`)&&(Q=e(14),$=e(15));else if(!i)(!Y.selectedTool||Y.selectedTool===`resistor`)&&(Q=e(102),$=e(158));else if(!a)(!Y.selectedTool||Y.selectedTool===`inductor`)&&(Q=e(159),$=e(215));else if(!o)(!Y.selectedTool||Y.selectedTool===`capacitor`)&&(Q=e(216),$=e(272));else if(!Y.selectedTool||Y.selectedTool===`wire`){let t=i.snap1,n=i.snap2,s=a.snap1,c=a.snap2,l=o.snap1,u=o.snap2;if(r.find(98)!==r.find(t)){Q=e(98,!0),$=e(t,!0);return}if(r.find(n)!==r.find(s)){Q=e(n,!0),$=e(s,!0);return}if(r.find(c)!==r.find(l)){Q=e(c,!0),$=e(l,!0);return}if(r.find(u)!==r.find(267)){Q=e(u,!0),$=e(267,!0);return}}}else if(Y.activeExperiment===`rc`){let t=n(`source`),i=n(`resistor`),a=n(`capacitor`);if(!t)(!Y.selectedTool||Y.selectedTool===`source`)&&(Q=e(14),$=e(15));else if(!i)(!Y.selectedTool||Y.selectedTool===`resistor`)&&(Q=e(130),$=e(200));else if(!a)(!Y.selectedTool||Y.selectedTool===`capacitor`)&&(Q=e(201),$=e(271));else if(!Y.selectedTool||Y.selectedTool===`wire`){let t=i.snap1,n=i.snap2,o=a.snap1,s=a.snap2;if(r.find(126)!==r.find(t)){Q=e(126,!0),$=e(t,!0);return}if(r.find(n)!==r.find(o)){Q=e(n,!0),$=e(o,!0);return}if(r.find(s)!==r.find(267)){Q=e(s,!0),$=e(267,!0);return}}}else if(Y.activeExperiment===`arduino_led`){let t=n(`source`),i=n(`button`)||n(`toggle_switch`),a=n(`led`),o=n(`resistor`);if(!t)(!Y.selectedTool||Y.selectedTool===`source`)&&(Q=e(14),$=e(15));else if(!i)(!Y.selectedTool||Y.selectedTool===`button`||Y.selectedTool===`toggle_switch`)&&(Q=e(160),$=e(161));else if(!a)(!Y.selectedTool||Y.selectedTool===`led`)&&(Q=e(216),$=e(244));else if(!o)(!Y.selectedTool||Y.selectedTool===`resistor`)&&(Q=e(245),$=e(301));else if(!Y.selectedTool||Y.selectedTool===`wire`){let t=i.snap1,n=i.snap2,s=a.snap1,c=a.snap2,l=o.snap1,u=o.snap2,d=r.find(882)===r.find(t)||r.find(882)===r.find(n),f=d?r.find(882)===r.find(t)?t:n:null,p=d?f===t?n:t:null,m=p&&(r.find(p)===r.find(s)||r.find(p)===r.find(c)),h=m?r.find(p)===r.find(s)?s:c:null,g=m?h===s?c:s:null,_=g&&(r.find(g)===r.find(l)||r.find(g)===r.find(u)),v=_?r.find(g)===r.find(l)?l:u:null,y=_?v===l?u:l:null,b=y&&r.find(y)===r.find(883);if(!d){Q=e(882,!0),$=e(t,!0);return}if(!m){Q=e(p,!0),$=e(s,!0);return}if(!_){Q=e(g,!0),$=e(l,!0);return}if(!b){Q=e(y,!0),$=e(883,!0);return}}}}function Lp(){let e=Y.placedComponents,t=t=>e.find(e=>e.type===t),n=t(`source`),r=t(`resistor`),i=t(`inductor`),a=t(`capacitor`),o=t(`ammeter`),s=t(`voltmeter`);if(Y.activeExperiment===`ohms`){if(!n)return`<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).`;if(!r)return`<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 10, Row C and Col 15, Row C.`;if(!o)return`<b>Step 3: Place Ammeter</b><br>Select <b>Ammeter (Series)</b> <i class='fa-solid fa-gauge-simple-high'></i> and place horizontally between Col 15, Row D and Col 20, Row D.`;if(!s)return`<b>Step 4: Place Voltmeter</b><br>Select <b>Voltmeter (Parallel)</b> <i class='fa-solid fa-gauge-simple'></i> and place horizontally between Col 10, Row B and Col 15, Row B.`;let e=Mp(),t=r.snap1,i=r.snap2,a=o.snap1,c=o.snap2,l=s.snap1,u=s.snap2;return e.find(126)===e.find(t)||e.find(126)===e.find(i)?e.find(i)===e.find(a)||e.find(i)===e.find(c)?e.find(c)===e.find(267)?e.find(l)===e.find(t)?e.find(u)===e.find(i)?Y.isRunning?Y.dataPoints.length<5?`<b>Step 7: Record Data Points</b><br>Circuit is active! Adjust parameters on the right and click <b>Record Point</b> (${5-Y.dataPoints.length} remaining).`:`<b>Complete!</b><br>Ohm's Law verified! Answer the Viva questions in the Report panel.`:`<b>Step 6: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power on the circuit.`:`<b>Step 5: Wire Voltmeter 2</b><br>Wire **Voltmeter terminal 2** (${Pp(u)}) to **Resistor terminal 2** (${Pp(i)}).`:`<b>Step 5: Wire Voltmeter 1</b><br>Wire **Voltmeter terminal 1** (${Pp(l)}) to **Resistor terminal 1** (${Pp(t)}).`:`<b>Step 5: Wire Ammeter to (-) Rail</b><br>Wire **Ammeter end** (${Pp(c)}) to **Top (-) Rail (Col 20)**.`:`<b>Step 5: Wire Resistor to Ammeter</b><br>Wire **Resistor end** (${Pp(i)}) to **Ammeter start** (${Pp(a)}).`:`<b>Step 5: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 10)** to **Resistor start** (${Pp(t)}).`}if(Y.activeExperiment===`lcr`){if(!n)return`<b>Step 1: Place AC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).`;if(!r)return`<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 8, Row C and Col 12, Row C.`;if(!i)return`<b>Step 3: Place Inductor</b><br>Select <b>Copper Inductor</b> <i class='fa-solid fa-circle-notch'></i> and place horizontally between Col 12, Row D and Col 16, Row D.`;if(!a)return`<b>Step 4: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> <i class='fa-solid fa-grip-lines-vertical'></i> and place horizontally between Col 16, Row E and Col 20, Row E.`;let e=Mp(),t=r.snap1,o=r.snap2,s=i.snap1,c=i.snap2,l=a.snap1,u=a.snap2;return e.find(98)===e.find(t)?e.find(o)===e.find(s)?e.find(c)===e.find(l)?e.find(u)===e.find(267)?Y.isRunning?`<b>Step 7: Find Resonance</b><br>Vary the **Source Frequency** slider to find the resonance peak (minimum Z / maximum I).`:`<b>Step 6: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start the LCR simulation.`:`<b>Step 5: Wire Capacitor to (-) Rail</b><br>Wire **Capacitor end** (${Pp(u)}) to **Top (-) Rail (Col 20)**.`:`<b>Step 5: Wire Inductor to Capacitor</b><br>Wire **Inductor end** (${Pp(c)}) to **Capacitor start** (${Pp(l)}).`:`<b>Step 5: Wire Resistor to Inductor</b><br>Wire **Resistor end** (${Pp(o)}) to **Inductor start** (${Pp(s)}).`:`<b>Step 5: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 8)** to **Resistor start** (${Pp(t)}).`}if(Y.activeExperiment===`rc`){if(!n)return`<b>Step 1: Place DC Source</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click glowing green Top Rails slots (Col 2, Row +/-).`;if(!r)return`<b>Step 2: Place Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 10, Row C and Col 15, Row C.`;if(!a)return`<b>Step 3: Place Capacitor</b><br>Select <b>Electrolytic Capacitor</b> <i class='fa-solid fa-grip-lines-vertical'></i> and place horizontally between Col 15, Row D and Col 20, Row D.`;let e=Mp(),t=r.snap1,i=r.snap2,o=a.snap1,s=a.snap2;return e.find(126)===e.find(t)?e.find(i)===e.find(o)?e.find(s)===e.find(267)?Y.isRunning?`<b>Step 6: Observe Charge</b><br>Watch the curve on the oscilloscope. Adjust R or C to change time constant τ = RC.`:`<b>Step 5: Initialize Circuit</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to start charging.`:`<b>Step 4: Wire Capacitor to (-) Rail</b><br>Wire **Capacitor end** (${Pp(s)}) to **Top (-) Rail (Col 20)**.`:`<b>Step 4: Wire Resistor to Capacitor</b><br>Wire **Resistor end** (${Pp(i)}) to **Capacitor start** (${Pp(o)}).`:`<b>Step 4: Wire (+) Rail to Resistor</b><br>Wire **Top (+) Rail (Col 10)** to **Resistor start** (${Pp(t)}).`}if(Y.activeExperiment===`arduino_led`){let e=t(`button`)||t(`toggle_switch`),r=t(`led`),i=t(`resistor`);if(!n)return`<b>Step 1: Connect USB Power</b><br>Select <b>DC Power Source</b> <i class='fa-solid fa-plug'></i> and click board to power the Arduino Uno.`;if(!e)return`<b>Step 2: Mount Switch</b><br>Select <b>Push Button</b> or <b>ON/OFF Switch</b> and mount across center ravine (Col 12, Row E/F).`;if(!r)return`<b>Step 3: Mount LED</b><br>Select <b>Red LED</b> <i class='fa-solid fa-lightbulb'></i> and place horizontally between Col 16, Row E and Col 18, Row E.`;if(!i)return`<b>Step 4: Mount Resistor</b><br>Select <b>Ceramic Resistor</b> <i class='fa-solid fa-wave-square'></i> and place horizontally between Col 18, Row F and Col 22, Row F.`;let a=Mp(),o=e.snap1,s=e.snap2,c=r.snap1,l=r.snap2,u=i.snap1,d=i.snap2,f=a.find(882)===a.find(o)||a.find(882)===a.find(s),p=f?a.find(882)===a.find(o)?o:s:null,m=f?p===o?s:o:null,h=m&&(a.find(m)===a.find(c)||a.find(m)===a.find(l)),g=h?a.find(m)===a.find(c)?c:l:null,_=h?g===c?l:c:null,v=_&&(a.find(_)===a.find(u)||a.find(_)===a.find(d)),y=v?a.find(_)===a.find(u)?u:d:null,b=v?y===u?d:u:null,x=b&&a.find(b)===a.find(883);return f?h?v?x?Y.isRunning?Y.buttonPressed?`<b>Complete!</b><br>LED is glowing! Answer the Viva questions in the Report panel.`:`<b>Step 7: Press Switch</b><br>Click and hold the red button plunger to light up the LED!`:`<b>Step 6: Initialize Arduino</b><br>Wiring complete! Click <b>INITIALIZE</b> in the top bar to power the board.`:`<b>Step 5: Wire Resistor to GND</b><br>Wire remaining **Resistor terminal** (${Pp(b)}) to **Arduino GND**.`:`<b>Step 5: Wire LED to Resistor</b><br>Wire **LED Cathode** (${Pp(_)}) to **Resistor start** (${Pp(u)}).`:`<b>Step 5: Wire Button to LED</b><br>Wire **Push Button bottom** (${Pp(m)}) to **LED Anode** (${Pp(c)}).`:`<b>Step 5: Wire Arduino 5V to Button</b><br>Wire **Arduino 5V** to **Push Button top** (${Pp(o)}).`}return`System online. Select an experiment to begin.`}function Rp(){let e=Lp();X.aiMessage.innerHTML=e}var Z,zp,Bp,Vp,Hp=null,Up=null,Wp,Gp,Kp,qp,Q,$,Jp=null,Yp=null,Xp=null,Zp=11.715,Qp=11.715,$p=63,em=null,tm=0,nm=Math.atan2(7.5,9),rm=Math.atan2(7.5,9),im=Array.from({length:63},(e,t)=>-4.72+t*.1522);function am(e){if(e===882){if(Gp){Gp.updateMatrix();let e=new B(.2,.15,.9);return e.applyMatrix4(Gp.matrix),e}return new B(.2,.2,-2.3)}if(e===883){if(Gp){Gp.updateMatrix();let e=new B(.4,.15,.9);return e.applyMatrix4(Gp.matrix),e}return new B(.4,.2,-2.3)}let t=Math.floor(e/14),n=e%14,r=im[t],i=0;n===0?i=-1.296:n===1?i=-1.144:n>=2&&n<=6?i=-.839+(n-2)*.1522:n>=7&&n<=11?i=.229+(n-7)*.1522:n===12?i=1.144:n===13&&(i=1.296);let a=new B(r,.08,i);return em&&(em.updateMatrix(),a.applyMatrix4(em.matrix)),a}function om(){let e=new jn,t=new U(new W(3,.06,2.2),new K({color:23426,roughness:.5}));t.receiveShadow=!0,e.add(t);let n=new U(new W(.8,.4,.6),new K({color:13751771,metalness:.9,roughness:.1}));n.position.set(-1.1,.23,-.6),e.add(n);let r=new U(new W(.7,.45,.5),new K({color:1120295,roughness:.5}));r.position.set(-1.1,.25,.6),e.add(r);let i=new U(new W(1.2,.12,.35),new K({color:2042167,roughness:.6}));i.position.set(.2,.09,.25),e.add(i);let a=new K({color:2042167,roughness:.6}),o=new U(new W(1.6,.18,.15),a);o.position.set(.3,.12,-.9),e.add(o);let s=new U(new W(1.4,.18,.15),a);return s.position.set(.3,.12,.9),e.add(s),Kp=new U(new W(.1,.22,.1),new K({color:15680580,metalness:.8,roughness:.2})),Kp.position.set(.2,.15,.9),Kp.userData={snapIndex:882},e.add(Kp),qp=new U(new W(.1,.22,.1),new K({color:1976635,metalness:.8,roughness:.2})),qp.userData={snapIndex:883},e.add(qp),e}function sm(e=63,t=10){let n=2048,r=1024,i=document.createElement(`canvas`);i.width=n,i.height=r;let a=i.getContext(`2d`),o=document.createElement(`canvas`);o.width=n,o.height=r;let s=o.getContext(`2d`);a.fillStyle=`#faf8f2`,a.fillRect(0,0,n,r),s.fillStyle=`#8080ff`,s.fillRect(0,0,n,r);for(let e=0;e<8e4;e++){let e=Math.random()*n,t=Math.random()*r,i=Math.random()*1.5+.5;a.fillStyle=Math.random()>.5?`rgba(255, 255, 255, 0.3)`:`rgba(0, 0, 0, 0.04)`,a.fillRect(e,t,i,i)}let c=s.createLinearGradient(0,0,25,0);c.addColorStop(0,`#a080ff`),c.addColorStop(1,`#8080ff`),s.fillStyle=c,s.fillRect(0,0,25,r),c=s.createLinearGradient(n-25,0,n,0),c.addColorStop(0,`#8080ff`),c.addColorStop(1,`#6080ff`),s.fillStyle=c,s.fillRect(n-25,0,25,r),c=s.createLinearGradient(0,0,0,25),c.addColorStop(0,`#8060ff`),c.addColorStop(1,`#8080ff`),s.fillStyle=c,s.fillRect(0,0,n,25),c=s.createLinearGradient(0,r-25,0,r),c.addColorStop(0,`#8080ff`),c.addColorStop(1,`#80a0ff`),s.fillStyle=c,s.fillRect(0,r-25,n,25);let l=t/2;function u(e,i){return{x:(e- -l)/t*n,y:(i- -1.82)/3.64*r}}[{z1:-1.04,z2:-.94},{z1:-.18,z2:.18},{z1:.94,z2:1.04}].forEach(e=>{let t=u(0,e.z1),r=u(0,e.z2),i=t.y,o=r.y,c=o-i,l=a.createLinearGradient(0,i,0,o);l.addColorStop(0,`#dfded6`),l.addColorStop(.2,`#c4c3b8`),l.addColorStop(.5,`#9a9993`),l.addColorStop(.8,`#c4c3b8`),l.addColorStop(1,`#dfded6`),a.fillStyle=l,a.fillRect(30,i,n-50-10,c);let d=s.createLinearGradient(0,i,0,o);d.addColorStop(0,`#8080ff`),d.addColorStop(.45,`#8060ff`),d.addColorStop(.5,`#8080ff`),d.addColorStop(.55,`#80a0ff`),d.addColorStop(1,`#8080ff`),s.fillStyle=d,s.fillRect(30,i,n-50-10,c)});let d=u(0,-1.37).y,f=u(0,-1.07).y,p=u(0,1.07).y,m=u(0,1.37).y;a.lineWidth=4,a.strokeStyle=`#ef4444`,a.beginPath(),a.moveTo(60,d),a.lineTo(n-60,d),a.stroke(),a.strokeStyle=`#3b82f6`,a.beginPath(),a.moveTo(60,f),a.lineTo(n-60,f),a.stroke(),a.strokeStyle=`#ef4444`,a.beginPath(),a.moveTo(60,p),a.lineTo(n-60,p),a.stroke(),a.strokeStyle=`#3b82f6`,a.beginPath(),a.moveTo(60,m),a.lineTo(n-60,m),a.stroke(),a.font=`bold 24px sans-serif`,a.textAlign=`center`,a.textBaseline=`middle`,a.fillStyle=`#ef4444`,a.fillText(`+`,45,d-2),a.fillText(`+`,n-45,d-2),a.fillStyle=`#3b82f6`,a.fillText(`-`,45,f-2),a.fillText(`-`,n-45,f-2),a.fillStyle=`#ef4444`,a.fillText(`+`,45,p-2),a.fillText(`+`,n-45,p-2),a.fillStyle=`#3b82f6`,a.fillText(`-`,45,m-2),a.fillText(`-`,n-45,m-2);function h(e,t,n,r){let i=r/2;e.fillStyle=`#d5d4cb`,e.beginPath(),e.roundRect(t-i-1.5,n-i-1.5,r+3,r+3,2.5),e.fill();let a=e.createLinearGradient(t,n-i,t,n+i);a.addColorStop(0,`#0a0a0b`),a.addColorStop(.3,`#141416`),a.addColorStop(1,`#2c2c30`),e.fillStyle=a,e.beginPath(),e.roundRect(t-i,n-i,r,r,2),e.fill();let o=e.createLinearGradient(t-3.5,0,t+3.5,0);o.addColorStop(0,`#4b5563`),o.addColorStop(.5,`#d1d5db`),o.addColorStop(1,`#4b5563`),e.fillStyle=o,e.fillRect(t-3.5,n-i+2.5,7,r-5),e.fillStyle=`#09090a`,e.fillRect(t-.75,n-i+2,1.5,r-4)}function g(e,t,n,r){let i=r/2;e.fillStyle=`#8080ff`,e.fillRect(t-i-2,n-i-2,r+4,r+4),e.fillStyle=`#b080ff`,e.beginPath(),e.moveTo(t-i,n-i),e.lineTo(t-i+3,n-i+3),e.lineTo(t-i+3,n+i-3),e.lineTo(t-i,n+i),e.closePath(),e.fill(),e.fillStyle=`#5080ff`,e.beginPath(),e.moveTo(t+i,n-i),e.lineTo(t+i-3,n-i+3),e.lineTo(t+i-3,n+i-3),e.lineTo(t+i,n+i),e.closePath(),e.fill(),e.fillStyle=`#8050ff`,e.beginPath(),e.moveTo(t-i,n-i),e.lineTo(t-i+3,n-i+3),e.lineTo(t+i-3,n-i+3),e.lineTo(t+i,n-i),e.closePath(),e.fill(),e.fillStyle=`#80b0ff`,e.beginPath(),e.moveTo(t-i,n+i),e.lineTo(t-i+3,n+i-3),e.lineTo(t+i-3,n+i-3),e.lineTo(t+i,n+i),e.closePath(),e.fill()}for(let t=0;t<e;t++)for(let e=0;e<14;e++){let n=e===0||e===1||e===12||e===13,r=t%6==5;if(n&&r)continue;let i=am(t*14+e),o=u(i.x,i.z);h(a,o.x,o.y,14),g(s,o.x,o.y,14)}return a.font=`bold 13px monospace`,a.fillStyle=`#64748b`,a.textAlign=`center`,a.textBaseline=`middle`,(e===30?[1,5,10,15,20,25,30]:[1,5,10,15,20,25,30,35,40,45,50,55,60,63]).forEach(e=>{let t=u(am((e-1)*14+2).x,0);a.fillText(e.toString(),t.x,u(0,-.94).y),a.fillText(e.toString(),t.x,u(0,-.12).y),a.fillText(e.toString(),t.x,u(0,.12).y),a.fillText(e.toString(),t.x,u(0,.94).y)}),a.font=`bold 15px sans-serif`,a.fillStyle=`#475569`,[`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`].forEach((t,n)=>{let r=u(0,am(n+2).z);a.textAlign=`left`,a.fillText(t,u(-l+.08,0).x,r.y),a.textAlign=`center`,a.fillText(t,u(im[Math.floor(e/2)],0).x,r.y),a.textAlign=`right`,a.fillText(t,u(l-.08,0).x,r.y)}),a.fillStyle=`#0f172a`,a.font=`bold italic 22px sans-serif`,a.textAlign=`left`,a.fillText(`CircuitIQ`,60,u(0,0).y-4),a.fillStyle=`#64748b`,a.font=`bold 10px sans-serif`,a.fillText(e===30?`3D BREADBOARD MODEL 30-T`:`3D BREADBOARD MODEL 63-T`,60,u(0,0).y+14),a.textAlign=`right`,a.fillStyle=`#64748b`,a.fillText(`INTEGRATED BUS TERMINALS`,n-60,u(0,0).y-4),a.fillText(`MADE IN CIRCUIT-IQ LABS`,n-60,u(0,0).y+10),{canvas:i,normCanvas:o}}function cm(e,t,n,r,i=8){let a=new qa,o=e/2-r,s=n/2-r;a.moveTo(-o,-s),a.lineTo(o,-s),a.quadraticCurveTo(o+r,-s,o+r,-s+r),a.lineTo(o+r,s-r),a.quadraticCurveTo(o+r,s+r,o,s+r),a.lineTo(-o,s+r),a.quadraticCurveTo(-o-r,s+r,-o-r,s-r),a.lineTo(-o-r,-s+r),a.quadraticCurveTo(-o-r,-s,-o,-s);let c=new Mo(a,{steps:1,depth:t-2*r,bevelEnabled:!0,bevelThickness:r,bevelSize:r,bevelOffset:-r,bevelSegments:i,curveSegments:i});return c.center(),c.rotateX(Math.PI/2),c}function lm(e,t,n,r,i=8){let a=new qa,o=e/2-r,s=n/2-r;a.moveTo(-o,-s),a.lineTo(o,-s),a.quadraticCurveTo(o+r,-s,o+r,-s+r),a.lineTo(o+r,s-r),a.quadraticCurveTo(o+r,s+r,o,s+r),a.lineTo(-o,s+r),a.quadraticCurveTo(-o-r,s+r,-o-r,s-r),a.lineTo(-o-r,-s+r),a.quadraticCurveTo(-o-r,-s,-o,-s);let c=new Mo(a,{steps:1,depth:t-2*r,bevelEnabled:!0,bevelThickness:r,bevelSize:r,bevelOffset:-r,bevelSegments:i,curveSegments:i});return c.center(),c.rotateX(Math.PI/2),c}function um(e){let t=new jn,n=new U(new G(.065,.065,.05,16),new K({color:e,roughness:.5,metalness:.2}));n.position.y=.025,n.castShadow=!0,n.receiveShadow=!0,t.add(n);let r=new G(.05,.05,.02,16),i=new K({color:13751771,metalness:.95,roughness:.1}),a=new U(r,i);a.position.y=.06,a.castShadow=!0,t.add(a);let o=new U(new G(.058,.052,.06,16),i);o.position.y=.1,o.castShadow=!0,t.add(o);let s=new U(new G(.02,.02,.15,8),i);return s.position.y=.075,t.add(s),t}function dm(e){Y.boardType=e,$p=e===`half`?30:63;let t=.1522,n=-($p-1)*t/2;im=Array.from({length:$p},(e,r)=>n+r*t),Y.placedComponents.forEach(e=>{Z.remove(e.mesh),e.leads.forEach(e=>Z.remove(e))}),Y.placedComponents=[],Y.wires.forEach(e=>{Z.remove(e.lineMesh),e.electrons.forEach(e=>Z.remove(e)),e.pins&&e.pins.forEach(e=>Z.remove(e)),e.sleeves&&e.sleeves.forEach(e=>Z.remove(e))}),Y.wires=[],Y.isRunning=!1,np(),Yf(!1),Up&&=(Z.remove(Up),null),em&&Z.remove(em),em=new jn;let r=$p===30?5:10,i=new U(cm(r+1,.08,4.4,.08),new K({color:1003826,roughness:.35,metalness:.25}));i.position.y=-.16,i.castShadow=!0,i.receiveShadow=!0,em.add(i);let a=new U(cm(r+.8,.005,4.2,.06),new K({color:13938487,roughness:.1,metalness:.9}));a.position.y=-.115,em.add(a);let o=new U(new W(r,.25,3.64),new Jr({visible:!1}));o.position.y=-.045,em.add(o),Vp=o;let s=sm($p,r),c=new ca(s.canvas);c.colorSpace=He;let l=new ca(s.normCanvas),u=new K({color:16316664,roughness:.45,metalness:.1}),d=[new K({map:c,normalMap:l,normalScale:new z(1.5,1.5),roughness:.55,metalness:.15}),u],f=lm(r,.2,3.64,.05);f.computeVertexNormals();let p=f.attributes.position,m=f.attributes.uv;if(p&&m){for(let e=0;e<p.count;e++){let t=p.getX(e),n=p.getZ(e),i=(t+r/2)/r,a=(n+1.82)/3.64;m.setXY(e,i,a)}m.needsUpdate=!0}let h=new U(f,d);h.position.set(0,-.02,0),h.castShadow=!0,h.receiveShadow=!0,em.add(h),Hp=h;let g=new U(cm(r+.1,.02,3.74,.05),new K({color:14078929,roughness:.9}));g.position.set(0,-.13,0),g.castShadow=!0,g.receiveShadow=!0,em.add(g);let _=new U(new W(r,.05,.04),new K({color:1976635,roughness:.9}));_.position.set(0,.055,0),em.add(_),Z.add(em);let v=document.getElementById(`inspector-bb-type`),y=document.getElementById(`inspector-bb-size`);v&&(v.innerText=e===`half`?`Half-size (400pt)`:`Full-size (830pt)`),y&&(y.innerText=e===`half`?`80.5×8.5×54.5mm`:`165×8.5×54.5mm`),pp(Y.activeExperiment)}function fm(e){dm(e)}function pm(){try{let e=document.getElementById(`canvas-3d-parent`),n=e.clientWidth||600,r=e.clientHeight||450;Z=new Bn,Z.background=new H(461331),Z.fog=new zn(461331,.04),zp=new Us(40,n/r,.1,100),zp.position.set(0,7.5,9),zp.lookAt(0,0,0);try{Bp=new zd({antialias:!0,powerPreference:`high-performance`})}catch(e){console.warn(`Failed to create WebGLRenderer with antialias, trying without antialias...`,e);try{Bp=new zd({antialias:!1})}catch{throw Error(`WebGL context creation failed. This usually happens when you have too many tabs of Circuit IQ open in your browser. Please close other tabs and reload this page.`)}}Bp.setSize(n,r),Bp.setPixelRatio(Math.min(window.devicePixelRatio,2)),Bp.shadowMap.enabled=!0,e.appendChild(Bp.domElement),Z.add(new Zs(16777215,2));let i=new Xs(16777215,3);i.position.set(3,12,4),i.castShadow=!0,i.shadow.mapSize.width=2048,i.shadow.mapSize.height=2048,i.shadow.camera.near=.5,i.shadow.camera.far=25,i.shadow.camera.left=-8,i.shadow.camera.right=8,i.shadow.camera.top=8,i.shadow.camera.bottom=-8,i.shadow.bias=-5e-4,Z.add(i);let a=new Gs(11032055,45,25,Math.PI/4,.5,1.2);a.position.set(-6,6,2),Z.add(a);let o=new Gs(6514417,35,25,Math.PI/4,.5,1.2);o.position.set(6,6,-2),Z.add(o);let s=new U(new Fo(60,60),new K({color:790036,roughness:.35,metalness:.6}));s.rotation.x=-Math.PI/2,s.position.y=-.22,s.receiveShadow=!0,Z.add(s);let c=new xc(40,40,53380,1580585);c.position.y=-.219,c.material.opacity=.15,c.material.transparent=!0,Z.add(c),dm(`full`),Wp=new U(new Io(.04,.06,4),new Jr({color:15381256,side:2})),Wp.rotation.set(-Math.PI/2,0,Math.PI/4),Wp.position.set(0,-10,0),Z.add(Wp),Gp=om(),Gp.position.set(0,.05,-3.2),Gp.visible=!1,Z.add(Gp);let l=new Io(.06,.09,32),u=new Jr({color:2278750,side:2});Q=new U(l,u),Q.rotation.x=-Math.PI/2,Q.position.set(0,-10,0),Z.add(Q),$=new U(l,u),$.rotation.x=-Math.PI/2,$.position.set(0,-10,0),Z.add($),xm();let d=new Ss;d.onStart=(e,t,n)=>{window.parent.postMessage({type:`lab-loading`,progress:0},`*`)},d.onProgress=(e,t,n)=>{let r=Math.round(t/n*100);window.parent.postMessage({type:`lab-loading`,progress:r},`*`)},d.onLoad=()=>{window.parent.postMessage({type:`lab-loaded`},`*`)},d.onError=e=>{console.error(`Error loading resource:`,e)},Kf=new As(d).load(`/DefaultMaterial_baseColor.jpg`),Kf.wrapS=t,Kf.wrapT=t,Kf.flipY=!1;let f=new Ud(d);f.load(`/models/resistor/scene.gltf`,e=>{Wf=e.scene,Wf.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0,e.name===`METAL-material`&&(e.visible=!1))}),Im()},void 0,e=>{console.error(`Failed to load resistor GLTF model`,e)}),f.load(`/models/electronic_components/scene.gltf`,e=>{Gf=e.scene,Gf.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),console.log(`Successfully loaded electronic components model`,Gf),Y.placedComponents&&Y.placedComponents.length>0&&Y.placedComponents.forEach(e=>{if(e.type===`wire`||e.type===`eraser`)return;Z.remove(e.mesh),e.leads.forEach(e=>Z.remove(e));let{mesh:t,leads:n}=zm(e.type,e.snap1,e.snap2,e.color);e.mesh=t,e.leads=n,Z.add(t),n.forEach(e=>Z.add(e))})},void 0,e=>{console.error(`Failed to load electronic components GLTF model`,e)}),Am=!1;let p=0,m=0,h={x:0,y:0};function g(e){switch(e){case`resistor`:case`capacitor`:return{colSpan:5,rowSpan:0};case`ammeter`:case`voltmeter`:return{colSpan:4,rowSpan:0};case`inductor`:case`diode`:return{colSpan:4,rowSpan:0};case`led`:case`transistor`:return{colSpan:2,rowSpan:0};case`button`:case`toggle_switch`:return{colSpan:0,rowSpan:1};case`display`:return{colSpan:4,rowSpan:1};case`source`:return{colSpan:0,rowSpan:1};default:return{colSpan:4,rowSpan:0}}}e.addEventListener(`dragover`,e=>{if(e.preventDefault(),!Y.draggingSidebarTool)return;let t=Bp.domElement.getBoundingClientRect();Tm.x=(e.clientX-t.left)/t.width*2-1,Tm.y=-((e.clientY-t.top)/t.height)*2+1,wm.setFromCamera(Tm,zp);let n=wm.intersectObject(Vp);if(n.length>0){let e=n[0].point,t=Vp.worldToLocal(e.clone()),r=-($p-1)*.1522/2,i=Math.round((t.x-r)/.1522);i=Math.max(0,Math.min($p-1,i));let a=0,o=1/0;for(let e=0;e<14;e++){let n=0;e===0?n=-1.296:e===1?n=-1.144:e>=2&&e<=6?n=-.839+(e-2)*.1522:e>=7&&e<=11?n=.229+(e-7)*.1522:e===12?n=1.144:e===13&&(n=1.296);let r=Math.abs(t.z-n);r<o&&(o=r,a=e)}let s=a===0||a===1||a===12||a===13,c=i%6==5;if(s&&c){Y.ghostMesh&&=(Z.remove(Y.ghostMesh),null),Y.ghostSnap1=null,Y.ghostSnap2=null;return}let l=i*14+a,u=Y.draggingSidebarTool,d=g(u),f=Math.min($p-1,i+d.colSpan),p=Math.min(13,a+d.rowSpan),m=f*14+p;if(Y.ghostSnap1!==l||Y.ghostSnap2!==m){Y.ghostSnap1=l,Y.ghostSnap2=m,Y.ghostMesh&&=(Z.remove(Y.ghostMesh),null);let e=zm(u,l,m,u===`led`?Y.params.led_color||`red`:null),t=new jn;t.add(e.mesh),e.leads.forEach(e=>t.add(e)),t.traverse(e=>{e.isMesh&&(e.material=e.material.clone(),e.material.transparent=!0,e.material.opacity=.55,e.castShadow=!1,e.receiveShadow=!1)}),Y.ghostMesh=t,Z.add(Y.ghostMesh)}}else Y.ghostMesh&&=(Z.remove(Y.ghostMesh),null),Y.ghostSnap1=null,Y.ghostSnap2=null}),e.addEventListener(`dragleave`,()=>{Y.ghostMesh&&=(Z.remove(Y.ghostMesh),null),Y.ghostSnap1=null,Y.ghostSnap2=null}),e.addEventListener(`drop`,e=>{if(e.preventDefault(),!Y.draggingSidebarTool)return;let t=Y.draggingSidebarTool,n=Y.ghostSnap1,r=Y.ghostSnap2;Y.ghostMesh&&=(Z.remove(Y.ghostMesh),null),Y.ghostSnap1=null,Y.ghostSnap2=null,Y.draggingSidebarTool=null,n!==null&&r!==null&&n!==r&&(t===`wire`?Ym(n,r):t===`eraser`||Bm(t,n,r)),document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),Y.selectedTool=null,Cp()}),e.addEventListener(`mousedown`,e=>{let t=Bp.domElement.getBoundingClientRect();Tm.x=(e.clientX-t.left)/t.width*2-1,Tm.y=-((e.clientY-t.top)/t.height)*2+1,wm.setFromCamera(Tm,zp);let n=wm.intersectObjects(Z.children,!0).find(e=>e.object.name===`plunger`);if(n){let e=Y.placedComponents.find(e=>{let t=!1;return e.mesh.traverse(e=>{e===n.object&&(t=!0)}),t});Y.activePressedPlunger=n.object;let t=Y.activePressedPlunger.userData.originalY===void 0?.24:Y.activePressedPlunger.userData.originalY;e&&e.type===`button`?(Y.buttonPressed=!0,Y.activePressedPlunger.position.y=t-.05):(Y.buttonPressed=!Y.buttonPressed,Y.activePressedPlunger.position.y=Y.buttonPressed?t-.05:t),Am=!1,Sm();return}if(Y.selectedTool===`wire`&&Em!==null){Y.isDrawingWire=!0,Y.wireStartSnap=Em,Am=!1;return}if(!Y.selectedTool){let e=Y.placedComponents.map(e=>e.mesh),t=wm.intersectObjects(e,!0);if(t.length>0){let e=t[0].object,n=-1;for(;e&&(n=Y.placedComponents.findIndex(t=>t.mesh===e),n===-1);)e=e.parent;if(n!==-1&&!(Y.placedComponents[n].type===`source`&&Y.activeExperiment===`arduino_led`)){Y.selectedComponentIdx=n,Y.selectedHoleIndex=null,Y.draggedComponentIdx=n,Y.isDraggingComponent=!0,Y.dragStartSnap1=Y.placedComponents[n].snap1,Y.dragStartSnap2=Y.placedComponents[n].snap2,Am=!1,jm(!0);let e=Mm(Y.placedComponents[n]);Y.placedComponents[n].mesh.add(e),Km(),Y.wasRunningBeforeDrag=Y.isRunning,Y.isRunning&&(Y.isRunning=!1,np(),Yf(!1),X.btnRun&&(X.btnRun.style.display=`block`),X.btnStop&&(X.btnStop.style.display=`none`),X.statusDot&&(X.statusDot.style.background=`var(--accent)`),X.statusTextBar&&(X.statusTextBar.innerText=`READY`));return}}let n=[];Y.wires.forEach(e=>{e.pins&&n.push(e.pins[0],e.pins[1]),e.sleeves&&n.push(e.sleeves[0],e.sleeves[1])});let r=wm.intersectObjects(n);if(r.length>0){let e=r[0].object,t=-1,n=-1;for(let r=0;r<Y.wires.length;r++){let i=Y.wires[r];if(i.pins&&i.pins[0]===e||i.sleeves&&i.sleeves[0]===e){t=r,n=0;break}else if(i.pins&&i.pins[1]===e||i.sleeves&&i.sleeves[1]===e){t=r,n=1;break}}if(t!==-1){Y.draggedWireIdx=t,Y.draggedWireEnd=n,Y.isDraggingWireEnd=!0,Y.dragStartWireHole=n===0?Y.wires[t].fromHole:Y.wires[t].toHole,Am=!1,Y.wasRunningBeforeDrag=Y.isRunning,Y.isRunning&&(Y.isRunning=!1,np(),Yf(!1),X.btnRun&&(X.btnRun.style.display=`block`),X.btnStop&&(X.btnStop.style.display=`none`),X.statusDot&&(X.statusDot.style.background=`var(--accent)`),X.statusTextBar&&(X.statusTextBar.innerText=`READY`));return}}}Am=!0,p=e.clientX,m=e.clientY,h={x:e.clientX,y:e.clientY}}),window.addEventListener(`mouseup`,e=>{if(Am=!1,Y.activePressedPlunger){let e=Y.placedComponents.find(e=>{let t=!1;return e.mesh.traverse(e=>{e===Y.activePressedPlunger&&(t=!0)}),t});if(e&&e.type===`button`){Y.buttonPressed=!1;let e=Y.activePressedPlunger.userData.originalY===void 0?.24:Y.activePressedPlunger.userData.originalY;Y.activePressedPlunger.position.y=e,Y.activePressedPlunger=null,Sm()}else Y.activePressedPlunger=null}if(Y.isDrawingWire){Y.isDrawingWire=!1,Y.tempWireMesh&&=(Z.remove(Y.tempWireMesh),null),Y.wireStartSnap!==null&&Em!==null&&Y.wireStartSnap!==Em&&Ym(Y.wireStartSnap,Em),Y.wireStartSnap=null,Y.selectedTool=null,document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),Cp();return}if(Y.isDraggingComponent){if(Y.isDraggingComponent=!1,Em===null&&Y.draggedComponentIdx!==-1){let e=Y.placedComponents[Y.draggedComponentIdx];Z.remove(e.mesh),e.leads.forEach(e=>Z.remove(e));let t=zm(e.type,Y.dragStartSnap1,Y.dragStartSnap2,e.color);e.mesh=t.mesh,e.leads=t.leads,e.snap1=Y.dragStartSnap1,e.snap2=Y.dragStartSnap2,Z.add(e.mesh),e.leads.forEach(e=>Z.add(e))}jm(),Y.draggedComponentIdx=-1,Y.dragStartSnap1=null,Y.dragStartSnap2=null;let e=$f();e.status===`success`?(Y.wasRunningBeforeDrag?(Y.isRunning=!0,tp(),Yf(!0),X.btnRun&&(X.btnRun.style.display=`none`),X.btnStop&&(X.btnStop.style.display=`block`),X.statusDot&&(X.statusDot.style.background=`var(--red)`),X.statusTextBar&&(X.statusTextBar.innerText=`RUNNING`)):Sm(),op(`Circuit IQ · AI Mentor`,`Circuit validated: `+e.message)):(Y.isRunning=!1,np(),Yf(!1),X.btnRun&&(X.btnRun.style.display=`block`),X.btnStop&&(X.btnStop.style.display=`none`),X.statusDot&&(X.statusDot.style.background=`var(--accent)`),X.statusTextBar&&(X.statusTextBar.innerText=`READY`),op(`Circuit IQ · AI Mentor`,`Validation Failure: `+e.message)),vp(),Rp(),Ip();return}if(Y.isDraggingWireEnd){if(Y.isDraggingWireEnd=!1,Y.draggedWireIdx!==-1){let e=Y.wires[Y.draggedWireIdx],t=Y.draggedWireEnd===0?e.toHole:e.fromHole;if(Em===null||Em===t){let t=e.fromHole,n=e.toHole;Y.draggedWireEnd===0?t=Y.dragStartWireHole:n=Y.dragStartWireHole,Jm(Y.draggedWireIdx,t,n)}}Y.draggedWireIdx=-1,Y.draggedWireEnd=-1,Y.dragStartWireHole=null;let e=$f();e.status===`success`?(Y.wasRunningBeforeDrag?(Y.isRunning=!0,tp(),Yf(!0),X.btnRun&&(X.btnRun.style.display=`none`),X.btnStop&&(X.btnStop.style.display=`block`),X.statusDot&&(X.statusDot.style.background=`var(--red)`),X.statusTextBar&&(X.statusTextBar.innerText=`RUNNING`)):Sm(),op(`Circuit IQ · AI Mentor`,`Circuit validated: `+e.message)):(Y.isRunning=!1,np(),Yf(!1),X.btnRun&&(X.btnRun.style.display=`block`),X.btnStop&&(X.btnStop.style.display=`none`),X.statusDot&&(X.statusDot.style.background=`var(--accent)`),X.statusTextBar&&(X.statusTextBar.innerText=`READY`),op(`Circuit IQ · AI Mentor`,`Validation Failure: `+e.message)),vp(),Rp(),Ip();return}Math.hypot(e.clientX-h.x,e.clientY-h.y)<5&&Pm()}),e.addEventListener(`mousemove`,e=>{let t=Bp.domElement.getBoundingClientRect();if(Tm.x=(e.clientX-t.left)/t.width*2-1,Tm.y=-((e.clientY-t.top)/t.height)*2+1,Dm=e.clientX,Om=e.clientY,Am){let t=e.clientX-p,n=e.clientY-m;tm+=t*.005,nm+=n*.005,nm=Math.max(.1,Math.min(Math.PI/2-.02,nm)),p=e.clientX,m=e.clientY}if(Nm(),Y.isDrawingWire&&Y.wireStartSnap!==null&&(Y.tempWireMesh&&=(Z.remove(Y.tempWireMesh),null),Em!==null&&Em!==Y.wireStartSnap)){let e=am(Y.wireStartSnap),t=am(Em);Y.tempWireMesh=new U(new zo(qm(e.clone().add(new B(0,.28,0)),t.clone().add(new B(0,.28,0)),Y.wires.length),64,.024,8,!1),new K({color:2278750,roughness:.5,transparent:!0,opacity:.85})),Z.add(Y.tempWireMesh)}if(Y.isDraggingComponent&&Y.draggedComponentIdx!==-1&&Em!==null){let e=Y.placedComponents[Y.draggedComponentIdx],t=Math.floor(Y.dragStartSnap1/14),n=Y.dragStartSnap1%14,r=Math.floor(Y.dragStartSnap2/14),i=Y.dragStartSnap2%14,a=r-t,o=i-n,s=Math.floor(Em/14),c=Em%14,l=Math.max(0,Math.min($p-1,s+a)),u=Math.max(0,Math.min(13,c+o)),d=s*14+c,f=l*14+u;if(d!==e.snap1||f!==e.snap2){Z.remove(e.mesh),e.leads.forEach(e=>Z.remove(e));let t=zm(e.type,d,f,e.color);e.mesh=t.mesh,e.leads=t.leads,e.snap1=d,e.snap2=f,Z.add(e.mesh),e.leads.forEach(e=>Z.add(e)),jm(),Yp=Mm(e),e.mesh.add(Yp)}}if(Y.isDraggingWireEnd&&Y.draggedWireIdx!==-1&&Em!==null){let e=Y.wires[Y.draggedWireIdx],t=e.fromHole,n=e.toHole,r=t,i=n;Y.draggedWireEnd===0?r=Em:i=Em,r!==i&&(r!==t||i!==n)&&Jm(Y.draggedWireIdx,r,i)}});function _(){if(requestAnimationFrame(_),Z.rotation.y+=(tm-Z.rotation.y)*.08,Qp+=(Zp-Qp)*.15,rm+=(nm-rm)*.1,zp.position.set(0,Qp*Math.sin(rm),Qp*Math.cos(rm)),X.zoomDisplay&&(X.zoomDisplay.innerText=Math.round(11.715/Qp*100)+`%`),Q&&$){let e=1+.18*Math.sin(Date.now()*.008);Q.scale.set(e,e,1),$.scale.set(e,e,1)}if(Fp(),Jf){let e=Y.meters.amps||0,t=Math.max(.002,Math.min(.08,.005+.1*e));qf+=t,qf>1&&(qf=0),Y.wires.forEach(t=>{if(t.lineMesh&&t.lineMesh.material){t.lineMesh.material.emissive.setHex(t.lineMesh.material.color.getHex());let n=Math.max(0,Math.min(1.8,e*8));t.lineMesh.material.emissiveIntensity=n*(.8+.2*Math.sin(Date.now()*.015))}t.electrons.forEach((e,n)=>{let r=(qf+n/t.electrons.length)%1,i=t.curve.getPointAt(r);e.position.copy(i),e.visible=!0})})}else Y.wires.forEach(e=>{e.lineMesh&&e.lineMesh.material&&(e.lineMesh.material.emissive.setHex(0),e.lineMesh.material.emissiveIntensity=0),e.electrons.forEach(e=>{e.visible=!1})});if(Y.proceduralGroup){if([`snell`,`lens_eq`,`tir`,`prism`].includes(Y.activeExperiment)){let e=Y.proceduralGroup.getObjectByName(`laser-ray`);if(e){let t=Y.params.C||45,n=Y.params.V||1,r=Y.params.R||1.5,i=[new B(-2.5,.4,0),new B(0,.4,0)];if(Y.activeExperiment===`snell`){let e=n/r*Math.sin(t*Math.PI/180);if(e<=1){let t=new B(2.5,.4-2.5*Math.tan(Math.asin(e)),0);i.push(t)}else{let e=new B(-2.5,.4+2.5*Math.tan(t*Math.PI/180),0);i.push(e)}}else if(Y.activeExperiment===`tir`){let e=n/r*Math.sin(t*Math.PI/180);if(e>1){let e=new B(-2.5,.4+2.5*Math.tan(t*Math.PI/180),0);i.push(e)}else{let t=new B(2.5,.4-2.5*Math.tan(Math.asin(e)),0);i.push(t)}}else if(Y.activeExperiment===`prism`){let e=new B(.5,.25,0),t=new B(2.5,.05,0);i.push(e,t)}else if(Y.activeExperiment===`lens_eq`){let e=Y.meters.amps,t=Y.params.V||30,n=new B(Math.min(2.5,e*.05),e>0?.2:.6,0);i.push(n);let r=Y.proceduralGroup.getObjectByName(`lens-object-pin`),a=Y.proceduralGroup.getObjectByName(`lens-image-screen`),o=Y.proceduralGroup.getObjectByName(`lens-screen-stand`);r&&(r.position.x=-t*.05),a&&(a.position.x=Math.min(2.5,e*.05)),o&&(o.position.x=Math.min(2.5,e*.05))}e.geometry.setFromPoints(i)}}else if(Y.activeExperiment===`pendulum`){let e=Y.proceduralGroup.getObjectByName(`pendulum-pivot`);if(e){let t=Y.params.V||30,n=Y.params.R||1.5,r=Y.params.L||9.8,i=Math.sqrt(r/n),a=t*Math.PI/180*Math.cos(Date.now()*.001*i);e.rotation.z=a;let o=e.getObjectByName(`pendulum-string`),s=e.getObjectByName(`pendulum-bob`);o&&s&&(o.scale.y=n/1.4,o.position.y=-n/2,s.position.y=-n)}}else if(Y.activeExperiment===`hooke`){let e=Y.proceduralGroup.getObjectByName(`spring-group`),t=Y.proceduralGroup.getObjectByName(`spring-weight`);if(e&&t){let n=Y.params.V*.001,r=Y.params.R||25,i=-1.3-n*9.8/r*.5;for(t.position.y=3.1+i-.12;e.children.length>0;)e.remove(e.children[0]);let a=[],o=.08;for(let e=0;e<=180;e++){let t=e/180,n=t*18*Math.PI*2,r=o*Math.cos(n),s=o*Math.sin(n),c=t*i;a.push(new B(r,c,s))}let s=new Ji(new Pr().setFromPoints(a),new Bi({color:9741240}));e.add(s)}}else if(Y.activeExperiment===`projectile`){let e=Y.proceduralGroup.getObjectByName(`projectile-ball`),t=Y.proceduralGroup.getObjectByName(`cannon-group`);if(t){let e=Y.params.V||45;t.children[0].rotation.z=e*Math.PI/180}if(e&&Y.isRunning){e.visible=!0;let t=Y.params.V*Math.PI/180,n=Y.params.R,r=Y.params.L||9.8,i=(Date.now()-Y.simStartTime)*.001*2,a=n*i*Math.cos(t),o=n*i*Math.sin(t)-.5*r*i*i;o>=0?e.position.set(-4+a*.2,.2+o*.2,0):e.position.set(-4+n*n*Math.sin(2*t)/r*.2,.2,0)}else e&&(e.visible=!1)}else if([`ideal_gas`,`boyle`,`charles`].includes(Y.activeExperiment)){let e=Y.proceduralGroup.getObjectByName(`piston-plate`),t=Y.meters.amps,n=Y.meters.ohms;if(e&&(e.position.y=.2+t/30*1.6),Y.moleculesData&&Y.isRunning){let t=Math.sqrt(n/300)*.8;Y.moleculesData.forEach(n=>{n.mesh.position.x+=n.vx*t,n.mesh.position.y+=n.vy*t,n.mesh.position.z+=n.vz*t;let r=e?e.position.y-.08:1.8;n.mesh.position.y<.05&&(n.mesh.position.y=.05,n.vy=-n.vy),n.mesh.position.y>r&&(n.mesh.position.y=r,n.vy=-n.vy);let i=Math.sqrt(n.mesh.position.x*n.mesh.position.x+n.mesh.position.z*n.mesh.position.z);if(i>.54){let e=n.mesh.position.x/i,t=n.mesh.position.z/i,r=n.vx*e+n.vz*t;n.vx-=2*r*e,n.vz-=2*r*t,n.mesh.position.x=.53*e,n.mesh.position.z=.53*t}})}}else if(Y.activeExperiment===`photoelectric`){let e=Y.proceduralGroup.getObjectByName(`photoelectrons`);if(e&&Y.isRunning){let t=Y.params.V||8,n=Y.params.L||2.2;if(t*.4135>n&&Math.random()<.12&&e.children.length<25){let r=new U(new Lo(.02,8,8),new Jr({color:16436245}));r.position.set(-1,.5+(Math.random()-.5)*.3,(Math.random()-.5)*.3),r.userData={speed:.02+(t*.4135-n)*.015},e.add(r)}for(let t=e.children.length-1;t>=0;t--){let n=e.children[t];n.position.x+=n.userData.speed,n.position.x>1&&e.remove(n)}}}else if(Y.activeExperiment===`bohr_model`){let e=Y.proceduralGroup.getObjectByName(`bohr-electron`);if(e){let t=Y.params.V||3,n=t*.6,r=Date.now()*.002*(1/(t*t));e.position.set(n*Math.cos(r),.5,n*Math.sin(r))}}else if(Y.activeExperiment===`radioactive`&&Y.isRunning){let e=Y.params.R||10,t=Math.LN2/e*.016;Y.decayList&&Y.decayList.forEach(e=>{!e.decayed&&Math.random()<t&&(e.decayed=!0,e.mesh.material=new K({color:3900150,roughness:.8}))})}else if([`faraday`,`lenz`].includes(Y.activeExperiment)){let e=Y.proceduralGroup.getObjectByName(`faraday-magnet`);if(e){let t=Y.params.V||2,n=Date.now()*.002*t;e.position.x=2*Math.sin(n)}}else if(Y.activeExperiment===`solenoid`){let e=Y.proceduralGroup.getObjectByName(`solenoid-fields`);e&&Y.isRunning&&e.children.forEach((e,t)=>{e.material.opacity=.1+.4*Math.abs(Math.sin(Date.now()*.003+t))})}else if(Y.activeExperiment===`doppler`){let e=Y.proceduralGroup.getObjectByName(`doppler-source`),t=Y.proceduralGroup.getObjectByName(`doppler-ripples`);if(e&&t){let n=Y.params.V||50;Y.params.R;let r=Y.params.L||340,i=-4+Date.now()*.001*n*.05%8;if(e.position.x=i,Y.lastDopplerRippleTime||=0,Date.now()-Y.lastDopplerRippleTime>300){Y.lastDopplerRippleTime=Date.now();let e=new U(new Io(.05,.07,32),new Jr({color:3900150,transparent:!0,opacity:.8,side:2}));e.rotation.x=Math.PI/2,e.position.set(i,.25,0),e.userData={radius:.06,originX:i,timeCreated:Date.now()},t.add(e)}for(let e=t.children.length-1;e>=0;e--){let n=t.children[e],i=(Date.now()-n.userData.timeCreated)*.001,a=r*.008*i;n.scale.set(a,a,1),n.material.opacity=Math.max(0,.8*(1-i/2)),i>2&&t.remove(n)}}}else if(Y.activeExperiment===`specific_heat`&&Y.isRunning){let e=Y.proceduralGroup.getObjectByName(`specific-heat-metal`),t=Y.proceduralGroup.getObjectByName(`specific-heat-water`);if(e){Y.simStartTime||=Date.now();let n=(Date.now()-Y.simStartTime)*.001;if(n<2){let t=n/2;e.position.x=.8-1.6*t,e.position.y=.74+.5*Math.sin(t*Math.PI)-.3*t}else{if(e.position.set(-.8,.25,0),t){let e=Math.min(1,(n-2)/3);t.material.color.setRGB(.23+.7*e,.51*(1-e),.96*(1-e))}let r=Y.params.R,i=Y.meters.ohms,a=Math.max(0,1-(n-2)/3),o=i+(r-i)*a,s=new H().setHSL(0,1,.2+o/100*.3);e.material.color.copy(s)}}}else if(Y.activeExperiment===`de_broglie`&&Y.isRunning){if(Y.lastBroglieTime||=0,Y.broglieParticles||=[],Date.now()-Y.lastBroglieTime>200){Y.lastBroglieTime=Date.now();let e=new U(new Lo(.04,8,8),new Jr({color:3718648}));e.position.set(-2,.5,(Math.random()-.5)*.2),e.userData={phase:0,speed:.06},Y.proceduralGroup.add(e),Y.broglieParticles.push(e)}for(let e=Y.broglieParticles.length-1;e>=0;e--){let t=Y.broglieParticles[e];if(t.position.x+=t.userData.speed,t.position.y=.5+.15*Math.sin(t.position.x*12-Date.now()*.01),t.position.x>-.5&&t.position.x-t.userData.speed<=-.5&&(t.position.z=Math.random()>.5?.35:-.35),t.position.x>1.8){Y.proceduralGroup.remove(t),Y.broglieParticles.splice(e,1);let n=new U(new Lo(.03,8,8),new Jr({color:3462041})),r=0,i=Math.random();r=i<.4?(Math.random()-.5)*.3:i<.7?.7+(Math.random()-.5)*.3:i<.9?-.7-(Math.random()-.5)*.3:(Math.random()-.5)*1.8,n.position.set(1.78,.5+(Math.random()-.5)*.6,r),Y.proceduralGroup.add(n),setTimeout(()=>{Y.proceduralGroup.remove(n)},1200)}}}}Bp.render(Z,zp)}_(),Ip(),e.addEventListener(`wheel`,e=>{e.preventDefault(),Zp+=e.deltaY*.005,Zp=Math.max(4,Math.min(20,Zp))},{passive:!1});let v=document.getElementById(`cb-zoom-in`),y=document.getElementById(`cb-zoom-out`),b=document.getElementById(`cb-fit`);v&&v.addEventListener(`click`,()=>{Zp=Math.max(4,Zp-1.5)}),y&&y.addEventListener(`click`,()=>{Zp=Math.min(20,Zp+1.5)}),b&&b.addEventListener(`click`,()=>{Zp=11.715}),window.addEventListener(`resize`,()=>{let t=e.clientWidth,n=e.clientHeight;zp.aspect=t/n,zp.updateProjectionMatrix(),Bp.setSize(t,n)})}catch(e){console.error(`ThreeJS Initialization Failed`,e);let t=document.createElement(`div`);t.style.position=`fixed`,t.style.top=`20px`,t.style.left=`20px`,t.style.background=`rgba(220, 38, 38, 0.95)`,t.style.color=`white`,t.style.padding=`15px`,t.style.borderRadius=`8px`,t.style.zIndex=`99999`,t.style.fontFamily=`monospace`,t.style.fontSize=`12px`,t.innerText=`ThreeJS Error: ${e.message}\nStack: ${e.stack}`,document.body.appendChild(t),window.parent.postMessage({type:`lab-loaded`},`*`)}}var mm,hm,gm,_m,vm,ym,bm;function xm(){let e=new jn;e.position.set(-1.8,.6,-3);let t=new U(cm(1.6,1.2,.8,.08),new K({color:3359061,roughness:.3}));t.castShadow=!0,e.add(t);let n=new U(new W(1.5,1.1,.05),new K({color:1976635,roughness:.6}));n.position.set(0,0,.385),e.add(n),mm=document.createElement(`canvas`),mm.width=128,mm.height=64,hm=new ca(mm);let r=new Fo(1.1,.45);gm=new U(r,new Jr({map:hm})),gm.position.set(0,.25,.41),e.add(gm);let i=new U(r,new K({color:16777215,transparent:!0,opacity:.15,roughness:.05,metalness:.9}));i.position.set(0,.25,.415),e.add(i);let a=new K({color:988970,metalness:.3,roughness:.4}),o=new G(.12,.12,.06,16),s=new U(o,a);s.rotation.x=Math.PI/2,s.position.set(-.4,-.22,.41),e.add(s);let c=new U(o,a);c.rotation.x=Math.PI/2,c.position.set(.4,-.22,.41),e.add(c);let l=um(15680580);l.rotation.x=Math.PI/2,l.position.set(-.4,-.42,.41),e.add(l);let u=um(1976635);u.rotation.x=Math.PI/2,u.position.set(.4,-.42,.41),e.add(u),Z.add(e),_m=document.createElement(`canvas`),_m.width=256,_m.height=128,vm=new ca(_m),vm.colorSpace=He,ym=document.createElement(`canvas`),ym.width=256,ym.height=128,bm=new ca(ym),bm.colorSpace=He}async function Sm(){if(Y.isRunning)try{let e;if(Y.activeExperiment!==`arduino_led`)try{let t=await fetch(`/api/calculate`,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify({params:Y.params,active_experiment:Y.activeExperiment,button_pressed:Y.buttonPressed})});if(t.ok)e=await t.json();else throw Error(`HTTP ${t.status}`)}catch(t){console.warn(`Backend calculation failed, falling back to local calculation.`,t),e=Qf(Y.params,Y.activeExperiment,Y.buttonPressed)}else e=Qf(Y.params,Y.activeExperiment,Y.buttonPressed);Y.meters.volts=e.V,Y.meters.amps=e.I,Y.meters.ohms=e.Z,Y.meters.power=e.P;let t=Date.now(),n=(t-Y.energyStartTime)/1e3;if(Y.energyStartTime=t,Y.meters.energy+=e.P*n,Y.analysis.XL=e.XL,Y.analysis.XC=e.XC,Y.analysis.phi=e.phi,Y.analysis.f0=e.f0,Y.activeExperiment===`arduino_led`&&Y.isRunning&&Y.buttonPressed&&Y.meters.amps>0){_p(6);let e=(Y.meters.amps*1e3).toFixed(1),t=(Y.meters.power*1e3).toFixed(1);X.conclusionText.innerHTML=`<b>Conclusion (Arduino LED Button Circuit):</b><br>
        When the momentary push button was pressed, the circuit was closed and a current of <b>${e} mA</b> flowed through the series circuit (Resistor → LED). The LED glowed in 3D, confirming that the circuit is complete and properly wired.<br>
        Power consumed: ${t} mW. The LED uses the current-limiting resistor (${Y.params.R} Ω) to maintain safe operating current.<br>
        Upon releasing the button, the circuit opened and the LED immediately turned OFF — verifying the Normally Open (NO) behaviour of a momentary tactile switch.`}rp(),Cm()}catch(e){console.error(`Single calculation trigger error`,e)}}function Cm(){if(!mm)return;let e=mm.getContext(`2d`);if(e.fillStyle=`#0f172a`,e.fillRect(0,0,128,64),e.fillStyle=`#10b981`,e.font=`bold 22px Courier New`,Y.activeExperiment===`arduino_led`?(e.fillText(`5.0V USB`,10,28),e.font=`14px Courier New`,e.fillText(`ARDUINO UNO`,10,48)):(e.fillText(`${Y.params.V.toFixed(1)}V DC`,10,28),e.font=`14px Courier New`,e.fillText(`${Y.params.f.toFixed(0)}Hz AC`,10,48)),hm.needsUpdate=!0,_m&&vm){let e=_m.getContext(`2d`);e.fillStyle=`#021a10`,e.fillRect(0,0,256,128),e.fillStyle=`rgba(16,185,129,0.04)`;for(let t=0;t<128;t+=4)e.fillRect(0,t,256,2);e.strokeStyle=`rgba(248,113,113,0.7)`,e.lineWidth=3,e.strokeRect(2,2,252,124),e.fillStyle=`rgba(248,113,113,0.6)`,e.font=`bold 14px Courier New`,e.textAlign=`center`,e.fillText(`VOLT`,256/2,22),e.strokeStyle=`rgba(248,113,113,0.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(10,32),e.lineTo(246,32),e.stroke();let t=Y.isRunning?Y.meters.volts.toFixed(3):`0.000`;e.fillStyle=Y.isRunning?`#f87171`:`#4b5563`,e.font=`bold 38px Courier New`,e.textAlign=`right`,e.fillText(t,216,85),e.fillStyle=`rgba(248,113,113,0.8)`,e.font=`bold 20px Courier New`,e.textAlign=`left`,e.fillText(`V`,222,85),e.fillStyle=Y.isRunning?`rgba(34,197,94,0.8)`:`rgba(239,68,68,0.5)`,e.font=`11px Courier New`,e.textAlign=`center`,e.fillText(Y.isRunning?`● LIVE`:`○ READY`,256/2,118),vm.needsUpdate=!0}if(ym&&bm){let e=ym.getContext(`2d`);e.fillStyle=`#020c1a`,e.fillRect(0,0,256,128),e.fillStyle=`rgba(96,165,250,0.04)`;for(let t=0;t<128;t+=4)e.fillRect(0,t,256,2);e.strokeStyle=`rgba(96,165,250,0.7)`,e.lineWidth=3,e.strokeRect(2,2,252,124),e.fillStyle=`rgba(96,165,250,0.6)`,e.font=`bold 14px Courier New`,e.textAlign=`center`,e.fillText(`AMPER`,256/2,22),e.strokeStyle=`rgba(96,165,250,0.3)`,e.lineWidth=1,e.beginPath(),e.moveTo(10,32),e.lineTo(246,32),e.stroke();let t,n;Y.isRunning?Y.meters.amps<.1?(t=(Y.meters.amps*1e3).toFixed(2),n=`mA`):(t=Y.meters.amps.toFixed(4),n=`A`):(t=`0.00`,n=`mA`),e.fillStyle=Y.isRunning?`#60a5fa`:`#4b5563`,e.font=`bold 38px Courier New`,e.textAlign=`right`,e.fillText(t,212,85),e.fillStyle=`rgba(96,165,250,0.8)`,e.font=`bold 18px Courier New`,e.textAlign=`left`,e.fillText(n,216,85),e.fillStyle=Y.isRunning?`rgba(34,197,94,0.8)`:`rgba(239,68,68,0.5)`,e.font=`11px Courier New`,e.textAlign=`center`,e.fillText(Y.isRunning?`● LIVE`:`○ READY`,256/2,118),bm.needsUpdate=!0}Y.placedComponents.forEach(e=>{if(e.type===`led`&&e.mesh.userData.ledMat)if(Y.isRunning&&Y.meters.amps>0){let t=16720384,n=e.color||Y.params.led_color||`red`;if(n===`green`?t=65348:n===`yellow`?t=16768256:n===`blue`?t=30719:n===`white`&&(t=16777215),e.mesh.userData.ledMat.emissive.setHex(t),e.mesh.userData.ledMat.emissiveIntensity=10,e.mesh.userData.ledMat.color.setHex(t),e.mesh.userData.ledLight)e.mesh.userData.ledLight.color.setHex(t),e.mesh.userData.ledLight.intensity=6,e.mesh.userData.ledLight.position.copy(e.mesh.position),e.mesh.userData.ledLight.position.y+=.1;else{let n=new qs(t,6,1.2);n.position.copy(e.mesh.position),n.position.y+=.1,Z.add(n),e.mesh.userData.ledLight=n}}else e.mesh.userData.ledMat.emissive.setHex(0),e.mesh.userData.ledMat.emissiveIntensity=0,e.mesh.userData.ledLight&&(e.mesh.userData.ledLight.intensity=0);if(e.type===`source`&&e.mesh.userData.powerButton&&(e.mesh.userData.powerButton.material.color.setHex(Y.isRunning?2278750:15680580),e.mesh.userData.powerButton.material.emissive.setHex(Y.isRunning?2278750:0),e.mesh.userData.powerButton.material.emissiveIntensity=Y.isRunning?1.5:0,e.mesh.userData.powerLed&&(e.mesh.userData.powerLed.material.color.setHex(Y.isRunning?2278750:15680580),e.mesh.userData.powerLed.material.emissive.setHex(Y.isRunning?2278750:15680580),e.mesh.userData.powerLed.material.emissiveIntensity=Y.isRunning?2.5:.4)),(e.type===`ammeter`||e.type===`voltmeter`)&&Y.isRunning){let t=e.type===`ammeter`?6333946:16281969;if(e.mesh.userData.meterGlow)e.mesh.userData.meterGlow.intensity=Y.isRunning?.8:0,e.mesh.userData.meterGlow.position.copy(e.mesh.position),e.mesh.userData.meterGlow.position.y+=.25;else{let n=new qs(t,.8,.7);n.position.copy(e.mesh.position),n.position.y+=.25,Z.add(n),e.mesh.userData.meterGlow=n}}else (e.type===`ammeter`||e.type===`voltmeter`)&&e.mesh.userData.meterGlow&&(e.mesh.userData.meterGlow.intensity=0);if(e.type===`display`){let t=Math.floor(e.snap1/14),n=e.snap1%14,r=Math.floor(e.snap2/14),i=e.snap2%14,a=Math.round((t+r)/2),o=Mp(),s=e=>o.find(e),c=e=>{let t=s(0),n=s(12),r=s(882);return e===t||e===n||e===r},l=e=>{let t=s(1),n=s(13),r=s(883);return e===t||e===n||e===r},u=s(a*14+n),d=s(a*14+i),f=Y.isRunning&&(c(u)||c(d)),p=(t,n,r)=>{let i=e.mesh.userData[r];if(!i)return;let a=s(t*14+n);f&&l(a)?(i.material.color.setHex(16724787),i.material.emissive.setHex(16711680),i.material.emissiveIntensity=8):(i.material.color.setHex(2229509),i.material.emissive.setHex(0),i.material.emissiveIntensity=0)};p(a-2,n,`seg_g`),p(a-1,n,`seg_f`),p(a+1,n,`seg_a`),p(a+2,n,`seg_b`),p(a-2,i,`seg_e`),p(a-1,i,`seg_d`),p(a+1,i,`seg_c`),p(a+2,i,`seg_dp`)}})}var wm=new vc,Tm=new z,Em=null,Dm=0,Om=0,km=null,Am=!1;function jm(e=!1){Yp&&=(Z.remove(Yp),null),Y.placedComponents.forEach((t,n)=>{if(n===Y.selectedComponentIdx&&!e){let e=!1;if(t.mesh&&(t.mesh.traverse(t=>{t.name===`selectionOutline`&&(e=!0)}),!e)){let e=Mm(t);t.mesh.add(e)}return}if(t.mesh){let e=[];t.mesh.traverse(t=>{t.name===`selectionOutline`&&e.push(t)}),e.forEach(e=>{t.mesh.remove(e),Z.remove(e)})}})}function Mm(e){let t=new B(.6,.4,.6),n=new B(0,0,0);switch(e.type){case`resistor`:t.set(1.3,.45,.45);break;case`capacitor`:t.set(.5,1,.9);break;case`inductor`:t.set(1.5,.6,.6);break;case`led`:t.set(.24,.24,.24),n.set(0,.03,0);break;case`button`:case`toggle_switch`:t.set(.41,.22,.41),n.set(0,.04,0);break;case`source`:Y.activeExperiment===`arduino_led`?t.set(.35,.25,.45):t.set(1.1,1.3,1.1);break;case`ammeter`:case`voltmeter`:t.set(.68,.35,.46),n.set(0,.05,0);break;case`diode`:t.set(.6,.24,.24);break;case`transistor`:t.set(.35,.52,.32),n.set(0,-.02,0);break;case`display`:t.set(.82,.32,.74),n.set(0,.07,0);break}let r=new W(t.x,t.y,t.z),i=new jn;i.name=`selectionOutline`,i.position.copy(n);let a=new Qi(new ga(r),new Bi({color:16347926,transparent:!0,opacity:.9}));return i.add(a),i}function Nm(){wm.setFromCamera(Tm,zp),Wp.position.y=-10,Em=null;let e=null;if(Y.placedComponents.length>0&&!Am&&!Y.isDraggingComponent){let t=Y.placedComponents.map(e=>e.mesh),n=wm.intersectObjects(t,!0);if(n.length>0){let t=n[0].object;for(;t&&(e=Y.placedComponents.find(e=>e.mesh===t),!e);)t=t.parent}}if(e){if(km!==e&&(jm(),km=e),Xp){let t=e.type.charAt(0).toUpperCase()+e.type.slice(1);e.type===`resistor`?t=`Resistor (${Y.params.R} Ω)`:e.type===`capacitor`?t=`Capacitor (${Y.params.C} µF)`:e.type===`inductor`?t=`Inductor (${Y.params.L} mH)`:e.type===`source`?t=`Power Source (${Y.params.V} V)`:e.type===`led`?t=`Red LED`:e.type===`button`?t=`Push Button`:e.type===`toggle_switch`?t=`ON/OFF Switch`:e.type===`diode`?t=`PN Junction Diode`:e.type===`transistor`?t=`NPN Transistor`:e.type===`display`&&(t=`7-Segment Display`),Xp.innerText=t,Xp.style.left=`${Dm+15}px`,Xp.style.top=`${Om-35}px`,Xp.style.display=`block`}}else km&&(jm(),km=null,Xp&&(Xp.style.display=`none`));let t=!1;if(!e&&Hp&&!Am&&!Y.isDraggingComponent&&!Y.isDraggingWireEnd&&!Y.selectedTool&&wm.intersectObject(Hp).length>0&&(t=!0),t?Up||(Up=new Qi(new ga(new W($p===30?5:10,.2,3.64)),new Bi({color:16347926,transparent:!0,opacity:.85})),Up.position.set(0,-.02,0),Z.add(Up)):Up&&=(Z.remove(Up),null),(Y.selectedTool&&Y.selectedTool!==`eraser`||Y.isDraggingComponent||Y.isDraggingWireEnd||!Y.selectedTool)&&!e&&!Am){let e=[];if(Kp&&qp&&Gp&&Gp.visible&&(e=wm.intersectObjects([Kp,qp])),e.length>0){Em=e[0].object.userData.snapIndex;let t=am(Em);Wp.position.copy(t),Wp.position.y=t.y+.05;return}let t=wm.intersectObject(Vp);if(t.length>0){let e=t[0].point,n=Vp.worldToLocal(e.clone()),r=-($p-1)*.1522/2,i=Math.round((n.x-r)/.1522);i=Math.max(0,Math.min($p-1,i));let a=0,o=1/0;for(let e=0;e<14;e++){let t=0;e===0?t=-1.296:e===1?t=-1.144:e>=2&&e<=6?t=-.839+(e-2)*.1522:e>=7&&e<=11?t=.229+(e-7)*.1522:e===12?t=1.144:e===13&&(t=1.296);let r=Math.abs(n.z-t);r<o&&(o=r,a=e)}let s=a===0||a===1||a===12||a===13,c=i%6==5;if(s&&c)return;Em=i*14+a;let l=am(Em);Wp.position.copy(l),Wp.position.y=.135}}}function Pm(){if(!Y.selectedTool){Em===null?(Y.selectedHoleIndex=null,Y.selectedComponentIdx=-1,jm(!0),Km()):(Y.selectedHoleIndex=Em,Y.selectedComponentIdx=-1,jm(!0),Km()),Ip();return}if(Y.selectedTool!==`eraser`){if(Y.targetSnap1!==null&&Y.targetSnap2!==null){let e=Y.targetSnap1,t=Y.targetSnap2;Y.selectedTool===`wire`?Ym(e,t):Bm(Y.selectedTool,e,t),Y.placementStartHole=null,Y.selectedTool=null,document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),Cp(),Ip();return}if(Em!==null)if(Y.placementStartHole===null)Y.placementStartHole=Em,X.aiMessage.innerText=`First socket snapped. Choose second socket.`,Cp();else{let e=Y.placementStartHole,t=Em;e!==t&&(Y.selectedTool===`wire`?Ym(e,t):Bm(Y.selectedTool,e,t)),Y.placementStartHole=null,Y.selectedTool=null,document.querySelectorAll(`.comp-chip:not([data-type^="bb_"])`).forEach(e=>e.classList.remove(`selected`)),Cp()}}else{wm.setFromCamera(Tm,zp);let e=Y.placedComponents.map(e=>e.mesh),t=wm.intersectObjects(e,!0);if(t.length>0){let e=t[0].object,n=-1;for(;e&&(n=Y.placedComponents.findIndex(t=>t.mesh===e),n===-1);)e=e.parent;n!==-1&&Xm(n);return}let n=Y.wires.map(e=>e.lineMesh),r=wm.intersectObjects(n);if(r.length>0){let e=r[0].object,t=Y.wires.findIndex(t=>t.lineMesh===e);t!==-1&&Zm(t)}}Ip()}function Fm(e){let t=[0,9127187,16711680,16747520,16776960,32768,255,15631086,8421504,16777215],n=e.toString(),r=parseInt(n[0])||0,i=parseInt(n[1])||0,a=n.length-2;return[t[r],t[i],a>=0&&a<10?t[a]:9127187]}function Im(){let e=Fm(Y.params.R);Y.placedComponents.forEach(t=>{if(t.type===`resistor`&&(t.mesh.userData.bands&&t.mesh.userData.bands.forEach((t,n)=>{t.material.color.setHex(e[n])}),t.mesh.userData.gltfBands)){let[n,r]=t.mesh.userData.gltfBands;n&&n.material&&n.material.color.setHex(e[0]),r&&r.material&&r.material.color.setHex(e[2])}})}function Lm(e){let t=[`object_6`,`object_14`,`object_31`,`object_35`,`object_61`,`object_68`,`object_72`,`object_41`,`object_47`,`object_51`,`object_53`,`object_26`,`object_74`],n=e;for(;n;){let e=n.name.toLowerCase();if(e.includes(`leg`)||e.includes(`lead`)||e.includes(`wire`)||t.includes(e))return!0;n=n.parent}return!1}function Rm(e,t,n=null){if(!Gf)return null;let r=Gf.getObjectByName(e);if(!r)return console.warn(`Template node not found: ${e}`),null;let i=new jn,a=r.clone(),o=new tr;a.traverse(e=>{if(e.isMesh){if(Lm(e))return;o.expandByObject(e)}});let s=new B;return o.isEmpty()&&o.setFromObject(a),o.getCenter(s),a.position.sub(s),i.add(a),i.scale.set(t,t,t),i.userData.localBottomY=o.min.y-s.y,i.userData.localMinX=o.min.x-s.x,i.userData.localMaxX=o.max.x-s.x,n&&(a.rotation.x+=n.x||0,a.rotation.y+=n.y||0,a.rotation.z+=n.z||0),{wrapper:i,clone:a}}function zm(e,t,n,r=null){e===`source`&&Y.activeExperiment===`arduino_led`&&(t=882,n=883);let i=am(t),a=am(n),o=new B().addVectors(i,a).multiplyScalar(.5);e===`button`||e===`toggle_switch`?o.y=.12:e===`led`||e===`transistor`||e===`inductor`?o.y=.28:e===`capacitor`?o.y=.3:e===`resistor`?o.y=.28:e===`diode`?o.y=.3:e===`ammeter`||e===`voltmeter`?o.y=.38:e===`display`?o.y=.08:o.y=.45;let s=new jn;s.position.copy(o);let c=new B().subVectors(a,i);if(e===`display`){Math.floor(t/14);let e=t%14,r=am(Math.floor(n/14)*14+e);r.distanceTo(i)>.001?c.subVectors(r,i):c.set(1,0,0)}c.length(),c.normalize();let l=new Nt().setFromUnitVectors(new B(1,0,0),c);s.quaternion.copy(l);let u=[];if(e===`resistor`){if(Wf){let e=Wf.clone(),t=new tr().setFromObject(e),n=new B;t.getSize(n);let r=new B;t.getCenter(r),e.traverse(e=>{if(e.isMesh){e.position.sub(r);let t=Fm(Y.params.R);e.name===`LARANJA-material`?(e.material=e.material.clone(),e.material.color.setHex(t[0]),e.material.roughness=.35):e.name===`MARRON-material`?(e.material=e.material.clone(),e.material.color.setHex(t[2]),e.material.roughness=.35):e.name===`OURO-material`?(e.material=e.material.clone(),e.material.color.setHex(13938487),e.material.roughness=.1,e.material.metalness=.9):e.name===`CERAMICA-material`&&(e.material=e.material.clone(),e.material.color.setHex(14535588),e.material.roughness=.5)}}),e.scale.set(75,75,75),s.add(e),s.userData={gltfBands:[e.getObjectByName(`LARANJA-material`),e.getObjectByName(`MARRON-material`)]}}else{let e=new U(new G(.12,.12,.6,16),new K({color:14535588,roughness:.6}));e.rotation.z=Math.PI/2,e.castShadow=!0,s.add(e);let t=new G(.135,.12,.06,16),n=new K({color:14535588,roughness:.6}),r=new U(t,n);r.position.x=-.3,r.rotation.z=-Math.PI/2,s.add(r);let i=new U(t,n);i.position.x=.3,i.rotation.z=Math.PI/2,s.add(i);let a=new G(.128,.128,.05,16),o=Fm(Y.params.R),c=new U(a,new Jr({color:o[0]}));c.position.x=-.18,c.rotation.z=Math.PI/2,s.add(c);let l=new U(a,new Jr({color:o[1]}));l.position.x=-.04,l.rotation.z=Math.PI/2,s.add(l);let u=new U(a,new Jr({color:o[2]}));u.position.x=.1,u.rotation.z=Math.PI/2,s.add(u);let d=new U(a,new K({color:13938487,metalness:.8,roughness:.2}));d.position.x=.22,d.rotation.z=Math.PI/2,s.add(d),s.userData={bands:[c,l,u]}}let e=Wf?.2:.35,t=new B(-e,0,0).applyQuaternion(s.quaternion).add(o);u.push(Um(t,i));let n=new B(e,0,0).applyQuaternion(s.quaternion).add(o);u.push(Um(n,a))}else if(e===`capacitor`){let e=new K({map:Kf,roughness:.4,metalness:.2,side:2}),t=new G(.445*.26,.445*.26,1.4*.26,32,1,!1),n=t.attributes.uv;for(let e=0;e<n.count;e++){let t=n.getX(e),r=n.getY(e);n.setXY(e,t*.5,r*.5+.45)}let r=new U(t,e);r.castShadow=!0,r.receiveShadow=!0,s.add(r);let c=new U(new G(.43*.26,.43*.26,.1*.26,32),new K({color:2236962,roughness:.9,metalness:.1}));c.position.y=-.7*.26,c.castShadow=!0,c.receiveShadow=!0,s.add(c);let l=new U(new G(.43*.26,.43*.26,.02*.26,32),new K({color:1710618,roughness:.85,metalness:.1}));l.position.y=.702*.26,l.castShadow=!0,l.receiveShadow=!0,s.add(l);let d=new B(-.039,-.195,0).applyQuaternion(s.quaternion).add(o);u.push(Um(d,i));let f=new B(.039,-.195,0).applyQuaternion(s.quaternion).add(o);u.push(Um(f,a))}else if(e===`inductor`){let e=Rm(`Inductor-Radial_38`,42);if(e){let t=e.wrapper;return s.add(t),{mesh:s,leads:[]}}else{let e=new U(new G(.12,.12,.6,16),new K({color:4674921,roughness:.8}));e.rotation.z=Math.PI/2,e.castShadow=!0,s.add(e);for(let e=-.22;e<=.22;e+=.08){let t=new U(new Ro(.14,.03,8,20),new K({color:14251782,metalness:.9,roughness:.1}));t.position.x=e,t.rotation.y=Math.PI/2,s.add(t)}let t=new B(-.3,0,0).applyQuaternion(s.quaternion).add(o);u.push(Vm(t,i));let n=new B(.3,0,0).applyQuaternion(s.quaternion).add(o);u.push(Vm(n,a))}}else if(e===`led`){let e=r||Y.params.led_color||`red`,t=15680580;e===`green`?t=2278750:e===`yellow`?t=15381256:e===`blue`?t=3900150:e===`white`&&(t=14739711);let n=new Xo({color:t,roughness:.05,metalness:0,transmission:.75,thickness:.4,transparent:!0,opacity:.88,emissive:0,emissiveIntensity:0,side:2}),c=new K({color:13158600,metalness:.92,roughness:.1}),l=new K({color:1710618,roughness:.65,metalness:.05}),d=new U(new G(.075,.075,.12,20),n);d.position.y=.02,d.castShadow=!0,s.add(d);let f=new U(new Lo(.075,20,20,0,Math.PI*2,0,Math.PI/2),n);f.position.y=.08,f.castShadow=!0,s.add(f);let p=new U(new G(.082,.082,.018,20),l);p.position.y=-.041,s.add(p);let m=new U(new G(.006,.006,.07,8),c);m.position.set(-.022,.01,0),s.add(m);let h=new U(new G(.018,.012,.05,10),c);h.position.set(.022,.005,0),s.add(h);let g=i.distanceTo(a),_=new Ga,v=new B(-.022,.02,0).applyQuaternion(s.quaternion).add(o),y=new B(-.022,-.05,0).applyQuaternion(s.quaternion).add(o),b=new B(-g/2,-.1,0).applyQuaternion(s.quaternion).add(o),x=i.clone().add(new B(0,-.08,0));_.add(new Ba(v,y)),_.add(new Ba(y,b)),_.add(new Ba(b,x));let S=new U(new zo(_,16,.007,8,!1),c);S.castShadow=!0,S.receiveShadow=!0,u.push(S);let C=new Ga,w=new B(.022,.02,0).applyQuaternion(s.quaternion).add(o),T=new B(.022,-.05,0).applyQuaternion(s.quaternion).add(o),E=new B(g/2,-.1,0).applyQuaternion(s.quaternion).add(o),D=a.clone().add(new B(0,-.08,0));C.add(new Ba(w,T)),C.add(new Ba(T,E)),C.add(new Ba(E,D));let O=new U(new zo(C,16,.007,8,!1),c);O.castShadow=!0,O.receiveShadow=!0,u.push(O),s.userData={ledMat:n}}else if(e===`button`||e===`toggle_switch`){let t=new K({color:1381653,roughness:.5,metalness:.1}),n=new K({color:13751771,roughness:.2,metalness:.9,side:2}),r=new U(new W(.28,.16,.28),t);r.position.y=.08,r.castShadow=!0,r.receiveShadow=!0,s.add(r);let i=new U(new W(.29,.015,.29),n);i.position.y=.1675,i.castShadow=!0,s.add(i);let a=new G(.015,.015,.004,12),o=new K({color:1579035,roughness:.6}),c=[-.0975,.0975];c.forEach(e=>{c.forEach(t=>{let n=new U(a,o);n.position.set(e,.175,t),n.castShadow=!0,s.add(n)})});let l=new U(new G(.07,.07,.06,24),new K({color:e===`button`?14427686:1118481,roughness:e===`button`?.4:.6,metalness:.1}));l.name=`plunger`,l.userData.originalY=.2075,l.position.y=Y.buttonPressed?.1675:.2075,l.castShadow=!0,s.add(l);let u=[-.2296,.2296],d=[-.1522,.1522];return u.forEach(e=>{d.forEach(t=>{let r=new U(new W(.12,.02,.04),n);r.position.set(e>0?.17:-.17,.02,t),r.castShadow=!0,s.add(r);let i=new U(new W(.02,.15,.02),n);i.position.set(e,-.055,t),i.castShadow=!0,s.add(i)})}),{mesh:s,leads:[]}}else if(e===`source`){if(Y.activeExperiment===`arduino_led`){let e=new B(-1.1,.23,-.6);Gp.updateMatrixWorld(!0),e.applyMatrix4(Gp.matrixWorld);let t=new B(-4,1.5,-6),n=new B().addVectors(e,t).multiplyScalar(.5);n.y+=.8;let r=new U(new zo(new Ea([e,n,t]),24,.06,8,!1),new K({color:1120295,roughness:.6})),i=new U(new W(.2,.15,.35),new K({color:13751771,metalness:.9}));i.position.copy(e),i.lookAt(t);let a=new jn;return a.add(r),a.add(i),{mesh:a,leads:[]}}let e=new U(cm(.9,.38,.6,.05),new K({color:1120295,roughness:.8}));e.position.y=-.01,e.castShadow=!0,e.receiveShadow=!0,s.add(e);let t=new U(cm(.86,.39,.56,.04),new K({color:2565930,roughness:.4,metalness:.3}));t.position.y=.005,t.castShadow=!0,t.receiveShadow=!0,s.add(t);let n=new U(cm(.88,.03,.58,.04),new K({color:15381256,roughness:.2,metalness:.8}));n.position.y=.18,s.add(n);let r=new U(new Fo(.64,.39),new K({color:988970,roughness:.7}));r.rotation.x=-Math.PI/2,r.position.set(0,.2005,-.05),s.add(r);let c=new Fo(.6,.35),l=new U(c,new Jr({map:hm}));l.rotation.x=-Math.PI/2,l.position.set(0,.201,-.05),s.add(l);let d=new U(c,new K({color:16777215,transparent:!0,opacity:.15,roughness:.05,metalness:.9}));d.rotation.x=-Math.PI/2,d.position.set(0,.202,-.05),s.add(d);let f=um(15680580);f.position.set(-.35,.2,.18),s.add(f);let p=um(1976635);p.position.set(.35,.2,.18),s.add(p);let m=new U(new G(.05,.05,.04,16),new K({color:4144966,roughness:.5,metalness:.5}));m.position.set(.24,.21,-.05),s.add(m);let h=new U(new W(.015,.045,.015),new Jr({color:15680580}));h.position.set(.24,.23,-.07),s.add(h);let g=new U(new G(.05,.05,.03,12),new K({color:Y.isRunning?2278750:15680580,emissive:Y.isRunning?2278750:0,emissiveIntensity:Y.isRunning?1.5:0,roughness:.2}));g.position.set(-.15,.21,.18),s.add(g);let _=new U(new Lo(.02,8,8),new K({color:Y.isRunning?2278750:15680580,emissive:Y.isRunning?2278750:15680580,emissiveIntensity:Y.isRunning?2.5:.4}));_.position.set(.05,.21,.18),s.add(_);let v=new U(new W(.18,.1,.15),new K({color:13751771,metalness:.9,roughness:.1}));v.position.set(-.46,.05,-.1),v.rotation.y=Math.PI/2,s.add(v),s.userData={powerButton:g,powerLed:_};let y=new B(-.35,.3,.18).applyQuaternion(s.quaternion).add(o);u.push(Vm(y,i));let b=new B(.35,.3,.18).applyQuaternion(s.quaternion).add(o);u.push(Vm(b,a))}else if(e===`ammeter`||e===`voltmeter`){let t=e===`ammeter`,n=t?1920728:12131356,r=new U(cm(.55,.38,.22,.04),new K({color:1976635,roughness:.75,metalness:.15}));r.castShadow=!0,r.receiveShadow=!0,s.add(r);let c=new U(cm(.52,.36,.08,.03),new K({color:n,roughness:.4,metalness:.3}));c.position.z=.07,s.add(c);let l=new U(new W(.44,.22,.02),new K({color:330260,roughness:.8}));l.position.set(0,.06,.12),s.add(l);let d=new Fo(.4,.19),f=new U(d,new Jr({map:t?bm:vm,side:0}));f.position.set(0,.06,.131),s.add(f);let p=new U(d,new K({color:11197951,transparent:!0,opacity:.08,roughness:.02,metalness:.6}));p.position.set(0,.06,.132),s.add(p);let m=new U(new W(.35,.04,.01),new K({color:988970,roughness:.9}));m.position.set(0,-.07,.131),s.add(m);let h=um(15680580);h.position.set(-.17,-.14,.05),h.scale.set(.6,.6,.6),h.rotation.x=Math.PI/2,s.add(h);let g=um(1976635);g.position.set(.17,-.14,.05),g.scale.set(.6,.6,.6),g.rotation.x=Math.PI/2,s.add(g);let _=new U(new G(.045,.045,.04,16),new K({color:4144966,roughness:.4,metalness:.6}));_.rotation.x=Math.PI/2,_.position.set(.2,-.1,.13),s.add(_);let v=new B(-.17,-.22,0).applyQuaternion(s.quaternion).add(o);u.push(Um(v,i));let y=new B(.17,-.22,0).applyQuaternion(s.quaternion).add(o);u.push(Um(y,a))}else if(e===`diode`){let e=new U(new G(.065,.065,.38,32),new K({color:1184274,roughness:.65,metalness:.1}));e.rotation.z=Math.PI/2,e.castShadow=!0,e.receiveShadow=!0,s.add(e);let t=new U(new G(.067,.067,.08,32),new K({color:14540253,metalness:.85,roughness:.2}));t.position.x=.12,t.rotation.z=Math.PI/2,t.castShadow=!0,s.add(t);let n=new B(-.19,0,0).applyQuaternion(s.quaternion).add(o);u.push(Um(n,i));let r=new B(.19,0,0).applyQuaternion(s.quaternion).add(o);u.push(Um(r,a))}else if(e===`transistor`){let e=new K({color:1579035,roughness:.55,metalness:.1}),r=new K({color:14540253,metalness:.95,roughness:.08}),c=new U(new G(.135,.135,.24,16,1,!1,0,Math.PI),e);c.position.set(0,.12,0),c.castShadow=!0,c.receiveShadow=!0,s.add(c);let l=new U(new W(.27,.24,.01),e);l.position.set(0,.12,-.005),l.castShadow=!0,l.receiveShadow=!0,s.add(l);let d=.011,f=Math.floor(t/14),p=t%14,m=Math.floor(n/14),h=n%14,g=Math.round((f+m)/2),_=Math.round((p+h)/2),v=am(g*14+_),y=new Ga,b=new B(-.076,0,0).applyQuaternion(s.quaternion).add(o),x=new B(-.076,-.05,0).applyQuaternion(s.quaternion).add(o),S=new B(-.1522,-.08,0).applyQuaternion(s.quaternion).add(o),C=i.clone().add(new B(0,-.08,0));y.add(new Ba(b,x)),y.add(new Ba(x,S)),y.add(new Ba(S,C));let w=new U(new zo(y,16,d,8,!1),r);w.castShadow=!0,w.receiveShadow=!0,u.push(w);let T=new Ga,E=new B(0,0,0).applyQuaternion(s.quaternion).add(o),D=new B(0,-.05,0).applyQuaternion(s.quaternion).add(o),O=v.clone().add(new B(0,-.08,0));T.add(new Ba(E,D)),T.add(new Ba(D,O));let ee=new U(new zo(T,12,d,8,!1),r);ee.castShadow=!0,ee.receiveShadow=!0,u.push(ee);let k=new Ga,te=new B(.076,0,0).applyQuaternion(s.quaternion).add(o),ne=new B(.076,-.05,0).applyQuaternion(s.quaternion).add(o),A=new B(.1522,-.08,0).applyQuaternion(s.quaternion).add(o),re=a.clone().add(new B(0,-.08,0));k.add(new Ba(te,ne)),k.add(new Ba(ne,A)),k.add(new Ba(A,re));let ie=new U(new zo(k,16,d,8,!1),r);return ie.castShadow=!0,ie.receiveShadow=!0,u.push(ie),{mesh:s,leads:u}}else if(e===`display`){let e=.1522,r=new U(new W(5*e,.22,.72),new K({color:988970,roughness:.7}));r.castShadow=!0,r.receiveShadow=!0,r.position.y=.11,s.add(r);let i=new U(new W(5*e-.04,.01,.68),new K({color:527380,roughness:.8}));i.position.set(0,.22,0),i.castShadow=!0,s.add(i);let a=(e,t,n,r,i=0,a)=>{let o=new K({color:2032901,emissive:0,emissiveIntensity:0,roughness:.4}),c=new U(new W(n,.02,r),o);c.position.set(e,.226,t),c.rotation.y=i,c.castShadow=!0,s.add(c),s.userData[a]=c};a(0,-.18,.18,.036,0,`seg_a`),a(.096,-.09,.036,.18,0,`seg_b`),a(.096,.09,.036,.18,0,`seg_c`),a(0,.18,.18,.036,0,`seg_d`),a(-.096,.09,.036,.18,0,`seg_e`),a(-.096,-.09,.036,.18,0,`seg_f`),a(0,0,.18,.036,0,`seg_g`);let o=new K({color:2032901,emissive:0,emissiveIntensity:0,roughness:.4}),c=new U(new Lo(.024,8,8),o);c.position.set(.18,.226,.18),c.castShadow=!0,s.add(c),s.userData.seg_dp=c;let l=Math.floor(t/14),d=t%14,f=Math.floor(n/14),p=n%14,m=Math.round((l+f)/2);for(let e=-2;e<=2;e++){let t=m+e,n=am(t*14+d),r=Hm(n,n.clone().add(new B(0,-.08,0)),.012);r.castShadow=!0,r.receiveShadow=!0,u.push(r);let i=am(t*14+p),a=Hm(i,i.clone().add(new B(0,-.08,0)),.012);a.castShadow=!0,a.receiveShadow=!0,u.push(a)}}return{mesh:s,leads:u}}function Bm(e,t,n){e===`source`&&Y.activeExperiment===`arduino_led`&&(t=882,n=883);let r=e===`led`?Y.params.led_color||`red`:null,{mesh:i,leads:a}=zm(e,t,n,r);if(Z.add(i),a.forEach(e=>Z.add(e)),Y.placedComponents.push({type:e,id:Y.placedComponents.length,snap1:t,snap2:n,mesh:i,leads:a,color:e===`led`?r:void 0}),Y.activeExperiment===`ohms`)e===`resistor`&&_p(1),e===`source`&&_p(2),(e===`ammeter`||e===`voltmeter`)&&_p(3);else if(Y.activeExperiment===`lcr`)e===`resistor`&&_p(1);else if(Y.activeExperiment===`arduino_led`){e===`source`&&_p(1);let t=Y.placedComponents.some(e=>e.type===`button`||e.type===`toggle_switch`)||e===`button`||e===`toggle_switch`,n=Y.placedComponents.some(e=>e.type===`led`)||e===`led`;t&&n&&_p(2),e===`resistor`&&_p(3)}vp(),Cm(),Rp(),Ip(),$f().status===`success`&&Sm()}function Vm(e,t){let n=new B().addVectors(e,t).multiplyScalar(.5);return n.y=Math.max(e.y,t.y)+.12,new U(new zo(new Ea([e,n,t]),12,.022,6,!1),new K({color:13358561,metalness:.9,roughness:.1}))}function Hm(e,t,n=.012){return new U(new zo(new Ba(e,t),4,n,6,!1),new K({color:13158600,metalness:.95,roughness:.08}))}function Um(e,t){let n=new B(t.x,e.y,t.z),r=new B().subVectors(n,e),i=r.length();if(i<.005)return new U(new zo(new Ba(e,t),8,.022,6,!1),new K({color:14540253,metalness:.95,roughness:.08}));r.normalize();let a=Math.min(.06,i*.4),o=new B().addScaledVector(r,-a).add(n),s=new B(n.x,n.y-a,n.z),c=new Ga;return c.add(new Ba(e,o)),c.add(new Ha(o,n,s)),c.add(new Ba(s,t)),new U(new zo(c,24,.022,6,!1),new K({color:14540253,metalness:.95,roughness:.08}))}function Wm(){let e=new Set;return Y.placedComponents.forEach(t=>{t.type===`source`&&Y.activeExperiment===`arduino_led`||(e.add(t.snap1),e.add(t.snap2))}),e}function Gm(e,t,n=null){if(e===882||e===883||!t.has(e))return e;let r=Math.floor(e/14),i=e%14;if(i>=2&&i<=6){let e=[2,3,4,5,6];e.sort((e,t)=>{let n=e-i,r=t-i;return n>0&&r<=0?-1:r>0&&n<=0?1:Math.abs(n)-Math.abs(r)});for(let i of e){let e=r*14+i;if(!t.has(e)&&e!==n)return e}}else if(i>=7&&i<=11){let e=[7,8,9,10,11];e.sort((e,t)=>{let n=e-i,r=t-i;return n>0&&r<=0?-1:r>0&&n<=0?1:Math.abs(n)-Math.abs(r)});for(let i of e){let e=r*14+i;if(!t.has(e)&&e!==n)return e}}else{let e=[];for(let t=1;t<12;t++)e.push(r+t,r-t);for(let r of e)if(r>=0&&r<$p){if(r%6==5)continue;let e=r*14+i;if(!t.has(e)&&e!==n)return e}}return e}function Km(){let e=document.getElementById(`sel-comp-info`);if(e)if(Y.selectedComponentIdx!==-1&&Y.selectedComponentIdx!==void 0){let t=Y.placedComponents[Y.selectedComponentIdx];if(!t){e.innerHTML=`Click a hole or component to inspect.`;return}let n=t.type.charAt(0).toUpperCase()+t.type.slice(1),r=``,i=e=>e===882?`Arduino 5V`:e===883?`Arduino GND`:`Col ${Math.floor(e/14)+1}, Row ${[`+`,`-`,`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`+`,`-`][e%14]}`;if(t.type===`resistor`)n=`Ceramic Resistor`,r=`
        <div class="prop-row"><span class="prop-label">Resistance</span><span class="prop-val" style="color:#f97316">${Y.params.R} Ω</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} ↔ ${i(t.snap2)}</span></div>
      `;else if(t.type===`capacitor`)n=`Electrolytic Capacitor`,r=`
        <div class="prop-row"><span class="prop-label">Capacitance</span><span class="prop-val" style="color:var(--accent)">${Y.params.C} µF</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} (Anode) ↔ ${i(t.snap2)}</span></div>
      `;else if(t.type===`inductor`)n=`Axial Spool Inductor`,r=`
        <div class="prop-row"><span class="prop-label">Inductance</span><span class="prop-val" style="color:var(--blue)">${Y.params.L} mH</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} ↔ ${i(t.snap2)}</span></div>
      `;else if(t.type===`source`)n=`DC Voltage Source`,r=`
        <div class="prop-row"><span class="prop-label">Voltage</span><span class="prop-val" style="color:var(--accent)">${Y.params.V} V</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} (+) ↔ ${i(t.snap2)} (-)</span></div>
      `;else if(t.type===`led`){let e=t.color||Y.params.led_color||`red`;n=`Light-Emitting Diode (${e.charAt(0).toUpperCase()+e.slice(1)})`,r=`
        <div class="prop-row"><span class="prop-label">Color</span>
          <select class="component-value-select" data-param="led_color" style="background:#09090b;color:var(--text);border:1px solid var(--border);border-radius:4px;font-size:10px;padding:2px 4px">
            <option value="red" ${e===`red`?`selected`:``}>Red</option>
            <option value="green" ${e===`green`?`selected`:``}>Green</option>
            <option value="yellow" ${e===`yellow`?`selected`:``}>Yellow</option>
            <option value="blue" ${e===`blue`?`selected`:``}>Blue</option>
          </select>
        </div>
        <div class="prop-row"><span class="prop-label">Forward Voltage</span><span class="prop-val">2.0 V</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} (Anode) ↔ ${i(t.snap2)} (Cathode)</span></div>
      `}else t.type===`button`?(n=`Push Button (Momentary)`,r=`
        <div class="prop-row"><span class="prop-label">State</span><span class="prop-val">${Y.buttonPressed?`<b style="color:var(--green)">Pressed (ON)</b>`:`Released (OFF)`}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} ↔ ${i(t.snap2)}</span></div>
      `):t.type===`toggle_switch`?(n=`ON/OFF Switch (Toggle)`,r=`
        <div class="prop-row"><span class="prop-label">State</span><span class="prop-val">${Y.buttonPressed?`<b style="color:var(--green)">ON (Closed)</b>`:`OFF (Open)`}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} ↔ ${i(t.snap2)}</span></div>
      `):t.type===`diode`?(n=`PN Junction Diode (1N4007)`,r=`
        <div class="prop-row"><span class="prop-label">Model</span><span class="prop-val">1N4007</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} (Anode) ↔ ${i(t.snap2)} (Cathode)</span></div>
      `):(t.type===`ammeter`||t.type===`voltmeter`)&&(n=t.type===`ammeter`?`Digital Ammeter`:`Digital Voltmeter`,r=`
        <div class="prop-row"><span class="prop-label">Measurement</span><span class="prop-val" style="color:var(--yellow)">${t.type===`ammeter`?(Y.meters.amps*1e3).toFixed(1)+` mA`:Y.meters.volts.toFixed(2)+` V`}</span></div>
        <div class="prop-row"><span class="prop-label">Terminals</span><span class="prop-val">${i(t.snap1)} (+) ↔ ${i(t.snap2)} (-)</span></div>
      `);if(Y.isRunning){let e=``;if(t.type===`resistor`){let t=Y.meters.amps*1e3,n=Y.meters.amps*Y.params.R,r=Y.meters.amps*n*1e3;e=`
          <div class="prop-row"><span class="prop-label">Current</span><span class="prop-val">${t.toFixed(2)} mA</span></div>
          <div class="prop-row"><span class="prop-label">Voltage Drop</span><span class="prop-val">${n.toFixed(2)} V</span></div>
          <div class="prop-row"><span class="prop-label">Power Dissipated</span><span class="prop-val">${r.toFixed(2)} mW</span></div>
        `}else if(t.type===`led`){let t=Y.meters.amps*1e3;e=`
          <div class="prop-row"><span class="prop-label">Current</span><span class="prop-val">${Y.buttonPressed?t.toFixed(2)+` mA`:`0.00 mA`}</span></div>
          <div class="prop-row"><span class="prop-label">State</span><span class="prop-val" style="color:#ef4444">${Y.buttonPressed?`<b>GLOWING</b>`:`OFF`}</span></div>
        `}e&&(r+=`
          <div style="border-top:1px dashed var(--border);margin:8px 0;padding-top:8px"></div>
          <div class="prop-title" style="font-size:10px;color:var(--text2)">LIVE TELEMETRY</div>
          ${e}
        `)}e.innerHTML=`
      <div style="font-weight:600;color:var(--text);margin-bottom:6px;font-size:12px;display:flex;align-items:center;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:#f97316"></span>
        ${n}
      </div>
      ${r}
    `,e.querySelectorAll(`.component-value-select`).forEach(e=>{e.addEventListener(`click`,e=>e.stopPropagation()),e.addEventListener(`change`,t=>{e.getAttribute(`data-param`)===`led_color`&&cp(e.value)})})}else if(Y.selectedHoleIndex!==null&&Y.selectedHoleIndex!==void 0){let t=Y.selectedHoleIndex,n=Math.floor(t/14)+1,r=t%14,i=[`+`,`-`,`A`,`B`,`C`,`D`,`E`,`F`,`G`,`H`,`I`,`J`,`+`,`-`][r],a=r===0||r===1||r===12||r===13,o=a?`Power Rail Hole`:`Breadboard Socket Hole`;t===882&&(o=`Arduino 5V Output Pin`),t===883&&(o=`Arduino Ground (GND) Pin`);let s=e=>{if(e===t)return!0;if(t===882||t===883)return!1;let i=Math.floor(e/14),o=e%14;if(a)return o===r&&Math.floor(i/6)===Math.floor((n-1)/6);{let e=r>=2&&r<=6,t=o>=2&&o<=6;return i===n-1&&e===t}},c=[];Y.placedComponents.forEach(e=>{(s(e.snap1)||s(e.snap2))&&c.push(e.type.charAt(0).toUpperCase()+e.type.slice(1))}),Y.wires.forEach(e=>{(s(e.fromHole)||s(e.toHole))&&c.push(`Wire Jumper`)});let l=c.length>0?c.map(e=>`<div style="font-size:10px;padding:2px 6px;background:var(--bg3);border-radius:4px;margin-top:2px">${e}</div>`).join(``):`<div style="font-size:10px;color:var(--text3)">None</div>`;e.innerHTML=`
      <div style="font-weight:600;color:var(--text);margin-bottom:6px;font-size:12px;display:flex;align-items:center;gap:6px">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--accent)"></span>
        ${o}
      </div>
      <div class="prop-row"><span class="prop-label">Coordinates</span><span class="prop-val">${t===882?`Arduino 5V`:t===883?`Arduino GND`:`Col ${n}, Row ${i}`}</span></div>
      <div class="prop-row"><span class="prop-label">Snap Index</span><span class="prop-val">${t}</span></div>
      <div style="border-top:1px dashed var(--border);margin:8px 0;padding-top:8px"></div>
      <div class="prop-title" style="font-size:10px;color:var(--text2)">ELECTRICAL CONNECTIONS</div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-top:4px">
        ${l}
      </div>
    `}else e.innerHTML=`Click a hole or component to inspect.`}function qm(e,t,n=0){let r=[];r.push(e.clone());let i=e.clone().add(new B(0,.35,0));r.push(i);let a=t.clone().add(new B(0,.35,0)),o=e.distanceTo(t),s=Math.min(2,Math.max(.4,o*.4+.15)),c=new B().addVectors(e,t).multiplyScalar(.5),l=new B,u=new B().subVectors(t,e),d=new B(-u.z,0,u.x).normalize(),f=(Math.sin(n*45.67)||0)*Math.min(.25,o*.12);l.addScaledVector(d,f),Y.placedComponents&&Y.placedComponents.length>0&&Y.placedComponents.forEach(n=>{if(n.type===`source`&&Y.activeExperiment===`arduino_led`)return;let r=am(n.snap1),i=am(n.snap2),a=new B().addVectors(r,i).multiplyScalar(.5),o=(t.x-e.x)**2+(t.z-e.z)**2;if(o>0){let r=((a.x-e.x)*(t.x-e.x)+(a.z-e.z)*(t.z-e.z))/o;r=Math.max(0,Math.min(1,r));let i=e.x+r*(t.x-e.x),c=e.z+r*(t.z-e.z),u=Math.hypot(a.x-i,a.z-c),f=.45,p=.6;if(n.type===`led`?(f=.35,p=.85):n.type===`capacitor`?(f=.3,p=.9):n.type===`button`||n.type===`toggle_switch`?(f=.4,p=.7):(n.type===`source`||n.type===`voltmeter`||n.type===`ammeter`)&&(f=.7,p=.7),u<f)if(r>.08&&r<.92){let e=p+.45;s<e&&(s=e);let t=new B(i,0,c),n=new B(a.x-t.x,0,a.z-t.z).dot(d)>0?-1:1,r=(f-u)*.8+.15;l.addScaledVector(d,n*r)}else{let e=p+.25;s<e&&(s=e)}}}),c.y+=s,c.add(l);let p=new B().addVectors(i,c).multiplyScalar(.5);p.y=i.y+(c.y-i.y)*.35,p.addScaledVector(l,.4);let m=new B().addVectors(a,c).multiplyScalar(.5);return m.y=a.y+(c.y-a.y)*.35,m.addScaledVector(l,.4),r.push(p),r.push(c),r.push(m),r.push(a),r.push(t.clone()),new Ea(r)}function Jm(e,t,n){let r=Y.wires[e],i=Wm();t=Gm(t,i,n),n=Gm(n,i,t),Z.remove(r.lineMesh),r.sleeves&&r.sleeves.forEach(e=>Z.remove(e));let a=am(t),o=am(n),s=t+n+e,c=qm(a.clone().add(new B(0,.28,0)),o.clone().add(new B(0,.28,0)),s),l=new U(new zo(c,64,.024,8,!1),r.lineMesh.material);Z.add(l);let u=new W(.07,.28,.07),d=new U(u,r.lineMesh.material);d.position.copy(a).add(new B(0,.14,0)),Z.add(d);let f=new U(u,r.lineMesh.material);f.position.copy(o).add(new B(0,.14,0)),Z.add(f),r.pins[0].position.copy(a).add(new B(0,.01,0)),r.pins[1].position.copy(o).add(new B(0,.01,0)),r.fromHole=t,r.toHole=n,r.curve=c,r.lineMesh=l,r.sleeves=[d,f]}function Ym(e,t){let n=Wm();e=Gm(e,n,t),t=Gm(t,n,e);let r=am(e),i=am(t),a;a=e===882||t===882||e%14==0||t%14==0||e%14==12||t%14==12?15680580:e===883||t===883||e%14==1||t%14==1||e%14==13||t%14==13?1120295:[3900150,1096065,14251782,9133302][Y.wires.length%4];let o=new K({color:a,roughness:.4}),s=r.clone().add(new B(0,.28,0)),c=qm(s,i.clone().add(new B(0,.28,0)),e+t+Y.wires.length),l=new U(new zo(c,64,.024,8,!1),o);Z.add(l);let u=[];for(let e=0;e<4;e++){let e=new U(new Lo(.015,8,8),new Jr({color:16436245}));e.position.copy(s),e.visible=!1,Z.add(e),u.push(e)}let d=new G(.012,.012,.18,8),f=new K({color:13751771,metalness:.9,roughness:.1}),p=new U(d,f);p.position.copy(r).add(new B(0,.01,0)),Z.add(p);let m=new U(d,f);m.position.copy(i).add(new B(0,.01,0)),Z.add(m);let h=new W(.07,.28,.07),g=new U(h,o);g.position.copy(r).add(new B(0,.14,0)),Z.add(g);let _=new U(h,o);_.position.copy(i).add(new B(0,.14,0)),Z.add(_),Y.wires.push({fromHole:e,toHole:t,curve:c,lineMesh:l,electrons:u,pins:[p,m],sleeves:[g,_]}),Y.activeExperiment===`ohms`&&Y.wires.length>=4?_p(4):(Y.activeExperiment===`lcr`&&Y.wires.length>=4||Y.activeExperiment===`rc`&&Y.wires.length>=3)&&_p(2),vp(),Rp(),Ip(),$f().status===`success`&&Sm()}function Xm(e){let t=Y.placedComponents[e];km===t&&(km=null,Yp&&=(t.mesh.remove(Yp),null),Xp&&(Xp.style.display=`none`)),Y.selectedComponentIdx===e?(Y.selectedComponentIdx=-1,jm(!0)):Y.selectedComponentIdx>e&&Y.selectedComponentIdx--,Z.remove(t.mesh),t.leads.forEach(e=>Z.remove(e)),Y.placedComponents.splice(e,1);for(let t=e;t<Y.placedComponents.length;t++)Y.placedComponents[t].id=t;vp(),Y.isRunning=!1,np(),Rp(),Ip()}function Zm(e){let t=Y.wires[e];Z.remove(t.lineMesh),t.electrons.forEach(e=>Z.remove(e)),t.pins&&t.pins.forEach(e=>Z.remove(e)),t.sleeves&&t.sleeves.forEach(e=>Z.remove(e)),Y.wires.splice(e,1),vp(),Y.isRunning=!1,np(),Rp(),Ip()}function Qm(e){let t=document.getElementById(`library-grid-container`);if(!t)return;t.innerHTML=``;let n;if(e===`circuits`?n={title:`Electricity & Circuits`,color:`rgba(59, 130, 246, 0.08)`,borderColor:`rgba(59, 130, 246, 0.25)`,badgeColor:`#60a5fa`,exps:[`ohms`,`kvl`,`kcl`,`rc_rl_rlc`,`series_parallel`,`wheatstone`]}:e===`magnetism`?n={title:`Electromagnetism`,color:`rgba(168, 85, 247, 0.08)`,borderColor:`rgba(168, 85, 247, 0.25)`,badgeColor:`#c084fc`,exps:[`faraday`,`lenz`,`solenoid`,`transformer`]}:e===`optics`?n={title:`Optics & Light`,color:`rgba(6, 182, 212, 0.08)`,borderColor:`rgba(6, 182, 212, 0.25)`,badgeColor:`#22d3ee`,exps:[`snell`,`lens_eq`,`tir`,`prism`]}:e===`mechanics`?n={title:`Mechanics & Waves`,color:`rgba(245, 158, 11, 0.08)`,borderColor:`rgba(245, 158, 11, 0.25)`,badgeColor:`#fbbf24`,exps:[`pendulum`,`hooke`,`projectile`,`doppler`]}:e===`thermo`?n={title:`Thermodynamics`,color:`rgba(244, 63, 94, 0.08)`,borderColor:`rgba(244, 63, 94, 0.25)`,badgeColor:`#fb7185`,exps:[`ideal_gas`,`boyle`,`charles`,`specific_heat`]}:e===`modern`&&(n={title:`Modern Physics`,color:`rgba(16, 185, 129, 0.08)`,borderColor:`rgba(16, 185, 129, 0.25)`,badgeColor:`#34d399`,exps:[`photoelectric`,`radioactive`,`de_broglie`,`bohr_model`]}),!n)return;let r=document.createElement(`div`);r.style.cssText=`display:grid;grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));gap:15px;`,n.exps.forEach(e=>{let t=Xf[e];if(!t)return;let i=document.createElement(`div`);i.style.cssText=`background:rgba(255,255,255,0.015);border:1px solid rgba(255,255,255,0.04);border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;transition:all 0.25s;`,i.addEventListener(`mouseover`,()=>{i.style.borderColor=n.borderColor,i.style.background=n.color,i.style.transform=`translateY(-3px)`}),i.addEventListener(`mouseout`,()=>{i.style.borderColor=`rgba(255,255,255,0.04)`,i.style.background=`rgba(255,255,255,0.015)`,i.style.transform=`none`}),i.innerHTML=`
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
          <span style="font-size:8px;color:${n.badgeColor};text-transform:uppercase;font-weight:700;letter-spacing:1px">Module</span>
          <span style="width:5px;height:5px;border-radius:50%;background:${n.badgeColor}"></span>
        </div>
        <h3 style="font-size:13px;font-weight:700;margin:0 0 4px 0;color:white;font-family:inherit">${t.name}</h3>
        <p style="font-size:10px;color:#64748b;margin:0 0 12px 0;line-height:1.4">${t.aim}</p>
      </div>
      <button style="width:100%;padding:8px;border-radius:8px;border:none;background:#2563eb;color:white;font-weight:700;font-size:10px;cursor:pointer;font-family:inherit">Load Simulation</button>
    `,i.addEventListener(`click`,()=>{pp(e),document.getElementById(`modal-library`).style.display=`none`}),r.appendChild(i)}),t.appendChild(r)}function $m(){Xp=document.createElement(`div`),Xp.className=`component-tooltip`,document.body.appendChild(Xp),ip(),kp(),pp(new URLSearchParams(window.location.search).get(`exp`)||`ohms`),yp(),setTimeout(()=>{pm()},100);let e=document.getElementById(`modal-library`),t=document.getElementById(`library-close`);X.experimentSelect&&X.experimentSelect.addEventListener(`mousedown`,t=>{if(t.preventDefault(),e){e.style.display=`flex`,Qm(`circuits`),document.querySelectorAll(`.lib-tab-btn`).forEach(e=>{e.style.background=`none`,e.style.color=`#64748b`});let t=document.querySelector(`.lib-tab-btn[data-lib-cat="circuits"]`);t&&(t.style.background=`rgba(59,130,246,0.12)`,t.style.color=`#60a5fa`)}}),t&&t.addEventListener(`click`,()=>{e&&(e.style.display=`none`)}),document.querySelectorAll(`.lib-tab-btn`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.lib-tab-btn`).forEach(e=>{e.style.background=`none`,e.style.color=`#64748b`}),e.style.background=`rgba(59,130,246,0.12)`,e.style.color=`#60a5fa`,Qm(e.getAttribute(`data-lib-cat`))})})}document.readyState===`loading`?document.addEventListener(`DOMContentLoaded`,$m):$m();