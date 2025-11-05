import { getAllItems } from "./inventory.js";

// Check for low or out-of-stock items
export const checkStockLevels = () => {
  const inventory = getAllItems();
  const alerts = [];

  inventory.forEach((item) => {
    if (item.quantity === 0) {
      alerts.push(`${item.name} is out of stock!`);
    } else if (item.quantity <= item.lowStockThreshold) {
      alerts.push(`${item.name} is low on stock (${item.quantity} left).`);
    }
  });

  // Display alerts (e.g., in a modal or browser notification)
  if (alerts.length > 0) {
    alert(alerts.join("\n")); // Replace with UI notification in production
  }
};

// Run check periodically
setInterval(checkStockLevels, 60000); // Check every minute