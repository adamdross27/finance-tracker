const db = require('../utils/db');

// Fetch statistics for the finance tracker
exports.getStats = async (req, res) => {
  const userId = req.user.id; // User ID from the auth middleware

  if (!userId) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    // Query: Current year, month, week, and day spending
    const [spendingStats] = await db.execute(`
      SELECT 
        SUM(CASE WHEN YEAR(date) = YEAR(CURDATE()) THEN amount ELSE 0 END) AS yearSpending,
        SUM(CASE WHEN MONTH(date) = MONTH(CURDATE()) THEN amount ELSE 0 END) AS monthSpending,
        SUM(CASE WHEN WEEK(date) = WEEK(CURDATE()) THEN amount ELSE 0 END) AS weekSpending,
        SUM(CASE WHEN DATE(date) = CURDATE() THEN amount ELSE 0 END) AS daySpending
      FROM expense WHERE user_id = ?
    `, [userId]);

    // Query: Top categories by total spending
    const [topCategories] = await db.execute(`
      SELECT c.name, SUM(e.amount) AS totalAmount
      FROM expense e
      JOIN category c ON e.category_id = c.category_id
      WHERE e.user_id = ?
      GROUP BY c.name
      ORDER BY totalAmount DESC
      LIMIT 5
    `, [userId]);

    // Query: Average daily spending
    const [averageDaily] = await db.execute(`
      SELECT AVG(daily.amount) AS dailyAverage
      FROM (
        SELECT DATE(date) AS expenseDate, SUM(amount) AS amount
        FROM expense
        WHERE user_id = ?
        GROUP BY DATE(date)
      ) daily
    `, [userId]);

    // Query: Biggest single expense
    const [biggestExpense] = await db.execute(`
      SELECT MAX(amount) AS biggestExpense
      FROM expense
      WHERE user_id = ?
    `, [userId]);

// Inside the expenseByCategory query
const [expenseByCategory] = await db.execute(`
    SELECT c.name AS categoryName, SUM(e.amount) AS totalAmount
    FROM expense e
    JOIN category c ON e.category_id = c.category_id
    WHERE e.user_id = ?
    GROUP BY c.name
    ORDER BY totalAmount DESC
  `, [userId]);
  
  // Ensure totalAmount is a number
  const formattedExpenseByCategory = expenseByCategory.map(cat => ({
    name: cat.categoryName,
    amount: parseFloat(cat.totalAmount) || 0,  // Parse as float and default to 0
  }));
  
  // Return stats response
  res.status(200).json({
    yearSpending: spendingStats[0].yearSpending || 0,
    monthSpending: spendingStats[0].monthSpending || 0,
    weekSpending: spendingStats[0].weekSpending || 0,
    daySpending: spendingStats[0].daySpending || 0,
    topCategories: topCategories.map(cat => cat.name),
    dailyAverage: averageDaily[0].dailyAverage || 0,
    biggestExpense: biggestExpense[0].biggestExpense || 0,
    expenseByCategory: formattedExpenseByCategory,
  });
  
      
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
