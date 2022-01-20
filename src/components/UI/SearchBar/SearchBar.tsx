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
  filtredArray: string[];
  itemOnClick: (e: any) => void;
}

const SearchBar: React.FC<SearchBar> = (props) => {
  return (
    <form className={styles.SearchBar}>
      <input
        type="text"
        placeholder={props.placeholder}
        className={styles.searchInput}
        value={props.value}
        onChange={props.inputOnChange}
        onClick={props.inputOnClick}
      />
      <ul className={styles.autocomplete}>
        {props.array.length != 0 && props.value && props.isOpen
          ? props.filtredArray.map((item: any) => (
              <li key={item.id} className={styles.autocompleteItem} onClick={props.itemOnClick}>
                {item.name}
              </li>
            ))
          : null}
      </ul>
      <SearchOutlined className={styles.searchIcn} />
    </form>
  );
};

export default SearchBar;
