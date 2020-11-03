import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    var income = this.transactions.reduce((acc, transaction) => {
      return (transaction.type === 'income')? acc + transaction.value: acc
    }, 0)
    var outcome = this.transactions.reduce((acc, transaction) => {
      return (transaction.type === 'outcome')? acc + transaction.value: acc
    }, 0)

    var total = income - outcome;
    return {
      income,
      outcome,
      total
    }
  }

  public create(data: CreateTransactionDTO): Transaction {
    const { title, value, type } = data;
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
