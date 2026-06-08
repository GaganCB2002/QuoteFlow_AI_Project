import re

# 1. Update dashboard.html
with open('backend/src/main/resources/static/app/dashboard.html', 'r', encoding='utf-8') as f:
    dashboard = f.read()

# Add tab button
dashboard = dashboard.replace('<button class="tab active" onclick="switchAdminTab(this,\'users\')">Users</button>', '<button class="tab active" onclick="switchAdminTab(this,\'users\')">Users</button><button class="tab" onclick="switchAdminTab(this,\'leads\')">Leads</button>')

# Add leads section
admin_leads_html = '''        <!-- Leads -->
        <div id="adminLeads" style="display:none">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px"><h3 style="font-size:16px;font-weight:700">Landing Page Leads</h3></div>
          <div class="card"><div class="table-responsive"><table class="table">
            <thead><tr><th>Date</th><th>Name</th><th>Phone / Email</th><th>Source</th><th>Message</th><th>Contacted</th></tr></thead>
            <tbody id="adminLeadsTbody"></tbody>
          </table></div></div>
        </div>
'''
dashboard = dashboard.replace('        <!-- Subscriptions -->', admin_leads_html + '        <!-- Subscriptions -->')

with open('backend/src/main/resources/static/app/dashboard.html', 'w', encoding='utf-8') as f:
    f.write(dashboard)


# 2. Update app.js
with open('backend/src/main/resources/static/app/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

# Update switchAdminTab
new_switch = '''function switchAdminTab(el, tab) {
  document.querySelectorAll('#page-admin .tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  var map = { users: 'adminUsers', leads: 'adminLeads', subscriptions: 'adminSubscriptions', audit: 'adminAudit' };
  ['adminUsers', 'adminLeads', 'adminSubscriptions', 'adminAudit'].forEach(function(id) {
    var elem = document.getElementById(id);
    if(elem) elem.style.display = id === map[tab] ? 'block' : 'none';
  });
  if (tab === 'leads') {
    fetchAndRenderLeads();
  }
}'''
app_js = re.sub(r'function switchAdminTab\(el, tab\) \{.*?\n\}', new_switch, app_js, flags=re.DOTALL)

# Add fetchAndRenderLeads
fetch_leads = '''
function fetchAndRenderLeads() {
  var tbody = document.getElementById('adminLeadsTbody');
  if (!tbody) return;
  tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">Loading leads...</td></tr>';
  fetch('/api/landing-leads')
    .then(function(r) { return r.json(); })
    .then(function(leads) {
      if (!leads || leads.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No leads found.</td></tr>';
        return;
      }
      tbody.innerHTML = leads.map(function(l) {
        var date = l.createdAt ? new Date(l.createdAt).toLocaleDateString() : 'N/A';
        var contactStr = (l.phone || '') + (l.email ? '<br><span style="opacity:.6;font-size:12px">'+l.email+'</span>' : '');
        var source = l.source || 'Direct';
        var message = l.message ? '<div style="max-width:250px;white-space:normal;font-size:12px;opacity:.8">' + l.message + '</div>' : '-';
        var contactedBadge = l.contacted ? '<span class="status-badge status-accepted">Yes</span>' : '<span class="status-badge status-draft" onclick="markLeadContacted(\''+l.id+'\')" style="cursor:pointer" title="Click to mark as contacted">No</span>';
        
        return '<tr>' +
          '<td>' + date + '</td>' +
          '<td style="font-weight:600">' + (l.name || 'Unknown') + '</td>' +
          '<td>' + contactStr + '</td>' +
          '<td><span style="background:var(--primary-bg);color:var(--primary);padding:2px 8px;border-radius:12px;font-size:11px;font-weight:600">' + source + '</span></td>' +
          '<td>' + message + '</td>' +
          '<td>' + contactedBadge + '</td>' +
          '</tr>';
      }).join('');
    })
    .catch(function(e) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:red">Failed to load leads.</td></tr>';
      console.error(e);
    });
}

function markLeadContacted(id) {
  if(!confirm("Mark this lead as contacted?")) return;
  fetch('/api/landing-leads/' + id + '/contacted', { method: 'PUT' })
    .then(function() { fetchAndRenderLeads(); })
    .catch(function(e) { alert("Failed to update status"); console.error(e); });
}
'''
app_js = app_js + fetch_leads

with open('backend/src/main/resources/static/app/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print("Done")
