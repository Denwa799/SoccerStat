import React from 'react';
import styles from './SearchBar.module.css';
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ISearchBar } from '../../../types/UI/UI';

const SearchBar: React.FC<ISearchBar> = ({
  placeholder,
  value,
  inputOnChange,
  inputOnClick,
  array,
  isOpen,
  filteredArray,
  itemOnClick,
  valueClearOnClick,
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
      {value ? (
        <Button
          type="text"
          className={styles.clearIcn}
          icon={<CloseCircleFilled onClick={valueClearOnClick} />}
        />
      ) : (
        <SearchOutlined className={styles.searchIcn} />
      )}
    </form>
  );
};

export default SearchBar;
