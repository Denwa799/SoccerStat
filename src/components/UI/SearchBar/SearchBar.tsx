import React from 'react';
import styles from './SearchBar.module.css';
import { SearchOutlined } from '@ant-design/icons';

interface ISearchBar {
  placeholder: string;
  value: string;
  inputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputOnClick: () => void;
  array: any[]; // Может приходит любой массив, будь то соревнования или команды
  isOpen: boolean;
  filteredArray: any[]; // Может приходит любой массив, будь то соревнования или команды
  itemOnClick: (e: React.MouseEvent<HTMLLIElement>) => void;
}

const SearchBar: React.FC<ISearchBar> = ({
  placeholder,
  value,
  inputOnChange,
  inputOnClick,
  array,
  isOpen,
  filteredArray,
  itemOnClick,
}) => {
  function renderBtns() {
    if (array.length != 0 && value && isOpen) {
      return filteredArray.map((item) => (
        <li key={item.id} className={styles.autocompleteItem} onClick={itemOnClick}>
          {item.name}
        </li>
      ));
    }
  }

  return (
    <form className={styles.SearchBar}>
      <input
        type="text"
        placeholder={placeholder}
        className={styles.searchInput}
        value={value}
        onChange={inputOnChange}
        onClick={inputOnClick}
      />
      <ul className={styles.autocomplete}>{renderBtns()}</ul>
      <SearchOutlined className={styles.searchIcn} />
    </form>
  );
};

export default SearchBar;
