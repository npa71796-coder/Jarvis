const $=id=>document.getElementById(id);
let tasks=JSON.parse(localStorage.getItem("jarvis_tasks")||"[]");
let earnings=Number(localStorage.getItem("jarvis_earnings")||0);
let commands=JSON.parse(localStorage.getItem("jarvis_commands")||"[]");
function render(){ $("tasks").innerHTML="";tasks.forEach((t,i)=>{const li=document.createElement("li");li.textContent=(t.done?"✓ ":"• ")+t.text+" ";const b=document.createElement("button");b.textContent=t.done?"واپس":"مکمل";b.className="secondary";b.onclick=()=>{tasks[i].done=!tasks[i].done;persist()};const d=document.createElement("button");d.textContent="×";d.className="secondary";d.onclick=()=>{tasks.splice(i,1);persist()};li.append(b,d);$("tasks").append(li)});$("count").textContent=tasks.length+" کام";$("total").textContent="PKR "+earnings.toLocaleString("en-PK");}
function persist(){localStorage.setItem("jarvis_tasks",JSON.stringify(tasks));render()}
$("taskForm").onsubmit=e=>{e.preventDefault();tasks.push({text:$("taskInput").value.trim(),done:false});$("taskInput").value="";persist()};
$("earningForm").onsubmit=e=>{e.preventDefault();earnings+=Number($("earningInput").value);localStorage.setItem("jarvis_earnings",earnings);$("earningInput").value="";render()};
$("saveCommand").onclick=()=>{const v=$("command").value.trim();if(!v)return;commands.push({text:v,at:new Date().toLocaleString()});localStorage.setItem("jarvis_commands",JSON.stringify(commands));$("command").value="";$("voiceHint").textContent="حکم اس ڈیوائس پر محفوظ ہوگیا۔ ابھی خودکار عمل درآمد فعال نہیں ہے۔"};
$("voice").onclick=()=>{const SR=window.SpeechRecognition||window.webkitSpeechRecognition;if(!SR){$("voiceHint").textContent="اس براؤزر میں آواز کی شناخت دستیاب نہیں۔";return}const r=new SR();r.lang="ur-PK";r.onresult=e=>$("command").value=e.results[0][0].transcript;r.onerror=()=> $("voiceHint").textContent="آواز شناخت نہ ہو سکی؛ اجازت اور مائیک چیک کریں۔";r.start()};
if("serviceWorker" in navigator)navigator.serviceWorker.register("./sw.js").catch(()=>{});
render();