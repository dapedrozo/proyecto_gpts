import{R as N}from"./index-C9oNp6T_.js";var oe=e=>e.type==="checkbox",se=e=>e instanceof Date,L=e=>e==null;const Ye=e=>typeof e=="object";var E=e=>!L(e)&&!Array.isArray(e)&&Ye(e)&&!se(e),yr=e=>E(e)&&e.target?oe(e.target)?e.target.checked:e.target.value:e,gr=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,hr=(e,s)=>e.has(gr(s)),vr=e=>{const s=e.constructor&&e.constructor.prototype;return E(s)&&s.hasOwnProperty("isPrototypeOf")},Te=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function M(e){let s;const t=Array.isArray(e);if(e instanceof Date)s=new Date(e);else if(e instanceof Set)s=new Set(e);else if(!(Te&&(e instanceof Blob||e instanceof FileList))&&(t||E(e)))if(s=t?[]:{},!t&&!vr(e))s=e;else for(const n in e)e.hasOwnProperty(n)&&(s[n]=M(e[n]));else return e;return s}var fe=e=>Array.isArray(e)?e.filter(Boolean):[],x=e=>e===void 0,d=(e,s,t)=>{if(!s||!E(e))return t;const n=fe(s.split(/[,[\].]+?/)).reduce((a,l)=>L(a)?a:a[l],e);return x(n)||n===e?x(e[s])?t:e[s]:n},K=e=>typeof e=="boolean";const He={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},P={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},j={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};N.createContext(null);var _r=(e,s,t,n=!0)=>{const a={defaultValues:s._defaultValues};for(const l in e)Object.defineProperty(a,l,{get:()=>{const g=l;return s._proxyFormState[g]!==P.all&&(s._proxyFormState[g]=!n||P.all),t&&(t[g]=!0),e[g]}});return a},p=e=>E(e)&&!Object.keys(e).length,br=(e,s,t,n)=>{t(e);const{name:a,...l}=e;return p(l)||Object.keys(l).length>=Object.keys(s).length||Object.keys(l).find(g=>s[g]===(!n||P.all))},ke=e=>Array.isArray(e)?e:[e];function Vr(e){const s=N.useRef(e);s.current=e,N.useEffect(()=>{const t=!e.disabled&&s.current.subject&&s.current.subject.subscribe({next:s.current.next});return()=>{t&&t.unsubscribe()}},[e.disabled])}var W=e=>typeof e=="string",Ar=(e,s,t,n,a)=>W(e)?(n&&s.watch.add(e),d(t,e,a)):Array.isArray(e)?e.map(l=>(n&&s.watch.add(l),d(t,l))):(n&&(s.watchAll=!0),t),Le=e=>/^\w*$/.test(e),Ze=e=>fe(e.replace(/["|']|\]/g,"").split(/\.|\[/)),F=(e,s,t)=>{let n=-1;const a=Le(s)?[s]:Ze(s),l=a.length,g=l-1;for(;++n<l;){const h=a[n];let B=t;if(n!==g){const q=e[h];B=E(q)||Array.isArray(q)?q:isNaN(+a[n+1])?{}:[]}e[h]=B,e=e[h]}return e},Fr=(e,s,t,n,a)=>s?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[n]:a||!0}}:{},$e=e=>({isOnSubmit:!e||e===P.onSubmit,isOnBlur:e===P.onBlur,isOnChange:e===P.onChange,isOnAll:e===P.all,isOnTouch:e===P.onTouched}),je=(e,s,t)=>!t&&(s.watchAll||s.watch.has(e)||[...s.watch].some(n=>e.startsWith(n)&&/^\.\w+/.test(e.slice(n.length))));const ae=(e,s,t,n)=>{for(const a of t||Object.keys(e)){const l=d(e,a);if(l){const{_f:g,...h}=l;if(g){if(g.refs&&g.refs[0]&&s(g.refs[0],a)&&!n)break;if(g.ref&&s(g.ref,g.name)&&!n)break;ae(h,s)}else E(h)&&ae(h,s)}}};var xr=(e,s,t)=>{const n=fe(d(e,t));return F(n,"root",s[t]),F(e,t,n),e},Oe=e=>e.type==="file",Q=e=>typeof e=="function",ve=e=>{if(!Te)return!1;const s=e?e.ownerDocument:0;return e instanceof(s&&s.defaultView?s.defaultView.HTMLElement:HTMLElement)},he=e=>W(e),Re=e=>e.type==="radio",_e=e=>e instanceof RegExp;const Ke={value:!1,isValid:!1},ze={value:!0,isValid:!0};var er=e=>{if(Array.isArray(e)){if(e.length>1){const s=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:s,isValid:!!s.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!x(e[0].attributes.value)?x(e[0].value)||e[0].value===""?ze:{value:e[0].value,isValid:!0}:ze:Ke}return Ke};const Ge={isValid:!1,value:null};var rr=e=>Array.isArray(e)?e.reduce((s,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:s,Ge):Ge;function Je(e,s,t="validate"){if(he(e)||Array.isArray(e)&&e.every(he)||K(e)&&!e)return{type:t,message:he(e)?e:"",ref:s}}var te=e=>E(e)&&!_e(e)?e:{value:e,message:""},Qe=async(e,s,t,n,a)=>{const{ref:l,refs:g,required:h,maxLength:B,minLength:q,min:w,max:_,pattern:ce,validate:z,name:O,valueAsNumber:Ae,mount:G,disabled:J}=e._f,b=d(s,O);if(!G||J)return{};const H=g?g[0]:l,$=v=>{n&&H.reportValidity&&(H.setCustomValidity(K(v)?"":v||""),H.reportValidity())},D={},Z=Re(l),de=oe(l),X=Z||de,ee=(Ae||Oe(l))&&x(l.value)&&x(b)||ve(l)&&l.value===""||b===""||Array.isArray(b)&&!b.length,C=Fr.bind(null,O,t,D),ye=(v,V,k,T=j.maxLength,I=j.minLength)=>{const U=v?V:k;D[O]={type:v?T:I,message:U,ref:l,...C(v?T:I,U)}};if(a?!Array.isArray(b)||!b.length:h&&(!X&&(ee||L(b))||K(b)&&!b||de&&!er(g).isValid||Z&&!rr(g).isValid)){const{value:v,message:V}=he(h)?{value:!!h,message:h}:te(h);if(v&&(D[O]={type:j.required,message:V,ref:H,...C(j.required,V)},!t))return $(V),D}if(!ee&&(!L(w)||!L(_))){let v,V;const k=te(_),T=te(w);if(!L(b)&&!isNaN(b)){const I=l.valueAsNumber||b&&+b;L(k.value)||(v=I>k.value),L(T.value)||(V=I<T.value)}else{const I=l.valueAsDate||new Date(b),U=le=>new Date(new Date().toDateString()+" "+le),ie=l.type=="time",ue=l.type=="week";W(k.value)&&b&&(v=ie?U(b)>U(k.value):ue?b>k.value:I>new Date(k.value)),W(T.value)&&b&&(V=ie?U(b)<U(T.value):ue?b<T.value:I<new Date(T.value))}if((v||V)&&(ye(!!v,k.message,T.message,j.max,j.min),!t))return $(D[O].message),D}if((B||q)&&!ee&&(W(b)||a&&Array.isArray(b))){const v=te(B),V=te(q),k=!L(v.value)&&b.length>+v.value,T=!L(V.value)&&b.length<+V.value;if((k||T)&&(ye(k,v.message,V.message),!t))return $(D[O].message),D}if(ce&&!ee&&W(b)){const{value:v,message:V}=te(ce);if(_e(v)&&!b.match(v)&&(D[O]={type:j.pattern,message:V,ref:l,...C(j.pattern,V)},!t))return $(V),D}if(z){if(Q(z)){const v=await z(b,s),V=Je(v,H);if(V&&(D[O]={...V,...C(j.validate,V.message)},!t))return $(V.message),D}else if(E(z)){let v={};for(const V in z){if(!p(v)&&!t)break;const k=Je(await z[V](b,s),H,V);k&&(v={...k,...C(V,k.message)},$(k.message),t&&(D[O]=v))}if(!p(v)&&(D[O]={ref:H,...v},!t))return D}}return $(!0),D};function wr(e,s){const t=s.slice(0,-1).length;let n=0;for(;n<t;)e=x(e)?n++:e[s[n++]];return e}function Dr(e){for(const s in e)if(e.hasOwnProperty(s)&&!x(e[s]))return!1;return!0}function m(e,s){const t=Array.isArray(s)?s:Le(s)?[s]:Ze(s),n=t.length===1?e:wr(e,t),a=t.length-1,l=t[a];return n&&delete n[l],a!==0&&(E(n)&&p(n)||Array.isArray(n)&&Dr(n))&&m(e,t.slice(0,-1)),e}var Ee=()=>{let e=[];return{get observers(){return e},next:a=>{for(const l of e)l.next&&l.next(a)},subscribe:a=>(e.push(a),{unsubscribe:()=>{e=e.filter(l=>l!==a)}}),unsubscribe:()=>{e=[]}}},be=e=>L(e)||!Ye(e);function Y(e,s){if(be(e)||be(s))return e===s;if(se(e)&&se(s))return e.getTime()===s.getTime();const t=Object.keys(e),n=Object.keys(s);if(t.length!==n.length)return!1;for(const a of t){const l=e[a];if(!n.includes(a))return!1;if(a!=="ref"){const g=s[a];if(se(l)&&se(g)||E(l)&&E(g)||Array.isArray(l)&&Array.isArray(g)?!Y(l,g):l!==g)return!1}}return!0}var tr=e=>e.type==="select-multiple",kr=e=>Re(e)||oe(e),Se=e=>ve(e)&&e.isConnected,sr=e=>{for(const s in e)if(Q(e[s]))return!0;return!1};function Ve(e,s={}){const t=Array.isArray(e);if(E(e)||t)for(const n in e)Array.isArray(e[n])||E(e[n])&&!sr(e[n])?(s[n]=Array.isArray(e[n])?[]:{},Ve(e[n],s[n])):L(e[n])||(s[n]=!0);return s}function ir(e,s,t){const n=Array.isArray(e);if(E(e)||n)for(const a in e)Array.isArray(e[a])||E(e[a])&&!sr(e[a])?x(s)||be(t[a])?t[a]=Array.isArray(e[a])?Ve(e[a],[]):{...Ve(e[a])}:ir(e[a],L(s)?{}:s[a],t[a]):t[a]=!Y(e[a],s[a]);return t}var ge=(e,s)=>ir(e,s,Ve(s)),ur=(e,{valueAsNumber:s,valueAsDate:t,setValueAs:n})=>x(e)?e:s?e===""?NaN:e&&+e:t&&W(e)?new Date(e):n?n(e):e;function me(e){const s=e.ref;if(!(e.refs?e.refs.every(t=>t.disabled):s.disabled))return Oe(s)?s.files:Re(s)?rr(e.refs).value:tr(s)?[...s.selectedOptions].map(({value:t})=>t):oe(s)?er(e.refs).value:ur(x(s.value)?e.ref.value:s.value,e)}var Er=(e,s,t,n)=>{const a={};for(const l of e){const g=d(s,l);g&&F(a,l,g._f)}return{criteriaMode:t,names:[...e],fields:a,shouldUseNativeValidation:n}},ne=e=>x(e)?e:_e(e)?e.source:E(e)?_e(e.value)?e.value.source:e.value:e,Sr=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function Xe(e,s,t){const n=d(e,t);if(n||Le(t))return{error:n,name:t};const a=t.split(".");for(;a.length;){const l=a.join("."),g=d(s,l),h=d(e,l);if(g&&!Array.isArray(g)&&t!==l)return{name:t};if(h&&h.type)return{name:l,error:h};a.pop()}return{name:t}}var mr=(e,s,t,n,a)=>a.isOnAll?!1:!t&&a.isOnTouch?!(s||e):(t?n.isOnBlur:a.isOnBlur)?!e:(t?n.isOnChange:a.isOnChange)?e:!0,Tr=(e,s)=>!fe(d(e,s)).length&&m(e,s);const Lr={mode:P.onSubmit,reValidateMode:P.onChange,shouldFocusError:!0};function Or(e={}){let s={...Lr,...e},t={submitCount:0,isDirty:!1,isLoading:Q(s.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:s.errors||{},disabled:s.disabled||!1},n={},a=E(s.defaultValues)||E(s.values)?M(s.defaultValues||s.values)||{}:{},l=s.shouldUnregister?{}:M(a),g={action:!1,mount:!1,watch:!1},h={mount:new Set,unMount:new Set,array:new Set,watch:new Set},B,q=0;const w={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},_={values:Ee(),array:Ee(),state:Ee()},ce=$e(s.mode),z=$e(s.reValidateMode),O=s.criteriaMode===P.all,Ae=r=>i=>{clearTimeout(q),q=setTimeout(r,i)},G=async r=>{if(w.isValid||r){const i=s.resolver?p((await X()).errors):await C(n,!0);i!==t.isValid&&_.state.next({isValid:i})}},J=(r,i)=>{(w.isValidating||w.validatingFields)&&((r||Array.from(h.mount)).forEach(u=>u&&F(t.validatingFields,u,!!i)),t.isValidating=Object.values(t.validatingFields).some(u=>u),_.state.next({validatingFields:t.validatingFields,isValidating:t.isValidating}))},b=(r,i=[],u,c,f=!0,o=!0)=>{if(c&&u){if(g.action=!0,o&&Array.isArray(d(n,r))){const y=u(d(n,r),c.argA,c.argB);f&&F(n,r,y)}if(o&&Array.isArray(d(t.errors,r))){const y=u(d(t.errors,r),c.argA,c.argB);f&&F(t.errors,r,y),Tr(t.errors,r)}if(w.touchedFields&&o&&Array.isArray(d(t.touchedFields,r))){const y=u(d(t.touchedFields,r),c.argA,c.argB);f&&F(t.touchedFields,r,y)}w.dirtyFields&&(t.dirtyFields=ge(a,l)),_.state.next({name:r,isDirty:v(r,i),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else F(l,r,i)},H=(r,i)=>{F(t.errors,r,i),_.state.next({errors:t.errors})},$=r=>{t.errors=r,_.state.next({errors:t.errors,isValid:!1})},D=(r,i,u,c)=>{const f=d(n,r);if(f){const o=d(l,r,x(u)?d(a,r):u);x(o)||c&&c.defaultChecked||i?F(l,r,i?o:me(f._f)):T(r,o),g.mount&&G()}},Z=(r,i,u,c,f)=>{let o=!1,y=!1;const A={name:r},S=!!(d(n,r)&&d(n,r)._f.disabled);if(!u||c){w.isDirty&&(y=t.isDirty,t.isDirty=A.isDirty=v(),o=y!==A.isDirty);const R=S||Y(d(a,r),i);y=!!(!S&&d(t.dirtyFields,r)),R||S?m(t.dirtyFields,r):F(t.dirtyFields,r,!0),A.dirtyFields=t.dirtyFields,o=o||w.dirtyFields&&y!==!R}if(u){const R=d(t.touchedFields,r);R||(F(t.touchedFields,r,u),A.touchedFields=t.touchedFields,o=o||w.touchedFields&&R!==u)}return o&&f&&_.state.next(A),o?A:{}},de=(r,i,u,c)=>{const f=d(t.errors,r),o=w.isValid&&K(i)&&t.isValid!==i;if(e.delayError&&u?(B=Ae(()=>H(r,u)),B(e.delayError)):(clearTimeout(q),B=null,u?F(t.errors,r,u):m(t.errors,r)),(u?!Y(f,u):f)||!p(c)||o){const y={...c,...o&&K(i)?{isValid:i}:{},errors:t.errors,name:r};t={...t,...y},_.state.next(y)}},X=async r=>{J(r,!0);const i=await s.resolver(l,s.context,Er(r||h.mount,n,s.criteriaMode,s.shouldUseNativeValidation));return J(r),i},ee=async r=>{const{errors:i}=await X(r);if(r)for(const u of r){const c=d(i,u);c?F(t.errors,u,c):m(t.errors,u)}else t.errors=i;return i},C=async(r,i,u={valid:!0})=>{for(const c in r){const f=r[c];if(f){const{_f:o,...y}=f;if(o){const A=h.array.has(o.name);J([c],!0);const S=await Qe(f,l,O,s.shouldUseNativeValidation&&!i,A);if(J([c]),S[o.name]&&(u.valid=!1,i))break;!i&&(d(S,o.name)?A?xr(t.errors,S,o.name):F(t.errors,o.name,S[o.name]):m(t.errors,o.name))}y&&await C(y,i,u)}}return u.valid},ye=()=>{for(const r of h.unMount){const i=d(n,r);i&&(i._f.refs?i._f.refs.every(u=>!Se(u)):!Se(i._f.ref))&&Fe(r)}h.unMount=new Set},v=(r,i)=>(r&&i&&F(l,r,i),!Y(Ce(),a)),V=(r,i,u)=>Ar(r,h,{...g.mount?l:x(i)?a:W(r)?{[r]:i}:i},u,i),k=r=>fe(d(g.mount?l:a,r,e.shouldUnregister?d(a,r,[]):[])),T=(r,i,u={})=>{const c=d(n,r);let f=i;if(c){const o=c._f;o&&(!o.disabled&&F(l,r,ur(i,o)),f=ve(o.ref)&&L(i)?"":i,tr(o.ref)?[...o.ref.options].forEach(y=>y.selected=f.includes(y.value)):o.refs?oe(o.ref)?o.refs.length>1?o.refs.forEach(y=>(!y.defaultChecked||!y.disabled)&&(y.checked=Array.isArray(f)?!!f.find(A=>A===y.value):f===y.value)):o.refs[0]&&(o.refs[0].checked=!!f):o.refs.forEach(y=>y.checked=y.value===f):Oe(o.ref)?o.ref.value="":(o.ref.value=f,o.ref.type||_.values.next({name:r,values:{...l}})))}(u.shouldDirty||u.shouldTouch)&&Z(r,f,u.shouldTouch,u.shouldDirty,!0),u.shouldValidate&&le(r)},I=(r,i,u)=>{for(const c in i){const f=i[c],o=`${r}.${c}`,y=d(n,o);(h.array.has(r)||!be(f)||y&&!y._f)&&!se(f)?I(o,f,u):T(o,f,u)}},U=(r,i,u={})=>{const c=d(n,r),f=h.array.has(r),o=M(i);F(l,r,o),f?(_.array.next({name:r,values:{...l}}),(w.isDirty||w.dirtyFields)&&u.shouldDirty&&_.state.next({name:r,dirtyFields:ge(a,l),isDirty:v(r,o)})):c&&!c._f&&!L(o)?I(r,o,u):T(r,o,u),je(r,h)&&_.state.next({...t}),_.values.next({name:g.mount?r:void 0,values:{...l}})},ie=async r=>{const i=r.target;let u=i.name,c=!0;const f=d(n,u),o=()=>i.type?me(f._f):yr(r),y=A=>{c=Number.isNaN(A)||A===d(l,u,A)};if(f){let A,S;const R=o(),re=r.type===He.BLUR||r.type===He.FOCUS_OUT,fr=!Sr(f._f)&&!s.resolver&&!d(t.errors,u)&&!f._f.deps||mr(re,d(t.touchedFields,u),t.isSubmitted,z,ce),we=je(u,h,re);F(l,u,R),re?(f._f.onBlur&&f._f.onBlur(r),B&&B(0)):f._f.onChange&&f._f.onChange(r);const De=Z(u,R,re,!1),cr=!p(De)||we;if(!re&&_.values.next({name:u,type:r.type,values:{...l}}),fr)return w.isValid&&G(),cr&&_.state.next({name:u,...we?{}:De});if(!re&&we&&_.state.next({...t}),s.resolver){const{errors:qe}=await X([u]);if(y(R),c){const dr=Xe(t.errors,n,u),We=Xe(qe,n,dr.name||u);A=We.error,u=We.name,S=p(qe)}}else J([u],!0),A=(await Qe(f,l,O,s.shouldUseNativeValidation))[u],J([u]),y(R),c&&(A?S=!1:w.isValid&&(S=await C(n,!0)));c&&(f._f.deps&&le(f._f.deps),de(u,S,A,De))}},ue=(r,i)=>{if(d(t.errors,i)&&r.focus)return r.focus(),1},le=async(r,i={})=>{let u,c;const f=ke(r);if(s.resolver){const o=await ee(x(r)?r:f);u=p(o),c=r?!f.some(y=>d(o,y)):u}else r?(c=(await Promise.all(f.map(async o=>{const y=d(n,o);return await C(y&&y._f?{[o]:y}:y)}))).every(Boolean),!(!c&&!t.isValid)&&G()):c=u=await C(n);return _.state.next({...!W(r)||w.isValid&&u!==t.isValid?{}:{name:r},...s.resolver||!r?{isValid:u}:{},errors:t.errors}),i.shouldFocus&&!c&&ae(n,ue,r?f:h.mount),c},Ce=r=>{const i={...a,...g.mount?l:{}};return x(r)?i:W(r)?d(i,r):r.map(u=>d(i,u))},Ue=(r,i)=>({invalid:!!d((i||t).errors,r),isDirty:!!d((i||t).dirtyFields,r),isTouched:!!d((i||t).touchedFields,r),isValidating:!!d((i||t).validatingFields,r),error:d((i||t).errors,r)}),lr=r=>{r&&ke(r).forEach(i=>m(t.errors,i)),_.state.next({errors:r?t.errors:{}})},Me=(r,i,u)=>{const c=(d(n,r,{_f:{}})._f||{}).ref;F(t.errors,r,{...i,ref:c}),_.state.next({name:r,errors:t.errors,isValid:!1}),u&&u.shouldFocus&&c&&c.focus&&c.focus()},nr=(r,i)=>Q(r)?_.values.subscribe({next:u=>r(V(void 0,i),u)}):V(r,i,!0),Fe=(r,i={})=>{for(const u of r?ke(r):h.mount)h.mount.delete(u),h.array.delete(u),i.keepValue||(m(n,u),m(l,u)),!i.keepError&&m(t.errors,u),!i.keepDirty&&m(t.dirtyFields,u),!i.keepTouched&&m(t.touchedFields,u),!i.keepIsValidating&&m(t.validatingFields,u),!s.shouldUnregister&&!i.keepDefaultValue&&m(a,u);_.values.next({values:{...l}}),_.state.next({...t,...i.keepDirty?{isDirty:v()}:{}}),!i.keepIsValid&&G()},Ne=({disabled:r,name:i,field:u,fields:c,value:f})=>{if(K(r)){const o=r?void 0:x(f)?me(u?u._f:d(c,i)._f):f;F(l,i,o),Z(i,o,!1,!1,!0)}},xe=(r,i={})=>{let u=d(n,r);const c=K(i.disabled);return F(n,r,{...u||{},_f:{...u&&u._f?u._f:{ref:{name:r}},name:r,mount:!0,...i}}),h.mount.add(r),u?Ne({field:u,disabled:i.disabled,name:r,value:i.value}):D(r,!0,i.value),{...c?{disabled:i.disabled}:{},...s.progressive?{required:!!i.required,min:ne(i.min),max:ne(i.max),minLength:ne(i.minLength),maxLength:ne(i.maxLength),pattern:ne(i.pattern)}:{},name:r,onChange:ie,onBlur:ie,ref:f=>{if(f){xe(r,i),u=d(n,r);const o=x(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,y=kr(o),A=u._f.refs||[];if(y?A.find(S=>S===o):o===u._f.ref)return;F(n,r,{_f:{...u._f,...y?{refs:[...A.filter(Se),o,...Array.isArray(d(a,r))?[{}]:[]],ref:{type:o.type,name:r}}:{ref:o}}}),D(r,!1,void 0,o)}else u=d(n,r,{}),u._f&&(u._f.mount=!1),(s.shouldUnregister||i.shouldUnregister)&&!(hr(h.array,r)&&g.action)&&h.unMount.add(r)}}},pe=()=>s.shouldFocusError&&ae(n,ue,h.mount),ar=r=>{K(r)&&(_.state.next({disabled:r}),ae(n,(i,u)=>{let c=r;const f=d(n,u);f&&K(f._f.disabled)&&(c||(c=f._f.disabled)),i.disabled=c},0,!1))},Be=(r,i)=>async u=>{let c;u&&(u.preventDefault&&u.preventDefault(),u.persist&&u.persist());let f=M(l);if(_.state.next({isSubmitting:!0}),s.resolver){const{errors:o,values:y}=await X();t.errors=o,f=y}else await C(n);if(m(t.errors,"root"),p(t.errors)){_.state.next({errors:{}});try{await r(f,u)}catch(o){c=o}}else i&&await i({...t.errors},u),pe(),setTimeout(pe);if(_.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:p(t.errors)&&!c,submitCount:t.submitCount+1,errors:t.errors}),c)throw c},or=(r,i={})=>{d(n,r)&&(x(i.defaultValue)?U(r,M(d(a,r))):(U(r,i.defaultValue),F(a,r,M(i.defaultValue))),i.keepTouched||m(t.touchedFields,r),i.keepDirty||(m(t.dirtyFields,r),t.isDirty=i.defaultValue?v(r,M(d(a,r))):v()),i.keepError||(m(t.errors,r),w.isValid&&G()),_.state.next({...t}))},Ie=(r,i={})=>{const u=r?M(r):a,c=M(u),f=p(r),o=f?a:c;if(i.keepDefaultValues||(a=u),!i.keepValues){if(i.keepDirtyValues)for(const y of h.mount)d(t.dirtyFields,y)?F(o,y,d(l,y)):U(y,d(o,y));else{if(Te&&x(r))for(const y of h.mount){const A=d(n,y);if(A&&A._f){const S=Array.isArray(A._f.refs)?A._f.refs[0]:A._f.ref;if(ve(S)){const R=S.closest("form");if(R){R.reset();break}}}}n={}}l=e.shouldUnregister?i.keepDefaultValues?M(a):{}:M(o),_.array.next({values:{...o}}),_.values.next({values:{...o}})}h={mount:i.keepDirtyValues?h.mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},g.mount=!w.isValid||!!i.keepIsValid||!!i.keepDirtyValues,g.watch=!!e.shouldUnregister,_.state.next({submitCount:i.keepSubmitCount?t.submitCount:0,isDirty:f?!1:i.keepDirty?t.isDirty:!!(i.keepDefaultValues&&!Y(r,a)),isSubmitted:i.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:f?[]:i.keepDirtyValues?i.keepDefaultValues&&l?ge(a,l):t.dirtyFields:i.keepDefaultValues&&r?ge(a,r):{},touchedFields:i.keepTouched?t.touchedFields:{},errors:i.keepErrors?t.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},Pe=(r,i)=>Ie(Q(r)?r(l):r,i);return{control:{register:xe,unregister:Fe,getFieldState:Ue,handleSubmit:Be,setError:Me,_executeSchema:X,_getWatch:V,_getDirty:v,_updateValid:G,_removeUnmounted:ye,_updateFieldArray:b,_updateDisabledField:Ne,_getFieldArray:k,_reset:Ie,_resetDefaultValues:()=>Q(s.defaultValues)&&s.defaultValues().then(r=>{Pe(r,s.resetOptions),_.state.next({isLoading:!1})}),_updateFormState:r=>{t={...t,...r}},_disableForm:ar,_subjects:_,_proxyFormState:w,_setErrors:$,get _fields(){return n},get _formValues(){return l},get _state(){return g},set _state(r){g=r},get _defaultValues(){return a},get _names(){return h},set _names(r){h=r},get _formState(){return t},set _formState(r){t=r},get _options(){return s},set _options(r){s={...s,...r}}},trigger:le,register:xe,handleSubmit:Be,watch:nr,setValue:U,getValues:Ce,reset:Pe,resetField:or,clearErrors:lr,unregister:Fe,setError:Me,setFocus:(r,i={})=>{const u=d(n,r),c=u&&u._f;if(c){const f=c.refs?c.refs[0]:c.ref;f.focus&&(f.focus(),i.shouldSelect&&f.select())}},getFieldState:Ue}}function Nr(e={}){const s=N.useRef(),t=N.useRef(),[n,a]=N.useState({isDirty:!1,isValidating:!1,isLoading:Q(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:Q(e.defaultValues)?void 0:e.defaultValues});s.current||(s.current={...Or(e),formState:n});const l=s.current.control;return l._options=e,Vr({subject:l._subjects.state,next:g=>{br(g,l._proxyFormState,l._updateFormState,!0)&&a({...l._formState})}}),N.useEffect(()=>l._disableForm(e.disabled),[l,e.disabled]),N.useEffect(()=>{if(l._proxyFormState.isDirty){const g=l._getDirty();g!==n.isDirty&&l._subjects.state.next({isDirty:g})}},[l,n.isDirty]),N.useEffect(()=>{e.values&&!Y(e.values,t.current)?(l._reset(e.values,l._options.resetOptions),t.current=e.values,a(g=>({...g}))):l._resetDefaultValues()},[e.values,l]),N.useEffect(()=>{e.errors&&l._setErrors(e.errors)},[e.errors,l]),N.useEffect(()=>{l._state.mount||(l._updateValid(),l._state.mount=!0),l._state.watch&&(l._state.watch=!1,l._subjects.state.next({...l._formState})),l._removeUnmounted()}),N.useEffect(()=>{e.shouldUnregister&&l._subjects.values.next({values:l._getWatch()})},[e.shouldUnregister,l]),s.current.formState=_r(n,l),s.current}export{Nr as u};