// Layout
import { ContentUsers } from '../ContentUsers/ContentUsers'
import { SideBarProducts } from '../SideBarProducts/SideBarProducts'


export const MainUsers = () => {
  return (
    <main className='mainUsers'>
        <SideBarProducts />
        <ContentUsers />
    </main>
  )
}
