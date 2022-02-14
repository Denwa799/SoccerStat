import React from 'react';
import styles from './SearchBar.module.css';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBar {
  placeholder: string;
  value: string;
  inputOnChange: (e: any) => void;
  inputOnClick: () => void;
  array: string[];
  isOpen: boolean;
  filteredArray: string[];
  itemOnClick: (e: any) => void;
}

const SearchBar: React.FC<SearchBar> = ({
  placeholder,
  value,
  inputOnChange,
  inputOnClick,
  array,
  isOpen,
  filteredArray,
  itemOnClick,
}) => {
  let btnList = null;

  if (array.length != 0 && value && isOpen) {
    filteredArray.map(
      (item: any) =>
        (btnList = (
          <li key={item.id} className={styles.autocompleteItem} onClick={itemOnClick}>
            {item.name}
          </li>
        ))
    );
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
      <ul className={styles.autocomplete}>{btnList}</ul>
      <SearchOutlined className={styles.searchIcn} />
    </form>
  );
};

export default SearchBar;
