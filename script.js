var WHATSAPP="60123456789"; // change to your number: country code + number, no + or spaces
var P=[
{id:1,n:"MIG welder 200A, gas and gasless",c:"Machines",p:1299,s:412,e:"⚡"},
{id:2,n:"Inverter ARC welder 250A",c:"Machines",p:489,s:980,e:"🔌"},
{id:3,n:"TIG welder 200A AC/DC",c:"Machines",p:1890,s:96,e:"🔥"},
{id:4,n:"Plasma cutter 40A",c:"Machines",p:1150,s:143,e:"✂️"},
{id:5,n:"Auto-darkening welding helmet",c:"Safety",p:129,s:2210,e:"🪖"},
{id:6,n:"Leather welding gloves, long cuff",c:"Safety",p:35,s:3450,e:"🧤"},
{id:7,n:"Leather welding apron",c:"Safety",p:59,s:870,e:"🦺"},
{id:8,n:"Safety goggles, clear lens",c:"Safety",p:12,s:5120,e:"🥽"},
{id:9,n:"Electrode E6013 2.6mm, 5kg box",c:"Consumables",p:48,s:2890,e:"📏"},
{id:10,n:"MIG wire ER70S-6 0.8mm, 15kg",c:"Consumables",p:165,s:530,e:"🧵"},
{id:11,n:"Tungsten rods WT20, 10 pcs",c:"Consumables",p:28,s:760,e:"✏️"},
{id:12,n:"Argon gas regulator with flowmeter",c:"Consumables",p:85,s:640,e:"⏲️"},
{id:13,n:"Angle grinder 4 inch 850W",c:"Tools",p:139,s:1320,e:"⚙️"},
{id:14,n:"Magnetic welding clamp set, 4 pcs",c:"Tools",p:39,s:1010,e:"🧲"},
{id:15,n:"Chipping hammer with wire brush",c:"Tools",p:15,s:2400,e:"🔨"},
{id:16,n:"Steel wire brush, 5 row",c:"Tools",p:9,s:3100,e:"🧹"}];
var cat="All",cart={};
try{cart=JSON.parse(localStorage.getItem("rw_cart")||"{}")||{}}catch(e){cart={}}
var $=function(i){return document.getElementById(i)};
var rm=function(n){return "RM "+n.toLocaleString("en-MY",{minimumFractionDigits:2,maximumFractionDigits:2})};
function cats(){var c=["All"].concat(P.map(function(x){return x.c}).filter(function(v,i,a){return a.indexOf(v)==i}));
 $("cats").innerHTML=c.map(function(x){return '<button class="chip" aria-pressed="'+(x==cat)+'" onclick="cat=\''+x+'\';cats();render()">'+x+'</button>'}).join("")}
function render(){
 var q=$("q").value.trim().toLowerCase(),s=$("sort").value;
 var l=P.filter(function(x){return (cat=="All"||x.c==cat)&&(!q||(x.n+" "+x.c).toLowerCase().indexOf(q)>-1)});
 l.sort(function(a,b){return s=="lo"?a.p-b.p:s=="hi"?b.p-a.p:b.s-a.s});
 $("rc").textContent=l.length+" products";
 $("grid").innerHTML=l.length?l.map(function(x){return '<article class="card"><div class="pic" aria-hidden="true">'+x.e+'</div><div class="info"><div class="name">'+x.n+'</div><div class="price">'+rm(x.p)+'</div><div class="meta">'+x.s.toLocaleString()+' sold</div><button class="add" onclick="add('+x.id+')">Add to cart</button></div></article>'}).join(""):'<div class="empty" style="grid-column:1/-1">No products match. Try another word or pick All.</div>'}
