// @flow
import type {Match, RouterHistory} from 'react-router-dom'
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

type Props = {|
  match: Match,
  history: RouterHistory
|};

type State = {|
  searchTerm: string
|};

class Search extends Component<Props, State> {
  constructor () {
    super()
    this.state = { searchTerm: '' }
  }

  handleSearchTermChange (e: SyntheticInputEvent<HTMLInputElement>) { // eslint-disable-line no-undef
    this.setState({
      searchTerm: e.currentTarget.value
    })
  }

  handleSearchTermSubmit (e: SyntheticEvent<HTMLFormElement>) { // eslint-disable-line no-undef
    e.preventDefault()
    let searchTerm = this.state.searchTerm.trim()
    if (searchTerm) {
      let { history } = this.props
      history.push(`/results?q=${searchTerm}`)
      this.setState({searchTerm: ''})
    }
  }

  render () {
    let { searchTerm } = this.state
    let onSearchTermChange = this.handleSearchTermChange.bind(this)
    let onSearchTermSubmit = this.handleSearchTermSubmit.bind(this)
    return (
      <div className='search'>
        <form onSubmit={onSearchTermSubmit}>
          <input type='text' value={searchTerm}
            onKeyDown={e => e.stopPropagation()}
            onKeyPress={e => e.stopPropagation()}
            onChange={onSearchTermChange}
            placeholder={'Search...'}
          />
        </form>
      </div>
    )
  }
}

export default withRouter(Search)
