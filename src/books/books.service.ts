import { Injectable, HttpException } from '@nestjs/common';
import { BOOKS } from '../mocks/books.mock';
@Injectable()
export class BooksService {
  books = BOOKS;

  // getBooks(): Used to fetch the list of all books. It has @Get() decorator attached to it. This helps to map any GET request sent to /books to this controller.
  getBooks(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }
  // getBook(): Used to retrieve the details of a particular book by passing the bookID as a parameter.
  getBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.books.find((book) => book.id === id);
      if (!book) {
        throw new HttpException('Book does not exist!', 404);
      }
      resolve(book);
    });
  }
  // addBook(): Used to create and post a new book to the existing book list. And because we are not persisting into the database, the newly added book will only be held in memory.
  addBook(book): Promise<any> {
    return new Promise((resolve) => {
      this.books.push(book);
      resolve(this.books);
    });
  }

  // deleteBook(): Used to delete a book by passing the bookID as a query parameter.

  deleteBook(bookID): Promise<any> {
    const id = Number(bookID);
    return new Promise((resolve) => {
      const index = this.books.findIndex((book) => book.id === id);
      if (index === -1) {
        throw new HttpException('Book does not exist!', 404);
      }
      this.books.splice(1, index);
      resolve(this.books);
    });
  }
}
