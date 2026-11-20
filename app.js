const $ = id => document.getElementById(id);
const get = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
const put = (key, value) => localStorage.setItem(key, JSON.stringify(value));
let tasks = get("jarvis_tasks", []);
let earnings = get("jarvis_earnings", []);
let endpoint = localStorage.getItem("jarvis_endpoint") || "";
let onlineMode = false;

$("endpoint").value = endpoint;
function status() {
  const ready = navigator.onLine && endpoint;
  $("connection").textContent = ready ? "Internet available • محفوظ AI کنکشن سیٹ ہو سکتا ہے" : "Offline mode • بنیادی کام دستیاب";
  $("modeBtn").textContent = onlineMode ? "Online" : "Offline";
}
function bubble(text, who) {
  const div = document.createElement("div");
  div.className = "bubble " + who;
  div.textContent = text;
  $("chat").appendChild(div);
  $("chat").scrollTop = $("chat").scrollHeight;
}
function offlineReply(message) {
  const m = message.toLowerCase();
  if (m.includes("السلام") || m.includes("salam") || m.includes("hello")) return "وعلیکم السلام! میں آف لائن ہوں۔ آپ اپنے کام اور آمدنی کا ریکارڈ محفوظ کر سکتے ہیں۔";
  if (m.includes("وقت") || m.includes("time")) return "اس ڈیوائس کا وقت: " + new Date().toLocaleString();
  if (m.includes("تاریخ") || m.includes("date")) return "آج کی تاریخ: " + new Date().toLocaleDateString();
  if (m.includes("کام") || m.includes("task")) return "اپنا کام نیچے 'میرے کام' والے حصے میں شامل کریں۔";
  if (m.includes("آمدنی") || m.includes("earning") || m.includes("پیسے")) return "آمدنی صرف تب درج کریں جب واقعی رقم موصول ہو۔ نیچے آمدنی کا ریکارڈ استعمال کریں۔";
  return "میں اس وقت آف لائن ہوں، اس لیے عام AI جواب نہیں دے سکتا۔ انٹرنیٹ آنے پر محفوظ AI کنکشن دستیاب ہو تو Online موڈ منتخب کریں۔";
}
$("chatForm").addEventListener("submit", async e => {
  e.preventDefault();
  const message = $("message").value.trim();
  if (!message) return;
  $("message").value = "";
  bubble(message, "user");
  if (onlineMode && navigator.onLine && endpoint) {
    bubble("JARVIS سوچ رہا ہے...", "bot");
    const pending = $("chat").lastElementChild;
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({message})
      });
      const data = await res.json();
      pending.textContent = data.answer || data.error || "جواب موصول نہیں ہوا۔";
    } catch {
      pending.textContent = "AI کنکشن نہیں ہو سکا۔ Offline جواب: " + offlineReply(message);
    }
  } else {
    bubble(offlineReply(message), "bot");
  }
});
$("modeBtn").addEventListener("click", () => {
  onlineMode = !onlineMode;
  if (onlineMode && (!navigator.onLine || !endpoint)) {
    onlineMode = false;
    bubble("Online موڈ کے لیے انٹرنیٹ اور محفوظ Worker URL ضروری ہے۔", "bot");
  }
  status();
});
$("saveEndpoint").addEventListener("click", () => {
  const value = $("endpoint").value.trim();
  if (value && !/^https:\/\/.+/.test(value)) {
    bubble("براہِ کرم https:// سے شروع ہونے والا Worker URL درج کریں۔", "bot");
    return;
  }
  endpoint = value;
  localStorage.setItem("jarvis_endpoint", endpoint);
  bubble("Worker URL اس ڈیوائس میں محفوظ ہو گیا۔", "bot");
  status();
});
function renderTasks() {
  $("tasks").replaceChildren();
  tasks.forEach((task, i) => {
    const li = document.createElement("li");
    li.textContent = task + " ";
    const b = document.createElement("button");
    b.textContent = "مکمل";
    b.onclick = () => { tasks.splice(i,1); put("jarvis_tasks",tasks); renderTasks(); };
    li.appendChild(b); $("tasks").appendChild(li);
  });
}
$("taskForm").addEventListener("submit", e => {
  e.preventDefault(); const v=$("taskInput").value.trim(); if(!v)return;
  tasks.push(v); put("jarvis_tasks",tasks); $("taskInput").value=""; renderTasks();
});
function renderEarnings() {
  $("earnings").replaceChildren();
  const total = earnings.reduce((sum, item) => sum + Number(item.amount), 0);
  $("total").textContent = "کل درج شدہ آمدنی: " + total.toFixed(2);
  earnings.forEach((item,i) => {
    const li=document.createElement("li");
    li.textContent = `${item.amount} — ${item.note} `;
    const b=document.createElement("button"); b.textContent="حذف";
    b.onclick=()=>{earnings.splice(i,1);put("jarvis_earnings",earnings);renderEarnings();};
    li.appendChild(b);$("earnings").appendChild(li);
  });
}
$("earningForm").addEventListener("submit", e => {
  e.preventDefault(); const amount=Number($("earningAmount").value), note=$("earningNote").value.trim();
  if(amount<0 || !note)return;
  earnings.push({amount,note});put("jarvis_earnings",earnings);
  $("earningAmount").value="";$("earningNote").value="";renderEarnings();
});
window.addEventListener("online",status);
window.addEventListener("offline",status);
renderTasks();renderEarnings();status();
if ("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));
