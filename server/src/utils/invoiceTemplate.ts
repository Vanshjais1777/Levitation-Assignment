// invoiceTemplate.js

const createInvoiceTemplate = (data: any) => {
    // You can customize all the HTML and CSS here
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Invoice</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            color: #333;
          }
  
          .invoice-header {
            text-align: center;
            margin-bottom: 40px;
            border-bottom: 2px solid #eee;
            padding-bottom: 20px;
          }
  
          .invoice-title {
            font-size: 28px;
            color: #2c3e50;
            margin-bottom: 15px;
          }
  
          .company-details {
            margin-bottom: 30px;
          }
  
          .invoice-meta {
            margin: 20px 0;
            display: flex;
            justify-content: space-between;
          }
  
          .invoice-table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
  
          .invoice-table th {
            background-color: #f8f9fa;
            border-bottom: 2px solid #ddd;
            padding: 12px 8px;
            text-align: left;
          }
  
          .invoice-table td {
            padding: 12px 8px;
            border-bottom: 1px solid #eee;
          }
  
          .invoice-table tr:last-child td {
            border-bottom: none;
          }
  
          .totals-section {
            margin-top: 30px;
            border-top: 2px solid #eee;
            padding-top: 20px;
          }
  
          .totals-row {
            display: flex;
            justify-content: flex-end;
            margin: 8px 0;
          }
  
          .totals-label {
            width: 150px;
            text-align: right;
            margin-right: 20px;
          }
  
          .totals-value {
            width: 150px;
            text-align: right;
          }
  
          .grand-total {
            font-weight: bold;
            font-size: 1.2em;
            border-top: 2px solid #333;
            margin-top: 10px;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="invoice-header">
          <div class="invoice-title">INVOICE</div>
          <div class="company-details">
            Your Company Name<br>
            Address Line 1<br>
            City, State, ZIP<br>
            Phone: (123) 456-7890
          </div>
        </div>
  
        <div class="invoice-meta">
          <div>
            <strong>Invoice To:</strong><br>
            ${data.customerName || 'Customer Name'}<br>
            ${data.customerAddress || 'Customer Address'}<br>
          </div>
          <div>
            <strong>Invoice Number:</strong> ${data.invoiceNumber}<br>
            <strong>Date:</strong> ${data.date}<br>
            <strong>Due Date:</strong> ${data.dueDate || 'N/A'}<br>
          </div>
        </div>
  
        <table class="invoice-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${data.items.map((item: any) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td>₹${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
  
        <div class="totals-section">
          <div class="totals-row">
            <div class="totals-label">Subtotal:</div>
            <div class="totals-value">₹${data.subtotal.toFixed(2)}</div>
          </div>
          <div class="totals-row">
            <div class="totals-label">GST (18%):</div>
            <div class="totals-value">₹${data.gst.toFixed(2)}</div>
          </div>
          <div class="totals-row grand-total">
            <div class="totals-label">Total:</div>
            <div class="totals-value">₹${data.total.toFixed(2)}</div>
          </div>
        </div>
      </body>
      </html>
    `;
  };
  
  // Example of how to use the template
  const exampleData = {
    customerName: "John Doe",
    customerAddress: "123 Main St, City, State",
    invoiceNumber: "INV-001",
    date: new Date().toLocaleDateString(),
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    items: [
      { name: "Product 1", quantity: 2, price: 10 },
      { name: "Product 2", quantity: 5, price: 10 }
    ],
    subtotal: 70,
    gst: 12.6,
    total: 82.6
  };
  
  module.exports = { createInvoiceTemplate };