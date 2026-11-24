// App - keeps all the state (useState) and builds the page from the components.
import { useState } from 'react'
import { initialMembers, initialTasks } from './data.js'
import Header from './components/Header/Header.jsx'
import Footer from './components/Footer/Footer.jsx'
import FilterBar from './components/FilterBar/FilterBar.jsx'
import MembersList from './components/MembersList/MembersList.jsx'
import TasksPanel from './components/TasksPanel/TasksPanel.jsx'
import Notice from './components/Notice/Notice.jsx'
import styles from './App.module.css'

export default function App() {
  const [members] = useState(initialMembers)
  const [tasks, setTasks] = useState(initialTasks)
  const [selectedMemberId, setSelectedMemberId] = useState(null)
  const [showOnlyActive, setShowOnlyActive] = useState(false)
  const [layout, setLayout] = useState('list')

  const visibleMembers = showOnlyActive
    ? members.filter((member) => member.isActive)
    : members

  const selectedMember =
    members.find((member) => member.id === selectedMemberId) || null

  const selectedTasks = selectedMember
    ? tasks.filter((task) => task.assignedTo === selectedMember.id)
    : []

  function handleToggleTask(taskId) {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <div className={styles.app}>
      <Header />

      <FilterBar
        showOnlyActive={showOnlyActive}
        onToggleActive={() => setShowOnlyActive(!showOnlyActive)}
        layout={layout}
        onLayoutChange={setLayout}
      />

      {selectedMember && !selectedMember.isActive && (
        <Notice type="warning">{selectedMember.name} is inactive</Notice>
      )}

            <div className={styles.content}>
        <MembersList
          members={visibleMembers}
          layout={layout}
          selectedMemberId={selectedMemberId}
          onSelect={setSelectedMemberId}
        />

        <TasksPanel
          member={selectedMember}
          tasks={selectedTasks}
          onToggleTask={handleToggleTask}
        />
      </div>

      <Footer />
    </div>
  )
}