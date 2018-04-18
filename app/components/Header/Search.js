// @flow
import React, {Component} from 'react';

type State = {
  searchTerm: string
};

export default class Search extends Component<{}, State> {
  constructor() {
    super();
    this.state = { searchTerm: "" };
  }

  handleSearchTermChange(e: SyntheticInputEvent<HTMLInputElement>) {
    this.setState({
      searchTerm: e.currentTarget.value
    });
  }

  handleSearchTermSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    let { searchTerm } = this.state;
    console.log(searchTerm);
  }

  render() {
    let { searchTerm } = this.state;
    let onSearchTermChange = this.handleSearchTermChange.bind(this);
    let onSearchTermSubmit = this.handleSearchTermSubmit.bind(this);
    return (
      <div className='search'>
        <form onSubmit={onSearchTermSubmit}>
          <input type='text' value={searchTerm}
            onKeyDown={e => e.stopPropagation()}
            onKeyPress={e => e.stopPropagation()}
            onChange={onSearchTermChange}
            placeholder={'Search Podcasts...'}
          />
        </form>
      </div>
    );
  }
}
