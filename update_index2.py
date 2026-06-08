import re

with open('backend/src/main/resources/static/index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update getAIGuideResponse
ai_form = '''function getAIGuideResponse(q) {
  if (q.includes('callback') || q.includes('contact') || q.includes('call me')) {
    return '<strong>Get a Callback</strong><br>Leave your details and our team will reach out to you.<br><br>' +
           '<div style="margin-bottom:8px"><input type="text" id="aiLeadName" placeholder="Your full name" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;outline:none;font-family:var(--font)"></div>' +
           '<div style="margin-bottom:8px"><input type="tel" id="aiLeadPhone" placeholder="10-digit mobile number" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;outline:none;font-family:var(--font)"></div>' +
           '<div style="margin-bottom:8px"><textarea id="aiLeadMessage" placeholder="Your requirements or message" rows="2" style="width:100%;padding:8px 12px;border:1px solid var(--border);border-radius:6px;font-size:13px;outline:none;font-family:var(--font);resize:none"></textarea></div>' +
           '<button style="width:100%;padding:8px;background:var(--primary);color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:13px" onclick="submitAILead(this)">Submit Details &rarr;</button>';
  }
  if (q.includes('create account')'''
content = re.sub(r"function getAIGuideResponse\(q\) \{\s*if \(q\.includes\('create account'\)", ai_form, content)

# 2. Add submitAILead JS at the end of the script tag
lead_js = '''function submitAILead(btn) {
  const name = document.getElementById('aiLeadName').value.trim();
  const phone = document.getElementById('aiLeadPhone').value.trim();
  const message = document.getElementById('aiLeadMessage').value.trim();
  if (!name || !phone) { alert('Please enter name and phone number'); return; }
  if (phone.length < 10) { alert('Please enter a valid 10-digit phone number'); return; }
  btn.innerText = 'Submitted!';
  btn.style.opacity = '0.5';
  btn.disabled = true;
  fetch('/api/public/leads', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name: name, phone: phone, message: message, source: 'ai-bot'})
  }).catch(function(){});
  setTimeout(function() {
    addMsg('Thanks ' + escapeHTML(name) + '! We have received your request and will call you at ' + escapeHTML(phone) + ' shortly.', 'bot');
  }, 600);
}
</script>'''
content = re.sub(r'</script>\s*$', lead_js, content)

with open('backend/src/main/resources/static/index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
