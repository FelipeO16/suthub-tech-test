type Link = { id: number, title: string, label: string, url: string }

export const links: Array<Link> = [
  { id: 1, title: 'Cadastro de usuário', label:'Cadastro', url: '/register' },
  { id: 2, title: 'Galeria de receitas e busca por tags', label: 'Galeria', url: '/recipes' },
  { id: 3, title: 'Lista e busca de usuários', label: 'Busca', url: '/search' },
]