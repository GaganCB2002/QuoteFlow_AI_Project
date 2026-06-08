// ============================================================
// QuoteFlow AI — App Dashboard
// All sample data, estimation engine, CRM, marketing, finance,
// quotations, products, notifications, admin, and more.
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initEstimation();
  initSearchQuote();
  initQuoteFilters();
  loadDashboard();
  loadAllSampleData();
});

// ============================================================
// SAMPLE DATA
// ============================================================

const sampleCustomers = [
  { name: 'Rahul Verma', company: 'TechCorp', phone: '9988776655', gst: '29ABCDE1234F1Z5', credit: 85, spent: 185000 },
  { name: 'Priya Singh', company: 'DesignStudio', phone: '9876543210', gst: '27PQRST5678G1H6', credit: 72, spent: 125000 },
  { name: 'Amit Patel', company: 'WebPro Solutions', phone: '9765432109', gst: '24LMNOP9012J3K7', credit: 45, spent: 78000 },
  { name: 'Sneha Reddy', company: 'DigitalMint', phone: '9654321098', gst: '36UVWXY3456L4M8', credit: 90, spent: 320000 },
  { name: 'Vikram Joshi', company: 'CloudBase Inc', phone: '9543210987', gst: '08GHIJK6789M5N9', credit: 68, spent: 215000 },
  { name: 'Ananya Gupta', company: 'GrowthHackers', phone: '9432109876', gst: '09LMNOP1234P6Q1', credit: 55, spent: 95000 },
  { name: 'Rohit Sharma', company: 'BizTech Ltd', phone: '9321098765', gst: '10QRSTU5678R7S2', credit: 78, spent: 450000 },
  { name: 'Neha Kapoor', company: 'CreativeAgency', phone: '9210987654', gst: '07VWXYZ9012T8U3', credit: 92, spent: 580000 },
];

const sampleQuotes = [
  { id: 'Q-2026-0042', customer: 'Rahul Verma', project: 'Website Development', items: 3, amount: 88500, status: 'Accepted', date: '2026-06-05', approval: 'Approved' },
  { id: 'Q-2026-0041', customer: 'Priya Singh', project: 'Mobile App', items: 2, amount: 59000, status: 'Sent', date: '2026-06-04', approval: 'Pending' },
  { id: 'Q-2026-0040', customer: 'Amit Patel', project: 'E-commerce', items: 1, amount: 25000, status: 'Draft', date: '2026-06-03', approval: '—' },
  { id: 'Q-2026-0039', customer: 'Sneha Reddy', project: 'ERP Solution', items: 5, amount: 177000, status: 'Viewed', date: '2026-06-02', approval: 'Pending' },
  { id: 'Q-2026-0038', customer: 'Rahul Verma', project: 'SEO Package', items: 2, amount: 45000, status: 'Rejected', date: '2026-06-01', approval: 'Denied' },
  { id: 'Q-2026-0037', customer: 'Vikram Joshi', project: 'CRM Setup', items: 4, amount: 132000, status: 'Accepted', date: '2026-05-28', approval: 'Approved' },
  { id: 'Q-2026-0036', customer: 'Ananya Gupta', project: 'Digital Marketing', items: 2, amount: 38000, status: 'Sent', date: '2026-05-25', approval: 'Pending' },
  { id: 'Q-2026-0035', customer: 'Rohit Sharma', project: 'Website Redesign', items: 3, amount: 95000, status: 'Draft', date: '2026-05-20', approval: '—' },
  { id: 'Q-2026-0034', customer: 'Neha Kapoor', project: 'Mobile App', items: 6, amount: 245000, status: 'Accepted', date: '2026-05-15', approval: 'Approved' },
  { id: 'Q-2026-0033', customer: 'Priya Singh', project: 'Graphic Design', items: 1, amount: 12000, status: 'Viewed', date: '2026-05-10', approval: 'Pending' },
  { id: 'Q-2026-0032', customer: 'Amit Patel', project: 'Hosting Renewal', items: 1, amount: 9999, status: 'Sent', date: '2026-05-08', approval: 'Pending' },
  { id: 'Q-2026-0031', customer: 'Sneha Reddy', project: 'E-commerce', items: 4, amount: 185000, status: 'Rejected', date: '2026-05-05', approval: 'Denied' },
];

const sampleProducts = [
  { name: 'Website Development', category: 'Products', hsn: '9983', price: 25000, gst: 18, stock: 99, status: 'active' },
  { name: 'Mobile App Development', category: 'Products', hsn: '9983', price: 50000, gst: 18, stock: 99, status: 'active' },
  { name: 'E-commerce Solution', category: 'Products', hsn: '9983', price: 45000, gst: 18, stock: 99, status: 'active' },
  { name: 'SEO Optimization', category: 'Services', hsn: '9983', price: 12000, gst: 18, stock: 0, status: 'active' },
  { name: 'Social Media Marketing', category: 'Services', hsn: '9983', price: 8000, gst: 18, stock: 0, status: 'active' },
  { name: 'Cloud Hosting (Annual)', category: 'Services', hsn: '9983', price: 9999, gst: 18, stock: 0, status: 'active' },
  { name: 'ERP Implementation', category: 'Services', hsn: '9983', price: 80000, gst: 18, stock: 0, status: 'active' },
  { name: 'UI/UX Design', category: 'Services', hsn: '9983', price: 15000, gst: 18, stock: 0, status: 'active' },
  { name: 'CRM Setup', category: 'Services', hsn: '9983', price: 60000, gst: 18, stock: 0, status: 'active' },
  { name: 'Graphic Design', category: 'Services', hsn: '9983', price: 10000, gst: 18, stock: 0, status: 'inactive' },
];

const sampleInvoices = [
  { id: 'GST-2026-0018', type: 'GST', customer: 'Sneha Reddy', amount: 177000, paid: 177000, status: 'Paid', due: '2026-07-02' },
  { id: 'GST-2026-0017', type: 'GST', customer: 'Rahul Verma', amount: 88500, paid: 44250, status: 'Partial', due: '2026-07-05' },
  { id: 'INV-2026-0016', type: 'Tax', customer: 'Priya Singh', amount: 59000, paid: 0, status: 'Unpaid', due: '2026-07-04' },
  { id: 'PRO-2026-0001', type: 'Proforma', customer: 'Amit Patel', amount: 25000, paid: 0, status: 'Overdue', due: '2026-06-03' },
  { id: 'GST-2026-0015', type: 'GST', customer: 'Vikram Joshi', amount: 132000, paid: 132000, status: 'Paid', due: '2026-06-28' },
  { id: 'GST-2026-0014', type: 'GST', customer: 'Neha Kapoor', amount: 245000, paid: 200000, status: 'Partial', due: '2026-06-15' },
  { id: 'INV-2026-0013', type: 'Tax', customer: 'Rohit Sharma', amount: 95000, paid: 0, status: 'Unpaid', due: '2026-06-20' },
  { id: 'INV-2026-0012', type: 'Tax', customer: 'Ananya Gupta', amount: 38000, paid: 38000, status: 'Paid', due: '2026-05-25' },
];

const sampleReceipts = [
  { id: 'RCP-2026-008', customer: 'Sneha Reddy', amount: 177000, mode: 'Bank Transfer', date: '2026-06-06', status: 'Cleared' },
  { id: 'RCP-2026-007', customer: 'Neha Kapoor', amount: 100000, mode: 'Cheque', date: '2026-06-05', status: 'Pending' },
  { id: 'RCP-2026-006', customer: 'Rahul Verma', amount: 44250, mode: 'UPI', date: '2026-06-04', status: 'Cleared' },
  { id: 'RCP-2026-005', customer: 'Vikram Joshi', amount: 132000, mode: 'Bank Transfer', date: '2026-05-30', status: 'Cleared' },
  { id: 'RCP-2026-004', customer: 'Ananya Gupta', amount: 38000, mode: 'Cash', date: '2026-05-26', status: 'Cleared' },
  { id: 'RCP-2026-003', customer: 'Priya Singh', amount: 12000, mode: 'UPI', date: '2026-05-12', status: 'Cleared' },
];

const sampleLeads = [
  { name: 'Deepak Mehta', source: 'Website', status: 'New', assigned: 'Rahul K.', created: '2026-06-05' },
  { name: 'Sunita Agarwal', source: 'Referral', status: 'Active', assigned: 'Sharma M.', created: '2026-06-03' },
  { name: 'Arjun Nair', source: 'LinkedIn', status: 'New', assigned: 'Rahul K.', created: '2026-06-02' },
  { name: 'Kavita Desai', source: 'Google Ads', status: 'Active', assigned: 'Sharma M.', created: '2026-05-30' },
  { name: 'Manoj Tiwari', source: 'WhatsApp', status: 'Converted', assigned: 'Rahul K.', created: '2026-05-25' },
  { name: 'Pooja Malhotra', source: 'Email', status: 'Active', assigned: 'Sharma M.', created: '2026-05-22' },
  { name: 'Rajesh Khanna', source: 'Website', status: 'Lost', assigned: 'Rahul K.', created: '2026-05-15' },
  { name: 'Divya Prakash', source: 'Referral', status: 'New', assigned: 'Sharma M.', created: '2026-06-06' },
  { name: 'Suresh Iyer', source: 'LinkedIn', status: 'Active', assigned: 'Rahul K.', created: '2026-05-18' },
  { name: 'Meera Chopra', source: 'Google Ads', status: 'Converted', assigned: 'Sharma M.', created: '2026-05-10' },
];

const sampleDeals = [
  { id: 1, name: 'TechCorp Solutions', amount: 150000, stage: 'Lead', closeDate: '15 Jul 2026', prob: 20, probClass: 'low' },
  { id: 2, name: 'Greenfield Ltd', amount: 85000, stage: 'Lead', closeDate: '20 Jul 2026', prob: 15, probClass: 'low' },
  { id: 3, name: 'UrbanClap Services', amount: 120000, stage: 'Lead', closeDate: '25 Jul 2026', prob: 25, probClass: 'low' },
  { id: 4, name: 'PixelArts Studio', amount: 220000, stage: 'Qualified', closeDate: '10 Aug 2026', prob: 40, probClass: 'med' },
  { id: 5, name: 'ModernHomes', amount: 175000, stage: 'Qualified', closeDate: '5 Aug 2026', prob: 35, probClass: 'med' },
  { id: 6, name: 'SwiftLogistics', amount: 310000, stage: 'Qualified', closeDate: '15 Aug 2026', prob: 45, probClass: 'med' },
  { id: 7, name: 'DigitalFirst', amount: 350000, stage: 'Proposal', closeDate: '25 Aug 2026', prob: 50, probClass: 'med' },
  { id: 8, name: 'RetailMax', amount: 120000, stage: 'Proposal', closeDate: '18 Aug 2026', prob: 45, probClass: 'med' },
  { id: 9, name: 'EduPrime', amount: 280000, stage: 'Proposal', closeDate: '30 Aug 2026', prob: 55, probClass: 'med' },
  { id: 10, name: 'Apex Global', amount: 580000, stage: 'Negotiation', closeDate: '5 Sep 2026', prob: 70, probClass: 'high' },
  { id: 11, name: 'BlueOcean', amount: 240000, stage: 'Negotiation', closeDate: '30 Aug 2026', prob: 65, probClass: 'high' },
  { id: 12, name: 'StellarTech', amount: 420000, stage: 'Closed Won', closeDate: '10 Jun 2026', prob: 100, probClass: 'high' },
  { id: 13, name: 'WebWizards', amount: 195000, stage: 'Closed Won', closeDate: '5 Jun 2026', prob: 100, probClass: 'high' },
  { id: 14, name: 'BudgetBuild', amount: 65000, stage: 'Closed Lost', closeDate: '1 Jun 2026', prob: 0, probClass: 'low' },
];

