import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
    return (
    <button onClick={onLoadMore} type="button" className={css.button}>
      Load more
    </button>
  );
};
