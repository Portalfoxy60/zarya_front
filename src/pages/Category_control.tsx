import { useEffect, useState } from 'react'
import { Button, Input } from '@chakra-ui/react'
import Menu from '../page_elements/Menu'
import Footer from '../page_elements/Footer'
import TrashIcon from '../icons/TrashIcon'
import EditIcon from '../icons/EditIcon'
import '../App.css'
import api from '../api'
import { Category } from '../interfaces/category.interface'

const Category_control: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isAdding, setIsAdding] = useState(false)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editedName, setEditedName] = useState('')

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await api.get<Category[]>('/categories')
      setCategories(res.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/categories/${id}`)
      setCategories((prev) => prev.filter((cat) => cat.id !== id))
    } catch (error) {
      console.error('Ошибка при удалении категории:', error)
    }
  }

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return
    try {
      const res = await api.post('/categories', {
        name: newCategoryName.trim(),
      })
      setCategories((prev) => [...prev, res.data])
      setNewCategoryName('')
      setIsAdding(false)
    } catch (error) {
      console.error('Ошибка при добавлении категории:', error)
    }
  }

  const handleEdit = (id: number, name: string) => {
    setEditingId(id)
    setEditedName(name)
  }

  const handleUpdateCategory = async () => {
    if (!editedName.trim() || editingId === null) return
    try {
      await api.patch(`/categories/${editingId}`, {
        name: editedName.trim(),
      })
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editingId ? { ...cat, name: editedName.trim() } : cat,
        ),
      )
      setEditingId(null)
      setEditedName('')
    } catch (error) {
      console.error('Ошибка при обновлении категории:', error)
    }
  }

  return (
    <>
      <Menu />
      <main className="subscribe-page">
        <div className="title-wrapper">
          <h1 className="page-title">Управление категориями</h1>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '20px',
          }}
        >
          {!isAdding ? (
            <Button
              colorPalette="orange"
              size="sm"
              onClick={() => setIsAdding(true)}
            >
              Добавить категорию
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Input
                placeholder="Название категории"
                size="sm"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
              <Button
                colorPalette="orange"
                size="sm"
                onClick={handleAddCategory}
              >
                Сохранить
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false)
                  setNewCategoryName('')
                }}
              >
                Отмена
              </Button>
            </div>
          )}
        </div>

        <div className="subscribe-layout" style={{ gap: '40px' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            {categories.map((category) => (
              <div
                key={category.id}
                className="subscribe-card_data"
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontWeight: 600 }}>{category.name}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="icon-button"
                    title="Удалить"
                    onClick={() => handleDelete(category.id)}
                  >
                    <TrashIcon boxSize={5} />
                  </button>
                  <button
                    className="icon-button"
                    title="Редактировать"
                    onClick={() => handleEdit(category.id, category.name)}
                  >
                    <EditIcon boxSize={5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {editingId !== null && (
            <div
              className="subscribe-card_data"
              style={{
                width: '100%',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                padding: '24px',
                height: '200px',
              }}
            >
              <h3 style={{ fontWeight: 700, marginBottom: '12px' }}>
                Редактировать
              </h3>
              <Input
                placeholder="Новое название"
                size="sm"
                borderColor="black"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
              <div style={{ display: 'flex', gap: '100px' }}>
                <Button
                  colorPalette="orange"
                  size="sm"
                  onClick={handleUpdateCategory}
                >
                  Изменить
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setEditingId(null)}
                >
                  Отмена
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Category_control