const sampleCampaigns = [
  { name: 'Summer Sale Blast', type: 'WhatsApp', status: 'Sent', recipients: 2450, sent: 2380, date: '2026-06-01' },
  { name: 'New Product Launch', type: 'Email', status: 'Scheduled', recipients: 5200, sent: 0, date: '2026-06-20' },
  { name: 'Diwali Greetings', type: 'Festival', status: 'Draft', recipients: 3800, sent: 0, date: '2026-10-15' },
  { name: 'Customer Feedback', type: 'Email', status: 'Sent', recipients: 1800, sent: 1750, date: '2026-05-28' },
  { name: 'Webinar Invite', type: 'WhatsApp', status: 'Sent', recipients: 1200, sent: 1185, date: '2026-05-20' },
  { name: 'Holiday Offer', type: 'WhatsApp', status: 'Scheduled', recipients: 4600, sent: 0, date: '2026-08-10' },
  { name: 'Monthly Newsletter', type: 'Email', status: 'Draft', recipients: 6800, sent: 0, date: '2026-07-01' },
];

const sampleIncome = [
  { customer: 'Sneha Reddy', desc: 'ERP Development - Phase 1', amount: 177000, date: '2026-06-05', mode: 'Bank Transfer' },
  { customer: 'Neha Kapoor', desc: 'Mobile App Development', amount: 245000, date: '2026-06-03', mode: 'Cheque' },
  { customer: 'Rahul Verma', desc: 'Website Development', amount: 88500, date: '2026-06-02', mode: 'UPI' },
  { customer: 'Vikram Joshi', desc: 'CRM Setup', amount: 132000, date: '2026-05-30', mode: 'Bank Transfer' },
  { customer: 'Ananya Gupta', desc: 'Digital Marketing Retainer', amount: 38000, date: '2026-05-26', mode: 'Cash' },
  { customer: 'Priya Singh', desc: 'Mobile App - UI Design', amount: 59000, date: '2026-05-20', mode: 'Bank Transfer' },
  { customer: 'Rohit Sharma', desc: 'Website Redesign - Advance', amount: 50000, date: '2026-05-18', mode: 'UPI' },
  { customer: 'Neha Kapoor', desc: 'Graphic Design Project', amount: 12000, date: '2026-05-15', mode: 'Bank Transfer' },
  { customer: 'TechCorp', desc: 'Hosting Renewal', amount: 9999, date: '2026-05-10', mode: 'UPI' },
  { customer: 'DigitalMint', desc: 'SEO Package', amount: 45000, date: '2026-05-05', mode: 'Cheque' },
  { customer: 'Rahul Verma', desc: 'Maintenance Contract', amount: 24000, date: '2026-05-01', mode: 'Bank Transfer' },
  { customer: 'Vikram Joshi', desc: 'API Integration', amount: 35000, date: '2026-04-28', mode: 'UPI' },
];

const sampleExpenses = [
  { category: 'Infrastructure', desc: 'AWS Cloud Hosting', amount: 45000, date: '2026-06-01', mode: 'Bank Transfer' },
  { category: 'Salary', desc: 'Developer salaries', amount: 180000, date: '2026-06-01', mode: 'Bank Transfer' },
  { category: 'Marketing', desc: 'Google Ads Campaign', amount: 25000, date: '2026-05-30', mode: 'UPI' },
  { category: 'Office', desc: 'Office Rent', amount: 35000, date: '2026-05-28', mode: 'Bank Transfer' },
  { category: 'Software', desc: 'Tool Licenses', amount: 12000, date: '2026-05-25', mode: 'UPI' },
  { category: 'Infrastructure', desc: 'Domain Renewals', amount: 8000, date: '2026-05-22', mode: 'UPI' },
  { category: 'Salary', desc: 'Designer salaries', amount: 90000, date: '2026-05-15', mode: 'Bank Transfer' },
  { category: 'Marketing', desc: 'Facebook Ads', amount: 18000, date: '2026-05-12', mode: 'Bank Transfer' },
  { category: 'Utilities', desc: 'Electricity and Internet', amount: 8500, date: '2026-05-10', mode: 'UPI' },
  { category: 'Travel', desc: 'Client meetings', amount: 15000, date: '2026-05-08', mode: 'Cash' },
  { category: 'Software', desc: 'Annual SaaS Subscriptions', amount: 45000, date: '2026-05-05', mode: 'Bank Transfer' },
  { category: 'Office', desc: 'Office Supplies', amount: 3500, date: '2026-05-02', mode: 'UPI' },
];

const sampleNotifications = [
  { id: 1, type: 'info', icon: 'info', title: 'New quotation created', message: 'Quotation Q-2026-0042 generated for Rahul Verma.', time: '2 min ago', unread: true },
  { id: 2, type: 'success', icon: 'success', title: 'Payment received', message: 'Payment of Rs 1,77,000 received from Sneha Reddy.', time: '1 hour ago', unread: true },
  { id: 3, type: 'warning', icon: 'warning', title: 'Invoice overdue', message: 'Invoice INV-2026-0016 for Priya Singh is overdue.', time: '3 hours ago', unread: true },
  { id: 4, type: 'info', icon: 'info', title: 'New customer registered', message: 'BlueOcean Ltd has registered as a new customer.', time: 'Yesterday', unread: false },
  { id: 5, type: 'success', icon: 'success', title: 'Deal won!', message: 'StellarTech deal closed at Rs 4,20,000. Congratulations!', time: '2 days ago', unread: false },
  { id: 6, type: 'danger', icon: 'danger', title: 'Subscription expiring', message: 'Your Pro Plan subscription expires in 7 days.', time: '3 days ago', unread: false },
  { id: 7, type: 'warning', icon: 'warning', title: 'Low disk space', message: 'Server storage is at 92%. Consider清理ing old backups.', time: '4 days ago', unread: false },
  { id: 8, type: 'success', icon: 'success', title: 'Campaign completed', message: 'Summer Sale Blast reached 2,380 recipients.', time: '5 days ago', unread: false },
  { id: 9, type: 'info', icon: 'info', title: 'New lead assigned', message: 'Deepak Mehta from Website has been assigned to you.', time: '6 days ago', unread: false },
];

const sampleDocuments = [
  { name: 'Q-2026-0042_TechCorp.pdf', category: 'Quotations', size: '245 KB', date: '2026-06-05' },
  { name: 'Q-2026-0041_DesignStudio.pdf', category: 'Quotations', size: '189 KB', date: '2026-06-04' },
  { name: 'GST-2026-0018_DigitalMint.pdf', category: 'Invoices', size: '312 KB', date: '2026-06-06' },
  { name: 'GST-2026-0017_TechCorp.pdf', category: 'Invoices', size: '278 KB', date: '2026-06-05' },
  { name: 'RCP-2026-008_DigitalMint.pdf', category: 'Receipts', size: '156 KB', date: '2026-06-06' },
  { name: 'RCP-2026-007_Kapoor.pdf', category: 'Receipts', size: '142 KB', date: '2026-06-05' },
  { name: 'Project_Plan_StellarTech.pdf', category: 'Projects', size: '1.2 MB', date: '2026-05-20' },
  { name: 'SOW_BlueOcean.pdf', category: 'Projects', size: '890 KB', date: '2026-05-18' },
  { name: 'Brand_Guidelines.pdf', category: 'Uploads', size: '4.5 MB', date: '2026-05-10' },
  { name: 'Company_Profile.pdf', category: 'Uploads', size: '2.1 MB', date: '2026-05-05' },
];

const sampleUsers = [
  { name: 'Rahul Kumar', email: 'rahul@quoteflow.ai', role: 'Admin', status: 'Active', lastActive: 'Now', avatar: 'RK', bg: 'var(--primary)' },
  { name: 'Sharma Mamta', email: 'mamta@quoteflow.ai', role: 'Manager', status: 'Active', lastActive: '2 hours ago', avatar: 'SM', bg: 'var(--accent)' },
  { name: 'Varun Patel', email: 'varun@quoteflow.ai', role: 'Editor', status: 'Invited', lastActive: 'Never', avatar: 'VP', bg: 'var(--warning)' },
  { name: 'Priya Kapoor', email: 'priya@quoteflow.ai', role: 'Viewer', status: 'Active', lastActive: '1 day ago', avatar: 'PK', bg: 'var(--success)' },
  { name: 'Arun Singh', email: 'arun@quoteflow.ai', role: 'Editor', status: 'Active', lastActive: '3 hours ago', avatar: 'AS', bg: 'var(--secondary)' },
];

const sampleAuditLogs = [
  { user: 'Rahul Kumar', action: 'Created', entity: 'Quotation', details: 'Q-2026-0042 for TechCorp', ts: '10 Jun 2026, 14:32' },
  { user: 'Rahul Kumar', action: 'Sent', entity: 'Invoice', details: 'INV-2026-0016 to Priya Singh', ts: '9 Jun 2026, 11:15' },
  { user: 'Sharma Mamta', action: 'Updated', entity: 'Lead', details: 'Changed status to Qualified', ts: '9 Jun 2026, 10:00' },
  { user: 'Rahul Kumar', action: 'Generated', entity: 'Report', details: 'Monthly GST Report', ts: '8 Jun 2026, 09:45' },
  { user: 'Sharma Mamta', action: 'Added', entity: 'Customer', details: 'BlueOcean Ltd', ts: '7 Jun 2026, 16:20' },
  { user: 'Rahul Kumar', action: 'Deleted', entity: 'Campaign', details: 'Summer Sale WhatsApp', ts: '6 Jun 2026, 13:10' },
  { user: 'Varun Patel', action: 'Viewed', entity: 'Quotation', details: 'Q-2026-0039', ts: '5 Jun 2026, 15:45' },
  { user: 'Rahul Kumar', action: 'Approved', entity: 'Quotation', details: 'Q-2026-0037', ts: '4 Jun 2026, 12:00' },
];

