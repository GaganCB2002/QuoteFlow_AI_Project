// Navigation
document.addEventListener('DOMContentLoaded', function() {
  loadDashboard();
  setupSidebar();
  setupSampleData();
});

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
  document.getElementById('page-' + page).style.display = 'block';
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navItem = document.querySelector(`.nav-item[data-page="${page}"]`);
  if (navItem) navItem.classList.add('active');
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

function setupSidebar() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      navigate(this.dataset.page);
    });
  });
  document.getElementById('sidebarToggle').addEventListener('click', function() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
  });
  document.getElementById('sidebarClose').addEventListener('click', function() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  });
  document.getElementById('sidebarOverlay').addEventListener('click', function() {
    this.classList.remove('open');
    document.getElementById('sidebar').classList.remove('open');
  });
}

// Sample data
const sampleCustomers = [
  { name: 'Rahul Verma', company: 'TechCorp', phone: '9988776655', gst: '29ABCDE1234F1Z5', credit: 85, spent: 185000 },
  { name: 'Priya Singh', company: 'DesignStudio', phone: '9876543210', gst: '27PQRST5678G1H6', credit: 72, spent: 125000 },
  { name: 'Amit Patel', company: 'WebPro Solutions', phone: '9765432109', gst: '24LMNOP9012J3K7', credit: 45, spent: 78000 },
  { name: 'Sneha Reddy', company: 'DigitalMint', phone: '9654321098', gst: '36UVWXY3456L4M8', credit: 90, spent: 320000 },
];

const sampleQuotes = [
  { id: 'Q-2026-0042', customer: 'Rahul Verma', items: 3, amount: 88500, status: 'Accepted', date: '2026-06-05' },
  { id: 'Q-2026-0041', customer: 'Priya Singh', items: 2, amount: 59000, status: 'Sent', date: '2026-06-04' },
  { id: 'Q-2026-0040', customer: 'Amit Patel', items: 1, amount: 25000, status: 'Draft', date: '2026-06-03' },
  { id: 'Q-2026-0039', customer: 'Sneha Reddy', items: 5, amount: 177000, status: 'Viewed', date: '2026-06-02' },
  { id: 'Q-2026-0038', customer: 'Rahul Verma', items: 2, amount: 45000, status: 'Rejected', date: '2026-06-01' },
];

const sampleInvoices = [
  { id: 'GST-2026-0018', type: 'GST', customer: 'Sneha Reddy', amount: 177000, paid: 177000, status: 'Paid', due: '2026-07-02' },
  { id: 'GST-2026-0017', type: 'GST', customer: 'Rahul Verma', amount: 88500, paid: 44250, status: 'Partial', due: '2026-07-05' },
  { id: 'INV-2026-0016', type: 'Tax', customer: 'Priya Singh', amount: 59000, paid: 0, status: 'Unpaid', due: '2026-07-04' },
  { id: 'PRO-2026-0001', type: 'Proforma', customer: 'Amit Patel', amount: 25000, paid: 0, status: 'Overdue', due: '2026-06-03' },
];

function loadDashboard() {
  // Recent quotations on dashboard
  const tbody = document.getElementById('recentQuotes');
  if (tbody) {
    tbody.innerHTML = sampleQuotes.slice(0, 4).map(q => {
      const statusClass = q.status === 'Accepted' ? 'status-accepted' : q.status === 'Sent' ? 'status-sent' : q.status === 'Viewed' ? 'status-sent' : q.status === 'Draft' ? 'status-draft' : 'status-rejected';
      return `<tr><td>${q.id}</td><td>${q.customer}</td><td>₹${q.amount.toLocaleString()}</td><td><span class="status-badge ${statusClass}">${q.status}</span></td><td>${q.date}</td></tr>`;
    }).join('');
  }
}

function setupSampleData() {
  // Quotations page
  const ql = document.getElementById('quoteList');
  if (ql) {
    ql.innerHTML = sampleQuotes.map(q => {
      const statusClass = q.status === 'Accepted' ? 'status-accepted' : q.status === 'Sent' ? 'status-sent' : q.status === 'Viewed' ? 'status-sent' : q.status === 'Draft' ? 'status-draft' : 'status-rejected';
      return `<tr><td><strong>${q.id}</strong></td><td>${q.customer}</td><td>${q.items}</td><td><strong>₹${q.amount.toLocaleString()}</strong></td><td><span class="status-badge ${statusClass}">${q.status}</span></td><td>${q.date}</td><td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert('Download PDF')">📄 PDF</button> <button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert('Share via WhatsApp')">📱 Share</button></td></tr>`;
    }).join('');
  }
  // Invoices
  const il = document.getElementById('invoiceList');
  if (il) {
    il.innerHTML = sampleInvoices.map(i => {
      const statusClass = i.status === 'Paid' ? 'status-paid' : i.status === 'Partial' ? 'status-partial' : i.status === 'Overdue' ? 'status-overdue' : 'status-draft';
      const typeLabel = i.type === 'GST' ? '🧾 GST' : i.type === 'Tax' ? '📄 Tax' : '📋 Proforma';
      return `<tr><td><strong>${i.id}</strong></td><td>${typeLabel}</td><td>${i.customer}</td><td>₹${i.amount.toLocaleString()}</td><td>₹${i.paid.toLocaleString()}</td><td><span class="status-badge ${statusClass}">${i.status}</span></td><td>${i.due}</td><td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert('Generate QR')">📱 QR</button></td></tr>`;
    }).join('');
  }
  // Customers
  const cl = document.getElementById('customerList');
  if (cl) {
    cl.innerHTML = sampleCustomers.map(c => {
      const scoreColor = c.credit >= 70 ? 'var(--success)' : c.credit >= 40 ? 'var(--accent)' : '#ef4444';
      return `<tr><td><strong>${c.name}</strong></td><td>${c.company}</td><td>${c.phone}</td><td>${c.gst}</td><td><span style="font-weight:700;color:${scoreColor}">${c.credit}</span></td><td>₹${c.spent.toLocaleString()}</td><td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px">View</button></td></tr>`;
    }).join('');
  }
}

function showNewQuote() {
  const name = prompt('Enter customer name:');
  if (!name) return;
  const desc = prompt('Enter service description (or leave blank for manual):');
  if (desc) {
    alert(`🤖 AI Generated Quotation for "${name}"\nService: ${desc}\n\nAI is creating scope, pricing, and timeline...\n\n(Full AI integration pending backend)`);
  } else {
    alert('📄 New quotation form opened for ' + name);
  }
}
