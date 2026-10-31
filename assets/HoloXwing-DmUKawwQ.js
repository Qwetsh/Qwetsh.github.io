import{r as T,W as _,S as k,P as D,d as V,e as H,D as Y,A as j,G as q,f as O,B as I,V as G,L as J,E as K,g as Q,j as U}from"./index-Cpv2-tPq.js";const Z=`
varying vec3 vN; varying vec3 vV; varying vec3 vW;
void main(){
  vec4 wp = modelMatrix * vec4(position,1.0);
  vW = wp.xyz;
  vN = normalize(mat3(modelMatrix) * normal);
  vV = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,$=`
uniform float uTime; uniform vec3 uCore; uniform vec3 uRim;
varying vec3 vN; varying vec3 vV; varying vec3 vW;
void main(){
  float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0);
  float scan = 0.5 + 0.5 * sin(vW.y * 90.0 - uTime * 2.2);
  float band = smoothstep(0.0, 0.05, abs(fract(vW.y * 3.0 - uTime * 0.25) - 0.5));
  vec3 col = mix(uCore, uRim, f);
  float a = 0.10 + f * 0.85 + scan * 0.05;
  a *= 0.55 + 0.45 * band;
  gl_FragColor = vec4(col, a);
}`;function te({src:f,core:w="#F5A83C",rim:h="#FFE6BC",onReady:l}){const x=T.useRef(null);return T.useEffect(()=>{const t=x.current;if(!t)return;let g=0,y=!1;const o=new _({antialias:!0,alpha:!0});o.setPixelRatio(Math.min(window.devicePixelRatio,2)),o.domElement.style.cssText="display:block;width:100%;height:100%",t.appendChild(o.domElement);const E=new k,a=new D(32,1,.05,100);a.position.set(2.5,1.25,3.4),a.lookAt(0,0,0);const B=new V(w),L=new V(h),m=new H({vertexShader:Z,fragmentShader:$,uniforms:{uTime:{value:0},uCore:{value:B},uRim:{value:L}},transparent:!0,blending:j,depthWrite:!1,side:Y}),s=new q;E.add(s),new O().load(f,e=>{if(y)return;const n=e.scene,P=new I().setFromObject(n),p=P.getSize(new G),X=P.getCenter(new G),R=2/Math.max(p.x,p.y,p.z);n.traverse(c=>{c.isMesh&&(c.material=m,c.add(new J(new K(c.geometry,24),new Q({color:L,transparent:!0,opacity:.28,blending:j,depthWrite:!1}))))}),n.scale.setScalar(R),n.position.copy(X).multiplyScalar(-R),s.add(n),l==null||l()});let M=0,b=0,v=!1;const C=()=>{const e=Math.round(t.clientWidth)||600,n=Math.round(t.clientHeight)||400;e===M&&n===b||(M=e,b=n,o.setSize(e,n,!1),a.aspect=e/n,a.updateProjectionMatrix())};C();const z=new ResizeObserver(()=>{v||(v=!0,requestAnimationFrame(()=>{v=!1,C()}))});z.observe(t);let r=null,d=.4,u=.12,S=!0;const W=e=>{r={x:e.clientX,y:e.clientY},S=!1,t.setPointerCapture(e.pointerId)},F=e=>{r&&(d+=(e.clientX-r.x)*.008,u=Math.max(-.7,Math.min(.7,u+(e.clientY-r.y)*.005)),r={x:e.clientX,y:e.clientY})},i=()=>{r=null};t.addEventListener("pointerdown",W),t.addEventListener("pointermove",F),t.addEventListener("pointerup",i),t.addEventListener("pointercancel",i),t.addEventListener("pointerleave",i);const N=performance.now(),A=()=>{g=requestAnimationFrame(A);const e=(performance.now()-N)/1e3;m.uniforms.uTime.value=e,S&&(d=.4+e*.22),s.rotation.y=d,s.rotation.x=u,s.position.y=Math.sin(e*.9)*.04,o.render(E,a)};return A(),()=>{y=!0,cancelAnimationFrame(g),z.disconnect(),t.removeEventListener("pointerdown",W),t.removeEventListener("pointermove",F),t.removeEventListener("pointerup",i),t.removeEventListener("pointercancel",i),t.removeEventListener("pointerleave",i),m.dispose(),o.dispose(),o.domElement.remove()}},[f,w,h]),U.jsx("div",{className:"ps-holo__gl",ref:x})}export{te as default};