const pipelineStages = ['Lead', 'Qualified', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'];

// ============================================================
// NAVIGATION
// ============================================================

function navigate(page) {
  document.querySelectorAll('.page').forEach(function(p) { p.style.display = 'none'; });
  document.querySelectorAll('.nav-item').forEach(function(n) { n.classList.remove('active'); });
  var target = document.getElementById('page-' + page);
  if (target) target.style.display = 'block';
  var navItem = document.querySelector('.nav-item[data-page="' + page + '"]');
  if (navItem) navItem.classList.add('active');
  closeSidebar();
}

function closeSidebar() {
  var s = document.getElementById('sidebar');
  var o = document.getElementById('sidebarOverlay');
  if (s) s.classList.remove('open');
  if (o) o.classList.remove('open');
}

function toggleSidebar() {
  var s = document.getElementById('sidebar');
  var o = document.getElementById('sidebarOverlay');
  if (s) s.classList.toggle('open');
  if (o) o.classList.toggle('open');
}

function initNavigation() {
  // Sidebar/nav listeners are already attached by the HTML inline script.
  // Our `navigate` function overrides the inline one due to deferred load order.
  // This avoids duplicate toggle issues.
}

// ============================================================
// ESTIMATION ENGINE — AI Guided Quotation Builder
// ============================================================

var wizardQuestions = {
  'Website': [
    { type: 'number', id: 'pages', label: 'Number of Pages', def: 5, min: 1 },
    { type: 'toggle', id: 'adminPanel', label: 'Admin Panel', def: true },
    { type: 'toggle', id: 'blog', label: 'Blog / News Section', def: false },
    { type: 'toggle', id: 'contactForm', label: 'Contact Form', def: true },
    { type: 'toggle', id: 'paymentGateway', label: 'Payment Gateway', def: false },
    { type: 'toggle', id: 'seo', label: 'SEO Optimization', def: false },
    { type: 'toggle', id: 'multiLanguage', label: 'Multi-language Support', def: false },
  ],
  'Mobile App': [
    { type: 'toggle', id: 'android', label: 'Android', def: true },
    { type: 'toggle', id: 'ios', label: 'iOS', def: false },
    { type: 'toggle', id: 'adminPanel', label: 'Admin Panel', def: true },
    { type: 'toggle', id: 'pushNotifications', label: 'Push Notifications', def: true },
    { type: 'toggle', id: 'paymentGateway', label: 'Payment Gateway', def: true },
    { type: 'toggle', id: 'maps', label: 'Maps Integration', def: false },
    { type: 'toggle', id: 'chat', label: 'Chat System', def: false },
    { type: 'toggle', id: 'videoUpload', label: 'Video Upload', def: false },
  ],
  'ERP': [
    { type: 'checkboxes', id: 'erpModules', label: 'Modules Required', opts: ['Inventory', 'HR / Payroll', 'Accounting', 'CRM', 'Purchase', 'Sales', 'Manufacturing', 'Project Management'] },
    { type: 'number', id: 'usersCount', label: 'Number of Users', def: 10, min: 1 },
  ],
  'CRM': [
    { type: 'checkboxes', id: 'crmFeatures', label: 'Features Required', opts: ['Email Integration', 'Analytics Dashboard', 'Reports & Dashboards', 'Automation', 'Lead Scoring', 'Call Logging', 'Customer Portal'] },
    { type: 'number', id: 'usersCount', label: 'Number of Users', def: 5, min: 1 },
  ],
  'Billing Software': [
    { type: 'checkboxes', id: 'billingFeatures', label: 'Features Required', opts: ['Inventory Management', 'GST Support', 'Invoice Generation', 'Reports', 'Payment Gateway', 'Customer Portal', 'SMS/Email Notifications'] },
    { type: 'number', id: 'usersCount', label: 'Number of Users', def: 3, min: 1 },
  ],
  'E-Commerce': [
    { type: 'number', id: 'productsCount', label: 'Number of Products', def: 50, min: 1 },
    { type: 'toggle', id: 'paymentGateway', label: 'Payment Gateway', def: true },
    { type: 'toggle', id: 'shippingIntegration', label: 'Shipping Integration', def: true },
    { type: 'toggle', id: 'adminPanel', label: 'Admin Panel', def: true },
    { type: 'toggle', id: 'seo', label: 'SEO Optimization', def: false },
    { type: 'toggle', id: 'multiLanguage', label: 'Multi-language Support', def: false },
  ],
  'Digital Marketing': [
    { type: 'checkboxes', id: 'platforms', label: 'Target Platforms', opts: ['Google Ads', 'Facebook / Instagram', 'LinkedIn', 'Twitter', 'YouTube'] },
    { type: 'select', id: 'adBudget', label: 'Monthly Ad Budget', opts: ['< Rs 10,000', 'Rs 10,000 - 25,000', 'Rs 25,000 - 50,000', 'Rs 50,000 - 1,00,000', 'Rs 1,00,000+'], def: 'Rs 10,000 - 25,000' },
    { type: 'toggle', id: 'contentCreation', label: 'Content Creation', def: true },
    { type: 'toggle', id: 'analytics', label: 'Analytics & Reporting', def: true },
  ],
  'SEO': [
    { type: 'number', id: 'keywordsCount', label: 'Target Keywords', def: 20, min: 1 },
    { type: 'toggle', id: 'contentStrategy', label: 'Content Strategy', def: false },
    { type: 'toggle', id: 'technicalAudit', label: 'Technical SEO Audit', def: true },
    { type: 'toggle', id: 'linkBuilding', label: 'Link Building', def: false },
    { type: 'toggle', id: 'monthlyReporting', label: 'Monthly Reporting', def: true },
  ],
  'Custom Software': [
    { type: 'textarea', id: 'customModules', label: 'Key Modules / Features', ph: 'Describe the main modules required...' },
    { type: 'number', id: 'usersCount', label: 'Target Number of Users', def: 100, min: 1 },
    { type: 'checkboxes', id: 'platforms', label: 'Target Platforms', opts: ['Web', 'Desktop (Windows)', 'Mobile (Android)', 'Mobile (iOS)'] },
  ],
};

var infrastructureQuestions = [
  { type: 'toggle', id: 'domain', label: 'Custom Domain (.com)', def: true },
  { type: 'select', id: 'hosting', label: 'Web Hosting', opts: ['None', 'Shared', 'VPS', 'Cloud'], def: 'None' },
  { type: 'toggle', id: 'ssl', label: 'SSL Certificate', def: false },
  { type: 'toggle', id: 'database', label: 'Database Setup', def: true },
];

var baseCostRates = {
  'Website': 25000,
  'Mobile App': 50000,
  'ERP': 80000,
  'CRM': 60000,
  'Billing Software': 45000,
  'E-Commerce': 45000,
  'Digital Marketing': 15000,
  'SEO': 12000,
  'Custom Software': 60000,
};

var itemCosts = {
  domain: 999, ssl: 1999, database: 5000,
  hosting: { 'None': 0, 'Shared': 3000, 'VPS': 12000, 'Cloud': 25000 },
  perPage: 2000, adminPanel: 15000, blog: 5000, contactForm: 3000,
  paymentGateway: 5000, seoAddon: 5000, multiLanguage: 5000,
  android: 15000, ios: 15000, pushNotifications: 5000, maps: 8000,
  chat: 8000, videoUpload: 5000, shippingIntegration: 8000,
  contentCreation: 10000, analytics: 5000, contentStrategy: 8000,
  technicalAudit: 5000, linkBuilding: 8000, monthlyReporting: 3000,
  perUser: 500, perModule: 10000, perPlatform: 15000, perKeyword: 300,
  erpModuleCost: 8000, crmFeatureCost: 4000, billingFeatureCost: 4000,
};

var estimationData = {
  mode: 'ai', projectName: '', projectType: '', wizardStep: 1,
  wizardTotalSteps: 3, selections: {}, costItems: [],
  subtotal: 0, profitMarginPct: 20, profitAmount: 0, finalTotal: 0,
  totalHours: 0, timeline: [], modules: [], generatedDocs: false,
};

function initEstimation() {
  estimationData.mode = 'ai';
  estimationData.wizardStep = 1;
  estimationData.selections = {};
  estimationData.costItems = [];
  estimationData.subtotal = 0;
  estimationData.finalTotal = 0;
  estimationData.totalHours = 0;
  estimationData.timeline = [];
  estimationData.modules = [];
  estimationData.generatedDocs = false;
  document.getElementById('estDocumentsSection').style.display = 'none';
  resetLiveCostPanel();
  renderWizardStep();
}

function switchEstimationMode(btn, mode) {
  document.querySelectorAll('#page-estimation > .tabs .tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  estimationData.mode = mode;
  document.getElementById('estAiPanel').style.display = mode === 'ai' ? 'block' : 'none';
  document.getElementById('estWizardPanel').style.display = mode === 'wizard' ? 'block' : 'none';
  if (mode === 'wizard') { estimationData.wizardStep = 1; renderWizardStep(); }
  if (mode === 'ai') { document.getElementById('estDocumentsSection').style.display = 'none'; resetLiveCostPanel(); }
}

function renderWizardStep() {
  var step = estimationData.wizardStep;
  var content = document.getElementById('wizardContent');
  var title = document.getElementById('wizardStepTitle');
  var indicator = document.getElementById('wizardStepIndicator');
  var progress = document.querySelectorAll('#wizardProgress .progress-step');
  var prevBtn = document.getElementById('wizardPrevBtn');
  var nextBtn = document.getElementById('wizardNextBtn');

  indicator.textContent = 'Step ' + step + ' of 3';
  progress.forEach(function(p, i) {
    p.className = 'progress-step' + (i + 1 <= step ? (i + 1 < step ? ' completed' : ' active') : '');
  });

  if (step === 1) {
    title.textContent = 'Step 1: Select Project Type';
    prevBtn.style.display = 'none';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerHTML = 'Next';
    var types = ['Website', 'Mobile App', 'ERP', 'CRM', 'Billing Software', 'E-Commerce', 'Digital Marketing', 'SEO', 'Custom Software'];
    var icons = {
      'Website': '<rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
      'Mobile App': '<rect x="4" y="2" width="16" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>',
      'ERP': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
      'CRM': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
      'Billing Software': '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><line x1="12" y1="11" x2="12" y2="17"/><polyline points="9 14 12 11 15 14"/>',
      'E-Commerce': '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
      'Digital Marketing': '<path d="M21 14.96A5 5 0 0 0 16 10H5a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1v4l4-4h6a5 5 0 0 0 5-4.96z"/><path d="M16 10V6a2 2 0 0 0-2-2H6"/>',
      'SEO': '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
      'Custom Software': '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    };
    content.innerHTML = '<div class="project-type-grid">' + types.map(function(t) {
      var sel = estimationData.projectType === t ? ' selected' : '';
      return '<div class="project-type-card' + sel + '" onclick="selectProjectType(\'' + t + '\')"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">' + (icons[t] || icons['Custom Software']) + '</svg><span>' + t + '</span></div>';
    }).join('') + '</div>';
    nextBtn.disabled = !estimationData.projectType;
    nextBtn.style.opacity = estimationData.projectType ? '1' : '.5';
  } else if (step === 2) {
    var pt = estimationData.projectType;
    var qs = wizardQuestions[pt] || [];
    title.textContent = 'Step 2: Project Specifications';
    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerHTML = 'Next';
    var html = '';
    qs.forEach(function(q) {
      var val = estimationData.selections[q.id] !== undefined ? estimationData.selections[q.id] : q.def;
      if (q.type === 'toggle') {
        var checked = val ? 'checked' : '';
        html += '<div class="wizard-option" onclick="var c=this.querySelector(\'input\');c.checked=!c.checked;this.classList.toggle(\'selected\',c.checked);updateWizardSelection(\'' + q.id + '\',c.checked)"><input type="checkbox" ' + checked + ' onchange="this.closest(\'.wizard-option\').classList.toggle(\'selected\',this.checked);updateWizardSelection(\'' + q.id + '\',this.checked)"><label>' + q.label + '</label></div>';
      } else if (q.type === 'number') {
        html += '<div class="form-group"><label>' + q.label + '</label><input type="number" id="wiz_' + q.id + '" value="' + (val || q.def || 0) + '" min="' + (q.min || 0) + '" onchange="updateWizardSelection(\'' + q.id + '\',parseInt(this.value)||0)" style="width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-size:14px;outline:none"></div>';
      } else if (q.type === 'select') {
        var opts = q.opts.map(function(o) {
          var sel2 = o === val ? 'selected' : '';
          return '<option value="' + o + '" ' + sel2 + '>' + o + '</option>';
        }).join('');
        html += '<div class="form-group"><label>' + q.label + '</label><select id="wiz_' + q.id + '" onchange="updateWizardSelection(\'' + q.id + '\',this.value)" style="width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-size:14px;outline:none">' + opts + '</select></div>';
      } else if (q.type === 'checkboxes') {
        var checkedArr = val || [];
        html += '<div class="form-group"><label>' + q.label + '</label><div class="checkbox-group">';
        q.opts.forEach(function(o) {
          var chk = checkedArr.indexOf(o) >= 0 ? 'checked' : '';
          html += '<label><input type="checkbox" value="' + o + '" ' + chk + ' onchange="updateWizardCheckboxes(\'' + q.id + '\')"><span>' + o + '</span></label>';
        });
        html += '</div></div>';
      } else if (q.type === 'textarea') {
        html += '<div class="form-group"><label>' + q.label + '</label><textarea id="wiz_' + q.id + '" rows="3" placeholder="' + (q.ph || '') + '" onchange="updateWizardSelection(\'' + q.id + '\',this.value)" style="width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-size:14px;outline:none;font-family:var(--font);resize:vertical">' + (val || '') + '</textarea></div>';
      }
    });
    content.innerHTML = html;
  } else if (step === 3) {
    title.textContent = 'Step 3: Infrastructure & Review';
    prevBtn.style.display = 'inline-block';
    nextBtn.style.display = 'inline-block';
    nextBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-right:6px"><polyline points="20 6 9 17 4 12"/></svg> Generate Estimate';
    var html = '';
    infrastructureQuestions.forEach(function(q) {
      var val = estimationData.selections[q.id] !== undefined ? estimationData.selections[q.id] : q.def;
      if (q.type === 'toggle') {
        var checked = val ? 'checked' : '';
        html += '<div class="wizard-option" onclick="var c=this.querySelector(\'input\');c.checked=!c.checked;this.classList.toggle(\'selected\',c.checked);updateWizardSelection(\'' + q.id + '\',c.checked);updateLiveCostPanel()"><input type="checkbox" ' + checked + ' onchange="this.closest(\'.wizard-option\').classList.toggle(\'selected\',this.checked);updateWizardSelection(\'' + q.id + '\',this.checked);updateLiveCostPanel()"><label>' + q.label + '</label></div>';
      } else if (q.type === 'select') {
        var opts = q.opts.map(function(o) {
          var sel2 = o === val ? 'selected' : '';
          return '<option value="' + o + '" ' + sel2 + '>' + o + '</option>';
        }).join('');
        html += '<div class="form-group"><label>' + q.label + '</label><select id="wiz_' + q.id + '" onchange="updateWizardSelection(\'' + q.id + '\',this.value);updateLiveCostPanel()" style="width:100%;padding:10px 14px;border:2px solid var(--border);border-radius:var(--radius-sm);font-size:14px;outline:none">' + opts + '</select></div>';
      }
    });
    html += '<div style="margin-top:16px;padding:16px;background:var(--primary-bg);border-radius:var(--radius-sm)"><div style="font-size:13px;font-weight:700;margin-bottom:8px">Summary</div>';
    html += '<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0"><span>Project Type</span><strong>' + estimationData.projectType + '</strong></div>';
    html += '<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0"><span>Project Name</span><strong>' + (estimationData.projectName || 'Untitled') + '</strong></div>';
    html += '<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0;border-top:1px solid var(--border);margin-top:4px;padding-top:8px"><span>Estimated Subtotal</span><strong>Rs ' + (estimationData.subtotal || 0).toLocaleString() + '</strong></div>';
    html += '<div style="display:flex;justify-content:space-between;font-size:13px;padding:4px 0"><span>Profit Margin (20%)</span><strong>Rs ' + (estimationData.profitAmount || 0).toLocaleString() + '</strong></div>';
    html += '<div style="display:flex;justify-content:space-between;font-size:16px;padding:8px 0 0;border-top:2px solid var(--primary);margin-top:4px;font-weight:800;color:var(--primary)"><span>Final Quotation</span><span>Rs ' + (estimationData.finalTotal || 0).toLocaleString() + '</span></div></div>';
    content.innerHTML = html;
    calculateCosts();
    updateLiveCostPanel();
  }
}

function selectProjectType(type) {
  estimationData.projectType = type;
  estimationData.selections = {};
  document.querySelectorAll('.project-type-card').forEach(function(c) {
    c.classList.toggle('selected', c.textContent.trim() === type);
  });
  var nextBtn = document.getElementById('wizardNextBtn');
  nextBtn.disabled = false;
  nextBtn.style.opacity = '1';
}

function updateWizardSelection(id, val) {
  estimationData.selections[id] = val;
}

function updateWizardCheckboxes(id) {
  var checks = document.querySelectorAll('#wizardContent input[type="checkbox"][value]');
  var vals = [];
  checks.forEach(function(c) { if (c.checked) vals.push(c.value); });
  estimationData.selections[id] = vals;
}

function nextWizardStep() {
  if (estimationData.wizardStep === 1 && !estimationData.projectType) { alert('Please select a project type.'); return; }
  if (estimationData.wizardStep === 2) {
    var pt = estimationData.projectType;
    var qs = wizardQuestions[pt] || [];
    qs.forEach(function(q) {
      if (q.type === 'number') {
        var el = document.getElementById('wiz_' + q.id);
        if (el) estimationData.selections[q.id] = parseInt(el.value) || q.def || 0;
      } else if (q.type === 'select') {
        var el = document.getElementById('wiz_' + q.id);
        if (el) estimationData.selections[q.id] = el.value;
      } else if (q.type === 'textarea') {
        var el = document.getElementById('wiz_' + q.id);
        if (el) estimationData.selections[q.id] = el.value;
      } else if (q.type === 'checkboxes') {
        updateWizardCheckboxes(q.id);
      }
    });
  }
  if (estimationData.wizardStep === 3) {
    calculateCosts();
    updateLiveCostPanel();
    showDocumentPreviews();
    document.getElementById('estDocumentsSection').style.display = 'block';
    estimationData.generatedDocs = true;
    return;
  }
  estimationData.wizardStep++;
  renderWizardStep();
}

function prevWizardStep() {
  if (estimationData.wizardStep > 1) { estimationData.wizardStep--; renderWizardStep(); }
}

function resetWizard() {
  estimationData.projectType = '';
  estimationData.wizardStep = 1;
  estimationData.selections = {};
  estimationData.costItems = [];
  estimationData.subtotal = 0;
  estimationData.finalTotal = 0;
  estimationData.generatedDocs = false;
  document.getElementById('estDocumentsSection').style.display = 'none';
  resetLiveCostPanel();
  renderWizardStep();
}

function analyzeAIRequirement() {
  var text = document.getElementById('aiRequirement').value.trim();
  var name = document.getElementById('estProjectName').value.trim() || 'Untitled Project';
  if (!text) { alert('Please describe your project requirements.'); return; }
  estimationData.projectName = name;
  var panel = document.getElementById('estAiPanel');
  var loadingDiv = document.createElement('div');
  loadingDiv.className = 'est-loading';
  loadingDiv.id = 'aiLoading';
  loadingDiv.innerHTML = '<div class="est-spinner"></div> AI is analyzing your requirements...';
  panel.querySelector('div[style*="padding"]').appendChild(loadingDiv);
  setTimeout(function() {
    var el = document.getElementById('aiLoading');
    if (el) el.remove();
    var result = simulateAIAnalysis(text);
    estimationData.projectType = result.projectType;
    estimationData.modules = result.modules;
    estimationData.timeline = result.timeline;
    estimationData.totalHours = result.totalHours;
    estimationData.selections = result.selections;
    calculateCosts();
    updateLiveCostPanel();
    showDocumentPreviews(result);
    document.getElementById('estDocumentsSection').style.display = 'block';
    estimationData.generatedDocs = true;
  }, 1500);
}

function simulateAIAnalysis(text) {
  var t = text.toLowerCase();
  var projectType = 'Website';
  if (/mobile|android|ios|app/i.test(t)) projectType = 'Mobile App';
  else if (/erp|enterprise|resource|planning/i.test(t)) projectType = 'ERP';
  else if (/crm|customer.*(relation|manage)/i.test(t)) projectType = 'CRM';
  else if (/billing|invoice|accounting/i.test(t)) projectType = 'Billing Software';
  else if (/shop|store|cart|ecommerce|e-com/i.test(t)) projectType = 'E-Commerce';
  else if (/marketing|social.*media|advert/i.test(t)) projectType = 'Digital Marketing';
  else if (/seo|search.*engine|rank/i.test(t)) projectType = 'SEO';
  else if (/custom|software|platform/i.test(t)) projectType = 'Custom Software';

  var modules = [];
  if (/login|auth|registration|sign.*(in|up)/i.test(t)) modules.push('User Authentication');
  if (/payment|pay|fees|billing|invoice/i.test(t)) modules.push('Payment Gateway');
  if (/email|mail|notification|alert/i.test(t)) modules.push('Email Notifications');
  if (/chat|messaging|support|ticket/i.test(t)) modules.push('Chat / Support System');
  if (/report|analytics|dashboard|insight/i.test(t)) modules.push('Analytics Dashboard');
  if (/sms|text.*msg/i.test(t)) modules.push('SMS Integration');
  if (/api|integration|third.?party/i.test(t)) modules.push('API Integration');
  if (/attendance|track|time/i.test(t)) modules.push('Attendance Tracking');
  if (/inventory|stock|warehouse/i.test(t)) modules.push('Inventory Management');
  if (/hr|human.*resource|payroll|employee/i.test(t)) modules.push('HR / Payroll');
  if (/student|school|class|course|learning/i.test(t)) modules.push('Education / LMS');
  if (/map|location|geo/i.test(t)) modules.push('Maps Integration');
  if (/social|feed|post|share/i.test(t)) modules.push('Social Features');
  if (/search|filter|catalog/i.test(t)) modules.push('Advanced Search / Filters');
  if (/multi.?lang|translate|i18n/i.test(t)) modules.push('Multi-language Support');
  if (modules.length === 0) modules.push('Core Functionality');

  var needs = { domain: /domain|website|online/i.test(t), hosting: /hosting|server|cloud|host/i.test(t), ssl: /ssl|secure|https/i.test(t), database: /database|data|storage|db/i.test(t) };

  var selections = {};
  var qs = wizardQuestions[projectType] || [];
  qs.forEach(function(q) {
    if (q.type === 'toggle') {
      if (q.id === 'paymentGateway') selections[q.id] = modules.indexOf('Payment Gateway') >= 0;
      else if (q.id === 'chat') selections[q.id] = modules.indexOf('Chat / Support System') >= 0;
      else if (q.id === 'analytics') selections[q.id] = modules.indexOf('Analytics Dashboard') >= 0;
      else if (q.id === 'multiLanguage') selections[q.id] = modules.indexOf('Multi-language Support') >= 0;
      else if (q.id === 'maps') selections[q.id] = modules.indexOf('Maps Integration') >= 0;
      else if (q.id === 'seo') selections[q.id] = /seo|search/i.test(t);
      else selections[q.id] = q.def;
    } else if (q.type === 'number') {
      selections[q.id] = q.def || 5;
    }
  });
  selections.domain = needs.domain;
  selections.hosting = needs.hosting ? 'Cloud' : 'Shared';
  selections.ssl = needs.ssl;
  selections.database = needs.database;

  var standardPhases = [
    { name: 'Planning & Requirement Analysis', days: 5 },
    { name: 'UI/UX Design', days: 7 },
    { name: 'Frontend Development', days: 12 },
    { name: 'Backend Development', days: 12 },
    { name: 'Testing & Quality Assurance', days: 5 },
    { name: 'Deployment & Launch', days: 3 },
  ];
  var totalDays = standardPhases.reduce(function(s, p) { return s + p.days; }, 0);
  var baseHoursMap = { 'Website': 120, 'Mobile App': 250, 'ERP': 400, 'CRM': 300, 'Billing Software': 200, 'E-Commerce': 220, 'Digital Marketing': 60, 'SEO': 50, 'Custom Software': 300 };
  var totalHours = baseHoursMap[projectType] || 150;
  modules.forEach(function() { totalHours += 15; });

  return { projectType: projectType, modules: modules, timeline: standardPhases, totalHours: totalHours, totalDays: totalDays, selections: selections };
}

function calculateCosts() {
  var pt = estimationData.projectType;
  var sel = estimationData.selections;
  var base = baseCostRates[pt] || 25000;
  var items = [];
  var totalDev = base;

  // Development breakdown
  var uiDesign = Math.round(base * 0.15);
  var frontend = Math.round(base * 0.35);
  var backend = Math.round(base * 0.30);
  var testing = Math.round(base * 0.10);
  var deployment = Math.round(base * 0.05);

  items.push({ cat: 'Development', label: 'UI / UX Design', amount: uiDesign });
  items.push({ cat: 'Development', label: 'Frontend Development', amount: frontend });
  items.push({ cat: 'Development', label: 'Backend Development', amount: backend });
  items.push({ cat: 'Development', label: 'Testing & QA', amount: testing });
  items.push({ cat: 'Development', label: 'Deployment', amount: deployment });

  // Page-based adjustments for Website
  if (pt === 'Website' && sel.pages) {
    var pageCost = (sel.pages - 1) * itemCosts.perPage;
    items.push({ cat: 'Development', label: 'Additional Pages (' + sel.pages + ')', amount: pageCost });
  }

  // Feature costs
  var featureItems = [];
  function addFeature(id, label, cost) {
    if (sel[id]) featureItems.push({ cat: 'Features', label: label, amount: cost });
  }
  addFeature('adminPanel', 'Admin Panel', itemCosts.adminPanel);
  addFeature('blog', 'Blog Section', itemCosts.blog);
  addFeature('contactForm', 'Contact Form', itemCosts.contactForm);
  addFeature('paymentGateway', 'Payment Gateway', itemCosts.paymentGateway);
  addFeature('seo', 'SEO Optimization', itemCosts.seoAddon);
  addFeature('multiLanguage', 'Multi-language', itemCosts.multiLanguage);
  addFeature('android', 'Android Development', itemCosts.android);
  addFeature('ios', 'iOS Development', itemCosts.ios);
  addFeature('pushNotifications', 'Push Notifications', itemCosts.pushNotifications);
  addFeature('maps', 'Maps Integration', itemCosts.maps);
  addFeature('chat', 'Chat System', itemCosts.chat);
  addFeature('videoUpload', 'Video Upload', itemCosts.videoUpload);
  addFeature('shippingIntegration', 'Shipping Integration', itemCosts.shippingIntegration);
  addFeature('contentCreation', 'Content Creation', itemCosts.contentCreation);
  addFeature('analytics', 'Analytics & Reporting', itemCosts.analytics);
  addFeature('contentStrategy', 'Content Strategy', itemCosts.contentStrategy);
  addFeature('technicalAudit', 'Technical SEO Audit', itemCosts.technicalAudit);
  addFeature('linkBuilding', 'Link Building', itemCosts.linkBuilding);
  addFeature('monthlyReporting', 'Monthly Reporting', itemCosts.monthlyReporting);

  // ERP/CRM/Billing modules
  if (sel.erpModules && sel.erpModules.length) {
    sel.erpModules.forEach(function(m) {
      featureItems.push({ cat: 'Features', label: 'ERP: ' + m, amount: itemCosts.erpModuleCost });
    });
  }
  if (sel.crmFeatures && sel.crmFeatures.length) {
    sel.crmFeatures.forEach(function(m) {
      featureItems.push({ cat: 'Features', label: 'CRM: ' + m, amount: itemCosts.crmFeatureCost });
    });
  }
  if (sel.billingFeatures && sel.billingFeatures.length) {
    sel.billingFeatures.forEach(function(m) {
      featureItems.push({ cat: 'Features', label: 'Billing: ' + m, amount: itemCosts.billingFeatureCost });
    });
  }
  if (sel.platforms && sel.platforms.length) {
    sel.platforms.forEach(function(p) {
      featureItems.push({ cat: 'Features', label: 'Platform: ' + p, amount: itemCosts.perPlatform });
    });
  }
  if (sel.usersCount && sel.usersCount > 0) {
    featureItems.push({ cat: 'Features', label: 'Per-User Licensing (' + sel.usersCount + ' users)', amount: sel.usersCount * itemCosts.perUser });
  }
  if (sel.keywordsCount) {
    featureItems.push({ cat: 'Features', label: 'Keyword Optimization (' + sel.keywordsCount + ' kw)', amount: sel.keywordsCount * itemCosts.perKeyword });
  }
  items = items.concat(featureItems);

  // Infrastructure
  var infraItems = [];
  if (sel.domain) infraItems.push({ cat: 'Infrastructure', label: 'Custom Domain (.com)', amount: itemCosts.domain });
  if (sel.hosting && sel.hosting !== 'None') infraItems.push({ cat: 'Infrastructure', label: 'Hosting (' + sel.hosting + ')', amount: itemCosts.hosting[sel.hosting] || 0 });
  if (sel.ssl) infraItems.push({ cat: 'Infrastructure', label: 'SSL Certificate', amount: itemCosts.ssl });
  if (sel.database) infraItems.push({ cat: 'Infrastructure', label: 'Database Setup', amount: itemCosts.database });
  items = items.concat(infraItems);

  var subtotal = items.reduce(function(s, i) { return s + i.amount; }, 0);
  var profitPct = 20;
  var profitAmt = Math.round(subtotal * profitPct / 100);
  var finalTotal = subtotal + profitAmt;

  estimationData.costItems = items;
  estimationData.subtotal = subtotal;
  estimationData.profitMarginPct = profitPct;
  estimationData.profitAmount = profitAmt;
  estimationData.finalTotal = finalTotal;
}

function updateLiveCostPanel() {
  var indicator = document.getElementById('liveCostIndicator');
  var content = document.getElementById('liveCostContent');
  var items = estimationData.costItems;
  if (!items || items.length === 0) {
    content.innerHTML = '<div style="text-align:center;padding:32px 0;color:var(--text-light)"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 12px;opacity:.4"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/></svg><div style="font-size:14px">Enter project details to see the cost breakdown</div></div>';
    indicator.textContent = 'Awaiting input...';
    return;
  }
  indicator.textContent = estimationData.projectName || 'Current estimate';

  var categories = {};
  items.forEach(function(i) {
    if (!categories[i.cat]) categories[i.cat] = [];
    categories[i.cat].push(i);
  });

  var html = '<div id="costCategoryList">';
  var catOrder = ['Infrastructure', 'Development', 'Features'];
  catOrder.forEach(function(cat) {
    if (!categories[cat]) return;
    html += '<div style="font-size:12px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.3px;padding:8px 0 4px;border-top:1px solid var(--border)">' + cat + '</div>';
    html += '<table class="cost-table"><tbody>';
    categories[cat].forEach(function(i) {
      html += '<tr><td style="font-size:13px">' + i.label + '</td><td style="font-size:13px">Rs ' + i.amount.toLocaleString() + '</td></tr>';
    });
    html += '</tbody></table>';
  });
  html += '</div>';

  var profitColor = estimationData.profitAmount > 0 ? 'var(--success)' : 'var(--danger)';

  html += '<table class="cost-table" style="margin-top:12px"><tbody>';
  html += '<tr><td style="font-weight:700;padding-top:12px;border-top:1px solid var(--border)">Subtotal</td><td style="font-weight:700;padding-top:12px;border-top:1px solid var(--border);color:var(--primary)">Rs ' + estimationData.subtotal.toLocaleString() + '</td></tr>';
  html += '<tr><td>Profit Margin (' + estimationData.profitMarginPct + '%)</td><td style="color:' + profitColor + '">Rs ' + estimationData.profitAmount.toLocaleString() + '</td></tr>';
  html += '<tr class="cost-total"><td>Final Quotation</td><td>Rs ' + estimationData.finalTotal.toLocaleString() + '</td></tr>';
  html += '</tbody></table>';

  var profitBarColor = estimationData.profitAmount >= 0 ? 'var(--success)' : 'var(--danger)';
  var profitBarIcon = estimationData.profitAmount >= 0 ? '<polyline points="20 6 9 17 4 12"/>' : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
  var profitBarText = estimationData.profitAmount >= 0 ? 'Profit of Rs ' + estimationData.profitAmount.toLocaleString() + ' included' : 'Loss detected! Review pricing';

  html += '<div id="profitStatusBar" style="margin-top:12px;padding:10px 14px;border-radius:var(--radius-sm);font-size:13px;font-weight:600;display:flex;align-items:center;gap:8px;background:' + profitBarColor.replace('var(--success)', 'rgba(16,185,129,.1)').replace('var(--danger)', 'rgba(239,68,68,.1)') + ';color:' + profitBarColor + '"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">' + profitBarIcon + '</svg> ' + profitBarText + '</div>';

  html += '<button class="btn btn-primary btn-lg" style="width:100%;justify-content:center;margin-top:16px" onclick="generateQuotation()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> Generate Quotation</button>';

  content.innerHTML = html;
}

function resetLiveCostPanel() {
  estimationData.costItems = [];
  estimationData.subtotal = 0;
  estimationData.finalTotal = 0;
  updateLiveCostPanel();
}

function showDocumentPreviews(result) {
  if (!result) {
    result = {
      projectType: estimationData.projectType,
      modules: estimationData.modules,
      timeline: estimationData.timeline,
      totalHours: estimationData.totalHours,
      selections: estimationData.selections,
    };
  }
  var quoteNum = 'Q-2026-' + String(Date.now()).slice(-4);
  var clientName = estimationData.projectName || 'Client';
  var projectType = result.projectType || estimationData.projectType;

  // Quotation tab
  var quotationHtml = '<div style="padding:4px 0">' +
    '<div style="display:flex;justify-content:space-between;margin-bottom:16px"><div><div style="font-size:11px;color:var(--text-light)">Quote Number</div><div style="font-size:18px;font-weight:800">' + quoteNum + '</div></div><div style="text-align:right"><div style="font-size:11px;color:var(--text-light)">Date</div><div style="font-size:14px;font-weight:600">' + new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) + '</div></div></div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;padding:16px;background:var(--gray-50);border-radius:var(--radius-sm);margin-bottom:16px">' +
    '<div><div style="font-size:11px;color:var(--text-light)">Client</div><div style="font-size:14px;font-weight:600">' + clientName + '</div></div>' +
    '<div><div style="font-size:11px;color:var(--text-light)">Project Type</div><div style="font-size:14px;font-weight:600">' + projectType + '</div></div>' +
    '<div><div style="font-size:11px;color:var(--text-light)">Total Amount</div><div style="font-size:20px;font-weight:800;color:var(--primary)">Rs ' + estimationData.finalTotal.toLocaleString() + '</div></div>' +
    '<div><div style="font-size:11px;color:var(--text-light)">Status</div><div><span class="status-badge status-draft">Draft</span></div></div>' +
    '</div>' +
    '<div style="font-size:13px;font-weight:700;color:var(--gray-600);margin-bottom:8px">Cost Summary</div>' +
    '<table class="cost-table"><tbody>' +
    '<tr><td>Estimated Subtotal</td><td>Rs ' + estimationData.subtotal.toLocaleString() + '</td></tr>' +
    '<tr><td>Profit Margin (' + estimationData.profitMarginPct + '%)</td><td>Rs ' + estimationData.profitAmount.toLocaleString() + '</td></tr>' +
    '<tr class="cost-total"><td>Grand Total</td><td>Rs ' + estimationData.finalTotal.toLocaleString() + '</td></tr>' +
    '</tbody></table></div>';
  document.getElementById('docQuotation').innerHTML = quotationHtml;

  // Proposal tab
  var techStack = projectType === 'Mobile App' ? 'React Native / Flutter, Node.js, MongoDB' : projectType === 'ERP' ? 'Java / .NET, PostgreSQL, React' : projectType === 'E-Commerce' ? 'React, Node.js, MySQL, Stripe' : 'HTML5, CSS3, JavaScript, React, Node.js, MongoDB';
  var modulesHtml = (result.modules || []).map(function(m) {
    return '<div style="display:flex;align-items:center;gap:8px;padding:4px 0;font-size:13px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> ' + m + '</div>';
  }).join('');

  var proposalHtml = '<div style="padding:4px 0">' +
    '<h4 style="font-size:15px;font-weight:700;margin-bottom:12px">Project Proposal</h4>' +
    '<div style="font-size:14px;margin-bottom:16px;line-height:1.6;color:var(--gray-700)">We are pleased to propose a comprehensive ' + projectType + ' solution for <strong>' + clientName + '</strong>. This proposal outlines the scope, deliverables, technology stack, and timeline for the project.</div>' +
    '<div style="font-size:13px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.3px;margin-bottom:8px">Modules</div>' + modulesHtml +
    '<div style="font-size:13px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.3px;margin-top:16px;margin-bottom:8px">Technology Stack</div>' +
    '<div style="font-size:13px;color:var(--gray-700);padding:8px 12px;background:var(--gray-50);border-radius:var(--radius-sm)">' + techStack + '</div>' +
    '<div style="font-size:13px;font-weight:700;color:var(--gray-600);text-transform:uppercase;letter-spacing:.3px;margin-top:16px;margin-bottom:8px">Terms</div>' +
    '<div style="font-size:13px;color:var(--gray-700)">• 50% advance payment to commence project<br>• 25% on mid-delivery review<br>• 25% on final delivery<br>• 1 year free maintenance included<br>• Source code ownership transferred</div>' +
    '</div>';
  document.getElementById('docProposal').innerHTML = proposalHtml;

  // Timeline tab
  var phases = result.timeline || estimationData.timeline || [
    { name: 'Planning & Analysis', days: 5 },
    { name: 'UI/UX Design', days: 7 },
    { name: 'Development', days: 12 },
    { name: 'Testing & QA', days: 5 },
    { name: 'Deployment', days: 3 },
  ];
  var maxDays = Math.max.apply(null, phases.map(function(p) { return p.days; }));
  var totalDays = phases.reduce(function(s, p) { return s + p.days; }, 0);
  var timelineHtml = '<div style="padding:4px 0">' +
    '<div style="display:flex;justify-content:space-between;margin-bottom:12px"><h4 style="font-size:15px;font-weight:700">Project Timeline</h4><span style="font-size:13px;color:var(--text-light)">Total: <strong>' + totalDays + ' days</strong></span></div>' +
    phases.map(function(p) {
      var pct = Math.round(p.days / maxDays * 100);
      return '<div class="phase-item"><div style="flex:1"><div style="font-size:14px;font-weight:600">' + p.name + '</div><div style="display:flex;align-items:center;gap:8px;margin-top:6px"><div class="phase-bar" style="width:' + pct + '%"></div><span class="phase-days">' + p.days + ' days</span></div></div></div>';
    }).join('') +
    '<div style="margin-top:16px;font-size:13px;color:var(--text-light)">Estimated effort: <strong>' + (result.totalHours || estimationData.totalHours || 150) + ' hours</strong></div>' +
    '</div>';
  document.getElementById('docTimeline').innerHTML = timelineHtml;
}

function switchDocTab(btn, tab) {
  document.querySelectorAll('.doc-tab').forEach(function(t) { t.classList.remove('active'); });
  btn.classList.add('active');
  ['docQuotation', 'docProposal', 'docTimeline'].forEach(function(id) {
    document.getElementById(id).style.display = id === 'doc' + tab.charAt(0).toUpperCase() + tab.slice(1) ? 'block' : 'none';
  });
}

function generateQuotation() {
  if (estimationData.finalTotal <= 0 && estimationData.subtotal <= 0) {
    alert('Please estimate the project cost first before generating a quotation.');
    return;
  }
  var quoteId = 'Q-2026-' + String(Date.now()).slice(-4);
  var pt = estimationData.projectType || 'Custom';
  var name = estimationData.projectName || 'Untitled Project';
  var amount = estimationData.finalTotal;
  sampleQuotes.unshift({
    id: quoteId,
    customer: name,
    project: pt,
    items: estimationData.costItems.length || 1,
    amount: amount,
    status: 'Draft',
    date: new Date().toISOString().slice(0, 10),
    approval: '\u2014',
  });
  renderQuotes();
  alert('Quotation ' + quoteId + ' generated successfully for Rs ' + amount.toLocaleString() + '! Navigate to Quotations page to view.');
  navigate('quotations');
}

// ============================================================
// PRODUCT MANAGEMENT
// ============================================================

var editingProductIndex = -1;

function openProductModal() {
  document.getElementById('productModal').classList.add('open');
  document.getElementById('productModalTitle').textContent = 'Add Product';
  editingProductIndex = -1;
  ['prodName', 'prodHSN', 'prodPrice', 'prodStock'].forEach(function(id) {
    document.getElementById(id).value = '';
  });
  document.getElementById('prodCategory').value = 'Web Development';
  document.getElementById('prodGST').value = '18';
  document.getElementById('prodStatus').value = 'active';
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('open');
}

function saveProduct() {
  var name = document.getElementById('prodName').value.trim();
  if (!name) { alert('Please enter a product name.'); return; }
  var product = {
    name: name,
    category: document.getElementById('prodCategory').value,
    hsn: document.getElementById('prodHSN').value || '9983',
    price: parseInt(document.getElementById('prodPrice').value) || 0,
    gst: parseInt(document.getElementById('prodGST').value) || 18,
    stock: parseInt(document.getElementById('prodStock').value) || 0,
    status: document.getElementById('prodStatus').value,
  };
  if (editingProductIndex >= 0) {
    sampleProducts[editingProductIndex] = product;
  } else {
    sampleProducts.push(product);
  }
  closeProductModal();
  renderProducts();
}

function switchProductTab(el, tab) {
  document.querySelectorAll('#page-products .tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  renderProducts();
}

function getActiveProductTab() {
  var active = document.querySelector('#page-products .tab.active');
  return active ? active.textContent.trim().toLowerCase() : 'products';
}

function renderProducts() {
  var tbody = document.getElementById('productList');
  if (!tbody) return;
  var filter = getActiveProductTab();
  var filtered = sampleProducts.filter(function(p) {
    return p.category.toLowerCase() === filter;
  });
  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:40px;color:var(--text-light)">No ' + filter + ' found.</td></tr>';
    return;
  }
  tbody.innerHTML = filtered.map(function(p, idx) {
    var idx2 = sampleProducts.indexOf(p);
    var statusClass = p.status === 'active' ? 'status-accepted' : 'status-draft';
    return '<tr>' +
      '<td><strong>' + p.name + '</strong></td>' +
      '<td>' + p.category + '</td>' +
      '<td>' + p.hsn + '</td>' +
      '<td>Rs ' + p.price.toLocaleString() + '</td>' +
      '<td>' + p.gst + '%</td>' +
      '<td>' + (p.stock || '\u2014') + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + p.status + '</span></td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="editProduct(' + idx2 + ')">Edit</button></td>' +
      '</tr>';
  }).join('');
}

function editProduct(idx) {
  var p = sampleProducts[idx];
  if (!p) return;
  editingProductIndex = idx;
  document.getElementById('productModalTitle').textContent = 'Edit Product';
  document.getElementById('prodName').value = p.name;
  document.getElementById('prodCategory').value = p.category;
  document.getElementById('prodHSN').value = p.hsn;
  document.getElementById('prodPrice').value = p.price;
  document.getElementById('prodGST').value = p.gst;
  document.getElementById('prodStock').value = p.stock;
  document.getElementById('prodStatus').value = p.status;
  document.getElementById('productModal').classList.add('open');
}

// ============================================================
// QUOTATIONS
// ============================================================

var quoteFilterStatus = 'all';
var quoteSearchTerm = '';

function initSearchQuote() {
  var input = document.querySelector('#page-quotations input[placeholder*="Search"]');
  if (input) {
    input.addEventListener('input', function() {
      quoteSearchTerm = this.value.toLowerCase();
      renderQuotes();
    });
  }
}

function initQuoteFilters() {
  var filterBtn = document.querySelector('#page-quotations .btn-outline');
  if (filterBtn) {
    filterBtn.addEventListener('click', function() {
      var statuses = ['all', 'Draft', 'Sent', 'Viewed', 'Accepted', 'Rejected'];
      var currentIdx = statuses.indexOf(quoteFilterStatus);
      quoteFilterStatus = statuses[(currentIdx + 1) % statuses.length];
      filterBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 22 15 16 15 16 21 2 21 2 3"/></svg> ' + quoteFilterStatus;
      renderQuotes();
    });
  }
}

function renderQuotes() {
  var tbody = document.getElementById('quoteList');
  if (!tbody) return;

  var filtered = sampleQuotes.filter(function(q) {
    if (quoteFilterStatus !== 'all' && q.status !== quoteFilterStatus) return false;
    if (quoteSearchTerm) {
      var match = q.id.toLowerCase().indexOf(quoteSearchTerm) >= 0 ||
                  q.customer.toLowerCase().indexOf(quoteSearchTerm) >= 0 ||
                  q.project.toLowerCase().indexOf(quoteSearchTerm) >= 0;
      if (!match) return false;
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="9" style="text-align:center;padding:40px;color:var(--text-light)">No quotations match your criteria.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(function(q) {
    var statusClass = q.status === 'Accepted' ? 'status-accepted' : q.status === 'Sent' ? 'status-sent' : q.status === 'Viewed' ? 'status-sent' : q.status === 'Draft' ? 'status-draft' : 'status-rejected';
    var approvalLabel = q.approval === 'Approved' ? 'status-accepted' : q.approval === 'Denied' ? 'status-rejected' : q.approval === 'Pending' ? 'status-sent' : 'status-draft';
    return '<tr>' +
      '<td><strong>' + q.id + '</strong></td>' +
      '<td>' + q.customer + '</td>' +
      '<td>' + q.project + '</td>' +
      '<td>' + q.items + '</td>' +
      '<td><strong>Rs ' + q.amount.toLocaleString() + '</strong></td>' +
      '<td><span class="status-badge ' + statusClass + '">' + q.status + '</span></td>' +
      '<td><span class="status-badge ' + approvalLabel + '">' + q.approval + '</span></td>' +
      '<td>' + q.date + '</td>' +
      '<td style="display:flex;gap:4px">' +
        '<button class="btn btn-sm btn-outline" style="padding:4px 8px;font-size:11px" onclick="alert(\'Downloading PDF for ' + q.id + '\')">PDF</button>' +
        '<button class="btn btn-sm btn-outline" style="padding:4px 8px;font-size:11px" onclick="alert(\'Sharing ' + q.id + ' via WhatsApp\')">Share</button>' +
        (q.status !== 'Accepted' && q.status !== 'Rejected' ? '<button class="btn btn-sm btn-outline" style="padding:4px 8px;font-size:11px;color:var(--success)" onclick="approveQuote(\'' + q.id + '\')">Approve</button>' : '') +
      '</td>' +
      '</tr>';
  }).join('');
}

function approveQuote(id) {
  var idx = sampleQuotes.findIndex(function(q) { return q.id === id; });
  if (idx >= 0) {
    sampleQuotes[idx].status = 'Accepted';
    sampleQuotes[idx].approval = 'Approved';
    renderQuotes();
    alert('Quotation ' + id + ' has been approved!');
  }
}

function showNewQuote() {
  navigate('estimation');
}

// ============================================================
// INVOICES
// ============================================================

function renderInvoices() {
  var tbody = document.getElementById('invoiceList');
  if (!tbody) return;
  tbody.innerHTML = sampleInvoices.map(function(i) {
    var statusClass = i.status === 'Paid' ? 'status-paid' : i.status === 'Partial' ? 'status-partial' : i.status === 'Overdue' ? 'status-overdue' : 'status-draft';
    var typeLabel = i.type === 'GST' ? 'GST' : i.type === 'Tax' ? 'Tax' : 'Proforma';
    return '<tr>' +
      '<td><strong>' + i.id + '</strong></td>' +
      '<td>' + typeLabel + '</td>' +
      '<td>' + i.customer + '</td>' +
      '<td>Rs ' + i.amount.toLocaleString() + '</td>' +
      '<td>Rs ' + i.paid.toLocaleString() + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + i.status + '</span></td>' +
      '<td>' + i.due + '</td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert(\'Generate QR for ' + i.id + '\')">QR</button></td>' +
      '</tr>';
  }).join('');
}

// ============================================================
// RECEIPTS
// ============================================================

function renderReceipts() {
  var tbody = document.getElementById('receiptList');
  if (!tbody) return;
  tbody.innerHTML = sampleReceipts.map(function(r) {
    var statusClass = r.status === 'Cleared' ? 'status-paid' : 'status-sent';
    return '<tr>' +
      '<td><strong>' + r.id + '</strong></td>' +
      '<td>' + r.customer + '</td>' +
      '<td>Rs ' + r.amount.toLocaleString() + '</td>' +
      '<td>' + r.mode + '</td>' +
      '<td>' + r.date + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + r.status + '</span></td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert(\'Downloading ' + r.id + '\')">Download</button></td>' +
      '</tr>';
  }).join('');
}

// ============================================================
// CUSTOMERS
// ============================================================

function renderCustomers() {
  var tbody = document.getElementById('customerList');
  if (!tbody) return;
  tbody.innerHTML = sampleCustomers.map(function(c) {
    var scoreColor = c.credit >= 70 ? 'var(--success)' : c.credit >= 40 ? 'var(--accent)' : '#ef4444';
    return '<tr>' +
      '<td><strong>' + c.name + '</strong></td>' +
      '<td>' + c.company + '</td>' +
      '<td>' + c.phone + '</td>' +
      '<td>' + c.gst + '</td>' +
      '<td><span style="font-weight:700;color:' + scoreColor + '">' + c.credit + '</span></td>' +
      '<td>Rs ' + c.spent.toLocaleString() + '</td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px">View</button></td>' +
      '</tr>';
  }).join('');
}

// ============================================================
// CRM
// ============================================================

function switchCRMTab(el, tab) {
  document.querySelectorAll('#page-crm .tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  document.getElementById('crmLeads').style.display = tab === 'leads' ? 'block' : 'none';
  document.getElementById('crmDeals').style.display = tab === 'deals' ? 'block' : 'none';
}

function renderLeads() {
  var tbody = document.getElementById('leadList');
  if (!tbody) return;

  var stats = { new: 0, active: 0, converted: 0, lost: 0 };
  sampleLeads.forEach(function(l) {
    if (l.status === 'New') stats.new++;
    else if (l.status === 'Active') stats.active++;
    else if (l.status === 'Converted') stats.converted++;
    else if (l.status === 'Lost') stats.lost++;
  });

  var statCards = document.querySelectorAll('#crmLeads .stat-card .stat-value');
  if (statCards.length >= 4) {
    statCards[0].textContent = stats.new;
    statCards[1].textContent = stats.active;
    statCards[2].textContent = stats.converted;
    statCards[3].textContent = stats.lost;
  }

  tbody.innerHTML = sampleLeads.map(function(l) {
    var statusClass = l.status === 'New' ? 'status-draft' : l.status === 'Active' ? 'status-sent' : l.status === 'Converted' ? 'status-accepted' : 'status-rejected';
    return '<tr>' +
      '<td><strong>' + l.name + '</strong></td>' +
      '<td>' + l.source + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + l.status + '</span></td>' +
      '<td>' + l.assigned + '</td>' +
      '<td>' + l.created + '</td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px">View</button></td>' +
      '</tr>';
  }).join('');
}

function renderPipeline() {
  var container = document.querySelector('#crmDeals .kanban-board');
  if (!container) return;

  container.innerHTML = pipelineStages.map(function(stage) {
    var deals = sampleDeals.filter(function(d) { return d.stage === stage; });
    var isWon = stage === 'Closed Won';
    var isLost = stage === 'Closed Lost';
    var headerColor = isWon ? 'var(--success)' : isLost ? 'var(--danger)' : 'inherit';

    return '<div class="kanban-column">' +
      '<div class="kanban-header" style="color:' + headerColor + '">' + stage + ' <span class="kanban-count">' + deals.length + '</span></div>' +
      '<div class="kanban-list">' +
        deals.map(function(d) {
          var cardStyle = isWon ? 'border-left:3px solid var(--success)' : isLost ? 'border-left:3px solid var(--danger);opacity:.6' : '';
          return '<div class="deal-card" style="' + cardStyle + '" draggable="true" data-deal-id="' + d.id + '" ondragstart="dragDeal(event)" ondblclick="moveDealStage(' + d.id + ')">' +
            '<div class="deal-name">' + d.name + '</div>' +
            '<div class="deal-amount">Rs ' + d.amount.toLocaleString() + '</div>' +
            '<div class="deal-meta"><span>Close: ' + d.closeDate + '</span><span class="deal-prob ' + d.probClass + '">' + d.prob + '%</span></div>' +
          '</div>';
        }).join('') +
      '</div>' +
    '</div>';
  }).join('');

  // Add drop handlers
  container.querySelectorAll('.kanban-list').forEach(function(list) {
    list.addEventListener('dragover', function(e) { e.preventDefault(); });
    list.addEventListener('drop', function(e) {
      e.preventDefault();
      var dealId = parseInt(e.dataTransfer.getData('text/plain'));
      var columnHeader = this.closest('.kanban-column').querySelector('.kanban-header');
      if (columnHeader) {
        var stageName = columnHeader.textContent.trim().replace(/\d+$/, '').trim();
        if (stageName && pipelineStages.indexOf(stageName) >= 0) {
          moveDealStage(dealId, stageName);
        }
      }
    });
  });
}

function dragDeal(e) {
  e.dataTransfer.setData('text/plain', e.target.closest('.deal-card').getAttribute('data-deal-id'));
}

function moveDealStage(dealId, newStage) {
  var deal = sampleDeals.find(function(d) { return d.id === dealId; });
  if (!deal) return;

  if (newStage) {
    if (pipelineStages.indexOf(newStage) < 0) return;
    deal.stage = newStage;
  } else {
    var currentIdx = pipelineStages.indexOf(deal.stage);
    if (currentIdx < pipelineStages.length - 1) {
      deal.stage = pipelineStages[currentIdx + 1];
    }
  }

  if (deal.stage === 'Closed Won') {
    deal.prob = 100;
    deal.probClass = 'high';
  } else if (deal.stage === 'Closed Lost') {
    deal.prob = 0;
    deal.probClass = 'low';
  }

  renderPipeline();
}

// ============================================================
// MARKETING
// ============================================================

function renderCampaigns() {
  var tbody = document.getElementById('campaignList');
  if (!tbody) return;

  // Update stats
  var totalReach = sampleCampaigns.reduce(function(sum, c) {
    return c.type === 'WhatsApp' || c.type === 'Email' ? sum + c.sent : sum;
  }, 0);
  var statValues = document.querySelectorAll('#page-marketing .stat-card .stat-value');
  if (statValues.length >= 2) {
    statValues[1].textContent = totalReach.toLocaleString();
  }

  tbody.innerHTML = sampleCampaigns.map(function(c) {
    var statusClass = c.status === 'Sent' ? 'status-accepted' : c.status === 'Scheduled' ? 'status-sent' : 'status-draft';
    var typeIcon = c.type === 'WhatsApp' ? '\uD83D\uDCAC' : c.type === 'Email' ? '\u2709\uFE0F' : '\uD83C\uDF86';
    return '<tr>' +
      '<td><strong>' + c.name + '</strong></td>' +
      '<td>' + typeIcon + ' ' + c.type + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + c.status + '</span></td>' +
      '<td>' + c.recipients.toLocaleString() + '</td>' +
      '<td>' + c.sent.toLocaleString() + '</td>' +
      '<td>' + c.date + '</td>' +
      '<td style="display:flex;gap:4px">' +
        '<button class="btn btn-sm btn-outline" style="padding:4px 8px;font-size:11px" onclick="alert(\'Sending campaign: ' + c.name + '\')">Send</button>' +
        '<button class="btn btn-sm btn-outline" style="padding:4px 8px;font-size:11px" onclick="alert(\'Viewing analytics for ' + c.name + '\')">Analytics</button>' +
      '</td>' +
      '</tr>';
  }).join('');
}

// ============================================================
// FINANCE
// ============================================================

function switchFinanceTab(el, tab) {
  document.querySelectorAll('#page-finance .tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  ['financeOverview', 'financeIncome', 'financeExpenses', 'financeGST'].forEach(function(id) {
    document.getElementById(id).style.display = id === ('finance' + tab.charAt(0).toUpperCase() + tab.slice(1)) ? 'block' : 'none';
  });
}

function renderFinance() {
  renderIncome();
  renderExpenses();
  renderFinanceOverview();
  renderGSTReports();
}

function renderIncome() {
  var tbody = document.querySelector('#financeIncome tbody');
  if (!tbody) return;
  tbody.innerHTML = sampleIncome.map(function(i) {
    return '<tr>' +
      '<td><strong>' + i.customer + '</strong></td>' +
      '<td>' + i.desc + '</td>' +
      '<td><strong>Rs ' + i.amount.toLocaleString() + '</strong></td>' +
      '<td>' + i.date + '</td>' +
      '<td>' + i.mode + '</td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert(\'Edit income entry\')">Edit</button></td>' +
      '</tr>';
  }).join('');
}

function renderExpenses() {
  var tbody = document.querySelector('#financeExpenses tbody');
  if (!tbody) return;
  tbody.innerHTML = sampleExpenses.map(function(e) {
    return '<tr>' +
      '<td><strong>' + e.category + '</strong></td>' +
      '<td>' + e.desc + '</td>' +
      '<td><strong>Rs ' + e.amount.toLocaleString() + '</strong></td>' +
      '<td>' + e.date + '</td>' +
      '<td>' + e.mode + '</td>' +
      '<td><button class="btn btn-sm btn-outline" style="padding:4px 10px;font-size:12px" onclick="alert(\'Edit expense entry\')">Edit</button></td>' +
      '</tr>';
  }).join('');
}

function renderFinanceOverview() {
  var totalIncome = sampleIncome.reduce(function(s, i) { return s + i.amount; }, 0);
  var totalExpenses = sampleExpenses.reduce(function(s, e) { return s + e.amount; }, 0);
  var netProfit = totalIncome - totalExpenses;
  var profitMargin = totalIncome > 0 ? Math.round((netProfit / totalIncome) * 10000) / 100 : 0;

  // Calculate COGS, Operating Exp, Taxes
  var cogs = 560000;
  var operatingExp = 438000;
  var taxes = 130000;

  // Update stat cards
  var finStats = document.querySelectorAll('#financeOverview .stat-card .stat-value');
  if (finStats.length >= 4) {
    finStats[0].textContent = 'Rs ' + totalIncome.toLocaleString();
    finStats[1].textContent = 'Rs ' + totalExpenses.toLocaleString();
    finStats[2].textContent = 'Rs ' + netProfit.toLocaleString();
    finStats[3].textContent = profitMargin + '%';
  }

  // Update P&L summary
  var plItems = document.querySelectorAll('#financeOverview [class*="card"]:last-child [style*="padding:16px 20px"] > div');
  // Done via the existing HTML static values for now
}

function renderGSTReports() {
  // Calculate GST from sampleInvoice data
  var totalGstAmount = sampleInvoices.reduce(function(s, i) { return s + i.amount; }, 0);
  var cgst = Math.round(totalGstAmount * 0.09);
  var sgst = Math.round(totalGstAmount * 0.09);
  var igst = Math.round(totalGstAmount * 0.05); // Some IGST
  var totalGst = cgst + sgst + igst;

  var gstStats = document.querySelectorAll('#financeGST .stat-card .stat-value');
  if (gstStats.length >= 4) {
    gstStats[0].textContent = 'Rs ' + cgst.toLocaleString();
    gstStats[1].textContent = 'Rs ' + sgst.toLocaleString();
    gstStats[2].textContent = 'Rs ' + igst.toLocaleString();
    gstStats[3].textContent = 'Rs ' + totalGst.toLocaleString();
  }

  // GST returns table
  var gstTbody = document.querySelector('#financeGST .card:last-child tbody');
  if (gstTbody) {
    gstTbody.innerHTML = [
      { period: 'Apr 2026', cgst: 28500, sgst: 28500, igst: 9800, total: 66800, filed: '15 May 2026', status: 'Filed' },
      { period: 'May 2026', cgst: 32400, sgst: 32400, igst: 11200, total: 76000, filed: '14 Jun 2026', status: 'Filed' },
      { period: 'Jun 2026', cgst: 21800, sgst: 21800, igst: 7600, total: 51200, filed: '\u2014', status: 'Pending' },
    ].map(function(r) {
      var statusClass = r.status === 'Filed' ? 'status-accepted' : 'status-draft';
      return '<tr><td>' + r.period + '</td><td>Rs ' + r.cgst.toLocaleString() + '</td><td>Rs ' + r.sgst.toLocaleString() + '</td><td>Rs ' + r.igst.toLocaleString() + '</td><td><strong>Rs ' + r.total.toLocaleString() + '</strong></td><td>' + r.filed + '</td><td><span class="status-badge ' + statusClass + '">' + r.status + '</span></td></tr>';
    }).join('');
  }
}

// ============================================================
// NOTIFICATIONS
// ============================================================

var notifFilter = 'all';

function renderNotifications() {
  var container = document.getElementById('notificationList');
  if (!container) return;

  var filtered = sampleNotifications.filter(function(n) {
    return notifFilter === 'all' || n.type === notifFilter;
  });

  var unreadCount = sampleNotifications.filter(function(n) { return n.unread; }).length;

  // Update notification bell badge
  var syncStatus = document.getElementById('syncStatus');
  if (syncStatus) {
    syncStatus.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg> ' + unreadCount + ' unread';
  }

  container.innerHTML = filtered.map(function(n) {
    var iconTypes = {
      'info': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
      'success': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
      'warning': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
      'danger': '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
    };

    return '<div class="notif-card' + (n.unread ? ' unread' : '') + '" data-type="' + n.type + '">' +
      '<div class="notif-icon ' + n.icon + '">' + (iconTypes[n.type] || iconTypes.info) + '</div>' +
      '<div class="notif-content" onclick="markNotifRead(' + n.id + ')">' +
        '<div class="notif-title">' + n.title + '</div>' +
        '<div class="notif-message">' + n.message + '</div>' +
      '</div>' +
      '<div><div class="notif-time">' + n.time + '</div></div>' +
    '</div>';
  }).join('');
}

function markNotifRead(id) {
  var n = sampleNotifications.find(function(x) { return x.id === id; });
  if (n) n.unread = false;
  renderNotifications();
}

function markAllNotifRead() {
  sampleNotifications.forEach(function(n) { n.unread = false; });
  renderNotifications();
}

function filterNotif(el, type) {
  document.querySelectorAll('#page-notifications .tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  notifFilter = type;
  renderNotifications();
}

// ============================================================
// ADMIN
// ============================================================

function switchAdminTab(el, tab) {
  document.querySelectorAll('#page-admin .tab').forEach(function(t) { t.classList.remove('active'); });
  el.classList.add('active');
  var map = { users: 'adminUsers', subscriptions: 'adminSubscriptions', audit: 'adminAudit' };
  ['adminUsers', 'adminSubscriptions', 'adminAudit'].forEach(function(id) {
    document.getElementById(id).style.display = id === map[tab] ? 'block' : 'none';
  });
}

function renderAdmin() {
  renderUsers();
  renderAuditLogs();
}

function renderUsers() {
  var tbody = document.querySelector('#adminUsers tbody');
  if (!tbody) return;

  tbody.innerHTML = sampleUsers.map(function(u) {
    var roleClass = u.role === 'Admin' ? 'status-sent' : u.role === 'Manager' ? 'status-accepted' : 'status-draft';
    var statusClass = u.status === 'Active' ? 'status-paid' : 'status-partial';
    return '<tr>' +
      '<td><div style="display:flex;align-items:center;gap:10px"><div class="sidebar-avatar" style="width:32px;height:32px;font-size:11px;background:' + u.bg + '">' + u.avatar + '</div><span style="font-weight:600">' + u.name + '</span></div></td>' +
      '<td>' + u.email + '</td>' +
      '<td><span class="status-badge ' + roleClass + '">' + u.role + '</span></td>' +
      '<td><span class="status-badge ' + statusClass + '">' + u.status + '</span></td>' +
      '<td>' + u.lastActive + '</td>' +
      '<td><span style="color:var(--primary);font-size:13px;cursor:pointer">Edit</span></td>' +
      '</tr>';
  }).join('');
}

function renderAuditLogs() {
  var tbody = document.querySelector('#adminAudit tbody');
  if (!tbody) return;

  tbody.innerHTML = sampleAuditLogs.map(function(a) {
    return '<tr>' +
      '<td>' + a.user + '</td>' +
      '<td>' + a.action + '</td>' +
      '<td>' + a.entity + '</td>' +
      '<td>' + a.details + '</td>' +
      '<td>' + a.ts + '</td>' +
      '</tr>';
  }).join('');
}

// ============================================================
// DOCUMENTS
// ============================================================

function renderDocuments() {
  var container = document.querySelector('#page-documents .page-header + div');
  if (!container) return;

  var categories = {};
  sampleDocuments.forEach(function(d) {
    if (!categories[d.category]) categories[d.category] = [];
    categories[d.category].push(d);
  });

  var categoryIcons = {
    'Quotations': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>',
    'Invoices': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
    'Receipts': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><rect x="8" y="12" width="8" height="4" rx="1"/>',
    'Projects': '<path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>',
    'Uploads': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
  };

  var colors = {
    'Quotations': 'var(--primary)',
    'Invoices': 'var(--success)',
    'Receipts': 'var(--accent)',
    'Projects': 'var(--warning)',
    'Uploads': 'var(--danger)',
  };

  var html = Object.keys(categories).map(function(cat) {
    var icon = categoryIcons[cat] || categoryIcons['Uploads'];
    var color = colors[cat] || 'var(--text-light)';
    var fileCount = categories[cat].length;
    return '<div class="card" style="padding:24px;text-align:center;cursor:pointer" onclick="alert(\'Opening ' + cat + ' documents\')">' +
      '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 12px;color:' + color + '">' + icon + '</svg>' +
      '<h4 style="font-size:13px;font-weight:600">' + cat + '</h4>' +
      '<p style="font-size:11px;color:var(--text-light);margin-top:4px">' + fileCount + ' files</p>' +
    '</div>';
  }).join('');

  // Add Upload New card
  html += '<div class="card" style="padding:24px;text-align:center;cursor:pointer;border:2px dashed var(--border);background:none" onclick="documentUpload()">' +
    '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="margin:0 auto 12px;color:var(--text-light)"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>' +
    '<h4 style="font-size:13px;font-weight:600;color:var(--text-light)">Upload New</h4>' +
  '</div>';

  container.innerHTML = html;
}

function documentUpload() {
  var input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.onchange = function() {
    var count = input.files.length;
    alert(count + ' file(s) selected for upload. (Mock upload)');
  };
  input.click();
}

// ============================================================
// DASHBOARD
// ============================================================

function loadDashboard() {
  // Stats
  var totalQuotes = sampleQuotes.length;
  var totalInvoices = sampleInvoices.length;
  var activeCustomers = sampleCustomers.length;
  var totalRevenue = sampleQuotes.filter(function(q) { return q.status === 'Accepted'; })
    .reduce(function(s, q) { return s + q.amount; }, 0);

  setText('statQuotes', totalQuotes);
  setText('statInvoices', totalInvoices);
  setText('statActiveCustomers', activeCustomers);

  var statRevenue = document.querySelector('#page-dashboard .stat-card:nth-child(3) .stat-value');
  if (statRevenue) statRevenue.textContent = 'Rs ' + totalRevenue.toLocaleString();

  // Recent quotations
  var tbody = document.getElementById('recentQuotes');
  if (tbody) {
    tbody.innerHTML = sampleQuotes.slice(0, 4).map(function(q) {
      var statusClass = q.status === 'Accepted' ? 'status-accepted' : q.status === 'Sent' ? 'status-sent' : q.status === 'Viewed' ? 'status-sent' : q.status === 'Draft' ? 'status-draft' : 'status-rejected';
      return '<tr><td>' + q.id + '</td><td>' + q.customer + '</td><td>Rs ' + q.amount.toLocaleString() + '</td><td><span class="status-badge ' + statusClass + '">' + q.status + '</span></td><td>' + q.date + '</td></tr>';
    }).join('');
  }
}

// ============================================================
// LOAD ALL SAMPLE DATA
// ============================================================

function loadAllSampleData() {
  renderQuotes();
  renderInvoices();
  renderReceipts();
  renderCustomers();
  renderProducts();
  renderLeads();
  renderPipeline();
  renderCampaigns();
  renderFinance();
  renderNotifications();
  renderAdmin();
  renderDocuments();
  loadDashboard();
}

// ============================================================
// UTILITY HELPERS
// ============================================================

function setText(id, val) {
  var el = document.getElementById(id);
  if (el) el.textContent = typeof val === 'number' ? val.toLocaleString() : val;
}

function show(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'block';
}

function hide(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

function showEl(id) {
  var el = document.getElementById(id);
  if (el) el.style.display = 'flex';
}

// ============================================================
// KEYBOARD SHORTCUT
// ============================================================

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeProductModal();
  }
});
