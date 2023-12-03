import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

// Replace your code here
class App extends Component {
  state = {
    taskList: [],
    searchInput: '',
    option: tagsList[0].optionId,
    activeTag: '',
  }

  onAddTask = event => {
    event.preventDefault()
    const {searchInput, option} = this.state
    const obj = {id: v4(), task: searchInput, category: option}
    this.setState(prev => ({
      taskList: [...prev.taskList, obj],
      searchInput: '',
      option: tagsList[0].optionId,
    }))
  }

  onChangeInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onChangeOption = event => {
    this.setState({option: event.target.value})
  }

  onChangeTag = id => {
    const {activeTag} = this.state
    if (activeTag === id) {
      this.setState({activeTag: ''})
    } else {
      this.setState({activeTag: id})
    }
  }

  render() {
    const {taskList, option, searchInput, activeTag} = this.state
    let filteredList = []
    if (activeTag.length === 0) {
      filteredList = taskList
    } else {
      filteredList = taskList.filter(each => each.category === activeTag)
    }
    return (
      <div className="bg-container">
        <div className="create-task-container">
          <h1 className="heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onAddTask}>
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="input"
              placeholder="Enter the task here"
              onChange={this.onChangeInput}
              value={searchInput}
            />
            <label htmlFor="tags" className="label">
              Tags
            </label>
            <select
              className="input"
              id="tags"
              onChange={this.onChangeOption}
              value={option}
            >
              {tagsList.map(each => (
                <option value={each.optionId} key={each.optionId}>
                  {each.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-btn">
              Add Task
            </button>
          </form>
        </div>
        <div className="task-container">
          <h1 className="tag-heading">Tags</h1>
          <ul className="tags-list">
            {tagsList.map(each => (
              <li key={each.optionId}>
                <button
                  type="button"
                  className={
                    activeTag === each.optionId ? 'active-tag-btn' : 'tag-btn'
                  }
                  onClick={() => {
                    this.onChangeTag(each.optionId)
                  }}
                >
                  {each.displayText}
                </button>
              </li>
            ))}
          </ul>
          <h1 className="tag-heading">Tasks</h1>
          {filteredList.length === 0 ? (
            <div className="no-task">
              <p className="no-task-heading">No Tasks Added Yet</p>
            </div>
          ) : (
            <ul className="task-list">
              {filteredList.map(each => (
                <li className="listitem" key={each.id}>
                  <p className="task">{each.task}</p>
                  <p type="button" className="category">
                    {each.category}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
