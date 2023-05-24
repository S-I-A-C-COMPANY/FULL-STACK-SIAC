// Layout
import { ContentNotifications } from '../ContentNotifications/ContentNotifications'
import { SideBarProfile } from '../SideBarProfile/SideBarProfile'


export const MainNotifications = () => {
  return (
    <main className='mainNotifications'>
      <SideBarProfile />
      <ContentNotifications />
    </main>
  )
}
