import re

with open('backend/src/main/resources/static/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove HTML
content = re.sub(r'<!-- Lead Capture Form -->.*?</textarea></div>\s*<button class="btn btn-primary".*?onclick="submitLead\(\)">Submit &rarr;</button>\s*<div id="leadSuccess".*?</div>\s*</div>\s*</div>', '', content, flags=re.DOTALL)

# 2. Add quick reply
content = content.replace('<span class="ai-quick-reply" onclick="quickChat(\'how it works\')">How it works</span>', '<span class="ai-quick-reply" onclick="quickChat(\'how it works\')">How it works</span>\\n      <span class="ai-quick-reply" onclick="quickChat(\\\'get a callback\\\')">Get a callback</span>')

# 3. Update getAIGuideResponse
ai_form = '''function getAIGuideResponse(q) {
  if (q.includes('callback') || q.includes('contact') || q.includes('call me')) {
    return '<strong>Get a Callback</strong><br>Leave your details and our team will reach out to you.<br><br>' +
           '<div style="margin-bottom:8px"><input type="text" id="aiLeadName" placeholder="Your full name" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;outline:none;font-family:var(--font)"></div>' +
           '<div style="margin-bottom:8px"><input type="tel" id="aiLeadPhone" placeholder="10-digit mobile number" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;outline:none;font-family:var(--font)"></div>' +
           '<button style="width:100%;padding:8px;background:var(--primary);color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px" onclick="submitAILead(this)">Submit Details &rarr;</button>';
  }
  if (q.includes('create account')'''
content = content.replace("function getAIGuideResponse(q) {\\n  if (q.includes('create account')", ai_form)

# 4. Add submitAILead JS
lead_js = '''function submitAILead(btn) {
  const name = document.getElementById('aiLeadName').value.trim();
  const phone = document.getElementById('aiLeadPhone').value.trim();
  if (!name || !phone) { alert('Please enter name and phone number'); return; }
  if (phone.length < 10) { alert('Please enter a valid 10-digit phone number'); return; }
  btn.innerText = 'Submitted!';
  btn.style.opacity = '0.5';
  btn.disabled = true;
  fetch('/api/public/leads', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, phone: phone, source: 'ai-bot'})
  }).catch(function(){});
  setTimeout(function() {
    addMsg('Thanks ' + escapeHTML(name) + '! We have received your request and will call you at ' + escapeHTML(phone) + ' shortly.', 'bot');
  }, 600);
}
</script>'''
content = content.replace("</script>", lead_js, 1)

with open('backend/src/main/resources/static/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
