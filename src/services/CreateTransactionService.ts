import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { uuid } from 'uuidv4';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    const balance = this.transactionsRepository.getBalance();

    if (balance.total < value && type === 'outcome') {
      throw Error('Transaction bigger than the balance')
    }

    if (type === 'income') {
      balance.income += value;
    } else if (type === 'outcome') {
      balance.outcome += value;
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    })
    return transaction;
  }
}

export default CreateTransactionService;
