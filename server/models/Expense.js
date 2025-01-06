// src/models/Expense.js
class Expense {
    constructor(id, userId, title, amount, description, categoryId, date) {
      this.id = id;
      this.userId = userId;
      this.title = title;
      this.amount = amount;
      this.description = description;
      this.categoryId = categoryId;
      this.date = date;
    }
  }
  
  module.exports = Expense;
  