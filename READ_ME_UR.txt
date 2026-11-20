JARVIS Online + Offline بنیادی ورژن

اس ZIP میں مکمل ویب ایپ کی فائلیں ہیں۔ یہ موجودہ GitHub Pages والی فائلوں کا متبادل ورژن ہے۔

اس میں:
- آف لائن بنیادی جواب (وقت، تاریخ، کام/آمدنی کی رہنمائی)
- کاموں کی فہرست اور آمدنی کا دستی ریکارڈ (اسی ڈیوائس میں محفوظ)
- PWA / Service Worker کیش
- آن لائن AI کے لیے Worker backend کا کوڈ

اہم حدود:
- Offline Mode مکمل AI نہیں؛ انٹرنیٹ کے بغیر صرف بنیادی جوابات اور مقامی ریکارڈ کام کرتے ہیں۔
- Online AI تبھی چلے گا جب Worker deploy ہو، GEMINI_API_KEY کو Worker Secret میں محفوظ کیا جائے، اور Worker URL ایپ میں ڈالا جائے۔
- API Key کو GitHub، app.js، HTML، screenshot یا ChatGPT میں ہرگز نہ ڈالیں۔
- یہ خودکار طور پر ویب سائٹس پر اکاؤنٹ نہیں بناتا، CAPTCHA حل نہیں کرتا، نہ کمائی کی ضمانت دیتا ہے۔
- موجودہ GitHub Pages میں تبدیلی کے بعد چند منٹ لگ سکتے ہیں۔

اگلا کام:
1) اس ZIP کو extract کریں۔
2) GitHub میں اپنے Jarvis repository کو کھولیں۔
3) پرانی root فائلوں کو اس ZIP کی نئی root فائلوں سے replace/upload کریں۔
4) worker فولڈر کا کوڈ الگ Cloudflare Worker میں deploy کریں۔
5) Cloudflare Worker > Settings > Variables and Secrets میں GEMINI_API_KEY نام کا Secret بنائیں اور اپنی Gemini API Key صرف وہاں رکھیں۔
6) Worker کا URL JARVIS کی Settings میں ڈالیں، Save کریں، پھر Online دبائیں۔

اگر ابھی Cloudflare یا GitHub کا کوئی مرحلہ مشکل ہو تو پہلے ZIP extract کرنے تک ہی کریں؛ پھر اگلا ایک قدم بتایا جائے گا۔