function save(){try{localStorage.setItem("rw_cart",JSON.stringify(cart))}catch(e){}drawCart()}
function add(id){cart[id]=(cart[id]||0)+1;save();toggle(true)}
function chg(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save()}
function toggle(o){document.body.classList.toggle("open",o)}
function drawCart(){
 var ids=Object.keys(cart).filter(function(i){return P.some(function(p){return p.id==i})}),t=0,n=0,msg="Hi Radzi Weld, I would like to order:\n";
 $("items").innerHTML=ids.length?ids.map(function(i){var p=P.filter(function(x){return x.id==i})[0],q=cart[i];t+=p.p*q;n+=q;msg+="- "+p.n+" x"+q+" = "+rm(p.p*q)+"\n";
  return '<div class="row"><div class="e">'+p.e+'</div><div class="t">'+p.n+'<div class="meta">'+rm(p.p)+'</div></div><div class="qty"><button onclick="chg('+i+',-1)" aria-label="Remove one">−</button><span>'+q+'</span><button onclick="chg('+i+',1)" aria-label="Add one">+</button></div></div>'}).join(""):'<div class="empty">Your cart is empty. Add a product to start.</div>';
 $("cnt").textContent=n;$("total").textContent=rm(t);
 msg+="Total: "+rm(t)+"\nName: "+($("nm").value||"-")+"\nAddress: "+($("ad").value||"-");
 var b=$("buy");b.setAttribute("aria-disabled",ids.length?"false":"true");
 b.href="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(msg)}
$("nm").oninput=$("ad").oninput=drawCart;
$("q").addEventListener("input",render);
document.addEventListener("keydown",function(e){if(e.key=="Escape")toggle(false)});
try{var D=JSON.parse($("data").textContent);if(D&&D.length)P=D}catch(e){}
var W=[];
function admin(o){if(o){W=P.map(function(x){return Object.assign({},x)});drawAdm();$("amsg").textContent=""}$("adm").hidden=!o}
function esc(s){return String(s).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;")}
function drawAdm(){$("arows").innerHTML=W.map(function(x,i){return '<div class="ar"><input class="e" data-i="'+i+'" data-k="e" value="'+esc(x.e)+'" aria-label="Icon"><input class="n" data-i="'+i+'" data-k="n" value="'+esc(x.n)+'" aria-label="Product name"><input class="c" data-i="'+i+'" data-k="c" value="'+esc(x.c)+'" aria-label="Category"><input class="p" type="number" min="0" step="0.01" data-i="'+i+'" data-k="p" value="'+x.p+'" aria-label="Price in RM"><button onclick="W.splice('+i+',1);drawAdm()" aria-label="Delete product">×</button></div>'}).join("")||'<div class="empty">No products. Press Add product.</div>'}
$("arows").oninput=function(e){var t=e.target,k=t.dataset.k;if(k)W[t.dataset.i][k]=k=="p"?(parseFloat(t.value)||0):t.value};
function addRow(){W.unshift({id:Date.now(),n:"New product",c:"Tools",p:0,s:0,e:"📦"});drawAdm()}
async function saveAdm(){
 var b=$("asave"),m=$("amsg");b.disabled=true;m.textContent="Saving…";
 try{
  var a=await claude.use("artifact");if(!a)throw{code:"none"};
  var cl=function(v){return String(v).replace(/[<>"'\\]/g,"").trim()};
  var out=W.filter(function(x){return cl(x.n)}).map(function(x,i){return{id:x.id||i+1,n:cl(x.n),c:cl(x.c)||"Other",p:Math.round((+x.p||0)*100)/100,s:x.s||0,e:cl(x.e)||"📦"}});
  var c=document.documentElement.cloneNode(true);
  c.querySelector("#data").textContent=JSON.stringify(out);
  ["grid","cats","items","arows"].forEach(function(i){c.querySelector("#"+i).innerHTML=""});
  c.querySelector("body").removeAttribute("class");
  c.querySelector("#adm").setAttribute("hidden","");
  c.querySelector("#adminBtn").setAttribute("hidden","");
  c.querySelector("#cnt").textContent="0";c.querySelector("#total").textContent="RM 0.00";
  await a.publish("<!DOCTYPE html>\n"+c.outerHTML);
 }catch(e){b.disabled=false;m.textContent=e&&(e.code=="not_writer"||e.code=="not_granted")?"Only the shop owner can save changes.":(e&&e.code=="conflict")?"":"Could not save. Check your connection and try again."}
}
(async function(){try{var u=await claude.use("user");if(u&&u.canEdit())$("adminBtn").hidden=false}catch(e){}})();
cats();render();drawCart();
