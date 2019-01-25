import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class ListUniversities extends Component {
  static propTypes = {
    universities: PropTypes.array.isRequired,
    showinguniversities: PropTypes.array.isRequired,
    updateUniversities: PropTypes.func.isRequired,
  }

  render() {
    const { universities } = this.props
    let { showinguniversities} =this.props
    const {updateUniversities}=this.props

    // showinguniversities.sort(sortBy('name'))

    if (showinguniversities.length<1){
      var shownuniversities=universities
    } else {
      shownuniversities=showinguniversities
    }

    return (
      <div className='list-universities'>
        <div className='list-universities-top'>
          <input
            className='search-universities'
            type='text'
            placeholder='Search universities'
            // value={query}
            onChange={(event) => this.props.updateUniversities(event.target.value)}
          />

        </div>

        <ol className='universities-list'>

          {shownuniversities.map((university) => (
                <li key={university.id} className='universities-list-item'>
                <div className='university-avatar' style={{
                  backgroundImage: `url(${university.avatarURL})`
                }}/>
                <div className='university-details'>
                  <p>{university.name}</p>
                  <p>{university.email}</p>
                  </div>
                  </li>
              ))
          }
        </ol>

      </div>
    )
  }
}


export default ListUniversities
