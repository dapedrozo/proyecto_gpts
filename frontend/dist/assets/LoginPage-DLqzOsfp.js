import{u as m,a as p,b as x,c as h,r as g,e as n,j as e,l as f,p as b,d as j}from"./index-C9oNp6T_.js";import{u as w}from"./index.esm-BbAqp6T4.js";function v(){const{register:i,handleSubmit:c,formState:{errors:o}}=w(),s=m(),{errors:a}=p(t=>t.auth),l=x(),[d]=h(),u=async t=>{try{const r=await d(t).unwrap();s(f(r)),b("token",r),l(`/${j.DASHBOARD}`,{replace:!0})}catch(r){s(n({error:r.data}))}};return g.useEffect(()=>{if(a.length>0){const t=setTimeout(()=>{s(n({error:[]}))},1300);return()=>clearTimeout(t)}},[s,a]),e.jsx("div",{className:"flex h-[calc(100vh-100px)] items-center justify-center",children:e.jsxs("div",{className:"bg-zinc-800 max-w-md w-full p-10 rounded-md",children:[a.map((t,r)=>e.jsx("div",{className:"bg-red-500 p-2 text-white text-center my-2",children:t},r)),e.jsx("h1",{className:"text-2xl font-bold",children:"Login"}),e.jsxs("form",{onSubmit:c(u),children:[e.jsx("input",{type:"email",...i("email",{required:!0}),className:"w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2",placeholder:"Email"}),o.email&&e.jsx("p",{className:"text-red-500",children:"El email es requerido"}),e.jsx("input",{type:"password",...i("password",{required:!0}),className:"w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2",placeholder:"Contraseña"}),o.password&&e.jsx("p",{className:"text-red-500",children:"La contraseña es requerida"}),e.jsx("button",{className:"bg-zinc-900 hover:bg-zinc-500 text-white px-4 py-2 rounded-md",type:"submit",children:"Login"})]})]})})}export{v as default};