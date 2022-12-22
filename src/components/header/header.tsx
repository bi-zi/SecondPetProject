import React from 'react';
import { useAppDispatch, useAppSelector } from '../../store/Store';
import {
  fetchBooks,
  fetchCategoryBooks,
  fetchFindBooks,
  setClearBooks,
  setFindBooks,
} from '../../store/Books/Slice';
import { Link } from 'react-router-dom';
import { Resolution } from './Resolution/Resolution';

import './Style.css';

export const Header = () => {
  const dispatch = useAppDispatch();
  const booksSlice = useAppSelector((state) => state.booksSlice);

  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const [check, setCheck] = React.useState<string>('Нельзя');
  const [timerId, setTimerId] = React.useState<any>();

  const books = booksSlice.findBooks;

  const category =
    window.location.pathname.split('/')[2]?.length === undefined
      ? 'allBooks'
      : window.location.pathname.split('/')[2];

  const findBooks = () => {
    dispatch(
      fetchFindBooks({
        category: books.category,
        bookName: books.name,
      }),
    );
  };

  React.useEffect(() => {
    setWindowWidth(window.innerWidth);

    if (books.name.length > 0 && books.category.length > 0) {
      const timerId = setTimeout(findBooks, 1000);
      setTimerId(timerId);
    }

    if (books.name.length === 0 && books.category.length > 0) {
      dispatch(setClearBooks());

      if (books.category === 'allBooks') {
        dispatch(fetchBooks(20));
      } else dispatch(fetchCategoryBooks({ category: books.category, count: 20 }));
    }
  }, [window.innerWidth, books.name, books.name.length]);

  return (
    <div className="header">
      <Link to="/" className="header-web-site-name">
        Book Shop
      </Link>

      <input
        className="header-input"
        placeholder="Найти книгу..."
        value={books.name}
        type="text"
        onChange={(e) => {
          dispatch(setFindBooks({ name: e.target.value, category: category }));
          clearTimeout(timerId);
        }}
      />

      <input id="header__toggle" type="checkbox" hidden />
      <label className="header__burger" htmlFor="header__toggle">
        <span></span>
      </label>

      {windowWidth > 775 ? (
        <Resolution />
      ) : (
        <ul className="header__box">
          <Resolution />
        </ul>
      )}
    </div>
  );
};
